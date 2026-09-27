/* ======================= build scene ======================= */
/* Action potential. Sep 27 2026. One figure for the whole walkthrough:
   the membrane voltage tracing across the top (time runs 0 to 8 ms), a
   panel under it that holds the channel-count traces, the positive
   feedback loop, the concentration check or the arithmetic, and at the
   bottom a patch of trigger zone membrane with one voltage-gated sodium
   channel (activation gate outside, inactivation ball inside, the same
   drawing as the gating walkthrough) and one voltage-gated potassium
   channel, with the trigger zone meter at lower left. The lower right
   corner is kept empty because the Watch again button sits there.
   Numbers match the earlier walkthroughs: rest -70, threshold -55, peak
   about +30, after-hyperpolarization about -80, sodium's balance point
   +60, potassium's -90. Draw order is z-order. */
markers();
var REG={};
function G(n,p){var g=el("g",{},p||svg);REG[n]=g;return g;}
function only(l){for(var k in REG)REG[k].setAttribute("display","none");l.forEach(function(k){if(REG[k])REG[k].setAttribute("display","");});}
function show(n,on){if(REG[n])REG[n].setAttribute("display",on===false?"none":"");}
function vis(e,on){e.setAttribute("display",on?"":"none");}

/* ---- scales ---- */
var GX0=112,GX1=842,GTOP=12,GBOT=224;
function X(t){return GX0+t*(GX1-GX0)/8;}            /* 0 to 8 ms */
function Y(v){return 20+(70-v)*1.2;}                /* +60 at 32, 0 at 104, -55 at 170, -70 at 188, -90 at 212 */

/* monotone cubic through key points, so the tracing never overshoots */
function mono(K){
  var n=K.length,xs=K.map(function(k){return k[0];}),ys=K.map(function(k){return k[1];}),d=[],m=[],i;
  for(i=0;i<n-1;i++)d.push((ys[i+1]-ys[i])/(xs[i+1]-xs[i]));
  m[0]=d[0];m[n-1]=d[n-2];
  for(i=1;i<n-1;i++)m[i]=(d[i-1]*d[i]<=0)?0:(d[i-1]+d[i])/2;
  for(i=0;i<n-1;i++){
    if(d[i]===0){m[i]=0;m[i+1]=0;continue;}
    var a=m[i]/d[i],b=m[i+1]/d[i],s=a*a+b*b;
    if(s>9){var q=3/Math.sqrt(s);m[i]=q*a*d[i];m[i+1]=q*b*d[i];}
  }
  return function(x){
    if(x<=xs[0])return ys[0];if(x>=xs[n-1])return ys[n-1];
    var j=0;while(x>xs[j+1])j++;
    var h=xs[j+1]-xs[j],t=(x-xs[j])/h,t2=t*t,t3=t2*t;
    return (2*t3-3*t2+1)*ys[j]+(t3-2*t2+t)*h*m[j]+(-2*t3+3*t2)*ys[j+1]+(t3-t2)*h*m[j+1];
  };
}
var FLAT=function(){return -70;};
var AP=mono([[0,-70],[1,-70],[1.45,-55],[1.75,0],[2.0,30],[2.35,0],[2.9,-70],[3.5,-80],[4.0,-78],[5.0,-74],[6.5,-70],[8,-70]]);
var SUB=mono([[0,-70],[1,-70],[1.5,-60],[2.4,-66],[3.6,-69.5],[5,-70],[8,-70]]);
var FAILB=mono([[4.0,-78],[4.45,-62],[5.2,-72],[6.5,-70.5],[8,-70]]);
var FAIL=function(t){return t<4?AP(t):FAILB(t);};
var STRONG=mono([[4.0,-78],[4.3,-55],[4.55,0],[4.8,20],[5.1,0],[5.6,-70],[6.2,-79],[7.0,-76],[8,-72]]);
var BLOCK=mono([[0,-70],[1,-70],[1.45,-55],[1.75,0],[2.05,32],[2.6,22],[3.4,0],[4.4,-45],[5.2,-65],[6.2,-70],[8,-70]]);
var PNA=mono([[0,0],[1.0,0],[1.45,0.08],[1.8,1],[2.05,0.85],[2.4,0.1],[2.9,0],[8,0]]);
var PK=mono([[0,0],[1.8,0],[2.2,0.3],[2.8,0.62],[3.5,0.5],[4.5,0.2],[5.5,0.04],[6.5,0],[8,0]]);

/* ---- the tracing ---- */
var gGraph=G("graph");
el("rect",{x:100,y:GTOP,width:752,height:GBOT-GTOP,rx:6,fill:"#fff",stroke:INK2,"stroke-width":1.5},gGraph);
[[60,"+60"],[30,"+30"],[0,"0"],[-55,M+"55"],[-70,M+"70"],[-90,M+"90"]].forEach(function(t){tx(gGraph,92,Y(t[0])+5,t[1],"t",13,"end");});
tx(gGraph,40,GTOP+16,"mV","t",13,"middle");
el("line",{x1:100,y1:Y(0),x2:852,y2:Y(0),stroke:"#D9DDE3","stroke-width":1.5},gGraph);
el("line",{x1:100,y1:Y(-70),x2:852,y2:Y(-70),stroke:INK2,"stroke-width":1.5},gGraph);
tx(gGraph,GX1-4,Y(-70)+16,"rest","t",13,"end");
tx(gGraph,GX1-4,GBOT+15,"time","t",13,"end");
var gThr=G("thr");
el("line",{x1:100,y1:Y(-55),x2:852,y2:Y(-55),stroke:MAROON,"stroke-width":2,"stroke-dasharray":"8 6"},gThr);
tx(gThr,GX1-4,Y(-55)-6,"threshold","tm",13,"end");
var gEq=G("eq");
el("line",{x1:100,y1:Y(60),x2:852,y2:Y(60),stroke:GDEEP,"stroke-width":2,"stroke-dasharray":"3 5"},gEq);
el("line",{x1:100,y1:Y(-90),x2:852,y2:Y(-90),stroke:GDEEP,"stroke-width":2,"stroke-dasharray":"3 5"},gEq);
tx(gEq,116,Y(60)+15,"Na+ balance point, +60 mV","t",13,"start");
tx(gEq,116,Y(-90)-5,"K+ balance point, "+M+"90 mV","t",13,"start");

var gTr=G("tr");
var TR=[],TD=[],i;
for(i=0;i<2;i++)TR.push(el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":4,"stroke-linejoin":"round","stroke-linecap":"round"},gTr));
for(i=0;i<2;i++)TD.push(el("path",{d:"",fill:"none",stroke:INK2,"stroke-width":2.5,"stroke-dasharray":"7 6"},gTr));
var BL=[];for(i=0;i<6;i++)BL.push(tx(svg,0,0,"","tm",14,"middle"));
function lab(k,x,y,s,anc){BL[k].setAttribute("x",x);BL[k].setAttribute("y",y);BL[k].setAttribute("text-anchor",anc||"middle");BL[k].textContent=s;}
function pathD(f,s,e){var o=[];for(var t=s;t<e;t+=0.02)o.push(X(t).toFixed(1)+" "+Y(f(t)).toFixed(1));o.push(X(e).toFixed(1)+" "+Y(f(e)).toFixed(1));return "M"+o.join(" L");}
function trSet(p,f,s,e){p.setAttribute("d",pathD(f,s,Math.max(s,e)));}
function trace(p,f,s,from,to,dur,a,met){
  if(!a||reduce){trSet(p,f,s,to);if(met)mv(f(to));return Promise.resolve();}
  return tweenVal(from,to,dur,a,function(t){trSet(p,f,s,t);if(met)mv(f(t));});
}

/* ---- refractory brackets and stimulus arrows, between the tracing and the panel ---- */
var gBrk=G("brk");
function bracket(t1,t2,s){var g=el("g",{},gBrk);
  el("path",{d:"M"+X(t1)+" 228 L"+X(t1)+" 236 L"+X(t2)+" 236 L"+X(t2)+" 228",fill:"none",stroke:NAVY,"stroke-width":2.5},g);
  g._t=tx(g,(X(t1)+X(t2))/2,254,s,"tn",13,"middle");g._s=s;return g;}
var BRK={abs:bracket(1.45,2.9,"absolute refractory period"),rel:bracket(2.9,6.0,"relative refractory period")};
var gArr=G("arr");
function stim(t,s){var g=el("g",{},gArr);arrow(g,X(t),334,X(t),272,MAROON,5);tx(g,X(t)+12,314,s,"tm",14,"start");return g;}
var ARR={huge:stim(2.3,"a huge stimulus"),norm:stim(4.0,"the same 16 mV stimulus")};

/* ---- the panel under the tracing ---- */
var gPerm=G("perm");
el("rect",{x:100,y:262,width:752,height:78,rx:6,fill:"#fff",stroke:INK2,"stroke-width":1.5},gPerm);
el("line",{x1:100,y1:332,x2:852,y2:332,stroke:"#D9DDE3","stroke-width":1.5},gPerm);
tx(gPerm,844,280,"How many voltage-gated channels are open","t",13,"end");
var PP=[el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3.5,"stroke-linejoin":"round"},gPerm),
        el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":3.5,"stroke-linejoin":"round"},gPerm)];
var PL=[tx(gPerm,X(1.8)+12,292,"Na+","tn",14,"start"),tx(gPerm,X(2.8)+14,294,"K+","tm",14,"start")];
function permD(f,e){var o=[];for(var t=0;t<e;t+=0.02)o.push(X(t).toFixed(1)+" "+(332-f(t)*56).toFixed(1));o.push(X(e).toFixed(1)+" "+(332-f(e)*56).toFixed(1));return "M"+o.join(" L");}
function permSet(e){PP[0].setAttribute("d",e>0?permD(PNA,e):"");PP[1].setAttribute("d",e>0?permD(PK,e):"");vis(PL[0],e>=2.0);vis(PL[1],e>=3.0);}

var gLoop=G("loop");
[["The membrane depolarizes",120],["More Na+ channels open",360],["More Na+ rushes in",600]].forEach(function(b,k){
  el("rect",{x:b[1],y:268,width:200,height:36,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2},gLoop);
  tx(gLoop,b[1]+100,291,b[0],"tn",14,"middle");
  if(k<2)arrow(gLoop,b[1]+204,286,b[1]+234,286,NAVY,4);
});
el("path",{d:"M700 306 L700 326 L220 326 L220 316",fill:"none",stroke:MAROON,"stroke-width":4},gLoop);
arrow(gLoop,220,320,220,312,MAROON,4);
tx(gLoop,460,320,"and around again","tm",13,"middle");

var gConc=G("conc");
function cbox(x,h,v){var g=el("g",{},gConc);el("rect",{x:x,y:266,width:320,height:70,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2},g);
  tx(g,x+160,292,h,"t",14,"middle");tx(g,x+160,322,v,"tn",17,"middle");return g;}
var CB=[cbox(120,"Inside the cell, before the spike","Na+ 15 mM,  K+ 150 mM"),cbox(470,"Inside the cell, after one spike","Na+ about 15,  K+ about 150")];

var gSpeed=G("speed");
el("rect",{x:190,y:266,width:540,height:70,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2},gSpeed);
var SPD=[tx(gSpeed,460,294,"1,000 ms ÷ 2 ms = 500 action potentials per second, at most","tn",15,"middle"),
         tx(gSpeed,460,322,"1,000 ms ÷ 1 ms = 1,000 per second, at most","tn",15,"middle")];

/* all or none: four short tracings side by side, each with its stimulus bar */
var gMini=G("mini");
var MP=[];for(i=0;i<4;i++)MP.push(el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3.5,"stroke-linejoin":"round","stroke-linecap":"round"},gMini));
var FAST=mono([[0,-70],[1,-70],[1.25,-55],[1.6,0],[1.85,30],[2.2,0],[2.75,-70],[3.35,-80],[4.85,-74],[6,-70]]);
var MINI=[mono([[0,-70],[1,-70],[1.5,-65],[2.4,-68.5],[3.6,-70],[6,-70]]),mono([[0,-70],[1,-70],[1.5,-60],[2.4,-66],[3.6,-69.5],[6,-70]]),AP,FAST];
function miniD(k,e){var x0=112+k*182.5,o=[];for(var t=0;t<e;t+=0.03)o.push((x0+t*170/6).toFixed(1)+" "+Y(MINI[k](t)).toFixed(1));o.push((x0+e*170/6).toFixed(1)+" "+Y(MINI[k](e)).toFixed(1));return "M"+o.join(" L");}
var gStim=G("stimbar");
tx(gStim,108,280,"Size of each push","t",13,"start");
el("line",{x1:100,y1:336,x2:852,y2:336,stroke:INK2,"stroke-width":1.5},gStim);
var SB=[];[5,10,16,30].forEach(function(v,k){var cx=112+k*182.5+85,h=v*1.8,g=el("g",{},gStim);
  el("rect",{x:cx-16,y:336-h,width:32,height:h,fill:MAROON},g);tx(g,cx,336-h-6,v+" mV","tm",14,"middle");SB.push(g);});

/* coding: three stimuli, three spike trains, and the neurons recruited */
var gCode=G("code");
tx(gCode,450,34,"The same stretch of time, three stimuli","tn",17,"middle");
var CX=[200,450,700],NSP=[2,5,9],NNE=[1,2,4],CT=[];
CX.forEach(function(cx,k){var g=el("g",{},gCode);
  el("line",{x1:cx-100,y1:200,x2:cx+100,y2:200,stroke:INK2,"stroke-width":2},g);
  var tr=el("g",{},g);
  for(var j=0;j<NSP[k];j++){var x=cx-90+(j+0.5)*180/NSP[k];el("line",{x1:x,y1:200,x2:x,y2:120,stroke:NAVY,"stroke-width":4,"stroke-linecap":"round"},tr);}
  tx(tr,cx,104,NSP[k]+" action potentials","tn",15,"middle");
  var h=[30,60,90][k];el("rect",{x:cx-18,y:320-h,width:36,height:h,fill:MAROON},g);
  tx(g,cx,344,["weak","medium","strong"][k]+" stimulus","tm",15,"middle");
  var dots=el("g",{},g);
  for(j=0;j<NNE[k];j++){var dx=cx-(NNE[k]-1)*13+j*26;el("circle",{cx:dx,cy:396,r:9,fill:NAVY},dots);}
  tx(dots,cx,428,NNE[k]===1?"1 neuron firing":NNE[k]+" neurons firing","t",14,"middle");
  CT.push({tr:tr,dots:dots});
});

/* ---- the patch of trigger zone membrane ---- */
var NX=400,KX=530;
var gPatch=G("patch");
el("rect",{x:290,y:404,width:310,height:52,fill:TINT,stroke:NAVY,"stroke-width":3},gPatch);
tx(gPatch,294,392,"Outside","t",13,"start");
tx(gPatch,294,482,"Inside","t",13,"start");
function walls(c){el("rect",{x:c-30,y:398,width:20,height:64,rx:7,fill:"#fff",stroke:NAVY,"stroke-width":3},gPatch);
  el("rect",{x:c+10,y:398,width:20,height:64,rx:7,fill:"#fff",stroke:NAVY,"stroke-width":3},gPatch);}
walls(NX);walls(KX);
var actBar=el("rect",{x:NX-14,y:396,width:28,height:10,rx:4,fill:GDEEP},gPatch);
var kBar=el("rect",{x:KX-14,y:425,width:28,height:10,rx:4,fill:GDEEP},gPatch);
tx(gPatch,NX,514,"Na+ channel","t",13,"middle");
tx(gPatch,KX,514,"K+ channel","t",13,"middle");

var gIons=G("ions");
var NAH=[[NX-40,368],[NX+40,368]],NAD=[[NX-40,486],[NX+40,486]],KH=[[KX-40,486],[KX+40,486]],KD=[[KX-40,368],[KX+40,368]];
var NAI=[ionNa(gIons),ionNa(gIons)],KI=[ionK(gIons),ionK(gIons)];
function ionsHome(){NAI.forEach(function(g,k){place(g,NAH[k][0],NAH[k][1]);});KI.forEach(function(g,k){place(g,KH[k][0],KH[k][1]);});}
function naInside(){NAI.forEach(function(g,k){place(g,NAD[k][0],NAD[k][1]);});}
function kOutside(){KI.forEach(function(g,k){place(g,KD[k][0],KD[k][1]);});}
function naIn(a,n){var ps=[];for(var k=0;k<(n||2);k++)(function(k){ps.push(wait(k*260,a).then(function(){return tweenPath(NAI[k],[[NX,386],[NX,474],NAD[k]],900,a);}));})(k);return Promise.all(ps);}
function kOut(a){var ps=[];for(var k=0;k<2;k++)(function(k){ps.push(wait(k*260,a).then(function(){return tweenPath(KI[k],[[KX,474],[KX,388],KD[k]],900,a);}));})(k);return Promise.all(ps);}

/* the inactivation ball sits in front of the ions */
var ball=el("g",{},gPatch);gIons.parentNode.appendChild(ball);REG.ball=ball;
el("line",{x1:NX+22,y1:462,x2:NX+4,y2:476,stroke:MAROON,"stroke-width":4},ball);
el("circle",{cx:NX,cy:478,r:10,fill:MAROON},ball);
place(ball,0,0);
function chState(o){o=o||{};vis(actBar,!o.act);vis(kBar,!o.k);place(ball,0,o.inact?-22:0);}
function ballTo(y,a){return tweenVal(ball._y||0,y,500,a,function(v){place(ball,0,v);});}

/* ---- drug on the potassium channel, for the patient ---- */
var gTox=G("tox");
el("rect",{x:KX-12,y:417,width:24,height:26,rx:6,fill:INK2},gTox);
tx(gTox,KX,392,"drug blocks the K+ channel","tm",13,"middle");

/* ---- the trigger zone meter ---- */
var gMeter=G("meter");
el("rect",{x:70,y:400,width:200,height:74,rx:12,fill:"#fff",stroke:NAVY,"stroke-width":3},gMeter);
var MV=tx(gMeter,170,452,M+"70 mV","tn",30,"middle");
tx(gMeter,170,422,"Trigger zone","t",14,"middle");
function mv(v){var r=Math.round(v);MV.textContent=(r<0?M:(r>0?"+":""))+Math.abs(r)+" mV";}

/* ---- caption ---- */
var gCap=G("cap");
var CAP=tx(gCap,392,542,"","tn",18,"middle");
function cap(s){CAP.textContent=s||"";}

function resetAll(){
  TR.concat(TD).forEach(function(p){p.setAttribute("d","");});MP.forEach(function(p){p.setAttribute("d","");});
  BL.forEach(function(t){t.textContent="";});
  permSet(0);chState();ionsHome();mv(-70);cap("");
  vis(BRK.abs,false);vis(BRK.rel,false);BRK.abs._t.textContent=BRK.abs._s;vis(ARR.huge,false);vis(ARR.norm,false);
  vis(CB[1],false);SPD.forEach(function(t){vis(t,false);});SB.forEach(function(g){vis(g,false);});
  CT.forEach(function(c,k){vis(c.tr,k===0);vis(c.dots,false);});
}
function S(l){only(l);resetAll();}

/* the whole action potential with the channels keeping time */
function stateAt(t){
  if(t<1.45)chState();
  else if(t<2.0)chState({act:true});
  else if(t<2.9)chState({act:true,inact:true,k:true});
  else if(t<4.0)chState({inact:true,k:true});
  else if(t<5.5)chState({k:true});
  else chState();
}
function replay(dur,a,met){
  if(!a||reduce){trSet(TR[0],AP,0,8);permSet(8);if(met)mv(-70);stateAt(8);return Promise.resolve();}
  return tweenVal(0,8,dur,a,function(t){trSet(TR[0],AP,0,t);permSet(t);if(met)mv(AP(t));stateAt(t);});
}

/* ======================= steps ======================= */
var PATCH=["graph","thr","tr","patch","ions","ball","meter","cap"];
var STEPS=[
/* ---- 1. reaching threshold ---- */
{sec:"Reaching threshold",comp:"Competency 14",
 title:"Picking up at the trigger zone",
 text:["The graded potentials walkthrough ended at the trigger zone, the first part of the axon, where the neuron decides whether to fire. This walkthrough zooms in on a small patch of membrane there.","The patch has two kinds of voltage-gated channels. The sodium channel has the two gates you met in the gating walkthrough: the activation gate on the outside, closed at rest, and the inactivation gate, the ball on the inside, open at rest. The potassium channel has one gate, closed at rest. The tracing records the voltage of this patch, starting at rest, "+M+"70 mV."],
 auto:true,
 desc:"A voltage tracing runs flat at minus 70 millivolts, with a dashed threshold line at minus 55. Below it, a patch of membrane holds one sodium channel, with a gold activation gate closed across its outer mouth and a maroon ball hanging below it on the inside, and one potassium channel with a gold gate closed across its middle. Two sodium ions wait outside and two potassium ions wait inside. A meter reads minus 70 millivolts.",
 pre:function(){S(PATCH);},
 play:function(a){return trace(TR[0],FLAT,0,0,8,900,a).then(function(){cap("At rest, the voltage-gated channels are closed.");});}},

{title:"A push that falls short",
 text:["A graded potential arrives and depolarizes the trigger zone by 10 mV, to "+M+"60 mV. That change in voltage opens a few voltage-gated sodium channels, and a little sodium comes in."],
 ask:"The membrane is at "+M+"60 mV and a few sodium channels have opened. Does it keep rising on its own, or fall back?",
 ans:["It falls back. At "+M+"60 mV only a few sodium channels are open, and the sodium coming in is less than the potassium still leaking out through the leak channels. The outward current wins, so the membrane drifts back to "+M+"70 mV and the sodium channels close again.","Nothing fires. This is the subthreshold graded potential from the last walkthrough, seen from inside the trigger zone."],
 desc:"The sodium channel's activation gate opens and one sodium ion comes in. The tracing rises to minus 60 millivolts, stays below the dashed threshold line, and falls back to rest. The gate closes again.",
 pre:function(){S(PATCH);},
 play:function(a){
   return Promise.all([trace(TR[0],SUB,0,0,1.5,700,a,true),wait(150,a).then(function(){chState({act:true});return naIn(a,1);})])
   .then(function(){return trace(TR[0],SUB,0,1.5,8,1000,a,true);})
   .then(function(){chState();lab(0,X(1.5),Y(-70)+18,"peaks at "+M+"60 mV","tm");cap("Short of threshold. It falls back.");});}},

{title:"Reaching "+M+"55 mV",
 text:["This time the graded potential is bigger, 15 mV, and brings the trigger zone to "+M+"55 mV. At this voltage enough sodium channels open that the sodium coming in matches the potassium leaking out."],
 ask:"What happens once the sodium coming in is more than the potassium going out?",
 ans:["The membrane keeps depolarizing on its own. Sodium coming in makes the inside less negative, that depolarization opens more voltage-gated sodium channels, more sodium comes in, and the membrane depolarizes further. Each turn of the loop drives the next one.","The voltage where the sodium current coming in first outweighs the potassium current going out is threshold, about "+M+"55 mV here. Think of threshold as that balance between two currents rather than as a fixed number. Once the loop takes off, the stimulus no longer matters. A loop that feeds itself like this is called positive feedback."],
 name:"threshold, positive feedback",
 desc:"The tracing has risen to the dashed threshold line at minus 55. A loop of three boxes appears: the membrane depolarizes, more sodium channels open, more sodium rushes in, and an arrow runs back to the start. Both sodium ions pass in through the open channel and the tracing shoots up past 0 millivolts.",
 pre:function(){S(PATCH);trSet(TR[0],AP,0,1.45);mv(-55);chState({act:true});},
 play:function(a){show("loop");return Promise.all([naIn(a),trace(TR[0],AP,0,1.45,1.75,900,a,true)]).then(function(){cap("Past threshold, it runs away.");});}},

/* ---- 2. the phases ---- */
{sec:"The phases",comp:"Competency 13",
 title:"How high can it go?",
 text:["The loop is running. Sodium channels are opening all over the trigger zone and sodium is rushing in. The dotted lines mark the balance points you met in the resting potential walkthrough."],
 ask:"Right now the membrane is far more permeable to sodium than to anything else. What voltage is it heading toward?",
 ans:["Toward sodium's balance point, about +60 mV. That is the voltage where sodium's push inward, down its concentration gradient, is exactly balanced by the positive charge inside pushing it back out. It is the rule from the resting potential walkthrough: the membrane moves toward the balance point of the ion it is most permeable to.","This fast climb is the rising phase, or depolarization. The inside really does become positive, but it tops out near +30 mV, well short of +60. The next step shows what stops it."],
 name:"rising phase (depolarization)",
 desc:"Dotted lines mark sodium's balance point at plus 60 and potassium's at minus 90. The tracing climbs from 0 to a peak of about plus 30 millivolts. The meter reads plus 30.",
 pre:function(){S(PATCH.concat(["eq"]));trSet(TR[0],AP,0,1.75);mv(0);chState({act:true});naInside();},
 play:function(a){return trace(TR[0],AP,0,1.75,2.0,700,a,true).then(function(){lab(0,X(2.0)+12,Y(30)+2,"about +30 mV","tm");cap("It tops out near +30 mV.");});}},

{title:"Stopping at +30",
 text:["Look at the channels at the peak, about half a millisecond after threshold."],
 ask:"Two things happen to the channels near the peak. What are they?",
 ans:["First, the sodium channel's inactivation gate swings shut. It started to close when the membrane depolarized, but it is slower than the activation gate, so it closes only now. Sodium stops coming in, even though the activation gate is still open.","Second, the voltage-gated potassium channel opens. It also responds to depolarization, just more slowly. With sodium's way in shut and potassium's way out open, the voltage cannot climb any higher. The top of the spike is the peak, and the part above 0 mV is called the overshoot."],
 name:"peak (overshoot)",
 desc:"At the peak, the maroon ball swings up into the sodium channel and plugs it from the inside, and the gold gate in the potassium channel opens.",
 pre:function(){S(PATCH.concat(["eq"]));trSet(TR[0],AP,0,2.0);mv(30);chState({act:true});naInside();lab(0,X(2.0)+12,Y(30)+2,"about +30 mV","tm");},
 play:function(a){return wait(300,a).then(function(){return ballTo(-22,a);}).then(function(){return wait(250,a);}).then(function(){chState({act:true,inact:true,k:true});cap("Sodium stops. Potassium opens.");});}},

{title:"Coming back down",
 text:["The sodium channel is inactivated and the potassium channel is open."],
 ask:"The potassium channel is open. Which way does potassium move, and what does that do to the voltage?",
 ans:["Potassium flows out. Its concentration gradient pushes it out, and now the positive inside pushes it out too. Positive charge leaving makes the inside more negative again, so the voltage falls back toward rest.","This fall is the falling phase, or repolarization. Potassium leaving through voltage-gated channels is what brings the voltage back down. The sodium-potassium pump is not."],
 name:"falling phase (repolarization)",
 desc:"Two potassium ions leave through the open potassium channel, and the tracing falls from plus 30 back down to minus 70 millivolts.",
 pre:function(){S(PATCH.concat(["eq"]));trSet(TR[0],AP,0,2.0);mv(30);chState({act:true,inact:true,k:true});naInside();},
 play:function(a){return Promise.all([kOut(a),trace(TR[0],AP,0,2.0,2.9,1100,a,true)]).then(function(){cap("Potassium out, the voltage falls.");});}},

{title:"Dipping below rest",
 text:["The voltage reaches "+M+"70 mV and keeps going down."],
 ask:"Why does the voltage go below rest instead of stopping at "+M+"70 mV?",
 ans:["The voltage-gated potassium channels are slow to close. For a few milliseconds the membrane is even more permeable to potassium than it is at rest, so it moves closer to potassium's balance point, "+M+"90 mV, and bottoms out near "+M+"80 mV.","As those potassium channels close, the voltage settles back to "+M+"70 mV. Meanwhile the sodium channels reset: the activation gate closes and the inactivation gate opens, ready for the next action potential. This dip below rest is the after-hyperpolarization."],
 name:"after-hyperpolarization",
 desc:"The tracing dips below rest to about minus 80 millivolts, toward the potassium balance line at minus 90, then rises back to minus 70. The sodium channel's gold gate closes and the maroon ball drops back down, and then the potassium channel's gate closes.",
 pre:function(){S(PATCH.concat(["eq"]));trSet(TR[0],AP,0,2.9);mv(-70);chState({act:true,inact:true,k:true});naInside();kOutside();},
 play:function(a){
   return trace(TR[0],AP,0,2.9,3.5,700,a,true).then(function(){lab(0,X(3.5),GBOT-2,"about "+M+"80 mV","tm");chState({inact:true,k:true});return ballTo(0,a);})
   .then(function(){chState({k:true});return trace(TR[0],AP,0,3.5,8,1500,a,true);})
   .then(function(){chState();cap("Down toward "+M+"90, then back to rest.");});}},

{title:"Lining up the channels with the tracing",
 text:["Here are the same events on one time line. The trace labeled Na+ in the lower panel shows how many voltage-gated sodium channels are open, and the trace labeled K+ shows how many voltage-gated potassium channels are open.","The sodium channels open fast and close fast, all within about a millisecond. The potassium channels open later and stay open longer, which is why the fall is followed by the dip. Every phase of the tracing lines up with a change in the channels underneath it."],
 auto:true,
 desc:"The full action potential is drawn across the top. Underneath, on the same time line, a trace labeled sodium rises sharply and falls within about a millisecond, peaking as the tracing rises. A trace labeled potassium rises later, peaks as the tracing falls, and stays up through the dip below rest.",
 pre:function(){S(["graph","thr","tr","perm","cap"]);},
 play:function(a){return replay(2600,a,false).then(function(){cap("Sodium first. Potassium later, and longer.");});}},

{title:"How many ions actually moved?",
 text:["Every action potential lets sodium in and potassium out. Here are the concentrations inside the cell before the spike."],
 ask:"Before this neuron can fire again, does the sodium-potassium pump have to put the ions back first?",
 ans:["No. Only a tiny fraction of the ions cross during one action potential, far too few to change the concentrations by any amount you could measure in most neurons. After the spike, sodium inside is still about 15 mM and potassium inside is still about 150 mM. The gradients are still there, so the neuron can fire again right away.","The pump does matter over time. It keeps the concentrations steady by slowly moving the few ions back, over thousands of action potentials. But the pump is not what brings the voltage down after a spike. Potassium leaving through voltage-gated channels does that."],
 desc:"The full action potential is drawn at the top. Two sodium ions move in and two potassium ions move out through the patch. A box reads, inside the cell before the spike, sodium 15 millimolar, potassium 150 millimolar. A second box appears: after one spike, sodium about 15, potassium about 150.",
 pre:function(){S(["graph","thr","tr","patch","ions","ball","conc","cap"]);trSet(TR[0],AP,0,8);},
 play:function(a){chState({act:true});return naIn(a).then(function(){chState({k:true});return kOut(a);}).then(function(){chState();vis(CB[1],true);cap("The concentrations barely change.");});}},

/* ---- 3. all or none ---- */
{sec:"All or none",comp:"Competency 14",
 title:"Four pushes, four sizes",
 text:["Now stimulate the trigger zone four separate times, each time with a bigger push: graded potentials of 5, 10, 16, and 30 mV. The first two stay below threshold. The third and fourth both reach it."],
 ask:"The fourth push is almost twice the size of the third. How does the fourth action potential compare in size with the third?",
 ans:["They are the same. Both rise to about +30 mV and fall back the same way. Once threshold is reached, the size of the action potential is set by the channels and by sodium's balance point, not by the stimulus. A bigger push only gets the membrane to threshold a little sooner.","This is the all-or-none rule. Below threshold there is no action potential at all. At or above threshold there is a full-sized one every time."],
 name:"all or none",
 desc:"Four short tracings sit side by side, each above a maroon bar showing its push: 5, 10, 16 and 30 millivolts. The first two make small bumps that stay below threshold. The third and fourth each make a full action potential, and both peak at about plus 30 millivolts.",
 pre:function(){S(["graph","thr","mini","stimbar","cap"]);MP[0].setAttribute("d",miniD(0,6));MP[1].setAttribute("d",miniD(1,6));vis(SB[0],true);vis(SB[1],true);},
 play:function(a){
   function one(k){vis(SB[k],true);if(!a||reduce){MP[k].setAttribute("d",miniD(k,6));return Promise.resolve();}return tweenVal(0,6,900,a,function(t){MP[k].setAttribute("d",miniD(k,Math.max(0.03,t)));});}
   return one(2).then(function(){lab(0,112+2*182.5+57,Y(30)-8,"+30 mV","tm");return one(3);})
   .then(function(){lab(1,112+3*182.5+52,Y(30)-8,"+30 mV","tm");cap("Past threshold, always the same size.");});}},

/* ---- 4. coding ---- */
{sec:"Coding stimulus strength",comp:"Competency 15",
 title:"So how does it signal a stronger stimulus?",
 text:["If every action potential is the same size, the size cannot carry any information. Here are three stimuli on the skin, from weak to strong. The weak one makes a sensory neuron fire twice in this stretch of time."],
 ask:"The size of each spike cannot change. What could change as the stimulus gets stronger?",
 ans:["Two things. First, each neuron fires more often. A stronger stimulus makes a bigger graded potential at the trigger zone, which reaches threshold again sooner after each spike, so the spikes come closer together. Here the medium stimulus gives 5 action potentials and the strong one 9 in the same time. This is frequency coding.","Second, a stronger stimulus activates more receptors, so more neurons fire. Here the strong stimulus has four neurons firing instead of one. This is population coding. A single axon can only do the first. Notice that the spikes are the same height in every train."],
 name:"frequency coding, population coding",
 desc:"Three maroon stimulus bars, weak, medium and strong. Above the weak one is a train of 2 action potentials. The medium one gets 5 and the strong one 9, all the same height. Under each bar, dots show the neurons firing: 1, then 2, then 4.",
 pre:function(){S(["code","cap"]);},
 play:function(a){vis(CT[0].dots,true);
   return wait(400,a).then(function(){vis(CT[1].tr,true);vis(CT[1].dots,true);return wait(600,a);})
   .then(function(){vis(CT[2].tr,true);vis(CT[2].dots,true);cap("More spikes, and more neurons.");});}},

/* ---- 5. refractory periods ---- */
{sec:"Refractory periods",comp:"Competency 16",
 title:"A second stimulus, too soon",
 text:["Fire an action potential, then hit the trigger zone with a second stimulus while the first one is still coming down. Make the second stimulus huge, far bigger than the one that started the first spike."],
 ask:"Does the huge second stimulus start a second action potential?",
 ans:["No. The sodium channel's inactivation gate is closed, and it will not reopen until the membrane has repolarized. A stimulus can open activation gates, but no stimulus of any size can open an inactivation gate. With the sodium channels unable to let sodium in, the positive feedback loop cannot start.","This window, from the start of the action potential until the sodium channels begin to reset, is the absolute refractory period. No stimulus of any size can trigger a second action potential during it."],
 name:"absolute refractory period",
 desc:"A full action potential is drawn. A maroon arrow marks a huge stimulus arriving as the tracing falls. Nothing changes in the tracing. A bracket under the spike, from threshold to the end of the fall, is labeled absolute refractory period. The sodium channel is plugged by its maroon ball.",
 pre:function(){S(["graph","thr","tr","brk","arr","patch","ions","ball","cap"]);trSet(TR[0],AP,0,8);vis(ARR.huge,true);chState({act:true,inact:true,k:true});naInside();kOutside();},
 play:function(a){return wait(500,a).then(function(){vis(BRK.abs,true);lab(0,X(3.1),Y(-20),"no second spike","tm","start");cap("Nothing. The sodium channel is inactivated.");});}},

{title:"A little later",
 text:["Wait until the dip after the spike, when the voltage is below rest. Now give the same 16 mV stimulus that fired the first action potential."],
 ask:"Does the same 16 mV stimulus fire a second action potential during the dip?",
 ans:["Not this time. Some sodium channels have reset, so a second action potential is possible, but the membrane starts below rest, near "+M+"78 mV, and extra potassium channels are still open, pulling it down. The 16 mV push only gets it to about "+M+"62 mV, short of threshold.","A stronger stimulus can fire one here, shown dashed, and that second spike is often a little smaller because not all the sodium channels have reset yet. This window is the relative refractory period: a second action potential is possible, but it takes a stronger stimulus than usual."],
 name:"relative refractory period",
 desc:"The tracing is in its dip below rest when a maroon arrow marks the same 16 millivolt stimulus. The tracing rises only to about minus 62, short of threshold, and falls back. A dashed tracing then shows a stronger stimulus firing a second, slightly smaller action potential. A second bracket, over the dip, is labeled relative refractory period.",
 pre:function(){S(["graph","thr","tr","brk","arr","patch","ions","ball","cap"]);trSet(TR[0],FAIL,0,4.0);vis(BRK.abs,true);vis(ARR.norm,true);chState({k:true});naInside();kOutside();},
 play:function(a){
   return trace(TR[0],FAIL,0,4.0,8,1300,a).then(function(){lab(0,X(4.0)+12,334,"reaches only "+M+"62 mV","tm","start");return trace(TD[0],STRONG,4.0,4.0,8,1300,a);})
   .then(function(){vis(BRK.rel,true);lab(1,X(4.8)+12,Y(20)+4,"dashed: a stronger stimulus","tm","start");cap("Possible, but it takes a bigger push.");});}},

{title:"The speed limit",
 text:["The absolute refractory period lasts about 1 to 2 milliseconds. During that time the neuron cannot fire again, no matter what."],
 ask:"What is the largest number of action potentials a neuron could fire in one second? Work it out for 1 ms and for 2 ms.",
 ans:["One second is 1,000 milliseconds. With a 2 ms absolute refractory period, the most is 1,000 ÷ 2 = 500 action potentials per second. With 1 ms, it is 1,000 ÷ 1 = 1,000 per second. That is a ceiling, and most neurons fire well below it.","The refractory period does a second job too: it keeps an action potential traveling in one direction along the axon. The conduction walkthrough shows how."],
 desc:"A full action potential with a bracket under it labeled absolute refractory period, about 1 to 2 milliseconds. A box below shows the arithmetic: 1,000 milliseconds divided by 2 is 500 per second at most, and divided by 1 is 1,000 per second at most.",
 pre:function(){S(["graph","thr","tr","brk","speed","cap"]);trSet(TR[0],AP,0,8);vis(BRK.abs,true);BRK.abs._t.textContent="absolute refractory period, about 1 to 2 ms";},
 play:function(a){return wait(300,a).then(function(){vis(SPD[0],true);return wait(700,a);}).then(function(){vis(SPD[1],true);cap("A ceiling on how fast a neuron can fire.");});}},

/* ---- 6. patient ---- */
{sec:"A patient",comp:"Competency 13",
 title:"Patient: a drug that blocks potassium channels",
 text:["A woman with multiple sclerosis starts a medication called dalfampridine to help her walk. The drug blocks voltage-gated potassium channels. In multiple sclerosis, axons lose their myelin, and that exposes potassium channels that are normally covered by it.","The dashed tracing is a normal action potential for comparison."],
 ask:"With the voltage-gated potassium channels blocked, predict how the shape of the action potential changes. Think about the fall and the dip.",
 ans:["The rise and the peak barely change, because they depend on sodium. The fall is much slower, because potassium's main way out is blocked. The membrane still comes back down, more slowly, as the sodium channels inactivate and potassium leaks out through the leak channels. The action potential gets wider, and the dip below rest mostly disappears, because the extra potassium channels that caused it cannot open.","A wider action potential delivers more charge to the next stretch of axon, which helps the signal get across a stretch that has lost its myelin. The conduction walkthrough explains why that matters. Blocking these channels throughout the brain can also make neurons fire too easily, which is why the dose is kept low: too much can cause seizures."],
 desc:"A dashed normal action potential is drawn. A gray block sits in the potassium channel, labeled drug blocks the potassium channel. The solid tracing rises to the same peak, then falls much more slowly and returns to rest without dipping below it.",
 pre:function(){S(["graph","thr","tr","patch","ions","ball","meter","tox","cap"]);trSet(TD[0],AP,0,8);lab(1,X(2.55)-8,Y(-45),"normal","t","end");},
 play:function(a){chState({act:true});
   return trace(TR[0],BLOCK,0,0,2.05,1000,a,true).then(function(){chState({act:true,inact:true});return trace(TR[0],BLOCK,0,2.05,8,2000,a,true);})
   .then(function(){chState();lab(0,X(3.4)+12,Y(0)-10,"with the drug","tm","start");cap("Wider, with no dip below rest.");});}},

/* ---- 7. story check ---- */
{sec:"Tell the story back",comp:"Competencies 13 to 16",
 title:"The whole story, with the science names",
 text:["A graded potential brings the trigger zone to threshold, where sodium coming in first outweighs potassium going out. Positive feedback opens more and more sodium channels in the rising phase, and the voltage heads toward sodium's balance point. At the peak the inactivation gates close and the potassium channels open. Potassium leaving causes the falling phase, and slow-closing potassium channels cause the after-hyperpolarization.","Every action potential is the same size, all or none, so stimulus strength is coded by how often neurons fire and how many fire. The absolute refractory period, while the inactivation gates are closed, and the relative refractory period, during the dip, limit how fast a neuron can fire."],
 ask:"Without scrolling back, list the phases of the action potential in order and name the channel event behind each one.",
 ans:["Threshold: sodium current coming in first outweighs potassium current going out. Rising phase: voltage-gated sodium channels open and sodium rushes in, by positive feedback. Peak: the sodium inactivation gates close and the potassium channels open. Falling phase: potassium flows out. After-hyperpolarization: the potassium channels are slow to close, so the membrane dips toward "+M+"90 mV, then settles at rest as they close and the sodium channels reset.","If any part of that was hard to recall, go back over it before you start the conduction walkthrough, which follows this action potential down the axon."],
 desc:"The whole action potential replays. Under the tracing, the sodium and potassium channel traces rise and fall in step, and in the patch the gates open, close and reset in time with the tracing.",
 pre:function(){S(["graph","thr","tr","perm","patch","ball","meter","cap"]);},
 play:function(a){return replay(3400,a,true).then(function(){cap("Threshold, rise, peak, fall, dip, rest.");});}}
];
