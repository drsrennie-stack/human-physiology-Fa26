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
tx(gFib,150,96,"A-delta fiber: small, myelinated, 12 to 30 m/s","tn",14,"start");tx(gFib,150,200,"C fiber: small, unmyelinated, 0.5 to 2 m/s","t",14,"start");
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
 text:["The spinal cord is divided into four regions named for the vertebrae beside them: cervical, thoracic, lumbar and sacral. Each region is made of segments, and each segment gives rise to a pair of spinal nerves, one on each side. Just before a spinal nerve joins the cord, it splits into two roots. The dorsal root carries sensory information in, and its swelling, the dorsal root ganglion, holds the cell bodies of the sensory neurons. The ventral root carries information out to muscles and glands.","In cross section, the cord has an H-shaped core of gray matter, where the cell bodies and synapses are, surrounded by white matter, made mostly of myelinated axons. The gray matter is divided into horns. In the dorsal, or posterior, horns, incoming sensory fibers synapse on interneurons, in separate nuclei for somatic and visceral information. The ventral, or anterior, horns hold the cell bodies of motor neurons, in somatic motor and autonomic nuclei; the autonomic nuclei sit in a small lateral horn.","The white matter is divided into columns, each made of tracts. Ascending tracts carry sensory information up to the brain in the dorsal white matter and the outer part of the lateral white matter. Descending tracts carry commands down from the brain in the ventral white matter and the inner part of the lateral white matter. Propriospinal tracts stay within the cord."],
 name:"gray matter and white matter",
 auto:true,
 desc:"The stacked levels are shown, with the spinal cord cross section at the bottom.",
 pre:function(){S(["lev"]);},
 play:function(a){return wait(300,a).then(function(){cap("Gray: synapses. White: tracts");});}},

{title:"Horns, roots, tracts and columns",
 text:["Four words describe the parts of a spinal cord cross section, and they are easy to mix up: horns, roots, tracts and columns."],
 ask:"Which of the four are gray matter, which are white matter, and which one is not inside the cord at all?",
 ans:["Horns are gray matter: regions of cell bodies and synapses. Tracts are white matter: bundles of axons running up or down the cord, and a column is a group of tracts. Roots are not inside the cord at all. They are the two branches of a spinal nerve just before it joins the cord: the dorsal root brings sensory information in, and the ventral root takes motor commands out.","The cord is also an integrating center in its own right. In a spinal reflex, a signal passes from a sensory neuron through the gray matter to an efferent neuron with no input from the brain, while interneurons usually send a copy of the sensory information up a tract to the brain too."],
 name:"columns and tracts",
 desc:"The stacked levels remain, with the spinal cord cross section at the bottom.",
 pre:function(){S(["lev"]);},
 play:function(a){return wait(400,a).then(function(){cap("Horns gray, tracts white, roots outside");});}},

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
 text:["There are four somatic senses: touch, proprioception, temperature, and nociception, which includes pain and itch. All of them start the same way, with mechanical, thermal or chemical energy opening ion channels in a receptor. Every primary sensory neuron for them has its cell body in a dorsal root ganglion and synapses in the central nervous system on a secondary sensory neuron. Where that synapse happens depends on the kind of information.", "A fingertip on the right hand feels the texture of a coin. The sensory neuron enters the cord on the right side."],
 ask:"Trace this signal to the cortex. On which side does it travel up the cord, and at what level does it cross?",
 ans:["It goes up the cord on the same side it entered, the right, without synapsing: fine touch, vibration and proprioception neurons have very long axons that climb all the way to the medulla. There the primary neuron synapses on the secondary neuron, which crosses the midline in the medulla and runs up to the thalamus on the left. In the thalamus it synapses on a tertiary neuron that carries the signal to the somatosensory cortex on the left. Many of these pathways also send branches to the cerebellum, which uses the information to coordinate balance and movement.", "This is the dorsal column pathway, for fine touch, vibration and proprioception, the sense of where your body is. It crosses high, in the medulla."],
 name:"dorsal column pathway",
 desc:"A navy line runs from the right hand into the right side of the cord, climbs on the right to the medulla, crosses the midline there, synapses in the left thalamus, and ends in the left cortex. Three dots mark its synapses.",
 pre:function(){S(["lev"]);},
 play:function(a){return draw("dc",lDC,DC,sigA,1700,a).then(function(){cap("Same side up, crosses in the medulla");});}},

{title:"Pain from the right hand",
 text:["Now a pin pricks the same fingertip. Pain, temperature and coarse touch travel on a different pathway."],
 ask:"Where does this signal synapse first, and at what level does it cross?",
 ans:["It synapses almost right away, in the dorsal horn of the spinal cord where it enters. The secondary neuron crosses the midline in the spinal cord, within a segment or two, and climbs the opposite side, the left, to the thalamus. A tertiary neuron goes on to the somatosensory cortex. Branches also go to the limbic system and the hypothalamus, which is why pain can bring emotional distress and autonomic reactions such as nausea, sweating or fainting.", "This is the spinothalamic tract, for pain, temperature and coarse touch. It crosses low, in the spinal cord, while the dorsal column pathway crosses high, in the medulla. That difference is what lets a doctor find a lesion."],
 name:"spinothalamic tract",
 desc:"A maroon line runs from the right hand into the cord, synapses in the right dorsal horn, crosses the midline inside the cord, climbs the left side through the medulla to the left thalamus, and ends in the left cortex. The navy dorsal column line stays for comparison.",
 pre:function(){S(["lev","dc"]);},
 play:function(a){return draw("st",lST,ST,sigB,1700,a).then(function(){cap("Crosses low, in the cord");});}},

{title:"Moving the right hand",
 text:["The person decides to close the right hand. The command starts in the motor cortex."],
 ask:"Which side of the motor cortex sends this command, and where does the pathway cross?",
 ans:["The left primary motor cortex, in the frontal lobe. The axons of its large output neurons, the pyramidal cells, descend through the brainstem, and most of them cross the midline at the bottom of the medulla, in the pyramids. They continue down the right side of the cord and synapse on motor neurons in the ventral horn, which run out to the muscles of the right hand.","This is the corticospinal tract, the main pathway for voluntary movement, especially fine movement of the hands. Its neurons in the cortex are upper motor neurons; the motor neurons in the cord are lower motor neurons."],
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

{title:"A clot in the medulla",
 text:["A blood clot damages the sensory tracts passing through the lower right side of the medulla. Use the two pathways drawn on the figure."],
 ask:"On which side of the body will pain and temperature be abnormal, and on which side will proprioception be abnormal?",
 ans:["Pain and temperature will be abnormal on the left side. Their secondary neurons crossed in the spinal cord, so the fibers passing through the right medulla carry pain from the left side of the body. Proprioception will be abnormal on the right side. Those fibers have not crossed yet when they enter the lower medulla; they synapse and cross there.", "The same rule works at every level: below the crossing point, a lesion affects the same side; above it, the opposite side."],
 name:"ipsilateral and contralateral",
 desc:"The stacked levels with the dorsal column and spinothalamic pathways drawn, and the lower right medulla marked.",
 pre:function(){S(["lev","dc","st"]);},
 play:function(a){return wait(400,a).then(function(){cap("Pain left, proprioception right");});}},

{sec:"Touch, from skin to cortex",comp:"Competency 13",
 title:"Receptors in the skin",
 text:["Touch receptors respond to stretch, steady pressure, flutter or stroking, vibration and texture, and they come in several forms. Free nerve endings sense temperature, noxious stimuli and hair movement. Meissner corpuscles, near the surface, sense flutter and stroking and adapt quickly. Pacinian corpuscles, deep in the skin, sense vibration, have large receptive fields and adapt quickly, which is why you stop feeling your shirt. Ruffini corpuscles, deep, sense skin stretch and adapt slowly. Merkel receptors, near the surface, sense steady pressure and texture and adapt slowly."],
 ask:"A person reads Braille with a fingertip. Which of these receptors does most of the work, and why are fingertips so good at it?",
 ans:["Merkel receptors. They report steady pressure and texture and keep reporting while the finger rests on a dot, because they adapt slowly. Each one is a nonneural Merkel cell paired with the enlarged ending of a sensory neuron. Pressure on the skin opens Piezo2 channels in the Merkel cell, it depolarizes, and it releases transmitter onto the sensory neuron. Merkel receptors are densest in the fingertips.", "Practice changes the brain too: people who read Braille develop a larger area of somatosensory cortex for the fingertips."],
 name:"Merkel receptor",
 desc:"The bars comparing cortical area with true size remain on screen.",
 pre:function(){S(["hom"]);homGrow(1);},
 play:function(a){return wait(400,a).then(function(){cap("Texture: Merkel receptors");});}},

{title:"The map in the cortex",
 text:["Touch information ends in the primary somatic sensory cortex, in the parietal lobe, on the strip just behind the central sulcus, the postcentral gyrus. Each part of the body has its own region there, its sensory field, laid out in order like a map; drawn as a body, it is the somatosensory homunculus, first mapped by stimulating the cortex of awake patients during surgery. The brain has no pain receptors, so this is possible. Within each body part's region, columns of neurons are devoted to particular kinds of receptor."],
 ask:"The lips and fingertips get far more cortex than the whole trunk. Why would the cortex be built that way?",
 ans:["Because the more sensitive a part of the body is, the larger its region of cortex. The lips and fingertips are packed with receptors and small receptive fields, the same ones that give them two-point thresholds of a few millimeters. The trunk has few, large receptive fields, so it needs little. Because the pathways cross on the way up, damage to this strip on one side dulls sensation on the opposite side of the body.", "The map is not fixed. A part that is used more gets more cortex, and when a finger or limb is lost, neighboring areas take over its region. When that reorganization goes wrong, the brain can produce sensations, including pain, that it places in the missing limb."],
 name:"somatosensory homunculus",
 desc:"Two sets of bars. On the left, maroon bars show the cortex given to each part: long for lips and hand, medium for face, short for trunk, leg and foot. On the right, navy bars show true size: short for lips and hand, long for trunk and leg.",
 pre:function(){S(["hom"]);},
 play:function(a){return tweenVal(0,1,1200,a,homGrow).then(function(){cap("Cortex tracks receptors, not size");});}},

{sec:"Temperature and pain",comp:"Competencies 13 and 14",
 title:"Hot and cold",
 text:["In the skin, thermoreceptors are free nerve endings. Cold receptors respond mainly to temperatures below body temperature. Warm receptors respond from body temperature, 37 °C (98.6 °F), up to about 45 °C (113 °F). Above that, nociceptors take over and you feel painful heat. There are many more cold receptors than warm ones. Thermoreceptors in the brain help regulate body temperature."],
 ask:"Chili peppers feel hot in your mouth, and mint feels cool, even at room temperature. How could a chemical feel like a temperature?",
 ans:["Because the receptors use ion channels that respond to both. Heat-sensing nerve endings use TRPV1 channels, which open with damaging heat and also with capsaicin, the chemical in chili peppers. A related channel, TRPM8, opens with cold and also with menthol. The labeled line does the rest: whatever opens those channels is felt as heat or cold.", "TRP channels are also used by nociceptors, which ties temperature and pain together. The discovery of these channels, and of the Piezo channels for touch, won the 2021 Nobel Prize in Physiology or Medicine."],
 name:"TRP channels",
 desc:"The fast and slow fibers figure, standing for the nerve endings that carry temperature.",
 pre:function(){S(["fib"]);},
 play:function(a){return wait(400,a).then(function(){cap("Capsaicin opens the heat channel");});}},

{title:"Two waves of pain",
 text:["Nociceptors are free nerve endings found in the skin, joints, muscles, bones and internal organs, but not in the brain or spinal cord. They respond to strong stimuli that cause or could cause tissue damage. Their signals travel to the dorsal horn in two kinds of fiber. A-delta fibers are small and myelinated and conduct at about 12 to 30 meters per second. C fibers are small and unmyelinated and conduct at only about 0.5 to 2 meters per second. For comparison, the large myelinated A-beta fibers that carry touch conduct at 30 to 70 meters per second.", "You stub your toe, far from the spinal cord."],
 ask:"Which signal reaches the cord first, and how does each one feel?",
 ans:["The A-delta signal arrives first, because myelinated fibers conduct faster. It produces fast pain: sharp, stabbing and easy to locate. The C fiber signal arrives later and produces slow pain: dull, throbbing, and more diffuse.", "C fibers also carry itch, the sensation from a subtype of nociceptor fiber, mostly in the skin. Scratching makes a mildly painful sensation that seems to interrupt it."],
 name:"fast pain and slow pain",
 desc:"Two fibers run from a stubbed toe at the left to the spinal cord at the right. A navy dot races along the myelinated A-delta fiber; a maroon dot creeps along the unmyelinated C fiber. On a time line below, a navy marker early reads sharp, fast pain and a maroon marker later reads dull, slow pain.",
 pre:function(){S(["fib"]);},
 play:function(a){return Promise.all([run(fA,[[150,120],[760,120]],700,a,true),run(fC,[[150,220],[760,220]],2600,a,true)]).then(function(){fM1.setAttribute("display","");fM2.setAttribute("display","");fT1.textContent="sharp, fast pain";fT2.textContent="dull, slow pain";cap("Myelin decides which arrives first");});}},

{title:"Touching a hot stove",
 text:["Nociceptor fibers end in the dorsal horn, and from there they activate two different things."],
 ask:"You touch a hot stove. Why does your hand pull back before you feel the pain?",
 ans:["Because the nociceptor signal goes two ways at once. In the spinal cord it synapses on interneurons for a protective spinal reflex, the withdrawal reflex, which pulls the hand back without the brain. It also synapses on secondary neurons that carry the signal up to the brain, where it becomes the conscious sensation of pain. The reflex loop is shorter, so it finishes first.", "A frog whose brain has been destroyed still pulls its foot out of hot water. It cannot feel pain, but its spinal reflex is intact. The adaptive advantage of a spinal reflex is speed: it does not wait for the brain."],
 name:"protective spinal reflex",
 desc:"The dorsal horn circuit, standing for where the nociceptor's signal splits.",
 pre:function(){S(["gate"]);},
 play:function(a){return run(gsN,[[60,330],[300,330],[420,300]],900,a).then(function(){cap("Reflex first, pain second");});}},

{title:"Pain felt in the arm",
 text:["Pain in internal organs, visceral pain, is often poorly localized and may be felt far from its source. A man having a heart attack feels pain spreading into his neck, shoulder and down his left arm, even though nothing is wrong with his arm."],
 ask:"Why would the brain place pain from the heart in the skin of the arm?",
 ans:["Nociceptors from the heart and from the skin of the left arm converge on the same secondary neurons in the dorsal horn, which carry the signal up a single ascending tract. The brain cannot tell which input started it. Pain signals from the skin are far more common than pain from organs, so the brain places the pain in the skin.", "This is referred pain. Each organ refers pain to a predictable area: irritation of the diaphragm from a gallbladder problem can be felt in the right shoulder and neck, which is why the location of referred pain helps with diagnosis."],
 name:"referred pain",
 desc:"A heart and the skin of the left arm each send a sensory line into one spinal cord segment, where both end on the same navy projection neuron. One line runs from that neuron to the somatosensory cortex. A dot travels from the heart, and an exclamation mark appears on the arm.",
 pre:function(){S(["ref"]);},
 play:function(a){return run(rsig,[[200,290],[330,270],[462,246],[482,240],[600,160],[700,100]],1600,a).then(function(){rMark.setAttribute("display","");cap("Shared line, brain guesses skin");});}},

{sec:"Pain and its modulation",comp:"Competency 14",
 title:"Why an injury gets more tender",
 text:["Chemicals released at the site of an injury can activate nociceptors or sensitize them, lowering their threshold: histamine from mast cells, prostaglandins from damaged cells, and substance P from the sensory neurons themselves."],
 ask:"Why does a sprained ankle hurt when you barely touch it, and how does aspirin help?",
 ans:["The local chemicals have lowered the threshold of the nociceptors, so a stimulus that would not normally hurt now fires them. Increased sensitivity to pain at a site of tissue damage is inflammatory pain. Aspirin inhibits the production of prostaglandins, which reduces inflammation and the sensitizing of the nociceptors.", "Pain that lasts for weeks or months is chronic pain, and it can be far greater than nociceptor activity would explain, because the nervous system itself has changed. When it comes from damage to the somatosensory system, such as diabetic neuropathy, it is neuropathic pain."],
 name:"inflammatory pain",
 desc:"The dorsal horn circuit, with the nociceptor input.",
 pre:function(){S(["gate"]);},
 play:function(a){return run(gsN,[[60,330],[300,330],[420,300]],700,a).then(function(){cap("Lower threshold, more pain");});}},

{title:"Rubbing a bumped shin",
 text:["Pain can be turned down in the spinal cord before it is ever sent to the brain. The classic explanation is the gate control theory. In the dorsal horn, a nociceptor excites a projection neuron that carries pain up to the brain. A large touch fiber from the same skin also enters here and excites an inhibitory interneuron that synapses on the projection neuron."],
 ask:"You bump your shin and rub it. Judging from this circuit, what does rubbing do to the pain signal that reaches the brain?",
 ans:["It reduces it. Rubbing fires the large touch fibers, which excite the inhibitory interneuron. The interneuron inhibits the projection neuron, so fewer pain signals go up to the brain even though the nociceptor is still firing. This is how the gate control theory explains why rubbing an injury, or a TENS unit on the skin, can ease pain.", "Your textbook adds an important caution: the gate control model was built on some inaccurate assumptions and leaves out the glial cells and microglia of the spinal cord, and several newer models are replacing it. What still holds is that pain can be modulated in the spinal cord before it reaches the brain. Your competency asks you to explain the gate, so know this circuit, and know that it is a simplified model."],
 name:"gate control theory",
 desc:"Inside the dorsal horn, a maroon nociceptor line runs to a navy projection neuron. A thick navy touch fiber runs to a gray inhibitory interneuron, which connects to the projection neuron. Dots travel both inputs, and the label reads fewer signals to the brain.",
 pre:function(){S(["gate"]);},
 play:function(a){return Promise.all([run(gsN,[[60,330],[300,330],[420,300]],1000,a),run(gsT,[[60,190],[300,190],[380,230],[404,250],[470,286]],1000,a)]).then(function(){gOut.textContent="fewer signals to the brain";cap("Touch input closes the gate");});}},

{title:"The body's own painkillers",
 text:["Pain can also be suppressed from above. In an emergency, when survival depends on ignoring an injury, descending pathways from the brain inhibit nociceptor neurons in the spinal cord. Neurons in pain pathways release enkephalins and dynorphins, two of the three families of endogenous opioids; the third, beta-endorphin, is made in the anterior pituitary from the same prohormone as ACTH."],
 ask:"The opioid acts on this circuit. Does it work before the synapse, after it, or both?",
 ans:["Both. Before the synapse, opioid receptors on the primary sensory neuron's terminal decrease its neurotransmitter release, such as substance P. After the synapse, they inhibit the secondary sensory neuron, making it harder to bring to threshold. Opioid drugs such as morphine act on these same receptors, but with long use a person can develop tolerance and need larger doses.", "Other approaches act elsewhere on the pathway: capsaicin patches act on TRP channels, ziconotide blocks Ca2+ channels on nociceptive neurons, and neuromodulation uses electrodes to inhibit pain pathways."],
 name:"endogenous opioids",
 desc:"A gold dashed descending pathway from the brainstem reaches the synapse between the nociceptor and the projection neuron, marked op. A label says enkephalin acts before and after the synapse.",
 pre:function(){S(["gate"]);},
 play:function(a){REG.op.setAttribute("display","");return run(gsN,[[60,330],[300,330],[420,300]],900,a).then(function(){gOut.textContent="pain signal reduced";cap("Opioids act on both sides");});}},

{sec:"Review",comp:"Competencies 5, 13 and 14",
 title:"Summary with the scientific terms",
 text:["Inside the cord, gray matter holds cell bodies and synapses and white matter holds the tracts; sensory cell bodies sit in the dorsal root ganglia. Fine touch, vibration and proprioception climb on the same side and cross in the medulla. Pain, temperature and coarse touch synapse in the dorsal horn and cross in the spinal cord. Both relay in the thalamus to the somatosensory cortex, where area tracks sensitivity and the map can reorganize. Voluntary movement descends in the corticospinal tract, crossing at the pyramids. Skin receptors include free nerve endings, Meissner, Pacinian, Ruffini and Merkel receptors; temperature uses TRP channels.", "Fast pain travels in myelinated A-delta fibers and slow pain and itch in unmyelinated C fibers. Nociceptor signals drive spinal reflexes and ascending pain. Referred pain comes from convergence. Injury chemicals sensitize nociceptors; the gate, descending pathways and endogenous opioids reduce pain transmission."],
 ask:"Without scrolling back, a patient has lost pain sensation on the left leg and lost position sense on the right leg. Which side of the cord is damaged, and how do you know?",
 ans:["The right half. Position sense travels up on the same side, so losing it on the right leg means the right dorsal columns are damaged. Pain crosses in the cord, so pain fibers from the left leg are traveling on the right side above their entry, and losing left leg pain also points to the right half.", "If you could not get there, redraw the three pathways from memory and cut them, the way your Competency Study Guide asks."],
 desc:"All three pathways are drawn on the stacked levels.",
 pre:function(){S(["lev","dc","st","cs"]);},
 play:function(a){return Promise.all([run(sigA,DC,1300,a),run(sigB,ST,1300,a)]).then(function(){cap("Where it crosses locates the lesion");});}}
];
