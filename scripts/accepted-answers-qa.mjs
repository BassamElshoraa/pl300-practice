import assert from 'node:assert/strict';
import {
  answerMatches,
  acceptedAnswerVariants,
} from '../lib/answer-comparison.ts';
import {
  managedAcceptedAnswers,
  managedAutoGradingKeys,
} from '../lib/managed-auto-grading-keys.ts';
import { questions } from '../lib/questions.ts';
import { isCorrect, calculateScore } from '../lib/exam-utils.ts';

for (const bad of [
  null,
  [],
  '1',
  [1, -1],
  [1, 0.5],
  [[1], 2],
  [[]],
  [[1], [-1]],
]) {
  assert.deepEqual(acceptedAnswerVariants(bad), []);
  assert.equal(answerMatches([1], bad), false);
}
assert.equal(answerMatches([2, 1], [1, 2], true), true);
assert.equal(answerMatches([2, 1], [1, 2]), false);
assert.equal(answerMatches([1, 1], [1, 2], true), false);
let variants = 0;
for (const [id, accepted] of Object.entries(managedAcceptedAnswers)) {
  const q = questions.find((q) => q.id === id);
  assert.ok(q);
  assert.ok(
    accepted.some((v) => v.join() === managedAutoGradingKeys[id].join()),
  );
  for (const variant of accepted) {
    variants++;
    assert.equal(
      isCorrect(q, variant),
      true,
      `${id}: rejected valid variant ${variant}`,
    );
    assert.equal(calculateScore([q], { [id]: variant }).correct, 1);
    assert.equal(answerMatches(variant, accepted), true);
  }
  assert.equal(
    isCorrect(
      q,
      accepted[0].map(() => 999999),
    ),
    false,
  );
}
const merge = managedAcceptedAnswers['f1-066-65'];
for (const bad of [
  [5, 0, 2],
  [5, 2, 0],
  [2, 5, 0],
  [0, 0, 5],
]) {
  assert.equal(
    answerMatches(bad, merge),
    false,
    'Dependent merge ran before its prerequisite',
  );
}
assert.equal(
  answerMatches([10000, 10001], managedAcceptedAnswers['f1-366-365']),
  false,
);
console.log(
  JSON.stringify({
    status: 'PASS',
    questionsWithAlternatives: Object.keys(managedAcceptedAnswers).length,
    acceptedVariants: variants,
    sharedBrowserAndWorkerComparator: true,
  }),
);
