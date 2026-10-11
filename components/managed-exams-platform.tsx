'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type DragEvent as ReactDragEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FilePlus2,
  Flag,
  Fullscreen,
  GraduationCap,
  GripVertical,
  Home,
  KeyRound,
  Languages,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  LogOut,
  Moon,
  Play,
  Plus,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sun,
  UserRound,
  Users,
  X,
} from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/i18n';
import { questions, type Domain, type Question } from '@/lib/questions';
import { isAnswered, isYesNoQuestion } from '@/lib/exam-utils';
import { dragDropData, type DragDropOption } from '@/lib/drag-drop-data';
import { visualControlData } from '@/lib/visual-control-data';
import {
  DEMO_ACCOUNTS,
  MANAGED_EXAMS_STORAGE_KEY,
  MANAGED_SESSION_STORAGE_KEY,
  addManagedAttemptEvent,
  authenticateManagedDemo,
  createManagedExam,
  createSeedManagedState,
  getManagedDashboard,
  managedResultsCsv,
  parseManagedState,
  startOrResumeManagedAttempt,
  submitManagedAttempt,
  updateManagedAttempt,
  type ManagedAttempt,
  type ManagedAttemptEvent,
  type ManagedExam,
  type ManagedExamState,
  type ManagedRole,
  type ManagedUser,
} from '@/lib/managed-exams';

const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const questionById = new Map(
  questions.map((question) => [question.id, question]),
);
const domains: Domain[] = [
  'Prepare the data',
  'Model the data',
  'Visualize and analyze the data',
  'Manage and secure Power BI',
];

function publicAsset(path: string) {
  return `${ASSET_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

function isNonReturnableQuestion(question: Question) {
  const sourceText =
    `${question.prompt}\n${question.context ?? ''}`.toLowerCase();
  return (
    sourceText.includes('will not be able to return') ||
    sourceText.includes('will not be able to review')
  );
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

function formatTimer(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
}

function examAvailability(exam: ManagedExam, now = new Date()) {
  if (exam.status !== 'published') return 'draft' as const;
  if (now < new Date(exam.opensAt)) return 'scheduled' as const;
  if (now > new Date(exam.closesAt)) return 'closed' as const;
  return 'open' as const;
}

export function ManagedExamsPlatform() {
  const { language, setLanguage, tx } = useLanguage();
  const [dark, setDark] = useState(false);
  const [state, setState] = useState<ManagedExamState>(() =>
    createSeedManagedState(questions.map((question) => question.id)),
  );
  const [user, setUser] = useState<ManagedUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);

  useEffect(() => {
    const stored = parseManagedState(
      window.localStorage.getItem(MANAGED_EXAMS_STORAGE_KEY),
      questions.map((question) => question.id),
    );
    setState(stored);
    const sessionId = window.sessionStorage.getItem(
      MANAGED_SESSION_STORAGE_KEY,
    );
    setUser(stored.users.find((item) => item.id === sessionId) ?? null);
    setDark(window.localStorage.getItem('pl300-managed-theme') === 'dark');
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      MANAGED_EXAMS_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [hydrated, state]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    if (hydrated)
      window.localStorage.setItem(
        'pl300-managed-theme',
        dark ? 'dark' : 'light',
      );
  }, [dark, hydrated]);

  function signIn(email: string, password: string, role: ManagedRole) {
    const account = authenticateManagedDemo(email, password);
    if (!account || account.role !== role) return false;
    const currentUser =
      state.users.find((item) => item.id === account.id) ?? account;
    setUser(currentUser);
    window.sessionStorage.setItem(MANAGED_SESSION_STORAGE_KEY, currentUser.id);
    return true;
  }

  function signOut() {
    setUser(null);
    setActiveAttemptId(null);
    window.sessionStorage.removeItem(MANAGED_SESSION_STORAGE_KEY);
  }

  if (!hydrated)
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">
          {tx('Loading exam portal…', 'جاري تحميل بوابة الامتحانات…')}
        </p>
      </div>
    );

  const activeAttempt = state.attempts.find(
    (attempt) => attempt.id === activeAttemptId,
  );
  const activeExam = activeAttempt
    ? state.exams.find((exam) => exam.id === activeAttempt.examId)
    : undefined;

  if (user?.role === 'student' && activeAttempt && activeExam) {
    return (
      <ManagedExamPlayer
        user={user}
        exam={activeExam}
        attempt={activeAttempt}
        dark={dark}
        setDark={setDark}
        onStateChange={setState}
        state={state}
        onExit={() => setActiveAttemptId(null)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PortalHeader
        dark={dark}
        setDark={setDark}
        language={language}
        setLanguage={setLanguage}
        user={user}
        onSignOut={signOut}
      />
      {!user ? (
        <ManagedLogin onSignIn={signIn} />
      ) : user.role === 'instructor' ? (
        <InstructorDashboard state={state} setState={setState} user={user} />
      ) : (
        <StudentPortal
          state={state}
          setState={setState}
          user={user}
          onOpenAttempt={(attemptId) => setActiveAttemptId(attemptId)}
        />
      )}
    </main>
  );
}

function PortalHeader({
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
    <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <a
            href={publicAsset('/')}
            aria-label={tx('Return to practice home', 'الرجوع للصفحة الرئيسية')}
            className="grid size-11 place-items-center rounded-2xl bg-[#111c33] font-bold text-[#f4cf2f] shadow-sm"
          >
            P3
          </a>
          <div>
            <p className="font-bold">
              {tx('PL-300 Managed Exams', 'امتحانات PL-300 المُدارة')}
            </p>
            <p className="text-xs text-muted-foreground">
              {tx('Instructor & student portal', 'بوابة المدرس والطالب')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="hidden rounded-lg sm:inline-flex"
          >
            {tx('Local demo backend', 'نسخة تجريبية محلية')}
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

function ManagedLogin({
  onSignIn,
}: {
  onSignIn: (email: string, password: string, role: ManagedRole) => boolean;
}) {
  const { tx } = useLanguage();
  const [role, setRole] = useState<ManagedRole>('student');
  const account = DEMO_ACCOUNTS.find((item) => item.user.role === role)!;
  const [email, setEmail] = useState<string>(account.email);
  const [password, setPassword] = useState<string>(account.password);
  const [error, setError] = useState(false);

  function switchRole(nextRole: ManagedRole) {
    const next = DEMO_ACCOUNTS.find((item) => item.user.role === nextRole)!;
    setRole(nextRole);
    setEmail(next.email);
    setPassword(next.password);
    setError(false);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setError(!onSignIn(email, password, role));
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(15,108,189,.15),transparent_34rem),radial-gradient(circle_at_85%_15%,rgba(244,207,47,.12),transparent_26rem)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-[1250px] items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Badge className="rounded-lg bg-[#111c33] text-[#f4cf2f] hover:bg-[#111c33]">
            {tx('Phases 0–3 · Local preview', 'المراحل 0–3 · معاينة محلية')}
          </Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl sm:leading-[1.08]">
            {tx(
              'Run real student exams, not just practice sessions.',
              'اعمل امتحانات حقيقية للطلبة، مش مجرد جلسات تدريب.',
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {tx(
              'Build a timed exam from the verified bank, protect access with a code, autosave every response, and follow results from one dashboard.',
              'كوّن امتحان بوقت من بنك الأسئلة، اقفل الدخول بكود، احفظ كل إجابة تلقائيًا، وتابع النتائج كلها من داشبورد واحدة.',
            )}
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {[
              [CalendarClock, tx('Schedule & access code', 'ميعاد وكود دخول')],
              [ShieldCheck, tx('Secure exam controls', 'ضوابط وضع الامتحان')],
              [RotateCcw, tx('Autosave & resume', 'حفظ واستكمال تلقائي')],
              [BarChart3, tx('Results & CSV export', 'نتائج وتصدير CSV')],
            ].map(([Icon, label]) => {
              const FeatureIcon = Icon as typeof CalendarClock;
              return (
                <div
                  key={String(label)}
                  className="flex items-center gap-3 rounded-2xl border bg-card/75 p-4 shadow-sm"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FeatureIcon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold">
                    {label as string}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="rounded-[1.75rem] border-primary/15 shadow-[0_28px_80px_rgba(15,35,70,.14)]">
          <CardContent className="p-6 sm:p-8">
            <div className="flex rounded-xl bg-muted p-1">
              {(['student', 'instructor'] as ManagedRole[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => switchRole(item)}
                  className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${role === item ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
                >
                  {item === 'student'
                    ? tx('Student', 'طالب')
                    : tx('Instructor', 'مدرس')}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  {role === 'student' ? (
                    <GraduationCap className="size-5" />
                  ) : (
                    <LayoutDashboard className="size-5" />
                  )}
                </span>
                <div>
                  <h2 className="text-xl font-bold">
                    {tx('Sign in to the portal', 'ادخل على البوابة')}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {tx(
                      'Demo credentials are prefilled for this preview.',
                      'بيانات التجربة مكتوبة تلقائيًا للمعاينة.',
                    )}
                  </p>
                </div>
              </div>
              <form className="mt-6 space-y-4" onSubmit={submit}>
                <div className="space-y-2">
                  <Label htmlFor="managed-email">
                    {tx('Email', 'البريد الإلكتروني')}
                  </Label>
                  <Input
                    id="managed-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="managed-password">
                    {tx('Password', 'كلمة المرور')}
                  </Label>
                  <Input
                    id="managed-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-sm font-medium text-destructive">
                    {tx(
                      'The demo credentials do not match this role.',
                      'بيانات الدخول مش مطابقة للدور المختار.',
                    )}
                  </p>
                )}
                <Button className="w-full" size="lg" type="submit">
                  <KeyRound className="size-4" />{' '}
                  {tx('Open portal', 'افتح البوابة')}
                </Button>
              </form>
              <div className="mt-5 rounded-xl border border-amber-400/35 bg-amber-400/10 p-3 text-xs leading-5 text-muted-foreground">
                <strong className="text-foreground">
                  {tx('Preview note:', 'ملحوظة المعاينة:')}
                </strong>{' '}
                {tx(
                  'accounts and results are stored only in this browser. Production will use Supabase and server-side grading.',
                  'الحسابات والنتائج محفوظة في المتصفح ده فقط. النسخة النهائية هتستخدم Supabase وتصحيح من السيرفر.',
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function InstructorDashboard({
  state,
  setState,
  user,
}: {
  state: ManagedExamState;
  setState: (state: ManagedExamState) => void;
  user: ManagedUser;
}) {
  const { language, tx } = useLanguage();
  const [tab, setTab] = useState<'overview' | 'exams' | 'results'>('overview');
  const [createOpen, setCreateOpen] = useState(false);
  const stats = getManagedDashboard(state);
  const submissions = state.attempts.filter(
    (attempt) => attempt.status === 'submitted',
  );
  const distribution = [
    {
      label: '0–49',
      count: submissions.filter((item) => (item.percent ?? 0) < 50).length,
    },
    {
      label: '50–69',
      count: submissions.filter(
        (item) => (item.percent ?? 0) >= 50 && (item.percent ?? 0) < 70,
      ).length,
    },
    {
      label: '70–84',
      count: submissions.filter(
        (item) => (item.percent ?? 0) >= 70 && (item.percent ?? 0) < 85,
      ).length,
    },
    {
      label: '85–100',
      count: submissions.filter((item) => (item.percent ?? 0) >= 85).length,
    },
  ];

  function exportResults() {
    const blob = new Blob(['\ufeff', managedResultsCsv(state)], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `pl300-managed-results-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-kicker">
            {tx('Instructor workspace', 'مساحة المدرس')}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {tx(`Welcome back, ${user.name}`, `أهلًا يا ${user.name}`)}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {tx(
              'Create exams, watch submissions, and export clean grade sheets.',
              'كوّن الامتحانات، تابع التسليمات، وصدّر كشف درجات جاهز.',
            )}
          </p>
        </div>
        <Button size="lg" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" /> {tx('Create exam', 'إنشاء امتحان')}
        </Button>
      </div>

      <nav className="mt-7 flex w-fit gap-1 rounded-xl border bg-card p-1">
        {(
          [
            ['overview', LayoutDashboard, tx('Overview', 'نظرة عامة')],
            ['exams', ListChecks, tx('Exams', 'الامتحانات')],
            ['results', BarChart3, tx('Results', 'النتائج')],
          ] as const
        ).map(([value, Icon, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </nav>

      {tab === 'overview' && (
        <>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [ListChecks, tx('Exams', 'الامتحانات'), stats.examCount],
              [Users, tx('Students', 'الطلاب'), stats.studentCount],
              [
                CheckCircle2,
                tx('Submissions', 'التسليمات'),
                stats.submissionCount,
              ],
              [
                BarChart3,
                tx('Average score', 'متوسط الدرجات'),
                `${stats.averageScore}%`,
              ],
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
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <Card className="rounded-2xl">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">
                      {tx('Recent exams', 'أحدث الامتحانات')}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {tx(
                        'Current windows and activity',
                        'المواعيد والنشاط الحالي',
                      )}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTab('exams')}
                  >
                    {tx('View all', 'عرض الكل')}
                  </Button>
                </div>
                <div className="mt-5 space-y-3">
                  {state.exams.slice(0, 4).map((exam) => (
                    <ExamRow key={exam.id} exam={exam} state={state} />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-lg font-bold">
                  {tx('Score distribution', 'توزيع الدرجات')}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {tx('Submitted attempts', 'المحاولات المُسلَّمة')}
                </p>
                <div className="mt-6 space-y-4">
                  {distribution.map((item) => (
                    <div key={item.label}>
                      <div className="mb-1.5 flex justify-between text-xs font-medium">
                        <span>{item.label}%</span>
                        <span>{item.count}</span>
                      </div>
                      <Progress
                        value={
                          submissions.length
                            ? (item.count / submissions.length) * 100
                            : 0
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {tab === 'exams' && (
        <div className="mt-7 grid gap-4">
          {state.exams.map((exam) => (
            <Card key={exam.id} className="rounded-2xl">
              <CardContent className="p-5 sm:p-6">
                <ExamRow exam={exam} state={state} detailed />
                <div className="mt-5 grid gap-3 border-t pt-5 text-sm sm:grid-cols-2 lg:grid-cols-5">
                  <Info
                    label={tx('Access code', 'كود الدخول')}
                    value={exam.accessCode}
                  />
                  <Info
                    label={tx('Duration', 'المدة')}
                    value={`${exam.durationMinutes} ${tx('min', 'دقيقة')}`}
                  />
                  <Info
                    label={tx('Pass score', 'درجة النجاح')}
                    value={`${exam.passScore}%`}
                  />
                  <Info
                    label={tx('Max attempts', 'عدد المحاولات')}
                    value={exam.maxAttempts}
                  />
                  <Info
                    label={tx('Security', 'الحماية')}
                    value={
                      exam.secureMode
                        ? tx('Enabled', 'مفعّلة')
                        : tx('Standard', 'عادية')
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === 'results' && (
        <Card className="mt-7 overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5 sm:p-6">
              <div>
                <h2 className="text-lg font-bold">
                  {tx('Student results', 'نتائج الطلاب')}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {tx(
                    'Auto-graded scores and recorded exam events',
                    'الدرجات المصححة تلقائيًا وأحداث وضع الامتحان',
                  )}
                </p>
              </div>
              <Button variant="outline" onClick={exportResults}>
                <Download className="size-4" /> {tx('Export CSV', 'تصدير CSV')}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm rtl:text-right">
                <thead className="bg-muted/70 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">{tx('Student', 'الطالب')}</th>
                    <th className="px-5 py-3">{tx('Exam', 'الامتحان')}</th>
                    <th className="px-5 py-3">{tx('Status', 'الحالة')}</th>
                    <th className="px-5 py-3">{tx('Score', 'الدرجة')}</th>
                    <th className="px-5 py-3">{tx('Manual', 'يدوي')}</th>
                    <th className="px-5 py-3">{tx('Events', 'الأحداث')}</th>
                    <th className="px-5 py-3">{tx('Submitted', 'التسليم')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {state.attempts.length === 0 ? (
                    <tr>
                      <td
                        className="px-5 py-10 text-center text-muted-foreground"
                        colSpan={7}
                      >
                        {tx(
                          'No attempts yet. Sign in as the demo student to test the flow.',
                          'مفيش محاولات لسه. ادخل بحساب الطالب التجريبي وجرب المسار.',
                        )}
                      </td>
                    </tr>
                  ) : (
                    state.attempts.map((attempt) => {
                      const student = state.users.find(
                        (item) => item.id === attempt.studentId,
                      );
                      const exam = state.exams.find(
                        (item) => item.id === attempt.examId,
                      );
                      return (
                        <tr key={attempt.id}>
                          <td className="px-5 py-4">
                            <strong className="block">{student?.name}</strong>
                            <span className="text-xs text-muted-foreground">
                              {student?.email}
                            </span>
                          </td>
                          <td className="px-5 py-4">{exam?.title}</td>
                          <td className="px-5 py-4">
                            <Badge variant="secondary">
                              {attempt.status.replace('_', ' ')}
                            </Badge>
                          </td>
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
                              : '—'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <CreateExamDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        state={state}
        user={user}
        onCreated={(nextState) => {
          setState(nextState);
          setCreateOpen(false);
          setTab('exams');
        }}
      />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function ExamRow({
  exam,
  state,
  detailed = false,
}: {
  exam: ManagedExam;
  state: ManagedExamState;
  detailed?: boolean;
}) {
  const { language, tx } = useLanguage();
  const availability = examAvailability(exam);
  const attempts = state.attempts.filter((item) => item.examId === exam.id);
  const statusLabel = {
    open: tx('Open', 'مفتوح'),
    scheduled: tx('Scheduled', 'مجدول'),
    closed: tx('Closed', 'مغلق'),
    draft: tx('Draft', 'مسودة'),
  }[availability];
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
          <ListChecks className="size-5" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-bold">{exam.title}</h3>
            <Badge variant={availability === 'open' ? 'default' : 'secondary'}>
              {statusLabel}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {exam.questionIds.length} {tx('questions', 'سؤال')} ·{' '}
            {formatDate(exam.opensAt, language)}
            {detailed ? ` → ${formatDate(exam.closesAt, language)}` : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 text-sm">
        <div className="text-right rtl:text-left">
          <p className="font-bold">{attempts.length}</p>
          <p className="text-xs text-muted-foreground">
            {tx('attempts', 'محاولات')}
          </p>
        </div>
        <div className="text-right rtl:text-left">
          <p className="font-bold">{exam.durationMinutes}m</p>
          <p className="text-xs text-muted-foreground">
            {tx('duration', 'المدة')}
          </p>
        </div>
      </div>
    </div>
  );
}

function CreateExamDialog({
  open,
  onOpenChange,
  state,
  user,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: ManagedExamState;
  user: ManagedUser;
  onCreated: (state: ManagedExamState) => void;
}) {
  const { tx } = useLanguage();
  const now = new Date();
  const [title, setTitle] = useState('PL-300 Class Exam');
  const [description, setDescription] = useState(
    'Timed assessment covering the selected PL-300 skill area.',
  );
  const [domain, setDomain] = useState<'all' | Domain>('all');
  const [count, setCount] = useState(50);
  const [duration, setDuration] = useState(100);
  const [opensAt, setOpensAt] = useState(dateTimeLocal(now));
  const [closesAt, setClosesAt] = useState(
    dateTimeLocal(new Date(now.getTime() + 7 * 24 * 3600_000)),
  );
  const [accessCode, setAccessCode] = useState('BASSAM300');
  const [passScore, setPassScore] = useState(70);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleChoices, setShuffleChoices] = useState(true);
  const [secureMode, setSecureMode] = useState(true);
  const [showScoreAfterSubmit, setShowScoreAfterSubmit] = useState(true);
  const eligible =
    domain === 'all'
      ? questions
      : questions.filter((question) => question.domain === domain);

  function create() {
    if (!title.trim() || !accessCode.trim() || eligible.length === 0) return;
    const selection = eligible
      .slice(0, Math.max(1, Math.min(count, eligible.length)))
      .map((question) => question.id);
    const result = createManagedExam(state, user.id, {
      title: title.trim(),
      description: description.trim(),
      questionIds: selection,
      durationMinutes: Math.max(5, duration),
      opensAt: new Date(opensAt).toISOString(),
      closesAt: new Date(closesAt).toISOString(),
      accessCode,
      passScore: Math.min(100, Math.max(0, passScore)),
      maxAttempts: Math.max(1, maxAttempts),
      shuffleQuestions,
      shuffleChoices,
      secureMode,
      showScoreAfterSubmit,
      status: 'published',
    });
    onCreated(result.state);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {tx('Create a managed exam', 'إنشاء امتحان مُدار')}
          </DialogTitle>
          <DialogDescription>
            {tx(
              'Choose the question scope, access window, attempts, and security controls.',
              'اختار نطاق الأسئلة، ميعاد الدخول، المحاولات، وضوابط الأمان.',
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-3 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>{tx('Exam title', 'اسم الامتحان')}</Label>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{tx('Instructions', 'التعليمات')}</Label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{tx('Question scope', 'نطاق الأسئلة')}</Label>
            <select
              className="h-9 w-full rounded-lg border bg-background px-3 text-sm"
              value={domain}
              onChange={(event) =>
                setDomain(event.target.value as 'all' | Domain)
              }
            >
              <option value="all">
                {tx('All skill areas', 'كل مجالات المهارات')}
              </option>
              {domains.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              {eligible.length} {tx('eligible questions', 'سؤال متاح')}
            </p>
          </div>
          <NumberField
            label={tx('Question count', 'عدد الأسئلة')}
            value={count}
            onChange={setCount}
            min={1}
            max={eligible.length}
          />
          <NumberField
            label={tx('Duration (minutes)', 'المدة بالدقائق')}
            value={duration}
            onChange={setDuration}
            min={5}
            max={300}
          />
          <NumberField
            label={tx('Pass score (%)', 'درجة النجاح %')}
            value={passScore}
            onChange={setPassScore}
            min={0}
            max={100}
          />
          <div className="space-y-2">
            <Label>{tx('Opens at', 'يفتح في')}</Label>
            <Input
              type="datetime-local"
              value={opensAt}
              onChange={(event) => setOpensAt(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{tx('Closes at', 'يقفل في')}</Label>
            <Input
              type="datetime-local"
              value={closesAt}
              onChange={(event) => setClosesAt(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{tx('Access code', 'كود الدخول')}</Label>
            <Input
              value={accessCode}
              onChange={(event) =>
                setAccessCode(event.target.value.toUpperCase())
              }
            />
          </div>
          <NumberField
            label={tx('Maximum attempts', 'أقصى عدد محاولات')}
            value={maxAttempts}
            onChange={setMaxAttempts}
            min={1}
            max={10}
          />
          <div className="sm:col-span-2 grid gap-3 rounded-2xl border bg-muted/25 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <Toggle
              label={tx('Shuffle questions', 'خلط الأسئلة')}
              checked={shuffleQuestions}
              onCheckedChange={setShuffleQuestions}
            />
            <Toggle
              label={tx('Shuffle choices', 'خلط الاختيارات')}
              checked={shuffleChoices}
              onCheckedChange={setShuffleChoices}
            />
            <Toggle
              label={tx('Secure mode', 'وضع الامتحان الآمن')}
              checked={secureMode}
              onCheckedChange={setSecureMode}
            />
            <Toggle
              label={tx('Show score after submit', 'إظهار الدرجة بعد التسليم')}
              checked={showScoreAfterSubmit}
              onCheckedChange={setShowScoreAfterSubmit}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tx('Cancel', 'إلغاء')}
          </Button>
          <Button onClick={create}>
            <FilePlus2 className="size-4" /> {tx('Publish exam', 'نشر الامتحان')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <Label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-background p-3">
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </Label>
  );
}

function StudentPortal({
  state,
  setState,
  user,
  onOpenAttempt,
}: {
  state: ManagedExamState;
  setState: (state: ManagedExamState) => void;
  user: ManagedUser;
  onOpenAttempt: (attemptId: string) => void;
}) {
  const { language, tx } = useLanguage();
  const [codes, setCodes] = useState<Record<string, string>>({
    'exam-demo-live': 'PL300',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const exams = state.exams.filter((exam) => exam.status === 'published');

  function enterExam(exam: ManagedExam) {
    const result = startOrResumeManagedAttempt(state, {
      examId: exam.id,
      studentId: user.id,
      accessCode: codes[exam.id] ?? '',
      questionsById: questionById,
    });
    setState(result.state);
    if (result.attempt) {
      setErrors((current) => ({ ...current, [exam.id]: '' }));
      onOpenAttempt(result.attempt.id);
      return;
    }
    const message = {
      bad_code: tx('The access code is incorrect.', 'كود الدخول غير صحيح.'),
      not_open: tx('This exam has not opened yet.', 'الامتحان لسه ما فتحش.'),
      closed: tx(
        'This exam is closed or the saved attempt expired.',
        'الامتحان مقفول أو المحاولة المحفوظة انتهت.',
      ),
      max_attempts: tx(
        'You have used all allowed attempts.',
        'استخدمت كل المحاولات المسموحة.',
      ),
      not_found: tx('Exam not found.', 'الامتحان غير موجود.'),
      not_published: tx('This exam is not published.', 'الامتحان غير منشور.'),
    }[result.error ?? 'not_found'];
    setErrors((current) => ({ ...current, [exam.id]: message }));
  }

  return (
    <div className="mx-auto max-w-[1250px] px-4 py-8 sm:px-8">
      <div className="rounded-[1.75rem] bg-[#111c33] p-7 text-white shadow-[0_24px_60px_rgba(17,28,51,.2)] sm:p-9">
        <Badge className="bg-[#f4cf2f] text-[#111c33] hover:bg-[#f4cf2f]">
          {tx('Student portal', 'بوابة الطالب')}
        </Badge>
        <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
          {tx(`Welcome, ${user.name}`, `أهلًا يا ${user.name}`)}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          {tx(
            'Enter the code supplied by your instructor. Your work is saved automatically and the countdown continues from the server-style deadline.',
            'اكتب الكود اللي أخدته من المدرس. إجاباتك بتتحفظ تلقائيًا والوقت بيكمل من ميعاد النهاية المحفوظ.',
          )}
        </p>
      </div>
      <div className="mt-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="section-kicker">
              {tx('Assigned exams', 'الامتحانات المتاحة')}
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {tx('Your exam windows', 'مواعيد امتحاناتك')}
            </h2>
          </div>
          <Badge variant="secondary">
            {exams.length} {tx('exams', 'امتحانات')}
          </Badge>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {exams.map((exam) => {
            const availability = examAvailability(exam);
            const attempts = state.attempts.filter(
              (attempt) =>
                attempt.examId === exam.id && attempt.studentId === user.id,
            );
            const active = attempts.find(
              (attempt) => attempt.status === 'in_progress',
            );
            const submitted = attempts.filter(
              (attempt) => attempt.status === 'submitted',
            );
            return (
              <Card key={exam.id} className="rounded-[1.5rem]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <GraduationCap className="size-6" />
                    </span>
                    <Badge
                      variant={
                        availability === 'open' ? 'default' : 'secondary'
                      }
                    >
                      {availability === 'open'
                        ? tx('Open now', 'مفتوح الآن')
                        : availability === 'scheduled'
                          ? tx('Scheduled', 'مجدول')
                          : tx('Closed', 'مغلق')}
                    </Badge>
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{exam.title}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                    {exam.description}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-muted/50 p-3 text-center">
                    <Info
                      label={tx('Questions', 'الأسئلة')}
                      value={exam.questionIds.length}
                    />
                    <Info
                      label={tx('Minutes', 'الدقائق')}
                      value={exam.durationMinutes}
                    />
                    <Info
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
                    {submitted[0]?.percent !== undefined && (
                      <p className="font-semibold text-foreground">
                        {tx('Latest score:', 'آخر درجة:')}{' '}
                        {submitted[0].percent}%
                      </p>
                    )}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Input
                      placeholder={tx('Access code', 'كود الدخول')}
                      value={codes[exam.id] ?? ''}
                      onChange={(event) =>
                        setCodes((current) => ({
                          ...current,
                          [exam.id]: event.target.value.toUpperCase(),
                        }))
                      }
                      disabled={availability !== 'open'}
                    />
                    <Button
                      onClick={() => enterExam(exam)}
                      disabled={availability !== 'open'}
                    >
                      {active ? (
                        <RotateCcw className="size-4" />
                      ) : (
                        <Play className="size-4" />
                      )}
                      {active ? tx('Resume', 'استكمال') : tx('Start', 'ابدأ')}
                    </Button>
                  </div>
                  {errors[exam.id] && (
                    <p className="mt-3 text-sm font-medium text-destructive">
                      {errors[exam.id]}
                    </p>
                  )}
                  {exam.secureMode && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-muted-foreground">
                      <ShieldCheck className="size-4 text-amber-600" />
                      {tx(
                        'Secure controls and event logging are enabled.',
                        'ضوابط الامتحان وتسجيل الأحداث مفعّلين.',
                      )}
                    </div>
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

export function ManagedExamPlayer({
  user,
  exam,
  attempt,
  state,
  onStateChange,
  onExit,
  dark,
  setDark,
  questionsMap = questionById,
  onPersistAttempt,
  onSubmitAttempt,
}: {
  user: ManagedUser;
  exam: ManagedExam;
  attempt: ManagedAttempt;
  state: ManagedExamState;
  onStateChange: (state: ManagedExamState) => void;
  onExit: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  questionsMap?: Map<string, Question>;
  onPersistAttempt?: (attempt: ManagedAttempt) => void;
  onSubmitAttempt?: (attempt: ManagedAttempt) => Promise<void>;
}) {
  const { language, setLanguage, tx } = useLanguage();
  const [now, setNow] = useState(Date.now());
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const currentAttempt =
    state.attempts.find((item) => item.id === attempt.id) ?? attempt;
  const currentQuestion = questionsMap.get(
    currentAttempt.questionOrder[currentAttempt.current],
  );
  const secondsLeft = Math.max(
    0,
    Math.floor((new Date(currentAttempt.expiresAt).getTime() - now) / 1000),
  );
  const answered = currentAttempt.questionOrder.filter((id) => {
    const question = questionsMap.get(id);
    return question ? isAnswered(question, currentAttempt.answers[id]) : false;
  }).length;
  const unanswered = currentAttempt.questionOrder.length - answered;
  const flaggedCount = currentAttempt.flags.length;
  const lockedQuestionIds = useMemo(
    () =>
      new Set(
        currentAttempt.events
          .filter((event) => event.type === 'question_locked' && event.detail)
          .map((event) => event.detail!),
      ),
    [currentAttempt.events],
  );
  const lockedCount = lockedQuestionIds.size;
  const securityEventCount = currentAttempt.events.filter(
    (event) => event.type !== 'question_locked',
  ).length;

  const savePatch = useCallback(
    (patch: Parameters<typeof updateManagedAttempt>[2]) => {
      const nextState = updateManagedAttempt(state, currentAttempt.id, patch);
      onStateChange(nextState);
      const updated = nextState.attempts.find(
        (item) => item.id === currentAttempt.id,
      );
      if (updated) onPersistAttempt?.(updated);
    },
    [currentAttempt.id, onPersistAttempt, onStateChange, state],
  );

  const recordEvent = useCallback(
    (type: ManagedAttemptEvent['type'], detail?: string) => {
      const nextState = addManagedAttemptEvent(
        state,
        currentAttempt.id,
        type,
        detail,
      );
      onStateChange(nextState);
      const updated = nextState.attempts.find(
        (item) => item.id === currentAttempt.id,
      );
      if (updated) onPersistAttempt?.(updated);
    },
    [currentAttempt.id, onPersistAttempt, onStateChange, state],
  );

  const navigateTo = useCallback(
    (nextIndex: number) => {
      const nextQuestionId = currentAttempt.questionOrder[nextIndex];
      if (!nextQuestionId || lockedQuestionIds.has(nextQuestionId)) return;
      if (nextIndex === currentAttempt.current) return;

      const shouldLockCurrent =
        Boolean(currentQuestion) &&
        isNonReturnableQuestion(currentQuestion!) &&
        isAnswered(
          currentQuestion!,
          currentAttempt.answers[currentQuestion!.id],
        ) &&
        !lockedQuestionIds.has(currentQuestion!.id);

      savePatch({
        current: nextIndex,
        ...(shouldLockCurrent
          ? {
              events: [
                ...currentAttempt.events,
                {
                  id: crypto.randomUUID(),
                  type: 'question_locked' as const,
                  at: new Date().toISOString(),
                  detail: currentQuestion!.id,
                },
              ],
            }
          : {}),
      });
    },
    [
      currentAttempt.answers,
      currentAttempt.current,
      currentAttempt.events,
      currentAttempt.questionOrder,
      currentQuestion,
      lockedQuestionIds,
      savePatch,
    ],
  );

  const openReview = useCallback(() => {
    if (
      currentQuestion &&
      isNonReturnableQuestion(currentQuestion) &&
      isAnswered(currentQuestion, currentAttempt.answers[currentQuestion.id]) &&
      !lockedQuestionIds.has(currentQuestion.id)
    ) {
      savePatch({
        events: [
          ...currentAttempt.events,
          {
            id: crypto.randomUUID(),
            type: 'question_locked',
            at: new Date().toISOString(),
            detail: currentQuestion.id,
          },
        ],
      });
    }
    setSubmitOpen(true);
  }, [
    currentAttempt.answers,
    currentAttempt.events,
    currentQuestion,
    lockedQuestionIds,
    savePatch,
  ]);

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');
    if (onSubmitAttempt) {
      try {
        await onSubmitAttempt(currentAttempt);
        setSubmitOpen(false);
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : tx(
                'Submission failed. Please try again.',
                'التسليم فشل. حاول تاني.',
              ),
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }
    onStateChange(submitManagedAttempt(state, currentAttempt.id, questionsMap));
    setSubmitOpen(false);
    setSubmitting(false);
  }, [
    currentAttempt,
    onStateChange,
    onSubmitAttempt,
    questionsMap,
    state,
    submitting,
    tx,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0 && currentAttempt.status === 'in_progress') submit();
  }, [currentAttempt.status, secondsLeft, submit]);

  useEffect(() => {
    if (!exam.secureMode || currentAttempt.status !== 'in_progress') return;
    const blockCopy = (event: ClipboardEvent) => {
      event.preventDefault();
      recordEvent('copy_blocked');
    };
    const blockContext = (event: MouseEvent) => {
      event.preventDefault();
      recordEvent('context_menu_blocked');
    };
    const visibility = () => {
      if (document.hidden) recordEvent('tab_hidden');
    };
    const blur = () => recordEvent('window_blur');
    const fullscreen = () => {
      if (!document.fullscreenElement) recordEvent('fullscreen_exit');
    };
    document.addEventListener('copy', blockCopy);
    document.addEventListener('cut', blockCopy);
    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('fullscreenchange', fullscreen);
    window.addEventListener('blur', blur);
    return () => {
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('cut', blockCopy);
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('fullscreenchange', fullscreen);
      window.removeEventListener('blur', blur);
    };
  }, [currentAttempt.status, exam.secureMode, recordEvent]);

  if (currentAttempt.status !== 'in_progress') {
    const passed = (currentAttempt.percent ?? 0) >= exam.passScore;
    const showScore = exam.showScoreAfterSubmit !== false;
    return (
      <main className="grid min-h-screen place-items-center bg-background p-4 text-foreground">
        <Card className="w-full max-w-2xl rounded-[1.75rem]">
          <CardContent className="p-8 text-center">
            <span
              className={`mx-auto grid size-16 place-items-center rounded-full ${showScore && passed ? 'bg-emerald-500/12 text-emerald-600' : 'bg-amber-500/12 text-amber-600'}`}
            >
              {showScore && passed ? (
                <CheckCircle2 className="size-8" />
              ) : (
                <ClipboardCheck className="size-8" />
              )}
            </span>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {tx('Attempt submitted', 'تم تسليم المحاولة')}
            </p>
            <h1 className="mt-2 text-3xl font-bold">{exam.title}</h1>
            {showScore ? (
              <>
                <p className="mt-5 text-6xl font-bold text-primary">
                  {currentAttempt.percent ?? 0}%
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {currentAttempt.correct ?? 0} {tx('correct', 'صح')} ·{' '}
                  {currentAttempt.incorrect ?? 0} {tx('incorrect', 'غلط')} ·{' '}
                  {currentAttempt.unanswered ?? 0}{' '}
                  {tx('unanswered', 'بدون إجابة')}
                </p>
              </>
            ) : (
              <p className="mx-auto mt-5 max-w-md rounded-2xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
                {tx(
                  'Your answers were submitted successfully. The instructor has chosen to keep the score private.',
                  'إجاباتك اتسلمت بنجاح. المدرس اختار إن النتيجة تفضل مخفية.',
                )}
              </p>
            )}
            {showScore && Boolean(currentAttempt.manualPending) && (
              <p className="mt-3 rounded-xl bg-amber-400/10 p-3 text-sm text-amber-700 dark:text-amber-300">
                {currentAttempt.manualPending}{' '}
                {tx(
                  'visual answers are pending instructor review.',
                  'إجابة بصرية مستنية مراجعة المدرس.',
                )}
              </p>
            )}
            <Button className="mt-7" size="lg" onClick={onExit}>
              <Home className="size-4" />{' '}
              {tx('Return to portal', 'ارجع للبوابة')}
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!currentQuestion) return null;
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef3f8] text-[#172033] dark:bg-[#08111f] dark:text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 z-30 flex select-none flex-wrap content-start gap-x-24 gap-y-20 overflow-hidden p-12 opacity-[0.035]"
        aria-hidden="true"
      >
        {Array.from({ length: 30 }, (_, index) => (
          <span
            key={index}
            className="rotate-[-24deg] whitespace-nowrap text-sm font-bold"
          >
            {user.name} · {user.email}
          </span>
        ))}
      </div>
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur dark:bg-[#0d1728]/95">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#111c33] font-bold text-[#f4cf2f]">
              P3
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold">{exam.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.name} · {tx('Autosaved', 'محفوظ تلقائيًا')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.documentElement.requestFullscreen?.()}
            >
              <Fullscreen className="size-4" />
              <span className="hidden sm:inline">
                {tx('Full screen', 'ملء الشاشة')}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            >
              <Languages className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <div
              className={`rounded-xl border px-3 py-2 font-mono text-sm font-bold ${secondsLeft < 300 ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300' : 'bg-background'}`}
            >
              <Clock3 className="me-2 inline size-4" />
              {formatTimer(secondsLeft)}
            </div>
          </div>
        </div>
      </header>
      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-5 px-3 py-5 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-[#0d1728]">
          <div className="flex items-center justify-between">
            <p className="font-bold">
              {tx('Question navigator', 'التنقل بين الأسئلة')}
            </p>
            <Badge variant="secondary">
              {answered}/{currentAttempt.questionOrder.length}
            </Badge>
          </div>
          <Progress
            className="mt-3"
            value={(answered / currentAttempt.questionOrder.length) * 100}
          />
          <div className="mt-4 grid max-h-[55vh] grid-cols-5 gap-2 overflow-y-auto pr-1">
            {currentAttempt.questionOrder.map((id, index) => {
              const question = questionsMap.get(id);
              const done = question
                ? isAnswered(question, currentAttempt.answers[id])
                : false;
              const flagged = currentAttempt.flags.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => navigateTo(index)}
                  disabled={lockedQuestionIds.has(id)}
                  className={`relative aspect-square rounded-lg border text-xs font-semibold ${index === currentAttempt.current ? 'border-primary bg-primary text-primary-foreground' : lockedQuestionIds.has(id) ? 'cursor-not-allowed border-slate-300 bg-slate-100 text-slate-400 dark:bg-slate-900' : done ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300' : 'bg-background'}`}
                >
                  {index + 1}
                  {lockedQuestionIds.has(id) && (
                    <LockKeyhole className="absolute -right-1 -top-1 size-3 text-slate-500" />
                  )}
                  {flagged && (
                    <Flag className="absolute -right-1 -top-1 size-3 fill-amber-400 text-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-5 space-y-2 border-t pt-4 text-xs text-muted-foreground">
            <p className="flex items-center justify-between">
              <span>{tx('Security events', 'أحداث الحماية')}</span>
              <strong className="text-foreground">{securityEventCount}</strong>
            </p>
            <p>
              {tx(
                'Copy, right-click, tab switching, and focus changes are logged in this preview.',
                'النسخ والكليك يمين وتغيير التاب وفقدان التركيز بيتسجلوا في المعاينة.',
              )}
            </p>
            {lockedCount > 0 && (
              <p className="flex items-center justify-between">
                <span>{tx('Locked series items', 'أسئلة Series مقفولة')}</span>
                <strong className="text-foreground">{lockedCount}</strong>
              </p>
            )}
          </div>
        </aside>
        <section className="min-w-0 rounded-2xl border bg-white shadow-sm dark:bg-[#0d1728]">
          <div className="border-b px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge>
                  {tx('Question', 'سؤال')} {currentAttempt.current + 1}
                </Badge>
                <Badge variant="secondary">{currentQuestion.domain}</Badge>
              </div>
              <Button
                variant={
                  currentAttempt.flags.includes(currentQuestion.id)
                    ? 'default'
                    : 'outline'
                }
                size="sm"
                onClick={() => {
                  const flags = currentAttempt.flags.includes(
                    currentQuestion.id,
                  )
                    ? currentAttempt.flags.filter(
                        (id) => id !== currentQuestion.id,
                      )
                    : [...currentAttempt.flags, currentQuestion.id];
                  savePatch({ flags });
                }}
              >
                <Flag className="size-4" /> {tx('Flag', 'علّم')}
              </Button>
            </div>
          </div>
          <div className="p-5 sm:p-7">
            <QuestionContext question={currentQuestion} />
            <p
              dir="ltr"
              lang="en"
              className="whitespace-pre-line text-left text-[15px] font-medium leading-7 sm:text-base"
            >
              {currentQuestion.prompt}
            </p>
            {currentQuestion.image && (
              <div className="mt-5 overflow-auto rounded-xl border bg-white p-3">
                <img
                  src={publicAsset(currentQuestion.image)}
                  alt={tx('Question exhibit', 'صورة السؤال')}
                  className="mx-auto max-h-[620px] w-auto max-w-full"
                  draggable={false}
                />
              </div>
            )}
            <div className="mt-6">
              <ManagedAnswer
                question={currentQuestion}
                answer={currentAttempt.answers[currentQuestion.id] ?? []}
                choiceOrder={
                  currentAttempt.choiceOrders[currentQuestion.id] ??
                  currentQuestion.choices.map((_, index) => index)
                }
                onChange={(answer) =>
                  savePatch({
                    answers: {
                      ...currentAttempt.answers,
                      [currentQuestion.id]: answer,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4 sm:px-7">
            <Button
              variant="outline"
              disabled={
                currentAttempt.current === 0 ||
                lockedQuestionIds.has(
                  currentAttempt.questionOrder[currentAttempt.current - 1],
                )
              }
              onClick={() => navigateTo(currentAttempt.current - 1)}
            >
              <ArrowLeft
                className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
              />{' '}
              {tx('Previous', 'السابق')}
            </Button>
            <div className="flex gap-2">
              {currentAttempt.current ===
              currentAttempt.questionOrder.length - 1 ? (
                <Button onClick={openReview}>
                  <ListChecks className="size-4" />{' '}
                  {tx('Review exam', 'راجع الامتحان')}
                </Button>
              ) : (
                <Button onClick={() => navigateTo(currentAttempt.current + 1)}>
                  {tx('Next', 'التالي')}{' '}
                  <ArrowRight
                    className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
                  />
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
      <Dialog
        open={submitOpen}
        onOpenChange={(open) => {
          if (!submitting) setSubmitOpen(open);
        }}
      >
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{tx('Review your exam', 'راجع امتحانك')}</DialogTitle>
            <DialogDescription>
              {tx(
                'Select any question to return to it. When you are ready, submit the exam from this screen.',
                'اختار أي سؤال علشان ترجعله. لما تخلص مراجعتك سلّم الامتحان من الشاشة دي.',
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-50 p-4 text-center dark:bg-emerald-950/20">
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {answered}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tx('Answered', 'مُجاب')}
              </p>
            </div>
            <div className="rounded-xl border bg-muted/35 p-4 text-center">
              <p className="text-2xl font-bold">{unanswered}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tx('Unanswered', 'بدون إجابة')}
              </p>
            </div>
            <div className="rounded-xl border border-amber-400/35 bg-amber-50 p-4 text-center dark:bg-amber-950/20">
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {flaggedCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tx('Flagged', 'مُعلّم')}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="mb-3 text-sm font-bold">
              {tx('Question overview', 'ملخص الأسئلة')}
            </p>
            <div className="grid grid-cols-7 gap-2 sm:grid-cols-10">
              {currentAttempt.questionOrder.map((id, index) => {
                if (lockedQuestionIds.has(id)) return null;
                const question = questionsMap.get(id);
                const done = question
                  ? isAnswered(question, currentAttempt.answers[id])
                  : false;
                const flagged = currentAttempt.flags.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      navigateTo(index);
                      setSubmitOpen(false);
                    }}
                    className={`relative aspect-square rounded-lg border text-xs font-semibold transition hover:border-primary ${done ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300' : 'bg-background'}`}
                    aria-label={tx(
                      `Go to question ${index + 1}`,
                      `اذهب للسؤال ${index + 1}`,
                    )}
                  >
                    {index + 1}
                    {flagged && (
                      <Flag className="absolute -right-1 -top-1 size-3 fill-amber-400 text-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          {lockedCount > 0 && (
            <p className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              {tx(
                `${lockedCount} completed item-series question${lockedCount === 1 ? '' : 's'} cannot be revisited and ${lockedCount === 1 ? 'is' : 'are'} excluded from review, matching the instruction shown with those items.`,
                `${lockedCount} من أسئلة الـSeries اتقفلت بعد الانتقال ومش هتظهر للمراجعة، زي التعليمات المكتوبة مع النوع ده.`,
              )}
            </p>
          )}
          {unanswered > 0 && (
            <p className="rounded-xl border border-amber-400/35 bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/25 dark:text-amber-100">
              {tx(
                `You still have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}.`,
                `لسه عندك ${unanswered} سؤال بدون إجابة.`,
              )}
            </p>
          )}
          {submitError && (
            <p className="rounded-xl border border-red-400/35 bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/25 dark:text-red-100">
              {submitError}
            </p>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              disabled={submitting}
              onClick={() => setSubmitOpen(false)}
            >
              {tx('Keep working', 'كمّل حل')}
            </Button>
            <Button disabled={submitting} onClick={() => void submit()}>
              <Check className="size-4" />{' '}
              {submitting
                ? tx('Submitting…', 'جاري التسليم…')
                : tx('Submit exam', 'سلّم الامتحان')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function QuestionContext({ question }: { question: Question }) {
  const { tx } = useLanguage();
  if (!question.context) return null;
  return (
    <div className="mb-5 rounded-2xl border border-blue-300/40 bg-blue-50/75 p-4 text-sm leading-7 text-slate-800 dark:bg-blue-950/20 dark:text-blue-100">
      <p className="mb-2 font-bold text-primary">
        {tx('Case study context', 'سياق الـ Case Study')}
      </p>
      <p dir="ltr" lang="en" className="whitespace-pre-line text-left">
        {question.context}
      </p>
    </div>
  );
}

type DragChoicePayload = { choice: number; fromSlot: number | null };
type PointerDragState = DragChoicePayload & { x: number; y: number };

function DragChoiceImage({
  option,
  choice,
}: {
  option: DragDropOption;
  choice: number;
}) {
  const { tx } = useLanguage();
  return (
    <img
      src={publicAsset(option.image)}
      alt={tx(`Choice ${choice + 1}`, `الاختيار ${choice + 1}`)}
      width={option.width}
      height={option.height}
      draggable={false}
      className="h-auto max-h-24 w-full select-none object-contain object-left"
    />
  );
}

function DragDropManagedAnswer({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const { tx, language } = useLanguage();
  const spec = dragDropData[question.id];
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [pointerDrag, setPointerDrag] = useState<PointerDragState | null>(null);
  const slots = useMemo(
    () =>
      Array.from(
        { length: spec?.slots ?? 0 },
        (_, index) => value[index] ?? -1,
      ),
    [spec?.slots, value],
  );

  const placeChoice = useCallback(
    (payload: DragChoicePayload, targetSlot: number) => {
      if (!spec) return;
      const next = Array.from(
        { length: spec.slots },
        (_, index) => value[index] ?? -1,
      );
      const displaced = next[targetSlot];
      if (payload.fromSlot != null) next[payload.fromSlot] = -1;
      if (!spec.allowReuse) {
        next.forEach((choice, index) => {
          if (choice === payload.choice && index !== targetSlot)
            next[index] = -1;
        });
      }
      next[targetSlot] = payload.choice;
      if (
        payload.fromSlot != null &&
        payload.fromSlot !== targetSlot &&
        displaced >= 0
      ) {
        next[payload.fromSlot] = displaced;
      }
      onChange(next);
      setSelectedChoice(null);
    },
    [onChange, spec, value],
  );

  useEffect(() => {
    if (!pointerDrag) return;
    const movePointer = (event: PointerEvent) => {
      event.preventDefault();
      setPointerDrag((current) =>
        current ? { ...current, x: event.clientX, y: event.clientY } : null,
      );
    };
    const finishPointer = (event: PointerEvent) => {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      const target = element?.closest<HTMLElement>('[data-drop-slot]');
      const board = target?.closest<HTMLElement>('[data-drag-question]');
      if (target && board?.dataset.dragQuestion === question.id) {
        placeChoice(pointerDrag, Number(target.dataset.dropSlot));
      }
      setPointerDrag(null);
    };
    document.addEventListener('pointermove', movePointer, { passive: false });
    document.addEventListener('pointerup', finishPointer, { once: true });
    document.addEventListener('pointercancel', finishPointer, { once: true });
    return () => {
      document.removeEventListener('pointermove', movePointer);
      document.removeEventListener('pointerup', finishPointer);
      document.removeEventListener('pointercancel', finishPointer);
    };
  }, [placeChoice, pointerDrag, question.id]);

  if (!spec) return null;
  const usedChoices = new Set(slots.filter((choice) => choice >= 0));
  const availableChoices = spec.options
    .map((_, index) => index)
    .filter((index) => spec.allowReuse || !usedChoices.has(index));

  function setNativePayload(
    event: ReactDragEvent<HTMLElement>,
    payload: DragChoicePayload,
  ) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(
      'application/x-pl300-choice',
      JSON.stringify(payload),
    );
  }

  function receiveNativeDrop(
    event: ReactDragEvent<HTMLElement>,
    targetSlot: number,
  ) {
    event.preventDefault();
    try {
      placeChoice(
        JSON.parse(
          event.dataTransfer.getData('application/x-pl300-choice'),
        ) as DragChoicePayload,
        targetSlot,
      );
    } catch {
      // Ignore drags that did not originate from this question board.
    }
  }

  function beginPointerDrag(
    event: ReactPointerEvent<HTMLElement>,
    payload: DragChoicePayload,
  ) {
    event.preventDefault();
    setPointerDrag({ ...payload, x: event.clientX, y: event.clientY });
  }

  function removeFromSlot(slotIndex: number) {
    const next = [...slots];
    next[slotIndex] = -1;
    onChange(next);
    setSelectedChoice(null);
  }

  return (
    <div data-drag-question={question.id} className="space-y-5">
      <div
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="rounded-xl border border-primary/25 bg-primary/[0.035] px-4 py-3 text-sm leading-6"
      >
        <span className="font-semibold">
          {tx('Drag is enabled.', 'السحب شغّال فعليًا.')}
        </span>{' '}
        <span className="text-muted-foreground">
          {tx(
            'Drag using the grip, or select a choice and then select its destination. You can drag an assigned choice to another slot to swap them.',
            'اسحب من علامة المسكة، أو اختار إجابة وبعدها اختار مكانها. وتقدر تسحب إجابة محطوطة لخانة تانية عشان تبدّلهم.',
          )}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-label={tx('Available choices', 'الاختيارات المتاحة')}>
          <p className="mb-2 text-sm font-semibold">
            {tx('Available choices', 'الاختيارات المتاحة')}
          </p>
          <div className="grid min-h-24 content-start gap-2 rounded-xl border bg-muted/30 p-3">
            {availableChoices.length === 0 && (
              <p className="p-3 text-sm text-muted-foreground">
                {tx('All choices are placed.', 'كل الاختيارات اتحطّت.')}
              </p>
            )}
            {availableChoices.map((choice) => (
              <button
                key={choice}
                type="button"
                draggable
                onDragStart={(event) =>
                  setNativePayload(event, { choice, fromSlot: null })
                }
                onClick={() =>
                  setSelectedChoice((current) =>
                    current === choice ? null : choice,
                  )
                }
                className={`group flex min-h-14 items-center gap-2 rounded-xl border bg-card p-2 text-left shadow-sm transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selectedChoice === choice ? 'border-primary ring-2 ring-primary/25' : ''}`}
              >
                <span
                  role="presentation"
                  onPointerDown={(event) =>
                    beginPointerDrag(event, { choice, fromSlot: null })
                  }
                  className="grid min-h-10 w-9 shrink-0 touch-none cursor-grab place-items-center rounded-lg bg-muted text-muted-foreground active:cursor-grabbing"
                >
                  <GripVertical className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <DragChoiceImage
                    option={spec.options[choice]}
                    choice={choice}
                  />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section aria-label={tx('Answer area', 'منطقة الإجابة')}>
          <p className="mb-2 text-sm font-semibold">
            {spec.mode === 'sequence'
              ? tx('Correct order', 'الترتيب الصحيح')
              : tx('Answer area', 'منطقة الإجابة')}
          </p>
          <div className="grid gap-2 rounded-xl border bg-muted/30 p-3">
            {slots.map((choice, slotIndex) => (
              <div
                key={slotIndex}
                data-drop-slot={slotIndex}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(event) => receiveNativeDrop(event, slotIndex)}
                className={`min-h-20 rounded-xl border-2 border-dashed p-2 transition ${pointerDrag || selectedChoice != null ? 'border-primary/60 bg-primary/5' : 'border-border bg-card/70'}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex min-w-16 items-center justify-center rounded-lg bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                    {spec.mode === 'sequence'
                      ? tx(`Step ${slotIndex + 1}`, `الخطوة ${slotIndex + 1}`)
                      : tx(
                          `Target ${slotIndex + 1}`,
                          `الخانة ${slotIndex + 1}`,
                        )}
                  </span>
                  {choice >= 0 && (
                    <button
                      type="button"
                      onClick={() => removeFromSlot(slotIndex)}
                      aria-label={tx('Remove choice', 'امسح الاختيار')}
                      className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
                {choice >= 0 ? (
                  <div
                    draggable
                    onDragStart={(event) =>
                      setNativePayload(event, { choice, fromSlot: slotIndex })
                    }
                    className="flex items-center gap-2 rounded-xl border bg-card p-2 shadow-sm"
                  >
                    <span
                      role="presentation"
                      onPointerDown={(event) =>
                        beginPointerDrag(event, {
                          choice,
                          fromSlot: slotIndex,
                        })
                      }
                      className="grid min-h-10 w-9 shrink-0 touch-none cursor-grab place-items-center rounded-lg bg-muted text-muted-foreground active:cursor-grabbing"
                    >
                      <GripVertical className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <DragChoiceImage
                        option={spec.options[choice]}
                        choice={choice}
                      />
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={selectedChoice == null}
                    onClick={() =>
                      selectedChoice != null &&
                      placeChoice(
                        { choice: selectedChoice, fromSlot: null },
                        slotIndex,
                      )
                    }
                    className="grid min-h-14 w-full place-items-center rounded-lg text-center text-sm text-muted-foreground enabled:cursor-pointer enabled:hover:bg-primary/5 enabled:hover:text-foreground"
                  >
                    {selectedChoice == null
                      ? tx('Drop a choice here', 'اسحب الاختيار هنا')
                      : tx(
                          'Place selected choice here',
                          'حط الاختيار المحدد هنا',
                        )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {pointerDrag && (
        <div
          aria-hidden="true"
          style={{
            left: pointerDrag.x + 14,
            top: pointerDrag.y + 14,
            width: 280,
          }}
          className="pointer-events-none fixed z-[100] rounded-xl border border-primary bg-card p-2 opacity-95 shadow-2xl"
        >
          <DragChoiceImage
            option={spec.options[pointerDrag.choice]}
            choice={pointerDrag.choice}
          />
        </div>
      )}
    </div>
  );
}

function SequenceManagedAnswer({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const { tx, language } = useLanguage();
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const ordered =
    value.length === question.choices.length
      ? value
      : question.choices.map((_, index) => index);

  function move(from: number, to: number) {
    if (from === to || to < 0 || to >= ordered.length) return;
    const next = [...ordered];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
    setSelectedPosition(null);
  }

  function dropAt(event: ReactDragEvent<HTMLElement>, target: number) {
    event.preventDefault();
    const raw = event.dataTransfer.getData('application/x-pl300-sequence');
    const from = Number(raw);
    if (Number.isInteger(from)) move(from, target);
  }

  return (
    <div className="space-y-3">
      <p
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="rounded-xl border border-primary/25 bg-primary/[0.035] px-4 py-3 text-sm text-muted-foreground"
      >
        {tx(
          'Drag each row into the required order. You can also select one row, then select another position.',
          'اسحب كل سطر لمكانه في الترتيب المطلوب. وينفع كمان تختار سطر وبعدها تختار المكان اللي عايز تنقله له.',
        )}
      </p>
      {ordered.map((originalIndex, position) => (
        <div
          key={originalIndex}
          draggable
          role="button"
          tabIndex={0}
          onDragStart={(event) => {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData(
              'application/x-pl300-sequence',
              String(position),
            );
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => dropAt(event, position)}
          onClick={() => {
            if (selectedPosition == null) setSelectedPosition(position);
            else move(selectedPosition, position);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            if (selectedPosition == null) setSelectedPosition(position);
            else move(selectedPosition, position);
          }}
          className={`flex cursor-grab items-center gap-3 rounded-xl border p-3 transition active:cursor-grabbing ${selectedPosition === position ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
        >
          <GripVertical className="size-5 shrink-0 text-muted-foreground" />
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            {position + 1}
          </span>
          <span
            dir="ltr"
            lang="en"
            className="flex-1 text-left text-sm leading-6"
          >
            {question.choices[originalIndex]}
          </span>
          <div
            className="flex gap-1"
            onClick={(event) => event.stopPropagation()}
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={position === 0}
              aria-label={tx('Move up', 'حرّك لفوق')}
              onClick={() => move(position, position - 1)}
            >
              ↑
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={position === ordered.length - 1}
              aria-label={tx('Move down', 'حرّك لتحت')}
              onClick={() => move(position, position + 1)}
            >
              ↓
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MatchingManagedAnswer({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const { tx, language } = useLanguage();
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const rows = question.rows ?? [];
  const assignments = Array.from(
    { length: rows.length },
    (_, index) => value[index] ?? -1,
  );

  function place(choice: number, rowIndex: number) {
    const next = [...assignments];
    next[rowIndex] = choice;
    onChange(next);
    setSelectedChoice(null);
  }

  function dropAt(event: ReactDragEvent<HTMLElement>, rowIndex: number) {
    event.preventDefault();
    const choice = Number(
      event.dataTransfer.getData('application/x-pl300-matching'),
    );
    if (Number.isInteger(choice)) place(choice, rowIndex);
  }

  return (
    <div className="space-y-5">
      <p
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="rounded-xl border border-primary/25 bg-primary/[0.035] px-4 py-3 text-sm text-muted-foreground"
      >
        {tx(
          'Drag an answer to each matching row, or select an answer and then select its row.',
          'اسحب كل إجابة قدام السطر المناسب، أو اختار الإجابة وبعدها اختار السطر بتاعها.',
        )}
      </p>
      <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.2fr)]">
        <section>
          <p className="mb-2 text-sm font-semibold">
            {tx('Available answers', 'الإجابات المتاحة')}
          </p>
          <div className="space-y-2 rounded-xl border bg-muted/30 p-3">
            {question.choices.map((choice, index) => (
              <button
                key={`${choice}-${index}`}
                type="button"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = 'copy';
                  event.dataTransfer.setData(
                    'application/x-pl300-matching',
                    String(index),
                  );
                }}
                onClick={() =>
                  setSelectedChoice((current) =>
                    current === index ? null : index,
                  )
                }
                className={`flex w-full cursor-grab items-center gap-2 rounded-xl border bg-card p-3 text-left text-sm shadow-sm active:cursor-grabbing ${selectedChoice === index ? 'border-primary ring-2 ring-primary/25' : 'hover:border-primary/50'}`}
              >
                <GripVertical className="size-4 shrink-0 text-muted-foreground" />
                <span dir="ltr" lang="en" className="text-left leading-6">
                  {choice}
                </span>
              </button>
            ))}
          </div>
        </section>
        <section>
          <p className="mb-2 text-sm font-semibold">
            {tx('Match each row', 'طابق كل سطر')}
          </p>
          <div className="space-y-3">
            {rows.map((row, rowIndex) => {
              const choiceIndex = assignments[rowIndex];
              return (
                <div
                  key={row}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => dropAt(event, rowIndex)}
                  className={`rounded-xl border-2 border-dashed p-4 transition ${selectedChoice != null ? 'border-primary/60 bg-primary/5' : 'border-border'}`}
                >
                  <p
                    dir="ltr"
                    lang="en"
                    className="mb-3 text-left text-sm font-semibold leading-6"
                  >
                    {row}
                  </p>
                  {choiceIndex >= 0 ? (
                    <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
                      <span
                        dir="ltr"
                        lang="en"
                        className="text-left text-sm leading-6"
                      >
                        {question.choices[choiceIndex]}
                      </span>
                      <button
                        type="button"
                        aria-label={tx('Remove answer', 'امسح الإجابة')}
                        onClick={() => {
                          const next = [...assignments];
                          next[rowIndex] = -1;
                          onChange(next);
                        }}
                        className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={selectedChoice == null}
                      onClick={() =>
                        selectedChoice != null &&
                        place(selectedChoice, rowIndex)
                      }
                      className="grid min-h-12 w-full place-items-center rounded-lg bg-muted/40 text-sm text-muted-foreground enabled:hover:bg-primary/10 enabled:hover:text-foreground"
                    >
                      {selectedChoice == null
                        ? tx('Drop an answer here', 'اسحب الإجابة هنا')
                        : tx(
                            'Place selected answer here',
                            'حط الإجابة المحددة هنا',
                          )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function ManagedAnswer({
  question,
  answer,
  choiceOrder,
  onChange,
}: {
  question: Question;
  answer: number[];
  choiceOrder: number[];
  onChange: (answer: number[]) => void;
}) {
  const { tx } = useLanguage();
  if (question.type === 'single')
    return (
      <RadioGroup
        value={answer[0] === undefined ? '' : String(answer[0])}
        onValueChange={(value) => onChange([Number(value)])}
        className="space-y-3"
      >
        {choiceOrder.map((originalIndex) => (
          <Label
            key={originalIndex}
            className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:border-primary/50 hover:bg-primary/5"
          >
            <RadioGroupItem value={String(originalIndex)} className="mt-0.5" />
            <span dir="ltr" lang="en" className="text-left leading-6">
              {question.choices[originalIndex]}
            </span>
          </Label>
        ))}
      </RadioGroup>
    );
  if (question.type === 'multi')
    return (
      <div className="space-y-3">
        {choiceOrder.map((originalIndex) => {
          const checked = answer.includes(originalIndex);
          return (
            <Label
              key={originalIndex}
              className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:border-primary/50 hover:bg-primary/5"
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() =>
                  onChange(
                    checked
                      ? answer.filter((item) => item !== originalIndex)
                      : [...answer, originalIndex],
                  )
                }
                className="mt-0.5"
              />
              <span dir="ltr" lang="en" className="text-left leading-6">
                {question.choices[originalIndex]}
              </span>
            </Label>
          );
        })}
      </div>
    );
  if (question.type === 'sequence')
    return (
      <SequenceManagedAnswer
        question={question}
        value={answer}
        onChange={onChange}
      />
    );
  if (question.type === 'matching')
    return (
      <MatchingManagedAnswer
        question={question}
        value={answer}
        onChange={onChange}
      />
    );
  const dragSpec = dragDropData[question.id];
  const visualSpec = visualControlData[question.id];
  if (dragSpec)
    return (
      <DragDropManagedAnswer
        question={question}
        value={answer}
        onChange={onChange}
      />
    );
  if (visualSpec)
    return (
      <div className="space-y-3">
        {Array.from({ length: visualSpec.slots }, (_, slot) => (
          <div
            key={slot}
            className="grid gap-2 rounded-xl border p-4 sm:grid-cols-[180px_1fr] sm:items-center"
          >
            <span className="text-sm font-semibold">
              {tx(`Answer list ${slot + 1}`, `قائمة الإجابة ${slot + 1}`)}
            </span>
            <select
              className="h-10 rounded-lg border bg-background px-3 text-sm"
              value={answer[slot] ?? ''}
              onChange={(event) => {
                const next = Array.from(
                  { length: visualSpec.slots },
                  (_, index) => answer[index] ?? -1,
                );
                next[slot] = Number(event.target.value);
                onChange(next);
              }}
            >
              <option value="">
                {tx('Select from the source menu', 'اختار من القائمة الأصلية')}
              </option>
              {Array.from({ length: 6 }, (_, index) => (
                <option key={index} value={index}>
                  {tx(`Menu choice ${index + 1}`, `اختيار رقم ${index + 1}`)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  if (isYesNoQuestion(question))
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }, (_, row) => (
          <div
            key={row}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <span className="font-medium">
              {tx(`Statement ${row + 1}`, `العبارة ${row + 1}`)}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={answer[row] === 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  const next = Array.from(
                    { length: 3 },
                    (_, index) => answer[index] ?? -1,
                  );
                  next[row] = 1;
                  onChange(next);
                }}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={answer[row] === 0 ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  const next = Array.from(
                    { length: 3 },
                    (_, index) => answer[index] ?? -1,
                  );
                  next[row] = 0;
                  onChange(next);
                }}
              >
                No
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  return (
    <button
      type="button"
      onClick={() => onChange(answer.length ? [] : [0])}
      className={`w-full rounded-2xl border-2 border-dashed p-6 text-center ${answer.length ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200' : 'border-border text-muted-foreground'}`}
    >
      <Eye className="mx-auto mb-2 size-5" />
      <strong className="block">
        {answer.length
          ? tx('Marked for manual review', 'اتسجل للمراجعة اليدوية')
          : tx(
              'Mark this visual answer as completed',
              'سجّل إنك جاوبت السؤال البصري',
            )}
      </strong>
      <span className="mt-1 block text-xs">
        {tx(
          'The instructor will review the source answer area after submission.',
          'المدرس هيراجع منطقة الإجابة الأصلية بعد التسليم.',
        )}
      </span>
    </button>
  );
}
