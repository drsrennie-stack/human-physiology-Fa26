/* Cerebrospinal fluid and the blood-brain barrier. Oct 4 2026. Week 5
   competency 6. Figure one: the brain in section inside the skull, with a
   ventricle, the choroid plexus, the subarachnoid space and the arachnoid
   villi draining into a venous sinus. Figure two: a capillary elsewhere in
   the body beside a brain capillary, with four things arriving at each. */

var gBr=G("brain");
el("ellipse",{cx:430,cy:250,rx:330,ry:210,fill:"#fff",stroke:NAVY,"stroke-width":5},gBr);
el("ellipse",{cx:430,cy:256,rx:296,ry:178,fill:FLUID,stroke:INK2,"stroke-width":2},gBr);
el("ellipse",{cx:430,cy:262,rx:266,ry:150,fill:TISS,stroke:MAROON,"stroke-width":3},gBr);
tx(gBr,430,32,"skull","t",14,"middle");
tx(gBr,800,180,"subarachnoid","t",13,"start");tx(gBr,800,196,"space","t",13,"start");
tx(gBr,430,404,"brain","tm",16,"middle");
/* a ventricle with the choroid plexus */
el("path",{d:"M300 230 q60 -60 130 -10 q70 -50 130 10 q-20 60 -130 40 q-110 20 -130 -40 z",fill:FLUID,stroke:NAVY,"stroke-width":3},gBr);
tx(gBr,430,300,"ventricle","t",14,"middle");
var cp=el("path",{d:"M340 236 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0",fill:"none",stroke:MAROON,"stroke-width":4},gBr);
tx(gBr,330,212,"choroid plexus","tm",14,"end");
/* venous sinus and villi at the top */
el("rect",{x:380,y:30,width:100,height:30,rx:12,fill:NAVY},gBr);
tx(gBr,500,50,"venous sinus","tn",14,"start");
el("path",{d:"M400 60 q8 18 16 0 M424 60 q8 18 16 0 M448 60 q8 18 16 0",fill:"none",stroke:NAVY,"stroke-width":3},gBr);
tx(gBr,360,86,"arachnoid villi","t",13,"end");
var FLW=[[380,236],[430,245],[500,262],[560,300],[700,300],[730,200],[640,90],[470,74],[430,60]];
var flowLine=poly(gBr,FLW,FLOW,3,"8 6");flowLine._dash="8 6";
var fd=[dot(gBr,FLOW,9),dot(gBr,FLOW,9),dot(gBr,FLOW,9)];
var gNums=G("nums");
box(gNums,40,430,250,60,"about 150 mL in the system","tn",15);
box(gNums,300,430,300,60,"about 500 mL made each day","tn",15);
var gBlock=G("block");
badge(gBlock,600,300,"X",MAROON,16);
var swell=el("ellipse",{cx:430,cy:242,rx:0,ry:0,fill:FLUID,stroke:NAVY,"stroke-width":3,opacity:.8},gBlock);

/* ---- two capillaries ---- */
var gCap=G("caps");
tx(gCap,220,40,"capillary elsewhere in the body","tn",15,"middle");
tx(gCap,650,40,"capillary in the brain","tn",15,"middle");
function capil(cx,tight){
  el("circle",{cx:cx,cy:240,r:150,fill:"#fff",stroke:NAVY,"stroke-width":3},gCap);
  el("circle",{cx:cx,cy:240,r:110,fill:TISS,stroke:MAROON,"stroke-width":3},gCap);
  tx(gCap,cx,246,"blood","tm",16,"middle");
  [0,90,180,270].forEach(function(d){var r=d*Math.PI/180,x1=cx+110*Math.cos(r),y1=240+110*Math.sin(r),x2=cx+150*Math.cos(r),y2=240+150*Math.sin(r);
    el("line",{x1:x1,y1:y1,x2:x2,y2:y2,stroke:tight?NAVY:"#fff","stroke-width":tight?7:12},gCap);});
}
capil(220,false);capil(650,true);
tx(gCap,220,420,"gaps between the cells","t",13,"middle");
tx(gCap,650,420,"tight junctions seal the gaps","t",13,"middle");
var gAst=G("ast");
[[650,72],[818,240],[650,408],[482,240]].forEach(function(q){el("ellipse",{cx:q[0],cy:q[1],rx:30,ry:14,fill:GDEEP,transform:"rotate("+(q[0]===650?0:90)+" "+q[0]+" "+q[1]+")"},gAst);});
tx(gAst,830,90,"astrocyte feet","tm",13,"middle");
/* four things arriving at the brain capillary: from the blood outward */
var MOL=[["O2",NAVY,0],["glucose",GDEEP,1],["protein",MAROON,2],["drug",INK2,3]];
var MG=MOL.map(function(m){var g=el("g",{},gCap);el("rect",{x:-34,y:-14,width:68,height:28,rx:14,fill:m[1]},g);var t=el("text",{"class":"iw","font-size":13},g);t.textContent=m[0];g.setAttribute("display","none");return g;});
var ME=[[650,200,650,40],[650,240,870,240],[650,280,650,320],[650,240,440,240]];
var gTr=G("glut");
badge(gTr,780,240,"T",GDEEP,13);tx(gTr,780,272,"GLUT1","tm",13,"middle");
var outT=tx(gCap,450,490,"","tn",15,"middle");

makeCap();
function resetAll(){hide(fd);MG.forEach(function(g){g.setAttribute("display","none");});swell.setAttribute("rx",0);swell.setAttribute("ry",0);outT.textContent="";cap("");}
function S(l){only(l.concat(["cap"]));resetAll();}
function flow(a){return Promise.all(fd.map(function(d,i){return wait(i*350,a).then(function(){return run(d,FLW,2000,a);});}));}

var STEPS=[
{sec:"Cerebrospinal fluid",comp:"Competency 6",
 title:"The fluid around the brain",
 text:["The brain does not rest directly on the skull. It sits in a layer of clear fluid, the cerebrospinal fluid, which fills a space under the arachnoid membrane, the subarachnoid space, and also fills the hollow chambers inside the brain, the ventricles.","Because the brain floats in this fluid, it presses on the skull with only a small fraction of its weight, and the fluid cushions it when the head moves suddenly. The fluid also gives the brain a protected chemical environment."],
 name:"cerebrospinal fluid",
 auto:true,
 desc:"A brain in section, shaded pink, sits inside an oval skull. A pale blue layer of fluid surrounds it, and a pale blue ventricle lies in its center with a maroon wavy choroid plexus. A navy venous sinus sits at the top with small arachnoid villi under it.",
 pre:function(){S(["brain"]);REG.brain.querySelector("polyline").setAttribute("display","none");},
 play:function(a){return wait(300,a).then(function(){cap("The brain floats in fluid");});}},

{title:"Where it is made and where it goes",
 text:["The choroid plexus is a tangle of capillaries covered by specialized ependymal cells inside each ventricle. Those cells secrete cerebrospinal fluid into the ventricle all the time."],
 ask:"The fluid keeps being made. Where does it go, and how does it leave the system?",
 ans:["It flows through the ventricles, out into the subarachnoid space around the brain and spinal cord, and is reabsorbed into the venous blood through the arachnoid villi, small projections of the arachnoid membrane that push into the large veins called venous sinuses.","So cerebrospinal fluid is made from blood plasma by the choroid plexus and returns to the blood at the arachnoid villi. It circulates in one direction, from production to reabsorption."],
 name:"arachnoid villi",
 desc:"Dashed blue arrows and dots flow from the choroid plexus through the ventricle, out into the fluid around the brain, up over the top, and into the venous sinus through the arachnoid villi.",
 pre:function(){S(["brain"]);REG.brain.querySelector("polyline").setAttribute("display","none");},
 play:function(a){var l=REG.brain.querySelector("polyline");l.setAttribute("display","");return Promise.all([reveal(l,2000,a),flow(a)]).then(function(){cap("Choroid plexus to venous blood");});}},

{title:"When the outflow is blocked",
 text:["There are about 150 mL of cerebrospinal fluid in the system at any time, and the choroid plexus makes about 500 mL each day. So the whole volume is replaced a few times a day."],
 ask:"A tumor blocks the outflow from a ventricle. What happens, and how fast?",
 ans:["The choroid plexus keeps secreting at the same rate, but the fluid cannot leave, so it accumulates. The ventricle swells and the pressure inside the skull rises within hours, because the daily production is several times the whole volume of the system. Rising pressure compresses the brain tissue.","An abnormal build-up of cerebrospinal fluid is hydrocephalus. In an infant, whose skull bones have not fused, the head enlarges; in an adult, it causes headache, vomiting and drowsiness, and it is treated by draining the fluid, for example with a shunt."],
 name:"hydrocephalus",
 desc:"Two boxes read about 150 milliliters in the system and about 500 milliliters made each day. A maroon X blocks the flow, and the ventricle balloons outward.",
 pre:function(){S(["brain","nums","block"]);},
 play:function(a){return tweenVal(0,1,1400,a,function(k){swell.setAttribute("rx",140*k);swell.setAttribute("ry",70*k);}).then(function(){cap("Made faster than it can wait");});}},

{sec:"The blood-brain barrier",comp:"Competency 6",
 title:"Two kinds of capillary",
 text:["On the left is a capillary from most of the body, in cross section. The endothelial cells that form its wall have small gaps between them, so water and dissolved substances pass easily between the blood and the tissue.","On the right is a capillary in the brain. Its endothelial cells are joined by tight junctions that seal those gaps. Astrocytes press their foot processes against it, and signals from them help keep the junctions tight."],
 name:"blood-brain barrier",
 auto:true,
 desc:"Two capillaries in cross section. The one on the left has white gaps in its wall. The one on the right has its wall sealed by navy tight junctions and gold astrocyte feet pressed against the outside.",
 pre:function(){S(["caps","ast"]);},
 play:function(a){return wait(300,a).then(function(){cap("Tight junctions seal the brain");});}},

{title:"Four things arrive",
 text:["Four things in the blood reach the brain capillary: oxygen, glucose, a large plasma protein, and an anesthetic drug that dissolves easily in lipids."],
 ask:"Which of the four get across into the brain, and how does each one cross or fail to cross?",
 ans:["Oxygen crosses easily: it is small and nonpolar, so it diffuses straight through the cell membranes. Glucose crosses too, but only on a carrier, the GLUT1 transporter in the endothelial cells, by facilitated diffusion. The large protein cannot cross: there are no gaps to pass through and no carrier for it. The lipid-soluble anesthetic dissolves through the membranes of the endothelial cells and reaches the brain quickly.","So the barrier lets through what can dissolve in membranes and what has a carrier, and keeps out water-soluble substances that have no carrier. That is why general anesthetics, alcohol and nicotine act on the brain within seconds or minutes."],
 desc:"Four labeled pills sit in the blood of the brain capillary. Oxygen moves out through the wall. Glucose moves out through a gold transporter labeled GLUT1. The protein stays in the blood. The drug moves out through the wall.",
 pre:function(){S(["caps","ast"]);MG.forEach(function(g,i){g.setAttribute("display","");place(g,650-60+i*40,215+(i%2)*50);});},
 play:function(a){REG.glut.setAttribute("display","");
   return Promise.all([tweenPath(MG[0],[[650,40]],1100,a),tweenPath(MG[1],[[780,240],[870,240]],1300,a),tweenPath(MG[2],[[650,300]],600,a),tweenPath(MG[3],[[440,240]],1000,a)]).then(function(){outT.textContent="crossed: oxygen, glucose, drug.  stopped: protein";cap("Lipid soluble or carried: in");});}},

{title:"Keeping a drug out, or getting one in",
 text:["The same barrier is a problem in medicine. People with Parkinson's disease have lost neurons that make dopamine, but dopamine given as a drug cannot cross the blood-brain barrier."],
 ask:"Dopamine is water soluble. Why can it not cross, and how could you get it into the brain anyway?",
 ans:["It is water soluble and charged, so it cannot dissolve through the endothelial membranes, the tight junctions close the gaps, and there is no carrier for it. Its precursor, L-dopa, is an amino acid, and amino acid carriers in the endothelial cells move it across. Once inside the brain, it is converted to dopamine.","The rule cuts both ways. A drug that is very lipid soluble crosses easily, which is useful for an anesthetic and a risk for anything you would rather keep out of the brain, because there is nothing to stop it."],
 desc:"The brain capillary and its four pills remain, with the protein still in the blood.",
 pre:function(){S(["caps","ast","glut"]);},
 play:function(a){return wait(400,a).then(function(){cap("Find a carrier, or dissolve through");});}},

{title:"Where the barrier is missing",
 text:["In a few small regions of the brain, the capillaries are leaky like the ones elsewhere in the body. These regions are called the circumventricular organs."],
 ask:"Why would the brain need a few places with no barrier at all?",
 ans:["Because some neurons have to sample the blood directly. In the area postrema of the brainstem, neurons detect toxins in the blood and trigger vomiting. In parts of the hypothalamus, neurons sense the osmolarity of the blood and release hormones into it. Without leaky capillaries they could not do either job.","So the barrier is selective by design: tight where neurons need a protected environment, open where they need to read or write to the blood."],
 name:"circumventricular organs",
 desc:"Both capillaries are shown, the leaky one on the left now standing for the capillaries of the circumventricular organs.",
 pre:function(){S(["caps","ast"]);},
 play:function(a){return wait(300,a).then(function(){cap("A few windows on the blood");});}},

{sec:"Review",comp:"Competency 6",
 title:"Summary with the scientific terms",
 text:["Cerebrospinal fluid is secreted by the choroid plexus in the ventricles, flows into the subarachnoid space, and is reabsorbed into venous blood at the arachnoid villi. About 150 mL is present and about 500 mL is made each day. It cushions and floats the brain and protects its chemical environment; a blocked outflow causes hydrocephalus.","The blood-brain barrier is made by tight junctions between brain capillary endothelial cells, maintained with help from astrocytes. Small nonpolar and lipid-soluble substances diffuse through, substances with a carrier, such as glucose on GLUT1, are carried, and other water-soluble substances are kept out."],
 ask:"Without scrolling back, explain why an anesthetic gas reaches the brain in seconds while a large antibody in the same blood never does.",
 ans:["The anesthetic is lipid soluble, so it dissolves straight through the membranes of the endothelial cells. The antibody is a large, water-soluble protein with no carrier, and the tight junctions leave no gaps for it to pass between the cells.","If you could not explain it, look again at the step with the four things arriving."],
 desc:"Both figures summarized: the flow of fluid and the brain capillary.",
 pre:function(){S(["caps","ast"]);},
 play:function(a){return wait(300,a).then(function(){cap("Dissolve or be carried");});}}
];
