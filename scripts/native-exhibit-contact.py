import json,re,sys,subprocess
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[1]
first='--first' in sys.argv
items=json.loads((root/'.openai/first-native-candidates.json').read_text()) if first else json.loads(subprocess.check_output(['node','--experimental-strip-types','--input-type=module','-e',"import {nativeExhibitData} from './lib/native-exhibit-data.ts'; console.log(JSON.stringify(nativeExhibitData));"],cwd=root,text=True))
if first:items={k:v[:1] for k,v in items.items()}
tiles=[(key,figure) for key,figures in items.items() for figure in figures]
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',14)
for start in range(0,len(tiles),16):
    sheet=Image.new('RGB',(1600,1200),'#eee');draw=ImageDraw.Draw(sheet)
    for i,(key,figure) in enumerate(tiles[start:start+16]):
        x=(i%4)*400;y=(i//4)*300;draw.text((x+4,y+4),key+' '+figure['src'].split('-')[-1],font=font,fill='blue')
        im=Image.open(Path(figure['src']) if first else root/'public'/figure['src'].lstrip('/'));im.thumbnail((390,270));sheet.paste(im,(x+4,y+25))
    sheet.save(root/f'.openai/native-exhibits-{"first-" if first else ""}{start//16+1}.png')
