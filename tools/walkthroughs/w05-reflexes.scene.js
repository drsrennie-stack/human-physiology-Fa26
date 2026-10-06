/* Spinal reflexes. Oct 4 2026. Week 5 competencies 1 to 4, with the reflex
   grading and latency ideas from competency 7. Main figure: the thigh
   muscles on the left (extensor on top with a spindle inside and a tendon
   organ at its tendon, flexor below), a spinal cord cross section on the
   right with its dorsal and ventral roots. A second figure, two legs under
   a small cord, carries the withdrawal and crossed extensor section. */

/* ---- the muscles ---- */
var gMus=G("mus");
var QY=120,QH=56,HY=330,HH=56;
var quad=el("rect",{x:60,y:QY,width:270,height:QH,rx:26,fill:TISS,stroke:MAROON,"stroke-width":4},gMus);
var ham=el("rect",{x:60,y:HY,width:270,height:HH,rx:26,fill:TISS,stroke:MAROON,"stroke-width":4},gMus);
el("line",{x1:330,y1:QY+QH/2,x2:392,y2:QY+QH/2,stroke:INK2,"stroke-width":7,"stroke-linecap":"round"},gMus);
el("line",{x1:330,y1:HY+HH/2,x2:392,y2:HY+HH/2,stroke:INK2,"stroke-width":7,"stroke-linecap":"round"},gMus);
tx(gMus,66,QY-12,"extensor: quadriceps","t",15,"start");
tx(gMus,72,HY+HH/2+6,"flexor: hamstrings","tm",15,"start");
tx(gMus,392,QY+QH/2+30,"tendon","t",14,"end");
function bulge(m,on,y,h){if(on){m.setAttribute("y",y-8);m.setAttribute("height",h+16);}else{m.setAttribute("y",y);m.setAttribute("height",h);}}

/* the spindle, drawn inside the extensor, parallel to its fibers */
var gSpin=G("spin");
var spin=el("ellipse",{cx:190,cy:QY+QH/2,rx:46,ry:10,fill:"#fff",stroke:NAVY,"stroke-width":3},gSpin);
el("path",{d:"M172 "+(QY+QH/2-9)+" q6 18 12 0 q6 -18 12 0",fill:"none",stroke:GDEEP,"stroke-width":3},gSpin);
var spinLab=tx(gSpin,190,QY+QH+22,"muscle spindle","tm",15,"middle");
function spinSlack(on){spin.setAttribute("ry",on?4:10);spin.setAttribute("rx",on?40:46);}

/* the Golgi tendon organ, in series at the tendon */
var gGto=G("gto");
el("path",{d:"M346 "+(QY+QH/2-12)+" l8 24 l8 -24 l8 24",fill:"none",stroke:GDEEP,"stroke-width":4,"stroke-linejoin":"round"},gGto);
tx(gGto,362,QY-12,"tendon organ","tm",15,"middle");

/* the hammer */
var gHam=G("hammer");
var hammer=el("g",{},gHam);
el("rect",{x:-6,y:-70,width:12,height:60,rx:4,fill:INK2},hammer);
el("rect",{x:-22,y:-14,width:44,height:20,rx:6,fill:NAVY},hammer);
place(hammer,370,QY-8);

/* ---- the spinal cord ---- */
var CX=650,CY=215;
var gCord=G("cord");
el("ellipse",{cx:CX,cy:CY,rx:160,ry:120,fill:"#fff",stroke:NAVY,"stroke-width":4},gCord);
el("ellipse",{cx:CX-46,cy:CY-62,rx:20,ry:48,fill:TINT,stroke:INK2,"stroke-width":2,transform:"rotate(-22 "+(CX-46)+" "+(CY-62)+")"},gCord);
el("ellipse",{cx:CX+46,cy:CY-62,rx:20,ry:48,fill:TINT,stroke:INK2,"stroke-width":2,transform:"rotate(22 "+(CX+46)+" "+(CY-62)+")"},gCord);
el("ellipse",{cx:CX-52,cy:CY+48,rx:40,ry:42,fill:TINT,stroke:INK2,"stroke-width":2},gCord);
el("ellipse",{cx:CX+52,cy:CY+48,rx:40,ry:42,fill:TINT,stroke:INK2,"stroke-width":2},gCord);
el("rect",{x:CX-50,y:CY-8,width:100,height:22,fill:TINT},gCord);
el("line",{x1:CX,y1:CY-120,x2:CX,y2:CY+120,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 6"},gCord);
tx(gCord,CX,CY-130,"dorsal (back)","t",14,"middle");
tx(gCord,CX,CY+146,"ventral (front)","t",14,"middle");
tx(gCord,CX+150,CY-104,"spinal cord","tn",16,"start");
/* roots */
el("line",{x1:420,y1:100,x2:540,y2:138,stroke:NAVY,"stroke-width":4},gCord);
el("ellipse",{cx:462,cy:112,rx:20,ry:13,fill:"#fff",stroke:NAVY,"stroke-width":3},gCord);
el("line",{x1:420,y1:308,x2:548,y2:292,stroke:NAVY,"stroke-width":4},gCord);
tx(gCord,462,86,"dorsal root","t",14,"middle");
tx(gCord,462,336,"ventral root","t",14,"middle");

/* ---- the neurons, drawn after the cord so they sit on top ---- */
var gIa=G("ia");
var IA=[[190,QY+QH/2],[190,88],[420,88],[462,112],[540,138],[602,168],[598,254]];
var iaLine=poly(gIa,IA,MAROON,4);
var gMnE=G("mne");
var MNE=[[598,262],[548,292],[420,300],[352,300],[300,QY+QH]];
var mneLine=poly(gMnE,MNE,NAVY,4);
el("circle",{cx:598,cy:262,r:10,fill:NAVY},gMnE);
var gMnF=G("mnf");
var MNF=[[628,286],[560,306],[420,318],[250,318],[220,HY]];
var mnfLine=poly(gMnF,MNF,NAVY,4,"10 7");mnfLine._dash="10 7";
el("circle",{cx:628,cy:286,r:10,fill:"#fff",stroke:NAVY,"stroke-width":3},gMnF);
var gInh=G("inh");
var INH=[[602,176],[652,212],[634,280]];
poly(gInh,INH,INK2,3.5);
el("circle",{cx:652,cy:212,r:11,fill:INK2},gInh);
var inhLab=tx(gInh,676,206,"inhibitory","t",13,"start");tx(gInh,676,222,"interneuron","t",13,"start");
/* the tendon organ afferent and its interneuron */
var gIb=G("ib");
var IB=[[362,QY+QH/2-8],[362,64],[420,64],[462,104],[540,130],[574,172],[566,226]];
poly(gIb,IB,GDEEP,4);
el("circle",{cx:566,cy:230,r:11,fill:INK2},gIb);
poly(gIb,[[566,236],[594,258]],INK2,3.5);
tx(gIb,520,236,"inhibitory","t",13,"end");tx(gIb,520,252,"interneuron","t",13,"end");
/* gamma motor neuron */
var gGam=G("gam");
var GAM=[[574,270],[540,300],[420,326],[240,326],[176,QY+QH/2+4]];
var gamLine=poly(gGam,GAM,GDEEP,3,"4 6");gamLine._dash="4 6";
el("circle",{cx:574,cy:270,r:8,fill:GDEEP},gGam);
tx(gGam,250,346,"gamma motor neuron","tm",14,"start");

/* signs on the muscles */
var gSign=G("sign");
var sQ=badge(gSign,300,QY-18,"+",MAROON,15),sH=badge(gSign,300,HY+HH+18,M,NAVY,15);
function signs(q,h){if(q){setBadge(sQ,q==="+"?"+":M,q==="+"?MAROON:NAVY);}else sQ.setAttribute("display","none");
  if(h){setBadge(sH,h==="+"?"+":M,h==="+"?MAROON:NAVY);}else sH.setAttribute("display","none");}

/* the five parts, as labels */
var gFive=G("five");
var FIVE=[[190,QY+QH+44,"1 receptor"],[300,72,"2 sensory neuron"],[740,300,"3 integrating center"],[420,284,"4 motor neuron"],[100,QY+QH/2+6,"5 effector"]];
var FL=FIVE.map(function(f){var t=tx(gFive,f[0],f[1],f[2],"tm",15,"middle");t.setAttribute("display","none");return t;});

/* firing rate readouts */
var gTr1=G("tr1");
el("rect",{x:60,y:12,width:320,height:50,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gTr1);
tx(gTr1,68,30,"spindle afferent","t",13,"start");
var tr1=trainPath(gTr1,MAROON,2.5);
var gTr2=G("tr2");
el("rect",{x:60,y:404,width:320,height:50,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gTr2);
tx(gTr2,68,422,"tendon organ afferent","t",13,"start");
var tr2=trainPath(gTr2,GDEEP,2.5);

/* traveling signals */
var gSig=G("sig");
var dA=dot(gSig,MAROON,10),dB=dot(gSig,NAVY,10),dC=dot(gSig,INK2,9),dD=dot(gSig,GDEEP,9);

/* the cut, for the dorsal root step */
var gCut=G("cut");
el("line",{x1:430,y1:72,x2:452,y2:130,stroke:MAROON,"stroke-width":5},gCut);
el("line",{x1:452,y1:72,x2:430,y2:130,stroke:MAROON,"stroke-width":5},gCut);
tx(gCut,404,150,"cut","tm",16,"middle");

/* the grading scale and the latency line */
var gScale=G("scale");
var GR=[["0","absent"],["1+","less than usual"],["2+","normal"],["3+","brisker than usual"],["4+","very brisk, clonus"]];
var GRB=GR.map(function(g,i){var x=60+i*108;var b=box(gScale,x,412,100,40,g[0],"tn",18);tx(gScale,x+50,470,g[1],"t",12,"middle");return b;});
function gradeHi(k){GRB.forEach(function(b,i){b.firstChild.setAttribute("stroke",i===k?MAROON:NAVY);b.firstChild.setAttribute("stroke-width",i===k?4:2.5);});}
var gTime=G("time");
el("line",{x1:60,y1:440,x2:600,y2:440,stroke:NAVY,"stroke-width":3},gTime);
[0,50,100,150,200,250].forEach(function(ms){var x=60+ms*2;el("line",{x1:x,y1:432,x2:x,y2:448,stroke:NAVY,"stroke-width":2},gTime);tx(gTime,x,468,ms+(ms===250?" ms":""),"t",13,"middle");});
var lat1=badge(gTime,60+30*2,416,"",MAROON,9),lat2=badge(gTime,60+200*2,416,"",NAVY,9);
var latT1=tx(gTime,60+30*2,398,"knee jerk","tm",14,"middle"),latT2=tx(gTime,60+200*2,398,"catching a ruler","tn",14,"middle");

/* ---- the second figure: two legs under a small cord ---- */
var gLegs=G("legs");
var LC=[450,110];
el("ellipse",{cx:LC[0],cy:LC[1],rx:118,ry:78,fill:"#fff",stroke:NAVY,"stroke-width":4},gLegs);
el("line",{x1:LC[0],y1:LC[1]-78,x2:LC[0],y2:LC[1]+78,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 6"},gLegs);
tx(gLegs,LC[0],24,"spinal cord","tn",15,"middle");
tx(gLegs,150,60,"right leg","tn",17,"middle");tx(gLegs,750,60,"left leg","tn",17,"middle");
/* legs as two columns of muscle: flexor and extensor on each side */
function legCol(x,side){
  el("rect",{x:x-60,y:200,width:120,height:200,rx:40,fill:TISS,stroke:MAROON,"stroke-width":3},gLegs);
  el("line",{x1:x,y1:206,x2:x,y2:394,stroke:MAROON,"stroke-width":2,"stroke-dasharray":"5 6"},gLegs);
  tx(gLegs,x-30,420,"flexors","t",13,"middle");tx(gLegs,x+30,420,"extensors","t",13,"middle");
}
legCol(150,"R");legCol(750,"L");
/* the tack under the right foot */
el("polygon",{points:"130,452 150,428 170,452",fill:GDEEP},gLegs);
tx(gLegs,190,448,"tack","t",13,"start");
/* interneurons inside the cord */
var LIN=[[420,96],[420,132],[480,96],[480,132]];
LIN.forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:9,fill:INK2},gLegs);});
var bRF=badge(gLegs,120,300,"",MAROON,17),bRE=badge(gLegs,180,300,"",NAVY,17),bLF=badge(gLegs,720,300,"",NAVY,17),bLE=badge(gLegs,780,300,"",MAROON,17);
function legSigns(on){[bRF,bRE,bLF,bLE].forEach(function(b){b.setAttribute("display","none");});
  if(on>=1){setBadge(bRF,"+",MAROON);setBadge(bRE,M,NAVY);}
  if(on>=2){setBadge(bLF,M,NAVY);setBadge(bLE,"+",MAROON);}}
var gCross=G("cross");
var NOC=[[150,440],[150,180],[300,130],[420,110]];
poly(gCross,NOC,MAROON,4);
poly(gCross,[[420,110],[480,110]],INK2,3.5);
poly(gCross,[[480,110],[600,130],[750,180]],NAVY,4);
poly(gCross,[[420,110],[300,150],[150,190]],NAVY,4);
var gCrossOff=G("crossoff");
el("line",{x1:520,y1:90,x2:560,y2:150,stroke:MAROON,"stroke-width":5},gCrossOff);
el("line",{x1:560,y1:90,x2:520,y2:150,stroke:MAROON,"stroke-width":5},gCrossOff);

/* Oct 4 2026: figures for the reflex pathway, the four ways to sort a
   reflex, and the plantar response. */
var gFlow=G("flow");
tx(gFlow,40,40,"every neural reflex","tn",17,"start");
var FLB=[["stimulus",40,60,130],["receptor",200,60,130],["sensory neuron",360,60,160],["integrating center (CNS)",550,60,250],
         ["efferent neuron",550,190,250],["target: muscle or gland",290,190,230],["response",80,190,160]];
var FLX=FLB.map(function(f){var b=box(gFlow,f[1],f[2],f[3],52,f[0],"tn",14);b.setAttribute("opacity",0.15);return b;});
var FLA=[[170,86,198,86],[330,86,358,86],[520,86,548,86],[675,112,675,188],[550,216,522,216],[290,216,242,216]].map(function(q){var g=el("g",{opacity:0.15},gFlow);arrow(g,q[0],q[1],q[2],q[3],NAVY,3);return g;});
tx(gFlow,40,320,"autonomic reflexes: the efferent side is two neurons","tm",16,"start");
var FLAU=[["preganglionic neuron",40,340,200],["autonomic ganglion",290,340,190],["postganglionic neuron",530,340,210]].map(function(f){var b=box(gFlow,f[1],f[2],f[3],52,f[0],"tn",14,MAROON);b.setAttribute("opacity",0.15);return b;});
var FLAA=[[240,366,288,366],[480,366,528,366]].map(function(q){var g=el("g",{opacity:0.15},gFlow);arrow(g,q[0],q[1],q[2],q[3],MAROON,3);return g;});
tx(gFlow,40,430,"smooth muscle, cardiac muscle, glands, adipose tissue","t",14,"start");
function flowShow(n){FLX.forEach(function(b,i){b.setAttribute("opacity",i<n?1:0.15);});FLA.forEach(function(g,i){g.setAttribute("opacity",i<n-1?1:0.15);});}
function flowAuto(on){FLAU.concat(FLAA).forEach(function(g){g.setAttribute("opacity",on?1:0.15);});}
var gFour=G("four");
var FR=[["efferent division","somatic","autonomic"],["where integrated","spinal","cranial"],["when it develops","innate","learned"],["number of neurons","monosynaptic","polysynaptic"]];
var FPICK=[1,1,0,1];
var FCH=FR.map(function(r,i){var y=40+i*102;tx(gFour,60,y+32,r[0],"tn",17,"start");return [box(gFour,330,y,220,54,r[1],"t",16),box(gFour,580,y,220,54,r[2],"t",16)];});
function fourPick(on){FCH.forEach(function(p,i){p.forEach(function(b,j){var hit=on&&FPICK[i]===j;b.firstChild.setAttribute("stroke",hit?MAROON:NAVY);b.firstChild.setAttribute("stroke-width",hit?5:2.5);});});}
var gFoot=G("foot");
function footAt(x0,lab){var g=el("g",{},gFoot);
  el("path",{d:"M"+x0+" 330 h250 q30 0 30 -25 v-20 q0 -22 -26 -22 h-60 q-40 -58 -120 -68 q-62 0 -74 66 z",fill:TISS,stroke:MAROON,"stroke-width":3},g);
  var toe=el("g",{},g);el("rect",{x:x0+262,y:268,width:64,height:24,rx:12,fill:TISS,stroke:MAROON,"stroke-width":3},toe);
  tx(g,x0+150,384,lab,"tn",16,"middle");return {toe:toe,x:x0};}
var FT=[footAt(60,"normal adult: toes curl down"),footAt(490,"Babinski sign: big toe goes up")];
var pen=dot(gFoot,GDEEP,8);
function toeAngle(f,deg){f.toe.setAttribute("transform","rotate("+deg+" "+(f.x+266)+" 280)");}
function strokeSole(f,a){return run(pen,[[f.x+20,338],[f.x+250,338],[f.x+290,320]],900,a);}

/* ---- Oct 5 2026: the knee jerk as a real leg. The student taps the tendon
   with the hammer, the signal runs to the cord and back, the quadriceps
   shortens and the lower leg kicks. ---- */
var gKnee=G("knee");
var KP=[436,330];
/* the cord, top right */
var KC=[730,140];
el("circle",{cx:KC[0],cy:KC[1],r:74,fill:"#fff",stroke:NAVY,"stroke-width":3},gKnee);
el("path",{d:"M690 100 Q705 95 712 120 L720 140 L740 140 L748 120 Q755 95 770 100 L760 135 Q790 150 780 185 Q765 195 748 180 L740 160 L720 160 L712 180 Q695 195 680 185 Q670 150 700 135 Z",fill:TINT,stroke:INK2,"stroke-width":2},gKnee);
tx(gKnee,KC[0],KC[1]+98,"spinal cord","tn",15,"middle");
/* dorsal root with its ganglion, ventral root */
el("line",{x1:700,y1:112,x2:590,y2:70,stroke:MAROON,"stroke-width":4},gKnee);
el("ellipse",{cx:612,cy:78,rx:22,ry:13,fill:"#fff",stroke:MAROON,"stroke-width":3},gKnee);
tx(gKnee,612,52,"dorsal root","tm",13,"middle");
el("line",{x1:705,y1:178,x2:600,y2:224,stroke:NAVY,"stroke-width":4},gKnee);
tx(gKnee,600,250,"ventral root","tn",13,"middle");
/* the thigh: femur, quadriceps on top, hamstrings underneath */
el("rect",{x:70,y:314,width:376,height:32,rx:16,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},gKnee);
var kQuad=el("ellipse",{cx:250,cy:288,rx:178,ry:28,fill:TISS,stroke:MAROON,"stroke-width":3},gKnee);
var kHam=el("ellipse",{cx:240,cy:372,rx:166,ry:24,fill:TISS,stroke:MAROON,"stroke-width":3},gKnee);
var kSpin=el("ellipse",{cx:250,cy:288,rx:34,ry:7,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gKnee);
tx(gKnee,96,250,"quadriceps: straightens the knee","tm",14,"start");
tx(gKnee,96,418,"hamstrings: bend the knee","t",14,"start");
tx(gKnee,250,312,"spindle","tn",11,"middle");
el("line",{x1:420,y1:292,x2:452,y2:302,stroke:INK2,"stroke-width":6,"stroke-linecap":"round"},gKnee);
/* the lower leg turns at the knee */
var kLow=el("g",{},gKnee);
el("rect",{x:416,y:338,width:38,height:180,rx:18,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},kLow);
el("path",{d:"M412 360 Q380 430 412 500 L418 500 L418 360 Z",fill:TISS,stroke:MAROON,"stroke-width":2},kLow);
el("rect",{x:410,y:506,width:96,height:26,rx:12,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},kLow);
var kTendon=el("line",{x1:462,y1:318,x2:456,y2:378,stroke:INK2,"stroke-width":7,"stroke-linecap":"round"},kLow);
el("ellipse",{cx:460,cy:306,rx:11,ry:16,fill:"#fff",stroke:INK2,"stroke-width":2.5},kLow);
el("circle",{cx:KP[0],cy:KP[1],r:22,fill:"#E6DCCB",stroke:INK2,"stroke-width":2.5},gKnee);
var kTlab=el("g",{},gKnee);
el("line",{x1:470,y1:350,x2:520,y2:338,stroke:INK2,"stroke-width":1.5},kTlab);
tx(kTlab,524,342,"patellar tendon","t",13,"start");
tx(gKnee,482,300,"kneecap","t",12,"start");
function legAngle(d){kLow.setAttribute("transform","rotate("+d+" "+KP[0]+" "+KP[1]+")");}
/* the neurons */
var KSN=[[262,284],[300,210],[560,64],[612,78],[700,112],[712,150],[716,168]];
var KMN=[[716,176],[705,186],[600,226],[430,246],[330,268]];
var KIN=[[716,168],[742,176]];
var KHM=[[742,182],[650,262],[500,420],[320,394]];
var kSN=poly(gKnee,KSN,MAROON,3.5),kMN=poly(gKnee,KMN,NAVY,3.5);
var kInhG=el("g",{},gKnee);poly(kInhG,KIN,INK2,3);poly(kInhG,KHM,NAVY,3,"7 6");
var kSyn=badge(gKnee,716,172,"",GDEEP,9);
var kD1=dot(gKnee,MAROON,10),kD2=dot(gKnee,NAVY,10),kD3=dot(gKnee,INK2,8);
var kLabs=el("g",{},gKnee);
tx(kLabs,410,150,"sensory neuron","tm",14,"start");
tx(kLabs,470,268,"motor neuron","tn",14,"start");
var kFive=el("g",{},gKnee);
[[250,262,"1 receptor: spindle"],[400,128,"2 sensory neuron"],[730,30,"3 integrating center: cord"],[540,214,"4 motor neuron"],[150,226,"5 effector: quadriceps"]].forEach(function(f){var b=badge(kFive,f[0],f[1],f[2].charAt(0),MAROON,12);tx(kFive,f[0]+18,f[1]+5,f[2].slice(2),"tm",13,"start");});
var kOne=el("g",{},gKnee);el("circle",{cx:716,cy:172,r:22,fill:"none",stroke:GDEEP,"stroke-width":4},kOne);tx(kOne,796,196,"one synapse","tm",15,"start");
var kCut=el("g",{},gKnee);el("line",{x1:568,y1:46,x2:600,y2:92,stroke:MAROON,"stroke-width":6},kCut);el("line",{x1:600,y1:46,x2:568,y2:92,stroke:MAROON,"stroke-width":6},kCut);tx(kCut,584,122,"cut","tm",14,"middle");
/* the hammer, and the prompt to use it */
var kHam2=el("g",{style:"cursor:pointer"},gKnee);
el("rect",{x:-60,y:-90,width:150,height:150,fill:"transparent"},kHam2);
el("rect",{x:6,y:-6,width:90,height:12,rx:5,fill:INK2,transform:"rotate(-35)"},kHam2);
el("path",{d:"M-14 -16 L14 -16 L18 16 L-18 16 Z",fill:NAVY,transform:"rotate(-35)"},kHam2);
var KH0=[520,410],KH1=[476,374];
place(kHam2,KH0[0],KH0[1]);
var kPrompt=el("g",{},gKnee);
var kRing=el("circle",{cx:KH0[0],cy:KH0[1],r:34,fill:"none",stroke:GOLD,"stroke-width":4},kPrompt);
el("path",{d:"M600 392 Q582 396 566 404",fill:"none",stroke:GDEEP,"stroke-width":4,"marker-end":"url(#ag)"},kPrompt);
tx(kPrompt,606,380,"Use the hammer to tap","tm",17,"start");
tx(kPrompt,606,402,"the patellar tendon","tm",17,"start");
var kHint=null;
function kneeReset(){if(typeof kneeExtras==="function")kneeExtras();legAngle(0);kQuad.setAttribute("ry",28);kHam.setAttribute("ry",24);kSpin.setAttribute("rx",34);place(kHam2,KH0[0],KH0[1]);
  [kD1,kD2,kD3].forEach(function(d){d.setAttribute("display","none");});kSyn.setAttribute("display","none");kTendon.setAttribute("stroke",INK2);}
/* wait for the student to use the hammer; with no animation, go straight on */
function waitTap(a){
  if(!a||reduce){kPrompt.setAttribute("display","none");return Promise.resolve();}
  kPrompt.setAttribute("display","");
  return new Promise(function(res){
    var my=runId,done=false,t;setTimeout(function(){if(!done&&typeof lockNext==="function")lockNext(true);},0);
    function fin(){if(done)return;done=true;clearInterval(t);if(my===runId&&typeof lockNext==="function")lockNext(false);kHam2.removeEventListener("click",fin);document.removeEventListener("keydown",key,true);kPrompt.setAttribute("display","none");res();}
    function key(e){if((e.key==="Enter"||e.key===" ")&&!/TEXTAREA|INPUT|BUTTON|A/.test((e.target.tagName||""))){e.preventDefault();fin();}}
    kHam2.addEventListener("click",fin);document.addEventListener("keydown",key,true);
    var k=0;t=setInterval(function(){if(my!==runId){fin();return;}k++;kRing.setAttribute("r",30+((k%10)<5?(k%5):5-(k%5))*2);},70);
  });
}
function strike(a){return tweenPath(kHam2,[KH1],180,a).then(function(){kTendon.setAttribute("stroke",GDEEP);kSpin.setAttribute("rx",42);return tweenPath(kHam2,[KH0],220,a);});}
/* the whole knee jerk: tendon, spindle, sensory neuron, one synapse, motor neuron, kick */
function kneeJerk(a,o){o=o||{};
  return strike(a).then(function(){return run(kD1,o.cut?KSN.slice(0,3).concat([[584,68]]):KSN,o.cut?700:1100,a,!!o.cut);})
  .then(function(){if(o.cut)return "stop";kSyn.setAttribute("display","");
    var inh=o.inhibit?run(kD3,KIN.concat(KHM),900,a).then(function(){kHam.setAttribute("ry",20);}):Promise.resolve();
    return Promise.all([run(kD2,KMN,900,a),inh]);})
  .then(function(r){if(r==="stop")return;kQuad.setAttribute("ry",36);
    return tweenVal(0,-34,260,a,legAngle).then(function(){return wait(250,a);}).then(function(){return tweenVal(-34,0,650,a,legAngle);}).then(function(){kQuad.setAttribute("ry",28);});});}

/* ---- Oct 5 2026: student actions. waitOn holds a step until the student
   clicks the target (or presses Enter), with a pulsing gold ring and an arrow
   pointing at it. With animation off it goes straight on. ---- */
/* waitOn, promptAt and lockNext now live in w05-kit.js */
/* the knee figure, part two: a spindle readout, a foot to push, muscle signs */
var kTrainG=el("g",{},gKnee);
tx(kTrainG,60,64,"spindle sensory neuron, firing","tm",14,"start");
el("line",{x1:60,y1:96,x2:360,y2:96,stroke:"#D9DCE3","stroke-width":1.5},kTrainG);
var kTr=trainPath(kTrainG,MAROON,2.5);
function kRest(k){return trainWin(60,96,300,0,k,Math.round(5*k),22);}
function kFast(k){return trainWin(60,96,300,0,k,Math.round(18*k),22);}
var kPushHit=el("rect",{x:395,y:330,width:130,height:215,fill:"transparent"},kLow);
var kPromptS=promptAt(gKnee,560,446,["Push the foot back to","stretch the quadriceps"],512,500,458,519,36);
var kQb=badge(gKnee,330,262,"+",MAROON,13),kHb=badge(gKnee,330,402,"",NAVY,13);setBadge(kHb,M,NAVY);
var kHrel=tx(gKnee,360,446,"hamstrings relax","tn",14,"start");
function kneeExtras(){if(typeof kGradeG!=="undefined"){kGradeG.setAttribute("display","none");kPullTxt.setAttribute("display","none");kPullTxt2.setAttribute("display","none");}kTrainG.setAttribute("display","none");kTr.setAttribute("d","");kPromptS.setAttribute("display","none");
  kQb.setAttribute("display","none");kHb.setAttribute("display","none");kHrel.setAttribute("display","none");kQuad.setAttribute("rx",178);}
function stretchReflex(a){
  return Promise.all([tweenVal(0,26,700,a,legAngle),tweenVal(178,192,700,a,function(v){kQuad.setAttribute("rx",v);}),tweenVal(34,46,700,a,function(v){kSpin.setAttribute("rx",v);})])
  .then(function(){return growTrain(kTr,kFast,800,a);})
  .then(function(){return run(kD1,KSN,900,a);})
  .then(function(){kSyn.setAttribute("display","");return run(kD2,KMN,800,a);})
  .then(function(){kQuad.setAttribute("ry",36);kQb.setAttribute("display","");
    return Promise.all([tweenVal(26,0,700,a,legAngle),tweenVal(192,178,700,a,function(v){kQuad.setAttribute("rx",v);}),tweenVal(46,34,700,a,function(v){kSpin.setAttribute("rx",v);})]);})
  .then(function(){kQuad.setAttribute("ry",28);});}

/* ---- two real legs for the withdrawal and crossed extensor reflexes ---- */
var gLegs2=G("legs2");
el("line",{x1:60,y1:488,x2:840,y2:488,stroke:INK2,"stroke-width":3},gLegs2);
el("ellipse",{cx:450,cy:110,rx:118,ry:78,fill:"#fff",stroke:NAVY,"stroke-width":4},gLegs2);
el("line",{x1:450,y1:32,x2:450,y2:188,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 6"},gLegs2);
tx(gLegs2,450,24,"spinal cord","tn",15,"middle");
LIN.forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:9,fill:INK2},gLegs2);});
function makeLeg(hx,hy,lab){
  var L={hx:hx,hy:hy,_th:0,_sh:0};
  var g=el("g",{},gLegs2);
  tx(g,hx,hy-34,lab,"tn",17,"middle");
  el("circle",{cx:hx,cy:hy-8,r:22,fill:"#E6DCCB",stroke:INK2,"stroke-width":2.5},g);
  L.thigh=el("g",{},g);
  L.fl=el("ellipse",{cx:hx-22,cy:hy+62,rx:10,ry:50,fill:TISS,stroke:MAROON,"stroke-width":2.5},L.thigh);
  L.ex=el("ellipse",{cx:hx+22,cy:hy+62,rx:10,ry:50,fill:TISS,stroke:MAROON,"stroke-width":2.5},L.thigh);
  el("rect",{x:hx-14,y:hy,width:28,height:128,rx:14,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},L.thigh);
  tx(L.thigh,hx-38,hy+40,"flexors","t",12,"end");tx(L.thigh,hx+38,hy+40,"extensors","t",12,"start");
  L.shin=el("g",{},L.thigh);
  el("rect",{x:hx-12,y:hy+122,width:24,height:126,rx:12,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},L.shin);
  el("rect",{x:hx-14,y:hy+240,width:72,height:22,rx:10,fill:"#EFE6D8",stroke:INK2,"stroke-width":2.5},L.shin);
  el("circle",{cx:hx,cy:hy+125,r:15,fill:"#E6DCCB",stroke:INK2,"stroke-width":2.5},L.thigh);
  L.bF=badge(L.thigh,hx-22,hy+18,"",MAROON,15);L.bE=badge(L.thigh,hx+22,hy+18,"",NAVY,15);
  L.bF.setAttribute("display","none");L.bE.setAttribute("display","none");
  return L;}
var LR=makeLeg(200,226,"right leg"),LL=makeLeg(700,226,"left leg");
function legPose(L,th,sh){L._th=th;L._sh=sh;L.thigh.setAttribute("transform","rotate("+th+" "+L.hx+" "+L.hy+")");L.shin.setAttribute("transform","rotate("+sh+" "+L.hx+" "+(L.hy+125)+")");}
function legTo(L,th,sh,dur,a){var t0=L._th,s0=L._sh;return tweenVal(0,1,dur,a,function(k){legPose(L,t0+(th-t0)*k,s0+(sh-s0)*k);});}
function musc(L,f,e){L.fl.setAttribute("rx",f?15:10);L.ex.setAttribute("rx",e?15:10);}
var tack=el("g",{},gLegs2);
el("polygon",{points:"212,488 226,466 240,488",fill:GDEEP},tack);
el("rect",{x:196,y:452,width:64,height:40,fill:"transparent"},tack);
tx(gLegs2,270,482,"tack","t",13,"start");
var tackPrompt=promptAt(gLegs2,300,420,["Click the tack to","step on it"],242,462,226,476,28);
var dN=dot(gLegs2,MAROON,9);
/* the old two-column badges now live on the new legs */
bRF=LR.bF;bRE=LR.bE;bLF=LL.bF;bLE=LL.bE;
/* the crossing paths, rerouted to the new legs */
(function(){var l=REG.cross.childNodes;
  l[0].setAttribute("points","226,470 150,420 150,180 300,130 420,110");
  l[2].setAttribute("points","480,110 600,130 684,236");
  l[3].setAttribute("points","420,110 300,150 186,236");}());
function legsReset(){legPose(LR,0,0);legPose(LL,0,0);musc(LR,0,0);musc(LL,0,0);tackPrompt.setAttribute("display","none");}
var RAISE=[-32,72];

/* the plantar response: the student strokes each sole */
var soleHit=el("rect",{x:40,y:200,width:820,height:200,fill:"transparent"},gFoot);
var solePrompt=promptAt(gFoot,330,150,["Click to stroke the sole","of each foot"],250,300,180,338,30);

/* ---- Oct 5 2026: the four ways to sort a reflex, as a mind map ---- */
var gMap=G("four2");
var MC=[450,262];
var BR=[
 {q:"What does it control?",qx:150,qy:150,leaves:[["Somatic","skeletal muscle,","like the knee jerk",40,30],["Autonomic","smooth muscle, heart,","glands",230,30]]},
 {q:"Where is it handled?",qx:530,qy:150,leaves:[["Spinal","in the","spinal cord",500,30],["Cranial","in the","brain",690,30]]},
 {q:"Born with it or learned?",qx:150,qy:330,leaves:[["Innate","you are","born with it",40,396],["Learned","comes from","experience",230,396]]},
 {q:"How many connections?",qx:530,qy:330,leaves:[["Monosynaptic","one connection","(synapse)",500,396],["Polysynaptic","two or more","connections",690,396]]}];
var MAPL=[];
BR.forEach(function(b,i){
  var qcx=b.qx+110,qcy=b.qy+22;
  el("line",{x1:MC[0],y1:MC[1],x2:qcx,y2:qcy,stroke:INK2,"stroke-width":3},gMap);
  var lv=b.leaves.map(function(L){
    var lx=L[3]+85,ly=L[4]+(L[4]<200?66:0);
    var ln=el("line",{x1:qcx,y1:b.qy+(L[4]<200?0:44),x2:lx,y2:ly,stroke:"#C9CED8","stroke-width":3},gMap);
    var g=el("g",{},gMap);
    var r=el("rect",{x:L[3],y:L[4],width:170,height:66,rx:12,fill:"#fff",stroke:"#C9CED8","stroke-width":2.5},g);
    tx(g,L[3]+85,L[4]+22,L[0],"tn",16,"middle");tx(g,L[3]+85,L[4]+41,L[1],"t",12.5,"middle");tx(g,L[3]+85,L[4]+57,L[2],"t",12.5,"middle");
    return {r:r,ln:ln};});
  var qb=el("rect",{x:b.qx,y:b.qy,width:220,height:44,rx:22,fill:NAVY},gMap);
  var qt=el("text",{x:qcx,y:qcy+6,"class":"iw","font-size":15,"text-anchor":"middle"},gMap);qt.textContent=b.q;
  MAPL.push(lv);});
el("ellipse",{cx:MC[0],cy:MC[1],rx:92,ry:36,fill:MAROON},gMap);
var mct=el("text",{x:MC[0],y:MC[1]+7,"class":"iw","font-size":20,"text-anchor":"middle"},gMap);mct.textContent="A reflex";
var MAPPICK=[1,1,0,1];
function mapPick(n){MAPL.forEach(function(lv,i){lv.forEach(function(o,j){var on=i<n&&MAPPICK[i]===j;
  o.r.setAttribute("stroke",on?MAROON:"#C9CED8");o.r.setAttribute("stroke-width",on?5:2.5);o.r.setAttribute("fill",on?"#FBF1EF":"#fff");
  o.ln.setAttribute("stroke",on?MAROON:"#C9CED8");o.ln.setAttribute("stroke-width",on?5:3);});});}

/* ---- Oct 5 2026: reflex grades on the real leg ---- */
var kGradeG=el("g",{},gKnee);
var GRD=[["0","no kick",0],["1+","weak",-12],["2+","normal",-34],["3+","brisk",-48],["4+","clonus",-56]];
var kGB=GRD.map(function(g,i){var x=60+i*68,b=el("g",{style:"cursor:pointer"},kGradeG);
  var r=el("rect",{x:x,y:52,width:60,height:40,rx:9,fill:"#fff",stroke:NAVY,"stroke-width":2.5},b);
  var t=el("text",{x:x+30,y:79,"class":"tn","font-size":18,"text-anchor":"middle"},b);t.textContent=g[0];
  tx(b,x+30,108,g[1],"t",12,"middle");b._r=r;return b;});
var kGPrompt=promptAt(kGradeG,60,150,["Click a grade to see","what that reflex looks like"],140,100,128,72,36);
function gradeOn(n){kGB.forEach(function(b,i){b._r.setAttribute("stroke",i===n?MAROON:NAVY);b._r.setAttribute("stroke-width",i===n?5:2.5);b._r.setAttribute("fill",i===n?"#FBF1EF":"#fff");});}
var kBusy=false;
function kickGrade(n,a){
  if(kBusy)return Promise.resolve();kBusy=true;gradeOn(n);kneeReset();kneeExtras();kGradeG.setAttribute("display","");
  var ang=GRD[n][2];
  return strike(a).then(function(){if(!ang)return wait(500,a);kQuad.setAttribute("ry",ang<-40?38:(ang<-20?34:30));
      return tweenVal(0,ang,ang<-40?180:260,a,legAngle).then(function(){return tweenVal(ang,0,600,a,legAngle);})
      .then(function(){if(n<4)return;var seq=[-26,-18,-12];var k=0;function beat(){if(k>=seq.length)return Promise.resolve();var v=seq[k++];return tweenVal(0,v,140,a,legAngle).then(function(){return tweenVal(v,0,220,a,legAngle);}).then(beat);}return beat();});})
    .then(function(){kQuad.setAttribute("ry",28);kBusy=false;})
    .catch(function(){kBusy=false;});}
var kGradeShown=-1;
var kGradeCap=["Grade 0: no reflex at all.","Grade 1+: weaker than usual.","Grade 2+: a normal reflex.","Grade 3+: brisker than usual.","Grade 4+: very brisk, and the leg keeps jerking. That is clonus."];
function gradePlay(a){
  if(!a||reduce){gradeOn(2);return Promise.resolve();}
  kGPrompt.setAttribute("display","");
  return new Promise(function(res){var my=runId,first=true;setTimeout(function(){lockNext(true);},0);
    kGB.forEach(function(b,i){b.onclick=function(){if(my!==runId)return;kGPrompt.setAttribute("display","none");
      kickGrade(i,true).then(function(){if(my!==runId)return;cap(kGradeCap[i]);if(first){first=false;lockNext(false);res();}});};});
    var t=setInterval(function(){if(my!==runId){clearInterval(t);res();}},200);});}
/* reinforcement: tap, then pull your hands and tap again */
var kPullTxt=tx(gKnee,60,150,"Now hook your fingers together and pull hard,","tm",15,"start");
var kPullTxt2=tx(gKnee,60,170,"then tap the tendon again.","tm",15,"start");
function weakKick(a){return strike(a).then(function(){kQuad.setAttribute("ry",31);return tweenVal(0,-12,260,a,legAngle);}).then(function(){return tweenVal(-12,0,500,a,legAngle);}).then(function(){kQuad.setAttribute("ry",28);});}

makeCap();

function resetAll(){
  hide([dA,dB,dC,dD]);bulge(quad,false,QY,QH);bulge(ham,false,HY,HH);spinSlack(false);
  signs(null,null);FL.forEach(function(t){t.setAttribute("display","none");});
  tr1.setAttribute("d","");tr2.setAttribute("d","");place(hammer,370,QY-8);
  gradeHi(-1);[lat1,lat2,latT1,latT2].forEach(function(g){g.setAttribute("display","none");});
  legSigns(0);spinLab.setAttribute("display","");cap("");
  [].forEach.call(REG.cross.childNodes,function(n){n.setAttribute("display","");n.removeAttribute("stroke-dashoffset");n.removeAttribute("stroke-dasharray");});
}
/* show a hidden group and draw its first line in */
function drawIn(name,dur,a){var g=REG[name];g.setAttribute("display","");var ln=g.querySelector("polyline");return ln?reveal(ln,dur,a):Promise.resolve();}
function S(l){only(l);resetAll();}
function tap(a){return tweenPath(hammer,[[370,QY-30]],200,a).then(function(){return tweenPath(hammer,[[370,QY-8]],160,a);});}
var BASE=["mus","cord","cap"];
function W(extra){return BASE.concat(extra);}
var R1=function(k){return trainWin(66,56,308,0,1,Math.round(4+10*k),26);};

/* ======================= steps ======================= */
var STEPS=[
/* ---- 1. the arc ---- */
{sec:"The reflex arc",comp:"Competency 1",
 title:"A tap below the knee",
 text:["A reflex hammer taps the tendon just below the kneecap, and the lower leg kicks forward. It happens before the person has decided anything, and it happens the same way every time.", "The figure shows a leg from the side, bent at the knee. The quadriceps runs along the top of the thigh and straightens the knee; the hamstrings run underneath and bend it. The patellar tendon runs from the kneecap to the shinbone. At the top right is a cross section of the spinal cord, with the dorsal root entering at the back and the ventral root leaving at the front. Use the hammer and watch what happens."],
 auto:true,
 desc:"A leg drawn from the side, bent at the knee, with the quadriceps along the top of the thigh, the hamstrings underneath, the kneecap, and the patellar tendon running to the shinbone. A spinal cord cross section sits at the top right. A gold arrow points to a reflex hammer with the words Use the hammer to tap the patellar tendon. When the student clicks the hammer, it strikes the tendon, the quadriceps thickens, and the lower leg swings forward and back.",
 pre:function(){S(["knee","cap"]);kneeReset();kSN.setAttribute("display","none");kMN.setAttribute("display","none");kInhG.setAttribute("display","none");kLabs.setAttribute("display","none");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");},
 play:function(a){cap("");return waitTap(a).then(function(){return strike(a);}).then(function(){kQuad.setAttribute("ry",36);return tweenVal(0,-34,260,a,legAngle);}).then(function(){return wait(250,a);}).then(function(){return tweenVal(-34,0,650,a,legAngle);}).then(function(){kQuad.setAttribute("ry",28);cap("You tapped the tendon, and the leg kicked.");});}},
{title:"Where the signal goes",
 text:["The tap stretches the quadriceps for a moment. Somewhere a sensor detects that stretch, and somewhere a decision is made to contract the same muscle."],
 ask:"Trace the path you think the signal takes from the stretched muscle to the muscle contracting. Where does it have to go, and where is the decision made?",
 ans:["Into the spinal cord and straight back out. A sensory neuron carries the message from a stretch sensor in the quadriceps into the spinal cord through the dorsal root, the back root. Inside the cord it passes the message to a motor neuron, which carries it back out through the ventral root, the front root, to the quadriceps. The quadriceps contracts and the leg kicks. The brain is not part of this loop, which is why your leg kicks before you even know you were tapped.", "A path with these five parts is called a reflex arc: a receptor, a sensory neuron, an integrating center where the decision is made (here, the spinal cord), a motor neuron, and an effector, the muscle or gland that responds (here, the quadriceps). Sensory messages always come into the cord through the dorsal root, and motor messages always leave through the ventral root."],
 name:"reflex arc",
 desc:"The leg and cord with the neurons drawn in: a maroon sensory neuron from the spindle in the quadriceps up through the dorsal root and its ganglion into the cord, and a navy motor neuron from the ventral horn out through the ventral root back to the quadriceps. The student taps the tendon with the hammer; a maroon dot runs up the sensory neuron, a gold synapse lights in the cord, a navy dot runs back down the motor neuron, the quadriceps thickens and the leg kicks. Numbered labels then name the five parts of the reflex arc.",
 pre:function(){S(["knee","cap"]);kneeReset();kSN.setAttribute("display","");kMN.setAttribute("display","");kInhG.setAttribute("display","none");kLabs.setAttribute("display","");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");},
 play:function(a){cap("");return waitTap(a).then(function(){return kneeJerk(a);}).then(function(){kLabs.setAttribute("display","none");kFive.setAttribute("display","");cap("The signal went from the muscle to the cord and back.");});}},
{title:"Counting synapses",
 text:["Look at the path inside the gray matter on the figure. The sensory neuron enters, runs down to the ventral horn, and ends on the motor neuron."],
 ask:"How many connections, or synapses, does the knee jerk signal cross inside the spinal cord? Why does having so few make it fast, and what can a reflex with only one connection not do?",
 ans:["Just one. There are only two neurons, the sensory neuron and the motor neuron, and they connect once inside the spinal cord. (The connection between the motor neuron and the muscle does not count here.) A reflex with one connection is called monosynaptic. Each connection adds a tiny delay, about half a thousandth of a second, so one connection makes this the fastest kind of reflex.", "The trade-off is that it can only do one simple thing. Most reflexes have extra neurons in the middle, called interneurons, so they have two or more connections; these are called polysynaptic. Interneurons let one signal spread to many muscles, let several signals combine, and can calm a neuron down as well as excite it. A one-connection reflex can do none of that."],
 name:"monosynaptic reflex",
 desc:"The student taps the tendon again. As the signal passes through the cord, a gold ring circles the single point where the sensory neuron meets the motor neuron, labeled one synapse.",
 pre:function(){S(["knee","cap"]);kneeReset();kSN.setAttribute("display","");kMN.setAttribute("display","");kInhG.setAttribute("display","none");kLabs.setAttribute("display","");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");},
 play:function(a){cap("");return waitTap(a).then(function(){return kneeJerk(a);}).then(function(){kOne.setAttribute("display","");cap("Only one connection inside the cord.");});}},
{title:"Cutting the dorsal root",
 text:["An injury cuts the dorsal root on this side at this level of the cord, and leaves the ventral root intact."],
 ask:"After the cut, does the knee jerk still happen? Can the person feel the tap? Can they still straighten the knee on purpose?",
 ans:["The knee jerk is gone, because the message from the muscle can no longer get into the spinal cord. The person also cannot feel the tap, because that same back root carries the feeling up toward the brain.", "But they can still straighten the knee on purpose. Commands from the brain travel down the spinal cord to the same motor neurons, and those still reach the muscle through the front root, which is not cut. If the front root were cut instead, the opposite would happen: they could feel the tap, but neither the reflex nor a voluntary kick would reach the muscle. Checking feeling and movement separately like this is how clinicians figure out where an injury is."],
 desc:"A maroon X cuts the dorsal root. The student taps the tendon; the maroon dot runs up the sensory neuron and stops at the cut. Nothing reaches the cord, the quadriceps stays the same, and the leg does not move.",
 pre:function(){S(["knee","cap"]);kneeReset();kSN.setAttribute("display","");kMN.setAttribute("display","");kInhG.setAttribute("display","none");kLabs.setAttribute("display","");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","");kPrompt.setAttribute("display","none");},
 play:function(a){cap("");return waitTap(a).then(function(){return kneeJerk(a,{cut:true});}).then(function(){cap("The signal stops at the cut, so the leg does not move.");});}},
{sec:"Kinds of reflexes",comp:"Competency 1",
 title:"Every reflex follows one path",
 text:["Every reflex your nervous system makes follows the same five-part path. Something happens, like a tap or a hot stove; that is the stimulus. A sensor picks it up. A sensory neuron carries the message to your spinal cord or brain. The spinal cord or brain decides what to do. Then a motor neuron carries the order out to a muscle or gland, which responds.", "Most reflexes work to undo a change, which is called negative feedback. Some also get a head start, which is called feedforward: you brace yourself before a collision, before anything has even hit you."],
 name:"reflex pathway",
 auto:true,
 desc:"Boxes light up in order along the path of every neural reflex: stimulus, receptor, sensory neuron, integrating center in the CNS, efferent neuron, target, response. A second row shows that in autonomic reflexes the efferent side is two neurons, preganglionic and postganglionic, with a synapse in an autonomic ganglion.",
 pre:function(){S(["flow","cap"]);flowShow(0);flowAuto(false);},
 play:function(a){var k=0;function nxt(){if(k>=7)return Promise.resolve();k++;flowShow(k);return wait(260,a).then(nxt);}return nxt().then(function(){flowAuto(true);cap("Every reflex uses this same path.");});}},

{title:"Four ways to sort a reflex",
 text:["Scientists sort reflexes in four ways, and every reflex gets one label from each.", "First, what does it control? Somatic reflexes move skeletal muscles, like the knee jerk. Autonomic reflexes control smooth muscle, the heart, glands and fat tissue.", "Second, where is the decision made? Spinal reflexes are handled in the spinal cord. Cranial reflexes are handled in the brain.", "Third, were you born with it? Innate reflexes are built in, like a newborn turning toward a touch on the cheek. Learned reflexes come from experience, like Pavlov's dogs drooling when they heard the bell that meant food.", "Fourth, how many neurons are in the path? Monosynaptic reflexes have one connection, called a synapse, between the sensory and motor neuron. Polysynaptic reflexes have two or more."],
 ask:"Shine a light in someone's eye and the pupil constricts. Give this reflex a label from each of the four ways of sorting.",
 ans:["It is autonomic, because the muscle that narrows the pupil is smooth muscle in the colored part of the eye, the iris. It is cranial, because the decision is made in the brain, not the spinal cord. It is innate: babies are born with it, and it is checked in every newborn exam. And it is polysynaptic. In fact every autonomic reflex is, because the path out of the brain or spinal cord always uses two motor neurons in a row, so there is always more than one connection. Only reflexes that move skeletal muscle can be monosynaptic.", "Autonomic reflexes are also called visceral reflexes, because many involve the internal organs. Some, like emptying the bladder, are handled in the spinal cord, and toilet training is the brain learning to override that simple reflex. Others are handled in the brain, which controls heart rate, blood pressure, breathing, body temperature and reflexes like swallowing, coughing, sneezing and vomiting. Knowing where a reflex is handled tells you where to look when it fails."],
 name:"autonomic reflex",
 desc:"A mind map with A reflex in a maroon oval at the center and four navy branches, each a question: What does it control? Where is it handled? Born with it or learned? How many connections? Each question splits into two answer boxes with a short explanation: somatic or autonomic, spinal or cranial, innate or learned, monosynaptic or polysynaptic. After the prediction, the pupil reflex's answer on each branch lights up in maroon one at a time: autonomic, cranial, innate, polysynaptic.",
 pre:function(){S(["four2","cap"]);mapPick(0);},
 play:function(a){var k=0;function nxt(){if(k>=4)return Promise.resolve();k++;mapPick(k);return wait(550,a).then(nxt);}return nxt().then(function(){cap("The pupil reflex gets one answer on each branch.");});}},
{sec:"The stretch reflex",comp:"Competency 2",
 title:"A sensor inside the muscle",
 text:["Your muscles have their own sensors that tell your spinal cord and brain where your body is and how hard it is working. Two of them matter most here: the muscle spindle and the Golgi tendon organ.", "A muscle spindle is a tiny capsule tucked in among the ordinary muscle fibers, lying alongside them. Inside it are a few small special fibers, and a sensory nerve ending is wrapped around their middle. Almost every skeletal muscle has many spindles.", "Even when your muscle is relaxed, the middle of the spindle is a little bit stretched, so its sensory neuron is always sending some signals. Watch the readout at the top: a few signals at rest."],
 name:"muscle spindle",
 auto:true,
 desc:"The leg figure, with the muscle spindle inside the quadriceps and its maroon sensory neuron running to the spinal cord. A readout at the top left draws the spindle sensory neuron firing a few evenly spaced spikes while the leg hangs at rest.",
 pre:function(){S(["knee","cap"]);kneeReset();kneeExtras();kSN.setAttribute("display","");kMN.setAttribute("display","none");kInhG.setAttribute("display","none");kLabs.setAttribute("display","none");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");kTrainG.setAttribute("display","");},
 play:function(a){return growTrain(kTr,kRest,1100,a).then(function(){cap("The spindle sends signals even when you are still.");});}},
{title:"Stretch the muscle",
 text:["Try it on a friend whose eyes are closed: their arm is held out, elbow bent, palm up, holding a book. You suddenly add a second book. Or the quadriceps is pulled longer by a tendon tap."],
 ask:"What happens to the spindle's firing rate, and what does the stretched muscle do in response?",
 ans:["The extra weight pulls the hand down, which stretches the biceps and the spindles inside it. The spindles fire faster. In the spinal cord, their sensory neurons connect directly to the motor neurons of that same muscle, so the biceps contracts and lifts the arm back up. As the stretch goes away, the spindles slow down again.", "This is the stretch reflex. It protects a muscle from being overstretched, and it works by undoing the change: the muscle is stretched, so it pulls back. The knee jerk is the same reflex, set off by a tap instead of a weight."],
 name:"stretch reflex",
 desc:"A gold arrow asks the student to push the foot back to stretch the quadriceps. When they click the lower leg, the knee bends further, the quadriceps and the spindle inside it lengthen, and the readout fills with closely packed spikes. A maroon dot runs up the sensory neuron, a navy dot runs back down the motor neuron, the quadriceps thickens with a plus sign, and the leg swings back to where it started.",
 pre:function(){S(["knee","cap"]);kneeReset();kneeExtras();kSN.setAttribute("display","");kMN.setAttribute("display","");kInhG.setAttribute("display","none");kLabs.setAttribute("display","");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");kTrainG.setAttribute("display","");kTr.setAttribute("d",kRest(1));},
 play:function(a){cap("");return waitOn(kPushHit,kPromptS,a).then(function(){return stretchReflex(a);}).then(function(){cap("Stretch the muscle, and it pulls back.");});}},
{title:"The muscle on the other side",
 text:["Muscles work in pairs around a joint. The quadriceps straightens the knee, and the hamstrings bend it, so they pull in opposite directions.", "One more fact you need: nerves can only tell a skeletal muscle to contract. There is no signal that tells a muscle to relax. A muscle relaxes only when its motor neuron goes quiet."],
 ask:"While the quadriceps contracts, what has to happen to the hamstrings so the knee can straighten? Where in the body is that decided?",
 ans:["The hamstrings have to relax, or they would fight the quadriceps and the knee could not straighten. Because a muscle cannot be told to relax directly, this is arranged inside the spinal cord. The sensory neuron from the spindle splits into branches. Some branches excite the motor neurons to the quadriceps. Others connect to a small calming neuron, an inhibitory interneuron, which quiets the motor neurons to the hamstrings. With no signal coming in, the hamstrings relax.", "This is called reciprocal inhibition. Without that calming neuron, both muscles would contract at once, the knee would stiffen, and the kick would be weak."],
 name:"reciprocal inhibition",
 desc:"The leg figure with a gray inhibitory interneuron in the cord and a dashed navy motor neuron to the hamstrings. The student taps the tendon with the hammer. The sensory signal splits: one dot goes to the quadriceps motor neuron and the quadriceps thickens with a plus sign; another goes through the interneuron to the hamstring motor neuron, and the hamstrings thin with a minus sign and the label hamstrings relax. The leg kicks.",
 pre:function(){S(["knee","cap"]);kneeReset();kneeExtras();kSN.setAttribute("display","");kMN.setAttribute("display","");kInhG.setAttribute("display","");kLabs.setAttribute("display","");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");},
 play:function(a){cap("");return waitTap(a).then(function(){return kneeJerk(a,{inhibit:true});}).then(function(){kQb.setAttribute("display","");kHb.setAttribute("display","");kHrel.setAttribute("display","");cap("The quadriceps contracts while the hamstrings relax.");});}},
{title:"Keeping the spindle taut",
 text:["During a strong voluntary contraction, the quadriceps shortens. The spindle lies alongside the working fibers, so it shortens too."],
 ask:"If only the alpha motor neurons fired, what would happen to the spindle and to the information it sends?",
 ans:["The spindle would go loose. A loose spindle is not stretched, so it would go quiet, and the spinal cord would lose track of the muscle's length right when it matters most.", "Special motor neurons called gamma motor neurons fix this. They tighten the two ends of the fibers inside the spindle, which keeps its middle stretched while the whole muscle shortens. The brain fires the regular motor neurons and the gamma motor neurons together, which is called alpha-gamma coactivation, so the spindle keeps reporting at every length."],
 name:"alpha-gamma coactivation",
 desc:"The quadriceps thickens and shortens, and the spindle flattens to a thin slack line while its readout drops to almost nothing. Then a gold dashed gamma motor neuron fires into the ends of the spindle, the spindle returns to its full shape, and the readout recovers.",
 pre:function(){S(W(["spin","ia","tr1","sig"]));tr1.setAttribute("d",R1(0.2));},
 play:function(a){bulge(quad,true,QY,QH);spinSlack(true);tr1.setAttribute("d",trainWin(66,56,308,0,1,1,26));cap("A loose spindle goes almost quiet.");
   return wait(900,a).then(function(){return Promise.all([drawIn("gam",1000,a),run(dD,GAM,1000,a)]);}).then(function(){spinSlack(false);tr1.setAttribute("d",R1(0.3));cap("Gamma motor neurons keep the spindle tight.");});}},

/* ---- 3. the tendon organ ---- */
{sec:"The Golgi tendon organ",comp:"Competency 3",
 title:"A sensor in the tendon",
 text:["The second sensor sits where the muscle joins its tendon. A Golgi tendon organ is a small bundle of tendon fibers with nerve endings woven between them.", "When the muscle pulls, the tendon tightens like a stretched rubber band, the fibers squeeze the nerve endings, and they fire. So the tendon organ mostly tells you how hard the muscle is pulling, and is not very sensitive to stretch.", "To keep the two sensors straight: the spindle reports how long the muscle is, and the tendon organ reports how hard it is pulling."],
 name:"Golgi tendon organ",
 auto:true,
 desc:"A small gold zigzag at the junction of the quadriceps and its tendon marks the tendon organ. Its gold afferent runs up and into the dorsal root, beside the spindle afferent.",
 pre:function(){S(W(["gto","ib"]));},
 play:function(a){return wait(300,a).then(function(){cap("The tendon organ feels how hard the muscle pulls.");});}},

{title:"Lifting a heavier load",
 text:["You hold a load with the knee straight and the load is slowly increased. The quadriceps contracts harder and harder to hold it."],
 ask:"As tension rises, what does the tendon organ afferent do, and what does its reflex do to the quadriceps?",
 ans:["It fires faster and faster as the pull on the tendon grows. In the classic textbook picture, its signal reaches a calming neuron in the spinal cord, which quiets the motor neurons to that same muscle, so the muscle eases off. This is the Golgi tendon reflex, also called autogenic inhibition. Notice it is the opposite of the spindle: the spindle reflex makes its own muscle contract, and the tendon organ reflex makes its own muscle relax.", "Your textbook adds an update. Researchers now think the tendon organ's main job is to report how hard the muscle is pulling to the spinal cord and brain, which combine it with spindle information to fine-tune posture and movement. Know the reflex for your competency, and know that its biggest job is sending information."],
 name:"Golgi tendon reflex",
 desc:"The quadriceps thickens as the load increases. The tendon organ readout at the bottom fills with more and more spikes. A gold dot runs into the cord, through an inhibitory interneuron, onto the quadriceps motor neuron, and the quadriceps gets a minus sign.",
 pre:function(){S(W(["gto","mne","tr2","sig","sign"]));bulge(quad,true,QY,QH);},
 play:function(a){return growTrain(tr2,function(k){return trainWin(66,448,308,0,1,Math.round(2+14*k),26);},1100,a).then(function(){return Promise.all([drawIn("ib",1100,a),run(dD,IB,1100,a)]);}).then(function(){bulge(quad,false,QY,QH);signs(M,null);cap("High tension tells the muscle to ease off.");});}},

{title:"Spindle or tendon organ",
 text:["The knee is held perfectly still while the load slowly increases. The muscle is working harder, but its length does not change. Both readouts are shown."],
 ask:"Which afferent's firing rises more, the spindle's or the tendon organ's, and why?",
 ans:["The tendon organ's. The muscle stays the same length, so the spindle, which reports length, keeps firing at a steady rate. The pull on the tendon keeps rising, so the tendon organ, which reports pull, fires faster and faster.", "Where each sensor sits explains this. The tendon organ is in line with the muscle, so it feels the whole pull whether or not the muscle changes length. The spindle lies alongside the muscle fibers, so it only changes when the muscle gets longer or shorter. When you lift something heavy, all of these are active at once: the regular motor neurons, the gamma motor neurons, the spindles and the tendon organs."],
 desc:"The spindle readout at the top stays at a steady, moderate rate. The tendon organ readout at the bottom rises from a few spikes to many.",
 pre:function(){S(W(["spin","gto","ia","ib","tr1","tr2"]));bulge(quad,true,QY,QH);tr1.setAttribute("d",R1(0.25));tr2.setAttribute("d",trainWin(66,448,308,0,1,2,26));},
 play:function(a){return growTrain(tr2,function(k){return trainWin(66,448,308,0,1,Math.round(2+14*k),26);},1300,a).then(function(){cap("Same length, but the pull keeps rising.");});}},

/* ---- 4. withdrawal and crossed extensor ---- */
{sec:"Withdrawal and crossed extensor",comp:"Competency 4",
 title:"Stepping on a tack",
 text:["A person standing on both feet steps on a tack with the right foot. Nociceptors, the receptors for damaging stimuli, fire in the skin of that foot, and their sensory neurons enter the cord.","The figure has changed: the cord is at the top, and below it two legs stand on the floor, seen from the side. On each thigh the flexors at the back bend the hip and knee and lift the foot, and the extensors at the front straighten the joints and bear weight. Click the tack to step on it."],
 auto:true,
 desc:"Two legs stand side by side on a floor line, seen from the side, under a small spinal cord at the top center. The right leg is on the left of the figure and the left leg on the right. Each thigh has flexors at the back and extensors at the front. A gold tack sits under the right foot, and an arrow asks the student to click it. When they do, a maroon dot runs from the right foot up into the spinal cord.",
 pre:function(){S(["legs2","cap"]);legsReset();legSigns(0);},
 play:function(a){cap("");return waitOn(tack,tackPrompt,a).then(function(){return run(dN,[[226,470],[150,420],[150,180],[300,130],[420,110]],1100,a);}).then(function(){cap("Pain receptors in the right foot fire.");});}},
{title:"The right leg",
 text:["The signal from the nociceptors reaches the cord on the right side, and the primary sensory neuron diverges onto many interneurons."],
 ask:"Which muscles in the right leg contract and which relax, and what does the cord need in order to do both?",
 ans:["The muscles that bend the right leg, the flexors, contract and lift the foot off the tack, and the muscles that straighten it, the extensors, relax. Inside the spinal cord, some interneurons excite the motor neurons to the flexors, and others quiet the motor neurons to the extensors, the same trick as in the knee jerk. The signal also spreads up and down the cord, so the hip, knee and ankle all bend together.", "This is the withdrawal reflex, also called the flexion reflex. Because it goes through several connections, it is a little slower than the knee jerk. A branch of the same sensory neuron also carries the message up to the brain, which is when you feel the pain."],
 name:"withdrawal reflex",
 desc:"The student clicks the tack again. A maroon line runs from the tack into the cord and through interneurons, and a navy line runs back down to the right thigh. The right flexors thicken with a plus sign, the right extensors get a minus sign, and the right leg bends at the hip and knee, lifting the foot off the tack.",
 pre:function(){S(["legs2","cross","cap"]);legsReset();legSigns(0);var l=REG.cross.childNodes;l[1].setAttribute("display","none");l[2].setAttribute("display","none");l[3].setAttribute("display","none");},
 play:function(a){cap("");var l=REG.cross.childNodes;return waitOn(tack,tackPrompt,a).then(function(){return reveal(l[0],900,a);}).then(function(){l[3].setAttribute("display","");return reveal(l[3],700,a);}).then(function(){legSigns(1);musc(LR,1,0);return legTo(LR,RAISE[0],RAISE[1],700,a);}).then(function(){cap("The right leg bends and lifts off the tack.");});}},
{title:"The left leg",
 text:["The right foot is now off the ground. The whole body's weight is about to land on the left leg."],
 ask:"At that same moment, what must the left leg's muscles do, and how does the signal get there?",
 ans:["The left leg does the opposite: the muscles that straighten it contract, to hold your weight, and the muscles that bend it relax. Interneurons carry the signal across the middle of the spinal cord to the motor neurons on the other side.", "This is the crossed extensor reflex. It keeps you from falling when one foot leaves the ground. One stimulus, the tack, ends up controlling muscles in both legs and also tells the brain, and that kind of spreading is more typical of our reflexes than the simple knee jerk."],
 name:"crossed extensor reflex",
 desc:"The right leg is lifted. A gray interneuron line crosses the dashed midline of the cord and a navy line runs down to the left thigh. The left extensors thicken with a plus sign and the left flexors get a minus sign, so the left leg stays straight and holds the body's weight.",
 pre:function(){S(["legs2","cross","cap"]);legsReset();legSigns(1);musc(LR,1,0);legPose(LR,RAISE[0],RAISE[1]);var l=REG.cross.childNodes;l[1].setAttribute("display","none");l[2].setAttribute("display","none");},
 play:function(a){var l=REG.cross.childNodes;l[1].setAttribute("display","");return reveal(l[1],600,a).then(function(){l[2].setAttribute("display","");return reveal(l[2],800,a);}).then(function(){legSigns(2);musc(LL,0,1);cap("The left leg straightens to hold your weight.");});}},
{title:"Why it cannot be monosynaptic",
 text:["Count along the shortest path in the figure, from the nociceptor's sensory neuron to a motor neuron for the left leg's extensors."],
 ask:"How many connections are on that path at the very least? Why can't this reflex work with only one connection?",
 ans:["At least two connections, and usually more. The sensory neuron connects to an interneuron, which crosses the middle of the spinal cord and connects to the motor neuron, often with more interneurons in between. The withdrawal side needs interneurons too.", "A one-connection reflex could not do what this response needs. A sensory neuron can only excite, so relaxing the right extensors and the left flexors needs calming interneurons. A sensory neuron also does not cross to the other side of the cord or spread up and down it, so reaching the other leg and several joints needs interneurons as well."],
 desc:"The crossed path is highlighted: sensory neuron to interneuron to crossing interneuron to the left extensor motor neuron.",
 pre:function(){S(["legs2","cross","cap"]);legsReset();legSigns(2);musc(LR,1,0);musc(LL,0,1);legPose(LR,RAISE[0],RAISE[1]);},
 play:function(a){return wait(400,a).then(function(){cap("This path needs several connections, not one.");});}},
{title:"Without the crossed half",
 text:["Imagine the crossing interneurons were not working, as the X on the figure shows, while the withdrawal half still worked."],
 ask:"A fraction of a second after stepping on the tack, what would this person's body be doing?",
 ans:["The right leg would still bend and lift off the tack. But the left leg would get no signal to straighten, so when all the weight came down on it, the knee would give way and the person would probably fall.", "That is why these two reflexes are taught together. The withdrawal reflex protects the hurt foot, and the crossed extensor reflex protects the rest of the body from falling over."],
 desc:"A maroon X blocks the crossed path in the cord. The right leg is lifted with its flexor plus and extensor minus. The left leg gets no signal, so its extensors do not tighten and it bends at the hip and knee, buckling under the weight.",
 pre:function(){S(["legs2","cross","crossoff","cap"]);legsReset();legSigns(1);musc(LR,1,0);legPose(LR,RAISE[0],RAISE[1]);REG.cross.childNodes[2].setAttribute("display","none");},
 play:function(a){return legTo(LL,-14,38,700,a).then(function(){cap("The right leg lifts, and the left leg gives way.");});}},
{title:"When inhibition fails",
 text:["Tetanus, also called lockjaw, is caused by a bacterium that lives in soil and gets in through a wound. It makes a toxin that travels into the motor neurons and all the way back to their cell bodies in the spinal cord.", "There, the toxin blocks the synapses that calm other neurons down, the inhibitory synapses. Those synapses normally release chemicals such as glycine and GABA that make a neuron less likely to fire."],
 ask:"Using the knee jerk and withdrawal circuits, explain why blocking inhibitory synapses would cause rigid, uncontrollable muscle spasms, starting in the jaw.",
 ans:["Every reflex circuit depends on calming interneurons to keep the opposite muscle quiet. With those synapses blocked, nothing can switch the motor neurons off, so both muscles of every pair contract at the same time and lock the body rigid. The jaw clamps shut, which is where the name lockjaw comes from, and the spasms can spread to the whole body, including the muscles used for breathing.", "Patients may need a drug that temporarily paralyzes their muscles while a breathing machine breathes for them. Tetanus is rare where people get the vaccine. It shows clearly that letting a skeletal muscle relax depends completely on calming signals inside the spinal cord."],
 name:"tetanus",
 desc:"Both legs stand straight. Every muscle group, flexors and extensors on both legs, thickens and gets a maroon plus sign, because without inhibitory synapses nothing relaxes and the legs are held rigid.",
 pre:function(){S(["legs2","cap"]);legsReset();legSigns(0);},
 play:function(a){[bRF,bRE,bLF,bLE].forEach(function(b){setBadge(b,"+",MAROON);});musc(LR,1,1);musc(LL,1,1);return wait(500,a).then(function(){cap("Nothing can relax, so every muscle tightens.");});}},
{sec:"Testing reflexes",comp:"Competencies 1 and 7",
 title:"Grading a tendon reflex",
 text:["Clinicians grade a tendon reflex like the knee jerk on a scale from 0 to 4+. 0 means there is no reflex at all. 1+ is weaker than usual, 2+ is normal, 3+ is brisker than usual, and 4+ is very brisk, often with clonus, where the leg keeps jerking several times after a single tap.", "For a reflex to be normal, every neuron in the path has to work, the connection between nerve and muscle has to work, and the muscle has to contract normally. Click each grade to see what it looks like."],
 ask:"One patient's knee jerk is 0. Another's is 4+ with clonus. Where along the pathway could the problem be in each?",
 ans:["A 0, no reflex at all, means the reflex path itself is broken somewhere: the sensor, the sensory neuron, that part of the spinal cord, the motor neuron, the connection to the muscle, or the muscle. A 4+ with clonus usually means the reflex path works but the brain has lost its control over it, as after a stroke or a spinal cord injury above that level. That points to an upper motor neuron problem.", "Not every unusual reflex is a nerve problem: an ankle reflex that relaxes slowly can be a sign of an underactive thyroid. Always compare the left side with the right, because a difference between sides matters more than any one number."],
 name:"reflex grading",
 desc:"The leg figure with five grade buttons across the top: 0, no kick; 1+, weak; 2+, normal; 3+, brisk; 4+, clonus. An arrow asks the student to click a grade. Each click taps the tendon and the leg shows that grade: no movement for 0, a small kick for 1+, a normal kick for 2+, a bigger, faster kick for 3+, and for 4+ a big kick followed by several smaller repeated jerks. The caption names the grade.",
 pre:function(){S(["knee","cap"]);kneeReset();kneeExtras();kSN.setAttribute("display","none");kMN.setAttribute("display","none");kInhG.setAttribute("display","none");kLabs.setAttribute("display","none");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");kGradeG.setAttribute("display","");gradeOn(-1);kGPrompt.setAttribute("display","none");},
 play:function(a){cap("");return gradePlay(a);}},
{title:"Muscle tone",
 text:["A resting muscle is never completely limp. Muscle tone is its resistance to being stretched even when relaxed, and examiners check it by moving a relaxed limb."],
 ask:"What keeps a resting muscle slightly contracted, and what happens to its tone if the dorsal roots serving that muscle are cut?",
 ans:["The spindles. They are slightly stretched even at rest, so they keep sending signals, and that steady input keeps the motor neurons sending a small, steady signal to the muscle. That is muscle tone. Cut the back roots and the input disappears: the muscle goes completely limp, called flaccid, and its reflex is gone too, even though the motor neurons themselves are fine.", "Tone that is too low or too high usually means a problem in the nerve pathways. Low tone with no reflexes points to a break in the reflex path. High tone points somewhere else, which the next steps show."],
 name:"muscle tone",
 desc:"The spindle afferent fires a steady, slow train, and a dot travels the arc at a low rate, keeping the quadriceps slightly firm.",
 pre:function(){S(W(["spin","ia","mne","tr1","sig"]));},
 play:function(a){return growTrain(tr1,function(k){return trainWin(66,56,308,0,k,Math.round(5*k),26);},900,a).then(function(){return run(dA,IA,1000,a);}).then(function(){cap("Resting spindle signals keep a little tension in the muscle.");});}},

{title:"The brain turns reflexes up and down",
 text:["Spinal reflexes do not need the brain to work, but the brain is always adjusting them. Pathways coming down from the brain to the spinal cord mostly keep reflexes held back, so they do not overreact.", "When a patient's knee jerk is weak, the examiner often asks them to hook their fingers together and pull hard at the moment of the tap. This trick is called the Jendrassik maneuver."],
 ask:"Why would pulling on your own hands make your knee jerk bigger?",
 ans:["Pulling hard on your hands is thought to make the pathways coming down from the brain more active. That makes the spinal motor neurons readier to fire, and through the gamma motor neurons it makes the spindles more sensitive to stretch. So the same tap produces a bigger kick. It also takes the patient's attention off their knee.", "If a weak reflex gets bigger with this trick, the reflex path itself is working. If it stays absent, the path is broken somewhere. You can try this in lab with a partner."],
 name:"Jendrassik maneuver",
 desc:"The leg and cord with the reflex path drawn in. The student taps the tendon and the leg gives only a small kick, labeled a weak kick, about 1+. A message then says: now hook your fingers together and pull hard, then tap the tendon again. On the second tap the signal runs up the sensory neuron and back down the motor neuron, and the leg gives a full normal kick.",
 pre:function(){S(["knee","cap"]);kneeReset();kneeExtras();kSN.setAttribute("display","none");kMN.setAttribute("display","none");kInhG.setAttribute("display","none");kLabs.setAttribute("display","none");kFive.setAttribute("display","none");kOne.setAttribute("display","none");kCut.setAttribute("display","none");kPrompt.setAttribute("display","none");kSN.setAttribute("display","");kMN.setAttribute("display","");},
 play:function(a){cap("");return waitTap(a).then(function(){return weakKick(a);}).then(function(){cap("A weak kick, about 1+.");kPullTxt.setAttribute("display","");kPullTxt2.setAttribute("display","");return waitTap(a);}).then(function(){kPullTxt.setAttribute("display","none");kPullTxt2.setAttribute("display","none");return kneeJerk(a);}).then(function(){cap("Pulling on your hands made the kick bigger.");});}},
{title:"Stroking the sole of the foot",
 text:["Stroke the outer edge of an adult's sole firmly, from heel to toes, and the toes curl down. That is the normal flexor plantar response. In some patients, the same stroke makes the big toe extend upward and the other toes fan out."],
 ask:"That upward big toe appears after damage to the corticospinal tract. Why would losing a pathway from the brain change a reflex that is integrated in the spinal cord?",
 ans:["Because the pathway from the brain, the corticospinal tract, normally shapes how the spinal cord responds to this touch. Without it, the spinal cord falls back on a more primitive response, and the big toe goes up. This is the Babinski sign, one of the clearest signs of an upper motor neuron problem, meaning damage to the motor pathway in the brain or the spinal cord above the reflex.", "Babies normally show it until about age one to two, while that pathway is still maturing. In an adult it is never normal."],
 name:"Babinski sign",
 desc:"Two feet seen from the side, and an arrow asking the student to click to stroke the sole of each foot. When they do, a gold dot strokes along each sole. On the left, the normal adult, the toes curl down. On the right, the Babinski sign, the big toe extends upward.",
 pre:function(){S(["foot","cap"]);toeAngle(FT[0],0);toeAngle(FT[1],0);},
 play:function(a){cap("");return waitOn(soleHit,solePrompt,a).then(function(){return strokeSole(FT[0],a);}).then(function(){return tweenVal(0,25,500,a,function(v){toeAngle(FT[0],v);});}).then(function(){return strokeSole(FT[1],a);}).then(function(){return tweenVal(0,-35,500,a,function(v){toeAngle(FT[1],v);});}).then(function(){cap("The big toe going up points to damage in the brain's pathway.");});}},
{title:"Upper or lower motor neuron",
 text:["Two kinds of motor neurons control a muscle. Upper motor neurons start in the brain and run down the spinal cord. Lower motor neurons start in the spinal cord and run out to the muscle.", "Damage to either one makes the muscle weak, but they look different when a clinician examines the patient. Damage to the lower motor neuron makes the muscle floppy, with weak or missing reflexes, and over weeks the muscle shrinks and can show small twitches. Damage to the upper motor neuron makes the muscle stiff, called spasticity, with reflexes that are too strong, often repeated jerking called clonus, and a Babinski sign."],
 ask:"A patient has a weak left leg, a 4+ left knee jerk with clonus, and a Babinski sign on the left. Is this an upper or a lower motor neuron lesion, and why are the reflexes brisk instead of weak?",
 ans:["An upper motor neuron problem, in the brain or in the spinal cord above the part that controls the leg. The reflex path for the leg still works, so the knee jerk still happens, but the pathways from the brain that normally hold it back are damaged, so it is too strong. Losing that control from the brain also explains the stiff muscles and the Babinski sign.", "A lower motor neuron problem breaks the reflex path itself at its last step, so the reflex gets weaker or disappears instead."],
 name:"upper and lower motor neurons",
 desc:"The grading scale with 4+ outlined in maroon, beneath the knee jerk arc.",
 pre:function(){S(W(["spin","ia","mne","scale"]));},
 play:function(a){gradeHi(4);return wait(500,a).then(function(){cap("Strong reflexes and stiff muscles point to the brain's pathway.");});}},

{title:"Reflex or reaction",
 text:["In your lab this week you time two responses. The knee jerk appears a few tens of milliseconds after the tap. Catching a dropped ruler takes about 150 to 250 milliseconds."],
 ask:"Both responses start with a stimulus and end with a muscle contracting. Why does catching the ruler take several times longer?",
 ans:["Because its path is much longer and has many more connections. The knee jerk goes into the spinal cord and straight back out through one connection. Catching the ruler starts in your eyes, goes to the part of the brain that handles vision, then to areas that recognize the ruler is falling and decide to grab it, then to the part that controls movement, down the spinal cord, and out to your hand. Every connection and every extra bit of nerve adds time.", "This delay, called latency, is how you tell a reflex from a voluntary response. A response that comes too fast to have gone through the brain is a reflex."],
 desc:"A time line runs from 0 to 250 milliseconds. A maroon marker labeled knee jerk sits at about 30 milliseconds, and a navy marker labeled catching a ruler sits at about 200 milliseconds.",
 pre:function(){S(W(["time"]));},
 play:function(a){lat1.setAttribute("display","");latT1.setAttribute("display","");return wait(700,a).then(function(){lat2.setAttribute("display","");latT2.setAttribute("display","");cap("Fewer connections means a faster response.");});}},

/* ---- review ---- */
{sec:"Review",comp:"Competencies 1 to 4 and 7",
 title:"Summary with the scientific terms",
 text:["A reflex arc has five parts: receptor, sensory neuron, integrating center, motor neuron, effector. Sensory signals enter the cord through the dorsal root and motor signals leave through the ventral root. The stretch reflex is monosynaptic: a muscle spindle, in parallel with the muscle fibers, reports stretch and excites its own muscle, while an inhibitory interneuron relaxes the antagonist, which is reciprocal inhibition. Gamma motor neurons keep the spindle taut during contraction.","The Golgi tendon organ, in series at the tendon, reports tension; in the classic reflex it inhibits its own muscle, though its main role is informing the CNS. The withdrawal reflex flexes the injured limb and the crossed extensor reflex stiffens the other one; both are polysynaptic because they need inhibition, crossing and spread.","Reflexes are sorted by efferent division (somatic or autonomic), where they are integrated (spinal or cranial), whether they are innate or learned, and number of neurons (monosynaptic or polysynaptic); all autonomic reflexes are polysynaptic. Spindles at rest keep muscle tone. The brain holds spinal reflexes in check: reinforcement makes a reflex bigger, and an upper motor neuron lesion gives brisk reflexes, clonus, spasticity and a Babinski sign, while a lower motor neuron lesion gives weak or absent reflexes and low tone."],
 ask:"Without scrolling back, explain why the stretch reflex makes its own muscle contract while the tendon organ reflex makes its own muscle relax, and say what each one is protecting.",
 ans:["The spindle reports the muscle's length. When the muscle is stretched, its reflex makes that same muscle contract to bring it back, which protects posture and keeps a joint from collapsing under a sudden stretch. The tendon organ reports how hard the muscle is pulling. When that pull gets very high, its reflex makes that same muscle ease off, through a calming interneuron, which protects the muscle and tendon from being injured.", "If part of this did not come back to you, go back to those steps before your Competency Study Guide, and draw the circuits from memory before you check them."],
 desc:"The full figure: both muscles, the spindle and the tendon organ, and the cord with the sensory neuron, both motor neurons, the inhibitory interneuron and the tendon organ afferent.",
 pre:function(){S(W(["spin","gto","ia","ib","mne","mnf","inh","sign","sig"]));},
 play:function(a){return run(dA,IA,1000,a).then(function(){bulge(quad,true,QY,QH);signs("+",M);cap("One sensor reports length, the other reports pull.");});}}
];
