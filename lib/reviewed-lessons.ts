import type { Question } from './questions';
import { dragDropData } from './drag-drop-data.ts';
import { textAnswerData } from './text-answer-data.ts';
import { lessons001 } from './reviewed-lessons/001-020.ts';
import { lessons021 } from './reviewed-lessons/021-040.ts';
import { lessons041 } from './reviewed-lessons/041-060.ts';
import { repairedDragLessons } from './reviewed-lessons/repaired-drag.ts';
export type { ReviewedLesson } from './reviewed-lessons/types';
export const reviewedLessons = {
  ...lessons001,
  ...lessons021,
  ...lessons041,
  ...repairedDragLessons,
};
export function getReviewedLesson(question: Pick<Question, 'id'>) {
  return reviewedLessons[question.id];
}
export function reviewedChoiceTexts(question: Question) {
  const rows = textAnswerData[question.id];
  const rowChoices = rows?.flatMap((row) =>
    row.options.map((option) => `${row.label} ${option}`),
  );
  if (rowChoices?.length === getReviewedLesson(question)?.optionsAr.length)
    return rowChoices;
  return question.choices.length
    ? question.choices
    : (dragDropData[question.id]?.options.map((option) => option.text ?? '') ??
        []);
}
export function buildReviewedExplanation(question: Question) {
  const lesson = getReviewedLesson(question);
  if (!lesson) return undefined;
  const choices = reviewedChoiceTexts(question);
  const options = lesson.optionsAr
    .map(
      (why, i) =>
        `${choices[i] ? `${String.fromCharCode(65 + i)}. ${choices[i]}\n` : ''}${why}`,
    )
    .join('\n\n');
  return `ترجمة السؤال بالعربي\n${lesson.translation}\n\nالقصة والمعنى\n${lesson.story}\n\nمثال نفهم بيه\n${lesson.example}\n\nطريقة التفكير خطوة بخطوة\n${lesson.reasoning.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\nالإجابة الصحيحة وليه\n${lesson.answer}\n\nليه كل اختيار صح أو غلط\n${options}\n\nالخلاصة اللي تتحفظ\n${lesson.takeaway}\n\nمراجع المراجعة\n${lesson.references.join('\n')}`;
}
