import type { Question } from './questions';

export type OptionExplanation = {
  choiceIndex: number;
  isCorrect: boolean;
  text: string;
};

export function buildOptionExplanations(
  question: Question,
): OptionExplanation[] {
  if (question.type === 'manual') return [];
  const keyedAnswers = question.correct
    .map((index) => question.choices[index])
    .filter(Boolean);
  const sourceSummary = explanationSummary(question.explanation);

  return question.choices.map((choice, choiceIndex) => {
    const isKeyed = question.correct.includes(choiceIndex);
    const directEvidence = findChoiceEvidence(question.explanation, choice);
    if (isKeyed) {
      return {
        choiceIndex,
        isCorrect: true,
        text: directEvidence
          ? `This option is included in the source answer. ${directEvidence}`
          : `This option satisfies the requirement and is included in the answer key.${sourceSummary ? ` ${sourceSummary}` : ''}`,
      };
    }
    return {
      choiceIndex,
      isCorrect: false,
      text: `This option is not included in the answer key. The requirement is met by ${formatList(keyedAnswers)}.${directEvidence ? ` The source mentions this option in context: ${directEvidence}` : sourceSummary ? ` ${sourceSummary}` : ''}`,
    };
  });
}

function findChoiceEvidence(explanation: string, choice: string) {
  const keywords =
    choice
      .toLowerCase()
      .match(/[a-z0-9]{4,}/g)
      ?.filter((word) => !STOP_WORDS.has(word)) ?? [];
  if (keywords.length === 0) return '';
  const sentences = cleanExplanation(explanation)
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const match = sentences.find((sentence) => {
    const lower = sentence.toLowerCase();
    return (
      keywords.slice(0, 4).filter((keyword) => lower.includes(keyword))
        .length >= Math.min(2, keywords.length)
    );
  });
  return trimText(match ?? '', 260);
}

function explanationSummary(explanation: string) {
  const clean = cleanExplanation(explanation)
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\bReference:\s*/gi, '')
    .trim();
  return trimText(clean, 320);
}

function cleanExplanation(value: string) {
  return value
    .replace(/\r/g, '')
    .replace(/\n[\t ]*\n+/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimText(value: string, max: number) {
  if (value.length <= max) return value;
  const clipped = value.slice(0, max);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > max * 0.65 ? lastSpace : max).trim()}…`;
}

function formatList(values: string[]) {
  if (values.length === 0) return 'the keyed source answer';
  if (values.length === 1) return `“${values[0]}”`;
  return values.map((value) => `“${value}”`).join(' and ');
}

const STOP_WORDS = new Set([
  'with',
  'from',
  'that',
  'this',
  'into',
  'your',
  'should',
  'using',
  'create',
  'enable',
  'select',
  'data',
  'power',
]);
