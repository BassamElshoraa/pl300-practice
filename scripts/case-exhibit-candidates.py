import json,re
from pathlib import Path
import pypdfium2 as pdfium
root=Path(__file__).resolve().parents[1]
doc=pdfium.PdfDocument('D:/# Courses By Me/# Digilians/Content/PL 300/Dump/PL-300 Final.pdf')
out=root/'.openai/case-candidates';out.mkdir(exist_ok=True)
result={}
for i in range(len(doc)):
 page=doc[i];tp=page.get_textpage();text=tp.get_text_range()
 if not re.search(r'Northwind Traders is a specialty',text):continue
 figures=[]
 for pi in range(i,min(i+6,len(doc))):
  p=doc[pi];t=p.get_textpage().get_text_range()
  for obj in p.get_objects():
   if obj.type!=3:continue
   w,h=obj.get_px_size()
   if w<150 or h<65:continue
   im=obj.get_bitmap().to_pil().convert('RGB');gray=im.convert('L')
   if gray.entropy()<.6:continue
   name=f'northwind-{pi+1}-{len(figures)+1}.webp';im.save(out/name,'WEBP',lossless=True)
   figures.append({'src':str(out/name),'width':im.width,'height':im.height})
  if re.search(r'Question\s+You need to create the dataset',t):break
 result[str(i+1)]=figures
print(json.dumps(result,indent=2))
(root/'.openai/case-candidates.json').write_text(json.dumps(result,indent=2))
