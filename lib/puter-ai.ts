import { buildTutorSystemPrompt, type TutorChatRequest } from './ai-tutor.ts';

type PuterChat = (
  messages: Array<{ role: string; content: string }>,
  options?: Record<string, unknown>,
) => Promise<unknown>;

type PuterSdk = {
  ai?: { chat?: PuterChat };
};

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
  const response = await chat([
    { role: 'system', content: systemPrompt },
    ...request.messages,
  ]);
  const reply = extractPuterReply(response);
  if (!reply)
    throw new Error(
      request.context.responseLanguage === 'ar-EG'
        ? 'الـAI رجّع رد فاضي. جرّب تبعت السؤال تاني.'
        : 'The AI returned an empty reply. Please send the message again.',
    );
  return { reply };
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
