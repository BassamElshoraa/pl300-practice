import fs from 'node:fs/promises';
const file='lib/native-exhibit-data.ts';
const {nativeExhibitData:data}=await import('../lib/native-exhibit-data.ts');
const candidates=JSON.parse(await fs.readFile('.openai/first-native-candidates.json','utf8'));
// These figures were inspected against the source; answer-area screenshots are not included.
const approved=[7,52,58,62,76,80,82,100,102,137,150,175,192,199,220,228,230,260,263,279,286];
for(const number of approved){
 const id=Object.keys(candidates).find(id=>Number(id.split('-')[1])===number);
 if(!id)throw Error(`Missing reviewed source figure ${number}`);
 data[id]=[];
 for(const figure of candidates[id]){
  const name=figure.src.split(/[\\/]/).at(-1);
  await fs.copyFile(figure.src,`public/native-exhibits/${name}`);
  data[id].push({...figure,src:`/native-exhibits/${name}`});
 }
}
await fs.writeFile(file,'// Lossless original PDF figures; approved exhibits only.\nexport const nativeExhibitData: Record<string, {src:string;width:number;height:number}[]> = '+JSON.stringify(data,null,2)+';\n');
const referenced=new Set(Object.values(data).flat().map(x=>x.src.split('/').at(-1)));
// Remove only this task's newly generated unreferenced extraction candidates.
for(const name of await fs.readdir('public/native-exhibits')){
 if(/^f[12]-\d+-\d+-\d+\.webp$/.test(name)&&!referenced.has(name))await fs.unlink(`public/native-exhibits/${name}`);
}
console.log({questions:Object.keys(data).length,figures:referenced.size});
