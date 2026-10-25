import assert from 'node:assert/strict';
import { dragDropData } from '../lib/drag-drop-data.ts';
import { isCorrect, isYesNoQuestion } from '../lib/exam-utils.ts';
import { managedAutoGradingKeys } from '../lib/managed-auto-grading-keys.ts';
import { questions } from '../lib/questions.ts';
import { getQuestionPresentation } from '../lib/question-presentation.ts';
import { textAnswerData, TEXT_ANSWER_OFFSET } from '../lib/text-answer-data.ts';
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
const managedKeyEntries = Object.entries(managedAutoGradingKeys);
const managedEligibleQuestions = questions.filter(
  (question) =>
    !getQuestionPresentation(question)?.warning &&
    (question.type !== 'manual' ||
      Boolean(managedAutoGradingKeys[question.id]?.length)),
);

assert.ok(
  managedKeyEntries.length >= 42,
  'Existing reviewed grading coverage was lost.',
);
assert.ok(
  managedEligibleQuestions.length > 300,
  'Unexpected loss of managed exam coverage',
);
assert.ok(
  managedEligibleQuestions.every((q) => !getQuestionPresentation(q)?.warning),
  'Unresolved questions must not enter scored exams',
);
for (const [questionId, key] of managedKeyEntries) {
  const question = questionById.get(questionId);
  const spec = dragDropData[questionId];
  const rows = textAnswerData[questionId];
  assert.ok(
    question,
    `Managed answer key references missing question ${questionId}.`,
  );
  assert.equal(
    question.type,
    'manual',
    `${questionId} is not a visual question.`,
  );
  if (rows) {
    assert.equal(
      key.length,
      rows.length,
      `${questionId}: native answer row count`,
    );
    assert.ok(
      key.every(
        (value, index) =>
          Number.isInteger(value) &&
          rows[index].options[value - TEXT_ANSWER_OFFSET] !== undefined,
      ),
      `${questionId}: invalid native index`,
    );
    assert.equal(
      isCorrect(question, key),
      true,
      `${questionId}: native key not scoreable`,
    );
    continue;
  }
  if (isYesNoQuestion(question)) {
    assert.equal(key.length, 3);
    assert.ok(key.every((value) => value === 0 || value === 1));
    assert.equal(isCorrect(question, key), true);
    continue;
  }
  assert.ok(
    spec,
    `Managed answer key ${questionId} has no drag-and-drop spec.`,
  );
  assert.equal(
    key.length,
    spec.slots,
    `${questionId} answer count does not match its target slots.`,
  );
  assert.ok(
    key.every(
      (choice) =>
        Number.isInteger(choice) &&
        choice >= (spec.answerOffset ?? 0) &&
        choice < (spec.answerOffset ?? 0) + spec.options.length,
    ),
    `${questionId} contains an invalid choice index.`,
  );
  if (!spec.allowReuse) {
    assert.equal(
      new Set(key).size,
      key.length,
      `${questionId} repeats a choice even though reuse is disabled.`,
    );
  }
  assert.equal(
    isCorrect(question, key),
    true,
    `${questionId} cannot be scored with its reviewed answer key.`,
  );
}
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
    violationLimit: 5,
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
  `Managed exams QA passed: ${managedEligibleQuestions.length} automatic questions (including ${managedKeyEntries.length} reviewed visual keys), auth, scheduling, access, autosave, resume, scoring, limits, events, and CSV.`,
);
