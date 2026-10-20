import json
from pathlib import Path
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'.openai/case-candidates.json').read_text())['385'][:8]
sheet=Image.new('RGB',(1500,1500),'#eee');d=ImageDraw.Draw(sheet)
for i,figure in enumerate(data):
 x=i%2*750;y=i//2*375
 im=Image.open(figure['src']);im.thumbnail((730,340));sheet.paste(im,(x+10,y+25));d.text((x+10,y+5),str(i+1),fill='blue')
sheet.save(root/'.openai/northwind-case-review.png')
