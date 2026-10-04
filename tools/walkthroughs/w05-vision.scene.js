/* Vision. Oct 4 2026. Week 5 competencies 16 to 19. Figure one: an eye in
   section with light coming from the left, the cornea, the lens on its
   zonules and ciliary muscle, and the retina; the eyeball length and the
   focal point change per step. Figure two: the pupillary light reflex.
   Figure three: a rod with its cascade. Figure four: the visual pathway
   from above, with visual fields. */

/* ---- the eye ---- */
var gEye=G("eye");
var EX=520,EY=250;
var ball=el("ellipse",{cx:EX,cy:EY,rx:200,ry:170,fill:"#fff",stroke:NAVY,"stroke-width":4},gEye);
var cornea=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":5},gEye);
var retina=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":6},gEye);
var lens=el("ellipse",{cx:400,cy:EY,rx:20,ry:62,fill:TINT,stroke:NAVY,"stroke-width":3},gEye);
var zon=[el("line",{stroke:INK2,"stroke-width":2},gEye),el("line",{stroke:INK2,"stroke-width":2},gEye)];
var cil=[el("rect",{x:384,y:122,width:32,height:26,rx:6,fill:MAROON},gEye),el("rect",{x:384,y:352,width:32,height:26,rx:6,fill:MAROON},gEye)];
tx(gEye,400,112,"ciliary muscle","tm",13,"middle");
tx(gEye,330,EY+90,"lens","t",13,"middle");tx(gEye,290,96,"cornea","t",13,"middle");
var retLab=tx(gEye,EX+150,EY-180,"retina","tm",14,"middle");
var R=[el("polyline",{fill:"none",stroke:GDEEP,"stroke-width":3},gEye),el("polyline",{fill:"none",stroke:GDEEP,"stroke-width":3},gEye),el("polyline",{fill:"none",stroke:GDEEP,"stroke-width":3},gEye)];
var fp=el("circle",{r:8,fill:GDEEP},gEye);
var corr=el("path",{d:"",fill:TINT,stroke:NAVY,"stroke-width":3},gEye);
var eyeT=tx(gEye,40,470,"","tn",15,"start");
var E={len:200,round:0,fx:720};
function eyeSet(len,round,fx,src){
  E.len=len;E.round=round;
  ball.setAttribute("rx",len);ball.setAttribute("cx",320+len);
  var cx=320+len;
  cornea.setAttribute("d","M330 160 Q"+(296)+" "+EY+" 330 340");
  retina.setAttribute("d","M"+(cx+len*0.55)+" "+(EY-140)+" Q"+(cx+len+6)+" "+EY+" "+(cx+len*0.55)+" "+(EY+140));
  retLab.setAttribute("x",cx+len*0.6);
  lens.setAttribute("rx",20+16*round);lens.setAttribute("ry",62-6*round);
  var slack=round>0.5;
  zon[0].setAttribute("x1",400);zon[0].setAttribute("y1",EY-62+6*round);zon[0].setAttribute("x2",400);zon[0].setAttribute("y2",148);
  zon[1].setAttribute("x1",400);zon[1].setAttribute("y1",EY+62-6*round);zon[1].setAttribute("x2",400);zon[1].setAttribute("y2",352);
  zon.forEach(function(z){z.setAttribute("stroke-dasharray",slack?"3 5":"");});
  cil.forEach(function(c,i){c.setAttribute("height",slack?34:26);c.setAttribute("y",i?352:(slack?114:122));});
  var near=src==="near";
  var ys=near?[EY-70,EY,EY+70]:[EY-60,EY,EY+60];
  R.forEach(function(r,i){
    var start=near?[60,EY]:[40,ys[i]];
    var pts=[start,[312,ys[i]],[400,ys[i]*0.85+EY*0.15]];
    var end=[fx,EY];
    var dx=end[0]-400,dy=end[1]-pts[2][1];
    var ext=fx<cx+len?[cx+len-8,pts[2][1]+dy*((cx+len-8-400)/dx)]:end;
    r.setAttribute("points",pts.concat([end,ext]).map(function(q){return q[0]+","+q[1];}).join(" "));
  });
  fp.setAttribute("cx",fx);fp.setAttribute("cy",EY);
}
function eyeTween(a,from,to,dur,src){return tweenVal(0,1,dur,a,function(k){eyeSet(from[0]+(to[0]-from[0])*k,from[1]+(to[1]-from[1])*k,from[2]+(to[2]-from[2])*k,src);});}
function lensDraw(kind){
  if(kind==="concave")corr.setAttribute("d","M226 170 Q246 250 226 330 L250 330 Q232 250 250 170 Z");
  else if(kind==="convex")corr.setAttribute("d","M238 170 Q212 250 238 330 Q264 250 238 170 Z");
  else corr.setAttribute("d","");
}

/* ---- the pupillary light reflex ---- */
var gPup=G("pup");
function eyeIcon(cx,lab){el("ellipse",{cx:cx,cy:400,rx:70,ry:42,fill:"#fff",stroke:NAVY,"stroke-width":3},gPup);el("circle",{cx:cx,cy:400,r:30,fill:TINT,stroke:INK2,"stroke-width":2},gPup);var p=el("circle",{cx:cx,cy:400,r:20,fill:NAVY},gPup);tx(gPup,cx,470,lab,"t",14,"middle");return p;}
var pupL=eyeIcon(250,"left eye"),pupR=eyeIcon(650,"right eye");
box(gPup,330,60,240,70,"midbrain","tn",16);
var aff=poly(gPup,[[250,358],[300,200],[400,130]],GDEEP,5);
var eff=[poly(gPup,[[430,130],[330,230],[262,360]],NAVY,5),poly(gPup,[[470,130],[570,230],[638,360]],NAVY,5)];
tx(gPup,150,240,"optic nerve (in)","tm",14,"start");tx(gPup,600,190,"oculomotor nerve (out)","tn",14,"start");
var light=el("g",{},gPup);arrow(light,110,330,180,372,GDEEP,6);tx(light,60,320,"light","tm",14,"start");
var pX=badge(gPup,276,280,"X",MAROON,14);
var ps=[dot(gPup,GDEEP,9),dot(gPup,NAVY,9),dot(gPup,NAVY,9)];
function pupils(l,r){pupL.setAttribute("r",l);pupR.setAttribute("r",r);}

/* ---- the rod ---- */
var gRod=G("rod");
el("rect",{x:110,y:50,width:120,height:200,rx:20,fill:"#fff",stroke:NAVY,"stroke-width":4},gRod);
for(var i=0;i<8;i++)el("line",{x1:124,y1:72+i*22,x2:216,y2:72+i*22,stroke:INK2,"stroke-width":3},gRod);
el("rect",{x:120,y:250,width:100,height:150,rx:20,fill:"#fff",stroke:NAVY,"stroke-width":4},gRod);
el("line",{x1:170,y1:400,x2:170,y2:450,stroke:NAVY,"stroke-width":6},gRod);
tx(gRod,170,40,"outer segment, discs of rhodopsin","t",13,"middle");
tx(gRod,236,330,"inner segment","t",13,"start");
var chan=el("rect",{x:224,y:150,width:20,height:40,rx:4,fill:"#fff",stroke:NAVY,"stroke-width":3},gRod);
var chanGate=el("rect",{x:226,y:166,width:16,height:8,fill:GDEEP},gRod);
tx(gRod,252,148,"cGMP-gated","t",12,"start");tx(gRod,252,162,"cation channel","t",12,"start");
var naIn=el("g",{},gRod);arrow(naIn,300,176,252,176,MAROON,5);tx(naIn,306,182,"Na+ in","tm",14,"start");
var GLU=[];for(i=0;i<6;i++){var c=el("circle",{cx:140+i*12,cy:470+(i%2)*10,r:5,fill:GDEEP},gRod);GLU.push(c);}
tx(gRod,240,480,"glutamate released","t",13,"start");
var meter=box(gRod,40,410,0.1,0.1,"","tn",1);
var mvT=tx(gRod,440,90,"","tn",22,"start"),cgT=tx(gRod,440,130,"","tn",18,"start");
tx(gRod,440,60,"membrane potential","t",13,"start");
var CASC=["photon","retinal changes shape","rhodopsin active","transducin (G protein)","phosphodiesterase","cGMP falls","channels close","hyperpolarized","less glutamate"];
var CB=CASC.map(function(s,i){var col=i%2,row=Math.floor(i/2);var b=box(gRod,440+col*215,170+row*58,200,44,s,"tn",13);b.setAttribute("display","none");return b;});
function rodState(dark){mvT.textContent=dark?M+"40 mV, depolarized":M+"70 mV, hyperpolarized";cgT.textContent=dark?"cGMP high, channels open":"cGMP low, channels closed";
  chanGate.setAttribute("display",dark?"none":"");naIn.setAttribute("display",dark?"":"none");GLU.forEach(function(g,i){g.setAttribute("display",dark||i<2?"":"none");});}

/* ---- the pathway and the fields ---- */
var gVp=G("vp");
el("circle",{cx:330,cy:420,r:50,fill:"#fff",stroke:NAVY,"stroke-width":3},gVp);el("circle",{cx:570,cy:420,r:50,fill:"#fff",stroke:NAVY,"stroke-width":3},gVp);
tx(gVp,330,490,"left eye","t",13,"middle");tx(gVp,570,490,"right eye","t",13,"middle");
var VT=[poly(gVp,[[300,390],[300,300],[340,240],[350,150],[330,60]],NAVY,4),
        poly(gVp,[[360,390],[400,320],[450,260],[540,200],[560,150],[570,60]],MAROON,4),
        poly(gVp,[[540,390],[500,320],[450,260],[360,200],[340,150],[330,62]],MAROON,4,"8 5"),
        poly(gVp,[[600,390],[600,300],[560,240],[550,150],[570,62]],NAVY,4,"8 5")];
VT[2]._dash="8 5";VT[3]._dash="8 5";
el("ellipse",{cx:450,cy:262,rx:30,ry:14,fill:"none",stroke:INK2,"stroke-width":2},gVp);
tx(gVp,490,268,"chiasm","t",13,"start");
el("ellipse",{cx:345,cy:150,rx:26,ry:14,fill:TINT,stroke:INK2,"stroke-width":2},gVp);el("ellipse",{cx:555,cy:150,rx:26,ry:14,fill:TINT,stroke:INK2,"stroke-width":2},gVp);
tx(gVp,300,154,"thalamus","t",12,"end");
el("rect",{x:290,y:30,width:320,height:36,rx:14,fill:"#fff",stroke:NAVY,"stroke-width":3},gVp);tx(gVp,450,54,"visual cortex","tn",14,"middle");
var cutON=badge(gVp,300,350,"X",MAROON,14),cutCh=badge(gVp,450,262,"X",MAROON,14);
/* fields */
var gFld=G("fld");
function field(cx,lab){el("circle",{cx:cx,cy:220,r:70,fill:"#fff",stroke:NAVY,"stroke-width":3},gFld);el("line",{x1:cx,y1:150,x2:cx,y2:290,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"5 5"},gFld);tx(gFld,cx,316,lab,"t",13,"middle");
  return [el("path",{d:"M"+cx+" 150 A70 70 0 0 0 "+cx+" 290 Z",fill:NAVY,opacity:0},gFld),el("path",{d:"M"+cx+" 150 A70 70 0 0 1 "+cx+" 290 Z",fill:NAVY,opacity:0},gFld)];}
tx(gFld,770,130,"what each eye sees","tn",14,"middle");
var FL=field(720,"left eye"),FR=field(820,"right eye");
function shade(a,b,c,d){FL[0].setAttribute("opacity",a);FL[1].setAttribute("opacity",b);FR[0].setAttribute("opacity",c);FR[1].setAttribute("opacity",d);}

makeCap();
function resetAll(){eyeSet(200,0,720,"far");lensDraw(null);eyeT.textContent="";hide(ps);pupils(20,20);light.setAttribute("display","none");pX.setAttribute("display","none");
  rodState(true);CB.forEach(function(b){b.setAttribute("display","none");});cutON.setAttribute("display","none");cutCh.setAttribute("display","none");shade(0,0,0,0);cap("");}
function S(l){only(l.concat(["cap"]));resetAll();}
var RET=720; /* the retina of a normal eye is at x 720 */

var STEPS=[
{sec:"Focusing light",comp:"Competency 16",
 title:"Light enters the eye",
 text:["Light from a distant object arrives at the eye as parallel rays. To form a sharp image, the eye has to bend those rays so they meet at one point on the retina, the layer of photoreceptors at the back of the eye. Bending light is called refraction.","Two structures refract the light. The cornea, the clear curved front of the eye, does about two thirds of the bending, and its shape is fixed. The lens, behind the pupil, does the rest, and its shape can change."],
 name:"refraction",
 auto:true,
 desc:"An eye in section with light coming from the left as three parallel gold rays. They bend at the cornea and the lens and meet at one point on the maroon retina at the back of the eye. The lens is held by zonule fibers attached to a ring of ciliary muscle, shown above and below it.",
 pre:function(){S(["eye"]);},
 play:function(a){return eyeTween(a,[200,0,820],[200,0,RET],900,"far").then(function(){cap("Rays meet on the retina");});}},

{title:"Looking far away",
 text:["The lens is elastic and would naturally round up. It is held in a ring of fibers, the zonules, which attach to the ciliary muscle around it."],
 ask:"For a distant object, is the ciliary muscle contracted or relaxed, are the zonules taut or slack, and is the lens flat or round?",
 ans:["The ciliary muscle is relaxed. The ring it forms is wide, so the zonules are pulled taut, and they stretch the lens flat. A flatter lens bends light less, which is all that parallel rays from a distant object need.","Relaxed muscle, taut zonules, flat lens. Looking far away is the resting state of the eye."],
 desc:"The lens is thin and flat, the zonules are solid taut lines, and the ciliary muscle is small. The rays from a distant object focus on the retina.",
 pre:function(){S(["eye"]);},
 play:function(a){return wait(500,a).then(function(){eyeT.textContent="far: muscle relaxed, zonules taut, lens flat";cap("Far: relaxed, taut, flat");});}},

{title:"Reading up close",
 text:["Now the object is a page about 25 cm (10 inches) away. Rays from a near object spread apart as they reach the eye, so they need more bending to meet on the retina."],
 ask:"What do the ciliary muscle, the zonules and the lens do now?",
 ans:["The ciliary muscle contracts. The ring it forms gets smaller and moves in toward the lens, so the zonules go slack, and the elastic lens rounds up. A rounder lens bends light more, and the image lands back on the retina.","This is accommodation. It catches many people out, because the muscle is working when the zonules are slack: contracting the ciliary muscle loosens the zonules. Reading for a long time tires the eye for this reason."],
 name:"accommodation",
 desc:"Rays now start from a near point and spread out. The ciliary muscle thickens, the zonules turn into slack dashed lines, the lens becomes rounder, and the rays focus on the retina.",
 pre:function(){S(["eye"]);eyeSet(200,0,800,"near");},
 play:function(a){return eyeTween(a,[200,0,800],[200,1,RET],1200,"near").then(function(){eyeT.textContent="near: muscle contracted, zonules slack, lens round";cap("Near: contracted, slack, round");});}},

{title:"A light in one eye",
 text:["The iris controls how much light enters through the pupil. A circular muscle in the iris narrows the pupil when it contracts. A light is shone into the left eye only."],
 ask:"What happens to the left pupil and to the right pupil, and what pathway does it?",
 ans:["Both pupils constrict, the left one and the right one equally. Light activates the retina, the signal travels in the optic nerve to the midbrain, and the midbrain sends signals out on both sides in the oculomotor nerves, through parasympathetic neurons, to the circular muscle of each iris.","This is the pupillary light reflex. The response in the eye that was not lit is the consensual response. If light in the left eye made neither pupil constrict while light in the right eye made both constrict, the problem would be in the left optic nerve, the input side."],
 name:"pupillary light reflex",
 desc:"Two eyes at the bottom with large pupils, a midbrain box above. A gold arrow shines light into the left eye. A gold dot travels up the optic nerve to the midbrain, navy dots travel down the oculomotor nerves to both eyes, and both pupils shrink.",
 pre:function(){S(["pup"]);light.setAttribute("display","");},
 play:function(a){return run(ps[0],[[250,358],[300,200],[400,130]],900,a).then(function(){return Promise.all([run(ps[1],[[430,130],[330,230],[262,360]],800,a),run(ps[2],[[470,130],[570,230],[638,360]],800,a)]);}).then(function(){return tweenVal(20,10,500,a,function(r){pupils(r,r);});}).then(function(){cap("Both pupils constrict");});}},

{sec:"Refractive errors",comp:"Competency 19",
 title:"An eye that is too long",
 text:["In this eye the cornea and lens are normal, but the eyeball is longer than usual, so the retina sits farther back."],
 ask:"Where do the rays from a distant object focus, what does the person notice, and what lens corrects it?",
 ans:["In front of the retina. By the time the light reaches the retina, the rays have crossed and spread again, so distant objects are blurred. Near objects are clear, because their spreading rays focus farther back, onto the retina. This is myopia, or nearsightedness. A cornea that is too curved does the same thing.","It is corrected with a concave lens, which spreads the rays a little before they enter the eye, so they meet farther back, on the retina."],
 name:"myopia",
 desc:"The eyeball stretches longer. The rays from a distant object meet at a point in front of the retina and spread out again before reaching it. A concave lens appears in front of the eye, and the focus moves back onto the retina.",
 pre:function(){S(["eye"]);eyeSet(240,0,RET,"far");},
 play:function(a){return wait(700,a).then(function(){lensDraw("concave");return eyeTween(a,[240,0,RET],[240,0,800],900,"far");}).then(function(){eyeT.textContent="focus in front of the retina; a concave lens moves it back";cap("Long eye: myopia, concave lens");});}},

{title:"An eye that is too short",
 text:["Now the eyeball is shorter than usual."],
 ask:"Where do the rays focus now, what does the person notice, and what lens corrects it?",
 ans:["Behind the retina. The rays reach the retina before they meet, so the image is blurred. A young person can often rescue distant vision by accommodating, but near objects, which need even more bending, are blurry. This is hyperopia, or farsightedness.","It is corrected with a convex lens, which starts bending the rays inward before they enter the eye, so they meet sooner, on the retina."],
 name:"hyperopia",
 desc:"The eyeball shortens. The rays have not yet met when they reach the retina; their meeting point would be behind it. A convex lens appears in front of the eye and the focus moves forward onto the retina.",
 pre:function(){S(["eye"]);eyeSet(160,0,RET,"far");},
 play:function(a){return wait(700,a).then(function(){lensDraw("convex");return eyeTween(a,[160,0,RET],[160,0,640],900,"far");}).then(function(){eyeT.textContent="focus behind the retina; a convex lens brings it forward";cap("Short eye: hyperopia, convex lens");});}},

{title:"Reading at 60",
 text:["A person with normal eyes at 20 starts holding the newspaper farther away at about 45. By 60 they need reading glasses. Their eyeball is the same length it always was."],
 ask:"What has changed in the eye, and why does it affect near vision but not far vision?",
 ans:["The lens has stiffened with age. When the ciliary muscle contracts and the zonules go slack, the lens no longer rounds up enough, so accommodation fails. Far vision does not need accommodation, so it is unaffected. This is presbyopia, and it is corrected with convex reading lenses.","A hyperopic 20-year-old also holds a page far away, but for a different reason: their eyeball is too short, and their lens still works. A test of distant acuity separates them, since the hyperopic eye may struggle at distance too. Astigmatism is different again: the cornea is curved unevenly, more in one direction than another, so lines in some directions blur. It needs a cylindrical lens that corrects only that direction."],
 name:"presbyopia",
 desc:"A normal length eye trying to focus on a near page. The ciliary muscle contracts but the lens stays nearly flat, so the rays focus behind the retina. A convex reading lens brings them forward.",
 pre:function(){S(["eye"]);eyeSet(200,0.15,800,"near");},
 play:function(a){return wait(700,a).then(function(){lensDraw("convex");return eyeTween(a,[200,0.15,800],[200,0.15,RET],800,"near");}).then(function(){eyeT.textContent="stiff lens cannot round up; a convex lens helps";cap("Stiff lens: presbyopia");});}},

{sec:"Phototransduction",comp:"Competency 17",
 title:"A rod in the dark",
 text:["This is a rod, one of the two kinds of photoreceptor. Its outer segment is stacked with discs full of rhodopsin, the light-absorbing pigment. Rhodopsin is a protein, opsin, bound to a light-absorbing molecule, retinal, made from vitamin A.","In the dark, the cell holds a high level of cyclic GMP (cGMP), and cGMP keeps cation channels in the outer segment open. Sodium flows in all the time, so the rod sits at about "+M+"40 mV, depolarized compared with a typical neuron, and releases glutamate continuously from its base."],
 name:"rhodopsin",
 auto:true,
 desc:"A rod cell with a stack of discs in its outer segment, an inner segment, and a base releasing six gold glutamate dots. An open channel in the outer segment has a maroon arrow of sodium flowing in. The readout says minus 40 millivolts, depolarized, cGMP high, channels open.",
 pre:function(){S(["rod"]);},
 play:function(a){return wait(300,a).then(function(){cap("Dark: depolarized, releasing glutamate");});}},

{title:"Light hits rhodopsin",
 text:["A photon is absorbed by retinal in one rhodopsin molecule."],
 ask:"Follow the chain from the photon to the channel. What happens to cGMP, to the channels, and to the membrane potential?",
 ans:["Retinal changes shape, which activates rhodopsin. Rhodopsin activates a G protein called transducin, which activates the enzyme phosphodiesterase. Phosphodiesterase breaks down cGMP, so cGMP falls, the cGMP-gated channels close, sodium stops coming in, and the rod hyperpolarizes toward "+M+"70 mV.","Each step amplifies the one before: one rhodopsin activates many transducins and each phosphodiesterase breaks down many cGMP molecules, which is why a rod can respond to a single photon. This is phototransduction, and it is the G protein cascade from the signaling unit in Week 2."],
 name:"phototransduction",
 desc:"A chain of boxes appears one by one: photon, retinal changes shape, rhodopsin active, transducin, phosphodiesterase, cGMP falls, channels close, hyperpolarized, less glutamate. The channel gate closes, the sodium arrow disappears, and the readout changes to minus 70 millivolts, cGMP low, channels closed.",
 pre:function(){S(["rod"]);},
 play:function(a){var k=0;function nxt(){if(k>=CB.length-1)return Promise.resolve();CB[k].setAttribute("display","");k++;return wait(260,a).then(nxt);}
   return nxt().then(function(){rodState(false);GLU.forEach(function(g){g.setAttribute("display","");});cap("cGMP falls, channels close");});}},

{title:"Releasing transmitter",
 text:["The rod's base forms a synapse with a bipolar cell. A typical neuron releases more transmitter when it is depolarized."],
 ask:"In the dark or in bright light: when does this photoreceptor release the most glutamate?",
 ans:["In the dark. Light hyperpolarizes the rod, fewer voltage-gated calcium channels at its base are open, and glutamate release falls. So the signal the rod sends about light is a decrease in transmitter.","This surprises people, but it works: the bipolar cells read the change in glutamate, whether it goes up or down. Photoreceptors are graded the whole way, with no action potentials. The first action potentials in the visual pathway are fired by the ganglion cells, whose axons form the optic nerve."],
 desc:"The rod in light, hyperpolarized, with only two glutamate dots left at its base.",
 pre:function(){S(["rod"]);CB.forEach(function(b){b.setAttribute("display","");});rodState(false);GLU.forEach(function(g){g.setAttribute("display","");});},
 play:function(a){return wait(500,a).then(function(){GLU.forEach(function(g,i){g.setAttribute("display",i<2?"":"none");});cap("Light means less glutamate");});}},

{sec:"Rods, cones and the pathway",comp:"Competency 18",
 title:"Seeing a dim star",
 text:["Cones work in bright light and give color and fine detail. They are packed into the fovea, the center of the retina where your gaze falls, and each one often has its own line to a ganglion cell. Rods are far more sensitive, need only dim light, and dominate the rest of the retina. Many rods converge onto each ganglion cell."],
 ask:"Astronomers say that to see a very faint star, you should look a little to one side of it. Why does that work?",
 ans:["Looking to the side puts the star's image off the fovea, onto retina dominated by rods. Rods are much more sensitive than cones, and because many rods converge on one ganglion cell, their small responses add together until the ganglion cell fires.","The same convergence costs acuity: the ganglion cell cannot tell which of its many rods was hit, so detail is lost. Convergence buys sensitivity and costs acuity. The fovea makes the opposite trade, which is why you look straight at a word to read it."],
 desc:"The eye figure, with the image falling slightly off the center of the retina.",
 pre:function(){S(["eye"]);},
 play:function(a){return wait(400,a).then(function(){eyeT.textContent="center: cones, acuity.  side: rods, sensitivity";cap("Convergence buys sensitivity");});}},

{title:"Crossing at the chiasm",
 text:["This view is from above. Each optic nerve leaves the back of an eye and the two meet at the optic chiasm. There, the fibers from the inner half of each retina, the half nearer the nose, cross to the other side. Fibers from the outer halves stay on their own side. From the chiasm, the optic tracts run to the thalamus, which relays to the visual cortex at the back of the brain."],
 auto:true,
 desc:"A view from above: two eyes at the bottom, optic nerves meeting at the chiasm in the center, then running to the thalamus and up to the visual cortex. Solid lines from the outer halves stay on their own side; maroon lines from the inner halves cross at the chiasm.",
 pre:function(){S(["vp","fld"]);},
 play:function(a){return Promise.all(VT.map(function(l){return reveal(l,1200,a);})).then(function(){cap("Inner halves cross at the chiasm");});}},

{title:"Cutting the left optic nerve",
 ask:"An injury cuts the left optic nerve, in front of the chiasm. What does the person lose? Shade it on the fields.",
 text:["The fields on the right show what each eye sees, split into the half toward the nose and the half toward the side."],
 ans:["All vision in the left eye, both halves of its field. Everything from that eye travels in that one nerve before any fibers cross, so cutting it before the chiasm blinds that eye and leaves the right eye completely normal.","The person notices this at once, because one eye going dark is obvious when the other is covered or when depth looks wrong."],
 desc:"A maroon X sits on the left optic nerve. Both halves of the left eye's field are shaded; the right eye's field is clear.",
 pre:function(){S(["vp","fld"]);},
 play:function(a){cutON.setAttribute("display","");return tweenVal(0,0.6,800,a,function(o){shade(o,o,0,0);}).then(function(){cap("One nerve: one eye blind");});}},

{title:"Pressure on the chiasm",
 text:["The pituitary gland sits just below the optic chiasm. A pituitary tumor can grow up and press on the middle of the chiasm."],
 ask:"Which fibers are crushed, and which half of each eye's field is lost?",
 ans:["The crossing fibers, the ones from the inner half of each retina. The inner half of the retina sees the outer half of the visual field, the side toward the temple, because the lens flips the image. So each eye loses its outer field, on both sides. This is bitemporal hemianopia.","The person often does not notice for a long time, because central vision is spared and the loss creeps in from the edges. They may first realize it when they keep bumping into door frames or do not see cars coming from the side."],
 name:"bitemporal hemianopia",
 desc:"A maroon X sits on the middle of the chiasm. The outer half of each eye's field is shaded, the left half of the left eye's field and the right half of the right eye's field. The inner halves stay clear.",
 pre:function(){S(["vp","fld"]);},
 play:function(a){cutCh.setAttribute("display","");return tweenVal(0,0.6,800,a,function(o){shade(o,0,0,o);}).then(function(){cap("Chiasm: both outer fields lost");});}},

{sec:"Review",comp:"Competencies 16 to 19",
 title:"Summary with the scientific terms",
 text:["The cornea and lens refract light onto the retina. For far vision the ciliary muscle relaxes, the zonules are taut and the lens is flat; for near vision the muscle contracts, the zonules slacken and the lens rounds up, which is accommodation. The pupillary light reflex constricts both pupils. A long eye is myopic and needs a concave lens, a short eye is hyperopic and needs a convex lens, presbyopia is a stiff lens, and astigmatism is an unevenly curved cornea.","In the dark, cGMP keeps channels open and the photoreceptor releases glutamate. Light starts the rhodopsin, transducin, phosphodiesterase cascade, cGMP falls, the cell hyperpolarizes and releases less glutamate. Rods converge for sensitivity, cones at the fovea give acuity, and the inner half of each retina crosses at the chiasm."],
 ask:"Without scrolling back, explain why the ciliary muscle is working hardest when you read, and why light makes a photoreceptor release less transmitter rather than more.",
 ans:["Reading needs a round lens. The lens only rounds up when the zonules go slack, and they only go slack when the ciliary muscle contracts, so near work keeps that muscle contracted. Light lowers cGMP, which closes the cation channels and hyperpolarizes the photoreceptor, and a hyperpolarized cell releases less transmitter.","If either one would not come, go back to those steps, then try the Competency Study Guide drawings from memory."],
 desc:"The eye focusing a near object.",
 pre:function(){S(["eye"]);eyeSet(200,0,800,"near");},
 play:function(a){return eyeTween(a,[200,0,800],[200,1,RET],1000,"near").then(function(){cap("Bend the light, then transduce it");});}}
];
