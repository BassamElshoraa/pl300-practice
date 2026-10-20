"""Extract original embedded figures, losslessly. Never synthesize diagram text."""
import json,re
from pathlib import Path
import pypdfium2 as pdfium
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'.openai/presentation-audit.json').read_text())
doc=pdfium.PdfDocument('D:/# Courses By Me/# Digilians/Content/PL 300/Dump/PL-300 Final 2.pdf')
markers=[];pages=[]
for pi in range(len(doc)):
    page=doc[pi];tp=page.get_textpage();text=tp.get_text_range();pages.append((page,tp,text))
    for match in re.finditer(r'NEW QUESTION\s+(\d+)',text):
        markers.append({'number':int(match[1]),'page':pi,'top':tp.get_charbox(match.start())[3]})
out=root/'public/native-exhibits';out.mkdir(exist_ok=True)
manifest={};report=[]
# Explicitly reviewed figure indexes. Answer-area images are excluded; those
# belong to the typed interaction, not the exhibit. No unreviewed auto-crop is
# made visible just because it happens to share a PDF page.
approved={20:[0],26:[0],27:[0],38:[0],48:[0],50:[0],61:[0],76:[0],105:[0],111:[0],130:[0],137:[0,1],143:[0],157:[0],161:[0,1],167:[0],174:[0],177:[0,1],184:[0],197:[0],201:[0],202:[0],222:[0,1],232:[0,1],239:[0,1,2],266:[0],300:[0],315:[0,1],336:[0],337:[0],349:[0],353:[0],355:[0],381:[0],403:[0],407:[0]}
for q in data['questions']:
    if q['source']!='Final 2' or not q.get('image') or q['excluded']:continue
    at=next((i for i,m in enumerate(markers) if m['number']==q['sourceNumber']),None)
    if at is None:continue
    start=markers[at];end=markers[at+1] if at+1<len(markers) else {'page':len(doc)-1,'top':0}
    figures=[]
    for pi in range(start['page'],end['page']+1):
        page,tp,text=pages[pi];upper=start['top'] if pi==start['page'] else page.get_height()-55
        lower=end['top']+5 if pi==end['page'] else 25
        for match in re.finditer(r'Answer\s*Area|Answer\s*:',text,re.I):
            y=tp.get_charbox(match.start())[3]
            if lower<y<upper:lower=max(lower,y)
        if lower>=upper:continue
        for obj in page.get_objects():
            if obj.type!=3:continue
            left,bottom,right,top=obj.get_bounds();width,height=obj.get_px_size()
            if width<160 or height<65 or (bottom+top)/2>upper or (bottom+top)/2<lower:continue
            name=f"{q['id']}-{len(figures)+1}.webp";im=obj.get_bitmap().to_pil().convert('RGB');im.save(out/name,'WEBP',lossless=True)
            figures.append({'src':f'/native-exhibits/{name}','width':im.width,'height':im.height})
        if re.search(r'Answer\s*:',text,re.I) and lower>25:break
    figures=[figure for i,figure in enumerate(figures) if i in approved.get(q['sourceNumber'],[])]
    if figures:manifest[q['id']]=figures
    report.append({'id':q['id'],'sourceNumber':q['sourceNumber'],'figures':len(figures)})
(root/'lib/native-exhibit-data.ts').write_text('// Extracted losslessly from original PDF figures; see scripts/extract-native-exhibits.py.\nexport const nativeExhibitData: Record<string, {src:string;width:number;height:number}[]> = '+json.dumps(manifest,indent=2)+';\n',encoding='utf-8')
(root/'.openai/native-exhibit-audit.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'questions':len(manifest),'figures':sum(map(len,manifest.values()))}))
