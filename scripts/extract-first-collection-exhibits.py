"""Candidate original figures with exact, unique prompt matches. QA before approval."""
import json,re
from pathlib import Path
import pypdfium2 as pdfium
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'.openai/presentation-audit.json').read_text())
doc=pdfium.PdfDocument('D:/# Courses By Me/# Digilians/Content/PL 300/Dump/PL-300 Final.pdf')
def normal(text):return re.sub('[^a-z0-9]','',text.lower())
pages=[];joined='';offsets=[]
for pi in range(len(doc)):
    page=doc[pi];tp=page.get_textpage();text=tp.get_text_range()
    clean='';indices=[]
    for ci,ch in enumerate(text):
        if ch.lower() in 'abcdefghijklmnopqrstuvwxyz0123456789':clean+=ch.lower();indices.append(ci)
    offsets.append(len(joined));joined+=clean;pages.append((page,tp,text,clean,indices))
out=root/'.openai/first-native-candidates';out.mkdir(exist_ok=True)
manifest={};skipped=[]
safe_manual={q['id'] for q in data['dropdowns']+data['yesNo']}
for q in data['questions']:
    if q['source']!='Final' or not q.get('image') or q['excluded'] or q.get('context') or (q['type']=='manual' and q['id'] not in safe_manual):continue
    prompt=re.sub(r'^(?:HOTSPOT|DRAG DROP)\s*-?\s*','',q['prompt'],flags=re.I)
    needle=normal(prompt)[:180]
    if len(needle)<60:continue
    matches=[m.start() for m in re.finditer(re.escape(needle),joined)]
    if len(matches)!=1:skipped.append({'id':q['id'],'reason':'non-unique prompt','matches':len(matches)});continue
    start=matches[0];pi=max(i for i,o in enumerate(offsets) if o<=start)
    page,tp,text,clean,indices=pages[pi];ci=indices[start-offsets[pi]];upper=tp.get_charbox(ci)[3]+12
    figures=[]
    for pindex in range(pi,min(pi+3,len(pages))):
        page,tp,text,clean,indices=pages[pindex]
        top=upper if pindex==pi else page.get_height()-35;lower=25;found_end=False
        for match in re.finditer(r'\bAnswer\s*:',text,re.I):
            y=tp.get_charbox(match.start())[3]
            if 25<y<top:lower=max(lower,y);found_end=True
        for obj in page.get_objects():
            if obj.type!=3:continue
            l,b,r,t=obj.get_bounds();w,h=obj.get_px_size()
            if w<160 or h<65 or not lower<(b+t)/2<top:continue
            im=obj.get_bitmap().to_pil().convert('RGB')
            hist=im.convert('L').histogram()
            if sum(hist[:235])/(im.width*im.height)<.012 or im.convert('L').entropy()<.6:continue
            name=f"{q['id']}-{len(figures)+1}.webp";im.save(out/name,'WEBP',lossless=True)
            figures.append({'src':str(out/name),'width':im.width,'height':im.height})
        if found_end:break
    if figures:manifest[q['id']]=figures
(root/'.openai/first-native-candidates.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({'questions':len(manifest),'figures':sum(map(len,manifest.values())),'skipped':len(skipped)}))
