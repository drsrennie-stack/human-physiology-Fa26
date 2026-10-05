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
{sec:"Protecting the brain",comp:"Competency 6",
 title:"The fluid around the brain",
 text:["The brain and spinal cord are soft, almost like gelatin, with very little supporting matrix of their own. They are protected from the outside in by bone, three membranes, and fluid.","The fluid is cerebrospinal fluid. It fills the hollow chambers inside the brain, the ventricles, and the space around the brain and spinal cord. It protects the brain two ways. Physically, the brain floats in it, which makes the brain act about 30 times lighter than it is, so it presses far less on its own blood vessels and nerves, and the fluid cushions it during a blow because water barely compresses. Chemically, it gives neurons a closely controlled environment."],
 name:"cerebrospinal fluid",
 auto:true,
 desc:"A brain in section, shaded pink, sits inside an oval skull. A pale blue layer of fluid surrounds it, and a pale blue ventricle lies in its center with a maroon wavy choroid plexus. A navy venous sinus sits at the top with small arachnoid villi under it.",
 pre:function(){S(["brain"]);REG.brain.querySelector("polyline").setAttribute("display","none");},
 play:function(a){return wait(300,a).then(function(){cap("Floated, cushioned, chemically protected");});}},

{title:"Three membranes",
 text:["Between the bone and the brain are three membranes, together called the meninges. From the skull inward they are the dura mater, the arachnoid membrane, and the pia mater."],
 ask:"Using what each name suggests, which membrane would you expect to be the toughest, which one sits right on the brain, and where would the fluid be?",
 ans:["The dura mater is the outermost and thickest, the durable one, and it holds the large veins called venous sinuses that drain the brain. The pia mater is the innermost and thinnest; it clings to the surface of the brain and spinal cord and carries the arteries that supply them. The arachnoid membrane is in the middle and is only loosely attached to the pia, which leaves a space between them.","That space, the subarachnoid space, is where the cerebrospinal fluid flows around the brain and cord. A bleed between these membranes is an emergency because the blood has nowhere to go but inward, pressing on the soft brain."],
 name:"meninges",
 desc:"The skull, the fluid layer and the brain are shown in layers, standing for the dura mater, the arachnoid membrane with the fluid beneath it, and the pia mater on the brain.",
 pre:function(){S(["brain"]);REG.brain.querySelector("polyline").setAttribute("display","none");},
 play:function(a){return wait(400,a).then(function(){cap("Dura, arachnoid, pia: outside in");});}},

{sec:"Cerebrospinal fluid",comp:"Competency 6",
 title:"Where it is made and where it goes",
 text:["The choroid plexus is a patch on the walls of the ventricles made of capillaries covered by a transporting epithelium, which develops from the ependymal cells that line the ventricles. Its cells pump Na+ and other solutes out of the plasma and into the ventricle. Water follows the solutes by osmosis, and that is how the fluid is made."],
 ask:"The choroid plexus keeps making fluid all the time. Where does it go, and how does it leave the system?",
 ans:["It flows from the two lateral ventricles into the third ventricle, through a narrow channel called the cerebral aqueduct into the fourth ventricle, and out into the subarachnoid space, where it bathes the whole brain and spinal cord. It is reabsorbed into the blood through the arachnoid villi, small fingers of the arachnoid membrane that push into a venous sinus.","It moves in one direction, from production to reabsorption, fast enough to replace the whole volume about three times a day."],
 name:"choroid plexus",
 desc:"Dashed blue arrows and dots flow from the choroid plexus through the ventricle, out into the fluid around the brain, up over the top, and into the venous sinus through the arachnoid villi.",
 pre:function(){S(["brain"]);REG.brain.querySelector("polyline").setAttribute("display","none");},
 play:function(a){var l=REG.brain.querySelector("polyline");l.setAttribute("display","");return Promise.all([reveal(l,2000,a),flow(a)]).then(function(){cap("Choroid plexus to venous blood");});}},

{title:"When the aqueduct is blocked",
 text:["About 150 mL of cerebrospinal fluid is in the system at any time, and about 500 mL is made each day, which is why it turns over about three times a day. Now a tumor narrows the cerebral aqueduct, the channel between the third and fourth ventricles."],
 ask:"What happens to the fluid, and which ventricles would look enlarged on a brain scan?",
 ans:["The choroid plexus keeps secreting, but fluid cannot get past the block, so it backs up. The two lateral ventricles and the third ventricle, the ones upstream of the aqueduct, swell, and the pressure inside the skull rises within hours. The fourth ventricle, downstream of the block, stays normal size.","An abnormal build-up of cerebrospinal fluid is hydrocephalus. The pattern on the scan locates the block: if all the ventricles were enlarged, the blockage would have to be farther along, in the subarachnoid space."],
 name:"hydrocephalus",
 desc:"Two boxes read about 150 milliliters in the system and about 500 milliliters made each day. A maroon X blocks the flow, and the ventricle balloons outward.",
 pre:function(){S(["brain","nums","block"]);},
 play:function(a){return tweenVal(0,1,1400,a,function(k){swell.setAttribute("rx",140*k);swell.setAttribute("ry",70*k);}).then(function(){cap("Upstream ventricles swell");});}},

{title:"Taking a sample",
 text:["Because the choroid plexus is selective about what it moves, cerebrospinal fluid is not the same as plasma. It has less K+ and more H+ than plasma, about the same Na+, very little protein, and no blood cells. It also trades solutes with the fluid around the neurons, so a sample of it tells a clinician about the chemical environment of the brain."],
 ask:"Where could a needle reach the cerebrospinal fluid with the least risk, and what would protein or blood cells in the sample suggest?",
 ans:["In the lower back, into the subarachnoid space below the bottom end of the spinal cord, where there is fluid but no cord to damage. This is a lumbar puncture, or spinal tap.","Normal fluid has almost no protein and no cells, so protein or blood cells in it suggest an infection such as meningitis. More H+ than plasma also means the fluid has a slightly lower pH than blood."],
 name:"lumbar puncture",
 desc:"The brain figure with the fluid surrounding it, standing for the fluid that continues down around the spinal cord.",
 pre:function(){S(["brain"]);},
 play:function(a){return wait(400,a).then(function(){cap("Below the cord: a spinal tap");});}},

{sec:"The blood-brain barrier",comp:"Competency 6",
 title:"Two kinds of capillary",
 text:["On the left is a capillary from most of the body, in cross section. Its endothelial cells have leaky junctions and pores, so solutes move freely between the plasma and the tissue.","On the right is a capillary in the brain. Its endothelial cells are joined by tight junctions that block movement between the cells. The tight junctions form in response to paracrine signals from two neighbors: the foot processes of astrocytes that wrap the capillary, and contractile cells called pericytes, which also help regulate blood flow through the capillary."],
 name:"blood-brain barrier",
 auto:true,
 desc:"Two capillaries in cross section. The one on the left has white gaps in its wall. The one on the right has its wall sealed by navy tight junctions and gold astrocyte feet pressed against the outside.",
 pre:function(){S(["caps","ast"]);},
 play:function(a){return wait(300,a).then(function(){cap("Tight junctions, astrocytes, pericytes");});}},

{title:"Four things arrive",
 text:["Four things in the blood reach a brain capillary: oxygen, glucose, a large plasma protein, and a small lipid-soluble anesthetic."],
 ask:"Which of the four get into the brain, and how does each one cross or fail to cross?",
 ans:["Oxygen crosses freely: it is small and nonpolar and diffuses straight through the cell membranes. Glucose crosses on carriers in the endothelial cells (GLUT1) by facilitated diffusion. The large protein cannot cross: there are no gaps to slip through and no carrier for it. The small lipid-soluble anesthetic dissolves through the membranes and reaches the brain quickly.","The rule is that any water-soluble molecule without its own carrier cannot cross. The endothelium also has transporters running the other way, moving wastes out of the brain into the plasma. So the barrier is selective transport, not a wall."],
 desc:"Four labeled pills sit in the blood of the brain capillary. Oxygen moves out through the wall. Glucose moves out through a gold transporter labeled GLUT1. The protein stays in the blood. The drug moves out through the wall.",
 pre:function(){S(["caps","ast"]);MG.forEach(function(g,i){g.setAttribute("display","");place(g,650-60+i*40,215+(i%2)*50);});},
 play:function(a){REG.glut.setAttribute("display","");
   return Promise.all([tweenPath(MG[0],[[650,40]],1100,a),tweenPath(MG[1],[[780,240],[870,240]],1300,a),tweenPath(MG[2],[[650,300]],600,a),tweenPath(MG[3],[[440,240]],1000,a)]).then(function(){outT.textContent="crossed: oxygen, glucose, drug.  stopped: protein";cap("Lipid soluble or carried: in");});}},

{title:"Drowsy or not",
 text:["Older antihistamines for allergies often made people sleepy. Many newer ones do not, even though both block the same histamine receptors in the body."],
 ask:"Using the barrier, explain the difference. Then explain why Parkinson's disease is treated with L-dopa instead of dopamine.",
 ans:["The older antihistamines were lipid soluble, so they crossed the blood-brain barrier and acted on brain centers that keep you alert. The newer ones are much less lipid soluble, stay out of the brain, and so do not cause the same drowsiness.","In Parkinson's, neurons that make dopamine are lost. Dopamine given as a drug cannot cross the barrier: it is water soluble and has no carrier. Its precursor L-dopa is carried across on an amino acid transporter, and neurons inside the brain convert it to dopamine."],
 desc:"The brain capillary and its four pills remain, with the protein still in the blood.",
 pre:function(){S(["caps","ast","glut"]);},
 play:function(a){return wait(400,a).then(function(){cap("Dissolve through, or find a carrier");});}},

{title:"Where the barrier is missing",
 text:["In a few small regions of the brain, the capillaries are leaky like the ones elsewhere in the body."],
 ask:"Why would the brain need a few places with no barrier at all? Think of a neuron that has to put something into the blood, and one that has to check the blood.",
 ans:["In the hypothalamus, neurosecretory neurons release hormones that have to get into the capillaries of the portal system that carries them to the anterior pituitary. In the medulla, the vomiting center monitors the blood for toxic substances, such as drugs, and starts the vomiting reflex when it finds one. Neither could work behind a tight barrier.","So the barrier is tight where neurons need a protected environment and open where they need direct contact with the blood."],
 name:"vomiting center",
 desc:"Both capillaries are shown, the leaky one on the left standing for the capillaries of these regions.",
 pre:function(){S(["caps","ast"]);},
 play:function(a){return wait(300,a).then(function(){cap("Open where neurons need the blood");});}},

{title:"Feeding the brain",
 text:["The brain uses about one fifth of the body's oxygen at any moment and, by some estimates, about half of its glucose. Oxygen crosses the barrier freely, but glucose depends on transporters, and neurons normally use glucose as their only fuel. Astrocytes also take up glucose and pass lactate to neurons."],
 ask:"A person with long-standing high blood glucose takes too much insulin, and their blood glucose falls below normal. Why might they become confused sooner than someone without diabetes?",
 ans:["When blood glucose stays high for a long time, the cells of the blood-brain barrier down-regulate their glucose transporters. When blood glucose then drops, those fewer transporters cannot move glucose into the brain fast enough, and neurons that run on glucose start to fail: confusion, irritability, slurred speech.","It needs sugar quickly, by mouth or into a vein, because without it hypoglycemia can progress to unconsciousness. The brain's high fuel demand is why so many homeostatic pathways defend blood glucose."],
 desc:"The brain capillary with its gold GLUT1 transporter, the route glucose depends on.",
 pre:function(){S(["caps","ast","glut"]);},
 play:function(a){return wait(400,a).then(function(){cap("Fewer carriers, less glucose in");});}},

{sec:"Review",comp:"Competency 6",
 title:"Summary with the scientific terms",
 text:["The brain is protected by bone, the three meninges, dura mater, arachnoid membrane and pia mater, and cerebrospinal fluid. The choroid plexus pumps Na+ and solutes into the ventricles and water follows. The fluid flows from the lateral ventricles to the third, through the cerebral aqueduct to the fourth, into the subarachnoid space, and back to the blood at the arachnoid villi, turning over about three times a day. It floats and cushions the brain and keeps its chemical environment steady; a sample is taken by lumbar puncture.","The blood-brain barrier is made by tight junctions between brain capillary cells, induced by astrocytes and pericytes. Small lipid-soluble molecules diffuse through, molecules with a carrier are carried, and other water-soluble molecules are kept out. The hypothalamus and the vomiting center lack the barrier."],
 ask:"Without scrolling back, explain why a blocked cerebral aqueduct enlarges some ventricles but not others, and why an older antihistamine makes you drowsy while dopamine pills do nothing for Parkinson's.",
 ans:["Fluid is made in all the ventricles but can only leave by flowing forward, so everything upstream of the aqueduct, the lateral and third ventricles, swells while the fourth does not. The older antihistamine is lipid soluble and dissolves through the barrier; dopamine is water soluble with no carrier, so it stays out.","If either answer would not come, look again at those steps."],
 desc:"The brain capillary with its tight junctions and astrocyte feet.",
 pre:function(){S(["caps","ast"]);},
 play:function(a){return wait(300,a).then(function(){cap("Fluid outside, barrier inside");});}}
];
