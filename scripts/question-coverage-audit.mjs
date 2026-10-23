import assert from 'node:assert/strict';
import fs from 'node:fs';
import { questions } from '../lib/questions.ts';
import { getAnswerAudit } from '../lib/answer-audit.ts';
import { getReviewedLesson } from '../lib/reviewed-lessons.ts';
import { textAnswerData, statementData } from '../lib/text-answer-data.ts';
import { dragDropData } from '../lib/drag-drop-data.ts';
import { getQuestionPresentation } from '../lib/question-presentation.ts';
import { isYesNoQuestion } from '../lib/exam-utils.ts';
const banks = (predicate) =>
  questions.flatMap((q, i) => (predicate(q) ? [i + 1] : []));
const failures = banks(
  (q) =>
    !q.prompt.trim() ||
    ((q.type === 'single' || q.type === 'multi') && q.choices.length < 2),
);
assert.deepEqual(failures, [], 'Empty prompts or missing standard choices');
const result = {
  total: questions.length,
  individuallyExplained: banks((q) => Boolean(getReviewedLesson(q))).length,
  missingDetailedExplanation: banks((q) => !getReviewedLesson(q)),
  sourceKeyOnly: banks((q) => getAnswerAudit(q).status === 'source-key'),
  nativeTextDropdowns: banks((q) => Boolean(textAnswerData[q.id])),
  typedDragControls: banks((q) => Boolean(dragDropData[q.id])),
  typedStatementGrids: banks((q) => Boolean(statementData[q.id])),
  originalImageAnswerControls: banks(
    (q) =>
      q.type === 'manual' &&
      !textAnswerData[q.id] &&
      !dragDropData[q.id] &&
      !isYesNoQuestion(q) &&
      !getQuestionPresentation(q)?.warning,
  ),
  activeSourceWarnings: banks((q) =>
    Boolean(getQuestionPresentation(q)?.warning),
  ),
  conditionalLessons: banks(
    (q) => getReviewedLesson(q)?.verdict === 'conditional',
  ),
  structuralFailures: failures,
  scope:
    'Inventory and structural checks across every active question. Remaining image controls may include dropdowns and other hotspot formats. This is not a claim of completed semantic review or live AI inference.',
};
console.log(JSON.stringify(result, null, 2));
const output = process.argv
  .find((value) => value.startsWith('--output='))
  ?.slice('--output='.length);
if (output) fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
