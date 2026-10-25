import assert from 'node:assert/strict';
import {
  checkPuterConnection,
  extractPuterReply,
  tutorFailureKind,
  PUTER_TUTOR_MODELS,
} from '../lib/puter-ai.ts';

// These are explicit SDK-contract simulations. They do not prove that a real
// signed-in Puter account can infer. The user-triggered production check does.
let signedIn = false;
let calls = 0;
let outgoing;
const setup = (response) => {
  globalThis.window = {
    puter: {
      auth: { isSignedIn: () => signedIn },
      ai: {
        listModels: async () => [{ id: PUTER_TUTOR_MODELS[0] }],
        chat: async (messages, options) => {
          calls++;
          outgoing = { messages, options };
          return response;
        },
      },
    },
  };
};
setup({ message: { content: 'PL300_AI_OK' } });
let result = await checkPuterConnection();
assert.equal(result.stage, 'auth');
assert.equal(result.ok, false);
assert.equal(result.inferenceVerified, false);
assert.equal(
  calls,
  0,
  'Must not invoke implicit sign-in from a background check.',
);

signedIn = true;
result = await checkPuterConnection();
assert.equal(result.ok, true);
assert.equal(result.stage, 'complete');
assert.equal(result.inferenceVerified, true);
assert.equal(result.model, PUTER_TUTOR_MODELS[0]);
assert.equal(outgoing.options.stream, false);
assert.equal(outgoing.options.normalize, true);
assert.ok(outgoing.options.max_tokens <= 128);
assert.equal(outgoing.messages.length, 2);
assert.ok(outgoing.messages.every((m) => !m.content.includes('questionId')));
assert.ok(
  !('reply' in result),
  'Probe output itself should not enter diagnostics/history.',
);

for (const [payload, kind] of [
  [
    {
      success: false,
      error: { code: 'insufficient_funds', msg: 'PRIVATE_ACCOUNT_TOKEN' },
    },
    'quota',
  ],
  [{ error: { status: 401, message: 'PRIVATE_ACCOUNT_TOKEN' } }, 'auth'],
  [{ message: { content: [] } }, 'unavailable'],
]) {
  setup(payload);
  result = await checkPuterConnection();
  assert.equal(result.ok, false);
  assert.equal(result.inferenceVerified, false);
  assert.equal(result.failure, kind);
  assert.ok(!JSON.stringify(result).includes('PRIVATE_ACCOUNT_TOKEN'));
}

assert.equal(
  extractPuterReply({
    choices: [
      {
        message: {
          content: [
            { type: 'text', text: 'visible' },
            { type: 'thinking', text: 'not-visible' },
          ],
        },
      },
    ],
  }),
  'visible',
);
assert.equal(
  extractPuterReply({ message: { content: null, reasoning: 'never show' } }),
  '',
);
assert.throws(
  () =>
    extractPuterReply({
      success: false,
      error: { code: 'insufficient_funds' },
    }),
  (error) => tutorFailureKind(error) === 'quota',
);

setup({ message: { content: 'not used' } });
const originalSetTimeout = globalThis.setTimeout;
let aborted = false;
globalThis.window.puter.ai.chat = (_messages, options) => {
  options.signal.addEventListener('abort', () => {
    aborted = true;
  });
  return new Promise(() => {});
};
globalThis.setTimeout = (fn, ms, ...args) =>
  originalSetTimeout(fn, ms === 25_000 ? 0 : ms, ...args);
try {
  result = await checkPuterConnection();
  assert.equal(result.failure, 'timeout');
  assert.equal(result.ok, false);
  assert.equal(aborted, true);
} finally {
  globalThis.setTimeout = originalSetTimeout;
}
console.log(
  'Puter connection-check contract QA passed. Simulated responses only; real authenticated inference is not claimed.',
);
