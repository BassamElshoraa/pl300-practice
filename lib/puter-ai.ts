import { buildTutorSystemPrompt, type TutorChatRequest } from './ai-tutor.ts';

type PuterChat = (
  messages: Array<{ role: string; content: string }>,
  options?: Record<string, unknown>,
) => Promise<unknown>;

type PuterSdk = {
  ai?: { chat?: PuterChat };
  auth?: {
    isSignedIn?: () => boolean;
    signIn?: (options?: {
      attempt_temp_user_creation?: boolean;
      request_auth?: boolean;
    }) => Promise<unknown>;
  };
};

export const PUTER_TUTOR_MODELS = [
  'openrouter:qwen/qwen3.8-27b:free',
  'infron:deepseek/deepseek-v4-flash:free',
  'gpt-5-nano',
] as const;

export const PUTER_TUTOR_MAX_TOKENS = 750;

declare global {
  interface Window {
    puter?: PuterSdk;
  }
}

export async function ensurePuterReady(timeoutMs = 12_000) {
  if (typeof window === 'undefined') return false;
  if (window.puter?.ai?.chat) return true;

  let script = document.querySelector<HTMLScriptElement>(
    'script[data-pl300-puter]',
  );
  if (!script) {
    script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.defer = true;
    script.dataset.pl300Puter = 'true';
    document.head.appendChild(script);
  }

  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (window.puter?.ai?.chat) return true;
    await new Promise((resolve) => window.setTimeout(resolve, 80));
  }
  return false;
}

export function isPuterSignedIn() {
  try {
    return window.puter?.auth?.isSignedIn?.() === true;
  } catch {
    return false;
  }
}

export async function signInToPuter() {
  let auth = window.puter?.auth;
  if (!auth?.signIn) {
    const ready = await ensurePuterReady();
    if (!ready)
      throw new Error('Puter sign-in is not available. Refresh and try again.');
    auth = window.puter?.auth;
  }
  if (!auth?.signIn)
    throw new Error('Puter sign-in is not available. Refresh and try again.');
  if (auth.isSignedIn?.()) return true;
  await auth.signIn({ attempt_temp_user_creation: true });
  return auth.isSignedIn?.() === true;
}

export async function chatWithPuter(request: TutorChatRequest) {
  const ready = await ensurePuterReady();
  const ai = window.puter?.ai;
  const chat = ai?.chat?.bind(ai);
  if (!ready || !chat)
    throw new Error(
      request.context.responseLanguage === 'ar-EG'
        ? 'خدمة الـAI لسه ما اتحمّلتش. اعمل Refresh وجرّب تاني.'
        : 'The AI service did not load. Refresh the page and try again.',
    );

  const latestUserMessage =
    [...request.messages].reverse().find((message) => message.role === 'user')
      ?.content ?? '';
  const systemPrompt = buildTutorSystemPrompt(
    request.context,
    latestUserMessage,
  );
  const messages = [
    { role: 'system', content: systemPrompt },
    ...request.messages,
  ];
  let lastError: unknown;

  for (const model of PUTER_TUTOR_MODELS) {
    try {
      const response = await withTimeout(
        chat(messages, {
          model,
          max_tokens: PUTER_TUTOR_MAX_TOKENS,
          temperature: 0.35,
          normalize: true,
        }),
        25_000,
        request.context.responseLanguage,
      );
      const reply = extractPuterReply(response);
      if (reply) return { reply, model };
      lastError = new Error(`The ${model} model returned an empty reply.`);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    request.context.responseLanguage === 'ar-EG'
      ? 'الموديلات المجانية مش متاحة دلوقتي. استنى دقيقة وجرّب تاني.'
      : 'The free AI models are temporarily unavailable. Wait a minute and try again.',
    { cause: lastError },
  );
}

function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  language: 'ar-EG' | 'en',
) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () =>
        reject(
          new Error(
            language === 'ar-EG'
              ? 'الرد أخد وقت أطول من المتوقع. جرّب تاني.'
              : 'The reply took too long. Please try again.',
          ),
        ),
      timeoutMs,
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function extractPuterReply(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (!isRecord(value)) return '';
  if (typeof value.text === 'string') return value.text.trim();
  if (isRecord(value.message)) {
    const content = value.message.content;
    if (typeof content === 'string') return content.trim();
    if (Array.isArray(content))
      return content
        .filter(isRecord)
        .map((block) =>
          typeof block.text === 'string' ? block.text.trim() : '',
        )
        .filter(Boolean)
        .join('\n\n');
  }
  if (Array.isArray(value.choices)) {
    const first = value.choices[0];
    if (isRecord(first) && isRecord(first.message)) {
      const content = first.message.content;
      if (typeof content === 'string') return content.trim();
    }
  }
  return '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
