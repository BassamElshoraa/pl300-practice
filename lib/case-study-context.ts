import type { Question } from './questions';

type CaseStudyKey = 'litware' | 'northwind' | 'contoso';

const CASE_STUDY_CONFIG: Record<
  CaseStudyKey,
  { title: string; canonicalSourceNumber: number; questionNumbers: number[] }
> = {
  litware: {
    title: 'Litware, Inc.',
    canonicalSourceNumber: 328,
    questionNumbers: [
      328, 329, 349, 350, 351, 352, 353, 354, 363, 364, 365,
    ],
  },
  northwind: {
    title: 'Northwind Traders',
    canonicalSourceNumber: 342,
    questionNumbers: [342, 343, 344, 355, 356, 357, 358, 359, 361, 362],
  },
  contoso: {
    title: 'Contoso, Ltd.',
    canonicalSourceNumber: 345,
    questionNumbers: [345, 346, 347, 348, 360, 366, 367, 368, 369],
  },
};

const caseStudyForQuestion = new Map<number, CaseStudyKey>(
  Object.entries(CASE_STUDY_CONFIG).flatMap(([key, config]) =>
    config.questionNumbers.map(
      (sourceNumber) => [sourceNumber, key as CaseStudyKey] as const,
    ),
  ),
);

function cleanSpacing(value: string) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function scenarioBody(value: string) {
  const generalOverview = value.search(/\bGeneral Overview\b/i);
  const overview = value.search(/\bOverview\s*(?:\.|-)/i);
  const start = generalOverview >= 0 ? generalOverview : overview;
  return cleanSpacing(start >= 0 ? value.slice(start) : value);
}

function splitEmbeddedCaseStudy(prompt: string) {
  if (!/\bCase Study\b/i.test(prompt)) return null;

  const markers = [
    ...prompt.matchAll(
      /\bQuestion\s+(?=(?:HOTSPOT|DRAG DROP|You|What|Which|How)\b)/gi,
    ),
  ];
  const marker = markers.at(-1);
  if (!marker || marker.index === undefined) return null;

  return {
    context: scenarioBody(prompt.slice(0, marker.index)),
    prompt: cleanSpacing(prompt.slice(marker.index + marker[0].length)),
  };
}

function stripCaseStudyAppendix(explanation: string) {
  const marker = explanation.search(/\bCase Study Description\b/i);
  if (marker < 0) return explanation;

  const beforeMarker = explanation.slice(0, marker);
  return cleanSpacing(beforeMarker.replace(/[_\s]+$/g, ''));
}

/**
 * The source PDFs split the three case studies inconsistently: some questions
 * contain the full scenario in the prompt, while others append it after the
 * answer explanation. Normalize all 30 related questions so every question
 * carries the same complete scenario before its own task.
 */
export function applyCaseStudyContexts(sourceQuestions: Question[]) {
  const canonicalContexts = new Map<CaseStudyKey, string>();

  for (const [key, config] of Object.entries(CASE_STUDY_CONFIG) as Array<
    [CaseStudyKey, (typeof CASE_STUDY_CONFIG)[CaseStudyKey]]
  >) {
    const canonicalQuestion = sourceQuestions.find(
      (question) =>
        question.source === 'Final' &&
        question.sourceNumber === config.canonicalSourceNumber,
    );
    const embedded = canonicalQuestion
      ? splitEmbeddedCaseStudy(canonicalQuestion.prompt)
      : null;
    if (!embedded?.context) {
      throw new Error(
        `Missing canonical case-study text for ${config.title} (question ${config.canonicalSourceNumber}).`,
      );
    }
    canonicalContexts.set(
      key,
      `${config.title} — Case Study\n\n${embedded.context}`,
    );
  }

  return sourceQuestions.map((question) => {
    if (question.source !== 'Final') return question;

    const caseStudyKey = caseStudyForQuestion.get(question.sourceNumber);
    if (!caseStudyKey) return question;

    const embedded = splitEmbeddedCaseStudy(question.prompt);
    return {
      ...question,
      context: canonicalContexts.get(caseStudyKey),
      prompt: embedded?.prompt ?? question.prompt,
      explanation: stripCaseStudyAppendix(question.explanation),
    };
  });
}

export const expectedCaseStudyQuestionNumbers = Object.fromEntries(
  Object.entries(CASE_STUDY_CONFIG).map(([key, config]) => [
    key,
    [...config.questionNumbers],
  ]),
) as Record<CaseStudyKey, number[]>;
