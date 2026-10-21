import assert from 'node:assert/strict';
import { questions } from '../lib/questions.ts';
import {
  reviewedLessons,
  buildReviewedExplanation,
  reviewedChoiceTexts,
} from '../lib/reviewed-lessons.ts';

const byId = new Map(questions.map((q) => [q.id, q]));
let conditional = 0;
for (const [id, lesson] of Object.entries(reviewedLessons)) {
  const q = byId.get(id);
  assert.ok(q, `${id}: not an active question`);
  for (const field of ['translation', 'story', 'answer', 'example', 'takeaway'])
    assert.ok(
      typeof lesson[field] === 'string' &&
        lesson[field].length >= (field === 'answer' ? 2 : 25),
      `${id}: missing substantive ${field}`,
    );
  assert.ok(lesson.reasoning.length >= 2, `${id}: reasoning is missing`);
  assert.ok(
    lesson.optionsAr.length > 0,
    `${id}: alternatives were not discussed`,
  );
  lesson.optionsAr.forEach((why) =>
    assert.ok(why.length >= 25, `${id}: empty option rationale`),
  );
  const choices = reviewedChoiceTexts(q);
  if (choices.length)
    assert.equal(
      lesson.optionsAr.length,
      choices.length,
      `${id}: alternatives do not match the actual question`,
    );
  if (lesson.correctIndices)
    assert.deepEqual(
      [...lesson.correctIndices].sort(),
      [...q.correct].sort(),
      `${id}: lesson answer differs from the bank key`,
    );
  assert.ok(lesson.references.length, `${id}: no supporting references`);
  lesson.references.forEach((url) =>
    assert.equal(new URL(url).protocol, 'https:', `${id}: invalid reference`),
  );
  const guide = buildReviewedExplanation(q);
  assert.ok(
    guide.includes(lesson.example) && guide.includes(lesson.answer),
    `${id}: the displayed guide lost lesson content`,
  );
  if (lesson.verdict === 'conditional') conditional++;
}
console.log(
  JSON.stringify(
    {
      activeQuestions: questions.length,
      individuallyExplained: Object.keys(reviewedLessons).length,
      conditional,
      remaining: questions.length - Object.keys(reviewedLessons).length,
      scope:
        'Structural consistency checks only; not proof of semantic correctness.',
    },
    null,
    2,
  ),
);
