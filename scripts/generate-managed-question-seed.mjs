import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { questions } from '../lib/questions.ts';
import { managedAutoGradingKeys } from '../lib/managed-auto-grading-keys.ts';
import { buildReviewedExplanation } from '../lib/reviewed-lessons.ts';

function sql(value) {
  if (value === undefined || value === null) return 'NULL';
  return `'${String(value).replaceAll("'", "''")}'`;
}

const createdAt = '2026-10-11T00:00:00.000Z';
const statements = questions.map((question) => {
  const values = [
    question.id,
    question.domain,
    question.type,
    question.prompt,
    JSON.stringify(question.choices),
    JSON.stringify(managedAutoGradingKeys[question.id] ?? question.correct),
    buildReviewedExplanation(question) ?? question.explanation,
    question.source,
    question.sourceNumber,
    question.image,
    question.answerImage,
    question.context,
    question.rows ? JSON.stringify(question.rows) : null,
    createdAt,
  ]
    .map(sql)
    .join(', ');
  return `INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES (${values});`;
});

const output = [
  '-- Generated from the reviewed active question bank. Do not edit manually.',
  ...statements,
  '',
].join('\n');

const target = resolve('exam-api-worker', 'seed-question-bank.sql');
await writeFile(target, output, 'utf8');
console.log(`Generated ${target} with ${questions.length} active questions.`);
