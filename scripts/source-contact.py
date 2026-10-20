import json,sys
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[1];d=json.loads((root/'.openai/presentation-audit.json').read_text())
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18)
# Only QA sheets. Never alter the question's source image.
kind='yesNo' if '--yes-no' in sys.argv else 'dropdowns'
for start in range(0,len(d[kind]),4):
 canvas=Image.new('RGB',(1800,1500),'#eee');draw=ImageDraw.Draw(canvas)
 for k,q in enumerate(d[kind][start:start+4]):
  path=root/'public/dump-assets'/f"{q['id']}-question.webp"
  if not path.exists():continue
  im=Image.open(path).convert('RGB');im=im.crop((0,int(im.height*.48),im.width,im.height));im.thumbnail((890,690))
  x=(k%2)*900;y=(k//2)*750
  draw.text((x+5,y+5),f"{q['bankNumber']} | {q['id']}",font=font,fill='blue');canvas.paste(im,(x,y+35))
 canvas.save(root/f'.openai/source-{kind}-{start//4+1}.png')
