import { isAnswered, isCorrect, type Answers } from './exam-utils.ts';
import type { Question } from './questions.ts';

export const LEARNER_STATE_KEY = 'pl300-simulator-state';
export const LEARNER_STATE_VERSION = 3;
export const LEARNER_BACKUP_KIND = 'pl300-practice-backup';

export type SessionMode = 'practice' | 'exam';

export type ActiveAttempt = {
  id: string;
  model: number;
  mode: SessionMode;
  learnerName: string;
  answers: Answers;
  flags: string[];
  checked: string[];
  questionIds: string[];
  sessionLabel: string;
  current: number;
  timeLeft: number | null;
  startedAt: string;
  updatedAt: string;
};

export type DomainResult = {
  domain: string;
  correct: number;
  total: number;
};

export type TopicResult = {
  topic: string;
  correct: number;
  total: number;
};

export type AttemptRecord = {
  id: string;
  model: number;
  sessionLabel: string;
  mode: SessionMode;
  learnerName: string;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  questionCount: number;
  answeredCount: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  manual: number;
  autoGraded: number;
  percent: number;
  domains: DomainResult[];
  topics: TopicResult[];
};

export type MasteryStatus = 'needs-review' | 'improving' | 'mastered';

export type MistakeRecord = {
  questionId: string;
  incorrectCount: number;
  correctStreak: number;
  status: MasteryStatus;
  firstSeenAt: string;
  lastSeenAt: string;
  lastIncorrectAt: string;
  lastCorrectAt: string | null;
};

export type LearnerState = {
  version: typeof LEARNER_STATE_VERSION;
  learner: { name: string; updatedAt: string | null };
  preferences: { theme: 'light' | 'dark' };
  activeAttempt: ActiveAttempt | null;
  attempts: AttemptRecord[];
  bookmarks: string[];
  mistakes: Record<string, MistakeRecord>;
};

export type LearnerBackup = {
  kind: typeof LEARNER_BACKUP_KIND;
  version: 1;
  exportedAt: string;
  state: LearnerState;
};

type LegacyProgress = {
  model?: unknown;
  answers?: unknown;
  flags?: unknown;
  current?: unknown;
  timeLeft?: unknown;
};

export function createDefaultLearnerState(): LearnerState {
  return {
    version: LEARNER_STATE_VERSION,
    learner: { name: '', updatedAt: null },
    preferences: { theme: 'light' },
    activeAttempt: null,
    attempts: [],
    bookmarks: [],
    mistakes: {},
  };
}

export function loadLearnerState(storage: Storage): LearnerState {
  const fallback = createDefaultLearnerState();
  const storedTheme = storage.getItem('pl300-theme');
  if (storedTheme === 'dark') fallback.preferences.theme = 'dark';

  const raw = storage.getItem(LEARNER_STATE_KEY);
  if (raw) {
    try {
      return migrateState(JSON.parse(raw), fallback);
    } catch {
      // A damaged local record must never prevent the simulator from opening.
    }
  }

  const legacyRaw = storage.getItem('pl300-progress-v4');
  if (legacyRaw) {
    try {
      const legacy = JSON.parse(legacyRaw) as LegacyProgress;
      const now = new Date().toISOString();
      const model = finiteInteger(legacy.model, 1);
      fallback.activeAttempt = {
        id: createAttemptId(),
        model,
        mode: 'exam',
        learnerName: '',
        answers: isAnswerMap(legacy.answers) ? legacy.answers : {},
        flags: stringArray(legacy.flags),
        checked: [],
        questionIds: [],
        sessionLabel: '',
        current: Math.max(0, finiteInteger(legacy.current, 0)),
        timeLeft: Math.max(
          0,
          finiteInteger(legacy.timeLeft, model <= 4 ? 6000 : 0),
        ),
        startedAt: now,
        updatedAt: now,
      };
    } catch {
      // Ignore malformed legacy progress and continue with a clean local state.
    }
  }

  return fallback;
}

export function saveLearnerState(storage: Storage, state: LearnerState) {
  storage.setItem(LEARNER_STATE_KEY, JSON.stringify(state));
  storage.removeItem('pl300-progress-v4');
  storage.removeItem('pl300-theme');
}

export function createLearnerBackup(state: LearnerState): LearnerBackup {
  return {
    kind: LEARNER_BACKUP_KIND,
    version: 1,
    exportedAt: new Date().toISOString(),
    state: migrateState(state, createDefaultLearnerState()),
  };
}

export function serializeLearnerBackup(state: LearnerState) {
  return JSON.stringify(createLearnerBackup(state), null, 2);
}

export function parseLearnerBackup(text: string): LearnerBackup {
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  if (!isRecord(input) || input.kind !== LEARNER_BACKUP_KIND)
    throw new Error('This is not a PL-300 Practice Lab backup file.');
  if (!isRecord(input.state))
    throw new Error('The backup does not contain learner data.');
  return {
    kind: LEARNER_BACKUP_KIND,
    version: 1,
    exportedAt:
      typeof input.exportedAt === 'string'
        ? input.exportedAt
        : new Date().toISOString(),
    state: migrateState(input.state, createDefaultLearnerState()),
  };
}

export function mergeLearnerStates(
  current: LearnerState,
  incoming: LearnerState,
): LearnerState {
  const attemptsById = new Map<string, AttemptRecord>();
  for (const attempt of [...current.attempts, ...incoming.attempts]) {
    const existing = attemptsById.get(attempt.id);
    if (!existing || attempt.completedAt > existing.completedAt)
      attemptsById.set(attempt.id, attempt);
  }

  const mistakes = { ...incoming.mistakes };
  for (const [id, record] of Object.entries(current.mistakes)) {
    const existing = mistakes[id];
    if (!existing || record.lastSeenAt >= existing.lastSeenAt)
      mistakes[id] = record;
  }

  return {
    version: LEARNER_STATE_VERSION,
    learner: current.learner.name ? current.learner : incoming.learner,
    preferences: current.preferences,
    activeAttempt: current.activeAttempt ?? incoming.activeAttempt,
    attempts: [...attemptsById.values()]
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, 100),
    bookmarks: [...new Set([...current.bookmarks, ...incoming.bookmarks])],
    mistakes,
  };
}

export function createAttemptId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
    return crypto.randomUUID();
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function updateMistakeRecords(
  current: Record<string, MistakeRecord>,
  exam: Question[],
  answers: Answers,
  seenAt: string,
) {
  const next = { ...current };
  for (const question of exam) {
    if (question.type === 'manual') continue;
    const answer = answers[question.id];
    if (!isAnswered(question, answer)) continue;
    const previous = next[question.id];
    if (isCorrect(question, answer)) {
      if (!previous) continue;
      const correctStreak = previous.correctStreak + 1;
      next[question.id] = {
        ...previous,
        correctStreak,
        status: correctStreak >= 2 ? 'mastered' : 'improving',
        lastSeenAt: seenAt,
        lastCorrectAt: seenAt,
      };
    } else {
      next[question.id] = {
        questionId: question.id,
        incorrectCount: (previous?.incorrectCount ?? 0) + 1,
        correctStreak: 0,
        status: 'needs-review',
        firstSeenAt: previous?.firstSeenAt ?? seenAt,
        lastSeenAt: seenAt,
        lastIncorrectAt: seenAt,
        lastCorrectAt: previous?.lastCorrectAt ?? null,
      };
    }
  }
  return next;
}

function migrateState(input: unknown, fallback: LearnerState): LearnerState {
  if (!isRecord(input)) return fallback;

  const learner = isRecord(input.learner) ? input.learner : {};
  const preferences = isRecord(input.preferences) ? input.preferences : {};
  const attempts = Array.isArray(input.attempts)
    ? input.attempts
        .map(normalizeAttemptRecord)
        .filter((value): value is AttemptRecord => value !== null)
        .slice(0, 100)
    : [];
  const mistakes = isRecord(input.mistakes)
    ? Object.fromEntries(
        Object.entries(input.mistakes)
          .map(
            ([id, value]) => [id, normalizeMistakeRecord(id, value)] as const,
          )
          .filter(
            (entry): entry is readonly [string, MistakeRecord] =>
              entry[1] !== null,
          ),
      )
    : {};

  return {
    version: LEARNER_STATE_VERSION,
    learner: {
      name: cleanName(learner.name),
      updatedAt:
        typeof learner.updatedAt === 'string' ? learner.updatedAt : null,
    },
    preferences: {
      theme: preferences.theme === 'dark' ? 'dark' : fallback.preferences.theme,
    },
    activeAttempt: normalizeActiveAttempt(input.activeAttempt),
    attempts,
    bookmarks: stringArray(input.bookmarks),
    mistakes,
  };
}

function normalizeActiveAttempt(value: unknown): ActiveAttempt | null {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !Number.isInteger(value.model) ||
    !isAnswerMap(value.answers)
  )
    return null;
  const now = new Date().toISOString();
  return {
    id: value.id,
    model: Number(value.model),
    mode: value.mode === 'practice' ? 'practice' : 'exam',
    learnerName: cleanName(value.learnerName),
    answers: value.answers,
    flags: stringArray(value.flags),
    checked: stringArray(value.checked),
    questionIds: stringArray(value.questionIds),
    sessionLabel:
      typeof value.sessionLabel === 'string' ? value.sessionLabel : '',
    current: Math.max(0, finiteInteger(value.current, 0)),
    timeLeft:
      value.timeLeft === null
        ? null
        : Math.max(0, finiteInteger(value.timeLeft, 0)),
    startedAt: typeof value.startedAt === 'string' ? value.startedAt : now,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : now,
  };
}

function normalizeAttemptRecord(value: unknown): AttemptRecord | null {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !Number.isInteger(value.model) ||
    typeof value.completedAt !== 'string'
  )
    return null;
  const domains = Array.isArray(value.domains)
    ? value.domains.filter(isDomainResult)
    : [];
  const topics = Array.isArray(value.topics)
    ? value.topics.filter(isTopicResult)
    : [];
  return {
    id: value.id,
    model: Number(value.model),
    sessionLabel:
      typeof value.sessionLabel === 'string' ? value.sessionLabel : '',
    mode: value.mode === 'practice' ? 'practice' : 'exam',
    learnerName: cleanName(value.learnerName),
    startedAt:
      typeof value.startedAt === 'string' ? value.startedAt : value.completedAt,
    completedAt: value.completedAt,
    durationSeconds: Math.max(0, finiteInteger(value.durationSeconds, 0)),
    questionCount: Math.max(0, finiteInteger(value.questionCount, 0)),
    answeredCount: Math.max(0, finiteInteger(value.answeredCount, 0)),
    correct: Math.max(0, finiteInteger(value.correct, 0)),
    incorrect: Math.max(0, finiteInteger(value.incorrect, 0)),
    unanswered: Math.max(0, finiteInteger(value.unanswered, 0)),
    manual: Math.max(0, finiteInteger(value.manual, 0)),
    autoGraded: Math.max(0, finiteInteger(value.autoGraded, 0)),
    percent: Math.max(0, Math.min(100, finiteInteger(value.percent, 0))),
    domains,
    topics,
  };
}

function normalizeMistakeRecord(
  id: string,
  value: unknown,
): MistakeRecord | null {
  if (!isRecord(value)) return null;
  const status: MasteryStatus =
    value.status === 'mastered'
      ? 'mastered'
      : value.status === 'improving'
        ? 'improving'
        : 'needs-review';
  const now = new Date().toISOString();
  return {
    questionId: typeof value.questionId === 'string' ? value.questionId : id,
    incorrectCount: Math.max(1, finiteInteger(value.incorrectCount, 1)),
    correctStreak: Math.max(0, finiteInteger(value.correctStreak, 0)),
    status,
    firstSeenAt:
      typeof value.firstSeenAt === 'string' ? value.firstSeenAt : now,
    lastSeenAt: typeof value.lastSeenAt === 'string' ? value.lastSeenAt : now,
    lastIncorrectAt:
      typeof value.lastIncorrectAt === 'string' ? value.lastIncorrectAt : now,
    lastCorrectAt:
      typeof value.lastCorrectAt === 'string' ? value.lastCorrectAt : null,
  };
}

function isDomainResult(value: unknown): value is DomainResult {
  return (
    isRecord(value) &&
    typeof value.domain === 'string' &&
    Number.isFinite(value.correct) &&
    Number.isFinite(value.total)
  );
}

function isTopicResult(value: unknown): value is TopicResult {
  return (
    isRecord(value) &&
    typeof value.topic === 'string' &&
    Number.isFinite(value.correct) &&
    Number.isFinite(value.total)
  );
}

function isAnswerMap(value: unknown): value is Answers {
  return (
    isRecord(value) &&
    Object.values(value).every(
      (answer) => Array.isArray(answer) && answer.every(Number.isFinite),
    )
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function finiteInteger(value: unknown, fallback: number) {
  return Number.isFinite(value) ? Math.trunc(Number(value)) : fallback;
}

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function cleanName(value: unknown) {
  return typeof value === 'string'
    ? value.trim().replace(/\s+/g, ' ').slice(0, 60)
    : '';
}
