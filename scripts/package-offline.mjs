import fs from 'node:fs/promises';
import path from 'node:path';
const destination = process.argv[2];
if (!destination) throw Error('Provide an explicit new destination directory.');
try {
  await fs.access(destination);
  if(process.argv[3]!=='--refresh')throw Error('Destination already exists; use --refresh only for a previously generated offline package.');
  const server=await fs.readFile(path.join(destination,'server.mjs'),'utf8');
  if(!server.includes('/__pl300_offline_health')||!server.includes('PL300 Offline'))throw Error('Not a generated PL-300 offline package; refusing to overwrite.');
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
}
await fs.mkdir(destination, { recursive: true });
await fs.cp('dist/client', path.join(destination, 'site'), { recursive: true });
for (const file of [
  'server.mjs',
  'Start-Offline.ps1',
  'Open-PL300.cmd',
  'READ-ME.txt',
])
  await fs.copyFile(
    path.join('scripts/offline', file),
    path.join(destination, file),
  );
console.log(`Offline site saved: ${destination}`);
