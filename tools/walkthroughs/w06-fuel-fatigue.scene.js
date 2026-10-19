/* Fuel, fiber types and fatigue. Oct 17 2026. Week 6 walkthrough 3 of 4.
   Week 6 competencies 11 (fiber types), 12 (ATP sources), 13 (fatigue and
   EPOC) and 14 (training and disuse), with 15 (the grip and EMG lab) in the
   fatigue section.
   Panels, each shown and hidden per step:
   - atp: one muscle fiber cut open along its length, with a sarcomere, the
     SR and its SERCA pump, a Na+/K+ pump and a mitochondrion (step 1)
   - tanks: three fuel tanks with taps over a graph of how fast each source
     supplies ATP on a stretched time line (steps 2 to 5 and the review)
   - fibers: three fibers cut across at one scale, with task cards (steps 6
     and 8); twitch: one twitch in fast and slow fibers (step 7)
   - grip: a hand on a grip dynamometer, force and EMG traces and a row of
     motor units (step 9)
   - path: brain, spinal cord, motor neuron and muscle fiber, for central and
     peripheral fatigue (step 10); tired: the surface of a working fiber,
     with its T tubule, SR, myofibril and glycogen (step 11)
   - o2: oxygen use from rest through exercise into recovery (steps 12, 13)
   - adapt: a starting fiber and the same fiber after training or a cast
     (steps 14 to 16)
   Every step the student acts in uses promptAt and waitOn from w05-kit.js,
   so Next stays locked until the student has done the action. */

/* ---- small helpers for this walkthrough ---- */
/* Oct 17 2026: same as the kit's waitOn, except that when the student leaves
   the step (Back, Next, a jump) before clicking, the wait never resolves, so
   the old step's animation cannot run on into the new step's figure. */
function waitOn(tgt,prm,a){
  if(!a||reduce){if(prm)prm.setAttribute("display","none");return Promise.resolve();}
  if(prm)prm.setAttribute("display","");
  tgt.style.cursor="pointer";
  return new Promise(function(res){var my=runId,done=false,k=0,t;setTimeout(function(){if(!done)lockNext(true);},0);
    function stop(){done=true;clearInterval(t);tgt.removeEventListener("click",fin);document.removeEventListener("keydown",key,true);tgt.style.cursor="";if(prm)prm.setAttribute("display","none");}
    function fin(){if(done)return;stop();if(my===runId){lockNext(false);res();}}
    function key(e){if((e.key==="Enter"||e.key===" ")&&!/TEXTAREA|INPUT|BUTTON|SELECT|^A$/.test(e.target.tagName||"")){e.preventDefault();fin();}}
    tgt.addEventListener("click",fin);document.addEventListener("keydown",key,true);
    t=setInterval(function(){if(my!==runId){stop();return;}k++;if(prm&&prm._ring){var r0=+prm._ring.getAttribute("data-r");prm._ring.setAttribute("r",r0+((k%10)<5?(k%5):5-(k%5))*2);}},70);});}
/* the closing caption of a step, written only if the student is still on it */
function done(s){var my=runId;return function(){if(my===runId)cap(s);};}
function rng(seed){var s=seed;return function(){s=(s*9301+49297)%233280;return s/233280;};}
/* a round gold play button with a label beside it; the whole group is the click target */
function goBtn(p,cx,cy,label){
  var g=el("g",{},p);
  el("circle",{cx:cx,cy:cy,r:20,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},g);
  el("path",{d:"M"+(cx-6)+" "+(cy-10)+" L"+(cx+11)+" "+cy+" L"+(cx-6)+" "+(cy+10)+" Z",fill:GDEEP},g);
  g._t=tx(g,cx+30,cy+5,label,"tn",15,"start");
  el("rect",{x:cx-26,y:cy-26,width:60+label.length*8.5,height:52,fill:"transparent"},g);
  g.setAttribute("role","button");g.setAttribute("aria-label",label);g.setAttribute("display","none");
  return g;}
function show(list,on){list.forEach(function(g){g.setAttribute("display",on?"":"none");});}
/* a sarcomere: Z discs, thin filaments from each Z disc, thick filaments with myosin heads in the middle */
function sarc(p,x0,x1,y0,y1,n,big){
  var g=el("g",{},p),L=el("g",{},g),R=el("g",{},g),M=el("g",{},g),w=x1-x0,mid=(x0+x1)/2,step=(y1-y0)/n,i;
  for(i=0;i<=n;i++){var y=y0+i*step;
    el("line",{x1:x0,y1:y,x2:x0+0.4*w,y2:y,stroke:INK2,"stroke-width":big?4:3},L);
    el("line",{x1:x1-0.4*w,y1:y,x2:x1,y2:y,stroke:INK2,"stroke-width":big?4:3},R);}
  for(i=0;i<n;i++){var yt=y0+(i+0.5)*step,h0=mid-0.28*w,h1=mid+0.28*w;
    el("line",{x1:h0,y1:yt,x2:h1,y2:yt,stroke:NAVY,"stroke-width":big?9:6,"stroke-linecap":"round"},M);
    for(var hx=h0+8;hx<h1-6;hx+=big?18:14){if(Math.abs(hx-mid)<w*0.05)continue;var dir=hx<mid?-1:1,hl=big?8:5,hv=big?10:7;
      el("line",{x1:hx,y1:yt,x2:hx+dir*hl,y2:yt-hv,stroke:NAVY,"stroke-width":big?3:2},M);
      el("line",{x1:hx,y1:yt,x2:hx+dir*hl,y2:yt+hv,stroke:NAVY,"stroke-width":big?3:2},M);}}
  [[x0,L],[x1,R]].forEach(function(z){var d="M"+z[0]+" "+(y0-12);for(var yy=y0-12,k=0;yy<y1+12;yy+=10,k++)d+=" L"+(z[0]+(k%2?-5:5))+" "+(yy+10);el("path",{d:d,fill:"none",stroke:MAROON,"stroke-width":big?4:3},z[1]);});
  return {g:g,L:L,R:R};}
/* points spread through a unit disc, used for mitochondria in every fiber drawing */
var UD=(function(){var r=rng(11),out=[],guard=0;while(out.length<30&&guard<20000){guard++;var x=r()*2-1,y=r()*2-1;if(x*x+y*y>0.72)continue;var ok=true;for(var i=0;i<out.length;i++){var dx=out[i][0]-x,dy=out[i][1]-y;if(dx*dx+dy*dy<0.05){ok=false;break;}}if(ok)out.push([x,y]);}return out;})();
/* one fiber cut across: myofibrils (pale dots), mitochondria (navy ovals), capillaries (red circles around it) */
function fiberDraw(g,cx,cy,r,o){
  while(g.firstChild)g.removeChild(g.firstChild);
  el("circle",{cx:cx,cy:cy,r:r,fill:o.fill||"#fff",stroke:o.stroke||MAROON,"stroke-width":2.5},g);
  if(o.myo){for(var y=-r;y<=r;y+=13){var off=(Math.abs(Math.round(y/13))%2)?6.5:0;for(var x=-r;x<=r;x+=13){var xx=x+off;if(xx*xx+y*y<(r-8)*(r-8))el("circle",{cx:cx+xx,cy:cy+y,r:3.6,fill:"#fff",stroke:INK2,"stroke-width":0.8,opacity:.75},g);}}}
  for(var i=0;i<(o.mito||0)&&i<UD.length;i++){el("ellipse",{cx:cx+UD[i][0]*(r-10),cy:cy+UD[i][1]*(r-10),rx:7,ry:4,fill:NAVY,stroke:"#fff","stroke-width":1},g);}
  for(i=0;i<(o.cap||0);i++){var an=(i/o.cap)*Math.PI*2+0.4;el("circle",{cx:cx+Math.cos(an)*(r+10),cy:cy+Math.sin(an)*(r+10),r:7,fill:"#B5473A",stroke:"#fff","stroke-width":2},g);}
}
/* an ATP token that travels */
function atpTok(p){var g=el("g",{},p);el("rect",{x:-21,y:-11,width:42,height:22,rx:11,fill:GDEEP,stroke:"#fff","stroke-width":2},g);var t=el("text",{"class":"iw","font-size":12},g);t.textContent="ATP";g.setAttribute("display","none");return g;}

/* ======================= one fiber and its ATP (step 1) ======================= */
var gAtp=G("atp");
tx(gAtp,450,46,"One muscle fiber, cut open along its length","tn",15,"middle");
el("rect",{x:40,y:70,width:820,height:380,rx:34,fill:TISS,stroke:MAROON,"stroke-width":3},gAtp);
el("rect",{x:146,y:58,width:30,height:24,rx:6,fill:NAVY},gAtp);
tx(gAtp,190,104,"Na+/K+ pump in the membrane","t",13,"start");
el("rect",{x:300,y:112,width:520,height:40,rx:20,fill:TINT,stroke:INK2,"stroke-width":2},gAtp);
tx(gAtp,520,137,"sarcoplasmic reticulum (SR), the Ca2+ store","t",13,"middle");
el("rect",{x:740,y:142,width:30,height:20,rx:5,fill:MAROON},gAtp);
tx(gAtp,850,186,"SERCA pump returns Ca2+ to the SR","t",13,"end");
var aS=sarc(gAtp,150,750,226,370,3,true);
tx(gAtp,150,404,"Z disc","t",13,"middle");tx(gAtp,750,404,"Z disc","t",13,"middle");
tx(gAtp,330,432,"myosin heads pull the thin filaments in","tn",14,"middle");
el("ellipse",{cx:808,cy:300,rx:40,ry:22,fill:"#F1E2C2",stroke:GDEEP,"stroke-width":2.5},gAtp);
el("path",{d:"M776 300 q6 -14 12 0 q6 14 12 0 q6 -14 12 0 q6 14 12 0 q6 -14 12 0",fill:"none",stroke:GDEEP,"stroke-width":2},gAtp);
tx(gAtp,808,342,"mitochondrion","t",12,"middle");
var aTok=[atpTok(gAtp),atpTok(gAtp),atpTok(gAtp)];
var aCa=[0,1,2,3].map(function(){var c=el("circle",{r:5,fill:GOLD,stroke:GDEEP,"stroke-width":1.5},gAtp);c.setAttribute("display","none");return c;});
var aHit=el("rect",{x:150,y:210,width:600,height:180,fill:"transparent"},gAtp);
var pAtp=promptAt(gAtp,500,488,["Click the sarcomere to make the fiber contract"],560,430,560,340,46);
function atpReset(){place(aS.L,0,0);place(aS.R,0,0);hide(aTok);hide(aCa);}
function caMove(out,a){return Promise.all(aCa.map(function(c,i){var x=380+i*50;c.setAttribute("display","");
  return tweenVal(0,1,500,a,function(k){c.setAttribute("cx",x);c.setAttribute("cy",out?156+k*84:240-k*84);}).then(function(){c.setAttribute("display","none");});}));}

/* ======================= three tanks over a graph (steps 2 to 5, review) ======================= */
var gTk=G("tanks");
var TB=170;
var TK=[{x:40,w:90,h:60,pipe:18,col:MAROON,fill:"#EBCBC5",lab:["stored ATP and","creatine phosphate","no oxygen needed"]},
        {x:290,w:120,h:100,pipe:11,col:GDEEP,fill:"#ECDFC4",lab:["anaerobic","glycolysis","no oxygen needed"]},
        {x:540,w:190,h:150,pipe:5,col:NAVY,fill:"#CDD3E0",lab:["oxidative","phosphorylation","needs oxygen"]}];
TK.forEach(function(k){var cx=k.x+k.w/2;k.cx=cx;
  k.hl=el("rect",{x:k.x-7,y:TB-k.h-7,width:k.w+14,height:k.h+14,rx:10,fill:"none",stroke:GOLD,"stroke-width":6},gTk);
  el("rect",{x:k.x,y:TB-k.h,width:k.w,height:k.h,rx:6,fill:"#fff",stroke:k.col,"stroke-width":3},gTk);
  k.liq=el("rect",{x:k.x+3,y:TB-k.h+3,width:k.w-6,height:k.h-6,rx:4,fill:k.fill},gTk);
  el("line",{x1:cx,y1:TB,x2:cx,y2:206,stroke:k.col,"stroke-width":k.pipe+6},gTk);
  el("circle",{cx:cx,cy:188,r:k.pipe/2+8,fill:"#fff",stroke:k.col,"stroke-width":3},gTk);
  el("line",{x1:cx-k.pipe/2-12,y1:188,x2:cx+k.pipe/2+12,y2:188,stroke:k.col,"stroke-width":4,"stroke-linecap":"round"},gTk);
  k.st=el("line",{x1:cx,y1:208,x2:cx,y2:230,stroke:k.col,"stroke-width":0,"stroke-linecap":"round"},gTk);
  tx(gTk,k.x+k.w+10,TB-k.h+16,k.lab[0],"tn",13,"start");tx(gTk,k.x+k.w+10,TB-k.h+32,k.lab[1],"tn",13,"start");tx(gTk,k.x+k.w+10,TB-k.h+48,k.lab[2],"t",12,"start");
});
var tkClock=tx(gTk,880,160,"","tn",15,"end");
var TKU=[tx(gTk,85,250,"fastest, lasts seconds","tm",12,"middle"),tx(gTk,350,250,"fast, lasts a minute or so","tm",12,"middle"),tx(gTk,635,250,"slowest, lasts hours","tm",12,"middle")];
/* the graph: time is stretched (log scale) so seconds and an hour both fit */
var UMAX=Math.log10(3601);
function TXu(u){return 80+760*u/UMAX;}
el("line",{x1:80,y1:270,x2:80,y2:465,stroke:INK2,"stroke-width":2},gTk);
el("line",{x1:80,y1:465,x2:862,y2:465,stroke:INK2,"stroke-width":2},gTk);
tx(gTk,90,266,"how fast ATP is supplied","t",13,"start");
[[0,"0"],[10,"10 s"],[60,"1 min"],[600,"10 min"],[3600,"1 hour"]].forEach(function(q){var x=TXu(Math.log10(1+q[0]));el("line",{x1:x,y1:465,x2:x,y2:474,stroke:INK2,"stroke-width":2},gTk);tx(gTk,x,490,q[1],"t",13,q[0]===3600?"end":"middle");});
var FF=[function(u){return Math.exp(-Math.pow(u-0.45,2)/(2*0.35*0.35));},
        function(u){return Math.exp(-Math.pow(u-1.45,2)/(2*0.4*0.4));},
        function(u){return 1/(1+Math.exp(-(u-1.9)/0.18));}];
var HH=[170,120,80],TCOL=[MAROON,GDEEP,NAVY];
var TCV=TCOL.map(function(c){return el("path",{d:"",fill:"none",stroke:c,"stroke-width":4,"stroke-linejoin":"round"},gTk);});
var TCL=[tx(gTk,182,288,"creatine phosphate","tm",13,"middle"),tx(gTk,392,337,"anaerobic glycolysis","t",13,"middle"),tx(gTk,760,377,"oxidative phosphorylation","tn",13,"middle")];
TCL[1].setAttribute("style","fill:"+GDEEP);
var TCLU=[0.75,1.75,2.7];
function curveD(i,u){var d="M80 "+(465-HH[i]*FF[i](0)).toFixed(1);for(var v=0.02;v<u;v+=0.02)d+=" L"+TXu(v).toFixed(1)+" "+(465-HH[i]*FF[i](v)).toFixed(1);if(u>0)d+=" L"+TXu(u).toFixed(1)+" "+(465-HH[i]*FF[i](u)).toFixed(1);return d;}
function lev(i,t){if(i===0)return 1-0.92*Math.min(1,t/15);if(i===1)return 1-0.85*Math.min(1,Math.max(0,t-3)/150);return 1-0.3*Math.min(1,t/3600);}
function fmtT(t){return t<59.5?Math.round(t)+" s":t<3590?Math.round(t/60)+" min":"1 hour";}
function tankU(u){var t=Math.pow(10,u)-1;
  TK.forEach(function(k,i){var L=lev(i,t),hh=(k.h-6)*L;k.liq.setAttribute("y",TB-3-hh);k.liq.setAttribute("height",Math.max(0,hh));
    k.st.setAttribute("stroke-width",u>0?(k.pipe*FF[i](u)).toFixed(1):0);
    TCV[i].setAttribute("d",u>0?curveD(i,u):"");TCL[i].setAttribute("display",u>=TCLU[i]?"":"none");});
  tkClock.textContent=u>0?"time: "+fmtT(t):"";}
function growTk(u0,u1,dur,a){return tweenVal(u0,u1,dur,a,tankU);}
var U10=Math.log10(11),U120=Math.log10(121);
var bStart=goBtn(gTk,420,222,"start the sprint"),bMore=goBtn(gTk,420,222,"keep going"),bHour=goBtn(gTk,420,222,"keep going for an hour");
var bDash=goBtn(gTk,440,222,"100 meter dash"),bRun=goBtn(gTk,660,222,"an hour-long run");
var pStart=promptAt(gTk,500,300,["Click to start the sprint"],440,246,420,222,26);
var pMore=promptAt(gTk,500,300,["Click to keep going"],440,246,420,222,26);
var pHour=promptAt(gTk,500,300,["Click to keep going for an hour"],440,246,420,222,26);
var pDash=promptAt(gTk,470,300,["Click the 100 meter dash"],452,246,440,222,26);
var pRun=promptAt(gTk,600,300,["Now click the hour-long run"],672,246,660,222,26);
function tankReset(){tankU(0);show([bStart,bMore,bHour,bDash,bRun],false);TK.forEach(function(k){k.hl.setAttribute("display","none");});show(TKU,false);}

/* ======================= three fibers cut across (steps 6 and 8) ======================= */
var gFib=G("fibers");
var FIB=[{cx:160,cy:235,r:62,mito:22,cap:7,fill:"#C46A5E",lab:["slow oxidative (type I)","small diameter, dark red","many mitochondria and capillaries","slow, resists fatigue","ATP mostly from oxidative phosphorylation"]},
         {cx:440,cy:235,r:84,mito:13,cap:5,fill:"#E2A196",lab:["fast oxidative-glycolytic (type IIA)","medium diameter, red","many mitochondria and capillaries","fast, intermediate fatigue resistance","ATP from both pathways"]},
         {cx:735,cy:235,r:112,mito:4,cap:2,fill:"#F8EEEB",lab:["fast glycolytic (type IIX)","large diameter, pale (white)","few mitochondria and capillaries","fast, tires quickly","ATP mostly from anaerobic glycolysis"]}];
FIB.forEach(function(f){f.g=el("g",{},gFib);f.L=el("g",{},gFib);
  f.lab.forEach(function(s,i){tx(f.L,f.cx,388+i*19,s,i===0?"tn":"t",i===0?14:13,"middle");});
  f.hit=el("circle",{cx:f.cx,cy:f.cy,r:f.r+16,fill:"transparent"},gFib);});
function fibShow(f,on){fiberDraw(f.g,f.cx,f.cy,f.r,on?{fill:f.fill,mito:f.mito,cap:f.cap,myo:true}:{fill:"#fff",stroke:INK2});f.L.setAttribute("display",on?"":"none");}
var pFib=[promptAt(gFib,40,62,["Click the small fiber to look inside"],120,150,160,235,80),
          promptAt(gFib,330,62,["Now click the medium fiber"],420,128,440,235,102),
          promptAt(gFib,500,40,["Now click the large fiber"],680,100,735,235,128)];
/* task cards for step 8 */
var CARDS=[{x:45,s:"jumping to block a shot",to:2},{x:335,s:"sitting up straight all day",to:0},{x:620,s:"walking across campus",to:1}];
CARDS.forEach(function(c){c.g=el("g",{},gFib);el("rect",{x:c.x,y:14,width:235,height:48,rx:10,fill:"#fff",stroke:NAVY,"stroke-width":2.5},c.g);tx(c.g,c.x+117,44,c.s,"tn",14,"middle");
  var f=FIB[c.to],tx0=c.x+117,ang=Math.atan2(f.cy-62,f.cx-tx0),ex=f.cx-Math.cos(ang)*(f.r+24),ey=f.cy-Math.sin(ang)*(f.r+24);
  c.ar=arrow(gFib,tx0,64,ex,ey,MAROON,4);});
var pCard=[promptAt(gFib,560,112,["Click: sitting up straight all day"],520,70,452,38,40),
           promptAt(gFib,300,112,["Now click: walking across campus"],660,70,737,38,40),
           promptAt(gFib,300,112,["Now click: jumping to block a shot"],230,70,162,38,40)];
function fibReset(){FIB.forEach(function(f){fibShow(f,false);});CARDS.forEach(function(c){c.g.setAttribute("display","none");c.ar.setAttribute("display","none");});}

/* ======================= one twitch, fast and slow (step 7) ======================= */
var gTw=G("twitch");
el("line",{x1:120,y1:80,x2:120,y2:420,stroke:INK2,"stroke-width":2},gTw);
el("line",{x1:120,y1:420,x2:850,y2:420,stroke:INK2,"stroke-width":2},gTw);
tx(gTw,128,70,"tension, each curve scaled to its own peak","t",13,"start");
tx(gTw,480,448,"time after one action potential","t",13,"middle");
el("line",{x1:140,y1:420,x2:140,y2:434,stroke:MAROON,"stroke-width":3},gTw);
function twY(x,tp){var s=(x-140)/tp;return s<=0?420:420-300*s*Math.exp(1-s);}
function twD(tp,k){var x1=140+700*k,d="M140 420";for(var x=142;x<=x1;x+=3)d+=" L"+x+" "+twY(x,tp).toFixed(1);return d;}
var twF=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":4},gTw),twS=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":4},gTw);
var twLF=tx(gTw,130,104,"fast-twitch fibers (FOG and FG)","tm",14,"start"),twLS=tx(gTw,362,110,"slow oxidative fibers","tn",14,"start");
var bTw=goBtn(gTw,60,476,"send one action potential");
var pTw=promptAt(gTw,420,250,["Click the stimulator to send","one action potential"],80,452,60,476,26);
function twReset(){twF.setAttribute("d","");twS.setAttribute("d","");show([twLF,twLS,bTw],false);}

/* ======================= the grip and EMG (step 9) ======================= */
var gGrip=G("grip");
tx(gGrip,24,212,"forearm muscles","t",13,"start");
el("rect",{x:222,y:150,width:24,height:200,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gGrip);
el("rect",{x:196,y:92,width:76,height:58,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gGrip);
el("path",{d:"M206 140 A28 28 0 0 1 262 140",fill:"none",stroke:INK2,"stroke-width":2},gGrip);
var needle=el("line",{x1:234,y1:140,x2:212,y2:128,stroke:MAROON,"stroke-width":3,"stroke-linecap":"round"},gGrip);
tx(gGrip,234,80,"grip dynamometer","t",13,"middle");
el("rect",{x:20,y:222,width:160,height:60,rx:24,fill:TISS,stroke:MAROON,"stroke-width":3},gGrip);
var fist=el("rect",{x:165,y:196,width:100,height:110,rx:28,fill:TISS,stroke:MAROON,"stroke-width":3},gGrip);
var FING=[218,242,266,290].map(function(y){return el("path",{d:"M196 "+y+" Q232 "+(y-8)+" 262 "+y,fill:"none",stroke:MAROON,"stroke-width":2.5},gGrip);});
[[70,282],[115,282]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:7,fill:GOLD,stroke:GDEEP,"stroke-width":2},gGrip);});
poly(gGrip,[[70,289],[70,320],[320,320],[338,330]],INK2,2);poly(gGrip,[[115,289],[115,314]],INK2,2);
tx(gGrip,24,346,"surface EMG electrodes","t",13,"start");
tx(gGrip,40,382,"motor units at work","tn",13,"start");
var MU=[];for(var mi=0;mi<10;mi++)MU.push(el("circle",{cx:50+mi*24,cy:404,r:9,fill:"#fff",stroke:NAVY,"stroke-width":2},gGrip));
/* traces */
el("line",{x1:340,y1:70,x2:340,y2:200,stroke:INK2,"stroke-width":2},gGrip);el("line",{x1:340,y1:200,x2:862,y2:200,stroke:INK2,"stroke-width":2},gGrip);
tx(gGrip,348,64,"grip force","tn",14,"start");
el("line",{x1:340,y1:120,x2:862,y2:120,stroke:GDEEP,"stroke-width":2,"stroke-dasharray":"7 5"},gGrip);
tx(gGrip,860,112,"target: half your strongest squeeze","t",12,"end");
el("line",{x1:340,y1:250,x2:340,y2:410,stroke:INK2,"stroke-width":2},gGrip);el("line",{x1:340,y1:330,x2:862,y2:330,stroke:INK2,"stroke-width":1,opacity:.5},gGrip);
tx(gGrip,348,246,"EMG: electrical activity of the muscle","tn",14,"start");
tx(gGrip,600,456,"time holding the grip","t",13,"middle");
var gF=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3.5,"stroke-linejoin":"round"},gGrip);
var gE=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":1.6},gGrip);
var gLF=tx(gGrip,856,180,"force starts to fall","tm",13,"end"),gLE=tx(gGrip,856,428,"EMG grows as more units join in","tm",13,"end");
var NOISE=(function(){var r=rng(5),o=[];for(var i=0;i<270;i++)o.push(r()*2-1);return o;})();
function forceAt(k){return k<0.06?k/0.06:k<0.72?1:1-0.45*(k-0.72)/0.28;}
function gripDraw(k){var d="M340 200",x1=340+520*k;for(var x=340;x<=x1;x+=4){d+=" L"+x+" "+(200-80*forceAt((x-340)/520)).toFixed(1);}gF.setAttribute("d",k>0?d:"");
  var e="M340 330";for(var i=0;i<NOISE.length&&340+i*2<=x1;i++){var f=i/260,amp=forceAt(f)>0.05?(0.22+0.7*Math.min(1,f)):0.05;e+=" L"+(340+i*2)+" "+(330+NOISE[i]*amp*70).toFixed(1);}gE.setAttribute("d",k>0?e:"");
  var n=k<=0?0:Math.round(3+7*Math.min(1,k/0.85));MU.forEach(function(c,j){c.setAttribute("fill",j<n?GOLD:"#fff");});
  var sq=k>0?1:0;FING.forEach(function(p,j){var y=218+j*24;p.setAttribute("d","M196 "+y+" Q232 "+(y-8-6*sq)+" 262 "+y);});
  var ang=-150+100*(k>0?forceAt(Math.min(k,1)):0),rad=ang*Math.PI/180;needle.setAttribute("x2",(234+26*Math.cos(rad)).toFixed(1));needle.setAttribute("y2",(140+26*Math.sin(rad)).toFixed(1));}
var bGrip=goBtn(gGrip,60,462,"squeeze and hold");
var pGrip=promptAt(gGrip,250,494,["Click to squeeze and hold"],86,474,60,462,26);
function gripReset(){gripDraw(0);show([gLF,gLE,bGrip],false);}

/* ======================= brain to crossbridge (step 10) ======================= */
var gPath=G("path");
var pShC=el("rect",{x:36,y:6,width:250,height:400,rx:16,fill:NAVY,opacity:.1},gPath);
var pShP=el("rect",{x:488,y:262,width:392,height:166,rx:16,fill:MAROON,opacity:.12},gPath);
el("path",{d:"M50 110 C48 52 118 28 180 32 C242 36 272 70 268 110 C266 142 238 152 200 150 L160 150 C108 152 52 150 50 110 Z",fill:"#E6E9F0",stroke:NAVY,"stroke-width":3},gPath);
[[90,70,110,90],[130,48,140,76],[180,46,176,80],[226,62,212,90],[96,118,124,110],[230,118,206,112]].forEach(function(q){el("path",{d:"M"+q[0]+" "+q[1]+" Q"+((q[0]+q[2])/2+8)+" "+((q[1]+q[3])/2)+" "+q[2]+" "+q[3],fill:"none",stroke:INK2,"stroke-width":2,"stroke-linecap":"round"},gPath);});
el("path",{d:"M128 36 Q170 26 212 40",fill:"none",stroke:MAROON,"stroke-width":6,"stroke-linecap":"round",opacity:.7},gPath);
tx(gPath,170,22,"motor cortex","tm",13,"middle");
el("rect",{x:150,y:146,width:26,height:244,rx:12,fill:"#fff",stroke:NAVY,"stroke-width":3},gPath);
tx(gPath,140,300,"spinal cord","t",13,"end");
el("circle",{cx:163,cy:350,r:8,fill:NAVY},gPath);
el("line",{x1:171,y1:350,x2:500,y2:350,stroke:NAVY,"stroke-width":4},gPath);
tx(gPath,330,340,"motor neuron","t",13,"middle");
el("rect",{x:512,y:280,width:358,height:140,rx:24,fill:TISS,stroke:MAROON,"stroke-width":3},gPath);
el("ellipse",{cx:506,cy:350,rx:9,ry:13,fill:NAVY},gPath);
el("rect",{x:566,y:296,width:24,height:108,rx:8,fill:TINT,stroke:INK2,"stroke-width":2},gPath);
el("rect",{x:610,y:296,width:24,height:108,rx:8,fill:TINT,stroke:INK2,"stroke-width":2},gPath);
el("rect",{x:594,y:281,width:12,height:132,fill:"#fff"},gPath);
poly(gPath,[[594,281],[594,413],[606,413],[606,281]],MAROON,2.5);
sarc(gPath,670,850,304,396,2,false);
tx(gPath,500,446,"neuromuscular junction","t",13,"middle");tx(gPath,612,466,"T tubule and SR","t",13,"middle");tx(gPath,760,446,"crossbridges","t",13,"middle");
var pTC=[tx(gPath,40,470,"central fatigue: brain and spinal cord","tn",14,"start"),tx(gPath,40,488,"less drive from the brain, feeling tired","t",13,"start")];
var pTP=[tx(gPath,880,230,"peripheral fatigue: junction to crossbridges","tm",14,"end"),tx(gPath,880,250,"ion changes, less Ca2+ released, low glycogen","t",13,"end")];
var brainHit=el("ellipse",{cx:158,cy:92,rx:112,ry:64,fill:"transparent"},gPath);
var xbHit=el("rect",{x:660,y:292,width:200,height:116,fill:"transparent"},gPath);
var pBrain=promptAt(gPath,330,80,["Click the motor cortex"],276,80,170,80,62);
var pXb=promptAt(gPath,380,200,["Now click the crossbridges"],700,290,760,350,58);
function pathReset(){show([pShC,pShP].concat(pTC,pTP),false);}

/* ======================= inside a tired fiber (step 11) ======================= */
var gTir=G("tired");
el("rect",{x:20,y:60,width:860,height:400,fill:TISS},gTir);
el("rect",{x:188,y:60,width:24,height:360,fill:"#fff"},gTir);
el("path",{d:"M20 60 H188 V420 H212 V60 H880",fill:"none",stroke:MAROON,"stroke-width":4},gTir);
tx(gTir,30,44,"outside the fiber","t",13,"start");tx(gTir,30,84,"inside the fiber","t",13,"start");
el("rect",{x:130,y:120,width:52,height:280,rx:12,fill:TINT,stroke:INK2,"stroke-width":2},gTir);
el("rect",{x:218,y:120,width:52,height:280,rx:12,fill:TINT,stroke:INK2,"stroke-width":2},gTir);
tx(gTir,156,264,"SR","tn",13,"middle");tx(gTir,244,264,"SR","tn",13,"middle");
tx(gTir,200,436,"T tubule","t",12,"middle");
sarc(gTir,330,750,160,320,3,false);
tx(gTir,540,340,"myofibril","t",12,"middle");
var GLY=(function(){var r=rng(3),o=[];for(var i=0;i<20;i++)o.push(el("circle",{cx:350+r()*380,cy:362+r()*54,r:6,fill:GDEEP,opacity:.85},gTir));return o;})();
el("rect",{x:790,y:150,width:50,height:270,rx:6,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gTir);
var tirBar=el("rect",{x:794,y:154,width:42,height:262,rx:4,fill:NAVY,opacity:.8},gTir);
tx(gTir,815,124,"force of each","tn",13,"middle");tx(gTir,815,140,"contraction","tn",13,"middle");
var KB=[];for(var ki=0;ki<11;ki++){var kb=badge(gTir,200,124+ki*26,"K+",NAVY,10);KB.push(kb);}
var PIP=[[385,200],[455,253],[525,200],[595,253],[665,200],[715,253],[420,306],[490,306],[560,306],[630,306],[700,306],[385,253]];
var PB=PIP.map(function(q){return badge(gTir,q[0],q[1],"Pi",GDEEP,11);});
var CAD=[0,1,2,3,4,5].map(function(){var c=el("circle",{r:5,fill:GOLD,stroke:GDEEP,"stroke-width":1.5},gTir);c.setAttribute("display","none");return c;});
var TIRL=[tx(gTir,72,102,"less Ca2+","tm",13,"middle"),tx(gTir,72,116,"from the SR","tm",13,"middle"),tx(gTir,540,104,"Pi builds up as ATP and creatine phosphate are used","tm",13,"middle"),
          tx(gTir,200,456,"K+ builds up in the T tubule","tm",13,"middle"),tx(gTir,540,444,"glycogen runs low","tm",13,"middle")];
var bTir=goBtn(gTir,60,488,"keep working hard");
var pTir=promptAt(gTir,300,498,["Click to keep the fiber working hard"],88,494,60,488,26);
function tirState(c){KB.forEach(function(b,i){b.setAttribute("display",i<2+2*c?"":"none");});PB.forEach(function(b,i){b.setAttribute("display",i<2+2.5*c?"":"none");});
  GLY.forEach(function(g,i){g.setAttribute("display",i<20-4.25*c?"":"none");});var h=262*(1-0.13*c);tirBar.setAttribute("y",154+262-h);tirBar.setAttribute("height",h);}
function tirReset(){tirState(0);hide(CAD);show(TIRL.concat([bTir]),false);}
function caBurst(n,a){return Promise.all(CAD.map(function(c,i){if(i>=n)return Promise.resolve();var y=180+i*24;c.setAttribute("display","");
  return tweenVal(0,1,420,a,function(k){c.setAttribute("cx",272+k*90);c.setAttribute("cy",y);}).then(function(){c.setAttribute("display","none");});}));}

/* ======================= oxygen use, rest to recovery (steps 12 and 13) ======================= */
var gO2=G("o2");
el("line",{x1:80,y1:60,x2:80,y2:440,stroke:INK2,"stroke-width":2},gO2);el("line",{x1:80,y1:440,x2:862,y2:440,stroke:INK2,"stroke-width":2},gO2);
tx(gO2,88,56,"oxygen use","tn",14,"start");
[200,520].forEach(function(x){el("line",{x1:x,y1:70,x2:x,y2:440,stroke:INK2,"stroke-width":1,"stroke-dasharray":"4 5",opacity:.6},gO2);});
tx(gO2,140,462,"rest","t",13,"middle");tx(gO2,360,462,"exercise","t",13,"middle");tx(gO2,690,462,"recovery","t",13,"middle");
tx(gO2,90,390,"resting level","t",12,"start");
function o2Y(x){return x<=200?400:x<=520?400-220*(1-Math.exp(-(x-200)/40)):400-220*(1-Math.exp(-8))*Math.exp(-(x-520)/70);}
function o2D(x0,x1){var d="M"+x0+" "+o2Y(x0).toFixed(1);for(var x=x0+2;x<=x1;x+=2)d+=" L"+x+" "+o2Y(x).toFixed(1);return d;}
var o2Def=el("path",{d:"",fill:GDEEP,opacity:.28},gO2),o2Epoc=el("path",{d:"",fill:NAVY,opacity:.18},gO2);
var o2Need=el("path",{d:"",fill:"none",stroke:GDEEP,"stroke-width":2.5,"stroke-dasharray":"8 6"},gO2);
var o2C=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":4,"stroke-linejoin":"round"},gO2);
var o2NeedL=tx(gO2,360,170,"oxygen the work needs","t",13,"middle");o2NeedL.setAttribute("style","fill:"+GDEEP);
var o2DefL=el("g",{},gO2);tx(o2DefL,252,300,"oxygen deficit: covered by","tm",13,"start");tx(o2DefL,252,318,"creatine phosphate and glycolysis","tm",13,"start");arrow(o2DefL,262,286,222,206,MAROON,3);
var o2EpL=tx(gO2,548,386,"EPOC","tn",16,"start");
var o2Items=el("g",{},gO2);tx(o2Items,580,84,"EPOC, once called oxygen debt, pays for:","tn",14,"start");
var O2I=["rebuilding ATP and creatine phosphate","reloading myoglobin and hemoglobin with O2","turning lactate back into fuel or glucose","higher body temperature, heart and breathing"].map(function(s,i){var g=el("g",{},o2Items);el("circle",{cx:588,cy:104+i*22,r:4,fill:NAVY},g);tx(g,598,109+i*22,s,"t",13,"start");return g;});
var bGo=goBtn(gO2,200,110,"start exercising"),bStop=goBtn(gO2,520,110,"stop exercising");
var pGo=promptAt(gO2,330,250,["Click to start exercising"],222,130,200,110,26);
var pStop=promptAt(gO2,560,250,["Click to stop exercising"],540,132,520,110,26);
function o2Draw(x1){o2C.setAttribute("d",o2D(80,Math.max(82,x1)));
  var nd="M80 400 H"+Math.min(x1,200);if(x1>200)nd+=" V180 H"+Math.min(x1,520);if(x1>520)nd+=" V400 H"+x1;o2Need.setAttribute("d",nd);
  if(x1>200){var xe=Math.min(x1,520),d="M200 180 H"+xe;for(var x=xe;x>=200;x-=2)d+=" L"+x+" "+o2Y(x).toFixed(1);o2Def.setAttribute("d",d+" Z");}else o2Def.setAttribute("d","");
  if(x1>520){var d2="M520 400";for(var x2=520;x2<=x1;x2+=2)d2+=" L"+x2+" "+o2Y(x2).toFixed(1);o2Epoc.setAttribute("d",d2+" L"+x1+" 400 Z");}else o2Epoc.setAttribute("d","");}
function o2Reset(){o2Draw(80);show([o2NeedL,o2DefL,o2EpL,o2Items,bGo,bStop],false);show(O2I,false);}

/* ======================= training and disuse (steps 14 to 16) ======================= */
var gAd=G("adapt");
var BASE={r:80,mito:9,cap:5};
var ADX={end:{r:84,mito:22,cap:9,lines:["fiber size: little change","mitochondria: many more","capillaries: more","more myoglobin, resists fatigue"]},
         res:{r:112,mito:9,cap:5,lines:["fiber size: much larger","myofibrils: many more","mitochondria and capillaries:","spread over a larger area"]},
         cast:{r:56,mito:5,cap:3,lines:["fiber size: smaller","myofibrils: fewer","mitochondria: fewer","capillaries: fewer"]}};
var adBase=el("g",{},gAd);fiberDraw(adBase,160,210,BASE.r,{fill:"#E2A196",mito:BASE.mito,cap:BASE.cap,myo:true});
tx(gAd,160,362,"before","tn",15,"middle");
var adArrow=arrow(gAd,268,210,312,210,INK2,4);
var adRes=el("g",{},gAd);var adAfter=tx(gAd,450,362,"after","tn",15,"middle");
tx(gAd,620,46,"pale dots: myofibrils","t",13,"start");tx(gAd,620,66,"navy ovals: mitochondria","t",13,"start");tx(gAd,620,86,"red circles: capillaries","t",13,"start");
var adL=[0,1,2,3].map(function(i){return tx(gAd,620,170+i*24,"","tm",14,"start");});
var bEnd=goBtn(gAd,60,430,"months of endurance training"),bRes=goBtn(gAd,345,430,"months of resistance training"),bCast=goBtn(gAd,640,430,"six weeks in a cast");
var pEnd=promptAt(gAd,90,494,["Click: months of endurance training"],72,454,60,430,26);
var pRes=promptAt(gAd,300,494,["Click: months of resistance training"],352,454,345,430,26);
var pCast=promptAt(gAd,400,494,["Click: six weeks in a cast"],632,454,640,430,26);
function adTo(key,k){var t=ADX[key],r=BASE.r+(t.r-BASE.r)*k,m=Math.round(BASE.mito+(t.mito-BASE.mito)*k),c=Math.round(BASE.cap+(t.cap-BASE.cap)*k);
  fiberDraw(adRes,450,210,r,{fill:"#E2A196",mito:m,cap:c,myo:true});}
function adReset(){while(adRes.firstChild)adRes.removeChild(adRes.firstChild);show([adArrow,adAfter],false);adL.forEach(function(t){t.textContent="";});show([bEnd,bRes,bCast],false);}
function adPlay(key,btn,prm,a){btn.setAttribute("display","");
  return waitOn(btn,prm,a).then(function(){show([adArrow,adAfter],true);return tweenVal(0,1,1600,a,function(k){adTo(key,k);});})
   .then(function(){ADX[key].lines.forEach(function(s,i){adL[i].textContent=s;});});}

makeCap();
function resetAll(){atpReset();tankReset();fibReset();twReset();gripReset();pathReset();tirReset();o2Reset();adReset();cap("");}
function S(l){only(l.concat(["cap"]));resetAll();}

/* ======================= steps ======================= */
var STEPS=[
{sec:"ATP sources during activity",comp:"Competency 12",
 title:"Three jobs that run on ATP",
 text:["Every contraction runs on ATP, and so does every relaxation. In the walkthroughs before this one you saw three places a working muscle fiber spends it. Myosin heads split one ATP on every turn of the crossbridge cycle. The SERCA pump on the sarcoplasmic reticulum uses ATP to move Ca2+ back inside so the fiber can relax. The Na+/K+ pump in the fiber's membrane uses ATP to restore the ion gradients after each action potential.","A fiber holds only enough ATP for a few seconds of hard work, so it has to make more as fast as it spends it. This walkthrough is about where that ATP comes from, how different kinds of fiber make it, what happens when they cannot keep up, and how training changes them. Click the sarcomere to make the fiber contract, and watch where the ATP goes."],
 name:"ATP use in muscle",
 auto:true,
 desc:"One muscle fiber cut open along its length. Inside it are a sarcomere with Z discs at each end, thin filaments and thick filaments with myosin heads; above it the sarcoplasmic reticulum with a SERCA pump on its lower edge; a Na+/K+ pump in the top membrane; and a mitochondrion at the right. When the student clicks the sarcomere, gold Ca2+ dots leave the SR, an ATP token travels from the mitochondrion to the myosin heads and the Z discs move closer together. Then a second ATP token travels to the SERCA pump, the Ca2+ dots return to the SR and the sarcomere relaxes, and a third ATP token travels to the Na+/K+ pump.",
 pre:function(){S(["atp"]);},
 play:function(a){return waitOn(aHit,pAtp,a).then(function(){return Promise.all([caMove(true,a),run(aTok[0],[[808,300],[600,300],[450,298]],900,a)]);})
   .then(function(){return tweenVal(0,40,600,a,function(v){place(aS.L,v,0);place(aS.R,-v,0);});})
   .then(function(){return run(aTok[1],[[808,300],[790,220],[755,174]],800,a);})
   .then(function(){return Promise.all([caMove(false,a),tweenVal(40,0,600,a,function(v){place(aS.L,v,0);place(aS.R,-v,0);})]);})
   .then(function(){return run(aTok[2],[[808,300],[500,190],[161,96]],1100,a);})
   .then(done("Crossbridges, SERCA and the Na+/K+ pump all spend ATP."));}},

{title:"The first seconds of a sprint",
 text:["Each tank at the top is one way a fiber makes ATP. The size of a tank stands for how long that source can keep going, and the width of its tap stands for how fast it can deliver ATP. The graph below shows how fast each source is supplying ATP. Its time line is stretched so that ten seconds and an hour both fit: each mark is a much longer wait than the one before.","When you start an all-out sprint, all three sources switch on at once, but they come up to speed at very different rates. Click Start the sprint and watch the first ten seconds."],
 ask:"Which source supplies most of the ATP in the first few seconds, and why can it respond so quickly?",
 ans:["Creatine phosphate, which Silverthorn calls phosphocreatine. It is a small molecule that carries a high-energy phosphate group. An enzyme, creatine kinase, moves that phosphate straight onto ADP and makes ATP in a single step, so it can refill ATP almost as fast as the myosin heads spend it. No oxygen is needed.","The catch is that a fiber stores only a little of it. Together with the ATP already in the fiber, it supports only seconds of all-out effort, roughly the first 10 to 15 seconds. When the muscle rests, ATP made in the mitochondria is used to put the phosphate back onto creatine, refilling the store."],
 name:"creatine phosphate (phosphocreatine)",
 desc:"Three tanks across the top: a small tank with a wide tap for stored ATP and creatine phosphate, a medium tank with a medium tap for anaerobic glycolysis, and a very large tank with a narrow tap for oxidative phosphorylation, which needs oxygen. Below is a graph of how fast each source supplies ATP against time, with time marks at 0, 10 seconds, 1 minute, 10 minutes and 1 hour. The student clicks Start the sprint. A clock runs to 10 seconds, the small tank drains almost empty through its wide tap, and the maroon creatine phosphate curve shoots up and is already falling by 10 seconds, while the glycolysis curve is starting to rise and the oxidative curve is still near zero.",
 pre:function(){S(["tanks"]);bStart.setAttribute("display","");},
 play:function(a){return waitOn(bStart,pStart,a).then(function(){bStart.setAttribute("display","none");return growTk(0,U10,2600,a);}).then(done("Creatine phosphate supplies ATP fast, but only for seconds."));}},

{title:"Still sprinting after ten seconds",
 text:["Ten seconds in, the creatine phosphate is nearly used up, but you keep sprinting as hard as you can. Click Keep going and watch the next two minutes."],
 ask:"Which source carries most of the load now, and what limits how long it can last?",
 ans:["Anaerobic glycolysis. In the cytosol, one glucose, often broken off the fiber's stored glycogen, is split into two pyruvate, making a net of 2 ATP, or 3 when it comes from glycogen. When oxygen cannot be delivered fast enough for the mitochondria to keep up, the pyruvate is turned into lactate. That step regenerates the NAD+ that glycolysis needs, so glycolysis can keep running without oxygen.","It is fast, but it gets only 2 ATP from each glucose, so it burns through glucose quickly, and lactate and H+ build up in the fiber. The H+ slows glycolysis down. It carries most of the load for roughly the next minute of hard work and then fades. The lactate is not wasted: it leaves the fiber and can be used as fuel by other tissues or turned back into glucose by the liver."],
 name:"anaerobic glycolysis",
 desc:"The tanks and graph, already showing the first 10 seconds. The student clicks Keep going. The clock runs to 2 minutes. The medium glycolysis tank drains through its medium tap, and the gold glycolysis curve rises to its peak at about half a minute and then falls by 2 minutes. Meanwhile the navy oxidative phosphorylation curve climbs steadily, and the large tank has barely dropped.",
 pre:function(){S(["tanks"]);tankU(U10);bMore.setAttribute("display","");},
 play:function(a){return waitOn(bMore,pMore,a).then(function(){bMore.setAttribute("display","none");return growTk(U10,U120,3000,a);}).then(done("Glycolysis takes over next, then fades after a minute or so."));}},

{title:"Settling into a long run",
 text:["Now you slow to a pace you could keep up for an hour. Click Keep going for an hour."],
 ask:"Which source now supplies nearly all the ATP, and what does it need that the other two do not?",
 ans:["Oxidative phosphorylation, in the mitochondria. It needs a steady supply of oxygen, carried in by the blood and held inside the fiber by myoglobin. It can burn glucose, fatty acids and even amino acids, and together with glycolysis it gets about 30 to 32 ATP from each glucose, far more than the 2 from glycolysis.","It is the slowest to get going, because breathing, heart rate and blood flow to the muscle take time to rise, and it delivers ATP at a lower top rate than the other two, which is why you cannot sprint for an hour. But it keeps going for as long as oxygen and fuel last. Muscle at rest or in moderate activity gets nearly all of its ATP this way."],
 name:"oxidative phosphorylation (aerobic metabolism)",
 desc:"The tanks and graph showing the first 2 minutes. The student clicks Keep going for an hour. The clock runs to 1 hour. The navy oxidative phosphorylation curve levels off at a steady rate, lower than the peaks of the other two curves, and stays there all the way to the hour mark. The large tank drops only a little, while the other two curves have fallen to near zero.",
 pre:function(){S(["tanks"]);tankU(U120);bHour.setAttribute("display","");},
 play:function(a){return waitOn(bHour,pHour,a).then(function(){bHour.setAttribute("display","none");return growTk(U120,UMAX,3000,a);}).then(done("Oxidative phosphorylation is slow to start but lasts hours."));}},

{title:"Tank size and tap size",
 text:["Each source has two separate properties. One is how fast it can deliver ATP, the width of its tap. The other is how long it can keep going, the size of its tank. Click the 100 meter dash and then the hour-long run to see which tanks each one draws on most."],
 ask:"Rank the three sources from fastest to slowest at delivering ATP, then from shortest lasting to longest lasting. What do you notice about the two lists?",
 ans:["Fastest to slowest: creatine phosphate, then anaerobic glycolysis, then oxidative phosphorylation. Shortest lasting to longest lasting: creatine phosphate, then anaerobic glycolysis, then oxidative phosphorylation. The two lists are in the same order, so the source that delivers ATP fastest is also the one that runs out first.","A 100 meter dash lasts only seconds, so it runs mostly on stored ATP and creatine phosphate, with glycolysis coming up quickly. An hour-long run depends almost entirely on oxidative phosphorylation."],
 name:"ATP sources: rate and capacity",
 desc:"The full graph to 1 hour. Two buttons sit on the right of the graph: 100 meter dash and an hour-long run. When the student clicks the 100 meter dash, gold outlines appear around the creatine phosphate tank and the glycolysis tank. When the student clicks the hour-long run, a gold outline appears around the oxidative phosphorylation tank. Then a label appears under each tap: fastest, lasts seconds; fast, lasts a minute or so; slowest, lasts hours.",
 pre:function(){S(["tanks"]);tankU(UMAX);show([bDash,bRun],true);},
 play:function(a){return waitOn(bDash,pDash,a).then(function(){TK[0].hl.setAttribute("display","");TK[1].hl.setAttribute("display","");return wait(700,a);})
   .then(function(){return waitOn(bRun,pRun,a);}).then(function(){TK[0].hl.setAttribute("display","none");TK[1].hl.setAttribute("display","none");TK[2].hl.setAttribute("display","");return wait(500,a);})
   .then(function(){show(TKU,true);}).then(done("The fastest source to deliver is the first to run out."));}},

{sec:"Three kinds of muscle fiber",comp:"Competency 11",
 title:"Look inside three fibers",
 text:["Skeletal muscle fibers are not all alike. Silverthorn sorts them by two properties: how fast they contract and how well they resist fatigue. That gives three types. Here are three fibers cut straight across, drawn at the same scale. For now you can see only their size."],
 ask:"One fiber is small, one medium and one large. Which do you expect to keep working the longest, and what would you look for inside it to check?",
 ans:["The small one, the slow oxidative fiber, also called type I. It is packed with mitochondria and wrapped in capillaries, and it is dark red because it holds a lot of myoglobin, a red protein that binds oxygen and helps move it into the fiber. Its small diameter keeps the distance oxygen must travel from the capillaries short. Everything about it supports oxidative phosphorylation, so it resists fatigue.","The large one is the fast glycolytic fiber, type IIX in humans. It has few mitochondria, few capillaries and little myoglobin, so it looks pale, which is why it is sometimes called white muscle. It makes most of its ATP by anaerobic glycolysis and tires quickly. In between is the fast oxidative-glycolytic fiber, type IIA: medium sized and red, with many mitochondria and capillaries, though fewer mitochondria than a slow oxidative fiber. It uses both oxidative and glycolytic pathways and is intermediate in fatigue resistance."],
 name:"slow oxidative, fast oxidative-glycolytic and fast glycolytic fibers",
 desc:"Three fibers cut across at the same scale, small on the left, medium in the middle and large on the right, shown first as plain outlines. The student clicks each in turn. The small fiber fills dark red, with many navy mitochondria inside and seven capillaries around it, labeled slow oxidative, type I. The medium fiber fills red, with many mitochondria, though fewer than the small fiber, and five capillaries, labeled fast oxidative-glycolytic, type IIA. The large fiber stays pale, with only a few mitochondria and two capillaries, labeled fast glycolytic, type IIX. Under each are its diameter and color, its mitochondria and capillaries, its speed and fatigue resistance, and its main ATP source.",
 pre:function(){S(["fibers"]);},
 play:function(a){var k=0;function one(){if(k>=3)return Promise.resolve();var f=FIB[k],p=pFib[k];k++;return waitOn(f.hit,p,a).then(function(){fibShow(f,true);return wait(400,a);}).then(one);}
   return one().then(done("Small, red fibers full of mitochondria resist fatigue."));}},

{title:"Fast and slow twitches",
 text:["The fiber types also differ in how quickly they contract. The graph will show the tension of a single twitch in fast fibers and in slow fibers after one action potential, with each curve scaled to its own peak so you can compare only the timing. Click the stimulator to send the action potential."],
 ask:"Why would a fast fiber reach its peak tension sooner, and also relax sooner, than a slow fiber?",
 ans:["Two differences, both from earlier walkthroughs. Fast fibers have a form of myosin that splits ATP faster, so their crossbridges cycle faster and tension builds sooner. They also pump Ca2+ back into the sarcoplasmic reticulum faster, so the twitch ends sooner. Slow fibers have a slower myosin and slower Ca2+ uptake, so their twitch rises and falls more slowly.","Fast oxidative-glycolytic and fast glycolytic fibers are both fast-twitch fibers. What separates those two is how they make ATP, and that decides how long they can keep working."],
 name:"fast-twitch and slow-twitch fibers",
 desc:"An empty graph of tension against time. The student clicks the stimulator. A single action potential is marked at the left, and two twitch curves are drawn: a maroon curve for fast-twitch fibers that rises steeply to its peak and falls back quickly, and a navy curve for slow oxidative fibers that rises later and falls slowly, lasting much longer.",
 pre:function(){S(["twitch"]);bTw.setAttribute("display","");},
 play:function(a){return waitOn(bTw,pTw,a).then(function(){bTw.setAttribute("display","none");return tweenVal(0,1,2200,a,function(k){twF.setAttribute("d",twD(60,k));twS.setAttribute("d",twD(200,k));});})
   .then(function(){show([twLF,twLS],true);}).then(done("Fast fibers twitch and relax sooner than slow fibers."));}},

{title:"Matching fibers to tasks",
 text:["Every muscle is a mix of fiber types, and all the fibers in one motor unit are the same type. The proportions differ from muscle to muscle and from person to person, set partly by genetics and partly by how the muscle is used. Click each task card to match it to the fiber that does most of that work."],
 ask:"Sitting up straight all day, walking across campus, and jumping to block a shot: which fiber type does most of the work in each?",
 ans:["Sitting up straight all day: slow oxidative fibers. Posture muscles work for hours at low force, so they need fibers that hardly tire. Walking across campus: fast oxidative-glycolytic fibers join the slow ones, because walking takes more force than holding a posture but still has to last. Jumping to block a shot: fast glycolytic fibers, for a short burst of as much force as possible, as fast as possible.","This matches the order of recruitment you saw with motor units. Small motor units of slow oxidative fibers are recruited first for light work, and the large motor units of fast glycolytic fibers are added only when the task needs a lot of force."],
 name:"fiber type and function",
 desc:"The three fibers with all their details showing, and three task cards above them: jumping to block a shot, sitting up straight all day, and walking across campus. The student clicks sitting up straight all day, and an arrow points to the slow oxidative fiber. Then walking across campus, and an arrow points to the fast oxidative-glycolytic fiber. Then jumping to block a shot, and an arrow points to the fast glycolytic fiber.",
 pre:function(){S(["fibers"]);FIB.forEach(function(f){fibShow(f,true);});CARDS.forEach(function(c){c.g.setAttribute("display","");});},
 play:function(a){var seq=[1,2,0],k=0;function one(){if(k>=3)return Promise.resolve();var c=CARDS[seq[k]],p=pCard[k];k++;return waitOn(c.g,p,a).then(function(){c.ar.setAttribute("display","");return reveal(c.ar,500,a);}).then(one);}
   return one().then(done("Posture uses slow fibers, and jumping uses fast glycolytic."));}},

{sec:"Fatigue",comp:"Competencies 13 and 15",
 title:"Holding a steady grip",
 text:["Fatigue is a drop in the force a muscle can produce or keep up, even though you are still trying. Rest reverses it. In lab you will measure it with a grip dynamometer, which records the force of your grip, and surface EMG electrodes on the forearm, which pick up the combined electrical activity of the muscle fibers underneath.","Here you hold a steady grip at about half of your strongest squeeze and try to keep it there. Click Squeeze and hold, and watch the force on top, the EMG below, and the motor units under the hand."],
 ask:"The force stays flat for a while. What do you predict the EMG does while you hold the force steady, and why?",
 ans:["The EMG grows larger even though the force stays the same. As the working fibers begin to fatigue, each one produces less force, so to keep the total force steady the nervous system recruits more motor units and fires them faster. More active fibers make a bigger EMG. You can see more motor units lighting up under the hand.","Eventually there are no more motor units to add, and the force starts to fall no matter how hard you try. That is fatigue you can measure. A strong electrical signal reaching fibers that now produce less force points to fatigue inside the muscle itself, called peripheral fatigue, which the next steps look at."],
 name:"motor unit recruitment during fatigue",
 desc:"A forearm and hand gripping a grip dynamometer, with two EMG electrodes on the forearm and a row of ten motor units under the hand. On the right, a force trace with a dashed target line at half of the strongest squeeze, and an EMG trace below it. The student clicks Squeeze and hold. The force rises to the target and stays flat for most of the hold, then starts to fall near the end. The EMG grows steadily larger the whole time, and the motor units light up one after another, from three at the start to all ten.",
 pre:function(){S(["grip"]);bGrip.setAttribute("display","");},
 play:function(a){return waitOn(bGrip,pGrip,a).then(function(){bGrip.setAttribute("display","none");return tweenVal(0,1,4200,a,gripDraw);})
   .then(function(){show([gLF,gLE],true);}).then(done("To hold the force steady, more motor units join in."));}},

{title:"Where fatigue can start",
 text:["Fatigue can start anywhere along the path from the decision to move to the crossbridges, and Silverthorn divides it into two kinds. The figure shows the motor cortex in the brain, the spinal cord, a motor neuron, and a muscle fiber with its neuromuscular junction, a T tubule with the sarcoplasmic reticulum on each side, and a sarcomere where the crossbridges form. Click the motor cortex, then click the crossbridges."],
 ask:"Where would you draw the line between fatigue that starts in the nervous system and fatigue that starts in the muscle, and how could you test which kind a tired person has?",
 ans:["Central fatigue starts in the central nervous system, the brain and spinal cord. It includes the feeling of tiredness and the wish to stop, and it often sets in before the muscles themselves fail, which may help protect the body. Peripheral fatigue starts anywhere from the neuromuscular junction to the crossbridges: at the junction, in the action potential along the T tubules, in Ca2+ release from the sarcoplasmic reticulum, or at the crossbridges themselves.","One way to tell them apart is to stimulate the motor nerve electrically once the person can no longer squeeze hard. If the electrical stimulus brings the force back up, the muscle could still contract and the failure was central. If the force stays low, the fatigue is in the muscle."],
 name:"central and peripheral fatigue",
 desc:"A brain seen from the side with the motor cortex marked along its top, the spinal cord running down from it, a motor neuron leaving the cord, and a muscle fiber at the right with its neuromuscular junction, a T tubule between two pieces of SR, and a sarcomere. The student clicks the motor cortex, and the brain and spinal cord are shaded navy, labeled central fatigue: brain and spinal cord, less drive from the brain, feeling tired. Then the student clicks the crossbridges, and the muscle fiber from the junction to the sarcomere is shaded maroon, labeled peripheral fatigue: junction to crossbridges, ion changes, less Ca2+ released, low glycogen.",
 pre:function(){S(["path"]);},
 play:function(a){return waitOn(brainHit,pBrain,a).then(function(){show([pShC].concat(pTC),true);return wait(500,a);}).then(function(){return waitOn(xbHit,pXb,a);})
   .then(function(){show([pShP].concat(pTP),true);}).then(done("Central fatigue starts in the CNS, peripheral in the muscle."));}},

{title:"Inside a tired fiber",
 text:["This is a small piece of a fiber near its surface: the membrane, a T tubule dipping in from the outside, the sarcoplasmic reticulum on each side of it, part of a myofibril, and grains of stored glycogen, the gold dots. The navy badges are K+ in the T tubule, the gold badges are inorganic phosphate (Pi), and the bar at the right shows the force of each contraction. Click Keep working hard to make the fiber contract again and again."],
 ask:"Lactic acid was long blamed for tired muscles. As this fiber keeps working, which changes inside it could weaken each contraction?",
 ans:["Several changes add up, and which matters most depends on the kind of exercise. K+ leaves the fiber with every action potential and builds up in the narrow space of the T tubules, which changes the membrane potential and reduces Ca2+ release. Inorganic phosphate (Pi) builds up as ATP and creatine phosphate are broken down; it interferes with the power stroke and with Ca2+ release, and it is thought to be one of the main causes of fatigue in short bursts of maximal effort. With less Ca2+ released from the sarcoplasmic reticulum, fewer crossbridges can form. In long, moderate exercise, fatigue goes along with using up the fiber's glycogen.","Lactic acid, that is lactate and H+, is no longer thought to be the main cause of muscle fatigue. The fall in pH may still play some part, and research on it continues, but the changes above are now understood to matter more. ATP itself does not run out completely: the fiber slows down before its ATP is gone."],
 name:"peripheral fatigue",
 desc:"The surface of a muscle fiber: the membrane along the top with a T tubule dipping down into the fiber, a stack of SR on each side of the T tubule, a myofibril with thick and thin filaments, gold grains of glycogen below it, and a force bar at the right. The student clicks Keep working hard. The fiber contracts four times. Each time, fewer gold Ca2+ dots leave the SR, more K+ badges collect in the T tubule, more Pi badges appear among the filaments, glycogen grains disappear, and the force bar shrinks. Labels then appear: less Ca2+ released from the SR, Pi builds up as ATP and creatine phosphate are used, K+ builds up in the T tubule, and glycogen runs low.",
 pre:function(){S(["tired"]);bTir.setAttribute("display","");},
 play:function(a){var c=0;function cyc(){if(c>=4)return Promise.resolve();var n=6-c;c++;return caBurst(n,a).then(function(){tirState(c);return wait(350,a);}).then(cyc);}
   return waitOn(bTir,pTir,a).then(function(){bTir.setAttribute("display","none");return cyc();}).then(function(){show(TIRL,true);}).then(done("Ion changes, less Ca2+ release and low glycogen weaken it."));}},

{sec:"Oxygen use after exercise",comp:"Competency 13",
 title:"Starting to exercise",
 text:["The graph shows how much oxygen your body uses, from rest, through a few minutes of steady hard exercise, and into recovery. The dashed gold line shows the oxygen the work would need if all of its ATP came from oxidative phosphorylation. Click Start exercising."],
 ask:"The work needs extra ATP at once, but oxygen use takes a little while to rise. Where does the ATP come from during that gap?",
 ans:["From the fast sources at the start of this walkthrough: the ATP already in the fibers, creatine phosphate, and anaerobic glycolysis. They cover the gap while breathing, heart rate and blood flow to the muscles rise and the mitochondria speed up. The shaded gap between the oxygen the work needs and the oxygen actually used is called the oxygen deficit.","Once the oxygen supply catches up, oxygen use levels off, and oxidative phosphorylation supplies nearly all the ATP for steady exercise."],
 name:"oxygen deficit",
 desc:"A graph of oxygen use against time, divided into rest, exercise and recovery, with oxygen use flat at the resting level. The student clicks Start exercising. The dashed line for the oxygen the work needs jumps up at once, but the navy oxygen use curve rises gradually and levels off a little later. The gap between them at the start is shaded and labeled oxygen deficit, covered by creatine phosphate and glycolysis.",
 pre:function(){S(["o2"]);bGo.setAttribute("display","");},
 play:function(a){return waitOn(bGo,pGo,a).then(function(){bGo.setAttribute("display","none");o2NeedL.setAttribute("display","");return tweenVal(80,520,2600,a,o2Draw);})
   .then(function(){o2DefL.setAttribute("display","");}).then(done("At the start, the fast ATP sources cover the oxygen gap."));}},

{title:"Breathing hard after you stop",
 text:["Now you stop. The work ends at once, so the need for ATP drops right back toward resting. Click Stop exercising and watch the oxygen use."],
 ask:"Why does your oxygen use stay above resting for a while after you stop, and what is that extra oxygen being used for?",
 ans:["The extra oxygen pays for recovery. Oxidative phosphorylation keeps running fast to rebuild the ATP and creatine phosphate that were used up, and oxygen reloads the myoglobin in the muscles and the hemoglobin in the blood. Lactate is turned back into pyruvate and used as fuel, or turned back into glucose in the liver. Your body temperature is higher, which speeds up metabolism, and your heart and breathing muscles are still working harder than at rest.","This extra oxygen is called excess post-exercise oxygen consumption, or EPOC. It used to be called oxygen debt, as if you were paying back exactly the oxygen deficit from the start. The extra oxygen is usually larger than the deficit, because it also pays for the higher temperature and the other changes, so EPOC is the term used now."],
 name:"excess post-exercise oxygen consumption (EPOC)",
 desc:"The oxygen graph through the exercise period, with the oxygen deficit shaded. The student clicks Stop exercising. The dashed line for the oxygen the work needs drops straight back to resting, but the navy oxygen use curve falls slowly, staying above resting for a long time. The area between the curve and the resting level after exercise is shaded and labeled EPOC. A list appears at the upper right: EPOC, once called oxygen debt, pays for rebuilding ATP and creatine phosphate, reloading myoglobin and hemoglobin with oxygen, turning lactate back into fuel or glucose, and higher body temperature, heart and breathing.",
 pre:function(){S(["o2"]);o2Draw(520);show([o2NeedL,o2DefL,bStop],true);},
 play:function(a){var k=0;function item(){if(k>=O2I.length)return Promise.resolve();O2I[k++].setAttribute("display","");return wait(450,a).then(item);}
   return waitOn(bStop,pStop,a).then(function(){bStop.setAttribute("display","none");return tweenVal(520,860,2600,a,o2Draw);})
   .then(function(){o2EpL.setAttribute("display","");o2Items.setAttribute("display","");return item();})
   .then(done("EPOC pays to rebuild, reload, clear lactate and cool down."));}},

{sec:"Training and disuse",comp:"Competency 14",
 title:"Months of endurance training",
 text:["Muscle fibers change with how they are used, which is called plasticity. On the left is a starting fiber cut across. Its myofibrils are the pale dots, its mitochondria the navy ovals, and its capillaries the red circles around it. Click Months of endurance training, such as distance running, cycling or swimming."],
 ask:"After months of endurance training, what happens to this fiber's size, its capillaries and its mitochondria?",
 ans:["The mitochondria and the capillaries both increase, and the fiber's size changes little. More mitochondria means more oxidative phosphorylation, and more capillaries bring in more oxygen and fuel and carry away wastes, so the fiber resists fatigue better. The fiber also makes more myoglobin. Some fast glycolytic fibers become more oxidative, behaving more like fast oxidative-glycolytic fibers.","This is why a trained endurance athlete can hold a pace that would exhaust an untrained person: their fibers make more of their ATP aerobically."],
 name:"endurance training adaptations",
 desc:"A starting fiber cut across on the left, labeled before, with its myofibrils, a few mitochondria and five capillaries. Three buttons along the bottom: months of endurance training, months of resistance training, and six weeks in a cast. The student clicks months of endurance training. A new fiber grows on the right, labeled after, about the same size but with many more mitochondria and nine capillaries around it. A list appears: fiber size little change, mitochondria many more, capillaries more, more myoglobin, resists fatigue.",
 pre:function(){S(["adapt"]);show([bRes,bCast],true);},
 play:function(a){return adPlay("end",bEnd,pEnd,a).then(done("Endurance training adds mitochondria and capillaries."));}},

{title:"Months of resistance training",
 text:["Now the same starting fiber goes through months of heavy resistance training, such as lifting weights. Click Months of resistance training."],
 ask:"What happens to the fiber's size, its capillaries and its mitochondria this time?",
 ans:["The fiber gets bigger. This is hypertrophy, and it comes mainly from building more myofibrils, packed with more actin and myosin, so the fiber can produce more force. The number of fibers changes little. The mitochondria and capillaries do not increase in step with the fiber's size, so they end up spread over a larger area.","Compare the two trained fibers. The resistance-trained fiber is the stronger one, and the endurance-trained fiber can keep going longer. Strength depends mostly on how many myofibrils lie side by side, and endurance depends on mitochondria and blood supply, which is why training is matched to the goal."],
 name:"hypertrophy",
 desc:"The starting fiber on the left and the three buttons. The student clicks months of resistance training. The fiber on the right grows much larger, filled with many more myofibrils, while its mitochondria and its five capillaries stay the same in number and end up spread farther apart. A list appears: fiber size much larger, myofibrils many more, mitochondria and capillaries spread over a larger area.",
 pre:function(){S(["adapt"]);show([bEnd,bCast],true);},
 play:function(a){return adPlay("res",bRes,pRes,a).then(done("Resistance training enlarges fibers by adding myofibrils."));}},

{title:"Six weeks in a cast",
 text:["A broken arm spends six weeks in a cast, and the muscles inside it barely contract. Click Six weeks in a cast."],
 ask:"What happens to the fiber's size, its capillaries and its mitochondria when it is hardly used?",
 ans:["The fiber shrinks. This is disuse atrophy. With little contraction, the fiber breaks down more muscle protein than it builds, so it loses myofibrils, and it also loses mitochondria and capillaries. The muscle becomes both weaker and quicker to tire. As long as its nerve supply is intact, it can be rebuilt with use.","This matters in patient care. People on bed rest or in a cast lose muscle quickly, which is one reason early movement and physical therapy are part of recovery. Astronauts living in low gravity face the same problem."],
 name:"disuse atrophy",
 desc:"The starting fiber on the left and the three buttons. The student clicks six weeks in a cast. The fiber on the right shrinks to a smaller size, with fewer myofibrils, fewer mitochondria and only three capillaries. A list appears: fiber size smaller, myofibrils fewer, mitochondria fewer, capillaries fewer.",
 pre:function(){S(["adapt"]);show([bEnd,bRes],true);},
 play:function(a){return adPlay("cast",bCast,pCast,a).then(done("Disuse shrinks fibers and costs them mitochondria."));}},

{sec:"Review",comp:"Competencies 11 to 15",
 title:"Summary with the scientific terms",
 text:["Muscle fibers spend ATP on crossbridge cycling, on the SERCA pump and on the Na+/K+ pump. Stored ATP and creatine phosphate supply it fastest but last only seconds, anaerobic glycolysis carries the load for about the next minute and produces lactate, and oxidative phosphorylation in the mitochondria is slowest to start and lowest in rate but lasts as long as oxygen and fuel last. Slow oxidative (type I) fibers are small, red, rich in mitochondria, capillaries and myoglobin, and resist fatigue. Fast oxidative-glycolytic (type IIA) fibers are fast and intermediate. Fast glycolytic (type IIX) fibers are large, pale and fast, and tire quickly.","Fatigue can be central, in the brain and spinal cord, or peripheral, from the neuromuscular junction to the crossbridges, where K+ and Pi changes, reduced Ca2+ release and glycogen depletion all contribute. Holding a steady force takes more and more motor units, so the EMG grows. The oxygen deficit at the start of exercise is covered by the fast sources, and EPOC after exercise rebuilds ATP and creatine phosphate, reloads myoglobin, clears lactate and pays for the higher temperature. Endurance training adds mitochondria and capillaries, resistance training enlarges fibers by adding myofibrils, and disuse causes atrophy. Click Start the sprint to replay the three sources from the first second to the hour."],
 ask:"Without scrolling back: a sprinter and a marathon runner each finish a race. Which ATP sources and which fiber types did each rely on most, and why is each still breathing hard a few minutes later?",
 ans:["The sprinter relied on stored ATP, creatine phosphate and anaerobic glycolysis, delivered mostly by fast glycolytic and fast oxidative-glycolytic fibers. The marathon runner relied on oxidative phosphorylation in slow oxidative and fast oxidative-glycolytic fibers. Both breathe hard afterward because of EPOC: rebuilding ATP and creatine phosphate, reloading myoglobin, clearing lactate, and a higher body temperature. The sprinter's recovery leans more on rebuilding creatine phosphate and clearing lactate.","If you could not get there, redraw the three tanks and the three fibers from memory, the way your Competency Study Guide asks."],
 desc:"The three tanks and the empty graph. The student clicks Start the sprint, and the whole hour replays: the creatine phosphate tank drains and its curve peaks and falls within seconds, the glycolysis curve peaks at about half a minute and fades, and the oxidative phosphorylation curve rises and holds steady to the hour mark.",
 pre:function(){S(["tanks"]);bStart.setAttribute("display","");},
 play:function(a){return waitOn(bStart,pStart,a).then(function(){bStart.setAttribute("display","none");return growTk(0,UMAX,6000,a);}).then(function(){show(TKU,true);}).then(done("Fast sources first, then oxidative phosphorylation for hours."));}}
];
