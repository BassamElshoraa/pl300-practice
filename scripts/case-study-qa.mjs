import { auditedQuestionBank, questions } from '../lib/questions.ts';
import {
  expectedCaseStudyQuestionNumbers,
  secondCollectionCases,
} from '../lib/case-study-context.ts';

const failures = [];
const expected = new Map();

for (const [caseStudy, numbers] of Object.entries(
  expectedCaseStudyQuestionNumbers,
)) {
  for (const sourceNumber of numbers) expected.set(sourceNumber, caseStudy);
}

for (const [sourceNumber, caseStudy] of expected) {
  const question = auditedQuestionBank.find(
    (item) => item.source === 'Final' && item.sourceNumber === sourceNumber,
  );
  if (!question) {
    failures.push(`${caseStudy} Q${sourceNumber}: question is missing`);
    continue;
  }
  if (question.excluded) {
    failures.push(`${caseStudy} Q${sourceNumber}: unexpectedly excluded`);
  }
  if (!question.context || question.context.length < 1_500) {
    failures.push(`${caseStudy} Q${sourceNumber}: full context is missing`);
  }
  if (/Introductory Info\s+Case Study/i.test(question.prompt)) {
    failures.push(`${caseStudy} Q${sourceNumber}: context remains in prompt`);
  }
  if (/Case Study Description/i.test(question.explanation)) {
    failures.push(
      `${caseStudy} Q${sourceNumber}: context remains in explanation`,
    );
  }
  if (!question.prompt.trim()) {
    failures.push(`${caseStudy} Q${sourceNumber}: question prompt is empty`);
  }
}

for (const [caseStudy, numbers] of Object.entries(
  expectedCaseStudyQuestionNumbers,
)) {
  const contexts = new Set(
    numbers.map(
      (sourceNumber) =>
        auditedQuestionBank.find(
          (item) =>
            item.source === 'Final' && item.sourceNumber === sourceNumber,
        )?.context,
    ),
  );
  if (contexts.size !== 1 || contexts.has(undefined)) {
    failures.push(`${caseStudy}: questions do not share one canonical context`);
  }
}

const activeCaseStudies = questions.filter((question) => question.context);
const secondActive = questions.filter((q) => secondCollectionCases[q.id]);
for (const q of secondActive) {
  const first = questions.find(
    (other) =>
      other.source === 'Final' &&
      other.context?.startsWith(q.context?.split(' — ')[0] ?? '__none__'),
  );
  if (!q.context || q.context.length < 1500 || q.context !== first?.context)
    failures.push(
      `${q.id}: missing or mismatched repeated source-verified context`,
    );
}
if (activeCaseStudies.length !== expected.size + secondActive.length) {
  failures.push(
    `Expected ${expected.size + secondActive.length} active case-study questions, found ${activeCaseStudies.length}`,
  );
}

const strandedSourceText = auditedQuestionBank.filter(
  (question) =>
    /Introductory Info\s+Case Study/i.test(question.prompt) ||
    /Case Study Description/i.test(question.explanation),
);
if (strandedSourceText.length) {
  failures.push(
    `Unnormalized source text remains on: ${strandedSourceText
      .map((question) => question.id)
      .join(', ')}`,
  );
}

if (failures.length) {
  console.error('Case-study QA failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      status: 'passed',
      totalCaseStudyQuestions: activeCaseStudies.length,
      groups: Object.fromEntries(
        Object.entries(expectedCaseStudyQuestionNumbers).map(([key, value]) => [
          key,
          value.length,
        ]),
      ),
      additionalSecondCollectionQuestions: secondActive.map((q) => q.id),
      everyQuestionHasFullRepeatedContext: true,
      promptsAndExplanationsContainNoHiddenDuplicateContext: true,
    },
    null,
    2,
  ),
);
