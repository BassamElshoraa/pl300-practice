import assert from 'node:assert/strict';
import { questions } from '../lib/questions.ts';
import {
  getReviewedLesson,
  reviewedChoiceTexts,
} from '../lib/reviewed-lessons.ts';
import { getQuestionPresentation } from '../lib/question-presentation.ts';
import { managedAutoGradingKeys } from '../lib/managed-auto-grading-keys.ts';
import { isAnswered, isCorrect, calculateScore } from '../lib/exam-utils.ts';
import { textAnswerData } from '../lib/text-answer-data.ts';
import { updateMistakeRecords } from '../lib/learner-state.ts';
import { buildTutorContext } from '../lib/ai-tutor.ts';
let authored = 0,
  nativeGraded = 0,
  unscored = 0;
for (const q of questions) {
  const lesson = getReviewedLesson(q),
    presentation = getQuestionPresentation(q);
  assert.ok(lesson, `${q.id}: missing individual explanation`);
  authored++;
  const choices = reviewedChoiceTexts(q);
  if (choices.length)
    assert.equal(
      lesson.optionsAr.length,
      choices.length,
      `${q.id}: alternatives mismatch`,
    );
  const key = managedAutoGradingKeys[q.id] ?? q.correct;
  if (presentation?.warning) {
    unscored++;
    assert.equal(
      isAnswered(q, key),
      false,
      `${q.id}: ambiguous answer was treated as complete`,
    );
    assert.equal(
      isCorrect(q, key),
      false,
      `${q.id}: ambiguous source was marked correct`,
    );
    assert.equal(calculateScore([q], { [q.id]: key }).autoGraded, 0);
    assert.deepEqual(
      buildTutorContext({ question: q, topic: 'Review', checked: true })
        .correctAnswer,
      [lesson.answer],
      `${q.id}: AI received source key instead of uncertainty`,
    );
    continue;
  }
  if (!textAnswerData[q.id] || !managedAutoGradingKeys[q.id]) continue;
  nativeGraded++;
  assert.equal(
    isCorrect(q, key),
    true,
    `${q.id}: reviewed native selection fails`,
  );
  const wrong = key.map(
    (value, i) =>
      10000 + ((value - 10000 + 1) % textAnswerData[q.id][i].options.length),
  );
  assert.equal(
    isCorrect(q, wrong),
    false,
    `${q.id}: wrong selection marked correct`,
  );
  const score = calculateScore([q], { [q.id]: key });
  assert.equal(score.correct, 1);
  assert.equal(score.autoGraded, 1);
  const mistakes = updateMistakeRecords(
    {},
    [q],
    { [q.id]: wrong },
    new Date().toISOString(),
  );
  assert.equal(
    mistakes[q.id]?.status,
    'needs-review',
    `${q.id}: native mistake not synchronized`,
  );
  const improving = updateMistakeRecords(
    mistakes,
    [q],
    { [q.id]: key },
    new Date().toISOString(),
  );
  assert.equal(
    improving[q.id]?.status,
    'improving',
    `${q.id}: native retry not synchronized`,
  );
}
assert.equal(authored, 494);
assert.equal(questions.filter((q) => q.context).length, 34);
console.log(
  JSON.stringify({
    status: 'PASS',
    individualExplanations: authored,
    nativeGraded,
    unscoredSourceWarnings: unscored,
    caseContexts: 34,
    wrongAndRightNativeSelections: true,
    nativeMistakeSynchronization: true,
    uncertaintyGivenToAI: true,
    scope:
      'Consistency and behavior checks, not a guarantee of semantic correctness.',
  }),
);
