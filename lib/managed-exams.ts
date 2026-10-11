import type { Question } from './questions.ts';
import { isAnswered, isCorrect, type Answers } from './exam-utils.ts';

export type ManagedRole = 'instructor' | 'student';
export type ManagedExamStatus = 'draft' | 'published' | 'archived';
export type ManagedAttemptStatus = 'in_progress' | 'submitted' | 'expired';

export type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: ManagedRole;
};

export type ManagedExam = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  questionIds: string[];
  durationMinutes: number;
  opensAt: string;
  closesAt: string;
  accessCode: string;
  passScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  shuffleChoices: boolean;
  secureMode: boolean;
  showScoreAfterSubmit: boolean;
  status: ManagedExamStatus;
  createdAt: string;
};

export type ManagedAttemptEvent = {
  id: string;
  type:
    | 'copy_blocked'
    | 'context_menu_blocked'
    | 'tab_hidden'
    | 'window_blur'
    | 'fullscreen_exit'
    | 'question_locked';
  at: string;
  detail?: string;
};

export type ManagedAttempt = {
  id: string;
  examId: string;
  studentId: string;
  startedAt: string;
  updatedAt: string;
  expiresAt: string;
  submittedAt?: string;
  status: ManagedAttemptStatus;
  questionOrder: string[];
  choiceOrders: Record<string, number[]>;
  answers: Answers;
  flags: string[];
  current: number;
  events: ManagedAttemptEvent[];
  correct?: number;
  incorrect?: number;
  unanswered?: number;
  manualPending?: number;
  autoGraded?: number;
  percent?: number;
};

export type ManagedExamState = {
  version: 1;
  users: ManagedUser[];
  exams: ManagedExam[];
  attempts: ManagedAttempt[];
};

export type ManagedExamInput = Omit<
  ManagedExam,
  'id' | 'ownerId' | 'createdAt'
>;

export type StartAttemptResult = {
  state: ManagedExamState;
  attempt?: ManagedAttempt;
  resumed?: boolean;
  error?:
    | 'not_found'
    | 'not_published'
    | 'not_open'
    | 'closed'
    | 'bad_code'
    | 'max_attempts';
};

export const MANAGED_EXAMS_STORAGE_KEY = 'pl300-managed-exams-v1';
export const MANAGED_SESSION_STORAGE_KEY = 'pl300-managed-session-v1';

export const DEMO_ACCOUNTS = [
  {
    email: 'bassam@pl300.local',
    password: 'Admin123!',
    user: {
      id: 'instructor-bassam',
      name: 'Bassam Elshoraa',
      email: 'bassam@pl300.local',
      role: 'instructor' as const,
    },
  },
  {
    email: 'student@pl300.local',
    password: 'Student123!',
    user: {
      id: 'student-demo',
      name: 'Mariam Ahmed',
      email: 'student@pl300.local',
      role: 'student' as const,
    },
  },
  {
    email: 'student2@pl300.local',
    password: 'Student123!',
    user: {
      id: 'student-demo-2',
      name: 'Omar Khaled',
      email: 'student2@pl300.local',
      role: 'student' as const,
    },
  },
] as const;

function makeId(prefix: string) {
  const value =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${value}`;
}

function addMinutes(value: Date, minutes: number) {
  return new Date(value.getTime() + minutes * 60_000);
}

function deterministicShuffle<T>(items: T[], seedText: string) {
  let seed = 2166136261;
  for (const character of seedText) {
    seed ^= character.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    const target = Math.abs(seed) % (index + 1);
    [output[index], output[target]] = [output[target], output[index]];
  }
  return output;
}

export function createSeedManagedState(
  questionIds: string[],
  now = new Date(),
): ManagedExamState {
  const opensAt = addMinutes(now, -120).toISOString();
  const closesAt = addMinutes(now, 60 * 24 * 30).toISOString();
  return {
    version: 1,
    users: DEMO_ACCOUNTS.map((account) => ({ ...account.user })),
    exams: [
      {
        id: 'exam-demo-live',
        ownerId: 'instructor-bassam',
        title: 'PL-300 Readiness Check',
        description:
          'A supervised demo exam that shows the complete student and instructor workflow.',
        questionIds: questionIds.slice(0, Math.min(25, questionIds.length)),
        durationMinutes: 50,
        opensAt,
        closesAt,
        accessCode: 'PL300',
        passScore: 70,
        maxAttempts: 2,
        shuffleQuestions: true,
        shuffleChoices: true,
        secureMode: true,
        showScoreAfterSubmit: true,
        status: 'published',
        createdAt: now.toISOString(),
      },
    ],
    attempts: [],
  };
}

export function parseManagedState(
  value: string | null,
  questionIds: string[],
  now = new Date(),
) {
  if (!value) return createSeedManagedState(questionIds, now);
  try {
    const parsed = JSON.parse(value) as ManagedExamState;
    if (
      parsed.version !== 1 ||
      !Array.isArray(parsed.users) ||
      !Array.isArray(parsed.exams) ||
      !Array.isArray(parsed.attempts)
    ) {
      return createSeedManagedState(questionIds, now);
    }
    return parsed;
  } catch {
    return createSeedManagedState(questionIds, now);
  }
}

export function authenticateManagedDemo(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  return (
    DEMO_ACCOUNTS.find(
      (account) =>
        account.email.toLowerCase() === normalized &&
        account.password === password,
    )?.user ?? null
  );
}

export function createManagedExam(
  state: ManagedExamState,
  ownerId: string,
  input: ManagedExamInput,
  now = new Date(),
) {
  const exam: ManagedExam = {
    ...input,
    id: makeId('exam'),
    ownerId,
    createdAt: now.toISOString(),
    questionIds: [...new Set(input.questionIds)],
    accessCode: input.accessCode.trim().toUpperCase(),
  };
  return {
    state: { ...state, exams: [exam, ...state.exams] },
    exam,
  };
}

function buildChoiceOrders(
  questionOrder: string[],
  questionsById: Map<string, Question>,
  shuffleChoices: boolean,
  seed: string,
) {
  return Object.fromEntries(
    questionOrder.map((questionId) => {
      const count = questionsById.get(questionId)?.choices.length ?? 0;
      const indices = Array.from({ length: count }, (_, index) => index);
      return [
        questionId,
        shuffleChoices
          ? deterministicShuffle(indices, `${seed}:${questionId}`)
          : indices,
      ];
    }),
  );
}

export function startOrResumeManagedAttempt(
  state: ManagedExamState,
  params: {
    examId: string;
    studentId: string;
    accessCode: string;
    questionsById: Map<string, Question>;
    now?: Date;
  },
): StartAttemptResult {
  const now = params.now ?? new Date();
  let workingState = state;
  const exam = workingState.exams.find((item) => item.id === params.examId);
  if (!exam) return { state, error: 'not_found' };
  if (exam.status !== 'published') return { state, error: 'not_published' };
  if (now.getTime() < new Date(exam.opensAt).getTime())
    return { state, error: 'not_open' };
  if (now.getTime() > new Date(exam.closesAt).getTime())
    return { state, error: 'closed' };
  if (exam.accessCode !== params.accessCode.trim().toUpperCase())
    return { state, error: 'bad_code' };

  const active = state.attempts.find(
    (attempt) =>
      attempt.examId === exam.id &&
      attempt.studentId === params.studentId &&
      attempt.status === 'in_progress',
  );
  if (active) {
    if (now.getTime() >= new Date(active.expiresAt).getTime()) {
      const expired = { ...active, status: 'expired' as const };
      workingState = {
        ...workingState,
        attempts: workingState.attempts.map((item) =>
          item.id === expired.id ? expired : item,
        ),
      };
    } else {
      return { state: workingState, attempt: active, resumed: true };
    }
  }

  const usedAttempts = workingState.attempts.filter(
    (attempt) =>
      attempt.examId === exam.id && attempt.studentId === params.studentId,
  ).length;
  if (usedAttempts >= exam.maxAttempts) return { state, error: 'max_attempts' };

  const id = makeId('attempt');
  const availableIds = exam.questionIds.filter((questionId) =>
    params.questionsById.has(questionId),
  );
  const questionOrder = exam.shuffleQuestions
    ? deterministicShuffle(availableIds, id)
    : availableIds;
  const deadline = Math.min(
    addMinutes(now, exam.durationMinutes).getTime(),
    new Date(exam.closesAt).getTime(),
  );
  const attempt: ManagedAttempt = {
    id,
    examId: exam.id,
    studentId: params.studentId,
    startedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt: new Date(deadline).toISOString(),
    status: 'in_progress',
    questionOrder,
    choiceOrders: buildChoiceOrders(
      questionOrder,
      params.questionsById,
      exam.shuffleChoices,
      id,
    ),
    answers: {},
    flags: [],
    current: 0,
    events: [],
  };
  return {
    state: {
      ...workingState,
      attempts: [attempt, ...workingState.attempts],
    },
    attempt,
    resumed: false,
  };
}

export function updateManagedAttempt(
  state: ManagedExamState,
  attemptId: string,
  patch: Partial<
    Pick<ManagedAttempt, 'answers' | 'flags' | 'current' | 'events'>
  >,
  now = new Date(),
) {
  return {
    ...state,
    attempts: state.attempts.map((attempt) =>
      attempt.id === attemptId
        ? { ...attempt, ...patch, updatedAt: now.toISOString() }
        : attempt,
    ),
  };
}

export function addManagedAttemptEvent(
  state: ManagedExamState,
  attemptId: string,
  type: ManagedAttemptEvent['type'],
  detail?: string,
  now = new Date(),
) {
  const attempt = state.attempts.find((item) => item.id === attemptId);
  if (!attempt || attempt.status !== 'in_progress') return state;
  const event: ManagedAttemptEvent = {
    id: makeId('event'),
    type,
    detail,
    at: now.toISOString(),
  };
  return updateManagedAttempt(
    state,
    attemptId,
    { events: [...attempt.events, event] },
    now,
  );
}

export function submitManagedAttempt(
  state: ManagedExamState,
  attemptId: string,
  questionsById: Map<string, Question>,
  now = new Date(),
) {
  const attempt = state.attempts.find((item) => item.id === attemptId);
  if (!attempt) return state;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let manualPending = 0;
  for (const questionId of attempt.questionOrder) {
    const question = questionsById.get(questionId);
    if (!question) continue;
    if (question.type === 'manual') {
      manualPending += 1;
    } else if (!isAnswered(question, attempt.answers[questionId])) {
      unanswered += 1;
    } else if (isCorrect(question, attempt.answers[questionId])) {
      correct += 1;
    } else {
      incorrect += 1;
    }
  }
  const autoGraded = correct + incorrect + unanswered;
  const percent = autoGraded > 0 ? Math.round((correct / autoGraded) * 100) : 0;
  return {
    ...state,
    attempts: state.attempts.map((item) =>
      item.id === attemptId
        ? {
            ...item,
            status: 'submitted' as const,
            submittedAt: now.toISOString(),
            updatedAt: now.toISOString(),
            correct,
            incorrect,
            unanswered,
            manualPending,
            autoGraded,
            percent,
          }
        : item,
    ),
  };
}

export function getManagedDashboard(state: ManagedExamState) {
  const submissions = state.attempts.filter(
    (attempt) => attempt.status === 'submitted',
  );
  const scores = submissions
    .map((attempt) => attempt.percent)
    .filter((score): score is number => typeof score === 'number');
  return {
    examCount: state.exams.length,
    studentCount: state.users.filter((user) => user.role === 'student').length,
    submissionCount: submissions.length,
    averageScore:
      scores.length > 0
        ? Math.round(
            scores.reduce((total, score) => total + score, 0) / scores.length,
          )
        : 0,
  };
}

function csvValue(value: unknown) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

export function managedResultsCsv(state: ManagedExamState) {
  const header = [
    'Exam',
    'Student',
    'Email',
    'Status',
    'Score',
    'Correct',
    'Incorrect',
    'Unanswered',
    'Manual pending',
    'Violations',
    'Started at',
    'Submitted at',
  ];
  const rows = state.attempts.map((attempt) => {
    const exam = state.exams.find((item) => item.id === attempt.examId);
    const student = state.users.find((item) => item.id === attempt.studentId);
    return [
      exam?.title,
      student?.name,
      student?.email,
      attempt.status,
      attempt.percent ?? '',
      attempt.correct ?? '',
      attempt.incorrect ?? '',
      attempt.unanswered ?? '',
      attempt.manualPending ?? '',
      attempt.events.length,
      attempt.startedAt,
      attempt.submittedAt ?? '',
    ];
  });
  return [header, ...rows]
    .map((row) => row.map(csvValue).join(','))
    .join('\r\n');
}
