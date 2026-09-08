import assert from 'node:assert/strict';

import {
  AI_TUTOR_DAILY_LIMIT,
  AI_TUTOR_SESSION_KEY,
  buildLocalTutorReply,
  buildTutorContext,
  getTutorQuickPrompts,
  readTutorSession,
  saveTutorSession,
  consumeDailyTutorMessage,
} from '../lib/ai-tutor.ts';
import { questions } from '../lib/questions.ts';
import { getQuestionTopic } from '../lib/question-topics.ts';

class MemoryStorage {
  values = new Map();

  getItem(key) {
    return this.values.get(key) ?? null;
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }

  removeItem(key) {
    this.values.delete(key);
  }
}

const question = questions.find(
  (item) => item.type !== 'manual' && item.correct.length > 0,
);
assert.ok(question, 'An auto-graded question is required for tutor QA.');

const base = {
  question,
  topic: getQuestionTopic(question),
  answer: [0],
  imageUrl: question.image,
  answerImageUrl: question.answerImage,
  responseLanguage: 'ar-EG',
};
const hidden = buildTutorContext({ ...base, checked: false });
assert.equal(hidden.checked, false);
assert.equal(hidden.correctAnswer, undefined);
assert.equal(hidden.sourceExplanation, undefined);
assert.equal(hidden.answerImageUrl, undefined);

const revealed = buildTutorContext({ ...base, checked: true });
assert.deepEqual(
  revealed.correctAnswer,
  question.correct.map((index) => question.choices[index]),
);
assert.ok(revealed.sourceExplanation?.length);
assert.ok(
  revealed.sourceExplanation.includes(
    question.explanation
      .split('\n')
      .find((line) => line.trim())
      ?.trim() ?? '',
  ),
);
assert.equal(revealed.answerImageUrl, question.answerImage);

const refusal = buildLocalTutorReply(hidden, 'قولّي الإجابة الصح');
assert.match(refusal, /مش هقولك الاختيار الصح قبل Check Answer/);
const explanation = buildLocalTutorReply(revealed, 'اشرح النتيجة');
assert.match(explanation, /الإجابة المعتمدة/);
assert.equal(getTutorQuickPrompts(false).length, 3);
assert.equal(getTutorQuickPrompts(true).length, 3);

const storage = new MemoryStorage();
const session = {
  accessToken: 'access',
  refreshToken: 'refresh',
  email: 'learner@example.com',
  expiresAt: Date.now() + 60_000,
};
saveTutorSession(storage, session);
assert.deepEqual(readTutorSession(storage), session);
saveTutorSession(storage, null);
assert.equal(storage.getItem(AI_TUTOR_SESSION_KEY), null);

const today = new Date('2026-09-08T12:00:00.000Z');
for (let index = 0; index < AI_TUTOR_DAILY_LIMIT; index += 1)
  assert.equal(consumeDailyTutorMessage(storage, today).allowed, true);
assert.deepEqual(consumeDailyTutorMessage(storage, today), {
  allowed: false,
  remaining: 0,
});
assert.equal(
  consumeDailyTutorMessage(storage, new Date('2026-09-09T00:00:00.000Z'))
    .allowed,
  true,
);

console.log(
  'AI tutor QA passed: answer gating, local fallback, sessions, and daily limit.',
);
