import assert from 'node:assert/strict';
import fs from 'node:fs';
import { questions } from '../lib/questions.ts';
import { nativeExhibitData } from '../lib/native-exhibit-data.ts';
import { textAnswerData, statementData } from '../lib/text-answer-data.ts';
import { visualControlData } from '../lib/visual-control-data.ts';
import { getQuestionPresentation } from '../lib/question-presentation.ts';
const ids = new Set(questions.map((q) => q.id));
let figures = 0;
for (const [id, items] of Object.entries(nativeExhibitData)) {
  assert.ok(
    ids.has(id) ||
      ['case-northwind', 'case-litware', 'case-contoso'].includes(id),
    `Orphan exhibit ${id}`,
  );
  for (const image of items) {
    assert.match(image.src, /^\/native-exhibits\/[\w-]+\.webp$/);
    assert.ok(image.width > 0 && image.height > 0);
    const bytes = fs.readFileSync(`public${image.src}`);
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    figures++;
  }
}
for (const [id, rows] of Object.entries(textAnswerData)) {
  assert.ok(ids.has(id));
  assert.ok(rows.length > 0);
  for (const row of rows) {
    assert.ok(row.label.trim());
    assert.ok(row.options.length >= 2);
    assert.ok(row.options.every((option) => option.trim()));
  }
}
for (const id of Object.keys(visualControlData))
  assert.ok(
    textAnswerData[id] || getQuestionPresentation({ id })?.warning,
    `Unreviewed source menu: ${id}`,
  );
for (const [id, statements] of Object.entries(statementData)) {
  assert.ok(ids.has(id));
  assert.ok(
    statements.every((s) => s.length > 15 && !/^Statement \d+$/.test(s)),
  );
}
console.log(
  JSON.stringify({
    status: 'PASS',
    nativeFigures: figures,
    textDropdowns: Object.keys(textAnswerData).length,
    fullStatementGrids: Object.keys(statementData).length,
  }),
);
