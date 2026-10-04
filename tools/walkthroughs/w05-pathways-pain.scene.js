/* Spinal pathways, touch and pain. Oct 4 2026. Week 5 competencies 5, 13
   and 14. Main figure: cortex, thalamus, medulla and spinal cord stacked
   with the midline dashed down the middle and the right hand on the right.
   Three tracts are drawn on it. Smaller figures carry the homunculus, the
   two pain fibers, referred pain, and the dorsal horn gate. */

var MID=450;
var gLev=G("lev");
el("line",{x1:MID,y1:20,x2:MID,y2:470,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 6"},gLev);
tx(gLev,MID,486,"midline","t",13,"middle");
el("rect",{x:130,y:30,width:640,height:56,rx:24,fill:"#fff",stroke:NAVY,"stroke-width":3},gLev);
tx(gLev,140,24,"cortex","tn",15,"start");
tx(gLev,290,64,"left hemisphere","t",13,"middle");tx(gLev,610,64,"right hemisphere","t",13,"middle");
el("ellipse",{cx:360,cy:150,rx:46,ry:22,fill:TINT,stroke:INK2,"stroke-width":2},gLev);el("ellipse",{cx:540,cy:150,rx:46,ry:22,fill:TINT,stroke:INK2,"stroke-width":2},gLev);
tx(gLev,240,156,"thalamus","t",14,"end");
el("rect",{x:350,y:230,width:200,height:60,rx:14,fill:"#fff",stroke:NAVY,"stroke-width":3},gLev);
tx(gLev,340,266,"medulla","t",14,"end");
el("ellipse",{cx:MID,cy:400,rx:120,ry:56,fill:"#fff",stroke:NAVY,"stroke-width":3},gLev);
tx(gLev,320,404,"spinal cord","t",14,"end");
el("rect",{x:800,y:410,width:76,height:46,rx:18,fill:TISS,stroke:MAROON,"stroke-width":3},gLev);
tx(gLev,838,478,"right hand","t",14,"middle");

var DC=[[810,424],[620,390],[500,384],[500,262],[400,250],[372,150],[330,62]];
var ST=[[810,436],[620,410],[500,410],[402,418],[402,300],[392,262],[350,150],[270,62]];
var CS=[[210,62],[300,150],[400,282],[520,300],[540,420],[640,440],[810,446]];
var gDC=G("dc"),gST=G("st"),gCS=G("cs");
var lDC=poly(gDC,DC,NAVY,5),lST=poly(gST,ST,MAROON,5),lCS=poly(gCS,CS,GDEEP,5,"12 6");lCS._dash="12 6";
[[500,384],[400,250],[372,150]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:8,fill:NAVY},gDC);});
[[500,410],[350,150]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:8,fill:MAROON},gST);});
[[540,420]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:8,fill:GDEEP},gCS);});
var tDC=tx(gDC,580,238,"dorsal column: touch, position","tn",14,"start");
var tST=tx(gST,140,340,"spinothalamic: pain, temperature","tm",14,"start");
var tCS=tx(gCS,600,330,"corticospinal: voluntary movement","tm",14,"start");tCS.setAttribute("class","t");
var gX=G("xs");
var xDC=badge(gX,452,250,"X",NAVY,13),xST=badge(gX,452,418,"X",MAROON,13),xCS=badge(gX,452,292,"X",GDEEP,13);
var sigA=dot(gLev,NAVY,9),sigB=dot(gLev,MAROON,9),sigC=dot(gLev,GDEEP,9);

/* the hemisection */
var gCut=G("cut");
el("rect",{x:MID-122,y:340,width:122,height:120,fill:MAROON,opacity:.22},gCut);
tx(gCut,MID-61,330,"left half cut","tm",15,"middle");
var gLoss=G("loss");
box(gLoss,10,180,230,70,"left side below the cut:\nfine touch and position lost\nmovement lost","tn",13);
box(gLoss,660,180,230,70,"right side below the cut:\npain and temperature lost","tm",13,MAROON);

/* homunculus */
var gHom=G("hom");
tx(gHom,60,50,"cortex given to each part","tn",16,"start");tx(gHom,520,50,"true size of each part","tn",16,"start");
var HP=[["lips",150,22],["hand and fingers",170,26],["face",90,20],["trunk",40,90],["leg",40,110],["foot",40,30]];
HP.forEach(function(h,i){var y=80+i*62;
  el("rect",{x:60,y:y,width:0,height:36,rx:6,fill:MAROON},gHom).setAttribute("data-w",h[1]*2);
  tx(gHom,60,y+54,h[0],"t",13,"start");
  el("rect",{x:520,y:y,width:h[2]*2.4,height:36,rx:6,fill:NAVY},gHom);
});
function homGrow(k){[].forEach.call(gHom.querySelectorAll("rect[data-w]"),function(r){r.setAttribute("width",+r.getAttribute("data-w")*k);});}

/* two pain fibers */
var gFib=G("fib");
tx(gFib,70,60,"stubbed toe","tm",15,"start");
el("line",{x1:150,y1:120,x2:760,y2:120,stroke:NAVY,"stroke-width":7},gFib);
for(var i=0;i<6;i++)el("rect",{x:190+i*96,y:110,width:80,height:20,rx:10,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gFib);
el("line",{x1:150,y1:220,x2:760,y2:220,stroke:INK2,"stroke-width":3},gFib);
tx(gFib,150,96,"A-delta fiber: thin, myelinated","tn",14,"start");tx(gFib,150,200,"C fiber: thinnest, unmyelinated","t",14,"start");
tx(gFib,780,176,"spinal cord","t",14,"start");
var fA=dot(gFib,NAVY,10),fC=dot(gFib,MAROON,10);
el("line",{x1:150,y1:380,x2:760,y2:380,stroke:NAVY,"stroke-width":2.5},gFib);
[0,0.25,0.5,0.75,1].forEach(function(k,i){var x=150+610*k;el("line",{x1:x,y1:372,x2:x,y2:388,stroke:NAVY,"stroke-width":2},gFib);tx(gFib,x,406,["0","","","","about 1 second"][i],"t",13,"middle");});
var fT1=tx(gFib,200,350,"","tn",14,"start"),fT2=tx(gFib,560,350,"","tm",14,"start");
var fM1=badge(gFib,190,380,"",NAVY,8),fM2=badge(gFib,640,380,"",MAROON,8);

/* referred pain */
var gRef=G("ref");
box(gRef,640,40,220,60,"somatosensory cortex","tn",14);
el("path",{d:"M120 300 c-30 -40 10 -70 40 -40 c30 -30 70 0 40 40 l-40 40 z",fill:TISS,stroke:MAROON,"stroke-width":3},gRef);
tx(gRef,160,370,"heart","t",14,"middle");
el("rect",{x:60,y:110,width:150,height:50,rx:20,fill:TISS,stroke:MAROON,"stroke-width":3},gRef);
tx(gRef,135,96,"skin of the left arm","t",14,"middle");
el("ellipse",{cx:450,cy:240,rx:90,ry:60,fill:"#fff",stroke:NAVY,"stroke-width":3},gRef);
tx(gRef,450,320,"spinal cord segment","t",13,"middle");
el("circle",{cx:470,cy:240,r:12,fill:NAVY},gRef);
var rV=poly(gRef,[[200,290],[330,270],[462,246]],MAROON,4),rS=poly(gRef,[[210,135],[330,190],[462,234]],NAVY,4),rP=poly(gRef,[[482,240],[600,160],[700,100]],NAVY,5);
var rMark=badge(gRef,135,135,"!",MAROON,16);
var rsig=dot(gRef,MAROON,9);

/* the gate */
var gGate=G("gate");
el("ellipse",{cx:450,cy:270,rx:300,ry:170,fill:"#fff",stroke:NAVY,"stroke-width":3},gGate);
tx(gGate,450,92,"dorsal horn of the spinal cord","tn",15,"middle");
var GN=poly(gGate,[[60,330],[300,330],[420,300]],MAROON,5);tx(gGate,64,354,"nociceptor (pain)","tm",14,"start");
var GT=poly(gGate,[[60,190],[300,190],[380,230]],NAVY,8);tx(gGate,64,176,"large touch fiber","tn",14,"start");
el("circle",{cx:394,cy:240,r:13,fill:INK2},gGate);tx(gGate,394,214,"inhibitory interneuron","t",13,"middle");
var GI=poly(gGate,[[404,250],[470,286]],INK2,4);
el("circle",{cx:490,cy:300,r:18,fill:NAVY},gGate);tx(gGate,520,340,"projection neuron","t",13,"start");
var GP=poly(gGate,[[508,296],[640,220],[860,120]],NAVY,5);tx(gGate,860,104,"to the brain","t",13,"end");
var gOut=tx(gGate,700,300,"","tm",16,"middle");
var gsN=dot(gGate,MAROON,9),gsT=dot(gGate,NAVY,9),gsP=dot(gGate,NAVY,9);
var gOp=G("op");
box(gOp,560,410,260,40,"descending pathway from the brainstem","tn",13);
poly(gOp,[[690,410],[560,330],[430,300]],GDEEP,4,"6 5");
badge(gOp,430,300,"op",GDEEP,15);
tx(gOp,280,430,"enkephalin acts before and after the synapse","tm",14,"middle");

makeCap();
function resetAll(){
  hide([sigA,sigB,sigC,fA,fC,rsig,gsN,gsT,gsP]);[xDC,xST,xCS].forEach(function(b){b.setAttribute("display","none");});
  tDC.setAttribute("display","");tST.setAttribute("display","");tCS.setAttribute("display","");
  homGrow(0);fT1.textContent="";fT2.textContent="";fM1.setAttribute("display","none");fM2.setAttribute("display","none");
  rMark.setAttribute("display","none");gOut.textContent="";cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}
function draw(name,line,pts,d,dur,a){REG[name].setAttribute("display","");return Promise.all([reveal(line,dur,a),run(d,pts,dur,a)]);}

/* ======================= steps ======================= */
var STEPS=[
{sec:"Inside the spinal cord",comp:"Competency 5",
 title:"Gray matter and white matter",
 text:["Cut across the spinal cord and you see two kinds of tissue. In the center is gray matter, shaped like a butterfly, made of neuron cell bodies, dendrites and synapses. Around it is white matter, made of myelinated axons running up and down the cord in bundles called tracts.","The gray matter is divided into horns. The dorsal horn, at the back, receives sensory input. The ventral horn, at the front, holds the cell bodies of the somatic motor neurons. In the thoracic and upper lumbar cord, a small lateral horn holds autonomic neurons. The white matter is divided into columns, and each column carries particular ascending and descending tracts.","On each side, at every level, a dorsal root brings sensory axons in and a ventral root takes motor axons out. The two roots join into one spinal nerve, which carries both. There are 31 pairs of spinal nerves."],
 name:"gray matter and white matter",
 auto:true,
 desc:"The stacked levels are shown, with the spinal cord cross section at the bottom.",
 pre:function(){S(["lev"]);},
 play:function(a){return wait(300,a).then(function(){cap("Gray: synapses. White: tracts");});}},

{title:"Where the cell bodies are",
 text:["Think about one sensory neuron that carries touch from a fingertip, and one motor neuron that makes a muscle of the hand contract."],
 ask:"Where is the cell body of each one: inside the spinal cord or outside it, and in which part?",
 ans:["The sensory neuron's cell body is outside the cord, in the dorsal root ganglion, the swelling on the dorsal root. Its axon runs all the way from the fingertip, past the cell body, and into the cord. The motor neuron's cell body is inside the cord, in the ventral horn of the gray matter, and its axon leaves through the ventral root.","That is why damage to a dorsal root ganglion, as in shingles, affects sensation along one strip of skin, and why damage to the ventral horn, as in polio, causes weakness with no loss of sensation."],
 name:"dorsal root ganglion",
 desc:"The stacked levels remain, with the spinal cord cross section at the bottom.",
 pre:function(){S(["lev"]);},
 play:function(a){return wait(400,a).then(function(){cap("Sensory bodies out, motor bodies in");});}},

{sec:"Three long pathways",comp:"Competency 5",
 title:"Up and down the cord",
 text:["Sensory information travels up the spinal cord to the brain in ascending pathways, and motor commands travel down in descending pathways. These long pathways are tracts: bundles of axons in the white matter.","The figure stacks the levels: the cortex at the top, the thalamus, the medulla of the brainstem, and one level of the spinal cord. The dashed line is the midline. Each side of the brain senses and moves the opposite side of the body, so every one of these pathways crosses the midline somewhere. Where it crosses is what this section is about."],
 auto:true,
 desc:"Four levels stacked from top to bottom: the cortex, two thalamus ovals, the medulla, and a spinal cord cross section, with a dashed midline down the center. The right hand sits at the lower right.",
 pre:function(){S(["lev"]);},
 play:function(a){return wait(300,a).then(function(){cap("Every long pathway crosses");});}},

{title:"Fine touch from the right hand",
 text:["A fingertip on the right hand feels the texture of a coin. The sensory neuron enters the cord on the right side."],
 ask:"Trace this signal to the cortex. On which side does it travel up the cord, and at what level does it cross?",
 ans:["It goes up the cord on the same side it entered, the right, without synapsing. The first neuron's axon climbs all the way to the medulla in the dorsal columns and synapses there. The second neuron crosses the midline in the medulla and runs up to the thalamus on the left. A third neuron carries it from the thalamus to the somatosensory cortex on the left.","This is the dorsal column pathway, which carries fine touch, vibration and the sense of where your limbs are, called proprioception. It crosses high, in the medulla."],
 name:"dorsal column pathway",
 desc:"A navy line runs from the right hand into the right side of the cord, climbs on the right to the medulla, crosses the midline there, synapses in the left thalamus, and ends in the left cortex. Three dots mark its synapses.",
 pre:function(){S(["lev"]);},
 play:function(a){return draw("dc",lDC,DC,sigA,1700,a).then(function(){cap("Same side up, crosses in the medulla");});}},

{title:"Pain from the right hand",
 text:["Now a pin pricks the same fingertip. Pain and temperature travel on a different pathway."],
 ask:"Where does this signal synapse first, and at what level does it cross?",
 ans:["It synapses almost right away, in the dorsal horn of the spinal cord where it enters. The second neuron crosses the midline within the cord, within a segment or two of where the signal came in, and then climbs the opposite side, the left, to the thalamus. A third neuron goes on to the cortex.","This is the spinothalamic tract, which carries pain and temperature. It crosses low, in the spinal cord, while the dorsal column pathway crosses high, in the medulla. That difference is what a doctor uses to find a lesion."],
 name:"spinothalamic tract",
 desc:"A maroon line runs from the right hand into the cord, synapses in the right dorsal horn, crosses the midline inside the cord, climbs the left side through the medulla to the left thalamus, and ends in the left cortex. The navy dorsal column line stays for comparison.",
 pre:function(){S(["lev","dc"]);},
 play:function(a){return draw("st",lST,ST,sigB,1700,a).then(function(){cap("Crosses low, in the cord");});}},

{title:"Moving the right hand",
 text:["The person decides to close the right hand. The command starts in the motor cortex."],
 ask:"Which side of the motor cortex sends this command, and where does the pathway cross?",
 ans:["The left motor cortex. Its axons descend through the brainstem, and most of them cross the midline at the bottom of the medulla, in the pyramids. They continue down the right side of the cord and synapse on motor neurons in the ventral horn, which run out to the muscles of the right hand.","This is the corticospinal tract, the main pathway for voluntary movement, especially fine movement of the hands. Its neurons in the cortex are upper motor neurons; the motor neurons in the cord are lower motor neurons."],
 name:"corticospinal tract",
 desc:"A gold dashed line leaves the left cortex, descends to the medulla, crosses the midline at the bottom of the medulla, descends the right side of the cord, synapses in the ventral horn and runs out to the right hand.",
 pre:function(){S(["lev","dc","st"]);},
 play:function(a){return draw("cs",lCS,CS,sigC,1700,a).then(function(){cap("Crosses at the bottom of the medulla");});}},

{title:"Cutting half the cord",
 text:["An injury cuts through the left half of the spinal cord at this level and leaves the right half intact. All three pathways are drawn for this level."],
 ask:"Below the cut, which sensations and movements are lost on the left side of the body, and which on the right?",
 ans:["On the left side: fine touch, vibration, position sense and voluntary movement are lost, because the dorsal columns and the corticospinal tract for the left side run on the left at this level and have not crossed yet. On the right side: pain and temperature are lost, because the spinothalamic fibers from the right side have already crossed into the left half of the cord.","This split pattern is called Brown-Séquard syndrome. It tells you the lesion is in the cord. In the brain all three pathways have already crossed, so a lesion there takes everything from the same side of the body."],
 name:"Brown-Séquard syndrome",
 desc:"The left half of the spinal cord is shaded maroon and labeled left half cut. Two boxes appear. Left side below the cut: fine touch and position lost, movement lost. Right side below the cut: pain and temperature lost.",
 pre:function(){S(["lev","dc","st","cs","cut"]);},
 play:function(a){[tDC,tST,tCS].forEach(function(t){t.setAttribute("display","none");});return wait(500,a).then(function(){REG.loss.setAttribute("display","");cap("A split pattern means the cord");});}},

{sec:"Touch, from skin to cortex",comp:"Competency 13",
 title:"The map in the cortex",
 text:["Touch information ends in the primary somatosensory cortex, a strip of cortex just behind the central sulcus called the postcentral gyrus. Each part of the body has its own area of that strip, laid out in order like a map. Drawn as a body, the map is called the somatosensory homunculus."],
 ask:"The lips and fingertips get far more cortex than the whole trunk. Why would the cortex be built that way?",
 ans:["Because cortical area matches how many receptors a part has and how finely it needs to discriminate, not how big it is. The lips and fingertips are packed with small receptive fields, the same ones that give them two-point thresholds of a few millimeters, and every one of those neurons needs its own space in the cortex. The trunk has few, large receptive fields, so it needs little.","Your two-point measurements from lab predict the map: the sites with the finest thresholds are the ones that would be drawn largest."],
 name:"somatosensory homunculus",
 desc:"Two sets of bars. On the left, maroon bars show the cortex given to each part: long for lips and hand, medium for face, short for trunk, leg and foot. On the right, navy bars show true size: short for lips and hand, long for trunk and leg.",
 pre:function(){S(["hom"]);},
 play:function(a){return tweenVal(0,1,1200,a,homGrow).then(function(){cap("Cortex tracks receptors, not size");});}},

{sec:"Pain and its modulation",comp:"Competency 14",
 title:"Two waves of pain",
 text:["You stub your toe. Two kinds of nociceptor fiber carry the signal to the spinal cord. A-delta fibers are thin and myelinated. C fibers are even thinner and have no myelin."],
 ask:"Which signal reaches the cord first, and how does each one feel?",
 ans:["The A-delta signal arrives first, because myelinated fibers conduct faster. It produces fast pain: sharp, prickling and easy to locate. The C fiber signal arrives a second or so later and produces slow pain: dull, aching or burning, harder to locate, and longer lasting.","That is why stubbing a toe gives a sharp jolt and then a throbbing ache. The same rule from the conduction velocity work in Week 4 explains it: myelin and diameter set the speed."],
 name:"fast pain and slow pain",
 desc:"Two fibers run from a stubbed toe at the left to the spinal cord at the right. A navy dot races along the myelinated A-delta fiber; a maroon dot creeps along the unmyelinated C fiber. On a time line below, a navy marker early reads sharp, fast pain and a maroon marker later reads dull, slow pain.",
 pre:function(){S(["fib"]);},
 play:function(a){return Promise.all([run(fA,[[150,120],[760,120]],700,a,true),run(fC,[[150,220],[760,220]],2600,a,true)]).then(function(){fM1.setAttribute("display","");fM2.setAttribute("display","");fT1.textContent="sharp, fast pain";fT2.textContent="dull, slow pain";cap("Myelin decides which arrives first");});}},

{title:"Pain felt in the arm",
 text:["A man having a heart attack feels pain spreading down the inside of his left arm, even though nothing is wrong with his arm."],
 ask:"Why would the brain place pain from the heart in the skin of the arm?",
 ans:["Sensory neurons from the heart and from the skin of the left arm enter the same segments of the spinal cord and converge on the same projection neurons. The brain receives the signal on that shared line and cannot tell which input started it. Signals on that line usually come from the skin, so the brain places the pain there.","This is referred pain, and it is explained by convergence. Each internal organ refers pain to a predictable patch of skin, which is why the location of referred pain helps with diagnosis."],
 name:"referred pain",
 desc:"A heart and the skin of the left arm each send a sensory line into one spinal cord segment, where both end on the same navy projection neuron. One line runs from that neuron to the somatosensory cortex. A dot travels from the heart, and an exclamation mark appears on the arm.",
 pre:function(){S(["ref"]);},
 play:function(a){return run(rsig,[[200,290],[330,270],[462,246],[482,240],[600,160],[700,100]],1600,a).then(function(){rMark.setAttribute("display","");cap("Shared line, brain guesses skin");});}},

{title:"Rubbing a bumped shin",
 text:["Inside the dorsal horn, a nociceptor excites a projection neuron that carries pain up to the brain. A large touch fiber from the same skin also enters here. It excites an inhibitory interneuron that synapses on the projection neuron."],
 ask:"You bump your shin and rub it. What does rubbing do to the pain signal that reaches the brain, judging from this circuit?",
 ans:["It reduces it. Rubbing fires the large touch fibers, which excite the inhibitory interneuron. The interneuron inhibits the projection neuron, so fewer pain signals get through to the brain even though the nociceptor is still firing.","This is the gate control theory of pain: activity in touch fibers can close a gate on pain transmission in the dorsal horn. It is part of why rubbing an injury, or the vibration of a TENS unit, can ease pain."],
 name:"gate control theory",
 desc:"Inside the dorsal horn, a maroon nociceptor line runs to a navy projection neuron. A thick navy touch fiber runs to a gray inhibitory interneuron, which connects to the projection neuron. Dots travel both inputs, and the label reads fewer signals to the brain.",
 pre:function(){S(["gate"]);},
 play:function(a){return Promise.all([run(gsN,[[60,330],[300,330],[420,300]],1000,a),run(gsT,[[60,190],[300,190],[380,230],[404,250],[470,286]],1000,a)]).then(function(){gOut.textContent="fewer signals to the brain";cap("Touch input closes the gate");});}},

{title:"The body's own painkillers",
 text:["Pathways descending from the brainstem can also turn pain down in the dorsal horn. They activate interneurons that release enkephalin, one of the body's endogenous opioids, the natural molecules that bind to the same receptors as morphine."],
 ask:"The opioid acts on this circuit. Does it work before the synapse, after it, or both?",
 ans:["Both. On the nociceptor's terminal, before the synapse, opioid receptors reduce calcium entry, so less transmitter, such as substance P and glutamate, is released. On the projection neuron, after the synapse, they open potassium channels and hyperpolarize it, so it is harder to bring to threshold.","These are the endogenous opioids: enkephalins, endorphins and dynorphins. They are part of why pain can be blunted during an emergency or intense exercise, and opioid drugs work by binding the same receptors."],
 name:"endogenous opioids",
 desc:"A gold dashed descending pathway from the brainstem reaches the synapse between the nociceptor and the projection neuron, marked op. A label says enkephalin acts before and after the synapse.",
 pre:function(){S(["gate"]);},
 play:function(a){REG.op.setAttribute("display","");return run(gsN,[[60,330],[300,330],[420,300]],900,a).then(function(){gOut.textContent="pain signal reduced";cap("Opioids act on both sides");});}},

{sec:"Review",comp:"Competencies 5, 13 and 14",
 title:"Summary with the scientific terms",
 text:["Fine touch, vibration and position travel in the dorsal columns, up the same side, crossing in the medulla. Pain and temperature travel in the spinothalamic tract, crossing in the spinal cord. Voluntary movement descends in the corticospinal tract, crossing at the bottom of the medulla. A cut through half the cord gives Brown-Séquard syndrome. Inside the cord, gray matter holds the cell bodies and synapses, with sensory input in the dorsal horn and motor neurons in the ventral horn, and white matter holds the tracts. Sensory cell bodies sit in the dorsal root ganglia. Both sensory pathways relay in the thalamus and end on the somatosensory homunculus, where area tracks receptor density.","Fast pain travels in myelinated A-delta fibers and slow pain in unmyelinated C fibers. Referred pain comes from convergence. The dorsal horn gate and the endogenous opioids reduce pain transmission."],
 ask:"Without scrolling back, a patient has lost pain sensation on the left leg and lost position sense on the right leg. Which side of the cord is damaged, and how do you know?",
 ans:["The right half. Position sense travels up on the same side, so losing it on the right leg means the right dorsal columns are damaged. Pain crosses in the cord, so the pain fibers from the left leg are traveling on the right side above their entry, and losing left leg pain also points to the right half. Both findings agree on a right-sided cord lesion.","If you could not get there, redraw the three pathways from memory and cut them, the way your Competency Study Guide asks."],
 desc:"All three pathways are drawn on the stacked levels.",
 pre:function(){S(["lev","dc","st","cs"]);},
 play:function(a){return Promise.all([run(sigA,DC,1300,a),run(sigB,ST,1300,a)]).then(function(){cap("Where it crosses locates the lesion");});}}
];
