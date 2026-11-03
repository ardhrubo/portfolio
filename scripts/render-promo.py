"""Render the social promo. Requires Pillow, numpy, and FFmpeg with libx264.
Run: python3 scripts/render-promo.py --ffmpeg /path/to/ffmpeg
Content is read directly from portfolioData.js through Node.
"""
import argparse, json, math, subprocess
from pathlib import Path
from functools import lru_cache
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/media'; OUT.mkdir(exist_ok=True)
args=argparse.ArgumentParser(); args.add_argument('--ffmpeg',default='ffmpeg'); args.add_argument('--preview',action='store_true'); opt=args.parse_args()
content=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {personalInfo,projectsData,promoReelData} from './src/data/portfolioData.js';console.log(JSON.stringify({personalInfo,projects:promoReelData.projectIds.map(id=>projectsData.find(p=>p.id===id))}))"],cwd=ROOT))
P=content['personalInfo']; PROJECTS=content['projects']; FPS=30; DURATION=24
WHITE='#f2f4f2'; MINT='#69e7af'; GRAY='#b3c4c2'; CYAN='#83d7f2'
@lru_cache(None)
def font(size,kind='heading'):
 path={'heading':'space-grotesk-400-700.woff2','body':'dm-sans-400-700.woff2','mono':'jetbrains-mono-400-600.woff2'}[kind]
 f=ImageFont.truetype(str(ROOT/'public/fonts'/path),int(size))
 if kind=='heading':f.set_variation_by_axes([600])
 return f

def rounded(draw, box, **kwargs):
 draw.rounded_rectangle(tuple(round(value) for value in box), **kwargs)

def ease(x):return 1-(1-max(0,min(1,x)))**4

def label(draw,xy,text,size=22,fill=GRAY,kind='mono'):
 draw.text(xy,text,font=font(size,kind),fill=fill,stroke_width=0)

def lines(draw,text,x,y,maxwidth,size,fill=WHITE,leading=1.08):
 f=font(size); words=text.split(); rows=[]; row=''
 for word in words:
  test=(row+' '+word).strip()
  if draw.textlength(test,font=f)>maxwidth and row:rows.append(row);row=word
  else:row=test
 rows.append(row)
 for row in rows:draw.text((x,y),row,font=f,fill=fill);y+=size*leading
 return y

screens=[Image.open(ROOT/'public'/p['image'].lstrip('/')).convert('RGB') for p in PROJECTS]


def background(w,h):
 y,x=np.mgrid[0:h,0:w]; nx=x/w;ny=y/h
 rgb=np.zeros((h,w,3),dtype=np.float32)+np.array([10,12,16])
 for cx,cy,r,col in [(.18,.2,.65,[7,42,30]),(.94,.65,.6,[28,15,49]),(.1,1,.7,[7,28,40])]:
  a=np.exp(-((nx-cx)**2+(ny-cy)**2)/(r*r)*3)[...,None];rgb+=a*np.array(col)
 im=Image.fromarray(np.uint8(np.clip(rgb,0,255)));d=ImageDraw.Draw(im)
 for xx in range(20,w,22):
  for yy in range(20,h,22):
   alpha=.5+.5*math.sin(xx/w*5+yy/h*4)
   d.ellipse((xx,yy,xx+1,yy+1),fill=(int(30+alpha*15),int(55+alpha*15),int(52+alpha*15)))
 return im

def card(im,index,x,y,width,phase):
 width=int(width);bar=max(25,int(width*.044));height=int(width*.625)
 panel=Image.new('RGB',(width,height+bar),(25,29,34));d=ImageDraw.Draw(panel)
 for i in range(3):d.ellipse((17+i*14,bar//2-3,23+i*14,bar//2+3),fill=(92,108,111))
 label(d,(int(width*.15),bar*.17),PROJECTS[index]['url'].split('//')[-1].strip('/'),max(12,int(width*.018)))
 # A slow camera push across the real project screenshot.
 source=screens[index]; zoom=1.015+.035*max(0,min(1,phase));sw,sh=source.size
 cropw=sw/zoom;croph=sh/zoom
 cut=source.crop(((sw-cropw)/2,(sh-croph)*phase*.8,(sw+cropw)/2,(sh-croph)*phase*.8+croph))
 panel.paste(cut.resize((width,height),Image.Resampling.LANCZOS),(0,bar))
 mask=Image.new('L',panel.size);ImageDraw.Draw(mask).rounded_rectangle((0,0,width-1,height+bar-1),radius=20,fill=255)
 im.paste(panel,(int(x),int(y)),mask)
 ImageDraw.Draw(im).rounded_rectangle((int(x),int(y),int(x)+width-1,int(y)+height+bar-1),radius=20,outline='#66736e',width=1)

def blueprint(im,rect,t):
 d=ImageDraw.Draw(im);x,y,w,h=rect;scale=w/800
 # Interface parts assemble along a flowing connection path.
 points=[]
 for i in range(100):
  u=i/99;points.append((x+w*u,y+h*.55+math.sin(u*math.pi*2+t*.8)*h*.28))
 d.line(points,fill='#32695a',width=max(1,int(2*scale)))
 for k in range(4):
  u=(t*.17+k*.25)%1;px=x+w*u;py=y+h*.55+math.sin(u*math.pi*2+t*.8)*h*.28
  r=5*scale;d.ellipse((px-r,py-r,px+r,py+r),fill=MINT)
 for i,(ox,oy,ww,hh) in enumerate([(0,.06,.66,.72),(.39,.35,.59,.61)]):
  e=ease((t-i*.18)/.8);yy=y+oy*h+(1-e)*h*.2+math.sin(t*1.5+i)*7*scale;xx=x+ox*w
  rw=ww*w;rh=hh*h
  rounded(d, (xx,yy,xx+rw,yy+rh),radius=int(16*scale),fill='#152b2c',outline='#638f82',width=max(1,int(2*scale)))
  d.line((xx,yy+rh*.16,xx+rw,yy+rh*.16),fill='#426e60',width=1)
  for j in range(3):
   cx=xx+(18+j*15)*scale;cy=yy+rh*.08;d.ellipse((cx-3*scale,cy-3*scale,cx+3*scale,cy+3*scale),fill=MINT)
  left=xx+rw*.08;top=yy+rh*.26
  rounded(d, (left,top,left+rw*.5*e,top+rh*.08),radius=3,fill='#c1e3d5')
  for j in range(2):rounded(d, (left,top+rh*(.15+j*.09),left+rw*(.75-j*.18)*e,top+rh*(.19+j*.09)),radius=2,fill='#4e7a70')
  rounded(d, (left,yy+rh*.72,left+rw*.38,yy+rh*.87),radius=int(8*scale),fill='#36ae7d')

cuts=[0,3,5,8,11,14,19,24]

def scene(t,w,h,bg):
 im=bg.copy(); d=ImageDraw.Draw(im);v=h>w;unit=w/1080 if v else w/1920
 X=int(96*unit);safe=int(170*unit) if v else 80
 label(d,(X,safe),P['name'],int(25*unit),WHITE)
 label(d,(X,h-(240 if v else 80)*unit),'PORTFOLIO / ARDHRUBO.DEV',int(19*unit),GRAY)
 d.line((X,h-(270 if v else 110)*unit,w-X,h-(270 if v else 110)*unit),fill='#354a43',width=1)
 idx=next((i for i in range(7) if cuts[i]<=t<cuts[i+1]),6);local=t-cuts[idx];length=cuts[idx+1]-cuts[idx];p=local/length
 enter=ease(local/.65);dy=(1-enter)*65*unit
 if idx==0:
  y=int((490 if v else 260)*unit+dy);size=int((122 if v else 138)*unit)
  label(d,(X,y-90*unit),'GOT A PROJECT IN MIND?',int(22*unit),MINT)
  y=lines(d,'See what’s possible.',X,y,w-2*X if v else 1150*unit,size)
  if local>.65:
   label(d,(X,y+55*unit),'Websites. Apps. Automation.',int((30 if v else 32)*unit),GRAY,'body')
  # Drawing line resolves into an emerald corner, a recurring visual motif.
  yy=int((1350 if v else 800)*unit)
  d.line((X,yy,X+(w-2*X)*ease(local/2),yy),fill=MINT,width=5)
  blueprint(im, (1250*unit,300*unit,560*unit,380*unit) if not v else (160*unit,1000*unit,760*unit,420*unit),local)
 elif idx==1:
  y=int((370 if v else 280)*unit+dy)
  label(d,(X,y-70*unit),'YOUR IDEA, TAKING SHAPE',int(22*unit),MINT)
  end=lines(d,'Made for your next move.',X,y,850*unit if v else 850*unit,int((106 if v else 110)*unit))
  label(d,(X,end+45*unit),'Explore the work. Imagine your project.',int(29*unit),GRAY,'body')
  blueprint(im,(120*unit,940*unit,840*unit,470*unit) if v else (1080*unit,280*unit,680*unit,420*unit),local)
 elif idx in (2,3,4):
  n=idx-2;proj=PROJECTS[n];title=['Spaces, reimagined.','Fresh ideas. Real orders.','Make time for more.'][n]
  y=int((355 if v else 260)*unit+dy)
  label(d,(X,y-65*unit),['DIGITAL EXPERIENCES','E-COMMERCE','AUTOMATION'][n],int(22*unit),MINT)
  end=lines(d,title,X,y,(w-2*X) if v else 680*unit,int((92 if v else 94)*unit))
  label(d,(X,end+35*unit),proj['title'],int(32*unit),WHITE,'body')
  if v:card(im,n,72*unit,(820+dy/unit)*unit,936*unit,p)
  else:card(im,n,(840+(1-enter)*110)*unit,250*unit,990*unit,p)
  d=ImageDraw.Draw(im)
  caption=['Interior design & 3D architecture','Campus food ordering','Web scraping & automation'][n]
  label(d,(X,(1510 if v else 840)*unit),caption,int((28 if v else 25)*unit),GRAY,'body')
 elif idx==5:
  y=int((330 if v else 180)*unit)
  label(d,(X,y-65*unit),'TOOLS WITH A PURPOSE',int(22*unit),MINT)
  lines(d,'Built thoughtfully.',X,y,w-2*X,int((96 if v else 108)*unit))
  groups=[('WEB EXPERIENCES','React  /  Next.js'),('AUTOMATION','Python  /  Puppeteer'),('AI WORKFLOW','Claude Code  /  Codex  /  Hermes Agent')]
  for i,(role,tools) in enumerate(groups):
   f=ease((local-i*.45)/.65);xx=X+(1-f)*100*unit
   yy=(650+i*240)*unit if v else (390+i*155)*unit
   rounded(d, (xx,yy,xx+(w-2*X if v else 1160*unit),yy+(180 if v else 120)*unit),radius=int(20*unit),fill='#142526',outline='#355b51',width=1)
   label(d,(xx+30*unit,yy+24*unit),role,int(20*unit),MINT)
   label(d,(xx+30*unit,yy+78*unit),tools,int((38 if v else 38)*unit),WHITE,'body')
  if not v:blueprint(im,(1390*unit,400*unit,390*unit,290*unit),local)
 else:
  y=int((450 if v else 220)*unit+dy)
  label(d,(X,y-75*unit),'YOUR NEXT PROJECT STARTS HERE',int(23*unit),MINT)
  end=lines(d,'Visit my site. Let’s build your project.',X,y,(w-2*X) if v else 1250*unit,int((96 if v else 112)*unit))
  label(d,(X,end+80*unit),'ardhrubo.dev',int((74 if v else 88)*unit),MINT)
  label(d,(X,end+200*unit),P['email'],int(30*unit),GRAY,'body')
  cy=(1430 if v else 835)*unit
  rounded(d, (X,cy,X+(880 if v else 920)*unit,cy+90*unit),radius=int(18*unit),fill=MINT)
  label(d,(X+30*unit,cy+24*unit),'Explore the work. Book your project.',int(32*unit),'#10271d','body')
 # Brief editorial wipe on cuts, fully clear before reading time starts.
 if idx and local<.28:
  edge=int(w*(1-ease(local/.28)));d=ImageDraw.Draw(im);d.rectangle((0,0,edge,h),fill='#173d32');d.rectangle((edge,0,edge+8,h),fill=MINT)
 fade=min(1,t/.35,(DURATION-t)/.65)
 if fade<1:im=Image.blend(Image.new('RGB',(w,h),(10,12,16)),im,max(0,fade))
 return im

for name,w,h in [('vertical',1080,1920),('widescreen',1920,1080)]:
 bg=background(w,h)
 # Cover is the CTA; review sheet samples every scene.
 scene(21.5,w,h,bg).save(OUT/f'portfolio-promo-{name}-poster.jpg',quality=94)
 samples=[scene(t,w,h,bg) for t in [1.5,4,6.5,9.5,12.5,17,22]]
 thumbw=270 if name=='vertical' else 480;thumbh=int(thumbw*h/w)
 sheet=Image.new('RGB',(thumbw*4,thumbh*2),(10,12,16))
 for i,im in enumerate(samples):sheet.paste(im.resize((thumbw,thumbh)),((i%4)*thumbw,(i//4)*thumbh))
 sheet.save(OUT/f'promo-review-{name}.jpg',quality=90)
 if opt.preview:continue
 target=OUT/f'portfolio-promo-{name}.mp4'
 temporary=OUT/f'.portfolio-promo-{name}.rendering.mp4'
 cmd=[opt.ffmpeg,'-y','-loglevel','warning','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(FPS),'-i','pipe:0','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-an','-movflags','+faststart','-t',str(DURATION),str(temporary)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 try:
  for frame in range(FPS*DURATION):
   proc.stdin.write(scene(frame/FPS,w,h,bg).tobytes())
   if frame%150==0:print(name,frame//FPS,'seconds rendered',flush=True)
 finally:proc.stdin.close()
 if proc.wait():raise RuntimeError('Video encoding failed')
 temporary.replace(target)
 print('EXPORTED',target,flush=True)
