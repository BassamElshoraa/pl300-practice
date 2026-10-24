/** Question content only. Does not modify attempts, scores, users or exams. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { questions } from '../lib/questions.ts';
import { managedAutoGradingKeys } from '../lib/managed-auto-grading-keys.ts';
import { buildReviewedExplanation } from '../lib/reviewed-lessons.ts';
const rangeMatch = process.argv
  .find((value) => value.startsWith('--range='))
  ?.match(/^--range=(\d+)-(\d+)$/);
const range = rangeMatch
  ? [Number(rangeMatch[1]), Number(rangeMatch[2])]
  : null;
if (
  range &&
  (range[0] < 1 || range[1] > questions.length || range[1] < range[0])
)
  throw Error('Invalid question review range');
const nextBatch = process.argv.includes('--next-batch');
const latestBatch = process.argv.includes('--latest-batch');
const banks = range
  ? Array.from({ length: range[1] - range[0] + 1 }, (_, i) => range[0] + i)
  : latestBatch
    ? [144, 164, 165, 166, 167, 168, 171, 176, 177, 179, 180]
    : nextBatch
      ? [144, 146, 148, 152, 155, 157, 160]
      : [
          80, 83, 89, 90, 91, 96, 98, 99, 100, 103, 105, 109, 116, 128, 132,
          134, 137, 142,
        ];
const sql = (value) =>
  value === undefined || value === null
    ? 'NULL'
    : `'${String(value).replaceAll("'", "''")}'`;
const selected = banks.map((bank) => {
  const q = questions[bank - 1];
  if (!q || q.source !== 'Final' || q.sourceNumber !== bank)
    throw new Error(`Bank/source mismatch at ${bank}`);
  return q;
});
const key = (q) => JSON.stringify(managedAutoGradingKeys[q.id] ?? q.correct);
const explanation = (q) =>
  range ? (buildReviewedExplanation(q) ?? q.explanation) : q.explanation;
const updates = selected.map(
  (q) =>
    `UPDATE question_bank SET prompt=${sql(q.prompt)}, explanation=${sql(explanation(q))}, answer_image=${sql(q.answerImage)}, correct_json=${sql(key(q))} WHERE id=${sql(q.id)} AND correct_json IN (${sql(key(q))}${q.id === 'f1-142-141' || q.id === 'f1-184-183' ? ", '[0]'" : ''});`,
);
const tests = selected.map(
  (q) =>
    `(id=${sql(q.id)} AND prompt=${sql(q.prompt)} AND explanation=${sql(explanation(q))} AND answer_image IS ${sql(q.answerImage)} AND correct_json=${sql(key(q))})`,
);
const base = range
  ? `exam-api-worker/content-reviews/${process.argv.find((value) => value.startsWith('--date='))?.slice(7) ?? '2026-10-22'}-lessons-${range[0]}-${range[1]}`
  : latestBatch
    ? 'exam-api-worker/content-reviews/2026-10-22-lessons-161-180'
    : nextBatch
      ? 'exam-api-worker/content-reviews/2026-10-22-lessons-141-160'
      : 'exam-api-worker/content-reviews/2026-10-21-lessons-080-140';
fs.writeFileSync(
  `${base}.sql`,
  [
    range
      ? `-- Detailed question-content review for bank ${range[0]}-${range[1]}. Only explicitly reviewed keys may change. No attempts, users, scores or exam definitions are modified.`
      : nextBatch || latestBatch
        ? '-- Generated content corrections. Student history is unchanged; only explicit reviewed answer-key corrections may change.'
        : '-- Generated question-content corrections. Bank142 key changes from [0] to [2]; other keys and all student history are unchanged.',
    ...updates,
    '',
  ].join('\n'),
);
fs.writeFileSync(
  `${base}-verify.sql`,
  `SELECT COUNT(*) AS matching_reviewed_rows FROM question_bank WHERE ${tests.join(' OR ')};\n`,
);
console.log(
  JSON.stringify({
    questionRows: selected.length,
    update: `${base}.sql`,
    verification: `${base}-verify.sql`,
    expectedVerifiedRows: selected.length,
  }),
);
if (process.argv.includes('--verify-remote')) {
  const result = spawnSync(
    process.execPath,
    [
      'node_modules/wrangler/bin/wrangler.js',
      'd1',
      'execute',
      'pl300-managed-exams',
      '--config',
      'exam-api-worker/wrangler.jsonc',
      '--remote',
      '--json',
      '--command',
      `SELECT id,prompt,explanation,answer_image,correct_json FROM question_bank WHERE id IN (${selected.map((q) => sql(q.id)).join(',')})`,
    ],
    { encoding: 'utf8', maxBuffer: 2_000_000, timeout: 60000 },
  );
  if (result.status !== 0)
    throw new Error(
      result.stderr || result.stdout || 'Remote verification failed',
    );
  const response = JSON.parse(result.stdout);
  const rows = response.flatMap((item) => item.results ?? []);
  assert.equal(rows.length, selected.length, 'Remote row count mismatch');
  for (const q of selected) {
    const row = rows.find((row) => row.id === q.id);
    assert.ok(row, `Missing remote question ${q.id}`);
    assert.equal(row.prompt, q.prompt, `${q.id}: prompt mismatch`);
    assert.equal(
      row.explanation,
      explanation(q),
      `${q.id}: explanation mismatch`,
    );
    assert.equal(
      row.answer_image,
      q.answerImage ?? null,
      `${q.id}: stale answer image`,
    );
    assert.equal(row.correct_json, key(q), `${q.id}: grading key mismatch`);
  }
  console.log(
    JSON.stringify({
      remoteContentVerification: 'PASS',
      matchedQuestionRows: rows.length,
      historicalAttemptsChanged: false,
    }),
  );
}
