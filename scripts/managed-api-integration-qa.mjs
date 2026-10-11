const baseUrl = process.env.QA_API_URL ?? 'http://127.0.0.1:8788';
const bootstrapCode = process.env.QA_BOOTSTRAP_CODE ?? 'LOCAL-ADMIN-SETUP-2026';
const admin = {
  name: 'Bassam QA Admin',
  email: 'admin.qa@pl300.local',
  password: 'StrongAdmin2026',
};

async function request(path, options = {}, token = '') {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

function assert(value, message) {
  if (!value) throw new Error(message);
}

async function authenticateAdmin() {
  let result = await request('/api/auth/bootstrap-admin', {
    method: 'POST',
    body: JSON.stringify({ ...admin, bootstrapCode }),
  });
  if (!result.response.ok && result.data.error === 'admin_exists') {
    result = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: admin.email, password: admin.password }),
    });
  }
  assert(
    result.response.ok,
    `Admin authentication failed: ${JSON.stringify(result.data)}`,
  );
  assert(
    result.data.user.role === 'instructor',
    'Admin role was not mapped to instructor.',
  );
  return result.data.token;
}

const health = await request('/api/health');
assert(health.response.ok, 'Health endpoint failed.');
assert(
  health.data.questionCount === 494,
  `Expected 494 questions, got ${health.data.questionCount}.`,
);

const adminToken = await authenticateAdmin();
const duplicateAdmin = await request('/api/auth/bootstrap-admin', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Second Admin',
    email: 'second.admin@pl300.local',
    password: 'AnotherAdmin2026',
    bootstrapCode,
  }),
});
assert(
  duplicateAdmin.response.status === 409,
  'A second administrator was unexpectedly accepted.',
);

const now = Date.now();
const examResult = await request(
  '/api/exams',
  {
    method: 'POST',
    body: JSON.stringify({
      title: `PL-300 API QA ${now}`,
      description: 'Automated end-to-end API check',
      domain: 'all',
      questionCount: 5,
      durationMinutes: 20,
      opensAt: new Date(now - 60_000).toISOString(),
      closesAt: new Date(now + 3_600_000).toISOString(),
      accessCode: 'QA-CODE',
      passScore: 70,
      maxAttempts: 1,
      shuffleQuestions: true,
      shuffleChoices: true,
      secureMode: true,
      showScoreAfterSubmit: false,
    }),
  },
  adminToken,
);
assert(
  examResult.response.ok,
  `Exam creation failed: ${JSON.stringify(examResult.data)}`,
);
assert(
  examResult.data.exam.questionIds.length === 5,
  'Server did not select five questions.',
);

const student = {
  name: 'Integration Student',
  email: `student.${now}@pl300.local`,
  password: 'StrongStudent2026',
};
const register = await request('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify(student),
});
assert(
  register.response.ok,
  `Student registration failed: ${JSON.stringify(register.data)}`,
);
const studentToken = register.data.token;

const studentState = await request('/api/state', {}, studentToken);
assert(studentState.response.ok, 'Student state failed.');
assert(
  studentState.data.users.length === 1,
  'Student state exposed other users.',
);
assert(
  studentState.data.exams.some((exam) => exam.id === examResult.data.exam.id),
  'Published exam is missing.',
);

const badStart = await request(
  '/api/attempts/start',
  {
    method: 'POST',
    body: JSON.stringify({
      examId: examResult.data.exam.id,
      accessCode: 'WRONG',
    }),
  },
  studentToken,
);
assert(
  badStart.response.status === 401 && badStart.data.error === 'bad_code',
  'Wrong exam access code was accepted.',
);

const started = await request(
  '/api/attempts/start',
  {
    method: 'POST',
    body: JSON.stringify({
      examId: examResult.data.exam.id,
      accessCode: 'QA-CODE',
    }),
  },
  studentToken,
);
assert(
  started.response.ok,
  `Attempt start failed: ${JSON.stringify(started.data)}`,
);
assert(
  started.data.questions.length === 5,
  'Student did not receive five questions.',
);
for (const question of started.data.questions) {
  assert(
    !('correct' in question),
    'Student payload leaked a correct answer key.',
  );
  assert(
    !('explanation' in question),
    'Student payload leaked an explanation.',
  );
  assert(
    !('answerImage' in question),
    'Student payload leaked an answer image.',
  );
}

const attempt = started.data.attempt;
const firstQuestionId = attempt.questionOrder[0];
const saved = await request(
  `/api/attempts/${attempt.id}`,
  {
    method: 'PUT',
    body: JSON.stringify({
      answers: { [firstQuestionId]: [0] },
      flags: [firstQuestionId],
      current: 1,
      events: [
        { id: 'qa-event', type: 'window_blur', at: new Date().toISOString() },
      ],
    }),
  },
  studentToken,
);
assert(saved.response.ok, 'Autosave failed.');
assert(
  saved.data.attempt.current === 1,
  'Autosave did not persist current position.',
);
assert(
  saved.data.attempt.flags.includes(firstQuestionId),
  'Autosave did not persist flags.',
);

const resumed = await request(
  '/api/attempts/start',
  {
    method: 'POST',
    body: JSON.stringify({
      examId: examResult.data.exam.id,
      accessCode: 'QA-CODE',
    }),
  },
  studentToken,
);
assert(
  resumed.response.ok && resumed.data.attempt.id === attempt.id,
  'Attempt did not resume.',
);
assert(
  resumed.data.attempt.current === 1,
  'Resumed attempt lost its saved position.',
);

const submitted = await request(
  `/api/attempts/${attempt.id}/submit`,
  { method: 'POST' },
  studentToken,
);
assert(
  submitted.response.ok,
  `Submission failed: ${JSON.stringify(submitted.data)}`,
);
assert(
  submitted.data.attempt.status === 'submitted',
  'Attempt was not marked submitted.',
);
assert(
  !('percent' in submitted.data.attempt),
  'A hidden student score was exposed after submission.',
);

const secondAttempt = await request(
  '/api/attempts/start',
  {
    method: 'POST',
    body: JSON.stringify({
      examId: examResult.data.exam.id,
      accessCode: 'QA-CODE',
    }),
  },
  studentToken,
);
assert(
  secondAttempt.response.status === 409,
  'Maximum-attempt limit was not enforced.',
);

const adminState = await request('/api/state', {}, adminToken);
assert(adminState.response.ok, 'Admin state failed.');
assert(
  adminState.data.users.some((user) => user.email === student.email),
  'Registered student is missing from admin dashboard state.',
);
const adminAttempt = adminState.data.attempts.find(
  (item) => item.id === attempt.id && item.status === 'submitted',
);
assert(
  adminAttempt && typeof adminAttempt.percent === 'number',
  'Submitted result is missing from admin dashboard state.',
);

console.log(
  JSON.stringify(
    {
      status: 'PASS',
      questionCount: health.data.questionCount,
      examQuestions: examResult.data.exam.questionIds.length,
      studentRegistration: true,
      singleAdmin: true,
      answerKeysHidden: true,
      accessCodeEnforced: true,
      autosaveAndResume: true,
      serverScoring: true,
      maxAttemptsEnforced: true,
      adminDashboardState: true,
    },
    null,
    2,
  ),
);
