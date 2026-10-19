/* The neuromuscular junction and contraction. Oct 17 2026. Week 6,
   walkthrough 1 of 4. Week 6 competencies 1 to 5 (Study Guide numbers):
   1 neuromuscular junction, 2 excitation-contraction coupling,
   3 crossbridge cycle, 4 calcium and the regulatory proteins,
   5 relaxation and calcium removal. The first section builds the muscle
   from the whole organ down to the sarcomere and the sliding filaments.
   Panels, each shown and hidden per step:
   - build: a whole muscle with its tendons, one fascicle, one fiber
   - fiber: inside a fiber: sarcolemma, T tubules, the SR with its terminal
     cisternae, and two myofibrils
   - sarc: one sarcomere with Z discs, thick and thin filaments, titin and
     the bands; it shortens when the filaments slide
   - nmj: a motor neuron, its axon terminal, the cleft and the folded end
     plate, with a recording of the voltage at the end plate
   - ec: a T tubule between two terminal cisternae with DHP and ryanodine
     receptors, SERCA pumps, and a thin filament below
   - ecx: skeletal and heart muscle coupling side by side
   - thin: a thin filament close up with tropomyosin, troponin and myosin heads
   - cyc: one myosin head stepping through the crossbridge cycle, with a ruler
   - fail: blocked acetylcholinesterase and stopped SERCA side by side
   - rev: the whole chain from motor neuron to sarcomere, for the review
   Every hands-on step uses promptAt and waitOn from w05-kit.js, so Next
   stays locked until the student has done the action. */

/* Oct 17 2026: a step left behind stops dead. The shell's timers and the
   kit's waitOn resolve when the student moves to another step, so the rest
   of the old chain would run and change the new step's figure. These
   versions, declared here so they replace the shared ones for this
   walkthrough only, simply never finish once the step has changed. */
function wait(ms,anim){if(!(anim&&!reduce))return Promise.resolve();var my=runId;return new Promise(function(r){setTimeout(function(){if(my===runId)r();},ms);});}
function tweenVal(from,to,dur,anim,cb){
  if(!anim||reduce){cb(to);return Promise.resolve();}
  return new Promise(function(res){var t0=performance.now(),my=runId;
    function f(now){if(my!==runId)return;var t=Math.min(1,(now-t0)/dur);cb(from+(to-from)*ease(t));if(t<1)requestAnimationFrame(f);else res();}
    requestAnimationFrame(f);});
}
function tweenPath(g,pts,dur,anim){
  if(!anim||reduce){var q=pts[pts.length-1];place(g,q[0],q[1]);return Promise.resolve();}
  return new Promise(function(res){
    var segs=[],tot=0,prev=[g._x,g._y];
    pts.forEach(function(q){var d=Math.hypot(q[0]-prev[0],q[1]-prev[1]);segs.push({a:prev,b:q,d:d});tot+=d;prev=q;});
    var t0=performance.now(),my=runId;
    function f(now){
      if(my!==runId)return;
      var t=Math.min(1,(now-t0)/dur),dist=ease(t)*tot;
      for(var i=0;i<segs.length;i++){var s=segs[i];if(dist<=s.d||i===segs.length-1){var r=s.d?Math.min(1,dist/s.d):1;place(g,s.a[0]+(s.b[0]-s.a[0])*r,s.a[1]+(s.b[1]-s.a[1])*r);break;}dist-=s.d;}
      if(t<1)requestAnimationFrame(f);else res();
    }
    requestAnimationFrame(f);
  });
}
function waitOn(tgt,prm,a){
  if(!a||reduce){if(prm)prm.setAttribute("display","none");return Promise.resolve();}
  if(prm)prm.setAttribute("display","");
  tgt.style.cursor="pointer";
  return new Promise(function(res){var my=runId,done=false,k=0,t;setTimeout(function(){if(!done)lockNext(true);},0);
    function fin(){if(done)return;done=true;clearInterval(t);tgt.removeEventListener("click",fin);document.removeEventListener("keydown",key,true);if(prm)prm.setAttribute("display","none");if(my===runId){lockNext(false);res();}}
    function key(e){if((e.key==="Enter"||e.key===" ")&&!/TEXTAREA|INPUT|BUTTON|SELECT|^A$/.test(e.target.tagName||"")){e.preventDefault();fin();}}
    tgt.addEventListener("click",fin);document.addEventListener("keydown",key,true);
    t=setInterval(function(){if(my!==runId){fin();return;}k++;if(prm&&prm._ring){var r0=+prm._ring.getAttribute("data-r");prm._ring.setAttribute("r",r0+((k%10)<5?(k%5):5-(k%5))*2);}},70);});}

var SRF="#FFF6E0",MEMB="#C9CFDB",BEAD="#EBC7BE"; /* SR, membrane and actin fills, figures only */
function show(list,on){list.forEach(function(g){g.setAttribute("display",on?"":"none");});}
/* a rounded label like a molecule tag: ATP, ADP, Pi */
function pill(p,s,col,w){var g=el("g",{},p);el("rect",{x:-w/2,y:-12,width:w,height:24,rx:12,fill:col,stroke:"#fff","stroke-width":2},g);var t=el("text",{"class":"iw","font-size":13},g);t.textContent=s;g.setAttribute("display","none");place(g,0,0);return g;}
/* a gold button drawn in the figure */
function btn(p,x,y,w,h,s){var g=el("g",{role:"button",tabindex:"0"},p);g._r=el("rect",{x:x,y:y,width:w,height:h,rx:h/2,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},g);g._t=tx(g,x+w/2,y+h/2+5,s,"tn",14,"middle");g.setAttribute("aria-label",s);return g;}
function btnDone(g,on){g._r.setAttribute("fill",on?"#EEF0F3":"#FFF6D6");g._r.setAttribute("stroke",on?INK2:GOLD);g._r.setAttribute("stroke-width",on?1.5:3);}
/* a channel drawn as two halves that part when it opens */
function chan(p,x,y,col,h){var g=el("g",{},p);g._L=el("rect",{x:-8,y:-h/2,width:7,height:h,rx:2,fill:col},g);g._R=el("rect",{x:1,y:-h/2,width:7,height:h,rx:2,fill:col},g);g._col=col;place(g,x,y);return g;}
function chanOpen(g,k,col){g._L.setAttribute("x",-8-4*k);g._R.setAttribute("x",1+4*k);var c=k>0.5&&col?col:g._col;g._L.setAttribute("fill",c);g._R.setAttribute("fill",c);}
function ion(p,x,y,s,col){var g=badge(p,x,y,s,col,10);g._hx=x;g._hy=y;return g;}
function home(g){place(g,g._hx,g._hy);g.setAttribute("display","");}
function leader(p,x1,y1,x2,y2){return el("line",{x1:x1,y1:y1,x2:x2,y2:y2,stroke:INK2,"stroke-width":1.5},p);}
function zig(x0,x1,y,n,amp){var d="M"+x0+" "+y,st=(x1-x0)/n;for(var i=1;i<n;i++){d+=" L"+(x0+st*i).toFixed(1)+" "+(y+(i%2?-amp:amp));}return d+" L"+x1+" "+y;}

/* ======================= a muscle, a fascicle, a fiber (step 1) ======================= */
var gBuild=G("build");
el("line",{x1:14,y1:250,x2:54,y2:250,stroke:"#D9D3C3","stroke-width":12,"stroke-linecap":"round"},gBuild);
el("line",{x1:266,y1:250,x2:306,y2:250,stroke:"#D9D3C3","stroke-width":12,"stroke-linecap":"round"},gBuild);
var MUS="M50 250 C100 160 220 160 270 250 C220 340 100 340 50 250 Z";
el("path",{d:MUS,fill:TISS,stroke:MAROON,"stroke-width":3},gBuild);
[-2,-1,0,1,2].forEach(function(i){el("path",{d:"M56 250 C110 "+(250+i*30)+" 210 "+(250+i*30)+" 264 250",fill:"none",stroke:MAROON,"stroke-width":1.5,opacity:.55},gBuild);});
tx(gBuild,34,228,"tendon","t",12,"middle");
tx(gBuild,160,370,"a whole muscle","tn",15,"middle");tx(gBuild,160,390,"such as the biceps","t",13,"middle");
var gZ1=el("g",{},gBuild);
el("rect",{x:140,y:234,width:40,height:32,fill:"none",stroke:NAVY,"stroke-width":2,"stroke-dasharray":"5 4"},gZ1);
el("line",{x1:180,y1:234,x2:336,y2:190,stroke:NAVY,"stroke-width":1.5,"stroke-dasharray":"5 4"},gZ1);el("line",{x1:180,y1:266,x2:336,y2:310,stroke:NAVY,"stroke-width":1.5,"stroke-dasharray":"5 4"},gZ1);
var gFas=el("g",{},gBuild);
el("rect",{x:360,y:190,width:200,height:120,fill:TISS,stroke:MAROON,"stroke-width":3},gFas);
for(var fy=202;fy<=298;fy+=12)el("line",{x1:362,y1:fy,x2:558,y2:fy,stroke:MAROON,"stroke-width":1,opacity:.4},gFas);
el("ellipse",{cx:360,cy:250,rx:26,ry:60,fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},gFas);
[[-12,-36],[0,-44],[12,-36],[-14,-12],[0,-20],[14,-12],[-14,12],[0,4],[14,12],[-12,36],[0,28],[12,36],[0,48],[0,-4]].forEach(function(q){el("ellipse",{cx:360+q[0],cy:250+q[1],rx:5,ry:6,fill:TISS,stroke:MAROON,"stroke-width":1.2},gFas);});
tx(gFas,460,370,"a fascicle","tn",15,"middle");tx(gFas,460,390,"a bundle of muscle fibers","t",13,"middle");
var gZ2=el("g",{},gFas);
el("rect",{x:500,y:238,width:40,height:24,fill:"none",stroke:NAVY,"stroke-width":2,"stroke-dasharray":"5 4"},gZ2);
el("line",{x1:540,y1:238,x2:606,y2:215,stroke:NAVY,"stroke-width":1.5,"stroke-dasharray":"5 4"},gZ2);el("line",{x1:540,y1:262,x2:606,y2:285,stroke:NAVY,"stroke-width":1.5,"stroke-dasharray":"5 4"},gZ2);
var gFb=el("g",{},gBuild);
el("rect",{x:620,y:215,width:240,height:70,fill:TISS,stroke:MAROON,"stroke-width":3},gFb);
for(var sx=634;sx<856;sx+=16)el("rect",{x:sx,y:216,width:8,height:68,fill:MAROON,opacity:.3},gFb);
[[668,224],[748,276],[818,224]].forEach(function(q){el("ellipse",{cx:q[0],cy:q[1],rx:10,ry:4.5,fill:NAVY,opacity:.65},gFb);});
el("ellipse",{cx:620,cy:250,rx:12,ry:35,fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},gFb);
tx(gFb,740,370,"a muscle fiber","tn",15,"middle");tx(gFb,740,390,"one long cell with many nuclei","t",13,"middle");
var musHit=el("path",{d:MUS,fill:"transparent"},gBuild);
var fasHit=el("rect",{x:330,y:186,width:236,height:128,fill:"transparent"},gBuild);
var pMus=promptAt(gBuild,40,460,["Click the muscle to look inside it"],120,330,160,250,56);
var pFas=promptAt(gBuild,380,460,["Now click the fascicle"],440,322,460,250,56);

/* ======================= inside a fiber (step 2) ======================= */
var gFiber=G("fiber");
el("rect",{x:60,y:20,width:780,height:46,fill:FLUID},gFiber);
tx(gFiber,70,48,"fluid outside the cell","t",13,"start");
tx(gFiber,830,48,"sarcolemma, the cell membrane","tn",13,"end");
var FTT=[170,370,510,710];
[150,284].forEach(function(y){
  el("rect",{x:60,y:y,width:780,height:70,fill:TISS,stroke:MAROON,"stroke-width":2},gFiber);
  [170,510].forEach(function(a){el("rect",{x:a,y:y+1,width:200,height:68,fill:MAROON,opacity:.4},gFiber);el("rect",{x:a+80,y:y+1,width:40,height:68,fill:TISS,opacity:.7},gFiber);el("line",{x1:a+100,y1:y,x2:a+100,y2:y+70,stroke:INK2,"stroke-width":1.5},gFiber);});
  [100,440,780].forEach(function(x){el("line",{x1:x,y1:y,x2:x,y2:y+70,stroke:NAVY,"stroke-width":3},gFiber);});
});
[118,252,386].forEach(function(cy){
  [[60,150],[190,350],[390,490],[530,690],[730,840]].forEach(function(s){
    el("rect",{x:s[0],y:cy-14,width:s[1]-s[0],height:9,rx:4.5,fill:SRF,stroke:GDEEP,"stroke-width":1.5},gFiber);
    el("rect",{x:s[0],y:cy+5,width:s[1]-s[0],height:9,rx:4.5,fill:SRF,stroke:GDEEP,"stroke-width":1.5},gFiber);});
  FTT.forEach(function(t){[-18,18].forEach(function(o){el("ellipse",{cx:t+o,cy:cy,rx:10,ry:20,fill:SRF,stroke:GDEEP,"stroke-width":2},gFiber);el("circle",{cx:t+o,cy:cy,r:3,fill:MAROON},gFiber);});});
});
el("rect",{x:60,y:64,width:780,height:12,fill:MEMB,stroke:NAVY,"stroke-width":2},gFiber);
var FTTR=FTT.map(function(t){return el("rect",{x:t-7,y:66,width:14,height:358,rx:7,fill:FLUID,stroke:NAVY,"stroke-width":2},gFiber);});
FTT.forEach(function(t){el("rect",{x:t-5,y:62,width:10,height:16,fill:FLUID},gFiber);});
var gFL=el("g",{},gFiber);
tx(gFL,70,452,"myofibril","tn",14,"start");leader(gFL,100,438,100,356);
tx(gFL,150,480,"T tubule","tn",14,"start");leader(gFL,176,466,170,426);
tx(gFL,300,452,"sarcoplasmic reticulum (SR): stores Ca2+","tn",14,"start");leader(gFL,440,438,440,404);
tx(gFL,360,480,"terminal cisternae, the swollen ends of the SR","t",14,"start");leader(gFL,664,468,692,408);
tx(gFL,760,452,"one triad","tn",13,"start");leader(gFL,772,438,730,402);
var ttHit=el("rect",{x:478,y:36,width:64,height:68,fill:"transparent"},gFiber);
var pTT=promptAt(gFiber,300,470,["Click the opening of a T tubule"],490,96,510,70,32);

/* ======================= one sarcomere (steps 3 and 4) ======================= */
var gSarc=G("sarc");
var THK=[180,270,360],THN=[135,225,315,405];
var gBands=el("g",{},gSarc);
var bA=el("g",{},gBands);el("path",{d:"M280 444 V456 H620 V444",fill:"none",stroke:NAVY,"stroke-width":2.5},bA);tx(bA,450,478,"A band","tn",14,"middle");
var bIL=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":2.5},gBands),bIR=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":2.5},gBands);
var tIL=tx(gBands,200,478,"I band","tm",14,"middle"),tIR=tx(gBands,700,478,"I band","tm",14,"middle");
var bH=el("path",{d:"",fill:"none",stroke:INK2,"stroke-width":2},gBands),tH=tx(gBands,450,98,"H zone","t",13,"middle");
tx(gBands,450,72,"M line","t",13,"middle");
el("line",{x1:450,y1:112,x2:450,y2:420,stroke:INK2,"stroke-width":2,"stroke-dasharray":"5 4"},gSarc);
THK.forEach(function(y){
  el("line",{x1:280,y1:y,x2:620,y2:y,stroke:NAVY,"stroke-width":10,"stroke-linecap":"round"},gSarc);
  for(var x=292;x<=392;x+=20){[-1,1].forEach(function(s){el("line",{x1:x,y1:y,x2:x-8,y2:y+s*15,stroke:NAVY,"stroke-width":3},gSarc);el("circle",{cx:x-8,cy:y+s*16,r:3.5,fill:NAVY},gSarc);});}
  for(x=508;x<=608;x+=20){[-1,1].forEach(function(s){el("line",{x1:x,y1:y,x2:x+8,y2:y+s*15,stroke:NAVY,"stroke-width":3},gSarc);el("circle",{cx:x+8,cy:y+s*16,r:3.5,fill:NAVY},gSarc);});}
});
var TIT=[];THK.forEach(function(y){TIT.push([el("path",{d:"",fill:"none",stroke:INK2,"stroke-width":1.6},gSarc),el("path",{d:"",fill:"none",stroke:INK2,"stroke-width":1.6},gSarc),y]);});
function zdisc(x){var pts=[];for(var y=112;y<=428;y+=12){pts.push([x+((y-112)/12%2?6:-6),y]);}return pts;}
var gSL=el("g",{},gSarc),gSR=el("g",{},gSarc);
THN.forEach(function(y){el("line",{x1:120,y1:y,x2:400,y2:y,stroke:MAROON,"stroke-width":5,"stroke-linecap":"round"},gSL);el("line",{x1:500,y1:y,x2:780,y2:y,stroke:MAROON,"stroke-width":5,"stroke-linecap":"round"},gSR);});
poly(gSL,zdisc(120),NAVY,4);poly(gSR,zdisc(780),NAVY,4);
var tZL=tx(gSL,120,100,"Z disc","tn",14,"middle"),tZR=tx(gSR,780,100,"Z disc","tn",14,"middle");
var gSN=el("g",{},gSarc);
tx(gSN,130,40,"thin filament: actin","tm",14,"start");leader(gSN,200,46,200,130);
tx(gSN,520,40,"thick filament: myosin","tn",14,"start");leader(gSN,580,46,580,172);
tx(gSN,340,40,"titin","t",14,"start");leader(gSN,352,46,240,264);
var SD=0;
function sarc(d){SD=d;gSL.setAttribute("transform","translate("+d+" 0)");gSR.setAttribute("transform","translate("+(-d)+" 0)");
  TIT.forEach(function(t){t[0].setAttribute("d",zig(120+d,280,t[2],8,5));t[1].setAttribute("d",zig(620,780-d,t[2],8,5));});
  bIL.setAttribute("d","M"+(120+d)+" 444 V456 H276 V444");bIR.setAttribute("d","M624 444 V456 H"+(780-d)+" V444");
  tIL.setAttribute("x",(120+d+280)/2);tIR.setAttribute("x",(620+780-d)/2);
  bH.setAttribute("d","M"+(400+d)+" 118 V108 H"+(500-d)+" V118");}
var zHit=el("rect",{x:88,y:108,width:64,height:324,fill:"transparent"},gSL);
var thkHit=el("rect",{x:276,y:160,width:348,height:220,fill:"transparent"},gSarc);
var pZ=promptAt(gSarc,170,478,["Click a Z disc to label the sarcomere"],132,322,120,270,38);
var pThk=promptAt(gSarc,600,40,["Click the thick filament","to make the heads pull"],520,168,450,270,40);

/* ======================= the neuromuscular junction (steps 5 to 9, 16) ======================= */
var gNmj=G("nmj");
var RX=[330,390,450,510,570,630],CAX=[380,460,540,620];
el("rect",{x:300,y:322,width:360,height:80,fill:FLUID},gNmj);
(function(){var d="M10 352 L330 352";[360,420,480,540,600].forEach(function(x){d+=" L"+(x-7)+" 352 L"+(x-7)+" 388 Q"+x+" 398 "+(x+7)+" 388 L"+(x+7)+" 352";});d+=" L890 352 L890 492 L10 492 Z";
  el("path",{d:d,fill:TISS,stroke:MAROON,"stroke-width":3},gNmj);})();
for(var nx=30;nx<880;nx+=36)el("rect",{x:nx,y:404,width:14,height:86,fill:MAROON,opacity:.12},gNmj);
/* the motor neuron */
el("circle",{cx:66,cy:100,r:26,fill:"#fff",stroke:NAVY,"stroke-width":4},gNmj);el("circle",{cx:66,cy:100,r:8,fill:NAVY,opacity:.5},gNmj);
[[44,84,22,66],[50,122,30,140],[70,74,72,50]].forEach(function(l){el("line",{x1:l[0],y1:l[1],x2:l[2],y2:l[3],stroke:NAVY,"stroke-width":4,"stroke-linecap":"round"},gNmj);});
poly(gNmj,[[92,100],[360,100],[440,150],[450,170]],NAVY,7);
[120,190,260].forEach(function(x){el("rect",{x:x,y:91,width:56,height:18,rx:9,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gNmj);});
tx(gNmj,66,146,"motor neuron","tn",13,"middle");tx(gNmj,220,82,"axon","t",13,"middle");
/* the axon terminal */
el("path",{d:"M430 166 C360 168 300 220 310 300 Q312 324 340 324 L620 324 Q648 324 650 300 C660 220 560 168 470 166 Z",fill:"#fff",stroke:NAVY,"stroke-width":4},gNmj);
tx(gNmj,300,244,"axon terminal","tn",14,"end");
function vesicle(p,x,y){var g=el("g",{},p);g._c=el("circle",{cx:0,cy:0,r:15,fill:"#fff",stroke:GDEEP,"stroke-width":2.5},g);[[-5,-3],[4,-6],[1,5]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:3,fill:GOLD},g);});place(g,x,y);return g;}
[[380,236],[440,214],[505,224],[570,244],[410,272],[470,262],[535,278],[598,276]].forEach(function(q){vesicle(gNmj,q[0],q[1]);});
var DOCK=[[420,305],[500,305],[580,305]].map(function(q){return vesicle(gNmj,q[0],q[1]);});
var NCA=CAX.map(function(x){return chan(gNmj,x,324,INK2,20);});
var NR=RX.map(function(x){return chan(gNmj,x,352,NAVY,22);});
var NNA=[140,780].map(function(x){return chan(gNmj,x,352,INK2,22);});
tx(gNmj,662,206,"vesicles of acetylcholine (ACh)","t",13,"start");leader(gNmj,664,212,612,256);
tx(gNmj,668,314,"voltage-gated Ca2+ channel","t",13,"start");leader(gNmj,666,310,628,322);
tx(gNmj,668,340,"synaptic cleft","t",13,"start");
tx(gNmj,668,378,"nicotinic ACh receptors","t",13,"start");leader(gNmj,666,372,636,358);
tx(gNmj,140,388,"voltage-gated Na+ channel","t",12,"middle");
tx(gNmj,480,426,"motor end plate","tm",14,"middle");tx(gNmj,30,476,"muscle fiber","tn",14,"start");
/* the end plate recording */
el("rect",{x:600,y:10,width:280,height:150,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gNmj);
tx(gNmj,610,28,"voltage at the end plate","t",13,"start");
el("line",{x1:610,y1:96,x2:870,y2:96,stroke:MAROON,"stroke-width":1.5,"stroke-dasharray":"6 5"},gNmj);tx(gNmj,612,112,"threshold","tm",12,"start");
var ePath=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":3,"stroke-linejoin":"round"},gNmj);
var sPath=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3,"stroke-linejoin":"round"},gNmj);
var sLab=tx(gNmj,724,48,"muscle action potential","tn",12,"start");
var gMar=el("g",{},gNmj);el("path",{d:"M756 96 H766 M761 96 V56 M756 56 H766",fill:"none",stroke:GDEEP,"stroke-width":2.5},gMar);tx(gMar,772,80,"safety margin","t",12,"start");
var recT=tx(gNmj,740,128,"","tm",13,"middle");
var MGT=[0,1,2,3].map(function(i){return tx(gNmj,694+i*54,0,"","t",11,"middle");});
function eppD(h,k){var y=146-h,x=612+168*k;return "M612 146 H680 C692 146 694 "+y+" 710 "+y+" C730 "+y+" 760 146 820 146 H868";}
function eppUp(h){return "M612 146 H680 C692 146 694 "+(146-h)+" 710 "+(146-h)+" H750";}
function mgD(n){var H=[66,56,46,40],d="M612 146";for(var i=0;i<n;i++){var c=694+i*54,y=146-H[i];d+=" H"+(c-20)+" C"+(c-12)+" 146 "+(c-10)+" "+y+" "+c+" "+y+" C"+(c+10)+" "+y+" "+(c+14)+" 146 "+(c+24)+" 146";}return d+" H868";}
/* moving parts */
var apN=dot(gNmj,MAROON,10),apL=dot(gNmj,MAROON,9),apR=dot(gNmj,MAROON,9);
var NCAI=CAX.map(function(x){return ion(gNmj,x,346,"Ca",MAROON);});
var ACHC=[],ACHB=[];for(var ai=0;ai<12;ai++){ACHC.push([345+ai*24.5,ai%2?330:337]);ACHB.push([RX[Math.floor(ai/2)]+(ai%2?5:-5),336]);}
var ACH=ACHC.map(function(q){var c=el("g",{},gNmj);el("circle",{r:4.5,fill:GOLD,stroke:GDEEP,"stroke-width":1},c);place(c,q[0],q[1]);return c;});
var NNAI=[390,510,570,450].map(function(x){return ion(gNmj,x,334,"Na",NAVY);}),NKI=[330,630].map(function(x){return ion(gNmj,x,384,"K",INK2);});
/* drugs, antibodies and the enzyme */
var gCurM=el("g",{},gNmj);RX.forEach(function(x){el("rect",{x:x-7,y:327,width:14,height:9,rx:2,fill:INK2},gCurM);});
var gBotM=el("g",{},gNmj);DOCK.forEach(function(v){el("path",{d:"M"+(v._x-10)+" "+(v._y-10)+" L"+(v._x+10)+" "+(v._y+10)+" M"+(v._x+10)+" "+(v._y-10)+" L"+(v._x-10)+" "+(v._y+10),stroke:MAROON,"stroke-width":3.5,"stroke-linecap":"round"},gBotM);});
var gMG=el("g",{},gNmj);[0,2,3,5].forEach(function(j){var x=RX[j];el("path",{d:"M"+x+" 340 V330 M"+x+" 330 L"+(x-6)+" 322 M"+x+" 330 L"+(x+6)+" 322",fill:"none",stroke:MAROON,"stroke-width":3,"stroke-linecap":"round"},gMG);});
tx(gMG,480,450,"antibodies block and destroy receptors","tm",13,"middle");
var MGOFF=[0,2,3,5];
var gAche=el("g",{},gNmj);var ACHE=[360,420,480,540,600];ACHE.forEach(function(x){el("rect",{x:x-9,y:328,width:18,height:9,rx:4.5,fill:GDEEP},gAche);});
tx(gAche,480,450,"acetylcholinesterase (AChE) in the cleft","t",13,"middle");
var PIECE=ACHC.map(function(){var g=el("g",{},gNmj);el("circle",{r:3,fill:INK2},g);g.setAttribute("display","none");return g;}); /* acetate */
var CHOL=ACHC.map(function(){var g=el("g",{},gNmj);el("circle",{r:3,fill:GOLD,stroke:GDEEP,"stroke-width":1},g);g.setAttribute("display","none");return g;}); /* choline */
var bCur=btn(gNmj,150,20,120,34,"curare"),bBot=btn(gNmj,290,20,180,34,"botulinum toxin");
var neuHit=el("circle",{cx:66,cy:100,r:36,fill:"transparent"},gNmj);
var cleftHit=el("rect",{x:330,y:324,width:300,height:28,fill:"transparent"},gNmj);
var pNeu=promptAt(gNmj,130,176,["Click the motor neuron"],88,124,66,100,36);
var pNeu4=promptAt(gNmj,130,176,["Click the motor neuron","to fire it four times"],88,124,66,100,36);
var pAch=promptAt(gNmj,60,300,["Click the ACh in the cleft"],440,334,480,338,26);
var pAche=promptAt(gNmj,60,300,["Click an AChE molecule in the cleft"],446,332,480,334,26);
var pCur=promptAt(gNmj,130,190,["Click curare to add it"],206,62,210,37,30);
var pBot=promptAt(gNmj,130,190,["Now click botulinum toxin"],372,62,380,37,30);
function nmjReset(){
  show([apN,apL,apR].concat(NCAI,NNAI,NKI,ACH,PIECE,CHOL),false);
  NCA.forEach(function(c){chanOpen(c,0);});NR.forEach(function(c){chanOpen(c,0);c.setAttribute("opacity",1);});NNA.forEach(function(c){chanOpen(c,0);});
  DOCK.forEach(function(v){v.setAttribute("display","");v._c.setAttribute("r",15);});
  ePath.setAttribute("d","M612 146 H868");sPath.setAttribute("d","");recT.textContent="";MGT.forEach(function(t){t.textContent="";});
  show([sLab,gMar,gCurM,gBotM,gMG,gAche,bCur,bBot],false);btnDone(bCur,false);btnDone(bBot,false);
}
function nmjAP(a,dur){return run(apN,[[92,100],[360,100],[440,150],[450,182]],dur||900,a);}
function nmjCa(a){return tweenVal(0,1,250,a,function(k){NCA.forEach(function(c){chanOpen(c,k,MAROON);});}).then(function(){
  return Promise.all(NCAI.map(function(g,i){return run(g,[[CAX[i],348],[CAX[i],300]],450,a);}));});}
function nmjRelease(a){return tweenVal(15,0,350,a,function(r){DOCK.forEach(function(v){v._c.setAttribute("r",r);});}).then(function(){
  DOCK.forEach(function(v){v.setAttribute("display","none");});
  return Promise.all(ACH.map(function(g,i){var s=DOCK[i%3];return run(g,[[s._x,320],ACHC[i]],450,a,true);}));});}
function nmjBind(a,h){return Promise.all(ACH.map(function(g,i){return run(g,[ACHB[i]],350,a,true);})).then(function(){
  return tweenVal(0,1,250,a,function(k){NR.forEach(function(c){chanOpen(c,k,MAROON);});});}).then(function(){
  return Promise.all(NNAI.map(function(g){return run(g,[[g._hx,334],[g._hx,384]],700,a);}).concat(NKI.map(function(g){return run(g,[[g._hx,384],[g._hx,334]],700,a);})).concat([tweenVal(0,1,700,a,function(k){ePath.setAttribute("d",eppD(h*k));})]));});}
function nmjMuscle(a){sPath.setAttribute("d","M696 96 L706 40 L718 140 Q732 150 754 146");sLab.setAttribute("display","");
  return tweenVal(0,1,250,a,function(k){NNA.forEach(function(c){chanOpen(c,k,MAROON);});}).then(function(){return Promise.all([run(apL,[[330,352],[14,352]],900,a),run(apR,[[630,352],[886,352]],900,a)]);});}

/* ======================= the triad: T tubule and SR (steps 10 and 17) ======================= */
var gEc=G("ec");
el("rect",{x:40,y:14,width:820,height:38,fill:FLUID},gEc);tx(gEc,50,38,"fluid outside the cell","t",13,"start");tx(gEc,850,38,"sarcolemma","t",13,"end");
el("rect",{x:50,y:196,width:160,height:54,rx:22,fill:SRF,stroke:GDEEP,"stroke-width":2.5},gEc);el("rect",{x:690,y:196,width:160,height:54,rx:22,fill:SRF,stroke:GDEEP,"stroke-width":2.5},gEc);
el("rect",{x:205,y:116,width:208,height:214,rx:44,fill:SRF,stroke:GDEEP,"stroke-width":3},gEc);el("rect",{x:487,y:116,width:208,height:214,rx:44,fill:SRF,stroke:GDEEP,"stroke-width":3},gEc);
el("rect",{x:40,y:52,width:820,height:12,fill:MEMB,stroke:NAVY,"stroke-width":2},gEc);
el("rect",{x:425,y:52,width:50,height:332,fill:FLUID},gEc);
el("path",{d:"M425 64 V382 Q450 404 475 382 V64",fill:"none",stroke:NAVY,"stroke-width":4},gEc);
el("rect",{x:427,y:50,width:46,height:16,fill:FLUID},gEc);
tx(gEc,484,100,"T tubule","tn",14,"start");tx(gEc,214,104,"terminal cisterna of the SR","tn",13,"start");
var DHPY=[176,232,288],DHP=[],RYR=[];
DHPY.forEach(function(y){[[425,406,413,417],[475,494,487,483]].forEach(function(s){
  el("line",{x1:s[2],y1:y,x2:s[3],y2:y,stroke:NAVY,"stroke-width":3},gEc);
  var r=el("g",{},gEc);r._a=el("rect",{x:-7,y:-14,width:14,height:13,rx:3,fill:MAROON},r);r._b=el("rect",{x:-7,y:1,width:14,height:13,rx:3,fill:MAROON},r);place(r,s[1],y);RYR.push(r);
  var d=el("g",{},gEc);el("rect",{x:-8,y:-14,width:16,height:28,rx:4,fill:NAVY},d);place(d,s[0],y);d._x0=s[0];d._y0=y;DHP.push(d);});});
function ecOpen(k){RYR.forEach(function(r){r._a.setAttribute("y",-14-6*k);r._b.setAttribute("y",1+6*k);});DHP.forEach(function(d){d.setAttribute("transform","translate("+d._x0+" "+d._y0+") rotate("+(28*k*(d._x0<450?1:-1))+")");});}
var gRecL=el("g",{},gEc);
tx(gRecL,500,352,"DHP receptor: the voltage sensor","tn",13,"start");leader(gRecL,498,346,480,292);
tx(gRecL,60,352,"ryanodine receptor: the Ca2+ release channel","tm",13,"start");leader(gRecL,350,344,402,298);
tx(gEc,850,372,"cytosol","t",13,"end");
/* the thin filament below */
for(var bx=60;bx<=840;bx+=24)el("circle",{cx:bx,cy:456,r:10,fill:BEAD,stroke:MAROON,"stroke-width":1},gEc);
for(bx=72;bx<=840;bx+=48)el("circle",{cx:bx,cy:449,r:4,fill:NAVY},gEc);
var gTmE=el("g",{},gEc);el("line",{x1:52,y1:449,x2:848,y2:449,stroke:GDEEP,"stroke-width":10,"stroke-linecap":"round",opacity:.92},gTmE);
var TNE=[180,420,660].map(function(x){return el("circle",{cx:x,cy:440,r:8,fill:NAVY,stroke:"#fff","stroke-width":1.5},gTmE);});
tx(gEc,60,424,"thin filament: actin with tropomyosin and troponin","t",13,"start");
/* SERCA pumps */
var gSer=el("g",{},gEc);[[290,324],[610,324],[130,244],[770,244]].forEach(function(q){el("rect",{x:q[0]-11,y:q[1]-6,width:22,height:12,rx:3,fill:GDEEP,stroke:"#fff","stroke-width":1.5},gSer);});
tx(gSer,100,280,"SERCA pump","tn",13,"start");
var serT=[tx(gEc,290,352,"uses ATP","tm",12,"middle"),tx(gEc,610,352,"uses ATP","tm",12,"middle")];
var CAH=[[260,160],[330,150],[250,220],[340,214],[280,280],[360,276]],CAT=[100,150,200,250,300,350,550,600,650,700,750,800];
var ECA=[];CAH.forEach(function(q){ECA.push(ion(gEc,q[0],q[1],"Ca",MAROON));});CAH.forEach(function(q){ECA.push(ion(gEc,900-q[0],q[1],"Ca",MAROON));});
ECA.forEach(function(g,i){g._tx=CAT[i];g._ty=i%2?396:388;g._ry=DHPY[Math.min(2,Math.floor((g._hy-130)/58))];g._rx=g._hx<450?406:494;});
var apE1=dot(gEc,MAROON,9),apE2=dot(gEc,MAROON,9);
var ttHitE=el("rect",{x:418,y:30,width:64,height:60,fill:"transparent"},gEc);
var serHit=el("rect",{x:262,y:304,width:56,height:40,fill:"transparent"},gEc);
var pTTE=promptAt(gEc,560,76,["Click the opening of the T tubule"],482,62,450,58,30);
var pSer=promptAt(gEc,40,300,["Click a SERCA pump"],262,322,290,324,28);
function ecReset(){ECA.forEach(home);ecOpen(0);gTmE.setAttribute("transform","");TNE.forEach(function(t){t.setAttribute("fill",NAVY);});show([apE1,apE2,gSer].concat(serT),false);gRecL.setAttribute("display","");}
function ecCaOut(){ECA.forEach(function(g){place(g,g._tx,g._ty);});gTmE.setAttribute("transform","translate(0 -16)");TNE.forEach(function(t){t.setAttribute("fill",MAROON);});}

/* ======================= skeletal and heart coupling (step 11) ======================= */
var gEcx=G("ecx");
tx(gEcx,220,44,"skeletal muscle","tn",16,"middle");tx(gEcx,680,44,"heart muscle","tn",16,"middle");
var XP=[];
[30,470].forEach(function(x0,i){var P={x0:x0,sk:i===0};
  el("rect",{x:x0,y:72,width:400,height:58,fill:FLUID},gEcx);tx(gEcx,x0+8,88,"fluid outside, with Ca2+","t",12,"start");
  P.out=[[x0+60,110],[x0+250,104],[x0+340,114]].map(function(q){return ion(gEcx,q[0],q[1],"Ca",MAROON);});
  el("rect",{x:x0+176,y:190,width:204,height:180,rx:36,fill:SRF,stroke:GDEEP,"stroke-width":3},gEcx);
  tx(gEcx,x0+280,362,"SR","tn",13,"middle");
  el("rect",{x:x0,y:130,width:400,height:10,fill:MEMB,stroke:NAVY,"stroke-width":2},gEcx);
  el("rect",{x:x0+120,y:130,width:40,height:272,fill:FLUID},gEcx);
  el("path",{d:"M"+(x0+120)+" 140 V400 Q"+(x0+140)+" 416 "+(x0+160)+" 400 V140",fill:"none",stroke:NAVY,"stroke-width":3.5},gEcx);
  el("rect",{x:x0+122,y:128,width:36,height:14,fill:FLUID},gEcx);
  tx(gEcx,x0+112,184,"T tubule","t",12,"end");
  var dy=P.sk?270:250,ry=P.sk?270:300;
  if(P.sk){el("line",{x1:x0+168,y1:dy,x2:x0+174,y2:dy,stroke:NAVY,"stroke-width":3},gEcx);P.dhp=el("g",{},gEcx);el("rect",{x:-8,y:-15,width:16,height:30,rx:4,fill:NAVY},P.dhp);place(P.dhp,x0+160,dy);}
  else{P.dhp=chan(gEcx,x0+160,dy,NAVY,30);}
  P.ryr=el("g",{},gEcx);P.ryr._a=el("rect",{x:-7,y:-14,width:14,height:13,rx:3,fill:MAROON},P.ryr);P.ryr._b=el("rect",{x:-7,y:1,width:14,height:13,rx:3,fill:MAROON},P.ryr);place(P.ryr,x0+181,ry);
  tx(gEcx,x0+112,dy-16,"DHP receptor","tn",12,"end");leader(gEcx,x0+100,dy-10,x0+152,dy-4);
  tx(gEcx,x0+112,ry+46,"ryanodine receptor","tm",12,"end");leader(gEcx,x0+100,ry+38,x0+174,ry+12);
  P.sr=[[x0+240,226],[x0+320,232],[x0+250,316],[x0+330,320]].map(function(q){return ion(gEcx,q[0],q[1],"Ca",MAROON);});
  P.res=[tx(gEcx,x0+200,446,P.sk?"still contracts":"no contraction",P.sk?"tn":"tm",16,"middle"),tx(gEcx,x0+200,468,P.sk?"its Ca2+ comes from the SR":"no Ca2+ comes in to open the SR","t",13,"middle")];
  P.ap=dot(gEcx,MAROON,8);
  XP.push(P);});
var bOut=btn(gEcx,340,20,220,34,"remove the Ca2+ outside");
var pOut=promptAt(gEcx,330,500-6,["Click the button to remove the Ca2+ outside"],420,62,450,37,30);
function ryrOpen(r,k){r._a.setAttribute("y",-14-6*k);r._b.setAttribute("y",1+6*k);}
function ecxReset(){XP.forEach(function(P){P.out.forEach(home);P.sr.forEach(home);ryrOpen(P.ryr,0);if(P.sk)P.dhp.setAttribute("transform","translate("+(P.x0+160)+" 270)");else chanOpen(P.dhp,0);show(P.res,false);P.ap.setAttribute("display","none");});btnDone(bOut,false);}

/* ======================= the thin filament close up (steps 12 and 13) ======================= */
var gThn=G("thin");
for(var ti=0;ti<27;ti++){el("circle",{cx:150+ti*26,cy:274,r:13,fill:BEAD,stroke:MAROON,"stroke-width":1.5},gThn);}
for(ti=0;ti<27;ti++){el("circle",{cx:163+ti*26,cy:250,r:13,fill:BEAD,stroke:MAROON,"stroke-width":1.5},gThn);}
for(ti=0;ti<27;ti+=2){el("circle",{cx:163+ti*26,cy:247,r:5,fill:NAVY},gThn);}
var gRope=el("g",{},gThn);
el("line",{x1:140,y1:247,x2:850,y2:247,stroke:GDEEP,"stroke-width":12,"stroke-linecap":"round",opacity:.95},gRope);
var TNX=[241,501,761],TNC=[];
TNX.forEach(function(x){el("circle",{cx:x-11,cy:231,r:6,fill:INK2,stroke:"#fff","stroke-width":1.5},gRope);el("circle",{cx:x+11,cy:231,r:6,fill:INK2,stroke:"#fff","stroke-width":1.5},gRope);TNC.push(el("circle",{cx:x,cy:226,r:8,fill:NAVY,stroke:"#fff","stroke-width":1.5},gRope));});
el("rect",{x:200,y:420,width:640,height:20,rx:10,fill:NAVY},gThn);
var HDX=[300,480,660],HEADS=HDX.map(function(x){var g=el("g",{},gThn);el("line",{x1:x,y1:420,x2:x+16,y2:340,stroke:NAVY,"stroke-width":7,"stroke-linecap":"round"},g);el("ellipse",{cx:x+22,cy:314,rx:16,ry:26,fill:NAVY},g);return g;});
function headsY(v){HEADS.forEach(function(h){h.setAttribute("transform","translate(0 "+v+")");});}
tx(gThn,16,200,"troponin","tn",14,"start");leader(gThn,84,204,228,226);
tx(gThn,16,240,"tropomyosin","t",14,"start");tx(gThn,16,292,"actin","tm",14,"start");
tx(gThn,16,336,"myosin head","tn",14,"start");leader(gThn,112,332,300,318);
tx(gThn,16,436,"thick filament","tn",14,"start");
var tSites=tx(gThn,560,160,"myosin binding sites, now uncovered","tm",13,"start");
var gCaT=el("g",{},gThn);var CAT3=[[440,130],[480,116],[520,132]].map(function(q){return ion(gCaT,q[0],q[1],"Ca",MAROON);});
var tCaT=tx(gThn,556,134,"Ca2+ released from the SR","t",13,"start");
var caTHit=el("rect",{x:420,y:96,width:120,height:56,fill:"transparent"},gThn);
var pCaT=promptAt(gThn,560,84,["Click the Ca2+ to release it"],524,106,480,124,40);
var bFire=btn(gThn,40,22,230,34,"fire the motor neuron");
var STAT=[["✓ end plate potential: normal","tn"],["✓ action potential in the T tubules: normal","tn"],["✗ ryanodine receptors: will not open","tm"],["✗ Ca2+ released from the SR: none","tm"]].map(function(s,i){return tx(gThn,310,40+i*22,s[0],s[1],13,"start");});
var pFire=promptAt(gThn,320,500-10,["Click the button to fire the motor neuron"],170,64,155,39,30);
function thinReset(){gRope.setAttribute("transform","");TNC.forEach(function(t){t.setAttribute("fill",NAVY);});headsY(14);CAT3.forEach(home);show([tSites,bFire].concat(STAT),false);gCaT.setAttribute("display","");tCaT.setAttribute("display","");btnDone(bFire,false);}

/* ======================= the crossbridge cycle (steps 14 and 15) ======================= */
var gCyc=G("cyc");
var gThin=el("g",{},gCyc);
el("line",{x1:-120,y1:214,x2:1020,y2:214,stroke:GDEEP,"stroke-width":5,opacity:.7},gThin);
for(var cb=-110;cb<1020;cb+=24){el("circle",{cx:cb,cy:252,r:11,fill:BEAD,stroke:MAROON,"stroke-width":1.2},gThin);el("circle",{cx:cb+12,cy:230,r:11,fill:BEAD,stroke:MAROON,"stroke-width":1.2},gThin);}
el("circle",{cx:398,cy:252,r:11,fill:GOLD,stroke:GDEEP,"stroke-width":2},gThin);
el("line",{x1:398,y1:241,x2:398,y2:186,stroke:GDEEP,"stroke-width":2.5},gThin);el("path",{d:"M398 186 L420 194 L398 202 Z",fill:GOLD,stroke:GDEEP,"stroke-width":1.5},gThin);
el("line",{x1:360,y1:170,x2:800,y2:170,stroke:INK2,"stroke-width":2},gCyc);
for(var rx=360;rx<=800;rx+=20)el("line",{x1:rx,y1:170,x2:rx,y2:(rx-360)%100?162:154,stroke:INK2,"stroke-width":2},gCyc);
tx(gCyc,360,144,"how far the thin filament has moved","t",13,"start");
arrow(gCyc,560,100,720,100,NAVY,5);tx(gCyc,550,106,"toward the M line","tn",14,"end");
tx(gCyc,16,296,"thin filament (actin)","tm",14,"start");
el("rect",{x:300,y:400,width:640,height:16,rx:8,fill:NAVY},gCyc);tx(gCyc,300,442,"thick filament (myosin)","tn",13,"start");
var gHd=el("g",{},gCyc);el("line",{x1:450,y1:408,x2:450,y2:326,stroke:NAVY,"stroke-width":10,"stroke-linecap":"round"},gHd);el("ellipse",{cx:450,cy:292,rx:22,ry:36,fill:NAVY},gHd);
el("rect",{x:640,y:290,width:240,height:70,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gCyc);tx(gCyc,652,312,"On the myosin head:","t",13,"start");
var HV=tx(gCyc,652,344,"","tm",20,"start");
tx(gCyc,16,330,"Stages of the cycle","tn",13,"start");
var STG=["1. binding","2. power stroke","3. detachment","4. reactivation"].map(function(s,i){return tx(gCyc,16,354+i*22,s,"t",14,"start");});
var piP=pill(gCyc,"Pi",GDEEP,36),adpP=pill(gCyc,"ADP",GDEEP,50),atpP=pill(gCyc,"ATP",MAROON,50);
var ATPS=[680,740,800].map(function(x){var g=pill(gCyc,"ATP",MAROON,50);place(g,x,382);return g;});
var tNoAtp=tx(gCyc,760,386,"no ATP left","tm",14,"middle"),tStuck=tx(gCyc,520,330,"stuck: rigor","tm",15,"start");
var bAtp=btn(gCyc,640,448,230,34,"take the ATP away");
var hdHit=el("rect",{x:370,y:240,width:160,height:160,fill:"transparent"},gCyc);
var pB=[["Click the myosin head:","binding"],["Click the head again:","power stroke"],["Click the head again:","detachment"],["Click the head again:","reactivation"]].map(function(l){return promptAt(gCyc,40,456,l,392,330,450,300,48);});
var pAtpB=promptAt(gCyc,330,476,["Click to take the ATP away"],600,466,755,465,34);
var pTry=promptAt(gCyc,40,466,["Click the head to try to free it"],392,330,450,300,48);
var HA=-20,HDY=16,THX=0;
function hdSet(ang,dy){HA=ang;HDY=dy;gHd.setAttribute("transform","translate(0 "+dy+") rotate("+ang+" 450 408)");}
function thinSet(x){THX=x;gThin.setAttribute("transform","translate("+x+" 0)");}
function stage(n){STG.forEach(function(t,i){t.setAttribute("class",i===n-1?"tm":"t");});}
function cycReset(){hdSet(-20,16);thinSet(0);stage(0);HV.textContent="ADP and Pi";show([piP,adpP,atpP,tNoAtp,tStuck,bAtp].concat(ATPS),false);btnDone(bAtp,false);}
function cycBind(a){stage(1);return tweenVal(16,0,500,a,function(v){hdSet(-20,v);});}
function cycStroke(a){stage(2);piP.setAttribute("display","");place(piP,416,300);HV.textContent="ADP";
  return run(piP,[[416,300],[560,250]],450,a).then(function(){return tweenVal(0,1,800,a,function(k){hdSet(-20+40*k,0);thinSet(98*k);});}).then(function(){
  adpP.setAttribute("display","");place(adpP,486,300);HV.textContent="nothing";return run(adpP,[[486,300],[600,250]],450,a);});}

/* ======================= when a shutoff fails (step 18) ======================= */
var gFail=G("fail");
tx(gFail,225,36,"acetylcholinesterase blocked","tn",15,"middle");tx(gFail,675,36,"SERCA stopped","tn",15,"middle");
el("rect",{x:80,y:134,width:290,height:28,fill:FLUID},gFail);
el("rect",{x:80,y:54,width:290,height:80,rx:28,fill:"#fff",stroke:NAVY,"stroke-width":3},gFail);tx(gFail,225,92,"axon terminal","t",12,"middle");
el("rect",{x:40,y:162,width:370,height:66,fill:TISS,stroke:MAROON,"stroke-width":2.5},gFail);tx(gFail,52,218,"end plate","t",12,"start");
var FR=[120,180,240,300,360].map(function(x){return chan(gFail,x,162,NAVY,18);});
var FE=[150,210,270,330];FE.forEach(function(x){el("rect",{x:x-9,y:142,width:18,height:9,rx:4.5,fill:GDEEP},gFail);});
var gFX=el("g",{},gFail);FE.forEach(function(x){el("path",{d:"M"+(x-8)+" 138 L"+(x+8)+" 154 M"+(x+8)+" 138 L"+(x-8)+" 154",stroke:MAROON,"stroke-width":3,"stroke-linecap":"round"},gFX);});
var FACH=[];for(var fi=0;fi<18;fi++){var c0=el("g",{},gFail);el("circle",{r:4,fill:GOLD,stroke:GDEEP,"stroke-width":1},c0);place(c0,92+fi*15.5,fi%2?140:152);FACH.push(c0);}
el("rect",{x:520,y:54,width:310,height:80,rx:28,fill:SRF,stroke:GDEEP,"stroke-width":3},gFail);tx(gFail,675,84,"sarcoplasmic reticulum","t",12,"middle");
var FS=[580,675,770];FS.forEach(function(x){el("rect",{x:x-11,y:128,width:22,height:12,rx:3,fill:GDEEP,stroke:"#fff","stroke-width":1.5},gFail);});
var gSX=el("g",{},gFail);FS.forEach(function(x){el("path",{d:"M"+(x-9)+" 124 L"+(x+9)+" 144 M"+(x+9)+" 124 L"+(x-9)+" 144",stroke:MAROON,"stroke-width":3,"stroke-linecap":"round"},gSX);});
tx(gFail,856,170,"cytosol","t",12,"end");
for(var fb=500;fb<=850;fb+=22)el("circle",{cx:fb,cy:212,r:9,fill:BEAD,stroke:MAROON,"stroke-width":1},gFail);
var gTmF=el("g",{},gFail);el("line",{x1:494,y1:206,x2:856,y2:206,stroke:GDEEP,"stroke-width":8,"stroke-linecap":"round"},gTmF);
var FCA=[[560,108],[630,110],[720,108],[790,110]].map(function(q){var g=ion(gFail,q[0],q[1],"Ca",MAROON);g._tx=530+(q[0]-560)*1.1;return g;});
var bOrg=btn(gFail,95,248,260,34,"add an organophosphate"),bSer=btn(gFail,560,248,230,34,"stop SERCA");
el("rect",{x:40,y:300,width:370,height:174,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gFail);tx(gFail,50,320,"muscle fiber action potentials","t",12,"start");
el("rect",{x:490,y:300,width:370,height:174,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gFail);tx(gFail,500,320,"force","t",12,"start");
var fTr1=trainPath(gFail,MAROON,2.5),fTr2=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3},gFail);
var fT1=tx(gFail,225,466,"fires again and again, then stops","tm",12,"middle"),fT2=tx(gFail,675,466,"stays contracted: cannot relax","tm",12,"middle");
function fTrain(k){return trainWin(50,446,350,0.04,0.04+0.5*k,Math.round(9*k),100)+"";}
function fForce(k){var x=500+350*k;if(x<540)return "M500 446 H"+x;var y=446-Math.min(1,(x-540)/30)*80;return "M500 446 H540 C552 446 556 366 572 366 H"+Math.max(572,x);}
var pOrg=promptAt(gFail,40,500-6,["Click to add the organophosphate"],170,286,225,265,30);
var pSerF=promptAt(gFail,470,500-6,["Now click to stop SERCA"],640,286,675,265,30);
function failReset(){show([gFX,gSX,fT1,fT2].concat(FACH),false);FR.forEach(function(c){chanOpen(c,0);});FCA.forEach(home);gTmF.setAttribute("transform","");fTr1.setAttribute("d","M50 446 H400");fTr2.setAttribute("d","M500 446 H850");btnDone(bOrg,false);btnDone(bSer,false);}

/* ======================= the whole chain (review) ======================= */
var gRev=G("rev");
el("rect",{x:120,y:166,width:750,height:226,rx:30,fill:TISS,stroke:MAROON,"stroke-width":3},gRev);
el("circle",{cx:60,cy:58,r:20,fill:"#fff",stroke:NAVY,"stroke-width":4},gRev);el("circle",{cx:60,cy:58,r:6,fill:NAVY,opacity:.5},gRev);
poly(gRev,[[80,58],[240,58],[262,126]],NAVY,6);
el("rect",{x:226,y:126,width:74,height:40,rx:16,fill:"#fff",stroke:NAVY,"stroke-width":3},gRev);
el("rect",{x:412,y:164,width:16,height:190,rx:8,fill:FLUID,stroke:NAVY,"stroke-width":2.5},gRev);el("rect",{x:414,y:162,width:12,height:8,fill:FLUID},gRev);
el("rect",{x:362,y:214,width:46,height:120,rx:16,fill:SRF,stroke:GDEEP,"stroke-width":2},gRev);el("rect",{x:432,y:214,width:46,height:120,rx:16,fill:SRF,stroke:GDEEP,"stroke-width":2},gRev);
var RCH=[[385,240],[385,274],[385,308],[455,240],[455,274],[455,308]];
var RCA=RCH.map(function(q){var c=el("circle",{r:6,fill:MAROON,stroke:"#fff","stroke-width":1.5},gRev);var g=el("g",{},gRev);g.appendChild(c);place(g,q[0],q[1]);g._hx=q[0];g._hy=q[1];return g;});
var gRL=el("g",{},gRev),gRR=el("g",{},gRev);
[250,292,334].forEach(function(y){el("line",{x1:640,y1:y,x2:760,y2:y,stroke:NAVY,"stroke-width":7,"stroke-linecap":"round"},gRev);});
[229,271,313,355].forEach(function(y){el("line",{x1:560,y1:y,x2:690,y2:y,stroke:MAROON,"stroke-width":4},gRL);el("line",{x1:710,y1:y,x2:840,y2:y,stroke:MAROON,"stroke-width":4},gRR);});
el("line",{x1:560,y1:212,x2:560,y2:372,stroke:NAVY,"stroke-width":5},gRL);el("line",{x1:840,y1:212,x2:840,y2:372,stroke:NAVY,"stroke-width":5},gRR);
function revS(d){gRL.setAttribute("transform","translate("+d+" 0)");gRR.setAttribute("transform","translate("+(-d)+" 0)");}
var RB=[[160,38],[322,134],[263,192],[452,190],[512,234],[600,196],[700,380],[386,356]].map(function(q,i){return badge(gRev,q[0],q[1],String(i+1),i===7?GDEEP:(i%2?MAROON:NAVY),12);});
var RL=["1  The motor neuron fires.","2  Ca2+ enters the terminal and ACh is released.","3  ACh opens receptors: the end plate potential.","4  An action potential runs down the T tubules.","5  DHP pulls the ryanodine receptor open: Ca2+ out.","6  Ca2+ binds troponin and uncovers the sites.","7  Crossbridges cycle and the sarcomere shortens.","8  AChE and SERCA end it, and the fiber relaxes."].map(function(s,i){return tx(gRev,i<4?24:468,418+(i%4)*22,s,"tn",13,"start");});
var rAp=dot(gRev,MAROON,8),rAp2=dot(gRev,MAROON,7);
var RACH=[0,1,2].map(function(i){var g=el("g",{},gRev);el("circle",{r:4,fill:GOLD,stroke:GDEEP,"stroke-width":1},g);g.setAttribute("display","none");return g;});
var revHit=el("circle",{cx:60,cy:58,r:32,fill:"transparent"},gRev);
var pRev=promptAt(gRev,300,40,["Click the motor neuron to run it all"],98,52,60,58,32);
function revStep(n){RB.forEach(function(b,i){b.setAttribute("display",i<n?"":"none");});RL.forEach(function(t,i){t.setAttribute("opacity",i<n?1:0.3);});}
function revReset(){revStep(0);revS(0);RCA.forEach(home);show([rAp,rAp2].concat(RACH),false);}

makeCap();
function resetAll(){
  show([gFas,gZ1,gFb,gZ2,gFL],false);FTTR.forEach(function(r){r.setAttribute("stroke",NAVY);r.setAttribute("stroke-width",2);});
  sarc(0);gBands.setAttribute("display","");gSN.setAttribute("display","");show([tZL,tZR],true);
  nmjReset();ecReset();ecxReset();thinReset();cycReset();failReset();revReset();
  cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}

/* ======================= steps ======================= */
var STEPS=[
{sec:"How a skeletal muscle is built",
 title:"From a whole muscle to one fiber",
 text:["Skeletal muscles are the muscles you move on purpose, the ones attached to your bones by tendons. Inside, a skeletal muscle is built like a cable. The whole muscle is wrapped in connective tissue and divided into bundles called fascicles, and each fascicle is a bundle of muscle fibers.","A muscle fiber is a single muscle cell, but an unusual one. It is very long for a cell, and it has many nuclei, because it formed when many smaller cells fused together during development. Click the muscle to look inside it, then click the fascicle."],
 name:"muscle fiber",
 auto:true,
 desc:"A whole muscle shaped like a spindle, with a tendon at each end and faint lines showing its bundles. When the student clicks the muscle, a dashed box zooms in on one bundle, a fascicle, drawn as a cylinder whose cut end shows many small muscle fibers. When the student clicks the fascicle, a second zoom shows one muscle fiber, a long striped cylinder with several nuclei along its edge.",
 pre:function(){S(["build"]);},
 play:function(a){return waitOn(musHit,pMus,a).then(function(){show([gZ1,gFas],true);return wait(300,a);}).then(function(){return waitOn(fasHit,pFas,a);}).then(function(){show([gZ2,gFb],true);cap("A muscle is a bundle of bundles of long cells.");});}},

{title:"Inside a muscle fiber",
 text:["Most of the inside of a muscle fiber is packed with myofibrils, long rods of contractile proteins that run the length of the cell. They are the part that actually shortens. The cell membrane of a muscle fiber is called the sarcolemma.","Two other structures wrap around the myofibrils. The sarcoplasmic reticulum, or SR, is the muscle fiber's version of the endoplasmic reticulum. It forms a sleeve of tubes around each myofibril and stores calcium ions, Ca2+. Its swollen ends are called terminal cisternae. The transverse tubules, or T tubules, are narrow tunnels of sarcolemma that dip deep into the fiber between the terminal cisternae. One T tubule with a terminal cisterna on each side is called a triad. Click the opening of a T tubule."],
 ask:"A T tubule is part of the cell membrane, but it runs deep inside the cell. What fills a T tubule, cytosol or fluid from outside the cell, and why would a muscle fiber need these tunnels?",
 ans:["Fluid from outside the cell. A T tubule is the sarcolemma folded inward, so its inside is open to the extracellular fluid, just like the surface of the cell. When an action potential travels along the sarcolemma, it also travels down every T tubule, deep into the fiber.","A muscle fiber is wide, so a signal that stayed on the surface would reach the myofibrils in the middle late. The T tubules carry it inside, right up against the terminal cisternae where the Ca2+ is stored, so the whole fiber responds at once."],
 name:"T tubules and sarcoplasmic reticulum",
 desc:"A side view inside a muscle fiber. Along the top is the sarcolemma with fluid from outside the cell above it. Two striped myofibrils run across the fiber. Around them, gold sleeves of sarcoplasmic reticulum swell into terminal cisternae, each holding a dot of calcium. Four T tubules dip down from openings in the sarcolemma, each passing between two terminal cisternae. When the student clicks the opening of a T tubule, it is outlined in maroon and labels appear: myofibril, T tubule, sarcoplasmic reticulum, terminal cisternae and one triad.",
 pre:function(){S(["fiber"]);},
 play:function(a){return waitOn(ttHit,pTT,a).then(function(){FTTR[2].setAttribute("stroke",MAROON);FTTR[2].setAttribute("stroke-width",4);gFL.setAttribute("display","");cap("T tubules carry the surface signal deep inside.");});}},

{title:"The sarcomere",
 text:["Each myofibril is a chain of repeating units called sarcomeres, lined up end to end. The sarcomere is the unit that contracts, and it is marked off at each end by a Z disc.","Inside a sarcomere are two kinds of filaments. Thick filaments are made of the protein myosin, and their heads stick out toward the filaments around them. Thin filaments are made mostly of the protein actin, and each one is anchored to a Z disc. Two more proteins, tropomyosin and troponin, lie along the thin filament and control when myosin can bind to it. A huge elastic protein, titin, runs from each Z disc to the middle of the sarcomere, the M line. It holds the thick filaments in place and springs back after the muscle is stretched. Click a Z disc to label the sarcomere."],
 ask:"Under a microscope, skeletal muscle has alternating dark and light stripes. Using the filaments in the figure, what makes a band dark, and what makes a band light?",
 ans:["The dark band, the A band, is where the thick filaments are. It runs the full length of the thick filaments, and near its ends the thin filaments overlap them. The light band, the I band, holds only thin filaments, so it looks lighter. Each I band is split down the middle by a Z disc, so half of it belongs to each of two neighboring sarcomeres.","In the middle of the A band is a lighter region, the H zone, where there are thick filaments but no thin ones. The M line runs down the center of the H zone and holds the thick filaments together. These stripes are why skeletal muscle is called striated muscle."],
 name:"sarcomere",
 desc:"One sarcomere, large. A zigzag Z disc stands at each end. Maroon thin filaments of actin reach in from each Z disc, and navy thick filaments of myosin, with small heads along both ends, sit in the middle, overlapping the thin filaments. Springy gray titin runs from each Z disc to the thick filaments. A dashed M line runs down the center. When the student clicks a Z disc, labels appear: the thin filament, the thick filament, titin, the Z discs, the M line, the H zone in the middle, the A band under the thick filaments and an I band at each end.",
 pre:function(){S(["sarc"]);show([gBands,gSN,tZL,tZR],false);},
 play:function(a){return waitOn(zHit,pZ,a).then(function(){show([gBands,gSN,tZL,tZR],true);cap("Thick filaments make the dark A band.");});}},

{title:"Sliding filaments",
 text:["When a muscle contracts, each sarcomere gets shorter. Researchers in the 1950s found that the filaments themselves do not get shorter. Instead, the myosin heads grab the thin filaments and pull them toward the M line, so the thick and thin filaments slide past each other and overlap more. This is called the sliding filament theory. Click the thick filament to make the myosin heads pull."],
 ask:"As the sarcomere shortens, which of these get shorter: the A band, the I band, the H zone, or the filaments themselves?",
 ans:["The I band and the H zone get shorter, and the Z discs move closer together. The A band stays the same length, because it is the length of the thick filaments, and neither kind of filament changes length. They only slide.","So the stripes show how much the filaments overlap. A shorter I band and a narrower H zone mean more overlap and a shorter sarcomere. All the sarcomeres along a myofibril shorten together, which is how a fiber pulls on its tendon."],
 name:"sliding filament theory",
 desc:"The labeled sarcomere. When the student clicks the thick filament, the thin filaments and Z discs slide in toward the M line. The brackets under the sarcomere show the I bands shrinking while the A band stays the same length, and the bracket for the H zone at the top narrows almost to nothing. The titin springs compress.",
 pre:function(){S(["sarc"]);gSN.setAttribute("display","none");},
 play:function(a){return waitOn(thkHit,pThk,a).then(function(){return tweenVal(0,46,1400,a,sarc);}).then(function(){cap("The filaments slide, but they do not get shorter.");});}},

{sec:"At the neuromuscular junction",comp:"Competency 1",
 title:"The command arrives",
 text:["A skeletal muscle fiber contracts only when a somatic motor neuron tells it to. The motor neuron's cell body is in the spinal cord or the brainstem, and its long axon runs out to the muscle. Near the muscle the axon branches, and each branch ends on a single muscle fiber. That connection is the neuromuscular junction. The swollen end of the branch is the axon terminal, the narrow gap is the synaptic cleft, and the patch of muscle membrane under the terminal is the motor end plate.","The axon terminal is full of synaptic vesicles that hold the neurotransmitter acetylcholine, ACh. Click the motor neuron to send an action potential down its axon."],
 ask:"When the action potential reaches the axon terminal, what makes the vesicles release their ACh?",
 ans:["Calcium. The action potential opens voltage-gated Ca2+ channels in the membrane of the axon terminal. Ca2+ is much more concentrated in the extracellular fluid than in the cytosol, so it rushes in. The Ca2+ triggers the docked vesicles to fuse with the membrane and release their ACh into the synaptic cleft by exocytosis.","This is the same way transmitter is released at the other synapses you have met. A somatic motor neuron always releases ACh, and it always excites the muscle fiber. No neuron inhibits a skeletal muscle fiber directly."],
 name:"neuromuscular junction",
 desc:"A motor neuron's cell body at the upper left sends a myelinated axon to a large axon terminal sitting on a muscle fiber. The terminal holds vesicles of acetylcholine, three of them docked at the bottom membrane beside four voltage-gated calcium channels. Below the narrow synaptic cleft, the motor end plate is folded, with nicotinic receptor channels on the crests of the folds. A recording box at the upper right shows the voltage at the end plate. When the student clicks the motor neuron, a dot travels down the axon to the terminal, the calcium channels open, calcium ions move into the terminal, and the docked vesicles fuse with the membrane and release gold acetylcholine molecules into the cleft.",
 pre:function(){S(["nmj"]);},
 play:function(a){return waitOn(neuHit,pNeu,a).then(function(){return nmjAP(a);}).then(function(){return nmjCa(a);}).then(function(){return nmjRelease(a);}).then(function(){cap("Ca2+ entry makes the vesicles release ACh.");});}},

{title:"ACh opens the receptor channels",
 text:["The ACh diffuses across the synaptic cleft to the motor end plate. The end plate is folded, and the crests of the folds are packed with ACh receptors called nicotinic receptors. Each one is a channel that opens when ACh binds to it, and two ACh molecules have to bind before it opens.","These channels are not choosy. They let small positive ions through, both Na+ and K+. Click the ACh in the cleft to send it to the receptors."],
 ask:"The open channel lets Na+ in and K+ out at the same time. Will the end plate depolarize or hyperpolarize, and why?",
 ans:["It depolarizes. At rest, the membrane potential is close to the equilibrium potential for K+ and far from the one for Na+, so Na+ has a much bigger driving force. When the channels open, Na+ rushes in down its concentration gradient and toward the negative inside of the cell, while only a little K+ leaks out. More positive charge comes in than goes out, so the inside of the end plate becomes less negative.","This depolarization of the end plate is called the end plate potential. Like the graded potentials you met earlier, it happens only where the receptor channels are, on the end plate itself."],
 name:"end plate potential",
 desc:"The neuromuscular junction with gold acetylcholine molecules in the synaptic cleft. When the student clicks the acetylcholine, the molecules move down onto the receptor channels on the end plate, two to each receptor, and the channels open and turn maroon. Navy sodium ions move into the muscle fiber through them while fewer gray potassium ions move out. In the recording box, the voltage at the end plate rises in a large bump, the end plate potential.",
 pre:function(){S(["nmj"]);DOCK.forEach(function(v){v.setAttribute("display","none");});ACH.forEach(function(g,i){place(g,ACHC[i][0],ACHC[i][1]);g.setAttribute("display","");});},
 play:function(a){return waitOn(cleftHit,pAch,a).then(function(){return nmjBind(a,90);}).then(function(){cap("More Na+ flows in than K+ flows out.");});}},

{title:"One for one",
 text:["Around the edges of the motor end plate, the sarcolemma has voltage-gated Na+ channels like the ones on an axon. If the end plate potential brings them to threshold, they fire an action potential that spreads across the whole muscle fiber and down its T tubules. Click the motor neuron to fire it again, and watch the voltage at the end plate."],
 ask:"In the brain, one neuron firing usually is not enough to make the next neuron fire. At the neuromuscular junction, every action potential in the motor neuron produces an action potential in the muscle fiber. How is that possible?",
 ans:["The end plate potential is much larger than it needs to be. In a healthy junction, one action potential in the motor neuron releases enough ACh to open so many receptor channels that the end plate potential always rises well above threshold. That extra amount is called the safety factor. So the muscle fiber fires every time the motor neuron fires, one for one, with no adding up of signals needed.","Most synapses in the brain and spinal cord work differently. A single input there makes a small graded potential, and many inputs have to add together to reach threshold. At the neuromuscular junction, the decision has already been made in the spinal cord, and the muscle fiber simply carries it out."],
 name:"safety factor",
 desc:"The neuromuscular junction at rest. When the student clicks the motor neuron, the whole sequence plays: the action potential reaches the terminal, calcium enters, acetylcholine is released and binds, sodium flows in, and the end plate potential in the recording box rises far above the dashed threshold line. A gold bracket marks the gap between threshold and the peak as the safety margin. A navy spike shows the muscle action potential, the sodium channels at the edges of the end plate open, and maroon dots race away along the sarcolemma in both directions.",
 pre:function(){S(["nmj"]);},
 play:function(a){return waitOn(neuHit,pNeu,a).then(function(){return nmjAP(a,700);}).then(function(){return nmjCa(a);}).then(function(){return nmjRelease(a);}).then(function(){return nmjBind(a,90);}).then(function(){gMar.setAttribute("display","");return nmjMuscle(a);}).then(function(){cap("The end plate potential clears threshold every time.");});}},

{title:"Blocking the junction",
 text:["Several steps at this junction can be blocked, so it is the target of several poisons and medicines. Curare is a plant poison that has been used on hunting arrows in South America. It binds to the nicotinic receptors without opening them, so ACh cannot reach them. Botulinum toxin, made by the bacterium Clostridium botulinum, gets inside the axon terminal and destroys proteins the vesicles need to fuse with the membrane.","Click curare to add it, then click botulinum toxin."],
 ask:"For each one, how far does the signal get, and what would the person's muscles be like?",
 ans:["With curare, the action potential reaches the terminal, Ca2+ enters and ACh is released, but the ACh cannot bind to its receptors, so there is no end plate potential. With botulinum toxin, the action potential arrives and Ca2+ enters, but the vesicles cannot release their ACh, so again there is no end plate potential. Either way the muscle fibers never fire, and the muscles are limp and paralyzed. This is called flaccid paralysis, and when it reaches the diaphragm, the person cannot breathe without a ventilator.","Both have uses in medicine. Drugs related to curare relax the muscles during surgery while a machine breathes for the patient. Tiny doses of botulinum toxin, sold as Botox, are injected to quiet overactive muscles, to treat some muscle spasms and chronic migraine, and to smooth wrinkles. Eating food contaminated with the toxin causes botulism, a dangerous paralysis."],
 name:"flaccid paralysis",
 desc:"The neuromuscular junction with two gold buttons at the top, curare and botulinum toxin. When the student clicks curare, small gray blocks sit on every receptor channel. The motor neuron fires on its own, calcium enters, and acetylcholine is released into the cleft, but the receptors stay closed and the recording stays flat, labeled no end plate potential. When the student clicks botulinum toxin, the curare is gone and the docked vesicles are crossed out. The neuron fires again and calcium enters, but no acetylcholine is released and the recording again stays flat.",
 pre:function(){S(["nmj"]);show([bCur,bBot],true);},
 play:function(a){return waitOn(bCur,pCur,a).then(function(){btnDone(bCur,true);gCurM.setAttribute("display","");return nmjAP(a,700);}).then(function(){return nmjCa(a);}).then(function(){return nmjRelease(a);}).then(function(){recT.textContent="no end plate potential";cap("Curare: ACh is released but cannot bind.");return wait(900,a);}).then(function(){
   return waitOn(bBot,pBot,a);}).then(function(){nmjReset();show([bCur,bBot],true);btnDone(bCur,true);btnDone(bBot,true);gBotM.setAttribute("display","");cap("");return nmjAP(a,700);}).then(function(){return nmjCa(a);}).then(function(){return wait(400,a);}).then(function(){recT.textContent="no end plate potential";cap("Both stop the signal at the junction.");});}},

{title:"Myasthenia gravis",
 text:["In most people with myasthenia gravis, the immune system makes antibodies against the nicotinic ACh receptors on the motor end plate. The antibodies block the receptors and lead to their destruction, so each end plate has far fewer working receptors. The motor neuron and the rest of the muscle fiber are healthy. Click the motor neuron to fire it four times in a row, the way it fires during a steady effort."],
 ask:"With fewer receptors, what happens to the end plate potential, and why would the weakness get worse the longer the person uses the muscle?",
 ans:["Each end plate potential is smaller, so the safety factor is lost. During repeated firing, a motor neuron releases a little less ACh with each action potential. In a healthy junction that does not matter, because there is plenty to spare. In myasthenia gravis the end plate potential starts close to threshold, so after a few action potentials it falls short, and more and more muscle fibers stop responding. The muscles tire quickly and recover with rest. Drooping eyelids and double vision are often the first signs.","Treatment includes drugs that inhibit acetylcholinesterase, the enzyme that breaks down ACh. ACh then stays in the cleft longer and can activate the receptors that are left. Other treatments calm the immune attack."],
 name:"myasthenia gravis",
 desc:"The neuromuscular junction with antibodies, drawn as small maroon Y shapes, sitting on four of the six receptor channels, which are faded. When the student clicks the motor neuron, it fires four times. In the recording box, four end plate potentials appear one after another, each a little smaller. The first two cross the threshold line and are labeled fired; the last two fall short and are labeled failed.",
 pre:function(){S(["nmj"]);gMG.setAttribute("display","");MGOFF.forEach(function(j){NR[j].setAttribute("opacity",.3);});},
 play:function(a){var k=0;function one(){if(k>=4)return Promise.resolve();var i=k++;return nmjAP(a,450).then(function(){ePath.setAttribute("d",mgD(i+1));var H=[66,56,46,40];MGT[i].setAttribute("y",146-H[i]-8);MGT[i].textContent=i<2?"fired":"failed";MGT[i].setAttribute("class",i<2?"tn":"tm");return wait(150,a);}).then(one);}
   return waitOn(neuHit,pNeu4,a).then(one).then(function(){cap("With fewer receptors, the later signals fall short.");});}},

{sec:"Excitation-contraction coupling",comp:"Competency 2",
 title:"From the T tubule to the SR",
 text:["The muscle action potential is the excitation, and the shortening of the myofibrils is the contraction. Excitation-contraction coupling is how one leads to the other, and the link between them is Ca2+ released from the sarcoplasmic reticulum.","Two proteins sit face to face where a T tubule passes a terminal cisterna. In the T tubule membrane is the DHP receptor, named for a group of drugs, the dihydropyridines, that bind to it. It senses voltage. In the membrane of the SR, right beside it, is the ryanodine receptor, a Ca2+ channel named for ryanodine, a plant compound that binds to it. Click the opening of the T tubule to send the action potential inside."],
 ask:"When the action potential passes the DHP receptor, what happens next, and where does the Ca2+ that floods the cytosol come from?",
 ans:["The voltage change makes the DHP receptor change shape. In skeletal muscle, the DHP receptor is physically linked to the ryanodine receptor, so as the DHP receptor changes shape, it pulls the ryanodine receptor channel open. Ca2+ rushes out of the terminal cisternae, where it is stored at a high concentration, into the cytosol around the myofibrils.","So the Ca2+ comes from inside the cell, from the SR. In skeletal muscle no Ca2+ has to come in from outside the cell for this step, because nothing passes between the two receptors except a mechanical pull."],
 name:"excitation-contraction coupling",
 desc:"A close-up of one triad. A T tubule dips down from the sarcolemma between two large gold terminal cisternae full of calcium ions. Navy DHP receptors sit in the T tubule wall, each touching a maroon ryanodine receptor in the wall of the cisterna. A thin filament runs along the bottom. When the student clicks the opening of the T tubule, maroon dots travel along the sarcolemma and down both walls of the T tubule. The DHP receptors tilt, the ryanodine receptors open, and the calcium ions stream out of the cisternae into the cytosol, down toward the thin filament, where the troponin turns maroon and the tropomyosin shifts.",
 pre:function(){S(["ec"]);},
 play:function(a){return waitOn(ttHitE,pTTE,a).then(function(){return Promise.all([run(apE1,[[40,58],[425,58],[425,382]],1000,a),run(apE2,[[860,58],[475,58],[475,382]],1000,a)]);}).then(function(){return tweenVal(0,1,400,a,ecOpen);}).then(function(){
   return Promise.all(ECA.map(function(g){return run(g,[[g._hx,g._hy],[g._rx,g._ry],[g._tx,g._ty]],900,a,true);}));}).then(function(){TNE.forEach(function(t){t.setAttribute("fill",MAROON);});return tweenVal(0,-16,400,a,function(v){gTmE.setAttribute("transform","translate(0 "+v+")");});}).then(function(){cap("The DHP receptor pulls the ryanodine receptor open.");});}},

{title:"Skeletal and heart muscle",
 text:["Heart muscle has the same two receptors, but they work differently. In a heart muscle cell, the DHP receptor is a channel that lets Ca2+ in from the fluid outside the cell, and that incoming Ca2+ is what opens the ryanodine receptor. This is called calcium-induced calcium release.","The figure shows a T tubule and the SR in both kinds of muscle, with Ca2+ in the fluid outside. Click the button to remove the Ca2+ from the fluid outside, and both cells will then get an action potential."],
 ask:"Without Ca2+ outside the cells, which muscle can still contract, and why?",
 ans:["Skeletal muscle can. Its DHP receptor pulls the ryanodine receptor open mechanically, so the Ca2+ for contraction comes from the SR. Heart muscle cannot. Its ryanodine receptors are opened by the Ca2+ that comes in through the DHP receptor channels, so without Ca2+ outside, the SR never releases its store and the heart cell does not contract.","You will meet calcium-induced calcium release again in the heart weeks. Skeletal muscle coupling is a mechanical link, while heart muscle coupling uses Ca2+ from outside the cell as the trigger."],
 name:"calcium-induced calcium release",
 desc:"Two side-by-side close-ups, skeletal muscle on the left and heart muscle on the right. Each shows fluid outside the cell with calcium ions, a T tubule, and a gold sarcoplasmic reticulum holding calcium. In the skeletal muscle, the DHP receptor touches the ryanodine receptor; in the heart muscle, they are separate. When the student clicks the button to remove the calcium outside, the outside calcium ions disappear and an action potential runs down both T tubules. In the skeletal muscle, the DHP receptor tilts, the ryanodine receptor opens and calcium leaves the SR, labeled still contracts. In the heart muscle, the DHP channel opens but nothing comes in, the ryanodine receptor stays shut, and the label reads no contraction.",
 pre:function(){S(["ecx"]);},
 play:function(a){return waitOn(bOut,pOut,a).then(function(){btnDone(bOut,true);XP.forEach(function(P){P.out.forEach(function(g){g.setAttribute("display","none");});});return wait(300,a);}).then(function(){
   return Promise.all(XP.map(function(P){return run(P.ap,[[P.x0+140,135],[P.x0+140,396]],800,a);}));}).then(function(){
   var sk=XP[0],ht=XP[1];
   return Promise.all([tweenVal(0,1,400,a,function(k){sk.dhp.setAttribute("transform","translate("+(sk.x0+160)+" 270) rotate("+(28*k)+")");ryrOpen(sk.ryr,k);chanOpen(ht.dhp,k);})]);}).then(function(){
   var sk=XP[0];return Promise.all(sk.sr.map(function(g,i){return run(g,[[g._hx,g._hy],[sk.x0+190,270],[sk.x0+220+i*45,392]],800,a,true);}));}).then(function(){XP.forEach(function(P){show(P.res,true);});cap("Only heart muscle needs Ca2+ from outside to contract.");});}},

{sec:"Calcium and the regulatory proteins",comp:"Competency 4",
 title:"Calcium uncovers the binding sites",
 text:["Each thin filament is two chains of actin twisted together, and every actin molecule has a spot where a myosin head can bind. In a resting muscle, those spots are partly covered. Tropomyosin, a long thread-like protein, lies along the thin filament over the myosin binding sites, and troponin, a complex of three proteins, holds tropomyosin in that position. The myosin heads can reach the actin, but they cannot bind firmly enough to pull.","Click the Ca2+ to release it, as the SR does when the ryanodine receptors open."],
 ask:"Ca2+ never binds to actin or to myosin. How does it switch on contraction?",
 ans:["Ca2+ binds to troponin, to the part called troponin C. That changes troponin's shape, and troponin pulls tropomyosin aside, away from the myosin binding sites. With the sites uncovered, the myosin heads bind firmly to actin and can make their power strokes.","As long as Ca2+ stays bound to troponin, the binding sites stay open and the crossbridges keep cycling. When the Ca2+ is removed, tropomyosin slides back over the sites and the muscle relaxes."],
 name:"troponin and tropomyosin",
 desc:"A thin filament close up: two twisted chains of actin beads, with navy dots marking myosin binding sites, covered by a thick gold strand of tropomyosin. Three troponin complexes, each a cluster of three small circles, sit on the tropomyosin. Below, three navy myosin heads on a thick filament reach up but stop short. Three calcium ions wait above. When the student clicks the calcium, one ion moves to each troponin, which turns maroon, the tropomyosin strand slides up off the binding sites, a label reads myosin binding sites, now uncovered, and the myosin heads rise and bind to the actin.",
 pre:function(){S(["thin"]);},
 play:function(a){return waitOn(caTHit,pCaT,a).then(function(){tCaT.setAttribute("display","none");return Promise.all(CAT3.map(function(g,i){return run(g,[[TNX[i]-24,210]],700,a,true);}));}).then(function(){TNC.forEach(function(t){t.setAttribute("fill",MAROON);});return tweenVal(0,-24,600,a,function(v){gRope.setAttribute("transform","translate(0 "+v+")");CAT3.forEach(function(g,i){place(g,TNX[i]-24,210+v);});});}).then(function(){tSites.setAttribute("display","");return tweenVal(14,0,500,a,headsY);}).then(function(){cap("Ca2+ on troponin pulls tropomyosin off the sites.");});}},

{title:"When the SR cannot release Ca2+",
 text:["Picture a muscle fiber whose ryanodine receptors are jammed shut. Everything before them works normally: the motor neuron fires, the end plate potential reaches threshold, and the action potential travels down the T tubules. The fiber also has plenty of ATP. Click the button to fire the motor neuron."],
 ask:"Will this muscle contract? If a doctor moved the person's limb, would the muscle feel stiff or limp?",
 ans:["It will not contract, and it will feel limp. The signal stops at the ryanodine receptors, so no Ca2+ leaves the SR. Troponin has no Ca2+ to bind, tropomyosin stays over the binding sites, and the myosin heads cannot attach firmly. Because there is ATP, the heads do not get stuck to actin either, so nothing holds the filaments together and the muscle stretches easily.","The person would look as weak and limp as someone given curare, but here the nerve, the end plate potential and the muscle action potential are all normal. The failure is in excitation-contraction coupling, inside the muscle fiber."],
 desc:"The thin filament close up, with tropomyosin covering the binding sites. A gold button reads fire the motor neuron. When the student clicks it, four status lines appear one by one: a check mark for a normal end plate potential, a check mark for a normal action potential in the T tubules, a cross for ryanodine receptors that will not open, and a cross for no calcium released from the SR. The myosin heads rise toward the actin but cannot bind, and they drop back.",
 pre:function(){S(["thin"]);show([gCaT,tCaT],false);bFire.setAttribute("display","");},
 play:function(a){var k=0;function nx(){if(k>=4)return Promise.resolve();STAT[k++].setAttribute("display","");return wait(450,a).then(nx);}
   return waitOn(bFire,pFire,a).then(function(){btnDone(bFire,true);return nx();}).then(function(){return tweenVal(14,8,300,a,headsY);}).then(function(){return tweenVal(8,14,300,a,headsY);}).then(function(){cap("No Ca2+ means no crossbridges, so the muscle is limp.");});}},

{sec:"The crossbridge cycle",comp:"Competency 3",
 title:"One turn of the crossbridge cycle",
 text:["Each myosin head is a motor that turns the energy in ATP into movement. When a head is bound to actin, the link between them is called a crossbridge. The head goes through the same cycle again and again for as long as Ca2+ keeps the binding sites uncovered.","Here the binding sites are already uncovered. The head starts cocked, holding ADP and a phosphate, Pi, left over from splitting an ATP. Click the myosin head to move it through the cycle one stage at a time, and watch what sits on the head and how far the gold flag on the thin filament moves."],
 ask:"At which stage does ATP bind to the head, at which stage is ATP split into ADP and Pi, and at which stage does the thin filament actually move?",
 ans:["ATP binds at detachment, and that binding is what makes the head let go of actin. ATP is split at reactivation, and the energy from splitting it re-cocks the head. The thin filament moves only during the power stroke, which starts when the head releases its Pi. The head then lets go of the ADP and stays tightly bound to actin, with nothing on it, until a new ATP arrives.","So ATP binding and ATP splitting happen at two different stages. A head bound to actin with nothing on it is in the rigor state, and only a new ATP can release it. The many heads along a thick filament cycle at different times, so some are always holding on while others let go, and the filament does not slip back."],
 name:"crossbridge cycle",
 desc:"A thin filament runs across the figure with a gold flag on one actin bead and a ruler above it. Below, one navy myosin head rises from a thick filament, cocked back and not attached. A box reads On the myosin head: ADP and Pi, and a list on the left names the four stages. The student clicks the head four times. Binding: the head attaches to the actin bead under the flag. Power stroke: a Pi tag flies off, the head swings forward and drags the thin filament and its flag along the ruler toward the M line, then an ADP tag leaves and the box reads nothing. Detachment: an ATP tag flies onto the head and it lets go of actin; the box reads ATP. Reactivation: the head swings back to its cocked position and the box reads ADP and Pi. The thin filament stays where it was pulled.",
 pre:function(){S(["cyc"]);},
 play:function(a){
   return waitOn(hdHit,pB[0],a).then(function(){return cycBind(a);}).then(function(){cap("The cocked head binds to actin.");return waitOn(hdHit,pB[1],a);}).then(function(){return cycStroke(a);}).then(function(){cap("Releasing Pi sets off the power stroke.");
   return waitOn(hdHit,pB[2],a);}).then(function(){stage(3);atpP.setAttribute("display","");place(atpP,300,330);return run(atpP,[[300,330],[490,300]],500,a);}).then(function(){HV.textContent="ATP";return tweenVal(0,16,400,a,function(v){hdSet(20,v);});}).then(function(){cap("ATP binds, and the head lets go of actin.");
   return waitOn(hdHit,pB[3],a);}).then(function(){stage(4);HV.textContent="ADP and Pi";return tweenVal(20,-20,600,a,function(v){hdSet(v,16);});}).then(function(){cap("Splitting the ATP re-cocks the head.");});}},

{title:"When the ATP runs out",
 text:["A muscle fiber keeps only a small supply of ATP on hand, and every turn of the cycle uses one ATP for each head. This head starts cocked again, holding ADP and Pi, with ATP nearby. Click the button to take the ATP away."],
 ask:"Without ATP, will the muscle go limp or become stiff, and at which stage will the cycle stop?",
 ans:["Stiff. The head can still bind and make its power stroke, because it already holds ADP and Pi. But it then stays stuck at the end of the power stroke, tightly bound to actin, because only a new ATP can release it. With heads locked onto the thin filaments, the muscle cannot be stretched. This locked condition is the rigor state.","This is what happens in rigor mortis. In the hours after death, ATP runs out, Ca2+ leaks out of the SR, and the myosin heads lock onto actin. The body stays stiff until, much later, the muscle proteins begin to break down. It also shows that relaxation needs ATP: a muscle with no ATP does not go limp, it locks."],
 name:"rigor",
 desc:"The crossbridge figure with the head cocked and three ATP tags waiting nearby. When the student clicks the button to take the ATP away, the tags disappear and a label reads no ATP left. The head binds, releases its Pi, makes its power stroke and releases its ADP, and the box reads nothing. The student then clicks the head to try to free it. The head shakes but stays attached, and a label reads stuck: rigor.",
 pre:function(){S(["cyc"]);show([bAtp].concat(ATPS),true);},
 play:function(a){return waitOn(bAtp,pAtpB,a).then(function(){btnDone(bAtp,true);show(ATPS,false);tNoAtp.setAttribute("display","");return cycBind(a);}).then(function(){return cycStroke(a);}).then(function(){stage(0);cap("No ATP can bind, so the head cannot let go.");return waitOn(hdHit,pTry,a);}).then(function(){
   return tweenVal(0,1,600,a,function(k){hdSet(20+Math.sin(k*Math.PI*4)*3,0);});}).then(function(){hdSet(20,0);tStuck.setAttribute("display","");cap("With no ATP, the heads stay locked: rigor.");});}},

{sec:"Relaxation",comp:"Competency 5",
 title:"Clearing the ACh",
 text:["A contraction has to end, and two shutoff jobs end it. The first is at the neuromuscular junction. If ACh stayed on its receptors, the end plate would keep exciting the muscle fiber. The synaptic cleft holds an enzyme, acetylcholinesterase or AChE, that breaks ACh down. Click an AChE molecule in the cleft."],
 ask:"What happens to the ACh, and what happens to the end plate potential?",
 ans:["AChE splits each ACh into two pieces, acetate and choline. Neither piece can activate the receptor, so the receptor channels close and the end plate returns to its resting potential. The axon terminal takes the choline back in and uses it to make new ACh. AChE works fast, so each release of ACh produces one brief end plate potential.","This shuts off the signal coming in, but it does not relax the muscle by itself. The Ca2+ already released into the cytosol still has to be removed."],
 name:"acetylcholinesterase",
 desc:"The neuromuscular junction with acetylcholine bound to the open receptor channels, and five gold-brown acetylcholinesterase enzymes in the cleft. The recording shows the end plate depolarized. When the student clicks an enzyme, each acetylcholine molecule moves to an enzyme and splits into two small pieces, gray acetate and gold choline. The choline moves back up into the axon terminal while the acetate stays in the cleft, the receptor channels close, and the recording falls back to rest.",
 pre:function(){S(["nmj"]);gAche.setAttribute("display","");DOCK.forEach(function(v){v.setAttribute("display","none");});ACH.forEach(function(g,i){place(g,ACHB[i][0],ACHB[i][1]);g.setAttribute("display","");});NR.forEach(function(c){chanOpen(c,1,MAROON);});ePath.setAttribute("d",eppUp(90));},
 play:function(a){return waitOn(cleftHit,pAche,a).then(function(){return Promise.all(ACH.map(function(g,i){var x=ACHE[Math.max(0,Math.min(4,Math.round((ACHB[i][0]-360)/60)))];g._ex=x;return run(g,[[x,326]],350,a,true);}));}).then(function(){
   ACH.forEach(function(g,i){g.setAttribute("display","none");place(PIECE[i],g._ex-4,340);PIECE[i].setAttribute("display","");place(CHOL[i],g._ex+4,326);CHOL[i].setAttribute("display","");});return wait(250,a);}).then(function(){
   return Promise.all(CHOL.map(function(g,i){return run(g,[[g._x,326],[g._x+(i%2?6:-6),296]],600,a);}).concat([tweenVal(1,0,400,a,function(k){NR.forEach(function(c){chanOpen(c,k,MAROON);});})]));}).then(function(){ePath.setAttribute("d",eppD(90));cap("AChE breaks down ACh, so the channels close.");});}},

{title:"Pumping the Ca2+ back",
 text:["The second shutoff job is inside the fiber. The membrane of the sarcoplasmic reticulum is studded with Ca2+ pumps called SERCA, short for sarco-endoplasmic reticulum Ca2+-ATPase. They move Ca2+ from the cytosol back into the SR. Here the Ca2+ from the last action potential is still in the cytosol, bound to troponin. Click a SERCA pump."],
 ask:"What happens to troponin and tropomyosin as the Ca2+ goes back into the SR, and what does the pump need in order to work?",
 ans:["As the Ca2+ level in the cytosol falls, Ca2+ comes off troponin, and tropomyosin slides back over the myosin binding sites. The heads can no longer bind firmly, the crossbridges stop, and the muscle relaxes. The sarcomeres return to their resting length as the muscle is stretched by gravity or an opposing muscle and as titin springs back.","SERCA moves Ca2+ against its concentration gradient, into the SR where Ca2+ is already concentrated, so it uses ATP. That is why relaxation costs energy even though it looks like nothing is happening. Relaxing takes ATP in two places: to release each myosin head from actin, and to pump the Ca2+ away."],
 name:"SERCA",
 desc:"The triad close-up after an action potential: calcium ions fill the cytosol, the troponin on the thin filament at the bottom is maroon, and the tropomyosin is shifted off the binding sites. Gold-brown SERCA pumps sit in the membrane of the sarcoplasmic reticulum. When the student clicks a pump, the calcium ions move back into the terminal cisternae, labels read uses ATP beside the pumps, the troponin turns navy again, and the tropomyosin slides back over the binding sites.",
 pre:function(){S(["ec"]);gRecL.setAttribute("display","none");gSer.setAttribute("display","");ecCaOut();},
 play:function(a){return waitOn(serHit,pSer,a).then(function(){show(serT,true);return Promise.all(ECA.map(function(g){var px=g._hx<450?(g._hy<200?130:290):(g._hy<200?770:610),py=g._hy<200?244:324;return run(g,[[g._tx,g._ty],[px,py+(py===324?14:10)],[g._hx,g._hy]],1100,a,true);}));}).then(function(){
   TNE.forEach(function(t){t.setAttribute("fill",NAVY);});return tweenVal(-16,0,400,a,function(v){gTmE.setAttribute("transform","translate(0 "+v+")");});}).then(function(){cap("SERCA uses ATP to pump Ca2+ back into the SR.");});}},

{title:"When a shutoff fails",
 text:["Now break each shutoff job in turn. Organophosphates, found in some insecticides and in nerve agents such as sarin, block acetylcholinesterase. The second failure is a fiber whose SERCA pumps have stopped working. Click to add the organophosphate, then click to stop SERCA."],
 ask:"For each failure, where does the signal get stuck, and what happens to the muscle?",
 ans:["With acetylcholinesterase blocked, ACh piles up in the cleft and keeps the receptor channels open. At first the muscle fibers fire again and again, so the muscles twitch. Then, as the end plate stays depolarized, the voltage-gated Na+ channels around it become inactivated and the fibers stop firing, so the muscles become weak and then paralyzed, including the breathing muscles. ACh also builds up at the autonomic synapses that use it, causing small pupils, drooling, sweating and a slow heart rate. Emergency treatment includes atropine, which blocks the effects of the extra ACh on the organs but does not help the muscle weakness, and pralidoxime, which can restore acetylcholinesterase if it is given early.","With SERCA stopped, the signal is stuck inside the fiber. Ca2+ released by an action potential stays in the cytosol and stays bound to troponin, so the crossbridges keep cycling and the muscle stays contracted instead of relaxing. A rare inherited condition in which skeletal muscle SERCA works poorly, Brody disease, makes muscles stiffen and relax slowly after exercise. The problem is in a different place in each case: in the cleft for one, and in the cytosol for the other."],
 name:"organophosphate poisoning",
 desc:"Two side-by-side panels. On the left, a small neuromuscular junction with acetylcholinesterase enzymes in the cleft and a recording box for muscle fiber action potentials. On the right, a piece of sarcoplasmic reticulum with SERCA pumps, a thin filament in the cytosol below, and a recording box for force. When the student clicks to add the organophosphate, the enzymes are crossed out, acetylcholine piles up in the cleft, the receptor channels open, and the recording shows a burst of action potentials that then stops, labeled fires again and again, then stops. When the student clicks to stop SERCA, the pumps are crossed out, calcium leaves the SR and stays in the cytosol, the tropomyosin shifts off the binding sites, and the force recording rises and stays up, labeled stays contracted: cannot relax.",
 pre:function(){S(["fail"]);},
 play:function(a){var k=0;function more(){if(k>=FACH.length)return Promise.resolve();FACH[k++].setAttribute("display","");return wait(60,a).then(more);}
   return waitOn(bOrg,pOrg,a).then(function(){btnDone(bOrg,true);gFX.setAttribute("display","");return Promise.all([more(),tweenVal(0,1,500,a,function(q){FR.forEach(function(c){chanOpen(c,q,MAROON);});}),growTrain(fTr1,fTrain,1600,a)]);}).then(function(){fT1.setAttribute("display","");
   return waitOn(bSer,pSerF,a);}).then(function(){btnDone(bSer,true);gSX.setAttribute("display","");return Promise.all(FCA.map(function(g){return run(g,[[g._hx,g._hy],[g._hx,160],[g._tx,174]],700,a,true);}));}).then(function(){return Promise.all([tweenVal(0,-12,400,a,function(v){gTmF.setAttribute("transform","translate(0 "+v+")");}),growTrain(fTr2,fForce,1400,a)]);}).then(function(){fT2.setAttribute("display","");cap("Each failure jams the muscle at a different point.");});}},

{sec:"Review",comp:"Competencies 1 to 5",
 title:"From command to contraction",
 text:["A somatic motor neuron fires. Its action potential opens voltage-gated Ca2+ channels in the axon terminal, and the Ca2+ that enters triggers exocytosis of ACh. ACh binds nicotinic receptors on the motor end plate, nonspecific cation channels that let in more Na+ than they let out K+. The end plate potential always reaches threshold, so a muscle action potential spreads along the sarcolemma and down the T tubules.","In the T tubule, the DHP receptor changes shape and pulls open the ryanodine receptor of the SR, and Ca2+ floods the cytosol. Ca2+ binds troponin, which moves tropomyosin off the myosin binding sites. Myosin heads bind, release Pi and make the power stroke, release ADP, bind ATP and detach, then split the ATP and re-cock. To relax, AChE breaks down ACh, and SERCA uses ATP to pump Ca2+ back into the SR. Click the motor neuron to run the whole sequence."],
 ask:"Without scrolling back, name every place in this chain where something you met today can stop it, and what each one does to the muscle.",
 ans:["Botulinum toxin stops ACh release from the terminal. Curare blocks the nicotinic receptors. Jammed ryanodine receptors stop Ca2+ release from the SR. Each of these leaves the muscle limp. In myasthenia gravis antibodies destroy the receptors, so the muscle grows weaker the more it is used. Without ATP, the heads cannot detach and the muscle locks in rigor. Blocking acetylcholinesterase leaves ACh in the cleft, causing twitching and then paralysis, and stopping SERCA leaves Ca2+ in the cytosol, so the muscle cannot relax.","If some of these did not come back to you, go back to those steps, then try your Competency Study Guide drawings from memory."],
 desc:"The whole chain in one figure: a motor neuron and its axon terminal on top of a muscle fiber, a T tubule with a terminal cisterna on each side, and a sarcomere at the right. A numbered list of eight events runs along the bottom. When the student clicks the motor neuron, the events play in order and each number appears on the figure: the action potential travels down the axon, acetylcholine is released, the end plate potential starts an action potential that runs along the sarcolemma and down the T tubule, calcium leaves the SR and travels to the sarcomere, the sarcomere shortens, and then the calcium returns to the SR and the sarcomere lengthens again.",
 pre:function(){S(["rev"]);},
 play:function(a){return waitOn(revHit,pRev,a).then(function(){revStep(1);return run(rAp,[[80,58],[240,58],[262,126]],700,a);}).then(function(){revStep(2);
   return Promise.all(RACH.map(function(g,i){g.setAttribute("display","");place(g,250+i*12,160);return run(g,[[250+i*12,160],[250+i*12,172]],300,a,true);}));}).then(function(){show(RACH,false);revStep(3);return wait(300,a);}).then(function(){revStep(4);
   return run(rAp2,[[300,170],[420,170],[420,350]],800,a);}).then(function(){revStep(5);return Promise.all(RCA.map(function(g,i){return run(g,[[g._hx,g._hy],[g._hx,350],[580+i*44,i%2?378:208]],800,a,true);}));}).then(function(){revStep(6);return wait(300,a);}).then(function(){revStep(7);
   return tweenVal(0,26,900,a,revS);}).then(function(){revStep(8);return Promise.all(RCA.map(function(g){return run(g,[[g._hx,g._hy]],800,a,true);}).concat([tweenVal(26,0,900,a,revS)]));}).then(function(){cap("Ca2+ links the command to the sliding filaments.");});}}
];
