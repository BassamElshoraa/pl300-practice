import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const questionsSource = fs.readFileSync(path.resolve(projectRoot, 'lib/questions.ts'), 'utf8');
const questionsPrefix = 'export const questions: Question[] = ';
const questionsStart = questionsSource.indexOf(questionsPrefix) + questionsPrefix.length;
const questionsEnd = questionsSource.indexOf('\n];', questionsStart) + 2;
const questions = JSON.parse(questionsSource.slice(questionsStart, questionsEnd));
const failures = [];
const warnings = [];

const targets = {
  'Prepare the data': 14,
  'Model the data': 13,
  'Visualize and analyze the data': 13,
  'Manage and secure Power BI': 10,
};
const supportedTypes = new Set(['single', 'multi', 'sequence', 'matching', 'manual']);
const requiredText = ['id', 'domain', 'type', 'prompt', 'source'];
const sourceVisualReference = /(?:following|shown in the|as shown in|shown below).{0,50}(?:exhibit|table|graphic|diagram)|click the exhibit|the table shown/is;
const canon = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
const fail = (question, issue) => failures.push({ id: question?.id ?? 'bank', issue });

function isAnswered(question, answer) {
  if (!answer) return false;
  if (question.type === 'manual') return answer.length > 0;
  if (question.type === 'matching') return answer.length === (question.rows?.length ?? 0) && answer.every((item) => item >= 0);
  if (question.type === 'sequence') return answer.length === question.choices.length;
  return answer.length > 0;
}

function isCorrect(question, answer) {
  if (question.type === 'manual' || !isAnswered(question, answer)) return false;
  const actual = question.type === 'multi' ? [...answer].sort((a, b) => a - b) : answer;
  const expected = question.type === 'multi' ? [...question.correct].sort((a, b) => a - b) : question.correct;
  return actual.join(',') === expected.join(',');
}

function calculateScore(exam, answers) {
  const result = { correct: 0, incorrect: 0, unanswered: 0, manual: 0, autoGraded: 0 };
  for (const question of exam) {
    if (question.type === 'manual') result.manual += 1;
    else {
      result.autoGraded += 1;
      if (!isAnswered(question, answers[question.id])) result.unanswered += 1;
      else if (isCorrect(question, answers[question.id])) result.correct += 1;
      else result.incorrect += 1;
    }
  }
  return result;
}

function seededShuffle(items, seed) {
  const result = [...items];
  let state = seed >>> 0;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

const fullBank = seededShuffle(questions, 300);
const mocks = [1, 2, 3, 4].map((model) => {
  const selected = [];
  for (const [domain, count] of Object.entries(targets)) {
    const pool = seededShuffle(questions.filter((item) => item.domain === domain), 3000 + domain.length);
    selected.push(...pool.slice((model - 1) * count, model * count));
  }
  return seededShuffle(selected, model * 7919);
});
const bankParts = [0, 1, 2, 3].map((remainder) => fullBank.filter((_, index) => index % 4 === remainder));

const ids = new Set();
const assetRefs = new Set();
for (const question of questions) {
  for (const field of requiredText) {
    if (typeof question[field] !== 'string' || !question[field].trim()) fail(question, `missing ${field}`);
  }
  if (ids.has(question.id)) fail(question, 'duplicate id');
  ids.add(question.id);
  if (!supportedTypes.has(question.type)) fail(question, `unsupported type ${question.type}`);
  if (!Number.isInteger(question.sourceNumber) || question.sourceNumber < 1) fail(question, 'invalid source number');
  if (!Object.hasOwn(targets, question.domain)) fail(question, `invalid domain ${question.domain}`);
  if (!Array.isArray(question.choices) || !Array.isArray(question.correct)) fail(question, 'choices/correct must be arrays');

  if (question.type === 'manual') {
    if (!question.image || !question.answerImage) fail(question, 'manual item needs both question and answer images');
    if (question.correct.length !== 0) fail(question, 'manual item must not contain an automatic key');
    if (!isAnswered(question, [500501])) fail(question, 'manual marker did not register as answered');
  } else {
    if (sourceVisualReference.test(question.prompt) && !question.image) fail(question, 'source exhibit or table is referenced but no image is attached');
    if (question.choices.length < 2) fail(question, 'auto-graded item needs at least two choices');
    if (question.correct.length < 1) fail(question, 'auto-graded item has no key');
    if (question.correct.some((index) => !Number.isInteger(index) || index < 0 || index >= question.choices.length)) fail(question, 'key index outside choices');
    if (new Set(question.correct).size !== question.correct.length) fail(question, 'duplicate key index');
    if (!isCorrect(question, question.correct)) fail(question, 'correct key fails scoring');
    if (!isAnswered(question, question.correct)) fail(question, 'correct key fails answered-state check');
    if (isAnswered(question, [])) fail(question, 'empty response counted as answered');
  }

  if (question.type === 'single' && question.correct.length !== 1) fail(question, 'single-choice key must contain one index');
  if (question.type === 'multi' && question.correct.length < 2) fail(question, 'multi-select key must contain at least two indices');
  if (question.type === 'matching') {
    if (!Array.isArray(question.rows) || question.rows.length < 1) fail(question, 'matching item has no rows');
    if (question.correct.length !== question.rows?.length) fail(question, 'matching key count differs from row count');
  }
  if (question.type === 'sequence') {
    const sorted = [...question.correct].sort((a, b) => a - b);
    if (sorted.join(',') !== question.choices.map((_, index) => index).join(',')) fail(question, 'sequence key must use every choice exactly once');
  }

  const emptyChoice = question.choices.findIndex((choice) => typeof choice !== 'string' || !choice.trim());
  if (emptyChoice >= 0) fail(question, `empty choice at index ${emptyChoice}`);
  const choiceKeys = question.choices.map(canon);
  if (choiceKeys.some((choice, index) => choice && choiceKeys.indexOf(choice) !== index)) warnings.push({ id: question.id, issue: 'duplicate normalized choice text' });

  for (const asset of [question.image, question.answerImage].filter(Boolean)) assetRefs.add(asset);
}

for (const asset of assetRefs) {
  const localPath = path.join(projectRoot, 'public', asset.replace(/^\//, ''));
  if (!fs.existsSync(localPath)) {
    failures.push({ id: asset, issue: 'missing image asset' });
    continue;
  }
  try {
    const metadata = await sharp(localPath).metadata();
    if (!metadata.width || !metadata.height || metadata.width < 20 || metadata.height < 20) failures.push({ id: asset, issue: 'invalid image dimensions' });
  } catch (error) {
    failures.push({ id: asset, issue: `image decode failed: ${error.message}` });
  }
}

const mockIds = new Set();
const mockReports = mocks.map((mock, index) => {
  if (mock.length !== 50) fail(null, `mock ${index + 1} has ${mock.length} questions`);
  const localIds = new Set(mock.map((question) => question.id));
  if (localIds.size !== mock.length) fail(null, `mock ${index + 1} contains duplicate questions`);
  for (const id of localIds) {
    if (mockIds.has(id)) fail(null, `question ${id} repeats across mocks`);
    mockIds.add(id);
  }
  const domains = Object.fromEntries(Object.keys(targets).map((domain) => [domain, mock.filter((question) => question.domain === domain).length]));
  for (const [domain, expected] of Object.entries(targets)) if (domains[domain] !== expected) fail(null, `mock ${index + 1} ${domain}: ${domains[domain]} != ${expected}`);

  const correctAnswers = Object.fromEntries(mock.map((question) => [question.id, question.type === 'manual' ? [500501] : question.correct]));
  const score = calculateScore(mock, correctAnswers);
  if (score.correct !== score.autoGraded || score.incorrect !== 0 || score.unanswered !== 0) fail(null, `mock ${index + 1} perfect-answer simulation failed`);
  return {
    mock: index + 1,
    questions: mock.length,
    domains,
    interactionTypes: Object.fromEntries([...supportedTypes].map((type) => [type, mock.filter((question) => question.type === type).length])),
    manualQuestionNumbers: mock.map((question, questionIndex) => question.type === 'manual' ? questionIndex + 1 : null).filter(Boolean),
    ...score,
  };
});

const bankCoverage = bankParts.flat().map((question) => question.id);
if (bankCoverage.length !== questions.length || new Set(bankCoverage).size !== questions.length) fail(null, 'bank parts do not cover all questions exactly once');

const promptChoiceGroups = Object.groupBy(questions, (question) => canon(`${question.prompt}\n${question.choices.join('\n')}`));
const exactContentDuplicates = Object.values(promptChoiceGroups).filter((group) => group.length > 1).map((group) => group.map((question) => question.id));
if (exactContentDuplicates.length) warnings.push({ id: 'bank', issue: `${exactContentDuplicates.length} exact prompt/choice duplicate groups retained` });

const report = {
  status: failures.length === 0 ? 'PASS' : 'FAIL',
  questionsChecked: questions.length,
  autoGraded: questions.filter((question) => question.type !== 'manual').length,
  manualVisual: questions.filter((question) => question.type === 'manual').length,
  typeCounts: Object.fromEntries([...supportedTypes].map((type) => [type, questions.filter((question) => question.type === type).length])),
  imageAssetsDecoded: assetRefs.size,
  mocks: mockReports,
  uniqueAcrossFourMocks: mockIds.size,
  bankPartSizes: bankParts.map((part) => part.length),
  matchingLocations: bankParts.flatMap((part, partIndex) => part.map((question, questionIndex) => question.type === 'matching'
    ? { bankPart: partIndex + 1, questionNumber: questionIndex + 1, id: question.id }
    : null).filter(Boolean)),
  exactContentDuplicateGroups: exactContentDuplicates.length,
  warnings,
  failures,
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
