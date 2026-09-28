import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { questions } from '../lib/questions.ts';
import { dragDropData } from '../lib/drag-drop-data.ts';
import { visualControlData } from '../lib/visual-control-data.ts';
import { isAnswered, isYesNoQuestion } from '../lib/exam-utils.ts';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const failures = [];
const questionById = new Map(
  questions.map((question) => [question.id, question]),
);
const fail = (id, issue) => failures.push({ id, issue });

function checkAsset(id, asset) {
  const localPath = path.join(
    projectRoot,
    'public',
    asset.image.replace(/^\//, ''),
  );
  if (!fs.existsSync(localPath))
    fail(id, `missing interaction asset ${asset.image}`);
  if (!Number.isInteger(asset.width) || asset.width < 20)
    fail(id, `invalid width for ${asset.image}`);
  if (!Number.isInteger(asset.height) || asset.height < 8)
    fail(id, `invalid height for ${asset.image}`);
}

for (const [id, spec] of Object.entries(dragDropData)) {
  const question = questionById.get(id);
  if (!question) fail(id, 'drag manifest points to a missing question');
  else if (question.type !== 'manual' || !/DRAG\s+DROP/i.test(question.prompt))
    fail(id, 'drag manifest points to the wrong interaction type');
  if (!Number.isInteger(spec.slots) || spec.slots < 1)
    fail(id, 'invalid drag slot count');
  if (spec.options.length < spec.slots)
    fail(id, 'fewer drag choices than answer slots');
  spec.options.forEach((asset) => checkAsset(id, asset));
  if (question) {
    if (isAnswered(question, []))
      fail(id, 'empty drag answer counted as complete');
    if (isAnswered(question, Array(spec.slots).fill(-1)))
      fail(id, 'blank drag slots counted as complete');
    if (!isAnswered(question, Array(spec.slots).fill(0)))
      fail(id, 'filled drag slots did not count as complete');
  }
}

for (const [id, spec] of Object.entries(visualControlData)) {
  const question = questionById.get(id);
  if (!question) fail(id, 'list manifest points to a missing question');
  else if (
    question.type !== 'manual' ||
    !/drop-?down|FILL IN THE BLANK/i.test(question.prompt)
  )
    fail(id, 'list manifest points to the wrong interaction type');
  if (!Number.isInteger(spec.slots) || spec.slots < 1)
    fail(id, 'invalid list slot count');
  if (spec.menus.length < spec.slots)
    fail(id, 'fewer source menus than answer lists');
  spec.menus.forEach((asset) => checkAsset(id, asset));
  if (spec.sourceQuestion && !questionById.has(spec.sourceQuestion))
    fail(id, `missing reused source question ${spec.sourceQuestion}`);
  if (question) {
    if (isAnswered(question, []))
      fail(id, 'empty list answer counted as complete');
    if (isAnswered(question, Array(spec.slots).fill(-1)))
      fail(id, 'blank lists counted as complete');
    if (!isAnswered(question, Array(spec.slots).fill(500)))
      fail(id, 'completed lists did not count as answered');
  }
}

const yesNoQuestions = questions.filter(isYesNoQuestion);
for (const question of yesNoQuestions) {
  if (isAnswered(question, []))
    fail(question.id, 'empty Yes/No grid counted as complete');
  if (isAnswered(question, [1, -1, 0]))
    fail(question.id, 'partial Yes/No grid counted as complete');
  if (!isAnswered(question, [1, 0, 1]))
    fail(question.id, 'completed Yes/No grid did not count as answered');
}

const sequenceQuestions = questions.filter(
  (question) => question.type === 'sequence',
);
for (const question of sequenceQuestions) {
  if (isAnswered(question, Array(question.choices.length).fill(-1)))
    fail(question.id, 'blank sequence slots counted as complete');
  if (!isAnswered(question, question.correct))
    fail(question.id, 'completed sequence did not count as answered');
}

const unresolvedListQuestions = questions
  .filter(
    (question) =>
      question.type === 'manual' &&
      /drop-?down|FILL IN THE BLANK/i.test(question.prompt),
  )
  .filter((question) => !visualControlData[question.id])
  .map((question) => question.id);

const report = {
  status: failures.length ? 'FAIL' : 'PASS',
  dragDropQuestions: Object.keys(dragDropData).length,
  dragDropModes: {
    ordering: Object.values(dragDropData).filter(
      (spec) => spec.mode === 'sequence',
    ).length,
    matching: Object.values(dragDropData).filter(
      (spec) => spec.mode === 'matching',
    ).length,
  },
  dragChoiceAssets: Object.values(dragDropData).reduce(
    (total, spec) => total + spec.options.length,
    0,
  ),
  sourceListQuestions: Object.keys(visualControlData).length,
  yesNoQuestions: yesNoQuestions.length,
  structuredSequenceQuestions: sequenceQuestions.length,
  unresolvedSourceLists: unresolvedListQuestions,
  failures,
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
