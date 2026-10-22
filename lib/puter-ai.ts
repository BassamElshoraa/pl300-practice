import { buildTutorSystemPrompt, type TutorChatRequest } from './ai-tutor.ts';

type PuterChat = (
  messages: Array<{ role: string; content: string }>,
  options?: Record<string, unknown>,
) => Promise<unknown>;

type PuterSdk = {
  ai?: { chat?: PuterChat; listModels?: () => Promise<unknown> };
  auth?: {
    isSignedIn?: () => boolean;
    signIn?: (options?: {
      attempt_temp_user_creation?: boolean;
      request_auth?: boolean;
    }) => Promise<unknown>;
  };
};

export const PUTER_TUTOR_MODELS = [
  'infron:deepseek/deepseek-v4.1-flash:free',
  'infron:apodex/apodex-1.1-mini:free',
  'infron:inclusionai/ling-3.1-flash:free',
] as const;

export type TutorFailureKind =
  | 'auth'
  | 'popup'
  | 'cancelled'
  | 'quota'
  | 'network'
  | 'timeout'
  | 'unavailable';

export class TutorProviderError extends Error {
  kind: TutorFailureKind;
  constructor(kind: TutorFailureKind) {
    super(kind);
    this.kind = kind;
    this.name = 'TutorProviderError';
  }
}

// Providers reject with plain objects as well as Error instances. Never render
// their raw payload: it may contain account details, request URLs or tokens.
export function tutorFailureKind(error: unknown): TutorFailureKind {
  if (error instanceof TutorProviderError) return error.kind;
  const values: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < 4 && current; depth++) {
    if (typeof current === 'string') {
      values.push(current);
      break;
    }
    if (typeof current !== 'object') break;
    const item = current as Record<string, unknown>;
    for (const key of ['code', 'error', 'message', 'msg', 'status']) {
      if (typeof item[key] === 'string' || typeof item[key] === 'number')
        values.push(String(item[key]));
    }
    current =
      item.error && typeof item.error === 'object' ? item.error : item.cause;
  }
  const detail = values.join(' ').toLowerCase();
  if (/popup_blocked/.test(detail)) return 'popup';
  if (/auth_window_closed|cancelled|canceled/.test(detail)) return 'cancelled';
  if (
    /401|403|unauth|invalid.token|token.expired|sign.in|login|permission/.test(
      detail,
    )
  )
    return 'auth';
  if (
    /429|quota|rate.limit|insufficient|funds|credit|allowance|usage.limit/.test(
      detail,
    )
  )
    return 'quota';
  if (/timeout|timed.out|took.too.long|أطول/.test(detail)) return 'timeout';
  if (/network|fetch|offline|connection/.test(detail)) return 'network';
  return 'unavailable';
}

export function tutorFailureMessage(error: unknown, language: 'ar-EG' | 'en') {
  const messages: Record<TutorFailureKind, [string, string]> = {
    auth: [
      'Your Puter session needs reconnecting. Use Reconnect AI.',
      'جلسة Puter محتاجة تتوصل تاني. اضغط إعادة توصيل الـAI.',
    ],
    popup: [
      'Edge blocked the sign-in window. Allow pop-ups for this site, then reconnect.',
      'إيدج منع نافذة الدخول. اسمح بالنوافذ المنبثقة للموقع واضغط توصيل تاني.',
    ],
    cancelled: [
      'Sign-in was cancelled. Reconnect when ready.',
      'نافذة الدخول اتقفلت قبل ما تكمّل. اضغط توصيل لما تكون جاهز.',
    ],
    quota: [
      'Puter reports a usage or rate limit. Wait and retry, or use built-in guidance. No paid model was selected by this site.',
      'Puter أبلغ إن فيه حد استخدام أو طلبات. استنى وجرّب تاني أو استخدم الشرح المدمج. الموقع ما اختارش موديل مدفوع.',
    ],
    network: [
      'Check your internet connection and retry. Built-in guidance works offline.',
      'راجع اتصال الإنترنت وجرّب تاني. الشرح المدمج بيشتغل أوفلاين.',
    ],
    timeout: [
      'The provider did not reply in time. The request was cancelled; retry when ready.',
      'الخدمة ما ردتش في الوقت المحدد. بعتنا طلب إلغاء؛ تقدر تحاول تاني.',
    ],
    unavailable: [
      'The configured AI models are unavailable right now. Retry or use built-in guidance.',
      'موديلات الـAI المحددة مش متاحة دلوقتي. جرّب تاني أو استخدم الشرح المدمج.',
    ],
  };
  return messages[tutorFailureKind(error)][language === 'ar-EG' ? 1 : 0];
}

let catalogCache: { expiresAt: number; models: string[] } | undefined;

/** Availability changes independently of this website. Keep curated priorities,
 * but do not spend a chat timeout on a model absent from the provider catalog.
 * An unavailable catalog is not evidence that all models are unavailable. */
async function availableTutorModels(ai: NonNullable<PuterSdk['ai']>) {
  if (!ai.listModels) return [...PUTER_TUTOR_MODELS];
  if (catalogCache && catalogCache.expiresAt > Date.now())
    return catalogCache.models;
  try {
    const result = await withTimeout(ai.listModels(), 4000, 'en');
    const models = Array.isArray(result)
      ? result
      : isRecord(result) && Array.isArray(result.models)
        ? result.models
        : [];
    if (!models.length) return [...PUTER_TUTOR_MODELS];
    const names = new Set(
      models.flatMap((model) =>
        typeof model === 'string'
          ? [model]
          : isRecord(model)
            ? [
                model.id,
                ...(Array.isArray(model.aliases) ? model.aliases : []),
              ].filter((name): name is string => typeof name === 'string')
            : [],
      ),
    );
    const available = PUTER_TUTOR_MODELS.filter((model) => names.has(model));
    if (!available.length)
      throw Error(
        'No configured tutor model is currently listed by the provider.',
      );
    catalogCache = { expiresAt: Date.now() + 300_000, models: available };
    return available;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith('No configured tutor model')
    )
      throw error;
    return [...PUTER_TUTOR_MODELS];
  }
}

export const PUTER_TUTOR_MAX_TOKENS = 1600;

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
  if (script?.dataset.failed === 'true') {
    script.remove();
    script = null;
  }
  if (!script) {
    script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.defer = true;
    script.dataset.pl300Puter = 'true';
    script.addEventListener(
      'error',
      () => {
        script!.dataset.failed = 'true';
      },
      { once: true },
    );
    document.head.appendChild(script);
  }

  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (window.puter?.ai?.chat) return true;
    if (script.dataset.failed === 'true') return false;
    await new Promise((resolve) => window.setTimeout(resolve, 80));
  }
  script.dataset.failed = 'true';
  return false;
}

export function isPuterSignedIn() {
  try {
    return window.puter?.auth?.isSignedIn?.() === true;
  } catch {
    return false;
  }
}

export async function signInToPuter(reconnect = false) {
  const auth = window.puter?.auth;
  if (!auth?.signIn) {
    const ready = await ensurePuterReady();
    if (!ready)
      throw new Error('Puter sign-in is not available. Refresh and try again.');
    // Loading the SDK consumes the original click's popup permission. Require
    // another explicit click instead of silently opening a blocked popup.
    throw new TutorProviderError('auth');
  }
  if (!auth?.signIn)
    throw new Error('Puter sign-in is not available. Refresh and try again.');
  if (auth.isSignedIn?.() && !reconnect) return true;
  try {
    await withTimeout(
      auth.signIn({
        attempt_temp_user_creation: true,
        ...(reconnect ? { request_auth: true } : {}),
      }),
      60_000,
      'en',
    );
  } catch (error) {
    // A closed/blocked popup may never settle in some browser environments.
    // The user can still complete a late sign-in; the UI rechecks on focus.
    if (tutorFailureKind(error) === 'timeout')
      throw new TutorProviderError('auth');
    throw error;
  }
  return auth.isSignedIn?.() === true;
}

export async function chatWithPuter(request: TutorChatRequest) {
  if (!isPuterSignedIn()) throw new TutorProviderError('auth');
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

  for (const model of await availableTutorModels(ai!)) {
    const controller = new AbortController();
    try {
      const response = await withTimeout(
        chat(messages, {
          model,
          max_tokens: PUTER_TUTOR_MAX_TOKENS,
          temperature: 0.35,
          normalize: true,
          signal: controller.signal,
        }),
        25_000,
        request.context.responseLanguage,
        () => controller.abort(),
      );
      const reply = extractPuterReply(response);
      if (reply) return { reply, model };
      lastError = new Error(`The ${model} model returned an empty reply.`);
    } catch (error) {
      lastError = error;
      const kind = tutorFailureKind(error);
      // Retrying the same account on another provider cannot fix auth/limits.
      // A timed-out request may already have run: do not duplicate it silently.
      if (['auth', 'quota', 'network', 'timeout'].includes(kind))
        throw new TutorProviderError(kind);
    }
  }

  throw new TutorProviderError(tutorFailureKind(lastError));
}

function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  language: 'ar-EG' | 'en',
  onTimeout?: () => void,
) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      onTimeout?.();
      reject(
        new Error(
          language === 'ar-EG'
            ? 'الرد أخد وقت أطول من المتوقع. جرّب تاني.'
            : 'The reply took too long. Please try again.',
        ),
      );
    }, timeoutMs);
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
