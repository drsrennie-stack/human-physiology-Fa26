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
tx(gTox,540,TY-40,"voltage-gated Na+ channels blocked","tm",15,"middle");

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
{sec:"Graded potentials on a dendrite",comp:"Competency 12",
 title:"A dendrite at rest",
 text:["This is a dendrite of a neuron at rest, with a membrane potential of "+M+"70 mV. At its left end are chemically gated channels, also called ligand-gated channels, which you saw in the channel gating walkthrough. They stay closed until a neurotransmitter released by another neuron binds to them.","The line across the top is a voltage tracing. It records the membrane potential at the site of these channels over time, the same kind of tracing you read in the resting potential walkthrough."],
 auto:true,
 desc:"A voltage tracing runs flat at minus 70 millivolts across the top. Below it, a dendrite is drawn as a long tube, with two gated channels at its left end, each closed by a gold gate, and two sodium ions outside the cell.",
 pre:function(){S(DEN);},
 play:function(a){return trDraw(TR[0],curve([]).d,900,a).then(function(){cap("At rest, channels closed");});},
 post:function(){S(DEN);trNow(TR[0],curve([]).d);cap("At rest, channels closed");}},

{title:"Sodium enters: depolarization",
 text:["A neurotransmitter binds to these channels, and a few of them open. The open channels are permeable to sodium, so sodium ions move into the dendrite."],
 ask:"Sodium flows in through the open channels. Does the tracing move up or down, and why?",
 ans:["Up. Positive charge enters the cell, so the inside becomes less negative. The membrane potential moves toward the equilibrium potential for sodium, about +60 mV, because sodium is the ion whose permeability increased. This is the same rule you used in the resting potential walkthrough.","Only a few channels opened, so the voltage changes by only a few millivolts, and when the channels close the membrane returns to rest. A small change in membrane potential confined to one region of the membrane is called a graded potential. This one makes the inside less negative, so it is a depolarizing graded potential. When a neurotransmitter produces it at a synapse, it is also called an excitatory postsynaptic potential, or EPSP, because it brings the neuron closer to firing an action potential."],
 name:"depolarizing graded potential",
 desc:"The gold gates open, two sodium ions pass into the dendrite, and the tracing rises a few millivolts above minus 70 and then falls back to rest.",
 pre:function(){S(DEN);},
 play:function(a){gatesOpen(true);return naIn(a).then(function(){return trDraw(TR[0],C_ONE.d,1100,a);}).then(function(){cap("Sodium influx depolarizes the membrane");});},
 post:function(){S(DEN);gatesOpen(true);NA.forEach(function(g,i){place(g,GATEX[i],TY+TH/2);});trNow(TR[0],C_ONE.d);cap("Sodium influx depolarizes the membrane");}},

{title:"Stimulus strength and size",
 text:["The same dendrite now receives three stimuli in turn: a weak one, a medium one, and a strong one. A stronger stimulus opens more channels or holds them open longer.","Opening more channels raises the membrane's conductance, which is how easily ions can cross it. Conductance is the inverse of resistance: the more channels open, the lower the resistance to that ion and the more current flows into the cell."],
 ask:"What happens to the size of the change in voltage as the stimulus gets stronger?",
 ans:["It gets bigger. More open channels let more sodium in, so the weak stimulus depolarizes the membrane by about 3 mV, the medium one by about 7 mV, and the strong one by about 12 mV.","This is why these signals are called graded potentials: their amplitude, or size, varies with the strength of the stimulus. Unlike an action potential, a graded potential has no threshold and no fixed size. Each one lasts from a few milliseconds to tens of milliseconds, and then the channels close and the membrane returns to rest."],
 name:"graded potential",
 desc:"Three bumps appear on the tracing in turn, labeled weak, 3 millivolts, medium, 7 millivolts, and strong, 12 millivolts. Each returns to minus 70 before the next.",
 pre:function(){S(DEN);gatesOpen(true);NA.forEach(function(g){g.setAttribute("display","none");});},
 play:function(a){
   return trDraw(TR[0],C_W.d,700,a).then(function(){lab(0,peakX(T1),Y(-67)-14,"weak, 3 mV");return trDraw(TR[1],C_MD.d,700,a);})
   .then(function(){lab(1,peakX(T2),Y(-63)-14,"medium, 7 mV");return trDraw(TR[2],C_S.d,700,a);})
   .then(function(){lab(2,peakX(T3),Y(-58)-14,"strong, 12 mV");cap("Stronger stimulus, larger amplitude");});},
 post:function(){S(DEN);gatesOpen(true);NA.forEach(function(g){g.setAttribute("display","none");});trNow(TR[0],C_W.d);trNow(TR[1],C_MD.d);trNow(TR[2],C_S.d);
   lab(0,peakX(T1),Y(-67)-14,"weak, 3 mV");lab(1,peakX(T2),Y(-63)-14,"medium, 7 mV");lab(2,peakX(T3),Y(-58)-14,"strong, 12 mV");cap("Stronger stimulus, larger amplitude");}},

{title:"Potassium leaves: hyperpolarization",
 text:["Some neurotransmitters open a different chemically gated channel, one that is permeable to potassium. Potassium then leaves the cell instead of sodium entering it."],
 ask:"Potassium leaves through the open channels. Which way does the tracing move this time?",
 ans:["Down. Positive charge leaves the cell, so the inside becomes more negative than it is at rest. The membrane potential moves toward the equilibrium potential for potassium, about "+M+"90 mV. In this example it falls about 8 mV below rest and then returns.","A change that makes the membrane potential more negative than rest is a hyperpolarization, so this is a hyperpolarizing graded potential. It moves the membrane potential farther from threshold. When a neurotransmitter produces it at a synapse, it is called an inhibitory postsynaptic potential, or IPSP, because it makes the neuron less likely to fire an action potential."],
 name:"hyperpolarizing graded potential",
 desc:"The channels are relabeled as gated potassium channels. Two potassium ions leave the dendrite through them, and the tracing dips about 8 millivolts below minus 70, then returns to rest.",
 pre:function(){S(DEN);gateLab.textContent="Gated potassium channels";},
 play:function(a){gatesOpen(true);return kOut(a).then(function(){return trDraw(TR[0],C_H.d,1100,a);}).then(function(){lab(0,peakX(T2),Y(-78)+24,"8 mV below rest");cap("Potassium efflux hyperpolarizes");});},
 post:function(){S(DEN);gateLab.textContent="Gated potassium channels";gatesOpen(true);NA.forEach(function(g){g.setAttribute("display","none");});KI.forEach(function(g,i){g.setAttribute("display","");place(g,GATEX[i],TY-58);});
   trNow(TR[0],C_H.d);lab(0,peakX(T2),Y(-78)+24,"8 mV below rest");cap("Potassium efflux hyperpolarizes");}},

/* ---- 2. why it fades as it spreads ---- */
{sec:"Why graded potentials fade",comp:"Competency 12",
 title:"Local current flow",
 text:["Return to the sodium entering at the left end of the dendrite. The positive charge it carries does not remain at the channels where it entered."],
 ask:"Where does the positive charge go after it enters the dendrite?",
 ans:["It spreads along the inside of the dendrite in both directions, away from the spot where it came in. Most of this dendrite lies to the right, so most of the charge heads toward the cell body.","This movement of charge through the cytoplasm is called local current flow. It is how a graded potential spreads to parts of the membrane where no channels opened."],
 name:"local current flow",
 desc:"Plus signs start at the open channels and spread along the inside of the dendrite, one to the left and several to the right. The farther they travel, the smaller they get.",
 pre:function(){S(["dend","gate","charge","cap"]);gatesOpen(true);},
 play:function(a){return chSpread(a).then(function(){cap("Local current flow in the cytoplasm");});},
 post:function(){S(["dend","gate","charge","cap"]);gatesOpen(true);chDone();cap("Local current flow in the cytoplasm");}},

{title:"Recording along the dendrite",
 text:["Now the membrane potential is recorded by four meters placed along the dendrite. Point 1 is next to the open channels, and point 4 is farthest from them."],
 ask:"Will all four meters show the same change in voltage? If not, which will show the most?",
 ans:["No. Point 1 shows the biggest change, about 20 mV. Point 2 shows about 12 mV, point 3 about 7 mV, and point 4 only about 4 mV.","The same graded potential is smaller at every point farther from where it started. This loss of amplitude with distance is called decremental conduction. The next two steps show what causes it."],
 desc:"Four meters sit under the dendrite. They read 20 millivolts at point 1 next to the channels, 12 at point 2, 7 at point 3, and 4 at point 4, farthest away. A maroon band inside the dendrite narrows from left to right.",
 pre:function(){S(["dend","gate","taper","pts","cap"]);gatesOpen(true);},
 play:function(a){var v=["20 mV","12 mV","7 mV","4 mV"],k=0;
   return tweenVal(0,1,1200,a,function(t){taperSet(t);}).then(function(){
     function nxt(){if(k>=4)return Promise.resolve();var s=v.slice(0,k+1);pts(s);k++;return wait(300,a).then(nxt);}
     return nxt();}).then(function(){pts(["20 mV","12 mV","7 mV","4 mV"]);cap("Amplitude decreases with distance");});},
 post:function(){S(["dend","gate","taper","pts","cap"]);gatesOpen(true);taperSet(1);pts(["20 mV","12 mV","7 mV","4 mV"]);cap("Amplitude decreases with distance");}},

{title:"Current leak",
 text:["The membrane of the dendrite has open leak channels along its whole length, the same leak channels that set the resting potential. A garden hose with small holes along its length loses water in a similar way."],
 ask:"What happens to some of the positive charge as it travels past those open leak channels?",
 ans:["Some of it leaves. Positive charge escapes through the leak channels all along the way, so less and less of it is left to travel on.","This loss of charge across the membrane is called current leak. It is one of the two reasons a graded potential fades."],
 name:"current leak",
 desc:"Small plus signs slip out through three gaps in the lower wall of the dendrite, each marked with a maroon arrow pointing out of the cell.",
 pre:function(){S(["dend","gate","taper","leak","cap"]);gatesOpen(true);taperSet(1);},
 play:function(a){return Promise.all(LK.map(function(p,i){return wait(i*200,a).then(function(){return tweenPath(p,[[LEAKX[i],TY+TH+22]],900,a);});})).then(function(){cap("Charge lost through leak channels");});},
 post:function(){S(["dend","gate","taper","leak","cap"]);gatesOpen(true);taperSet(1);LK.forEach(function(p,i){place(p,LEAKX[i],TY+TH+22);});cap("Charge lost through leak channels");}},

{title:"Cytoplasmic resistance",
 text:["The second cause is inside the dendrite. The cytoplasm is crowded with proteins and other molecules, and it resists the flow of charge through it, in the same way that a thin wire resists electric current more than a thick one.","Current, voltage, and resistance are related by Ohm's law: voltage equals current times resistance (V = I × R), so current equals voltage divided by resistance (I = V / R). For the same voltage, higher resistance means less current flows. Because charge is lost through the membrane and its flow is slowed by the cytoplasm, the change in voltage is smaller at every point farther along the dendrite."],
 name:"cytoplasmic resistance",
 auto:true,
 desc:"A label above the dendrite reads cytoplasmic resistance slows the flow. The maroon band inside narrows to almost nothing by the far end, and the leak arrows stay in place underneath.",
 pre:function(){S(["dend","gate","taper","leak","res","cap"]);gatesOpen(true);LK.forEach(function(p,i){place(p,LEAKX[i],TY+TH+22);});},
 play:function(a){return tweenVal(0,1,1200,a,function(t){taperSet(t);}).then(function(){cap("Current leak plus cytoplasmic resistance");});},
 post:function(){S(["dend","gate","taper","leak","res","cap"]);gatesOpen(true);LK.forEach(function(p,i){place(p,LEAKX[i],TY+TH+22);});taperSet(1);cap("Current leak plus cytoplasmic resistance");}},

{title:"A wider dendrite",
 text:["Now compare a dendrite that is twice as wide."],
 ask:"Will a graded potential travel farther or a shorter distance before it fades in the wider dendrite? Which of the two losses changes?",
 ans:["Farther. A wider dendrite has a larger cross section for charge to flow through, so its cytoplasmic resistance is lower, and the graded potential spreads farther before it fades.","The loss that changes is cytoplasmic resistance. Current leak does not go down; a wider dendrite actually has a little more membrane, and so more leak channels, along each length. Cytoplasmic resistance falls much more than leak rises, so the net effect is that the graded potential travels farther."],
 desc:"The dendrite widens. The maroon band inside stays thicker at the far end than it did in the narrow dendrite, showing that the charge spreads farther.",
 pre:function(){S(["dend","gate","taper","res","cap"]);gatesOpen(true);taperSet(1);},
 play:function(a){tubeWide(true);taperSet.wide=true;return tweenVal(0,1,1200,a,function(t){taperSet(t);}).then(function(){cap("Wider dendrite, lower resistance");});},
 post:function(){S(["dend","gate","taper","res","cap"]);gatesOpen(true);tubeWide(true);taperSet.wide=true;taperSet(1);cap("Wider dendrite, lower resistance");}},

/* ---- 3. what reaches the trigger zone ---- */
{sec:"What reaches the trigger zone",comp:"Competencies 12 and 14",
 title:"Threshold at the trigger zone",
 text:["At the far end of the dendrite is the cell body, and just past it is the trigger zone, the axon hillock and initial segment you saw in the neurons and glia walkthrough. An action potential is generated there only if the membrane potential at the trigger zone reaches threshold, about "+M+"55 mV.","From rest at "+M+"70 mV, the trigger zone must depolarize by about 15 mV. The outcome depends on the amplitude of the graded potential when it arrives at the trigger zone, not its amplitude where it started."],
 auto:true,
 desc:"The dendrite now ends at a round cell body with a gold wedge beside it labeled trigger zone. The tracing now records the membrane potential at the trigger zone, with a dashed threshold line at minus 55. A meter at lower left reads minus 70 millivolts.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){return trDraw(TR[0],curve([]).d,800,a).then(function(){cap("Threshold is about "+M+"55 mV.");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TR[0],curve([]).d);cap("Threshold is about "+M+"55 mV.");}},

{title:"One EPSP at the trigger zone",
 text:["A synapse far out on the dendrite produces a 20 mV EPSP there. By the time it reaches the trigger zone, it has decreased to 8 mV."],
 ask:"Rest is "+M+"70 mV and threshold is about "+M+"55 mV. Is an action potential generated?",
 ans:["No. "+M+"70 + 8 = "+M+"62 mV, which is still 7 mV short of threshold. The graded potential fades and the membrane returns to rest, and no action potential is generated.","A graded potential that is too small to bring the trigger zone to threshold is called subthreshold."],
 name:"subthreshold",
 desc:"The trigger zone tracing rises 8 millivolts to minus 62, stays below the dashed threshold line, and falls back to rest. The meter reads minus 62 millivolts at the peak.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){return Promise.all([trDraw(TR[0],C_TZ1.d,1100,a),tweenVal(-70,-62,700,a,function(v){mv(v);})]).then(function(){lab(0,480,118,"8 mV, reaches "+M+"62");cap("Subthreshold: no action potential");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TR[0],C_TZ1.d);mv(-62);lab(0,480,118,"8 mV, reaches "+M+"62");cap("Subthreshold: no action potential");}},

{title:"Two EPSPs at once",
 text:["Now two synapses at different sites on the dendrite are active at the same time, and the EPSP from each one is 8 mV when it reaches the trigger zone."],
 ask:"Is an action potential generated now? Show the arithmetic.",
 ans:["Yes. Graded potentials that overlap in time add together, so the trigger zone depolarizes by 8 + 8 = 16 mV. "+M+"70 + 16 = "+M+"54 mV, which is past threshold, so an action potential is generated.","The adding together of graded potentials is called summation. When the graded potentials come from different synapses active at the same time, as here, it is spatial summation. When one synapse is activated again before its previous graded potential has faded, it is temporal summation. A total large enough to reach threshold is called suprathreshold. Real graded potentials that overlap add up to a little less than their simple sum, but the reasoning is the same. The synaptic integration walkthrough covers summation in detail."],
 name:"spatial summation, suprathreshold",
 desc:"A dashed line shows one 8 millivolt EPSP alone. The solid tracing shows the two added together. It crosses the dashed threshold line and shoots up off the top of the scale as an action potential, to about plus 30 millivolts, then falls back to rest.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){trNow(TD[0],C_TZ1.d);lab(1,200,122,"dashed: one EPSP alone");
   return Promise.all([trDraw(TR[0],C_TZ2.d,1300,a),tweenVal(-70,-54,800,a,function(v){mv(v);})]).then(function(){lab(0,C_TZ2.x+110,GTOP+22,"to about +30 mV");cap("Spatial summation reaches threshold");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TD[0],C_TZ1.d);trNow(TR[0],C_TZ2.d);mv(-54);
   lab(1,200,122,"dashed: one EPSP alone");lab(0,C_TZ2.x+110,GTOP+22,"to about +30 mV");cap("Spatial summation reaches threshold");}},

{title:"Adding an IPSP",
 text:["The same two synapses are active, and each EPSP is still 8 mV at the trigger zone. At the same time, a third synapse opens potassium channels and produces an IPSP that is 5 mV at the trigger zone."],
 ask:"Is an action potential still generated?",
 ans:["No. 8 + 8 "+M+" 5 = 11 mV, and "+M+"70 + 11 = "+M+"59 mV. That is below threshold again, so no action potential is generated.","EPSPs and IPSPs sum at the trigger zone. Depolarizing inputs move the membrane potential toward threshold and hyperpolarizing inputs move it away, and an action potential is generated only if the net depolarization reaches threshold. The action potential walkthrough begins at that point."],
 desc:"Two dashed lines show the separate inputs: the two EPSPs together, rising 16 millivolts, and the IPSP, dipping 5 millivolts. The solid tracing, their total, rises only to minus 59, below the threshold line, and returns to rest.",
 pre:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){trNow(TD[0],C_TZE.d);trNow(TD[1],C_TZI.d);lab(1,peakX(TZ)+80,Y(-54)-6,"two EPSPs, 16 mV");lab(2,peakX(TZ)+60,Y(-75)+22,"IPSP, 5 mV");
   return Promise.all([trDraw(TR[0],C_TZB.d,1100,a),tweenVal(-70,-59,700,a,function(v){mv(v);})]).then(function(){lab(0,220,122,"total, "+M+"59 mV");cap("Net input stays below threshold");});},
 post:function(){S(["graph","thr","tr","dend","tz","meter","cap"]);tubeLab.setAttribute("display","none");trNow(TD[0],C_TZE.d);trNow(TD[1],C_TZI.d);trNow(TR[0],C_TZB.d);mv(-59);
   lab(1,peakX(TZ)+80,Y(-54)-6,"two EPSPs, 16 mV");lab(2,peakX(TZ)+60,Y(-75)+22,"IPSP, 5 mV");lab(0,220,122,"total, "+M+"59 mV");cap("Net input stays below threshold");}},

/* ---- 4. patient ---- */
{sec:"Patient case",comp:"Competencies 12 and 14",
 title:"Patient: the pufferfish meal",
 text:["A man eats pufferfish that was not prepared correctly. Within an hour his lips and tongue are numb, then his arms and legs grow weak. The toxin in the fish, tetrodotoxin, blocks voltage-gated sodium channels from the outside of the cell. It does not block chemically gated or mechanically gated channels.","Recordings from one of his neurons show a resting potential of "+M+"70 mV, which is normal. A weak stimulus still produces a small depolarization, about 5 mV, that fades. A strong stimulus produces about 20 mV, which goes past threshold, and it also fades. No action potential appears."],
 ask:"Why do his graded potentials still happen, and what signal is missing?",
 ans:["His graded potentials still happen because they are made by chemically and mechanically gated channels, and the toxin does not block those. What is missing is the action potential. Even a depolarization that goes past threshold cannot trigger one, because the action potential depends on the voltage-gated sodium channels that the toxin has blocked.","So his neurons can still produce graded potentials in response to input, but they cannot generate action potentials to carry signals along their axons. The action potential walkthrough builds the action potential from those channels and finishes this case, including why the toxin can stop his breathing."],
 desc:"The tracing shows a small 5 millivolt bump that fades, then a larger 20 millivolt bump that rises above the dashed threshold line to about minus 50 and fades without an action potential. A label reads voltage-gated sodium channels blocked.",
 pre:function(){S(["graph","thr","tr","dend","tz","tox","cap"]);tubeLab.setAttribute("display","none");},
 play:function(a){return trDraw(TR[0],C_TTXW.d,700,a).then(function(){lab(0,peakX(T1),Y(-65)-14,"weak, 5 mV");return trDraw(TR[1],C_TTXS.d,1200,a);}).then(function(){lab(1,494+120,Y(-50)-2,"strong, 20 mV, no spike");cap("Graded potentials but no action potential");});},
 post:function(){S(["graph","thr","tr","dend","tz","tox","cap"]);tubeLab.setAttribute("display","none");trNow(TR[0],C_TTXW.d);trNow(TR[1],C_TTXS.d);lab(0,peakX(T1),Y(-65)-14,"weak, 5 mV");lab(1,494+120,Y(-50)-2,"strong, 20 mV, no spike");cap("Graded potentials but no action potential");}},

/* ---- 5. story check ---- */
{sec:"Review",comp:"Competencies 12 and 14",
 title:"Summary with the scientific terms",
 text:["A stimulus opens chemically or mechanically gated channels. Sodium entering produces a depolarizing graded potential, and potassium leaving produces a hyperpolarizing one. At a synapse these are EPSPs and IPSPs; in a sensory receptor, a graded potential produced by a stimulus such as stretch is called a receptor potential. The amplitude varies with the strength of the stimulus, and there is no threshold and no fixed size.","The charge spreads by local current flow and decreases with distance, which is decremental conduction, because of current leak across the membrane and cytoplasmic resistance inside. A wider process spreads it farther. At the trigger zone, graded potentials that overlap in time add together by spatial or temporal summation. A subthreshold total fades away, and a suprathreshold total generates an action potential."],
 ask:"Without scrolling back, explain why a graded potential that is 20 mV at the tip of a dendrite can fail to fire the neuron, and name two ways it could still reach threshold.",
 ans:["It fades on the way to the trigger zone, because charge leaks out through leak channels and the cytoplasm resists its flow, so much less than 20 mV may be left when it arrives. It could still reach threshold by summation, if EPSPs from other synapses arrive at the same time (spatial summation) or the same synapse is activated again in quick succession (temporal summation). It could also reach threshold if it started closer to the trigger zone or traveled along a wider process, so that less of it is lost.","If you could not recall part of this, review those steps before you start the action potential walkthrough, which begins at the trigger zone."],
 desc:"The dendrite, the cell body and trigger zone, and the tracing are all shown. The tracing replays two graded potentials adding up to threshold and firing.",
 pre:function(){S(["graph","thr","tr","dend","gate","taper","tz","meter","cap"]);tubeLab.setAttribute("display","none");gatesOpen(true);},
 play:function(a){return tweenVal(0,1,900,a,function(t){taperSet(t);}).then(function(){return Promise.all([trDraw(TR[0],C_TZ2.d,1200,a),tweenVal(-70,-54,800,a,function(v){mv(v);})]);}).then(function(){cap("Summed EPSPs reach threshold");});},
 post:function(){S(["graph","thr","tr","dend","gate","taper","tz","meter","cap"]);tubeLab.setAttribute("display","none");gatesOpen(true);taperSet(1);trNow(TR[0],C_TZ2.d);mv(-54);cap("Summed EPSPs reach threshold");}}
];
