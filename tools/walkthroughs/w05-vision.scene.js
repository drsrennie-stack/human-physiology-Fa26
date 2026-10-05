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

/* Oct 4 2026: aqueous humor flow, and a ganglion cell's center and surround. */
var gAq=G("aq");
el("path",{d:"M300 80 Q170 250 300 420",fill:"none",stroke:NAVY,"stroke-width":5},gAq);
tx(gAq,190,250,"cornea","t",14,"end");
el("rect",{x:300,y:60,width:30,height:150,rx:10,fill:INK2,opacity:.75},gAq);el("rect",{x:300,y:290,width:30,height:150,rx:10,fill:INK2,opacity:.75},gAq);
tx(gAq,340,60,"iris","t",14,"start");
el("ellipse",{cx:420,cy:250,rx:55,ry:120,fill:TINT,stroke:NAVY,"stroke-width":3},gAq);tx(gAq,420,250,"lens","t",14,"middle");
el("rect",{x:350,y:30,width:70,height:40,rx:10,fill:MAROON,opacity:.8},gAq);el("rect",{x:350,y:430,width:70,height:40,rx:10,fill:MAROON,opacity:.8},gAq);
tx(gAq,430,40,"ciliary epithelium makes aqueous humor","tm",14,"start");
var aqFill=el("path",{d:"M300 80 Q170 250 300 420 Z",fill:FLUID,opacity:.55},gAq);
tx(gAq,250,470,"anterior chamber","t",14,"middle");
el("circle",{cx:292,cy:70,r:12,fill:"#fff",stroke:FLOW,"stroke-width":3},gAq);tx(gAq,282,30,"canal of Schlemm","tn",14,"end");
var aqD=[dot(gAq,FLOW,7),dot(gAq,FLOW,7),dot(gAq,FLOW,7)];
var aqX=badge(gAq,292,70,"X",MAROON,14);
var aqT=tx(gAq,650,300,"","tm",16,"middle");
function aqFlow(a){return Promise.all(aqD.map(function(d,i){return wait(i*250,a).then(function(){return run(d,[[385,60],[340,150],[300,250],[250,180],[292,70]],1300,a);});}));}
var gCs=G("cs");
function csField(cx,lab){el("circle",{cx:cx,cy:200,r:110,fill:"#fff",stroke:NAVY,"stroke-width":3},gCs);el("circle",{cx:cx,cy:200,r:45,fill:"#fff",stroke:NAVY,"stroke-width":2.5,"stroke-dasharray":"6 5"},gCs);tx(gCs,cx,72,lab,"tn",15,"middle");tx(gCs,cx,205,"center","t",12,"middle");tx(gCs,cx,140,"surround","t",12,"middle");}
csField(230,"light spot on the center");csField(650,"even light on the whole field");
var csSpot=el("circle",{cx:230,cy:200,r:38,fill:GDEEP,opacity:.55},gCs);
var csWide=el("circle",{cx:650,cy:200,r:108,fill:GDEEP,opacity:.35},gCs);
var csT1=trainPath(gCs,MAROON,2.5),csT2=trainPath(gCs,MAROON,2.5);
tx(gCs,230,470,"strong response","tm",14,"middle");tx(gCs,650,470,"weak response","t",14,"middle");

makeCap();
function resetAll(){eyeSet(200,0,720,"far");lensDraw(null);eyeT.textContent="";hide(ps);pupils(20,20);light.setAttribute("display","none");pX.setAttribute("display","none");
  rodState(true);CB.forEach(function(b){b.setAttribute("display","none");});cutON.setAttribute("display","none");cutCh.setAttribute("display","none");shade(0,0,0,0);cap("");}
function S(l){only(l.concat(["cap"]));resetAll();}
var RET=720; /* the retina of a normal eye is at x 720 */

var STEPS=[
{sec:"Focusing light",comp:"Competency 16",
 title:"Light enters the eye",
 text:["The eye works like a camera: a lens focuses light on a light-sensitive surface, the retina, through an opening, the pupil, whose size can change. Vision happens in three steps. Light enters the eye and is focused on the retina; photoreceptors transduce light into an electrical signal; and neural pathways from the retina to the brain turn those signals into an image.", "Light rays bend, or refract, when they pass between materials of different density. Light entering the eye is refracted twice: about two thirds of the bending happens at the cornea, the clear front of the eye, and the remaining third at the lens. The cornea's shape is fixed; the lens can change shape, so the lens is what adjusts the focus. For a sharp image, the rays must meet at their focal point exactly on the retina."],
 name:"refraction",
 auto:true,
 desc:"An eye in section with light coming from the left as three parallel gold rays. They bend at the cornea and the lens and meet at one point on the maroon retina at the back of the eye. The lens is held by zonule fibers attached to a ring of ciliary muscle, shown above and below it.",
 pre:function(){S(["eye"]);},
 play:function(a){return eyeTween(a,[200,0,820],[200,0,RET],900,"far").then(function(){cap("Rays meet on the retina");});}},

{title:"Looking far away",
 text:["The lens is a clear, elastic disk with no muscle in it. It hangs from inelastic ligaments, the zonules, attached to the ciliary muscle, a ring of smooth muscle around it. Left alone, the lens would round up. Light from objects about 6 meters (20 feet) or more away reaches the eye as parallel rays."],
 ask:"For a distant object, is the ciliary muscle contracted or relaxed, are the zonules taut or slack, and is the lens flat or round?",
 ans:["The ciliary muscle is relaxed. The ring it forms is wide open, so the zonules are pulled taut and stretch the lens into a flatter shape. A flatter lens bends light less, which is all that parallel rays from a distant object need to focus on the retina.", "Relaxed muscle, taut zonules, flat lens. Looking far away is the resting state of the eye."],
 desc:"The lens is thin and flat, the zonules are solid taut lines, and the ciliary muscle is small. The rays from a distant object focus on the retina.",
 pre:function(){S(["eye"]);},
 play:function(a){return wait(500,a).then(function(){eyeT.textContent="far: muscle relaxed, zonules taut, lens flat";cap("Far: relaxed, taut, flat");});}},

{title:"Reading up close",
 text:["Now the object is a page about 25 cm (10 inches) away. Rays from a near object are no longer parallel; they spread apart as they reach the eye. With the lens unchanged, they would focus behind the retina and the page would look blurred."],
 ask:"What do the ciliary muscle, the zonules and the lens do now?",
 ans:["The ciliary muscle contracts, under parasympathetic control. The ring gets smaller, which releases tension on the zonules, and the elastic lens rounds up. A rounder lens is more convex, so it bends light more and has a shorter focal length, and the image lands back on the retina.", "This is accommodation, and the closest distance you can focus on is the near point of accommodation. It catches many people out: the muscle is working when the zonules are slack. Try it: hold your spread fingers close to one open eye, look past them at something far away, then shift your gaze to your fingers."],
 name:"accommodation",
 desc:"Rays now start from a near point and spread out. The ciliary muscle thickens, the zonules turn into slack dashed lines, the lens becomes rounder, and the rays focus on the retina.",
 pre:function(){S(["eye"]);eyeSet(200,0,800,"near");},
 play:function(a){return eyeTween(a,[200,0,800],[200,1,RET],1200,"near").then(function(){eyeT.textContent="near: muscle contracted, zonules slack, lens round";cap("Near: contracted, slack, round");});}},

{title:"A light in one eye",
 text:["The pupil's size is set by two smooth muscles in the iris. The circular pupillary sphincter, controlled by parasympathetic neurons, narrows the pupil. The radial dilator muscles, controlled by sympathetic neurons, widen it. In bright light a narrow pupil limits light and also increases depth of field, keeping more of the scene in focus. A light is shone into the left eye only."],
 ask:"What happens to the left pupil and to the right pupil, and what pathway does it?",
 ans:["Both pupils constrict. Light activates the retina, and the signal travels in the optic nerve, cranial nerve II. Collateral pathways from the thalamus reach the midbrain, where the signal diverges to both sides and parasympathetic fibers in cranial nerve III constrict both pupils. The response in the unlit eye is the consensual reflex, and this test is a standard part of a neurological exam.", "The pattern locates a problem. Light in the left eye makes the right pupil constrict but not the left: the left optic nerve and the midbrain are working, so the efferent path to the left pupil is broken. Light in the left eye makes neither pupil constrict, while light in the right eye makes both constrict: the afferent path from the left eye is broken."],
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
 text:["A person with normal eyes at 20 starts holding the newspaper farther away in their forties, and by 60 they need reading glasses. Their eyeball is the same length it always was. Accommodation starts declining in childhood; by age 40 it is about half of what it was at age 10."],
 ask:"What has changed in the eye, and why does it affect near vision but not far vision?",
 ans:["The lens has lost its flexibility. When the ciliary muscle contracts and the zonules go slack, the lens no longer rounds up enough, so accommodation fails; by 60 many people have lost it entirely. Far vision needs a flat lens, which the stiff lens already is, so it is unaffected. This loss of accommodation is presbyopia, corrected with convex reading lenses.", "Astigmatism is different again: the cornea is not a perfectly shaped dome, so images are distorted, and it is corrected with a lens shaped to match the uneven curve."],
 name:"presbyopia",
 desc:"A normal length eye trying to focus on a near page. The ciliary muscle contracts but the lens stays nearly flat, so the rays focus behind the retina. A convex reading lens brings them forward.",
 pre:function(){S(["eye"]);eyeSet(200,0.15,800,"near");},
 play:function(a){return wait(700,a).then(function(){lensDraw("convex");return eyeTween(a,[200,0.15,800],[200,0.15,RET],800,"near");}).then(function(){eyeT.textContent="stiff lens cannot round up; a convex lens helps";cap("Stiff lens: presbyopia");});}},

{title:"Pressure inside the eye",
 text:["The space in front of the lens, the anterior chamber, is filled with aqueous humor, a clear, low-protein fluid secreted continuously by the ciliary epithelium. It nourishes the cornea, which has no blood supply, then drains out through the canal of Schlemm. Behind the lens, the vitreous chamber is filled with the gel-like vitreous body, which holds the eyeball's shape."],
 ask:"If the drainage through the canal of Schlemm is blocked, what happens inside the eye, and why would that matter for vision?",
 ans:["Aqueous humor keeps being secreted but cannot leave, so it accumulates and the pressure inside the eye, intraocular pressure, rises. Raised pressure is a risk factor for glaucoma, a disease in which the optic nerve degenerates. Treatments either reduce how much fluid is secreted or increase how much drains out.", "Glaucoma is the leading cause of blindness worldwide. Pressure is not the whole story: not everyone with high pressure develops glaucoma, and some people with glaucoma have normal pressure. Compare this with cerebrospinal fluid and hydrocephalus: a fluid made continuously builds up whenever its drainage is blocked."],
 name:"glaucoma",
 desc:"The front of the eye in section: cornea, iris, lens, and the ciliary epithelium behind the iris. Blue dots of aqueous humor flow from the ciliary epithelium through the pupil into the anterior chamber and out at the canal of Schlemm. Then a maroon X blocks the canal and the chamber fills darker as pressure rises.",
 pre:function(){S(["aq"]);aqX.setAttribute("display","none");aqT.textContent="";aqFill.setAttribute("opacity",.55);},
 play:function(a){return aqFlow(a).then(function(){aqX.setAttribute("display","");aqT.textContent="drainage blocked: pressure rises";return tweenVal(.55,.95,800,a,function(v){aqFill.setAttribute("opacity",v);});}).then(function(){cap("Made constantly, drained or it builds");});}},
{sec:"Phototransduction",comp:"Competency 17",
 title:"A rod in the dark",
 text:["Light must pass through the inner layers of the retina to reach the photoreceptors, which sit at the back against the retinal pigment epithelium, a dark layer that absorbs stray light and helps form a blood-retinal barrier. There are two kinds of photoreceptor, rods and cones. Each has an outer segment stacked with membrane disks holding visual pigment, an inner segment with the nucleus and organelles, and a synaptic terminal that releases glutamate onto bipolar cells.", "The rod's pigment is rhodopsin: a protein, opsin, with a light-absorbing molecule, retinal, made from vitamin A, tucked into it. In the dark, cyclic GMP (cGMP) is high and keeps cyclic nucleotide-gated (CNG) channels open, so Na+ and Ca2+ flow in, while K+ leaks out. Cation entry outweighs K+ loss, so the rod sits at about −40 mV. At that potential, voltage-gated Ca2+ channels in the terminal are open and the rod releases glutamate continuously."],
 name:"rhodopsin",
 auto:true,
 desc:"A rod cell with a stack of discs in its outer segment, an inner segment, and a base releasing six gold glutamate dots. An open channel in the outer segment has a maroon arrow of sodium flowing in. The readout says minus 40 millivolts, depolarized, cGMP high, channels open.",
 pre:function(){S(["rod"]);},
 play:function(a){return wait(300,a).then(function(){cap("Dark: depolarized, releasing glutamate");});}},

{title:"Light hits rhodopsin",
 text:["A photon is absorbed by retinal in one rhodopsin molecule. As little as one photon is enough."],
 ask:"Follow the chain from the photon to the channel. What happens to retinal, to cGMP, to the channels, and to the membrane potential?",
 ans:["Retinal changes shape and is released from opsin, which is called bleaching. The activated opsin turns on a G protein, transducin, a close relative of gustducin in taste cells. Transducin's cascade, through the enzyme phosphodiesterase, lowers cGMP, so the CNG channels close and Na+ and Ca2+ stop coming in. K+ keeps leaving, so the rod hyperpolarizes toward −70 mV. Bright light closes all the channels; dimmer light gives a graded response in proportion.", "Recovery is slow. The released retinal goes to the retinal pigment epithelium, is converted back to its inactive form, and returns to rejoin opsin. That slow rebuilding of rhodopsin is a major reason your eyes take time to adapt when you walk from bright light into the dark."],
 name:"phototransduction",
 desc:"A chain of boxes appears one by one: photon, retinal changes shape, rhodopsin active, transducin, phosphodiesterase, cGMP falls, channels close, hyperpolarized, less glutamate. The channel gate closes, the sodium arrow disappears, and the readout changes to minus 70 millivolts, cGMP low, channels closed.",
 pre:function(){S(["rod"]);},
 play:function(a){var k=0;function nxt(){if(k>=CB.length-1)return Promise.resolve();CB[k].setAttribute("display","");k++;return wait(260,a).then(nxt);}
   return nxt().then(function(){rodState(false);GLU.forEach(function(g){g.setAttribute("display","");});cap("cGMP falls, channels close");});}},

{title:"Releasing transmitter",
 text:["The rod's terminal synapses on bipolar cells. A typical neuron releases more transmitter when it is depolarized."],
 ask:"In the dark or in bright light: when does this photoreceptor release the most glutamate? And how can a bipolar cell turn a decrease in glutamate into a signal?",
 ans:["In the dark. Light hyperpolarizes the rod, fewer voltage-gated Ca2+ channels in its terminal stay open, and glutamate release falls. The signal the rod sends about light is a decrease in transmitter.", "There are two kinds of bipolar cell, and they read the same glutamate oppositely. ON bipolar cells have a metabotropic glutamate receptor that hyperpolarizes them when glutamate binds, so they are inhibited in the dark and activated in the light, when glutamate falls. OFF bipolar cells have an ionotropic receptor that depolarizes them, so they are excited in the dark and inhibited in the light. One stimulus, light, makes two opposite responses with one transmitter. Photoreceptors and bipolar cells make only graded potentials; the first action potentials are fired by ganglion cells."],
 name:"ON and OFF bipolar cells",
 desc:"The rod in light, hyperpolarized, with only two glutamate dots left at its base.",
 pre:function(){S(["rod"]);CB.forEach(function(b){b.setAttribute("display","");});rodState(false);GLU.forEach(function(g){g.setAttribute("display","");});},
 play:function(a){return wait(500,a).then(function(){GLU.forEach(function(g,i){g.setAttribute("display",i<2?"":"none");});cap("Light means less glutamate");});}},

{sec:"Rods, cones and the pathway",comp:"Competency 18",
 title:"Seeing a dim star",
 text:["Rods work in dim light and give black-and-white night vision; they far outnumber cones everywhere except the fovea, which has only cones. Cones work in bright light and give color and sharp vision. There are cones for red, green and blue light, each most sensitive to one range of wavelengths, and the brain reads color from the mix; color blindness comes from an inherited defect in one or more cone types.", "The fovea is a small pit lateral to the optic disk where the neurons and blood vessels are pushed aside so light falls straight on the cones. The fovea and the ring around it, the macula, give the sharpest vision, the center of the visual field. Many rods converge on each ganglion cell; at the fovea there is little convergence, sometimes one cone to one bipolar cell."],
 ask:"Astronomers say that to see a very faint star, you should look a little to one side of it. Why does that work?",
 ans:["Looking to the side puts the star's image off the fovea, onto retina dominated by rods. Rods are far more sensitive than cones, and because many rods converge on one ganglion cell, their small responses add together until it fires. The same convergence costs acuity, because the ganglion cell cannot tell which of its rods was hit, just as a large receptive field blurs two-point touch on the arm. It is also why you see no color in the dark: only rods are sensitive enough to respond.", "Damage to the macula, macular degeneration, takes away the center of the visual field and leaves peripheral vision. The optic disk, where the ganglion cell axons leave the eye as the optic nerve, has no photoreceptors at all; it is the blind spot you found in lab."],
 name:"rods and cones",
 desc:"The eye figure, with the image falling slightly off the center of the retina.",
 pre:function(){S(["eye"]);},
 play:function(a){return wait(400,a).then(function(){eyeT.textContent="center: cones, acuity.  side: rods, sensitivity";cap("Convergence buys sensitivity");});}},

{title:"Center and surround",
 text:["Each ganglion cell has a roughly circular receptive field on the retina, divided into a round center and a doughnut-shaped surround. In an on-center, off-surround field, light in the center excites the ganglion cell and light in the surround inhibits it. Off-center fields work the opposite way. Horizontal cells carry lateral inhibition between neighboring photoreceptors and bipolar cells, and amacrine cells adjust the signal between bipolar and ganglion cells."],
 ask:"A small spot of light shines only on the center of an on-center field. Then the light spreads evenly over the whole field. How does the ganglion cell respond each time?",
 ans:["To the spot in the center, it fires strongly. To light spread evenly over both center and surround, it responds only weakly, because the surround inhibits what the center excites. So the retina reports contrast, not the absolute amount of light, which makes edges and weak stimuli easier to detect.", "There are several kinds of ganglion cell. Large M cells are most sensitive to movement; smaller P cells to form and fine detail. A rare third kind contains its own pigment, melanopsin, and sends light information to the brain's circadian clock, the suprachiasmatic nucleus. It is most sensitive to blue light, which is why screens at night can suppress melatonin."],
 name:"center-surround receptive field",
 desc:"Two ganglion cell receptive fields, each a center inside a ring-shaped surround. On the left, a light spot falls only on the center and the ganglion cell fires a dense train of spikes. On the right, even light covers the whole field and the cell fires only a few spikes.",
 pre:function(){S(["cs"]);csSpot.setAttribute("display","none");csWide.setAttribute("display","none");csT1.setAttribute("d","");csT2.setAttribute("d","");},
 play:function(a){csSpot.setAttribute("display","");return growTrain(csT1,function(k){return trainWin(120,440,220,0,k,Math.round(14*k),40);},900,a).then(function(){csWide.setAttribute("display","");return growTrain(csT2,function(k){return trainWin(540,440,220,0,k,Math.round(3*k),40);},900,a);}).then(function(){cap("The retina reports contrast");});}},
{title:"Crossing at the chiasm",
 text:["This view is from above. Each optic nerve leaves the back of an eye and the two meet at the optic chiasm, where the fibers from the inner half of each retina, the half nearer the nose, cross to the other side, and fibers from the outer halves stay on their own side. The result is that the left half of the visual field from both eyes is processed in the right side of the brain, and the right half in the left side.", "Most fibers then synapse in the lateral geniculate body of the thalamus, which is layered so neighboring parts of the visual field are processed together, and go on to the visual cortex in the occipital lobe, where information is sorted by form, color and movement. Some fibers go to the midbrain for eye movements and the pupillary reflex. Where the two eyes' fields overlap, the binocular zone, the brain combines two slightly different views into depth perception; the edges seen by only one eye are the monocular zone."],
 name:"optic chiasm",
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
 text:["The cornea does most of the refraction and the lens adjusts it. For far vision the ciliary muscle relaxes, the zonules are taut and the lens is flat; for near vision the ciliary muscle contracts under parasympathetic control, the zonules slacken and the lens rounds, which is accommodation, lost with age in presbyopia. Myopia and hyperopia come from an eyeball or cornea that is too long, too short or too curved, astigmatism from an uneven cornea, and glaucoma from optic nerve degeneration, with blocked aqueous humor drainage a risk factor. Light in one eye constricts both pupils through the thalamus, midbrain and cranial nerve III.", "In the dark, cGMP keeps CNG channels open and the rod releases glutamate. Light bleaches rhodopsin, transducin lowers cGMP, the channels close, the cell hyperpolarizes and releases less glutamate; ON and OFF bipolar cells read that change oppositely. Ganglion cells fire the first action potentials and report contrast through center-surround fields. Rods converge for sensitivity, cones at the fovea give acuity and color, and fibers from the inner half of each retina cross at the chiasm on the way to the lateral geniculate body and visual cortex."],
 ask:"Without scrolling back, explain why the ciliary muscle is working hardest when you read, and why light makes a photoreceptor release less transmitter rather than more.",
 ans:["Reading needs a round lens. The lens only rounds up when the zonules go slack, and they only go slack when the ciliary muscle contracts, so near work keeps that muscle contracted. Light lowers cGMP, which closes the cation channels and hyperpolarizes the photoreceptor, and a hyperpolarized cell releases less transmitter.","If either one would not come, go back to those steps, then try the Competency Study Guide drawings from memory."],
 desc:"The eye focusing a near object.",
 pre:function(){S(["eye"]);eyeSet(200,0,800,"near");},
 play:function(a){return eyeTween(a,[200,0,800],[200,1,RET],1000,"near").then(function(){cap("Bend the light, then transduce it");});}}
];
