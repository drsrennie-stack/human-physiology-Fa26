/* How movement gets commanded. Oct 17 2026. Week 6 walkthrough 4 of 4.
   Week 6 competencies 17 to 20 (Study Guide numbers): the motor control
   hierarchy, the corticospinal pathway, the cerebellum and basal ganglia,
   and upper and lower motor neuron signs. Builds on the Week 5 spinal
   pathways and reflexes walkthroughs and keeps their figures: the person
   seen from behind, the cord slice, the knee and the foot.
   Panels, each shown and hidden per step:
   - br: the person seen from behind: the two halves of the brain with the
     motor cortex, basal ganglia, internal capsule and thalamus, the
     brainstem with the cerebellum beside it, the cord and a slice of it,
     and the right hand with a glass. It carries the three levels, the
     corticospinal pathway, the lesion sites, and the cerebellum and basal
     ganglia loops. Two small body figures show which side is weak.
   - reach: a person seen from above reaching for a cup on a table:
     healthy, with cerebellar damage, and with Parkinson disease.
   - leg: the two-neuron chain from the motor cortex to the quadriceps,
     with the Week 5 knee, a hammer and the foot, for upper and lower motor
     neuron lesions and ALS.
   - sort: two columns for sorting exam findings.
   Every hands-on step uses promptAt and waitOn from w05-kit.js (and
   waitAny below for the one step with a choice), so Next stays locked
   until the student has acted. */

/* a linear tween with the shell's run guard, for tremors that must not be eased */
function lin(dur,a,cb){
  if(!a||reduce){cb(1);return Promise.resolve();}
  return new Promise(function(res){var t0=performance.now(),my=runId;
    function f(now){if(my!==runId){res();return;}var t=Math.min(1,(now-t0)/dur);cb(t);if(t<1)requestAnimationFrame(f);else res();}
    requestAnimationFrame(f);});
}
/* wait for one of several targets; resolves with the index clicked (0 with no animation) */
function waitAny(tgts,prm,a){
  if(!a||reduce){if(prm)prm.setAttribute("display","none");return Promise.resolve(0);}
  prm.setAttribute("display","");
  return new Promise(function(res){var my=runId,done=false,k=0,t;setTimeout(function(){if(!done)lockNext(true);},0);
    function fin(i){if(done)return;done=true;clearInterval(t);if(my===runId)lockNext(false);
      tgts.forEach(function(g){g.removeEventListener("click",g._h);g.style.cursor="";});document.removeEventListener("keydown",key,true);prm.setAttribute("display","none");res(i);}
    function key(e){if((e.key==="Enter"||e.key===" ")&&!/TEXTAREA|INPUT|BUTTON|SELECT|^A$/.test(e.target.tagName||"")){e.preventDefault();fin(0);}}
    tgts.forEach(function(g,i){g.style.cursor="pointer";g._h=function(){fin(i);};g.addEventListener("click",g._h);});
    document.addEventListener("keydown",key,true);
    t=setInterval(function(){if(my!==runId){fin(0);return;}k++;prm._rings.forEach(function(r){var r0=+r.getAttribute("data-r");r.setAttribute("r",r0+((k%10)<5?(k%5):5-(k%5))*2);});},70);});
}
function show(list,on){list.forEach(function(g){g.setAttribute("display",on?"":"none");});}

/* ======================= the person seen from behind ======================= */
var gBr=G("br");
var HEMI6="M446 24 C340 8 136 24 134 116 C132 186 250 210 398 200 L446 200 Z";
var HEMI6_IN="M440 46 C346 32 164 46 160 116 C158 168 256 186 398 180 L440 180 Z";
var CTXF="#DDE1EA",GLOW="#F3E6C3",BGF="#EADFC8",CBF="#E8EBF1";
var brHemL=el("path",{d:HEMI6,fill:CTXF,stroke:NAVY,"stroke-width":3},gBr);
el("path",{d:HEMI6_IN,fill:"#fff"},gBr);
var brRH=el("g",{transform:"translate(900 0) scale(-1 1)"},gBr);
var brHemR=el("path",{d:HEMI6,fill:CTXF,stroke:NAVY,"stroke-width":3},brRH);el("path",{d:HEMI6_IN,fill:"#fff"},brRH);
[[392,14],[318,12],[244,18],[180,40],[146,76],[138,124],[160,166],[216,194],[300,202]].forEach(function(q){var dx=292-q[0],dy=112-q[1],L=Math.sqrt(dx*dx+dy*dy);
  [gBr,brRH].forEach(function(g){el("path",{d:"M"+q[0]+" "+q[1]+" q"+(dx/L*8+dy/L*5).toFixed(1)+" "+(dy/L*8-dx/L*5).toFixed(1)+" "+(dx/L*18).toFixed(1)+" "+(dy/L*18).toFixed(1),fill:"none",stroke:INK2,"stroke-width":2,"stroke-linecap":"round"},g);});});
/* the primary motor cortex, a strip of the gray outer layer on the left side */
var brM1=el("polyline",{points:"291,30 260,35 232,41 212,47 197,53",fill:"none",stroke:MAROON,"stroke-width":10,"stroke-linecap":"round",opacity:.45},gBr);
/* basal ganglia beside each thalamus, with the internal capsule running between */
var brBG=[];
[[322,382],[578,518]].forEach(function(p){brBG.push(el("ellipse",{cx:p[0],cy:152,rx:22,ry:30,fill:BGF,stroke:GDEEP,"stroke-width":2},gBr));brBG.push(el("ellipse",{cx:p[1],cy:110,rx:13,ry:18,fill:BGF,stroke:GDEEP,"stroke-width":2},gBr));});
el("ellipse",{cx:402,cy:154,rx:36,ry:18,fill:TINT,stroke:INK2,"stroke-width":2},gBr);el("ellipse",{cx:498,cy:154,rx:36,ry:18,fill:TINT,stroke:INK2,"stroke-width":2},gBr);
/* the cerebellum, behind the brainstem */
var brCb=[300,600].map(function(cx){var e=el("ellipse",{cx:cx,cy:244,rx:72,ry:36,fill:CBF,stroke:NAVY,"stroke-width":3},gBr);
  [-22,-10,2,14,25].forEach(function(dy){var w=72*Math.sqrt(1-Math.pow(dy/36,2))-10;el("path",{d:"M"+(cx-w).toFixed(1)+" "+(244+dy)+" Q"+cx+" "+(244+dy+6)+" "+(cx+w).toFixed(1)+" "+(244+dy),fill:"none",stroke:INK2,"stroke-width":1.5},gBr);});return e;});
/* the brainstem, with the pyramids at the bottom of the medulla */
var brBS=el("path",{d:"M398 198 L404 300 Q450 316 496 300 L502 198 Z",fill:"#fff",stroke:NAVY,"stroke-width":3},gBr);
el("ellipse",{cx:434,cy:292,rx:13,ry:7,fill:"none",stroke:INK2,"stroke-width":1.5},gBr);el("ellipse",{cx:466,cy:292,rx:13,ry:7,fill:"none",stroke:INK2,"stroke-width":1.5},gBr);
var brSN=el("ellipse",{cx:436,cy:232,rx:11,ry:5,fill:NAVY},gBr);
/* the cord and one slice */
var brCordR=el("rect",{x:412,y:300,width:76,height:72,fill:"#fff",stroke:NAVY,"stroke-width":3},gBr);
var brSlice=el("ellipse",{cx:450,cy:412,rx:112,ry:50,fill:"#fff",stroke:NAVY,"stroke-width":3},gBr);
el("path",{d:"M410 384 Q422 378 432 396 L440 408 L460 408 L468 396 Q478 378 490 384 L484 406 Q508 420 498 440 Q484 450 470 436 L460 422 L440 422 L430 436 Q416 450 402 440 Q392 420 416 406 Z",fill:TINT,stroke:INK2,"stroke-width":2},gBr);
el("line",{x1:450,y1:14,x2:450,y2:476,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 6"},gBr);
/* spinal nerves: right to the right hand, left toward the left arm */
el("line",{x1:612,y1:416,x2:800,y2:418,stroke:"#CBD0DA","stroke-width":16,"stroke-linecap":"round"},gBr);
el("line",{x1:612,y1:410,x2:520,y2:378,stroke:"#CBD0DA","stroke-width":10,"stroke-linecap":"round"},gBr);
el("ellipse",{cx:575,cy:394,rx:16,ry:11,fill:"#E3E6ED",stroke:INK2,"stroke-width":2},gBr);
el("line",{x1:612,y1:424,x2:520,y2:446,stroke:"#CBD0DA","stroke-width":10,"stroke-linecap":"round"},gBr);
el("line",{x1:288,y1:416,x2:214,y2:418,stroke:"#CBD0DA","stroke-width":16,"stroke-linecap":"round"},gBr);
el("line",{x1:288,y1:410,x2:380,y2:378,stroke:"#CBD0DA","stroke-width":10,"stroke-linecap":"round"},gBr);
el("ellipse",{cx:325,cy:394,rx:16,ry:11,fill:"#E3E6ED",stroke:INK2,"stroke-width":2},gBr);
el("line",{x1:288,y1:424,x2:380,y2:446,stroke:"#CBD0DA","stroke-width":10,"stroke-linecap":"round"},gBr);
/* the right hand */
var brHand=el("g",{},gBr);
el("rect",{x:780,y:392,width:52,height:58,rx:14,fill:TISS,stroke:MAROON,"stroke-width":2.5},brHand);
var BRF=[0,1,2,3].map(function(i){return el("rect",{x:826,y:394+i*13.5,width:42,height:11,rx:5.5,fill:TISS,stroke:MAROON,"stroke-width":2},brHand);});
el("rect",{x:792,y:368,width:12,height:32,rx:6,fill:TISS,stroke:MAROON,"stroke-width":2,transform:"rotate(28 798 396)"},brHand);
function brClose(k){BRF.forEach(function(f){f.setAttribute("width",42-28*k);});}
function brReach(k){place(brHand,20*k,0);brClose(.35*k);}
var brGlass=el("g",{},gBr);el("rect",{x:872,y:390,width:24,height:56,rx:3,fill:FLUID,stroke:NAVY,"stroke-width":2.5},brGlass);el("ellipse",{cx:884,cy:390,rx:12,ry:4,fill:"#fff",stroke:NAVY,"stroke-width":2},brGlass);
var brPin=el("g",{},gBr);el("line",{x1:860,y1:350,x2:860,y2:388,stroke:INK2,"stroke-width":3},brPin);el("circle",{cx:860,cy:348,r:6,fill:MAROON},brPin);

/* the two corticospinal tracts: left cortex to the right hand, right cortex to the left arm */
var LT=[[236,42],[300,90],[357,124],[357,184],[412,214],[412,286],[478,302],[478,370],[528,404],[488,432],[520,446],[612,424],[782,428],[866,414]];
var RT=[[664,42],[600,90],[543,124],[543,184],[488,214],[488,286],[422,302],[422,370],[372,404],[412,432],[380,446],[288,424],[214,426]];
var gLT=el("g",{},gBr),gRT=el("g",{},gBr);
var lLT=poly(gLT,LT,GDEEP,5);el("circle",{cx:488,cy:432,r:7,fill:GDEEP,stroke:"#fff","stroke-width":2},gLT);
var lRT=poly(gRT,RT,INK2,4,"9 6");lRT._dash="9 6";el("circle",{cx:412,cy:432,r:7,fill:INK2,stroke:"#fff","stroke-width":2},gRT);
/* inputs onto the lower motor neuron (step 5) */
var gIn=el("g",{},gBr);
var IN_BS=[[466,232],[466,300],[466,372],[482,426]],IN_RF=[[700,412],[612,410],[575,394],[520,380],[496,404],[490,426]];
poly(gIn,IN_BS,NAVY,4);poly(gIn,IN_RF,MAROON,4);
/* the cerebellum loop (step 8) */
var gCbL=el("g",{},gBr);
var CB_COPY=[[236,42],[300,90],[357,124],[357,184],[412,214],[412,244],[470,252],[540,246]];
var CB_FB=[[850,410],[782,412],[612,410],[575,394],[520,380],[492,362],[492,306],[506,276],[548,258]];
var CB_COR=[[574,224],[556,196],[520,170],[438,158],[402,154],[330,92],[236,42]];
var lCopy=poly(gCbL,CB_COPY.slice(5),GDEEP,4,"7 5");lCopy._dash="7 5";
var lFb=poly(gCbL,CB_FB,MAROON,4),lCor=poly(gCbL,CB_COR,NAVY,4);
/* the basal ganglia loop (step 10) */
var gBgL=el("g",{},gBr);
var BG_IN=[[236,42],[290,100],[316,130]],BG_OUT=[[338,160],[372,162],[402,154]],BG_UP=[[402,154],[330,92],[236,42]];
var lBgIn=poly(gBgL,BG_IN,GDEEP,4),lBgOut=poly(gBgL,BG_OUT,GDEEP,4),lBgUp=poly(gBgL,BG_UP,GDEEP,4);
var lSN=poly(gBgL,[[436,232],[392,200],[340,174]],NAVY,3,"5 4");lSN._dash="5 4";
/* traveling signals */
var dA=dot(gBr,GDEEP,10),dB=dot(gBr,NAVY,9),dC=dot(gBr,MAROON,9),dD=dot(gBr,GDEEP,9),dE=dot(gBr,GDEEP,9);
var vhGlow=el("circle",{cx:488,cy:432,r:16,fill:"none",stroke:GOLD,"stroke-width":4},gBr);
var stopB=badge(gBr,478,322,"X",MAROON,12);

/* labels, each in its own group so a step shows only the ones it needs */
var BRL={};
function lab(k,f){var g=el("g",{},gBr);BRL[k]=g;f(g);return g;}
lab("m1",function(g){tx(g,16,30,"primary","tn",14,"start");tx(g,16,46,"motor cortex","tn",14,"start");});
lab("bg",function(g){tx(g,296,152,"basal ganglia","t",12,"end");});
lab("th",function(g){tx(g,498,190,"thalamus","t",12,"middle");});
lab("cb",function(g){tx(g,300,298,"cerebellum","t",13,"middle");});
var cbLT,cbRT;lab("cb2",function(g){cbLT=tx(g,300,298,"left cerebellum","t",13,"middle");cbRT=tx(g,600,298,"right cerebellum","t",13,"middle");});
lab("bs",function(g){tx(g,450,218,"midbrain","t",12,"middle");tx(g,450,252,"pons","t",12,"middle");tx(g,450,280,"medulla","t",12,"middle");});
lab("sn",function(g){tx(g,450,254,"substantia","t",11,"middle");tx(g,450,267,"nigra","t",11,"middle");});
lab("ic",function(g){tx(g,372,84,"internal capsule","t",12,"start");el("line",{x1:370,y1:88,x2:358,y2:120,stroke:INK2,"stroke-width":1.5},g);});
lab("umn",function(g){tx(g,16,74,"upper motor neuron","tn",13,"start");el("line",{x1:162,y1:66,x2:230,y2:46,stroke:INK2,"stroke-width":1.5},g);});
lab("pyr",function(g){tx(g,396,320,"crosses at the pyramids","tm",13,"end");});
lab("lcst",function(g){tx(g,540,352,"lateral corticospinal tract","t",12,"start");});
lab("lmn",function(g){tx(g,566,474,"lower motor neuron","tn",13,"start");});
lab("cord",function(g){tx(g,334,474,"spinal cord, a slice","t",13,"end");});
lab("larm",function(g){tx(g,296,452,"to the left arm","t",12,"end");});
lab("hand",function(g){tx(g,724,384,"right hand","tn",14,"middle");});
lab("mid",function(g){tx(g,450,494,"midline","t",13,"middle");});
function brLabs(l){for(var k in BRL)BRL[k].setAttribute("display",l.indexOf(k)>=0?"":"none");}
/* the three levels, down the right side */
var brLv=el("g",{},gBr);
[[20,196],[204,300],[306,372]].forEach(function(b){el("path",{d:"M770 "+b[0]+" h8 V"+b[1]+" h-8",fill:"none",stroke:INK2,"stroke-width":2},brLv);});
var LVT=[[["cortex","decides, plans","and starts"],70],[["brainstem","posture and","balance"],232],[["spinal cord","reflexes, and","the path out"],318]].map(function(r){var g=el("g",{},brLv);
  r[0].forEach(function(s,i){tx(g,786,r[1]+i*17,s,i?"t":"tn",i?12:14,"start");});g.setAttribute("opacity",.25);return g;});
/* the five stages of one voluntary movement, down the right side */
var brSt=el("g",{},gBr);
var STG=["1 decide","2 plan","3 start","4 carry out","5 adjust"].map(function(s,i){return tx(brSt,786,44+i*30,s,"tn",15,"start");});
function stageOn(k){STG.forEach(function(t,i){t.setAttribute("class",i===k?"tm":"tn");t.setAttribute("opacity",i<=k?1:.25);});}
/* legends */
var brLegIn=el("g",{},gBr);tx(brLegIn,786,40,"inputs:","t",12,"start");
[[GDEEP,"cortex"],[NAVY,"brainstem"],[MAROON,"reflex"]].forEach(function(c,i){el("line",{x1:786,y1:60+i*22,x2:806,y2:60+i*22,stroke:c[0],"stroke-width":4},brLegIn);tx(brLegIn,812,65+i*22,c[1],"tn",12,"start");});
var brLegCb=el("g",{},gBr);
[[GDEEP,"copy of the command","7 5"],[MAROON,"feedback from the arm",null],[NAVY,"correction to the cortex",null]].forEach(function(c,i){var a={x1:16,y1:336+i*24,x2:40,y2:336+i*24,stroke:c[0],"stroke-width":4};if(c[2])a["stroke-dasharray"]=c[2];el("line",a,brLegCb);tx(brLegCb,46,341+i*24,c[1],"tn",12,"start");});
/* three possible movements, for the basal ganglia step */
var SEL=["reach for cup","scratch nose","tap foot"].map(function(s,i){var g=el("g",{},gBr),y=40+i*52;
  var r=el("rect",{x:782,y:y,width:112,height:42,rx:10,fill:"#fff",stroke:INK2,"stroke-width":2},g);tx(g,838,y+18,s,"tn",12,"middle");var st=tx(g,838,y+34,"","t",11,"middle");return {g:g,r:r,st:st};});
function selState(on){SEL.forEach(function(c,i){c.r.setAttribute("fill",on?(i===0?"#FBF1EF":"#EEF0F3"):"#fff");c.r.setAttribute("stroke",on?(i===0?MAROON:INK2):INK2);c.st.textContent=on?(i===0?"let through":"held back"):"";c.st.setAttribute("class",i===0?"tm":"t");});}

/* injuries */
var brLesM1=el("ellipse",{cx:240,cy:38,rx:26,ry:12,fill:MAROON,opacity:.8},gBr);
var brLesMed=el("ellipse",{cx:412,cy:262,rx:13,ry:10,fill:MAROON},gBr);
var brLesCord=el("g",{},gBr);el("path",{d:"M450 362 L450 462 A112 50 0 0 1 338 412 A112 50 0 0 1 450 362 Z",fill:MAROON,opacity:.28},brLesCord);el("rect",{x:412,y:300,width:38,height:72,fill:MAROON,opacity:.28},brLesCord);
var brCut=el("rect",{x:404,y:322,width:92,height:14,rx:3,fill:MAROON},gBr);

/* small bodies seen from behind, to show which side is weak */
var WEAK="rgba(139,58,46,.40)";
function mkBody(bx,by){
  var o={g:el("g",{},gBr)},g=o.g;
  function r(a){a.fill="#fff";a.stroke=INK2;a["stroke-width"]=2.5;return el("rect",a,g);}
  el("circle",{cx:bx,cy:by+12,r:11,fill:"#fff",stroke:INK2,"stroke-width":2.5},g);
  o.L=[r({x:bx-20,y:by+26,width:20,height:70}),r({x:bx-34,y:by+28,width:11,height:66,rx:5}),r({x:bx-19,y:by+99,width:16,height:80,rx:7})];
  o.R=[r({x:bx,y:by+26,width:20,height:70}),r({x:bx+23,y:by+28,width:11,height:66,rx:5}),r({x:bx+3,y:by+99,width:16,height:80,rx:7})];
  tx(g,bx-11,by+196,"L","t",11,"middle");tx(g,bx+11,by+196,"R","t",11,"middle");
  o.t1=tx(g,bx-40,by-22,"","tn",12,"start");o.t2=tx(g,bx-40,by-6,"","tm",12,"start");
  return o;}
var bodA=mkBody(52,290),bodB=mkBody(150,290);
function weak(o,side,t1,t2){o.g.setAttribute("display","");o.L.forEach(function(e){e.setAttribute("fill",side==="L"?WEAK:"#fff");});o.R.forEach(function(e){e.setAttribute("fill",side==="R"?WEAK:"#fff");});o.t1.textContent=t1;o.t2.textContent=t2;}

/* click targets, drawn last so they sit on top */
function hitE(cx,cy,rx,ry){return el("ellipse",{cx:cx,cy:cy,rx:rx,ry:ry,fill:"transparent"},gBr);}
function hitR(x,y,w,h){return el("rect",{x:x,y:y,width:w,height:h,fill:"transparent"},gBr);}
var hCord=hitE(450,412,112,50),hBs=hitR(398,198,104,102);
var hCtx=el("g",{},gBr);el("path",{d:HEMI6,fill:"transparent"},hCtx);var hCtxR=el("g",{transform:"translate(900 0) scale(-1 1)"},hCtx);el("path",{d:HEMI6,fill:"transparent"},hCtxR);
var hM1=hitE(240,40,50,28),hGlass=hitR(860,384,40,70),hCut=hitR(390,300,120,72),hPin=hitR(840,334,40,64),hVh=el("circle",{cx:488,cy:432,r:26,fill:"transparent"},gBr);
var hMed=hitE(412,262,22,20),hCordL=el("path",{d:"M450 362 L450 462 A112 50 0 0 1 338 412 A112 50 0 0 1 450 362 Z",fill:"transparent"},gBr);
var hHand=hitR(776,360,96,92),hBG=hitE(322,152,30,36),hCbL=hitE(300,244,72,36),hCbR=hitE(600,244,72,36);
var BRHIT=[hCord,hBs,hCtx,hM1,hGlass,hCut,hPin,hVh,hMed,hCordL,hHand,hBG,hCbL,hCbR];
function brHits(l){BRHIT.forEach(function(h){h.setAttribute("display",l.indexOf(h)>=0?"":"none");});}
/* prompts */
var pLvCord=promptAt(gBr,560,470,["Click the spinal cord"],522,440,450,412,44);
var pLvBs=promptAt(gBr,560,330,["Click the brainstem"],504,262,450,250,40);
var pLvCtx=promptAt(gBr,560,330,["Click the cortex"],620,142,620,100,40);
var pGlass=promptAt(gBr,560,320,["Click the glass","to reach for it"],860,404,882,418,22);
var pM1=promptAt(gBr,16,330,["Click the left","motor cortex"],226,72,240,40,34);
var pCut=promptAt(gBr,560,320,["Click the top of the","spinal cord to cut it"],494,334,450,336,36);
var pPin=promptAt(gBr,560,320,["Click the pin to prick","the fingertip"],836,360,860,366,26);
var pVh=promptAt(gBr,540,486,["Click the lower motor neuron"],512,448,488,432,28);
var pMed=promptAt(gBr,560,330,["Click the left side of","the medulla"],432,268,412,262,24);
var pCordL=promptAt(gBr,560,330,["Click the left half","of the spinal cord"],420,388,392,414,40);
var pHand=promptAt(gBr,560,320,["Click the hand to","reach for the glass"],782,402,812,420,38);
var pBG=promptAt(gBr,16,340,["Click the","basal ganglia"],300,182,322,152,34);
var pPick=el("g",{},gBr);tx(pPick,16,340,"Click the part","tm",17,"start");tx(pPick,16,362,"that is damaged","tm",17,"start");
pPick._rings=[[600,244,44],[300,244,44],[322,152,32]].map(function(c){return el("circle",{cx:c[0],cy:c[1],r:c[2],"data-r":c[2],fill:"none",stroke:GOLD,"stroke-width":4},pPick);});
pPick.setAttribute("display","none");
var brPick=el("ellipse",{cx:600,cy:244,rx:76,ry:40,fill:"none",stroke:MAROON,"stroke-width":5},gBr);

function brIdle(){
  brHemL.setAttribute("fill",CTXF);brHemR.setAttribute("fill",CTXF);brBS.setAttribute("fill","#fff");brCordR.setAttribute("fill","#fff");brSlice.setAttribute("fill","#fff");
  brM1.setAttribute("opacity",.45);brBG.forEach(function(e){e.setAttribute("stroke-width",2);e.setAttribute("stroke",GDEEP);});brCb.forEach(function(e){e.setAttribute("stroke",NAVY);e.setAttribute("stroke-width",3);});
  brReach(0);show([brGlass,brPin,gLT,gRT,gIn,gCbL,gBgL,brLv,brSt,brLegIn,brLegCb,brLesM1,brLesMed,brLesCord,brCut,bodA.g,bodB.g,vhGlow,stopB,brPick,lSN],false);
  gLT.setAttribute("opacity",1);gRT.setAttribute("opacity",1);SEL.forEach(function(c){c.g.setAttribute("display","none");});selState(false);
  LVT.forEach(function(g){g.setAttribute("opacity",.25);});stageOn(-1);cbLT.textContent="left cerebellum";
  [lLT,lRT,lCopy,lFb,lCor,lBgIn,lBgOut,lBgUp,lSN].forEach(function(l){l.removeAttribute("stroke-dashoffset");if(l._dash)l.setAttribute("stroke-dasharray",l._dash);else l.removeAttribute("stroke-dasharray");});
  brLabs([]);brHits([]);
}
/* the whole voluntary sequence, used in step 2 and the review */
function reachSeq(a){
  stageOn(0);brHemL.setAttribute("fill",GLOW);brHemR.setAttribute("fill",GLOW);
  return wait(900,a).then(function(){brHemL.setAttribute("fill",CTXF);brHemR.setAttribute("fill",CTXF);stageOn(1);
    brBG.forEach(function(e){e.setAttribute("stroke-width",4);e.setAttribute("stroke",MAROON);});brCb.forEach(function(e){e.setAttribute("stroke",MAROON);e.setAttribute("stroke-width",5);});
    return run(dD,BG_IN.concat(BG_OUT).concat(BG_UP.slice(1)),1300,a);})
  .then(function(){brBG.forEach(function(e){e.setAttribute("stroke-width",2);e.setAttribute("stroke",GDEEP);});brCb.forEach(function(e){e.setAttribute("stroke",NAVY);e.setAttribute("stroke-width",3);});
    stageOn(2);brM1.setAttribute("opacity",1);return wait(600,a);})
  .then(function(){stageOn(3);gLT.setAttribute("display","");return Promise.all([reveal(lLT,1900,a),run(dA,LT,1900,a)]);})
  .then(function(){return tweenVal(0,1,500,a,brReach);})
  .then(function(){stageOn(4);brCb[1].setAttribute("stroke",MAROON);brCb[1].setAttribute("stroke-width",5);return run(dC,CB_FB,1000,a);})
  .then(function(){return run(dB,CB_COR,900,a);})
  .then(function(){brCb[1].setAttribute("stroke",NAVY);brCb[1].setAttribute("stroke-width",3);});
}

/* ======================= reaching, seen from above ======================= */
var gRe=G("reach");
el("rect",{x:360,y:76,width:528,height:416,rx:10,fill:"#F5F2EB",stroke:INK2,"stroke-width":2},gRe);
tx(gRe,372,96,"a table, seen from above","t",12,"start");
el("ellipse",{cx:248,cy:170,rx:44,ry:100,fill:TISS,stroke:MAROON,"stroke-width":3},gRe);
poly(gRe,[[270,96],[360,128],[440,122]],MAROON,30);poly(gRe,[[270,96],[360,128],[440,122]],TISS,24);
el("circle",{cx:448,cy:122,r:16,fill:TISS,stroke:MAROON,"stroke-width":3},gRe);
el("circle",{cx:262,cy:170,r:34,fill:"#E6DCCB",stroke:INK2,"stroke-width":2.5},gRe);
el("path",{d:"M294 160 l12 10 l-12 10",fill:"#E6DCCB",stroke:INK2,"stroke-width":2.5},gRe);
tx(gRe,250,296,"a person, seen","t",12,"middle");tx(gRe,250,312,"from above","t",12,"middle");
var RS=[268,250],RL=190,RREST=[480,330],RCUP=[590,170];
el("circle",{cx:RCUP[0],cy:RCUP[1],r:22,fill:"#fff",stroke:NAVY,"stroke-width":3},gRe);el("circle",{cx:RCUP[0],cy:RCUP[1],r:15,fill:"#9C6B43"},gRe);
el("rect",{x:RCUP[0]+20,y:RCUP[1]-6,width:14,height:12,rx:5,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gRe);
tx(gRe,RCUP[0],RCUP[1]+40,"cup","t",12,"middle");
var reGhost=el("polyline",{points:"",fill:"none",stroke:INK2,"stroke-width":2.5,"stroke-dasharray":"6 5"},gRe);
var reTrail=el("polyline",{points:"",fill:"none",stroke:GDEEP,"stroke-width":3,"stroke-linejoin":"round"},gRe);
var reUpO=el("line",{stroke:MAROON,"stroke-width":30,"stroke-linecap":"round"},gRe),reFoO=el("line",{stroke:MAROON,"stroke-width":28,"stroke-linecap":"round"},gRe);
var reUp=el("line",{stroke:TISS,"stroke-width":24,"stroke-linecap":"round"},gRe),reFo=el("line",{stroke:TISS,"stroke-width":22,"stroke-linecap":"round"},gRe);
var reHand=el("circle",{r:17,fill:TISS,stroke:MAROON,"stroke-width":3},gRe);
function setL(l,p,q){l.setAttribute("x1",p[0]);l.setAttribute("y1",p[1]);l.setAttribute("x2",q[0]);l.setAttribute("y2",q[1]);}
function armTo(h){var dx=h[0]-RS[0],dy=h[1]-RS[1],d=Math.hypot(dx,dy),m=2*RL-2;if(d>m){h=[RS[0]+dx*m/d,RS[1]+dy*m/d];d=m;}
  var a0=Math.atan2(dy,dx),b=Math.acos(d/(2*RL)),e=[RS[0]+RL*Math.cos(a0+b),RS[1]+RL*Math.sin(a0+b)];
  [reUpO,reUp].forEach(function(l){setL(l,RS,e);});[reFoO,reFo].forEach(function(l){setL(l,e,h);});reHand.setAttribute("cx",h[0]);reHand.setAttribute("cy",h[1]);return h;}
var RD=[RCUP[0]-RREST[0],RCUP[1]-RREST[1]],RDL=Math.hypot(RD[0],RD[1]),RN=[-RD[1]/RDL,RD[0]/RDL];
function sm(u){u=Math.max(0,Math.min(1,u));return u*u*(3-2*u);}
function lerp2(p,q,s){return [p[0]+(q[0]-p[0])*s,p[1]+(q[1]-p[1])*s];}
function off(p,o){return [p[0]+RN[0]*o,p[1]+RN[1]*o];}
var ROVER=[RCUP[0]+RD[0]*.15,RCUP[1]+RD[1]*.15];
var RPATH={
 h:function(t){return lerp2(RREST,RCUP,sm(t));},
 c:function(t){var b=t<.62?lerp2(RREST,ROVER,sm(t/.62)):lerp2(ROVER,RCUP,sm((t-.62)/.38));var amp=22*Math.min(1,Math.max(0,(t-.12)/.55));return off(b,amp*Math.sin(2*Math.PI*6*t));},
 p:function(t){if(t<.4)return off(RREST,7*Math.sin(2*Math.PI*9*t/.4));var u=(t-.4)/.6;return off(lerp2(RREST,RCUP,sm(u)),2.5*Math.sin(2*Math.PI*14*u));}};
var RDUR={h:1300,c:3000,p:4600};
function rePts(f,n){var o=[];for(var i=0;i<=n;i++){var q=f(i/n);o.push(q[0].toFixed(1)+","+q[1].toFixed(1));}return o.join(" ");}
function reachRun(k,a){var pts=[];reTrail.setAttribute("points","");
  return lin(RDUR[k],a,function(t){var h=armTo(RPATH[k](t));pts.push(h[0].toFixed(1)+","+h[1].toFixed(1));reTrail.setAttribute("points",pts.join(" "));})
    .then(function(){if(!a||reduce)reTrail.setAttribute("points",rePts(RPATH[k],240));});}
function chip(cx,w,s){var g=el("g",{},gRe);var r=el("rect",{x:cx-w/2,y:26,width:w,height:36,rx:18,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},g);var t=tx(g,cx,49,s,"tn",14,"middle");return {g:g,r:r,t:t,s:s};}
var chH=chip(470,120,"healthy"),chC=chip(640,190,"cerebellum damaged"),chP=chip(818,150,"Parkinson disease");
function chipDone6(c,on){c.r.setAttribute("fill",on?"#EEF0F3":"#FFF6D6");c.r.setAttribute("stroke",on?INK2:GOLD);c.r.setAttribute("stroke-width",on?1.5:3);c.t.textContent=(on?"✓ ":"")+c.s;}
var reRow={h:[tx(gRe,520,392,"","tn",13,"start")],c:[tx(gRe,520,418,"","tm",13,"start"),tx(gRe,520,434,"","tm",13,"start")],p:[tx(gRe,520,458,"","tn",13,"start"),tx(gRe,520,474,"","tn",13,"start")]};
var REROW={h:["Healthy: smooth, and it stops on the cup"],c:["Cerebellum: shakes more near the cup,","and overshoots it"],p:["Parkinson: shakes at rest, slow to start,","then slow and small"]};
function rowOn(k,on){reRow[k].forEach(function(t,i){t.textContent=on?REROW[k][i]:"";});}
var pChH=promptAt(gRe,640,300,["Click healthy first"],480,70,470,44,30);
var pChC=promptAt(gRe,630,300,["Now click","cerebellum damaged"],650,70,640,44,30);
var pChP=promptAt(gRe,630,300,["Click Parkinson","disease"],810,70,818,44,30);
function reIdle(){armTo(RREST);reTrail.setAttribute("points","");reGhost.setAttribute("points","");[chH,chC,chP].forEach(function(c){chipDone6(c,false);});["h","c","p"].forEach(function(k){rowOn(k,false);});}

/* ======================= the two-neuron chain and the leg ======================= */
var gLg=G("leg");
var lgB=el("g",{transform:"translate(10 12) scale(.36)"},gLg);
el("path",{d:HEMI6,fill:CTXF,stroke:NAVY,"stroke-width":7},lgB);el("path",{d:HEMI6_IN,fill:"#fff"},lgB);
var lgBR=el("g",{transform:"translate(900 0) scale(-1 1)"},lgB);el("path",{d:HEMI6,fill:CTXF,stroke:NAVY,"stroke-width":7},lgBR);el("path",{d:HEMI6_IN,fill:"#fff"},lgBR);
el("circle",{cx:96,cy:28,r:6,fill:NAVY},gLg);
tx(gLg,14,30,"motor","tn",12,"start");tx(gLg,14,46,"cortex","tn",12,"start");
el("path",{d:"M160 84 L162 140 L182 140 L184 84 Z",fill:"#fff",stroke:NAVY,"stroke-width":2.5},gLg);
el("rect",{x:163,y:140,width:18,height:146,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gLg);
tx(gLg,192,122,"brainstem","t",12,"start");
el("ellipse",{cx:172,cy:330,rx:76,ry:46,fill:"#fff",stroke:NAVY,"stroke-width":3},gLg);
el("path",{d:"M410 384 Q422 378 432 396 L440 408 L460 408 L468 396 Q478 378 490 384 L484 406 Q508 420 498 440 Q484 450 470 436 L460 422 L440 422 L430 436 Q416 450 402 440 Q392 420 416 406 Z",fill:TINT,stroke:INK2,"stroke-width":2.5,transform:"translate(172 330) scale(.68 .9) translate(-450 -414)"},gLg);
tx(gLg,172,396,"spinal cord","t",12,"middle");
/* the leg: femur, quadriceps on top, hamstrings below, knee, lower leg and foot */
el("rect",{x:340,y:238,width:296,height:24,rx:12,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},gLg);
var lgQ=el("ellipse",{cx:480,cy:222,rx:150,ry:24,fill:TISS,stroke:MAROON,"stroke-width":3},gLg);
var lgH=el("ellipse",{cx:470,cy:284,rx:140,ry:20,fill:TISS,stroke:MAROON,"stroke-width":3},gLg);
tx(gLg,480,192,"quadriceps","tm",13,"middle");
var lgFas=el("g",{},gLg);
var FAS=[[400,214],[440,228],[478,212],[516,230],[556,216],[592,226]].map(function(q){return el("path",{d:"M"+(q[0]-6)+" "+q[1]+" q3 -5 6 0 q3 5 6 0",fill:"none",stroke:MAROON,"stroke-width":2.5},lgFas);});
var lgLow=el("g",{},gLg);
el("rect",{x:624,y:258,width:32,height:166,rx:14,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},lgLow);
el("path",{d:"M620 290 Q596 350 620 410 L626 410 L626 290 Z",fill:TISS,stroke:MAROON,"stroke-width":2},lgLow);
el("rect",{x:614,y:418,width:98,height:28,rx:12,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},lgLow);
var lgToe=el("g",{},lgLow);el("rect",{x:704,y:422,width:34,height:16,rx:8,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},lgToe);
el("line",{x1:660,y1:256,x2:654,y2:300,stroke:INK2,"stroke-width":6,"stroke-linecap":"round"},lgLow);
var hSole=el("rect",{x:610,y:410,width:134,height:56,fill:"transparent"},lgLow);
el("circle",{cx:640,cy:252,r:20,fill:"#E6DCCB",stroke:INK2,"stroke-width":2.5},gLg);
el("ellipse",{cx:658,cy:240,rx:9,ry:13,fill:"#fff",stroke:INK2,"stroke-width":2.5},gLg);
function lgAngle(d){lgLow.setAttribute("transform","rotate("+d+" 640 252)");}
function toeAngle6(d){lgToe.setAttribute("transform","rotate("+d+" 708 430)");}
var lgPen=dot(lgLow,GDEEP,8);
/* the two neurons */
var UMN=[[96,30],[140,60],[164,90],[164,118],[178,134],[178,300],[194,346]],LMN=[[194,346],[250,366],[316,326],[334,252],[380,236]];
poly(gLg,UMN,NAVY,4);poly(gLg,LMN,MAROON,4);
el("circle",{cx:194,cy:346,r:7,fill:MAROON,stroke:"#fff","stroke-width":2},gLg);
tx(gLg,196,182,"upper motor neuron","tn",13,"start");tx(gLg,226,412,"lower motor neuron","tm",13,"start");
var lgXU=el("g",{},gLg);el("line",{x1:166,y1:202,x2:190,y2:226,stroke:MAROON,"stroke-width":6},lgXU);el("line",{x1:190,y1:202,x2:166,y2:226,stroke:MAROON,"stroke-width":6},lgXU);
var lgXL=el("g",{},gLg);el("line",{x1:271,y1:334,x2:295,y2:358,stroke:MAROON,"stroke-width":6},lgXL);el("line",{x1:295,y1:334,x2:271,y2:358,stroke:MAROON,"stroke-width":6},lgXL);
/* the findings card */
el("rect",{x:690,y:24,width:202,height:238,rx:10,fill:"#fff",stroke:INK2,"stroke-width":1.5},gLg);
tx(gLg,700,46,"The exam finds","tn",14,"start");
var FROW=["Strength","Tone","Knee jerk","Muscle bulk","Twitches at rest","Sole stroke"];
var FV=FROW.map(function(s,i){tx(gLg,700,68+i*34,s,"tn",13,"start");return tx(gLg,700,83+i*34,"","t",12,"start");});
var FIND={umn:["weak","high, stiff (spasticity)","brisk, with clonus","little wasting at first","none","big toe goes up"],
 lmn:["weak","low, floppy (flaccid)","weak or absent","marked wasting","yes (fasciculations)","no Babinski sign"],
 als:["weak","often high (spastic)","brisk, even when wasted","wasting","yes (fasciculations)","big toe can go up"]};
function findShow(k,upto){FV.forEach(function(t,i){t.textContent=(k&&i<=upto)?FIND[k][i]:"";});}
/* the hammer */
var lgHam=el("g",{},gLg);
el("rect",{x:-40,y:-40,width:90,height:90,fill:"transparent"},lgHam);
el("rect",{x:6,y:-6,width:70,height:12,rx:5,fill:INK2,transform:"rotate(35)"},lgHam);
el("path",{d:"M-14 -16 L14 -16 L18 16 L-18 16 Z",fill:NAVY,transform:"rotate(35)"},lgHam);
var LH0=[740,330],LH1=[688,300];
var hUmn=el("circle",{cx:180,cy:214,r:26,fill:"transparent"},gLg),hLmn=el("circle",{cx:283,cy:346,r:26,fill:"transparent"},gLg);
var lpU=promptAt(gLg,16,250,["Click the upper","motor neuron"],150,220,180,214,26);
var lpL=promptAt(gLg,16,470,["Click the lower motor neuron"],262,372,283,346,26);
var lpH=promptAt(gLg,420,350,["Click the hammer to","tap the tendon"],708,334,740,330,32);
var lpS=promptAt(gLg,380,482,["Click the sole of the foot"],626,456,668,440,30);
function lgIdle(){lgAngle(0);toeAngle6(0);place(lgHam,LH0[0],LH0[1]);lgQ.setAttribute("ry",24);lgQ.setAttribute("rx",150);lgH.setAttribute("ry",20);
  show([lgXU,lgXL,lgFas],false);lgPen.setAttribute("display","none");findShow(null);}
function strike(a){return tweenPath(lgHam,[LH1],180,a).then(function(){return tweenPath(lgHam,[LH0],220,a);});}
function kick(ang,a){return tweenVal(0,ang,ang<-30?190:260,a,lgAngle).then(function(){return tweenVal(ang,0,600,a,lgAngle);});}
function clonus(a){var seq=[-24,-17,-11],k=0;function beat(){if(k>=seq.length)return Promise.resolve();var v=seq[k++];return tweenVal(0,v,140,a,lgAngle).then(function(){return tweenVal(v,0,220,a,lgAngle);}).then(beat);}return beat();}
function soleStroke(up,a){lgPen.setAttribute("display","");place(lgPen,620,452);
  return tweenPath(lgPen,[[704,452],[722,444]],900,a).then(function(){lgPen.setAttribute("display","none");return tweenVal(0,up?-35:18,500,a,toeAngle6);});}
function twitch(a){if(!a||reduce){lgFas.setAttribute("display","");return Promise.resolve();}
  lgFas.setAttribute("display","");var k=0;function f(){if(k>=14)return Promise.resolve();k++;FAS.forEach(function(p,i){p.setAttribute("display",((i*7+k*3)%5<2)?"":"none");});return wait(110,a).then(f);}
  return f().then(function(){FAS.forEach(function(p){p.setAttribute("display","");});});}
function waste(a){return tweenVal(0,1,700,a,function(k){lgQ.setAttribute("ry",24-11*k);lgQ.setAttribute("rx",150-8*k);lgH.setAttribute("ry",20-7*k);});}

/* ======================= sorting the findings ======================= */
var gSo=G("sort");
el("rect",{x:40,y:80,width:390,height:250,rx:10,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gSo);
el("rect",{x:470,y:80,width:390,height:250,rx:10,fill:"#fff",stroke:MAROON,"stroke-width":2.5},gSo);
tx(gSo,235,104,"upper motor neuron damage","tn",15,"middle");tx(gSo,665,104,"lower motor neuron damage","tm",15,"middle");
var soBoth=tx(gSo,450,374,"Both kinds of damage make the muscle weak.","tn",16,"middle");
var SOF=[["brisk reflexes and clonus",0],["marked wasting",1],["big toe goes up (Babinski)",0],["floppy, low tone (flaccid)",1],["twitches under the skin",1],["stiff, high tone (spasticity)",0],["weak or absent reflexes",1],["little wasting at first",0]];
var SOC=SOF.map(function(f){var g=el("g",{},gSo);el("rect",{x:-150,y:-20,width:300,height:40,rx:12,fill:f[1]?"#FBF1EF":"#EEF1F7",stroke:f[1]?MAROON:NAVY,"stroke-width":2.5},g);tx(g,0,5,f[0],"tn",14,"middle");return g;});
var pSo=promptAt(gSo,16,44,["Click each finding"],290,40,450,40,30);
function soSlot(i){var col=SOF[i][1],n=0;for(var j=0;j<i;j++)if(SOF[j][1]===col)n++;return [col?665:235,140+n*52];}
function soIdle(){SOC.forEach(function(g){g.setAttribute("display","none");place(g,450,40);});soBoth.setAttribute("display","none");}
function soAll(){SOC.forEach(function(g,i){g.setAttribute("display","");var s=soSlot(i);place(g,s[0],s[1]);});soBoth.setAttribute("display","");}

makeCap();
function resetAll(){
  hide([dA,dB,dC,dD,dE]);brIdle();reIdle();lgIdle();soIdle();cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}
function lt(on){gLT.setAttribute("display",on?"":"none");}

/* ======================= steps ======================= */
var STEPS=[
{sec:"Levels of motor control",comp:"Competency 17",
 title:"Three levels of control",
 text:["Last week you followed reflexes through the spinal cord and traced the long pathways that run up and down it. This week puts those pieces together to answer a bigger question: how does your nervous system carry out a movement you choose to make, like reaching for a glass of water?","Movement is controlled at three levels, stacked one above the other. The spinal cord is the lowest level. It runs spinal reflexes on its own, and it holds the motor neurons that every command must pass through to reach a muscle. The brainstem is the middle level. It keeps you upright and balanced, adjusting your posture through reflexes. The cerebral cortex is the top level, where voluntary movements are decided, planned and started.","Two more structures work beside the cortex rather than above it: the cerebellum and the basal ganglia. They adjust movements but do not send commands down to the muscles themselves. The figure shows the person from behind, as in Week 5. Click each level, starting at the bottom, to see what it adds."],
 name:"motor control hierarchy",
 auto:true,
 desc:"The person seen from behind, as in Week 5: the two halves of the brain, the basal ganglia deep beside the thalamus, the brainstem with the cerebellum on either side of it, the spinal cord running down into a slice, and a spinal nerve running out to the right hand. Brackets down the right side mark three levels. The student clicks the spinal cord, then the brainstem, then the cortex. Each level lights up gold and its label appears: spinal cord, reflexes and the path out; brainstem, posture and balance; cortex, decides, plans and starts. Then the cerebellum and the basal ganglia are outlined and labeled as the structures beside the cortex that adjust the movement.",
 pre:function(){S(["br"]);show([brLv],true);brLabs(["mid"]);brHits([hCord,hBs,hCtx]);},
 play:function(a){return waitOn(hCord,pLvCord,a).then(function(){brCordR.setAttribute("fill",GLOW);brSlice.setAttribute("fill",GLOW);LVT[2].setAttribute("opacity",1);return waitOn(hBs,pLvBs,a);})
   .then(function(){brBS.setAttribute("fill",GLOW);LVT[1].setAttribute("opacity",1);return waitOn(hCtx,pLvCtx,a);})
   .then(function(){brHemL.setAttribute("fill",GLOW);brHemR.setAttribute("fill",GLOW);LVT[0].setAttribute("opacity",1);return wait(500,a);})
   .then(function(){brBG.forEach(function(e){e.setAttribute("stroke-width",4);e.setAttribute("stroke",MAROON);});brCb.forEach(function(e){e.setAttribute("stroke",MAROON);e.setAttribute("stroke-width",5);});brLabs(["mid","bg","cb"]);cap("Three levels, with two helpers that adjust the movement.");});}},

{title:"Reaching for a glass",
 text:["Your textbook breaks a voluntary movement into stages. First comes the decision to move and the plan, worked out in the association areas of the cortex together with the basal ganglia and the cerebellum. Next, the primary motor cortex starts the movement. Then the command is carried out: it travels down the corticospinal tract and the brainstem pathways to the lower motor neurons in the spinal cord, and they make the muscles contract. As the arm moves, sensory feedback from the muscles and joints lets the cerebellum and the cortex adjust the movement while it is happening.","Click the glass to reach for it, and watch each stage light up on the right."],
 ask:"Of all the structures that light up, which ones actually send the command down the spinal cord, and which ones only help shape it?",
 ans:["The command goes down the cord from the primary motor cortex, through the corticospinal tract, and from the brainstem, through its own pathways. Both end on the lower motor neurons in the spinal cord, and only the lower motor neurons reach the muscle.","The association areas, the basal ganglia and the cerebellum shape the movement but do not send commands down the cord to the muscles. The basal ganglia and the cerebellum send their output mainly back up to the motor cortex, by way of the thalamus, and the cerebellum also sends output to the brainstem. In that way they change what gets sent. That is why damage to either one changes how a movement is done rather than taking the movement away."],
 name:"voluntary movement",
 desc:"The person seen from behind with a glass beside the right hand, and five stages listed down the right side: decide, plan, start, carry out, adjust. The student clicks the glass. Each stage lights up in turn: the cortex on both sides glows for the decision; the basal ganglia and the cerebellum are outlined while a dot travels from the cortex through the basal ganglia and the thalamus and back, for the plan; the left motor cortex brightens to start the movement; a gold line runs from the left motor cortex down the brainstem, crosses at the bottom of the medulla, runs down the right side of the cord to the ventral horn and out to the right hand, which closes around the glass; then a maroon dot of feedback runs from the hand up to the right cerebellum, and a navy dot of correction runs from the cerebellum through the left thalamus to the motor cortex.",
 pre:function(){S(["br"]);show([brSt,brGlass],true);brLabs(["m1","bg","cb","th","mid"]);brHits([hGlass]);},
 play:function(a){return waitOn(hGlass,pGlass,a).then(function(){return reachSeq(a);}).then(function(){cap("Decide, plan, start, carry out, and adjust.");});}},

{title:"Cut off from the brain",
 text:["A diving accident damages the spinal cord in the neck, above the segments that control the arm. Below the injury, the lower levels of control are still there, but they can no longer hear from the levels above.","Click the top of the cord to cut it. Then click the motor cortex to send a command, and click the pin to prick the fingertip."],
 ask:"Below the cut, which movements are lost, and which ones can still happen?",
 ans:["Voluntary movement is lost below the cut, because the commands from the cortex and the brainstem can no longer reach the lower motor neurons. The person also loses the brainstem's control of posture below that level. But the spinal cord is a level of control in its own right. The circuit for the withdrawal reflex lies entirely below the cut, so once the first days after the injury have passed, a pinprick still pulls the hand away, even though the person can neither feel the pin nor move the hand on purpose.","Right after the injury, the reflexes below the cut disappear for days to weeks, a period called spinal shock. When they come back, they are often brisker than normal, because the brain no longer holds them back. The cord also holds networks that produce rhythmic movements, such as the stepping pattern of walking. These networks are called central pattern generators, and the brain normally starts, stops and adjusts them."],
 name:"spinal reflex",
 desc:"The person seen from behind with a pin above the right fingertip. The student clicks the top of the spinal cord, and a maroon bar appears across it, just below the brainstem. The student clicks the left motor cortex, and a gold dot runs down the corticospinal pathway, crosses, and stops at the cut, where a maroon X appears. The student clicks the pin: a maroon dot runs from the fingertip into the cord slice, which lies below the cut, a gray dot crosses to the ventral horn, a gold dot runs back out to the hand, and the hand pulls away from the pin.",
 pre:function(){S(["br"]);show([brPin],true);brLabs(["m1","cord","mid"]);brHits([hCut,hM1,hPin]);},
 play:function(a){return waitOn(hCut,pCut,a).then(function(){brCut.setAttribute("display","");return waitOn(hM1,pM1,a);})
   .then(function(){return run(dA,LT.slice(0,7).concat([[478,318]]),1300,a,true);})
   .then(function(){stopB.setAttribute("display","");return waitOn(hPin,pPin,a);})
   .then(function(){return run(dC,[[860,400],[782,412],[612,410],[575,394],[520,380],[484,392],[476,416]],900,a);})
   .then(function(){return run(dD,[[476,416],[488,432],[520,446],[612,424],[782,428],[850,420]],800,a);})
   .then(function(){return tweenVal(0,18,250,a,function(v){place(brHand,0,v);});})
   .then(function(){cap("The command stops at the cut, but the reflex still works.");});}},

{sec:"The corticospinal pathway",comp:"Competency 18",
 title:"From the motor cortex to the muscle",
 text:["In Week 5 you saw that the left motor cortex moves the right hand. Now follow that command stop by stop. It starts in the primary motor cortex, the strip of cortex just in front of the central sulcus in the frontal lobe, called the precentral gyrus. Like the touch map just behind it, this strip is laid out as a map of the body, with large areas for the hands and the face.","The command is carried by two neurons. The first, the upper motor neuron, runs all the way from the cortex down to the spinal cord. The second, the lower motor neuron, runs from the spinal cord out to the muscle. Click the left motor cortex to send the command."],
 ask:"Name the places the upper motor neuron's axon passes on its way down. Where does it cross the midline, and on which side of the spinal cord does it travel?",
 ans:["The axon leaves the motor cortex and runs down through the internal capsule, a narrow band of white matter between the thalamus and the basal ganglia. It continues through the brainstem: the midbrain, the pons and the medulla. At the bottom of the medulla, in the pyramids, most of the axons, about 85 to 90 percent, cross the midline. This crossing is the pyramidal decussation. The crossed axons travel down the opposite side of the cord, the right side here, in the lateral corticospinal tract. The few that do not cross travel down the front of the cord in the anterior corticospinal tract.","In the ventral horn, the upper motor neuron synapses on a lower motor neuron, directly or through an interneuron. The lower motor neuron leaves through the ventral root, runs in the spinal nerve, and releases acetylcholine at the neuromuscular junction, and the muscles of the right hand contract. Because the axons are packed so tightly in the internal capsule, a small stroke there can weaken the whole opposite side of the body."],
 name:"corticospinal tract",
 desc:"The person seen from behind. The student clicks the left motor cortex. A gold line then runs from the left motor cortex down through the internal capsule, between the basal ganglia and the thalamus, down the left side of the brainstem through the midbrain, pons and medulla, crosses the midline at the pyramids at the bottom of the medulla, runs down the right side of the cord, synapses on the lower motor neuron in the right ventral horn, and runs out the spinal nerve to the right hand, whose fingers close. Labels appear for each part: upper motor neuron, internal capsule, midbrain, pons, medulla, crosses at the pyramids, lateral corticospinal tract and lower motor neuron.",
 pre:function(){S(["br"]);brLabs(["m1","mid"]);brHits([hM1]);},
 play:function(a){return waitOn(hM1,pM1,a).then(function(){lt(true);brM1.setAttribute("opacity",1);return Promise.all([reveal(lLT,2400,a),run(dA,LT,2400,a)]);})
   .then(function(){return tweenVal(0,1,400,a,brClose);})
   .then(function(){brLabs(["m1","mid","umn","ic","bs","pyr","lcst","lmn","th","bg","hand"]);cap("Two neurons, one crossing at the pyramids.");});}},

{title:"The final common path",
 text:["The lower motor neuron in the ventral horn receives signals from many sources: the upper motor neurons of the corticospinal tract, the pathways coming down from the brainstem, and the sensory neurons and interneurons of spinal reflexes. Click the lower motor neuron in the ventral horn."],
 ask:"Why is the lower motor neuron called the final common path?",
 ans:["Because every signal that makes a skeletal muscle contract has to pass through it, whether it comes from a reflex, from the brainstem adjusting your posture, or from a movement you choose. The lower motor neuron adds up all the excitatory and inhibitory input it receives, and only if that sum reaches threshold does it fire and make its muscle fibers contract. Nothing else connects the nervous system to a skeletal muscle.","That is why losing the lower motor neuron is so serious. Once it is gone, the muscle cannot contract for any reason, not for a reflex and not on command."],
 name:"final common path",
 desc:"The corticospinal pathway stays on the figure, and a key at the upper right shows three inputs: gold from the cortex, navy from the brainstem, maroon from a reflex. The student clicks the lower motor neuron in the right ventral horn, and it is ringed in gold. A navy line comes down from the brainstem to it, a maroon line comes in from a sensory neuron through the dorsal root to it, and a gold dot arrives down the corticospinal pathway, all at the same time. Then one gold dot leaves the lower motor neuron and runs out to the right hand.",
 pre:function(){S(["br"]);lt(true);show([brLegIn],true);brLabs(["mid","cord"]);brHits([hVh]);gIn.setAttribute("display","none");},
 play:function(a){return waitOn(hVh,pVh,a).then(function(){vhGlow.setAttribute("display","");gIn.setAttribute("display","");
     return Promise.all([run(dA,LT.slice(0,10),1500,a),run(dB,IN_BS,1500,a),run(dC,IN_RF,1500,a)]);})
   .then(function(){return run(dD,LT.slice(9),1000,a);})
   .then(function(){brLabs(["mid","cord","lmn"]);cap("Every command to a muscle passes through this one neuron.");});}},

{title:"A stroke in the motor cortex",
 text:["Both corticospinal tracts are drawn now: the gold one from the left side of the brain and the gray one from the right side, crossing each other at the pyramids. A stroke cuts off the blood supply to part of the left motor cortex. Click the left motor cortex to place the stroke."],
 ask:"Which side of the body becomes weak?",
 ans:["The right side. The damage is above the crossing, so the upper motor neurons that are lost are the ones that would have crossed at the pyramids to control the right side of the body. Weakness of one side of the body is called hemiparesis, and complete paralysis of one side is called hemiplegia.","Over the following weeks, the weak right arm and leg typically become stiff, with brisk reflexes and a Babinski sign. These are the upper motor neuron signs you will sort out later in this walkthrough."],
 name:"hemiparesis",
 desc:"Both corticospinal tracts on the figure: gold from the left cortex to the right side of the cord and the right hand, gray dashed from the right cortex to the left side of the cord and the left arm, crossing at the pyramids. The student clicks the left motor cortex, a maroon patch appears there, and the gold tract fades. A small body seen from behind appears at the left, labeled cortex stroke, with its right side shaded maroon and labeled right side weak.",
 pre:function(){S(["br"]);lt(true);gRT.setAttribute("display","");brLabs(["m1","pyr","larm","hand","mid"]);brHits([hM1]);},
 play:function(a){return waitOn(hM1,pM1,a).then(function(){brLesM1.setAttribute("display","");return tweenVal(1,.25,500,a,function(v){gLT.setAttribute("opacity",v);});})
   .then(function(){weak(bodA,"R","cortex stroke:","right side weak");cap("A stroke in the left cortex weakens the right side.");});}},

{title:"Above or below the crossing",
 text:["Now place two more injuries, one at a time. First, a small stroke damages the left side of the medulla, just above the place where the pyramids cross. Second, an injury damages the left half of the spinal cord, below the crossing."],
 ask:"For each injury, which side of the body becomes weak?",
 ans:["The medulla injury weakens the right side, just as the cortex stroke did, because the left medulla above the pyramids still carries fibers that have not crossed yet. The cord injury weakens the left side, the same side as the injury, because by the time the fibers reach the spinal cord they have already crossed. The fibers in the left half of the cord came from the right motor cortex, and they control the left side of the body.","The rule from Week 5 works here too. Damage above the crossing weakens the opposite side of the body, and damage below it weakens the same side. The cord injury is the Brown-Séquard pattern you saw last week: weakness and loss of touch and position sense on the same side, with pain and temperature lost on the other side. To tell the cortex stroke from the medulla stroke, which both weaken the right side, a clinician looks at the face. A stroke in the cortex often weakens the face too, while damage low in the medulla usually spares it, because the fibers to the face muscles leave the pathway higher up in the brainstem."],
 name:"pyramidal decussation",
 desc:"Both corticospinal tracts on the figure. The student clicks the left side of the medulla, just above the place where the pyramids cross, a maroon spot appears there, and the gold tract fades. A small body labeled medulla lesion appears with its right side shaded maroon, right side weak. Then the student clicks the left half of the cord slice, it is shaded maroon, and the gray tract fades. A second small body labeled cord lesion appears with its left side shaded maroon, left side weak.",
 pre:function(){S(["br"]);lt(true);gRT.setAttribute("display","");brLabs(["pyr","larm","hand","mid","bs"]);brHits([hMed,hCordL]);},
 play:function(a){return waitOn(hMed,pMed,a).then(function(){brLesMed.setAttribute("display","");return tweenVal(1,.25,500,a,function(v){gLT.setAttribute("opacity",v);});})
   .then(function(){weak(bodA,"R","medulla lesion:","right side weak");return waitOn(hCordL,pCordL,a);})
   .then(function(){brLesCord.setAttribute("display","");return tweenVal(1,.25,500,a,function(v){gRT.setAttribute("opacity",v);});})
   .then(function(){weak(bodB,"L","cord lesion:","left side weak");cap("Above the crossing: opposite side. Below it: same side.");});}},

{sec:"Cerebellum and basal ganglia",comp:"Competency 19",
 title:"The cerebellum checks the movement",
 text:["The cerebellum sits at the back of the brain, below the two halves of the cerebrum and behind the brainstem. As a movement starts, the motor cortex sends a copy of its command to the cerebellum, by way of the pons. At the same time, the moving arm sends sensory feedback up to the cerebellum from its muscle spindles, tendon organs and joints, and the inner ear reports on balance.","Click the hand to start the reach, and follow the three colored lines in the key."],
 ask:"The cerebellum sends no commands down to the muscles. How can it still make the reach smooth and accurate?",
 ans:["It compares the movement the cortex intended with the movement the arm is actually making. When the two do not match, the cerebellum sends a correction back to the motor cortex, by way of the thalamus, and also to the brainstem, and the command is adjusted while the movement is still going on. That is how your hand slows down and stops right at the glass instead of going past it.","The cerebellum also learns. With practice it fine-tunes the timing and force of each muscle, so a skill like typing or throwing becomes smooth and automatic. Each half of the cerebellum works with the same side of the body: the right half of the cerebellum coordinates the right arm."],
 name:"cerebellum",
 desc:"The person seen from behind with a glass beside the right hand, and a key at the left: gold dashed for the copy of the command, maroon for feedback from the arm, navy for the correction to the cortex. The student clicks the hand. A gold dot leaves the left motor cortex, runs down to the pons and crosses to the right half of the cerebellum. While the hand reaches for the glass, a maroon dot runs from the hand up the cord to the right cerebellum. Then a navy dot runs from the right cerebellum across to the left thalamus and up to the motor cortex. The right half of the cerebellum is outlined in maroon while it compares.",
 pre:function(){S(["br"]);show([brGlass,brLegCb],true);brLabs(["m1","cb","th","mid"]);brHits([hHand]);},
 play:function(a){return waitOn(hHand,pHand,a).then(function(){gCbL.setAttribute("display","");return Promise.all([reveal(lCopy,1300,a),run(dA,CB_COPY,1300,a),reveal(lFb,1300,a),run(dC,CB_FB,1300,a),tweenVal(0,.6,1300,a,brReach)]);})
   .then(function(){brCb[1].setAttribute("stroke",MAROON);brCb[1].setAttribute("stroke-width",5);return wait(500,a);})
   .then(function(){return Promise.all([reveal(lCor,1000,a),run(dB,CB_COR,1000,a)]);})
   .then(function(){return tweenVal(.6,1,300,a,brReach);})
   .then(function(){cap("The cerebellum compares the plan with the feedback.");});}},

{title:"Reaching with cerebellar damage",
 text:["Now the person is seen from above, sitting at a table and reaching with the right hand for a cup. A woman has damage to the right half of her cerebellum. Click healthy first to see a normal reach, then click cerebellum damaged to watch hers."],
 ask:"How will her right hand move as it reaches for the cup, and when does any shaking appear?",
 ans:["The movement still happens, because her motor cortex and its pathways are fine, but it is no longer smooth. The hand wavers, and the shaking grows as the hand gets closer to the cup. This is an intention tremor: it appears during a movement toward a target and is worst near the end. The hand also misjudges the distance and overshoots the cup, then corrects back, which is called dysmetria. Her movements and her walking would be clumsy and unsteady, which is called ataxia. When her hand rests in her lap, the tremor goes away.","Damage to one half of the cerebellum affects the same side of the body. Alcohol affects the cerebellum early, which is why an officer checking for drunk driving may ask a person to walk heel to toe along a line or to touch their nose with a fingertip. Years of heavy drinking can permanently damage the cerebellum and leave a person with an unsteady walk."],
 name:"intention tremor",
 desc:"A person seen from above sits at the left of a table, with the right arm resting on the table and a cup at the far side. Three gold buttons sit above the table: healthy, cerebellum damaged and Parkinson disease. The student clicks healthy, and the hand moves smoothly in a straight line to the cup, leaving a dashed trail. Then the student clicks cerebellum damaged: the hand wavers side to side, with the wavering growing as it nears the cup, overshoots past the cup, and comes back to it, leaving a wavy gold trail. A note under the table reads: cerebellum, shakes more near the cup, and overshoots it.",
 pre:function(){S(["reach"]);},
 play:function(a){return waitOn(chH.g,pChH,a).then(function(){return reachRun("h",a);})
   .then(function(){chipDone6(chH,true);rowOn("h",true);reGhost.setAttribute("points",reTrail.getAttribute("points"));reTrail.setAttribute("points","");armTo(RREST);return waitOn(chC.g,pChC,a);})
   .then(function(){return reachRun("c",a);})
   .then(function(){chipDone6(chC,true);rowOn("c",true);cap("The tremor grows as the hand nears its target.");});}},

{title:"The basal ganglia pick the movement",
 text:["The basal ganglia, which your textbook calls the basal nuclei, are clusters of gray matter deep in each half of the brain, beside the thalamus. They work in a loop: the cortex sends them its plans, and they send their output back to the cortex by way of the thalamus. They have no pathway of their own down to the spinal cord. One part of them, the substantia nigra in the midbrain, supplies them with dopamine.","At any moment the cortex has several possible movements in mind, shown on the right. Click the basal ganglia to see what they do with them."],
 ask:"What would happen if the basal ganglia let too little through? What if they let too much through?",
 ans:["The basal ganglia help select the movement you want and start it, and they hold back the movements you do not want. They work mostly by inhibition. Their output normally holds the motor part of the thalamus in check, like a brake, and releasing the brake for the chosen movement lets that movement go ahead.","If too little gets through, movements become hard to start, slow and small, as in Parkinson disease, the next step. If too much gets through, unwanted movements break out, as in Huntington disease, where degeneration in the basal ganglia causes jerky, dance-like movements the person cannot stop."],
 name:"basal ganglia",
 desc:"The person seen from behind, with three possible movements listed in boxes at the upper right: reach for cup, scratch nose, tap foot. A dashed navy line runs from the substantia nigra in the midbrain to the basal ganglia. The student clicks the basal ganglia on the left side. Three gold dots travel from the motor cortex into the basal ganglia. Only one continues, through the thalamus and back up to the motor cortex. The reach for cup box turns maroon and reads let through, and the other two turn gray and read held back.",
 pre:function(){S(["br"]);SEL.forEach(function(c){c.g.setAttribute("display","");});gBgL.setAttribute("display","");[lBgIn,lBgOut,lBgUp].forEach(function(l){l.setAttribute("display","none");});lSN.setAttribute("display","");brLabs(["m1","bg","th","sn","mid"]);brHits([hBG]);},
 play:function(a){return waitOn(hBG,pBG,a).then(function(){lBgIn.setAttribute("display","");brBG.forEach(function(e){e.setAttribute("stroke-width",4);e.setAttribute("stroke",MAROON);});
     return Promise.all([run(dA,BG_IN,800,a),run(dD,[[236,42],[276,108],[312,138]],800,a),run(dE,[[236,42],[266,114],[308,146]],800,a)]);})
   .then(function(){[lBgOut,lBgUp].forEach(function(l){l.setAttribute("display","");});return run(dA,BG_OUT.concat(BG_UP.slice(1)),1100,a);})
   .then(function(){selState(true);cap("The basal ganglia let one movement go and hold back the rest.");});}},

{title:"Parkinson disease",
 text:["In Parkinson disease, the dopamine neurons of the substantia nigra slowly die, and the basal ganglia lose the dopamine they need to let movements through. The healthy reach stays on the table as a dashed line. Click Parkinson disease to watch the same reach."],
 ask:"How is this person's tremor different from the tremor after cerebellar damage, and what else is wrong with the reach?",
 ans:["This is a resting tremor. The hand shakes while it rests on the table, and the shaking eases once the hand starts to move, the opposite of the intention tremor after cerebellar damage. The person is also slow to start the movement, and when it comes, it is slow and small, which is called bradykinesia. The muscles feel stiff when someone else moves the limb, which is called rigidity. People with Parkinson disease often walk with short, shuffling steps and show little facial expression.","Treatment replaces the missing dopamine. Dopamine itself cannot cross the blood-brain barrier you studied in Week 5, so patients take L-dopa, a precursor that does cross and is turned into dopamine in the brain."],
 name:"resting tremor",
 desc:"The table seen from above, with the healthy reach shown as a dashed trail and the healthy and cerebellum damaged buttons already checked. The student clicks Parkinson disease. The hand shakes in place at rest for a moment before it starts, then moves slowly toward the cup with only a slight shake, leaving a gold trail. A note under the table reads: Parkinson, shakes at rest, slow to start, then slow and small.",
 pre:function(){S(["reach"]);chipDone6(chH,true);chipDone6(chC,true);rowOn("h",true);rowOn("c",true);reGhost.setAttribute("points",rePts(RPATH.h,60));},
 play:function(a){return waitOn(chP.g,pChP,a).then(function(){return reachRun("p",a);})
   .then(function(){chipDone6(chP,true);rowOn("p",true);cap("This tremor is at rest and fades as the hand moves.");});}},

{title:"Which structure is it?",
 text:["A man's right hand shakes more and more as his finger moves toward his nose, and it overshoots. When his hand rests in his lap, the shaking stops. He sways and stumbles when he walks."],
 ask:"Which structure is damaged, and on which side? After you write your answer, click it on the figure.",
 ans:["The right half of the cerebellum. A tremor that appears during a movement and gets worse near the target, an overshoot, and an unsteady walk all point to the cerebellum. Cerebellar damage affects the same side of the body, so a shaky right hand means the right half of the cerebellum.","If he had shaken at rest, with the shaking easing as he moved, and had been slow to start moving, the basal ganglia would be the answer. When a tremor appears tells you which structure is involved: during movement for the cerebellum, at rest for the basal ganglia."],
 name:"cerebellar signs",
 desc:"The person seen from behind with three choices ringed in gold: the right half of the cerebellum, the left half of the cerebellum, and the basal ganglia. The student clicks one. The caption says whether that choice fits, and the right half of the cerebellum is then outlined in maroon as the answer.",
 pre:function(){S(["br"]);brLabs(["cb2","bg","mid"]);brHits([hCbR,hCbL,hBG]);},
 play:function(a){return waitAny([hCbR,hCbL,hBG],pPick,a).then(function(i){brPick.setAttribute("display","");
   cap(["Yes. The right cerebellum coordinates the right hand.","Not the left: cerebellar damage affects the same side.","Not this one: his tremor comes with movement, not rest."][i]);});}},

{sec:"Upper and lower motor neuron signs",comp:"Competency 20",
 title:"Damage to the upper motor neuron",
 text:["In the reflexes walkthrough you met upper and lower motor neuron damage briefly. Here you examine both. The figure shows the two-neuron chain to the quadriceps: the upper motor neuron runs from the motor cortex down the cord, and the lower motor neuron runs from the ventral horn out to the muscle. The knee jerk reflex arc runs through the lower motor neuron but not through the upper one.","First, damage the upper motor neuron in the spinal cord above the segment for the leg. Then tap the tendon and stroke the sole."],
 ask:"The leg is weak. What will you find for muscle tone, the knee jerk, muscle bulk and the sole stroke?",
 ans:["Tone is increased: the muscles are stiff and resist being stretched, and the faster you move the limb, the more they resist. This is spasticity. The knee jerk is brisk, often with clonus, and stroking the sole makes the big toe go up, the Babinski sign. The muscle keeps most of its bulk at first, because the lower motor neuron still connects to it; any loss of bulk comes slowly, from disuse. There are no twitches at rest.","Why are the reflexes brisk? The reflex arc is intact, but the pathways from the brain that normally hold it back are gone. Right after a stroke or a spinal cord injury, the limb can be floppy with weak reflexes for a while, and the stiffness and brisk reflexes develop over days to weeks."],
 name:"spasticity",
 desc:"At the upper left, a small brain with the motor cortex marked, a brainstem and a spinal cord running down to a slice. A navy upper motor neuron runs from the motor cortex down the cord to the ventral horn, and a maroon lower motor neuron runs from the ventral horn out to the quadriceps of a thigh. The knee, the lower leg and the foot hang at the right, with a reflex hammer beside the knee and a card headed The exam finds. The student clicks the upper motor neuron in the cord, and a maroon X appears there. The card fills in: strength weak, tone high and stiff, little wasting at first, no twitches. The student clicks the hammer: it taps the tendon, the leg kicks hard and then jerks three more times, and the card adds brisk, with clonus. The student clicks the sole: a gold dot strokes along it, the big toe goes up, and the card adds big toe goes up.",
 pre:function(){S(["leg"]);show([hUmn,hLmn],false);hUmn.setAttribute("display","");},
 play:function(a){return waitOn(hUmn,lpU,a).then(function(){lgXU.setAttribute("display","");findShow("umn",1);FV[3].textContent=FIND.umn[3];FV[4].textContent=FIND.umn[4];return waitOn(lgHam,lpH,a);})
   .then(function(){return strike(a);}).then(function(){return kick(-44,a);}).then(function(){return clonus(a);})
   .then(function(){FV[2].textContent=FIND.umn[2];return waitOn(hSole,lpS,a);})
   .then(function(){return soleStroke(true,a);})
   .then(function(){FV[5].textContent=FIND.umn[5];cap("Stiff, brisk, and the big toe goes up.");});}},

{title:"Damage to the lower motor neuron",
 text:["Now the damage is to the lower motor neuron: the cell body in the ventral horn or its axon on the way to the muscle. Click the lower motor neuron to damage it, then tap the tendon."],
 ask:"The leg is weak again. What will you find this time for tone, the knee jerk and muscle bulk, and what might you see under the skin?",
 ans:["Tone is low: the muscle is floppy, which is called flaccid. The knee jerk is weak or absent, because the lower motor neuron is the last step of the reflex arc. Over weeks the muscle wastes away, called atrophy, because it has lost its nerve supply. Small twitches of groups of muscle fibers, visible under the skin and called fasciculations, are common as the damaged motor neurons fire on their own. Stroking the sole does not make the big toe go up, so there is no Babinski sign.","Polio is the classic example. The virus destroys motor neurons in the ventral horn, so the affected muscles become weak, floppy and wasted while sensation is spared. An injury to one nerve, such as a crushed nerve in the leg, gives the same signs, but only in the muscles that nerve supplies."],
 name:"flaccid paralysis",
 desc:"The same two-neuron chain and leg. The student clicks the lower motor neuron, and a maroon X appears on it. The quadriceps and hamstrings shrink, small wavy marks flicker over the quadriceps for twitches under the skin, and the card fills in: strength weak, tone low and floppy, marked wasting, fasciculations, no Babinski sign. The student clicks the hammer: it taps the tendon, the leg barely moves, and the card adds weak or absent.",
 pre:function(){S(["leg"]);show([hUmn],false);hLmn.setAttribute("display","");},
 play:function(a){return waitOn(hLmn,lpL,a).then(function(){lgXL.setAttribute("display","");return waste(a);})
   .then(function(){return twitch(a);})
   .then(function(){findShow("lmn",1);FV[3].textContent=FIND.lmn[3];FV[4].textContent=FIND.lmn[4];FV[5].textContent=FIND.lmn[5];return waitOn(lgHam,lpH,a);})
   .then(function(){return strike(a);}).then(function(){return kick(-4,a);})
   .then(function(){FV[2].textContent=FIND.lmn[2];cap("Floppy, weak reflexes, wasting and twitches.");});}},

{title:"Sort the findings",
 text:["Both kinds of damage make a muscle weak, so weakness alone does not tell you where the damage is. Tone, reflexes and muscle bulk do. Click each finding as it appears, and it moves to the column where it belongs."],
 ask:"A patient has a weak right hand with wasted muscles, small twitches under the skin, and no reflexes in that arm. Which neuron is damaged?",
 ans:["The lower motor neuron. Wasting, twitches at rest and lost reflexes all point to the last neuron in the chain, the one that connects to the muscle.","If you could check only one thing first, the reflexes are a good choice, because they change in opposite directions in the two kinds of damage: brisk with the upper motor neuron, weak or absent with the lower one."],
 name:"upper and lower motor neuron signs",
 desc:"Two columns, upper motor neuron damage on the left and lower motor neuron damage on the right. One finding at a time appears at the top center, and the student clicks it to send it to its column. Upper motor neuron: brisk reflexes and clonus, big toe goes up (Babinski), stiff high tone (spasticity), little wasting at first. Lower motor neuron: marked wasting, floppy low tone (flaccid), twitches under the skin, weak or absent reflexes. When all eight are sorted, a line underneath reads: both kinds of damage make the muscle weak.",
 pre:function(){S(["sort"]);},
 play:function(a){if(!a||reduce){soAll();cap("Tone, reflexes and bulk tell the two kinds apart.");return Promise.resolve();}
   var k=0;function one(){if(k>=SOC.length)return Promise.resolve();var i=k++,g=SOC[i];g.setAttribute("display","");place(g,450,40);
     return waitOn(g,pSo,a).then(function(){return tweenPath(g,[soSlot(i)],450,a);}).then(one);}
   return one().then(function(){soBoth.setAttribute("display","");cap("Tone, reflexes and bulk tell the two kinds apart.");});}},

{title:"ALS: both at once",
 text:["Amyotrophic lateral sclerosis, ALS, is a disease in which motor neurons die. It attacks both the upper motor neurons in the cortex and the lower motor neurons in the brainstem and spinal cord, while sensation is spared. Click the upper motor neuron, then the lower motor neuron, then tap the tendon."],
 ask:"What mix of findings would you expect in one weak leg of a person with ALS?",
 ans:["A mix of both. The muscles waste and twitch under the skin, from the loss of lower motor neurons, yet the reflexes in those same wasted muscles can be brisk and the big toe can go up, from the loss of upper motor neurons. Finding upper and lower motor neuron signs together, in more than one part of the body, is what leads a neurologist to think of ALS.","As the disease progresses, the muscles for speaking, swallowing and breathing weaken too, and breathing failure is the most common cause of death. Compare the other conditions in this walkthrough: a stroke gives upper motor neuron signs, and polio gives lower motor neuron signs."],
 name:"amyotrophic lateral sclerosis",
 desc:"The two-neuron chain and leg. The student clicks the upper motor neuron, then the lower motor neuron, and a maroon X appears on each. The quadriceps shrinks and twitches, and the card fills in a mix: strength weak, tone often high, wasting, fasciculations, big toe can go up. The student clicks the hammer: the thin quadriceps still gives a brisk kick, and the card adds brisk, even when wasted.",
 pre:function(){S(["leg"]);hUmn.setAttribute("display","");hLmn.setAttribute("display","");},
 play:function(a){return waitOn(hUmn,lpU,a).then(function(){lgXU.setAttribute("display","");return waitOn(hLmn,lpL,a);})
   .then(function(){lgXL.setAttribute("display","");return waste(a);}).then(function(){return twitch(a);})
   .then(function(){findShow("als",1);FV[3].textContent=FIND.als[3];FV[4].textContent=FIND.als[4];FV[5].textContent=FIND.als[5];return waitOn(lgHam,lpH,a);})
   .then(function(){return strike(a);}).then(function(){return kick(-40,a);})
   .then(function(){FV[2].textContent=FIND.als[2];cap("Wasted and twitching, yet the reflex is brisk.");});}},

{sec:"Review",comp:"Competencies 17 to 20",
 title:"Summary with the scientific terms",
 text:["Movement is controlled at three levels. The spinal cord runs reflexes and holds the lower motor neurons, the final common path to the muscle. The brainstem controls posture and balance. The cortex decides, plans and starts voluntary movements. The cerebellum compares the intended movement with sensory feedback and corrects it, working with the same side of the body. The basal ganglia, in a loop through the thalamus, select and start movements and hold back unwanted ones, and they depend on dopamine from the substantia nigra.","The corticospinal tract runs from the primary motor cortex through the internal capsule and the brainstem, crosses at the pyramids, descends in the lateral corticospinal tract, and synapses on lower motor neurons in the ventral horn. Damage above the crossing weakens the opposite side, and damage in the cord weakens the same side. Upper motor neuron damage gives spasticity, brisk reflexes, clonus and a Babinski sign with little early wasting. Lower motor neuron damage gives flaccid weakness, weak or absent reflexes, wasting and fasciculations. Click the motor cortex to run the whole sequence once more."],
 ask:"Without scrolling back: a patient has a weak right arm and leg with brisk reflexes and a Babinski sign on the right, and the right side of the face droops. Where is the damage, and is it an upper or a lower motor neuron problem?",
 ans:["An upper motor neuron problem in the left side of the brain, above the pyramids, such as a stroke in the left motor cortex or the left internal capsule. Brisk reflexes and the Babinski sign say upper motor neuron. Weakness on the right means the damage is above the crossing, on the left. The drooping face rules out the spinal cord, because the fibers to the face muscles never go down into the cord.","If you could not get there, redraw the two-neuron chain from memory, mark the pyramids, and place the lesion, the way your Competency Study Guide asks."],
 desc:"The person seen from behind with the five stages listed at the right and a glass beside the right hand. The student clicks the left motor cortex, and the whole sequence plays: the cortex glows for the decision, a dot loops through the basal ganglia and thalamus for the plan, the motor cortex brightens to start, the gold corticospinal line runs down, crosses at the pyramids and goes out to the right hand, which closes on the glass, and feedback runs to the right cerebellum and back to the cortex as a correction.",
 pre:function(){S(["br"]);show([brSt,brGlass],true);brLabs(["m1","bg","cb","th","pyr","mid"]);brHits([hM1]);},
 play:function(a){return waitOn(hM1,pM1,a).then(function(){return reachSeq(a);}).then(function(){cap("From decision to contraction, with checks along the way.");});}}
];
