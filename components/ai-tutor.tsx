'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Lightbulb,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  LogOut,
  Send,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import {
  AI_TUTOR_DAILY_LIMIT,
  buildLocalTutorReply,
  getTutorQuickPrompts,
  getTutorStarterMessage,
  readTutorSession,
  saveTutorSession,
  consumeDailyTutorMessage,
  type TutorChatRequest,
  type TutorMessage,
  type TutorQuestionContext,
  type TutorSession,
} from '@/lib/ai-tutor';

const apiUrl = (process.env.NEXT_PUBLIC_AI_TUTOR_API_URL ?? '').replace(
  /\/$/,
  '',
);

type AuthMode = 'signin' | 'signup';

export function AiTutor({
  context,
  learnerName,
}: {
  context: TutorQuestionContext;
  learnerName: string;
}) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<TutorSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [remaining, setRemaining] = useState(AI_TUTOR_DAILY_LIMIT);
  const isArabic = context.responseLanguage === 'ar-EG';
  const tx = (english: string, arabic: string) => (isArabic ? arabic : english);
  const [messages, setMessages] = useState<TutorMessage[]>([
    assistantMessage(
      getTutorStarterMessage(context.checked, context.responseLanguage),
    ),
  ]);
  const chatEnd = useRef<HTMLDivElement>(null);
  const checkedRef = useRef(context.checked);
  const languageRef = useRef(context.responseLanguage);
  const connected = Boolean(apiUrl);
  const canChat = !connected || Boolean(session);
  const quickPrompts = useMemo(
    () => getTutorQuickPrompts(context.checked, context.responseLanguage),
    [context.checked, context.responseLanguage],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setSession(readTutorSession(localStorage));
        const usage = JSON.parse(
          localStorage.getItem('pl300-ai-tutor-daily-usage') ?? '{}',
        ) as { day?: unknown; count?: unknown };
        const today = new Date().toISOString().slice(0, 10);
        if (usage.day === today && Number.isFinite(usage.count))
          setRemaining(Math.max(0, AI_TUTOR_DAILY_LIMIT - Number(usage.count)));
      } catch {
        // The tutor can still work for this tab if browser storage is blocked.
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (checkedRef.current || !context.checked) return;
    checkedRef.current = true;
    const timer = window.setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        assistantMessage(
          context.responseLanguage === 'ar-EG'
            ? 'تمام، النتيجة ظهرت دلوقتي والإجابة المعتمدة بقت متاحة ليا. اسألني عن سبب الصح والغلط أو أي اختيار مش واضح.'
            : 'Your result is available now, so I can use the verified answer. Ask me why it is right or wrong, or about any unclear choice.',
        ),
      ]);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [context.checked, context.responseLanguage]);

  useEffect(() => {
    if (languageRef.current === context.responseLanguage) return;
    languageRef.current = context.responseLanguage;
    const timer = window.setTimeout(() => {
      setMessages((previous) => {
        if (previous.some((message) => message.role === 'user'))
          return previous;
        const translated = [
          assistantMessage(
            getTutorStarterMessage(context.checked, context.responseLanguage),
          ),
        ];
        if (context.checked) {
          translated.push(
            assistantMessage(
              context.responseLanguage === 'ar-EG'
                ? 'تمام، النتيجة ظهرت دلوقتي والإجابة المعتمدة بقت متاحة ليا. اسألني عن سبب الصح والغلط أو أي اختيار مش واضح.'
                : 'Your result is available now, so I can use the verified answer. Ask me why it is right or wrong, or about any unclear choice.',
            ),
          );
        }
        return translated;
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [context.checked, context.responseLanguage]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(
      () => chatEnd.current?.scrollIntoView({ behavior: 'smooth' }),
      0,
    );
    return () => window.clearTimeout(timer);
  }, [messages, open, sending]);

  async function authenticate() {
    const cleanEmail = email.trim().toLowerCase();
    setAuthError('');
    if (!cleanEmail || password.length < 8) {
      setAuthError(
        tx(
          'Enter a valid email and a password of at least 8 characters.',
          'اكتب بريد صحيح وكلمة مرور من 8 حروف على الأقل.',
        ),
      );
      return;
    }
    setAuthBusy(true);
    try {
      const result = await requestJson<{
        session?: TutorSession;
        verificationRequired?: boolean;
        message?: string;
      }>(`/auth/${authMode}`, {
        method: 'POST',
        body: JSON.stringify({
          email: cleanEmail,
          password,
          name: learnerName,
        }),
      });
      if (result.session) {
        setSession(result.session);
        saveTutorSession(localStorage, result.session);
        setPassword('');
      } else if (result.verificationRequired) {
        setAuthError(
          result.message ??
            tx(
              'Check your email, confirm the account, then return to sign in.',
              'راجع بريدك واضغط رابط التأكيد، وبعدها ارجع وسجّل الدخول.',
            ),
        );
        setAuthMode('signin');
      } else {
        setAuthError(
          result.message ??
            tx(
              'Sign-in failed. Please try again.',
              'تعذر تسجيل الدخول. حاول مرة أخرى.',
            ),
        );
      }
    } catch (error) {
      setAuthError(readError(error));
    } finally {
      setAuthBusy(false);
    }
  }

  function signOut() {
    setSession(null);
    saveTutorSession(localStorage, null);
    setMessages([
      assistantMessage(
        getTutorStarterMessage(context.checked, context.responseLanguage),
      ),
    ]);
  }

  async function sendMessage(text = input) {
    const clean = text.trim().slice(0, 1000);
    if (!clean || sending || !canChat) return;
    let usage = { allowed: true, remaining };
    try {
      usage = consumeDailyTutorMessage(localStorage);
    } catch {
      // A blocked storage API should not make the learning surface unusable.
    }
    setRemaining(usage.remaining);
    if (!usage.allowed) {
      setMessages((previous) => [
        ...previous,
        assistantMessage(
          tx(
            'You reached today’s free limit. Continue tomorrow; the built-in source explanation remains available.',
            'وصلت للحد اليومي حفاظًا على الخدمة المجانية. تقدر تكمل بكرة، والشرح الأساسي في الصفحة شغال عادي.',
          ),
        ),
      ]);
      return;
    }

    const user = userMessage(clean);
    const history = [...messages, user].slice(-10);
    setMessages(history);
    setInput('');
    setSending(true);
    try {
      let reply: string;
      if (!connected) {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
        reply = buildLocalTutorReply(context, clean);
      } else if (session) {
        const request: TutorChatRequest = {
          context: resolveImageUrls(context),
          messages: history.map(({ role, content }) => ({ role, content })),
        };
        const result = await chatWithRefresh(request, session, setSession);
        reply = result.reply;
      } else {
        return;
      }
      setMessages((previous) => [...previous, assistantMessage(reply)]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        assistantMessage(
          tx(
            `Connection problem: ${readError(error)} Please try again in a moment.`,
            `حصلت مشكلة في الاتصال: ${readError(error)} جرّب تاني بعد لحظة.`,
          ),
        ),
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        size="lg"
        className={`group fixed bottom-4 z-40 h-14 rounded-full border border-white/20 bg-[#172033] px-3 pr-5 text-white shadow-[0_16px_40px_rgba(23,32,51,0.28)] hover:bg-[#22304a] sm:bottom-6 ${isArabic ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}
        onClick={() => setOpen(true)}
        aria-label={tx(
          'Open AI tutor for the current question',
          'افتح مدرس الذكاء الاصطناعي للسؤال الحالي',
        )}
      >
        <TutorOrb compact />
        <span>{tx('Ask AI Tutor', 'اسأل مدرس الـAI')}</span>
        <Sparkles className="size-4 text-[#f2c811] transition-transform group-hover:rotate-12" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className="w-full! gap-0 sm:max-w-[480px]"
          side={isArabic ? 'left' : 'right'}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <SheetHeader className="border-b px-5 py-4">
            <div
              className={`flex items-center gap-3 ${isArabic ? 'pl-10' : 'pr-10'}`}
            >
              <TutorOrb />
              <div className="min-w-0">
                <SheetTitle className="flex flex-wrap items-center gap-2 text-lg">
                  PL-300 AI Tutor
                  <Badge variant={connected ? 'default' : 'secondary'}>
                    {connected
                      ? tx('Connected', 'متصل')
                      : tx('Local demo', 'تجربة محلية')}
                  </Badge>
                </SheetTitle>
                <SheetDescription className="mt-1 truncate">
                  {context.sourceLabel} · {context.topic}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {!hydrated ? (
            <div className="grid flex-1 place-items-center">
              <LoaderCircle className="size-7 animate-spin text-primary" />
            </div>
          ) : connected && !session ? (
            <div
              className="flex-1 overflow-y-auto p-5"
              lang={isArabic ? 'ar-EG' : 'en'}
            >
              <div className="rounded-sm border border-primary/25 bg-accent/45 p-5">
                <div className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                  <LockKeyhole className="size-5" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">
                  {authMode === 'signin'
                    ? tx('Sign in', 'سجّل دخولك')
                    : tx('Create a free account', 'اعمل حساب مجاني')}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {tx(
                    'An account protects the shared service from excessive use. Your chat transcript is not stored on your account.',
                    'الحساب بيحمينا من الاستخدام الزائد. المحادثة نفسها لا يتم حفظها على حسابك.',
                  )}
                </p>
                <div className="mt-5 space-y-3">
                  <LabelledInput
                    label={tx('Email', 'البريد الإلكتروني')}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                  />
                  <LabelledInput
                    label={tx('Password', 'كلمة المرور')}
                    type="password"
                    value={password}
                    onChange={setPassword}
                    autoComplete={
                      authMode === 'signin'
                        ? 'current-password'
                        : 'new-password'
                    }
                  />
                </div>
                {authError && (
                  <output className="mt-3 block text-sm leading-6 text-destructive">
                    {authError}
                  </output>
                )}
                <Button
                  className="mt-5 w-full"
                  size="lg"
                  disabled={authBusy}
                  onClick={authenticate}
                >
                  {authBusy ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <LogIn className="size-4" />
                  )}
                  {authMode === 'signin'
                    ? tx('Sign in and start', 'دخول وابدأ الشرح')
                    : tx('Create account', 'إنشاء الحساب')}
                </Button>
                <Button
                  className="mt-2 w-full"
                  variant="ghost"
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setAuthError('');
                  }}
                >
                  {authMode === 'signin'
                    ? tx('New here? Create an account', 'أول مرة؟ اعمل حساب')
                    : tx('Already registered? Sign in', 'عندك حساب؟ سجّل دخول')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex items-center justify-between gap-3 border-b bg-muted/35 px-5 py-2.5 text-xs">
                <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                  {session ? (
                    <>
                      <UserRound className="size-3.5 shrink-0" />
                      <span className="truncate">{session.email}</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="size-3.5" />{' '}
                      {tx('Preview without cloud AI', 'تجربة بدون AI سحابي')}
                    </>
                  )}
                </span>
                {session && (
                  <Button variant="ghost" size="xs" onClick={signOut}>
                    <LogOut className="size-3.5" />{' '}
                    {tx('Sign out', 'تسجيل الخروج')}
                  </Button>
                )}
              </div>

              <div
                className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
                dir="auto"
                aria-live="polite"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-primary">
                        <Bot className="size-4" />
                      </span>
                    )}
                    <p
                      className={`max-w-[84%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === 'user' ? 'rounded-br-sm bg-primary text-primary-foreground' : 'rounded-bl-sm border bg-card'}`}
                    >
                      {message.content}
                    </p>
                  </div>
                ))}
                {sending && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="grid size-8 place-items-center rounded-full bg-accent text-primary">
                      <Bot className="size-4" />
                    </span>
                    <LoaderCircle className="size-4 animate-spin" />{' '}
                    {tx('Preparing your explanation…', 'بيحضّر الشرح…')}
                  </div>
                )}
                <div ref={chatEnd} />
              </div>

              <div className="border-t bg-card p-4">
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                  {quickPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-full"
                      disabled={sending || remaining === 0}
                      onClick={() => sendMessage(prompt)}
                    >
                      {context.checked ? (
                        <CheckCircle2 className="size-3.5" />
                      ) : (
                        <Lightbulb className="size-3.5" />
                      )}
                      {prompt}
                    </Button>
                  ))}
                </div>
                <div className="flex items-end gap-2">
                  <Textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    maxLength={1000}
                    rows={2}
                    placeholder={tx(
                      'Ask about the current question…',
                      'اسأل عن السؤال الحالي…',
                    )}
                    className="min-h-11 resize-none"
                    aria-label={tx('Message the AI tutor', 'اكتب للمدرس الذكي')}
                  />
                  <Button
                    size="icon"
                    className="size-11 shrink-0"
                    disabled={!input.trim() || sending || remaining === 0}
                    onClick={() => sendMessage()}
                    aria-label={tx('Send message', 'إرسال الرسالة')}
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {tx(
                    `${remaining} messages left today · AI can make mistakes`,
                    `متبقي ${remaining} رسالة اليوم · الـAI ممكن يغلط`,
                  )}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

function TutorOrb({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`study-orb relative grid shrink-0 place-items-center rounded-2xl text-white ${compact ? 'size-10' : 'size-11'}`}
      aria-hidden="true"
    >
      <BrainCircuit className={compact ? 'size-5' : 'size-6'} />
      <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-white bg-emerald-400" />
    </span>
  );
}

function resolveImageUrls(context: TutorQuestionContext): TutorQuestionContext {
  const absolute = (value?: string) =>
    value ? new URL(value, window.location.href).toString() : undefined;
  return {
    ...context,
    imageUrl: absolute(context.imageUrl),
    answerImageUrl: absolute(context.answerImageUrl),
  };
}

function LabelledInput({
  label,
  type,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type: 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
}) {
  const id = `ai-tutor-${type}`;
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <Input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        dir="ltr"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

async function chatWithRefresh(
  request: TutorChatRequest,
  session: TutorSession,
  setSession: (session: TutorSession | null) => void,
) {
  try {
    return await requestJson<{ reply: string }>('/chat', {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: JSON.stringify(request),
    });
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error;
    const refreshed = await requestJson<{ session: TutorSession }>(
      '/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken: session.refreshToken }),
      },
    );
    setSession(refreshed.session);
    saveTutorSession(localStorage, refreshed.session);
    return requestJson<{ reply: string }>('/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshed.session.accessToken}`,
      },
      body: JSON.stringify(request),
    });
  }
}

async function requestJson<T>(path: string, init: RequestInit): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers,
  });
  const body = (await response.json().catch(() => ({}))) as {
    error?: unknown;
  };
  if (!response.ok)
    throw new ApiError(
      response.status,
      typeof body.error === 'string'
        ? body.error
        : 'The service is unavailable.',
    );
  return body as T;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function readError(error: unknown) {
  return error instanceof Error ? error.message : 'خطأ غير متوقع.';
}

function assistantMessage(content: string): TutorMessage {
  return { id: messageId(), role: 'assistant', content };
}

function userMessage(content: string): TutorMessage {
  return { id: messageId(), role: 'user', content };
}

function messageId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
    return crypto.randomUUID();
  return `message-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
