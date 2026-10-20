import json
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[1]
d=json.loads((root/'.openai/presentation-audit.json').read_text())
tiles=[]
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',15)
for q in d['dropdowns']:
    canvas=Image.new('RGB',(430,480),'#eee');draw=ImageDraw.Draw(canvas)
    draw.text((8,5),f"{q['bankNumber']} | {q['id']}",font=font,fill='black')
    y=32
    for i,m in enumerate(q['menus']):
        if m['image'].endswith('.svg'): continue
        im=Image.open(root/'public'/m['image'].lstrip('/')).convert('RGB');im.thumbnail((410,180))
        draw.text((5,y),f'Menu {i+1}',font=font,fill='blue');y+=20
        canvas.paste(im,(5,y));y+=im.height+10
    tiles.append(canvas)
for start in range(0,len(tiles),8):
    sheet=Image.new('RGB',(1720,960),'white')
    for k,im in enumerate(tiles[start:start+8]):sheet.paste(im,((k%4)*430,(k//4)*480))
    sheet.save(root/f'.openai/menus-{start//8+1}.png')
