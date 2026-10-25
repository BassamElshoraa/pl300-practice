/** Guarded content-only update. Never writes users, exams, attempts or scores. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { questions } from '../lib/questions.ts';
import {
  buildReviewedExplanation,
  getReviewedLesson,
} from '../lib/reviewed-lessons.ts';
import { managedAutoGradingKeys } from '../lib/managed-auto-grading-keys.ts';
import { getQuestionPresentation } from '../lib/question-presentation.ts';
const snapshotPath = '.openai/question-bank-before-complete-review.json';
const appliedSnapshotPath =
  '.openai/question-bank-after-first-complete-review.json';
const output = 'exam-api-worker/content-reviews/2026-10-25-complete-bank.sql';
const columns = [
  'prompt',
  'choices_json',
  'correct_json',
  'explanation',
  'image',
  'answer_image',
  'context',
  'rows_json',
];
const sql = (x) =>
  x == null ? 'NULL' : `'${String(x).replaceAll("'", "''")}'`;
function remote(command) {
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
      command,
    ],
    { encoding: 'utf8', maxBuffer: 20_000_000, timeout: 60000 },
  );
  if (result.status !== 0)
    throw Error(result.stderr || result.stdout || 'D1 read failed');
  return JSON.parse(result.stdout).flatMap((r) => r.results ?? []);
}
if (
  process.argv.includes('--capture') ||
  process.argv.includes('--capture-applied')
) {
  const target = process.argv.includes('--capture-applied')
    ? appliedSnapshotPath
    : snapshotPath;
  assert.ok(
    !fs.existsSync(target),
    'Existing baseline is immutable. Do not overwrite it.',
  );
  const rows = remote(`SELECT id,${columns.join(',')} FROM question_bank`);
  assert.equal(rows.length, questions.length, 'Unexpected remote inventory');
  fs.writeFileSync(target, JSON.stringify(rows, null, 2));
  console.log(
    JSON.stringify({
      capturedQuestionRows: rows.length,
      studentDataRead: false,
    }),
  );
} else {
  const before = new Map(
    JSON.parse(fs.readFileSync(snapshotPath, 'utf8')).map((r) => [r.id, r]),
  );
  const expected = questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    choices_json: JSON.stringify(q.choices),
    correct_json: JSON.stringify(
      getQuestionPresentation(q)?.warning
        ? []
        : (managedAutoGradingKeys[q.id] ?? q.correct),
    ),
    explanation: buildReviewedExplanation(q) ?? q.explanation,
    image: q.image ?? null,
    answer_image: q.answerImage ?? null,
    context: q.context ?? null,
    rows_json: q.rows ? JSON.stringify(q.rows) : null,
  }));
  for (const q of questions)
    assert.ok(getReviewedLesson(q), `${q.id}: missing authored review`);
  const changed = expected.filter((row) =>
    columns.some((c) => row[c] !== before.get(row.id)?.[c]),
  );
  const applied = fs.existsSync(appliedSnapshotPath)
    ? new Map(
        JSON.parse(fs.readFileSync(appliedSnapshotPath, 'utf8')).map((r) => [
          r.id,
          r,
        ]),
      )
    : new Map();
  const statements = changed.map((row) => {
    const old = before.get(row.id);
    assert.ok(old, `Unmatched question ${row.id}`);
    // Compare all question-content fields before writing, allowing an idempotent rerun.
    const guard = [old, applied.get(row.id), row]
      .filter(Boolean)
      .map(
        (version) =>
          `(${columns.map((c) => `${c} IS ${sql(version[c])}`).join(' AND ')})`,
      )
      .join(' OR ');
    return `UPDATE question_bank SET ${columns.map((c) => `${c}=${sql(row[c])}`).join(',')} WHERE id=${sql(row.id)} AND (${guard});`;
  });
  fs.writeFileSync(
    output,
    [
      '-- Content only. Guarded against the captured baseline. Historical attempts/scores are NOT recalculated.',
      ...statements,
      '',
    ].join('\n'),
  );
  console.log(
    JSON.stringify({
      activeQuestions: expected.length,
      updatedContentRows: changed.length,
      keyChanges: changed
        .filter((r) => r.correct_json !== before.get(r.id).correct_json)
        .map((r) => ({
          id: r.id,
          previous: before.get(r.id).correct_json,
          reviewed: r.correct_json,
        })),
      sql: output,
    }),
  );
  if (process.argv.includes('--verify-remote')) {
    const after = new Map(
      remote(`SELECT id,${columns.join(',')} FROM question_bank`).map((r) => [
        r.id,
        r,
      ]),
    );
    for (const row of expected)
      for (const column of columns)
        assert.equal(
          after.get(row.id)?.[column],
          row[column],
          `${row.id}: remote mismatch ${column}`,
        );
    console.log(
      JSON.stringify({
        allRemoteQuestionFieldsMatch: true,
        verifiedRows: expected.length,
        historicalScoresChanged: false,
      }),
    );
  }
}
