'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FilePlus2,
  GraduationCap,
  KeyRound,
  Languages,
  LayoutDashboard,
  ListChecks,
  Loader2,
  LockKeyhole,
  LogOut,
  Moon,
  Play,
  RotateCcw,
  ShieldCheck,
  Sun,
  UserPlus,
  Users,
} from 'lucide-react';
import { ManagedExamPlayer } from '@/components/managed-exams-platform';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/i18n';
import {
  bootstrapManagedAdmin,
  createManagedApiExam,
  getManagedToken,
  loadManagedApiState,
  loginManaged,
  logoutManaged,
  managedMe,
  registerManagedStudent,
  saveManagedApiAttempt,
  startManagedApiAttempt,
  submitManagedApiAttempt,
  type ManagedAttemptBundle,
  type CreateManagedApiExamInput,
  ManagedApiError,
} from '@/lib/managed-exams-api';
import {
  managedResultsCsv,
  type ManagedAttempt,
  type ManagedExam,
  type ManagedExamState,
  type ManagedUser,
} from '@/lib/managed-exams';
import type { Domain, Question } from '@/lib/questions';

const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const EMPTY_STATE: ManagedExamState = {
  version: 1,
  users: [],
  exams: [],
  attempts: [],
};
const domains: Domain[] = [
  'Prepare the data',
  'Model the data',
  'Visualize and analyze the data',
  'Manage and secure Power BI',
];

function publicAsset(path: string) {
  return `${ASSET_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

function dateTimeLocal(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function formatDate(value: string, language: 'en' | 'ar') {
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function availability(exam: ManagedExam) {
  const now = Date.now();
  if (exam.status !== 'published') return 'draft';
  if (now < new Date(exam.opensAt).getTime()) return 'scheduled';
  if (now > new Date(exam.closesAt).getTime()) return 'closed';
  return 'open';
}

export function ManagedExamsProduction() {
  const { language, setLanguage, tx } = useLanguage();
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<ManagedUser | null>(null);
  const [state, setState] = useState<ManagedExamState>(EMPTY_STATE);
  const [bundle, setBundle] = useState<ManagedAttemptBundle | null>(null);
  const [checkIn, setCheckIn] = useState<{
    exam: ManagedExam;
    accessCode: string;
  } | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setDark(window.localStorage.getItem('pl300-managed-theme') === 'dark');
    if (!getManagedToken()) {
      setLoading(false);
      return;
    }
    void Promise.all([managedMe(), loadManagedApiState()])
      .then(([identity, remoteState]) => {
        setUser(identity.user);
        setState(remoteState);
      })
      .catch(() => void logoutManaged())
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('pl300-managed-theme', dark ? 'dark' : 'light');
  }, [dark]);

  async function refresh() {
    const remote = await loadManagedApiState();
    setState(remote);
    return remote;
  }

  async function signedIn(nextUser: ManagedUser) {
    setUser(nextUser);
    await refresh();
  }

  async function signOut() {
    await logoutManaged();
    setUser(null);
    setState(EMPTY_STATE);
    setBundle(null);
    setCheckIn(null);
  }

  async function beginExam() {
    if (!checkIn) return;
    try {
      const nextBundle = await startManagedApiAttempt({
        examId: checkIn.exam.id,
        accessCode: checkIn.accessCode,
      });
      setBundle(nextBundle);
      setState((current) => ({
        ...current,
        attempts: [
          nextBundle.attempt,
          ...current.attempts.filter(
            (item) => item.id !== nextBundle.attempt.id,
          ),
        ],
      }));
      setCheckIn(null);
    } catch (error) {
      setNotice(apiMessage(error, tx));
    }
  }

  async function resumeExam(exam: ManagedExam, accessCode: string) {
    try {
      const nextBundle = await startManagedApiAttempt({
        examId: exam.id,
        accessCode,
      });
      setBundle(nextBundle);
      setState((current) => ({
        ...current,
        attempts: [
          nextBundle.attempt,
          ...current.attempts.filter(
            (item) => item.id !== nextBundle.attempt.id,
          ),
        ],
      }));
    } catch (error) {
      setNotice(apiMessage(error, tx));
    }
  }

  if (loading)
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <div className="text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">
            {tx(
              'Connecting to the exam service…',
              'جاري الاتصال بخدمة الامتحانات…',
            )}
          </p>
        </div>
      </div>
    );

  if (user?.role === 'student' && bundle) {
    const exam = state.exams.find((item) => item.id === bundle.attempt.examId);
    if (exam) {
      const questionsMap = new Map(
        bundle.questions.map((question) => [question.id, question as Question]),
      );
      return (
        <ManagedExamPlayer
          user={user}
          exam={exam}
          attempt={bundle.attempt}
          state={state}
          onStateChange={setState}
          onExit={() => {
            setBundle(null);
            void refresh();
          }}
          dark={dark}
          setDark={setDark}
          questionsMap={questionsMap}
          onPersistAttempt={(attempt) => {
            void saveManagedApiAttempt(attempt).catch((error) =>
              setNotice(apiMessage(error, tx)),
            );
          }}
          onSubmitAttempt={async (attempt) => {
            await saveManagedApiAttempt(attempt);
            const result = await submitManagedApiAttempt(attempt.id);
            setState((current) => ({
              ...current,
              attempts: current.attempts.map((item) =>
                item.id === result.attempt.id ? result.attempt : item,
              ),
            }));
            setBundle((current) =>
              current ? { ...current, attempt: result.attempt } : current,
            );
          }}
        />
      );
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProductionHeader
        dark={dark}
        setDark={setDark}
        language={language}
        setLanguage={setLanguage}
        user={user}
        onSignOut={signOut}
      />
      {notice && (
        <div className="fixed inset-x-4 top-20 z-50 mx-auto flex max-w-xl items-center justify-between gap-3 rounded-xl border border-amber-400/40 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lg dark:bg-amber-950 dark:text-amber-100">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            className="font-bold"
          >
            ×
          </button>
        </div>
      )}
      {!user ? (
        <ProductionAuth onSignedIn={signedIn} />
      ) : user.role === 'instructor' ? (
        <ProductionAdmin state={state} refresh={refresh} user={user} />
      ) : (
        <ProductionStudent
          state={state}
          user={user}
          onCheckIn={(exam, accessCode, resume) =>
            resume
              ? void resumeExam(exam, accessCode)
              : setCheckIn({ exam, accessCode })
          }
        />
      )}
      {checkIn && (
        <ExamCheckIn
          exam={checkIn.exam}
          onCancel={() => setCheckIn(null)}
          onStart={beginExam}
        />
      )}
    </main>
  );
}

function apiMessage(error: unknown, tx: (en: string, ar: string) => string) {
  if (!(error instanceof ManagedApiError))
    return tx(
      'The exam service could not complete the request.',
      'خدمة الامتحانات مقدرتش تكمل الطلب.',
    );
  const map: Record<string, [string, string]> = {
    invalid_credentials: [
      'The email or password is incorrect.',
      'الإيميل أو كلمة المرور غير صحيحة.',
    ],
    email_exists: [
      'An account already exists for this email.',
      'فيه حساب موجود بالفعل بالإيميل ده.',
    ],
    weak_password: [
      'Use at least 10 characters with upper-case, lower-case, and a number.',
      'استخدم 10 حروف على الأقل وفيهم حرف كبير وصغير ورقم.',
    ],
    bad_code: [
      'The exam access code is incorrect.',
      'كود دخول الامتحان غير صحيح.',
    ],
    max_attempts: [
      'You have used all allowed attempts.',
      'استخدمت كل المحاولات المسموحة.',
    ],
    not_open: ['This exam has not opened yet.', 'الامتحان لسه ما فتحش.'],
    closed: ['This exam is closed.', 'الامتحان اتقفل.'],
    admin_exists: [
      'The administrator account is already configured.',
      'حساب الأدمن اتعمل بالفعل.',
    ],
    invalid_bootstrap_code: [
      'The admin setup code is incorrect.',
      'كود إعداد الأدمن غير صحيح.',
    ],
    too_many_attempts: [
      'Too many sign-in attempts. Try again later.',
      'محاولات دخول كتير. جرّب بعد شوية.',
    ],
  };
  const message = map[error.code];
  return message ? tx(...message) : error.message;
}

function ProductionHeader({
  dark,
  setDark,
  language,
  setLanguage,
  user,
  onSignOut,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  language: 'en' | 'ar';
  setLanguage: (value: 'en' | 'ar') => void;
  user: ManagedUser | null;
  onSignOut: () => void;
}) {
  const { tx } = useLanguage();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/94 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <a
            href={publicAsset('/')}
            className="grid size-11 place-items-center rounded-2xl bg-[#111c33] font-bold text-[#f4cf2f]"
          >
            P3
          </a>
          <div>
            <p className="font-bold">
              {tx('PL-300 Exam Center', 'مركز امتحانات PL-300')}
            </p>
            <p className="text-xs text-muted-foreground">
              {tx('Independent exam simulator', 'محاكي امتحان مستقل')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="hidden bg-emerald-600 text-white hover:bg-emerald-600 sm:inline-flex">
            {tx('Live database', 'قاعدة بيانات مباشرة')}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            aria-label={tx('Change language', 'تغيير اللغة')}
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            <Languages className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={tx('Change theme', 'تغيير المظهر')}
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          {user && (
            <>
              <span className="hidden text-sm font-medium md:inline">
                {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={onSignOut}>
                <LogOut className="size-4" /> {tx('Sign out', 'خروج')}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

type AuthMode = 'login' | 'register' | 'admin';

function ProductionAuth({
  onSignedIn,
}: {
  onSignedIn: (user: ManagedUser) => Promise<void>;
}) {
  const { tx } = useLanguage();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bootstrapCode, setBootstrapCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (mode !== 'login' && password !== confirmPassword) {
      setError(tx('Passwords do not match.', 'كلمتا المرور مش متطابقتين.'));
      return;
    }
    setBusy(true);
    setError('');
    try {
      const result =
        mode === 'login'
          ? await loginManaged({ email, password })
          : mode === 'register'
            ? await registerManagedStudent({ name, email, password })
            : await bootstrapManagedAdmin({
                name,
                email,
                password,
                bootstrapCode,
              });
      await onSignedIn(result.user);
    } catch (cause) {
      setError(apiMessage(cause, tx));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(15,108,189,.16),transparent_34rem),radial-gradient(circle_at_82%_12%,rgba(244,207,47,.13),transparent_28rem)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-[1250px] items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <Badge className="rounded-lg bg-[#111c33] text-[#f4cf2f] hover:bg-[#111c33]">
            {tx('SECURE EXAM PORTAL', 'بوابة امتحانات مؤمّنة')}
          </Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl sm:leading-[1.08]">
            {tx(
              'A real exam workflow for every learner.',
              'تجربة امتحان حقيقية لكل طالب.',
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {tx(
              'Every student has a private account. Attempts, answers, timers, events, and results are stored centrally and visible only to the learner and administrator.',
              'كل طالب ليه حساب خاص. المحاولات والإجابات والوقت والأحداث والنتائج محفوظين مركزيًا ومتاحين للطالب والأدمن فقط.',
            )}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              [KeyRound, tx('Personal email account', 'حساب شخصي بالإيميل')],
              [
                CalendarClock,
                tx('Server-controlled timer', 'وقت متحكم فيه من السيرفر'),
              ],
              [ShieldCheck, tx('Protected exam session', 'جلسة امتحان محمية')],
              [
                BarChart3,
                tx('Central results dashboard', 'داشبورد نتائج مركزية'),
              ],
            ].map(([Icon, label]) => {
              const FeatureIcon = Icon as typeof KeyRound;
              return (
                <div
                  key={String(label)}
                  className="flex items-center gap-3 rounded-2xl border bg-card/80 p-4"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FeatureIcon className="size-5" />
                  </span>
                  <strong className="text-sm">{label as string}</strong>
                </div>
              );
            })}
          </div>
        </div>
        <Card className="rounded-[1.75rem] border-primary/15 shadow-[0_28px_80px_rgba(15,35,70,.14)]">
          <CardContent className="p-6 sm:p-8">
            <div className="flex rounded-xl bg-muted p-1">
              {(['login', 'register'] as AuthMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setMode(item);
                    setError('');
                  }}
                  className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold ${mode === item ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                >
                  {item === 'login'
                    ? tx('Sign in', 'تسجيل الدخول')
                    : tx('Create student account', 'إنشاء حساب طالب')}
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                {mode === 'register' ? (
                  <UserPlus className="size-5" />
                ) : mode === 'admin' ? (
                  <ShieldCheck className="size-5" />
                ) : (
                  <LockKeyhole className="size-5" />
                )}
              </span>
              <div>
                <h2 className="text-xl font-bold">
                  {mode === 'login'
                    ? tx('Welcome back', 'أهلًا برجوعك')
                    : mode === 'register'
                      ? tx('Create your learner account', 'اعمل حساب الطالب')
                      : tx(
                          'One-time administrator setup',
                          'إعداد حساب الأدمن لأول مرة',
                        )}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {mode === 'admin'
                    ? tx(
                        'Available only before the first admin account is created.',
                        'متاح فقط قبل إنشاء أول حساب أدمن.',
                      )
                    : tx(
                        'Your data is stored in the secured exam database.',
                        'بياناتك بتتحفظ في قاعدة بيانات الامتحانات.',
                      )}
                </p>
              </div>
            </div>
            <form className="mt-6 space-y-4" onSubmit={submit}>
              {mode !== 'login' && (
                <div className="space-y-2">
                  <Label>{tx('Full name', 'الاسم بالكامل')}</Label>
                  <Input
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label>{tx('Email', 'البريد الإلكتروني')}</Label>
                <Input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>{tx('Password', 'كلمة المرور')}</Label>
                <Input
                  type="password"
                  autoComplete={
                    mode === 'login' ? 'current-password' : 'new-password'
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {mode !== 'login' && (
                <div className="space-y-2">
                  <Label>{tx('Confirm password', 'تأكيد كلمة المرور')}</Label>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </div>
              )}
              {mode === 'admin' && (
                <div className="space-y-2">
                  <Label>
                    {tx('Administrator setup code', 'كود إعداد الأدمن')}
                  </Label>
                  <Input
                    type="password"
                    value={bootstrapCode}
                    onChange={(event) => setBootstrapCode(event.target.value)}
                    required
                  />
                </div>
              )}
              {error && (
                <p className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
              <Button
                className="w-full"
                size="lg"
                type="submit"
                disabled={busy}
              >
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : mode === 'register' ? (
                  <UserPlus className="size-4" />
                ) : (
                  <KeyRound className="size-4" />
                )}
                {mode === 'login'
                  ? tx('Sign in', 'دخول')
                  : mode === 'register'
                    ? tx('Create account', 'إنشاء الحساب')
                    : tx('Create administrator', 'إنشاء الأدمن')}
              </Button>
            </form>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'admin' ? 'login' : 'admin');
                setError('');
              }}
              className="mt-5 w-full text-center text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {mode === 'admin'
                ? tx('Back to sign in', 'ارجع لتسجيل الدخول')
                : tx('First-time administrator setup', 'إعداد الأدمن لأول مرة')}
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ProductionAdmin({
  state,
  refresh,
  user,
}: {
  state: ManagedExamState;
  refresh: () => Promise<ManagedExamState>;
  user: ManagedUser;
}) {
  const { language, tx } = useLanguage();
  const [tab, setTab] = useState<'overview' | 'exams' | 'students' | 'results'>(
    'overview',
  );
  const [createOpen, setCreateOpen] = useState(false);
  const submitted = state.attempts.filter(
    (item) => item.status === 'submitted',
  );
  const average = submitted.length
    ? Math.round(
        submitted.reduce((total, item) => total + (item.percent ?? 0), 0) /
          submitted.length,
      )
    : 0;

  function exportCsv() {
    const blob = new Blob(['\ufeff', managedResultsCsv(state)], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `pl300-results-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">
            {tx('Administrator center', 'مركز الأدمن')}
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            {tx(`Welcome, ${user.name}`, `أهلًا يا ${user.name}`)}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {tx(
              'Manage exams, learners, attempts, and exported grades from one place.',
              'إدارة الامتحانات والطلاب والمحاولات وكشوف الدرجات من مكان واحد.',
            )}
          </p>
        </div>
        <Button size="lg" onClick={() => setCreateOpen(true)}>
          <FilePlus2 className="size-4" /> {tx('Create exam', 'إنشاء امتحان')}
        </Button>
      </div>
      <nav className="mt-7 flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl border bg-card p-1">
        {(
          [
            ['overview', LayoutDashboard, tx('Overview', 'نظرة عامة')],
            ['exams', ListChecks, tx('Exams', 'الامتحانات')],
            ['students', Users, tx('Students', 'الطلاب')],
            ['results', BarChart3, tx('Results', 'النتائج')],
          ] as const
        ).map(([value, Icon, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold ${tab === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </nav>
      {tab === 'overview' && (
        <>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [ListChecks, tx('Exams', 'الامتحانات'), state.exams.length],
              [
                Users,
                tx('Registered students', 'الطلاب المسجلين'),
                state.users.filter((item) => item.role === 'student').length,
              ],
              [CheckCircle2, tx('Submissions', 'التسليمات'), submitted.length],
              [BarChart3, tx('Average score', 'متوسط الدرجات'), `${average}%`],
            ].map(([Icon, label, value]) => {
              const KpiIcon = Icon as typeof ListChecks;
              return (
                <Card key={String(label)} className="rounded-2xl">
                  <CardContent className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {label as string}
                      </p>
                      <p className="mt-2 text-3xl font-bold">
                        {value as string | number}
                      </p>
                    </div>
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <KpiIcon className="size-5" />
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Card className="mt-6 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold">
                {tx('Recent activity', 'أحدث النشاط')}
              </h2>
              <div className="mt-4 space-y-3">
                {state.exams.slice(0, 5).map((exam) => (
                  <AdminExamRow key={exam.id} exam={exam} state={state} />
                ))}
                {!state.exams.length && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    {tx(
                      'Create your first exam to begin.',
                      'اعمل أول امتحان علشان تبدأ.',
                    )}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
      {tab === 'exams' && (
        <div className="mt-7 grid gap-4">
          {state.exams.map((exam) => (
            <Card key={exam.id} className="rounded-2xl">
              <CardContent className="p-6">
                <AdminExamRow exam={exam} state={state} detailed />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === 'students' && (
        <Card className="mt-7 overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="border-b p-6">
              <h2 className="text-lg font-bold">
                {tx('Registered learners', 'الطلاب المسجلون')}
              </h2>
            </div>
            <div className="divide-y">
              {state.users
                .filter((item) => item.role === 'student')
                .map((student) => {
                  const attempts = state.attempts.filter(
                    (item) => item.studentId === student.id,
                  );
                  return (
                    <div
                      key={student.id}
                      className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                    >
                      <div>
                        <strong>{student.name}</strong>
                        <p className="text-xs text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                      <div className="text-right rtl:text-left">
                        <strong>{attempts.length}</strong>
                        <p className="text-xs text-muted-foreground">
                          {tx('attempts', 'محاولات')}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
      {tab === 'results' && (
        <Card className="mt-7 overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="flex items-center justify-between gap-3 border-b p-6">
              <div>
                <h2 className="text-lg font-bold">
                  {tx('Exam results', 'نتائج الامتحانات')}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {tx(
                    'Central results stored in the database',
                    'نتائج مركزية محفوظة في قاعدة البيانات',
                  )}
                </p>
              </div>
              <Button variant="outline" onClick={exportCsv}>
                <Download className="size-4" />
                CSV
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm rtl:text-right">
                <thead className="bg-muted/65 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">{tx('Student', 'الطالب')}</th>
                    <th className="px-5 py-3">{tx('Exam', 'الامتحان')}</th>
                    <th className="px-5 py-3">{tx('Score', 'الدرجة')}</th>
                    <th className="px-5 py-3">{tx('Manual', 'يدوي')}</th>
                    <th className="px-5 py-3">{tx('Events', 'الأحداث')}</th>
                    <th className="px-5 py-3">{tx('Submitted', 'التسليم')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {state.attempts.map((attempt) => {
                    const student = state.users.find(
                      (item) => item.id === attempt.studentId,
                    );
                    const exam = state.exams.find(
                      (item) => item.id === attempt.examId,
                    );
                    return (
                      <tr key={attempt.id}>
                        <td className="px-5 py-4">
                          <strong>{student?.name}</strong>
                          <p className="text-xs text-muted-foreground">
                            {student?.email}
                          </p>
                        </td>
                        <td className="px-5 py-4">{exam?.title}</td>
                        <td className="px-5 py-4 font-bold">
                          {attempt.percent === undefined
                            ? '—'
                            : `${attempt.percent}%`}
                        </td>
                        <td className="px-5 py-4">
                          {attempt.manualPending ?? '—'}
                        </td>
                        <td className="px-5 py-4">{attempt.events.length}</td>
                        <td className="px-5 py-4 text-xs">
                          {attempt.submittedAt
                            ? formatDate(attempt.submittedAt, language)
                            : attempt.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      <ProductionCreateExam
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={async () => {
          await refresh();
          setCreateOpen(false);
          setTab('exams');
        }}
      />
    </div>
  );
}

function AdminExamRow({
  exam,
  state,
  detailed = false,
}: {
  exam: ManagedExam;
  state: ManagedExamState;
  detailed?: boolean;
}) {
  const { language, tx } = useLanguage();
  const attempts = state.attempts.filter((item) => item.examId === exam.id);
  const status = availability(exam);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
            <ClipboardCheck className="size-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold">{exam.title}</h3>
              <Badge variant={status === 'open' ? 'default' : 'secondary'}>
                {status}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {exam.questionIds.length} {tx('questions', 'سؤال')} ·{' '}
              {formatDate(exam.opensAt, language)}
              {detailed ? ` → ${formatDate(exam.closesAt, language)}` : ''}
            </p>
          </div>
        </div>
        <div className="text-right rtl:text-left">
          <strong>{attempts.length}</strong>
          <p className="text-xs text-muted-foreground">
            {tx('attempts', 'محاولات')}
          </p>
        </div>
      </div>
      {detailed && (
        <div className="mt-5 grid gap-3 border-t pt-5 text-sm sm:grid-cols-4">
          <MiniInfo
            label={tx('Duration', 'المدة')}
            value={`${exam.durationMinutes}m`}
          />
          <MiniInfo
            label={tx('Pass score', 'درجة النجاح')}
            value={`${exam.passScore}%`}
          />
          <MiniInfo
            label={tx('Attempts', 'المحاولات')}
            value={exam.maxAttempts}
          />
          <MiniInfo
            label={tx('Secure mode', 'الوضع الآمن')}
            value={
              exam.secureMode ? tx('Enabled', 'مفعّل') : tx('Standard', 'عادي')
            }
          />
        </div>
      )}
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function ProductionCreateExam({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onCreated: () => Promise<void>;
}) {
  const { tx } = useLanguage();
  const now = new Date();
  const [form, setForm] = useState<CreateManagedApiExamInput>({
    title: 'PL-300 Supervised Exam',
    description:
      'Timed PL-300 assessment. Read every instruction before you begin.',
    domain: 'all',
    questionCount: 50,
    durationMinutes: 100,
    opensAt: new Date(now.getTime() - 60_000).toISOString(),
    closesAt: new Date(now.getTime() + 7 * 24 * 3_600_000).toISOString(),
    accessCode: '',
    passScore: 70,
    maxAttempts: 1,
    shuffleQuestions: true,
    shuffleChoices: true,
    secureMode: true,
    showScoreAfterSubmit: true,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function create() {
    setBusy(true);
    setError('');
    try {
      await createManagedApiExam(form);
      await onCreated();
    } catch (cause) {
      setError(apiMessage(cause, tx));
    } finally {
      setBusy(false);
    }
  }
  function update<K extends keyof CreateManagedApiExamInput>(
    key: K,
    value: CreateManagedApiExamInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {tx('Create and publish exam', 'إنشاء ونشر امتحان')}
          </DialogTitle>
          <DialogDescription>
            {tx(
              'Questions are selected server-side. Answer keys never enter the student exam response.',
              'الأسئلة بتتحدد من السيرفر ومفاتيح الإجابات لا تُرسل مع امتحان الطالب.',
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-3 sm:grid-cols-2">
          <Field label={tx('Title', 'اسم الامتحان')} wide>
            <Input
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </Field>
          <Field label={tx('Instructions', 'التعليمات')} wide>
            <Textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
            />
          </Field>
          <Field label={tx('Question scope', 'نطاق الأسئلة')}>
            <select
              className="h-9 w-full rounded-lg border bg-background px-3 text-sm"
              value={form.domain}
              onChange={(e) => update('domain', e.target.value)}
            >
              <option value="all">{tx('All skill areas', 'كل المجالات')}</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </Field>
          <Field label={tx('Question count', 'عدد الأسئلة')}>
            <Input
              type="number"
              min={1}
              max={100}
              value={form.questionCount}
              onChange={(e) => update('questionCount', Number(e.target.value))}
            />
          </Field>
          <Field label={tx('Duration in minutes', 'المدة بالدقائق')}>
            <Input
              type="number"
              min={5}
              max={480}
              value={form.durationMinutes}
              onChange={(e) =>
                update('durationMinutes', Number(e.target.value))
              }
            />
          </Field>
          <Field label={tx('Pass score %', 'درجة النجاح %')}>
            <Input
              type="number"
              min={0}
              max={100}
              value={form.passScore}
              onChange={(e) => update('passScore', Number(e.target.value))}
            />
          </Field>
          <Field label={tx('Opens at', 'يفتح في')}>
            <Input
              type="datetime-local"
              value={dateTimeLocal(new Date(form.opensAt))}
              onChange={(e) =>
                update('opensAt', new Date(e.target.value).toISOString())
              }
            />
          </Field>
          <Field label={tx('Closes at', 'يقفل في')}>
            <Input
              type="datetime-local"
              value={dateTimeLocal(new Date(form.closesAt))}
              onChange={(e) =>
                update('closesAt', new Date(e.target.value).toISOString())
              }
            />
          </Field>
          <Field label={tx('Access code', 'كود الدخول')}>
            <Input
              value={form.accessCode}
              onChange={(e) =>
                update('accessCode', e.target.value.toUpperCase())
              }
              placeholder="PL300-CLASS"
            />
          </Field>
          <Field label={tx('Maximum attempts', 'أقصى عدد محاولات')}>
            <Input
              type="number"
              min={1}
              max={20}
              value={form.maxAttempts}
              onChange={(e) => update('maxAttempts', Number(e.target.value))}
            />
          </Field>
          <div className="grid gap-3 rounded-2xl border bg-muted/25 p-4 sm:col-span-2 sm:grid-cols-2">
            {(
              [
                ['shuffleQuestions', tx('Shuffle questions', 'خلط الأسئلة')],
                ['shuffleChoices', tx('Shuffle choices', 'خلط الاختيارات')],
                ['secureMode', tx('Secure mode', 'الوضع الآمن')],
                [
                  'showScoreAfterSubmit',
                  tx('Show score after submit', 'إظهار الدرجة بعد التسليم'),
                ],
              ] as const
            ).map(([key, label]) => (
              <Label
                key={key}
                className="flex items-center justify-between rounded-xl bg-background p-3"
              >
                <span>{label}</span>
                <Switch
                  checked={form[key]}
                  onCheckedChange={(value) => update(key, value)}
                />
              </Label>
            ))}
          </div>
          {error && (
            <p className="sm:col-span-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tx('Cancel', 'إلغاء')}
          </Button>
          <Button onClick={create} disabled={busy}>
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <FilePlus2 className="size-4" />
            )}
            {tx('Publish exam', 'نشر الامتحان')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`space-y-2 ${wide ? 'sm:col-span-2' : ''}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function ProductionStudent({
  state,
  user,
  onCheckIn,
}: {
  state: ManagedExamState;
  user: ManagedUser;
  onCheckIn: (exam: ManagedExam, accessCode: string, resume: boolean) => void;
}) {
  const { language, tx } = useLanguage();
  const [codes, setCodes] = useState<Record<string, string>>({});
  return (
    <div className="mx-auto max-w-[1250px] px-4 py-8 sm:px-8">
      <div className="rounded-[1.75rem] bg-[#111c33] p-7 text-white shadow-xl sm:p-9">
        <Badge className="bg-[#f4cf2f] text-[#111c33] hover:bg-[#f4cf2f]">
          {tx('CANDIDATE PORTAL', 'بوابة الممتحن')}
        </Badge>
        <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
          {tx(`Welcome, ${user.name}`, `أهلًا يا ${user.name}`)}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          {tx(
            'Choose your assigned exam, enter the instructor access code, and complete the check-in screens before the timer begins.',
            'اختار الامتحان، اكتب كود المدرس، وراجع شاشات التعليمات قبل ما يبدأ الوقت.',
          )}
        </p>
      </div>
      <div className="mt-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="section-kicker">
              {tx('Available exams', 'الامتحانات المتاحة')}
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {tx('Exam appointments', 'مواعيد الامتحانات')}
            </h2>
          </div>
          <Badge variant="secondary">{state.exams.length}</Badge>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {state.exams.map((exam) => {
            const status = availability(exam);
            const attempts = state.attempts.filter(
              (item) => item.examId === exam.id && item.studentId === user.id,
            );
            const active = attempts.find(
              (item) => item.status === 'in_progress',
            );
            const latest = attempts.find((item) => item.status === 'submitted');
            const code = codes[exam.id] ?? '';
            return (
              <Card key={exam.id} className="rounded-[1.5rem]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <GraduationCap className="size-6" />
                    </span>
                    <Badge
                      variant={status === 'open' ? 'default' : 'secondary'}
                    >
                      {status === 'open'
                        ? tx('Open now', 'مفتوح الآن')
                        : status === 'scheduled'
                          ? tx('Scheduled', 'مجدول')
                          : tx('Closed', 'مغلق')}
                    </Badge>
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{exam.title}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                    {exam.description}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-muted/50 p-3 text-center">
                    <MiniInfo
                      label={tx('Questions', 'الأسئلة')}
                      value={exam.questionIds.length}
                    />
                    <MiniInfo
                      label={tx('Minutes', 'الدقائق')}
                      value={exam.durationMinutes}
                    />
                    <MiniInfo
                      label={tx('Attempts', 'المحاولات')}
                      value={`${attempts.length}/${exam.maxAttempts}`}
                    />
                  </div>
                  <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                    <p>
                      {tx('Opens:', 'يفتح:')}{' '}
                      {formatDate(exam.opensAt, language)}
                    </p>
                    <p>
                      {tx('Closes:', 'يقفل:')}{' '}
                      {formatDate(exam.closesAt, language)}
                    </p>
                    {latest?.percent !== undefined && (
                      <p className="font-semibold text-foreground">
                        {tx('Latest score:', 'آخر درجة:')} {latest.percent}%
                      </p>
                    )}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Input
                      placeholder={tx('Access code', 'كود الدخول')}
                      value={code}
                      onChange={(e) =>
                        setCodes((current) => ({
                          ...current,
                          [exam.id]: e.target.value.toUpperCase(),
                        }))
                      }
                      disabled={status !== 'open'}
                    />
                    <Button
                      onClick={() => onCheckIn(exam, code, Boolean(active))}
                      disabled={status !== 'open' || !code.trim()}
                    >
                      {active ? (
                        <RotateCcw className="size-4" />
                      ) : (
                        <Play className="size-4" />
                      )}
                      {active
                        ? tx('Resume', 'استكمال')
                        : tx('Check in', 'ابدأ التجهيز')}
                    </Button>
                  </div>
                  {exam.secureMode && (
                    <p className="mt-4 flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-muted-foreground">
                      <ShieldCheck className="size-4 text-amber-600" />
                      {tx(
                        'Secure session controls are enabled.',
                        'ضوابط الجلسة الآمنة مفعّلة.',
                      )}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ExamCheckIn({
  exam,
  onCancel,
  onStart,
}: {
  exam: ManagedExam;
  onCancel: () => void;
  onStart: () => Promise<void>;
}) {
  const { tx } = useLanguage();
  const [page, setPage] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const pages = [
    {
      icon: GraduationCap,
      title: tx(
        'Welcome to your PL-300 exam simulation',
        'أهلًا في محاكاة امتحان PL-300',
      ),
      body: (
        <div className="space-y-4">
          <p>
            {tx(
              'This session reproduces the navigation and question interaction patterns of a Microsoft role-based exam. It is an independent simulator and is not affiliated with Microsoft.',
              'الجلسة دي بتحاكي طريقة التنقل والتعامل مع أسئلة امتحانات Microsoft Role-based، لكنها محاكي مستقل وغير تابع لمايكروسوفت.',
            )}
          </p>
          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-muted/60 p-4 text-center">
            <MiniInfo
              label={tx('Questions', 'الأسئلة')}
              value={exam.questionIds.length}
            />
            <MiniInfo
              label={tx('Minutes', 'الدقائق')}
              value={exam.durationMinutes}
            />
            <MiniInfo
              label={tx('Attempts', 'المحاولات')}
              value={exam.maxAttempts}
            />
          </div>
        </div>
      ),
    },
    {
      icon: ListChecks,
      title: tx('How the exam works', 'طريقة الامتحان'),
      body: (
        <ul className="space-y-3 text-sm leading-7">
          <li>
            •{' '}
            {tx(
              'Answer one question at a time and use Previous or Next to navigate.',
              'جاوب سؤال بسؤال واستخدم السابق والتالي للتنقل.',
            )}
          </li>
          <li>
            •{' '}
            {tx(
              'Flag any item you want to revisit on the review screen.',
              'علّم أي سؤال عايز ترجعله من شاشة المراجعة.',
            )}
          </li>
          <li>
            •{' '}
            {tx(
              'The final review shows answered, unanswered, and flagged questions before submission.',
              'شاشة المراجعة الأخيرة بتوضح المجاوب وغير المجاوب والمعلّم قبل التسليم.',
            )}
          </li>
          <li>
            •{' '}
            {tx(
              'Case-study context remains available with every related question in this simulator.',
              'سياق الـCase Study بيظهر مع كل سؤال متعلق بيه في المحاكي.',
            )}
          </li>
        </ul>
      ),
    },
    {
      icon: ShieldCheck,
      title: tx('Session rules and security', 'قواعد الجلسة والحماية'),
      body: (
        <ul className="space-y-3 text-sm leading-7">
          <li>
            •{' '}
            {tx(
              'The server controls the deadline; refreshing or closing the page does not reset the timer.',
              'السيرفر هو اللي بيتحكم في النهاية؛ الريفريش أو قفل الصفحة مش بيرجع الوقت.',
            )}
          </li>
          <li>
            •{' '}
            {tx(
              'Answers are autosaved. Copy, right-click, focus loss, and tab changes may be recorded.',
              'الإجابات بتتحفظ تلقائيًا وقد يتم تسجيل النسخ والكليك يمين وفقدان التركيز وتغيير التاب.',
            )}
          </li>
          <li>
            •{' '}
            {tx(
              'A normal website cannot technically block every operating-system or phone screenshot.',
              'الموقع العادي لا يقدر تقنيًا يمنع كل صور الشاشة من نظام التشغيل أو موبايل خارجي.',
            )}
          </li>
        </ul>
      ),
    },
    {
      icon: ClipboardCheck,
      title: tx('Candidate acknowledgement', 'إقرار الطالب'),
      body: (
        <div className="space-y-5">
          <p className="text-sm leading-7">
            {tx(
              'I will complete this assessment independently and will not use unauthorized help. I understand that this is a practice simulator, not an official Microsoft certification exam.',
              'هكمل التقييم بنفسي ومن غير مساعدة غير مسموحة، وفاهم إن ده محاكي تدريبي مش امتحان شهادة رسمي من مايكروسوفت.',
            )}
          </p>
          <Label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4">
            <Checkbox
              checked={accepted}
              onCheckedChange={(value) => setAccepted(Boolean(value))}
            />
            <span>{tx('I understand and agree.', 'قرأت وفهمت وموافق.')}</span>
          </Label>
        </div>
      ),
    },
  ];
  const current = pages[page];
  const Icon = current.icon;

  async function beginExam() {
    setBusy(true);
    try {
      await onStart();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open onOpenChange={(value) => !value && onCancel()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="mb-3 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <DialogTitle>{current.title}</DialogTitle>
              <DialogDescription>
                {tx(
                  `Step ${page + 1} of ${pages.length}`,
                  `الخطوة ${page + 1} من ${pages.length}`,
                )}
              </DialogDescription>
            </div>
          </div>
          <Progress value={((page + 1) / pages.length) * 100} />
        </DialogHeader>
        <div className="min-h-48 py-5 leading-7">{current.body}</div>
        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => (page === 0 ? onCancel() : setPage(page - 1))}
          >
            <ArrowLeft className="size-4" />
            {page === 0 ? tx('Cancel', 'إلغاء') : tx('Back', 'رجوع')}
          </Button>
          {page < pages.length - 1 ? (
            <Button onClick={() => setPage(page + 1)}>
              {tx('Continue', 'متابعة')}
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button disabled={!accepted || busy} onClick={beginExam}>
              {busy ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Play className="size-4" />
              )}
              {tx('Start timed exam', 'ابدأ الامتحان والوقت')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
