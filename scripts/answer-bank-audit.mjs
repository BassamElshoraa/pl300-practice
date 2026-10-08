import assert from 'node:assert/strict';
import {
  auditedQuestionBank,
  excludedQuestions,
  questions,
} from '../lib/questions.ts';
import { answerAuditSummary, getAnswerAudit } from '../lib/answer-audit.ts';

assert.equal(
  auditedQuestionBank.length,
  509,
  'The expected 509-question source inventory changed.',
);
assert.equal(questions.length, 494, 'The verified active bank should contain 494 questions.');
assert.equal(
  excludedQuestions.length,
  15,
  'Exactly fifteen incomplete source items should remain quarantined.',
);
assert.equal(
  new Set(questions.map((question) => question.id)).size,
  questions.length,
  'Question IDs must be unique.',
);

const failures = [];
for (const question of questions) {
  const fail = (message) => failures.push(`${question.id}: ${message}`);
  if (!question.prompt.trim()) fail('empty prompt');
  if (!question.source.trim()) fail('empty source');
  if (!Number.isInteger(question.sourceNumber)) fail('invalid source number');

  if (question.type === 'manual') {
    if (question.correct.length) fail('manual item contains an automatic key');
  } else {
    if (!question.choices.length) fail('auto-graded item has no choices');
    if (!question.correct.length) fail('auto-graded item has no answer');
    if (new Set(question.correct).size !== question.correct.length)
      fail('duplicate answer index');
    if (
      question.correct.some(
        (index) => index < 0 || index >= question.choices.length,
      )
    )
      fail('answer index outside choice range');
  }

  if (question.type === 'single' && question.correct.length !== 1)
    fail('single-choice item must have exactly one answer');
  if (question.type === 'multi' && question.correct.length < 2)
    fail('multi-select item must have at least two answers');

  if (new Set(question.choices.map(normalize)).size !== question.choices.length)
    fail('duplicate choice text');

  const statedLetters = [
    ...question.explanation.matchAll(
      /(?:correct (?:answer|choice)(?: is|:)?|final answer:)\s*([A-E])\b/gi,
    ),
  ].map((match) => match[1].toUpperCase().charCodeAt(0) - 65);
  const uniqueStatedLetters = [...new Set(statedLetters)];
  if (
    question.type === 'single' &&
    uniqueStatedLetters.length === 1 &&
    uniqueStatedLetters[0] !== question.correct[0]
  )
    fail('the explanation names a different answer letter');
}

for (const question of excludedQuestions) {
  const audit = getAnswerAudit(question);
  if (audit.status !== 'incomplete-source')
    failures.push(`${question.id}: excluded without incomplete-source status`);
  if (!audit.reason || !audit.reasonAr)
    failures.push(`${question.id}: excluded without bilingual audit reason`);
}

const exactDuplicateGroups = groupBy(questions, (question) =>
  normalize(question.prompt),
).filter((group) => group.length > 1);
const duplicateChoiceConflicts = exactDuplicateGroups.filter((group) => {
  const comparable = group.map((question) => ({
    choices: question.choices.map(normalize).sort(),
    answers: question.correct
      .map((index) => normalize(question.choices[index] ?? String(index)))
      .sort(),
  }));
  return comparable.some(
    (item, index) =>
      index > 0 &&
      JSON.stringify(item.choices) === JSON.stringify(comparable[0].choices) &&
      JSON.stringify(item.answers) !== JSON.stringify(comparable[0].answers),
  );
});
if (duplicateChoiceConflicts.length)
  failures.push(
    `Conflicting exact duplicates: ${duplicateChoiceConflicts
      .map((group) => group.map((question) => question.id).join(', '))
      .join(' | ')}`,
  );

assert.deepEqual(failures, [], failures.join('\n'));

const statusCounts = questions.reduce((counts, question) => {
  const status = getAnswerAudit(question).status;
  counts[status] = (counts[status] ?? 0) + 1;
  return counts;
}, {});

assert.equal(
  statusCounts['source-key'] ?? 0,
  0,
  'Every active question must have an independent review status.',
);

console.log(
  JSON.stringify(
    {
      questions: questions.length,
      sourceInventory: auditedQuestionBank.length,
      quarantinedIncomplete: excludedQuestions.length,
      autoGraded: questions.filter((question) => question.type !== 'manual')
        .length,
      manualVisual: questions.filter((question) => question.type === 'manual')
        .length,
      exactDuplicatePromptGroups: exactDuplicateGroups.length,
      conflictingExactDuplicates: duplicateChoiceConflicts.length,
      structuralFailures: failures.length,
      semanticReview: {
        ...answerAuditSummary,
        statusCounts,
      },
    },
    null,
    2,
  ),
);

function normalize(value) {
  return String(value)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function groupBy(items, key) {
  const groups = new Map();
  for (const item of items) {
    const value = key(item);
    groups.set(value, [...(groups.get(value) ?? []), item]);
  }
  return [...groups.values()];
}
