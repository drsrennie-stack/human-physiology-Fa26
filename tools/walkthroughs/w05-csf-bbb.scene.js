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

/* Oct 4 2026: the meninges, a lumbar puncture, drugs at the barrier, the
   places without a barrier, and glucose transporters. */
var gMen=G("men");
var ML=[["bone of the skull",40,60,"#D9D4C7",INK2],["dura mater, with a venous sinus",100,40,"#C9D3E6",NAVY],["arachnoid membrane",140,16,"#E3E8F2",NAVY],["subarachnoid space (CSF)",156,74,FLUID,FLOW],["pia mater",230,10,"#F2C9C0",MAROON],["brain",240,190,TISS,MAROON]];
var MLG=ML.map(function(m){var g=el("g",{},gMen);el("rect",{x:60,y:m[1],width:560,height:m[2],fill:m[3],stroke:m[4],"stroke-width":1.5},g);tx(g,640,m[1]+m[2]/2+5,m[0],"tn",14,"start");return g;});
el("polygon",{points:"300,100 360,100 330,135",fill:NAVY,opacity:.8},MLG[1]);
for(var i=0;i<8;i++){el("line",{x1:90+i*70,y1:156,x2:110+i*70,y2:230,stroke:FLOW,"stroke-width":1.5},MLG[3]);}
function menShow(n){MLG.forEach(function(g,i){g.setAttribute("opacity",i<n?1:0.12);});}
var gLp=G("lp");
for(i=0;i<9;i++){el("rect",{x:380,y:30+i*52,width:120,height:44,rx:8,fill:"#EDE8DC",stroke:INK2,"stroke-width":2},gLp);}
el("rect",{x:418,y:30,width:44,height:420,rx:18,fill:FLUID,stroke:FLOW,"stroke-width":2},gLp);
el("rect",{x:432,y:30,width:16,height:200,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":3},gLp);
for(i=0;i<5;i++){el("line",{x1:436+i*2,y1:230,x2:428+i*6,y2:420,stroke:NAVY,"stroke-width":1.5},gLp);}
tx(gLp,370,120,"spinal cord","tn",14,"end");tx(gLp,370,236,"cord ends here","tm",14,"end");tx(gLp,370,360,"fluid space continues","t",14,"end");
var lpNeedle=el("g",{},gLp);el("line",{x1:0,y1:0,x2:260,y2:0,stroke:INK2,"stroke-width":5,"stroke-linecap":"round"},lpNeedle);el("rect",{x:240,y:-12,width:50,height:24,rx:5,fill:GDEEP},lpNeedle);
var lpT=tx(gLp,560,410,"needle into the fluid, below the cord","tm",14,"start");
var gDrug=G("drugs");
el("rect",{x:60,y:60,width:780,height:150,fill:TISS,stroke:MAROON,"stroke-width":2},gDrug);tx(gDrug,70,84,"blood","tm",15,"start");
el("rect",{x:60,y:210,width:780,height:24,fill:"#fff",stroke:NAVY,"stroke-width":3},gDrug);tx(gDrug,70,252,"capillary wall with tight junctions","t",12,"start");
el("rect",{x:60,y:234,width:780,height:200,fill:FLUID,stroke:FLOW,"stroke-width":2},gDrug);tx(gDrug,70,426,"brain","tn",15,"start");
var carrier=badge(gDrug,690,222,"carrier",GDEEP,26);carrier._t.setAttribute("font-size",12);
function pill(lab,col,x){var g=el("g",{},gDrug);el("rect",{x:-70,y:-16,width:140,height:32,rx:16,fill:col},g);var t=el("text",{"class":"iw","font-size":12},g);t.textContent=lab;place(g,x,140);return g;}
var DP=[pill("older antihistamine",NAVY,160),pill("newer antihistamine",INK2,340),pill("dopamine",MAROON,520),pill("L-dopa",GDEEP,690)];
function drugsReset(){DP.forEach(function(g,i){place(g,[160,340,520,690][i],140);});}
var dLab=[tx(gDrug,160,300,"dissolves through: drowsy","tn",13,"middle"),tx(gDrug,340,300,"stays out: not drowsy","t",13,"middle"),tx(gDrug,520,300,"stays out","tm",13,"middle"),tx(gDrug,690,330,"carried in, made into dopamine","tn",13,"middle")];
var gCvo=G("cvo");
el("ellipse",{cx:450,cy:230,rx:330,ry:190,fill:TISS,stroke:MAROON,"stroke-width":3},gCvo);
el("path",{d:"M520 380 q20 60 10 110",fill:"none",stroke:MAROON,"stroke-width":34,"stroke-linecap":"round"},gCvo);
var cv1=badge(gCvo,450,300,"",GDEEP,16),cv2=badge(gCvo,525,430,"",GDEEP,16);
tx(gCvo,420,330,"hypothalamus: hormones into the blood","tn",14,"end");tx(gCvo,560,430,"vomiting center, medulla:","tn",14,"start");tx(gCvo,560,450,"checks the blood for toxins","tn",14,"start");
tx(gCvo,450,90,"places with leaky capillaries, no barrier","tm",16,"middle");
var gGlu=G("glu");
el("rect",{x:60,y:60,width:780,height:150,fill:TISS,stroke:MAROON,"stroke-width":2},gGlu);tx(gGlu,70,84,"blood glucose","tm",15,"start");
el("rect",{x:60,y:210,width:780,height:24,fill:"#fff",stroke:NAVY,"stroke-width":3},gGlu);
el("rect",{x:60,y:234,width:780,height:200,fill:FLUID,stroke:FLOW,"stroke-width":2},gGlu);tx(gGlu,70,426,"neurons","tn",15,"start");
var GT=[0,1,2,3,4,5].map(function(i){return badge(gGlu,140+i*120,222,"T",GDEEP,14);});
var GD=[0,1,2,3,4,5].map(function(i){return dot(gGlu,GDEEP,7);});
var gluT=tx(gGlu,450,480,"","tn",15,"middle");
function gluFlow(n,a){return Promise.all(GD.map(function(d,i){return i<n?run(d,[[140+i*120,140],[140+i*120,222],[140+i*120,330]],900,a):Promise.resolve();}));}
function gluShow(n){GT.forEach(function(b,i){b.setAttribute("display",i<n?"":"none");});}

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
 desc:"Layers appear from the skull inward: bone of the skull; the dura mater with a navy venous sinus; the thin arachnoid membrane; the subarachnoid space filled with blue cerebrospinal fluid; the thin pia mater; and the brain.",
 pre:function(){S(["men"]);menShow(1);},
 play:function(a){var k=1;function nxt(){if(k>=6)return Promise.resolve();k++;menShow(k);return wait(300,a).then(nxt);}return nxt().then(function(){cap("Dura, arachnoid, pia: outside in");});}},
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
 desc:"A column of vertebrae with the spinal cord inside, ending partway down, and the blue fluid-filled space continuing below it. A needle slides in from the side into the fluid below the end of the cord.",
 pre:function(){S(["lp"]);place(lpNeedle,700,360);lpT.setAttribute("display","none");},
 play:function(a){return tweenPath(lpNeedle,[[452,360]],1100,a).then(function(){lpT.setAttribute("display","");cap("Below the cord: a spinal tap");});}},
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
 desc:"Blood above, a capillary wall with tight junctions in the middle, and brain below. Four pills start in the blood. The older lipid-soluble antihistamine passes through the wall. The newer antihistamine and dopamine stop at the wall. L-dopa passes through a gold carrier.",
 pre:function(){S(["drugs"]);drugsReset();dLab.forEach(function(t){t.setAttribute("display","none");});},
 play:function(a){return Promise.all([tweenPath(DP[0],[[160,330]],1100,a),tweenPath(DP[1],[[340,196]],500,a),tweenPath(DP[2],[[520,196]],500,a),tweenPath(DP[3],[[690,222],[690,360]],1300,a)]).then(function(){dLab.forEach(function(t){t.setAttribute("display","");});cap("Dissolve through, or find a carrier");});}},
{title:"Where the barrier is missing",
 text:["In a few small regions of the brain, the capillaries are leaky like the ones elsewhere in the body."],
 ask:"Why would the brain need a few places with no barrier at all? Think of a neuron that has to put something into the blood, and one that has to check the blood.",
 ans:["In the hypothalamus, neurosecretory neurons release hormones that have to get into the capillaries of the portal system that carries them to the anterior pituitary. In the medulla, the vomiting center monitors the blood for toxic substances, such as drugs, and starts the vomiting reflex when it finds one. Neither could work behind a tight barrier.","So the barrier is tight where neurons need a protected environment and open where they need direct contact with the blood."],
 name:"vomiting center",
 desc:"A brain outline with two gold spots: the hypothalamus, labeled hormones into the blood, and the vomiting center in the medulla, labeled checks the blood for toxins.",
 pre:function(){S(["cvo"]);},
 play:function(a){return wait(500,a).then(function(){cap("Open where neurons need the blood");});}},
{title:"Feeding the brain",
 text:["The brain uses about one fifth of the body's oxygen at any moment and, by some estimates, about half of its glucose. Oxygen crosses the barrier freely, but glucose depends on transporters, and neurons normally use glucose as their only fuel. Astrocytes also take up glucose and pass lactate to neurons."],
 ask:"A person with long-standing high blood glucose takes too much insulin, and their blood glucose falls below normal. Why might they become confused sooner than someone without diabetes?",
 ans:["When blood glucose stays high for a long time, the cells of the blood-brain barrier down-regulate their glucose transporters. When blood glucose then drops, those fewer transporters cannot move glucose into the brain fast enough, and neurons that run on glucose start to fail: confusion, irritability, slurred speech.","It needs sugar quickly, by mouth or into a vein, because without it hypoglycemia can progress to unconsciousness. The brain's high fuel demand is why so many homeostatic pathways defend blood glucose."],
 desc:"Blood above a capillary wall with six gold glucose carriers; six glucose dots pass through into the brain. Then the carriers drop to two, labeled after long-term high glucose, and only two glucose dots get through.",
 pre:function(){S(["glu"]);gluShow(6);gluT.textContent="";},
 play:function(a){gluT.textContent="normal: many glucose carriers";return gluFlow(6,a).then(function(){gluShow(2);gluT.textContent="after long-term high glucose: fewer carriers";return wait(400,a);}).then(function(){return gluFlow(2,a);}).then(function(){cap("Fewer carriers, less glucose in");});}},
{sec:"Review",comp:"Competency 6",
 title:"Summary with the scientific terms",
 text:["The brain is protected by bone, the three meninges, dura mater, arachnoid membrane and pia mater, and cerebrospinal fluid. The choroid plexus pumps Na+ and solutes into the ventricles and water follows. The fluid flows from the lateral ventricles to the third, through the cerebral aqueduct to the fourth, into the subarachnoid space, and back to the blood at the arachnoid villi, turning over about three times a day. It floats and cushions the brain and keeps its chemical environment steady; a sample is taken by lumbar puncture.","The blood-brain barrier is made by tight junctions between brain capillary cells, induced by astrocytes and pericytes. Small lipid-soluble molecules diffuse through, molecules with a carrier are carried, and other water-soluble molecules are kept out. The hypothalamus and the vomiting center lack the barrier."],
 ask:"Without scrolling back, explain why a blocked cerebral aqueduct enlarges some ventricles but not others, and why an older antihistamine makes you drowsy while dopamine pills do nothing for Parkinson's.",
 ans:["Fluid is made in all the ventricles but can only leave by flowing forward, so everything upstream of the aqueduct, the lateral and third ventricles, swells while the fourth does not. The older antihistamine is lipid soluble and dissolves through the barrier; dopamine is water soluble with no carrier, so it stays out.","If either answer would not come, look again at those steps."],
 desc:"The brain capillary with its tight junctions and astrocyte feet.",
 pre:function(){S(["caps","ast"]);},
 play:function(a){return wait(300,a).then(function(){cap("Fluid outside, barrier inside");});}}
];
