import assert from 'node:assert/strict';
import {
  LEARNER_STATE_KEY,
  LEARNER_STATE_VERSION,
  createLearnerBackup,
  createDefaultLearnerState,
  loadLearnerState,
  mergeLearnerStates,
  parseLearnerBackup,
  saveLearnerState,
  serializeLearnerBackup,
  updateMistakeRecords,
} from '../lib/learner-state.ts';
import { questions } from '../lib/questions.ts';

class MemoryStorage {
  values = new Map();
  get length() {
    return this.values.size;
  }
  clear() {
    this.values.clear();
  }
  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }
  key(index) {
    return [...this.values.keys()][index] ?? null;
  }
  removeItem(key) {
    this.values.delete(key);
  }
  setItem(key, value) {
    this.values.set(key, String(value));
  }
}

const emptyStorage = new MemoryStorage();
assert.deepEqual(loadLearnerState(emptyStorage), createDefaultLearnerState());

const legacyStorage = new MemoryStorage();
legacyStorage.setItem('pl300-theme', 'dark');
legacyStorage.setItem(
  'pl300-progress-v4',
  JSON.stringify({
    model: 2,
    answers: { question: [1] },
    flags: ['question'],
    current: 4,
    timeLeft: 4321,
  }),
);
const migrated = loadLearnerState(legacyStorage);
assert.equal(migrated.version, LEARNER_STATE_VERSION);
assert.equal(migrated.preferences.theme, 'dark');
assert.equal(migrated.activeAttempt?.model, 2);
assert.equal(migrated.activeAttempt?.mode, 'exam');
assert.equal(migrated.activeAttempt?.current, 4);
assert.equal(migrated.activeAttempt?.timeLeft, 4321);

const now = new Date().toISOString();
const completeState = {
  ...createDefaultLearnerState(),
  learner: { name: 'Bassam Elshoraa', updatedAt: now },
  preferences: { theme: 'dark' },
  activeAttempt: { ...migrated.activeAttempt, learnerName: 'Bassam Elshoraa' },
  bookmarks: ['saved-question'],
  mistakes: {},
  attempts: [
    {
      id: 'qa-attempt',
      model: 1,
      sessionLabel: 'Mock 01',
      mode: 'practice',
      learnerName: 'Bassam Elshoraa',
      startedAt: now,
      completedAt: now,
      durationSeconds: 90,
      questionCount: 50,
      answeredCount: 50,
      correct: 30,
      incorrect: 3,
      unanswered: 0,
      manual: 17,
      autoGraded: 33,
      percent: 91,
      domains: [{ domain: 'Prepare the data', correct: 8, total: 9 }],
      topics: [{ topic: 'Power Query transformations', correct: 4, total: 5 }],
    },
  ],
};
saveLearnerState(legacyStorage, completeState);
assert.equal(legacyStorage.getItem('pl300-progress-v4'), null);
assert.equal(legacyStorage.getItem('pl300-theme'), null);
assert.ok(legacyStorage.getItem(LEARNER_STATE_KEY));
const roundTrip = loadLearnerState(legacyStorage);
assert.equal(roundTrip.learner.name, 'Bassam Elshoraa');
assert.equal(roundTrip.activeAttempt?.learnerName, 'Bassam Elshoraa');
assert.equal(roundTrip.attempts[0]?.percent, 91);
assert.equal(roundTrip.attempts[0]?.topics[0]?.total, 5);
assert.deepEqual(roundTrip.bookmarks, ['saved-question']);

const backup = createLearnerBackup(roundTrip);
assert.equal(backup.kind, 'pl300-practice-backup');
assert.equal(backup.state.version, LEARNER_STATE_VERSION);
const imported = parseLearnerBackup(serializeLearnerBackup(roundTrip));
assert.equal(imported.state.learner.name, 'Bassam Elshoraa');
assert.equal(imported.state.attempts[0]?.id, 'qa-attempt');
assert.throws(() => parseLearnerBackup('{broken'), /valid JSON/);
assert.throws(
  () => parseLearnerBackup(JSON.stringify({ kind: 'something-else' })),
  /not a PL-300/,
);

const incomingState = {
  ...createDefaultLearnerState(),
  learner: { name: 'Imported learner', updatedAt: now },
  bookmarks: ['saved-question', 'second-question'],
  attempts: [{ ...roundTrip.attempts[0], id: 'imported-attempt', percent: 88 }],
};
const merged = mergeLearnerStates(roundTrip, incomingState);
assert.equal(merged.learner.name, 'Bassam Elshoraa');
assert.equal(merged.attempts.length, 2);
assert.deepEqual(merged.bookmarks, ['saved-question', 'second-question']);
assert.equal(merged.preferences.theme, 'dark');

const autoQuestion = questions.find(
  (question) => question.type !== 'manual' && question.choices.length > 1,
);
assert.ok(autoQuestion, 'An auto-graded question is required for mastery QA.');
const wrongIndex = autoQuestion.choices.findIndex(
  (_, index) => !autoQuestion.correct.includes(index),
);
assert.notEqual(wrongIndex, -1, 'The QA question needs an incorrect option.');

const wrong = updateMistakeRecords(
  {},
  [autoQuestion],
  { [autoQuestion.id]: [wrongIndex] },
  now,
);
assert.equal(wrong[autoQuestion.id]?.status, 'needs-review');
const improving = updateMistakeRecords(
  wrong,
  [autoQuestion],
  { [autoQuestion.id]: autoQuestion.correct },
  now,
);
assert.equal(improving[autoQuestion.id]?.status, 'improving');
const mastered = updateMistakeRecords(
  improving,
  [autoQuestion],
  { [autoQuestion.id]: autoQuestion.correct },
  now,
);
assert.equal(mastered[autoQuestion.id]?.status, 'mastered');

console.log(
  JSON.stringify(
    { status: 'PASS', schemaVersion: LEARNER_STATE_VERSION, checks: 34 },
    null,
    2,
  ),
);
