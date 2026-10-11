import type { Question } from './questions.ts';
import type {
  ManagedAttempt,
  ManagedExam,
  ManagedExamState,
  ManagedUser,
} from './managed-exams.ts';

export const MANAGED_API_URL = (
  process.env.NEXT_PUBLIC_MANAGED_EXAMS_API_URL ?? ''
).replace(/\/$/, '');

const TOKEN_KEY = 'pl300-managed-api-token';

export class ManagedApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function getManagedToken() {
  if (typeof window === 'undefined') return '';
  return window.sessionStorage.getItem(TOKEN_KEY) ?? '';
}

export function setManagedToken(token: string) {
  if (typeof window === 'undefined') return;
  if (token) window.sessionStorage.setItem(TOKEN_KEY, token);
  else window.sessionStorage.removeItem(TOKEN_KEY);
}

async function api<T>(
  path: string,
  options: RequestInit = {},
  authenticated = true,
) {
  if (!MANAGED_API_URL)
    throw new ManagedApiError(
      0,
      'not_configured',
      'The managed exam API is not configured.',
    );
  const token = getManagedToken();
  const response = await fetch(`${MANAGED_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
  const data = (await response.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  if (!response.ok) {
    throw new ManagedApiError(
      response.status,
      String(data.error ?? 'request_failed'),
      String(data.message ?? 'The request could not be completed.'),
    );
  }
  return data as T;
}

type AuthResult = {
  user: ManagedUser;
  token: string;
  expiresAt: string;
};

export async function registerManagedStudent(input: {
  name: string;
  email: string;
  password: string;
}) {
  const result = await api<AuthResult>(
    '/api/auth/register',
    { method: 'POST', body: JSON.stringify(input) },
    false,
  );
  setManagedToken(result.token);
  return result;
}

export async function bootstrapManagedAdmin(input: {
  name: string;
  email: string;
  password: string;
  bootstrapCode: string;
}) {
  const result = await api<AuthResult>(
    '/api/auth/bootstrap-admin',
    { method: 'POST', body: JSON.stringify(input) },
    false,
  );
  setManagedToken(result.token);
  return result;
}

export async function loginManaged(input: { email: string; password: string }) {
  const result = await api<AuthResult>(
    '/api/auth/login',
    { method: 'POST', body: JSON.stringify(input) },
    false,
  );
  setManagedToken(result.token);
  return result;
}

export async function managedMe() {
  return api<{ user: ManagedUser }>('/api/auth/me');
}

export async function logoutManaged() {
  try {
    await api<{ ok: boolean }>('/api/auth/logout', { method: 'POST' });
  } finally {
    setManagedToken('');
  }
}

export async function loadManagedApiState() {
  return api<ManagedExamState>('/api/state');
}

export type CreateManagedApiExamInput = {
  title: string;
  description: string;
  domain: string;
  questionCount: number;
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
};

export async function createManagedApiExam(input: CreateManagedApiExamInput) {
  return api<{ exam: ManagedExam }>('/api/exams', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export type ManagedAttemptBundle = {
  attempt: ManagedAttempt;
  questions: Array<Omit<Question, 'correct' | 'explanation' | 'answerImage'>>;
};

export async function startManagedApiAttempt(input: {
  examId: string;
  accessCode: string;
}) {
  return api<ManagedAttemptBundle>('/api/attempts/start', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function loadManagedApiAttempt(attemptId: string) {
  return api<ManagedAttemptBundle>(`/api/attempts/${attemptId}`);
}

export async function saveManagedApiAttempt(attempt: ManagedAttempt) {
  return api<{ attempt: ManagedAttempt }>(`/api/attempts/${attempt.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      answers: attempt.answers,
      flags: attempt.flags,
      current: attempt.current,
      events: attempt.events,
    }),
  });
}

export async function submitManagedApiAttempt(attemptId: string) {
  return api<{ attempt: ManagedAttempt }>(`/api/attempts/${attemptId}/submit`, {
    method: 'POST',
  });
}
