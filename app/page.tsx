'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Bot,
  Brain,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  DatabaseBackup,
  Download,
  ExternalLink,
  FileCheck2,
  Flag,
  GraduationCap,
  History,
  Languages,
  ListChecks,
  Moon,
  MousePointerClick,
  RotateCcw,
  Search,
  ShieldCheck,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Timer,
  Upload,
  UserRound,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  buildExam,
  domainTargets,
  questions,
  type Domain,
  type Question,
} from '@/lib/questions';
import {
  calculateScore,
  isAnswered,
  isCorrect,
  type Answers,
} from '@/lib/exam-utils';
import { buildEgyptianExplanation } from '@/lib/egyptian-explanations';
import {
  createAttemptId,
  createDefaultLearnerState,
  loadLearnerState,
  mergeLearnerStates,
  parseLearnerBackup,
  saveLearnerState,
  serializeLearnerBackup,
  type ActiveAttempt,
  type AttemptRecord,
  type LearnerState,
  type MasteryStatus,
  type MistakeRecord,
  type SessionMode,
  updateMistakeRecords,
} from '@/lib/learner-state';
import {
  DOWNLOAD_BYTES,
  DOWNLOAD_COLLECTIONS,
  DOWNLOAD_COUNT,
} from '@/lib/download-library';
import {
  ALL_TOPICS,
  TOPICS_BY_DOMAIN,
  buildQuestionSet,
  getQuestionTopic,
  type QuestionTopic,
} from '@/lib/question-topics';
import { buildOptionExplanations } from '@/lib/option-explanations';
import { AiTutor } from '@/components/ai-tutor';
import { AiStudyExplanation } from '@/components/ai-study-explanation';
import { buildTutorContext } from '@/lib/ai-tutor';
import { LanguageProvider, useLanguage } from '@/lib/i18n';

type Screen =
  | 'home'
  | 'guide'
  | 'progress'
  | 'custom'
  | 'bookmarks'
  | 'mistakes'
  | 'backup'
  | 'downloads'
  | 'exam'
  | 'results'
  | 'review';

const modelCards = [
  {
    id: 1,
    label: 'Practice exam 1',
    note: 'Balanced across all four skill areas',
  },
  {
    id: 2,
    label: 'Practice exam 2',
    note: 'Balanced across all four skill areas',
  },
  {
    id: 3,
    label: 'Practice exam 3',
    note: 'Balanced across all four skill areas',
  },
  {
    id: 4,
    label: 'Practice exam 4',
    note: 'Balanced across all four skill areas',
  },
].map((item) => ({ ...item, count: buildExam(item.id).length }));

const bankCards = [101, 102, 103, 104].map((id, index) => ({
  id,
  label: `Bank Part ${String(index + 1).padStart(2, '0')}`,
  count: buildExam(id).length,
}));

const instructions: Record<Question['type'], string> = {
  single: 'How to answer: Select one option only, then press Next.',
  multi:
    'How to answer: Select every correct option. More than one answer is required.',
  sequence:
    'How to answer: Add all the steps, then use the arrows to arrange them in the correct order.',
  matching:
    'How to answer: Choose one matching option for every row before moving on.',
  manual:
    'How to answer: Click each answer position inside the image. Your clicks appear as numbered markers; use Clear answer to restart.',
};

const instructionsArabic: Record<Question['type'], string> = {
  single: 'طريقة الإجابة: اختار إجابة واحدة فقط، وبعدها اضغط التالي.',
  multi: 'طريقة الإجابة: اختار كل الإجابات الصحيحة؛ السؤال محتاج أكتر من اختيار.',
  sequence: 'طريقة الإجابة: ضيف كل الخطوات، وبعدها استخدم الأسهم لترتيبها صح.',
  matching: 'طريقة الإجابة: اختار الإجابة المناسبة لكل صف قبل ما تكمل.',
  manual:
    'طريقة الإجابة: اضغط داخل كل موضع إجابة في الصورة. كل ضغطة هتظهر بعلامة مرقمة، وتقدر تمسح وتبدأ من جديد.',
};

const LINKEDIN_URL = 'https://www.linkedin.com/in/bassam-elshoraa/';
const APP_VERSION = '2.2.0';
const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const questionById = new Map(
  questions.map((question) => [question.id, question]),
);

function publicAsset(path: string) {
  return `${ASSET_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export default function Page() {
  return (
    <LanguageProvider>
      <Simulator />
    </LanguageProvider>
  );
}

function Simulator() {
  const { language, tx } = useLanguage();
  const [screen, setScreen] = useState<Screen>('home');
  const [model, setModel] = useState(1);
  const [sessionMode, setSessionMode] = useState<SessionMode>('exam');
  const [sessionLabel, setSessionLabel] = useState('');
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [attemptId, setAttemptId] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [answers, setAnswers] = useState<Answers>({});
  const [flags, setFlags] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6000);
  const [saved, setSaved] = useState<ActiveAttempt | null>(null);
  const [learnerName, setLearnerName] = useState('');
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<Record<string, MistakeRecord>>({});
  const [hydrated, setHydrated] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const screenRef = useRef<Screen>('home');
  const sessionHistoryRef = useRef(false);
  const skipNextPopRef = useRef(false);

  const exam = useMemo(
    () =>
      questionIds.length > 0
        ? questionIds
            .map((id) => questionById.get(id))
            .filter((item): item is Question => Boolean(item))
        : buildExam(model),
    [model, questionIds],
  );
  const question = exam[current];
  const currentSessionLabel = sessionLabel || selectionLabel(model);
  const answeredCount = exam.filter((item) =>
    isAnswered(item, answers[item.id]),
  ).length;
  const unansweredCount = exam.length - answeredCount;
  const score = useMemo(() => calculateScore(exam, answers), [exam, answers]);

  const finishExam = useCallback(() => {
    if (screen !== 'exam') return;
    const completedAt = new Date().toISOString();
    const answered = exam.filter((item) =>
      isAnswered(item, answers[item.id]),
    ).length;
    const percent =
      score.autoGraded > 0
        ? Math.round((score.correct / score.autoGraded) * 100)
        : 0;
    const elapsed =
      sessionMode === 'exam'
        ? Math.max(0, timeLimitSeconds(model, exam.length) - timeLeft)
        : Math.max(
            0,
            Math.round(
              (Date.now() - new Date(startedAt || completedAt).getTime()) /
                1000,
            ),
          );
    const domains = (Object.keys(domainTargets) as Domain[]).map((domain) => {
      const items = exam.filter(
        (item) => item.domain === domain && item.type !== 'manual',
      );
      return {
        domain,
        correct: items.filter((item) => isCorrect(item, answers[item.id]))
          .length,
        total: items.length,
      };
    });
    const sessionTopics = [...new Set(exam.map(getQuestionTopic))];
    const topics = sessionTopics.map((topic) => {
      const items = exam.filter(
        (item) => getQuestionTopic(item) === topic && item.type !== 'manual',
      );
      return {
        topic,
        correct: items.filter((item) => isCorrect(item, answers[item.id]))
          .length,
        total: items.length,
      };
    });
    const record: AttemptRecord = {
      id: attemptId || createAttemptId(),
      model,
      sessionLabel: currentSessionLabel,
      mode: sessionMode,
      learnerName,
      startedAt: startedAt || completedAt,
      completedAt,
      durationSeconds: elapsed,
      questionCount: exam.length,
      answeredCount: answered,
      correct: score.correct,
      incorrect: score.incorrect,
      unanswered: score.unanswered,
      manual: score.manual,
      autoGraded: score.autoGraded,
      percent,
      domains,
      topics,
    };
    setAttempts((previous) =>
      [record, ...previous.filter((item) => item.id !== record.id)].slice(
        0,
        100,
      ),
    );
    setMistakes((previous) =>
      updateMistakeRecords(previous, exam, answers, completedAt),
    );
    setSubmitOpen(false);
    setSaved(null);
    setScreen('results');
  }, [
    answers,
    attemptId,
    exam,
    currentSessionLabel,
    learnerName,
    model,
    score,
    screen,
    sessionMode,
    startedAt,
    timeLeft,
  ]);
  const finishExamRef = useRef(finishExam);

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
    setChecked([]);
    setQuestionIds([]);
    setSessionLabel('');
    setCurrent(0);
    setTimeLeft(6000);
    setSaved(null);
    setSubmitOpen(false);
    if (removeHistoryMarker) {
      skipNextPopRef.current = true;
      window.history.back();
    }
  };

  const returnToHome = () => {
    const removeHistoryMarker = sessionHistoryRef.current;
    sessionHistoryRef.current = false;
    screenRef.current = 'home';
    setScreen('home');
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
        const state = loadLearnerState(localStorage);
        setSaved(state.activeAttempt);
        setLearnerName(state.learner.name);
        setAttempts(state.attempts);
        setBookmarks(state.bookmarks);
        setMistakes(state.mistakes);
        setDark(state.preferences.theme === 'dark');
      } catch {
        // Storage is optional. The exam remains fully usable without it.
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    finishExamRef.current = finishExam;
  }, [finishExam]);

  useEffect(() => {
    if (!hydrated) return;
    const now = new Date().toISOString();
    const activeAttempt: ActiveAttempt | null =
      screen === 'exam'
        ? {
            id: attemptId || createAttemptId(),
            model,
            mode: sessionMode,
            learnerName,
            answers,
            flags,
            checked,
            questionIds,
            sessionLabel,
            current,
            timeLeft: sessionMode === 'exam' ? timeLeft : null,
            startedAt: startedAt || now,
            updatedAt: now,
          }
        : saved;
    try {
      saveLearnerState(localStorage, {
        ...createDefaultLearnerState(),
        learner: { name: learnerName, updatedAt: learnerName ? now : null },
        preferences: { theme: dark ? 'dark' : 'light' },
        activeAttempt,
        attempts,
        bookmarks,
        mistakes,
      });
    } catch {
      // Device storage can be unavailable in private browsing; the active screen still works.
    }
  }, [
    answers,
    attemptId,
    attempts,
    bookmarks,
    checked,
    current,
    dark,
    flags,
    hydrated,
    learnerName,
    mistakes,
    model,
    questionIds,
    saved,
    screen,
    sessionMode,
    sessionLabel,
    startedAt,
    timeLeft,
  ]);

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
      const wasActiveAttempt =
        screenRef.current === 'exam' || screenRef.current === 'review';
      screenRef.current = 'home';
      setScreen('home');
      if (wasActiveAttempt) {
        setAnswers({});
        setFlags([]);
        setChecked([]);
        setQuestionIds([]);
        setSessionLabel('');
        setCurrent(0);
        setTimeLeft(6000);
        setSaved(null);
      }
      setSubmitOpen(false);
    };
    window.addEventListener('popstate', handleBrowserBack);
    return () => window.removeEventListener('popstate', handleBrowserBack);
  }, []);

  useEffect(() => {
    if (screen !== 'exam' || sessionMode !== 'exam') return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          window.setTimeout(() => finishExamRef.current(), 0);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [screen, sessionMode]);

  useEffect(() => {
    const page = document as Document & {
      modelContext?: {
        registerTool: (
          tool: unknown,
          options?: { signal?: AbortSignal },
        ) => void | Promise<void>;
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
        if (!Number.isInteger(value) || value < 1 || value > 4)
          throw new Error('Model must be an integer from 1 to 4.');
        if (!learnerName.trim())
          throw new Error(
            'Add the learner name on the home page before starting an exam.',
          );
        const now = new Date().toISOString();
        const id = createAttemptId();
        setModel(value);
        setSessionMode('exam');
        setAttemptId(id);
        setStartedAt(now);
        setAnswers({});
        setFlags([]);
        setChecked([]);
        setQuestionIds([]);
        setSessionLabel('');
        setCurrent(0);
        const count = buildExam(value).length;
        setTimeLeft(count * 120);
        setSaved({
          id,
          model: value,
          mode: 'exam',
          learnerName,
          answers: {},
          flags: [],
          checked: [],
          questionIds: [],
          sessionLabel: '',
          current: 0,
          timeLeft: count * 120,
          startedAt: now,
          updatedAt: now,
        });
        beginSession();
        setScreen('exam');
        return {
          model: value,
          questionCount: count,
          timeLimitMinutes: count * 2,
        };
      },
    };
    void Promise.resolve(
      page.modelContext.registerTool(tool, { signal: lifecycle.signal }),
    ).catch(() => {});
    return () => lifecycle.abort();
  }, [learnerName]);

  function startExam(
    selectedModel: number,
    selectedMode: SessionMode,
    name: string,
    options?: { questionIds?: string[]; label?: string },
  ) {
    const cleanName = name.trim().replace(/\s+/g, ' ').slice(0, 60);
    const now = new Date().toISOString();
    const id = createAttemptId();
    const selectedQuestionIds = options?.questionIds ?? [];
    const selectedLabel = options?.label ?? '';
    const initialTime =
      selectedMode === 'exam'
        ? timeLimitSeconds(
            selectedModel,
            selectedQuestionIds.length || buildExam(selectedModel).length,
          )
        : 0;
    setLearnerName(cleanName);
    setModel(selectedModel);
    setSessionMode(selectedMode);
    setQuestionIds(selectedQuestionIds);
    setSessionLabel(selectedLabel);
    setAttemptId(id);
    setStartedAt(now);
    setAnswers({});
    setFlags([]);
    setChecked([]);
    setCurrent(0);
    setTimeLeft(initialTime);
    setSaved({
      id,
      model: selectedModel,
      mode: selectedMode,
      learnerName: cleanName,
      answers: {},
      flags: [],
      checked: [],
      questionIds: selectedQuestionIds,
      sessionLabel: selectedLabel,
      current: 0,
      timeLeft: selectedMode === 'exam' ? initialTime : null,
      startedAt: now,
      updatedAt: now,
    });
    beginSession();
    setScreen('exam');
  }

  function resumeExam() {
    if (!saved) return;
    setModel(saved.model);
    setSessionMode(saved.mode);
    setAttemptId(saved.id);
    setStartedAt(saved.startedAt);
    if (!learnerName && saved.learnerName) setLearnerName(saved.learnerName);
    setAnswers(saved.answers);
    setFlags(saved.flags);
    setChecked(saved.checked);
    setQuestionIds(saved.questionIds);
    setSessionLabel(saved.sessionLabel);
    setCurrent(saved.current);
    setTimeLeft(saved.timeLeft ?? 0);
    beginSession();
    setScreen('exam');
  }

  function updateAnswer(value: number[]) {
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
  }

  function toggleFlag() {
    setFlags((previous) =>
      previous.includes(question.id)
        ? previous.filter((id) => id !== question.id)
        : [...previous, question.id],
    );
  }

  function toggleBookmark(questionId: string) {
    setBookmarks((previous) =>
      previous.includes(questionId)
        ? previous.filter((id) => id !== questionId)
        : [questionId, ...previous],
    );
  }

  function startQuestionSet(
    ids: string[],
    label: string,
    mode: SessionMode = 'practice',
  ) {
    if (!learnerName || ids.length === 0) return;
    const modelId = label.startsWith('Mistakes')
      ? 901
      : label.startsWith('Bookmarks')
        ? 902
        : 900;
    startExam(modelId, mode, learnerName, { questionIds: ids, label });
  }

  function checkPracticeAnswer() {
    if (!checked.includes(question.id))
      setChecked((previous) => [...previous, question.id]);
  }

  function renameLearner(name: string) {
    const cleanName = name.trim().replace(/\s+/g, ' ').slice(0, 60);
    setLearnerName(cleanName);
    setSaved((previous) =>
      previous
        ? {
            ...previous,
            learnerName: cleanName,
            updatedAt: new Date().toISOString(),
          }
        : null,
    );
  }

  function getCurrentLearnerState(): LearnerState {
    const now = new Date().toISOString();
    return {
      ...createDefaultLearnerState(),
      learner: { name: learnerName, updatedAt: learnerName ? now : null },
      preferences: { theme: dark ? 'dark' : 'light' },
      activeAttempt: saved,
      attempts,
      bookmarks,
      mistakes,
    };
  }

  function restoreLearnerState(state: LearnerState) {
    setLearnerName(state.learner.name);
    setDark(state.preferences.theme === 'dark');
    setSaved(state.activeAttempt);
    setAttempts(state.attempts);
    setBookmarks(state.bookmarks);
    setMistakes(state.mistakes);
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        dark={dark}
        setDark={setDark}
        saved={saved}
        learnerName={learnerName}
        attempts={attempts}
        bookmarkCount={bookmarks.length}
        mistakeCount={
          Object.values(mistakes).filter((item) => item.status !== 'mastered')
            .length
        }
        onResume={resumeExam}
        onStart={startExam}
        onGuide={openGuide}
        onProgress={() => {
          beginSession();
          setScreen('progress');
        }}
        onCustom={() => {
          beginSession();
          setScreen('custom');
        }}
        onBookmarks={() => {
          beginSession();
          setScreen('bookmarks');
        }}
        onMistakes={() => {
          beginSession();
          setScreen('mistakes');
        }}
        onBackup={() => {
          beginSession();
          setScreen('backup');
        }}
        onDownloads={() => {
          beginSession();
          setScreen('downloads');
        }}
        onRename={renameLearner}
      />
    );
  }

  if (screen === 'guide') {
    return <GuideScreen dark={dark} setDark={setDark} onHome={returnToHome} />;
  }

  if (screen === 'progress') {
    return (
      <ProgressScreen
        dark={dark}
        setDark={setDark}
        learnerName={learnerName}
        attempts={attempts}
        onHome={returnToHome}
      />
    );
  }

  if (screen === 'custom') {
    return (
      <CustomPracticeScreen
        dark={dark}
        setDark={setDark}
        learnerName={learnerName}
        onHome={returnToHome}
        onStart={(ids, label, mode, name) =>
          startExam(900, mode, name, { questionIds: ids, label })
        }
      />
    );
  }

  if (screen === 'bookmarks') {
    return (
      <BookmarksScreen
        dark={dark}
        setDark={setDark}
        learnerName={learnerName}
        bookmarks={bookmarks}
        onToggle={toggleBookmark}
        onStart={startQuestionSet}
        onHome={returnToHome}
      />
    );
  }

  if (screen === 'mistakes') {
    return (
      <MistakesScreen
        dark={dark}
        setDark={setDark}
        learnerName={learnerName}
        mistakes={mistakes}
        bookmarks={bookmarks}
        onToggleBookmark={toggleBookmark}
        onStart={startQuestionSet}
        onHome={returnToHome}
      />
    );
  }

  if (screen === 'backup') {
    return (
      <BackupRestoreScreen
        dark={dark}
        setDark={setDark}
        state={getCurrentLearnerState()}
        onRestore={restoreLearnerState}
        onHome={returnToHome}
      />
    );
  }

  if (screen === 'downloads') {
    return (
      <DownloadsScreen dark={dark} setDark={setDark} onHome={returnToHome} />
    );
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        exam={exam}
        answers={answers}
        timeLeft={timeLeft}
        model={model}
        sessionLabel={currentSessionLabel}
        mode={sessionMode}
        learnerName={learnerName}
        score={score}
        onReview={() => {
          setCurrent(0);
          setScreen('review');
        }}
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
        learnerName={learnerName}
        bookmarks={bookmarks}
        onToggleBookmark={toggleBookmark}
        onResults={() => setScreen('results')}
        onHome={exitToHome}
        dark={dark}
        setDark={setDark}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={
          sessionMode === 'exam'
            ? formatTime(timeLeft)
            : tx('Practice', 'تدريب')
        }
        dark={dark}
        setDark={setDark}
        onHome={exitToHome}
        learnerName={learnerName}
      />
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
                <Badge
                  variant="outline"
                  className="border-primary/40 bg-accent text-accent-foreground"
                >
                  {domainLabel(question.domain, language)}
                </Badge>
                <Badge variant="secondary">
                  {topicLabel(getQuestionTopic(question), language)}
                </Badge>
                <Badge variant="outline">
                  {typeLabel(question.type, language)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {question.source} · Q{question.sourceNumber}
                </span>
                {question.legacy && (
                  <Badge
                    variant="outline"
                    className="border-amber-600/50 text-amber-700 dark:text-amber-300"
                  >
                    {tx('Legacy wording', 'صياغة قديمة')}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={
                    bookmarks.includes(question.id) ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => toggleBookmark(question.id)}
                >
                  {bookmarks.includes(question.id) ? (
                    <BookmarkCheck className="size-4" />
                  ) : (
                    <Bookmark className="size-4" />
                  )}
                  {bookmarks.includes(question.id)
                    ? tx('Saved', 'محفوظ')
                    : tx('Save', 'احفظ')}
                </Button>
                <Button
                  variant={flags.includes(question.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={toggleFlag}
                >
                  <Flag className="size-4" />{' '}
                  {flags.includes(question.id)
                    ? tx('Flagged', 'معلّم')
                    : tx('Flag', 'علّم')}
                </Button>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 border-l-4 border-primary bg-accent/55 px-4 py-3 text-sm leading-6 text-accent-foreground">
              <MousePointerClick className="mt-0.5 size-4 shrink-0" />
              <span>
                {language === 'ar'
                  ? instructionsArabic[question.type]
                  : instructions[question.type]}
              </span>
            </div>

            {question.context && (
              <div className="mt-7 border-l-4 border-primary bg-muted p-4 text-[15px] leading-7">
                <p className="mb-1 font-semibold">
                  {tx('Scenario', 'السيناريو')}
                </p>
                <p
                  dir="ltr"
                  lang="en"
                  className="whitespace-pre-line text-left"
                >
                  {displayText(question.context)}
                </p>
              </div>
            )}

            <h1
              dir="ltr"
              lang="en"
              className="mt-7 max-w-5xl whitespace-pre-line text-left text-lg font-semibold leading-8 sm:text-xl"
            >
              {current + 1}. {displayText(question.prompt)}
            </h1>

            <div className="mt-7 max-w-5xl">
              {question.image && question.type !== 'manual' && (
                <figure className="mb-6">
                  <figcaption className="mb-2 text-sm font-semibold text-muted-foreground">
                    {tx('Source exhibit / table', 'الصورة أو الجدول المرفق')}
                  </figcaption>
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
              <fieldset
                disabled={
                  sessionMode === 'practice' && checked.includes(question.id)
                }
              >
                <QuestionInput
                  question={question}
                  value={answers[question.id] ?? []}
                  onChange={updateAnswer}
                />
              </fieldset>
              {sessionMode === 'practice' && checked.includes(question.id) && (
                <PracticeFeedback
                  question={question}
                  answer={answers[question.id]}
                />
              )}
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-6">
              <Button
                variant="outline"
                disabled={current === 0}
                onClick={() => setCurrent((value) => value - 1)}
              >
                <ArrowLeft
                  className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
                />{' '}
                {tx('Previous', 'السابق')}
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  disabled={
                    sessionMode === 'practice' && checked.includes(question.id)
                  }
                  onClick={() => updateAnswer([])}
                >
                  {tx('Clear answer', 'امسح الإجابة')}
                </Button>
                {sessionMode === 'practice' &&
                  !checked.includes(question.id) && (
                    <Button
                      variant="outline"
                      disabled={!isAnswered(question, answers[question.id])}
                      onClick={checkPracticeAnswer}
                    >
                      {tx('Check answer', 'صحّح الإجابة')}
                    </Button>
                  )}
                {current < exam.length - 1 ? (
                  <Button onClick={() => setCurrent((value) => value + 1)}>
                    {tx('Next', 'التالي')}{' '}
                    <ArrowRight
                      className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
                    />
                  </Button>
                ) : (
                  <Button onClick={() => setSubmitOpen(true)}>
                    {sessionMode === 'exam'
                      ? tx('Submit exam', 'سلّم الامتحان')
                      : tx('Finish practice', 'أنهِ التدريب')}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SiteFooter />

      {sessionMode === 'practice' && (
        <AiTutor
          key={question.id}
          learnerName={learnerName}
          context={buildTutorContext({
            question,
            topic: topicLabel(getQuestionTopic(question), language),
            answer: answers[question.id],
            checked: checked.includes(question.id),
            imageUrl: question.image ? publicAsset(question.image) : undefined,
            answerImageUrl: question.answerImage
              ? publicAsset(question.answerImage)
              : undefined,
            responseLanguage: language === 'ar' ? 'ar-EG' : 'en',
          })}
        />
      )}

      <AlertDialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {sessionMode === 'exam'
                ? tx('Submit', 'تسليم')
                : tx('Finish', 'إنهاء')}{' '}
              {currentSessionLabel}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {unansweredCount > 0
                ? tx(
                    `${unansweredCount} question${unansweredCount === 1 ? '' : 's'} remain unanswered. You can return and complete them, or submit now.`,
                    `لسه فيه ${unansweredCount} سؤال من غير إجابة. تقدر ترجع تكملهم أو تسلّم دلوقتي.`,
                  )
                : tx(
                    `All questions are answered. You will not be able to change answers after ${sessionMode === 'exam' ? 'submission' : 'finishing'}.`,
                    'كل الأسئلة اتجاوبت. مش هتقدر تغيّر الإجابات بعد الإنهاء.',
                  )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {tx('Return to session', 'ارجع للجلسة')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={finishExam}>
              {sessionMode === 'exam'
                ? tx('Submit and score', 'سلّم واعرض النتيجة')
                : tx('Finish and save progress', 'أنهِ واحفظ التقدم')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function HomeScreen({
  dark,
  setDark,
  saved,
  learnerName,
  attempts,
  bookmarkCount,
  mistakeCount,
  onResume,
  onStart,
  onGuide,
  onProgress,
  onCustom,
  onBookmarks,
  onMistakes,
  onBackup,
  onDownloads,
  onRename,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  saved: ActiveAttempt | null;
  learnerName: string;
  attempts: AttemptRecord[];
  bookmarkCount: number;
  mistakeCount: number;
  onResume: () => void;
  onStart: (model: number, mode: SessionMode, name: string) => void;
  onGuide: () => void;
  onProgress: () => void;
  onCustom: () => void;
  onBookmarks: () => void;
  onMistakes: () => void;
  onBackup: () => void;
  onDownloads: () => void;
  onRename: (name: string) => void;
}) {
  const { language, tx } = useLanguage();
  const [setupModel, setSetupModel] = useState<number | null>(null);
  const [renameOnly, setRenameOnly] = useState(false);
  const [setupName, setSetupName] = useState(learnerName);
  const [setupMode, setSetupMode] = useState<SessionMode>('exam');
  const cleanSetupName = setupName.trim().replace(/\s+/g, ' ').slice(0, 60);
  const bestScore =
    attempts.length > 0
      ? Math.max(...attempts.map((attempt) => attempt.percent))
      : null;

  function openSetup(selectedModel: number) {
    setSetupName(learnerName);
    setSetupMode(selectedModel > 4 ? 'practice' : 'exam');
    setRenameOnly(false);
    setSetupModel(selectedModel);
  }

  function closeSetup() {
    setSetupModel(null);
    setRenameOnly(false);
  }

  function confirmSetup() {
    if (!cleanSetupName) return;
    if (renameOnly) onRename(cleanSetupName);
    else if (setupModel !== null)
      onStart(setupModel, setupMode, cleanSetupName);
    closeSetup();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('Ready', 'جاهز')}
        dark={dark}
        setDark={setDark}
        learnerName={learnerName}
      />
      <section className="mx-auto grid max-w-[1500px] gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_360px] lg:py-11">
        <div>
          <p className="inline-flex rounded-full border border-primary/20 bg-accent/60 px-3 py-1.5 text-sm font-semibold text-primary">
            PL-300 · Microsoft Power BI Data Analyst
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[1.15]">
            {learnerName
              ? tx(
                  `Welcome back, ${learnerName}`,
                  `أهلًا برجوعك يا ${learnerName}`,
                )
              : tx('Choose your study session', 'اختار جلسة المذاكرة')}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            {tx(
              'Use Practice for instant feedback and AI help, or Exam for a focused 100-minute simulation with answers hidden until submission.',
              'استخدم التدريب للتصحيح الفوري ومساعدة الـAI، أو الامتحان لمحاكاة مركزة لمدة 100 دقيقة مع إخفاء الإجابات لحد التسليم.',
            )}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="lg"
              className="rounded-sm"
              onClick={onGuide}
            >
              <BookOpen className="size-4 text-primary" />{' '}
              {tx('How to use the simulator', 'دليل استخدام المحاكي')}
            </Button>
            <a
              href="https://learn.microsoft.com/en-us/credentials/certifications/prepare-exam"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: 'outline', size: 'lg' })} rounded-sm`}
            >
              <ExternalLink className="size-4 text-primary" />{' '}
              {tx('Microsoft exam instructions', 'تعليمات امتحان Microsoft')}
            </a>
            <Button
              variant="outline"
              size="lg"
              className="rounded-sm"
              onClick={onProgress}
            >
              <BarChart3 className="size-4 text-primary" />{' '}
              {tx('My progress', 'تقدمي')}
            </Button>
            {learnerName && (
              <Button
                variant="ghost"
                size="lg"
                className="rounded-sm"
                onClick={() => {
                  setSetupName(learnerName);
                  setSetupModel(null);
                  setRenameOnly(true);
                }}
              >
                <UserRound className="size-4" /> {tx('Change name', 'غيّر الاسم')}
              </Button>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <button
              type="button"
              onClick={onCustom}
              className="flex items-center gap-3 rounded-sm border bg-card p-4 text-left transition hover:border-primary hover:bg-accent/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <SlidersHorizontal className="size-5" />
              </span>
              <span>
                <strong className="block">
                  {tx('Custom practice', 'تدريب مخصص')}
                </strong>
                <small className="text-muted-foreground">
                  {tx('Build by domain or topic', 'اختار المجال أو الموضوع')}
                </small>
              </span>
            </button>
            <button
              type="button"
              onClick={onMistakes}
              className="flex items-center gap-3 rounded-sm border bg-card p-4 text-left transition hover:border-primary hover:bg-accent/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <Brain className="size-5" />
              </span>
              <span>
                <strong className="block">{tx('My Mistakes', 'أخطائي')}</strong>
                <small className="text-muted-foreground">
                  {tx(
                    `${mistakeCount} still need work`,
                    `${mistakeCount} محتاجين مراجعة`,
                  )}
                </small>
              </span>
            </button>
            <button
              type="button"
              onClick={onBookmarks}
              className="flex items-center gap-3 rounded-sm border bg-card p-4 text-left transition hover:border-primary hover:bg-accent/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <Bookmark className="size-5" />
              </span>
              <span>
                <strong className="block">
                  {tx('Bookmarks', 'الأسئلة المحفوظة')}
                </strong>
                <small className="text-muted-foreground">
                  {tx(
                    `${bookmarkCount} saved questions`,
                    `${bookmarkCount} سؤال محفوظ`,
                  )}
                </small>
              </span>
            </button>
            <button
              type="button"
              onClick={onDownloads}
              className="flex items-center gap-3 rounded-sm border bg-card p-4 text-left transition hover:border-primary hover:bg-accent/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <Download className="size-5" />
              </span>
              <span>
                <strong className="block">
                  {tx('PDF Library', 'مكتبة ملفات PDF')}
                </strong>
                <small className="text-muted-foreground">
                  {tx(
                    `${DOWNLOAD_COUNT} files by month`,
                    `${DOWNLOAD_COUNT} ملف متقسمين بالشهور`,
                  )}
                </small>
              </span>
            </button>
            <button
              type="button"
              onClick={onBackup}
              className="flex items-center gap-3 rounded-sm border bg-card p-4 text-left transition hover:border-primary hover:bg-accent/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <DatabaseBackup className="size-5" />
              </span>
              <span>
                <strong className="block">
                  {tx('Backup & Restore', 'نسخة احتياطية واستعادة')}
                </strong>
                <small className="text-muted-foreground">
                  {tx('Move progress safely', 'انقل تقدمك بأمان')}
                </small>
              </span>
            </button>
          </div>

          {saved && (
            <Card className="mt-7 rounded-sm border-l-4 border-l-primary bg-card shadow-none">
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-semibold">
                    {saved.sessionLabel || selectionLabel(saved.model)} ·{' '}
                    {modeLabel(saved.mode, language)}{' '}
                    {tx('is in progress', 'لسه مستمر')}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {saved.learnerName ||
                      learnerName ||
                      tx('Learner', 'الطالب')}{' '}
                    · {tx('Question', 'سؤال')} {saved.current + 1}
                    {saved.mode === 'exam'
                      ? ` · ${formatTime(saved.timeLeft ?? 0)} remaining`
                      : tx(' · untimed practice', ' · تدريب بدون وقت')}
                  </p>
                </div>
                <Button onClick={onResume}>
                  {tx('Resume', 'كمّل')} {modeLabel(saved.mode, language)}
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {modelCards.map((item) => (
              <Card
                key={item.id}
                className="rounded-sm border-l-4 border-l-primary bg-card shadow-none transition-colors hover:bg-accent/40"
              >
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-semibold">
                      {tx(item.label, `نموذج امتحان ${item.id}`)}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tx(item.note, 'متوازن على مجالات المهارات الأربعة')}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {tx(
                        `${item.count} questions · ${item.count * 2} minutes`,
                        `${item.count} سؤال · ${item.count * 2} دقيقة`,
                      )}
                    </p>
                  </div>
                  <Button onClick={() => openSetup(item.id)}>
                    {tx('Start', 'ابدأ')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 border-t pt-7">
            <div>
              <h2 className="text-xl font-semibold">
                {tx('Complete source bank', 'بنك الأسئلة كامل')}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {tx(
                  'Work through all 509 source questions in four non-overlapping parts.',
                  'ذاكر كل الـ509 سؤال في أربع أجزاء من غير تكرار.',
                )}
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {bankCards.map((item) => (
              <Card
                key={item.id}
                className="rounded-sm bg-card shadow-none transition-colors hover:bg-muted"
              >
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-semibold">
                      {tx(item.label, `جزء بنك الأسئلة ${item.id - 100}`)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {tx(
                        `${item.count} questions · complete-bank practice`,
                        `${item.count} سؤال · تدريب على البنك الكامل`,
                      )}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => openSetup(item.id)}>
                    {tx('Start', 'ابدأ')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-7 text-xs leading-5 text-muted-foreground">
            {tx(
              'Answer keys match the supplied files. Some source wording uses older Power BI names, so legacy items are preserved as written. One empty vendor placeholder was excluded. Not affiliated with or endorsed by Microsoft.',
              'مفاتيح الإجابة مطابقة للملفات المرفوعة. بعض الأسئلة تستخدم أسماء Power BI قديمة فحافظنا على صياغتها الأصلية. المحاكي مستقل وغير تابع أو معتمد من Microsoft.',
            )}
          </p>
        </div>

        <Card className="h-fit rounded-sm border-t-4 border-t-primary bg-card shadow-none">
          <CardContent className="p-6 sm:p-7">
            <ShieldCheck className="size-9 text-primary" />
            <h2 className="mt-5 text-xl font-semibold">
              {tx('Current PL-300 balance', 'توزيع مجالات PL-300')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {tx(
                "Each practice exam stays inside Microsoft's published domain ranges.",
                'كل نموذج ملتزم بنسب المجالات المنشورة من Microsoft.',
              )}
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <DomainLine
                label={domainLabel('Prepare the data', language)}
                value="28%"
              />
              <DomainLine
                label={domainLabel('Model the data', language)}
                value="26%"
              />
              <DomainLine
                label={tx('Visualize and analyze', 'عرض البيانات وتحليلها')}
                value="26%"
              />
              <DomainLine
                label={tx('Manage and secure', 'الإدارة والتأمين')}
                value="20%"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-5">
              <div className="rounded-sm bg-muted/60 p-3">
                <p className="text-2xl font-semibold text-primary">
                  {attempts.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tx('Completed attempts', 'المحاولات المكتملة')}
                </p>
              </div>
              <div className="rounded-sm bg-muted/60 p-3">
                <p className="text-2xl font-semibold text-primary">
                  {bestScore === null ? '—' : `${bestScore}%`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tx('Best score', 'أفضل نتيجة')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />

      <Dialog
        open={renameOnly || setupModel !== null}
        onOpenChange={(open) => {
          if (!open) closeSetup();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {renameOnly
                ? tx('Update learner name', 'تعديل اسم الطالب')
                : tx(
                    `Start ${setupModel !== null ? selectionLabel(setupModel) : 'session'}`,
                    `ابدأ ${setupModel !== null ? selectionLabel(setupModel, language) : 'الجلسة'}`,
                  )}
            </DialogTitle>
            <DialogDescription>
              {renameOnly
                ? tx(
                    'Your saved attempts will stay exactly as they are.',
                    'كل محاولاتك المحفوظة هتفضل زي ما هي.',
                  )
                : tx(
                    'Add the learner name and choose how this attempt should run.',
                    'اكتب اسم الطالب واختار طريقة تشغيل المحاولة.',
                  )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-2">
            <div className="grid gap-2">
              <Label htmlFor="learner-name">
                {tx('Learner name', 'اسم الطالب')}
              </Label>
              <Input
                id="learner-name"
                value={setupName}
                maxLength={60}
                placeholder={tx('Enter your name', 'اكتب اسمك')}
                onChange={(event) => setSetupName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') confirmSetup();
                }}
              />
              <p className="text-xs text-muted-foreground">
                {tx(
                  'Saved only on this device and shown on your attempts and results.',
                  'الاسم بيتحفظ على الجهاز ده بس وبيظهر في محاولاتك ونتائجك.',
                )}
              </p>
            </div>
            {!renameOnly && (
              <RadioGroup
                value={setupMode}
                onValueChange={(value) => setSetupMode(value as SessionMode)}
                className="grid gap-3 sm:grid-cols-2"
              >
                <Label
                  htmlFor="mode-practice"
                  className={`cursor-pointer rounded-sm border p-4 ${setupMode === 'practice' ? 'border-primary bg-accent/60' : 'bg-card'}`}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <GraduationCap className="size-5 text-primary" />
                    <RadioGroupItem id="mode-practice" value="practice" />{' '}
                    {tx('Practice', 'تدريب')}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {tx(
                      'Untimed. Check each answer and learn immediately.',
                      'من غير وقت. صحّح كل إجابة واتعلم فورًا.',
                    )}
                  </span>
                </Label>
                <Label
                  htmlFor="mode-exam"
                  className={`cursor-pointer rounded-sm border p-4 ${setupMode === 'exam' ? 'border-primary bg-accent/60' : 'bg-card'}`}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Timer className="size-5 text-primary" />
                    <RadioGroupItem id="mode-exam" value="exam" />{' '}
                    {tx('Exam', 'امتحان')}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {tx(
                      'Timed. Answers stay hidden until final submission.',
                      'بوقت. الإجابات تفضل مخفية لحد التسليم النهائي.',
                    )}
                  </span>
                </Label>
              </RadioGroup>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeSetup}>
              {tx('Cancel', 'إلغاء')}
            </Button>
            <Button disabled={!cleanSetupName} onClick={confirmSetup}>
              {renameOnly
                ? tx('Save name', 'احفظ الاسم')
                : tx('Start now', 'ابدأ دلوقتي')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function CustomPracticeScreen({
  dark,
  setDark,
  learnerName,
  onHome,
  onStart,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  learnerName: string;
  onHome: () => void;
  onStart: (
    ids: string[],
    label: string,
    mode: SessionMode,
    name: string,
  ) => void;
}) {
  const { language, tx } = useLanguage();
  const domains = Object.keys(domainTargets) as Domain[];
  const [name, setName] = useState(learnerName);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>(domains);
  const [selectedTopics, setSelectedTopics] = useState<QuestionTopic[]>([]);
  const [mode, setMode] = useState<SessionMode>('practice');
  const [count, setCount] = useState(20);
  const [includeManual, setIncludeManual] = useState(true);
  const availableTopics = selectedDomains.flatMap((domain) => [
    ...TOPICS_BY_DOMAIN[domain],
  ]);
  const pool = questions.filter(
    (question) =>
      selectedDomains.includes(question.domain) &&
      (selectedTopics.length === 0 ||
        selectedTopics.includes(getQuestionTopic(question))) &&
      (includeManual || question.type !== 'manual'),
  );
  const finalCount = Math.min(count, pool.length);

  function toggleDomain(domain: Domain) {
    setSelectedDomains((previous) =>
      previous.includes(domain)
        ? previous.filter((item) => item !== domain)
        : [...previous, domain],
    );
    setSelectedTopics((previous) =>
      previous.filter(
        (topic) =>
          !([...TOPICS_BY_DOMAIN[domain]] as QuestionTopic[]).includes(topic),
      ),
    );
  }

  function startCustom() {
    const selected = buildQuestionSet(pool, finalCount, Date.now());
    const scope =
      selectedTopics.length === 1
        ? selectedTopics[0]
        : selectedDomains.length === 1
          ? selectedDomains[0]
          : 'Mixed topics';
    onStart(
      selected.map((question) => question.id),
      `Custom Practice · ${scope}`,
      mode,
      name.trim(),
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('Custom', 'مخصص')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        learnerName={learnerName}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-11">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">
              {tx('BUILD YOUR OWN SESSION', 'ابنِ جلستك بنفسك')}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {tx('Custom practice', 'تدريب مخصص')}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {tx(
                'Choose the exact skills you want to train. Questions are shuffled every time.',
                'اختار المهارات اللي عايز تتدرب عليها بالظبط. الأسئلة بتتغيّر ترتيبها كل مرة.',
              )}
            </p>
          </div>
          <Button variant="outline" onClick={onHome}>
            <ArrowLeft
              className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
            />{' '}
            {tx('Back to home', 'ارجع للرئيسية')}
          </Button>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-6">
            <Card className="rounded-sm shadow-none">
              <CardContent className="p-6 sm:p-7">
                <h2 className="text-lg font-semibold">
                  {tx('1. Skill areas', '١. مجالات المهارات')}
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {domains.map((domain) => (
                    <Label
                      key={domain}
                      htmlFor={`custom-${domain}`}
                      className={`flex cursor-pointer items-center gap-3 rounded-sm border p-4 ${selectedDomains.includes(domain) ? 'border-primary bg-accent/45' : 'bg-card'}`}
                    >
                      <Checkbox
                        id={`custom-${domain}`}
                        checked={selectedDomains.includes(domain)}
                        onCheckedChange={() => toggleDomain(domain)}
                      />
                      {domainLabel(domain, language)}
                    </Label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm shadow-none">
              <CardContent className="p-6 sm:p-7">
                <h2 className="text-lg font-semibold">
                  {tx('2. Topics', '٢. الموضوعات')}{' '}
                  <span className="font-normal text-muted-foreground">
                    {tx('(optional)', '(اختياري)')}
                  </span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tx(
                    'Leave every topic unchecked to use all topics in the selected skill areas.',
                    'سيب كل الموضوعات من غير اختيار عشان تستخدم كل موضوعات المجالات المحددة.',
                  )}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {availableTopics.map((topic) => (
                    <Label
                      key={topic}
                      htmlFor={`topic-${topic}`}
                      className={`flex cursor-pointer items-center gap-3 rounded-sm border p-3 text-sm ${selectedTopics.includes(topic) ? 'border-primary bg-accent/45' : 'bg-card'}`}
                    >
                      <Checkbox
                        id={`topic-${topic}`}
                        checked={selectedTopics.includes(topic)}
                        onCheckedChange={() =>
                          setSelectedTopics((previous) =>
                            previous.includes(topic)
                              ? previous.filter((item) => item !== topic)
                              : [...previous, topic],
                          )
                        }
                      />
                      {topicLabel(topic, language)}
                    </Label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit rounded-sm border-t-4 border-t-primary shadow-none lg:sticky lg:top-[92px]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">
                {tx('Session setup', 'إعداد الجلسة')}
              </h2>
              <div className="mt-5 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="custom-name">
                    {tx('Learner name', 'اسم الطالب')}
                  </Label>
                  <Input
                    id="custom-name"
                    value={name}
                    maxLength={60}
                    placeholder={tx('Enter your name', 'اكتب اسمك')}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="custom-count">
                    {tx('Number of questions', 'عدد الأسئلة')}
                  </Label>
                  <select
                    id="custom-count"
                    value={count}
                    onChange={(event) => setCount(Number(event.target.value))}
                    className="h-11 rounded-sm border bg-card px-3 text-sm"
                  >
                    {[10, 20, 30, 50, 100].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <RadioGroup
                  value={mode}
                  onValueChange={(value) => setMode(value as SessionMode)}
                  className="grid gap-2"
                >
                  <Label
                    htmlFor="custom-practice"
                    className={`flex cursor-pointer items-center gap-3 rounded-sm border p-3 ${mode === 'practice' ? 'border-primary bg-accent/45' : ''}`}
                  >
                    <RadioGroupItem id="custom-practice" value="practice" />{' '}
                    {tx('Practice · instant feedback', 'تدريب · تصحيح فوري')}
                  </Label>
                  <Label
                    htmlFor="custom-exam"
                    className={`flex cursor-pointer items-center gap-3 rounded-sm border p-3 ${mode === 'exam' ? 'border-primary bg-accent/45' : ''}`}
                  >
                    <RadioGroupItem id="custom-exam" value="exam" />{' '}
                    {tx('Exam · timed', 'امتحان · بوقت')}
                  </Label>
                </RadioGroup>
                <Label
                  htmlFor="include-manual"
                  className="flex cursor-pointer items-center gap-3 rounded-sm border p-3"
                >
                  <Checkbox
                    id="include-manual"
                    checked={includeManual}
                    onCheckedChange={(value) =>
                      setIncludeManual(value === true)
                    }
                  />
                  {tx(
                    'Include visual/manual questions',
                    'ضمّن الأسئلة البصرية واليدوية',
                  )}
                </Label>
              </div>
              <div className="mt-6 rounded-sm bg-muted p-4 text-sm">
                <div className="flex justify-between">
                  <span>{tx('Available pool', 'الأسئلة المتاحة')}</span>
                  <strong>{pool.length}</strong>
                </div>
                <div className="mt-2 flex justify-between">
                  <span>{tx('This session', 'الجلسة دي')}</span>
                  <strong>
                    {tx(`${finalCount} questions`, `${finalCount} سؤال`)}
                  </strong>
                </div>
                {mode === 'exam' && (
                  <div className="mt-2 flex justify-between">
                    <span>{tx('Time limit', 'الوقت')}</span>
                    <strong>
                      {tx(
                        `${finalCount * 2} minutes`,
                        `${finalCount * 2} دقيقة`,
                      )}
                    </strong>
                  </div>
                )}
              </div>
              <Button
                className="mt-5 w-full"
                disabled={!name.trim() || finalCount === 0}
                onClick={startCustom}
              >
                <Shuffle className="size-4" />{' '}
                {tx('Start custom session', 'ابدأ الجلسة المخصصة')}
              </Button>
              {selectedDomains.length === 0 && (
                <p className="mt-3 text-sm text-destructive">
                  {tx(
                    'Select at least one skill area.',
                    'اختار مجال مهارة واحد على الأقل.',
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function BookmarksScreen({
  dark,
  setDark,
  learnerName,
  bookmarks,
  onToggle,
  onStart,
  onHome,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  learnerName: string;
  bookmarks: string[];
  onToggle: (id: string) => void;
  onStart: (ids: string[], label: string, mode?: SessionMode) => void;
  onHome: () => void;
}) {
  const { language, tx } = useLanguage();
  const [search, setSearch] = useState('');
  const items = bookmarks
    .map((id) => questionById.get(id))
    .filter((item): item is Question => Boolean(item))
    .filter((question) =>
      `${question.prompt} ${question.domain} ${getQuestionTopic(question)}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('Saved', 'المحفوظات')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        learnerName={learnerName}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-11">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">
              {tx('SAVED QUESTIONS', 'الأسئلة المحفوظة')}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {tx('Bookmarks', 'الأسئلة المحفوظة')}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {tx(
                'Your saved questions stay available across mocks and practice sessions.',
                'أسئلتك المحفوظة بتفضل موجودة في كل النماذج وجلسات التدريب.',
              )}
            </p>
          </div>
          <Button variant="outline" onClick={onHome}>
            <ArrowLeft
              className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
            />{' '}
            {tx('Back to home', 'ارجع للرئيسية')}
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative min-w-64 flex-1">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              aria-label={tx('Search bookmarks', 'ابحث في الأسئلة المحفوظة')}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={tx(
                'Search saved questions',
                'ابحث في الأسئلة المحفوظة',
              )}
              className="pl-9"
            />
          </div>
          <Button
            disabled={!learnerName || items.length === 0}
            onClick={() =>
              onStart(
                buildQuestionSet(items, Math.min(20, items.length)).map(
                  (item) => item.id,
                ),
                `Bookmarks Review · ${Math.min(20, items.length)}`,
              )
            }
          >
            {tx('Practice up to 20', 'اتدرب على 20 سؤال')}
          </Button>
          <Button
            variant="outline"
            disabled={!learnerName || items.length === 0}
            onClick={() =>
              onStart(
                items.map((item) => item.id),
                `Bookmarks Review · ${items.length}`,
              )
            }
          >
            {tx('Practice all', 'اتدرب على الكل')}
          </Button>
        </div>
        {items.length === 0 ? (
          <ToolEmpty
            icon={<Bookmark className="size-10" />}
            title={
              bookmarks.length
                ? tx(
                    'No bookmarks match your search',
                    'مفيش محفوظات مطابقة للبحث',
                  )
                : tx('No bookmarks yet', 'لسه مفيش أسئلة محفوظة')
            }
            text={
              bookmarks.length
                ? tx('Try a different word.', 'جرّب كلمة مختلفة.')
                : tx(
                    'Use the Save button on any question to keep it here.',
                    'استخدم زر احفظ في أي سؤال عشان تلاقيه هنا.',
                  )
            }
          />
        ) : (
          <div className="mt-6 grid gap-3">
            {items.map((question) => (
              <QuestionLibraryRow
                key={question.id}
                question={question}
                trailing={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggle(question.id)}
                  >
                    <BookmarkCheck className="size-4" /> {tx('Remove', 'إزالة')}
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}

function MistakesScreen({
  dark,
  setDark,
  learnerName,
  mistakes,
  bookmarks,
  onToggleBookmark,
  onStart,
  onHome,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  learnerName: string;
  mistakes: Record<string, MistakeRecord>;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onStart: (ids: string[], label: string, mode?: SessionMode) => void;
  onHome: () => void;
}) {
  const { language, tx } = useLanguage();
  const [status, setStatus] = useState<MasteryStatus | 'all'>('needs-review');
  const [domain, setDomain] = useState<Domain | 'all'>('all');
  const [topic, setTopic] = useState<QuestionTopic | 'all'>('all');
  const [search, setSearch] = useState('');
  const records = Object.values(mistakes).sort((a, b) =>
    b.lastSeenAt.localeCompare(a.lastSeenAt),
  );
  const filtered = records
    .map((record) => ({
      record,
      question: questionById.get(record.questionId),
    }))
    .filter((item): item is { record: MistakeRecord; question: Question } =>
      Boolean(item.question),
    )
    .filter(
      ({ record, question }) =>
        (status === 'all' || record.status === status) &&
        (domain === 'all' || question.domain === domain) &&
        (topic === 'all' || getQuestionTopic(question) === topic) &&
        `${question.prompt} ${question.domain} ${getQuestionTopic(question)}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  const counts = {
    'needs-review': records.filter((item) => item.status === 'needs-review')
      .length,
    improving: records.filter((item) => item.status === 'improving').length,
    mastered: records.filter((item) => item.status === 'mastered').length,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('Mistakes', 'الأخطاء')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        learnerName={learnerName}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-11">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">
              {tx('MASTERY LOOP', 'رحلة إتقان الأخطاء')}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {tx('My Mistakes', 'أخطائي')}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {tx(
                'A wrong answer enters Needs review. One later correct answer moves it to Improving; two in a row marks it Mastered.',
                'الإجابة الغلط تدخل محتاج مراجعة. إجابة صح بعدها تنقلها لبيتحسن، وإجابتين صح ورا بعض تخليها متقنة.',
              )}
            </p>
          </div>
          <Button variant="outline" onClick={onHome}>
            <ArrowLeft
              className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
            />{' '}
            {tx('Back to home', 'ارجع للرئيسية')}
          </Button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <MasteryStat
            label={tx('Needs review', 'محتاج مراجعة')}
            value={counts['needs-review']}
            tone="red"
          />
          <MasteryStat
            label={tx('Improving', 'بيتحسن')}
            value={counts.improving}
            tone="amber"
          />
          <MasteryStat
            label={tx('Mastered', 'متقن')}
            value={counts.mastered}
            tone="green"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {(['needs-review', 'improving', 'mastered', 'all'] as const).map(
            (value) => (
              <Button
                key={value}
                variant={status === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatus(value)}
              >
                {value === 'all'
                  ? tx('All', 'الكل')
                  : masteryLabel(value, language)}
              </Button>
            ),
          )}
        </div>
        <Card className="mt-4 rounded-sm shadow-none">
          <CardContent className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                aria-label={tx('Search mistakes', 'ابحث في الأخطاء')}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={tx('Search questions', 'ابحث في الأسئلة')}
                className="pl-9"
              />
            </div>
            <select
              aria-label={tx('Filter by skill area', 'فلترة حسب مجال المهارة')}
              value={domain}
              onChange={(event) =>
                setDomain(event.target.value as Domain | 'all')
              }
              className="h-10 rounded-sm border bg-card px-3 text-sm"
            >
              <option value="all">
                {tx('All skill areas', 'كل مجالات المهارات')}
              </option>
              {(Object.keys(domainTargets) as Domain[]).map((value) => (
                <option key={value} value={value}>
                  {domainLabel(value, language)}
                </option>
              ))}
            </select>
            <select
              aria-label={tx('Filter by topic', 'فلترة حسب الموضوع')}
              value={topic}
              onChange={(event) =>
                setTopic(event.target.value as QuestionTopic | 'all')
              }
              className="h-10 rounded-sm border bg-card px-3 text-sm"
            >
              <option value="all">{tx('All topics', 'كل الموضوعات')}</option>
              {ALL_TOPICS.map((value) => (
                <option key={value} value={value}>
                  {topicLabel(value, language)}
                </option>
              ))}
            </select>
            <Button
              disabled={!learnerName || filtered.length === 0}
              onClick={() =>
                onStart(
                  buildQuestionSet(
                    filtered.map((item) => item.question),
                    Math.min(20, filtered.length),
                  ).map((item) => item.id),
                  `Mistakes Review · ${Math.min(20, filtered.length)}`,
                )
              }
            >
              <Brain className="size-4" />{' '}
              {tx('Practice up to 20', 'اتدرب على 20 سؤال')}
            </Button>
          </CardContent>
        </Card>
        {filtered.length === 0 ? (
          <ToolEmpty
            icon={<Brain className="size-10" />}
            title={
              records.length
                ? tx('No questions in this view', 'مفيش أسئلة في العرض ده')
                : tx('No mistakes recorded yet', 'لسه مفيش أخطاء مسجلة')
            }
            text={
              records.length
                ? tx('Change the status or filters.', 'غيّر الحالة أو الفلاتر.')
                : tx(
                    'Complete a Practice or Exam session and missed questions will appear here.',
                    'كمّل جلسة تدريب أو امتحان، والأسئلة الغلط هتظهر هنا.',
                  )
            }
          />
        ) : (
          <div className="mt-5 grid gap-3">
            {filtered.map(({ record, question }) => (
              <QuestionLibraryRow
                key={question.id}
                question={question}
                prefix={
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={
                        record.status === 'needs-review'
                          ? 'destructive'
                          : record.status === 'mastered'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {masteryLabel(record.status, language)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {tx(
                        `Missed ${record.incorrectCount} time${record.incorrectCount === 1 ? '' : 's'} · correct streak ${record.correctStreak}`,
                        `غلط ${record.incorrectCount} مرة · سلسلة صحيحة ${record.correctStreak}`,
                      )}
                    </span>
                  </div>
                }
                trailing={
                  <Button
                    variant={
                      bookmarks.includes(question.id) ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => onToggleBookmark(question.id)}
                  >
                    {bookmarks.includes(question.id) ? (
                      <BookmarkCheck className="size-4" />
                    ) : (
                      <Bookmark className="size-4" />
                    )}
                    {bookmarks.includes(question.id)
                      ? tx('Saved', 'محفوظ')
                      : tx('Save', 'احفظ')}
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}

function QuestionLibraryRow({
  question,
  prefix,
  trailing,
}: {
  question: Question;
  prefix?: React.ReactNode;
  trailing: React.ReactNode;
}) {
  const { language } = useLanguage();
  return (
    <Card className="rounded-sm shadow-none">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          {prefix}
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline">
              {domainLabel(question.domain, language)}
            </Badge>
            <Badge variant="secondary">
              {topicLabel(getQuestionTopic(question), language)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {question.source} · Q{question.sourceNumber}
            </span>
          </div>
          <p
            dir="ltr"
            lang="en"
            className="mt-3 line-clamp-3 text-left text-sm font-medium leading-6"
          >
            {displayText(question.prompt)}
          </p>
        </div>
        <div className="shrink-0">{trailing}</div>
      </CardContent>
    </Card>
  );
}

function MasteryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'red' | 'amber' | 'green';
}) {
  const color =
    tone === 'red'
      ? 'text-red-600'
      : tone === 'amber'
        ? 'text-amber-600'
        : 'text-emerald-600';
  return (
    <Card className="rounded-sm shadow-none">
      <CardContent className="p-5 text-center">
        <p className={`text-3xl font-semibold ${color}`}>{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function ToolEmpty({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Card className="mt-6 rounded-sm border-dashed shadow-none">
      <CardContent className="grid min-h-56 place-items-center p-8 text-center">
        <div>
          <div className="mx-auto w-fit text-primary">{icon}</div>
          <h2 className="mt-4 text-xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressScreen({
  dark,
  setDark,
  learnerName,
  attempts,
  onHome,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  learnerName: string;
  attempts: AttemptRecord[];
  onHome: () => void;
}) {
  const { language, tx } = useLanguage();
  const best =
    attempts.length > 0
      ? Math.max(...attempts.map((attempt) => attempt.percent))
      : 0;
  const average =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((sum, attempt) => sum + attempt.percent, 0) /
            attempts.length,
        )
      : 0;
  const totalQuestions = attempts.reduce(
    (sum, attempt) => sum + attempt.questionCount,
    0,
  );
  const domainSummary = (Object.keys(domainTargets) as Domain[]).map(
    (domain) => {
      const totals = attempts
        .flatMap((attempt) => attempt.domains)
        .filter((item) => item.domain === domain);
      const correct = totals.reduce((sum, item) => sum + item.correct, 0);
      const total = totals.reduce((sum, item) => sum + item.total, 0);
      return {
        domain,
        correct,
        total,
        percent: total > 0 ? Math.round((correct / total) * 100) : 0,
      };
    },
  );
  const topicSummary = ALL_TOPICS.map((topic) => {
    const totals = attempts
      .flatMap((attempt) => attempt.topics)
      .filter((item) => item.topic === topic);
    const correct = totals.reduce((sum, item) => sum + item.correct, 0);
    const total = totals.reduce((sum, item) => sum + item.total, 0);
    return {
      topic,
      correct,
      total,
      percent: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  })
    .filter((item) => item.total > 0)
    .sort((a, b) => a.percent - b.percent);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('Progress', 'التقدم')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        learnerName={learnerName}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-11">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">
              {tx('LOCAL LEARNING RECORD', 'سجل المذاكرة المحلي')}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {learnerName
                ? tx(`${learnerName}'s progress`, `تقدم ${learnerName}`)
                : tx('My progress', 'تقدمي')}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {tx(
                'Completed attempts are saved privately in this browser on this device.',
                'المحاولات المكتملة بتتحفظ بشكل خاص في المتصفح على الجهاز ده.',
              )}
            </p>
          </div>
          <Button variant="outline" onClick={onHome}>
            <ArrowLeft
              className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
            />{' '}
            {tx('Back to home', 'ارجع للرئيسية')}
          </Button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ProgressStat
            label={tx('Completed attempts', 'المحاولات المكتملة')}
            value={String(attempts.length)}
            icon={<History className="size-5" />}
          />
          <ProgressStat
            label={tx('Best score', 'أفضل نتيجة')}
            value={attempts.length ? `${best}%` : '—'}
            icon={<BarChart3 className="size-5" />}
          />
          <ProgressStat
            label={tx('Average score', 'متوسط النتيجة')}
            value={attempts.length ? `${average}%` : '—'}
            icon={<TargetIcon />}
          />
          <ProgressStat
            label={tx('Questions attempted', 'الأسئلة التي تمت محاولتها')}
            value={String(totalQuestions)}
            icon={<ListChecks className="size-5" />}
          />
        </div>

        {attempts.length === 0 ? (
          <Card className="mt-7 rounded-sm border-dashed shadow-none">
            <CardContent className="grid min-h-64 place-items-center p-8 text-center">
              <div>
                <BarChart3 className="mx-auto size-10 text-primary" />
                <h2 className="mt-4 text-xl font-semibold">
                  {tx('No completed attempts yet', 'لسه مفيش محاولات مكتملة')}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  {tx(
                    'Finish a Practice or Exam session and the score, duration, and domain performance will appear here.',
                    'كمّل جلسة تدريب أو امتحان وهتظهر هنا النتيجة والمدة والأداء حسب المجال.',
                  )}
                </p>
                <Button className="mt-5" onClick={onHome}>
                  {tx('Choose a session', 'اختار جلسة')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mt-7 rounded-sm shadow-none">
              <CardContent className="p-6 sm:p-7">
                <h2 className="text-lg font-semibold">
                  {tx(
                    'Overall performance by domain',
                    'الأداء العام حسب المجال',
                  )}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tx(
                    'Combined results from every completed attempt.',
                    'نتيجة مجمعة من كل المحاولات المكتملة.',
                  )}
                </p>
                <div className="mt-6 grid gap-5">
                  {domainSummary.map((item) => (
                    <div key={item.domain}>
                      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                        <span className="font-medium">
                          {domainLabel(item.domain, language)}
                        </span>
                        <span>
                          {item.correct}/{item.total} · {item.percent}%
                        </span>
                      </div>
                      <Progress value={item.percent} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {topicSummary.length > 0 && (
              <Card className="mt-7 rounded-sm shadow-none">
                <CardContent className="p-6 sm:p-7">
                  <h2 className="text-lg font-semibold">
                    {tx('Topic-level performance', 'الأداء حسب الموضوع')}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tx(
                      'Weakest topics appear first so you know what to practise next.',
                      'أضعف الموضوعات بتظهر الأول عشان تعرف تتدرب على إيه بعد كده.',
                    )}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {topicSummary.map((item) => (
                      <div key={item.topic} className="rounded-sm border p-4">
                        <div className="mb-2 flex items-start justify-between gap-3 text-sm">
                          <span className="font-medium">
                            {topicLabel(item.topic, language)}
                          </span>
                          <span className="shrink-0">{item.percent}%</span>
                        </div>
                        <Progress value={item.percent} />
                        <p className="mt-2 text-xs text-muted-foreground">
                          {tx(
                            `${item.correct}/${item.total} correct`,
                            `${item.correct}/${item.total} صحيح`,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="mt-7 overflow-hidden rounded-sm shadow-none">
              <CardContent className="p-0">
                <div className="border-b px-6 py-5 sm:px-7">
                  <h2 className="text-lg font-semibold">
                    {tx('Attempt history', 'سجل المحاولات')}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tx('Newest attempt first.', 'الأحدث بيظهر الأول.')}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-muted/70 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3">{tx('Session', 'الجلسة')}</th>
                        <th className="px-4 py-3">{tx('Mode', 'الوضع')}</th>
                        <th className="px-4 py-3">{tx('Score', 'النتيجة')}</th>
                        <th className="px-4 py-3">
                          {tx('Answered', 'تمت إجابته')}
                        </th>
                        <th className="px-4 py-3">{tx('Duration', 'المدة')}</th>
                        <th className="px-6 py-3">
                          {tx('Completed', 'اكتمل')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {attempts.map((attempt) => (
                        <tr
                          key={attempt.id}
                          className="border-t first:border-t-0"
                        >
                          <td className="px-6 py-4">
                            <p className="font-semibold">
                              {attempt.sessionLabel ||
                                selectionLabel(attempt.model, language)}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {attempt.learnerName || tx('Learner', 'الطالب')}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant="outline">
                              {modeLabel(attempt.mode, language)}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-lg font-semibold text-primary">
                              {attempt.percent}%
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {tx(
                                `${attempt.correct}/${attempt.autoGraded} auto-graded`,
                                `${attempt.correct}/${attempt.autoGraded} مصحح تلقائيًا`,
                              )}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            {attempt.answeredCount}/{attempt.questionCount}
                          </td>
                          <td className="px-4 py-4">
                            {formatDuration(attempt.durationSeconds)}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {formatDateTime(attempt.completedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}

function ProgressStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="rounded-sm shadow-none">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-2xl font-semibold text-primary">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{label}</p>
        </div>
        <div className="grid size-10 place-items-center rounded-full bg-accent text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function TargetIcon() {
  return (
    <span className="grid size-5 place-items-center rounded-full border-2 border-current text-[9px] font-bold">
      ●
    </span>
  );
}

function BackupRestoreScreen({
  dark,
  setDark,
  state,
  onRestore,
  onHome,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  state: LearnerState;
  onRestore: (state: LearnerState) => void;
  onHome: () => void;
}) {
  const { language, tx } = useLanguage();
  const [pending, setPending] = useState<LearnerState | null>(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [replaceOpen, setReplaceOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function downloadBackup() {
    const blob = new Blob([serializeLearnerBackup(state)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `pl300-practice-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setMessage(
      tx(
        'Backup downloaded. Keep the JSON file somewhere safe.',
        'تم تنزيل النسخة الاحتياطية. احتفظ بملف JSON في مكان آمن.',
      ),
    );
  }

  async function chooseBackup(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPending(null);
    setMessage('');
    setFileName('');
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage(
        tx(
          'That backup is larger than 5 MB and was not opened.',
          'حجم النسخة أكبر من 5 MB وماتفتحتش.',
        ),
      );
      event.target.value = '';
      return;
    }
    try {
      const backup = parseLearnerBackup(await file.text());
      setPending(backup.state);
      setFileName(file.name);
      setMessage(
        tx(
          'Backup checked successfully. Choose Merge or Replace.',
          'تم فحص النسخة بنجاح. اختار دمج أو استبدال.',
        ),
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : tx('The backup could not be read.', 'تعذر قراءة النسخة الاحتياطية.'),
      );
    }
  }

  function mergeBackup() {
    if (!pending) return;
    onRestore(mergeLearnerStates(state, pending));
    setPending(null);
    setFileName('');
    setMessage(
      tx(
        'Backup merged. Existing and imported learning records are now combined.',
        'تم دمج النسخة مع سجلات المذاكرة الحالية.',
      ),
    );
    if (fileInput.current) fileInput.current.value = '';
  }

  function replaceBackup() {
    if (!pending) return;
    onRestore(pending);
    setReplaceOpen(false);
    setPending(null);
    setFileName('');
    setMessage(
      tx(
        'Local learner data was replaced with the selected backup.',
        'تم استبدال بيانات الطالب المحلية بالنسخة المحددة.',
      ),
    );
    if (fileInput.current) fileInput.current.value = '';
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('Backup', 'نسخة احتياطية')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        learnerName={state.learner.name}
      />
      <section className="mx-auto max-w-5xl px-4 py-7 sm:px-8 sm:py-10">
        <Button variant="outline" onClick={onHome}>
          <ArrowLeft
            className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
          />{' '}
          {tx('Back to home', 'ارجع للرئيسية')}
        </Button>
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold text-primary">
            {tx('LEARNING DATA', 'بيانات المذاكرة')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {tx('Backup & Restore', 'نسخة احتياطية واستعادة')}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {tx(
              'Download one small file containing your name, progress, attempts, bookmarks, mistakes, theme, and any resumable session. Restore it later on this or another device.',
              'نزّل ملف صغير فيه اسمك وتقدمك ومحاولاتك والأسئلة المحفوظة والأخطاء والثيم وأي جلسة قابلة للاستكمال. تقدر تستعيده هنا أو على جهاز تاني.',
            )}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Card className="rounded-sm border-l-4 border-l-primary shadow-none">
            <CardContent className="p-6 sm:p-8">
              <div className="grid size-12 place-items-center rounded-full bg-accent text-primary">
                <Download className="size-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">
                {tx('Download a backup', 'نزّل نسخة احتياطية')}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {tx(
                  'Your data stays in this browser until you export it. No account or cloud storage is used.',
                  'بياناتك بتفضل في المتصفح لحد ما تصدّرها. مفيش حساب أو تخزين سحابي مستخدم.',
                )}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <DataPill
                  label={tx('Attempts', 'المحاولات')}
                  value={state.attempts.length}
                />
                <DataPill
                  label={tx('Bookmarks', 'المحفوظات')}
                  value={state.bookmarks.length}
                />
                <DataPill
                  label={tx('Mistakes', 'الأخطاء')}
                  value={Object.keys(state.mistakes).length}
                />
              </div>
              <Button
                className="mt-6 w-full"
                size="lg"
                onClick={downloadBackup}
              >
                <Download className="size-4" />{' '}
                {tx('Download my backup', 'نزّل نسختي')}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-sm shadow-none">
            <CardContent className="p-6 sm:p-8">
              <div className="grid size-12 place-items-center rounded-full bg-accent text-primary">
                <Upload className="size-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">
                {tx('Restore a backup', 'استعد نسخة احتياطية')}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {tx(
                  'Merge keeps both sets of records. Replace removes the local set and uses the selected backup instead.',
                  'الدمج بيحتفظ بالمجموعتين. الاستبدال بيمسح البيانات المحلية ويستخدم النسخة المحددة.',
                )}
              </p>
              <Input
                ref={fileInput}
                className="mt-5 h-auto py-3"
                type="file"
                accept=".json,application/json"
                onChange={chooseBackup}
                aria-label={tx(
                  'Choose PL-300 backup file',
                  'اختار ملف النسخة الاحتياطية لـPL-300',
                )}
              />
              {pending && (
                <div className="mt-4 rounded-sm border bg-muted/40 p-4 text-sm">
                  <p className="font-semibold">{fileName}</p>
                  <p className="mt-1 text-muted-foreground">
                    {tx(
                      `${pending.attempts.length} attempts · ${pending.bookmarks.length} bookmarks · ${Object.keys(pending.mistakes).length} mistakes`,
                      `${pending.attempts.length} محاولة · ${pending.bookmarks.length} محفوظات · ${Object.keys(pending.mistakes).length} أخطاء`,
                    )}
                  </p>
                </div>
              )}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button
                  variant="outline"
                  disabled={!pending}
                  onClick={mergeBackup}
                >
                  {tx('Merge data', 'ادمج البيانات')}
                </Button>
                <Button
                  variant="destructive"
                  disabled={!pending}
                  onClick={() => setReplaceOpen(true)}
                >
                  {tx('Replace local data', 'استبدل البيانات المحلية')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {message && (
          <output className="mt-5 block rounded-sm border bg-card px-4 py-3 text-sm">
            {message}
          </output>
        )}
      </section>
      <SiteFooter />

      <AlertDialog open={replaceOpen} onOpenChange={setReplaceOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {tx(
                'Replace all local learner data?',
                'استبدال كل بيانات الطالب المحلية؟',
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {tx(
                'This will overwrite the progress currently stored in this browser. Download a backup first if you may need it again.',
                'ده هيستبدل التقدم الموجود حاليًا في المتصفح. نزّل نسخة احتياطية الأول لو ممكن تحتاجه.',
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tx('Cancel', 'إلغاء')}</AlertDialogCancel>
            <AlertDialogAction onClick={replaceBackup}>
              {tx('Replace data', 'استبدل البيانات')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function DownloadsScreen({
  dark,
  setDark,
  onHome,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  onHome: () => void;
}) {
  const { language, tx } = useLanguage();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('PDF Library', 'مكتبة PDF')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
      />
      <section className="mx-auto max-w-6xl px-4 py-7 sm:px-8 sm:py-10">
        <Button variant="outline" onClick={onHome}>
          <ArrowLeft
            className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
          />{' '}
          {tx('Back to home', 'ارجع للرئيسية')}
        </Button>
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold text-primary">
            {tx('REFERENCE LIBRARY', 'مكتبة المراجع')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {tx('PL-300 PDF Downloads', 'تحميل ملفات PL-300 PDF')}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {tx(
              `${DOWNLOAD_COUNT} unique files arranged by month · ${formatBytes(DOWNLOAD_BYTES)} total · 2 duplicate copies removed.`,
              `${DOWNLOAD_COUNT} ملف مختلف متقسمين بالشهور · إجمالي ${formatBytes(DOWNLOAD_BYTES)} · تم حذف نسختين مكررتين.`,
            )}
          </p>
        </div>

        <Card className="mt-7 rounded-sm border-l-4 border-l-amber-500 bg-amber-500/5 shadow-none">
          <CardContent className="flex gap-3 p-5 text-sm leading-6">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-300" />
            <p>
              {tx(
                "This is a separate reference-download library. Downloading a PDF never changes the simulator's 509-question bank, mock exams, answers, scoring, or saved progress.",
                'دي مكتبة تحميل مراجع منفصلة. تنزيل أي PDF مش بيغيّر بنك الـ509 سؤال أو النماذج أو الإجابات أو الدرجات أو التقدم المحفوظ.',
              )}
            </p>
          </CardContent>
        </Card>

        <div className="mt-7 space-y-5">
          {DOWNLOAD_COLLECTIONS.map((collection) => (
            <Card key={collection.month} className="rounded-sm shadow-none">
              <CardContent className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3 border-b pb-4">
                  <h2 className="text-xl font-semibold">{collection.label}</h2>
                  <Badge variant="secondary">
                    {collection.items.length}{' '}
                    {tx(
                      collection.items.length === 1 ? 'file' : 'files',
                      'ملف',
                    )}
                  </Badge>
                </div>
                <div className="divide-y">
                  {collection.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.questionCount
                            ? tx(
                                `${item.questionCount} questions · `,
                                `${item.questionCount} سؤال · `,
                              )
                            : ''}
                          {tx(
                            `${item.pages} pages · ${item.size}`,
                            `${item.pages} صفحة · ${item.size}`,
                          )}
                        </p>
                        {item.note && (
                          <p className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <a
                        href={publicAsset(item.path)}
                        download
                        className={`${buttonVariants({ variant: 'outline' })} shrink-0 rounded-sm`}
                      >
                        <Download className="size-4" />{' '}
                        {tx('Download PDF', 'نزّل PDF')}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function DataPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-sm border bg-muted/40 p-3">
      <strong className="block text-xl">{value}</strong>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function GuideScreen({
  dark,
  setDark,
  onHome,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  onHome: () => void;
}) {
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={isArabic ? 'الدليل' : 'Guide'}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        homeLabel={isArabic ? 'الرئيسية' : 'Home'}
        homeAriaLabel={
          isArabic
            ? 'الرجوع للرئيسية وإنهاء الجلسة الحالية'
            : 'Return home and end the current session'
        }
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
            aria-label={
              isArabic
                ? 'تغيير لغة الدليل للإنجليزية'
                : 'تغيير لغة الدليل إلى العربية'
            }
            title={isArabic ? 'English' : 'العربية'}
            className="gap-1.5"
          >
            <Languages className="size-4" />
            <span className="text-xs font-semibold">
              {isArabic ? 'EN' : 'ع'}
            </span>
          </Button>
        </div>
        <div className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold text-primary">
            {isArabic
              ? 'دليل استخدام محاكي PL-300'
              : 'PL-300 Simulator User Guide'}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {isArabic
              ? 'من أول اختيار الامتحان لحد مراجعة إجاباتك'
              : 'From choosing a practice mode to reviewing your answers'}
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {isArabic
              ? 'الدليل ده يشرحلك كل جزء في المحاكي بسرعة، عشان تركّز في السؤال نفسه ومايضيعش وقتك في فهم الأزرار.'
              : 'This guide explains every part of the simulator so you can focus on the questions instead of spending time figuring out the controls.'}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <GuideCard
            icon={<ListChecks className="size-6" />}
            number={isArabic ? '١' : '1'}
            title={
              isArabic
                ? 'اختار طريقة التدريب'
                : 'Choose how you want to practice'
            }
          >
            {isArabic ? (
              <>
                قبل البداية اكتب اسمك، وبعدها اختار <strong>Practice</strong>{' '}
                للتدريب من غير وقت ومعرفة الصح فورًا، أو <strong>Exam</strong>{' '}
                لمحاكاة بوقت ومن غير كشف الإجابات قبل التسليم. النماذج فيها 50
                سؤال، وبنك الأسئلة مقسوم لأربع أجزاء من غير تكرار.
              </>
            ) : (
              <>
                Enter your name before starting, then choose{' '}
                <strong>Practice</strong> for untimed, immediate feedback or{' '}
                <strong>Exam</strong> for a timed simulation with answers hidden
                until submission. Mocks contain 50 questions; the full bank is
                split into four non-overlapping parts.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<MousePointerClick className="size-6" />}
            number={isArabic ? '٢' : '2'}
            title={
              isArabic
                ? 'جاوب حسب نوع السؤال'
                : 'Answer each question type correctly'
            }
          >
            {isArabic ? (
              <>
                الدائرة معناها اختيار واحد، والمربعات معناها أكتر من إجابة. في
                أسئلة <strong>Answer Area</strong> اضغط جوه مكان الاختيار في
                الصورة؛ كل ضغطة بتظهر بعلامة مرقمة وتقدر تمسحها وتعيدها.
              </>
            ) : (
              <>
                A radio button means one answer; checkboxes mean more than one
                answer. For an <strong>Answer Area</strong>, click the required
                position inside the image. Each click creates a numbered marker
                that you can clear and place again.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<FileCheck2 className="size-6" />}
            number={isArabic ? '٣' : '3'}
            title={isArabic ? 'اتحكم في وقتك' : 'Manage your time and progress'}
          >
            {isArabic ? (
              <>
                العداد بيظهر في <strong>Exam</strong> بس. استخدم{' '}
                <strong>Flag</strong> للسؤال اللي محتاج ترجعله، وأرقام الأسئلة
                بتوضح الحالي والمجاب. تقدمك بيتحفظ لو عملت Refresh، وبعد ما تخلص
                هتلاقي الدرجة والوقت وتحليل المهارات في{' '}
                <strong>My progress</strong>.
              </>
            ) : (
              <>
                The timer appears in <strong>Exam</strong> mode only. Use{' '}
                <strong>Flag</strong> to mark questions for later; the navigator
                shows current and answered items. Refresh-safe progress is
                stored locally, and completed scores, duration, and domain
                analysis appear in <strong>My progress</strong>.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<Check className="size-6" />}
            number={isArabic ? '٤' : '4'}
            title={
              isArabic ? 'سلّم وراجع صح' : 'Submit and learn from your review'
            }
          >
            {isArabic ? (
              <>
                بعد <strong>Submit exam</strong> هتشوف الدرجة وتوزيع أدائك على
                المهارات. افتح <strong>Review answers</strong> عشان تقارن إجابتك
                بالصح وتشوف شرح المصدر، وبعده اضغط{' '}
                <strong>شعبولي الدنيا</strong> للشرح المصري المبسّط خطوة بخطوة.
              </>
            ) : (
              <>
                After <strong>Submit exam</strong>, you will see your score and
                performance by skill area. Open <strong>Review answers</strong>{' '}
                to compare your response with the correct answer and read the
                source explanation. Use <strong>شعبولي الدنيا</strong> for a
                step-by-step beginner explanation in Egyptian Arabic.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<SlidersHorizontal className="size-6" />}
            number={isArabic ? '٥' : '5'}
            title={
              isArabic
                ? 'اعمل تدريب على مقاسك'
                : 'Build a focused practice session'
            }
          >
            {isArabic ? (
              <>
                من <strong>Custom practice</strong> اختار مهارة أو موضوع معين،
                وعدد الأسئلة، وطريقة التدريب. تقدر كمان تستبعد أسئلة الصور لو
                عايز جلسة كلها بتتصحح تلقائيًا. النتيجة هتوضح أداءك في كل موضوع
                من الـ16 موضوع الموجودين في المحاكي.
              </>
            ) : (
              <>
                Use <strong>Custom practice</strong> to choose skill areas,
                specific topics, question count, and session mode. You can also
                exclude visual items for a fully auto-graded session. Results
                break performance down across the simulator&apos;s 16 topics.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<Brain className="size-6" />}
            number={isArabic ? '٦' : '6'}
            title={
              isArabic
                ? 'احفظ المهم وراجع أخطاءك'
                : 'Save questions and master mistakes'
            }
          >
            {isArabic ? (
              <>
                اضغط <strong>Save</strong> على أي سؤال عشان تلاقيه في{' '}
                <strong>Bookmarks</strong>. السؤال الغلط بيروح تلقائيًا إلى{' '}
                <strong>My Mistakes</strong>: إجابة صح بعد كده تنقله إلى{' '}
                <strong>Improving</strong>، وإجابتين صح ورا بعض تخليه{' '}
                <strong>Mastered</strong>. وفي المراجعة افتح{' '}
                <strong>Why each option?</strong> عشان تفهم كل اختيار.
              </>
            ) : (
              <>
                Use <strong>Save</strong> to keep a question in{' '}
                <strong>Bookmarks</strong>. A wrong answer automatically enters{' '}
                <strong>My Mistakes</strong>; one later correct answer moves it
                to <strong>Improving</strong>, and two correct answers in a row
                mark it <strong>Mastered</strong>. In review, open{' '}
                <strong>Why each option?</strong> to inspect every choice.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<DatabaseBackup className="size-6" />}
            number={isArabic ? '٧' : '7'}
            title={
              isArabic
                ? 'خد نسخة من تقدمك ورجّعها'
                : 'Back up and restore your progress'
            }
          >
            {isArabic ? (
              <>
                من <strong>Backup &amp; Restore</strong> نزّل ملف صغير فيه كل
                تقدمك. على جهاز تاني اختار الملف واعمل <strong>Merge</strong>{' '}
                عشان تضم البيانات لبعض، أو <strong>Replace</strong> لاستبدال
                البيانات المحلية بالكامل بعد رسالة التأكيد.
              </>
            ) : (
              <>
                Open <strong>Backup &amp; Restore</strong> to download a small
                file containing all progress. On another device, choose{' '}
                <strong>Merge</strong> to combine records or{' '}
                <strong>Replace</strong> to overwrite local data after the
                confirmation warning.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<Download className="size-6" />}
            number={isArabic ? '٨' : '8'}
            title={
              isArabic
                ? 'نزّل ملفات الـPDF حسب الشهر'
                : 'Download monthly reference PDFs'
            }
          >
            {isArabic ? (
              <>
                افتح <strong>PDF Library</strong> واختار الشهر والملف المطلوب.
                المكتبة مستقلة تمامًا عن أسئلة المحاكي ودرجاته. ومن زر{' '}
                <strong>What&apos;s New</strong> في آخر أي صفحة تقدر تشوف أحدث
                إضافات النسخة الحالية.
              </>
            ) : (
              <>
                Open the <strong>PDF Library</strong>, choose a month, and
                download the file you need. The library is fully separate from
                simulator questions and scoring. Use{' '}
                <strong>What&apos;s New</strong> in any page footer to review
                the latest release changes.
              </>
            )}
          </GuideCard>
          <GuideCard
            icon={<Bot className="size-6" />}
            number={isArabic ? '٩' : '9'}
            title={
              isArabic
                ? 'اسأل مدرس الـAI عن السؤال الحالي'
                : 'Ask the AI tutor about the current question'
            }
          >
            {isArabic ? (
              <>
                زر <strong>Ask AI Tutor</strong> بيظهر في وضع{' '}
                <strong>Practice</strong> فقط. قبل التصحيح يشرح المفهوم ويديك
                تلميحات من غير ما يكشف الإجابة؛ وبعد{' '}
                <strong>Check Answer</strong> يقدر يشوف النتيجة ويشرح سبب الصح
                والغلط بالمصري. الـAI ممكن يغلط، فارجع دائمًا لشرح المصدر.
              </>
            ) : (
              <>
                <strong>Ask AI Tutor</strong> appears only in{' '}
                <strong>Practice</strong> mode. Before checking, it teaches the
                concept and gives hints without revealing the answer. After{' '}
                <strong>Check Answer</strong>, it can see the result and explain
                why each choice is right or wrong. AI can make mistakes, so use
                the source explanation as the final reference.
              </>
            )}
          </GuideCard>
        </div>

        <Card
          className={`mt-7 rounded-sm shadow-none ${isArabic ? 'border-r-4 border-r-primary' : 'border-l-4 border-l-primary'}`}
        >
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              {isArabic ? 'قبل ما تبدأ' : 'Before you start'}
            </h2>
            <div className="mt-5 grid gap-4 text-[15px] leading-7 sm:grid-cols-3">
              <p>
                <strong className="block text-primary">
                  {isArabic
                    ? 'اتمرّن كأنها محاولة حقيقية'
                    : 'Practice like it is the real exam'}
                </strong>
                {isArabic
                  ? 'اقفل المراجع، التزم بالوقت، وسيب السؤال الصعب Flag بدل ما يعطلك.'
                  : 'Close your reference material, respect the timer, and flag a difficult question instead of letting it slow you down.'}
              </p>
              <p>
                <strong className="block text-primary">
                  {isArabic
                    ? 'راجع السبب مش الحرف'
                    : 'Review the reason, not the letter'}
                </strong>
                {isArabic
                  ? 'احفظ أسماء ميزات Power BI بالإنجليزي، لكن افهم ليه الاختيار مناسب لقيود السؤال.'
                  : 'Learn Power BI feature names in English, but focus on why an option fits the requirements in the question.'}
              </p>
              <p>
                <strong className="block text-primary">
                  {isArabic ? 'كرر نقاط ضعفك' : 'Repeat your weakest areas'}
                </strong>
                {isArabic
                  ? 'بعد النتيجة ركّز على Skill area الأقل، وبعدها استخدم بنك الأسئلة للتدريب المكثف.'
                  : 'After the result, focus on your lowest skill area, then use the source bank for concentrated practice.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
    </main>
  );
}

function GuideCard({
  icon,
  number,
  title,
  children,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-sm bg-card shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="grid size-11 place-items-center rounded-full bg-accent text-primary">
            {icon}
          </div>
          <span className="text-3xl font-semibold text-border">{number}</span>
        </div>
        <h2 className="mt-5 text-xl font-semibold">{title}</h2>
        <p className="mt-3 text-[15px] leading-8 text-muted-foreground">
          {children}
        </p>
      </CardContent>
    </Card>
  );
}

function Header({
  time,
  dark,
  setDark,
  onHome,
  learnerName,
  homeLabel = 'Home',
  homeAriaLabel = 'Return home and end the current session',
}: {
  time: string;
  dark: boolean;
  setDark: (value: boolean) => void;
  onHome?: () => void;
  learnerName?: string;
  homeLabel?: string;
  homeAriaLabel?: string;
}) {
  const { isArabic, language, setLanguage, tx } = useLanguage();
  const resolvedHomeLabel =
    homeLabel === 'Home' ? tx('Home', 'الرئيسية') : homeLabel;
  const resolvedHomeAriaLabel =
    homeAriaLabel === 'Return home and end the current session'
      ? tx(
          'Return home and end the current session',
          'الرجوع للرئيسية وإنهاء الجلسة الحالية',
        )
      : homeAriaLabel;
  const brand = (
    <>
      <div className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-[#172033] font-semibold text-white shadow-md transition-transform group-hover:-translate-y-0.5">
        <span className="absolute right-1.5 bottom-1.5 flex items-end gap-0.5 opacity-90">
          <i className="h-2 w-1 rounded-full bg-[#f2c811]" />
          <i className="h-3.5 w-1 rounded-full bg-[#f2c811]" />
          <i className="h-5 w-1 rounded-full bg-[#f2c811]" />
        </span>
        <span className="relative -translate-x-1 text-xs">P3</span>
      </div>
      <div>
        <p className="font-semibold leading-none">
          {tx('PL-300 Practice Exam', 'محاكي امتحان PL-300')}
        </p>
        <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
          {tx(
            'Microsoft Power BI Data Analyst',
            'Microsoft Power BI Data Analyst',
          )}
        </p>
      </div>
    </>
  );
  return (
    <header className="sticky top-0 z-20 border-b bg-card/90 shadow-[0_4px_22px_rgba(22,48,82,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1540px] items-center justify-between px-4 sm:px-8">
        {onHome ? (
          <button
            type="button"
            onClick={onHome}
            className="group flex items-center gap-3 text-left"
            aria-label={tx(
              'Return to the home page and end the current session',
              'الرجوع للصفحة الرئيسية وإنهاء الجلسة الحالية',
            )}
          >
            {brand}
          </button>
        ) : (
          <div className="group flex items-center gap-3">{brand}</div>
        )}
        <div className="flex items-center gap-2">
          {learnerName && (
            <span className="hidden max-w-44 truncate text-sm font-semibold text-muted-foreground md:block">
              {learnerName}
            </span>
          )}
          {onHome && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onHome}
              aria-label={resolvedHomeAriaLabel}
            >
              <ArrowLeft className={`size-4 ${isArabic ? 'rotate-180' : ''}`} />{' '}
              <span className="hidden sm:inline">{resolvedHomeLabel}</span>
            </Button>
          )}
          <div className="flex h-9 items-center gap-2 rounded-lg border bg-muted/45 px-3 text-sm font-semibold tabular-nums">
            <Clock3 className="size-4 text-primary" /> {time}
          </div>
          <Button
            aria-label={tx(
              'Switch interface to Arabic',
              'تغيير الواجهة للإنجليزية',
            )}
            title={language === 'en' ? 'العربية' : 'English'}
            variant="outline"
            size="sm"
            className="min-w-10 gap-1.5 rounded-lg"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            <Languages className="size-4" />
            <span className="hidden text-xs font-bold sm:inline">
              {language === 'en' ? 'ع' : 'EN'}
            </span>
          </Button>
          <Button
            aria-label={
              dark
                ? tx('Use light theme', 'استخدم الوضع الفاتح')
                : tx('Use dark theme', 'استخدم الوضع الداكن')
            }
            variant="outline"
            size="icon"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}

function Navigator({
  exam,
  current,
  answers,
  flags,
  onSelect,
}: {
  exam: Question[];
  current: number;
  answers: Answers;
  flags: string[];
  onSelect: (index: number) => void;
}) {
  const { tx } = useLanguage();
  const completed = exam.filter((item) =>
    isAnswered(item, answers[item.id]),
  ).length;
  return (
    <aside className="h-fit max-h-[240px] overflow-y-auto rounded-sm border bg-sidebar p-4 md:sticky md:top-[92px] md:max-h-[calc(100vh-112px)]">
      <div className="flex items-center justify-between text-sm font-medium">
        <span>
          {tx(
            `Question ${current + 1} of ${exam.length}`,
            `سؤال ${current + 1} من ${exam.length}`,
          )}
        </span>
        <span>
          {completed}/{exam.length}
        </span>
      </div>
      <Progress value={(completed / exam.length) * 100} className="mt-3" />
      <div className="mt-5 grid grid-cols-10 gap-1.5 md:grid-cols-5">
        {exam.map((item, index) => {
          const answered = isAnswered(item, answers[item.id]);
          const flagged = flags.includes(item.id);
          return (
            <button
              key={`${item.id}-${index}`}
              aria-label={tx(
                `Question ${index + 1}${answered ? ', answered' : ''}${flagged ? ', flagged' : ''}`,
                `سؤال ${index + 1}${answered ? '، تمت إجابته' : ''}${flagged ? '، معلّم' : ''}`,
              )}
              onClick={() => onSelect(index)}
              className={`relative aspect-square min-h-8 rounded-sm border text-xs font-medium transition sm:text-sm ${index === current ? 'border-[#244563] bg-[#244563] text-white' : answered ? 'border-[#107c10] bg-[#eaf6ea] text-[#0b5a08] dark:bg-[#143814] dark:text-[#8bd88b]' : 'bg-card hover:border-primary'}`}
            >
              {index + 1}
              {flagged && (
                <span className="absolute -right-1 -top-1 size-2.5 rounded-full border border-card bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-primary" />
          {tx('Current', 'الحالي')}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-emerald-500" />
          {tx('Answered', 'تمت إجابته')}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-amber-500" />
          {tx('Flagged', 'معلّم')}
        </span>
      </div>
    </aside>
  );
}

function VisualAnswerImage({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: number[];
  onChange?: (value: number[]) => void;
}) {
  const { tx } = useLanguage();
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
      aria-label={tx(
        `Answer image for ${question.source} question ${question.sourceNumber}${onChange ? '. Click choices inside the answer area.' : ''}`,
        `صورة إجابة سؤال ${question.sourceNumber} من ${question.source}${onChange ? '، اضغط على الإجابات داخل منطقة الإجابة.' : ''}`,
      )}
      onClick={
        onChange
          ? (event) => {
              if (event.detail === 0) {
                addPoint(0.5, 0.5);
                return;
              }
              const rect = event.currentTarget.getBoundingClientRect();
              addPoint(
                (event.clientX - rect.left) / rect.width,
                (event.clientY - rect.top) / rect.height,
              );
            }
          : undefined
      }
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

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const { tx } = useLanguage();
  if (question.type === 'manual') {
    return (
      <div className="overflow-hidden rounded-sm border bg-card">
        <div className="border-b bg-primary/5 px-4 py-3 text-sm leading-6">
          <strong>{tx('Select on the image', 'اختار من الصورة')}</strong>
          <span className="ml-2 text-muted-foreground">
            {tx(
              'Click each answer inside the Answer Area. Markers are numbered in selection order.',
              'اضغط على كل إجابة داخل Answer Area. العلامات بتترقم حسب ترتيب اختيارك.',
            )}
          </span>
        </div>
        {question.image ? (
          <VisualAnswerImage
            question={question}
            value={value}
            onChange={onChange}
          />
        ) : (
          <div className="p-5 text-sm text-muted-foreground">
            {tx(
              'The source did not include a selectable image for this item.',
              'المصدر مافيهوش صورة قابلة للاختيار للسؤال ده.',
            )}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
          <span className="text-sm font-medium">
            {tx(
              `${value.length} selection${value.length === 1 ? '' : 's'} recorded`,
              `تم تسجيل ${value.length} اختيار`,
            )}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={value.length === 0}
            onClick={() => onChange(value.slice(0, -1))}
          >
            <RotateCcw className="size-4" /> {tx('Undo last', 'الغِ آخر اختيار')}
          </Button>
        </div>
      </div>
    );
  }

  if (question.type === 'single') {
    return (
      <RadioGroup
        dir="ltr"
        value={value[0]?.toString() ?? ''}
        onValueChange={(answer) => onChange([Number(answer)])}
        className="gap-3 text-left"
      >
        {question.choices.map((choice, index) => (
          <Label
            key={choice}
            htmlFor={`${question.id}-${index}`}
            className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border-l-[3px] p-4 text-[15px] leading-6 transition hover:border-primary ${value[0] === index ? 'border-primary bg-accent/60' : 'border-l-transparent bg-card'}`}
          >
            <RadioGroupItem
              value={String(index)}
              id={`${question.id}-${index}`}
            />
            {choice}
          </Label>
        ))}
      </RadioGroup>
    );
  }

  if (question.type === 'multi') {
    return (
      <div dir="ltr" lang="en" className="grid gap-3 text-left">
        {question.choices.map((choice, index) => {
          const checked = value.includes(index);
          return (
            <Label
              key={choice}
              htmlFor={`${question.id}-${index}`}
              className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border-l-[3px] p-4 text-[15px] leading-6 transition hover:border-primary ${checked ? 'border-primary bg-accent/60' : 'border-l-transparent bg-card'}`}
            >
              <Checkbox
                id={`${question.id}-${index}`}
                checked={checked}
                onCheckedChange={() =>
                  onChange(
                    checked
                      ? value.filter((item) => item !== index)
                      : [...value, index],
                  )
                }
              />
              {choice}
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
          <div
            key={row}
            className="grid gap-3 border-b p-4 last:border-b-0 sm:grid-cols-[1fr_1fr] sm:items-center"
          >
            <p
              dir="ltr"
              lang="en"
              className="text-left text-[15px] font-medium"
            >
              {row}
            </p>
            <select
              aria-label={tx(`Match for ${row}`, `وصّل إجابة للصف ${row}`)}
              dir="ltr"
              lang="en"
              className="h-11 rounded-sm border bg-card px-3 text-left text-sm"
              value={
                value[rowIndex] != null && value[rowIndex] >= 0
                  ? value[rowIndex]
                  : ''
              }
              onChange={(event) => {
                const next = Array.from(
                  { length: question.rows?.length ?? 0 },
                  (_, index) => value[index] ?? -1,
                );
                next[rowIndex] = Number(event.target.value);
                onChange(next);
              }}
            >
              <option value="">{tx('Select an answer', 'اختار إجابة')}</option>
              {question.choices.map((choice, index) => (
                <option key={choice} value={index}>
                  {choice}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  }

  const selected = value;
  const available = question.choices
    .map((_, index) => index)
    .filter((index) => !selected.includes(index));
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <p className="mb-2 text-sm font-semibold">
          {tx('Available steps', 'الخطوات المتاحة')}
        </p>
        <div className="grid gap-2 rounded-sm border bg-muted/30 p-3">
          {available.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">
              {tx('All steps selected.', 'تم اختيار كل الخطوات.')}
            </p>
          )}
          {available.map((index) => (
            <button
              key={question.choices[index]}
              onClick={() => onChange([...selected, index])}
              dir="ltr"
              lang="en"
              className="rounded-sm border bg-card p-3 text-left text-sm leading-6 hover:border-primary"
            >
              {question.choices[index]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">
          {tx('Your sequence', 'ترتيبك')}
        </p>
        <div className="grid min-h-20 gap-2 rounded-sm border bg-muted/30 p-3">
          {selected.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">
              {tx(
                'Select the first step. No default order is scored.',
                'اختار أول خطوة؛ مفيش ترتيب افتراضي بيتحسب.',
              )}
            </p>
          )}
          {selected.map((choiceIndex, position) => (
            <div
              key={choiceIndex}
              className="flex items-center gap-2 rounded-sm border bg-card p-2"
            >
              <span className="grid size-7 shrink-0 place-items-center bg-primary text-xs font-bold text-primary-foreground">
                {position + 1}
              </span>
              <span
                dir="ltr"
                lang="en"
                className="flex-1 text-left text-sm leading-5"
              >
                {question.choices[choiceIndex]}
              </span>
              <Button
                aria-label={tx('Move step up', 'حرّك الخطوة لفوق')}
                variant="ghost"
                size="icon"
                disabled={position === 0}
                onClick={() => onChange(move(selected, position, position - 1))}
              >
                <ChevronUp className="size-4" />
              </Button>
              <Button
                aria-label={tx('Move step down', 'حرّك الخطوة لتحت')}
                variant="ghost"
                size="icon"
                disabled={position === selected.length - 1}
                onClick={() => onChange(move(selected, position, position + 1))}
              >
                <ChevronDown className="size-4" />
              </Button>
              <Button
                aria-label={tx('Remove step', 'احذف الخطوة')}
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChange(selected.filter((_, index) => index !== position))
                }
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PracticeFeedback({
  question,
  answer,
}: {
  question: Question;
  answer?: number[];
}) {
  const { language, tx } = useLanguage();
  const correct = isCorrect(question, answer);
  const manual = question.type === 'manual';
  return (
    <div
      className={`mt-6 rounded-sm border-l-4 p-5 ${manual ? 'border-l-sky-500 bg-sky-500/5' : correct ? 'border-l-emerald-600 bg-emerald-500/5' : 'border-l-red-600 bg-red-500/5'}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">
            {manual
              ? tx('Compare with the source answer', 'قارن بإجابة المصدر')
              : correct
                ? tx('Correct answer', 'إجابة صحيحة')
                : tx(
                    'Not quite — review the correct answer',
                    'مش مظبوط — راجع الإجابة الصحيحة',
                  )}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {tx(
              'Feedback appears now because this session is in Practice mode.',
              'التصحيح ظاهر دلوقتي لأن الجلسة في وضع التدريب.',
            )}
          </p>
        </div>
        <Badge
          variant={manual ? 'secondary' : correct ? 'default' : 'destructive'}
        >
          {manual
            ? tx('Manual check', 'مراجعة يدوية')
            : correct
              ? tx('Correct', 'صحيح')
              : tx('Incorrect', 'خطأ')}
        </Badge>
      </div>
      {manual ? (
        question.answerImage && (
          <Image
            src={publicAsset(question.answerImage)}
            alt={`Answer for ${question.source} question ${question.sourceNumber}`}
            width={1000}
            height={1200}
            unoptimized
            className="mt-4 h-auto w-full rounded-sm border bg-white object-contain"
          />
        )
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <AnswerPanel
            title={tx('Your answer', 'إجابتك')}
            lines={formatAnswer(question, answer, language)}
            good={correct}
          />
          <AnswerPanel
            title={tx('Correct answer', 'الإجابة الصحيحة')}
            lines={formatAnswer(question, question.correct, language)}
            good
          />
        </div>
      )}
      <div className="mt-4 whitespace-pre-line rounded-sm bg-card/70 p-4 text-sm leading-7">
        <strong>{tx('Source explanation:', 'شرح المصدر:')}</strong>
        <p
          dir={displayText(question.explanation) ? 'ltr' : undefined}
          lang={displayText(question.explanation) ? 'en' : undefined}
          className={
            displayText(question.explanation) ? 'mt-1 text-left' : 'mt-1'
          }
        >
          {displayText(question.explanation) ||
            tx(
              'No text explanation was included in the source.',
              'المصدر مرفقش شرح نصي للسؤال ده.',
            )}
        </p>
      </div>
      {displayText(question.explanation) && (
        <EgyptianExplanation
          key={`practice-${question.id}`}
          question={question}
        />
      )}
      <OptionBreakdown question={question} answer={answer} />
    </div>
  );
}

function OptionBreakdown({
  question,
  answer,
}: {
  question: Question;
  answer?: number[];
}) {
  const { language, tx } = useLanguage();
  const [aiOpen, setAiOpen] = useState(false);
  const items = buildOptionExplanations(question);
  if (items.length === 0) return null;

  const tutorContext = buildTutorContext({
    question,
    topic: topicLabel(getQuestionTopic(question), language),
    answer,
    checked: true,
    imageUrl: question.image ? publicAsset(question.image) : undefined,
    answerImageUrl: question.answerImage
      ? publicAsset(question.answerImage)
      : undefined,
    responseLanguage: language === 'ar' ? 'ar-EG' : 'en',
  });
  const fallback =
    language === 'ar'
      ? `${items
          .map((item) => {
            const choice = question.choices[item.choiceIndex];
            return item.isCorrect
              ? `✓ ${choice}\nالاختيار ده موجود في الإجابة المعتمدة وبيحقق المطلوب في السؤال.`
              : `✕ ${choice}\nالاختيار ده مش موجود في مفتاح الإجابة ومش بيحقق كل شروط السؤال.`;
          })
          .join('\n\n')}\n\n${buildEgyptianExplanation(question)}`
      : items
          .map(
            (item) =>
              `${item.isCorrect ? '✓' : '✕'} ${question.choices[item.choiceIndex]}\n${item.text}`,
          )
          .join('\n\n');

  return (
    <div className="mt-4 rounded-sm border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <ListChecks className="size-5 text-primary" />
        <h3 className="font-semibold">
          {tx('Why each option?', 'ليه كل اختيار صح أو غلط؟')}
        </h3>
      </div>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {tx(
          'Open any option for its answer-key status, or ask AI for a connected explanation of every choice.',
          'افتح أي اختيار عشان تعرف حالته في مفتاح الإجابة، أو خلّي الـAI يربط كل الاختيارات بشروط السؤال.',
        )}
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3 border-primary/30 text-primary"
        aria-expanded={aiOpen}
        onClick={() => setAiOpen((value) => !value)}
      >
        <BrainCircuit className="size-4" />
        {aiOpen
          ? tx('Hide smart analysis', 'اخفي التحليل الذكي')
          : tx('Analyze every option with AI', 'حلّل كل الاختيارات بالـAI')}
      </Button>
      {aiOpen && (
        <div className="mt-3">
          <AiStudyExplanation
            context={tutorContext}
            kind="options"
            fallback={fallback}
          />
        </div>
      )}
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <details
            key={item.choiceIndex}
            className="rounded-sm border bg-muted/25"
          >
            <summary className="flex cursor-pointer list-none items-start gap-3 p-3 text-sm font-medium leading-6">
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${item.isCorrect ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'}`}
              >
                {item.isCorrect ? (
                  <Check className="size-3.5" />
                ) : (
                  <X className="size-3.5" />
                )}
              </span>
              <span dir="ltr" lang="en" className="flex-1 text-left">
                {question.choices[item.choiceIndex]}
              </span>
              <Badge variant={item.isCorrect ? 'default' : 'secondary'}>
                {item.isCorrect
                  ? tx('In answer key', 'ضمن الإجابة الصحيحة')
                  : tx('Not in answer key', 'إجابة غير صحيحة')}
              </Badge>
            </summary>
            <p
              dir="ltr"
              lang="en"
              className="border-t px-4 py-3 text-left text-sm leading-7 text-muted-foreground"
            >
              {item.text}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

function TopicPerformanceCard({
  exam,
  answers,
}: {
  exam: Question[];
  answers: Answers;
}) {
  const { language, tx } = useLanguage();
  const items = [...new Set(exam.map(getQuestionTopic))]
    .map((topic) => {
      const questionsInTopic = exam.filter(
        (question) =>
          question.type !== 'manual' && getQuestionTopic(question) === topic,
      );
      const correct = questionsInTopic.filter((question) =>
        isCorrect(question, answers[question.id]),
      ).length;
      return {
        topic,
        correct,
        total: questionsInTopic.length,
        percent:
          questionsInTopic.length > 0
            ? Math.round((correct / questionsInTopic.length) * 100)
            : 0,
      };
    })
    .filter((item) => item.total > 0)
    .sort((a, b) => a.percent - b.percent);

  if (items.length === 0) return null;

  return (
    <Card className="mt-6 rounded-sm shadow-none">
      <CardContent className="p-6 sm:p-7">
        <h2 className="text-lg font-semibold">
          {tx('Performance by topic', 'الأداء حسب الموضوع')}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {tx(
            'Weakest topics appear first so your next practice session has a clear focus.',
            'أضعف الموضوعات بتظهر الأول عشان تعرف تركز على إيه في الجلسة الجاية.',
          )}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.topic} className="rounded-sm border p-4">
              <div className="mb-2 flex items-start justify-between gap-3 text-sm">
                <span className="font-medium">
                  {topicLabel(item.topic, language)}
                </span>
                <span className="shrink-0">{item.percent}%</span>
              </div>
              <Progress value={item.percent} />
              <p className="mt-2 text-xs text-muted-foreground">
                {tx(
                  `${item.correct}/${item.total} correct`,
                  `${item.correct}/${item.total} صحيح`,
                )}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ResultsScreen({
  exam,
  answers,
  timeLeft,
  model,
  sessionLabel,
  mode,
  learnerName,
  score,
  onReview,
  onNew,
  onHome,
  dark,
  setDark,
}: {
  exam: Question[];
  answers: Answers;
  timeLeft: number;
  model: number;
  sessionLabel: string;
  mode: SessionMode;
  learnerName: string;
  score: ReturnType<typeof calculateScore>;
  onReview: () => void;
  onNew: () => void;
  onHome: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  const { language, tx } = useLanguage();
  const percent =
    score.autoGraded > 0
      ? Math.round((score.correct / score.autoGraded) * 100)
      : 0;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={mode === 'exam' ? formatTime(timeLeft) : tx('Practice', 'تدريب')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        learnerName={learnerName}
      />
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="rounded-sm border-t-4 border-t-primary bg-card shadow-none">
            <CardContent className="p-7 text-center">
              <p className="text-sm text-muted-foreground">
                {sessionLabel || selectionLabel(model, language)} ·{' '}
                {modeLabel(mode, language)}
              </p>
              <p className="mt-3 text-7xl font-semibold tabular-nums text-primary">
                {percent}%
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {tx(
                  `Based on ${score.autoGraded} auto-graded questions. Visual items remain separate for manual review.`,
                  `النتيجة مبنية على ${score.autoGraded} سؤال بيتصحح تلقائيًا. الأسئلة البصرية منفصلة للمراجعة اليدوية.`,
                )}
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-sm shadow-none">
            <CardContent className="p-7">
              <p className="text-sm font-semibold text-primary">
                {tx('Candidate', 'الطالب')} ·{' '}
                {learnerName || tx('Learner', 'طالب')}
              </p>
              <h1 className="mt-1 text-2xl font-semibold">
                {mode === 'exam'
                  ? tx('Exam complete', 'الامتحان اكتمل')
                  : tx('Practice complete', 'التدريب اكتمل')}
              </h1>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ResultCount
                  label={tx('Correct', 'صحيح')}
                  value={score.correct}
                  color="text-emerald-600"
                />
                <ResultCount
                  label={tx('Incorrect', 'خطأ')}
                  value={score.incorrect}
                  color="text-red-600"
                />
                <ResultCount
                  label={tx('Unanswered', 'بدون إجابة')}
                  value={score.unanswered}
                  color="text-amber-600"
                />
                <ResultCount
                  label={tx('Manual review', 'مراجعة يدوية')}
                  value={score.manual}
                  color="text-sky-600"
                />
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button onClick={onReview}>
                  {tx('Review answers', 'راجع الإجابات')}
                </Button>
                <Button variant="outline" onClick={onNew}>
                  <RotateCcw className="size-4" />{' '}
                  {tx('Choose another session', 'اختار جلسة تانية')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-sm shadow-none">
          <CardContent className="p-6 sm:p-7">
            <h2 className="text-lg font-semibold">
              {tx('Performance by domain', 'الأداء حسب المجال')}
            </h2>
            <div className="mt-5 grid gap-5">
              {(Object.keys(domainTargets) as Domain[]).map((domain) => {
                const items = exam.filter(
                  (item) => item.domain === domain && item.type !== 'manual',
                );
                const correct = items.filter((item) =>
                  isCorrect(item, answers[item.id]),
                ).length;
                const domainPercent =
                  items.length > 0
                    ? Math.round((correct / items.length) * 100)
                    : 0;
                return (
                  <div key={domain}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium">
                        {domainLabel(domain, language)}
                      </span>
                      <span>
                        {correct}/{items.length} · {domainPercent}%
                      </span>
                    </div>
                    <Progress value={domainPercent} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <TopicPerformanceCard exam={exam} answers={answers} />
      </section>
      <SiteFooter />
    </main>
  );
}

function ReviewScreen({
  exam,
  answers,
  current,
  setCurrent,
  flags,
  learnerName,
  bookmarks,
  onToggleBookmark,
  onResults,
  onHome,
  dark,
  setDark,
}: {
  exam: Question[];
  answers: Answers;
  current: number;
  setCurrent: (index: number) => void;
  flags: string[];
  learnerName: string;
  bookmarks: string[];
  onToggleBookmark: (questionId: string) => void;
  onResults: () => void;
  onHome: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  const { language, tx } = useLanguage();
  const question = exam[current];
  const answer = answers[question.id];
  const answered = isAnswered(question, answer);
  const correct = isCorrect(question, answer);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        time={tx('Review', 'المراجعة')}
        dark={dark}
        setDark={setDark}
        onHome={onHome}
        learnerName={learnerName}
      />
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" onClick={onResults}>
            <ArrowLeft
              className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
            />{' '}
            {tx('Results', 'النتيجة')}
          </Button>
          <span className="text-sm text-muted-foreground">
            {tx(
              `Question ${current + 1} of ${exam.length}`,
              `سؤال ${current + 1} من ${exam.length}`,
            )}
            {flags.includes(question.id) ? tx(' · Flagged', ' · معلّم') : ''}
          </span>
        </div>
        <Card className="rounded-sm shadow-none">
          <CardContent className="p-6 sm:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/40 bg-accent text-accent-foreground"
              >
                {domainLabel(question.domain, language)}
              </Badge>
              <Badge variant="secondary">
                {topicLabel(getQuestionTopic(question), language)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {question.source} · Q{question.sourceNumber}
              </span>
              {question.legacy && (
                <Badge
                  variant="outline"
                  className="border-amber-600/50 text-amber-700 dark:text-amber-300"
                >
                  {tx('Legacy wording', 'صياغة قديمة')}
                </Badge>
              )}
              <Badge
                variant={
                  question.type === 'manual'
                    ? 'secondary'
                    : correct
                      ? 'default'
                      : answered
                        ? 'destructive'
                        : 'secondary'
                }
              >
                {question.type === 'manual'
                  ? tx('Manual review', 'مراجعة يدوية')
                  : correct
                    ? tx('Correct', 'صحيح')
                    : answered
                      ? tx('Incorrect', 'خطأ')
                      : tx('Not answered', 'بدون إجابة')}
              </Badge>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onToggleBookmark(question.id)}
              >
                {bookmarks.includes(question.id) ? (
                  <BookmarkCheck className="size-4" />
                ) : (
                  <Bookmark className="size-4" />
                )}
                {bookmarks.includes(question.id)
                  ? tx('Saved', 'محفوظ')
                  : tx('Save', 'احفظ')}
              </Button>
            </div>
            {question.context && (
              <div className="mt-6 border-l-4 border-primary bg-muted p-4 text-sm leading-7">
                <strong>{tx('Scenario: ', 'السيناريو: ')}</strong>
                <p
                  dir="ltr"
                  lang="en"
                  className="mt-1 whitespace-pre-line text-left"
                >
                  {displayText(question.context)}
                </p>
              </div>
            )}
            <h1
              dir="ltr"
              lang="en"
              className="mt-6 whitespace-pre-line text-left text-xl font-semibold leading-8"
            >
              {current + 1}. {displayText(question.prompt)}
            </h1>
            {question.image &&
              (question.type === 'manual' ? (
                <div className="mt-6 overflow-hidden rounded-sm border">
                  <VisualAnswerImage question={question} value={answer ?? []} />
                </div>
              ) : (
                <Image
                  src={publicAsset(question.image)}
                  alt={`Original visual for ${question.source} question ${question.sourceNumber}`}
                  width={1000}
                  height={1200}
                  unoptimized
                  className="mt-6 h-auto w-full rounded-sm border bg-white object-contain"
                />
              ))}
            {question.type === 'manual' ? (
              <div className="mt-7 rounded-sm border border-emerald-500/40 bg-emerald-500/5 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {tx('Source answer', 'إجابة المصدر')}
                </p>
                {question.answerImage && (
                  <Image
                    src={publicAsset(question.answerImage)}
                    alt={`Answer for ${question.source} question ${question.sourceNumber}`}
                    width={1000}
                    height={1200}
                    unoptimized
                    className="h-auto w-full rounded-sm border bg-white object-contain"
                  />
                )}
              </div>
            ) : (
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <AnswerPanel
                  title={tx('Your answer', 'إجابتك')}
                  lines={formatAnswer(question, answer, language)}
                  good={correct}
                />
                <AnswerPanel
                  title={tx('Correct answer', 'الإجابة الصحيحة')}
                  lines={formatAnswer(question, question.correct, language)}
                  good
                />
              </div>
            )}
            <div className="mt-6 whitespace-pre-line border-l-4 border-border bg-muted p-4 text-sm leading-7">
              <strong>{tx('Source explanation:', 'شرح المصدر:')}</strong>
              <p
                dir={displayText(question.explanation) ? 'ltr' : undefined}
                lang={displayText(question.explanation) ? 'en' : undefined}
                className={
                  displayText(question.explanation) ? 'mt-1 text-left' : 'mt-1'
                }
              >
                {displayText(question.explanation) ||
                  tx(
                    'No text explanation was included in the source.',
                    'المصدر مرفقش شرح نصي للسؤال ده.',
                  )}
              </p>
            </div>
            {displayText(question.explanation) && (
              <EgyptianExplanation key={question.id} question={question} />
            )}
            <OptionBreakdown question={question} answer={answer} />
            <div className="mt-8 flex justify-between border-t pt-6">
              <Button
                variant="outline"
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
              >
                <ArrowLeft
                  className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
                />{' '}
                {tx('Previous', 'السابق')}
              </Button>
              <Button
                disabled={current === exam.length - 1}
                onClick={() => setCurrent(current + 1)}
              >
                {tx('Next', 'التالي')}{' '}
                <ArrowRight
                  className={`size-4 ${language === 'ar' ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  const { tx } = useLanguage();
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (localStorage.getItem('pl300-whats-new-seen') !== APP_VERSION)
          setWhatsNewOpen(true);
      } catch {
        // The footer remains usable if browser storage is unavailable.
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, []);

  function changeWhatsNew(open: boolean) {
    setWhatsNewOpen(open);
    if (!open) {
      try {
        localStorage.setItem('pl300-whats-new-seen', APP_VERSION);
      } catch {
        // Dismissing the dialog does not depend on browser storage.
      }
    }
  }

  return (
    <>
      <footer className="border-t bg-card/70">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-7 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              {tx('Designed and developed by', 'تصميم وتطوير')}{' '}
              <a
                className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Bassam Elshoraa
              </a>
              .
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline"
              onClick={() => setWhatsNewOpen(true)}
            >
              <Sparkles className="size-4" /> {tx("What's New", 'إيه الجديد')} ·
              v{APP_VERSION}
            </button>
          </div>
          <a
            className="inline-flex w-fit items-center gap-2 text-primary underline-offset-4 hover:underline"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="size-4"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6.5 8.25H3.25V21H6.5V8.25ZM4.87 3A1.88 1.88 0 1 0 4.9 6.75 1.88 1.88 0 0 0 4.87 3ZM21 13.7c0-3.84-2.05-5.63-4.78-5.63a4.14 4.14 0 0 0-3.75 2.06V8.25H9.22V21h3.25v-6.31c0-1.66.32-3.28 2.39-3.28 2.04 0 2.06 1.91 2.06 3.39V21H21v-7.3Z" />
            </svg>
            {tx(
              "Suggestions or updates? I'd be happy to hear from you on LinkedIn.",
              'عندك اقتراح أو تحديث؟ هكون سعيد أسمعه منك على LinkedIn.',
            )}
          </a>
        </div>
      </footer>

      <Dialog open={whatsNewOpen} onOpenChange={changeWhatsNew}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="size-5 text-primary" />{' '}
              {tx("What's New in", 'الجديد في الإصدار')} v{APP_VERSION}
            </DialogTitle>
            <DialogDescription>
              {tx(
                'September 8, 2026 · Bilingual study experience update',
                '8 سبتمبر 2026 · تحديث تجربة المذاكرة ثنائية اللغة',
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm leading-6">
            <ReleaseNote
              title={tx('Bilingual interface', 'واجهة عربية وإنجليزية')}
              text={tx(
                'Switch the complete simulator between English and Arabic. The layout direction, navigation, feedback, guide, and AI Tutor move together while source questions remain in English.',
                'بدّل المحاكي بالكامل بين العربي والإنجليزي. اتجاه الواجهة والتنقل والتصحيح والدليل ومدرس الـAI بيتغيروا مع بعض، والأسئلة الأصلية بتفضل بالإنجليزي.',
              )}
            />
            <ReleaseNote
              title={tx('AI-powered explanations', 'شرح معتمد على الـAI')}
              text={tx(
                'Simple explanations and option-by-option analysis now use the connected AI service when available, with a reliable built-in fallback when it is not.',
                'شرح المبتدئين وتحليل كل اختيار بيستخدموا خدمة الـAI المتصلة عند توفرها، ومعاهم شرح احتياطي مدمج لو الخدمة مش متاحة.',
              )}
            />
            <ReleaseNote
              title={tx('A calmer study workspace', 'مساحة مذاكرة أهدى')}
              text={tx(
                'A more polished Microsoft-inspired visual system improves hierarchy, reading comfort, focus states, and the AI Tutor entry point without changing exam structure.',
                'نظام بصري أهدى وأقرب لأسلوب Microsoft حسّن ترتيب العناصر وراحة القراءة والتركيز وأيقونة مدرس الـAI من غير تغيير تقسيم الامتحان.',
              )}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => changeWhatsNew(false)}>
              {tx('Got it', 'تمام')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ReleaseNote({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-sm border bg-muted/30 p-4">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-muted-foreground">{text}</p>
    </div>
  );
}

function DomainLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="flex items-center gap-2">
        <Check className="size-4 text-primary" />
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  );
}

function ResultCount({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-sm border bg-muted/40 p-4 text-center">
      <p className={`text-3xl font-semibold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function AnswerPanel({
  title,
  lines,
  good,
}: {
  title: string;
  lines: string[];
  good: boolean;
}) {
  return (
    <div
      className={`rounded-sm border p-4 ${good ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-red-500/40 bg-red-500/5'}`}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      {lines.map((line) => (
        <p
          key={line}
          dir="ltr"
          lang="en"
          className="text-left text-sm leading-6"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function EgyptianExplanation({ question }: { question: Question }) {
  const { language, tx } = useLanguage();
  const [open, setOpen] = useState(false);
  const tutorContext = buildTutorContext({
    question,
    topic: topicLabel(getQuestionTopic(question), language),
    checked: true,
    imageUrl: question.image ? publicAsset(question.image) : undefined,
    answerImageUrl: question.answerImage
      ? publicAsset(question.answerImage)
      : undefined,
    responseLanguage: language === 'ar' ? 'ar-EG' : 'en',
  });

  return (
    <div className="mt-3">
      <Button
        type="button"
        variant="outline"
        className="border-primary/40 bg-accent/60 font-semibold text-primary hover:bg-accent"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className="relative size-6 shrink-0 overflow-hidden rounded-full border border-primary/25 bg-white"
          aria-hidden="true"
        >
          <Image
            src={publicAsset('/shaaban-abdel-rahim.png')}
            alt=""
            fill
            unoptimized
            className="scale-[2.35] object-cover object-[60%_20%]"
          />
        </span>
        {open
          ? tx('Hide simple explanation', 'خلاص فهمت')
          : tx('Explain it simply', 'شعبولي الدنيا')}
      </Button>
      {open && (
        <div
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          lang={language === 'ar' ? 'ar-EG' : 'en'}
          className={`mt-3 rounded-xl border border-primary/25 bg-accent/25 p-3 text-sm leading-8 ${language === 'ar' ? 'border-r-4 border-r-primary text-right' : 'border-l-4 border-l-primary text-left'}`}
        >
          <AiStudyExplanation
            context={tutorContext}
            kind="simple"
            fallback={
              language === 'ar'
                ? buildEgyptianExplanation(question)
                : displayText(question.explanation) ||
                  'Use the verified answer above and compare it with each requirement in the question.'
            }
          />
        </div>
      )}
    </div>
  );
}

function formatAnswer(
  question: Question,
  answer?: number[],
  language: 'en' | 'ar' = 'en',
) {
  if (!answer || answer.length === 0)
    return [language === 'ar' ? 'بدون إجابة' : 'Not answered'];
  if (question.type === 'matching')
    return (question.rows ?? []).map(
      (row, index) =>
        `${row}: ${answer[index] != null && answer[index] >= 0 ? question.choices[answer[index]] : language === 'ar' ? 'لم يتم الاختيار' : 'Not selected'}`,
    );
  if (question.type === 'sequence') {
    const lines = answer.map(
      (index, position) => `${position + 1}. ${question.choices[index]}`,
    );
    if (answer.length < question.choices.length)
      lines.push(
        language === 'ar' ? 'الترتيب غير مكتمل' : 'Sequence incomplete',
      );
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
  return (value ?? '')
    .replace(/\r/g, '')
    .replace(/\n[\t ]*\n+/g, '\n')
    .trim();
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

function formatBytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDuration(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m ${safe % 60}s`;
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function timeLimitSeconds(model: number, questionCount?: number) {
  return (questionCount ?? buildExam(model).length) * 120;
}

function selectionLabel(model: number, language: 'en' | 'ar' = 'en') {
  if (model === 900)
    return language === 'ar' ? 'تدريب مخصص' : 'Custom Practice';
  if (model === 901)
    return language === 'ar' ? 'مراجعة الأخطاء' : 'Mistakes Review';
  if (model === 902)
    return language === 'ar' ? 'مراجعة المحفوظات' : 'Bookmarks Review';
  return model <= 4
    ? language === 'ar'
      ? `نموذج ${String(model).padStart(2, '0')}`
      : `Mock ${String(model).padStart(2, '0')}`
    : language === 'ar'
      ? `جزء البنك ${String(model - 100).padStart(2, '0')}`
      : `Bank Part ${String(model - 100).padStart(2, '0')}`;
}

function modeLabel(mode: SessionMode, language: 'en' | 'ar' = 'en') {
  if (language === 'ar') return mode === 'exam' ? 'وضع الامتحان' : 'وضع التدريب';
  return mode === 'exam' ? 'Exam mode' : 'Practice mode';
}

function masteryLabel(status: MasteryStatus, language: 'en' | 'ar' = 'en') {
  const labels = {
    'needs-review': 'Needs review',
    improving: 'Improving',
    mastered: 'Mastered',
  };
  const arabic = {
    'needs-review': 'محتاج مراجعة',
    improving: 'بيتحسن',
    mastered: 'متقن',
  };
  return (language === 'ar' ? arabic : labels)[status];
}

function typeLabel(type: Question['type'], language: 'en' | 'ar' = 'en') {
  const labels = {
    single: 'Single choice',
    multi: 'Multiple response',
    sequence: 'Build sequence',
    matching: 'Matching',
    manual: 'Visual / manual review',
  };
  const arabic = {
    single: 'اختيار واحد',
    multi: 'اختيارات متعددة',
    sequence: 'ترتيب خطوات',
    matching: 'توصيل',
    manual: 'سؤال بصري / مراجعة يدوية',
  };
  return (language === 'ar' ? arabic : labels)[type];
}

function domainLabel(domain: Domain, language: 'en' | 'ar') {
  if (language === 'en') return domain;
  return {
    'Prepare the data': 'إعداد البيانات',
    'Model the data': 'نمذجة البيانات',
    'Visualize and analyze the data': 'عرض البيانات وتحليلها',
    'Manage and secure Power BI': 'إدارة Power BI وتأمينه',
  }[domain];
}

function topicLabel(topic: QuestionTopic, language: 'en' | 'ar') {
  if (language === 'en') return topic;
  return {
    'Data sources and connectivity': 'مصادر البيانات والاتصال',
    'Power Query transformations': 'تحويلات Power Query',
    'Data profiling and quality': 'تحليل جودة البيانات',
    'Parameters and refresh preparation': 'الباراميترات وتجهيز التحديث',
    'Relationships and model design': 'العلاقات وتصميم الموديل',
    'DAX measures and calculations': 'مقاييس وحسابات DAX',
    'Model performance and storage': 'أداء الموديل والتخزين',
    'Model properties and calculations': 'خصائص الموديل والحسابات',
    'Visuals and formatting': 'الرسومات والتنسيق',
    'Filters, slicers and interactions': 'الفلاتر والتفاعلات',
    'Analytics and insights': 'التحليلات والاستنتاجات',
    'Reports, dashboards and mobile': 'التقارير واللوحات والموبايل',
    'Security and permissions': 'الأمان والصلاحيات',
    'Refresh and gateways': 'التحديث والـGateways',
    'Workspaces, apps and deployment': 'مساحات العمل والتطبيقات والنشر',
    'Governance and administration': 'الحوكمة والإدارة',
  }[topic];
}
