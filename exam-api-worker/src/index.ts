interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string;
  ADMIN_BOOTSTRAP_CODE: string;
}

type Role = 'admin' | 'student';

type UserRow = {
  id: string;
  full_name: string;
  email: string;
  password_salt: string;
  password_hash: string;
  role: Role;
  disabled: number;
  created_at: string;
};

type ExamRow = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  question_count: number;
  duration_minutes: number;
  opens_at: string;
  closes_at: string;
  access_code_hash: string;
  pass_score: number;
  max_attempts: number;
  shuffle_questions: number;
  shuffle_choices: number;
  secure_mode: number;
  show_score_after_submit: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
};

type AttemptRow = {
  id: string;
  exam_id: string;
  student_id: string;
  attempt_number: number;
  status: 'in_progress' | 'submitted' | 'expired';
  started_at: string;
  updated_at: string;
  expires_at: string;
  submitted_at: string | null;
  question_order_json: string;
  choice_orders_json: string;
  answers_json: string;
  flags_json: string;
  current_position: number;
  events_json: string;
  correct_count: number | null;
  incorrect_count: number | null;
  unanswered_count: number | null;
  manual_pending_count: number | null;
  auto_graded_count: number | null;
  percent: number | null;
};

type QuestionRow = {
  id: string;
  domain: string;
  type: string;
  prompt: string;
  choices_json: string;
  correct_json: string;
  explanation: string;
  source: string;
  source_number: number;
  image: string | null;
  answer_image: string | null;
  context: string | null;
  rows_json: string | null;
};

const encoder = new TextEncoder();
const SESSION_HOURS = 12;
const LOGIN_WINDOW_MS = 15 * 60_000;
const LOGIN_LIMIT = 10;

function allowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get('Origin') ?? '';
  const allowed = env.ALLOWED_ORIGINS.split(',').map((item) => item.trim());
  return allowed.includes(origin) ? origin : (allowed[0] ?? '');
}

function responseHeaders(request: Request, env: Env) {
  return {
    'Access-Control-Allow-Origin': allowedOrigin(request, env),
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  };
}

function json(request: Request, env: Env, data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...responseHeaders(request, env),
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function fail(
  request: Request,
  env: Env,
  status: number,
  code: string,
  message: string,
) {
  return json(request, env, { error: code, message }, status);
}

async function body<T>(request: Request) {
  if (!request.headers.get('Content-Type')?.includes('application/json'))
    throw new Error('invalid_content_type');
  return (await request.json()) as T;
}

function base64Url(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '');
}

function randomToken(size = 32) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function passwordHash(password: string, salt: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: encoder.encode(salt),
      iterations: 310_000,
    },
    key,
    256,
  );
  return [...new Uint8Array(bits)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1)
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return diff === 0;
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 180;
}

function validPassword(password: string) {
  return (
    password.length >= 10 &&
    password.length <= 128 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password)
  );
}

function publicUser(user: UserRow) {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    role: user.role === 'admin' ? 'instructor' : 'student',
  };
}

async function authenticate(request: Request, env: Env) {
  const authorization = request.headers.get('Authorization') ?? '';
  if (!authorization.startsWith('Bearer ')) return null;
  const token = authorization.slice(7).trim();
  if (!token) return null;
  const tokenHash = await sha256(token);
  const row = await env.DB.prepare(
    `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ?1 AND s.expires_at > ?2 AND u.disabled = 0`,
  )
    .bind(tokenHash, new Date().toISOString())
    .first<UserRow>();
  return row ?? null;
}

async function issueSession(env: Env, userId: string) {
  const token = randomToken();
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + SESSION_HOURS * 3_600_000,
  ).toISOString();
  await env.DB.prepare(
    'INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?1, ?2, ?3, ?4)',
  )
    .bind(await sha256(token), userId, expiresAt, now.toISOString())
    .run();
  return { token, expiresAt };
}

async function checkLoginRate(request: Request, env: Env, email: string) {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'local';
  const bucket = await sha256(`${ip}:${email}`);
  const now = new Date();
  const row = await env.DB.prepare(
    'SELECT attempts, window_started_at FROM auth_attempts WHERE bucket = ?1',
  )
    .bind(bucket)
    .first<{ attempts: number; window_started_at: string }>();
  if (
    !row ||
    now.getTime() - new Date(row.window_started_at).getTime() > LOGIN_WINDOW_MS
  ) {
    await env.DB.prepare(
      `INSERT INTO auth_attempts (bucket, attempts, window_started_at) VALUES (?1, 1, ?2)
       ON CONFLICT(bucket) DO UPDATE SET attempts = 1, window_started_at = excluded.window_started_at`,
    )
      .bind(bucket, now.toISOString())
      .run();
    return { allowed: true, bucket };
  }
  if (row.attempts >= LOGIN_LIMIT) return { allowed: false, bucket };
  await env.DB.prepare(
    'UPDATE auth_attempts SET attempts = attempts + 1 WHERE bucket = ?1',
  )
    .bind(bucket)
    .run();
  return { allowed: true, bucket };
}

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function examView(row: ExamRow, questionIds: string[] = []) {
  return {
    id: row.id,
    ownerId: row.owner_id,
    title: row.title,
    description: row.description,
    questionIds,
    questionCount: row.question_count,
    durationMinutes: row.duration_minutes,
    opensAt: row.opens_at,
    closesAt: row.closes_at,
    passScore: row.pass_score,
    maxAttempts: row.max_attempts,
    shuffleQuestions: Boolean(row.shuffle_questions),
    shuffleChoices: Boolean(row.shuffle_choices),
    secureMode: Boolean(row.secure_mode),
    showScoreAfterSubmit: Boolean(row.show_score_after_submit),
    status: row.status,
    createdAt: row.created_at,
  };
}

function attemptView(row: AttemptRow, includeScore = true) {
  return {
    id: row.id,
    examId: row.exam_id,
    studentId: row.student_id,
    startedAt: row.started_at,
    updatedAt: row.updated_at,
    expiresAt: row.expires_at,
    submittedAt: row.submitted_at ?? undefined,
    status: row.status,
    questionOrder: parseJson<string[]>(row.question_order_json, []),
    choiceOrders: parseJson<Record<string, number[]>>(
      row.choice_orders_json,
      {},
    ),
    answers: parseJson<Record<string, number[]>>(row.answers_json, {}),
    flags: parseJson<string[]>(row.flags_json, []),
    current: row.current_position,
    events: parseJson<unknown[]>(row.events_json, []),
    ...(includeScore
      ? {
          correct: row.correct_count ?? undefined,
          incorrect: row.incorrect_count ?? undefined,
          unanswered: row.unanswered_count ?? undefined,
          manualPending: row.manual_pending_count ?? undefined,
          autoGraded: row.auto_graded_count ?? undefined,
          percent: row.percent ?? undefined,
        }
      : {}),
  };
}

function questionView(row: QuestionRow) {
  return {
    id: row.id,
    domain: row.domain,
    type: row.type,
    prompt: row.prompt,
    choices: parseJson<string[]>(row.choices_json, []),
    source: row.source,
    sourceNumber: row.source_number,
    image: row.image ?? undefined,
    context: row.context ?? undefined,
    rows: parseJson<string[] | undefined>(row.rows_json, undefined),
  };
}

function seededShuffle<T>(items: T[], seedText: string) {
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

async function register(
  request: Request,
  env: Env,
  role: Role,
  requireCode = false,
) {
  const input = await body<{
    name?: string;
    email?: string;
    password?: string;
    bootstrapCode?: string;
  }>(request);
  const name = input.name?.trim().replace(/\s+/g, ' ') ?? '';
  const email = input.email?.trim().toLowerCase() ?? '';
  const password = input.password ?? '';
  if (name.length < 2 || name.length > 80)
    return fail(request, env, 400, 'invalid_name', 'Enter a valid full name.');
  if (!validEmail(email))
    return fail(
      request,
      env,
      400,
      'invalid_email',
      'Enter a valid email address.',
    );
  if (!validPassword(password))
    return fail(
      request,
      env,
      400,
      'weak_password',
      'Password must be 10–128 characters and include upper-case, lower-case, and a number.',
    );
  if (requireCode) {
    const existingAdmin = await env.DB.prepare(
      "SELECT COUNT(*) AS count FROM users WHERE role = 'admin'",
    ).first<{ count: number }>();
    if ((existingAdmin?.count ?? 0) > 0)
      return fail(
        request,
        env,
        409,
        'admin_exists',
        'The administrator account is already configured.',
      );
    if (
      !env.ADMIN_BOOTSTRAP_CODE ||
      !safeEqual(input.bootstrapCode ?? '', env.ADMIN_BOOTSTRAP_CODE)
    )
      return fail(
        request,
        env,
        403,
        'invalid_bootstrap_code',
        'The administrator setup code is incorrect.',
      );
  }
  const salt = randomToken(24);
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  try {
    await env.DB.prepare(
      'INSERT INTO users (id, full_name, email, password_salt, password_hash, role, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)',
    )
      .bind(
        id,
        name,
        email,
        salt,
        await passwordHash(password, salt),
        role,
        now,
      )
      .run();
  } catch (error) {
    if (String(error).toLowerCase().includes('unique'))
      return fail(
        request,
        env,
        409,
        'email_exists',
        'An account already exists for this email.',
      );
    throw error;
  }
  const session = await issueSession(env, id);
  return json(
    request,
    env,
    {
      user: {
        id,
        name,
        email,
        role: role === 'admin' ? 'instructor' : 'student',
      },
      ...session,
    },
    201,
  );
}

async function login(request: Request, env: Env) {
  const input = await body<{ email?: string; password?: string }>(request);
  const email = input.email?.trim().toLowerCase() ?? '';
  const rate = await checkLoginRate(request, env, email);
  if (!rate.allowed)
    return fail(
      request,
      env,
      429,
      'too_many_attempts',
      'Too many sign-in attempts. Try again later.',
    );
  const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?1')
    .bind(email)
    .first<UserRow>();
  if (
    !user ||
    user.disabled ||
    !safeEqual(
      await passwordHash(input.password ?? '', user.password_salt),
      user.password_hash,
    )
  )
    return fail(
      request,
      env,
      401,
      'invalid_credentials',
      'The email or password is incorrect.',
    );
  await env.DB.prepare('DELETE FROM auth_attempts WHERE bucket = ?1')
    .bind(rate.bucket)
    .run();
  const session = await issueSession(env, user.id);
  return json(request, env, { user: publicUser(user), ...session });
}

async function getState(request: Request, env: Env, user: UserRow) {
  const examQuery =
    user.role === 'admin'
      ? env.DB.prepare('SELECT * FROM exams ORDER BY created_at DESC')
      : env.DB.prepare(
          "SELECT * FROM exams WHERE status = 'published' ORDER BY opens_at DESC",
        );
  const attemptQuery =
    user.role === 'admin'
      ? env.DB.prepare('SELECT * FROM attempts ORDER BY started_at DESC')
      : env.DB.prepare(
          'SELECT * FROM attempts WHERE student_id = ?1 ORDER BY started_at DESC',
        ).bind(user.id);
  const [examResult, attemptResult, userResult] = await Promise.all([
    examQuery.all<ExamRow>(),
    attemptQuery.all<AttemptRow>(),
    user.role === 'admin'
      ? env.DB.prepare(
          'SELECT * FROM users ORDER BY created_at DESC',
        ).all<UserRow>()
      : Promise.resolve({ results: [user] }),
  ]);
  const exams = await Promise.all(
    (examResult.results ?? []).map(async (exam) => {
      const ids = await env.DB.prepare(
        'SELECT question_id FROM exam_questions WHERE exam_id = ?1 ORDER BY position',
      )
        .bind(exam.id)
        .all<{ question_id: string }>();
      return examView(
        exam,
        (ids.results ?? []).map((item) => item.question_id),
      );
    }),
  );
  const examRowsById = new Map(
    (examResult.results ?? []).map((exam) => [exam.id, exam]),
  );
  return json(request, env, {
    version: 1,
    users: (userResult.results ?? []).map(publicUser),
    exams,
    attempts: (attemptResult.results ?? []).map((attempt) =>
      attemptView(
        attempt,
        user.role === 'admin' ||
          Boolean(examRowsById.get(attempt.exam_id)?.show_score_after_submit),
      ),
    ),
  });
}

async function createExam(request: Request, env: Env, user: UserRow) {
  if (user.role !== 'admin')
    return fail(
      request,
      env,
      403,
      'forbidden',
      'Administrator access is required.',
    );
  const input = await body<Record<string, unknown>>(request);
  const title = String(input.title ?? '').trim();
  const description = String(input.description ?? '').trim();
  const domain = String(input.domain ?? 'all');
  const questionCount = Math.min(
    100,
    Math.max(1, Number(input.questionCount ?? 50)),
  );
  const durationMinutes = Math.min(
    480,
    Math.max(5, Number(input.durationMinutes ?? 100)),
  );
  const passScore = Math.min(100, Math.max(0, Number(input.passScore ?? 70)));
  const maxAttempts = Math.min(20, Math.max(1, Number(input.maxAttempts ?? 1)));
  const opensAt = new Date(String(input.opensAt ?? ''));
  const closesAt = new Date(String(input.closesAt ?? ''));
  const accessCode = String(input.accessCode ?? '')
    .trim()
    .toUpperCase();
  if (title.length < 3 || title.length > 120)
    return fail(
      request,
      env,
      400,
      'invalid_title',
      'Enter a valid exam title.',
    );
  if (
    !Number.isFinite(opensAt.getTime()) ||
    !Number.isFinite(closesAt.getTime()) ||
    closesAt <= opensAt
  )
    return fail(
      request,
      env,
      400,
      'invalid_window',
      'The exam closing time must be after its opening time.',
    );
  if (accessCode.length < 4 || accessCode.length > 40)
    return fail(
      request,
      env,
      400,
      'invalid_access_code',
      'Access code must contain 4–40 characters.',
    );
  const selected = await env.DB.prepare(
    `SELECT id FROM question_bank WHERE (?1 = 'all' OR domain = ?1) ORDER BY RANDOM() LIMIT ?2`,
  )
    .bind(domain, questionCount)
    .all<{ id: string }>();
  if ((selected.results?.length ?? 0) < questionCount)
    return fail(
      request,
      env,
      400,
      'insufficient_questions',
      'The selected scope does not contain enough questions.',
    );
  const now = new Date().toISOString();
  const examId = crypto.randomUUID();
  const statements: D1PreparedStatement[] = [
    env.DB.prepare(
      `INSERT INTO exams (id, owner_id, title, description, question_count, duration_minutes, opens_at, closes_at,
       access_code_hash, pass_score, max_attempts, shuffle_questions, shuffle_choices, secure_mode,
       show_score_after_submit, status, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, 'published', ?16, ?16)`,
    ).bind(
      examId,
      user.id,
      title,
      description,
      questionCount,
      durationMinutes,
      opensAt.toISOString(),
      closesAt.toISOString(),
      await sha256(accessCode),
      passScore,
      maxAttempts,
      input.shuffleQuestions === false ? 0 : 1,
      input.shuffleChoices === false ? 0 : 1,
      input.secureMode === false ? 0 : 1,
      input.showScoreAfterSubmit === false ? 0 : 1,
      now,
    ),
    ...(selected.results ?? []).map((question, index) =>
      env.DB.prepare(
        'INSERT INTO exam_questions (exam_id, position, question_id) VALUES (?1, ?2, ?3)',
      ).bind(examId, index, question.id),
    ),
  ];
  await env.DB.batch(statements);
  const row = await env.DB.prepare('SELECT * FROM exams WHERE id = ?1')
    .bind(examId)
    .first<ExamRow>();
  return json(
    request,
    env,
    {
      exam: examView(
        row!,
        (selected.results ?? []).map((item) => item.id),
      ),
    },
    201,
  );
}

async function getAttemptBundle(
  env: Env,
  attempt: AttemptRow,
  includeScore = true,
) {
  const ids = parseJson<string[]>(attempt.question_order_json, []);
  if (!ids.length)
    return { attempt: attemptView(attempt, includeScore), questions: [] };
  const placeholders = ids.map(() => '?').join(',');
  const result = await env.DB.prepare(
    `SELECT * FROM question_bank WHERE id IN (${placeholders})`,
  )
    .bind(...ids)
    .all<QuestionRow>();
  const map = new Map((result.results ?? []).map((item) => [item.id, item]));
  return {
    attempt: attemptView(attempt, includeScore),
    questions: ids
      .map((id) => map.get(id))
      .filter(Boolean)
      .map((item) => questionView(item!)),
  };
}

async function startAttempt(request: Request, env: Env, user: UserRow) {
  if (user.role !== 'student')
    return fail(request, env, 403, 'forbidden', 'Student access is required.');
  const input = await body<{ examId?: string; accessCode?: string }>(request);
  const exam = await env.DB.prepare('SELECT * FROM exams WHERE id = ?1')
    .bind(input.examId ?? '')
    .first<ExamRow>();
  if (!exam || exam.status !== 'published')
    return fail(request, env, 404, 'not_found', 'Exam not found.');
  const now = new Date();
  if (now < new Date(exam.opens_at))
    return fail(request, env, 409, 'not_open', 'This exam has not opened yet.');
  if (now > new Date(exam.closes_at))
    return fail(request, env, 409, 'closed', 'This exam is closed.');
  if (
    !safeEqual(
      await sha256((input.accessCode ?? '').trim().toUpperCase()),
      exam.access_code_hash,
    )
  )
    return fail(request, env, 401, 'bad_code', 'The access code is incorrect.');
  const active = await env.DB.prepare(
    "SELECT * FROM attempts WHERE exam_id = ?1 AND student_id = ?2 AND status = 'in_progress' ORDER BY started_at DESC LIMIT 1",
  )
    .bind(exam.id, user.id)
    .first<AttemptRow>();
  if (active && now < new Date(active.expires_at))
    return json(request, env, await getAttemptBundle(env, active));
  if (active)
    await env.DB.prepare(
      "UPDATE attempts SET status = 'expired', updated_at = ?2 WHERE id = ?1",
    )
      .bind(active.id, now.toISOString())
      .run();
  const count = await env.DB.prepare(
    'SELECT COUNT(*) AS count FROM attempts WHERE exam_id = ?1 AND student_id = ?2',
  )
    .bind(exam.id, user.id)
    .first<{ count: number }>();
  const attemptNumber = (count?.count ?? 0) + 1;
  if (attemptNumber > exam.max_attempts)
    return fail(
      request,
      env,
      409,
      'max_attempts',
      'All allowed attempts have been used.',
    );
  const questionRows = await env.DB.prepare(
    `SELECT q.* FROM exam_questions eq JOIN question_bank q ON q.id = eq.question_id
     WHERE eq.exam_id = ?1 ORDER BY eq.position`,
  )
    .bind(exam.id)
    .all<QuestionRow>();
  const attemptId = crypto.randomUUID();
  const source = questionRows.results ?? [];
  const order = exam.shuffle_questions
    ? seededShuffle(
        source.map((item) => item.id),
        attemptId,
      )
    : source.map((item) => item.id);
  const byId = new Map(source.map((item) => [item.id, item]));
  const choiceOrders = Object.fromEntries(
    order.map((id) => {
      const indices = parseJson<string[]>(
        byId.get(id)?.choices_json ?? '[]',
        [],
      ).map((_, index) => index);
      return [
        id,
        exam.shuffle_choices
          ? seededShuffle(indices, `${attemptId}:${id}`)
          : indices,
      ];
    }),
  );
  const expiresAt = new Date(
    Math.min(
      now.getTime() + exam.duration_minutes * 60_000,
      new Date(exam.closes_at).getTime(),
    ),
  );
  await env.DB.prepare(
    `INSERT INTO attempts (id, exam_id, student_id, attempt_number, started_at, updated_at, expires_at,
     question_order_json, choice_orders_json) VALUES (?1, ?2, ?3, ?4, ?5, ?5, ?6, ?7, ?8)`,
  )
    .bind(
      attemptId,
      exam.id,
      user.id,
      attemptNumber,
      now.toISOString(),
      expiresAt.toISOString(),
      JSON.stringify(order),
      JSON.stringify(choiceOrders),
    )
    .run();
  const attempt = await env.DB.prepare('SELECT * FROM attempts WHERE id = ?1')
    .bind(attemptId)
    .first<AttemptRow>();
  return json(
    request,
    env,
    await getAttemptBundle(
      env,
      attempt!,
      Boolean(exam.show_score_after_submit),
    ),
    201,
  );
}

async function loadAuthorizedAttempt(
  env: Env,
  attemptId: string,
  user: UserRow,
) {
  const attempt = await env.DB.prepare('SELECT * FROM attempts WHERE id = ?1')
    .bind(attemptId)
    .first<AttemptRow>();
  if (!attempt) return null;
  if (user.role === 'student' && attempt.student_id !== user.id) return null;
  if (user.role === 'admin') {
    const owned = await env.DB.prepare(
      'SELECT id FROM exams WHERE id = ?1 AND owner_id = ?2',
    )
      .bind(attempt.exam_id, user.id)
      .first();
    if (!owned) return null;
  }
  return attempt;
}

async function saveAttempt(
  request: Request,
  env: Env,
  user: UserRow,
  attemptId: string,
) {
  const attempt = await loadAuthorizedAttempt(env, attemptId, user);
  if (!attempt || user.role !== 'student')
    return fail(request, env, 404, 'not_found', 'Attempt not found.');
  if (attempt.status !== 'in_progress')
    return fail(
      request,
      env,
      409,
      'not_active',
      'This attempt is no longer active.',
    );
  if (new Date() >= new Date(attempt.expires_at)) {
    await env.DB.prepare(
      "UPDATE attempts SET status = 'expired', updated_at = ?2 WHERE id = ?1",
    )
      .bind(attempt.id, new Date().toISOString())
      .run();
    return fail(request, env, 409, 'expired', 'The attempt time has expired.');
  }
  const input = await body<{
    answers?: Record<string, unknown>;
    flags?: unknown[];
    current?: number;
    events?: unknown[];
  }>(request);
  const order = new Set(parseJson<string[]>(attempt.question_order_json, []));
  const answers: Record<string, number[]> = {};
  for (const [questionId, raw] of Object.entries(input.answers ?? {})) {
    if (order.has(questionId) && Array.isArray(raw))
      answers[questionId] = raw
        .slice(0, 30)
        .map(Number)
        .filter(Number.isInteger);
  }
  const flags = (input.flags ?? []).map(String).filter((id) => order.has(id));
  const events = (input.events ?? []).slice(-500);
  const current = Math.max(
    0,
    Math.min(order.size - 1, Number(input.current ?? 0)),
  );
  const now = new Date().toISOString();
  await env.DB.prepare(
    `UPDATE attempts SET answers_json = ?2, flags_json = ?3, current_position = ?4,
     events_json = ?5, updated_at = ?6 WHERE id = ?1`,
  )
    .bind(
      attempt.id,
      JSON.stringify(answers),
      JSON.stringify(flags),
      current,
      JSON.stringify(events),
      now,
    )
    .run();
  const saved = await env.DB.prepare('SELECT * FROM attempts WHERE id = ?1')
    .bind(attempt.id)
    .first<AttemptRow>();
  return json(request, env, { attempt: attemptView(saved!) });
}

function arraysEqual(left: number[], right: number[], unordered = false) {
  const a = unordered ? [...left].sort((x, y) => x - y) : left;
  const b = unordered ? [...right].sort((x, y) => x - y) : right;
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

async function submitAttempt(
  request: Request,
  env: Env,
  user: UserRow,
  attemptId: string,
) {
  const attempt = await loadAuthorizedAttempt(env, attemptId, user);
  if (!attempt || user.role !== 'student')
    return fail(request, env, 404, 'not_found', 'Attempt not found.');
  const exam = await env.DB.prepare('SELECT * FROM exams WHERE id = ?1')
    .bind(attempt.exam_id)
    .first<ExamRow>();
  const includeScore = Boolean(exam?.show_score_after_submit);
  if (attempt.status !== 'in_progress')
    return json(request, env, { attempt: attemptView(attempt, includeScore) });
  const ids = parseJson<string[]>(attempt.question_order_json, []);
  const answers = parseJson<Record<string, number[]>>(attempt.answers_json, {});
  const placeholders = ids.map(() => '?').join(',');
  const result = await env.DB.prepare(
    `SELECT * FROM question_bank WHERE id IN (${placeholders})`,
  )
    .bind(...ids)
    .all<QuestionRow>();
  const byId = new Map((result.results ?? []).map((item) => [item.id, item]));
  let correct = 0,
    incorrect = 0,
    unanswered = 0,
    manualPending = 0;
  for (const id of ids) {
    const question = byId.get(id);
    if (!question) continue;
    const answer = answers[id];
    if (question.type === 'manual') {
      manualPending += 1;
      continue;
    }
    if (!answer?.length || answer.some((value) => value < 0)) {
      unanswered += 1;
      continue;
    }
    const expected = parseJson<number[]>(question.correct_json, []);
    if (arraysEqual(answer, expected, question.type === 'multi')) correct += 1;
    else incorrect += 1;
  }
  const autoGraded = correct + incorrect + unanswered;
  const percent = autoGraded ? Math.round((correct / autoGraded) * 100) : 0;
  const now = new Date().toISOString();
  await env.DB.prepare(
    `UPDATE attempts SET status = 'submitted', submitted_at = ?2, updated_at = ?2,
     correct_count = ?3, incorrect_count = ?4, unanswered_count = ?5,
     manual_pending_count = ?6, auto_graded_count = ?7, percent = ?8 WHERE id = ?1`,
  )
    .bind(
      attempt.id,
      now,
      correct,
      incorrect,
      unanswered,
      manualPending,
      autoGraded,
      percent,
    )
    .run();
  const submitted = await env.DB.prepare('SELECT * FROM attempts WHERE id = ?1')
    .bind(attempt.id)
    .first<AttemptRow>();
  return json(request, env, {
    attempt: attemptView(submitted!, includeScore),
  });
}

async function route(request: Request, env: Env) {
  if (request.method === 'OPTIONS')
    return new Response(null, {
      status: 204,
      headers: responseHeaders(request, env),
    });
  const url = new URL(request.url);
  if (url.pathname === '/api/health') {
    const count = await env.DB.prepare(
      'SELECT COUNT(*) AS count FROM question_bank',
    ).first<{ count: number }>();
    return json(request, env, {
      status: 'ok',
      questionCount: count?.count ?? 0,
      now: new Date().toISOString(),
    });
  }
  if (url.pathname === '/api/auth/register' && request.method === 'POST')
    return register(request, env, 'student');
  if (url.pathname === '/api/auth/bootstrap-admin' && request.method === 'POST')
    return register(request, env, 'admin', true);
  if (url.pathname === '/api/auth/login' && request.method === 'POST')
    return login(request, env);

  const user = await authenticate(request, env);
  if (!user)
    return fail(request, env, 401, 'unauthorized', 'Sign in is required.');
  if (url.pathname === '/api/auth/me' && request.method === 'GET')
    return json(request, env, { user: publicUser(user) });
  if (url.pathname === '/api/auth/logout' && request.method === 'POST') {
    const token = request.headers.get('Authorization')?.slice(7).trim() ?? '';
    if (token)
      await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?1')
        .bind(await sha256(token))
        .run();
    return json(request, env, { ok: true });
  }
  if (url.pathname === '/api/state' && request.method === 'GET')
    return getState(request, env, user);
  if (url.pathname === '/api/exams' && request.method === 'POST')
    return createExam(request, env, user);
  if (url.pathname === '/api/attempts/start' && request.method === 'POST')
    return startAttempt(request, env, user);
  const attemptMatch = url.pathname.match(
    /^\/api\/attempts\/([^/]+)(?:\/(submit))?$/,
  );
  if (attemptMatch && request.method === 'GET') {
    const attempt = await loadAuthorizedAttempt(env, attemptMatch[1], user);
    if (!attempt)
      return fail(request, env, 404, 'not_found', 'Attempt not found.');
    const exam = await env.DB.prepare('SELECT * FROM exams WHERE id = ?1')
      .bind(attempt.exam_id)
      .first<ExamRow>();
    return json(
      request,
      env,
      await getAttemptBundle(
        env,
        attempt,
        user.role === 'admin' || Boolean(exam?.show_score_after_submit),
      ),
    );
  }
  if (attemptMatch && request.method === 'PUT' && !attemptMatch[2])
    return saveAttempt(request, env, user, attemptMatch[1]);
  if (attemptMatch && request.method === 'POST' && attemptMatch[2] === 'submit')
    return submitAttempt(request, env, user, attemptMatch[1]);
  return fail(request, env, 404, 'not_found', 'Endpoint not found.');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await route(request, env);
    } catch (error) {
      console.error('managed-exams-api', error);
      const code = error instanceof Error ? error.message : 'internal_error';
      if (code === 'invalid_content_type')
        return fail(request, env, 415, code, 'JSON content type is required.');
      return fail(
        request,
        env,
        500,
        'internal_error',
        'The server could not complete the request.',
      );
    }
  },
} satisfies ExportedHandler<Env>;
