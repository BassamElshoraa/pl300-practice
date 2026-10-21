import json,sys
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[1]
items=json.loads((root/'.openai/content-review/drag-ocr-large-input.json').read_text())
groups={}
for item in items:groups.setdefault(item['id'].split(':')[0],[]).append(item)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',20)
start=int(sys.argv[1]) if len(sys.argv)>1 else 0
for offset in range(start,min(start+6,len(groups)),6):
 sheet=Image.new('RGB',(2000,3000),'#eee');d=ImageDraw.Draw(sheet)
 for n,(id,options) in enumerate(list(groups.items())[offset:offset+6]):
  x=n%2*1000;y=n//2*1000;d.text((x+10,y+5),id,font=font,fill='blue')
  for i,item in enumerate(options):
   im=Image.open(item['path']);im.thumbnail((945,90));d.text((x+3,y+45+i*95),str(i),font=font,fill='blue');sheet.paste(im,(x+35,y+40+i*95))
 sheet.save(root/f'.openai/content-review/drag-choices-{offset//6+1}.png')
