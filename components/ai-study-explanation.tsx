'use client';

import { useEffect, useState } from 'react';
import { Bot, LoaderCircle, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  consumeDailyTutorMessage,
  readTutorSession,
  saveTutorSession,
  type TutorChatRequest,
  type TutorQuestionContext,
  type TutorSession,
} from '@/lib/ai-tutor';

const apiUrl = (process.env.NEXT_PUBLIC_AI_TUTOR_API_URL ?? '').replace(
  /\/$/,
  '',
);

export function AiStudyExplanation({
  context,
  kind,
  fallback,
}: {
  context: TutorQuestionContext;
  kind: 'simple' | 'options';
  fallback: string;
}) {
  const isArabic = context.responseLanguage === 'ar-EG';
  const tx = (english: string, arabic: string) => (isArabic ? arabic : english);
  const [text, setText] = useState(fallback);
  const [status, setStatus] = useState<'loading' | 'ai' | 'fallback'>(
    'loading',
  );

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setText(fallback);
      setStatus('loading');
      if (!apiUrl) {
        setStatus('fallback');
        return;
      }
      let session: TutorSession | null = null;
      try {
        session = readTutorSession(localStorage);
      } catch {
        setStatus('fallback');
        return;
      }
      if (!session) {
        setStatus('fallback');
        return;
      }
      try {
        const usage = consumeDailyTutorMessage(localStorage);
        if (!usage.allowed) {
          setStatus('fallback');
          return;
        }
        const prompt =
          kind === 'options'
            ? isArabic
              ? 'اشرح كل اختيار لوحده بالمصري. وضّح ليه كل اختيار غلط مش بيحقق شروط السؤال، وليه كل اختيار صح مناسب. استخدم نص الاختيار نفسه كعنوان.'
              : 'Explain every option separately. State why each wrong option fails the requirements and why each correct option fits. Use the exact option text as headings.'
            : isArabic
              ? 'شعبولي الدنيا بالمصري للمبتدئ: احكي القصة كاملة، وضّح تلميحات السؤال، خطوات التفكير، وليه الإجابة صح، والفخ المشهور في الامتحان. ماتكررّش شرح المصدر وخلاص.'
              : 'Teach this answer to a beginner in simple English. Explain the story, the clues, the reasoning steps, and the common exam trap. Do not just repeat the source explanation.';
        const request: TutorChatRequest = {
          context: resolveImages(context),
          messages: [{ role: 'user', content: prompt }],
        };
        const result = await chatWithRefresh(
          request,
          session,
          controller.signal,
        );
        if (!controller.signal.aborted) {
          setText(result.reply);
          setStatus('ai');
        }
      } catch {
        if (!controller.signal.aborted) setStatus('fallback');
      }
    }, 0);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [context, fallback, isArabic, kind]);

  return (
    <div className="rounded-xl border border-primary/20 bg-accent/35 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 font-semibold text-primary">
          <Bot className="size-4" />
          {kind === 'options'
            ? tx('Smart option analysis', 'تحليل ذكي للاختيارات')
            : tx('Beginner-friendly explanation', 'شرح للمبتدئين')}
        </span>
        <Badge variant={status === 'ai' ? 'default' : 'secondary'}>
          {status === 'loading' ? (
            <>
              <LoaderCircle className="size-3.5 animate-spin" />{' '}
              {tx('Generating', 'بيجهّز')}
            </>
          ) : status === 'ai' ? (
            <>
              <Sparkles className="size-3.5" />{' '}
              {tx('AI generated', 'مولّد بالـAI')}
            </>
          ) : (
            tx('Built-in fallback', 'شرح احتياطي مدمج')
          )}
        </Badge>
      </div>
      <p className="whitespace-pre-line text-sm leading-8">{text}</p>
      {status === 'fallback' && apiUrl && (
        <p className="mt-3 border-t pt-3 text-xs leading-5 text-muted-foreground">
          {tx(
            'Sign in once through the Practice AI Tutor to enable live AI explanations.',
            'سجّل دخول مرة من مدرس الـAI في وضع التدريب عشان تفعّل الشرح المباشر.',
          )}
        </p>
      )}
    </div>
  );
}

function resolveImages(context: TutorQuestionContext): TutorQuestionContext {
  const absolute = (value?: string) =>
    value ? new URL(value, window.location.href).toString() : undefined;
  return {
    ...context,
    imageUrl: absolute(context.imageUrl),
    answerImageUrl: absolute(context.answerImageUrl),
  };
}

async function chatWithRefresh(
  request: TutorChatRequest,
  session: TutorSession,
  signal: AbortSignal,
) {
  try {
    return await requestJson<{ reply: string }>(
      '/chat',
      request,
      session.accessToken,
      signal,
    );
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error;
    const refreshed = await requestJson<{ session: TutorSession }>(
      '/auth/refresh',
      { refreshToken: session.refreshToken },
      undefined,
      signal,
    );
    saveTutorSession(localStorage, refreshed.session);
    return requestJson<{ reply: string }>(
      '/chat',
      request,
      refreshed.session.accessToken,
      signal,
    );
  }
}

async function requestJson<T>(
  path: string,
  body: unknown,
  token: string | undefined,
  signal: AbortSignal,
): Promise<T> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });
  const result = (await response.json().catch(() => ({}))) as {
    error?: unknown;
  };
  if (!response.ok)
    throw new ApiError(
      response.status,
      typeof result.error === 'string' ? result.error : 'Service unavailable.',
    );
  return result as T;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
