"""Render the social promo. Requires Pillow, numpy, and FFmpeg with libx264.
Run: python3 scripts/render-promo.py --ffmpeg /path/to/ffmpeg
Content is read directly from portfolioData.js through Node.
"""
import argparse, json, math, subprocess, wave
from pathlib import Path
from functools import lru_cache
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
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
portrait=Image.open(ROOT/'public'/P['avatar'].lstrip('/')).convert('RGB')

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

cuts=[0,3,5,9,13,17,20,24]

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
  label(d,(X,y-90*unit),'A LITTLE CURIOSITY.',int(22*unit),MINT)
  y=lines(d,'Something useful.',X,y,w-2*X if v else 1150*unit,size)
  if local>.65:
   label(d,(X,y+55*unit),'Thoughtful websites. Powerful systems.',int((30 if v else 32)*unit),GRAY,'body')
  # Drawing line resolves into an emerald corner, a recurring visual motif.
  yy=int((1350 if v else 800)*unit)
  d.line((X,yy,X+(w-2*X)*ease(local/2),yy),fill=MINT,width=5)
  if not v:label(d,(1420*unit,430*unit),'D',int(320*unit),MINT)
 elif idx==1:
  y=int((400 if v else 300)*unit+dy)
  label(d,(X,y-80*unit),'MEET THE MAKER',int(22*unit),MINT)
  y=lines(d,P['name'],X,y,850*unit if v else 1000*unit,int((122 if v else 128)*unit))
  label(d,(X,y+24*unit),P['headline'],int(42*unit),GRAY,'body')
  side=int((420 if v else 480)*unit);px=int((w-side)/2 if v else w-side-130*unit);py=int(930*unit if v else 260*unit)
  photo=portrait.resize((side,side),Image.Resampling.LANCZOS);mask=Image.new('L',(side,side));ImageDraw.Draw(mask).rounded_rectangle((0,0,side,side),radius=40,fill=255);im.paste(photo,(px,py),mask)
 elif idx in (2,3,4):
  n=idx-2;proj=PROJECTS[n];title=['Spaces, reimagined.','Fresh ideas. Real orders.','Make time for more.'][n]
  y=int((355 if v else 260)*unit+dy)
  label(d,(X,y-65*unit),f'0{n+1} / '+['DIGITAL EXPERIENCES','E-COMMERCE','AUTOMATION'][n],int(22*unit),MINT)
  end=lines(d,title,X,y,(w-2*X) if v else 680*unit,int((92 if v else 94)*unit))
  label(d,(X,end+35*unit),proj['title'],int(32*unit),WHITE,'body')
  if v:card(im,n,72*unit,(820+dy/unit)*unit,936*unit,p)
  else:card(im,n,(840+(1-enter)*110)*unit,250*unit,990*unit,p)
  d=ImageDraw.Draw(im)
  caption=['Interior design & 3D architecture','Campus food ordering','Web scraping & automation'][n]
  label(d,(X,(1510 if v else 840)*unit),caption,int((28 if v else 25)*unit),GRAY,'body')
 elif idx==5:
  y=int((430 if v else 220)*unit); words=['Design.','Build.','Automate.']
  for i,word in enumerate(words):
   f=ease((local-i*.35)/.5);xx=X+(1-f)*80*unit
   label(d,(xx,y+i*(180 if v else 170)*unit),word,int((142 if v else 145)*unit),[WHITE,MINT,CYAN][i])
  label(d,(X,(1200 if v else 820)*unit),'FROM IDEA TO LAUNCH',int(25*unit),GRAY)
 else:
  y=int((450 if v else 220)*unit+dy)
  label(d,(X,y-75*unit),'HAVE SOMETHING IN MIND?',int(23*unit),MINT)
  end=lines(d,'Let’s make it real.',X,y,(w-2*X) if v else 1250*unit,int((118 if v else 138)*unit))
  label(d,(X,end+80*unit),'ardhrubo.dev',int((74 if v else 88)*unit),MINT)
  label(d,(X,end+200*unit),P['email'],int(30*unit),GRAY,'body')
  label(d,(X,(1460 if v else 880)*unit),'EXPLORE THE WORK',int(24*unit),WHITE)
 # Brief editorial wipe on cuts, fully clear before reading time starts.
 if idx and local<.28:
  edge=int(w*(1-ease(local/.28)));d=ImageDraw.Draw(im);d.rectangle((0,0,edge,h),fill='#173d32');d.rectangle((edge,0,edge+8,h),fill=MINT)
 fade=min(1,t/.35,(DURATION-t)/.65)
 if fade<1:im=Image.blend(Image.new('RGB',(w,h),(10,12,16)),im,max(0,fade))
 return im

def soundtrack():
 sr=48000;total=sr*DURATION;out=np.zeros((total,2));rng=np.random.default_rng(23)
 def mix(start,sound,pan=0):
  n=min(len(sound),total-int(start*sr));pos=int(start*sr)
  if n>0:out[pos:pos+n,0]+=sound[:n]*(.7-pan*.2);out[pos:pos+n,1]+=sound[:n]*(.7+pan*.2)
 # Original 100 BPM pulse with warm suspended chords and a sparse melody.
 chords=[[146.83,220,293.66,349.23],[130.81,196,261.63,329.63],[174.61,261.63,349.23,440],[164.81,246.94,329.63,392]]
 for bar in range(10):
  start=bar*2.4;t=np.arange(int(2.5*sr))/sr
  env=np.minimum(t/.15,1)*np.exp(-t*.9)*np.minimum((2.5-t)/.3,1)
  pad=sum(np.sin(2*np.pi*f*t)+.18*np.sin(2*np.pi*f*2*t) for f in chords[bar%4])*.028*env;mix(start,pad)
 for beat in range(40):
  start=beat*.6;t=np.arange(int(.38*sr))/sr
  kick=np.sin(2*np.pi*(48*t+7*(1-np.exp(-t*25))))*np.exp(-t*13)*.24;mix(start,kick)
  if beat%2:
   noise=rng.normal(0,1,len(t));mix(start,noise*np.exp(-t*38)*.045)
  ht=np.arange(int(.1*sr))/sr;mix(start+.3,rng.normal(0,1,len(ht))*np.exp(-ht*75)*.025,(-1)**beat*.4)
  f=chords[(beat//4)%4][beat%4]*2;t=np.arange(int(.55*sr))/sr
  mix(start+.15,(np.sin(2*np.pi*f*t)+.25*np.sin(2*np.pi*f*2*t))*np.exp(-t*9)*.065,(-1)**beat*.7)
 for cut in cuts[1:-1]:
  t=np.arange(int(.35*sr))/sr;noise=rng.normal(0,1,len(t));sm=np.convolve(noise,np.ones(10)/10,mode='same');mix(cut-.12,sm*np.sin(np.pi*t/.35)**2*.13)
 envelope=np.minimum(np.arange(total)/sr/.5,1)*np.minimum((DURATION-np.arange(total)/sr)/1.2,1)
 out=np.tanh(out*1.5)*envelope[:,None];out=out/max(1,np.max(np.abs(out))/.8)
 path=OUT/'promo-original-soundtrack.wav'
 with wave.open(str(path),'wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes((out*32767).astype('<i2').tobytes())
 return path

audio=soundtrack()
for name,w,h in [('vertical',1080,1920),('widescreen',1920,1080)]:
 bg=background(w,h)
 # Cover is the CTA; review sheet samples every scene.
 scene(21.5,w,h,bg).save(OUT/f'portfolio-promo-{name}-poster.jpg',quality=94)
 samples=[scene(t,w,h,bg) for t in [1.5,4,7,11,15,18.5,22]]
 thumbw=270 if name=='vertical' else 480;thumbh=int(thumbw*h/w)
 sheet=Image.new('RGB',(thumbw*4,thumbh*2),(10,12,16))
 for i,im in enumerate(samples):sheet.paste(im.resize((thumbw,thumbh)),((i%4)*thumbw,(i//4)*thumbh))
 sheet.save(OUT/f'promo-review-{name}.jpg',quality=90)
 if opt.preview:continue
 target=OUT/f'portfolio-promo-{name}.mp4'
 cmd=[opt.ffmpeg,'-y','-loglevel','warning','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(FPS),'-i','pipe:0','-i',str(audio),'-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart','-t',str(DURATION),str(target)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 try:
  for frame in range(FPS*DURATION):
   proc.stdin.write(scene(frame/FPS,w,h,bg).tobytes())
   if frame%150==0:print(name,frame//FPS,'seconds rendered',flush=True)
 finally:proc.stdin.close()
 if proc.wait():raise RuntimeError('Video encoding failed')
 print('EXPORTED',target,flush=True)
