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
 text:["A reflex hammer taps the tendon just below the kneecap, and the lower leg kicks forward. It happens before the person has decided anything, and it happens the same way every time.","On the left are two muscle groups of the thigh: the quadriceps on top, which straightens the knee, and the hamstrings below, which bend it. On the right is a cross section of the spinal cord, with the dorsal root entering at the back and the ventral root leaving at the front."],
 auto:true,
 desc:"Two thigh muscles are drawn on the left, the quadriceps on top and the hamstrings below, each ending in a tendon. A hammer taps the quadriceps tendon. On the right is a spinal cord cross section with gray matter shaped like a butterfly, a dorsal root at the back and a ventral root at the front.",
 pre:function(){S(W(["hammer"]));},
 play:function(a){return tap(a).then(function(){cap("Tap the tendon, the leg kicks");});}},

{title:"Where the signal goes",
 text:["The tap stretches the quadriceps for a moment. Somewhere a sensor detects that stretch, and somewhere a decision is made to contract the same muscle."],
 ask:"Trace the path you think the signal takes from the stretched muscle to the muscle contracting. Where does it have to go, and where is the decision made?",
 ans:["Into the spinal cord and straight back out. A sensory neuron carries the signal from a stretch receptor in the muscle through the dorsal root into the cord. Inside the cord it synapses on a motor neuron, and the motor neuron carries the signal out through the ventral root to the quadriceps, which contracts. The brain is not in this loop, which is why the kick comes before you know about the tap.","A pathway with these five parts is a reflex arc: a receptor, a sensory (afferent) neuron, an integrating center, here the spinal cord, a motor (efferent) neuron, and an effector, here the quadriceps. Sensory information always enters the cord through the dorsal root, and motor output always leaves through the ventral root."],
 name:"reflex arc",
 desc:"A maroon sensory neuron runs from a spindle inside the quadriceps, through the dorsal root and its ganglion, into the gray matter, down to a navy motor neuron in the ventral horn. The motor neuron leaves through the ventral root and runs back to the quadriceps. A dot travels the loop, the quadriceps thickens, and labels number the five parts.",
 pre:function(){S(W(["hammer","spin","five","sig","sign"]));},
 play:function(a){return tap(a).then(function(){return Promise.all([drawIn("ia",1300,a),run(dA,IA,1300,a)]);}).then(function(){return Promise.all([drawIn("mne",1000,a),run(dB,MNE,1000,a)]);})
   .then(function(){bulge(quad,true,QY,QH);signs("+",null);FL.forEach(function(t){t.setAttribute("display","");});cap("Receptor, sensory, center, motor, effector");});}},

{title:"Counting synapses",
 text:["Look at the path inside the gray matter on the figure. The sensory neuron enters, runs down to the ventral horn, and ends on the motor neuron."],
 ask:"How many synapses does the knee jerk signal cross inside the cord? What does that number buy, and what does it cost?",
 ans:["One. The sensory neuron synapses directly on the motor neuron, with nothing in between, so this is a monosynaptic reflex. Every synapse adds a short delay, roughly half a millisecond, while transmitter is released and binds, so one synapse makes this the fastest kind of reflex there is.","What it costs is flexibility. With no interneuron, the sensory neuron can only excite, it can only reach motor neurons it contacts directly, and there is little room for anything else to adjust the response. Almost every other reflex has one or more interneurons in the integrating center, which makes it a polysynaptic reflex. More synapses mean more delay, but they let one input excite some muscles, inhibit others, and reach the other side of the body."],
 name:"monosynaptic reflex",
 desc:"The sensory neuron and the motor neuron are shown meeting at a single point in the ventral horn, marked as one synapse.",
 pre:function(){S(W(["spin","ia","mne","sig"]));},
 play:function(a){return run(dA,IA,1100,a,true).then(function(){cap("One synapse in the cord: monosynaptic");});}},

{title:"Cutting the dorsal root",
 text:["An injury cuts the dorsal root on this side at this level of the cord, and leaves the ventral root intact."],
 ask:"After the cut, does the knee jerk still happen? Can the person feel the tap? Can they still straighten the knee on purpose?",
 ans:["The knee jerk is lost, because the sensory signal can no longer enter the cord, so the arc is broken at step 2. The person cannot feel the tap either, because the same dorsal root carries that information on its way up to the brain.","But they can still straighten the knee on purpose. Voluntary commands come down the cord from the brain to the same motor neurons, and those motor neurons still reach the muscle through the intact ventral root. A cut ventral root would give the opposite pattern for movement: the tap would still be felt, but neither the reflex nor voluntary movement would reach the muscle. Keeping sensation and movement separate is how a lesion is located."],
 desc:"A maroon X cuts the dorsal root. A dot traveling along the sensory neuron stops at the cut and never reaches the cord. The motor neuron and the ventral root are intact.",
 pre:function(){S(W(["hammer","spin","ia","mne","cut","sig"]));},
 play:function(a){return tap(a).then(function(){return run(dA,IA.slice(0,3),900,a,true);}).then(function(){cap("No signal in, no reflex, no feeling");});}},

{sec:"Kinds of reflexes",comp:"Competency 1",
 title:"Four ways to sort a reflex",
 text:["The knee jerk is one kind of reflex. Reflexes are sorted four ways, and any one reflex gets a label from each.","By effector: a somatic motor reflex ends on skeletal muscle, like the knee jerk, and an autonomic reflex ends on smooth muscle, cardiac muscle or a gland, like the baroreceptor reflex that adjusts heart rate. By where it is integrated: a spinal reflex is integrated in the spinal cord, and a cranial reflex in the brain. By whether it was learned: innate reflexes are present from birth, and learned reflexes are acquired with experience, such as salivating at the smell of a favorite food. By synapses: monosynaptic or polysynaptic, which you just counted."],
 ask:"Shine a light in someone's eye and the pupil constricts. Give this reflex a label from each of the four ways of sorting.",
 ans:["It is an autonomic reflex, because its effector is smooth muscle in the iris. It is a cranial reflex, because it is integrated in the midbrain, not the spinal cord. It is innate: no one learns it. And it is polysynaptic, because the signal passes through several neurons in the brainstem before it reaches the iris.","Sorting a reflex this way tells you where to look when it fails. A missing pupil reflex sends you to the eye, the optic nerve, the midbrain or the oculomotor nerve, not to the spinal cord. You meet this reflex again in the vision walkthrough."],
 name:"autonomic reflex",
 desc:"The thigh muscles and the spinal cord cross section stay on screen while the four ways of sorting reflexes are described.",
 pre:function(){S(W(["spin","ia","mne"]));},
 play:function(a){return wait(400,a).then(function(){cap("Effector, center, learned, synapses");});}},

/* ---- 2. the stretch reflex ---- */
{sec:"The stretch reflex",comp:"Competency 2",
 title:"A sensor inside the muscle",
 text:["The receptor in the knee jerk is a muscle spindle. Each spindle is a bundle of small, specialized muscle fibers, the intrafusal fibers, wrapped in a capsule and lying parallel to the ordinary muscle fibers that do the work, the extrafusal fibers. Sensory nerve endings wrap around the middle of each intrafusal fiber.","When the muscle lengthens, the spindle is stretched with it, mechanically gated channels in the sensory endings open, and the sensory neuron fires faster. Even at rest the spindle is slightly stretched, so it fires all the time at a low rate."],
 name:"muscle spindle",
 auto:true,
 desc:"The spindle inside the quadriceps is drawn as a small capsule lying parallel to the muscle, with a gold sensory ending wrapped around its middle. A readout above shows the spindle afferent firing a few evenly spaced spikes at rest.",
 pre:function(){S(W(["spin","ia","tr1"]));},
 play:function(a){return growTrain(tr1,function(k){return trainWin(66,56,308,0,k,Math.round(5*k),26);},900,a).then(function(){cap("Spindles fire even at rest");});}},

{title:"Stretch the muscle",
 text:["Now the quadriceps is pulled longer suddenly, as the tendon tap did."],
 ask:"What happens to the spindle's firing rate, and what does the quadriceps do in response?",
 ans:["The spindle afferent fires much faster, because the stretch opens more of its mechanically gated channels. That excites the alpha motor neurons of the same muscle, and the quadriceps contracts, which shortens it back toward its starting length.","This is the stretch reflex. It works as negative feedback on muscle length: stretch is the disturbance, and the response opposes it. It is what keeps you upright when your knee starts to buckle, and the knee jerk is the same reflex set off by a tap."],
 name:"stretch reflex",
 desc:"The quadriceps is stretched. The spindle readout jumps from a few spikes to many closely packed spikes. A dot runs along the sensory neuron into the cord and back out along the motor neuron, and the quadriceps thickens, marked with a plus sign.",
 pre:function(){S(W(["spin","ia","mne","tr1","sig","sign"]));tr1.setAttribute("d",R1(0));},
 play:function(a){return growTrain(tr1,R1,700,a).then(function(){return run(dA,IA,1100,a);}).then(function(){return run(dB,MNE,900,a);}).then(function(){bulge(quad,true,QY,QH);signs("+",null);cap("Stretch in, contraction out");});}},

{title:"The muscle on the other side",
 text:["The hamstrings pull the knee the opposite way. If they contracted at the same moment as the quadriceps, the two would fight each other. But a sensory neuron can only release an excitatory transmitter."],
 ask:"What must happen to the hamstrings while the quadriceps contracts, and how can an excitatory sensory neuron make that happen?",
 ans:["The hamstrings have to relax. The spindle afferent branches inside the cord. One branch excites the quadriceps motor neuron directly, and another excites an inhibitory interneuron. That interneuron releases an inhibitory transmitter onto the hamstring motor neuron, producing IPSPs, so the hamstring motor neuron fires less and the hamstrings relax.","This is reciprocal inhibition. It is why this one reflex has a polysynaptic branch: turning something off always takes an interneuron. Without that interneuron both muscles would contract together, the knee would stiffen instead of extending, and the kick would be weak."],
 name:"reciprocal inhibition",
 desc:"A gray inhibitory interneuron sits in the middle of the gray matter. The sensory signal splits: one dot goes to the quadriceps motor neuron, which thickens the quadriceps and earns a plus sign; another goes through the interneuron to the dashed hamstring motor neuron, and the hamstrings get a minus sign.",
 pre:function(){S(W(["spin","ia","mne","sig","sign"]));},
 play:function(a){return run(dA,IA.slice(0,6),900,a).then(function(){return Promise.all([run(dB,MNE,900,a),drawIn("inh",700,a),run(dC,INH,700,a)]);}).then(function(){return drawIn("mnf",700,a);}).then(function(){bulge(quad,true,QY,QH);signs("+",M);cap("Agonist excited, antagonist inhibited");});}},

{title:"Keeping the spindle taut",
 text:["During a strong voluntary contraction, the quadriceps shortens. The spindle lies alongside the working fibers, so it shortens too."],
 ask:"If only the alpha motor neurons fired, what would happen to the spindle and to the information it sends?",
 ans:["The spindle would go slack. A slack spindle is not stretched, so its afferent would fall silent, and the cord would lose information about the muscle's length just when that information matters.","Gamma motor neurons prevent this. They contract the two ends of the intrafusal fibers, which keeps the middle of the spindle stretched as the muscle shortens. The brain fires alpha and gamma motor neurons together, which is called alpha-gamma coactivation, so the spindle keeps reporting at every muscle length."],
 name:"alpha-gamma coactivation",
 desc:"The quadriceps thickens and shortens, and the spindle flattens to a thin slack line while its readout drops to almost nothing. Then a gold dashed gamma motor neuron fires into the ends of the spindle, the spindle returns to its full shape, and the readout recovers.",
 pre:function(){S(W(["spin","ia","tr1","sig"]));tr1.setAttribute("d",R1(0.2));},
 play:function(a){bulge(quad,true,QY,QH);spinSlack(true);tr1.setAttribute("d",trainWin(66,56,308,0,1,1,26));cap("Slack spindle, almost silent");
   return wait(900,a).then(function(){return Promise.all([drawIn("gam",1000,a),run(dD,GAM,1000,a)]);}).then(function(){spinSlack(false);tr1.setAttribute("d",R1(0.3));cap("Gamma neurons keep it taut");});}},

/* ---- 3. the tendon organ ---- */
{sec:"The Golgi tendon organ",comp:"Competency 3",
 title:"A sensor in the tendon",
 text:["The second receptor sits where the muscle fibers join the tendon. A Golgi tendon organ is a bundle of collagen fibers from the tendon with a sensory nerve ending threaded between them.","The spindle lies in parallel with the muscle fibers, so it reports length. The tendon organ lies in series with them, so every bit of force the muscle makes passes through it. When the muscle contracts and pulls on the tendon, the collagen fibers squeeze the nerve ending and it fires. The tendon organ reports tension."],
 name:"Golgi tendon organ",
 auto:true,
 desc:"A small gold zigzag at the junction of the quadriceps and its tendon marks the tendon organ. Its gold afferent runs up and into the dorsal root, beside the spindle afferent.",
 pre:function(){S(W(["gto","ib"]));},
 play:function(a){return wait(300,a).then(function(){cap("In series: it feels tension");});}},

{title:"Lifting a heavier load",
 text:["You hold a load with the knee straight and the load is slowly increased. The quadriceps contracts harder and harder to hold it."],
 ask:"As tension rises, what does the tendon organ afferent do, and what does its reflex do to the quadriceps?",
 ans:["Its firing rate climbs with the tension. Inside the cord it excites an inhibitory interneuron, and that interneuron inhibits the motor neurons of the same muscle, the quadriceps, so the reflex reduces the force the muscle makes.","This is the Golgi tendon reflex. The spindle reflex makes its own muscle contract; the tendon organ reflex makes its own muscle relax. It helps protect the muscle and tendon from forces large enough to damage them, and if the load keeps climbing it can make the muscle suddenly give way, which is why you may drop something far too heavy."],
 name:"Golgi tendon reflex",
 desc:"The quadriceps thickens as the load increases. The tendon organ readout at the bottom fills with more and more spikes. A gold dot runs into the cord, through an inhibitory interneuron, onto the quadriceps motor neuron, and the quadriceps gets a minus sign.",
 pre:function(){S(W(["gto","mne","tr2","sig","sign"]));bulge(quad,true,QY,QH);},
 play:function(a){return growTrain(tr2,function(k){return trainWin(66,448,308,0,1,Math.round(2+14*k),26);},1100,a).then(function(){return Promise.all([drawIn("ib",1100,a),run(dD,IB,1100,a)]);}).then(function(){bulge(quad,false,QY,QH);signs(M,null);cap("Tension high: own muscle inhibited");});}},

{title:"Spindle or tendon organ",
 text:["The knee is held perfectly still while the load slowly increases. The muscle is working harder, but its length does not change. Both readouts are shown."],
 ask:"Which afferent's firing rises more, the spindle's or the tendon organ's, and why?",
 ans:["The tendon organ's. The muscle's length stays the same, so the spindle, which reports length, fires at a steady rate. The tension rises, so the tendon organ, which reports tension, fires faster and faster.","Position is the reason. Something in series with the muscle feels the whole pull of the contraction whether or not the muscle changes length. Something in parallel only changes when the whole muscle gets longer or shorter. Between them, the spinal cord knows both how long the muscle is and how hard it is pulling."],
 desc:"The spindle readout at the top stays at a steady, moderate rate. The tendon organ readout at the bottom rises from a few spikes to many.",
 pre:function(){S(W(["spin","gto","ia","ib","tr1","tr2"]));bulge(quad,true,QY,QH);tr1.setAttribute("d",R1(0.25));tr2.setAttribute("d",trainWin(66,448,308,0,1,2,26));},
 play:function(a){return growTrain(tr2,function(k){return trainWin(66,448,308,0,1,Math.round(2+14*k),26);},1300,a).then(function(){cap("Length steady, tension rising");});}},

/* ---- 4. withdrawal and crossed extensor ---- */
{sec:"Withdrawal and crossed extensor",comp:"Competency 4",
 title:"Stepping on a tack",
 text:["A person standing on both feet steps on a tack with the right foot. Nociceptors, the receptors for damaging stimuli, fire in the skin of that foot, and their sensory neurons enter the cord.","The figure has changed: the cord is at the top, and each leg is shown as a column of flexors, which bend the joints and lift the foot, and extensors, which straighten the joints and bear weight."],
 auto:true,
 desc:"A small spinal cord cross section sits at the top center. Below it, the right leg is on the left of the figure and the left leg on the right, each drawn as a column split into flexors and extensors. A gold tack sits under the right foot.",
 pre:function(){S(["legs","cap"]);},
 play:function(a){return wait(300,a).then(function(){cap("Nociceptors fire in the right foot");});}},

{title:"The right leg",
 ask:"Which muscles in the right leg contract and which relax, and what does the cord need in order to do both?",
 text:["The signal from the nociceptors reaches the cord on the right side."],
 ans:["The right flexors contract and lift the foot off the tack, and the right extensors are inhibited so they do not resist. The sensory neurons excite interneurons; some interneurons excite the flexor motor neurons, and inhibitory interneurons quiet the extensor motor neurons. Because the signal spreads through interneurons to several segments of the cord, the hip, knee and ankle all flex together.","This is the flexion reflex, also called the withdrawal reflex. It is polysynaptic, and the stronger the stimulus, the more segments join in and the bigger the withdrawal."],
 name:"withdrawal reflex",
 desc:"A maroon line runs from the tack up into the cord and through interneurons. The right flexors get a maroon plus sign and the right extensors a navy minus sign.",
 pre:function(){S(["legs","cross","cap"]);var l=REG.cross.childNodes;l[1].setAttribute("display","none");l[2].setAttribute("display","none");l[3].setAttribute("display","none");},
 play:function(a){var l=REG.cross.childNodes;return reveal(l[0],900,a).then(function(){l[3].setAttribute("display","");return reveal(l[3],700,a);}).then(function(){legSigns(1);cap("Right flexors on, right extensors off");});}},

{title:"The left leg",
 text:["The right foot is now off the ground. The whole body's weight is about to land on the left leg."],
 ask:"At that same moment, what must the left leg's muscles do, and how does the signal get there?",
 ans:["The left leg has to do the opposite: its extensors contract to straighten it and hold the body's weight, and its flexors are inhibited. Interneurons carry the signal across the midline of the cord to the motor neurons on the other side.","This is the crossed extensor reflex. It has to happen at the same instant as the withdrawal, because a person who lifted one foot without stiffening the other leg would fall. Together, the two reflexes move you off the tack and keep you standing."],
 name:"crossed extensor reflex",
 desc:"A gray interneuron line crosses the dashed midline of the cord, and a navy line runs down to the left leg. The left extensors get a maroon plus sign and the left flexors a navy minus sign, opposite to the right leg.",
 pre:function(){S(["legs","cross","cap"]);legSigns(1);var l=REG.cross.childNodes;l[1].setAttribute("display","none");l[2].setAttribute("display","none");},
 play:function(a){var l=REG.cross.childNodes;l[1].setAttribute("display","");return reveal(l[1],600,a).then(function(){l[2].setAttribute("display","");return reveal(l[2],800,a);}).then(function(){legSigns(2);cap("Left extensors on: weight held");});}},

{title:"Why it cannot be monosynaptic",
 text:["Count along the shortest path in the figure, from the nociceptor's sensory neuron to a motor neuron for the left leg's extensors."],
 ask:"How many synapses are on that path at the least, and why can this response never be monosynaptic?",
 ans:["At least two, and usually more: the sensory neuron synapses on an interneuron, which crosses the midline and synapses on the motor neuron, often with more interneurons between. The withdrawal side also needs interneurons, for inhibition and to reach several segments.","A monosynaptic arc cannot do any of what this response needs. A sensory neuron's transmitter only excites, so inhibiting the right extensors and left flexors needs inhibitory interneurons. Its axon does not cross the midline or spread up and down the cord, so reaching the other leg and several joints needs interneurons too."],
 desc:"The crossed path is highlighted: sensory neuron to interneuron to crossing interneuron to the left extensor motor neuron.",
 pre:function(){S(["legs","cross","cap"]);legSigns(2);},
 play:function(a){return wait(400,a).then(function(){cap("Interneurons: inhibit, cross, spread");});}},

{title:"Without the crossed half",
 text:["Imagine the crossing interneurons were not working, as the X on the figure shows, while the withdrawal half still worked."],
 ask:"A fraction of a second after stepping on the tack, what would this person's body be doing?",
 ans:["The right leg would still flex and lift off the tack. But the left leg would get no signal to stiffen, so when all the weight came down on it, the knee would buckle and the person would likely fall.","That is why the two reflexes are taught as a pair. Withdrawal protects the injured foot, and the crossed extensor reflex protects the rest of the body from the withdrawal."],
 desc:"A maroon X blocks the crossed path in the cord. The right leg has its flexor plus and extensor minus. The left leg has no signs at all.",
 pre:function(){S(["legs","cross","crossoff","cap"]);legSigns(1);REG.cross.childNodes[2].setAttribute("display","none");},
 play:function(a){return wait(400,a).then(function(){cap("Right leg lifts, left leg buckles");});}},

/* ---- 5. testing ---- */
{sec:"Testing reflexes",comp:"Competencies 1 and 7",
 title:"Grading a tendon reflex",
 text:["Clinicians grade a deep tendon reflex such as the knee jerk on a scale from 0 to 4+. 0 is absent, 1+ is less than usual, 2+ is normal, 3+ is brisker than usual, and 4+ is very brisk, often with clonus, a rhythmic jerking that repeats after one tap. The scale is the same on both sides, so a difference between left and right matters more than any single number."],
 ask:"One patient's knee jerk is 0. Another's is 4+ with clonus. Where along the pathway could the problem be in each?",
 ans:["An absent reflex means the arc itself is broken somewhere: at the receptor, in the sensory neuron or dorsal root, in that segment of the cord, in the motor neuron or ventral root, or at the muscle. These are lower motor neuron problems and problems with the sensory side.","A very brisk reflex with clonus usually means the arc is intact but the brain's control over it is not. Pathways descending from the brain normally hold spinal reflexes in check, and when they are damaged, for example after a stroke or a spinal cord injury above that level, the reflex is exaggerated. That pattern points to an upper motor neuron lesion."],
 desc:"Five boxes along the bottom show the grading scale: 0 absent, 1+ less than usual, 2+ normal, 3+ brisker than usual, 4+ very brisk with clonus. The 0 box and then the 4+ box are outlined in maroon.",
 pre:function(){S(W(["spin","ia","mne","scale"]));},
 play:function(a){gradeHi(0);return wait(800,a).then(function(){gradeHi(4);cap("0: arc broken. 4+: control lost");});}},

{title:"Muscle tone",
 text:["A resting muscle is never completely limp. Even when you are relaxed, a few of its motor units are firing, which keeps it slightly firm. That steady, low level of contraction is muscle tone."],
 ask:"What keeps a resting muscle slightly contracted, and what happens to its tone if the dorsal roots serving that muscle are cut?",
 ans:["The muscle spindles. They are slightly stretched even at rest, so they fire all the time, and that steady input keeps a few alpha motor neurons firing. That is the stretch reflex running quietly in the background. Cut the dorsal roots and that input disappears: the muscle goes limp, or flaccid, and its tendon reflex is gone too, even though the motor neurons are intact.","So tone and the tendon reflex depend on the same arc. Low tone with absent reflexes points to a break in the arc. High tone points somewhere else, which the next steps show."],
 name:"muscle tone",
 desc:"The spindle afferent fires a steady, slow train, and a dot travels the arc at a low rate, keeping the quadriceps slightly firm.",
 pre:function(){S(W(["spin","ia","mne","tr1","sig"]));},
 play:function(a){return growTrain(tr1,function(k){return trainWin(66,56,308,0,k,Math.round(5*k),26);},900,a).then(function(){return run(dA,IA,1000,a);}).then(function(){cap("Spindles at rest keep the tone");});}},

{title:"The brain turns reflexes up and down",
 text:["Spinal reflexes run without the brain, but the brain is always adjusting them. Descending pathways from the brain end on spinal motor neurons and interneurons, and on gamma motor neurons, and most of their net effect is to hold spinal reflexes in check.","An examiner tapping a weak knee jerk often asks the patient to hook the fingers of both hands together and pull hard at the moment of the tap. This is the Jendrassik maneuver."],
 ask:"Why would pulling on your own hands make your knee jerk bigger?",
 ans:["Pulling hard on the hands is thought to raise activity in descending pathways, which makes the spinal motor neurons more excitable and, through gamma motor neurons, makes the spindles more sensitive to stretch. The same tap then produces a bigger reflex. It also takes the patient's attention off the knee.","If a weak reflex gets bigger with reinforcement, the arc itself is intact. If it stays absent, the arc is broken somewhere. You can try this in lab with a partner."],
 name:"Jendrassik maneuver",
 desc:"The knee jerk arc is shown, with the reflex grading scale below. The outline moves from 1+ up to 2+ as the reflex is reinforced.",
 pre:function(){S(W(["hammer","spin","ia","mne","scale","sig","sign"]));gradeHi(1);},
 play:function(a){return tap(a).then(function(){return run(dA,IA,900,a);}).then(function(){return run(dB,MNE,700,a);}).then(function(){gradeHi(2);bulge(quad,true,QY,QH);signs("+",null);cap("Reinforced: a bigger reflex");});}},

{title:"Stroking the sole of the foot",
 text:["Stroke the outer edge of an adult's sole firmly, from heel to toes, and the toes curl down. That is the normal flexor plantar response. In some patients, the same stroke makes the big toe extend upward and the other toes fan out."],
 ask:"That upward big toe appears after damage to the corticospinal tract. Why would losing a pathway from the brain change a reflex that is integrated in the spinal cord?",
 ans:["Because the corticospinal tract normally shapes how the spinal cord answers this stimulus. With that input gone, the cord's circuit gives a different, more primitive response: the big toe extends. This is the Babinski sign, and it is one of the clearest signs of an upper motor neuron lesion, damage to the motor pathway in the brain or the cord above the reflex.","Infants normally show it until about the age of one to two, while their corticospinal tracts are still maturing. In an adult it is never normal."],
 name:"Babinski sign",
 desc:"The spinal cord is shown with the corticospinal input marked as lost. A caption names the Babinski sign.",
 pre:function(){S(W(["cord"]));},
 play:function(a){return wait(500,a).then(function(){cap("Toe up: upper motor neuron sign");});}},

{title:"Upper or lower motor neuron",
 text:["Upper motor neurons are the neurons in the brain whose axons run down the corticospinal tract. Lower motor neurons are the motor neurons in the ventral horn that run out to the muscles. Both kinds of damage cause weakness, but they look different at the bedside.","A lower motor neuron lesion gives weakness with low tone, reduced or absent reflexes, and over weeks, wasting of the muscle and small visible twitches called fasciculations. An upper motor neuron lesion gives weakness with high tone, called spasticity, brisk reflexes, often clonus, and a Babinski sign."],
 ask:"A patient has a weak left leg, a 4+ left knee jerk with clonus, and a Babinski sign on the left. Is this an upper or a lower motor neuron lesion, and why are the reflexes brisk instead of weak?",
 ans:["An upper motor neuron lesion, in the brain or the spinal cord above the lumbar segments that run the leg. The reflex arc for the leg is intact, so the knee jerk still works, but the descending pathways that normally hold it in check are damaged, so it is exaggerated. That release from the brain's control also explains the high tone and the Babinski sign.","A lower motor neuron lesion breaks the arc itself at its last link, so the reflex weakens or disappears instead."],
 name:"upper and lower motor neurons",
 desc:"The grading scale with 4+ outlined in maroon, beneath the knee jerk arc.",
 pre:function(){S(W(["spin","ia","mne","scale"]));},
 play:function(a){gradeHi(4);return wait(500,a).then(function(){cap("Brisk and spastic: upper motor neuron");});}},

{title:"Reflex or reaction",
 text:["In your lab this week you time two responses. The knee jerk appears a few tens of milliseconds after the tap. Catching a dropped ruler takes about 150 to 250 milliseconds."],
 ask:"Both responses start with a stimulus and end with a muscle contracting. Why does catching the ruler take several times longer?",
 ans:["Because its path is much longer and crosses many more synapses. The knee jerk goes into the cord and straight back out across one synapse. Catching the ruler starts in the eyes, travels to the visual cortex, then through areas that recognize the ruler is falling and decide to grab it, to the motor cortex, down the spinal cord, and out to the hand. Every synapse and every extra centimeter of axon adds time.","Latency is how you tell a reflex from a voluntary response. A response that comes too fast to have been routed through the brain is a reflex."],
 desc:"A time line runs from 0 to 250 milliseconds. A maroon marker labeled knee jerk sits at about 30 milliseconds, and a navy marker labeled catching a ruler sits at about 200 milliseconds.",
 pre:function(){S(W(["time"]));},
 play:function(a){lat1.setAttribute("display","");latT1.setAttribute("display","");return wait(700,a).then(function(){lat2.setAttribute("display","");latT2.setAttribute("display","");cap("Fewer synapses, shorter latency");});}},

/* ---- review ---- */
{sec:"Review",comp:"Competencies 1 to 4 and 7",
 title:"Summary with the scientific terms",
 text:["A reflex arc has five parts: receptor, sensory neuron, integrating center, motor neuron, effector. Sensory signals enter the cord through the dorsal root and motor signals leave through the ventral root. The stretch reflex is monosynaptic: a muscle spindle, in parallel with the muscle fibers, reports stretch and excites its own muscle, while an inhibitory interneuron relaxes the antagonist, which is reciprocal inhibition. Gamma motor neurons keep the spindle taut during contraction.","The Golgi tendon organ, in series at the tendon, reports tension and inhibits its own muscle. The withdrawal reflex flexes the injured limb and the crossed extensor reflex stiffens the other one; both are polysynaptic because they need inhibition, crossing and spread.","Reflexes are sorted by effector, integrating center, whether they are learned, and number of synapses. Spindles at rest keep muscle tone. The brain holds spinal reflexes in check: reinforcement makes a reflex bigger, and an upper motor neuron lesion gives brisk reflexes, clonus, spasticity and a Babinski sign, while a lower motor neuron lesion gives weak or absent reflexes and low tone."],
 ask:"Without scrolling back, explain why the stretch reflex makes its own muscle contract while the tendon organ reflex makes its own muscle relax, and say what each one is protecting.",
 ans:["The spindle reports length. When the muscle is stretched, its reflex contracts that muscle to bring it back to its set length, which protects posture and the joint from collapsing under a sudden stretch. The tendon organ reports tension. When the force on the tendon gets high, its reflex inhibits that muscle through an interneuron, which protects the muscle and tendon from forces that could injure them.","If part of this would not come back, look at those steps again before your Competency Study Guide, and draw the circuits from memory before you check them."],
 desc:"The full figure: both muscles, the spindle and the tendon organ, and the cord with the sensory neuron, both motor neurons, the inhibitory interneuron and the tendon organ afferent.",
 pre:function(){S(W(["spin","gto","ia","ib","mne","mnf","inh","sign","sig"]));},
 play:function(a){return run(dA,IA,1000,a).then(function(){bulge(quad,true,QY,QH);signs("+",M);cap("Length and tension, two reflexes");});}}
];
