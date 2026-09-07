import type { Question } from './questions';

export type Answers = Record<string, number[]>;

export function calculateScore(exam: Question[], answers: Answers) {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let manual = 0;
  exam.forEach((question) => {
    if (question.type === 'manual') manual += 1;
    else if (!isAnswered(question, answers[question.id])) unanswered += 1;
    else if (isCorrect(question, answers[question.id])) correct += 1;
    else incorrect += 1;
  });
  return { correct, incorrect, unanswered, manual, autoGraded: exam.length - manual };
}

export function isAnswered(question: Question, answer?: number[]) {
  if (!answer) return false;
  if (question.type === 'manual') return answer.length > 0;
  if (question.type === 'matching') return answer.length === (question.rows?.length ?? 0) && answer.every((item) => item >= 0);
  if (question.type === 'sequence') return answer.length === question.choices.length;
  return answer.length > 0;
}

export function isCorrect(question: Question, answer?: number[]) {
  if (question.type === 'manual') return false;
  if (!isAnswered(question, answer) || !answer) return false;
  if (question.type === 'multi') return [...answer].sort((a, b) => a - b).join(',') === [...question.correct].sort((a, b) => a - b).join(',');
  return answer.join(',') === question.correct.join(',');
}
