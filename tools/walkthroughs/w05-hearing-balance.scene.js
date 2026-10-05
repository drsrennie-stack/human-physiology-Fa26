/* Hearing, balance, taste and smell. Oct 4 2026. Week 5 competencies 20 to
   23. Figures: the ear from canal to cochlea, with the cochlea drawn
   unrolled; one hair cell enlarged; the basilar membrane as a strip; a head
   for the Weber test and an ear for the Rinne test; one semicircular canal
   and one macula; a taste cell beside an olfactory neuron with their
   routes to the cortex. */

/* ---- the ear ---- */
var gEar=G("ear");
el("rect",{x:40,y:200,width:170,height:60,fill:"#fff",stroke:NAVY,"stroke-width":3},gEar);
tx(gEar,125,190,"ear canal","t",14,"middle");
var tm=el("line",{x1:214,y1:180,x2:214,y2:280,stroke:MAROON,"stroke-width":6},gEar);
tx(gEar,214,306,"tympanic membrane","tm",13,"middle");
var oss=el("g",{},gEar);
el("circle",{cx:250,cy:214,r:14,fill:INK2},oss);el("rect",{x:262,y:204,width:46,height:16,rx:8,fill:INK2},oss);el("rect",{x:306,y:206,width:16,height:40,rx:4,fill:INK2},oss);
tx(gEar,282,180,"ossicles: malleus, incus, stapes","t",13,"middle");
el("rect",{x:330,y:150,width:530,height:180,rx:22,fill:TINT,stroke:NAVY,"stroke-width":3},gEar);
el("line",{x1:330,y1:240,x2:860,y2:240,stroke:MAROON,"stroke-width":4},gEar);
var ow=el("line",{x1:330,y1:200,x2:330,y2:232,stroke:GDEEP,"stroke-width":7},gEar);
var rw=el("line",{x1:330,y1:256,x2:330,y2:290,stroke:GDEEP,"stroke-width":7},gEar);
tx(gEar,346,140,"oval window","tm",13,"start");tx(gEar,346,350,"round window","tm",13,"start");
tx(gEar,600,140,"cochlea, drawn unrolled, full of fluid","tn",14,"middle");
tx(gEar,700,234,"basilar membrane","tm",13,"middle");
var wave=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":4},gEar);
var sw=dot(gEar,GDEEP,9);
var gImp=G("imp");
box(gImp,40,380,240,70,"eardrum area about\n20 times the oval window","tn",14);
box(gImp,300,380,250,70,"same force on a smaller\narea: higher pressure","tn",14);

/* ---- one hair cell ---- */
var gHc=G("hc");
el("rect",{x:360,y:220,width:180,height:200,rx:30,fill:"#fff",stroke:NAVY,"stroke-width":4},gHc);
tx(gHc,350,330,"hair cell","tn",15,"end");
var STC=[0,1,2,3].map(function(i){return el("line",{x1:390+i*40,y1:220,x2:390+i*40,y2:150-i*20,stroke:NAVY,"stroke-width":7,"stroke-linecap":"round"},gHc);});
var tip=el("polyline",{fill:"none",stroke:GDEEP,"stroke-width":2.5},gHc);
tx(gHc,620,120,"stereocilia, short to tall","t",13,"middle");
var hk=el("g",{},gHc);arrow(hk,450,90,450,200,MAROON,5);tx(hk,470,100,"K+ enters","tm",14,"start");
var hglu=[];for(var i=0;i<5;i++)hglu.push(el("circle",{cx:410+i*20,cy:440,r:5,fill:GDEEP},gHc));
var nerve=poly(gHc,[[540,400],[700,440],[860,440]],NAVY,4);tx(gHc,860,470,"auditory nerve","t",13,"end");
var hTrain=trainPath(gHc,MAROON,2.5);
function bend(k){STC.forEach(function(s,i){s.setAttribute("x2",390+i*40+50*k);});tip.setAttribute("points",STC.map(function(s,i){return (390+i*40+50*k*0.9)+","+(158-i*20);}).join(" "));}

/* ---- the basilar strip ---- */
var gBm=G("bm");
var strip=el("polygon",{points:"120,220 840,180 840,320 120,280",fill:TINT,stroke:NAVY,"stroke-width":3},gBm);
tx(gBm,120,310,"base: narrow, stiff","t",14,"start");tx(gBm,840,350,"apex, near the helicotrema: wide, flexible","t",14,"end");
tx(gBm,110,200,"near the oval window","t",13,"start");
var peak=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":5},gBm);
var pkT=tx(gBm,480,120,"","tm",16,"middle");
function peakAt(x,h){return "M120 250 C"+(x-160)+" 250 "+(x-60)+" "+(250-h)+" "+x+" "+(250-h)+" C"+(x+60)+" "+(250-h)+" "+(x+120)+" 250 840 250";}

/* ---- Weber and Rinne ---- */
var gWb=G("weber");
var HEADS=[[170,"normal"],[450,"conductive loss, right ear"],[730,"sensorineural loss, right ear"]];
var WA=[];
HEADS.forEach(function(h){var cx=h[0];el("ellipse",{cx:cx,cy:230,rx:90,ry:110,fill:"#fff",stroke:NAVY,"stroke-width":3},gWb);
  el("ellipse",{cx:cx-96,cy:240,rx:12,ry:24,fill:"#fff",stroke:NAVY,"stroke-width":3},gWb);el("ellipse",{cx:cx+96,cy:240,rx:12,ry:24,fill:"#fff",stroke:NAVY,"stroke-width":3},gWb);
  el("rect",{x:cx-6,y:96,width:12,height:40,fill:GDEEP},gWb);tx(gWb,cx,380,h[1],"t",13,"middle");tx(gWb,cx-96,290,"R","t",13,"middle");tx(gWb,cx+96,290,"L","t",13,"middle");
  WA.push(el("g",{},gWb));});
tx(gWb,170,84,"","t",12,"middle");
function weberArrows(){var spec=[[0,0],[1,0],[0,1]];/* [toR,toL] equal for normal */
  WA[0].innerHTML="";arrow(WA[0],170,150,90,236,MAROON,4);arrow(WA[0],170,150,250,236,MAROON,4);
  WA[1].innerHTML="";arrow(WA[1],450,150,370,236,MAROON,6);
  WA[2].innerHTML="";arrow(WA[2],730,150,810,236,MAROON,6);}
var wbT=tx(gWb,450,450,"","tn",15,"middle");
var gRn=G("rinne");
tx(gRn,450,60,"Rinne: which is heard longer?","tn",16,"middle");
var RN=[["normal","air longer than bone"],["conductive loss","bone longer than air"],["sensorineural loss","air longer than bone, both shorter"]];
var RNT=RN.map(function(r,i){box(gRn,60+i*270,110,240,60,r[0],"tn",15);return tx(gRn,180+i*270,210,"","tm",14,"middle");});
function rinneShow(){RNT.forEach(function(t,i){t.textContent=RN[i][1];});}

/* ---- balance ---- */
var gCan=G("canal");
el("circle",{cx:250,cy:250,r:150,fill:"none",stroke:NAVY,"stroke-width":30},gCan);
el("circle",{cx:250,cy:250,r:150,fill:"none",stroke:TINT,"stroke-width":22},gCan);
tx(gCan,250,80,"semicircular canal","tn",15,"middle");
var cup=el("polygon",{points:"",fill:GDEEP},gCan);
tx(gCan,420,262,"cupula","tm",14,"start");
var endo=el("g",{},gCan);
var endoArrow=arrow(endo,180,110,320,110,NAVY,5);
var endoT=tx(endo,250,140,"endolymph","t",13,"middle");
var head=el("g",{},gCan);arrow(head,560,140,700,140,MAROON,6);var headT=tx(head,630,124,"","tm",14,"middle");
var spinT=tx(gCan,640,240,"","tn",15,"middle"),spinT2=tx(gCan,640,270,"","t",14,"middle");
function cupula(k){var x=400,y=250;cup.setAttribute("points",(x-14)+","+(y)+" "+(x+14)+","+y+" "+(x+14+30*k)+","+(y-60)+" "+(x-14+30*k)+","+(y-60));}
var gMac=G("mac");
el("rect",{x:540,y:330,width:300,height:30,fill:"#fff",stroke:NAVY,"stroke-width":3},gMac);
var otl=el("rect",{x:540,y:290,width:300,height:40,rx:6,fill:TINT,stroke:INK2,"stroke-width":2},gMac);
for(i=0;i<8;i++)el("circle",{cx:560+i*36,cy:296,r:6,fill:GDEEP,"class":"oto"},gMac);
var MH=[0,1,2,3,4].map(function(i){return el("line",{x1:570+i*60,y1:330,x2:570+i*60,y2:300,stroke:NAVY,"stroke-width":4},gMac);});
tx(gMac,690,390,"macula: otoliths on a gel layer","tn",14,"middle");
function tilt(k){otl.setAttribute("x",540+30*k);[].forEach.call(gMac.querySelectorAll(".oto"),function(c,i){c.setAttribute("cx",560+i*36+30*k);});MH.forEach(function(h,i){h.setAttribute("x2",570+i*60+20*k);});}

/* ---- taste and smell ---- */
var gCh=G("chem");
box(gCh,350,40,200,50,"cortex","tn",15);
box(gCh,370,230,160,46,"thalamus","tn",14);
box(gCh,640,150,220,46,"limbic system","tm",14,MAROON);
el("rect",{x:80,y:380,width:110,height:90,rx:24,fill:"#fff",stroke:NAVY,"stroke-width":3},gCh);tx(gCh,135,494,"taste cell (not a neuron)","t",13,"middle");
el("line",{x1:700,y1:470,x2:700,y2:380,stroke:NAVY,"stroke-width":6},gCh);el("circle",{cx:700,cy:470,r:20,fill:NAVY},gCh);tx(gCh,700,510,"olfactory neuron","t",13,"middle");
var tP=poly(gCh,[[190,420],[300,420],[340,330],[420,276],[440,230],[450,90]],NAVY,4);
var sP=poly(gCh,[[700,380],[700,300],[560,90]],MAROON,4);
var sL=poly(gCh,[[700,300],[750,196]],MAROON,4);
tx(gCh,330,350,"brainstem","t",13,"end");tx(gCh,712,330,"olfactory bulb","t",13,"start");
var naT=el("g",{},gCh);arrow(naT,135,330,135,378,MAROON,5);tx(naT,152,346,"Na+ enters directly","tm",14,"start");
var cs=[dot(gCh,NAVY,9),dot(gCh,MAROON,9),dot(gCh,MAROON,9)];

makeCap();
function resetAll(){wave.setAttribute("d","");hide([sw].concat(cs));bend(0);hk.setAttribute("display","none");hglu.forEach(function(g){g.setAttribute("display","none");});hTrain.setAttribute("d","");
  peak.setAttribute("d","");pkT.textContent="";WA.forEach(function(g){g.innerHTML="";});wbT.textContent="";RNT.forEach(function(t){t.textContent="";});
  cupula(0);endo.setAttribute("display","none");head.setAttribute("display","none");spinT.textContent="";spinT2.textContent="";tilt(0);naT.setAttribute("display","none");cap("");}
function S(l){only(l.concat(["cap"]));resetAll();}
function waveD(k,len){var x0=330,pts="M"+x0+" 240";for(var x=0;x<=530*k;x+=6){var amp=len==="short"?18*Math.exp(-x/120):18*Math.sin(Math.PI*x/(530*k||1));pts+=" L"+(x0+x)+" "+(240+amp*Math.sin(x/14));}return pts;}

var STEPS=[
{sec:"From air to fluid",comp:"Competency 20",
 title:"Sound is a pressure wave",
 text:["Sound is a wave of pressure in the air: alternating regions where air molecules are pushed together and pulled apart. The number of waves per second is the frequency, which we hear as pitch, measured in hertz. The size of the pressure change is the amplitude, which we hear as loudness.","The wave travels down the ear canal and hits the tympanic membrane, the eardrum, which vibrates. Three tiny bones in the middle ear, the ossicles, carry the vibration to the oval window, a membrane-covered opening into the cochlea. The cochlea is a coiled tube filled with fluid, drawn here unrolled."],
 auto:true,
 desc:"From left to right: the ear canal, the maroon tympanic membrane, three gray ossicles, and the cochlea drawn as a long fluid-filled box with the basilar membrane running along its middle. The oval window and the round window are gold marks on its left end.",
 pre:function(){S(["ear"]);},
 play:function(a){return run(sw,[[40,230],[214,230],[250,214],[314,226],[330,216]],1200,a).then(function(){cap("Air, eardrum, ossicles, oval window");});}},

{title:"Why the middle ear has bones",
 text:["Sound in air does not pass easily into a liquid. Most of the energy of a sound wave hitting water simply reflects off the surface."],
 ask:"The eardrum is about 20 times larger in area than the oval window. How does that help get sound into the cochlear fluid?",
 ans:["The ossicles collect the force from the whole large eardrum and deliver it onto the small oval window. The same force on a much smaller area means a much higher pressure, and the lever action of the ossicles adds a little more. That raised pressure is enough to move the fluid in the cochlea.","Without it, most sound energy would bounce back at the air-fluid boundary. The ossicles are correcting for that mismatch between air and fluid, and when they are stiffened or broken, hearing drops sharply."],
 desc:"Two boxes appear below the ear: eardrum area about 20 times the oval window, and same force on a smaller area, higher pressure.",
 pre:function(){S(["ear"]);},
 play:function(a){REG.imp.setAttribute("display","");return run(sw,[[214,230],[250,214],[314,226],[330,216]],900,a).then(function(){cap("Small window, high pressure");});}},

{title:"Inside the cochlea",
 text:["The cochlea is a coiled tube divided lengthwise into three fluid-filled ducts. The vestibular duct starts at the oval window, and the tympanic duct ends at the round window; the two connect at the far tip, the helicotrema. Between them lies the cochlear duct, filled with endolymph, which is unusually high in K+. The floor of the cochlear duct is the basilar membrane, and on it sits the organ of Corti, with its hair cells reaching up into the tectorial membrane above them.", "The stapes pushes the oval window in and pulls it out with each vibration. The fluid inside the cochlea cannot be compressed."],
 ask:"If the fluid cannot be squeezed, what has to happen for the oval window to push in at all, and what does the pressure wave do to the basilar membrane?",
 ans:["Something has to give at the other end: the round window bulges outward each time the oval window is pushed in. The pressure wave travels through the cochlear fluid, and as it passes, the basilar membrane bows up and down.", "When the basilar membrane moves, the hair cells on it move against the tectorial membrane above them, and the stereocilia bend. That bending is the next step."],
 name:"organ of Corti",
 desc:"The oval window pushes in, a wave travels along the basilar membrane, and the round window bulges out into the middle ear.",
 pre:function(){S(["ear"]);},
 play:function(a){return tweenVal(0,1,1300,a,function(k){wave.setAttribute("d",waveD(k));rw.setAttribute("x1",330-10*k);rw.setAttribute("x2",330-10*k);}).then(function(){cap("Round window gives, membrane moves");});}},

{title:"Bending the hair cells",
 text:["Each hair cell has a bundle of stereocilia on top, arranged from short to tall. Fine tip links connect the tip of each one to the side of its taller neighbor, and the tip links act like trap doors on mechanically gated cation channels. Even at rest, about 10 percent of these channels are open, so the hair cell releases a little transmitter all the time and its sensory neuron fires a steady, tonic signal. The tops of the hair cells sit in endolymph, which is unusually high in K+."],
 ask:"The basilar membrane moves and the stereocilia bend toward the tallest one. What happens to the channels, to the hair cell, and to the auditory nerve? And what happens when they bend the other way?",
 ans:["Bending toward the tallest stereocilium stretches the tip links and opens more channels. Because the endolymph is so high in K+, K+ flows into the hair cell, which is unusual, and the cell depolarizes. Voltage-gated Ca2+ channels at the base open, the hair cell releases more neurotransmitter onto its sensory neuron, and the action potential frequency goes up.", "Bending the other way closes the channels that were open at rest. Less cation enters, the cell hyperpolarizes, transmitter release falls, and the sensory neuron fires less or stops. Because the resting signal can go either up or down, the nerve's firing follows the vibration in both directions. Like a photoreceptor, a hair cell makes graded receptor potentials, not action potentials."],
 name:"hair cell transduction",
 desc:"One hair cell is shown large, with four stereocilia from short to tall joined by a gold tip link line. The stereocilia bend toward the tallest, a maroon arrow shows potassium entering, gold glutamate dots appear at the base, and spikes appear on the auditory nerve.",
 pre:function(){S(["hc"]);},
 play:function(a){return tweenVal(0,1,700,a,bend).then(function(){hk.setAttribute("display","");hglu.forEach(function(g){g.setAttribute("display","");});return growTrain(hTrain,function(k){return trainWin(560,470,280,0,k,Math.round(8*k),26);},800,a);}).then(function(){cap("Bend, K+ in, glutamate out");});}},

{title:"High and low pitch",
 text:["The basilar membrane is not the same along its length. Near the oval window, at the base, it is narrow and stiff. At the far end, the apex, it is wide and flexible."],
 ask:"Where along the membrane does a high-pitched sound make it vibrate most, and where does a low-pitched sound? How is loudness coded?",
 ans:["A high-pitched sound makes it vibrate most near the base, where it is narrow and stiff. A low-pitched sound makes it vibrate most near the apex, where it is wide and flexible. So pitch is coded by place: which hair cells are bent the most tells the brain the frequency.","Loudness is coded by rate. A louder sound of the same pitch makes the membrane move farther at the same place, so those hair cells release more transmitter and the auditory nerve fibers fire faster, and more neighboring fibers join in. High-frequency hair cells near the base are usually the first lost with age and noise."],
 name:"place coding of pitch",
 desc:"The basilar membrane drawn as a strip, narrow at the base on the left and wide at the apex on the right. A peak appears near the base labeled high pitch, then moves to near the apex labeled low pitch.",
 pre:function(){S(["bm"]);},
 play:function(a){peak.setAttribute("d",peakAt(240,60));pkT.textContent="high pitch: peak near the base";pkT.setAttribute("x",240);
   return wait(1000,a).then(function(){return tweenVal(240,720,1000,a,function(x){peak.setAttribute("d",peakAt(x,60));});}).then(function(){pkT.textContent="low pitch: peak near the apex";pkT.setAttribute("x",720);cap("Pitch by place, loudness by rate");});}},

{sec:"Hearing loss",comp:"Competency 21",
 title:"The Weber test",
 text:["Hearing loss is either conductive, where sound cannot get through the outer or middle ear, as with earwax or fluid behind the eardrum, or sensorineural, where the cochlea or the auditory nerve is damaged.","In the Weber test, a vibrating tuning fork is placed on the middle of the forehead. The vibration travels through the skull bone straight to both cochleas, bypassing the outer and middle ear."],
 ask:"Where is the sound heard louder in a person with a conductive loss in the right ear, and in a person with a sensorineural loss in the right ear?",
 ans:["Conductive loss in the right ear: louder in the right ear, the bad one. The blocked middle ear stops room noise from reaching that cochlea and keeps the bone-conducted sound from escaping, while the cochlea itself is fine. Sensorineural loss in the right ear: louder in the left ear, the good one, because the damaged right cochlea or nerve cannot respond well.","With normal hearing, the sound is heard in the middle or equally in both ears. The two kinds of loss send the sound to opposite ears, so Weber alone tells you there is a difference between the ears but not which ear is the bad one. That is what the Rinne test is for."],
 name:"Weber test",
 desc:"Three heads from the front, each with a tuning fork on the forehead. Normal: arrows to both ears. Conductive loss in the right ear: a bold arrow to the right ear. Sensorineural loss in the right ear: a bold arrow to the left ear.",
 pre:function(){S(["weber"]);},
 play:function(a){return wait(500,a).then(function(){weberArrows();wbT.textContent="conductive: toward the bad ear.  sensorineural: toward the good ear";cap("Weber: two losses, opposite ears");});}},

{title:"The Rinne test",
 text:["In the Rinne test, the vibrating fork is held on the mastoid bone behind the ear until the sound fades, then moved beside the ear canal. The test compares bone conduction with air conduction in one ear."],
 ask:"In a normal ear, which is heard longer, air or bone? And in an ear with a conductive loss?",
 ans:["In a normal ear, air conduction is heard longer, because the eardrum and ossicles make air a better route into the cochlea than bone. With a conductive loss, bone conduction is heard longer than air, because bone bypasses the blocked outer or middle ear.","With a sensorineural loss, air is still heard longer than bone, as in a normal ear, but both are heard for a shorter time than normal. Put the two tests together and you can locate the loss: Weber points to an ear, and Rinne in that ear tells you which kind of loss it is."],
 name:"Rinne test",
 desc:"Three boxes: normal, air longer than bone; conductive loss, bone longer than air; sensorineural loss, air longer than bone, both shorter.",
 pre:function(){S(["rinne"]);},
 play:function(a){return wait(500,a).then(function(){rinneShow();cap("Rinne: bone longer means conductive");});}},

{sec:"Balance",comp:"Competency 22",
 title:"Turning the head",
 text:["Equilibrium has a dynamic part, which tells you how you are moving, and a static part, which tells you whether your head is tilted. The brain combines the inner ear with proprioceptors in muscles and joints, and with vision.", "The inner ear's vestibular apparatus is a set of fluid-filled chambers: two otolith organs, the utricle and saccule, and three semicircular canals at right angles to one another. Like the cochlear duct, it is filled with endolymph, high in K+ and low in Na+. Its hair cells work like those in the cochlea, with one long cilium, the kinocilium, at one side of each bundle that sets the direction of bending: bend toward it and the cell depolarizes, bend away and it hyperpolarizes.", "At one end of each canal is a swelling, the ampulla, holding a crista: hair cells whose cilia are embedded in a gel flap, the cupula, that closes off the ampulla like a door. The horizontal canal senses turning, as in shaking your head no; the superior canal senses nodding yes or a somersault; the posterior canal senses tilting toward a shoulder or a cartwheel."],
 ask:"You turn your head quickly to the right. What happens to the endolymph and the cupula?",
 ans:["The canal turns with your head, but the endolymph inside lags behind because of inertia. In the ampulla, the drag of the fluid bends the cupula and its hair cells in the direction opposite the turn, to the left. Think of pulling a paintbrush to the right through sticky wet paint: the bristles bend to the left.", "The semicircular canals detect rotational acceleration, speeding up or slowing down a turn. Three canals at right angles cover rotation in any direction."],
 name:"semicircular canals",
 desc:"A ring-shaped canal with a gold cupula across it. A maroon arrow shows the head turning right. A navy arrow shows the endolymph lagging, and the cupula bends.",
 pre:function(){S(["canal"]);},
 play:function(a){head.setAttribute("display","");headT.textContent="head starts turning";endo.setAttribute("display","");endoArrow.setAttribute("x1",320);endoArrow.setAttribute("x2",180);
   return tweenVal(0,-1,700,a,cupula).then(function(){spinT.textContent="cupula bends";spinT2.textContent="hair cells signal rotation";cap("Fluid lags, cupula bends");});}},

{title:"Spinning, then stopping",
 text:["Now you spin on a chair at a steady speed for half a minute, then stop suddenly."],
 ask:"During the steady spin, what does the cupula do? And the instant you stop, what do you feel, and why?",
 ans:["During the steady spin, the endolymph finally catches up and turns with the canal, nothing pushes on the cupula, and the signal of turning fades even though you are still spinning. When you stop, the fluid has built up momentum and keeps moving in the direction of the spin, bending the cupula the other way.", "You feel as if you are still turning, and if the feeling is strong, you may reflexively throw your body the opposite way to compensate. Dancers avoid this by spotting: they keep their eyes on one point and whip the head around, so the head stops between turns and the fluid never builds up much momentum."],
 name:"rotational acceleration",
 desc:"During the steady spin, the cupula sits upright with no endolymph arrow. When the head stops, the endolymph arrow points forward and the cupula bends the other way.",
 pre:function(){S(["canal"]);head.setAttribute("display","");headT.textContent="steady spin";},
 play:function(a){spinT.textContent="steady: cupula upright";return wait(900,a).then(function(){headT.textContent="stop!";endo.setAttribute("display","");endoArrow.setAttribute("x1",180);endoArrow.setAttribute("x2",320);return tweenVal(0,1,700,a,cupula);}).then(function(){spinT.textContent="stop: cupula bends the other way";spinT2.textContent="you feel yourself turning";cap("Stopping feels like turning back");});}},

{title:"Tilting the head",
 text:["The utricle and saccule each hold a macula: hair cells whose cilia are embedded in a gel layer, the otolith membrane, topped with otoliths, small particles of calcium carbonate and protein. When the head is upright, the macula of the utricle lies horizontal and the macula of the saccule stands vertical."],
 ask:"You tilt your head back, or a car you are sitting in speeds up. What happens to the otolith layer, and what does that tell the brain? Which organ would tell you an elevator is dropping?",
 ans:["Gravity or acceleration makes the heavy otoliths slide, and the otolith membrane slides with them, bending the hair cells beneath. The brain reads the pattern of depolarized and hyperpolarized hair cells as head position or linear acceleration. The horizontal utricle senses forward acceleration or deceleration and head tilt; the vertical saccule senses vertical forces, so it reports the dropping elevator.", "Vestibular hair cells are tonically depolarized and release transmitter onto sensory neurons of the vestibular branch of cranial nerve VIII. These either synapse in the vestibular nuclei of the medulla or run straight to the cerebellum, the main site for processing equilibrium. Pathways from the vestibular nuclei also go to the motor neurons that move the eyes, which keeps your gaze locked on an object while your head turns."],
 name:"utricle and saccule",
 desc:"A macula: a row of navy hair cells under a gel layer studded with gold otoliths. The gel layer slides to the right and the hair cells bend with it.",
 pre:function(){S(["mac"]);},
 play:function(a){return tweenVal(0,1,1000,a,tilt).then(function(){cap("Otoliths slide, hairs bend");});}},

{title:"Two kinds of dizziness",
 text:["Endolymph is secreted continuously and drains into a venous sinus in the dura, much like cerebrospinal fluid. Two patients see an ear specialist for dizziness.","Anant has attacks of severe spinning that come without warning and can last up to an hour, often with vomiting. He has a low buzzing in one ear, called tinnitus, that worsens during attacks, and he no longer hears low tones well. A second patient has brief, severe dizziness only when she changes position, such as lying down or rolling over in bed."],
 ask:"Which patient has positional vertigo and which has Ménière's disease? Explain each one with the structures from this section.",
 ans:["The second patient has positional vertigo. Otoliths have come loose from the otolith membrane of a macula and float into the semicircular canals. When she changes position, they move through the endolymph and push on a cupula, so the canal reports rotation that is not happening, and the dizziness passes once they settle.","Anant has Ménière's disease, in which endolymph is produced faster than it drains and builds up pressure in the inner ear. That pressure disturbs the vestibular apparatus, causing the long attacks of vertigo, and can damage the organ of Corti in the cochlear duct next door, which explains his tinnitus and his low-tone hearing loss. A balance problem with hearing symptoms points to the shared fluid system of the inner ear."],
 name:"Ménière's disease",
 desc:"The ring-shaped semicircular canal with its cupula, standing for the canals that loose otoliths can disturb.",
 pre:function(){S(["canal"]);},
 play:function(a){return tweenVal(0,0.6,700,a,cupula).then(function(){cap("Loose crystals or too much fluid");});}},

{sec:"Taste and smell",comp:"Competency 23",
 title:"Salty and sour",
 text:["Taste, or gustation, is a combination of five basic tastes: sweet, sour, salty, bitter, and umami, the savory taste of the amino acid glutamate. Each one tells the body something: sour signals H+ and salty signals Na+, two ions the body regulates closely; sweet and umami signal nutritious food; and bitter warns of possible toxins.", "Taste buds hold taste receptor cells, which are not neurons. They are nonneural epithelial cells with a tiny tip reaching the mouth through a taste pore. Type I cells are support cells. Type II cells are receptor cells for sweet, bitter and umami. Type III cells, the presynaptic cells, respond to sour. Each taste receptor cell senses only one taste. A tastant has to dissolve in saliva before it can be tasted."],
 ask:"Sour taste comes from H+. Follow it into a type III cell. How could H+ entering the cell end with a signal to the sensory neuron?",
 ans:["H+ enters the type III cell through a proton channel. The depolarization and the acid inside the cell close a K+ leak channel, so less K+ leaves, and then open Na+ channels and Ca2+ channels, depolarizing the cell further. Ca2+ entry triggers exocytosis of serotonin, which excites the primary sensory neuron. Carbonation tastes sharp for a related reason: an enzyme on the sour cells turns dissolved CO2 into H+.", "Salty taste in humans is less well understood. In the simplest model, Na+ enters a taste cell through an apical ion channel, depolarizes it, and through steps not yet known, a signal molecule is released onto the sensory neuron."],
 name:"type III presynaptic cell",
 desc:"A taste cell at the lower left with a maroon arrow showing sodium entering directly. A navy pathway runs from it through the brainstem and the thalamus to the cortex.",
 pre:function(){S(["chem"]);REG.chem.querySelectorAll("polyline")[1].setAttribute("display","none");REG.chem.querySelectorAll("polyline")[2].setAttribute("display","none");},
 play:function(a){naT.setAttribute("display","");return run(cs[0],[[190,420],[300,420],[340,330],[420,276],[440,230],[450,90]],1500,a).then(function(){cap("Salt: Na+ in, through the thalamus");});}},

{title:"Sweet, bitter and umami",
 text:["Type II receptor cells carry G protein-coupled receptors on their tips: T1R receptors for sweet and umami, in different combinations, and many T2R receptors for bitter. Unlike type III cells, they do not release transmitter from vesicles."],
 ask:"A sweet molecule binds a type II cell. How could the cell get a signal to the sensory neuron without vesicles?",
 ans:["The receptor activates a G protein called gustducin, which activates the phospholipase C pathway. Ca2+ is released from stores inside the cell and opens Ca2+-activated Na+ channels, and Na+ entry depolarizes the cell. The depolarized cell releases ATP through a wide channel in its membrane, CALHM1, and the ATP excites the primary sensory neuron. Support cells break the leftover ATP down.", "From there, gustatory neurons carry the signal in cranial nerves VII, IX and X to the medulla, then through the thalamus to the gustatory cortex in the insula. The brain reads the taste from which groups of neurons respond most strongly, another case of population coding. The burn of chili and the cool of mint are not tastes at all: they come from TRP channels on nerve endings in the mouth, carried by the trigeminal nerve, cranial nerve V."],
 name:"gustducin",
 desc:"A taste cell at the lower left with a navy pathway through the brainstem and the thalamus to the cortex.",
 pre:function(){S(["chem"]);REG.chem.querySelectorAll("polyline")[1].setAttribute("display","none");REG.chem.querySelectorAll("polyline")[2].setAttribute("display","none");},
 play:function(a){return run(cs[0],[[190,420],[300,420],[340,330],[420,276],[440,230],[450,90]],1500,a).then(function(){cap("Taste: medulla, thalamus, insula");});}},

{title:"A smell and a memory",
 text:["Smell starts in the olfactory epithelium, a small patch high in the nasal cavity. Its olfactory sensory neurons are bipolar neurons: one dendrite reaches the surface and ends in cilia sitting in a layer of mucus, and one axon runs up through the bone to the olfactory bulb, on the underside of the frontal lobe. These neurons live only about two months and are replaced from stem cells.", "An odorant dissolves in the mucus and binds an olfactory receptor, a G protein-coupled receptor, on the cilia. That activates a G protein called Golf, cAMP rises, and cAMP-gated cation channels open and depolarize the neuron. Each neuron has one type of receptor, and the brain reads a smell from the combination of neurons firing, the way letters combine into words."],
 ask:"A smell can bring back a memory before you have even named the smell. Judging from the pathway, why?",
 ans:["The olfactory axons form cranial nerve I and synapse on secondary neurons in the olfactory bulb, many primary neurons converging on each one. From the bulb, the olfactory tract runs to the olfactory cortex without passing through the thalamus, the only sense that skips it. Pathways from the bulb also go directly to the amygdala and hippocampus, parts of the limbic system for emotion and memory.", "So a smell reaches the brain's emotion and memory regions directly, which is why odors can call up memories so strongly. Processing also starts early: signals are modulated in the epithelium and in the bulb, including by pathways coming back down from the cortex."],
 name:"olfactory pathway",
 desc:"An olfactory neuron at the lower right. A maroon pathway runs from it through the olfactory bulb directly to the cortex, with a branch to the limbic system, and does not pass through the thalamus box.",
 pre:function(){S(["chem"]);var p=REG.chem.querySelectorAll("polyline");p[1].setAttribute("display","none");p[2].setAttribute("display","none");},
 play:function(a){var p=REG.chem.querySelectorAll("polyline");p[1].setAttribute("display","");p[2].setAttribute("display","");
   return Promise.all([run(cs[1],[[700,380],[700,300],[560,90]],1200,a),run(cs[2],[[700,380],[700,300],[750,196]],1000,a)]).then(function(){cap("Smell skips the thalamus");});}},

{title:"When food loses its taste",
 text:["With a bad cold, or after COVID-19, many people find that food suddenly tastes like almost nothing, even though their taste buds still work."],
 ask:"If the taste buds still work, why does food taste so bland? And why do most people get their sense of smell back?",
 ans:["Much of what we call the taste of food is actually its smell. The tongue reports only the five basic tastes; the rich flavor of a food comes from odor molecules reaching the olfactory epithelium. Lose smell, which is anosmia, and food is left with only sweet, salty, sour, bitter and umami.", "Most people recover because olfactory sensory neurons are replaced every couple of months from stem cells in the epithelium, though some people have reduced smell for years. Loss of smell can also be an early sign of Alzheimer's and Parkinson's disease, so it is being studied as an early warning."],
 name:"anosmia",
 desc:"The olfactory neuron and its pathway to the cortex and limbic system remain on screen.",
 pre:function(){S(["chem"]);},
 play:function(a){return wait(400,a).then(function(){cap("Flavor is mostly smell");});}},

{sec:"Review",comp:"Competencies 20 to 23",
 title:"Summary with the scientific terms",
 text:["Sound vibrates the tympanic membrane, and the ossicles raise the pressure at the oval window so the wave enters the cochlear fluid. The basilar membrane moves, stereocilia bend, tip links open channels, potassium enters, and the hair cell releases glutamate onto the auditory nerve. Pitch is coded by place along the membrane and loudness by rate. Weber and Rinne together separate conductive from sensorineural loss.","Semicircular canals detect rotational acceleration when endolymph drags the cupula of the crista; the utricle and saccule detect head position and linear acceleration when otoliths shift the otolith membrane of the macula. Vestibular signals go mainly to the cerebellum and to the eye muscles. Loose otoliths cause positional vertigo; too much endolymph contributes to Ménière's disease. Taste has five basic tastes. Sour enters type III cells as H+ and releases serotonin; sweet, bitter and umami bind G protein-coupled receptors on type II cells, which release ATP; salt is thought to enter through a Na+ channel. Taste travels in cranial nerves VII, IX and X to the medulla, thalamus and insula. Smell uses G protein-coupled receptors, Golf and cAMP on olfactory neurons whose axons form cranial nerve I; it reaches the olfactory cortex and limbic system without a thalamic relay."],
 ask:"Without scrolling back, a patient hears the Weber fork louder in the left ear, and in the left ear bone conduction lasts longer than air. Which kind of hearing loss is this, and in which ear?",
 ans:["A conductive loss in the left ear. Weber lateralizes toward an ear with a conductive loss, and Rinne in that ear shows bone longer than air, which only happens when the outer or middle ear is blocked.","If you were unsure, go back to the two testing steps and draw the Weber heads and the Rinne results from memory."],
 desc:"The hair cell bends and the auditory nerve fires.",
 pre:function(){S(["hc"]);},
 play:function(a){return tweenVal(0,1,700,a,bend).then(function(){hk.setAttribute("display","");return growTrain(hTrain,function(k){return trainWin(560,470,280,0,k,Math.round(8*k),26);},700,a);}).then(function(){cap("Bend, transduce, fire");});}}
];
