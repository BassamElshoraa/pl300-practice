import { DUMP_PRACTICE_COLLECTIONS } from '../lib/dump-practice.ts';
import { questions } from '../lib/questions.ts';

const failures = [];
const fail = (message) => failures.push(message);
const collectionIds = new Set();
const modelIds = new Set();

for (const collection of DUMP_PRACTICE_COLLECTIONS) {
  if (collectionIds.has(collection.id))
    fail(`duplicate collection id: ${collection.id}`);
  if (modelIds.has(collection.modelId))
    fail(`duplicate collection model id: ${collection.modelId}`);
  collectionIds.add(collection.id);
  modelIds.add(collection.modelId);

  if (!/^\d{4}-\d{2}$/.test(collection.id))
    fail(`${collection.id}: invalid month id`);
  if (collection.modelId < 950)
    fail(`${collection.id}: model id must be reserved for dump practice`);
  if (collection.sourceKeys.length === 0)
    fail(`${collection.id}: no source keys configured`);
  if (collection.sourceFiles.length !== collection.sourceKeys.length)
    fail(`${collection.id}: source file labels do not match source keys`);

  const selected = questions.filter((question) =>
    collection.sourceKeys.includes(question.source),
  );
  const selectedIds = new Set(selected.map((question) => question.id));
  if (selectedIds.size !== selected.length)
    fail(`${collection.id}: duplicate question ids in collection`);
  if (selected.length === 0)
    fail(`${collection.id}: collection contains no questions`);

  for (const source of collection.sourceKeys) {
    if (!selected.some((question) => question.source === source))
      fail(`${collection.id}: source ${source} contains no questions`);
  }
}

const august = DUMP_PRACTICE_COLLECTIONS.find(
  (collection) => collection.id === '2026-08',
);
if (!august) {
  fail('August 2026 collection is missing');
} else {
  const selected = questions.filter((question) =>
    august.sourceKeys.includes(question.source),
  );
  const sourceCounts = Object.fromEntries(
    august.sourceKeys.map((source) => [
      source,
      selected.filter((question) => question.source === source).length,
    ]),
  );
  if (selected.length !== questions.length)
    fail(
      `August 2026 should contain all ${questions.length} verified questions, found ${selected.length}`,
    );
  if (sourceCounts.Final !== 369)
    fail(
      `August Final should contain 369 questions, found ${sourceCounts.Final}`,
    );
  if (sourceCounts['Final 2'] !== 125)
    fail(
      `August Final 2 should contain 125 verified questions, found ${sourceCounts['Final 2']}`,
    );
  if (selected.length !== questions.length)
    fail('August 2026 does not cover the complete current question bank');
}

if (failures.length > 0) {
  console.error('Dump practice QA failed:');
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(
  `Dump practice QA passed: ${DUMP_PRACTICE_COLLECTIONS.length} monthly collection, ${questions.length} verified August 2026 questions, 2 source files.`,
);
