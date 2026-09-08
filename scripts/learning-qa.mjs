import assert from 'node:assert/strict';
import { buildOptionExplanations } from '../lib/option-explanations.ts';
import { questions } from '../lib/questions.ts';
import { updateMistakeRecords } from '../lib/learner-state.ts';
import {
  ALL_TOPICS,
  TOPICS_BY_DOMAIN,
  buildQuestionSet,
  getQuestionTopic,
} from '../lib/question-topics.ts';

const counts = Object.fromEntries(ALL_TOPICS.map((topic) => [topic, 0]));

for (const question of questions) {
  const topic = getQuestionTopic(question);
  assert.ok(ALL_TOPICS.includes(topic), `${question.id} has an unknown topic.`);
  assert.ok(
    TOPICS_BY_DOMAIN[question.domain].includes(topic),
    `${question.id} topic is outside its skill area.`,
  );
  counts[topic] += 1;

  const options = buildOptionExplanations(question);
  if (question.type === 'manual') {
    assert.equal(options.length, 0, `${question.id} is manual.`);
    continue;
  }

  assert.equal(
    options.length,
    question.choices.length,
    `${question.id} is missing option explanations.`,
  );
  for (const option of options) {
    assert.equal(
      option.isCorrect,
      question.correct.includes(option.choiceIndex),
      `${question.id} option ${option.choiceIndex} conflicts with the answer key.`,
    );
    assert.ok(
      option.text.trim(),
      `${question.id} has a blank option explanation.`,
    );
  }
}

assert.equal(
  Object.values(counts).reduce((sum, value) => sum + value, 0),
  questions.length,
);

for (const topic of ALL_TOPICS) {
  const pool = questions.filter(
    (question) => getQuestionTopic(question) === topic,
  );
  assert.ok(pool.length > 0, `${topic} has no questions.`);
  const session = buildQuestionSet(pool, Math.min(10, pool.length), 300);
  assert.equal(
    new Set(session.map((question) => question.id)).size,
    session.length,
    `${topic} generated a duplicate custom-practice question.`,
  );
}

const autoQuestions = questions.filter(
  (question) => question.type !== 'manual',
);
const deliberatelyWrongAnswers = Object.fromEntries(
  autoQuestions.map((question) => {
    if (question.type === 'matching' || question.type === 'sequence') {
      const reversed = [...question.correct].reverse();
      assert.notDeepEqual(
        reversed,
        question.correct,
        `${question.id} needs a constructible wrong ordered answer.`,
      );
      return [question.id, reversed];
    }
    const incorrectChoice = question.choices.findIndex(
      (_, index) => !question.correct.includes(index),
    );
    if (incorrectChoice >= 0) return [question.id, [incorrectChoice]];
    assert.ok(
      question.correct.length > 1,
      `${question.id} has no constructible wrong answer.`,
    );
    return [question.id, [question.correct[0]]];
  }),
);
const checkedAt = new Date().toISOString();
const needsReview = updateMistakeRecords(
  {},
  autoQuestions,
  deliberatelyWrongAnswers,
  checkedAt,
);
assert.equal(Object.keys(needsReview).length, autoQuestions.length);
assert.ok(
  Object.values(needsReview).every(
    (record) => record.status === 'needs-review',
  ),
  'Every missed auto-graded question should enter Needs review.',
);

const correctAnswers = Object.fromEntries(
  autoQuestions.map((question) => [question.id, question.correct]),
);
const improving = updateMistakeRecords(
  needsReview,
  autoQuestions,
  correctAnswers,
  checkedAt,
);
assert.ok(
  Object.values(improving).every((record) => record.status === 'improving'),
  'One correct retry should move every question to Improving.',
);
const mastered = updateMistakeRecords(
  improving,
  autoQuestions,
  correctAnswers,
  checkedAt,
);
assert.ok(
  Object.values(mastered).every((record) => record.status === 'mastered'),
  'Two correct retries should move every question to Mastered.',
);

console.log(
  JSON.stringify(
    {
      status: 'PASS',
      questions: questions.length,
      autoGradedMasteryChecks: autoQuestions.length,
      topics: ALL_TOPICS.length,
      topicCounts: counts,
    },
    null,
    2,
  ),
);
