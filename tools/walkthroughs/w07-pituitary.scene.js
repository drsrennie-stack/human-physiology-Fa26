/* The hypothalamus and pituitary. Oct 17 2026. Week 7 competencies 12 to 15.
   Walkthrough 3 of 4 for Week 7. The worked axis is the cortisol axis
   (CRH, ACTH, cortisol), with the thyroid axis (TRH, TSH, T3 and T4) for
   practice. The gonadal axis is left to walkthrough 4.
   Figures, each shown and hidden per step:
   - sag: a midline section of the head: the base of the brain with the
     hypothalamus, the optic chiasm and mammillary body, the pituitary stalk,
     the posterior and anterior lobes in their cup of bone, the portal
     vessels and both capillary beds; sub-groups for the lobe labels, the
     tissue labels, the ADH and oxytocin neurons, the osmoreceptor and the
     releasing-hormone neuron
   - tgt: the blood route out to the adrenal gland on the kidney, or to the
     thyroid gland on the windpipe; fb: the long and short feedback loops
   - bars: hormone levels in the blood, two tiers; pill: prednisone
   - six: the six anterior lobe hormones and their targets
   - desert, duct, oxy, curve: the desert hike, a collecting duct cell,
     the uterus and breast, and an immunoassay standard curve.
   Every step the student acts in uses promptAt and waitOn from the kit,
   so Next stays locked until the student has done the action. */

/* ======================= the midline section ======================= */
var gSag=G("sag");
tx(gSag,20,30,"back of the head","t",13,"start");tx(gSag,570,30,"front of the head","t",13,"end");
arrow(gSag,140,25,436,25,INK2,3);
el("path",{d:"M20 46 L578 46 L578 214 Q548 230 516 240 Q506 258 486 256 L360 248 L298 248 L238 250 Q214 258 200 246 Q120 236 20 238 Z",fill:"#F4F5F8",stroke:NAVY,"stroke-width":3},gSag);
var hypo=el("path",{d:"M196 160 Q330 118 512 156 L516 238 Q506 256 486 254 L360 246 L298 246 L238 248 Q214 256 200 244 Z",fill:"#E3E6ED",stroke:INK2,"stroke-width":1.5},gSag);
tx(gSag,354,110,"hypothalamus","tn",16,"middle");
tx(gSag,34,76,"base of the brain","t",13,"start");
el("circle",{cx:216,cy:252,r:13,fill:"#fff",stroke:INK2,"stroke-width":2},gSag);
el("ellipse",{cx:496,cy:252,rx:24,ry:9,fill:"#fff",stroke:INK2,"stroke-width":2},gSag);
tx(gSag,198,284,"mammillary body","t",12,"end");tx(gSag,486,280,"optic chiasm","t",12,"end");
/* the cup of bone */
el("path",{d:"M214 360 Q218 450 360 452 Q502 450 508 360",fill:"none",stroke:"#C8B48A","stroke-width":7,"stroke-linecap":"round"},gSag);
/* the two lobes and the stalk */
var antLobe=el("ellipse",{cx:418,cy:376,rx:80,ry:58,fill:TISS,stroke:MAROON,"stroke-width":3},gSag);
var postLobe=el("ellipse",{cx:282,cy:378,rx:54,ry:50,fill:"#E8EBF2",stroke:NAVY,"stroke-width":3},gSag);
var stalk=el("path",{d:"M300 246 L354 246 Q344 292 322 344 L266 344 Q296 292 300 246 Z",fill:"#E8EBF2"},gSag);
el("path",{d:"M300 246 Q296 292 270 334",fill:"none",stroke:NAVY,"stroke-width":3},gSag);
el("path",{d:"M354 246 Q344 292 322 342",fill:"none",stroke:NAVY,"stroke-width":3},gSag);
/* gland cells in the anterior lobe */
var ANTC=[[384,384],[408,404],[436,400],[462,382],[452,410],[390,412]].map(function(q){return el("circle",{cx:q[0],cy:q[1],r:7,fill:"#fff",stroke:MAROON,"stroke-width":1.5},gSag);});
/* blood vessels: artery in, first capillary bed, portal vessels, second bed, veins out */
function vessel(pts,w){var v=poly(gSag,pts,MAROON,w||4);v.setAttribute("opacity",.6);return v;}
vessel([[586,262],[480,262],[400,258],[348,256]]);
el("path",{d:"M316 258 q5 -9 10 0 q5 9 10 0 q5 -9 10 0",fill:"none",stroke:MAROON,"stroke-width":3},gSag);
vessel([[336,262],[370,332]],3.5);vessel([[348,262],[390,324]],3.5);
el("path",{d:"M370 352 q7 -10 14 0 q7 10 14 0 q7 -10 14 0 q7 10 14 0 q7 -10 14 0",fill:"none",stroke:MAROON,"stroke-width":3},gSag);
vessel([[466,398],[520,424],[586,440]]);
el("path",{d:"M246 404 q6 -9 12 0 q6 9 12 0 q6 -9 12 0 q6 9 12 0",fill:"none",stroke:MAROON,"stroke-width":3},gSag);
vessel([[246,404],[200,424],[120,440],[60,442]]);
/* lobe labels (step 1 on) and tissue labels (step 2 on) */
var gLobeL=G("lobeLab",gSag);
tx(gLobeL,270,476,"posterior lobe","tn",14,"middle");
var lAnt=tx(gLobeL,430,476,"anterior lobe","tm",14,"middle");
tx(gLobeL,268,306,"pituitary stalk","t",13,"end");
var gTissL=G("tissLab",gSag);
tx(gTissL,270,492,"(neural tissue)","t",12,"middle");tx(gTissL,430,492,"(gland tissue)","t",12,"middle");
var gEmb=G("emb",gSag);
tx(gEmb,40,344,"grew down","tn",12,"start");tx(gEmb,40,360,"from the brain","tn",12,"start");
tx(gEmb,506,344,"grew up from the","tm",12,"start");tx(gEmb,506,360,"roof of the mouth","tm",12,"start");
var gVL=G("veinLab",gSag);
tx(gVL,60,462,"into the blood","t",12,"start");
var gInL=G("inLab",gSag);tx(gInL,580,252,"blood in","t",12,"end");
/* the ADH and oxytocin neurons, their axons down the stalk, and their stored hormone */
var gPost=G("post",gSag);
var ADH_AX=[[318,176],[318,240],[306,300],[296,350],[292,392]];
var OT_AX=[[258,196],[306,252],[296,300],[278,350],[268,392]];
var axA=poly(gPost,ADH_AX,NAVY,3),axO=poly(gPost,OT_AX,MAROON,3);
var cA=el("circle",{cx:318,cy:176,r:11,fill:NAVY},gPost),cO=el("circle",{cx:258,cy:196,r:11,fill:MAROON},gPost);
el("circle",{cx:292,cy:396,r:6,fill:NAVY},gPost);el("circle",{cx:268,cy:396,r:6,fill:MAROON},gPost);
tx(gPost,304,170,"ADH","tn",12,"end");tx(gPost,244,196,"oxytocin","tm",12,"end");
var gStore=G("store",gSag);
[[286,384,NAVY],[298,386,NAVY],[262,384,MAROON],[274,386,MAROON]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:4,fill:q[2]},gStore);});
/* the osmoreceptor, beside the ADH neuron */
var gOsmo=G("osmo",gSag);
el("line",{x1:360,y1:150,x2:326,y2:170,stroke:INK2,"stroke-width":2.5},gOsmo);
var osmoC=el("circle",{cx:360,cy:150,r:8,fill:INK2},gOsmo);
tx(gOsmo,374,154,"osmoreceptor","t",12,"start");
var osmoRing=el("circle",{cx:330,cy:168,r:30,fill:"none",stroke:MAROON,"stroke-width":3},gOsmo);
/* the releasing-hormone neuron, ending on the first capillary bed */
var gPort=G("port",gSag);
var RH_AX=[[420,180],[380,215],[345,250]];
poly(gPort,RH_AX,GDEEP,3);el("circle",{cx:420,cy:180,r:11,fill:GDEEP},gPort);el("circle",{cx:345,cy:250,r:5,fill:GDEEP},gPort);
var lRH=tx(gPort,436,200,"releasing-hormone neuron","t",12,"start");
var tagRH=tx(gPort,404,302,"portal vessels","t",12,"start");
/* the stalk cut, for the review */
var gCut=G("cut",gSag);
el("path",{d:"M282 284 L356 296",stroke:"#fff","stroke-width":9},gCut);el("path",{d:"M282 284 L356 296",stroke:MAROON,"stroke-width":4,"stroke-dasharray":"6 4"},gCut);
/* lesions in the anterior lobe */
var pitDam=el("ellipse",{cx:432,cy:394,rx:42,ry:24,fill:"#C9CDD6",stroke:INK2,"stroke-width":1.5},gSag);
var pitTum=el("ellipse",{cx:440,cy:392,rx:24,ry:17,fill:MAROON},gSag);
/* click targets in the section */
var pitHit=el("ellipse",{cx:350,cy:378,rx:150,ry:64,fill:"transparent"},gSag);
var postHit=el("ellipse",{cx:282,cy:378,rx:56,ry:52,fill:"transparent"},gSag);
var cellHit=el("circle",{cx:288,cy:186,r:42,fill:"transparent"},gSag);
var rhHit=el("circle",{cx:420,cy:180,r:28,fill:"transparent"},gSag);
var antHit=el("ellipse",{cx:418,cy:376,rx:80,ry:58,fill:"transparent"},gSag);
var hypoHit=el("ellipse",{cx:356,cy:196,rx:150,ry:52,fill:"transparent"},gSag);
var stalkHit=el("rect",{x:278,y:258,width:84,height:66,fill:"transparent"},gSag);
var SAGHIT=[pitHit,postHit,cellHit,rhHit,antHit,hypoHit,stalkHit];
function sagHits(l){SAGHIT.forEach(function(h){h.setAttribute("display",l.indexOf(h)>=0?"":"none");});}
var pPit=promptAt(gSag,590,300,["Click the pituitary gland","to name its parts"],506,360,350,378,62);
var pPost=promptAt(gSag,590,180,["Click the posterior lobe,","the back part"],330,350,282,378,46);
var pCells=promptAt(gSag,590,120,["Click the neuron cell bodies","in the hypothalamus"],336,170,288,186,44);
var pRH=promptAt(gSag,590,330,["Click the releasing-","hormone neuron"],446,196,420,180,30);
var pRH2=promptAt(gSag,40,140,["Click the CRH neuron"],392,176,420,180,30);
var pTRH=promptAt(gSag,40,140,["Click the TRH neuron"],392,176,420,180,30);
var pAnt=promptAt(gSag,40,330,["Click the anterior lobe"],360,372,418,376,50);
var pAnt2=promptAt(gSag,40,330,["Now click the anterior lobe"],360,372,418,376,50);
var pHypo=promptAt(gSag,40,330,["Click the hypothalamus","to run every pathway"],300,230,356,196,52);
var pStalk=promptAt(gSag,40,330,["Now click the stalk","to cut it"],282,310,320,290,36);
/* shading the two kinds of tissue */
function tissues(on){postLobe.setAttribute("fill",on?"#D3D9E6":"#E8EBF2");stalk.setAttribute("fill",on?"#D3D9E6":"#E8EBF2");antLobe.setAttribute("fill",on?"#F2D6CF":TISS);}
function antCells(on){ANTC.forEach(function(c){c.setAttribute("fill",on?"#E9B8AE":"#fff");});}

/* ======================= the route out to the last gland ======================= */
var gTgt=G("tgt");
var circ=poly(gTgt,[[586,440],[700,440],[716,336],[752,330]],MAROON,4);circ.setAttribute("opacity",.6);
var tagAC=tx(gTgt,600,462,"ACTH in the blood","tn",13,"start");
var tagCO=tx(gTgt,888,282,"cortisol","tm",13,"end");
var lGland=tx(gTgt,888,262,"adrenal cortex","tm",13,"end");
var gAdr=G("adr",gTgt);
el("path",{d:"M800 350 C852 350 858 472 800 472 C758 472 750 440 772 410 C750 380 758 350 800 350 Z",fill:TISS,stroke:MAROON,"stroke-width":3},gAdr);
tx(gAdr,808,422,"kidney","t",13,"middle");
var ADRC="M752 352 Q760 300 800 286 Q840 300 848 352 Q800 340 752 352 Z";
var cortex=el("path",{d:ADRC,fill:"#F3E3B5",stroke:GDEEP,"stroke-width":2.5},gAdr);
el("path",{d:"M780 342 Q786 318 800 310 Q814 318 820 342 Q800 336 780 342 Z",fill:"#D9C38A",stroke:GDEEP,"stroke-width":1.5},gAdr);
var adrTum=el("ellipse",{cx:822,cy:328,rx:13,ry:10,fill:MAROON},gAdr);
var gThy=G("thy",gTgt);
el("rect",{x:786,y:292,width:28,height:178,rx:10,fill:"#fff",stroke:INK2,"stroke-width":2},gThy);
for(var ti=0;ti<8;ti++)el("line",{x1:788,y1:304+ti*21,x2:812,y2:304+ti*21,stroke:INK2,"stroke-width":1.5},gThy);
el("ellipse",{cx:772,cy:362,rx:21,ry:42,fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},gThy);
el("ellipse",{cx:828,cy:362,rx:21,ry:42,fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},gThy);
el("rect",{x:790,y:366,width:20,height:16,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2},gThy);
tx(gThy,800,488,"windpipe","t",12,"middle");
var adrHit=el("circle",{cx:800,cy:324,r:38,fill:"transparent"},gTgt);
var thyHit=el("circle",{cx:800,cy:362,r:44,fill:"transparent"},gTgt);
var pAdr=promptAt(gTgt,600,120,["Click the adrenal cortex"],770,300,800,324,40);
var pAdrL=promptAt(gTgt,560,505,["Click the adrenal cortex"],744,350,800,324,40);
var pThy=promptAt(gTgt,600,120,["Now click the thyroid gland"],776,316,800,362,46);
var AX={cort:{rh:"CRH",tr:"ACTH",fin:"cortisol",gl:"adrenal cortex",end:[752,330],co:[[800,300],[840,286]]},thy:{rh:"TRH",tr:"TSH",fin:"T3 and T4",gl:"thyroid gland",end:[752,332],co:[[828,330],[860,300]]}};
var axis="cort";
function axisMode(k){axis=k;var m=AX[k];gAdr.setAttribute("display",k==="cort"?"":"none");gThy.setAttribute("display",k==="thy"?"":"none");adrHit.setAttribute("display",k==="cort"?"":"none");thyHit.setAttribute("display",k==="thy"?"":"none");
  tagAC.textContent=m.tr+" in the blood";tagCO.textContent=m.fin;lGland.textContent=m.gl;lRH.textContent=m.rh+" neuron";tagRH.textContent=m.rh;}

/* ======================= feedback loops ======================= */
var LONG_H=[[790,300],[700,250],[560,206],[452,180]],LONG_P=[[760,322],[640,350],[512,374]],SHORT=[[480,326],[556,300],[560,250],[530,228]];
var gFb=G("fb");
var fbH=poly(gFb,LONG_H,MAROON,3,"8 6"),fbP=poly(gFb,LONG_P,MAROON,3,"8 6"),fbS=poly(gFb,SHORT,NAVY,3,"8 6");
fbH._dash=fbP._dash=fbS._dash="8 6";
var mH=badge(gFb,452,178,M,MAROON,12),mP=badge(gFb,512,374,M,MAROON,12),mS=badge(gFb,530,228,M,NAVY,12);
var gFbL=G("fbLab",gFb);
tx(gFbL,606,204,"long loop","tm",13,"start");tx(gFbL,590,388,"long loop","tm",13,"start");tx(gFbL,570,272,"short loop","tn",13,"start");
function fbShow(h,p,s){[[fbH,mH,h],[fbP,mP,p],[fbS,mS,s]].forEach(function(q){q[0].setAttribute("display",q[2]?"":"none");q[1].setAttribute("display",q[2]?"":"none");});}

/* ======================= hormone levels ======================= */
var gBars=G("bars");
el("rect",{x:596,y:20,width:292,height:196,rx:10,fill:"#fff",stroke:INK2,"stroke-width":1.5},gBars);
tx(gBars,610,44,"levels in the blood","tn",14,"start");
el("line",{x1:664,y1:190,x2:884,y2:190,stroke:INK2,"stroke-width":2},gBars);
el("line",{x1:664,y1:120,x2:884,y2:120,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 5"},gBars);
tx(gBars,606,124,"normal","t",12,"start");
var BAR=[{x:690,c:NAVY},{x:810,c:MAROON}];
BAR.forEach(function(b){b.r=el("rect",{x:b.x,y:120,width:60,height:70,rx:4,fill:b.c,opacity:.85},gBars);b.w=tx(gBars,b.x+30,112,"normal","tn",13,"middle");b.n=tx(gBars,b.x+30,208,"","tn",13,"middle");b.h=70;});
var LV={low:25,normal:70,high:115};
function barSet(b,h){b.h=h;b.r.setAttribute("y",190-h);b.r.setAttribute("height",h);}
function barTo(b,lvl,a){var h1=LV[lvl];b.w.textContent="";return tweenVal(b.h,h1,600,a,function(h){barSet(b,h);}).then(function(){b.w.setAttribute("y",190-h1-8);b.w.textContent=lvl;});}
function bars(l1,l2,a){return Promise.all([barTo(BAR[0],l1,a),barTo(BAR[1],l2,a)]);}
function barNames(n1,n2){BAR[0].n.textContent=n1;BAR[1].n.textContent=n2;}
function barsReset(){BAR.forEach(function(b){barSet(b,70);b.w.setAttribute("y",112);b.w.textContent="normal";});}
var barHit=el("rect",{x:680,y:60,width:80,height:156,fill:"transparent"},gBars);
var pBar=promptAt(gBars,600,262,["Click the TSH bar"],690,200,720,138,48);

/* ======================= prednisone ======================= */
var gPill=G("pill");
el("rect",{x:40,y:318,width:44,height:50,rx:6,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gPill);
el("rect",{x:36,y:306,width:52,height:14,rx:3,fill:NAVY},gPill);
el("rect",{x:46,y:332,width:32,height:20,fill:TINT},gPill);
tx(gPill,62,390,"prednisone","tm",13,"middle");
var pillHit=el("rect",{x:26,y:296,width:72,height:80,fill:"transparent"},gPill);
var pPill=promptAt(gPill,40,505,["Click the bottle for six months of doses"],56,382,62,338,40);
var DRUG_H=[[84,330],[150,220],[300,140],[452,180]],DRUG_P=[[84,350],[200,470],[400,470],[512,374]];
function shrink(k){cortex.setAttribute("transform","translate(800 352) scale("+k+") translate(-800 -352)");}

/* ======================= six anterior lobe hormones ======================= */
var gSix=G("six");
var SIX=[["TSH","thyroid gland"],["ACTH","adrenal cortex"],["GH","liver and most tissues"],["prolactin","breast"],["FSH and LH","ovaries or testes"]];
SIX.forEach(function(r,i){var y=44+i*78;r.y=y;
  r.ln=el("line",{x1:490,y1:362,x2:610,y2:y+29,stroke:INK2,"stroke-width":1.5},gSix);
  r.bx=el("rect",{x:610,y:y,width:270,height:58,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2},gSix);
  tx(gSix,624,y+24,r[0],"tn",15,"start");r.t2=tx(gSix,624,y+44,r[1],"t",13,"start");r.st=tx(gSix,868,y+24,"","tm",14,"end");});
function sixReset(){SIX.forEach(function(r){r.bx.setAttribute("fill","#fff");r.bx.setAttribute("stroke",NAVY);r.t2.textContent=r[1];r.st.textContent="";});}

/* ======================= the desert hike ======================= */
var gDes=G("desert");
var sun=el("g",{},gDes);el("circle",{cx:846,cy:64,r:24,fill:GOLD,stroke:GDEEP,"stroke-width":2},sun);
for(var si=0;si<8;si++){var an=si*Math.PI/4;el("line",{x1:846+Math.cos(an)*30,y1:64+Math.sin(an)*30,x2:846+Math.cos(an)*42,y2:64+Math.sin(an)*42,stroke:GDEEP,"stroke-width":3,"stroke-linecap":"round"},sun);}
el("rect",{x:596,y:286,width:294,height:34,fill:"#F3E3B5"},gDes);
var hiker=el("g",{},gDes);
el("circle",{cx:0,cy:-120,r:15,fill:TISS,stroke:MAROON,"stroke-width":2.5},hiker);
el("path",{d:"M-24 -134 L24 -134 L14 -142 L-14 -142 Z",fill:GDEEP},hiker);
el("rect",{x:-14,y:-102,width:28,height:56,rx:10,fill:"#fff",stroke:NAVY,"stroke-width":2.5},hiker);
el("rect",{x:-28,y:-98,width:16,height:36,rx:5,fill:TINT,stroke:NAVY,"stroke-width":2},hiker);
el("line",{x1:-6,y1:-48,x2:-18,y2:0,stroke:NAVY,"stroke-width":6,"stroke-linecap":"round"},hiker);
el("line",{x1:6,y1:-48,x2:20,y2:0,stroke:NAVY,"stroke-width":6,"stroke-linecap":"round"},hiker);
el("line",{x1:12,y1:-92,x2:30,y2:-60,stroke:NAVY,"stroke-width":5,"stroke-linecap":"round"},hiker);
var sweat=el("g",{},hiker);[[22,-126],[26,-110]].forEach(function(q){el("path",{d:"M"+q[0]+" "+q[1]+" q4 6 0 9 q-4 -3 0 -9 Z",fill:FLOW},sweat);});
function GX(v){return 610+(v-270)/40*270;}
tx(gDes,610,352,"plasma osmolarity, mOsm/L","tn",13,"start");
el("rect",{x:610,y:380,width:270,height:24,rx:12,fill:"#fff",stroke:NAVY,"stroke-width":2},gDes);
var gFill=el("rect",{x:610,y:380,width:GX(290)-610,height:24,rx:12,fill:MAROON,opacity:.75},gDes);
[270,280,290,300,310].forEach(function(v){el("line",{x1:GX(v),y1:404,x2:GX(v),y2:412,stroke:NAVY,"stroke-width":2},gDes);tx(gDes,GX(v),428,String(v),"t",12,"middle");});
el("line",{x1:GX(290),y1:374,x2:GX(290),y2:410,stroke:NAVY,"stroke-width":2,"stroke-dasharray":"4 3"},gDes);
tx(gDes,GX(290),372,"normal","t",12,"middle");
var osmT=tx(gDes,745,456,"290 mOsm/L","tn",15,"middle");
function osm(v){gFill.setAttribute("width",GX(v)-610);osmT.textContent=Math.round(v)+" mOsm/L";}
var sunHit=el("circle",{cx:846,cy:64,r:42,fill:"transparent"},gDes);
var pSun=promptAt(gDes,600,60,["Click the sun to hike","all day"],796,72,846,64,44);

/* ======================= a collecting duct cell ======================= */
var gDuct=G("duct");
tx(gDuct,145,40,"inside the collecting duct","tn",14,"middle");
tx(gDuct,430,40,"collecting duct cell","tn",14,"middle");
tx(gDuct,745,40,"blood side","tn",14,"middle");
el("rect",{x:40,y:60,width:210,height:380,fill:FLUID,stroke:INK2,"stroke-width":1.5},gDuct);
el("rect",{x:250,y:60,width:360,height:380,fill:TISS},gDuct);
el("rect",{x:610,y:60,width:270,height:380,fill:"#fff",stroke:INK2,"stroke-width":1.5},gDuct);
el("rect",{x:770,y:60,width:70,height:380,fill:"#F6DCD6",stroke:MAROON,"stroke-width":2.5},gDuct);
tx(gDuct,805,458,"capillary","t",13,"middle");
tx(gDuct,145,90,"urine forming","t",12,"middle");
el("line",{x1:250,y1:60,x2:250,y2:440,stroke:NAVY,"stroke-width":5},gDuct);el("line",{x1:610,y1:60,x2:610,y2:440,stroke:NAVY,"stroke-width":5},gDuct);
el("ellipse",{cx:450,cy:370,rx:44,ry:30,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2},gDuct);tx(gDuct,450,375,"nucleus","t",12,"middle");
el("path",{d:"M612 170 h-16 M596 170 l-10 -10 M596 170 l-10 10",fill:"none",stroke:NAVY,"stroke-width":4,"stroke-linecap":"round"},gDuct);
tx(gDuct,622,150,"ADH receptor","t",12,"start");
[250,300,350].forEach(function(y){el("rect",{x:605,y:y-8,width:10,height:16,fill:NAVY},gDuct);});
tx(gDuct,598,412,"always present","t",12,"end");
tx(gDuct,420,128,"water channels in vesicles","t",12,"middle");
var camp=el("g",{},gDuct);el("rect",{x:512,y:156,width:60,height:28,rx:8,fill:GDEEP},camp);tx(camp,542,171,"cAMP","iw",14,"middle");
var VES=[[390,190,150],[440,250,210],[370,290,270],[478,196,330]].map(function(q){var g=el("g",{},gDuct);var c=el("circle",{r:15,fill:"#fff",stroke:NAVY,"stroke-width":2},g);el("rect",{x:-5,y:-8,width:10,height:16,fill:NAVY},g);place(g,q[0],q[1]);return {g:g,c:c,x:q[0],y:q[1],ty:q[2]};});
var adhB=el("g",{},gDuct);[[805,150],[795,190],[815,228]].forEach(function(q){var d=el("g",{},adhB);el("circle",{r:7,fill:NAVY,stroke:"#fff","stroke-width":2},d);place(d,q[0],q[1]);});
tx(gDuct,700,110,"ADH in the blood","tn",12,"middle");
var urSw=el("rect",{x:60,y:452,width:26,height:26,rx:4,fill:"#FBF3C8",stroke:INK2,"stroke-width":1.5},gDuct);
var urT=tx(gDuct,96,470,"urine: a lot, and pale","tn",14,"start");
var adhHit=el("circle",{cx:805,cy:190,r:42,fill:"transparent"},gDuct);
var pAdh=promptAt(gDuct,620,300,["Click ADH","in the blood"],780,230,805,190,44);
function vesReset(){VES.forEach(function(v){place(v.g,v.x,v.y);v.c.setAttribute("display","");});camp.setAttribute("display","none");adhB.setAttribute("display","");urSw.setAttribute("fill","#FBF3C8");urT.textContent="urine: a lot, and pale";}

/* ======================= oxytocin's two targets ======================= */
var gOxy=G("oxy");
var oxB=poly(gOxy,[[612,100],[612,440]],MAROON,4);oxB.setAttribute("opacity",.6);
poly(gOxy,[[612,150],[668,150]],MAROON,3).setAttribute("opacity",.6);poly(gOxy,[[612,400],[652,400]],MAROON,3).setAttribute("opacity",.6);
tx(gOxy,620,300,"blood carries oxytocin","t",12,"start");
var uter=el("g",{},gOxy);
el("path",{d:"M670 80 Q735 36 800 80 Q834 140 782 212 L762 252 L708 252 L688 212 Q636 140 670 80 Z",fill:"#F2D6CF",stroke:MAROON,"stroke-width":7},uter);
var baby=el("g",{},gOxy);
el("ellipse",{cx:735,cy:136,rx:32,ry:42,fill:TISS,stroke:MAROON,"stroke-width":2},baby);
el("circle",{cx:735,cy:206,r:28,fill:TISS,stroke:MAROON,"stroke-width":2},baby);
tx(gOxy,845,110,"uterus","tn",14,"start");tx(gOxy,772,268,"cervix","t",12,"start");
var plusB=badge(gOxy,690,264,"+",MAROON,12);
var breast=el("g",{},gOxy);
el("path",{d:"M652 330 Q800 322 800 400 Q800 478 652 470 Z",fill:TISS,stroke:MAROON,"stroke-width":3},breast);
el("rect",{x:798,y:391,width:12,height:18,rx:5,fill:"#E9B8AE",stroke:MAROON,"stroke-width":2},breast);
var ALV=[[700,368],[722,404],[694,432],[742,442],[748,362]].map(function(q){el("line",{x1:q[0],y1:q[1],x2:798,y2:400,stroke:MAROON,"stroke-width":1.5},breast);return el("circle",{cx:q[0],cy:q[1],r:11,fill:"#fff",stroke:MAROON,"stroke-width":2},breast);});
tx(gOxy,656,320,"breast: milk glands","tn",13,"start");
var milk=[0,1,2].map(function(){var g=el("g",{},gOxy);el("circle",{r:5,fill:"#fff",stroke:INK2,"stroke-width":1.5},g);g.setAttribute("display","none");return g;});
var headHit=el("circle",{cx:735,cy:206,r:32,fill:"transparent"},gOxy);
var nipHit=el("circle",{cx:806,cy:400,r:28,fill:"transparent"},gOxy);
var pHead=promptAt(gOxy,330,505,["Click the baby's head"],700,222,735,206,36);
var pNip=promptAt(gOxy,560,500,["Now click the nipple: the baby nurses"],790,428,806,400,30);
function uterK(k){uter.setAttribute("transform","translate(735 150) scale("+k+") translate(-735 -150)");}
function oxyReset(){uterK(1);place(baby,0,0);plusB.setAttribute("display","none");ALV.forEach(function(c){c.setAttribute("r",11);});hide(milk);}

/* ======================= the standard curve ======================= */
var gCur=G("curve");
var WX=[130,210,290,370,450],WC=[0,2.5,5,10,20],PAT=1.22;
function tsig(c){return 0.05+0.0975*c;}
function CX(c){return 120+c*22;}function CY(s){return 440-s*140;}
tx(gCur,40,40,"standards: known amounts of TSH","t",13,"start");
WX.forEach(function(x,i){el("circle",{cx:x,cy:76,r:24,fill:"#fff",stroke:NAVY,"stroke-width":2},gCur);el("circle",{cx:x,cy:76,r:21,fill:GOLD,opacity:tsig(WC[i])/2.1},gCur);tx(gCur,x,118,String(WC[i]),"t",12,"middle");});
el("circle",{cx:560,cy:76,r:24,fill:"#fff",stroke:MAROON,"stroke-width":3},gCur);
var patW=el("circle",{cx:560,cy:76,r:21,fill:GOLD,opacity:0},gCur);
tx(gCur,560,118,"patient","tm",12,"middle");
el("line",{x1:120,y1:150,x2:120,y2:440,stroke:NAVY,"stroke-width":2.5},gCur);el("line",{x1:120,y1:440,x2:580,y2:440,stroke:NAVY,"stroke-width":2.5},gCur);
[0,0.5,1,1.5,2].forEach(function(s){el("line",{x1:112,y1:CY(s),x2:120,y2:CY(s),stroke:NAVY,"stroke-width":2},gCur);tx(gCur,108,CY(s)+4,String(s),"t",12,"end");});
[0,5,10,15,20].forEach(function(c){el("line",{x1:CX(c),y1:440,x2:CX(c),y2:448,stroke:NAVY,"stroke-width":2},gCur);tx(gCur,CX(c),464,String(c),"t",12,"middle");});
tx(gCur,350,486,"TSH in the well, mU/L","tn",13,"middle");
tx(gCur,40,150,"signal","tn",13,"start");tx(gCur,40,166,"(color)","t",12,"start");
el("rect",{x:CX(0.4),y:432,width:CX(4)-CX(0.4),height:8,fill:FLOW,opacity:.45},gCur);tx(gCur,CX(2.2),424,"normal range","t",12,"middle");
el("line",{x1:CX(0),y1:CY(tsig(0)),x2:CX(20),y2:CY(tsig(20)),stroke:NAVY,"stroke-width":2.5},gCur);
WC.forEach(function(c){el("circle",{cx:CX(c),cy:CY(tsig(c)),r:6,fill:NAVY},gCur);});
var rdH=el("line",{x1:120,y1:CY(PAT),x2:CX(12),y2:CY(PAT),stroke:MAROON,"stroke-width":2.5,"stroke-dasharray":"6 4"},gCur);rdH._dash="6 4";
var rdV=el("line",{x1:CX(12),y1:CY(PAT),x2:CX(12),y2:440,stroke:MAROON,"stroke-width":2.5,"stroke-dasharray":"6 4"},gCur);rdV._dash="6 4";
var rdP=el("circle",{cx:CX(12),cy:CY(PAT),r:7,fill:MAROON},gCur);
var rdT=tx(gCur,CX(12)+12,CY(PAT)+30,"about 12 mU/L","tm",14,"start");
el("rect",{x:600,y:150,width:280,height:200,rx:10,fill:"#fff",stroke:INK2,"stroke-width":1.5},gCur);
tx(gCur,614,176,"the patient","tn",14,"start");
tx(gCur,614,200,"tired, cold, gaining weight","t",13,"start");
tx(gCur,614,222,"thyroid hormone: low","t",13,"start");
var cT1=tx(gCur,614,256,"TSH: ?","tn",14,"start"),cT2=tx(gCur,614,280,"","tm",13,"start"),cT3=tx(gCur,614,300,"","tm",13,"start");
var wellHit=el("circle",{cx:560,cy:76,r:34,fill:"transparent"},gCur);
var pWell=promptAt(gCur,620,40,["Click her well"],596,70,560,76,34);
function curReset(){patW.setAttribute("opacity",0);[rdH,rdV,rdP,rdT].forEach(function(e){e.setAttribute("display","none");});cT1.textContent="TSH: ?";cT2.textContent="";cT3.textContent="";}

/* ======================= moving hormones ======================= */
function pool(col,r,n){var a=[];for(var i=0;i<n;i++)a.push(dot(svg,col,r));return a;}
var dADH=pool(NAVY,6,4),dOT=pool(MAROON,6,4),dRH=pool(GDEEP,6,4),dAC=pool(NAVY,7,4),dCO=pool(MAROON,7,4),dSig=dot(svg,INK2,7),dH2O=pool(FLOW,7,5),dSix=pool(NAVY,7,5);
var ALLD=[].concat(dADH,dOT,dRH,dAC,dCO,[dSig],dH2O,dSix);
function stream(ds,pts,dur,gap,a){return Promise.all(ds.map(function(d,i){return wait(i*gap,a).then(function(){return run(d,pts,dur,a);});}));}
var ADH_OUT=[[292,396],[270,404],[246,404],[200,424],[120,440],[60,442]],OT_OUT=[[268,396],[258,404],[246,404],[200,424],[120,440],[60,442]];
var PORTAL=[[345,252],[350,264],[384,326],[404,352]];
var AC_OUT=[[404,352],[452,384],[466,398],[520,424],[586,440],[700,440],[716,336],[752,330]];
/* the axis from the top: releasing hormone down to the last gland */
function axisRun(a){var m=AX[axis];
  return stream(dRH.slice(0,3),RH_AX,600,160,a).then(function(){return stream(dRH.slice(0,3),PORTAL,700,160,a);}).then(function(){antCells(true);
    return stream(dAC.slice(0,3),AC_OUT.slice(0,-1).concat([m.end]),1500,180,a);}).then(function(){return stream(dCO.slice(0,2),m.co,500,150,a);});}
function longLoops(a){fbShow(true,true,false);mH.setAttribute("display","none");mP.setAttribute("display","none");
  return Promise.all([reveal(fbH,1200,a),reveal(fbP,1000,a),run(dCO[0],LONG_H,1200,a),run(dCO[1],LONG_P,1000,a)]).then(function(){mH.setAttribute("display","");mP.setAttribute("display","");});}
function shortLoop(a){fbS.setAttribute("display","");mS.setAttribute("display","none");
  return Promise.all([reveal(fbS,800,a),run(dAC[0],SHORT,800,a)]).then(function(){mS.setAttribute("display","");});}
/* the stimulus signal on its way up to the hypothalamus */
var UP_CX=[[735,252],[640,268],[570,214],[420,140],[268,190]],UP_NIP=[[806,400],[640,300],[570,214],[420,140],[268,190]];
function otRelease(a){return stream(dOT.slice(0,3),OT_AX,700,150,a).then(function(){return stream(dOT.slice(0,3),OT_OUT,600,150,a);});}

/* if the student leaves a step while it waits, drop the rest of that step's
   animation so nothing from it lands on the next step */
function W(t,p,a){var my=runId;return waitOn(t,p,a).then(function(){if(my!==runId)return new Promise(function(){});});}

makeCap();
function resetAll(){
  hide(ALLD);sagHits([]);tissues(false);antCells(false);
  osmoRing.setAttribute("display","none");osmoC.setAttribute("fill",INK2);
  [pitDam,pitTum,adrTum].forEach(function(e){e.setAttribute("display","none");});
  lAnt.textContent="anterior lobe";axisMode("cort");shrink(1);cortex.setAttribute("fill","#F3E3B5");
  fbShow(false,false,false);[fbH,fbP,fbS].forEach(function(l){l.removeAttribute("stroke-dashoffset");l.setAttribute("stroke-dasharray","8 6");});
  barsReset();barNames("ACTH","cortisol");
  sixReset();place(hiker,700,286);sweat.setAttribute("display","none");osm(290);
  vesReset();oxyReset();curReset();
  cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}

/* ======================= steps ======================= */
var STEPS=[
{sec:"Two glands in one",comp:"Competencies 12 and 14",
 title:"A gland that hangs from the brain",
 text:["The figure is a slice down the middle of the head, as if you cut it from front to back between the eyes. The front of the head is on the right. At the top is the base of the brain. The shaded floor of the brain is the hypothalamus, a small region that keeps the body's internal conditions steady: water balance, body temperature, hunger and thirst, and the release of many hormones.","Hanging from the hypothalamus on a thin stalk is the pituitary gland, which sits in a small cup of bone in the base of the skull. Click the pituitary gland to name its parts."],
 name:"pituitary gland",
 auto:true,
 desc:"A midline slice of the head, front on the right. The base of the brain is at the top, with the hypothalamus shaded along its floor, the optic chiasm in front and the mammillary body behind. A stalk hangs down from the hypothalamus to the pituitary gland, which sits in a cup of bone. Blood vessels run to and from it. When the student clicks the pituitary, labels appear: the posterior lobe at the back, directly under the stalk, the anterior lobe in front, and the pituitary stalk.",
 pre:function(){S(["sag"]);sagHits([pitHit]);},
 play:function(a){return W(pitHit,pPit,a).then(function(){gLobeL.setAttribute("display","");cap("The pituitary has a posterior lobe and an anterior lobe.");});}},

{title:"Two kinds of tissue",
 text:["The pituitary is really two glands joined together. The posterior lobe sits at the back, directly under the stalk. The anterior lobe sits in front of it. The two lobes form from different tissue before birth, and they are controlled in completely different ways."],
 ask:"One lobe is really part of the brain. Which one, and what would you expect to find inside it?",
 ans:["The posterior lobe. It grows down from the brain before birth and stays joined to the hypothalamus through the stalk, so it is neural tissue. Inside it are the endings of axons whose cell bodies sit up in the hypothalamus. It has no gland cells of its own making hormones.","The anterior lobe is true endocrine tissue, made of epithelial gland cells that make their own hormones. It forms from tissue that grows up from the roof of the embryo's mouth. That difference is why the two lobes are controlled so differently, as the rest of this walkthrough shows."],
 name:"posterior pituitary (neurohypophysis) and anterior pituitary (adenohypophysis)",
 desc:"The labeled pituitary. The student clicks the posterior lobe. The posterior lobe and stalk are then shaded blue-gray as neural tissue and the anterior lobe pink as gland tissue, with notes that the posterior lobe grew down from the brain and the anterior lobe grew up from the roof of the mouth. Two neurons appear in the hypothalamus, one for ADH and one for oxytocin, with axons running down the stalk into the posterior lobe.",
 pre:function(){S(["sag","lobeLab"]);sagHits([postHit]);},
 play:function(a){return W(postHit,pPost,a).then(function(){tissues(true);gTissL.setAttribute("display","");gEmb.setAttribute("display","");gPost.setAttribute("display","");return Promise.all([reveal(axA,900,a),reveal(axO,900,a)]);}).then(function(){cap("The posterior lobe is made of axons from the brain.");});}},

{sec:"The posterior pituitary",comp:"Competency 14",
 title:"Made in the brain, released from the lobe",
 text:["The posterior lobe releases two hormones: antidiuretic hormone (ADH), also called vasopressin, and oxytocin. Both are small peptides, nine amino acids long.","Two groups of neurons in the hypothalamus make them, one group for each hormone. Their axons run down the stalk and end in the posterior lobe beside capillaries, the smallest blood vessels. A hormone that a neuron releases into the blood is called a neurohormone. Click the neuron cell bodies in the hypothalamus."],
 ask:"Where is ADH actually made, and what has to happen before it reaches the blood?",
 ans:["ADH is made in the cell body of the neuron, up in the hypothalamus, and packed into small sacs called vesicles. The vesicles travel down the axon, through the stalk, to the axon terminals in the posterior lobe, where they are stored. When the neuron fires, the action potential reaches the terminals and the vesicles release the hormone by exocytosis into the capillaries. From there it enters the general circulation. Oxytocin takes the same route in its own neurons.","So the posterior lobe stores and releases these two hormones but does not make them, which is why it is described as an extension of the brain."],
 name:"neurohormone",
 desc:"The section with the posterior lobe shaded as neural tissue. The student clicks the two neuron cell bodies in the hypothalamus. Navy dots of ADH and maroon dots of oxytocin travel down the axons through the stalk into the posterior lobe, where small dots gather in the axon terminals. Then the dots leave through the capillaries and a vein into the blood.",
 pre:function(){S(["sag","lobeLab","tissLab","post","veinLab"]);tissues(true);sagHits([cellHit]);},
 play:function(a){return W(cellHit,pCells,a).then(function(){return Promise.all([stream(dADH.slice(0,3),ADH_AX,900,180,a),stream(dOT.slice(0,3),OT_AX,900,180,a)]);}).then(function(){gStore.setAttribute("display","");return wait(500,a);}).then(function(){return Promise.all([stream(dADH.slice(0,3),ADH_OUT,700,160,a),stream(dOT.slice(0,3),OT_OUT,700,160,a)]);}).then(function(){cap("ADH and oxytocin are stored here, then sent into the blood.");});}},

{title:"A day in the desert",
 text:["ADH controls how much water your kidneys keep. Its main trigger is how concentrated your blood plasma is, measured as osmolarity. Normal plasma osmolarity is about 290 milliosmoles per liter (mOsm/L). Neurons in the hypothalamus called osmoreceptors sense it. When the plasma gets more concentrated, water leaves these cells, they shrink a little, and they fire faster.","You spend the day hiking in the desert, sweating and not drinking enough. Click the sun to walk through the day."],
 ask:"Your plasma osmolarity climbs to about 300 mOsm/L. What do the osmoreceptors make the ADH neurons do?",
 ans:["They make them fire more. Above about 280 mOsm/L, ADH release rises as osmolarity climbs. The osmoreceptors excite the ADH neurons, action potentials run down their axons, and the terminals in the posterior lobe release more ADH into the blood. The same rise in osmolarity also makes you thirsty.","A large drop in blood pressure or blood volume, as after heavy bleeding, also triggers ADH release, through stretch receptors in the heart and blood vessels."],
 name:"osmoreceptor",
 desc:"The section on the left with the ADH neuron and a small osmoreceptor beside it. On the right, a hiker stands on sand under the sun, above a gauge of plasma osmolarity from 270 to 310 mOsm/L that reads 290, normal. The student clicks the sun. The hiker sweats, and the gauge climbs to 300. The osmoreceptor lights up with a ring, and navy dots of ADH run down the axon into the posterior lobe and out into the blood.",
 pre:function(){S(["sag","lobeLab","post","osmo","desert","veinLab"]);tissues(true);},
 play:function(a){return W(sunHit,pSun,a).then(function(){sweat.setAttribute("display","");return tweenVal(0,1,1600,a,function(k){osm(290+10*k);place(hiker,700+30*k,286);});}).then(function(){osmoRing.setAttribute("display","");osmoC.setAttribute("fill",MAROON);return stream(dADH,ADH_AX,800,140,a);}).then(function(){return stream(dADH,ADH_OUT,700,140,a);}).then(function(){cap("Saltier plasma makes the posterior lobe release ADH.");});}},

{title:"Water channels in the kidney",
 text:["ADH travels in the blood to its target, the kidneys. In each kidney, urine passes through collecting ducts on its way out, and the cells lining these ducts decide how much water goes back into the blood.","The figure shows one of these cells. The urine side is on the left and the blood side is on the right. Inside the cell, water channels called aquaporin-2 wait in small vesicles. Click ADH in the blood."],
 ask:"What does ADH do to this cell, and how will that change the urine?",
 ans:["ADH binds its receptor on the blood side of the cell, the V2 receptor. The receptor works through a second messenger, cAMP, which makes the vesicles move to the urine side and fuse with the membrane. Now that membrane has water channels, so water moves out of the urine by osmosis, through the cell, and back into the blood. The blood side of the cell always has water channels.","You make a small amount of dark, concentrated urine and keep the water. When ADH falls, the channels are pulled back into the cell, and you make a lot of pale, dilute urine. Too little ADH, or kidneys that cannot respond to it, causes diabetes insipidus: large amounts of dilute urine and constant thirst."],
 name:"aquaporin-2",
 desc:"A collecting duct cell between the urine inside the duct on the left and a capillary on the right. Vesicles holding water channels sit inside the cell, and a swatch under the duct reads urine: a lot, and pale. The student clicks the navy ADH dots in the capillary. They move to the ADH receptor on the blood side, a gold cAMP tag appears, and the vesicles move to the urine side and put their water channels in the membrane. Blue water dots then flow from the urine through the cell into the capillary, and the swatch changes to urine: a little, and dark.",
 pre:function(){S(["duct"]);},
 play:function(a){return W(adhHit,pAdh,a).then(function(){adhB.setAttribute("display","none");return stream(dADH.slice(0,3),[[805,190],[700,176],[614,170]],700,120,a);}).then(function(){camp.setAttribute("display","");
   return Promise.all(VES.map(function(v,i){return wait(i*150,a).then(function(){return tweenVal(0,1,700,a,function(k){place(v.g,v.x+(256-v.x)*k,v.y+(v.ty-v.y)*k);});}).then(function(){v.c.setAttribute("display","none");});}));}).then(function(){
   return Promise.all(dH2O.map(function(d,i){var y=VES[i%4].ty;return wait(i*220,a).then(function(){return run(d,[[150,y],[256,y],[440,y+10],[610,300],[805,300]],1300,a);});}));}).then(function(){urSw.setAttribute("fill","#E0B23C");urT.textContent="urine: a little, and dark";cap("ADH puts water channels in, so you keep the water.");});}},

{title:"Oxytocin's two jobs",
 text:["Oxytocin acts on smooth muscle in two places. Its release is triggered by a stretch or a touch that sends nerve signals up to the oxytocin neurons in the hypothalamus.","Late in pregnancy, the baby's head presses down on the cervix, the narrow lower end of the uterus. After birth, the baby nurses at the breast. Click the baby's head, then the nipple."],
 ask:"In each case, what does oxytocin make contract, and what happens next?",
 ans:["In labor, oxytocin makes the smooth muscle of the uterus contract. Each contraction pushes the baby's head harder against the cervix, which sends more signals to the hypothalamus and releases more oxytocin. This is positive feedback, and it keeps building until the baby is born and the stretch stops. A synthetic form of oxytocin is given to start or strengthen labor.","During breastfeeding, suckling sends nerve signals to the hypothalamus, and oxytocin makes the cells around the milk glands contract, squeezing milk into the ducts and out of the nipple. This is milk ejection, often called let-down. Making the milk is a different hormone's job: prolactin, from the anterior lobe.","Both hormones leave the same lobe, but each comes from its own neurons, so the stimulus decides which one is released."],
 name:"positive feedback",
 desc:"The section on the left with the oxytocin neuron. On the right, a uterus with a baby head down against the cervix, and below it a breast with milk glands and ducts leading to the nipple; a blood vessel runs to both. The student clicks the baby's head. A gray signal dot travels up to the oxytocin neuron, maroon dots of oxytocin travel down to the posterior lobe and into the blood, an oxytocin dot reaches the uterus, the uterus squeezes and the baby moves lower, and a plus sign appears at the cervix. Then the student clicks the nipple. A signal travels up again, oxytocin is released, the milk glands squeeze smaller, and drops of milk leave the nipple.",
 pre:function(){S(["sag","lobeLab","post","oxy","veinLab"]);tissues(true);},
 play:function(a){return W(headHit,pHead,a).then(function(){return run(dSig,UP_CX,1000,a);}).then(function(){return otRelease(a);}).then(function(){return run(dOT[3],[[612,300],[612,150],[668,150]],600,a);}).then(function(){return tweenVal(0,1,900,a,function(k){uterK(1-0.07*Math.sin(k*Math.PI));place(baby,0,10*k);});}).then(function(){plusB.setAttribute("display","");return W(nipHit,pNip,a);}).then(function(){return run(dSig,UP_NIP,1000,a);}).then(function(){return otRelease(a);}).then(function(){return run(dOT[3],[[612,300],[612,400],[652,400]],500,a);}).then(function(){
   ALV.forEach(function(c){c.setAttribute("r",7);});return Promise.all(milk.map(function(m,i){return wait(i*200,a).then(function(){return run(m,[[812,400],[870,396+i*6]],500,a,true);});}));}).then(function(){cap("Oxytocin contracts the uterus and ejects milk.");});}},

{sec:"The anterior pituitary",comp:"Competency 12",
 title:"Releasing hormones and the portal vessels",
 text:["The anterior lobe makes its own hormones, but it waits for instructions from the hypothalamus, and those instructions are hormones too. Neurons in the hypothalamus release releasing hormones and inhibiting hormones, which tell the anterior lobe to secrete more or less.","These neurons end at the top of the stalk, on a first set of capillaries. From there, small veins called portal vessels run down the stalk to a second set of capillaries inside the anterior lobe. Click the releasing-hormone neuron."],
 ask:"Why would the body send a releasing hormone through its own private pair of capillary beds instead of into the general circulation?",
 ans:["Because the hypothalamus releases only tiny amounts of these hormones. Through the portal vessels they go straight to the anterior lobe while their concentration is still high. Released into the general circulation, they would be diluted in about five liters of blood before they arrived.","A portal system is any set of blood vessels that links two capillary beds directly. This one is the hypothalamic-hypophyseal portal system."],
 name:"hypothalamic-hypophyseal portal system",
 desc:"The section with the releasing-hormone neuron in the front of the hypothalamus, its axon ending at the top of the stalk on the first capillary bed. An artery brings blood in. The student clicks the neuron. Gold dots travel down its axon, into the first capillary bed, down the portal vessels along the front of the stalk, and into the second capillary bed in the anterior lobe, where the gland cells light up.",
 pre:function(){S(["sag","lobeLab","port","inLab"]);axisMode("cort");lRH.textContent="releasing-hormone neuron";tagRH.textContent="portal vessels";sagHits([rhHit]);},
 play:function(a){return W(rhHit,pRH,a).then(function(){return stream(dRH.slice(0,3),RH_AX,700,160,a);}).then(function(){return stream(dRH.slice(0,3),PORTAL,900,160,a);}).then(function(){antCells(true);cap("Releasing hormones ride the portal vessels to the lobe.");});}},

{title:"Six hormones from the anterior lobe",
 text:["The anterior lobe makes six hormones: thyroid-stimulating hormone (TSH), adrenocorticotropic hormone (ACTH), growth hormone (GH), prolactin, follicle-stimulating hormone (FSH) and luteinizing hormone (LH). All six are peptides or proteins. Most of them are trophic hormones, which means they control another endocrine gland. The hypothalamus controls each of them with one or more of its own hormones. Click the anterior lobe to release them."],
 ask:"For most anterior lobe hormones, the hormone from the hypothalamus switches them on. Prolactin is the exception. How do you think the hypothalamus controls prolactin?",
 ans:["Mainly by holding it back. The hypothalamus releases dopamine into the portal vessels, and dopamine inhibits prolactin release. When dopamine falls, prolactin rises. Prolactin's main target is the breast, where it drives milk production.","The others: TSH acts on the thyroid gland, ACTH on the adrenal cortex, FSH and LH on the ovaries or testes, and GH on the liver and most other tissues (the liver answers by making growth factors). Growth hormone has an inhibiting hormone, somatostatin, as well as a releasing hormone."],
 name:"trophic hormone",
 desc:"The section on the left and five boxes on the right, each joined to the anterior lobe by a line: TSH to the thyroid gland, ACTH to the adrenal cortex, GH to the liver and most tissues, prolactin to the breast, and FSH and LH to the ovaries or testes. The student clicks the anterior lobe. A navy dot runs out to each box, and each box turns pink. The prolactin box then adds the note: held back by dopamine.",
 pre:function(){S(["sag","lobeLab","port","six"]);lRH.textContent="";tagRH.textContent="";sagHits([antHit]);},
 play:function(a){return W(antHit,pAnt,a).then(function(){antCells(true);return Promise.all(SIX.map(function(r,i){return wait(i*120,a).then(function(){return run(dSix[i],[[440,370],[490,362],[610,r.y+29]],800,a);}).then(function(){r.bx.setAttribute("fill","#F6E9E6");});}));}).then(function(){SIX[3].t2.textContent="breast; held back by dopamine";SIX[3].bx.setAttribute("stroke",MAROON);cap("Most anterior lobe hormones control another gland.");});}},

{sec:"Three-tier axes and feedback",comp:"Competency 12",
 title:"The cortisol axis",
 text:["A releasing hormone, a pituitary hormone and the hormone of a third gland form a chain called a three-tier axis. The classic example controls cortisol, a hormone that helps the body cope with stress, partly by raising blood glucose.","Tier one is corticotropin-releasing hormone (CRH) from the hypothalamus. Tier two is ACTH from the anterior lobe. Tier three is cortisol from the outer layer of the adrenal gland, the adrenal cortex. There is one adrenal gland on top of each kidney. Click the CRH neuron."],
 ask:"Follow the signal. Which tier's hormone travels in the portal vessels, and which travel in the general circulation?",
 ans:["Only CRH travels in the portal vessels, from the hypothalamus to the anterior lobe. ACTH leaves the anterior lobe in its veins and travels in the general circulation to the adrenal cortex. Cortisol also travels in the general circulation, to cells all over the body.","ACTH is a trophic hormone. It tells the adrenal cortex to make and release cortisol, and it keeps the cortex healthy and full size."],
 name:"hypothalamic-pituitary-adrenal (HPA) axis",
 desc:"The section on the left. On the right, a blood vessel leaves the anterior lobe and runs to the adrenal gland sitting on top of a kidney, with its outer cortex and inner medulla. The student clicks the CRH neuron. Gold CRH dots travel down the axon and the portal vessels to the anterior lobe, navy ACTH dots leave the anterior lobe and travel through the blood to the adrenal cortex, and maroon cortisol dots leave the adrenal gland.",
 pre:function(){S(["sag","lobeLab","port","tgt"]);axisMode("cort");sagHits([rhHit]);},
 play:function(a){return W(rhHit,pRH2,a).then(function(){return axisRun(a);}).then(function(){cap("CRH, then ACTH, then cortisol: three tiers.");});}},

{title:"Long loop and short loop feedback",
 text:["An axis also needs a way to stop. Cortisol in the blood feeds back and switches off the tiers above it, which is negative feedback. Click the adrenal cortex to release cortisol, then click the anterior lobe."],
 ask:"Where does cortisol act to shut the axis down, and where does ACTH act?",
 ans:["Cortisol acts on both the hypothalamus and the anterior lobe, lowering CRH and ACTH release. Feedback from the last hormone in the chain back to the top tiers is called long-loop negative feedback. ACTH also feeds back on the hypothalamus to lower CRH. Feedback from a pituitary hormone to the hypothalamus is called short-loop negative feedback.","In these axes the hormone of the last gland is the main feedback signal that keeps the whole chain in check."],
 name:"long-loop and short-loop negative feedback",
 desc:"The cortisol axis from the last step. The student clicks the adrenal cortex. Two maroon dashed lines grow from the adrenal gland, one back to the CRH neuron in the hypothalamus and one to the anterior lobe, each ending in a minus sign, labeled long loop. Then the student clicks the anterior lobe, and a navy dashed line grows from the anterior lobe back up to the hypothalamus, ending in a minus sign, labeled short loop.",
 pre:function(){S(["sag","lobeLab","port","tgt","fb"]);axisMode("cort");gFbL.setAttribute("display","none");sagHits([antHit]);},
 play:function(a){return W(adrHit,pAdr,a).then(function(){return longLoops(a);}).then(function(){return W(antHit,pAnt2,a);}).then(function(){return shortLoop(a);}).then(function(){gFbL.setAttribute("display","");cap("Cortisol feeds back on two tiers, ACTH on one.");});}},

{title:"The thyroid axis",
 text:["The thyroid gland in your neck is controlled the same way. Tier one is thyrotropin-releasing hormone (TRH). Tier two is TSH. Tier three is thyroid hormone, which comes in two forms, thyroxine (T4) and triiodothyronine (T3). The thyroid releases mostly T4, and tissues convert it to the more active T3. Thyroid hormone sets how fast many tissues use energy. Click the TRH neuron, then the thyroid gland."],
 ask:"Thyroid hormone in the blood rises above normal. What happens to TRH and TSH?",
 ans:["Both fall. Thyroid hormone feeds back on the anterior lobe and on the hypothalamus, so TRH and TSH release fall. With less TSH, the thyroid makes less hormone, and the level comes back toward normal. If thyroid hormone falls instead, the opposite happens, and TRH and TSH rise.","Every three-tier axis follows the same plan: a releasing hormone, a trophic hormone, the last gland's hormone, and feedback from that last hormone to the top two tiers."],
 name:"hypothalamic-pituitary-thyroid axis",
 desc:"The section on the left and, on the right, the thyroid gland wrapped around the front of the windpipe. The student clicks the TRH neuron. Gold TRH dots travel down the portal vessels, navy TSH dots travel through the blood to the thyroid, and maroon dots of T3 and T4 leave it. Then the student clicks the thyroid gland, and two maroon dashed long-loop lines grow back to the hypothalamus and the anterior lobe, each ending in a minus sign.",
 pre:function(){S(["sag","lobeLab","port","tgt","fb"]);axisMode("thy");gFbL.setAttribute("display","none");sagHits([rhHit]);},
 play:function(a){return W(rhHit,pTRH,a).then(function(){return axisRun(a);}).then(function(){return W(thyHit,pThy,a);}).then(function(){return longLoops(a);}).then(function(){cap("Thyroid hormone turns down both TRH and TSH.");});}},

{sec:"Primary and secondary disorders",comp:"Competency 13",
 title:"Low cortisol, first patient",
 text:["Endocrine disorders come in two kinds by amount: too much hormone, called hypersecretion, and too little, called hyposecretion. They also come in two kinds by place. When the fault is in the last gland of the axis, it is a primary disorder. When the fault is in the anterior pituitary, it is a secondary disorder. Measuring the hormones at two tiers tells you which.","A patient is weak, tired and losing weight, and her cortisol is low. The bars show the hormone levels in her blood. Her disease has damaged her adrenal cortex. Click the adrenal cortex."],
 ask:"Her cortisol is low because her adrenal cortex is damaged. What will her ACTH level be, and why?",
 ans:["High. With little cortisol coming back, there is almost no negative feedback, so the hypothalamus releases more CRH and the anterior lobe releases much more ACTH. The anterior lobe is working hard, but the damaged adrenal cortex cannot answer.","This is primary hyposecretion of cortisol, called Addison disease, or primary adrenal insufficiency. It is most often caused by the immune system attacking the adrenal cortex, and the very high ACTH can darken the skin. In a primary disorder, the two levels move in opposite directions."],
 name:"primary hyposecretion (Addison disease)",
 desc:"The cortisol axis with its feedback loops, and a box at the upper right with two bars, ACTH and cortisol, both at normal. The student clicks the adrenal cortex, and it turns gray and is labeled damaged. The cortisol bar drops to low, and the ACTH bar rises to high.",
 pre:function(){S(["sag","lobeLab","port","tgt","fb","bars"]);axisMode("cort");fbShow(true,true,true);gFbL.setAttribute("display","none");},
 play:function(a){return W(adrHit,pAdrL,a).then(function(){cortex.setAttribute("fill","#DADDE3");lGland.textContent="adrenal cortex: damaged";return barTo(BAR[1],"low",a);}).then(function(){return barTo(BAR[0],"high",a);}).then(function(){cap("Primary: the two levels move in opposite directions.");});}},

{title:"Low cortisol, second patient",
 text:["A second patient also has low cortisol, but his adrenal glands are healthy. Instead, a growth in his anterior lobe has damaged the cells that make ACTH. Click the anterior lobe."],
 ask:"What will his ACTH level be this time?",
 ans:["Low. The anterior lobe cannot make enough ACTH, so the healthy adrenal cortex gets too little signal and makes too little cortisol. Low cortisol removes the negative feedback, so CRH rises, but the damaged anterior lobe cannot respond.","This is secondary hyposecretion of cortisol, or secondary adrenal insufficiency. In a secondary disorder, both levels move in the same direction. One lab value, ACTH, tells these two patients apart, even though both have low cortisol."],
 name:"secondary hyposecretion",
 desc:"The cortisol axis with its feedback loops and the two bars at normal. The student clicks the anterior lobe, and a gray damaged patch appears in it. The ACTH bar drops to low, and then the cortisol bar drops to low.",
 pre:function(){S(["sag","lobeLab","port","tgt","fb","bars"]);axisMode("cort");fbShow(true,true,true);gFbL.setAttribute("display","none");sagHits([antHit]);},
 play:function(a){return W(antHit,pAnt,a).then(function(){pitDam.setAttribute("display","");lAnt.textContent="anterior lobe: damaged";return barTo(BAR[0],"low",a);}).then(function(){return barTo(BAR[1],"low",a);}).then(function(){cap("Secondary: both levels move in the same direction.");});}},

{title:"Too much cortisol",
 text:["Hypersecretion follows the same rule. High cortisol from any cause raises blood glucose, breaks down muscle protein, thins the skin and gathers fat in the face and trunk. This picture is called Cushing syndrome.","Click the adrenal cortex to give it a tumor that makes cortisol on its own. Then click the anterior lobe to give the next patient a tumor there instead."],
 ask:"Which patient has high cortisol and high ACTH, and what kind of disorder is that?",
 ans:["The patient with the pituitary tumor. The tumor makes too much ACTH and ignores feedback, so the adrenal cortex makes too much cortisol. Both levels are high: secondary hypersecretion. When a pituitary tumor is the cause, it is called Cushing disease.","The adrenal tumor makes cortisol without being told to. The high cortisol feeds back on the hypothalamus and the anterior lobe, so ACTH falls. Cortisol high and ACTH low is primary hypersecretion."],
 name:"Cushing disease and Cushing syndrome",
 desc:"The cortisol axis with its feedback loops and the two bars at normal. The student clicks the adrenal cortex, and a maroon tumor appears on it: the cortisol bar rises to high and the ACTH bar falls to low. Then the student clicks the anterior lobe. The adrenal tumor is gone and a maroon tumor appears in the anterior lobe instead: the ACTH bar rises to high and the cortisol bar rises to high.",
 pre:function(){S(["sag","lobeLab","port","tgt","fb","bars"]);axisMode("cort");fbShow(true,true,true);gFbL.setAttribute("display","none");sagHits([antHit]);},
 play:function(a){return W(adrHit,pAdrL,a).then(function(){adrTum.setAttribute("display","");lGland.textContent="adrenal cortex: tumor";return barTo(BAR[1],"high",a);}).then(function(){return barTo(BAR[0],"low",a);}).then(function(){return wait(500,a);}).then(function(){return W(antHit,pAnt2,a);}).then(function(){
   adrTum.setAttribute("display","none");lGland.textContent="adrenal cortex";pitTum.setAttribute("display","");lAnt.textContent="anterior lobe: tumor";barsReset();return barTo(BAR[0],"high",a);}).then(function(){return barTo(BAR[1],"high",a);}).then(function(){cap("A pituitary tumor raises both ACTH and cortisol.");});}},

{title:"Six months of prednisone",
 text:["Prednisone is a drug that acts like cortisol. It is taken in large daily doses for conditions such as severe asthma or rheumatoid arthritis, to calm inflammation and the immune system. Your hypothalamus and pituitary respond to it just as they would to cortisol. Click the bottle to give six months of daily doses."],
 ask:"What happens to CRH, ACTH and the adrenal cortex, and what would happen if the drug were stopped suddenly?",
 ans:["The drug feeds back on the hypothalamus and the anterior lobe just as cortisol would, so CRH and ACTH fall very low. Without ACTH, the adrenal cortex makes little cortisol of its own, and over the months it shrinks.","If the drug is stopped suddenly, the axis cannot restart right away. The shrunken adrenal cortex cannot make enough cortisol, so the person develops adrenal insufficiency, which can be life threatening, especially under stress. That is why long courses are tapered: the dose is lowered slowly so the hypothalamus, the pituitary and the adrenal cortex have time to recover."],
 name:"suppression of an axis by an outside hormone",
 desc:"The cortisol axis with its feedback loops, the two bars labeled ACTH and own cortisol at normal, and a pill bottle of prednisone at the left. The student clicks the bottle. Maroon dots of the drug travel to the hypothalamus and the anterior lobe, where the minus signs sit. The ACTH bar and the own cortisol bar fall to low, and the adrenal cortex shrinks to a thin layer.",
 pre:function(){S(["sag","lobeLab","port","tgt","fb","bars","pill"]);axisMode("cort");fbShow(true,true,true);gFbL.setAttribute("display","none");barNames("ACTH","own cortisol");},
 play:function(a){return W(pillHit,pPill,a).then(function(){return Promise.all([stream(dCO.slice(0,2),DRUG_H,900,200,a),stream(dCO.slice(2,4),DRUG_P,800,200,a)]);}).then(function(){return barTo(BAR[0],"low",a);}).then(function(){return Promise.all([barTo(BAR[1],"low",a),tweenVal(1,0.72,900,a,shrink)]);}).then(function(){cap("The drug shuts the axis down, and the cortex shrinks.");});}},

{sec:"Measuring a hormone",comp:"Competencies 13 and 15",
 title:"Reading a standard curve",
 text:["To classify a disorder you need hormone numbers, and those come from an immunoassay. At the bottom of each well of a plate is an antibody that grabs only the hormone you want. A second antibody, carrying an enzyme, sticks to the captured hormone and turns a colorless chemical colored. The more hormone in the well, the stronger the color signal.","You run wells with known amounts of TSH, called standards, and plot their signals to make a standard curve. A patient is tired, always cold and gaining weight, and her thyroid hormone is low. Click her well to measure her TSH."],
 ask:"Read her TSH off the curve. Is it high or low, and where is the fault in her thyroid axis?",
 ans:["Her signal meets the line at about 12 milliunits per liter (mU/L). A typical adult reference range for TSH is roughly 0.4 to 4 mU/L, and each lab sets its own, so hers is high. Low thyroid hormone with high TSH means the fault is in the thyroid gland itself: primary hypothyroidism.","If a sample's signal is above your highest standard, you dilute it and run it again, because you cannot be sure the curve keeps going straight past your standards. And an antibody that also grabs a similar molecule adds that molecule to the signal, so the number is only as good as the antibody."],
 name:"standard curve",
 desc:"A row of wells at the top: five standards with known TSH, 0, 2.5, 5, 10 and 20 mU/L, colored more strongly as the amount rises, and an empty patient well. Below is a graph of signal against TSH with the five standards on a straight line and the normal range shaded near zero. A box at the right describes the patient: tired, cold, gaining weight, thyroid hormone low, TSH unknown. The student clicks the patient well, and it colors. A dashed line runs from her signal on the vertical axis across to the line and down to the horizontal axis at about 12 mU/L. The box then reads TSH high, fault in the thyroid, primary hypothyroidism.",
 pre:function(){S(["curve"]);},
 play:function(a){return W(wellHit,pWell,a).then(function(){return tweenVal(0,PAT/2.1,600,a,function(v){patW.setAttribute("opacity",v);});}).then(function(){rdH.setAttribute("display","");return reveal(rdH,700,a);}).then(function(){rdP.setAttribute("display","");rdV.setAttribute("display","");return reveal(rdV,600,a);}).then(function(){rdT.setAttribute("display","");cT1.textContent="TSH: about 12 mU/L, high";cT2.textContent="fault: the thyroid gland";cT3.textContent="primary hypothyroidism";cap("Her TSH is high, so the fault is in the thyroid.");});}},

{sec:"Review",comp:"Competencies 12 to 15",
 title:"Summary with the scientific terms",
 text:["The posterior pituitary is neural tissue. ADH and oxytocin are made in hypothalamic cell bodies, carried down axons in the stalk, stored in the posterior lobe and released into the blood when the neurons fire. ADH responds to rising plasma osmolarity and puts aquaporin-2 channels into the collecting duct. Oxytocin contracts the uterus in labor, by positive feedback, and ejects milk.","The anterior pituitary is gland tissue that makes TSH, ACTH, GH, prolactin, FSH and LH. Hypothalamic releasing and inhibiting hormones reach it through the portal system; prolactin is held back mainly by dopamine. In a three-tier axis, the last gland's hormone gives long-loop negative feedback to the hypothalamus and pituitary, and the pituitary hormone gives short-loop feedback to the hypothalamus. A primary disorder moves the two tiers in opposite directions; a secondary disorder moves them the same way."],
 ask:"Without scrolling back: an injury cuts the pituitary stalk, both its axons and its portal vessels. Which pituitary hormones fall, and which one rises?",
 ans:["Every anterior lobe hormone except prolactin falls, because the releasing hormones can no longer reach the anterior lobe through the portal vessels. Prolactin rises, because the dopamine that normally holds it back is cut off too. Release of ADH and oxytocin from the posterior lobe stops, because the axons that bring those hormones down from the hypothalamus are cut.","Cutting one stalk does opposite things to prolactin and to the other anterior lobe hormones, and it affects the posterior lobe for a completely different reason."],
 desc:"The section on the left with both kinds of neuron, and the five anterior lobe hormone boxes on the right. The student clicks the hypothalamus, and every pathway runs: ADH and oxytocin down the axons into the posterior lobe, the releasing hormone down the portal vessels, and the anterior lobe hormones out to their boxes. Then the student clicks the stalk, and a cut appears across it. The pathways run again but stop at the cut. Every box is marked falls except prolactin, which is marked rises.",
 pre:function(){S(["sag","lobeLab","post","port","six"]);tissues(true);lRH.textContent="";tagRH.textContent="";sagHits([hypoHit]);},
 play:function(a){var CUT_A=ADH_AX.slice(0,3),CUT_O=OT_AX.slice(0,3),CUT_R=[[345,252],[350,264],[366,292]];
   return W(hypoHit,pHypo,a).then(function(){return Promise.all([stream(dADH.slice(0,2),ADH_AX,900,160,a),stream(dOT.slice(0,2),OT_AX,900,160,a),stream(dRH.slice(0,2),RH_AX.concat(PORTAL.slice(1)),1000,160,a)]);}).then(function(){antCells(true);
     return Promise.all(SIX.map(function(r,i){return run(dSix[i],[[440,370],[490,362],[610,r.y+29]],700,a);}));}).then(function(){sagHits([stalkHit]);return W(stalkHit,pStalk,a);}).then(function(){gCut.setAttribute("display","");antCells(false);
     return Promise.all([run(dADH[0],CUT_A,600,a),run(dOT[0],CUT_O,600,a),run(dRH[0],RH_AX.concat(CUT_R.slice(1)),700,a)]);}).then(function(){
     SIX.forEach(function(r,i){r.st.textContent=i===3?"rises":"falls";r.bx.setAttribute("fill",i===3?"#F6E9E6":TINT);});cap("A cut stalk lowers every hormone except prolactin.");});}},

{title:"One more patient",
 text:["A patient has low thyroid hormone, and her doctor orders one more test, a TSH level. Click the TSH bar to see her result."],
 ask:"Her TSH comes back low too. Where is the fault, and what kind of disorder is it?",
 ans:["The anterior pituitary. Low thyroid hormone should raise TSH, because the feedback that holds TSH down is weak. A TSH that is low as well means the problem is above the thyroid, usually in the pituitary. Both levels move the same way, so this is secondary hypothyroidism. The patient on the standard curve, whose TSH was high, had primary hypothyroidism.","If you could not get there, draw the thyroid axis twice, once with the fault in the thyroid and once with the fault in the pituitary, and draw the TSH bar in each, the way your Competency Study Guide asks."],
 desc:"The thyroid axis, and the box of bars at the upper right: the T3 and T4 bar is low and the TSH bar is empty, marked with a question mark. The student clicks the TSH bar, and it fills to low. Then a gray damaged patch appears in the anterior lobe.",
 pre:function(){S(["sag","lobeLab","port","tgt","bars"]);axisMode("thy");barNames("TSH","T3 and T4");barSet(BAR[0],0);BAR[0].w.setAttribute("y",182);BAR[0].w.textContent="?";barSet(BAR[1],LV.low);BAR[1].w.setAttribute("y",190-LV.low-8);BAR[1].w.textContent="low";},
 play:function(a){return W(barHit,pBar,a).then(function(){return barTo(BAR[0],"low",a);}).then(function(){pitDam.setAttribute("display","");lAnt.textContent="anterior lobe: damaged";cap("Both levels low: the fault is in the pituitary.");});}}
];
