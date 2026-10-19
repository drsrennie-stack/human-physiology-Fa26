/* Twitches, summation and motor units. Oct 17 2026. Week 6 walkthrough 2 of 4.
   Week 6 competencies 6, 7, 8, 9 and 10, with one step for competency 16
   (the stimulus voltage activity in PhysioEx Exercise 2).
   Starts from a fiber that already contracts when stimulated; walkthrough 1
   covers the neuromuscular junction, excitation-contraction coupling and the
   crossbridge cycle.
   Panels, each shown and hidden per step:
   - tw: a muscle fiber on a stimulator, with three traces lined up on one
     time axis: the muscle action potential, cytosolic Ca2+ and tension
   - freq: three trains of shocks at rising frequency, each with its tension
     and Ca2+ traces on identical axes
   - mu: the ventral horn with three motor neurons of different sizes, their
     fibers scattered through one muscle, and the force of the whole muscle
   - size: an eye muscle and a calf muscle, with one motor unit from each
   - volt: a whole muscle on a stimulator, and peak tension against voltage
   - lt: one sarcomere drawn to scale above the length-tension curve
   - ct: an arm curling, holding and lowering a dumbbell, with tension and
     length graphs; fv is the force-velocity curve on the same arm
   - rev: one long trace from a single twitch to fused tetanus
   Every step waits for the student's click (promptAt and waitOn from the kit).
   The traces come from one small model of Ca2+ release, Ca2+ pumping and
   tension (msim), so the twitch, summation and tetanus shapes all agree. */

/* ---- the trace model: shocks in, action potential, Ca2+ and tension out ---- */
function msim(st,o){o=o||{};var W=o.W||0.6,dt=0.001,n=Math.round(W/dt),c=0,T=0,r=o.r||70,k=o.k||14,up=o.up||22,dn=o.dn||9,L=Math.round((o.lag||0.03)/dt),K=0.55,A=[],C=[],TT=[];
  for(var i=0;i<=n;i++){var t=i*dt,rel=0,ap=0;
    st.forEach(function(s){if(t>=s+0.004&&t<s+0.016)rel=r;var u=(t-s)/0.006;if(u>=0&&u<1)ap=Math.max(ap,u<0.35?u/0.35:(1-u)/0.65);});
    c+=(rel-k*c)*dt;A.push(ap);C.push(c);var cd=i>=L?C[i-L]:0,f=cd*cd/(cd*cd+K*K);T+=(f>T?up:dn)*(f-T)*dt;TT.push(T);}
  return {A:A,C:C,T:TT,W:W,n:n};}
/* a trace path through the first fraction k of a model array */
function tp(arr,x0,w,yb,h,sc,k,step){var n=arr.length-1,m=Math.max(1,Math.round(n*k)),d="",s=step||2;
  for(var i=0;i<=m;i+=s){d+=(i?" L":"M")+(x0+w*i/n).toFixed(1)+" "+(yb-h*Math.min(arr[i]/sc,1.08)).toFixed(1);}
  if((m%s)!==0)d+=" L"+(x0+w*m/n).toFixed(1)+" "+(yb-h*Math.min(arr[m]/sc,1.08)).toFixed(1);
  return d;}
/* a linear tween (tweenVal eases, which bends a trace that is being drawn) */
function lin(dur,a,cb){if(!a||reduce){cb(1);return Promise.resolve();}
  return new Promise(function(res){var t0=performance.now(),my=runId;function f(now){if(my!==runId){res();return;}var t=Math.min(1,(now-t0)/dur);cb(t);if(t<1)requestAnimationFrame(f);else res();}requestAnimationFrame(f);});}
/* waitOn, but a chain left over from a step the student has moved away from
   stops here instead of drawing on the new step */
function wo(t,p,a){var my=runId;return waitOn(t,p,a).then(function(){if(my!==runId)return new Promise(function(){});});}
/* a gold button with a label */
function chip(p,x,y,w,h,s,size){var g=el("g",{},p);el("rect",{x:x,y:y,width:w,height:h,rx:h/2,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},g);tx(g,x+w/2,y+h/2+5,s,"tn",size||14,"middle");g._hit=el("rect",{x:x-4,y:y-4,width:w+8,height:h+8,fill:"transparent"},g);return g;}
function shown(list,on){list.forEach(function(g){g.setAttribute("display",on?"":"none");});}

/* ======================= tw: one fiber and three traces ======================= */
var gTw=G("tw");
var TWX=300,TWW=570,TWWIN=0.6;
function TX(t){return TWX+TWW*t/TWWIN;}
var AP_Y=125,AP_H=55,CA_Y=255,CA_H=80,CA_S=1.0,TN_Y=450,TN_H=150,TN_S=0.5;
/* the fiber, its motor neuron and the stimulator */
el("line",{x1:140,y1:40,x2:140,y2:196,stroke:NAVY,"stroke-width":5},gTw);
el("ellipse",{cx:140,cy:200,rx:22,ry:7,fill:NAVY},gTw);
tx(gTw,152,62,"motor neuron","t",13,"start");
var gFiber=el("g",{},gTw);
el("rect",{x:30,y:206,width:220,height:64,rx:30,fill:TISS,stroke:MAROON,"stroke-width":3},gFiber);
for(var i=0;i<20;i++)el("line",{x1:44+i*10.5,y1:212,x2:44+i*10.5,y2:264,stroke:MAROON,"stroke-width":i%2?1.5:4,opacity:.55},gFiber);
tx(gTw,140,292,"one muscle fiber","tn",14,"middle");
el("line",{x1:62,y1:270,x2:62,y2:336,stroke:INK2,"stroke-width":3},gTw);el("line",{x1:218,y1:270,x2:218,y2:336,stroke:INK2,"stroke-width":3},gTw);
el("rect",{x:40,y:336,width:200,height:110,rx:10,fill:"#fff",stroke:INK2,"stroke-width":2.5},gTw);
tx(gTw,140,358,"stimulator","t",13,"middle");
var shockBtn=el("g",{},gTw);el("circle",{cx:140,cy:404,r:30,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},shockBtn);tx(shockBtn,140,409,"shock","tn",15,"middle");
function fiberK(T){if(!(T>=0))T=0;var s=1-0.16*Math.min(T/TN_S,1);gFiber.setAttribute("transform","translate(140 0) scale("+s.toFixed(3)+" 1) translate(-140 0)");}
/* the three rows */
tx(gTw,TWX,52,"muscle action potential","tn",14,"start");
tx(gTw,TWX,160,"Ca2+ in the cytosol","tm",14,"start");
tx(gTw,TWX,290,"tension","tn",14,"start");
[AP_Y,CA_Y].forEach(function(y){el("line",{x1:TWX,y1:y,x2:TWX+TWW,y2:y,stroke:INK2,"stroke-width":1,opacity:.45},gTw);});
el("line",{x1:TWX,y1:TN_Y,x2:TWX+TWW+6,y2:TN_Y,stroke:INK2,"stroke-width":2},gTw);
el("line",{x1:TWX,y1:300,x2:TWX,y2:TN_Y,stroke:INK2,"stroke-width":2},gTw);
tx(gTw,TWX+TWW,488,"time (not to scale)","t",13,"end");
var twShock=[0,1].map(function(){var l=el("line",{x1:0,y1:66,x2:0,y2:TN_Y,stroke:GOLD,"stroke-width":2,"stroke-dasharray":"5 5"},gTw);return l;});
function shockAt(i,t){var l=twShock[i];l.setAttribute("x1",TX(t));l.setAttribute("x2",TX(t));l.setAttribute("display","");}
var twTg=el("path",{d:"",fill:"none",stroke:"#B9BFCB","stroke-width":3,"stroke-dasharray":"7 5"},gTw);
var twCg=el("path",{d:"",fill:"none",stroke:"#D9B9B2","stroke-width":2.5,"stroke-dasharray":"6 5"},gTw);
var twA=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":2.5},gTw);
var twC=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":3},gTw);
var twT=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":4},gTw);
var M_TW=msim([0.05],{W:TWWIN}),M_SLOW=msim([0.05],{W:TWWIN,k:9}),M_SUM=msim([0.05,0.2],{W:TWWIN});
function twSet(m,k){
  twA.setAttribute("d",tp(m.A,TWX,TWW,AP_Y,AP_H,1,k,1));
  twC.setAttribute("d",tp(m.C,TWX,TWW,CA_Y,CA_H,CA_S,k));
  twT.setAttribute("d",tp(m.T,TWX,TWW,TN_Y,TN_H,TN_S,k));
  fiberK(m.T[Math.max(0,Math.min(m.n,Math.round(m.n*k)))]);}
function twGrow(m,k0,k1,dur,a){return lin(dur,a,function(q){twSet(m,k0+(k1-k0)*q);}).then(function(){twSet(m,k1);if(k1>=1)fiberK(0);});}
function twGray(m){twTg.setAttribute("d",tp(m.T,TWX,TWW,TN_Y,TN_H,TN_S,1));twCg.setAttribute("d",tp(m.C,TWX,TWW,CA_Y,CA_H,CA_S,1));}
/* the three phases, bracketed under the axis */
var PH=[[0.05,0.087,"latent period","end",0.087],[0.087,0.142,"contraction phase","start",0.096],[0.142,0.58,"relaxation phase","middle",0.36]];
var twPh=PH.map(function(p){var g=el("g",{},gTw),x0=TX(p[0]),x1=TX(p[1]);
  el("path",{d:"M"+(x0+1)+" 458 v8 H"+(x1-1)+" v-8",fill:"none",stroke:MAROON,"stroke-width":2.5},g);
  tx(g,TX(p[4])+(p[3]==="end"?-2:0),490,p[2],"tm",13,p[3]);return g;});
/* the slowed pump */
var slowChip=chip(gTw,688,300,180,36,"slow the Ca2+ pump",14);
/* lines that line up the events (step 4) */
var twV1=el("g",{},gTw),twV2=el("g",{},gTw);
el("line",{x1:TX(0.066),y1:70,x2:TX(0.066),y2:TN_Y,stroke:NAVY,"stroke-width":2,"stroke-dasharray":"3 4"},twV1);
tx(twV1,TX(0.066)+8,86,"action potential already over","t",12,"start");
tx(twV1,TX(0.066)+8,312,"tension has not started","t",12,"start");
el("line",{x1:TX(0.142),y1:180,x2:TX(0.142),y2:TN_Y,stroke:NAVY,"stroke-width":2,"stroke-dasharray":"3 4"},twV2);
tx(twV2,TX(0.142)+8,342,"tension peaks","tn",13,"start");
tx(twV2,TX(0.142)+8,184,"Ca2+ already falling","tm",12,"start");
/* left-over Ca2+ at the second shock (step 6) */
var twLeft=el("g",{},gTw);
el("line",{x1:TX(0.2),y1:CA_Y,x2:TX(0.2),y2:CA_Y-CA_H*M_TW.C[200]/CA_S-2,stroke:MAROON,"stroke-width":5},twLeft);
tx(twLeft,TX(0.2)+10,278,"Ca2+ was still left over","tm",13,"start");
/* targets */
var shockHit=el("circle",{cx:140,cy:404,r:34,fill:"transparent"},gTw);
var latHit=el("rect",{x:338,y:400,width:48,height:56,fill:"transparent"},gTw);
var conHit=el("rect",{x:388,y:340,width:48,height:110,fill:"transparent"},gTw);
var relHit=el("rect",{x:470,y:330,width:260,height:120,fill:"transparent"},gTw);
var apHit=el("rect",{x:328,y:60,width:52,height:70,fill:"transparent"},gTw);
var caHit=el("rect",{x:462,y:200,width:56,height:58,fill:"transparent"},gTw);
var TWHIT=[shockHit,latHit,conHit,relHit,apHit,caHit,slowChip];
var pShock=promptAt(gTw,40,488,["Click the shock button"],98,430,140,404,40);
var pShock2=promptAt(gTw,40,488,["Click shock again, now"],98,430,140,404,40);
var pLat=promptAt(gTw,560,340,["Click the flat part","just after the shock"],392,420,362,428,26);
var pCon=promptAt(gTw,560,340,["Now click the part","where tension rises"],440,388,412,396,26);
var pRel=promptAt(gTw,620,300,["Now click the part","where it falls"],600,350,560,400,30);
var pSlow=promptAt(gTw,560,360,["Click the button to slow","the pump in the SR"],730,340,778,318,30);
var pAp=promptAt(gTw,470,100,["Click the action potential"],380,96,352,100,30);
var pCa=promptAt(gTw,600,170,["Click the Ca2+ trace","at the second shock"],524,214,490,229,30);

/* ======================= freq: three trains of shocks ======================= */
var gFq=G("freq");
var FQX=224,FQW=650,FQWIN=1.0;
function FX(t){return FQX+FQW*t/FQWIN;}
function train(a,b,d){var s=[];for(var t=a;t<=b+1e-9;t+=d)s.push(+t.toFixed(4));return s;}
var FQ=[{lab:"low frequency",st:train(0.05,0.9,0.3),res:"separate twitches"},
        {lab:"higher frequency",st:train(0.05,0.9,0.07),res:"unfused tetanus"},
        {lab:"highest frequency",st:train(0.05,0.9,0.025),res:"fused tetanus"}];
var FM={W:FQWIN,k:30,up:45,dn:22,r:110,lag:0.02};
FQ.forEach(function(f,i){var y0=46+i*152;f.y0=y0;f.yb=y0+100;f.yc=y0+132;f.m=msim(f.st,FM);
  el("line",{x1:FQX,y1:f.yb,x2:FQX+FQW,y2:f.yb,stroke:INK2,"stroke-width":2},gFq);
  el("line",{x1:FQX,y1:y0,x2:FQX,y2:f.yb,stroke:INK2,"stroke-width":2},gFq);
  el("line",{x1:FQX,y1:f.yc,x2:FQX+FQW,y2:f.yc,stroke:INK2,"stroke-width":1,opacity:.45},gFq);
  tx(gFq,214,y0+56,"tension","t",12,"end");tx(gFq,214,f.yc-4,"Ca2+","tm",12,"end");
  f.ticks=el("g",{},gFq);f.st.forEach(function(s){el("line",{x1:FX(s),y1:f.yc+3,x2:FX(s),y2:f.yc+11,stroke:GDEEP,"stroke-width":1.6},f.ticks);});
  f.pC=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":2},gFq);
  f.pT=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3.5},gFq);
  f.res_t=tx(gFq,84,y0+100,f.res,"tn",13,"middle");
  f.btn=chip(gFq,14,y0+30,140,44,f.lab,13);
});
function fqSet(f,k){f.pT.setAttribute("d",tp(f.m.T,FQX,FQW,f.yb,100,1.0,k));f.pC.setAttribute("d",tp(f.m.C,FQX,FQW,f.yc,26,2.2,k));}
function fqClear(f){f.pT.setAttribute("d","");f.pC.setAttribute("d","");f.res_t.setAttribute("display","none");f.ticks.setAttribute("display","none");}
function fqDone(f){fqSet(f,1);f.res_t.setAttribute("display","");f.ticks.setAttribute("display","");}
var fqBoxT=el("rect",{x:FX(0.45),y:FQ[2].y0+2,width:FX(0.9)-FX(0.45),height:22,rx:8,fill:"none",stroke:NAVY,"stroke-width":2.5},gFq);
var fqBoxC=el("rect",{x:FX(0.45),y:FQ[2].yc-30,width:FX(0.9)-FX(0.45),height:20,rx:8,fill:"none",stroke:MAROON,"stroke-width":2.5},gFq);
var fqRowHit=el("rect",{x:FX(0.4),y:FQ[2].y0,width:FX(0.95)-FX(0.4),height:140,fill:"transparent"},gFq);
var pFq=FQ.map(function(f,i){return promptAt(gFq,250,f.y0+44,["Click the "+f.lab+" button"],162,f.y0+52,84,f.y0+52,30);});
var pFused=promptAt(gFq,250,518,["Click the fused tetanus trace"],570,446,620,FQ[2].y0+60,40);

/* ======================= mu: motor units in one muscle ======================= */
var gMu=G("mu");
el("path",{d:"M14 30 L186 30 L186 470 L14 470 Z",fill:"#F4F5F8",stroke:INK2,"stroke-width":2},gMu);
tx(gMu,100,52,"ventral horn of","t",12,"middle");tx(gMu,100,67,"the spinal cord","t",12,"middle");
var MC=[540,300],MRX=172,MRY=150;
el("rect",{x:350,y:292,width:30,height:16,rx:4,fill:"#fff",stroke:INK2,"stroke-width":2},gMu);el("rect",{x:700,y:292,width:40,height:16,rx:4,fill:"#fff",stroke:INK2,"stroke-width":2},gMu);
el("ellipse",{cx:MC[0],cy:MC[1],rx:MRX,ry:MRY,fill:TISS,stroke:MAROON,"stroke-width":3},gMu);
tx(gMu,MC[0],472,"one skeletal muscle","tn",14,"middle");
/* 18 fibers, assigned to three motor units and mixed through the muscle */
var UN=[{r:10,y:110,col:MAROON,w:4.5,trunk:236,fib:[3,9,15],nm:"small motor neuron",ty:"slow oxidative fibers",f:1},
        {r:15,y:245,col:GDEEP,w:6.5,trunk:262,fib:[1,5,8,11,13,17],nm:"medium motor neuron",ty:"fast oxidative-glycolytic",f:3},
        {r:21,y:380,col:NAVY,w:8.5,trunk:288,fib:[0,2,4,6,7,10,12,14,16],nm:"large motor neuron",ty:"fast glycolytic fibers",f:6}];
var FIB=[];
for(var j=0;j<18;j++){var fy=175+j*14.7,dy=(fy-MC[1])/MRY,hw=MRX*Math.sqrt(Math.max(0,1-dy*dy))-12;FIB.push({y:fy,x0:MC[0]-hw,x1:MC[0]+hw});}
UN.forEach(function(u,ui){
  u.lines=u.fib.map(function(k){var F=FIB[k];return el("line",{x1:F.x0,y1:F.y,x2:F.x1,y2:F.y,stroke:"#E3C9C3","stroke-width":u.w,"stroke-linecap":"round"},gMu);});
});
UN.forEach(function(u){
  var ys=u.fib.map(function(k){return FIB[k].y;}),top=Math.min(u.y,Math.min.apply(null,ys)),bot=Math.max(u.y,Math.max.apply(null,ys));
  u.ax=el("g",{},gMu);
  el("line",{x1:100,y1:u.y,x2:u.trunk,y2:u.y,stroke:u.col,"stroke-width":3},u.ax);
  el("line",{x1:u.trunk,y1:top,x2:u.trunk,y2:bot,stroke:u.col,"stroke-width":3},u.ax);
  u.fib.forEach(function(k){var F=FIB[k];el("line",{x1:u.trunk,y1:F.y,x2:F.x0+16,y2:F.y,stroke:u.col,"stroke-width":1.6},u.ax);el("circle",{cx:F.x0+16,cy:F.y,r:4,fill:u.col},u.ax);});
  var b=el("g",{},gMu);for(var d=0;d<4;d++){var an=(d*90+45)*Math.PI/180;el("line",{x1:100,y1:u.y,x2:100+Math.cos(an)*(u.r+12),y2:u.y+Math.sin(an)*(u.r+12),stroke:u.col,"stroke-width":2.5},b);}
  u.body=el("circle",{cx:100,cy:u.y,r:u.r,fill:u.col,stroke:"#fff","stroke-width":2},gMu);
  tx(gMu,100,u.y+u.r+24,u.nm,"tn",12,"middle");tx(gMu,100,u.y+u.r+39,u.ty,"t",11,"middle");
  u.sig=dot(gMu,u.col,7);
  u.hit=el("circle",{cx:100,cy:u.y,r:28,fill:"transparent"},gMu);
});
function unitOn(u,on){u.lines.forEach(function(l){l.setAttribute("stroke",on?u.col:"#E3C9C3");});}
/* the force of the whole muscle */
el("rect",{x:560,y:16,width:322,height:116,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gMu);
tx(gMu,572,36,"force of the whole muscle","t",13,"start");
el("line",{x1:572,y1:120,x2:872,y2:120,stroke:INK2,"stroke-width":1.5},gMu);
var muF=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3.5},gMu);
function muForce(n,k){if(!n){muF.setAttribute("d","");return;}var d="M572 120",t=0;for(var i=0;i<n;i++){t+=UN[i].f;var x=572+100*i;d+=" H"+x+" V"+(120-t*8);}muF.setAttribute("d",d+" H"+(572+100*(n-1)+100*k));}
var pMu=UN.map(function(u,i){return promptAt(gMu,200,i===2?500:56,[i===0?"Click the small motor neuron":(i===1?"Now click the medium one":"Now click the large one")],128,u.y-4,100,u.y,32);});
var pMuOne=promptAt(gMu,200,56,["Click the medium motor neuron","to fire it"],128,240,100,245,32);

/* ======================= size: an eye muscle and a calf muscle ======================= */
var gSz=G("size");
tx(gSz,190,40,"right eye, seen from above","tn",14,"middle");
el("path",{d:"M246 156 Q284 220 222 300 L204 300 Q252 226 230 162 Z",fill:"#F2D6CF",stroke:MAROON,"stroke-width":2.5},gSz);
el("circle",{cx:190,cy:170,r:68,fill:"#fff",stroke:NAVY,"stroke-width":3},gSz);
el("path",{d:"M150 116 Q190 84 230 116",fill:"none",stroke:NAVY,"stroke-width":3},gSz);
el("ellipse",{cx:190,cy:118,rx:26,ry:8,fill:NAVY,opacity:.35},gSz);
el("rect",{x:182,y:236,width:16,height:64,fill:"#F4F5F8",stroke:INK2,"stroke-width":2},gSz);
tx(gSz,174,282,"optic nerve","t",12,"end");
tx(gSz,276,250,"muscle that turns","tm",13,"start");tx(gSz,276,266,"the eye outward","tm",13,"start");
tx(gSz,190,92,"front of the eye","t",12,"middle");
/* the lower leg from the side: toes point right, so the calf is at the back, on the left */
el("path",{d:"M690 34 L760 34 Q766 120 756 200 L748 300 L820 316 Q836 332 820 346 L700 346 Q688 336 698 300 Q672 220 650 150 Q636 80 690 34 Z",fill:TISS,stroke:MAROON,"stroke-width":3},gSz);
el("ellipse",{cx:682,cy:132,rx:26,ry:70,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2.5},gSz);
el("path",{d:"M688 204 L706 296",stroke:"#fff","stroke-width":6,"stroke-linecap":"round"},gSz);
tx(gSz,780,46,"lower leg,","tn",14,"start");tx(gSz,780,62,"from the side","t",12,"start");
tx(gSz,644,236,"calf muscle","tm",13,"end");
/* one motor unit from each */
var szEye=el("g",{},gSz),szCalf=el("g",{},gSz);
tx(szEye,190,372,"one motor unit in an eye muscle","tn",13,"middle");
el("circle",{cx:70,cy:428,r:9,fill:MAROON},szEye);el("line",{x1:79,y1:428,x2:140,y2:428,stroke:MAROON,"stroke-width":3},szEye);
[392,416,440,464].forEach(function(y){el("line",{x1:140,y1:428,x2:172,y2:y,stroke:MAROON,"stroke-width":1.6},szEye);el("line",{x1:172,y1:y,x2:320,y2:y,stroke:MAROON,"stroke-width":6,"stroke-linecap":"round"},szEye);});
tx(szEye,190,500,"only a small number of fibers","tm",13,"middle");
tx(szCalf,700,372,"one motor unit in the calf","tn",13,"middle");
el("circle",{cx:500,cy:430,r:18,fill:NAVY},szCalf);el("line",{x1:518,y1:430,x2:570,y2:430,stroke:NAVY,"stroke-width":4},szCalf);
for(var q=0;q<24;q++){var yy=384+q*4;el("line",{x1:570,y1:430,x2:600,y2:yy,stroke:NAVY,"stroke-width":0.9},szCalf);el("line",{x1:600,y1:yy,x2:860,y2:yy,stroke:NAVY,"stroke-width":2.2},szCalf);}
tx(szCalf,700,500,"hundreds to thousands of fibers","tn",13,"middle");
var eyeHit=el("rect",{x:206,y:170,width:72,height:120,fill:"transparent"},gSz);
var calfHit=el("ellipse",{cx:682,cy:132,rx:46,ry:78,fill:"transparent"},gSz);
var pEye=promptAt(gSz,340,180,["Click the eye muscle"],262,214,240,232,34);
var pCalf=promptAt(gSz,360,190,["Now click the calf muscle"],636,150,682,132,40);

/* ======================= volt: stimulus voltage on a whole muscle ======================= */
var gVo=G("volt");
tx(gVo,240,52,"a whole muscle with many fibers","tn",14,"middle");
el("rect",{x:20,y:142,width:40,height:16,rx:4,fill:"#fff",stroke:INK2,"stroke-width":2},gVo);el("rect",{x:420,y:142,width:40,height:16,rx:4,fill:"#fff",stroke:INK2,"stroke-width":2},gVo);
el("ellipse",{cx:240,cy:150,rx:190,ry:72,fill:TISS,stroke:MAROON,"stroke-width":3},gVo);
var VF=[];for(var v=0;v<10;v++){var vy=104+v*10.4,dv=(vy-150)/72,vw=190*Math.sqrt(Math.max(0,1-dv*dv))-12;VF.push(el("line",{x1:240-vw,y1:vy,x2:240+vw,y2:vy,stroke:"#E3C9C3","stroke-width":5,"stroke-linecap":"round"},gVo));}
var VORDER=[4,7,1,9,3,6,0,8,2,5];
function voltFibers(n){VF.forEach(function(l,i){l.setAttribute("stroke",VORDER.indexOf(i)<n?MAROON:"#E3C9C3");});}
el("line",{x1:200,y1:220,x2:200,y2:300,stroke:INK2,"stroke-width":3},gVo);el("line",{x1:280,y1:220,x2:280,y2:300,stroke:INK2,"stroke-width":3},gVo);
el("rect",{x:130,y:300,width:220,height:120,rx:10,fill:"#fff",stroke:INK2,"stroke-width":2.5},gVo);
tx(gVo,240,322,"stimulator","t",13,"middle");
el("circle",{cx:240,cy:366,r:30,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},gVo);tx(gVo,240,363,"turn up","tn",12,"middle");tx(gVo,240,377,"and shock","tn",12,"middle");
var voRead=tx(gVo,240,446,"","tn",14,"middle");
/* the plot */
var VX0=500,VX1=870,VY0=330,VYH=200;
el("line",{x1:VX0,y1:VY0,x2:VX1,y2:VY0,stroke:INK2,"stroke-width":2},gVo);el("line",{x1:VX0,y1:VY0,x2:VX0,y2:110,stroke:INK2,"stroke-width":2},gVo);
tx(gVo,VX0,96,"peak tension of each twitch","t",13,"start");tx(gVo,685,446,"stimulus voltage","t",13,"middle");
var VP=[[524,0,0,"below threshold"],[572,0.08,1,"threshold"],[636,0.45,5,"more fibers respond"],[700,0.8,8,"still more fibers"],[770,1,10,"maximal stimulus"],[842,1,10,"above maximal"]];
var voDots=VP.map(function(p){var g=el("g",{},gVo);el("line",{x1:p[0],y1:VY0,x2:p[0],y2:VY0-VYH*p[1],stroke:NAVY,"stroke-width":10,"stroke-linecap":"butt",opacity:.25},g);el("circle",{cx:p[0],cy:VY0-VYH*p[1],r:7,fill:NAVY,stroke:"#fff","stroke-width":2},g);return g;});
var voTh=el("g",{},gVo);arrow(voTh,572,392,572,342,MAROON,3);tx(voTh,572,410,"threshold","tm",13,"middle");
var voMx=el("g",{},gVo);arrow(voMx,770,392,770,342,MAROON,3);tx(voMx,770,410,"maximal stimulus","tm",13,"middle");
var voHit=el("circle",{cx:240,cy:366,r:34,fill:"transparent"},gVo);
var pVo=promptAt(gVo,370,250,["Click the stimulator","to shock"],282,340,240,366,40);

/* ======================= lt: the sarcomere and the length-tension curve ======================= */
var gLt=G("lt");
var SC=150,SCX=450,SCY=140;
/* the legend */
el("line",{x1:150,y1:28,x2:150,y2:48,stroke:NAVY,"stroke-width":5},gLt);tx(gLt,160,43,"Z disc","t",13,"start");
el("rect",{x:270,y:32,width:36,height:12,fill:NAVY},gLt);tx(gLt,312,43,"thick filament, myosin","tn",13,"start");
el("line",{x1:540,y1:38,x2:576,y2:38,stroke:MAROON,"stroke-width":5},gLt);tx(gLt,584,43,"thin filament, actin","tm",13,"start");
var ltS=el("g",{},gLt);
var zL=el("polyline",{points:"",fill:"none",stroke:NAVY,"stroke-width":5,"stroke-linejoin":"round"},ltS),zR=el("polyline",{points:"",fill:"none",stroke:NAVY,"stroke-width":5,"stroke-linejoin":"round"},ltS);
var thinL=[el("line",{y1:116,y2:116,stroke:MAROON,"stroke-width":5},ltS),el("line",{y1:164,y2:164,stroke:MAROON,"stroke-width":5},ltS)];
var thinR=[el("line",{y1:121,y2:121,stroke:"#B0574A","stroke-width":5},ltS),el("line",{y1:159,y2:159,stroke:"#B0574A","stroke-width":5},ltS)];
var thick=el("rect",{y:SCY-8,height:16,rx:3,fill:NAVY,x:SCX-1.6*SC/2,width:1.6*SC},ltS);
var HEADS=[];for(var hx=17;hx<=118;hx+=11){[-1,1].forEach(function(sd){[-1,1].forEach(function(up){HEADS.push({dx:sd*hx,l:el("line",{x1:SCX+sd*hx,y1:SCY+up*8,x2:SCX+sd*(hx+6),y2:SCY+up*18,stroke:NAVY,"stroke-width":2.5},ltS)});});});}
el("line",{x1:SCX,y1:SCY-26,x2:SCX,y2:SCY+26,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"3 3"},ltS);
var ltRead=tx(gLt,SCX,214,"","tn",15,"middle");
var ltWhy1=tx(gLt,SCX,238,"","tm",14,"middle"),ltWhy2=tx(gLt,SCX,256,"","tm",14,"middle");
var ltJam=el("g",{},ltS);var jamL=el("circle",{r:9,fill:"none",stroke:MAROON,"stroke-width":3},ltJam),jamR=el("circle",{r:9,fill:"none",stroke:MAROON,"stroke-width":3},ltJam);
function zig(x){var p=[];for(var y=88;y<=192;y+=13)p.push((x+((y-88)/13%2?5:-5))+","+y);return p.join(" ");}
function sarc(L){var hz=L*SC/2,zl=SCX-hz,zr=SCX+hz,tw=Math.min(1.6*SC,L*SC-8);thick.setAttribute("x",SCX-tw/2);thick.setAttribute("width",tw);HEADS.forEach(function(h){h.l.setAttribute("display",Math.abs(h.dx)+6<tw/2?"":"none");});
  zL.setAttribute("points",zig(zl));zR.setAttribute("points",zig(zr));
  thinL.forEach(function(l){l.setAttribute("x1",zl);l.setAttribute("x2",zl+SC);});
  thinR.forEach(function(l){l.setAttribute("x1",zr);l.setAttribute("x2",zr-SC);});
  ltJam.setAttribute("display",L<1.62?"":"none");place(jamL,zl+6,SCY);place(jamR,zr-6,SCY);
  ltRead.textContent="sarcomere length: "+L.toFixed(1)+" µm";}
/* the curve */
var LX0=180,LY0=470,LYH=180;
function LXp(L){return LX0+(L-1.2)*246;}
function LT(L){if(L<=1.27)return 0;if(L<1.67)return (L-1.27)/0.4*0.84;if(L<2.0)return 0.84+(L-1.67)/0.33*0.16;if(L<=2.2)return 1;if(L<3.6)return (3.6-L)/1.4;return 0;}
el("line",{x1:LX0,y1:LY0,x2:LXp(3.8),y2:LY0,stroke:INK2,"stroke-width":2},gLt);el("line",{x1:LX0,y1:LY0,x2:LX0,y2:LY0-LYH-10,stroke:INK2,"stroke-width":2},gLt);
[1.5,2.0,2.5,3.0,3.5].forEach(function(L){el("line",{x1:LXp(L),y1:LY0,x2:LXp(L),y2:LY0+7,stroke:INK2,"stroke-width":2},gLt);tx(gLt,LXp(L),LY0+22,L.toFixed(1)+" µm","t",12,"middle");});
tx(gLt,LX0-8,LY0+22,"sarcomere length","t",12,"end");
tx(gLt,LX0+6,LY0-LYH-2,"active tension","t",13,"start");
var ltCurve=poly(gLt,[[1.27,0],[1.67,0.84],[2.0,1],[2.2,1],[3.6,0]].map(function(p){return [LXp(p[0]),LY0-LYH*p[1]];}),NAVY,3.5);
var ltPlat=tx(gLt,LXp(2.1)+120,LY0-LYH+16,"best overlap: about 2.0 to 2.2 µm","tn",13,"start");
var LL=[[1.5,"short, 1.5 µm"],[2.1,"middle, 2.1 µm"],[3.2,"long, 3.2 µm"]];
var ltBtn=LL.map(function(p,i){return chip(gLt,16,296+i*58,136,40,p[1],13);});
var ltPt=LL.map(function(p){var g=el("g",{},gLt);el("line",{x1:LXp(p[0]),y1:LY0,x2:LXp(p[0]),y2:LY0-LYH*LT(p[0]),stroke:NAVY,"stroke-width":1.5,"stroke-dasharray":"4 4"},g);el("circle",{cx:LXp(p[0]),cy:LY0-LYH*LT(p[0]),r:8,fill:GOLD,stroke:GDEEP,"stroke-width":2},g);return g;});
var ltShortHit=el("circle",{cx:LXp(1.5),cy:LY0-LYH*LT(1.5),r:26,fill:"transparent"},gLt);
var ltLongHit=el("circle",{cx:LXp(3.2),cy:LY0-LYH*LT(3.2),r:26,fill:"transparent"},gLt);
var pLt=LL.map(function(p,i){return promptAt(gLt,560,300+i*0,["Click the "+["short","middle","long"][i]+" length button"],160,316+i*58,84,316+i*58,30);});
var pLtS=promptAt(gLt,30,262,["Click the point for the","short sarcomere"],232,364,LXp(1.5),LY0-LYH*LT(1.5),28);
var pLtL=promptAt(gLt,600,330,["Now click the point for","the long sarcomere"],672,392,LXp(3.2),LY0-LYH*LT(3.2),28);
function ltMove(L0,L1,a){return tweenVal(L0,L1,900,a,sarc);}

/* ======================= ct: curling, holding and lowering ======================= */
var gCt=G("ct");
var EL=[150,300];
el("rect",{x:125,y:40,width:50,height:262,rx:22,fill:TISS,stroke:MAROON,"stroke-width":3},gCt);
var bic=el("ellipse",{cx:184,cy:180,rx:14,ry:72,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2.5},gCt);
tx(gCt,112,170,"biceps","tm",13,"end");
var fore=el("g",{},gCt);
el("rect",{x:150,y:282,width:230,height:36,rx:16,fill:TISS,stroke:MAROON,"stroke-width":3},fore);
el("rect",{x:372,y:280,width:40,height:40,rx:14,fill:TISS,stroke:MAROON,"stroke-width":3},fore);
var plate=el("circle",{cx:398,cy:300,r:20,fill:INK2,stroke:NAVY,"stroke-width":2},fore);
el("circle",{cx:EL[0],cy:EL[1],r:22,fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},gCt);
tx(gCt,112,306,"elbow","t",13,"end");
function foreA(d){fore.setAttribute("transform","rotate("+d+" "+EL[0]+" "+EL[1]+")");bic.setAttribute("rx",(14+Math.min(1,-d/55)*6).toFixed(1));}
var ctLoad=tx(gCt,240,400,"","tn",15,"middle");
/* tension and length graphs */
var gTL=el("g",{},gCt);
var GX0=500,GX1=870,GTY=200,GTH=100,GLY=330;
el("line",{x1:GX0,y1:GTY,x2:GX1,y2:GTY,stroke:INK2,"stroke-width":2},gTL);el("line",{x1:GX0,y1:GTY,x2:GX0,y2:58,stroke:INK2,"stroke-width":2},gTL);
tx(gTL,GX0+8,56,"muscle tension","tn",14,"start");
var ldLine=el("line",{x1:GX0,y1:0,x2:GX1,y2:0,stroke:MAROON,"stroke-width":2,"stroke-dasharray":"7 5"},gTL);
var ldTxt=tx(gTL,GX1,0,"","tm",12,"end");
el("line",{x1:GX0,y1:400,x2:GX1,y2:400,stroke:INK2,"stroke-width":2},gTL);el("line",{x1:GX0,y1:400,x2:GX0,y2:258,stroke:INK2,"stroke-width":2},gTL);
tx(gTL,GX0+8,252,"muscle length","tn",14,"start");
tx(gTL,GX0-6,276,"longer","t",12,"end");tx(gTL,GX0-6,394,"shorter","t",12,"end");
tx(gTL,GX1,420,"time","t",13,"end");
var gT=el("polyline",{points:"",fill:"none",stroke:NAVY,"stroke-width":3.5},gTL),gL=el("polyline",{points:"",fill:"none",stroke:MAROON,"stroke-width":3.5},gTL);
var ctTag=tx(gTL,685,450,"","tn",16,"middle");
function setLoad(L,txt){var y=GTY-GTH*L;ldLine.setAttribute("y1",y);ldLine.setAttribute("y2",y);ldTxt.setAttribute("y",y-5);ldTxt.textContent=txt;}
/* draw a contraction: f(t) returns [tension 0 to 1.4, length offset in px (+ is shorter), forearm angle] */
function ctPlay(f,dur,a){var pts=[],lps=[];
  return lin(dur,a,function(k){pts=[];lps=[];for(var i=0;i<=60;i++){var t=i/60;if(t>k)break;var r=f(t);pts.push((GX0+(GX1-GX0)*t).toFixed(1)+","+(GTY-GTH*r[0]).toFixed(1));lps.push((GX0+(GX1-GX0)*t).toFixed(1)+","+(GLY+r[1]).toFixed(1));}
    gT.setAttribute("points",pts.join(" "));gL.setAttribute("points",lps.join(" "));foreA(f(k)[2]);});}
function ramp(t,a,b){return t<=a?0:t>=b?1:(t-a)/(b-a);}
var CON=function(t){var T=0.3*ramp(t,0,0.25),s=ramp(t,0.25,0.75);return [T,46*s,-55*s];};
var ISO=function(t){var T=1.0*Math.sin(Math.PI/2*ramp(t,0,0.4));return [T,0,t>0.4?Math.sin(t*60)*0.6:0];};
var ECC=function(t){var T=t<0.25?0.6:0.5,s=ramp(t,0.25,0.85);return [T,46*(1-s),-55*(1-s)];};
var ctBtn={light:chip(gCt,40,440,130,44,"light load",14),heavy:chip(gCt,40,440,130,44,"too heavy",14),lower:chip(gCt,40,440,130,44,"lower it",14),add:chip(gCt,40,440,150,44,"add weight",14)};
function ctBtns(k){for(var n in ctBtn)ctBtn[n].setAttribute("display",n===k?"":"none");}
var pCt={light:promptAt(gCt,200,476,["Click to curl a light load"],178,462,105,462,34),
         heavy:promptAt(gCt,200,476,["Click to try a load too heavy to lift"],178,462,105,462,34),
         lower:promptAt(gCt,200,476,["Click to lower it slowly"],178,462,105,462,34),
         add:promptAt(gCt,210,476,["Click to add weight and lift"],196,462,115,462,36)};
/* force-velocity on the same arm */
var gFv=el("g",{},gCt);
var FX0=520,FX1=860,FY0=400,FYH=280;
el("line",{x1:FX0,y1:FY0,x2:FX1+10,y2:FY0,stroke:INK2,"stroke-width":2},gFv);el("line",{x1:FX0,y1:FY0,x2:FX0,y2:FY0-FYH-14,stroke:INK2,"stroke-width":2},gFv);
tx(gFv,FX0+8,FY0-FYH-6,"shortening speed","tn",14,"start");tx(gFv,FX1,FY0+22,"load","tn",14,"end");
var FVL=[0.05,0.3,0.6,1.0];function FV(L){return (1-L)/(1+L/0.25);}
var fvCurve=(function(){var p=[];for(var L=0;L<=1.0001;L+=0.02)p.push([FX0+(FX1-FX0)*L,FY0-FYH*FV(L)]);return poly(gFv,p,NAVY,3);})();
var fvPts=FVL.map(function(L){var g=el("g",{},gFv);el("circle",{cx:FX0+(FX1-FX0)*L,cy:FY0-FYH*FV(L),r:8,fill:GOLD,stroke:GDEEP,"stroke-width":2},g);return g;});
var fvT1=tx(gFv,FX0+30,FY0-FYH+30,"fastest with almost no load","tn",13,"start");
var fvT2=tx(gFv,FX1,250,"speed is zero when the load equals","tm",13,"end"),fvT3=tx(gFv,FX1,266,"the most tension the muscle can make","tm",13,"end");
var CTHIT={};for(var nk in ctBtn)CTHIT[nk]=ctBtn[nk]._hit;

/* ======================= rev: from one twitch to fused tetanus ======================= */
var gRv=G("rev");
var RX=170,RW=700,RWIN=2.0;
function RXp(t){return RX+RW*t/RWIN;}
var RST=[0.03,0.64,0.76].concat(train(1.0,1.38,0.07)).concat(train(1.45,1.95,0.025));
var RM=msim(RST,{W:RWIN,k:30,up:45,dn:22,r:110,lag:0.02});
el("line",{x1:RX,y1:320,x2:RX+RW,y2:320,stroke:INK2,"stroke-width":2},gRv);el("line",{x1:RX,y1:320,x2:RX,y2:90,stroke:INK2,"stroke-width":2},gRv);
el("line",{x1:RX,y1:430,x2:RX+RW,y2:430,stroke:INK2,"stroke-width":1,opacity:.45},gRv);
tx(gRv,RX+8,92,"tension","tn",14,"start");tx(gRv,RX+8,362,"Ca2+ in the cytosol","tm",14,"start");
var rvTicks=el("g",{},gRv);RST.forEach(function(s){el("line",{x1:RXp(s),y1:440,x2:RXp(s),y2:452,stroke:GDEEP,"stroke-width":1.6},rvTicks);});
tx(gRv,RX+RW,474,"shocks, then time","t",13,"end");
var rvT=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3.5},gRv),rvC=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":2.5},gRv);
var rvL=[[0.2,"twitch"],[0.82,"summation"],[1.2,"unfused"],[1.72,"fused tetanus"]].map(function(p){return tx(gRv,RXp(p[0]),68,p[1],"tn",14,"middle");});
el("rect",{x:20,y:180,width:120,height:120,rx:10,fill:"#fff",stroke:INK2,"stroke-width":2.5},gRv);tx(gRv,80,202,"stimulator","t",13,"middle");
el("circle",{cx:80,cy:250,r:30,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},gRv);tx(gRv,80,255,"start","tn",15,"middle");
var rvHit=el("circle",{cx:80,cy:250,r:34,fill:"transparent"},gRv);
var pRv=promptAt(gRv,40,140,["Click start to run the shocks"],70,214,80,250,40);
function rvSet(k){rvT.setAttribute("d",tp(RM.T,RX,RW,320,220,1.0,k));rvC.setAttribute("d",tp(RM.C,RX,RW,430,60,2.2,k));}

makeCap();
function resetAll(){
  /* tw */
  [twA,twC,twT,twTg,twCg].forEach(function(p){p.setAttribute("d","");});fiberK(0);shown(twShock,false);shown(twPh,false);shown([slowChip,twV1,twV2,twLeft],false);
  /* freq */
  FQ.forEach(fqClear);shown([fqBoxT,fqBoxC],false);
  /* mu */
  UN.forEach(function(u){unitOn(u,false);u.sig.setAttribute("display","none");});muForce(0,0);
  /* size */
  shown([szEye,szCalf],false);
  /* volt */
  voltFibers(0);shown(voDots,false);shown([voTh,voMx],false);voRead.textContent="";
  /* lt */
  sarc(2.1);shown(ltPt,false);shown([ltCurve,ltPlat],false);ltWhy1.textContent="";ltWhy2.textContent="";
  /* ct */
  foreA(0);plate.setAttribute("r",20);gT.setAttribute("points","");gL.setAttribute("points","");ctTag.textContent="";ctLoad.textContent="";ctBtns("");
  shown([gTL],true);shown([gFv],false);shown(fvPts,false);shown([fvCurve,fvT1,fvT2,fvT3],false);
  /* rev */
  rvT.setAttribute("d","");rvC.setAttribute("d","");shown(rvL,false);rvTicks.setAttribute("display","none");
  cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}
function twFull(m){twSet(m,1);fiberK(0);shockAt(0,0.05);}

/* ======================= steps ======================= */
var STEPS=[
{sec:"The muscle twitch",comp:"Competency 6",
 title:"One shock, one twitch",
 text:["In the first walkthrough you followed one action potential from the motor neuron into a muscle fiber: Ca2+ was released from the sarcoplasmic reticulum, it bound troponin, tropomyosin moved aside, and the crossbridges pulled. This walkthrough starts there, with a fiber that contracts every time it is stimulated, and asks how a muscle makes a small force or a large one.","In your body the signal comes from the motor neuron. Here a stimulator shocks the fiber directly, the way the PhysioEx simulation does in lab this week. The three traces on the right share one time axis: the fiber's action potential on top, the Ca2+ in the cytosol in the middle, and the tension the fiber pulls with at the bottom. Click the shock button to give the fiber one shock."],
 name:"muscle twitch",
 auto:true,
 desc:"On the left, one muscle fiber with its motor neuron above it and a stimulator below it, with a gold shock button. On the right, three empty traces on one time axis: the muscle action potential, Ca2+ in the cytosol, and tension. When the student clicks the shock button, a gold dashed line marks the shock, a brief spike appears on the action potential trace, the Ca2+ trace rises quickly and falls, and the tension trace stays flat for a moment, rises to a peak and then falls slowly back to zero. The fiber shortens and lengthens again as the tension rises and falls.",
 pre:function(){S(["tw"]);},
 play:function(a){return wo(shockHit,pShock,a).then(function(){shockAt(0,0.05);return twGrow(M_TW,0,1,2600,a);}).then(function(){cap("One action potential makes one brief contraction.");});}},

{title:"Three phases of a twitch",
 text:["A single contraction from a single action potential is called a twitch. If you look closely at the tension trace, it has three parts. Click each part of the trace in turn, starting with the flat stretch just after the shock."],
 ask:"Why does the tension trace stay flat for a moment after the shock, even though the action potential has already happened?",
 ans:["Because excitation-contraction coupling takes time. During that short delay, called the latent period, the action potential spreads down the T tubules, the Ca2+ release channels of the sarcoplasmic reticulum open, Ca2+ reaches troponin, tropomyosin moves aside, and the crossbridges begin to cycle. Tension cannot rise until all of that has happened.","Next comes the contraction phase, when tension rises as more and more crossbridges pull. Last is the relaxation phase, when tension falls back to zero as Ca2+ is pumped back into the sarcoplasmic reticulum and the crossbridges let go. In a single twitch, relaxation is the longest of the three phases."],
 name:"latent period, contraction phase and relaxation phase",
 desc:"The finished twitch from the last step. The student clicks the flat part of the tension trace just after the shock, and a bracket labeled latent period appears under it. Then the student clicks the rising part, labeled contraction phase, and the falling part, labeled relaxation phase, which is the longest bracket.",
 pre:function(){S(["tw"]);twFull(M_TW);},
 play:function(a){return wo(latHit,pLat,a).then(function(){twPh[0].setAttribute("display","");return wo(conHit,pCon,a);}).then(function(){twPh[1].setAttribute("display","");return wo(relHit,pRel,a);}).then(function(){twPh[2].setAttribute("display","");cap("Latent period, then contraction, then relaxation.");});}},

{title:"What sets each phase",
 text:["Each phase is limited by a different event inside the fiber. The latent period is set by excitation-contraction coupling. The contraction phase lasts while Ca2+ is high and crossbridges keep cycling. The relaxation phase depends on how fast the Ca2+ pump in the sarcoplasmic reticulum membrane, called SERCA, can pull Ca2+ back out of the cytosol.","Suppose that pump works at half its normal speed, while the action potential and the Ca2+ release channels are normal. Click the button to slow the pump and shock the fiber again."],
 ask:"Which phase of the twitch will get much longer?",
 ans:["The relaxation phase. Ca2+ stays in the cytosol longer, so troponin keeps holding tropomyosin off the binding sites, crossbridges keep forming, and tension takes much longer to fall. The peak also climbs a little higher, because Ca2+ stays high for a little longer. The latent period does not change, because the steps that start the contraction are normal.","This is why relaxation is an active process that costs energy. SERCA uses ATP to pump Ca2+ back against its gradient, so a muscle short of ATP is slow to relax."],
 name:"SERCA, the Ca2+ pump of the sarcoplasmic reticulum",
 desc:"The normal twitch stays on the figure as dashed gray traces. The student clicks a gold button labeled slow the Ca2+ pump, and the fiber is shocked again. The new Ca2+ trace falls much more slowly than the gray one, and the new tension trace rises at the same moment, peaks a little higher and falls much more slowly, so its relaxation phase is much longer.",
 pre:function(){S(["tw"]);twGray(M_TW);slowChip.setAttribute("display","");shockAt(0,0.05);},
 play:function(a){return wo(slowChip._hit,pSlow,a).then(function(){slowChip.setAttribute("display","none");return twGrow(M_SLOW,0,1,2600,a);}).then(function(){cap("Slow Ca2+ removal makes relaxation much longer.");});}},

{title:"The action potential is over first",
 text:["Look at how the three traces line up in time. The action potential is a brief spike, only a few milliseconds long. Click it to drop a line down through the other two traces."],
 ask:"Which of the two upper curves does the tension curve actually follow, the action potential or the Ca2+?",
 ans:["The Ca2+. The action potential is over before tension even starts to rise, and tension peaks after the Ca2+ has already begun to fall. Tension rises while Ca2+ is high and falls as the pumps clear it. The action potential only starts the process by opening the Ca2+ release channels.","Because the electrical signal is so short and the mechanical response is so long, a second action potential can arrive while the fiber is still contracting or relaxing. That is the starting point for the next section."],
 name:"excitation-contraction coupling",
 desc:"The finished twitch with all three traces. The student clicks the action potential spike, and a navy dashed line drops through all three traces just after it, labeled action potential already over and tension has not started. A second dashed line then appears at the peak of the tension trace, labeled tension peaks, where the Ca2+ trace is already falling.",
 pre:function(){S(["tw"]);twFull(M_TW);},
 play:function(a){return wo(apHit,pAp,a).then(function(){twV1.setAttribute("display","");return wait(900,a);}).then(function(){twV2.setAttribute("display","");cap("Tension follows the Ca2+, not the action potential.");});}},

{sec:"Summation and tetanus",comp:"Competency 7",
 title:"A second shock while it relaxes",
 text:["Now the fiber gets two shocks. The first one starts a twitch as before. Wait until the tension has peaked and started to fall, then click the shock button again when you are told to, while the fiber is still relaxing."],
 ask:"What will the tension do after the second shock? Will the second peak be lower, the same, or higher than the first?",
 ans:["Higher. The second twitch starts from tension that has not yet fallen to zero, and it climbs above the peak of a single twitch, shown by the dashed gray trace. Adding a second contraction onto a first one that has not finished is called summation.","The closer together two shocks are, the more the second contraction builds on the first. This is one of the two ways your nervous system makes a muscle pull harder. The other is recruiting more fibers, which comes later in this walkthrough."],
 name:"summation",
 desc:"Empty traces. The student clicks the shock button, and a twitch begins and runs until the tension has peaked and started to fall. The student then clicks the shock button again. A second action potential appears, the Ca2+ rises again from where it was, and the tension rises again from where it was to a second peak higher than the first. A dashed gray single twitch is drawn for comparison.",
 pre:function(){S(["tw"]);},
 play:function(a){return wo(shockHit,pShock,a).then(function(){shockAt(0,0.05);return twGrow(M_SUM,0,0.2/TWWIN,1400,a);}).then(function(){return wo(shockHit,pShock2,a);}).then(function(){shockAt(1,0.2);return twGrow(M_SUM,0.2/TWWIN,1,1900,a);}).then(function(){twGray(M_TW);cap("The second twitch builds on the first and climbs higher.");});}},

{title:"What adds up?",
 text:["The two action potentials on the top trace are exactly the same size, and the second one did not start until the first was completely over. So whatever made the second contraction stronger did not come from the action potentials adding together. Click the Ca2+ trace at the moment of the second shock."],
 ask:"Why did the tension climb higher the second time?",
 ans:["Because Ca2+ had not all been pumped back into the sarcoplasmic reticulum when the second shock came. Some was still in the cytosol, so the second release added to what was left over, the Ca2+ level rose higher, more troponin had Ca2+ bound, and more crossbridges could pull at once.","So summation happens in the Ca2+ and the crossbridges, not in the electrical signals. Action potentials are all-or-none and have a refractory period, so they cannot add together. The contractions can."],
 name:"Ca2+ accumulation",
 desc:"The two-shock traces from the last step. The student clicks the Ca2+ trace at the second shock, and a maroon bar marks the Ca2+ that was still in the cytosol at that moment, labeled Ca2+ was still left over. The two action potentials above are the same size.",
 pre:function(){S(["tw"]);twSet(M_SUM,1);fiberK(0);shockAt(0,0.05);shockAt(1,0.2);twGray(M_TW);},
 play:function(a){return wo(caHit,pCa,a).then(function(){twLeft.setAttribute("display","");cap("Ca2+ adds up between shocks. Action potentials do not.");});}},

{title:"Faster and faster",
 text:["Real movements almost never use single twitches. Motor neurons fire trains of action potentials, and the frequency of the train matters. Each row shows a train of shocks, with the tension on top and the Ca2+ below it, drawn on identical axes so the heights can be compared. The small gold marks under each row are the shocks. Click the three buttons in order, from low frequency to the highest."],
 ask:"As the shocks come closer together, what will happen to the tension, and to the Ca2+ between shocks?",
 ans:["At low frequency, each twitch finishes before the next shock, so you see separate twitches. At a higher frequency, each twitch starts before the last one has relaxed, so the tension climbs and wobbles up and down with each shock. This is unfused tetanus, also called incomplete tetanus. At the highest frequency, the tension rises to a smooth plateau with no dips at all. This is fused tetanus, also called complete tetanus, and it is the strongest contraction the fiber can make.","The Ca2+ shows why. With the shocks far apart, the pumps clear the Ca2+ completely between them. As the shocks get closer, the pumps cannot keep up, so the Ca2+ never falls back to its resting level and stays high."],
 name:"unfused and fused tetanus",
 desc:"Three rows, each with a tension trace on top and a Ca2+ trace below, on identical axes, and a gold button at the left: low frequency, higher frequency and highest frequency. The student clicks each button in turn. Low frequency gives three separate twitches with the Ca2+ falling to zero between them, labeled separate twitches. Higher frequency gives tension that climbs higher and dips between shocks, labeled unfused tetanus. Highest frequency gives a smooth high plateau of tension with the Ca2+ staying high, labeled fused tetanus.",
 pre:function(){S(["freq"]);},
 play:function(a){var i=0;function one(){if(i>=3)return Promise.resolve();var f=FQ[i],p=pFq[i];i++;return wo(f.btn._hit,p,a).then(function(){f.ticks.setAttribute("display","");return lin(1800,a,function(k){fqSet(f,k);});}).then(function(){fqDone(f);}).then(one);}
   return one().then(function(){cap("Closer shocks: twitches, then unfused, then fused tetanus.");});}},

{title:"Fused tetanus",
 text:["Look closely at the bottom row, where the shocks come fastest. Click the fused tetanus trace to compare its tension with its Ca2+."],
 ask:"In fused tetanus, which one stops dipping between shocks first, the tension or the Ca2+?",
 ans:["The tension. The Ca2+ still rises a little with each shock and falls a little between shocks, but it never gets low enough for crossbridges to let go in large numbers, so the tension stays smooth. Your everyday contractions, from holding your head up to carrying a bag, are made of trains of action potentials like these, not single twitches.","This tetanus is a normal way a muscle contracts. It is different from the disease tetanus, which is caused by a toxin from Clostridium tetani bacteria. That toxin blocks inhibitory neurons in the spinal cord, so motor neurons fire without control and muscles lock in a sustained spasm."],
 name:"fused tetanus",
 desc:"All three rows from the last step. The student clicks the fused tetanus trace in the bottom row. A navy box outlines a stretch of its tension, which is smooth, and a maroon box outlines the same stretch of its Ca2+, which still rises and falls slightly with each shock.",
 pre:function(){S(["freq"]);FQ.forEach(fqDone);},
 play:function(a){return wo(fqRowHit,pFused,a).then(function(){shown([fqBoxT,fqBoxC],true);cap("Tension is smooth, but Ca2+ still rises and falls.");});}},

{sec:"Motor units and recruitment",comp:"Competencies 8 and 16",
 title:"One neuron, many fibers",
 text:["Each skeletal muscle fiber is controlled by one somatic motor neuron, whose cell body sits in the ventral horn of the spinal cord or in the brainstem. One motor neuron, though, branches near its end and controls many fibers. One motor neuron together with all the fibers it controls is called a motor unit.","The figure shows three motor neurons and the 18 fibers they control in one muscle. Click the medium motor neuron to fire one action potential down its axon."],
 ask:"When this one motor neuron fires, which fibers contract, and does each one give a partial twitch or a full one?",
 ans:["Every fiber in its motor unit contracts, and only those fibers. Each one gives a full twitch, because every action potential in the motor neuron reaches every one of its fibers through its own neuromuscular junction. A motor unit works as a group: all of its fibers contract together or none of them do.","Notice that the fibers of one unit are spread through the muscle rather than bunched together, so even a small unit pulls on the whole muscle evenly. All the fibers in one motor unit are also the same fiber type."],
 name:"motor unit",
 desc:"On the left, the ventral horn of the spinal cord with three motor neurons: small, medium and large. Their axons branch to fibers in one muscle on the right, and the fibers of each unit are mixed in among the others. A box at the upper right shows the force of the whole muscle. The student clicks the medium motor neuron. A dot travels down its axon, its six fibers, scattered through the muscle, turn gold, and the force trace steps up.",
 pre:function(){S(["mu"]);},
 play:function(a){var u=UN[1];return wo(u.hit,pMuOne,a).then(function(){return run(u.sig,[[100,u.y],[u.trunk,u.y],[u.trunk,FIB[u.fib[0]].y]],700,a);}).then(function(){unitOn(u,true);muF.setAttribute("d","M572 120 H672 V"+(120-u.f*8)+" H872");cap("One motor neuron fires every fiber in its unit.");});}},

{title:"Smallest first",
 text:["The three motor units differ in more than size. The small motor neuron controls a few thin, slow, fatigue-resistant fibers, called slow oxidative fibers. The medium one controls more fibers that are fast and also fairly fatigue-resistant, fast oxidative-glycolytic fibers. The large one controls many big fast fibers that make the most force but tire quickly, fast glycolytic fibers.","The nervous system grades the force of a whole muscle by deciding how many motor units to switch on. This is called recruitment, and it happens in a set order. Click the three motor neurons in order of size, smallest first, and watch the force."],
 ask:"You pick up a paper cup, then a full gallon of milk. Which motor units fire for the cup, and what changes for the milk?",
 ans:["The cup needs only the small units with slow oxidative fibers. For the milk, the nervous system adds the medium units and then the large ones. Units are recruited in order of size because a small motor neuron reaches threshold with less synaptic input than a large one. This orderly recruitment is called the size principle. It gives fine control of light forces, and it saves the powerful but easily tired fibers for heavy loads.","Two more things raise force once units are recruited. Motor neurons can fire faster, which brings in summation and tetanus. And in a long steady contraction, the nervous system takes turns among units, called asynchronous recruitment, so some rest while others work and the muscle is slower to fatigue."],
 name:"recruitment and the size principle",
 desc:"The same muscle and motor neurons. The student clicks the small motor neuron, and its three thin fibers turn maroon and the force steps up a little. Then the student clicks the medium one, and its six fibers turn gold and the force steps up more. Then the large one, and its nine thick fibers turn navy and the force jumps highest.",
 pre:function(){S(["mu"]);},
 play:function(a){var i=0;function one(){if(i>=3)return Promise.resolve();var u=UN[i],n=i+1;i++;
     return wo(u.hit,pMu[n-1],a).then(function(){return run(u.sig,[[100,u.y],[u.trunk,u.y],[u.trunk,FIB[u.fib[0]].y]],600,a);}).then(function(){unitOn(u,true);return lin(500,a,function(k){muForce(n,k);});}).then(one);}
   return one().then(function(){muForce(3,1);cap("Small units are recruited first, large units last.");});}},

{title:"Eye muscles and calf muscles",
 text:["Motor units vary in size from one muscle to another. The muscles that move your eyes are built for small, precise movements. Your calf muscle, the gastrocnemius, is built to hold you up and push you off the ground. Click the eye muscle and then the calf muscle to see one motor unit from each."],
 ask:"Why are the motor units in an eye muscle so small, and the ones in the calf so large?",
 ans:["When a motor unit has only a few fibers, switching on one more unit adds only a tiny bit of force, so the nervous system can grade the force in very fine steps. That is what an eye muscle needs to point your eye exactly. When a motor unit has hundreds or thousands of fibers, each unit adds a big step of force, which suits a muscle whose job is to support your weight and push off when you walk or run.","The same idea explains your hands. The small muscles of the hand have small motor units, which is why you can thread a needle or type."],
 name:"motor unit size",
 desc:"On the left, a right eye seen from above, with the muscle that turns it outward running back along its outer side. On the right, a lower leg seen from the side, with the calf muscle at the back. The student clicks the eye muscle, and below it one motor unit appears: one motor neuron with only a few fibers. Then the student clicks the calf muscle, and one motor unit appears below it: one motor neuron branching to a great many fibers, labeled hundreds to thousands of fibers.",
 pre:function(){S(["size"]);},
 play:function(a){return wo(eyeHit,pEye,a).then(function(){szEye.setAttribute("display","");return wo(calfHit,pCalf,a);}).then(function(){szCalf.setAttribute("display","");cap("Small units grade force finely. Large units add force fast.");});}},

{title:"Turning up the voltage",
 text:["In lab this week, PhysioEx stimulates a whole muscle, and you raise the stimulus voltage one step at a time. A stronger shock reaches threshold in fibers that a weaker shock could not, so it works much like recruiting more motor units does in your body.","Click the stimulator six times. Each click turns the voltage up one step and gives one shock, and the peak tension of that twitch is plotted on the right."],
 ask:"The twitch of any one fiber does not change as the voltage goes up. So why does the whole muscle pull harder, and why does it stop getting stronger at some point?",
 ans:["Because more fibers respond. Below threshold, no fibers fire and there is no twitch. The threshold stimulus is the lowest voltage that makes a visible twitch, because it reaches threshold in only a few fibers. As the voltage rises, more and more fibers fire, so the twitch gets stronger. At the maximal stimulus every fiber is already responding, so raising the voltage further adds nothing.","Each fiber still follows the all-or-none rule: it either fires a full action potential and twitches, or it does not. The muscle grades its force by how many fibers take part, just as your nervous system grades force by how many motor units it recruits."],
 name:"threshold stimulus and maximal stimulus",
 desc:"On the left, a whole muscle with ten fibers and two electrodes running down to a stimulator with a gold button. On the right, a plot of peak twitch tension against stimulus voltage. The student clicks the stimulator six times. The first shock is below threshold: no fibers turn maroon and the point sits at zero. The second, labeled threshold, makes one fiber respond and a small point. The next two make more fibers respond and higher points. The fifth, labeled maximal stimulus, makes all ten fibers respond and the highest point. The sixth, above maximal, gives the same height.",
 pre:function(){S(["volt"]);},
 play:function(a){var i=0;function one(){if(i>=VP.length)return Promise.resolve();var p=VP[i],g=voDots[i];i++;
     return wo(voHit,pVo,a).then(function(){voltFibers(p[2]);voRead.textContent="Shock "+i+": "+p[3];g.setAttribute("display","");if(i===2)voTh.setAttribute("display","");if(i===5)voMx.setAttribute("display","");return wait(350,a);}).then(one);}
   return one().then(function(){voRead.textContent="";cap("More voltage brings in more fibers, up to all of them.");});}},

{sec:"Length and tension",comp:"Competency 9",
 title:"Overlap at three lengths",
 text:["The force a fiber makes also depends on how stretched it is before it contracts. The figure shows one sarcomere, the unit between two Z discs, drawn to scale. The thick filaments, made of myosin, sit in the middle with their heads sticking out. The thin filaments, made of actin, are anchored to the Z discs. Crossbridges form only where the myosin heads overlap the thin filaments.","Click the three length buttons in order. Each one sets the sarcomere to that length before it is stimulated, and plots the active tension it makes."],
 ask:"At which of the three lengths will the sarcomere make the most tension?",
 ans:["The middle one, 2.1 micrometers. At that length every myosin head can reach a thin filament, so the most crossbridges can form, and the thin filaments have room to slide toward the middle. Your textbook's curve puts this best length at about 2.0 to 2.2 micrometers. The classic curve was measured in frog muscle; human thin filaments are a little longer, so human muscle works best at a slightly longer sarcomere length.","At 1.5 micrometers and at 3.2 micrometers the tension is lower. The next step looks at why."],
 name:"length-tension relationship",
 desc:"At the top, one sarcomere drawn to scale: zigzag Z discs at each end, thin actin filaments reaching in from each Z disc, and a thick myosin filament with heads in the middle. Below, empty axes of active tension against sarcomere length from 1.5 to 3.5 micrometers, and three gold buttons. The student clicks short, 1.5 micrometers: the sarcomere squeezes so the thin filaments overlap each other and the thick filament reaches the Z discs, and a middling point is plotted. Then middle, 2.1 micrometers: full overlap, and the highest point. Then long, 3.2 micrometers: the thin filaments barely reach the ends of the thick filament, and a low point. Then the whole curve is drawn, with a plateau labeled best overlap, about 2.0 to 2.2 micrometers.",
 pre:function(){S(["lt"]);},
 play:function(a){var Lc=2.1,i=0;function one(){if(i>=3)return Promise.resolve();var p=LL[i],j=i;i++;return wo(ltBtn[j]._hit,pLt[j],a).then(function(){var L0=Lc;Lc=p[0];return ltMove(L0,p[0],a);}).then(function(){ltPt[j].setAttribute("display","");return wait(300,a);}).then(one);}
   return one().then(function(){ltCurve.setAttribute("display","");return reveal(ltCurve,900,a);}).then(function(){ltPlat.setAttribute("display","");cap("The most tension comes at the middle length.");});}},

{title:"Too short and too long",
 text:["Tension falls off at both ends of the curve. Click the point for the short sarcomere, then the point for the long one, and look at the filaments each time."],
 ask:"Tension falls at both ends of the curve, but for different reasons. What is the reason at each end?",
 ans:["When the sarcomere is too long, the thin filaments barely overlap the thick filaments, so only a few myosin heads can reach actin and only a few crossbridges can form. When it is too short, the thin filaments from the two sides overlap each other and get in each other's way, and the thick filaments run into the Z discs, so the filaments cannot slide any farther.","In your body, the way muscles attach to bones keeps their resting length close to the best overlap. You can still feel both ends. Bend your wrist all the way forward and try to make a tight fist: the finger flexors are already short, and your grip is weaker. And if a muscle is pulled far past its resting length, as when a joint is forced open, few crossbridges can form and the muscle can make only a little force."],
 name:"filament overlap",
 desc:"The full length-tension curve with its three points. The student clicks the point for the short sarcomere. The sarcomere above shrinks to 1.5 micrometers, with maroon rings where the thick filament presses on the Z discs, and labels read: thin filaments overlap each other; thick filaments press on the Z discs. Then the student clicks the point for the long sarcomere. It stretches to 3.2 micrometers, and the labels read: little overlap; few myosin heads can reach actin.",
 pre:function(){S(["lt"]);shown(ltPt,true);shown([ltCurve,ltPlat],true);},
 play:function(a){return wo(ltShortHit,pLtS,a).then(function(){return ltMove(2.1,1.5,a);}).then(function(){ltWhy1.textContent="thin filaments overlap each other";ltWhy2.textContent="thick filaments press on the Z discs";return wo(ltLongHit,pLtL,a);}).then(function(){ltWhy1.textContent="";ltWhy2.textContent="";return ltMove(1.5,3.2,a);}).then(function(){ltWhy1.textContent="little overlap";ltWhy2.textContent="few myosin heads can reach actin";cap("Too short, the filaments jam. Too long, few heads reach.");});}},

{sec:"Isometric and isotonic contraction",comp:"Competency 10",
 title:"Curling a light load",
 text:["A contracting muscle makes tension. Whether it also moves depends on the load it is pulling against. A contraction that moves a load is called isotonic. A contraction that makes tension without moving anything is called isometric.","Here the biceps bends the elbow against a dumbbell. The graphs on the right record the muscle's tension, with the dashed line showing the load, and the muscle's length. Click the button to curl a light load."],
 ask:"Does the muscle start to shorten the instant it is stimulated, or does something have to happen first?",
 ans:["Something has to happen first. The muscle's tension rises until it equals the load, and during that time the muscle does not change length. Only then does it start to shorten and lift the dumbbell, with its tension holding steady at the level of the load. The load is smaller than the most tension the muscle can make, so it can lift it.","A contraction in which the muscle shortens while moving a load is called a concentric contraction. It is the lifting half of most exercises."],
 name:"isotonic concentric contraction",
 desc:"An arm seen from the side, with the upper arm hanging down, the biceps on its front, and the forearm reaching out with a small dumbbell in the hand. On the right, a tension graph with a low dashed line for the load, and a length graph. The student clicks light load. The tension line rises to the dashed load line while the length line stays flat, then the tension stays level at the load while the length line drops, meaning the muscle shortens, and the forearm curls up.",
 pre:function(){S(["ct"]);ctBtns("light");plate.setAttribute("r",18);setLoad(0.3,"load");},
 play:function(a){return wo(ctBtn.light._hit,pCt.light,a).then(function(){ctBtns("");return ctPlay(CON,2600,a);}).then(function(){ctTag.textContent="concentric: the muscle shortens";cap("Tension rises to match the load, then the muscle shortens.");});}},

{title:"A load too heavy to lift",
 text:["Now the dumbbell is heavier than anything this biceps can lift. The dashed load line on the tension graph is higher than the muscle can reach. Click the button to try to lift it."],
 ask:"What will happen to the muscle's tension, and to its length?",
 ans:["The tension rises to the most this muscle can make and stays there, but it never reaches the load, so the dumbbell does not move and the muscle stays the same length. This is an isometric contraction. The muscle is working hard and using ATP the whole time, even though nothing moves.","Holding a weight still in front of you is also isometric. In that case the muscle's tension is exactly equal to the load. Inside the muscle, the sarcomeres do shorten slightly as they stretch the springy tendons and connective tissue, called the series elastic elements, but the muscle as a whole does not change length."],
 name:"isometric contraction",
 desc:"The same arm with a very large dumbbell. The dashed load line on the tension graph sits above the top of the graph's range. The student clicks too heavy. The tension rises to a plateau below the load line, the length line stays flat, and the forearm does not move.",
 pre:function(){S(["ct"]);ctBtns("heavy");plate.setAttribute("r",42);setLoad(1.35,"load: more than the muscle can lift");},
 play:function(a){return wo(ctBtn.heavy._hit,pCt.heavy,a).then(function(){ctBtns("");return ctPlay(ISO,2400,a);}).then(function(){foreA(0);ctTag.textContent="isometric: tension, but no movement";cap("The muscle makes tension but does not change length.");});}},

{title:"Lowering the load",
 text:["The biceps is holding a medium dumbbell up with the elbow bent. Now you lower it slowly and under control, and the biceps keeps working the whole way down. Click the button to lower it."],
 ask:"While you lower the dumbbell, is the biceps getting shorter, staying the same length, or getting longer? Is its tension larger or smaller than the load?",
 ans:["It is getting longer while it keeps pulling. Its tension is a little smaller than the load, so the load slowly stretches it, and the muscle controls how fast. A contraction in which an active muscle lengthens is called an eccentric contraction. You use one every time you walk downstairs or sit down slowly in a chair.","Eccentric work is the kind most likely to leave you sore a day or two later. That delayed onset muscle soreness comes mostly from the lowering half of exercise, such as walking downhill or lowering weights, rather than the lifting half."],
 name:"eccentric contraction",
 desc:"The arm starts with the elbow bent and a medium dumbbell held up, with the dashed load line above the middle of the tension graph. The student clicks lower it. The tension holds at the load for a moment, then drops a little below it and stays there, while the length line rises, meaning the muscle gets longer, and the forearm lowers slowly.",
 pre:function(){S(["ct"]);ctBtns("lower");plate.setAttribute("r",28);setLoad(0.6,"load");foreA(-55);},
 play:function(a){return wo(ctBtn.lower._hit,pCt.lower,a).then(function(){ctBtns("");return ctPlay(ECC,2800,a);}).then(function(){ctTag.textContent="eccentric: the muscle lengthens";cap("The active muscle lengthens as it lowers the load.");});}},

{title:"Heavier loads, slower lifts",
 text:["The muscle is fully activated every time in this step. Only the load changes. Click the button four times. Each click adds weight and curls the dumbbell, and the speed at which the muscle shortens is plotted against the load."],
 ask:"How will the speed of shortening change as the load gets heavier, and what happens when the load equals the most tension the muscle can make?",
 ans:["The speed falls as the load rises. With almost no load the muscle shortens fastest. With a heavier load, every crossbridge has to pull against more force, so the filaments slide more slowly. When the load equals the most tension the muscle can make, the speed falls to zero and the contraction becomes isometric.","That is why you can toss a tennis ball much faster than a bowling ball, even though your arm muscles are working at their hardest both times."],
 name:"force-velocity relationship",
 desc:"The same arm. On the right, axes of shortening speed against load. The student clicks add weight four times. Each time the dumbbell gets bigger and the forearm curls more slowly, and a point is plotted: high speed at the lightest load, then lower and lower, and zero at the heaviest load, where the forearm does not move. Then a curve is drawn through the points, labeled fastest with almost no load, and speed is zero when the load equals the most tension the muscle can make.",
 pre:function(){S(["ct"]);shown([gTL],false);shown([gFv],true);ctBtns("add");plate.setAttribute("r",14);},
 play:function(a){var i=0;function one(){if(i>=FVL.length)return Promise.resolve();var L=FVL[i],v=FV(L),j=i;i++;
     return wo(ctBtn.add._hit,pCt.add,a).then(function(){plate.setAttribute("r",14+j*9);foreA(0);
       if(v<0.01)return lin(1200,a,function(k){foreA(Math.sin(k*40)*0.8);});return tweenVal(0,-55,Math.min(3000,520/v),a,foreA);}).then(function(){fvPts[j].setAttribute("display","");return wait(300,a);}).then(one);}
   return one().then(function(){foreA(0);fvCurve.setAttribute("display","");return reveal(fvCurve,900,a);}).then(function(){shown([fvT1,fvT2,fvT3],true);cap("The heavier the load, the slower the muscle shortens.");});}},

{sec:"Review",comp:"Competencies 6 to 10",
 title:"Summary with the scientific terms",
 text:["A single action potential produces a twitch: a latent period set by excitation-contraction coupling, a contraction phase while Ca2+ is high, and a relaxation phase set by SERCA pumping Ca2+ back. Shocks that come before relaxation is complete summate, because Ca2+ accumulates in the cytosol, not because action potentials add. Rising frequency gives unfused and then fused tetanus.","A motor unit is one motor neuron and all the fibers it controls, all of one fiber type. Force is graded by recruiting more units, smallest first by the size principle, and by firing them faster. Small units give fine control and large units give great force. Tension is greatest at the sarcomere length with the best filament overlap. Isotonic contractions move a load, concentric while shortening and eccentric while lengthening; isometric contractions make tension without moving, and shortening speed falls as the load rises. Click start to run one train of shocks from a single twitch to fused tetanus."],
 ask:"Without scrolling back: you push your foot down harder and harder on a car's brake pedal. Name two ways your nervous system makes the leg muscles pull harder, and say what each one does inside the muscle.",
 ans:["It recruits more motor units, adding the medium and then the large units in order of size, so more fibers are contracting. And it makes each motor neuron fire faster, so the twitches summate toward fused tetanus, because Ca2+ builds up in the cytosol faster than SERCA can pump it away.","If part of this did not come back to you, go back to those steps, then try your Competency Study Guide boxes from memory. You will make these same tracings yourself in PhysioEx this week."],
 desc:"One long tension trace with a Ca2+ trace below it and a stimulator with a start button at the left. The student clicks start, and a train of shocks runs from left to right: one single twitch, then two shocks close together that summate, then a faster train that gives unfused tetanus, then a very fast train that gives fused tetanus. The Ca2+ falls to zero after the twitch, then stays higher and higher as the shocks come faster. Labels above read twitch, summation, unfused and fused tetanus.",
 pre:function(){S(["rev"]);},
 play:function(a){return wo(rvHit,pRv,a).then(function(){rvTicks.setAttribute("display","");return lin(4200,a,rvSet);}).then(function(){rvSet(1);shown(rvL,true);cap("Faster shocks let Ca2+ build up and the twitches fuse.");});}}
];
