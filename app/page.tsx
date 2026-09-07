'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  ExternalLink,
  FileCheck2,
  Flag,
  ListChecks,
  Moon,
  MousePointerClick,
  RotateCcw,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  buildExam,
  domainTargets,
  type Domain,
  type Question,
} from '@/lib/questions';
import { calculateScore, isAnswered, isCorrect, type Answers } from '@/lib/exam-utils';
import { buildEgyptianExplanation } from '@/lib/egyptian-explanations';

type Screen = 'home' | 'guide' | 'exam' | 'results' | 'review';
type SavedProgress = {
  model: number;
  answers: Answers;
  flags: string[];
  current: number;
  timeLeft: number;
};

const modelCards = [
  { id: 1, label: 'Practice exam 1', note: 'Balanced across all four skill areas' },
  { id: 2, label: 'Practice exam 2', note: 'Balanced across all four skill areas' },
  { id: 3, label: 'Practice exam 3', note: 'Balanced across all four skill areas' },
  { id: 4, label: 'Practice exam 4', note: 'Balanced across all four skill areas' },
].map((item) => ({ ...item, count: buildExam(item.id).length }));

const bankCards = [101, 102, 103, 104].map((id, index) => ({
  id,
  label: `Bank Part ${String(index + 1).padStart(2, '0')}`,
  count: buildExam(id).length,
}));

const instructions: Record<Question['type'], string> = {
  single: 'How to answer: Select one option only, then press Next.',
  multi: 'How to answer: Select every correct option. More than one answer is required.',
  sequence: 'How to answer: Add all the steps, then use the arrows to arrange them in the correct order.',
  matching: 'How to answer: Choose one matching option for every row before moving on.',
  manual: 'How to answer: Click each answer position inside the image. Your clicks appear as numbered markers; use Clear answer to restart.',
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [model, setModel] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [flags, setFlags] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6000);
  const [saved, setSaved] = useState<SavedProgress | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const exam = useMemo(() => buildExam(model), [model]);
  const question = exam[current];
  const answeredCount = exam.filter((item) => isAnswered(item, answers[item.id])).length;
  const unansweredCount = exam.length - answeredCount;
  const score = useMemo(() => calculateScore(exam, answers), [exam, answers]);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem('pl300-progress-v4');
        if (raw) setSaved(JSON.parse(raw) as SavedProgress);
        const storedTheme = localStorage.getItem('pl300-theme');
        if (storedTheme === 'dark') setDark(true);
      } catch {
        // Storage is optional. The exam remains fully usable without it.
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('pl300-theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  useEffect(() => {
    if (screen !== 'exam') return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setScreen('results');
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'exam') return;
    const progress: SavedProgress = { model, answers, flags, current, timeLeft };
    try { localStorage.setItem('pl300-progress-v4', JSON.stringify(progress)); } catch {}
  }, [answers, current, flags, model, screen, timeLeft]);

  useEffect(() => {
    const page = document as Document & {
      modelContext?: {
        registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void>;
      };
    };
    if (!page.modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = {
      name: 'start_mock_exam',
      title: 'Start PL-300 mock exam',
      description: 'Start one of the four visible PL-300 mock exam forms.',
      inputSchema: {
        type: 'object',
        properties: { model: { type: 'integer', minimum: 1, maximum: 4 } },
        required: ['model'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input: unknown) => {
        const value = Number((input as { model?: unknown })?.model);
        if (!Number.isInteger(value) || value < 1 || value > 4) throw new Error('Model must be an integer from 1 to 4.');
        setModel(value);
        setAnswers({});
        setFlags([]);
        setCurrent(0);
        const count = buildExam(value).length;
        setTimeLeft(count * 120);
        setScreen('exam');
        try { localStorage.removeItem('pl300-progress-v4'); } catch {}
        return { model: value, questionCount: count, timeLimitMinutes: count * 2 };
      },
    };
    void Promise.resolve(page.modelContext.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});
    return () => lifecycle.abort();
  }, []);

  function startExam(selectedModel: number) {
    setModel(selectedModel);
    setAnswers({});
    setFlags([]);
    setCurrent(0);
    setTimeLeft(timeLimitSeconds(selectedModel));
    setScreen('exam');
    try { localStorage.removeItem('pl300-progress-v4'); } catch {}
  }

  function resumeExam() {
    if (!saved) return;
    setModel(saved.model);
    setAnswers(saved.answers);
    setFlags(saved.flags);
    setCurrent(saved.current);
    setTimeLeft(saved.timeLeft);
    setScreen('exam');
  }

  function finishExam() {
    setSubmitOpen(false);
    setScreen('results');
    try { localStorage.removeItem('pl300-progress-v4'); } catch {}
    setSaved(null);
  }

  function updateAnswer(value: number[]) {
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
  }

  function toggleFlag() {
    setFlags((previous) => previous.includes(question.id)
      ? previous.filter((id) => id !== question.id)
      : [...previous, question.id]);
  }

  if (screen === 'home') {
    return <HomeScreen dark={dark} setDark={setDark} saved={saved} onResume={resumeExam} onStart={startExam} onGuide={() => setScreen('guide')} />;
  }

  if (screen === 'guide') {
    return <GuideScreen dark={dark} setDark={setDark} onHome={() => setScreen('home')} />;
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        exam={exam}
        answers={answers}
        timeLeft={timeLeft}
        model={model}
        score={score}
        onReview={() => { setCurrent(0); setScreen('review'); }}
        onNew={() => setScreen('home')}
        dark={dark}
        setDark={setDark}
      />
    );
  }

  if (screen === 'review') {
    return (
      <ReviewScreen
        exam={exam}
        answers={answers}
        current={current}
        setCurrent={setCurrent}
        flags={flags}
        onResults={() => setScreen('results')}
        dark={dark}
        setDark={setDark}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time={formatTime(timeLeft)} dark={dark} setDark={setDark} />
      <div className="mx-auto grid max-w-[1540px] gap-5 px-3 py-4 md:grid-cols-[240px_minmax(0,1fr)] md:px-5 md:py-6 xl:grid-cols-[280px_minmax(0,1fr)] xl:px-7">
        <Navigator
          exam={exam}
          current={current}
          answers={answers}
          flags={flags}
          onSelect={setCurrent}
        />
        <Card className="min-h-[650px] rounded-sm border-border shadow-none">
          <CardContent className="flex min-h-[650px] flex-col p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary/40 bg-accent text-accent-foreground">{question.domain}</Badge>
                <Badge variant="outline">{typeLabel(question.type)}</Badge>
                <span className="text-xs text-muted-foreground">{question.source} · Q{question.sourceNumber}</span>
                {question.legacy && <Badge variant="outline" className="border-amber-600/50 text-amber-700 dark:text-amber-300">Legacy wording</Badge>}
              </div>
              <Button variant={flags.includes(question.id) ? 'default' : 'outline'} size="sm" onClick={toggleFlag}>
                <Flag className="size-4" /> {flags.includes(question.id) ? 'Flagged' : 'Flag'}
              </Button>
            </div>

            <div className="mt-5 flex items-start gap-2 border-l-4 border-primary bg-accent/55 px-4 py-3 text-sm leading-6 text-accent-foreground">
              <MousePointerClick className="mt-0.5 size-4 shrink-0" />
              <span>{instructions[question.type]}</span>
            </div>

            {question.context && (
              <div className="mt-7 border-l-4 border-primary bg-muted p-4 text-[15px] leading-7">
                <p className="mb-1 font-semibold">Scenario</p>
                {displayText(question.context)}
              </div>
            )}

            <h1 className="mt-7 max-w-5xl whitespace-pre-line text-lg font-semibold leading-8 sm:text-xl">
              {current + 1}. {displayText(question.prompt)}
            </h1>

            <div className="mt-7 max-w-5xl">
              {question.image && question.type !== 'manual' && (
                <figure className="mb-6">
                  <figcaption className="mb-2 text-sm font-semibold text-muted-foreground">Source exhibit / table</figcaption>
                  <Image
                    src={question.image}
                    alt={`Original visual for ${question.source} question ${question.sourceNumber}`}
                    width={1000}
                    height={1200}
                    unoptimized
                    className="h-auto w-full rounded-sm border bg-white object-contain"
                  />
                </figure>
              )}
              <QuestionInput question={question} value={answers[question.id] ?? []} onChange={updateAnswer} />
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-6">
              <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>
                <ArrowLeft className="size-4" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => updateAnswer([])}>Clear answer</Button>
                {current < exam.length - 1 ? (
                  <Button onClick={() => setCurrent((value) => value + 1)}>Next <ArrowRight className="size-4" /></Button>
                ) : (
                  <Button onClick={() => setSubmitOpen(true)}>Submit exam</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit {selectionLabel(model)}?</AlertDialogTitle>
            <AlertDialogDescription>
              {unansweredCount > 0
                ? `${unansweredCount} question${unansweredCount === 1 ? '' : 's'} remain unanswered. You can return and complete them, or submit now.`
                : 'All questions are answered. You will not be able to change answers after submission.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Return to exam</AlertDialogCancel>
            <AlertDialogAction onClick={finishExam}>Submit and score</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function HomeScreen({ dark, setDark, saved, onResume, onStart, onGuide }: {
  dark: boolean;
  setDark: (value: boolean) => void;
  saved: SavedProgress | null;
  onResume: () => void;
  onStart: (model: number) => void;
  onGuide: () => void;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time="100:00" dark={dark} setDark={setDark} />
      <section className="mx-auto grid max-w-[1500px] gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_360px] lg:py-10">
        <div>
          <p className="text-sm font-semibold text-primary">PL-300 · Microsoft Power BI Data Analyst</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Choose a practice exam</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Four realistic 50-question exams. Each one gives you 100 minutes and follows the current skill-area balance.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="outline" size="lg" className="rounded-sm" onClick={onGuide}>
              <BookOpen className="size-4 text-primary" /> How to use this simulator
            </Button>
            <a
              href="https://learn.microsoft.com/en-us/credentials/certifications/prepare-exam"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: 'outline', size: 'lg' })} rounded-sm`}
            >
              <ExternalLink className="size-4 text-primary" /> Microsoft exam instructions &amp; sandbox
            </a>
          </div>

          {saved && (
            <Card className="mt-7 rounded-sm border-l-4 border-l-primary bg-card shadow-none">
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-semibold">{selectionLabel(saved.model)} is in progress</p>
                  <p className="mt-1 text-sm text-muted-foreground">Question {saved.current + 1} · {formatTime(saved.timeLeft)} remaining</p>
                </div>
                <Button onClick={onResume}>Resume exam</Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {modelCards.map((item) => (
              <Card key={item.id} className="rounded-sm border-l-4 border-l-primary bg-card shadow-none transition-colors hover:bg-accent/40">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{item.count} questions · {item.count * 2} minutes</p>
                  </div>
                  <Button onClick={() => onStart(item.id)}>Start</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 border-t pt-7">
            <div>
              <h2 className="text-xl font-semibold">Complete source bank</h2>
              <p className="mt-1 text-sm text-muted-foreground">Work through all 509 source questions in four non-overlapping parts.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {bankCards.map((item) => (
              <Card key={item.id} className="rounded-sm bg-card shadow-none transition-colors hover:bg-muted">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.count} questions · complete-bank practice</p>
                  </div>
                  <Button variant="outline" onClick={() => onStart(item.id)}>Practice</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-7 text-xs leading-5 text-muted-foreground">
            Answer keys match the supplied files. Some source wording uses older Power BI names, so legacy items are preserved as written. One empty vendor placeholder was excluded. Not affiliated with or endorsed by Microsoft.
          </p>
        </div>

        <Card className="h-fit rounded-sm border-t-4 border-t-primary bg-card shadow-none">
          <CardContent className="p-6 sm:p-7">
            <ShieldCheck className="size-9 text-primary" />
            <h2 className="mt-5 text-xl font-semibold">Current PL-300 balance</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Each practice exam stays inside Microsoft&apos;s published domain ranges.</p>
            <div className="mt-6 space-y-4 text-sm">
              <DomainLine label="Prepare the data" value="28%" />
              <DomainLine label="Model the data" value="26%" />
              <DomainLine label="Visualize and analyze" value="26%" />
              <DomainLine label="Manage and secure" value="20%" />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function GuideScreen({ dark, setDark, onHome }: {
  dark: boolean;
  setDark: (value: boolean) => void;
  onHome: () => void;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time="Guide" dark={dark} setDark={setDark} />
      <section dir="rtl" lang="ar-EG" className="mx-auto max-w-6xl px-4 py-7 text-right sm:px-8 sm:py-10">
        <Button variant="outline" onClick={onHome}>الرجوع للرئيسية <ArrowLeft className="size-4 rotate-180" /></Button>
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold text-primary">دليل استخدام محاكي PL-300</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">من أول اختيار الامتحان لحد مراجعة إجاباتك</h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">الدليل ده يشرحلك كل جزء في المحاكي بسرعة، عشان تركّز في السؤال نفسه ومايضيعش وقتك في فهم الأزرار.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <GuideCard icon={<ListChecks className="size-6" />} number="١" title="اختار طريقة التدريب">
            <strong>Practice exam</strong> امتحان كامل من 50 سؤال و100 دقيقة، ومتوزع على مهارات PL-300. أما <strong>Complete source bank</strong> فبيقسّم كل بنك الأسئلة لأربع أجزاء عشان تراجعهم كلهم من غير تكرار.
          </GuideCard>
          <GuideCard icon={<MousePointerClick className="size-6" />} number="٢" title="جاوب حسب نوع السؤال">
            الدائرة معناها اختيار واحد، والمربعات معناها أكتر من إجابة. في أسئلة <strong>Answer Area</strong> اضغط جوه مكان الاختيار في الصورة؛ كل ضغطة بتظهر بعلامة مرقمة وتقدر تمسحها وتعيدها.
          </GuideCard>
          <GuideCard icon={<FileCheck2 className="size-6" />} number="٣" title="اتحكم في وقتك">
            العداد فوق بيحسب الوقت المتبقي. استخدم <strong>Flag</strong> للسؤال اللي محتاج ترجعله، وأرقام الأسئلة على الجنب بتوضح الحالي والمجاب والمتعلّم للمراجعة. تقدمك بيتحفظ على نفس الجهاز لو خرجت ورجعت.
          </GuideCard>
          <GuideCard icon={<Check className="size-6" />} number="٤" title="سلّم وراجع صح">
            بعد <strong>Submit exam</strong> هتشوف الدرجة وتوزيع أدائك على المهارات. افتح <strong>Review answers</strong> عشان تقارن إجابتك بالصح وتشوف شرح المصدر، وبعده اضغط <strong>شعبولي الدنيا</strong> للشرح المصري المبسّط خطوة بخطوة.
          </GuideCard>
        </div>

        <Card className="mt-7 rounded-sm border-r-4 border-r-primary shadow-none">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">قبل ما تبدأ</h2>
            <div className="mt-5 grid gap-4 text-[15px] leading-7 sm:grid-cols-3">
              <p><strong className="block text-primary">اتمرّن كأنها محاولة حقيقية</strong>اقفل المراجع، التزم بالوقت، وسيب السؤال الصعب Flag بدل ما يعطلك.</p>
              <p><strong className="block text-primary">راجع السبب مش الحرف</strong>احفظ أسماء ميزات Power BI بالإنجليزي، لكن افهم ليه الاختيار مناسب لقيود السؤال.</p>
              <p><strong className="block text-primary">كرر نقاط ضعفك</strong>بعد النتيجة ركّز على Skill area الأقل، وبعدها استخدم بنك الأسئلة للتدريب المكثف.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function GuideCard({ icon, number, title, children }: { icon: React.ReactNode; number: string; title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-sm bg-card shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="grid size-11 place-items-center rounded-full bg-accent text-primary">{icon}</div>
          <span className="text-3xl font-semibold text-border">{number}</span>
        </div>
        <h2 className="mt-5 text-xl font-semibold">{title}</h2>
        <p className="mt-3 text-[15px] leading-8 text-muted-foreground">{children}</p>
      </CardContent>
    </Card>
  );
}

function Header({ time, dark, setDark }: { time: string; dark: boolean; setDark: (value: boolean) => void }) {
  return (
    <header className="sticky top-0 z-20 border-b bg-card">
      <div className="mx-auto flex h-[72px] max-w-[1540px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center bg-[#0078d4] font-semibold text-white">P3</div>
          <div>
            <p className="font-semibold leading-none">PL-300 Practice Exam</p>
            <p className="mt-1 hidden text-xs text-muted-foreground sm:block">Microsoft Power BI Data Analyst</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 items-center gap-2 rounded-sm border bg-card px-3 font-mono text-sm font-semibold tabular-nums">
            <Clock3 className="size-4 text-primary" /> {time}
          </div>
          <Button aria-label={dark ? 'Use light theme' : 'Use dark theme'} variant="outline" size="icon" onClick={() => setDark(!dark)}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}

function Navigator({ exam, current, answers, flags, onSelect }: {
  exam: Question[];
  current: number;
  answers: Answers;
  flags: string[];
  onSelect: (index: number) => void;
}) {
  const completed = exam.filter((item) => isAnswered(item, answers[item.id])).length;
  return (
    <aside className="h-fit max-h-[240px] overflow-y-auto rounded-sm border bg-sidebar p-4 md:sticky md:top-[92px] md:max-h-[calc(100vh-112px)]">
      <div className="flex items-center justify-between text-sm font-medium"><span>Question {current + 1} of {exam.length}</span><span>{completed}/{exam.length}</span></div>
      <Progress value={(completed / exam.length) * 100} className="mt-3" />
      <div className="mt-5 grid grid-cols-10 gap-1.5 md:grid-cols-5">
        {exam.map((item, index) => {
          const answered = isAnswered(item, answers[item.id]);
          const flagged = flags.includes(item.id);
          return (
            <button
              key={`${item.id}-${index}`}
              aria-label={`Question ${index + 1}${answered ? ', answered' : ''}${flagged ? ', flagged' : ''}`}
              onClick={() => onSelect(index)}
              className={`relative aspect-square min-h-8 rounded-sm border text-xs font-medium transition sm:text-sm ${index === current ? 'border-[#244563] bg-[#244563] text-white' : answered ? 'border-[#107c10] bg-[#eaf6ea] text-[#0b5a08] dark:bg-[#143814] dark:text-[#8bd88b]' : 'bg-card hover:border-primary'}`}
            >
              {index + 1}
              {flagged && <span className="absolute -right-1 -top-1 size-2.5 rounded-full border border-card bg-amber-500" />}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-primary" />Current</span>
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-emerald-500" />Answered</span>
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-amber-500" />Flagged</span>
      </div>
    </aside>
  );
}

function VisualAnswerImage({ question, value, onChange }: {
  question: Question;
  value: number[];
  onChange?: (value: number[]) => void;
}) {
  if (!question.image) return null;

  function addPoint(x: number, y: number) {
    if (!onChange) return;
    const safeX = Math.max(20, Math.min(980, Math.round(x * 1000)));
    const safeY = Math.max(20, Math.min(980, Math.round(y * 1000)));
    onChange([...value, safeX * 1001 + safeY]);
  }

  return (
    <button
      type="button"
      disabled={!onChange}
      aria-label={`Answer image for ${question.source} question ${question.sourceNumber}${onChange ? '. Click choices inside the answer area.' : ''}`}
      onClick={onChange ? (event) => {
        if (event.detail === 0) {
          addPoint(0.5, 0.5);
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        addPoint((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
      } : undefined}
      className={`relative block w-full overflow-hidden bg-white outline-none ${onChange ? 'cursor-crosshair focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' : ''}`}
    >
      <Image
        src={question.image}
        alt={`Original visual for ${question.source} question ${question.sourceNumber}`}
        width={1000}
        height={1200}
        unoptimized
        draggable={false}
        className="h-auto w-full select-none object-contain"
      />
      {value.map((encoded, index) => {
        const x = Math.floor(encoded / 1001) / 10;
        const y = (encoded % 1001) / 10;
        return (
          <span
            key={`${encoded}-${index}`}
            aria-hidden="true"
            style={{ left: `${x}%`, top: `${y}%` }}
            className="pointer-events-none absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-primary text-xs font-bold text-primary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          >
            {index + 1}
          </span>
        );
      })}
    </button>
  );
}

function QuestionInput({ question, value, onChange }: { question: Question; value: number[]; onChange: (value: number[]) => void }) {
  if (question.type === 'manual') {
    return (
      <div className="overflow-hidden rounded-sm border bg-card">
        <div className="border-b bg-primary/5 px-4 py-3 text-sm leading-6">
          <strong>Select on the image</strong>
          <span className="ml-2 text-muted-foreground">Click each answer you want inside the Answer Area. Markers are numbered in selection order.</span>
        </div>
        {question.image ? (
          <VisualAnswerImage question={question} value={value} onChange={onChange} />
        ) : (
          <div className="p-5 text-sm text-muted-foreground">The source did not include a selectable image for this item.</div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
          <span className="text-sm font-medium">{value.length} selection{value.length === 1 ? '' : 's'} recorded</span>
          <Button type="button" variant="outline" size="sm" disabled={value.length === 0} onClick={() => onChange(value.slice(0, -1))}>
            <RotateCcw className="size-4" /> Undo last
          </Button>
        </div>
      </div>
    );
  }

  if (question.type === 'single') {
    return (
      <RadioGroup value={value[0]?.toString() ?? ''} onValueChange={(answer) => onChange([Number(answer)])} className="gap-3">
        {question.choices.map((choice, index) => (
          <Label key={choice} htmlFor={`${question.id}-${index}`} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border-l-[3px] p-4 text-[15px] leading-6 transition hover:border-primary ${value[0] === index ? 'border-primary bg-accent/60' : 'border-l-transparent bg-card'}`}>
            <RadioGroupItem value={String(index)} id={`${question.id}-${index}`} />{choice}
          </Label>
        ))}
      </RadioGroup>
    );
  }

  if (question.type === 'multi') {
    return (
      <div className="grid gap-3">
        {question.choices.map((choice, index) => {
          const checked = value.includes(index);
          return (
            <Label key={choice} htmlFor={`${question.id}-${index}`} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border-l-[3px] p-4 text-[15px] leading-6 transition hover:border-primary ${checked ? 'border-primary bg-accent/60' : 'border-l-transparent bg-card'}`}>
              <Checkbox id={`${question.id}-${index}`} checked={checked} onCheckedChange={() => onChange(checked ? value.filter((item) => item !== index) : [...value, index])} />{choice}
            </Label>
          );
        })}
      </div>
    );
  }

  if (question.type === 'matching') {
    return (
      <div className="overflow-hidden rounded-sm border">
        {question.rows?.map((row, rowIndex) => (
          <div key={row} className="grid gap-3 border-b p-4 last:border-b-0 sm:grid-cols-[1fr_1fr] sm:items-center">
            <p className="text-[15px] font-medium">{row}</p>
            <select
              aria-label={`Match for ${row}`}
              className="h-11 rounded-sm border bg-card px-3 text-sm"
              value={value[rowIndex] != null && value[rowIndex] >= 0 ? value[rowIndex] : ''}
              onChange={(event) => {
                const next = Array.from({ length: question.rows?.length ?? 0 }, (_, index) => value[index] ?? -1);
                next[rowIndex] = Number(event.target.value);
                onChange(next);
              }}
            >
              <option value="">Select an answer</option>
              {question.choices.map((choice, index) => <option key={choice} value={index}>{choice}</option>)}
            </select>
          </div>
        ))}
      </div>
    );
  }

  const selected = value;
  const available = question.choices.map((_, index) => index).filter((index) => !selected.includes(index));
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <p className="mb-2 text-sm font-semibold">Available steps</p>
        <div className="grid gap-2 rounded-sm border bg-muted/30 p-3">
          {available.length === 0 && <p className="p-3 text-sm text-muted-foreground">All steps selected.</p>}
          {available.map((index) => (
            <button key={question.choices[index]} onClick={() => onChange([...selected, index])} className="rounded-sm border bg-card p-3 text-left text-sm leading-6 hover:border-primary">
              {question.choices[index]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Your sequence</p>
        <div className="grid min-h-20 gap-2 rounded-sm border bg-muted/30 p-3">
          {selected.length === 0 && <p className="p-3 text-sm text-muted-foreground">Select the first step. No default order is scored.</p>}
          {selected.map((choiceIndex, position) => (
            <div key={choiceIndex} className="flex items-center gap-2 rounded-sm border bg-card p-2">
              <span className="grid size-7 shrink-0 place-items-center bg-primary text-xs font-bold text-primary-foreground">{position + 1}</span>
              <span className="flex-1 text-sm leading-5">{question.choices[choiceIndex]}</span>
              <Button aria-label="Move step up" variant="ghost" size="icon" disabled={position === 0} onClick={() => onChange(move(selected, position, position - 1))}><ChevronUp className="size-4" /></Button>
              <Button aria-label="Move step down" variant="ghost" size="icon" disabled={position === selected.length - 1} onClick={() => onChange(move(selected, position, position + 1))}><ChevronDown className="size-4" /></Button>
              <Button aria-label="Remove step" variant="ghost" size="icon" onClick={() => onChange(selected.filter((_, index) => index !== position))}><X className="size-4" /></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ exam, answers, timeLeft, model, score, onReview, onNew, dark, setDark }: {
  exam: Question[];
  answers: Answers;
  timeLeft: number;
  model: number;
  score: ReturnType<typeof calculateScore>;
  onReview: () => void;
  onNew: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  const percent = score.autoGraded > 0 ? Math.round((score.correct / score.autoGraded) * 100) : 0;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time={formatTime(timeLeft)} dark={dark} setDark={setDark} />
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="rounded-sm border-t-4 border-t-primary bg-card shadow-none">
            <CardContent className="p-7 text-center">
              <p className="text-sm text-muted-foreground">{selectionLabel(model)} score</p>
              <p className="mt-3 text-7xl font-semibold tabular-nums text-primary">{percent}%</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Based on {score.autoGraded} auto-graded questions. Visual items remain separate for manual review.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm shadow-none">
            <CardContent className="p-7">
              <h1 className="text-2xl font-semibold">Exam complete</h1>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ResultCount label="Correct" value={score.correct} color="text-emerald-600" />
                <ResultCount label="Incorrect" value={score.incorrect} color="text-red-600" />
                <ResultCount label="Unanswered" value={score.unanswered} color="text-amber-600" />
                <ResultCount label="Manual review" value={score.manual} color="text-sky-600" />
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button onClick={onReview}>Review answers</Button>
                <Button variant="outline" onClick={onNew}><RotateCcw className="size-4" /> Choose another mock</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-sm shadow-none">
          <CardContent className="p-6 sm:p-7">
            <h2 className="text-lg font-semibold">Performance by domain</h2>
            <div className="mt-5 grid gap-5">
              {(Object.keys(domainTargets) as Domain[]).map((domain) => {
                const items = exam.filter((item) => item.domain === domain && item.type !== 'manual');
                const correct = items.filter((item) => isCorrect(item, answers[item.id])).length;
                const domainPercent = items.length > 0 ? Math.round((correct / items.length) * 100) : 0;
                return (
                  <div key={domain}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm"><span className="font-medium">{domain}</span><span>{correct}/{items.length} · {domainPercent}%</span></div>
                    <Progress value={domainPercent} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function ReviewScreen({ exam, answers, current, setCurrent, flags, onResults, dark, setDark }: {
  exam: Question[];
  answers: Answers;
  current: number;
  setCurrent: (index: number) => void;
  flags: string[];
  onResults: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  const question = exam[current];
  const answer = answers[question.id];
  const answered = isAnswered(question, answer);
  const correct = isCorrect(question, answer);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time="Review" dark={dark} setDark={setDark} />
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" onClick={onResults}><ArrowLeft className="size-4" /> Results</Button>
          <span className="text-sm text-muted-foreground">Question {current + 1} of {exam.length}{flags.includes(question.id) ? ' · Flagged' : ''}</span>
        </div>
        <Card className="rounded-sm shadow-none">
          <CardContent className="p-6 sm:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-primary/40 bg-accent text-accent-foreground">{question.domain}</Badge>
              <span className="text-xs text-muted-foreground">{question.source} · Q{question.sourceNumber}</span>
              {question.legacy && <Badge variant="outline" className="border-amber-600/50 text-amber-700 dark:text-amber-300">Legacy wording</Badge>}
              <Badge variant={question.type === 'manual' ? 'secondary' : correct ? 'default' : answered ? 'destructive' : 'secondary'}>{question.type === 'manual' ? 'Manual review' : correct ? 'Correct' : answered ? 'Incorrect' : 'Not answered'}</Badge>
            </div>
            {question.context && <div className="mt-6 border-l-4 border-primary bg-muted p-4 text-sm leading-7"><strong>Scenario: </strong>{displayText(question.context)}</div>}
            <h1 className="mt-6 whitespace-pre-line text-xl font-semibold leading-8">{current + 1}. {displayText(question.prompt)}</h1>
            {question.image && (
              question.type === 'manual'
                ? <div className="mt-6 overflow-hidden rounded-sm border"><VisualAnswerImage question={question} value={answer ?? []} /></div>
                : <Image src={question.image} alt={`Original visual for ${question.source} question ${question.sourceNumber}`} width={1000} height={1200} unoptimized className="mt-6 h-auto w-full rounded-sm border bg-white object-contain" />
            )}
            {question.type === 'manual' ? (
              <div className="mt-7 rounded-sm border border-emerald-500/40 bg-emerald-500/5 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Source answer</p>
                {question.answerImage && <Image src={question.answerImage} alt={`Answer for ${question.source} question ${question.sourceNumber}`} width={1000} height={1200} unoptimized className="h-auto w-full rounded-sm border bg-white object-contain" />}
              </div>
            ) : (
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <AnswerPanel title="Your answer" lines={formatAnswer(question, answer)} good={correct} />
                <AnswerPanel title="Correct answer" lines={formatAnswer(question, question.correct)} good />
              </div>
            )}
            <div className="mt-6 whitespace-pre-line border-l-4 border-border bg-muted p-4 text-sm leading-7"><strong>Explanation: </strong>{displayText(question.explanation) || 'No text explanation was included in the source.'}</div>
            {displayText(question.explanation) && <EgyptianExplanation key={question.id} question={question} />}
            <div className="mt-8 flex justify-between border-t pt-6">
              <Button variant="outline" disabled={current === 0} onClick={() => setCurrent(current - 1)}><ArrowLeft className="size-4" /> Previous</Button>
              <Button disabled={current === exam.length - 1} onClick={() => setCurrent(current + 1)}>Next <ArrowRight className="size-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function DomainLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between border-b pb-3"><span className="flex items-center gap-2"><Check className="size-4 text-primary" />{label}</span><strong>{value}</strong></div>;
}

function ResultCount({ label, value, color }: { label: string; value: number; color: string }) {
  return <div className="rounded-sm border bg-muted/40 p-4 text-center"><p className={`text-3xl font-semibold ${color}`}>{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>;
}

function AnswerPanel({ title, lines, good }: { title: string; lines: string[]; good: boolean }) {
  return (
    <div className={`rounded-sm border p-4 ${good ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-red-500/40 bg-red-500/5'}`}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {lines.map((line) => <p key={line} className="text-sm leading-6">{line}</p>)}
    </div>
  );
}

function EgyptianExplanation({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <Button
        type="button"
        variant="outline"
        className="border-primary/40 bg-accent/60 font-semibold text-primary hover:bg-accent"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative size-6 shrink-0 overflow-hidden rounded-full border border-primary/25 bg-white" aria-hidden="true">
          <Image src="/shaaban-abdel-rahim.png" alt="" fill unoptimized className="scale-[2.35] object-cover object-[60%_20%]" />
        </span>
        {open ? 'خلاص فهمت' : 'شعبولي الدنيا'}
      </Button>
      {open && (
        <div dir="rtl" lang="ar-EG" className="mt-3 rounded-sm border border-primary/25 border-r-4 border-r-primary bg-accent/45 p-5 text-right text-sm leading-8">
          <p className="font-bold text-primary">بص يا سيدي 👇</p>
          <p className="mt-2 whitespace-pre-line">{buildEgyptianExplanation(question)}</p>
        </div>
      )}
    </div>
  );
}

function formatAnswer(question: Question, answer?: number[]) {
  if (!answer || answer.length === 0) return ['Not answered'];
  if (question.type === 'matching') return (question.rows ?? []).map((row, index) => `${row}: ${answer[index] != null && answer[index] >= 0 ? question.choices[answer[index]] : 'Not selected'}`);
  if (question.type === 'sequence') {
    const lines = answer.map((index, position) => `${position + 1}. ${question.choices[index]}`);
    if (answer.length < question.choices.length) lines.push('Sequence incomplete');
    return lines;
  }
  return answer.map((index) => question.choices[index]);
}

function move(items: number[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function displayText(value?: string) {
  return (value ?? '').replace(/\r/g, '').replace(/\n[\t ]*\n+/g, '\n').trim();
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

function timeLimitSeconds(model: number) {
  return model <= 4 ? 6000 : buildExam(model).length * 120;
}

function selectionLabel(model: number) {
  return model <= 4
    ? `Mock ${String(model).padStart(2, '0')}`
    : `Bank Part ${String(model - 100).padStart(2, '0')}`;
}

function typeLabel(type: Question['type']) {
  return { single: 'Single choice', multi: 'Multiple response', sequence: 'Build sequence', matching: 'Matching', manual: 'Visual / manual review' }[type];
}
