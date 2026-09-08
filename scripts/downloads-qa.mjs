import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import {
  DOWNLOAD_COLLECTIONS,
  DOWNLOAD_COUNT,
} from '../lib/download-library.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const items = DOWNLOAD_COLLECTIONS.flatMap((collection) => collection.items);

assert.equal(DOWNLOAD_COUNT, 12, 'The library must contain 12 unique PDFs.');
assert.equal(items.length, 12);
assert.equal(new Set(items.map((item) => item.id)).size, items.length);
assert.equal(new Set(items.map((item) => item.path)).size, items.length);
assert.deepEqual(
  DOWNLOAD_COLLECTIONS.map((collection) => collection.month),
  ['2026-08', '2026-07', '2026-06', '2026-05', '2026-04', '2026-03', '2026-01'],
);

const hashes = [];
for (const item of items) {
  const file = await readFile(`${projectRoot}public/${item.path}`);
  assert.equal(
    file.subarray(0, 4).toString(),
    '%PDF',
    `${item.path} is not a PDF.`,
  );
  assert.equal(file.byteLength, item.bytes, `${item.path} byte size changed.`);
  const hash = createHash('sha256').update(file).digest('hex');
  assert.equal(hash, item.sha256, `${item.path} checksum changed.`);
  hashes.push(hash);
}
assert.equal(
  new Set(hashes).size,
  hashes.length,
  'Duplicate PDF content found.',
);

console.log(
  JSON.stringify(
    {
      status: 'PASS',
      files: items.length,
      months: DOWNLOAD_COLLECTIONS.length,
      uniqueHashes: new Set(hashes).size,
    },
    null,
    2,
  ),
);
