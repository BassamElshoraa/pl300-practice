import fs from 'node:fs/promises';
const file = 'lib/native-exhibit-data.ts';
const { nativeExhibitData: data } =
  await import('../lib/native-exhibit-data.ts');
const candidates = JSON.parse(
  await fs.readFile('.openai/case-candidates.json', 'utf8'),
);
const captions = [
  'Data sources',
  'Customer Details worksheet',
  'Orders',
  'Order Details',
  'Products',
  'Categories',
  'Suppliers',
  'Sales Employees',
];
// A later repeated case wrongly shows Products instead of Order Details.
// Use the visually reviewed complete case, PDF pages 386–388.
data['case-northwind'] = [];
for (const [i, figure] of candidates['385'].slice(0, 8).entries()) {
  const name = `case-northwind-${i + 1}.webp`;
  await fs.copyFile(figure.src, `public/native-exhibits/${name}`);
  data['case-northwind'].push({
    ...figure,
    src: `/native-exhibits/${name}`,
    caption: captions[i],
  });
}
await fs.writeFile(
  file,
  '// Lossless original PDF figures; approved exhibits only.\nexport const nativeExhibitData: Record<string, {src:string;width:number;height:number;caption?:string}[]> = ' +
    JSON.stringify(data, null, 2) +
    ';\n',
);
