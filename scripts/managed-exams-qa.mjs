import assert from 'node:assert/strict';
import { questions } from '../lib/questions.ts';
import {
  addManagedAttemptEvent,
  authenticateManagedDemo,
  createManagedExam,
  createSeedManagedState,
  managedResultsCsv,
  startOrResumeManagedAttempt,
  submitManagedAttempt,
  updateManagedAttempt,
} from '../lib/managed-exams.ts';

const now = new Date('2026-10-11T10:00:00.000Z');
const questionById = new Map(
  questions.map((question) => [question.id, question]),
);
const autoQuestions = questions
  .filter((question) => question.type !== 'manual')
  .slice(0, 5);

assert.equal(
  authenticateManagedDemo('student@pl300.local', 'Student123!')?.role,
  'student',
  'student demo account should authenticate',
);
assert.equal(
  authenticateManagedDemo('student@pl300.local', 'wrong'),
  null,
  'bad credentials must be rejected',
);

let state = createSeedManagedState(
  questions.map((question) => question.id),
  now,
);
const created = createManagedExam(
  state,
  'instructor-bassam',
  {
    title: 'QA managed exam',
    description: 'Automation fixture',
    questionIds: autoQuestions.map((question) => question.id),
    durationMinutes: 30,
    opensAt: new Date(now.getTime() - 60_000).toISOString(),
    closesAt: new Date(now.getTime() + 3_600_000).toISOString(),
    accessCode: 'qa300',
    passScore: 70,
    maxAttempts: 1,
    shuffleQuestions: false,
    shuffleChoices: true,
    secureMode: true,
    showScoreAfterSubmit: true,
    status: 'published',
  },
  now,
);
state = created.state;
assert.equal(created.exam.accessCode, 'QA300');
assert.equal(created.exam.questionIds.length, 5);

const wrongCode = startOrResumeManagedAttempt(state, {
  examId: created.exam.id,
  studentId: 'student-demo',
  accessCode: 'WRONG',
  questionsById: questionById,
  now,
});
assert.equal(wrongCode.error, 'bad_code');

const started = startOrResumeManagedAttempt(state, {
  examId: created.exam.id,
  studentId: 'student-demo',
  accessCode: 'qa300',
  questionsById: questionById,
  now,
});
assert.ok(started.attempt, 'valid code should create an attempt');
state = started.state;
const attemptId = started.attempt.id;
const firstQuestion = autoQuestions[0];

state = updateManagedAttempt(
  state,
  attemptId,
  {
    answers: { [firstQuestion.id]: [...firstQuestion.correct] },
    current: 1,
    flags: [autoQuestions[1].id],
  },
  new Date(now.getTime() + 30_000),
);
const saved = state.attempts.find((attempt) => attempt.id === attemptId);
assert.deepEqual(saved.answers[firstQuestion.id], firstQuestion.correct);
assert.equal(saved.current, 1);

const resumed = startOrResumeManagedAttempt(state, {
  examId: created.exam.id,
  studentId: 'student-demo',
  accessCode: 'QA300',
  questionsById: questionById,
  now: new Date(now.getTime() + 60_000),
});
assert.equal(resumed.resumed, true);
assert.equal(resumed.attempt.id, attemptId);

state = addManagedAttemptEvent(
  resumed.state,
  attemptId,
  'tab_hidden',
  'QA event',
  new Date(now.getTime() + 90_000),
);
assert.equal(
  state.attempts.find((attempt) => attempt.id === attemptId).events.length,
  1,
);

state = submitManagedAttempt(
  state,
  attemptId,
  questionById,
  new Date(now.getTime() + 120_000),
);
const submitted = state.attempts.find((attempt) => attempt.id === attemptId);
assert.equal(submitted.status, 'submitted');
assert.equal(submitted.correct, 1);
assert.equal(submitted.unanswered, 4);

const maxed = startOrResumeManagedAttempt(state, {
  examId: created.exam.id,
  studentId: 'student-demo',
  accessCode: 'QA300',
  questionsById: questionById,
  now: new Date(now.getTime() + 180_000),
});
assert.equal(maxed.error, 'max_attempts');

const csv = managedResultsCsv(state);
assert.match(csv, /QA managed exam/);
assert.match(csv, /Mariam Ahmed/);
assert.match(csv, /submitted/);

const futureState = createManagedExam(
  state,
  'instructor-bassam',
  {
    ...created.exam,
    title: 'Future exam',
    accessCode: 'FUTURE',
    opensAt: new Date(now.getTime() + 3_600_000).toISOString(),
    closesAt: new Date(now.getTime() + 7_200_000).toISOString(),
  },
  now,
).state;
const futureExam = futureState.exams[0];
assert.equal(
  startOrResumeManagedAttempt(futureState, {
    examId: futureExam.id,
    studentId: 'student-demo',
    accessCode: 'FUTURE',
    questionsById: questionById,
    now,
  }).error,
  'not_open',
);

console.log(
  'Managed exams QA passed: auth, scheduling, access, autosave, resume, scoring, limits, events, and CSV.',
);
