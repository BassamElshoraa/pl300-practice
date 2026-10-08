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
import { trackAnalyticsEvent } from '@/lib/analytics';
import {
  chatWithPuter,
  ensurePuterReady,
  isPuterSignedIn,
} from '@/lib/puter-ai';

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
  kind: 'simple' | 'options' | 'shaabouly';
  fallback: string;
}) {
  const isArabic = context.responseLanguage === 'ar-EG';
  const tx = (english: string, arabic: string) => (isArabic ? arabic : english);
  const [text, setText] = useState(fallback);
  const [status, setStatus] = useState<
    'loading' | 'ai' | 'cached' | 'fallback'
  >('loading');

  useEffect(() => {
    trackAnalyticsEvent('pl300_ai_explanation_requested', {
      explanation_kind: kind,
      language: context.responseLanguage,
    });
  }, [context.questionId, context.responseLanguage, kind]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setText(fallback);
      setStatus('loading');
      const cacheKey = explanationCacheKey(context, kind);
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setText(cached);
          setStatus('cached');
          return;
        }
      } catch {
        // Storage can be unavailable in private browsing; generation still works.
      }
      const prompt = buildStudyPrompt(kind, isArabic);
      const request: TutorChatRequest = {
        context: resolveImages(context),
        messages: [{ role: 'user', content: prompt }],
      };
      let session: TutorSession | null = null;
      try {
        session = readTutorSession(localStorage);
      } catch {
        session = null;
      }
      try {
        let result: { reply: string } | null = null;
        if (apiUrl && session) {
          const usage = consumeDailyTutorMessage(localStorage);
          if (usage.allowed) {
            try {
              result = await chatWithRefresh(
                request,
                session,
                controller.signal,
              );
            } catch {
              result = null;
            }
          }
        }
        if (!result) {
          const ready = await ensurePuterReady(5000);
          if (ready && isPuterSignedIn()) result = await chatWithPuter(request);
        }
        if (!result) {
          setStatus('fallback');
          return;
        }
        if (!controller.signal.aborted) {
          setText(result.reply);
          setStatus('ai');
          try {
            localStorage.setItem(cacheKey, result.reply);
          } catch {
            // The explanation remains available for this view even without cache.
          }
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
            : kind === 'shaabouly'
              ? tx('Complete study guide', 'الترجمة والشرح الكامل')
              : tx('Beginner-friendly explanation', 'شرح للمبتدئين')}
        </span>
        <Badge variant={status === 'ai' ? 'default' : 'secondary'}>
          {status === 'loading' ? (
            <>
              <LoaderCircle className="size-3.5 animate-spin" />{' '}
              {tx('Generating', 'بيجهّز')}
            </>
          ) : status === 'ai' || status === 'cached' ? (
            <>
              <Sparkles className="size-3.5" />{' '}
              {status === 'cached'
                ? tx('Saved explanation', 'شرح محفوظ')
                : tx('AI generated', 'مولّد بالـAI')}
            </>
          ) : (
            tx('Built-in fallback', 'شرح احتياطي مدمج')
          )}
        </Badge>
      </div>
      {kind === 'shaabouly' ? (
        <StructuredExplanation text={text} isArabic={isArabic} />
      ) : (
        <p className="whitespace-pre-line text-sm leading-8">{text}</p>
      )}
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

function buildStudyPrompt(
  kind: 'simple' | 'options' | 'shaabouly',
  isArabic: boolean,
) {
  if (kind === 'shaabouly')
    return isArabic
      ? `اكتب شرحًا تعليميًا تفصيليًا بالمصري للمبتدئ عن السؤال الحالي. لازم تستخدم العناوين التالية حرفيًا وبنفس الترتيب، وكل عنوان يبدأ في سطر مستقل:
ترجمة السؤال بالعربي
القصة والمعنى
المطلوب منك
المصطلحات المهمة
طريقة التفكير خطوة بخطوة
الإجابة الصحيحة وليه
ليه كل اختيار صح أو غلط
فخ الامتحان
الخلاصة اللي تتحفظ
مراجع المراجعة

ترجم نص السؤال والاختيارات ترجمة عربية كاملة وواضحة من غير ما تسقط أي شرط أو رقم. بعد الترجمة اشرح السيناريو كأن الطالب أول مرة يدرس Power BI. حلّل كل اختيار بالنص، وحدد بدقة ليه يحقق أو لا يحقق شروط السؤال. لو السؤال Answer Area أو Hotspot أو Drag and Drop، اشرح كل خانة أو خطوة وترتيبها. لو حالة مراجعة الإجابة source-key فقط، سمّها «إجابة المصدر» ولا تدّعي أنها موثقة مستقلًا. لو الحالة corrected أو flawed-source أو outdated، اتبع المراجعة المستقلة واشرح خطأ مفتاح الدامب أو سبب اعتبار المصطلح قديمًا. في المراجع استخدم فقط روابط المراجعة المرسلة في سياق السؤال، ولو مش موجودة اكتب «لا توجد مراجع مستقلة مرفقة بعد». لا تكتب مقدمة أو خاتمة خارج العناوين.`
      : `Write a complete beginner-friendly teaching guide for the current question. Use these exact headings, each on its own line, in this order:
Plain-English question
Scenario and meaning
What you must decide
Key terms
Step-by-step reasoning
Correct answer and why
Why every option is right or wrong
Exam trap
Memory takeaway
Review sources

Restate every condition and number. Analyze every option by its exact text. For Answer Area, Hotspot, or Drag and Drop items, explain every box or ordered step. If the answer status is source-key, call it the source answer and do not claim independent verification. If it is corrected, flawed-source, or outdated, follow the independent review and explain why the dump key was wrong or why the product term is legacy. Use only supplied review evidence URLs; otherwise state that no independent references are attached yet. Do not add text outside these headings.`;
  if (kind === 'options')
    return isArabic
      ? 'اشرح كل اختيار لوحده بالمصري. وضّح ليه كل اختيار غلط مش بيحقق شروط السؤال، وليه كل اختيار صح مناسب. استخدم نص الاختيار نفسه كعنوان.'
      : 'Explain every option separately. State why each wrong option fails the requirements and why each correct option fits. Use the exact option text as headings.';
  return isArabic
    ? 'شعبولي الدنيا بالمصري للمبتدئ: احكي القصة كاملة، وضّح تلميحات السؤال، خطوات التفكير، وليه الإجابة صح، والفخ المشهور في الامتحان. ماتكررّش شرح المصدر وخلاص.'
    : 'Teach this answer to a beginner in simple English. Explain the story, the clues, the reasoning steps, and the common exam trap. Do not just repeat the source explanation.';
}

function explanationCacheKey(
  context: TutorQuestionContext,
  kind: 'simple' | 'options' | 'shaabouly',
) {
  const review = context.answerReviewStatus ?? 'source-key';
  return `pl300-study-v3:${kind}:${context.questionId}:${context.responseLanguage}:${review}`;
}

function StructuredExplanation({
  text,
  isArabic,
}: {
  text: string;
  isArabic: boolean;
}) {
  const sections = parseSections(text, isArabic);
  if (sections.length <= 1)
    return <p className="whitespace-pre-line text-sm leading-8">{text}</p>;

  const tones = [
    'border-emerald-500/25 bg-emerald-500/5',
    'border-amber-500/25 bg-amber-500/5',
    'border-sky-500/25 bg-sky-500/5',
    'border-violet-500/25 bg-violet-500/5',
    'border-primary/25 bg-primary/5',
    'border-emerald-500/25 bg-emerald-500/5',
    'border-rose-500/25 bg-rose-500/5',
    'border-amber-500/25 bg-amber-500/5',
    'border-slate-500/20 bg-muted/35',
  ];

  return (
    <div className="grid gap-3">
      {sections.map((section, index) => (
        <section
          key={`${section.title}-${index}`}
          className={`rounded-lg border p-4 ${tones[index % tones.length]}`}
        >
          <h4 className="mb-2 text-sm font-bold text-foreground">
            {section.title}
          </h4>
          <p className="whitespace-pre-line text-sm leading-8 text-foreground/90">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  );
}

function parseSections(text: string, isArabic: boolean) {
  const headings = isArabic
    ? [
        'ترجمة السؤال بالعربي',
        'القصة والمعنى',
        'المطلوب منك',
        'المصطلحات المهمة',
        'طريقة التفكير خطوة بخطوة',
        'الإجابة الصحيحة وليه',
        'ليه كل اختيار صح أو غلط',
        'فخ الامتحان',
        'الخلاصة اللي تتحفظ',
        'مراجع المراجعة',
      ]
    : [
        'Plain-English question',
        'Scenario and meaning',
        'What you must decide',
        'Key terms',
        'Step-by-step reasoning',
        'Correct answer and why',
        'Why every option is right or wrong',
        'Exam trap',
        'Memory takeaway',
        'Review sources',
      ];
  const headingMap = new Map(
    headings.map((heading) => [normalizeHeading(heading), heading]),
  );
  const sections: Array<{ title: string; body: string }> = [];
  let current: { title: string; lines: string[] } | null = null;

  for (const rawLine of text.replace(/\r/g, '').split('\n')) {
    const normalized = normalizeHeading(rawLine);
    const title = headingMap.get(normalized);
    if (title) {
      if (current)
        sections.push({
          title: current.title,
          body: current.lines.join('\n').trim(),
        });
      current = { title, lines: [] };
    } else if (current) {
      current.lines.push(rawLine);
    }
  }
  if (current)
    sections.push({
      title: current.title,
      body: current.lines.join('\n').trim(),
    });
  return sections.filter((section) => section.body);
}

function normalizeHeading(value: string) {
  return value
    .replace(/^\s{0,3}#{1,6}\s*/, '')
    .replace(/^\s*[*_-]+\s*/, '')
    .replace(/[：:]\s*$/, '')
    .trim()
    .toLowerCase();
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
