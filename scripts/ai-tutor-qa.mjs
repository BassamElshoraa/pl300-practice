import assert from 'node:assert/strict';
import { buildEgyptianExplanation } from '../lib/egyptian-explanations.ts';
import { questions } from '../lib/questions.ts';

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
  tutorFailureKind,
  tutorFailureMessage,
  ensurePuterReady,
} from '../lib/puter-ai.ts';
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

const profilingQuestion = questions.find((item) => item.id === 'f1-256-255');
assert.ok(
  profilingQuestion,
  'The Data Profiling regression question is missing.',
);
const profilingExplanation = buildEgyptianExplanation(profilingQuestion);
assert.match(profilingExplanation, /Data profiling|Column quality/i);
assert.doesNotMatch(profilingExplanation, /RLS بيخفي|sensitivity label/i);

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
  revealed.sourceExplanation.includes('ليه كل اختيار صح أو غلط') ||
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
assert.match(directAnswer, /الإجابة بعد المراجعة/);
assert.ok(revealed.answerReviewStatus);
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
          throw new Error('Simulated model unavailable.');
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
let catalogCalls = 0;
const catalogAttempts = [];
globalThis.window.puter.ai.listModels = async () => {
  catalogCalls += 1;
  return [{ id: PUTER_TUTOR_MODELS[1], aliases: [] }];
};
globalThis.window.puter.ai.chat = async (_messages, options) => {
  catalogAttempts.push(options.model);
  return { message: { content: 'Catalog-approved response' } };
};
for (let attempt = 0; attempt < 2; attempt++) {
  const response = await chatWithPuter({
    context: hidden,
    messages: [{ role: 'user', content: 'Explain this question' }],
  });
  assert.equal(response.model, PUTER_TUTOR_MODELS[1]);
}
assert.deepEqual(catalogAttempts, [
  PUTER_TUTOR_MODELS[1],
  PUTER_TUTOR_MODELS[1],
]);
assert.equal(
  catalogCalls,
  1,
  'model availability should be cached, not requested for every message',
);

assert.ok(
  PUTER_TUTOR_MODELS.every((model) => model.endsWith(':free')),
  'Never silently select a paid model',
);
for (const [error, kind] of [
  [{ error: 'popup_blocked', msg: 'blocked' }, 'popup'],
  [{ error: { code: 'insufficient_funds' } }, 'quota'],
  [{ status: 401 }, 'auth'],
  [{ code: 'auth_window_closed' }, 'cancelled'],
  [new Error('Failed to fetch'), 'network'],
]) {
  assert.equal(tutorFailureKind(error), kind);
  assert.ok(tutorFailureMessage(error, 'ar-EG').length > 10);
}
let blockedCalls = 0;
globalThis.window.puter.ai.chat = async () => {
  blockedCalls++;
  throw {
    error: { code: 'insufficient_funds', message: 'private-account-data' },
  };
};
await assert.rejects(
  chatWithPuter({
    context: hidden,
    messages: [{ role: 'user', content: 'Explain' }],
  }),
  (error) =>
    tutorFailureKind(error) === 'quota' &&
    !error.message.includes('private-account'),
);
assert.equal(
  blockedCalls,
  1,
  'Do not retry account quota errors on every model',
);

// Exercise the real timeout branches without waiting a minute in the suite.
const originalSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = (callback, delay, ...args) =>
  originalSetTimeout(
    callback,
    delay === 60_000 || delay === 25_000 ? 0 : delay,
    ...args,
  );
try {
  globalThis.window.puter.auth.signIn = () => new Promise(() => {});
  await assert.rejects(
    signInToPuter(true),
    (error) => tutorFailureKind(error) === 'auth',
  );
  puterSignedIn = true;
  let timeoutCalls = 0;
  let cancelled = false;
  globalThis.window.puter.ai.chat = (_messages, options) => {
    timeoutCalls++;
    options.signal.addEventListener('abort', () => {
      cancelled = true;
    });
    return new Promise(() => {});
  };
  await assert.rejects(
    chatWithPuter({ context: hidden, messages: [] }),
    (error) => tutorFailureKind(error) === 'timeout',
  );
  assert.equal(timeoutCalls, 1);
  assert.equal(cancelled, true);
} finally {
  globalThis.setTimeout = originalSetTimeout;
}

const sdkBeforeLoadTest = globalThis.window.puter;
globalThis.window.puter = undefined;
let scriptNode;
let insertedScripts = 0;
globalThis.document = {
  querySelector: () => scriptNode,
  createElement: () => ({
    dataset: {},
    addEventListener: () => {},
    remove: () => {
      scriptNode = undefined;
    },
  }),
  head: {
    appendChild: (node) => {
      scriptNode = node;
      insertedScripts++;
    },
  },
};
assert.equal(await ensurePuterReady(0), false);
assert.equal(scriptNode.dataset.failed, 'true');
assert.equal(await ensurePuterReady(0), false);
assert.equal(insertedScripts, 2, 'A stalled SDK tag must be replaced on retry');
delete globalThis.document;
globalThis.window.puter = sdkBeforeLoadTest;
puterSignedIn = false;
await assert.rejects(
  chatWithPuter({ context: hidden, messages: [] }),
  (error) => tutorFailureKind(error) === 'auth',
);
assert.equal(
  blockedCalls,
  1,
  'Never launch implicit auth from chat after losing the click gesture',
);

const daxQuestion = questions.find((item) => item.id === 'f1-144-143');
const daxContext = buildTutorContext({
  ...base,
  question: daxQuestion,
  checked: false,
});
assert.match(daxContext.prompt, /Original calculation:/);
assert.match(daxContext.prompt, /Qualification/);
assert.ok(daxContext.choices.every((choice) => choice.includes(':')));
assert.match(
  buildTutorSystemPrompt(daxContext, 'Explain'),
  /not image pixels you have seen/,
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
