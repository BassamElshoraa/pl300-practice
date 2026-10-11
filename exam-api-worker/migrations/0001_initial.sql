CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student')) DEFAULT 'student',
  disabled INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_attempts (
  bucket TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL,
  window_started_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS question_bank (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL,
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  choices_json TEXT NOT NULL,
  correct_json TEXT NOT NULL,
  explanation TEXT NOT NULL,
  source TEXT NOT NULL,
  source_number INTEGER NOT NULL,
  image TEXT,
  answer_image TEXT,
  context TEXT,
  rows_json TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS question_bank_domain_idx ON question_bank(domain);

CREATE TABLE IF NOT EXISTS exams (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  question_count INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes BETWEEN 5 AND 480),
  opens_at TEXT NOT NULL,
  closes_at TEXT NOT NULL,
  access_code_hash TEXT NOT NULL,
  pass_score INTEGER NOT NULL DEFAULT 70 CHECK (pass_score BETWEEN 0 AND 100),
  max_attempts INTEGER NOT NULL DEFAULT 1 CHECK (max_attempts BETWEEN 1 AND 20),
  shuffle_questions INTEGER NOT NULL DEFAULT 1,
  shuffle_choices INTEGER NOT NULL DEFAULT 1,
  secure_mode INTEGER NOT NULL DEFAULT 1,
  show_score_after_submit INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exam_questions (
  exam_id TEXT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  question_id TEXT NOT NULL REFERENCES question_bank(id),
  PRIMARY KEY (exam_id, position),
  UNIQUE (exam_id, question_id)
);

CREATE TABLE IF NOT EXISTS attempts (
  id TEXT PRIMARY KEY,
  exam_id TEXT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'submitted', 'expired')) DEFAULT 'in_progress',
  started_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  submitted_at TEXT,
  question_order_json TEXT NOT NULL,
  choice_orders_json TEXT NOT NULL,
  answers_json TEXT NOT NULL DEFAULT '{}',
  flags_json TEXT NOT NULL DEFAULT '[]',
  current_position INTEGER NOT NULL DEFAULT 0,
  events_json TEXT NOT NULL DEFAULT '[]',
  correct_count INTEGER,
  incorrect_count INTEGER,
  unanswered_count INTEGER,
  manual_pending_count INTEGER,
  auto_graded_count INTEGER,
  percent INTEGER,
  UNIQUE (exam_id, student_id, attempt_number)
);

CREATE INDEX IF NOT EXISTS attempts_exam_idx ON attempts(exam_id, submitted_at);
CREATE INDEX IF NOT EXISTS attempts_student_idx ON attempts(student_id, started_at);
