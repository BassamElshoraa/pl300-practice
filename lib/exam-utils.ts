import type { Question } from './questions';
import { dragDropData } from './drag-drop-data.ts';
import { visualControlData } from './visual-control-data.ts';
import { managedAutoGradingKeys } from './managed-auto-grading-keys.ts';
import { textAnswerData, TEXT_ANSWER_OFFSET } from './text-answer-data.ts';
import { getQuestionPresentation } from './question-presentation.ts';

export type Answers = Record<string, number[]>;

export function isYesNoQuestion(question: Question) {
  return (
    question.type === 'manual' && /select\s+yes\s+if/i.test(question.prompt)
  );
}

export function calculateScore(exam: Question[], answers: Answers) {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let manual = 0;
  exam.forEach((question) => {
    if (
      question.type === 'manual' &&
      !managedAutoGradingKeys[question.id]?.length
    )
      manual += 1;
    else if (!isAnswered(question, answers[question.id])) unanswered += 1;
    else if (isCorrect(question, answers[question.id])) correct += 1;
    else incorrect += 1;
  });
  return {
    correct,
    incorrect,
    unanswered,
    manual,
    autoGraded: exam.length - manual,
  };
}

export function isAnswered(question: Question, answer?: number[]) {
  if (!answer) return false;
  if (getQuestionPresentation(question)?.warning) return false;
  const textRows = textAnswerData[question.id];
  if (textRows)
    return (
      answer.length === textRows.length &&
      textRows.every(
        (row, i) => row.options[answer[i] - TEXT_ANSWER_OFFSET] !== undefined,
      )
    );
  if (question.type === 'manual') {
    const dragSpec = dragDropData[question.id];
    if (dragSpec) {
      return (
        answer.length === dragSpec.slots &&
        answer.every(
          (item) =>
            Number.isInteger(item) &&
            item >= (dragSpec.answerOffset ?? 0) &&
            item < (dragSpec.answerOffset ?? 0) + dragSpec.options.length,
        )
      );
    }
    const visualControlSpec = visualControlData[question.id];
    if (visualControlSpec) {
      return (
        answer.length === visualControlSpec.slots &&
        answer.every((item) => item >= 0)
      );
    }
    if (isYesNoQuestion(question)) {
      return (
        answer.length === 3 && answer.every((item) => item === 0 || item === 1)
      );
    }
    return answer.length > 0;
  }
  if (question.type === 'matching')
    return (
      answer.length === (question.rows?.length ?? 0) &&
      answer.every((item) => item >= 0)
    );
  if (question.type === 'sequence')
    return answer.length === question.choices.length;
  return answer.length > 0;
}

export function isCorrect(question: Question, answer?: number[]) {
  const expected = managedAutoGradingKeys[question.id] ?? question.correct;
  if (question.type === 'manual' && !expected.length) return false;
  if (!isAnswered(question, answer) || !answer) return false;
  if (question.type === 'multi')
    return (
      [...answer].sort((a, b) => a - b).join(',') ===
      [...expected].sort((a, b) => a - b).join(',')
    );
  return answer.join(',') === expected.join(',');
}
