ALTER TABLE exams ADD COLUMN violation_limit INTEGER NOT NULL DEFAULT 5;

ALTER TABLE attempts ADD COLUMN client_id TEXT;

CREATE INDEX IF NOT EXISTS attempts_client_idx ON attempts(client_id);
