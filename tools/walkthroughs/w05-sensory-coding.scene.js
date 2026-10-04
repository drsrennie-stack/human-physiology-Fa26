/* Sensory receptors and coding. Oct 4 2026. Week 5 competencies 8 to 12.
   Panels shown and hidden per step: a sensory neuron with three recording
   boxes, three stimulus strengths, a body with the five receptor classes,
   the labeled lines to cortex, two skin patches with receptive fields,
   three neurons with lateral inhibition, and two adaptation tracings. */

/* ---- the sensory neuron ---- */
var gNeu=G("neu");
var AY=210;
el("line",{x1:120,y1:AY,x2:860,y2:AY,stroke:NAVY,"stroke-width":9,"stroke-linecap":"round"},gNeu);
[[96,AY-34],[90,AY],[96,AY+34]].forEach(function(q){el("line",{x1:120,y1:AY,x2:q[0],y2:q[1],stroke:NAVY,"stroke-width":6,"stroke-linecap":"round"},gNeu);});
for(var i=0;i<5;i++){el("rect",{x:330+i*106,y:AY-15,width:88,height:30,rx:14,fill:"#fff",stroke:NAVY,"stroke-width":3},gNeu);}
el("polygon",{points:"236,"+(AY-22)+" 290,"+(AY-8)+" 290,"+(AY+8)+" 236,"+(AY+22),fill:GDEEP},gNeu);
tx(gNeu,92,AY+66,"receptor ending","t",14,"middle");
tx(gNeu,262,AY+50,"trigger zone","tm",14,"middle");
tx(gNeu,700,AY+50,"axon, toward the spinal cord","t",14,"middle");
/* recording boxes */
var REC=[[40,240,"at the ending"],[300,260,"at the trigger zone"],[600,260,"along the axon"]];
var RT=[];
REC.forEach(function(r){el("rect",{x:r[0],y:26,width:r[1],height:110,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gNeu);tx(gNeu,r[0]+8,46,r[2],"t",13,"start");RT.push(trainPath(gNeu,MAROON,3));});
var thr=el("line",{x1:40,y1:84,x2:280,y2:84,stroke:MAROON,"stroke-width":1.5,"stroke-dasharray":"6 5"},gNeu);
tx(gNeu,276,80,"threshold","tm",12,"end");
function bump(k){var x0=50,w=220,y0=124,h=60*k;return "M"+x0+" "+y0+" H"+(x0+40)+" C"+(x0+60)+" "+(y0-h)+" "+(x0+170)+" "+(y0-h)+" "+(x0+190)+" "+y0+" H"+(x0+w);}
var press=el("g",{},gNeu);
arrow(press,90,AY-110,90,AY-50,MAROON,7);
tx(press,104,AY-86,"pressure","tm",14,"start");
var sig=dot(gNeu,MAROON,9);

/* ---- three stimulus strengths ---- */
var gStr=G("str");
var SC=[[90,"weak",30,2],[360,"medium",60,5],[630,"strong",90,10]];
var SB=[],SRP=[],SSP=[];
SC.forEach(function(c){
  tx(gStr,c[0]+100,40,c[1],"tn",16,"middle");
  el("line",{x1:c[0],y1:150,x2:c[0]+200,y2:150,stroke:INK2,"stroke-width":1.5},gStr);
  SB.push(el("rect",{x:c[0]+40,y:150-c[2],width:120,height:c[2],fill:GDEEP,opacity:.85},gStr));
  tx(gStr,c[0]+100,172,"stimulus","t",12,"middle");
  SRP.push(el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3},gStr));
  tx(gStr,c[0]+100,300,"receptor potential","t",12,"middle");
  SSP.push(trainPath(gStr,MAROON,2.5));
  tx(gStr,c[0]+100,440,"action potentials","t",12,"middle");
});
function rp(c,k){var x=c[0],y=280,h=c[2]*0.8*k;return "M"+x+" "+y+" H"+(x+40)+" C"+(x+50)+" "+(y-h)+" "+(x+150)+" "+(y-h)+" "+(x+160)+" "+y+" H"+(x+200);}

/* ---- the body and the five classes ---- */
var gBody=G("body");
el("circle",{cx:250,cy:90,r:48,fill:"#fff",stroke:NAVY,"stroke-width":4},gBody);
el("rect",{x:196,y:146,width:108,height:170,rx:30,fill:"#fff",stroke:NAVY,"stroke-width":4},gBody);
[[196,170,130,300],[304,170,370,300],[220,316,200,470],[280,316,300,470]].forEach(function(l){el("line",{x1:l[0],y1:l[1],x2:l[2],y2:l[3],stroke:NAVY,"stroke-width":10,"stroke-linecap":"round"},gBody);});
var CL=[[232,82,"photoreceptor: light, in the retina"],[262,140,"chemoreceptor: blood O2, CO2, pH, in the carotid body"],[250,60,"thermoreceptor: temperature, in the hypothalamus and skin"],[130,300,"mechanoreceptor: touch, in the skin of the hand"],[200,450,"nociceptor: tissue damage, in skin, joints and organs"]];
var CLD=[],CLT=[];
CL.forEach(function(c,i){CLD.push(badge(gBody,c[0],c[1],String(i+1),i%2?NAVY:MAROON,12));CLT.push(tx(gBody,430,70+i*70,(i+1)+". "+c[2],"tn",15,"start"));});
function classes(n){CLD.forEach(function(d,i){d.setAttribute("display",i<n?"":"none");});CLT.forEach(function(t,i){t.setAttribute("display",i<n?"":"none");});}

/* ---- labeled lines ---- */
var gLine=G("line");
box(gLine,560,40,280,60,"visual cortex\n(back of the brain)","tn",15);
box(gLine,560,170,280,60,"somatosensory cortex\n(top of the brain)","tn",15);
el("ellipse",{cx:120,cy:120,rx:46,ry:30,fill:"#fff",stroke:NAVY,"stroke-width":3},gLine);
el("circle",{cx:120,cy:120,r:12,fill:NAVY},gLine);
tx(gLine,120,175,"eye","t",14,"middle");
el("rect",{x:80,y:250,width:90,height:50,rx:20,fill:"#fff",stroke:NAVY,"stroke-width":3},gLine);
tx(gLine,125,325,"back of the hand","t",14,"middle");
var L1=poly(gLine,[[166,120],[360,120],[560,70]],NAVY,5),L2=poly(gLine,[[170,275],[360,275],[560,200]],MAROON,5);
var pressEye=el("g",{},gLine);arrow(pressEye,60,60,98,98,MAROON,6);tx(pressEye,40,52,"press","tm",14,"start");
var pressHand=el("g",{},gLine);arrow(pressHand,125,200,125,244,MAROON,6);tx(pressHand,140,212,"press","tm",14,"start");
var perc1=tx(gLine,700,128,"perceived: a flash of light","tm",16,"middle"),perc2=tx(gLine,700,258,"perceived: pressure on the hand","tm",16,"middle");
var lsig1=dot(gLine,NAVY,9),lsig2=dot(gLine,MAROON,9);

/* ---- receptive fields ---- */
var gRf=G("rf");
el("rect",{x:60,y:60,width:340,height:300,rx:16,fill:TISS,stroke:MAROON,"stroke-width":3},gRf);
el("rect",{x:480,y:60,width:340,height:300,rx:16,fill:TISS,stroke:MAROON,"stroke-width":3},gRf);
tx(gRf,230,46,"fingertip","tn",17,"middle");tx(gRf,650,46,"middle of the back","tn",17,"middle");
for(var r=0;r<5;r++)for(var c=0;c<6;c++){el("circle",{cx:100+c*52,cy:100+r*56,r:20,fill:"none",stroke:NAVY,"stroke-width":2},gRf);}
for(r=0;r<2;r++)for(c=0;c<2;c++){el("circle",{cx:570+c*160,cy:140+r*150,r:72,fill:"none",stroke:NAVY,"stroke-width":2},gRf);}
var CAL=[];
[[204,212,256,212],[624,212,676,212]].forEach(function(q){var g=el("g",{},gRf);el("circle",{cx:q[0],cy:q[1],r:7,fill:GDEEP},g);el("circle",{cx:q[2],cy:q[3],r:7,fill:GDEEP},g);CAL.push(g);});
var rfA=tx(gRf,230,400,"","tm",17,"middle"),rfB=tx(gRf,650,400,"","tm",17,"middle");

/* ---- lateral inhibition ---- */
var gLat=G("lat");
var LX=[220,450,680];
LX.forEach(function(x,i){el("line",{x1:x,y1:60,x2:x,y2:250,stroke:NAVY,"stroke-width":6},gLat);tx(gLat,x,46,["left","middle","right"][i]+" neuron","t",14,"middle");});
el("line",{x1:120,y1:30,x2:780,y2:30,stroke:GDEEP,"stroke-width":5},gLat);
tx(gLat,450,22,"","t",13,"middle");
var latInh=el("g",{},gLat);
[[450,150,250,150],[450,150,650,150]].forEach(function(l){el("circle",{cx:(l[0]+l[2])/2,cy:l[1],r:9,fill:INK2},latInh);arrow(latInh,l[0],l[1],l[2]+(l[2]>l[0]?-30:30),l[3],INK2,3);});
tx(latInh,450,186,"inhibitory interneurons","t",13,"middle");
var LB=LX.map(function(x){return el("rect",{x:x-30,y:470,width:60,height:0,fill:MAROON},gLat);});
LX.forEach(function(x){tx(gLat,x,494,"","t",12,"middle");});
var latT=tx(gLat,450,300,"firing rate sent up","tn",15,"middle");
el("line",{x1:150,y1:470,x2:750,y2:470,stroke:INK2,"stroke-width":2},gLat);
function bars(v){LB.forEach(function(b,i){b.setAttribute("y",470-v[i]);b.setAttribute("height",v[i]);});}

/* ---- adaptation ---- */
var gAd=G("adapt");
el("line",{x1:100,y1:120,x2:840,y2:120,stroke:INK2,"stroke-width":1.5},gAd);
el("rect",{x:200,y:70,width:520,height:50,fill:GDEEP,opacity:.85},gAd);
tx(gAd,80,100,"stimulus","t",13,"end");
tx(gAd,80,230,"tonic","tn",15,"end");tx(gAd,80,350,"phasic","tn",15,"end");
var AT=trainPath(gAd,NAVY,2.5),AP=trainPath(gAd,MAROON,2.5);
tx(gAd,460,262,"","t",13,"middle");
var adT1=tx(gAd,470,280,"keeps firing while the stimulus lasts","t",14,"middle"),adT2=tx(gAd,470,400,"fires at the start and the end, silent in between","t",14,"middle");
function phasicD(k){var x0=100,w=740,y=330,h=40,d="M"+x0+" "+y;var on=[204,214,224,236],off=[724,736];var all=on.concat(off);all.forEach(function(sx){if(sx<=x0+w*k)d+=" H"+(sx-3)+" L"+sx+" "+(y-h)+" L"+(sx+3)+" "+y;});return d+" H"+(x0+w*k);}
function tonicD(k){var x0=100,w=740,y=210,h=40,d="M"+x0+" "+y;for(var sx=206;sx<720;sx+=18+((sx-200)/40)){if(sx<=x0+w*k)d+=" H"+(sx-3)+" L"+sx+" "+(y-h)+" L"+(sx+3)+" "+y;}return d+" H"+(x0+w*k);}

makeCap();
function resetAll(){
  RT.forEach(function(p){p.setAttribute("d","");});press.setAttribute("display","none");thr.setAttribute("display","");sig.setAttribute("display","none");
  SB.forEach(function(b){b.setAttribute("opacity",.85);});SRP.forEach(function(p){p.setAttribute("d","");});SSP.forEach(function(p){p.setAttribute("d","");});
  classes(0);[pressEye,pressHand,perc1,perc2].forEach(function(g){g.setAttribute("display","none");});hide([lsig1,lsig2]);
  CAL.forEach(function(g){g.setAttribute("display","none");});rfA.textContent="";rfB.textContent="";
  latInh.setAttribute("display","none");bars([0,0,0]);
  AT.setAttribute("d","");AP.setAttribute("d","");adT1.setAttribute("display","none");adT2.setAttribute("display","none");cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}

/* ======================= steps ======================= */
var STEPS=[
{sec:"From stimulus to signal",comp:"Competency 8",
 title:"A touch receptor in the skin",
 text:["This is one sensory neuron. Its receptor ending sits in the skin on the left. Its axon runs to the right, toward the spinal cord. Just past the ending is the trigger zone, the first stretch of membrane with enough voltage-gated sodium channels to fire an action potential.","The three boxes along the top will record the membrane potential at three places: at the receptor ending, at the trigger zone, and farther along the axon. Right now the skin is untouched, so all three are flat."],
 auto:true,
 desc:"A sensory neuron runs across the middle of the figure. Its branched receptor ending is at the left, a gold trigger zone sits just past it, and a myelinated axon runs to the right. Three empty recording boxes sit above: at the ending, at the trigger zone, and along the axon. A dashed threshold line crosses the first box.",
 pre:function(){S(["neu"]);},
 play:function(a){RT[0].setAttribute("d",bump(0));return wait(300,a).then(function(){cap("Untouched skin, no signal");});}},

{title:"Pressing on the ending",
 text:["A light pressure now pushes on the skin over the receptor ending. The membrane of the ending is full of mechanically gated cation channels, the same kind you met in the channel gating walkthrough."],
 ask:"What does the pressure do at the ending, and is the change in membrane potential there graded or all-or-none?",
 ans:["The pressure deforms the membrane and opens mechanically gated channels. Sodium flows in and the ending depolarizes. The change is graded: a light press makes a small depolarization and a firmer press a bigger one, and it fades as it spreads, like any graded potential.","A graded potential produced by a stimulus at a sensory receptor is called a receptor potential. Converting the energy of a stimulus, here mechanical pressure, into a change in membrane potential is called sensory transduction."],
 name:"receptor potential",
 desc:"A maroon arrow presses down on the receptor ending. The first recording box shows a smooth bump that rises and then returns, staying below the dashed threshold line.",
 pre:function(){S(["neu"]);RT[0].setAttribute("d",bump(0));},
 play:function(a){press.setAttribute("display","");return tweenVal(0,0.55,900,a,function(k){RT[0].setAttribute("d",bump(k));}).then(function(){cap("Pressure, then a receptor potential");});}},

{title:"Reaching the trigger zone",
 text:["The pressure gets firmer, so the receptor potential gets bigger. It spreads from the ending to the trigger zone."],
 ask:"When will this neuron fire action potentials, and what will the action potentials look like at the trigger zone compared with farther along the axon?",
 ans:["It fires only when the receptor potential is still above threshold when it reaches the trigger zone. Then the trigger zone fires action potentials for as long as the depolarization stays above threshold.","Every action potential is the same size, at the trigger zone and all the way along the axon, because each one is regenerated at every node. The trigger zone is where the information changes form: a graded signal whose size matched the stimulus becomes a train of identical, all-or-none spikes. From here on, size can no longer carry the message."],
 desc:"The bump in the first box grows until it crosses threshold. A train of identical spikes appears in the trigger zone box and the same train appears in the axon box, while a dot travels along the axon.",
 pre:function(){S(["neu"]);press.setAttribute("display","");RT[0].setAttribute("d",bump(0.55));},
 play:function(a){return tweenVal(0.55,1,700,a,function(k){RT[0].setAttribute("d",bump(k));}).then(function(){return Promise.all([growTrain(RT[1],function(k){return trainWin(310,124,240,0,k,Math.round(7*k),70);},800,a),run(sig,[[290,AY],[860,AY]],1200,a)]);}).then(function(){RT[2].setAttribute("d",trainWin(610,124,240,0,1,7,70));cap("Above threshold: identical spikes");});}},

{title:"Weak, medium and strong",
 text:["The same receptor now gets three stimuli of different strengths. Under each stimulus is the receptor potential it makes, and under that the action potentials leaving the trigger zone."],
 ask:"Every spike is the same height. So what tells the brain that the third stimulus was the strongest?",
 ans:["The firing frequency. A bigger receptor potential stays further above threshold, so the trigger zone fires action potentials closer together: a few spikes for the weak stimulus, more for the medium one, and many for the strong one. Intensity is carried by how often the neuron fires, not by how big each spike is.","A stronger stimulus also spreads over a larger area and reaches the thresholds of more receptors, so more sensory neurons fire at once. That is population coding, and it works together with frequency coding."],
 name:"frequency coding",
 desc:"Three columns: weak, medium and strong stimulus bars of increasing height. Under each, a receptor potential bump of matching size. Under that, spike trains of equal height with 2, 5 and 10 spikes.",
 pre:function(){S(["str"]);SRP.forEach(function(p,i){p.setAttribute("d",rp(SC[i],1));});},
 play:function(a){return Promise.all(SC.map(function(c,i){return growTrain(SSP[i],function(k){return trainWin(c[0],420,200,0.2,0.2+0.6*k,Math.max(0,Math.round(c[3]*k)),60);},1000,a);})).then(function(){cap("Stronger stimulus, higher frequency");});}},

/* ---- classes ---- */
{sec:"Kinds of receptors",comp:"Competency 9",
 title:"Five kinds of stimulus",
 text:["Receptors are classified by the kind of stimulus they respond to. Mechanoreceptors respond to pressure, stretch, vibration and sound. Chemoreceptors respond to particular molecules. Thermoreceptors respond to temperature. Photoreceptors respond to light. Nociceptors respond to stimuli strong enough to damage tissue.","Most of these receptors are not on the skin at all. They sit inside the body and report on conditions you are never aware of."],
 auto:true,
 desc:"A body outline with five numbered markers: at the eye, the neck, the top of the head, the hand and the foot. A list on the right names each receptor class, its stimulus and its location.",
 pre:function(){S(["body"]);},
 play:function(a){var k=0;function nxt(){if(k>=5)return Promise.resolve();k++;classes(k);return wait(350,a).then(nxt);}return nxt().then(function(){cap("Classified by stimulus");});}},

{title:"A stretch sensor in an artery",
 text:["The walls of the carotid arteries in the neck contain sensory endings that fire faster when rising blood pressure stretches the wall."],
 ask:"Which class of receptor is this, and name one other receptor in this list that also sits inside the body rather than on the surface.",
 ans:["A mechanoreceptor, because its stimulus is stretch. These are the baroreceptors that report blood pressure, and you will use them again in the cardiovascular weeks. Muscle spindles from the reflex walkthrough are mechanoreceptors too.","Others inside the body include the chemoreceptors of the carotid body, which report oxygen, carbon dioxide and pH in the blood, thermoreceptors in the hypothalamus, which monitor the temperature of the blood, and nociceptors in joints and organs. Mechanoreceptors and nociceptors are spread over the most locations, because almost every tissue can be stretched or damaged."],
 name:"mechanoreceptor",
 desc:"The body outline with all five classes marked and listed.",
 pre:function(){S(["body"]);classes(5);},
 play:function(a){return wait(300,a).then(function(){cap("Stretch: a mechanoreceptor");});}},

/* ---- coding ---- */
{sec:"What the brain is told",comp:"Competency 10",
 title:"Pressing on a closed eye",
 text:["Two sensory pathways are drawn. One runs from the eye to the visual cortex at the back of the brain. The other runs from the back of the hand to the somatosensory cortex.","Gently pressing on a closed eyelid pushes on the eyeball, which is a mechanical stimulus, not light."],
 ask:"What do you perceive when you press on a closed eye, and why?",
 ans:["You see flashes or patches of light. The pressure fires some of the retina's neurons, and every signal on that pathway arrives in the visual cortex, which interprets anything it receives as light. The same pressure on the back of the hand is felt as pressure, because that pathway ends in the somatosensory cortex.","Each sensory pathway carries one modality, and the brain identifies the modality by which pathway is active and where it ends, not by what the stimulus actually was. This is the labeled line principle."],
 name:"labeled line coding",
 desc:"A navy line runs from the eye to a box labeled visual cortex and a maroon line from the back of the hand to a box labeled somatosensory cortex. Arrows press on the eye and the hand, dots travel each line, and the boxes read perceived: a flash of light, and perceived: pressure on the hand.",
 pre:function(){S(["line"]);},
 play:function(a){pressEye.setAttribute("display","");pressHand.setAttribute("display","");
   return Promise.all([run(lsig1,[[166,120],[360,120],[560,70]],1100,a),run(lsig2,[[170,275],[360,275],[560,200]],1100,a)]).then(function(){perc1.setAttribute("display","");perc2.setAttribute("display","");cap("The line decides the sensation");});}},

{title:"Location, intensity and duration",
 text:["Modality comes from the labeled line. Location comes from which sensory neurons are firing, because each one covers its own patch of the body and connects to its own spot in the cortex. Intensity comes from firing frequency and the number of neurons firing. Duration comes from how long the firing lasts."],
 ask:"Suppose an electrode stimulates the nerve to the hand partway up the arm, with no stimulus on the hand at all. What does the person feel, and where do they feel it?",
 ans:["They feel a sensation on the hand, in the area those nerve fibers normally serve, even though nothing touched the hand. The brain cannot tell where along the line the signal started, so it projects the sensation to the receptors at the end of the line.","This is the law of projection, and it is why a person with an amputated limb can feel pain in a limb that is no longer there: the nerve fibers that used to serve it are still being activated. Firing rate still codes intensity, and how long the electrode runs still codes duration."],
 desc:"The two labeled lines remain. The hand pathway is lit along its length with no press on the hand.",
 pre:function(){S(["line"]);},
 play:function(a){return run(lsig2,[[260,275],[360,275],[560,200]],900,a).then(function(){perc2.setAttribute("display","");perc2.textContent="perceived: something on the hand";cap("Felt where the line begins");});}},

/* ---- receptive fields ---- */
{sec:"Receptive fields and acuity",comp:"Competency 11",
 title:"Two points on the skin",
 text:["The patch of skin that changes the firing of one sensory neuron is that neuron's receptive field. Each circle is one receptive field. On the fingertip they are small and packed together. On the back they are large and spread out.","A caliper with two points 10 mm apart is placed on each patch. Your lab this week measures this for real, as two-point discrimination."],
 ask:"Will the person feel one point or two on the fingertip, and on the back? Explain with the circles.",
 ans:["Two on the fingertip, one on the back. On the fingertip, the two points land in different receptive fields with an unstimulated field between them, so two separate groups of neurons fire and the brain reads two points. On the back, both points land inside one large receptive field, so only one neuron reports, and it cannot tell two touches from one.","Two-point thresholds are a few millimeters on the fingertips and lips and several centimeters on the back. Acuity is finest where receptive fields are smallest and most densely packed."],
 name:"receptive field",
 desc:"Two pink skin patches. The fingertip patch is covered with thirty small circles, the back patch with four large circles. Two gold dots 10 millimeters apart sit on each. On the fingertip they fall in different circles; on the back both fall in one circle. Labels read two points and one point.",
 pre:function(){S(["rf"]);},
 play:function(a){CAL.forEach(function(g){g.setAttribute("display","");});return wait(700,a).then(function(){rfA.textContent="felt as two points";rfB.textContent="felt as one point";cap("Small fields, fine acuity");});}},

{title:"Sharpening the edges",
 text:["A stimulus pressing on the skin is strongest under its center and weaker around it, so three neighboring neurons fire at different rates: the middle one most."],
 ask:"Inhibitory interneurons let the middle neuron suppress its neighbors. What do the three firing rates look like after they act?",
 ans:["The middle neuron still fires strongly, but the two side neurons fire much less than before, because the strongly firing middle neuron inhibits them more than they inhibit it. The difference between the center and the edges gets bigger.","This is lateral inhibition. The contrast at the edge of the stimulus is increased, so the brain can locate the stimulus more precisely. The same trick sharpens edges in vision."],
 name:"lateral inhibition",
 desc:"Three neurons labeled left, middle and right. Bars at the bottom first show firing rates of medium, high and medium. Gray inhibitory interneurons appear from the middle neuron to both sides, and the side bars shrink to short while the middle bar stays tall.",
 pre:function(){S(["lat"]);bars([110,170,110]);},
 play:function(a){latInh.setAttribute("display","");return tweenVal(0,1,1000,a,function(k){bars([110-80*k,170-20*k,110-80*k]);}).then(function(){cap("Center kept, edges suppressed");});}},

/* ---- adaptation ---- */
{sec:"Adaptation",comp:"Competency 12",
 title:"A stimulus that does not change",
 text:["A stimulus is switched on and held perfectly steady for several seconds, then switched off. Two different receptors are recording it."],
 ask:"Will both receptors keep firing the whole time the stimulus is on? Sketch what you expect each one to do.",
 ans:["No. One keeps firing for as long as the stimulus lasts, slowing a little but never stopping. The other fires a burst at the start, falls silent while the stimulus is steady, and fires again briefly when it is removed.","Receptors that keep firing are tonic, or slowly adapting, receptors: muscle spindles, baroreceptors, and the receptors for pain. Receptors that fire only at a change are phasic, or rapidly adapting, receptors: the Pacinian corpuscles that sense vibration, and the hair follicle receptors that sense clothing touching the skin. That is why you stop feeling your shirt a minute after you put it on."],
 name:"tonic and phasic receptors",
 desc:"A gold bar shows a steady stimulus held over time. The navy tonic trace below fires spikes the whole time the bar is on, slowing slightly. The maroon phasic trace below that fires a burst at the start, nothing in the middle, and a few spikes at the end.",
 pre:function(){S(["adapt"]);},
 play:function(a){return Promise.all([growTrain(AT,tonicD,1600,a),growTrain(AP,phasicD,1600,a)]).then(function(){adT1.setAttribute("display","");adT2.setAttribute("display","");cap("Tonic keeps reporting, phasic reports change");});}},

{title:"Swapping the jobs",
 text:["The body monitors some things continuously, such as blood pressure or the stretch on a muscle holding a posture, and other things only when they change, such as vibration on the fingertips."],
 ask:"What would go wrong if blood pressure were monitored by a phasic receptor?",
 ans:["The receptor would report a drop in blood pressure only at the moment it happened and then fall silent, as if nothing were wrong. A pressure that stayed too low would go unreported, and the reflexes that correct it would switch off while the problem continued. That swap is dangerous.","Swapping the other way would be a nuisance rather than a danger: a tonic receptor in a hair follicle would report every hair touching your clothing all day long. Each receptor's adaptation rate matches what the body needs to know about."],
 desc:"The tonic and phasic tracings remain on screen for comparison.",
 pre:function(){S(["adapt"]);AT.setAttribute("d",tonicD(1));AP.setAttribute("d",phasicD(1));},
 play:function(a){adT1.setAttribute("display","");adT2.setAttribute("display","");return wait(400,a).then(function(){cap("Match the receptor to the job");});}},

{sec:"Review",comp:"Competencies 8 to 12",
 title:"Summary with the scientific terms",
 text:["A stimulus opens channels in a receptor and produces a graded receptor potential, which is transduction. If it is above threshold at the trigger zone, it becomes a train of identical action potentials. Receptors are classed by stimulus as mechanoreceptors, chemoreceptors, thermoreceptors, photoreceptors and nociceptors.","Modality is coded by the labeled line, location by which neurons fire and their receptive fields, intensity by frequency and the number of receptors firing, and duration by how long firing lasts. Small receptive fields and lateral inhibition give fine acuity. Tonic receptors report a steady stimulus; phasic receptors report change."],
 ask:"Without scrolling back, explain how a firm, steady press on a fingertip can be felt as stronger than a light one even though every action potential is the same size, and why the feeling fades after a while.",
 ans:["The firm press makes a bigger receptor potential, so the trigger zone fires at a higher frequency, and it spreads to more receptors, so more neurons fire. The brain reads both as greater intensity. The feeling fades because many touch receptors in the skin are phasic: they adapt to a steady stimulus and stop firing even though the press is still there.","If part of this would not come back, look at those steps again, then try your Competency Study Guide boxes from memory."],
 desc:"The sensory neuron returns, with a receptor potential in the first box and identical spikes in the other two.",
 pre:function(){S(["neu"]);press.setAttribute("display","");},
 play:function(a){return tweenVal(0,1,700,a,function(k){RT[0].setAttribute("d",bump(k));}).then(function(){RT[1].setAttribute("d",trainWin(310,124,240,0,1,7,70));RT[2].setAttribute("d",trainWin(610,124,240,0,1,7,70));cap("Graded in, frequency out");});}}
];
