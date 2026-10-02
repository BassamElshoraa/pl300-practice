import assert from 'node:assert/strict';

import {
  AI_TUTOR_DAILY_LIMIT,
  AI_TUTOR_SESSION_KEY,
  buildLocalTutorReply,
  buildTutorSystemPrompt,
  buildTutorContext,
  detectTutorIntent,
  detectTutorLanguage,
  getTutorQuickPrompts,
  readTutorSession,
  saveTutorSession,
  consumeDailyTutorMessage,
} from '../lib/ai-tutor.ts';
import {
  buildSystemPrompt as buildWorkerSystemPrompt,
  detectTutorIntent as detectWorkerTutorIntent,
  detectTutorLanguage as detectWorkerTutorLanguage,
} from '../ai-tutor-worker/src/index.ts';
import {
  PUTER_TUTOR_MAX_TOKENS,
  PUTER_TUTOR_MODELS,
  chatWithPuter,
  signInToPuter,
} from '../lib/puter-ai.ts';
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
const explanation = buildLocalTutorReply(revealed, 'فهمني السؤال');
assert.match(explanation, /خلّينا نفهم الفكرة الأول/);
assert.doesNotMatch(explanation, /الإجابة المعتمدة/);
const directAnswer = buildLocalTutorReply(revealed, 'قولّي الإجابة الصح');
assert.match(directAnswer, /الإجابة المعتمدة/);
assert.equal(detectTutorLanguage('فهمني السؤال', 'en'), 'ar-EG');
assert.equal(detectTutorLanguage('Explain this question', 'ar-EG'), 'en');
assert.equal(detectTutorIntent('فهمني الفكرة من البداية'), 'teach');
assert.equal(detectTutorIntent('قولّي الإجابة الصح'), 'direct-answer');
assert.equal(detectWorkerTutorLanguage('اشرحلي ده', 'en'), 'ar-EG');
assert.equal(detectWorkerTutorIntent('help me understand'), 'teach');

const clientPrompt = buildTutorSystemPrompt(
  { ...revealed, responseLanguage: 'en' },
  'فهمني السؤال',
);
assert.match(clientPrompt, /natural, friendly Egyptian Arabic/);
assert.match(clientPrompt, /latest learner intent is: teach/);
assert.match(clientPrompt, /Do not lead with an answer dump/);
const workerPrompt = buildWorkerSystemPrompt(
  { ...revealed, responseLanguage: 'ar-EG' },
  'فهمني السؤال',
);
assert.match(workerPrompt, /natural, friendly Egyptian Arabic/);
assert.match(workerPrompt, /latest learner intent is: teach/);
assert.match(workerPrompt, /Do not lead with an answer dump/);

let puterMessages = [];
const puterAttempts = [];
let puterSignedIn = false;
globalThis.window = {
  puter: {
    auth: {
      isSignedIn: () => puterSignedIn,
      signIn: async (options) => {
        assert.equal(options.attempt_temp_user_creation, true);
        puterSignedIn = true;
      },
    },
    ai: {
      chat: async (messages, options) => {
        puterMessages = messages;
        puterAttempts.push(options);
        if (puterAttempts.length < PUTER_TUTOR_MODELS.length)
          throw new Error('Simulated free-model quota limit.');
        return { message: { content: 'شرح مصري تجريبي' } };
      },
    },
  },
};
assert.equal(await signInToPuter(), true);
assert.equal(puterSignedIn, true);
const puterReply = await chatWithPuter({
  context: { ...hidden, responseLanguage: 'ar-EG' },
  messages: [{ role: 'user', content: 'فهمني السؤال' }],
});
assert.equal(puterReply.reply, 'شرح مصري تجريبي');
assert.equal(puterReply.model, PUTER_TUTOR_MODELS.at(-1));
assert.equal(puterMessages[0].role, 'system');
assert.match(puterMessages[0].content, /latest learner intent is: teach/);
assert.deepEqual(
  puterAttempts.map((attempt) => attempt.model),
  PUTER_TUTOR_MODELS,
);
assert.ok(
  puterAttempts.every(
    (attempt) =>
      attempt.max_tokens === PUTER_TUTOR_MAX_TOKENS &&
      attempt.temperature === 0.35 &&
      attempt.normalize === true,
  ),
);
delete globalThis.window;

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
  'AI tutor QA passed: answer gating, language/intent routing, Puter chat, sessions, and daily limit.',
);
