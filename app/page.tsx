'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  Languages,
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

const LINKEDIN_URL = 'https://www.linkedin.com/in/bassam-elshoraa/';
const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function publicAsset(path: string) {
  return `${ASSET_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

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
  const screenRef = useRef<Screen>('home');
  const sessionHistoryRef = useRef(false);
  const skipNextPopRef = useRef(false);

  const exam = useMemo(() => buildExam(model), [model]);
  const question = exam[current];
  const answeredCount = exam.filter((item) => isAnswered(item, answers[item.id])).length;
  const unansweredCount = exam.length - answeredCount;
  const score = useMemo(() => calculateScore(exam, answers), [exam, answers]);

  const beginSession = () => {
    if (sessionHistoryRef.current) return;
    window.history.pushState({ pl300Session: true }, '', window.location.href);
    sessionHistoryRef.current = true;
  };

  const exitToHome = () => {
    const removeHistoryMarker = sessionHistoryRef.current;
    sessionHistoryRef.current = false;
    screenRef.current = 'home';
    setScreen('home');
    setAnswers({});
    setFlags([]);
    setCurrent(0);
    setTimeLeft(6000);
    setSaved(null);
    setSubmitOpen(false);
    try { localStorage.removeItem('pl300-progress-v4'); } catch {}
    if (removeHistoryMarker) {
      skipNextPopRef.current = true;
      window.history.back();
    }
  };

  const openGuide = () => {
    beginSession();
    setScreen('guide');
  };

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
    screenRef.current = screen;
  }, [screen]);

  useEffect(() => {
    const handleBrowserBack = () => {
      if (skipNextPopRef.current) {
        skipNextPopRef.current = false;
        return;
      }
      if (!sessionHistoryRef.current && screenRef.current === 'home') return;
      sessionHistoryRef.current = false;
      screenRef.current = 'home';
      setScreen('home');
      setAnswers({});
      setFlags([]);
      setCurrent(0);
      setTimeLeft(6000);
      setSaved(null);
      setSubmitOpen(false);
      try { localStorage.removeItem('pl300-progress-v4'); } catch {}
    };
    window.addEventListener('popstate', handleBrowserBack);
    return () => window.removeEventListener('popstate', handleBrowserBack);
  }, []);

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
        beginSession();
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
    beginSession();
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
    beginSession();
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
    return <HomeScreen dark={dark} setDark={setDark} saved={saved} onResume={resumeExam} onStart={startExam} onGuide={openGuide} />;
  }

  if (screen === 'guide') {
    return <GuideScreen dark={dark} setDark={setDark} onHome={exitToHome} />;
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
        onNew={exitToHome}
        onHome={exitToHome}
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
        onHome={exitToHome}
        dark={dark}
        setDark={setDark}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time={formatTime(timeLeft)} dark={dark} setDark={setDark} onHome={exitToHome} />
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
                    src={publicAsset(question.image)}
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

      <SiteFooter />

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
      <SiteFooter />
    </main>
  );
}

function GuideScreen({ dark, setDark, onHome }: {
  dark: boolean;
  setDark: (value: boolean) => void;
  onHome: () => void;
}) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const isArabic = language === 'ar';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={isArabic ? 'الدليل' : 'Guide'}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        homeLabel={isArabic ? 'الرئيسية' : 'Home'}
        homeAriaLabel={isArabic ? 'الرجوع للرئيسية وإنهاء الجلسة الحالية' : 'Return home and end the current session'}
      />
      <section
        dir={isArabic ? 'rtl' : 'ltr'}
        lang={isArabic ? 'ar-EG' : 'en'}
        className={`mx-auto max-w-6xl px-4 py-7 sm:px-8 sm:py-10 ${isArabic ? 'text-right' : 'text-left'}`}
      >
        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" onClick={onHome}>
            {isArabic ? 'الرجوع للرئيسية' : 'Back to home'}
            <ArrowLeft className={`size-4 ${isArabic ? 'rotate-180' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
            aria-label={isArabic ? 'Switch guide to English' : 'تغيير لغة الدليل إلى العربية'}
            title={isArabic ? 'English' : 'العربية'}
            className="gap-1.5"
          >
            <Languages className="size-4" />
            <span className="text-xs font-semibold">{isArabic ? 'EN' : 'ع'}</span>
          </Button>
        </div>
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{isArabic ? 'دليل استخدام محاكي PL-300' : 'PL-300 Simulator User Guide'}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {isArabic ? 'من أول اختيار الامتحان لحد مراجعة إجاباتك' : 'From choosing a practice mode to reviewing your answers'}
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {isArabic
              ? 'الدليل ده يشرحلك كل جزء في المحاكي بسرعة، عشان تركّز في السؤال نفسه ومايضيعش وقتك في فهم الأزرار.'
              : 'This guide explains every part of the simulator so you can focus on the questions instead of spending time figuring out the controls.'}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <GuideCard icon={<ListChecks className="size-6" />} number={isArabic ? '١' : '1'} title={isArabic ? 'اختار طريقة التدريب' : 'Choose how you want to practice'}>
            {isArabic ? <><strong>Practice exam</strong> امتحان كامل من 50 سؤال و100 دقيقة، ومتوزع على مهارات PL-300. أما <strong>Complete source bank</strong> فبيقسّم كل بنك الأسئلة لأربع أجزاء عشان تراجعهم كلهم من غير تكرار.</> : <><strong>Practice exam</strong> gives you 50 questions in 100 minutes, balanced across the PL-300 skill areas. <strong>Complete source bank</strong> divides the full question bank into four parts so you can cover every question without repetition.</>}
          </GuideCard>
          <GuideCard icon={<MousePointerClick className="size-6" />} number={isArabic ? '٢' : '2'} title={isArabic ? 'جاوب حسب نوع السؤال' : 'Answer each question type correctly'}>
            {isArabic ? <>الدائرة معناها اختيار واحد، والمربعات معناها أكتر من إجابة. في أسئلة <strong>Answer Area</strong> اضغط جوه مكان الاختيار في الصورة؛ كل ضغطة بتظهر بعلامة مرقمة وتقدر تمسحها وتعيدها.</> : <>A radio button means one answer; checkboxes mean more than one answer. For an <strong>Answer Area</strong>, click the required position inside the image. Each click creates a numbered marker that you can clear and place again.</>}
          </GuideCard>
          <GuideCard icon={<FileCheck2 className="size-6" />} number={isArabic ? '٣' : '3'} title={isArabic ? 'اتحكم في وقتك' : 'Manage your time and progress'}>
            {isArabic ? <>العداد فوق بيحسب الوقت المتبقي. استخدم <strong>Flag</strong> للسؤال اللي محتاج ترجعله، وأرقام الأسئلة على الجنب بتوضح الحالي والمجاب والمتعلّم للمراجعة. تقدمك بيتحفظ لو عملت Refresh أو قفلت التب، لكن الرجوع للرئيسية بينهي المحاولة.</> : <>The timer shows your remaining time. Use <strong>Flag</strong> for questions you want to revisit; the navigator marks the current, answered, and flagged questions. Your progress is saved if you refresh or close the tab, while returning Home ends the attempt.</>}
          </GuideCard>
          <GuideCard icon={<Check className="size-6" />} number={isArabic ? '٤' : '4'} title={isArabic ? 'سلّم وراجع صح' : 'Submit and learn from your review'}>
            {isArabic ? <>بعد <strong>Submit exam</strong> هتشوف الدرجة وتوزيع أدائك على المهارات. افتح <strong>Review answers</strong> عشان تقارن إجابتك بالصح وتشوف شرح المصدر، وبعده اضغط <strong>شعبولي الدنيا</strong> للشرح المصري المبسّط خطوة بخطوة.</> : <>After <strong>Submit exam</strong>, you will see your score and performance by skill area. Open <strong>Review answers</strong> to compare your response with the correct answer and read the source explanation. Use <strong>شعبولي الدنيا</strong> for a step-by-step beginner explanation in Egyptian Arabic.</>}
          </GuideCard>
        </div>

        <Card className={`mt-7 rounded-sm shadow-none ${isArabic ? 'border-r-4 border-r-primary' : 'border-l-4 border-l-primary'}`}>
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">{isArabic ? 'قبل ما تبدأ' : 'Before you start'}</h2>
            <div className="mt-5 grid gap-4 text-[15px] leading-7 sm:grid-cols-3">
              <p><strong className="block text-primary">{isArabic ? 'اتمرّن كأنها محاولة حقيقية' : 'Practice like it is the real exam'}</strong>{isArabic ? 'اقفل المراجع، التزم بالوقت، وسيب السؤال الصعب Flag بدل ما يعطلك.' : 'Close your reference material, respect the timer, and flag a difficult question instead of letting it slow you down.'}</p>
              <p><strong className="block text-primary">{isArabic ? 'راجع السبب مش الحرف' : 'Review the reason, not the letter'}</strong>{isArabic ? 'احفظ أسماء ميزات Power BI بالإنجليزي، لكن افهم ليه الاختيار مناسب لقيود السؤال.' : 'Learn Power BI feature names in English, but focus on why an option fits the requirements in the question.'}</p>
              <p><strong className="block text-primary">{isArabic ? 'كرر نقاط ضعفك' : 'Repeat your weakest areas'}</strong>{isArabic ? 'بعد النتيجة ركّز على Skill area الأقل، وبعدها استخدم بنك الأسئلة للتدريب المكثف.' : 'After the result, focus on your lowest skill area, then use the source bank for concentrated practice.'}</p>
            </div>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
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

function Header({ time, dark, setDark, onHome, homeLabel = 'Home', homeAriaLabel = 'Return home and end the current session' }: {
  time: string;
  dark: boolean;
  setDark: (value: boolean) => void;
  onHome?: () => void;
  homeLabel?: string;
  homeAriaLabel?: string;
}) {
  const brand = (
    <>
      <div className="grid size-9 place-items-center bg-[#0078d4] font-semibold text-white transition-transform group-hover:scale-105">P3</div>
      <div>
        <p className="font-semibold leading-none">PL-300 Practice Exam</p>
        <p className="mt-1 hidden text-xs text-muted-foreground sm:block">Microsoft Power BI Data Analyst</p>
      </div>
    </>
  );
  return (
    <header className="sticky top-0 z-20 border-b bg-card">
      <div className="mx-auto flex h-[72px] max-w-[1540px] items-center justify-between px-4 sm:px-8">
        {onHome ? (
          <button type="button" onClick={onHome} className="group flex items-center gap-3 text-left" aria-label="Return to the home page and end the current session">
            {brand}
          </button>
        ) : <div className="group flex items-center gap-3">{brand}</div>}
        <div className="flex items-center gap-2">
          {onHome && (
            <Button variant="ghost" size="sm" onClick={onHome} aria-label={homeAriaLabel}>
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">{homeLabel}</span>
            </Button>
          )}
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
        src={publicAsset(question.image)}
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

function ResultsScreen({ exam, answers, timeLeft, model, score, onReview, onNew, onHome, dark, setDark }: {
  exam: Question[];
  answers: Answers;
  timeLeft: number;
  model: number;
  score: ReturnType<typeof calculateScore>;
  onReview: () => void;
  onNew: () => void;
  onHome: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  const percent = score.autoGraded > 0 ? Math.round((score.correct / score.autoGraded) * 100) : 0;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time={formatTime(timeLeft)} dark={dark} setDark={setDark} onHome={onHome} />
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
      <SiteFooter />
    </main>
  );
}

function ReviewScreen({ exam, answers, current, setCurrent, flags, onResults, onHome, dark, setDark }: {
  exam: Question[];
  answers: Answers;
  current: number;
  setCurrent: (index: number) => void;
  flags: string[];
  onResults: () => void;
  onHome: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  const question = exam[current];
  const answer = answers[question.id];
  const answered = isAnswered(question, answer);
  const correct = isCorrect(question, answer);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header time="Review" dark={dark} setDark={setDark} onHome={onHome} />
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
                : <Image src={publicAsset(question.image)} alt={`Original visual for ${question.source} question ${question.sourceNumber}`} width={1000} height={1200} unoptimized className="mt-6 h-auto w-full rounded-sm border bg-white object-contain" />
            )}
            {question.type === 'manual' ? (
              <div className="mt-7 rounded-sm border border-emerald-500/40 bg-emerald-500/5 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Source answer</p>
                {question.answerImage && <Image src={publicAsset(question.answerImage)} alt={`Answer for ${question.source} question ${question.sourceNumber}`} width={1000} height={1200} unoptimized className="h-auto w-full rounded-sm border bg-white object-contain" />}
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
      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t bg-card/70">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-7 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          Designed and developed by{' '}
          <a className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            Bassam Elshoraa
          </a>
          .
        </p>
        <a className="inline-flex w-fit items-center gap-2 text-primary underline-offset-4 hover:underline" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <svg className="size-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.5 8.25H3.25V21H6.5V8.25ZM4.87 3A1.88 1.88 0 1 0 4.9 6.75 1.88 1.88 0 0 0 4.87 3ZM21 13.7c0-3.84-2.05-5.63-4.78-5.63a4.14 4.14 0 0 0-3.75 2.06V8.25H9.22V21h3.25v-6.31c0-1.66.32-3.28 2.39-3.28 2.04 0 2.06 1.91 2.06 3.39V21H21v-7.3Z" />
          </svg>
          Suggestions or updates? I&apos;d be happy to hear from you on LinkedIn.
        </a>
      </div>
    </footer>
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
          <Image src={publicAsset('/shaaban-abdel-rahim.png')} alt="" fill unoptimized className="scale-[2.35] object-cover object-[60%_20%]" />
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
