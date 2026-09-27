/* ======================= build scene ======================= */
/* Graded potentials. Sep 27 2026. One figure for the whole walkthrough:
   a voltage tracing across the top, a dendrite across the middle with its
   gated channels at the left end and the cell body and trigger zone at the
   right end, four small meters under the dendrite, and the trigger zone
   meter in the standard readout spot. Parts are shown and hidden per step.
   Draw order is z-order: tube, then the parts inside it, then the soma. */
markers();
var REG={};
function G(n,p){var g=el("g",{},p||svg);REG[n]=g;return g;}
function only(l){for(var k in REG)REG[k].setAttribute("display","none");l.forEach(function(k){if(REG[k])REG[k].setAttribute("display","");});}

/* ---- the tracing: membrane voltage against time ---- */
var GX0=112,GX1=842,GTOP=24,GBOT=218;
function Y(v){return 40+(-40-v)*3.2;}           /* -40 at 40, -55 at 88, -70 at 136, -90 at 200 */
var gGraph=G("graph");
el("rect",{x:100,y:GTOP,width:752,height:GBOT-GTOP,rx:6,fill:"#fff",stroke:INK2,"stroke-width":1.5},gGraph);
[[-40,M+"40"],[-55,M+"55"],[-70,M+"70"],[-90,M+"90"]].forEach(function(t){
  tx(gGraph,92,Y(t[0])+6,t[1],"t",15,"end");
});
tx(gGraph,60,GTOP-6+14,"mV","t",15,"middle");
tx(gGraph,476,GBOT+20,"time","t",15,"middle");
el("line",{x1:100,y1:Y(-70),x2:852,y2:Y(-70),stroke:INK2,"stroke-width":1.5},gGraph);
tx(gGraph,GX1-4,Y(-70)-8,"rest","t",14,"end");
var gThr=G("thr");
el("line",{x1:100,y1:Y(-55),x2:852,y2:Y(-55),stroke:MAROON,"stroke-width":2,"stroke-dasharray":"8 6"},gThr);
tx(gThr,GX1-4,Y(-55)-8,"threshold","tm",15,"end");

/* traces: four solid, two dashed, each redrawn per step */
var gTr=G("tr");
var TR=[],TD=[];
for(var i=0;i<4;i++){TR.push(el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":4,"stroke-linejoin":"round","stroke-linecap":"round"},gTr));}
for(i=0;i<2;i++){TD.push(el("path",{d:"",fill:"none",stroke:INK2,"stroke-width":2.5,"stroke-dasharray":"7 6"},gTr));}
var BL=[];for(i=0;i<5;i++){BL.push(tx(gTr,0,0,"","tm",15,"middle"));}
/* sum of alpha waves starting at each event's x; if spike is set and the
   sum reaches -55 the tracing becomes an action potential that leaves the
   top of this scale (the peak is about +30 mV) and settles back to rest */
function curve(evts,spike){
  var pts=[],fired=null;
  for(var x=GX0;x<=GX1;x+=2){
    var v=-70;
    evts.forEach(function(e){var dt=x-e.x;if(dt>0){var r=dt/e.tau;v+=e.amp*r*Math.exp(1-r);}});
    if(spike&&v>=-55){fired=x;pts.push([x,Y(-55)]);break;}
    pts.push([x,Y(v)]);
  }
  if(fired!==null){
    pts.push([fired+10,GTOP+2]);
    pts.push([fired+30,Y(-76)]);
    pts.push([fired+70,Y(-72)]);
    pts.push([fired+110,Y(-70)]);
    pts.push([GX1,Y(-70)]);
  }
  return {d:"M"+pts.map(function(p){return p[0].toFixed(1)+" "+p[1].toFixed(1);}).join(" L"),x:fired};
}
function trHide(){TR.concat(TD).forEach(function(p){p.setAttribute("d","");});BL.forEach(function(t){t.textContent="";});}
/* reveal a solid trace left to right */
function trDraw(p,d,dur,a){
  p.setAttribute("d",d);var L=p.getTotalLength();
  if(!a||reduce){p.removeAttribute("stroke-dasharray");p.removeAttribute("stroke-dashoffset");return Promise.resolve();}
  p.setAttribute("stroke-dasharray",L+" "+L);p.setAttribute("stroke-dashoffset",L);
  return tweenVal(L,0,dur,a,function(v){p.setAttribute("stroke-dashoffset",v);}).then(function(){p.removeAttribute("stroke-dasharray");p.removeAttribute("stroke-dashoffset");});
}
function trNow(p,d){p.setAttribute("d",d);p.removeAttribute("stroke-dasharray");p.removeAttribute("stroke-dashoffset");}
function lab(i,x,y,s){BL[i].setAttribute("x",x);BL[i].setAttribute("y",y);BL[i].textContent=s;}

/* ---- the dendrite ---- */
var TY=300,TH=60;
var gDend=G("dend");
var tube=el("rect",{x:70,y:TY,width:700,height:TH,rx:30,fill:TINT,stroke:NAVY,"stroke-width":4},gDend);
var tubeLab=tx(gDend,766,TY-34,"toward the cell body","t",15,"end");
function tubeWide(on){
  if(on){tube.setAttribute("y",TY-18);tube.setAttribute("height",TH+36);tube.setAttribute("rx",48);}
  else{tube.setAttribute("y",TY);tube.setAttribute("height",TH);tube.setAttribute("rx",30);}
}

/* the charge spreading inside, drawn as a tapering band */
var gTaper=G("taper");
var taper=el("polygon",{points:"",fill:MAROON,opacity:.32},gTaper);
function taperSet(k){ /* k from 0 (nothing) to 1 (full length); wide spreads farther */
  var x0=150,len=600*k,h0=36,h1=4;
  if(taperSet.wide){h1=14;}
  var cy=TY+TH/2,x1=x0+len,hk=h0+(h1-h0)*k;
  taper.setAttribute("points",[x0+","+(cy-h0/2),x1+","+(cy-hk/2),x1+","+(cy+hk/2),x0+","+(cy+h0/2)].join(" "));
}
taperSet.wide=false;
var gRes=G("res");
tx(gRes,470,TY-58,"cytoplasmic resistance slows the flow","tm",15,"middle");

/* leak: positive charge leaving through open leak channels */
var gLeak=G("leak");
var LEAKX=[235,405,575],LK=[];
LEAKX.forEach(function(x){
  el("rect",{x:x-7,y:TY+TH-3,width:14,height:8,fill:"#fff"},gLeak);
  arrow(gLeak,x,TY+TH+8,x,TY+TH+50,MAROON,4);
  var p=el("g",{},gLeak);el("circle",{r:8,fill:MAROON},p);var t=el("text",{"class":"iw","font-size":13},p);t.textContent="+";
  place(p,x,TY+TH-14);LK.push(p);
});
tx(gLeak,392,468,"current leak: charge escapes through leak channels","tm",15,"middle");
function leakHome(){LK.forEach(function(p,i){place(p,LEAKX[i],TY+TH-14);});}

/* the gated channels at the stimulus end */
var gGate=G("gate");
var GATEX=[120,172],GBAR=[];
GATEX.forEach(function(x){
  el("rect",{x:x-20,y:TY-22,width:12,height:44,rx:5,fill:"#fff",stroke:NAVY,"stroke-width":3},gGate);
  el("rect",{x:x+8,y:TY-22,width:12,height:44,rx:5,fill:"#fff",stroke:NAVY,"stroke-width":3},gGate);
  GBAR.push(el("rect",{x:x-10,y:TY-20,width:20,height:8,rx:3,fill:GDEEP},gGate));
});
var gateLab=tx(gGate,200,TY-34,"Chemically gated channels","t",15,"start");
function gatesOpen(on){GBAR.forEach(function(b){b.setAttribute("display",on?"none":"");});}

/* ions that cross at the gated channels */
var gIon=G("ion");
var NA=[ionNa(gIon),ionNa(gIon)],KI=[ionK(gIon),ionK(gIon)];
function ionsHome(){
  NA.forEach(function(g,i){place(g,GATEX[i],TY-58);g.setAttribute("display","");});
  KI.forEach(function(g,i){place(g,GATEX[i],TY+TH/2);g.setAttribute("display","none");});
}
function naIn(a){
  return Promise.all(NA.map(function(g,i){return tweenPath(g,[[GATEX[i],TY-10],[GATEX[i],TY+TH/2]],900,a);}));
}
function kOut(a){
  KI.forEach(function(g){g.setAttribute("display","");});
  NA.forEach(function(g){g.setAttribute("display","none");});
  return Promise.all(KI.map(function(g,i){return tweenPath(g,[[GATEX[i],TY-10],[GATEX[i],TY-58]],900,a);}));
}

/* positive charge spreading both ways from where it entered */
var gCh=G("charge");
var CHX=[[96,11],[146,13],[260,11],[420,8],[580,6],[700,4]],CHG=[];
CHX.forEach(function(){var p=el("g",{},gCh);var c=el("circle",{r:13,fill:MAROON},p);var t=el("text",{"class":"iw","font-size":14},p);t.textContent="+";p._c=c;p._t=t;CHG.push(p);});
function chHome(){CHG.forEach(function(p){place(p,146,TY+TH/2);p._c.setAttribute("r",13);p._t.setAttribute("font-size",14);p._t.textContent="+";});}
function chSpread(a){
  return Promise.all(CHG.map(function(p,i){
    var r=CHX[i][1];
    return tweenPath(p,[[CHX[i][0],TY+TH/2]],1200,a).then(function(){p._c.setAttribute("r",r);p._t.setAttribute("font-size",Math.max(8,r+1));if(r<6)p._t.textContent="";else p._t.textContent="+";});
  }));
}
function chDone(){CHG.forEach(function(p,i){var r=CHX[i][1];place(p,CHX[i][0],TY+TH/2);p._c.setAttribute("r",r);p._t.setAttribute("font-size",Math.max(8,r+1));p._t.textContent=r<6?"":"+";});}

/* four meters along the dendrite: the size of the depolarization there */
var gPts=G("pts");
var PX=[150,320,490,660],PV=[];
PX.forEach(function(x,i){
  el("line",{x1:x,y1:TY+TH,x2:x,y2:TY+TH+18,stroke:INK2,"stroke-width":2},gPts);
  el("rect",{x:x-58,y:TY+TH+18,width:116,height:52,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gPts);
  tx(gPts,x,TY+TH+38,"point "+(i+1),"t",13,"middle");
  PV.push(tx(gPts,x,TY+TH+62,"","tn",19,"middle"));
});
function pts(vals){PV.forEach(function(t,i){t.textContent=vals&&vals[i]!=null?vals[i]:"";});}

/* the cell body and trigger zone at the far end, drawn after the tube */
var gTz=G("tz");
el("line",{x1:820,y1:TY+TH/2,x2:896,y2:TY+TH/2,stroke:NAVY,"stroke-width":9,"stroke-linecap":"round"},gTz);
el("circle",{cx:782,cy:TY+TH/2,r:44,fill:"#fff",stroke:NAVY,"stroke-width":5},gTz);
el("polygon",{points:"818,"+(TY+6)+" 856,"+(TY+TH/2-8)+" 856,"+(TY+TH/2+8)+" 818,"+(TY+TH-6),fill:GDEEP},gTz);
tx(gTz,782,TY-54,"cell body","t",15,"middle");
tx(gTz,846,TY+TH+42,"trigger zone","tm",15,"middle");

/* toxin label for the patient step */
var gTox=G("tox");
tx(gTox,540,TY-40,"voltage-gated Na+ channels plugged","tm",15,"middle");

/* ---- the trigger zone meter ---- */
var gMeter=G("meter");
el("rect",{x:70,y:400,width:200,height:74,rx:12,fill:"#fff",stroke:NAVY,"stroke-width":3},gMeter);
var MV=tx(gMeter,170,452,M+"70 mV","tn",30,"middle");
var MVL=tx(gMeter,170,422,"Trigger zone","t",14,"middle");
function mv(v){MV.textContent=(v<0?M:"")+Math.abs(Math.round(v))+" mV";}

/* ---- caption ---- */
var gCap=G("cap");
var CAP=tx(gCap,392,528,"","tn",18,"middle");
function cap(s){CAP.textContent=s||"";}

function resetAll(){
  trHide();gatesOpen(false);ionsHome();chHome();leakHome();pts(null);
  taperSet.wide=false;tubeWide(false);taperSet(0);mv(-70);cap("");
  gateLab.textContent="Chemically gated channels";tubeLab.setAttribute("display","");
}
function S(l){only(l);resetAll();}

/* ---- shapes for the tracings, in pixels along the time axis ---- */
var T1={x:170,tau:20},T2={x:410,tau:20},T3={x:640,tau:20};
function ev(t,amp){return {x:t.x,tau:t.tau,amp:amp};}
var C_ONE=curve([ev(T2,6)]);
var C_W=curve([ev(T1,3)]),C_MD=curve([ev(T2,7)]),C_S=curve([ev(T3,12)]);
var C_H=curve([ev(T2,-8)]);
var TZ={x:300,tau:24};
var C_TZ1=curve([ev(TZ,8)]);
var C_TZ2=curve([ev(TZ,16)],true);
var C_TZB=curve([ev(TZ,11)]);
var C_TZE=curve([ev(TZ,16)]),C_TZI=curve([ev(TZ,-5)]);
var C_TTXW=curve([ev(T1,5)]),C_TTXS=curve([ev({x:470,tau:24},20)]);
function peakX(t){return t.x+t.tau;}

/* ======================= steps ======================= */
var DEN=["graph","tr","dend","gate","ion","cap"];
var STEPS=[
/* ---- 1. a small signal at the input ---- */
{sec:"A small signal at the input",comp:"Competency 12",
 title:"Where this picks up",
 text:["Here is a dendrite on a neuron at rest, sitting at "+M+"70 mV. At its left end are chemically gated channels, the kind you met in the gating walkthrough, closed and waiting for a chemical from another cell.","The line across the top is a voltage tracing. It records the voltage at the spot where the channels are, moment by moment, the same kind of tracing you read in the resting potential walkthrough."],
 auto:true,
 desc:"A voltage tracing runs flat at minus 70 millivolts across the top. Below it, a dendrite is drawn as a long tube, with two gated channels at its left end, each blocked by a gold gate, and two sodium ions waiting outside.",
 pre:function(){S(DEN);},
 play:function(a){return trDraw(TR[0],curve([]).d,900,a).then(function(){cap("At rest, gates closed.");});},
 post:function(){S(DEN);trNow(TR[0],curve([]).d);cap("At rest, gates closed.");}},

{title:"A chemical opens a few doors",
 text:["A chemical from a neighboring cell binds, and a few of these channels open. They let sodium through."],
 ask:"Sodium flows in through the open channels. Does the tracing move up or down, and why?",
 ans:["Up. Positive charge comes in, so the inside becomes less negative. The membrane moves toward sodium's balance point, about +60 mV, because sodium is the ion whose permeability just went up. That is the rule from the resting potential walkthrough.","It only moves a few millivolts, then the channels close and the tracing drifts back to rest. A small, local change like this is a graded potential. This one makes the inside less negative, so it is a depolarizing graded potential."],
 name:"depolarizing graded potential",
 desc:"The gold gates open, two sodium ions pass into the dendrite, and the tracing rises a few millivolts above minus 70 and then falls back to rest.",
 pre:function(){S(DEN);},
 play:function(a){gatesOpen(true);return naIn(a).then(function(){return trDraw(TR[0],C_ONE.d,1100,a);}).then(function(){cap("Sodium in, the tracing rises.");});},
 post:function(){S(DEN);gatesOpen(true);NA.forEach(function(g,i){place(g,GATEX[i],TY+TH/2);});trNow(TR[0],C_ONE.d);cap("Sodium in, the tracing rises.");}},

{title:"Push harder",
 text:["Now the same dendrite gets three stimuli, one after another: a weak one, a medium one, and a strong one. A stronger stimulus opens more channels, or holds them open longer."],
 ask:"What happens to the size of the change in voltage as the stimulus gets stronger?",
 ans:["It gets bigger. More open channels let more sodium in, so the weak stimulus depolarizes the membrane by about 3 mV, the medium one by about 7 mV, and the strong one by about 12 mV.","That is what graded means. There is no fixed size and no threshold to reach first. Any stimulus that opens channels makes one, and its size matches the stimulus. Each one lasts from a few milliseconds to tens of milliseconds, then the channels close and the membrane returns to rest."],
 name:"graded potential",
 desc:"Three bumps appear on the tracing in turn, labeled weak, 3 millivolts, medium, 7 millivolts, and strong, 12 millivolts. Each returns to minus 70 before the next.",
 pre:function(){S(DEN);gatesOpen(true);NA.forEach(function(g){g.setAttribute("display","none");});},
 play:function(a){
   return trDraw(TR[0],C_W.d,700,a).then(function(){lab(0,peakX(T1),Y(-67)-14,"weak, 3 mV");return trDraw(TR[1],C_MD.d,700,a);})
   .then(function(){lab(1,peakX(T2),Y(-63)-14,"medium, 7 mV");return trDraw(TR[2],C_S.d,700,a);})
   .then(function(){lab(2,peakX(T3),Y(-58)-14,"strong, 12 mV");cap("Bigger stimulus, bigger change.");});},
 post:function(){S(DEN);gatesOpen(true);NA.forEach(function(g){g.setAttribute("display","none");});trNow(TR[0],C_W.d);trNow(TR[1],C_MD.d);trNow(TR[2],C_S.d);
   lab(0,peakX(T1),Y(-67)-14,"weak, 3 mV");lab(1,peakX(T2),Y(-63)-14,"medium, 7 mV");lab(2,peakX(T3),Y(-58)-14,"strong, 12 mV");cap("Bigger stimulus, bigger change.");}},

{title:"A door that goes the other way",
 text:["Some chemicals open a different kind of channel, one that lets potassium out of the cell instead of letting sodium in."],
 ask:"Potassium leaves through the open channels. Which way does the tracing move this time?",
 ans:["Down. Positive charge leaves, so the inside becomes more negative than rest. The membrane moves toward potassium's balance point, about "+M+"90 mV. In this example it drops about 8 mV below rest, then returns.","This is a hyperpolarizing graded potential. It moves the membrane away from firing instead of toward it, which is how one cell can quiet another."],
 name:"hyperpolarizing graded potential",
 desc:"The channels are relabeled as gated potassium channels. Two potassium ions leave the dendrite through them, and the tracing dips about 8 millivolts below minus 70, then returns to rest.",
 pre:function(){S(DEN);gateLab.textContent="Gated potassium channels";},
 play:function(a){gatesOpen(true);return kOut(a).then(function(){return trDraw(TR[0],C_H.d,1100,a);}).then(function(){lab(0,peakX(T2),Y(-78)+24,"8 mV below rest");cap("Potassium out, the tracing dips.");});},
 post:function(){S(DEN);gateLab.textContent="Gated potassium channels";gatesOpen(true);NA.forEach(function(g){g.setAttribute("display","none");});KI.forEach(function(g,i){g.setAttribute("display","");place(g,GATEX[i],TY-58);});
   trNow(TR[0],C_H.d);lab(0,peakX(T2),Y(-78)+24,"8 mV below rest");cap("Potassium out, the tracing dips.");}},

/* ---- 2. why it fades as it spreads ---- */
{sec:"Why it fades as it spreads",comp:"Competency 12",
 title:"Charge spreads both ways",
 text:["Go back to sodium coming in at the left end. Once it is inside, that positive charge does not stay put."],
 ask:"Where does the positive charge go after it enters the dendrite?",
 ans:["It spreads along the inside of the dendrite in both directions, away from the spot where it came in. Most of this dendrite lies to the right, so most of the charge heads toward the cell body.","This movement of charge through the cytoplasm is called local current flow. It is how a graded potential reaches places the channels never touched."],
 name:"local current flow",
 desc:"Plus signs start at the open channels and spread along the inside of the dendrite, one to the left and several to the right. The farther they travel, the smaller they get.",
 pre:function(){S(["dend","gate","charge","cap"]);gatesOpen(true);},
 play:function(a){return chSpread(a).then(function(){cap("Charge spreads out along the inside.");});},
 post:function(){S(["dend","gate","charge","cap"]);gatesOpen(true);chDone();cap("Charge spreads out along the inside.");}},

{title:"Measure along the way",
 text:["Put four meters along the dendrite. Point 1 is right next to the open channels, and point 4 is farthest away."],
 ask:"Will all four meters show the same change in voltage? If not, which will show the most?",
 ans:["No. Point 1 shows the biggest change, about 20 mV. Point 2 shows about 12 mV, point 3 about 7 mV, and point 4 only about 4 mV.","The same graded potential is smaller at every point farther from where it started. It fades with distance. The next two steps show why."],
 desc:"Four meters sit under the dendrite. They read 20 millivolts at point 1 next to the channels, 12 at point 2, 7 at point 3, and 4 at point 4, farthest away. A maroon band inside the dendrite narrows from left to right.",
 pre:function(){S(["dend","gate","taper","pts","cap"]);gatesOpen(true);},
 play:function(a){var v=["20 mV","12 mV","7 mV","4 mV"],k=0;
   return tweenVal(0,1,1200,a,function(t){taperSet(t);}).then(function(){
     function nxt(){if(k>=4)return Promise.resolve();var s=v.slice(0,k+1);pts(s);k++;return wait(300,a).then(nxt);}
     return nxt();}).then(function(){pts(["20 mV","12 mV","7 mV","4 mV"]);cap("Largest near the channels.");});},
 post:function(){S(["dend","gate","taper","pts","cap"]);gatesOpen(true);taperSet(1);pts(["20 mV","12 mV","7 mV","4 mV"]);cap("Largest near the channels.");}},

{title:"A leaky hose",
 text:["Think of water running down a garden hose that has small holes along its length. The membrane of a dendrite is like that. It has open leak channels all along it, the same leak channels that set the resting potential."],
 ask:"What happens to some of the positive charge as it travels past those open leak channels?",
 ans:["Some of it leaves. Positive charge escapes through the leak channels all along the way, so less and less of it is left to travel on.","This loss of charge across the membrane is called current leak. It is one of the two reasons a graded potential fades."],
 name:"current leak",
 desc:"Small plus signs slip out through three gaps in the lower wall of the dendrite, each marked with a maroon arrow pointing out of the cell.",
 pre:function(){S(["dend","gate","taper","leak","cap"]);gatesOpen(true);taperSet(1);},
 play:function(a){return Promise.all(LK.map(function(p,i){return wait(i*200,a).then(function(){return tweenPath(p,[[LEAKX[i],TY+TH+22]],900,a);});})).then(function(){cap("Charge leaks out along the way.");});},
 post:function(){S(["dend","gate","taper","leak","cap"]);gatesOpen(true);taperSet(1);LK.forEach(function(p,i){place(p,LEAKX[i],TY+TH+22);});cap("Charge leaks out along the way.");}},

{title:"The cytoplasm pushes back",
 text:["The second reason is inside the dendrite. The cytoplasm is crowded with proteins and other molecules, and it resists the flow of charge moving through it, the way a thin wire resists electric current more than a thick one.","With charge leaking out through the membrane and slowed by the cytoplasm, the change in voltage is smaller at every point farther along."],
 name:"cytoplasmic resistance",
 auto:true,
 desc:"A label above the dendrite reads cytoplasmic resistance slows the flow. The maroon band inside narrows to almost nothing by the far end, and the leak arrows stay in place underneath.",
 pre:function(){S(["dend","gate","taper","leak","res","cap"]);gatesOpen(true);LK.forEach(function(p,i){place(p,LEAKX[i],TY+TH+22);});},
 play:function(a){return tweenVal(0,1,1200,a,function(t){taperSet(t);}).then(function(){cap("Two losses: leak and resistance.");});},
 post:function(){S(["dend","gate","taper","leak","res","cap"]);gatesOpen(true);LK.forEach(function(p,i){place(p,LEAKX[i],TY+TH+22);});taperSet(1);cap("Two losses: leak and resistance.");}},

{title:"A wider dendrite",
 text:["Now picture the same dendrite, twice as wide."],
 ask:"Will a graded potential travel farther or a shorter distance before it fades in the wider dendrite? Which of the two losses changes?",
 ans:["Farther. A wider tube gives charge more room to move, so the cytoplasm resists the flow less, and the graded potential spreads farther before it fades.","Current leak does not change, because leak depends on the open channels in the membrane, not on how wide the tube is. Only the cytoplasmic resistance goes down."],
 desc:"The dendrite widens. The maroon band inside stays thicker at the far end than it did in the narrow dendrite, showing that the charge spreads farther.",
 pre:function(){S(["dend","gate","taper","res","cap"]);gatesOpen(true);taperSet(1);},
 play:function(a){tubeWide(true);taperSet.wide=true;return tweenVal(0,1,1200,a,function(t){taperSet(t);}).then(function(){cap("Wider tube, it spreads farther.");});},
 post:function(){S(["dend","gate","taper","res","cap"]);gatesOpen(true);tubeWide(true);taperSet.wide=true;taperSet(1);cap("Wider tube, it spreads farther.");}},

/* ---- 3. what reaches the trigger zone ---- */
{sec:"What reaches the trigger zone",comp:"Competencies 12 and 14",
 title:"The decision point",
 text:["At the far end of the dendrite is the cell body, and just past it is the trigger zone, the decision point you met in the neurons and glia walkthrough. The trigger zone fires an action potential only if the membrane there reaches threshold, about "+M+"55 mV.","From rest at "+M+"70 mV, that means the trigger zone has to depolarize by about 15 mV. What matters is how big the graded potential still is when it gets there, not how big it was where it started."],
 auto:true,
 desc:"The dendrite now ends at a round cell body with a gold wedge beside it labeled trigger zone. The tracing now records the trigger zone, with a dashed threshold line at minus 55. A meter at lower left reads minus 70 millivolts.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){return trDraw(TR[0],curve([]).d,800,a).then(function(){cap("Threshold is about "+M+"55 mV.");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TR[0],curve([]).d);cap("Threshold is about "+M+"55 mV.");}},

{title:"One arrives",
 text:["A chemical opens channels far out on the dendrite and makes a 20 mV graded potential there. By the time it reaches the trigger zone, only 8 mV of it is left."],
 ask:"Rest is "+M+"70 mV and threshold is about "+M+"55 mV. Does the trigger zone fire?",
 ans:["No. "+M+"70 + 8 = "+M+"62 mV, which is still 7 mV short of threshold. The graded potential fades and the membrane returns to rest. No action potential is sent.","A graded potential that is too small to bring the trigger zone to threshold is called subthreshold."],
 name:"subthreshold",
 desc:"The trigger zone tracing rises 8 millivolts to minus 62, stays below the dashed threshold line, and falls back to rest. The meter reads minus 62 millivolts at the peak.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){return Promise.all([trDraw(TR[0],C_TZ1.d,1100,a),tweenVal(-70,-62,700,a,function(v){mv(v);})]).then(function(){lab(0,480,118,"8 mV, reaches "+M+"62");cap("Below threshold. No action potential.");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TR[0],C_TZ1.d);mv(-62);lab(0,480,118,"8 mV, reaches "+M+"62");cap("Below threshold. No action potential.");}},

{title:"Two arrive together",
 text:["Now two synapses on the dendrite are active at the same moment, and each one delivers 8 mV to the trigger zone."],
 ask:"Does the trigger zone fire now? Show the arithmetic.",
 ans:["Yes. Graded potentials that overlap in time add together, so the trigger zone gets 8 + 8 = 16 mV. "+M+"70 + 16 = "+M+"54 mV, which is past threshold, so the trigger zone fires an action potential.","Adding graded potentials together is called summation, and a total big enough to reach threshold is suprathreshold. Real graded potentials that overlap add up to a little less than their plain sum, but the reasoning is the same. The synaptic integration walkthrough builds summation in detail."],
 name:"summation, suprathreshold",
 desc:"A dashed line shows one 8 millivolt graded potential alone. The solid tracing shows the two added together. It crosses the dashed threshold line and shoots up off the top of the scale as an action potential, to about plus 30 millivolts, then falls back to rest.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){trNow(TD[0],C_TZ1.d);lab(1,200,122,"dashed: each one alone");
   return Promise.all([trDraw(TR[0],C_TZ2.d,1300,a),tweenVal(-70,-54,800,a,function(v){mv(v);})]).then(function(){lab(0,C_TZ2.x+110,GTOP+22,"to about +30 mV");cap("Together they reach threshold.");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TD[0],C_TZ1.d);trNow(TR[0],C_TZ2.d);mv(-54);
   lab(1,200,122,"dashed: each one alone");lab(0,C_TZ2.x+110,GTOP+22,"to about +30 mV");cap("Together they reach threshold.");}},

{title:"Add a brake",
 text:["Keep the same two synapses, each still delivering 8 mV. At the same moment, a third synapse opens potassium channels and delivers a hyperpolarizing graded potential of 5 mV to the trigger zone."],
 ask:"Does the trigger zone still fire?",
 ans:["No. 8 + 8 "+M+" 5 = 11 mV, and "+M+"70 + 11 = "+M+"59 mV. That is below threshold again, so no action potential is sent.","The trigger zone adds up everything that reaches it, the pushes toward firing and the pushes away from it, and the only question is whether the total reaches threshold. Next, the action potential walkthrough shows what happens once it does."],
 desc:"Two dashed lines show the separate inputs, one rising 16 millivolts and one dipping 5 millivolts. The solid tracing, their total, rises only to minus 59, below the threshold line, and returns to rest.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){trNow(TD[0],C_TZE.d);trNow(TD[1],C_TZI.d);lab(1,peakX(TZ)+80,Y(-54)-6,"the two together");lab(2,peakX(TZ)+60,Y(-75)+22,"the brake, 5 mV");
   return Promise.all([trDraw(TR[0],C_TZB.d,1100,a),tweenVal(-70,-59,700,a,function(v){mv(v);})]).then(function(){lab(0,220,122,"total, "+M+"59 mV");cap("Below threshold again.");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TD[0],C_TZE.d);trNow(TD[1],C_TZI.d);trNow(TR[0],C_TZB.d);mv(-59);
   lab(1,peakX(TZ)+80,Y(-54)-6,"the two together");lab(2,peakX(TZ)+60,Y(-75)+22,"the brake, 5 mV");lab(0,220,122,"total, "+M+"59 mV");cap("Below threshold again.");}},

/* ---- 4. patient ---- */
{sec:"A patient",comp:"Competencies 12 and 14",
 title:"Patient: the pufferfish meal",
 text:["A man eats pufferfish that was not prepared correctly. Within an hour his lips and tongue are numb, then his arms and legs grow weak. The toxin in the fish, tetrodotoxin, plugs voltage-gated sodium channels from the outside. It does not touch chemically gated or mechanically gated channels.","Recordings from one of his neurons: rest is still "+M+"70 mV. A weak stimulus still makes a small depolarization, about 5 mV, that fades. A strong stimulus makes about 20 mV, which goes past threshold, and it fades too. No action potential appears."],
 ask:"Why do his graded potentials still happen, and what signal is missing?",
 ans:["His graded potentials still happen because they are made by chemically and mechanically gated channels, and the toxin does not block those. What is missing is the action potential. Even a depolarization that goes past threshold cannot trigger one, because the channels that make the action potential are the voltage-gated sodium channels the toxin has plugged.","So his nerves can still take in signals but cannot send them down an axon. The action potential walkthrough builds the action potential from those channels and finishes this case, including why the toxin can stop his breathing."],
 desc:"The tracing shows a small 5 millivolt bump that fades, then a larger 20 millivolt bump that rises above the dashed threshold line to about minus 50 and fades without an action potential. A label reads voltage-gated sodium channels plugged.",
 pre:function(){S(["graph","thr","tr","dend","tz","tox","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){return trDraw(TR[0],C_TTXW.d,700,a).then(function(){lab(0,peakX(T1),Y(-65)-14,"weak, 5 mV");return trDraw(TR[1],C_TTXS.d,1200,a);}).then(function(){lab(1,494+120,Y(-50)-2,"strong, 20 mV, no spike");cap("Graded potentials, but no spike.");});},
 post:function(){S(["graph","thr","tr","dend","tz","tox","cap"]);tubeLab.setAttribute("display","none");trNow(TR[0],C_TTXW.d);trNow(TR[1],C_TTXS.d);lab(0,peakX(T1),Y(-65)-14,"weak, 5 mV");lab(1,494+120,Y(-50)-2,"strong, 20 mV, no spike");cap("Graded potentials, but no spike.");}},

/* ---- 5. story check ---- */
{sec:"Tell the story back",comp:"Competencies 12 and 14",
 title:"The whole story, with the science names",
 text:["A stimulus opens chemically or mechanically gated channels. Sodium coming in makes a depolarizing graded potential and potassium going out makes a hyperpolarizing one. The size matches the stimulus, with no threshold and no fixed size.","The charge spreads by local current flow and fades with distance, because of current leak across the membrane and cytoplasmic resistance inside. A wider process spreads it farther. At the trigger zone, graded potentials that overlap add together by summation. A subthreshold total fades away. A suprathreshold total fires an action potential."],
 ask:"Without scrolling back, explain why a graded potential that is 20 mV at the tip of a dendrite can fail to fire the neuron, and name two ways it could still reach threshold.",
 ans:["It fades on the way to the trigger zone, because charge leaks out through leak channels and the cytoplasm resists its flow, so much less than 20 mV may be left when it arrives. It could still reach threshold if other graded potentials arrive at the same time and add to it, or if it starts closer to the trigger zone or travels a wider process, so less of it is lost.","If any part of that was hard to recall, go back over it before you start the action potential walkthrough, which picks up right at the trigger zone."],
 desc:"The dendrite, the cell body and trigger zone, and the tracing are all shown. The tracing replays two graded potentials adding up to threshold and firing.",
 pre:function(){S(["graph","thr","tr","dend","gate","taper","tz","meter","cap"]);tubeLab.setAttribute("display","none");gatesOpen(true);},
 play:function(a){return tweenVal(0,1,900,a,function(t){taperSet(t);}).then(function(){return Promise.all([trDraw(TR[0],C_TZ2.d,1200,a),tweenVal(-70,-54,800,a,function(v){mv(v);})]);}).then(function(){cap("Add up, reach threshold, fire.");});},
 post:function(){S(["graph","thr","tr","dend","gate","taper","tz","meter","cap"]);tubeLab.setAttribute("display","none");gatesOpen(true);taperSet(1);trNow(TR[0],C_TZ2.d);mv(-54);cap("Add up, reach threshold, fire.");}}
];
