/** Isolated fixture only. Never point this script at a remote database/API. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { managedAcceptedAnswers } from '../lib/managed-auto-grading-keys.ts';
const base = 'http://127.0.0.1:8788';
async function request(path, body, token, method = 'POST') {
  const r = await fetch(base + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Exam-Client': 'accepted-answer-local-qa',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await r.json();
  assert.ok(r.ok, `${path}: ${r.status} ${data.error ?? ''}`);
  return data;
}
const admin = await request('/api/auth/login', {
  email: 'admin.qa@pl300.local',
  password: 'StrongAdmin2026',
});
const stamp = Date.now();
const student = await request('/api/auth/register', {
  name: 'Accepted variants local fixture',
  email: `variants-${stamp}@pl300.local`,
  password: 'LocalVariants2026!',
});
const entries = Object.entries(managedAcceptedAnswers);
const created = await request(
  '/api/exams',
  {
    title: 'Accepted variants isolated QA',
    description: 'Local fixture only',
    domain: 'all',
    questionCount: entries.length,
    durationMinutes: 20,
    opensAt: new Date(stamp - 60000).toISOString(),
    closesAt: new Date(stamp + 3600000).toISOString(),
    accessCode: 'VARIANT-QA',
    passScore: 70,
    maxAttempts: 2,
    shuffleQuestions: false,
    shuffleChoices: false,
    secureMode: false,
    showScoreAfterSubmit: true,
  },
  admin.token,
);
const examId = created.exam.id;
assert.match(examId, /^[a-zA-Z0-9_-]+$/);
const fixture =
  `DELETE FROM exam_questions WHERE exam_id='${examId}';` +
  entries
    .map(
      ([id], i) =>
        `INSERT INTO exam_questions(exam_id,question_id,position) VALUES('${examId}','${id}',${i});`,
    )
    .join('');
const db = spawnSync(
  process.execPath,
  [
    'node_modules/wrangler/bin/wrangler.js',
    'd1',
    'execute',
    'pl300-managed-exams',
    '--config',
    'exam-api-worker/wrangler.jsonc',
    '--local',
    '--persist-to',
    '.openai/remaining48-d1',
    '--command',
    fixture,
  ],
  { encoding: 'utf8' },
);
assert.equal(db.status, 0, db.stderr || db.stdout);
for (const valid of [true, false]) {
  const started = await request(
    '/api/attempts/start',
    { examId, accessCode: 'VARIANT-QA' },
    student.token,
  );
  assert.equal(started.questions.length, entries.length);
  for (const q of started.questions)
    for (const hidden of [
      'correct',
      'correct_json',
      'explanation',
      'answerImage',
    ])
      assert.ok(!(hidden in q), `Leaked ${hidden}`);
  const answers = Object.fromEntries(
    entries.map(([id, variants]) => [
      id,
      valid ? variants.at(-1) : variants[0].map(() => 999999),
    ]),
  );
  await request(
    `/api/attempts/${started.attempt.id}`,
    { answers, flags: [], current: 0 },
    student.token,
    'PUT',
  );
  const submitted = await request(
    `/api/attempts/${started.attempt.id}/submit`,
    {},
    student.token,
  );
  assert.equal(submitted.attempt.percent, valid ? 100 : 0);
}
console.log(
  JSON.stringify({
    status: 'PASS',
    localOnly: true,
    alternativeQuestions: entries.length,
    acceptedVariantsScore100: true,
    invalidVariantsScore0: true,
    answerKeysHidden: true,
  }),
);
