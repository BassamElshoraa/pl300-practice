/** Guarded content-only synchronization; never updates attempts or users. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { questions } from '../lib/questions.ts';
import { managedGradingValue } from '../lib/managed-auto-grading-keys.ts';
import { getQuestionPresentation } from '../lib/question-presentation.ts';
import { buildReviewedExplanation } from '../lib/reviewed-lessons.ts';

const baseline = '.openai/question-bank-before-remaining-review.json';
const output =
  'exam-api-worker/content-reviews/2026-10-26-remaining-review.sql';
const columns = ['correct_json', 'explanation'];
function execute(args) {
  const r = spawnSync(
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
      ...args,
    ],
    { encoding: 'utf8', maxBuffer: 25000000, timeout: 120000 },
  );
  assert.equal(r.status, 0, r.stderr || r.stdout);
  const start = r.stdout.search(/(?:^|\n)(?=\[\s*\n\s*\{)/);
  assert.ok(start >= 0, 'Missing Wrangler JSON');
  return JSON.parse(r.stdout.slice(start).trim()).flatMap(
    (r) => r.results ?? [],
  );
}
const read = (sql) => execute(['--command', sql]);
const sql = (x) =>
  x == null ? 'NULL' : `'${String(x).replaceAll("'", "''")}'`;
const desired = questions.map((q) => ({
  id: q.id,
  correct_json: JSON.stringify(
    getQuestionPresentation(q)?.warning
      ? []
      : (managedGradingValue(q.id) ?? q.correct),
  ),
  explanation: buildReviewedExplanation(q) ?? q.explanation,
}));
if (process.argv.includes('--capture')) {
  assert.ok(!fs.existsSync(baseline), 'Baseline is immutable');
  const rows = read(
    'SELECT id,correct_json,explanation FROM question_bank ORDER BY id',
  );
  assert.equal(rows.length, 494);
  fs.writeFileSync(baseline, JSON.stringify(rows, null, 2));
  console.log(JSON.stringify({ capturedQuestionRows: rows.length }));
} else {
  const before = new Map(
    JSON.parse(fs.readFileSync(baseline, 'utf8')).map((r) => [r.id, r]),
  );
  const changed = desired.filter((r) =>
    columns.some((c) => r[c] !== before.get(r.id)?.[c]),
  );
  const statements = changed.map((r) => {
    assert.ok(before.has(r.id));
    const guard = [before.get(r.id), r]
      .map(
        (v) => `(${columns.map((c) => `${c} IS ${sql(v[c])}`).join(' AND ')})`,
      )
      .join(' OR ');
    return `UPDATE question_bank SET ${columns.map((c) => `${c}=${sql(r[c])}`).join(',')} WHERE id=${sql(r.id)} AND (${guard});`;
  });
  fs.writeFileSync(
    output,
    '-- Content only; existing attempts and scores are not recalculated.\n' +
      statements.join('\n') +
      '\n',
  );
  if (process.argv.includes('--apply')) {
    assert.equal(
      read("SELECT COUNT(*) AS n FROM attempts WHERE status='in_progress'")[0]
        .n,
      0,
      'An exam is active; defer key changes',
    );
    const query =
      'SELECT id,status,updated_at,correct_count,incorrect_count,unanswered_count,manual_pending_count,auto_graded_count,percent FROM attempts ORDER BY id';
    const digest = (rows) =>
      createHash('sha256').update(JSON.stringify(rows)).digest('hex');
    const scoreHash = digest(read(query));
    execute(['--file', output]);
    assert.equal(digest(read(query)), scoreHash, 'Historical score changed');
    console.log(
      JSON.stringify({
        appliedContentOnly: true,
        historicalScoreHash: scoreHash,
      }),
    );
  }
  if (
    process.argv.includes('--verify-remote') ||
    process.argv.includes('--apply')
  ) {
    const after = new Map(
      read('SELECT id,correct_json,explanation FROM question_bank').map((r) => [
        r.id,
        r,
      ]),
    );
    for (const r of desired)
      for (const c of columns)
        assert.equal(after.get(r.id)?.[c], r[c], `${r.id}: ${c} mismatch`);
    console.log(JSON.stringify({ verifiedRemoteQuestionRows: desired.length }));
  }
  console.log(JSON.stringify({ changedContentRows: changed.length, output }));
}
