/* Spinal pathways, touch and pain. Oct 4 2026, rebuilt Oct 5 2026 for the
   plain-language and hands-on pass. Week 5 competencies 5, 13 and 14.
   Figures, each shown and hidden per step:
   - xs: a large slice of the spinal cord with its roots, and the spinal
     nerves by region down the right side
   - lev: the body seen from behind: brain with its cortex, thalamus,
     brainstem, a slice of the cord and the right hand, with the three long
     pathways; a small body figure shows what is lost after an injury
   - skin, hom, temp, fib, stove, ref, inf, gate: the receptor, cortex map,
     temperature, pain fiber, withdrawal, referred pain, inflammation and
     gate figures.
   Every step the student acts in uses promptAt and waitOn from w05-kit.js,
   so Next stays locked until the student has done the action. */

/* ======================= the cord slice (steps 1 to 4) ======================= */
var gXs=G("xs");
var XC=[470,250];
el("ellipse",{cx:XC[0],cy:XC[1],rx:230,ry:165,fill:"#fff",stroke:NAVY,"stroke-width":4},gXs);
var XT=el("g",{},gXs);
el("ellipse",{cx:470,cy:118,rx:44,ry:30,fill:NAVY,opacity:.22},XT);
el("ellipse",{cx:268,cy:240,rx:22,ry:62,fill:NAVY,opacity:.22},XT);el("ellipse",{cx:672,cy:240,rx:22,ry:62,fill:NAVY,opacity:.22},XT);
el("ellipse",{cx:322,cy:262,rx:20,ry:46,fill:MAROON,opacity:.22},XT);el("ellipse",{cx:618,cy:262,rx:20,ry:46,fill:MAROON,opacity:.22},XT);
el("ellipse",{cx:470,cy:388,rx:56,ry:22,fill:MAROON,opacity:.22},XT);
var XG=el("path",{d:"M380 150 Q400 140 420 170 L445 225 L495 225 L520 170 Q540 140 560 150 L540 215 Q600 240 590 320 Q560 345 520 320 L495 280 L445 280 L420 320 Q380 345 350 320 Q340 240 400 215 Z",fill:TINT,stroke:INK2,"stroke-width":2.5},gXs);
el("circle",{cx:470,cy:252,r:6,fill:"#fff",stroke:INK2,"stroke-width":2},gXs);
/* the roots and the spinal nerve, on the left */
el("line",{x1:395,y1:160,x2:150,y2:120,stroke:NAVY,"stroke-width":5},gXs);
var xDrg=el("ellipse",{cx:215,cy:130,rx:30,ry:18,fill:"#fff",stroke:NAVY,"stroke-width":3},gXs);
el("line",{x1:380,y1:320,x2:150,y2:360,stroke:NAVY,"stroke-width":5},gXs);
el("line",{x1:150,y1:120,x2:70,y2:240,stroke:NAVY,"stroke-width":5},gXs);el("line",{x1:150,y1:360,x2:70,y2:240,stroke:NAVY,"stroke-width":5},gXs);
el("line",{x1:70,y1:240,x2:20,y2:240,stroke:NAVY,"stroke-width":7},gXs);
var XL=el("g",{},gXs);
tx(XL,215,100,"dorsal root ganglion","t",13,"middle");tx(XL,250,170,"dorsal root","t",13,"middle");tx(XL,250,372,"ventral root","t",13,"middle");tx(XL,6,292,"spinal nerve","t",13,"start");
tx(XL,470,186,"dorsal horn","tm",13,"middle");tx(XL,470,201,"(posterior)","tm",12,"middle");tx(XL,470,302,"ventral horn","tm",13,"middle");tx(XL,470,317,"(anterior)","tm",12,"middle");tx(XL,600,236,"lateral horn","t",12,"start");
tx(XL,470,70,"back of the body","t",13,"middle");tx(XL,470,436,"front of the body","t",13,"middle");
var XTL=el("g",{},gXs);
tx(XTL,470,96,"going up","tn",13,"middle");tx(XTL,712,200,"going up (outer part)","tn",13,"start");tx(XTL,712,330,"going down (inner part)","tm",13,"start");tx(XTL,560,402,"going down","tm",13,"start");
var XWM=el("g",{},gXs);tx(XWM,700,120,"white matter: axons","tn",14,"start");tx(XWM,470,272,"gray matter","t",14,"middle");
/* the two cell bodies */
var xBodS=badge(gXs,215,130,"",MAROON,11),xBodM=badge(gXs,430,300,"",NAVY,11);
var xBodST=tx(gXs,90,62,"sensory cell bodies: outside the cord","tm",14,"start"),xBodMT=tx(gXs,470,486,"motor cell bodies: in the ventral horn","tn",14,"middle");
/* signals in and out */
var xIn=dot(gXs,MAROON,10),xOut=dot(gXs,NAVY,10);
var X_IN=[[20,240],[70,240],[150,120],[215,130],[395,160],[440,200]];
var X_OUT=[[430,300],[380,320],[150,360],[70,240],[20,240]];
/* targets the student clicks */
var xNerveHit=el("rect",{x:0,y:210,width:90,height:60,fill:"transparent"},gXs);
var xSliceHit=el("ellipse",{cx:470,cy:250,rx:230,ry:165,fill:"transparent"},gXs);
var xDrgHit=el("ellipse",{cx:215,cy:130,rx:44,ry:30,fill:"transparent"},gXs);
var xVhHit=el("ellipse",{cx:430,cy:305,rx:40,ry:34,fill:"transparent"},gXs);
var xNervePrompt=promptAt(gXs,110,440,["Click the end of the spinal nerve","to send in a touch signal"],40,262,40,240,30);
var xWhitePrompt=promptAt(gXs,40,460,["Click the white matter","to show the tracts"],286,352,300,340,30);
var xLabPrompt=promptAt(gXs,600,470,["Click the slice to","show the labels"],560,380,520,360,30);
var xDrgPrompt=promptAt(gXs,300,30,["Click the swelling on the dorsal root"],232,108,215,130,36);
var xVhPrompt=promptAt(gXs,600,470,["Now click the","ventral horn"],452,318,430,305,32);
var XSHIT=[xNerveHit,xSliceHit,xDrgHit,xVhHit];
function xsMode(tracts,labels){XT.setAttribute("display",tracts?"":"none");XTL.setAttribute("display",tracts?"":"none");XL.setAttribute("display",labels?"":"none");}

/* the spinal nerves by region, down the right side */
var gReg=G("regions");
el("rect",{x:832,y:112,width:16,height:350,rx:8,fill:TINT,stroke:INK2,"stroke-width":2},gReg);
var RG=[["cervical, neck",8,NAVY],["thoracic, chest",12,MAROON],["lumbar, lower back",5,GDEEP],["sacral, base of spine",5,INK2]];
(function(){var y=122,sp=11.2;RG.forEach(function(r){var y0=y;for(var i=0;i<r[1];i++){el("line",{x1:832,y1:y,x2:814,y2:y+5,stroke:r[2],"stroke-width":3,"stroke-linecap":"round"},gReg);el("line",{x1:848,y1:y,x2:866,y2:y+5,stroke:r[2],"stroke-width":3,"stroke-linecap":"round"},gReg);y+=sp;}
  el("line",{x1:804,y1:y0-4,x2:804,y2:y-sp+8,stroke:r[2],"stroke-width":3},gReg);
  tx(gReg,796,(y0+y-sp)/2-2,r[0],"tn",12,"end");tx(gReg,796,(y0+y-sp)/2+14,r[1]+" pairs","t",12,"end");});})();
tx(gReg,800,106,"pairs of spinal nerves","tn",13,"end");

/* ======================= the body from behind (steps 5 to 10, 20) ======================= */
var MID=450;
var gLev=G("lev");
/* the two halves of the brain: gray cortex outside, white matter inside */
var HEMI="M446 24 C340 8 136 24 134 116 C132 186 250 210 398 200 L446 200 Z";
var HEMI_IN="M440 46 C346 32 164 46 160 116 C158 168 256 186 398 180 L440 180 Z";
el("path",{d:HEMI,fill:"#DDE1EA",stroke:NAVY,"stroke-width":3},gLev);
el("path",{d:HEMI_IN,fill:"#fff"},gLev);
var rH=el("g",{transform:"translate(900 0) scale(-1 1)"},gLev);
el("path",{d:HEMI,fill:"#DDE1EA",stroke:NAVY,"stroke-width":3},rH);el("path",{d:HEMI_IN,fill:"#fff"},rH);
/* folds in the cortex, drawn on both halves */
[[392,14],[318,12],[244,18],[180,40],[146,76],[138,124],[160,166],[216,194],[300,202]].forEach(function(q){var dx=292-q[0],dy=112-q[1],L=Math.sqrt(dx*dx+dy*dy);
  [gLev,rH].forEach(function(g){el("path",{d:"M"+q[0]+" "+q[1]+" q"+(dx/L*8+dy/L*5).toFixed(1)+" "+(dy/L*8-dx/L*5).toFixed(1)+" "+(dx/L*18).toFixed(1)+" "+(dy/L*18).toFixed(1),fill:"none",stroke:INK2,"stroke-width":2,"stroke-linecap":"round"},g);});});
tx(gLev,16,30,"cortex,","tn",14,"start");tx(gLev,16,46,"the outer","t",12,"start");tx(gLev,16,60,"gray layer","t",12,"start");
tx(gLev,270,124,"left side of the brain","t",13,"middle");tx(gLev,630,124,"right side of the brain","t",13,"middle");
/* thalamus, deep in the middle */
el("ellipse",{cx:402,cy:154,rx:36,ry:18,fill:TINT,stroke:INK2,"stroke-width":2},gLev);el("ellipse",{cx:498,cy:154,rx:36,ry:18,fill:TINT,stroke:INK2,"stroke-width":2},gLev);
tx(gLev,542,160,"thalamus","t",14,"start");
/* brainstem, with the medulla at its lower end */
el("path",{d:"M398 198 L404 300 Q450 316 496 300 L502 198 Z",fill:"#fff",stroke:NAVY,"stroke-width":3},gLev);
el("line",{x1:400,y1:238,x2:500,y2:238,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"4 4"},gLev);
tx(gLev,392,222,"brainstem","t",14,"end");tx(gLev,392,276,"medulla","tn",14,"end");
/* the cord running down into one slice */
el("rect",{x:412,y:300,width:76,height:72,fill:"#fff",stroke:NAVY,"stroke-width":3},gLev);
el("ellipse",{cx:450,cy:412,rx:112,ry:50,fill:"#fff",stroke:NAVY,"stroke-width":3},gLev);
el("path",{d:"M410 384 Q422 378 432 396 L440 408 L460 408 L468 396 Q478 378 490 384 L484 406 Q508 420 498 440 Q484 450 470 436 L460 422 L440 422 L430 436 Q416 450 402 440 Q392 420 416 406 Z",fill:TINT,stroke:INK2,"stroke-width":2},gLev);
tx(gLev,334,474,"spinal cord,","tn",14,"end");tx(gLev,334,490,"a slice","t",13,"end");
el("line",{x1:MID,y1:14,x2:MID,y2:476,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 6"},gLev);
tx(gLev,MID,494,"midline","t",13,"middle");
/* the spinal nerve, its roots, and the right hand */
el("line",{x1:612,y1:416,x2:786,y2:418,stroke:"#CBD0DA","stroke-width":16,"stroke-linecap":"round"},gLev);
el("line",{x1:612,y1:410,x2:520,y2:378,stroke:"#CBD0DA","stroke-width":10,"stroke-linecap":"round"},gLev);
el("ellipse",{cx:575,cy:394,rx:16,ry:11,fill:"#E3E6ED",stroke:INK2,"stroke-width":2},gLev);
el("line",{x1:612,y1:424,x2:520,y2:446,stroke:"#CBD0DA","stroke-width":10,"stroke-linecap":"round"},gLev);
tx(gLev,690,446,"spinal nerve","t",13,"middle");
var gHand=el("g",{},gLev);
el("rect",{x:780,y:392,width:52,height:58,rx:14,fill:TISS,stroke:MAROON,"stroke-width":2.5},gHand);
var FING=[0,1,2,3].map(function(i){return el("rect",{x:826,y:394+i*13.5,width:42,height:11,rx:5.5,fill:TISS,stroke:MAROON,"stroke-width":2},gHand);});
el("rect",{x:792,y:368,width:12,height:32,rx:6,fill:TISS,stroke:MAROON,"stroke-width":2,transform:"rotate(28 798 396)"},gHand);
tx(gLev,724,384,"right hand","tn",14,"middle");
function handClose(k){FING.forEach(function(f){f.setAttribute("width",42-28*k);});}
/* the coin and the pin at the fingertip */
var coin=el("g",{},gLev);el("circle",{cx:880,cy:400,r:10,fill:GOLD,stroke:GDEEP,"stroke-width":2},coin);
var pin=el("g",{},gLev);el("line",{x1:860,y1:350,x2:860,y2:388,stroke:INK2,"stroke-width":3},pin);el("circle",{cx:860,cy:348,r:6,fill:MAROON},pin);

/* the three pathways */
var DC=[[866,400],[782,404],[612,406],[575,394],[520,380],[478,372],[466,352],[466,268],[446,254],[446,206],[408,154],[300,32]];
var ST=[[866,402],[782,416],[612,412],[575,396],[520,384],[484,392],[460,420],[440,424],[388,416],[414,368],[424,350],[424,206],[396,158],[250,40]];
var CS=[[200,46],[352,176],[408,212],[408,288],[486,300],[486,370],[528,404],[488,432],[520,446],[612,424],[782,428],[866,414]];
var gDC=G("dc",gLev),gST=G("st",gLev),gCS=G("cs",gLev);
var lDC=poly(gDC,DC,NAVY,5),lST=poly(gST,ST,MAROON,5),lCS=poly(gCS,CS,GDEEP,5,"12 6");lCS._dash="12 6";
[[466,268],[408,154]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:7,fill:NAVY,stroke:"#fff","stroke-width":2},gDC);});
[[484,392],[396,158]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:7,fill:MAROON,stroke:"#fff","stroke-width":2},gST);});
[[488,432]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:7,fill:GDEEP,stroke:"#fff","stroke-width":2},gCS);});
var tDC=tx(gDC,516,252,"touch and position: crosses in the medulla","tn",13,"start");
var tST=tx(gST,40,226,"pain and temperature:","tm",13,"start"),tST2=tx(gST,40,242,"crosses in the spinal cord","tm",13,"start");
var tCS=tx(gCS,516,292,"movement: crosses at the","t",13,"start"),tCS2=tx(gCS,516,308,"bottom of the medulla","t",13,"start");
var sigA=dot(gLev,NAVY,9),sigB=dot(gLev,MAROON,9),sigC=dot(gLev,GDEEP,9);
function hits(list,all){all.forEach(function(h){h.setAttribute("display",list.indexOf(h)>=0?"":"none");});}
function pathLabels(on){[tDC,tST,tST2,tCS,tCS2].forEach(function(t){t.setAttribute("display",on?"":"none");});}

/* injuries: a cut through half the cord, a clot in the medulla */
var gCutL=G("cutL",gLev);el("path",{d:"M450 362 L450 462 A112 50 0 0 1 338 412 A112 50 0 0 1 450 362 Z",fill:MAROON,opacity:.28},gCutL);el("rect",{x:412,y:300,width:38,height:72,fill:MAROON,opacity:.28},gCutL);
var gCutR=G("cutR",gLev);el("path",{d:"M450 362 L450 462 A112 50 0 0 0 562 412 A112 50 0 0 0 450 362 Z",fill:MAROON,opacity:.28},gCutR);el("rect",{x:450,y:300,width:38,height:72,fill:MAROON,opacity:.28},gCutR);
var gClot=G("clot",gLev);el("ellipse",{cx:474,cy:274,rx:18,ry:12,fill:MAROON},gClot);
var cutLHit=el("path",{d:"M450 362 L450 462 A112 50 0 0 1 338 412 A112 50 0 0 1 450 362 Z",fill:"transparent"},gLev);
var cutRHit=el("path",{d:"M450 362 L450 462 A112 50 0 0 0 562 412 A112 50 0 0 0 450 362 Z",fill:"transparent"},gLev);
var clotHit=el("ellipse",{cx:474,cy:274,rx:26,ry:20,fill:"transparent"},gLev);
var ctxHit=el("ellipse",{cx:206,cy:56,rx:44,ry:30,fill:"transparent"},gLev);
var coinHit=el("circle",{cx:874,cy:402,r:24,fill:"transparent"},gLev);
var pinHit=el("rect",{x:844,y:336,width:34,height:64,fill:"transparent"},gLev);
var LEVHIT=[cutLHit,cutRHit,clotHit,ctxHit,coinHit,pinHit];
var pCoin=promptAt(gLev,480,528,["Click the coin to touch it"],846,418,874,402,26);
var pPin=promptAt(gLev,480,528,["Click the pin to prick the fingertip"],848,392,860,370,30);
var pCtx=promptAt(gLev,40,292,["Click the left motor cortex","to send the command"],150,80,206,56,34);
var pCutL=promptAt(gLev,40,528,["Click the left half of the cord to cut it"],370,436,392,414,40);
var pCutR=promptAt(gLev,480,528,["Click the right half of the cord to cut it"],532,436,508,414,40);
var pClot=promptAt(gLev,586,190,["Click the lower right part","of the medulla"],498,268,474,274,30);

/* a small body seen from behind, to show what is lost on each side */
var gBody=G("body",gLev);
var BX=170,BY=256;
var B={};
B.head=el("circle",{cx:BX,cy:BY+16,r:15,fill:"#fff",stroke:INK2,"stroke-width":2.5},gBody);
B.tL=el("rect",{x:BX-30,y:BY+36,width:30,height:92,fill:"#fff",stroke:INK2,"stroke-width":2.5},gBody);
B.tR=el("rect",{x:BX,y:BY+36,width:30,height:92,fill:"#fff",stroke:INK2,"stroke-width":2.5},gBody);
B.aL=el("rect",{x:BX-46,y:BY+38,width:13,height:88,rx:6,fill:"#fff",stroke:INK2,"stroke-width":2.5},gBody);
B.aR=el("rect",{x:BX+33,y:BY+38,width:13,height:88,rx:6,fill:"#fff",stroke:INK2,"stroke-width":2.5},gBody);
B.lL=el("rect",{x:BX-28,y:BY+131,width:24,height:100,rx:10,fill:"#fff",stroke:INK2,"stroke-width":2.5},gBody);
B.lR=el("rect",{x:BX+4,y:BY+131,width:24,height:100,rx:10,fill:"#fff",stroke:INK2,"stroke-width":2.5},gBody);
tx(gBody,BX-16,BY+250,"left","tn",13,"middle");tx(gBody,BX+16,BY+250,"right","tn",13,"middle");
tx(gBody,BX+22,BY+20,"seen from behind","t",12,"start");
var bLevel=el("line",{x1:BX-58,y1:BY+40,x2:BX+58,y2:BY+40,stroke:MAROON,"stroke-width":2.5,"stroke-dasharray":"5 4"},gBody);
var bTL=[tx(gBody,BX-54,BY+150,"","tn",12,"end"),tx(gBody,BX-54,BY+166,"","tn",12,"end"),tx(gBody,BX-54,BY+182,"","tn",12,"end")];
var bTR=[tx(gBody,BX+54,BY+150,"","tm",12,"start"),tx(gBody,BX+54,BY+166,"","tm",12,"start"),tx(gBody,BX+54,BY+182,"","tm",12,"start")];
var LOSS_N="rgba(11,21,48,.30)",LOSS_M="rgba(139,58,46,.38)";
function bodyShade(left,right,lt,rt,level){
  ["tL","aL","lL"].forEach(function(k){B[k].setAttribute("fill",left||"#fff");});
  ["tR","aR","lR"].forEach(function(k){B[k].setAttribute("fill",right||"#fff");});
  bTL.forEach(function(t,i){t.textContent=(lt||[])[i]||"";});bTR.forEach(function(t,i){t.textContent=(rt||[])[i]||"";});
  bLevel.setAttribute("display",level?"":"none");
}

/* ======================= skin receptors (step 11) ======================= */
var gSkin=G("skin");
el("rect",{x:40,y:110,width:610,height:70,fill:"#F9E3DC",stroke:MAROON,"stroke-width":2},gSkin);
el("rect",{x:40,y:180,width:610,height:220,fill:TISS,stroke:MAROON,"stroke-width":2},gSkin);
el("rect",{x:40,y:400,width:610,height:56,fill:"#FFF6E0",stroke:GDEEP,"stroke-width":2},gSkin);
tx(gSkin,656,150,"epidermis","t",12,"start");tx(gSkin,656,290,"dermis","t",12,"start");tx(gSkin,656,432,"deep layer","t",12,"start");
function nerve(x,y,col){return el("line",{x1:x,y1:y,x2:x,y2:456,stroke:col||NAVY,"stroke-width":3},gSkin);}
/* Oct 5 2026: all five receptors can be tested, each with its own stimulus,
   and each one's firing is drawn on a short line under the skin, so the
   student sees which ones keep firing (adapt slowly) and which go quiet. */
var fnN=nerve(90,190);var FN=[[90,190,60,130],[90,190,90,120],[90,190,120,130]].map(function(q){return el("line",{x1:q[0],y1:q[1],x2:q[2],y2:q[3],stroke:NAVY,"stroke-width":3},gSkin);});
var mkN=nerve(235,186);var MK=[210,235,260].map(function(x){return el("circle",{cx:x,cy:176,r:9,fill:GDEEP},gSkin);});
var msN=nerve(362,230);var msE=el("ellipse",{cx:362,cy:208,rx:16,ry:26,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gSkin);
var pcN=nerve(460,440);var PC=[30,21,12].map(function(r){return el("ellipse",{cx:460,cy:420,rx:r,ry:r*0.8,fill:"none",stroke:INK2,"stroke-width":2},gSkin);});
var rfN=nerve(560,320);var rfE=el("ellipse",{cx:560,cy:300,rx:40,ry:10,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gSkin);
var SKL=[[90,"free nerve endings","temperature, pain, hair"],[235,"Merkel","steady pressure, texture"],[362,"Meissner","flutter, stroking"],[460,"Pacinian","vibration"],[560,"Ruffini","skin stretch"]];
SKL.forEach(function(r){tx(gSkin,r[0],36,r[1],"tn",13,"middle");tx(gSkin,r[0],54,r[2],"t",11,"middle");});
var skinRing=el("circle",{cx:235,cy:176,r:42,fill:"none",stroke:MAROON,"stroke-width":4},gSkin);
/* the stimuli */
var braille=el("g",{},gSkin);el("rect",{x:195,y:64,width:80,height:18,rx:6,fill:"#fff",stroke:NAVY,"stroke-width":2.5},braille);el("ellipse",{cx:235,cy:88,rx:12,ry:8,fill:"#fff",stroke:NAVY,"stroke-width":2.5},braille);tx(braille,235,77,"Braille page","t",10,"middle");
var heatG=el("g",{},gSkin);el("ellipse",{cx:90,cy:112,rx:42,ry:9,fill:MAROON,opacity:.35},heatG);[68,90,112].forEach(function(x){el("path",{d:"M"+x+" 102 q-6 -8 0 -14 q6 -8 0 -14",fill:"none",stroke:MAROON,"stroke-width":2.5},heatG);});
var feather=el("g",{},gSkin);el("path",{d:"M-34 0 Q-6 -16 30 -4 Q-4 6 -34 0 Z",fill:"#fff",stroke:NAVY,"stroke-width":2.5},feather);el("line",{x1:-34,y1:0,x2:28,y2:-4,stroke:NAVY,"stroke-width":1.5},feather);
var phone=el("g",{},gSkin);el("rect",{x:-26,y:-12,width:52,height:20,rx:5,fill:NAVY},phone);el("rect",{x:-20,y:-8,width:40,height:12,rx:2,fill:"#fff"},phone);
var buzz=el("g",{},gSkin);[[-36,0],[36,0]].forEach(function(q){el("path",{d:"M"+(460+q[0])+" 88 l"+(q[0]<0?-6:6)+" -6 M"+(460+q[0])+" 96 l"+(q[0]<0?-8:8)+" 0",stroke:GDEEP,"stroke-width":2.5,fill:"none"},buzz);});
var pull=el("g",{},gSkin);arrow(pull,518,300,482,300,MAROON,4);arrow(pull,602,300,638,300,MAROON,4);
/* one firing line under each receptor */
var TRY=[
 {k:"free",x:90,chip:"warm it",sp:[.1,.2,.3,.4,.5,.6,.7,.8,.9],cap:"Free nerve endings keep firing while the skin stays warm."},
 {k:"merkel",x:235,chip:null,sp:[.1,.2,.3,.4,.5,.6,.7,.8,.9],cap:"Merkel receptors keep firing while the dot presses."},
 {k:"meis",x:362,chip:"stroke it",sp:[.06,.13,.2,.27,.34],cap:"Meissner fires while the feather moves, then goes quiet."},
 {k:"pac",x:460,chip:"buzz it",sp:[.05,.09,.13,.17,.21,.25,.29,.33,.37,.41,.45,.49],cap:"Pacinian fires while it buzzes, then goes quiet."},
 {k:"ruf",x:560,chip:"stretch it",sp:[.12,.24,.36,.48,.6,.72,.84],cap:"Ruffini keeps firing while the skin stays stretched."}];
function trK(x,y,w,sp,h,k){var d="M"+x+" "+y;sp.forEach(function(f){if(f<=k){var sx=x+w*f;d+=" H"+(sx-3)+" L"+sx+" "+(y-h)+" L"+(sx+3)+" "+y;}});return d+" H"+(x+w*k);}
TRY.forEach(function(t){
  el("line",{x1:t.x-40,y1:500,x2:t.x+40,y2:500,stroke:INK2,"stroke-width":1,opacity:.5},gSkin);
  t.tr=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":2.5,"stroke-linejoin":"round"},gSkin);
  t.sig=dot(gSkin,MAROON,7);t.slow=t.sp[t.sp.length-1]>0.8;t.tag=tx(gSkin,t.x,474,"","tn",11,"middle");
  var g=el("g",{tabindex:"0",role:"button"},gSkin);t.btn=g;
  if(t.chip){t.box=el("rect",{x:t.x-38,y:66,width:76,height:26,rx:13,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},g);t.lab=tx(g,t.x,84,t.chip,"tn",13,"middle");}
  else{t.box=el("rect",{x:t.x-46,y:58,width:92,height:44,rx:12,fill:"transparent",stroke:GOLD,"stroke-width":3},g);}
  g.setAttribute("aria-label",t.chip?(t.chip+": test the "+SKL[TRY.indexOf(t)][1]):"press the Braille dot: test the Merkel receptors");
});
var mkSig=TRY.map(function(t){return t.sig;});
function skinIdle(){
  fnN.setAttribute("stroke",NAVY);FN.forEach(function(l){l.setAttribute("stroke",NAVY);});
  mkN.setAttribute("stroke",NAVY);MK.forEach(function(m){m.setAttribute("fill",GDEEP);});
  msN.setAttribute("stroke",NAVY);msE.setAttribute("fill","#fff");
  pcN.setAttribute("stroke",NAVY);PC.forEach(function(e){e.setAttribute("stroke",INK2);});
  rfN.setAttribute("stroke",NAVY);rfE.setAttribute("rx",40);rfE.setAttribute("fill","#fff");
  [heatG,feather,phone,buzz,pull].forEach(function(g){g.setAttribute("display","none");});
}
function skinOn(t){
  skinRing.setAttribute("cx",t.x);skinRing.setAttribute("cy",t.k==="pac"?420:t.k==="ruf"?300:t.k==="meis"?208:t.k==="free"?150:176);skinRing.setAttribute("display","");
  if(t.k==="free"){fnN.setAttribute("stroke",MAROON);FN.forEach(function(l){l.setAttribute("stroke",MAROON);});}
  if(t.k==="merkel"){mkN.setAttribute("stroke",MAROON);MK.forEach(function(m){m.setAttribute("fill",MAROON);});}
  if(t.k==="meis"){msN.setAttribute("stroke",MAROON);msE.setAttribute("fill","#F3C9C0");}
  if(t.k==="pac"){pcN.setAttribute("stroke",MAROON);PC.forEach(function(e){e.setAttribute("stroke",MAROON);});}
  if(t.k==="ruf"){rfN.setAttribute("stroke",MAROON);rfE.setAttribute("fill","#F3C9C0");}
}
function trDone(t){t.tr.setAttribute("d",trK(t.x-40,500,80,t.sp,20,1));t.tag.textContent=t.slow?"kept firing":"went quiet";}
/* run one receptor's test: the stimulus, the receptor lighting up, its spikes */
function skinTest(t,a){
  cap("");skinIdle();place(braille,0,0);skinOn(t);var T=2400,y0=t.k==="pac"?440:t.k==="ruf"?320:t.k==="meis"?234:190;
  var stim;
  if(t.k==="free"){heatG.setAttribute("display","");stim=wait(T,a);}
  else if(t.k==="merkel"){stim=tweenVal(0,24,300,a,function(v){place(braille,0,v);}).then(function(){return wait(T-300,a);});}
  else if(t.k==="meis"){feather.setAttribute("display","");stim=tweenVal(312,412,T*0.38,a,function(v){place(feather,v,104);}).then(function(){return wait(T*0.62,a);});}
  else if(t.k==="pac"){phone.setAttribute("display","");buzz.setAttribute("display","");place(phone,460,98);
    stim=tweenVal(0,1,T*0.5,a,function(k){place(phone,460+(Math.floor(k*40)%2?3:-3),98);}).then(function(){buzz.setAttribute("display","none");place(phone,460,98);return wait(T*0.5,a);});}
  else{pull.setAttribute("display","");stim=tweenVal(40,58,500,a,function(v){rfE.setAttribute("rx",v);}).then(function(){return wait(T-500,a);});}
  var sp=Promise.all(t.sp.map(function(f){return wait(f*T,a).then(function(){return run(t.sig,[[t.x,y0],[t.x,456]],500,a);});}));
  var tr=growTrain(t.tr,function(k){return trK(t.x-40,500,80,t.sp,20,k);},T,a);
  return Promise.all([stim,sp,tr]).then(function(){trDone(t);cap(t.cap);});
}
/* a tested button turns gray with a check mark */
function chipDone(t,on){t.btn.setAttribute("display","");if(!t.chip){t.box.setAttribute("display",on?"none":"");return;}
  t.box.setAttribute("fill",on?"#EEF0F3":"#FFF6D6");t.box.setAttribute("stroke",on?INK2:GOLD);t.box.setAttribute("stroke-width",on?1.5:3);t.lab.textContent=(on?"\u2713 ":"")+t.chip;}
/* wait until every receptor has been tested, in any order */
function skinAll(a){
  TRY.forEach(function(t){t.tr.setAttribute("d","");t.tag.textContent="";chipDone(t,false);});
  if(!a||reduce){TRY.forEach(trDone);skinIdle();skinRing.setAttribute("display","none");TRY.forEach(function(t){chipDone(t,true);});cap("Slow to adapt: kept firing. Fast to adapt: went quiet.");return Promise.resolve();}
  cap("Click each gold button to test that receptor.");
  return new Promise(function(res){
    var my=runId,left=TRY.length,busyT=false,k=0;setTimeout(function(){lockNext(true);},0);
    var pulse=setInterval(function(){if(my!==runId){stop();return;}k++;TRY.forEach(function(t){if(!t.done)t.box.setAttribute("stroke-width",(k%10)<5?3:5);});},90);
    function stop(){clearInterval(pulse);TRY.forEach(function(t){t.btn.removeEventListener("click",t.h);t.btn.removeEventListener("keydown",t.kh);t.btn.style.cursor="";});}
    TRY.forEach(function(t){t.done=false;t.btn.style.cursor="pointer";
      t.h=function(){if(busyT||t.done||my!==runId)return;busyT=true;if(t.chip)t.btn.setAttribute("display","none");else t.box.setAttribute("display","none");
        skinTest(t,a).then(function(){busyT=false;t.done=true;left--;if(my!==runId)return;skinIdle();place(braille,0,0);skinRing.setAttribute("display","none");chipDone(t,true);
          if(left===0){stop();lockNext(false);return wait(1600,a).then(function(){cap("Slow to adapt: kept firing. Fast to adapt: went quiet.");res();});}
          return wait(1400,a).then(function(){if(my===runId&&!busyT)cap("Good. "+left+" more to test. Click a gold button.");});});};
      t.kh=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();t.h();}};
      t.btn.addEventListener("click",t.h);t.btn.addEventListener("keydown",t.kh);});
  });
}

/* ======================= the cortex map (step 12) ======================= */
var gHom=G("hom");
tx(gHom,40,40,"The touch area of the cortex on one side of the brain, seen from the front","tn",14,"start");
var HC=[330,320],HR=210;
function arcD(a0,a1,r){var p0=[HC[0]+r*Math.cos(a0*Math.PI/180),HC[1]+r*Math.sin(a0*Math.PI/180)],p1=[HC[0]+r*Math.cos(a1*Math.PI/180),HC[1]+r*Math.sin(a1*Math.PI/180)];return "M"+p0[0].toFixed(1)+" "+p0[1].toFixed(1)+" A"+r+" "+r+" 0 0 0 "+p1[0].toFixed(1)+" "+p1[1].toFixed(1);}
el("path",{d:"M330 84 A236 236 0 0 0 96 380 Q150 444 330 436 Z",fill:"#F4F5F8",stroke:INK2,"stroke-width":2},gHom);
el("path",{d:"M330 84 L330 436",stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"5 5"},gHom);
tx(gHom,338,430,"midline","t",12,"start");
/* parts in order from the midline at the top, down the side of the brain */
var HP=[["foot",8,30],["leg",10,110],["trunk",8,120],["arm",12,90],["hand and fingers",26,26],["face",14,24],["lips",20,10],["tongue",12,10]];
var HSEG=[],HLAB=[],HBAR=[];
(function(){var a=-90;HP.forEach(function(h,i){var a1=a-h[1];
  el("path",{d:arcD(a,a1,HR),fill:"none",stroke:"#E3E6ED","stroke-width":34},gHom);
  var seg=el("path",{d:arcD(a-0.6,a1+0.6,HR),fill:"none",stroke:MAROON,"stroke-width":34,opacity:0},gHom);HSEG.push(seg);
  var m=(a+a1)/2*Math.PI/180,lx=HC[0]+(HR+30)*Math.cos(m),ly=HC[1]+(HR+30)*Math.sin(m);
  HLAB.push(tx(gHom,lx,ly+4,h[0],"tn",13,lx<HC[0]-20?"end":"middle"));
  var y=112+i*44;tx(gHom,540,y-6,h[0],"t",12,"start");
  var bar=el("rect",{x:540,y:y,width:Math.max(6,h[2]*2),height:20,rx:5,fill:NAVY,opacity:0},gHom);HBAR.push(bar);
  a=a1;});})();
tx(gHom,540,84,"how big each part really is","tn",14,"start");
var HHIT=HSEG.map(function(s){var h=s.cloneNode();h.setAttribute("stroke","transparent");h.setAttribute("opacity","1");h.setAttribute("stroke-width","44");gHom.appendChild(h);return h;});
function homShow(i,on){HSEG[i].setAttribute("opacity",on?.85:0);HBAR[i].setAttribute("opacity",on?1:0);}
var pLips=promptAt(gHom,40,470,["Click the lips on the map"],112,356,120,327,30);
var pHand=promptAt(gHom,40,470,["Now click the hand and fingers"],168,206,176,177,30);
var pTrunk=promptAt(gHom,40,470,["Now click the trunk"],244,152,251,125,28);

/* ======================= hot and cold (step 13) ======================= */
var gTemp=G("temp");
function TX(t){return 100+(t-10)*15.5;}
[[10,37,NAVY,"cold receptors"],[37,45,GDEEP,"warm receptors"],[45,55,MAROON,"nociceptors: painful heat"]].forEach(function(b){el("rect",{x:TX(b[0]),y:200,width:TX(b[1])-TX(b[0]),height:50,fill:b[2],opacity:.85},gTemp);tx(gTemp,(TX(b[0])+TX(b[1]))/2,b[2]===GDEEP?160:190,b[3],"tn",14,"middle");});
[[10,50],[20,68],[30,86],[37,"98.6"],[45,113],[55,131]].forEach(function(t){el("line",{x1:TX(t[0]),y1:250,x2:TX(t[0]),y2:262,stroke:NAVY,"stroke-width":2},gTemp);tx(gTemp,TX(t[0]),282,t[0]+" °C","t",13,"middle");tx(gTemp,TX(t[0]),300,"("+t[1]+" °F)","t",12,"middle");});
var mint=el("g",{},gTemp);el("path",{d:"M"+TX(18)+" 420 C"+(TX(18)-36)+" 400 "+(TX(18)-30)+" 360 "+TX(18)+" 348 C"+(TX(18)+30)+" 360 "+(TX(18)+36)+" 400 "+TX(18)+" 420 Z",fill:"#fff",stroke:NAVY,"stroke-width":3},mint);el("line",{x1:TX(18),y1:352,x2:TX(18),y2:428,stroke:NAVY,"stroke-width":2},mint);
tx(gTemp,TX(18),448,"mint leaf","tn",13,"middle");
var CHX=TX(48)-80;
var chili=el("g",{},gTemp);el("path",{d:"M"+(CHX-40)+" 372 C"+(CHX-10)+" 352 "+(CHX+30)+" 370 "+(CHX+40)+" 410 C"+(CHX+10)+" 398 "+(CHX-20)+" 392 "+(CHX-40)+" 384 Z",fill:MAROON,stroke:MAROON,"stroke-width":2},chili);el("path",{d:"M"+(CHX-40)+" 378 q-10 -4 -14 -16",fill:"none",stroke:GDEEP,"stroke-width":4,"stroke-linecap":"round"},chili);
tx(gTemp,CHX,448,"chili pepper","tm",13,"middle");
var tMint=el("g",{},gTemp);arrow(tMint,TX(18),340,TX(15),262,NAVY,4);tx(tMint,TX(18)+30,320,"menthol opens TRPM8,","tn",14,"start");tx(tMint,TX(18)+30,338,"the cold channel","tn",14,"start");
var tChili=el("g",{},gTemp);arrow(tChili,CHX+10,350,TX(50),262,MAROON,4);tx(tChili,CHX-30,320,"capsaicin opens TRPV1,","tm",14,"end");tx(tChili,CHX-30,338,"the heat channel","tm",14,"end");
var pMint=promptAt(gTemp,TX(18)+70,400,["Click the mint leaf"],TX(18)+30,390,TX(18),384,46);
var pChili=promptAt(gTemp,CHX-300,420,["Now click the chili pepper"],CHX-50,396,CHX,390,50);

/* ======================= two pain fibers (step 14) ======================= */
var gFib=G("fib");
var foot=el("g",{},gFib);
el("path",{d:"M48 30 L84 30 L86 170 Q120 176 150 186 Q162 196 150 210 L52 210 Q40 200 44 170 Z",fill:TISS,stroke:MAROON,"stroke-width":3},foot);
tx(gFib,30,24,"lower leg and foot","t",13,"start");
var block=el("rect",{x:176,y:120,width:30,height:110,rx:4,fill:"#E3E6ED",stroke:INK2,"stroke-width":2.5},gFib);tx(gFib,191,110,"table leg","t",13,"middle");
var FY1=270,FY2=360;
poly(gFib,[[110,206],[130,FY1],[200,FY1]],NAVY,3);poly(gFib,[[100,206],[120,FY2],[200,FY2]],INK2,3);
el("line",{x1:200,y1:FY1,x2:760,y2:FY1,stroke:NAVY,"stroke-width":7},gFib);
for(var i=0;i<6;i++)el("rect",{x:226+i*90,y:FY1-10,width:76,height:20,rx:10,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gFib);
el("line",{x1:200,y1:FY2,x2:760,y2:FY2,stroke:INK2,"stroke-width":3},gFib);
tx(gFib,226,FY1-24,"A-delta fiber: thin, with myelin, 12 to 30 meters per second","tn",14,"start");tx(gFib,226,FY2-14,"C fiber: thin, no myelin, 0.5 to 2 meters per second","t",14,"start");
el("rect",{x:762,y:FY1-30,width:60,height:FY2-FY1+60,rx:24,fill:"#fff",stroke:NAVY,"stroke-width":3},gFib);tx(gFib,792,FY1-40,"spinal cord","tn",14,"middle");
var fA=dot(gFib,NAVY,10),fC=dot(gFib,MAROON,10);
el("line",{x1:200,y1:446,x2:580,y2:446,stroke:NAVY,"stroke-width":2.5},gFib);
[0,0.5,1].forEach(function(k,i){var x=200+380*k;el("line",{x1:x,y1:438,x2:x,y2:454,stroke:NAVY,"stroke-width":2},gFib);});
tx(gFib,200,474,"toe hits","t",13,"middle");tx(gFib,580,474,"about 1 second later","t",13,"end");
var fT1=tx(gFib,226,424,"","tn",14,"start"),fT2=tx(gFib,556,424,"","tm",14,"middle");
var fM1=badge(gFib,226,446,"",NAVY,8),fM2=badge(gFib,556,446,"",MAROON,8);
var toeHit=el("rect",{x:40,y:150,width:130,height:70,fill:"transparent"},gFib);
var pToe=promptAt(gFib,300,90,["Click the toe to stub it","on the table leg"],160,180,140,194,34);

/* ======================= the hot stove (step 15) ======================= */
var gStove=G("stove");
var EL=[250,300];
el("rect",{x:226,y:80,width:48,height:226,rx:22,fill:TISS,stroke:MAROON,"stroke-width":3},gStove);
var biceps=el("ellipse",{cx:282,cy:190,rx:14,ry:62,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2.5},gStove);
tx(gStove,214,170,"biceps:","tm",13,"end");tx(gStove,214,188,"bends the elbow","tm",13,"end");
var fore=el("g",{},gStove);
el("rect",{x:240,y:280,width:250,height:40,rx:18,fill:TISS,stroke:MAROON,"stroke-width":3},fore);
el("rect",{x:482,y:282,width:70,height:30,rx:12,fill:TISS,stroke:MAROON,"stroke-width":3},fore);
el("circle",{cx:EL[0],cy:EL[1],r:22,fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},gStove);
tx(gStove,214,306,"elbow","t",13,"end");
function foreAngle(d){fore.setAttribute("transform","rotate("+d+" "+EL[0]+" "+EL[1]+")");}
var burner=el("rect",{x:450,y:334,width:150,height:16,rx:6,fill:INK2},gStove);
el("rect",{x:420,y:350,width:210,height:60,rx:6,fill:"#fff",stroke:INK2,"stroke-width":2.5},gStove);tx(gStove,525,386,"stove","t",14,"middle");
var heat=el("g",{},gStove);[480,525,570].forEach(function(x){el("path",{d:"M"+x+" 330 q-8 -10 0 -18",fill:"none",stroke:MAROON,"stroke-width":2.5},heat);});
/* the cord and the brain */
var SC=[730,250];
el("ellipse",{cx:SC[0],cy:SC[1],rx:66,ry:48,fill:"#fff",stroke:NAVY,"stroke-width":3},gStove);
el("path",{d:"M700 226 Q710 222 716 236 L722 246 L738 246 L744 236 Q750 222 760 226 L754 246 Q772 256 764 272 Q754 280 742 268 L738 258 L722 258 L718 268 Q706 280 696 272 Q688 256 706 246 Z",fill:TINT,stroke:INK2,"stroke-width":2},gStove);
tx(gStove,730,320,"spinal cord","tn",14,"middle");
box(gStove,460,24,260,52,"brain: where the pain is felt","tn",14);
var STN=[[530,300],[600,250],[664,236],[712,238]];
var STI=[[712,238],[728,256],[742,264]];
var STM=[[742,264],[770,300],[700,430],[320,450],[290,252]];
var STU=[[712,238],[700,170],[640,76]];
poly(gStove,STN,MAROON,3.5);poly(gStove,STI,INK2,3);poly(gStove,STM,NAVY,3.5);poly(gStove,STU,MAROON,3.5,"8 6");
tx(gStove,600,228,"pain-sensing neuron","tm",13,"middle");tx(gStove,500,476,"motor neuron to the biceps","tn",13,"middle");
tx(gStove,712,150,"up to the brain","tm",13,"start");
var sN=dot(gStove,MAROON,9),sI=dot(gStove,INK2,8),sM=dot(gStove,NAVY,9),sU=dot(gStove,MAROON,9);
var ouch=tx(gStove,590,104,"","tm",16,"middle");
var stoveHit=el("rect",{x:420,y:326,width:210,height:84,fill:"transparent"},gStove);
var pStove=promptAt(gStove,60,470,["Click the stove to rest","the hand on the hot burner"],440,372,525,370,46);

/* ======================= referred pain (step 16) ======================= */
var gRef=G("ref");
el("circle",{cx:190,cy:70,r:30,fill:TISS,stroke:MAROON,"stroke-width":3},gRef);
el("path",{d:"M128 108 L252 108 Q266 112 266 128 L262 330 L118 330 L114 128 Q114 112 128 108 Z",fill:TISS,stroke:MAROON,"stroke-width":3},gRef);
el("rect",{x:88,y:112,width:22,height:200,rx:10,fill:TISS,stroke:MAROON,"stroke-width":3},gRef);
var refArm=el("rect",{x:270,y:112,width:22,height:200,rx:10,fill:TISS,stroke:MAROON,"stroke-width":3},gRef);
tx(gRef,190,354,"a man, seen from the front","t",13,"middle");
tx(gRef,300,330,"his left arm","tm",14,"start");
var heart=el("path",{d:"M210 196 c-14 -20 4 -34 18 -20 c14 -14 32 0 18 20 l-18 20 z",fill:MAROON,stroke:MAROON,"stroke-width":2},gRef);
tx(gRef,228,240,"heart","tm",13,"middle");
el("ellipse",{cx:540,cy:250,rx:84,ry:56,fill:"#fff",stroke:NAVY,"stroke-width":3},gRef);
el("path",{d:"M510 224 Q520 218 526 234 L532 244 L548 244 L554 234 Q560 218 570 224 L564 246 Q584 258 574 276 Q564 284 552 270 L548 260 L532 260 L528 270 Q516 284 506 276 Q496 258 516 246 Z",fill:TINT,stroke:INK2,"stroke-width":2},gRef);
tx(gRef,540,330,"one segment of the spinal cord","t",13,"middle");
el("circle",{cx:560,cy:240,r:10,fill:NAVY},gRef);
box(gRef,500,40,220,56,"somatosensory cortex","tn",14);
var rV=poly(gRef,[[236,206],[380,232],[550,240]],MAROON,4),rS=poly(gRef,[[292,230],[400,262],[550,244]],NAVY,4),rP=poly(gRef,[[568,232],[620,150],[610,96]],NAVY,5);
var rMark=badge(gRef,281,210,"!",MAROON,15);
var rsig=dot(gRef,MAROON,9);
var heartHit=el("circle",{cx:228,cy:196,r:30,fill:"transparent"},gRef);
var pHeart=promptAt(gRef,320,440,["Click the heart, where the muscle","is short of oxygen"],250,220,228,196,34);

/* ======================= inflammation (step 17) ======================= */
var gInf=G("inf");
el("rect",{x:60,y:160,width:500,height:40,fill:"#F9E3DC",stroke:MAROON,"stroke-width":2},gInf);
el("rect",{x:60,y:200,width:500,height:180,fill:TISS,stroke:MAROON,"stroke-width":2},gInf);
tx(gInf,64,150,"skin over the ankle","t",13,"start");
var IN=[[310,196],[310,300],[420,330],[600,330],[640,170]];
poly(gInf,IN,MAROON,3.5);[[310,196,290,166],[310,196,310,164],[310,196,330,166]].forEach(function(q){el("line",{x1:q[0],y1:q[1],x2:q[2],y2:q[3],stroke:MAROON,"stroke-width":3},gInf);});
tx(gInf,360,288,"nociceptor: a pain-sensing nerve ending","tm",13,"start");
el("rect",{x:600,y:60,width:270,height:110,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gInf);
tx(gInf,610,80,"pain neuron firing","t",13,"start");
var infTr=trainPath(gInf,MAROON,2.5);
var finger=el("g",{},gInf);el("rect",{x:286,y:40,width:48,height:100,rx:22,fill:TISS,stroke:MAROON,"stroke-width":3},finger);tx(finger,340,70,"a light touch","t",13,"start");
var chem=el("g",{},gInf);
[[250,230,GDEEP],[370,236,GDEEP],[280,268,MAROON],[350,262,MAROON],[230,180,NAVY],[390,184,NAVY],[300,240,GDEEP],[332,222,NAVY]].forEach(function(c){el("circle",{cx:c[0],cy:c[1],r:7,fill:c[2],stroke:"#fff","stroke-width":2},chem);});
var chemL=el("g",{},gInf);
[[GDEEP,"histamine, from mast cells"],[MAROON,"prostaglandins, from damaged cells"],[NAVY,"substance P, from the sensory neuron"]].forEach(function(c,i){el("circle",{cx:76,cy:412+i*24,r:7,fill:c[0]},chemL);tx(chemL,90,417+i*24,c[1],"t",13,"start");});
var infHit=el("rect",{x:270,y:30,width:90,height:130,fill:"transparent"},gInf);
var pInf1=promptAt(gInf,380,124,["Click the finger to touch","healthy skin lightly"],340,100,310,90,40);
var pInf2=promptAt(gInf,380,124,["Now the ankle is sprained.","Touch it just as lightly."],340,100,310,90,40);
function press(a){return tweenVal(0,20,180,a,function(v){place(finger,0,v);}).then(function(){return wait(250,a);});}
function lift(a){return tweenVal(20,0,180,a,function(v){place(finger,0,v);});}

/* ======================= the dorsal horn gate (steps 18 and 19) ======================= */
var gGate=G("gate");
el("path",{d:"M14 120 L50 120 L56 400 L20 400 Z",fill:TISS,stroke:MAROON,"stroke-width":3},gGate);tx(gGate,14,108,"shin","t",13,"start");
el("ellipse",{cx:450,cy:270,rx:300,ry:170,fill:"#fff",stroke:NAVY,"stroke-width":3},gGate);
tx(gGate,450,128,"dorsal horn of the spinal cord","tn",15,"middle");
var GN=poly(gGate,[[56,330],[300,330],[420,300]],MAROON,5);tx(gGate,64,354,"pain fiber (nociceptor)","tm",14,"start");
var GT=poly(gGate,[[56,190],[300,190],[380,230]],NAVY,8);tx(gGate,64,176,"large touch fiber","tn",14,"start");
el("circle",{cx:394,cy:240,r:13,fill:INK2},gGate);tx(gGate,394,214,"calming neuron","t",13,"middle");
var GI=poly(gGate,[[404,250],[470,286]],INK2,4);
el("circle",{cx:490,cy:300,r:18,fill:NAVY},gGate);tx(gGate,520,340,"neuron to the brain","t",13,"start");
var GP=poly(gGate,[[508,296],[600,200],[620,100]],NAVY,5);
el("rect",{x:440,y:14,width:280,height:84,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gGate);tx(gGate,450,34,"pain signals sent to the brain","t",13,"start");
var gTr=trainPath(gGate,MAROON,2.5);
function gtrain(n){return function(k){return trainWin(450,86,260,0,k,Math.round(n*k),40);};}
var gsN=dot(gGate,MAROON,9),gsT=dot(gGate,NAVY,9),gsI=dot(gGate,INK2,8);
var rubHand=el("g",{},gGate);el("rect",{x:-26,y:-16,width:52,height:32,rx:12,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2.5},rubHand);place(rubHand,62,250);
var rubHit=el("rect",{x:0,y:200,width:110,height:110,fill:"transparent"},gGate);
var pRub=promptAt(gGate,130,470,["Click the hand to rub the shin"],80,282,62,250,34);
var gOp=G("op");
var opBox=box(gOp,560,410,260,40,"pathway down from the brainstem","tn",13);
var opLine=poly(gOp,[[690,410],[560,352],[456,308]],GDEEP,4,"6 5");opLine._dash="6 5";
var opPre=badge(gOp,420,300,"op",GDEEP,15),opPost=badge(gOp,490,338,"op",GDEEP,15);
var opT1=tx(gOp,300,268,"before the synapse","tm",13,"middle"),opT2=tx(gOp,560,384,"after the synapse","tm",13,"middle");
var opHit=el("rect",{x:550,y:400,width:280,height:60,fill:"transparent"},gOp);
var pOp=promptAt(gGate,150,470,["Click the brainstem pathway","to switch it on"],556,436,690,430,40);

makeCap();CAP.setAttribute("x",24);CAP.setAttribute("text-anchor","start");
function resetAll(){
  hide([sigA,sigB,sigC,fA,fC,rsig,gsN,gsT,gsI,xIn,xOut,sN,sI,sM,sU].concat(mkSig));
  [xBodS,xBodM,xBodST,xBodMT,XWM].forEach(function(g){g.setAttribute("display","none");});
  pathLabels(true);handClose(0);bodyShade();hits([],LEVHIT);hits([],XSHIT);coin.setAttribute("display","none");pin.setAttribute("display","none");
  [gCutL,gCutR,gClot,gBody].forEach(function(g){g.setAttribute("display","none");});
  HSEG.forEach(function(s,i){homShow(i,false);});
  [tMint,tChili].forEach(function(g){g.setAttribute("display","none");});
  fT1.textContent="";fT2.textContent="";fM1.setAttribute("display","none");fM2.setAttribute("display","none");place(foot,0,0);
  foreAngle(0);biceps.setAttribute("rx",14);burner.setAttribute("fill",INK2);heat.setAttribute("display","none");ouch.textContent="";
  rMark.setAttribute("display","none");refArm.setAttribute("fill",TISS);
  place(finger,0,0);chem.setAttribute("display","none");chemL.setAttribute("display","none");infTr.setAttribute("d",trainWin(610,150,250,0,1,0,50));
  gTr.setAttribute("d","");place(rubHand,62,250);
  skinRing.setAttribute("display","none");place(braille,0,0);skinIdle();TRY.forEach(function(t){t.tr.setAttribute("d","");t.tag.textContent="";chipDone(t,false);});
  cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}
function draw(name,line,pts,d,dur,a){REG[name].setAttribute("display","");return Promise.all([reveal(line,dur,a),run(d,pts,dur,a)]);}
/* the three pathways shown statically */
function showPaths(l){["dc","st","cs"].forEach(function(k){REG[k].setAttribute("display",l.indexOf(k)>=0?"":"none");});}

/* ======================= steps ======================= */
var STEPS=[
{sec:"Inside the spinal cord",comp:"Competency 5",
 title:"Regions, segments and roots",
 text:["Your spinal cord runs down your back inside the spine. It is divided into four regions, named for the bones of the spine beside them: cervical in the neck, thoracic in the chest, lumbar in the lower back, and sacral at the base of the spine. Each region is made of segments, and each segment sends out a pair of spinal nerves, one to each side of the body.","Just before a spinal nerve joins the cord, it splits into two branches called roots. The dorsal root, toward the back, carries sensory information in. Its swelling, the dorsal root ganglion, holds the cell bodies of the sensory neurons. The ventral root, toward the front, carries commands out to muscles and glands. Click the end of the spinal nerve on the left to send a touch signal in."],
 name:"spinal nerve",
 auto:true,
 desc:"A large slice of the spinal cord. On the left, a spinal nerve splits into a dorsal root, with its swelling, the dorsal root ganglion, and a ventral root. Down the right side, the spinal nerves leave the spine in pairs, grouped by region: 8 cervical, 12 thoracic, 5 lumbar and 5 sacral. When the student clicks the end of the spinal nerve, a maroon dot travels in through the dorsal root to the back of the gray matter, and then a navy dot travels out through the ventral root.",
 pre:function(){S(["xs","regions"]);xsMode(false,true);hits([xNerveHit],XSHIT);},
 play:function(a){return waitOn(xNerveHit,xNervePrompt,a).then(function(){return run(xIn,X_IN,1300,a);}).then(function(){return run(xOut,X_OUT,1200,a);}).then(function(){cap("Signals come in the dorsal root and go out the ventral root.");});}},

{title:"Gray matter and white matter",
 text:["If you slice across the cord, you see two kinds of tissue. In the middle is a gray core shaped like a butterfly or the letter H. This gray matter is where the cell bodies and synapses are. Around it is white matter, made mostly of axons wrapped in myelin, the fatty coating that makes it look white.","The gray matter is divided into horns. In the dorsal horns, also called posterior horns, the sensory fibers coming in synapse on interneurons, in separate groups called nuclei: one set for information from the skin and muscles (somatic) and one for information from the organs (visceral). The ventral horns, also called anterior horns, hold the cell bodies of motor neurons, in somatic motor nuclei and autonomic nuclei. The autonomic nuclei sit in a small lateral horn.","The white matter is divided into columns, and each column is made of tracts, bundles of axons running up or down. Ascending tracts carry sensory information up to the brain in the dorsal white matter and the outer part of the lateral white matter. Descending tracts carry commands down from the brain in the ventral white matter and the inner part of the lateral white matter. Propriospinal tracts stay inside the cord. Click the white matter to see where the tracts run."],
 name:"gray matter and white matter",
 auto:true,
 desc:"The cord slice with its butterfly-shaped gray matter and the white matter around it. When the student clicks the white matter, shaded areas appear: navy for tracts going up, in the back and the outer sides, and maroon for tracts going down, in the inner sides and the front.",
 pre:function(){S(["xs"]);xsMode(false,true);XWM.setAttribute("display","");hits([xSliceHit],XSHIT);},
 play:function(a){return waitOn(xSliceHit,xWhitePrompt,a).then(function(){XWM.setAttribute("display","none");xsMode(true,true);cap("Gray matter holds the synapses, and white matter the tracts.");});}},

{title:"Horns, roots, tracts and columns",
 text:["Four words describe the parts of a slice of spinal cord, and they are easy to mix up: horns, roots, tracts and columns."],
 ask:"Which of the four are gray matter, which are white matter, and which one is not inside the cord at all?",
 ans:["Horns are gray matter. They are regions of cell bodies and synapses. Tracts are white matter. They are bundles of axons running up or down the cord, and a column is a group of tracts. Roots are not inside the cord at all. They are the two branches of a spinal nerve just before it joins the cord: the dorsal root brings sensory information in, and the ventral root takes motor commands out.","The cord is also an integrating center in its own right. In a spinal reflex, a signal passes from a sensory neuron through the gray matter to an efferent neuron with no input from the brain. Interneurons usually send a copy of the sensory information up a tract to the brain at the same time."],
 name:"columns and tracts",
 desc:"The cord slice with no labels and the tracts shaded. When the student clicks the slice, labels appear: the dorsal, ventral and lateral horns in the gray matter, the tracts going up and down in the white matter, and the dorsal root, its ganglion, the ventral root and the spinal nerve outside the cord.",
 pre:function(){S(["xs"]);xsMode(true,false);hits([xSliceHit],XSHIT);},
 play:function(a){return waitOn(xSliceHit,xLabPrompt,a).then(function(){xsMode(true,true);cap("Horns are gray, tracts are white, and roots are outside.");});}},

{title:"Where the cell bodies are",
 text:["Think about two neurons in your right arm: a sensory neuron that carries touch from a fingertip, and a motor neuron that makes a muscle of the hand contract."],
 ask:"Where is the cell body of each one: inside the spinal cord or outside it, and in which part?",
 ans:["The sensory neuron's cell body is outside the cord, in the dorsal root ganglion, the swelling on the dorsal root. Its axon runs all the way from the fingertip, past the cell body, and into the cord. The motor neuron's cell body is inside the cord, in the ventral horn of the gray matter, and its axon leaves through the ventral root.","That is why damage to a dorsal root ganglion, as in shingles, affects sensation along one strip of skin, and why damage to the ventral horn, as in polio, causes weakness with no loss of sensation."],
 name:"dorsal root ganglion",
 desc:"The labeled cord slice. The student clicks the swelling on the dorsal root, and a maroon dot appears there, labeled sensory cell bodies outside the cord. Then the student clicks the ventral horn, and a navy dot appears there, labeled motor cell bodies in the ventral horn.",
 pre:function(){S(["xs"]);xsMode(false,true);hits([xDrgHit,xVhHit],XSHIT);},
 play:function(a){return waitOn(xDrgHit,xDrgPrompt,a).then(function(){xBodS.setAttribute("display","");xBodST.setAttribute("display","");return waitOn(xVhHit,xVhPrompt,a);}).then(function(){xBodM.setAttribute("display","");xBodMT.setAttribute("display","");cap("Sensory cell bodies sit outside the cord, motor ones inside.");});}},

{sec:"Three long pathways",comp:"Competency 5",
 title:"Up and down the cord",
 text:["Sensory information travels up the spinal cord to the brain in ascending pathways, and commands travel down in descending pathways. These long pathways are tracts, bundles of axons in the white matter.","The figure shows the person from behind, so the person's right side is on your right. From the top down you see the brain with its outer gray layer, the cortex; the thalamus, deep in the middle of the brain; the brainstem, with the medulla at its lower end; and a slice of the spinal cord. The right hand is at the lower right. The dashed line is the midline. Each side of the brain senses and moves the opposite side of the body, so every one of these pathways crosses the midline somewhere. Where it crosses is what this section is about."],
 auto:true,
 desc:"The person seen from behind: the two halves of the brain with a gray outer layer of cortex, the thalamus deep in the middle, the brainstem with the medulla at its lower end, the spinal cord running down into a slice, and a spinal nerve running out to the right hand. A dashed midline runs down the center.",
 pre:function(){S(["lev"]);showPaths([]);},
 play:function(a){return wait(300,a).then(function(){cap("Every one of these long pathways crosses the midline.");});}},

{title:"Fine touch from the right hand",
 text:["There are four body senses, called somatic senses: touch; proprioception, the sense of where your body parts are; temperature; and nociception, which includes pain and itch. All of them start the same way. Pressure, heat or a chemical opens ion channels in a receptor. The first sensory neuron in each pathway from the body has its cell body in a dorsal root ganglion, and it synapses inside the central nervous system on a second sensory neuron. Where that synapse happens depends on the kind of information.","A fingertip on the right hand feels the texture of a coin. The sensory neuron enters the cord on the right side."],
 ask:"Trace this signal to the cortex. On which side does it travel up the cord, and at what level does it cross?",
 ans:["It travels up the cord on the same side it entered, the right, without stopping to synapse. Neurons for fine touch, vibration and proprioception have very long axons that climb all the way to the medulla. There the first neuron synapses on the second neuron, which crosses the midline in the medulla and runs up to the thalamus on the left. In the thalamus it synapses on a third neuron that carries the signal to the somatosensory cortex on the left. Many of these pathways also send branches to the cerebellum, which uses the information to coordinate balance and movement.","This is the dorsal column pathway, for fine touch, vibration and proprioception. It crosses high, in the medulla."],
 name:"dorsal column pathway",
 desc:"The student clicks the coin at the right fingertip. A navy line then runs from the hand into the right side of the cord, climbs on the right to the medulla, crosses the midline there, synapses in the left thalamus, and ends in the cortex on the left. Dots mark its two synapses in the brain.",
 pre:function(){S(["lev"]);showPaths([]);coin.setAttribute("display","");hits([coinHit],LEVHIT);},
 play:function(a){return waitOn(coinHit,pCoin,a).then(function(){return draw("dc",lDC,DC,sigA,1900,a);}).then(function(){cap("Fine touch goes up the same side and crosses in the medulla.");});}},

{title:"Pain from the right hand",
 text:["Now a pin pricks the same fingertip. Pain, temperature and coarse touch travel on a different pathway."],
 ask:"Where does this signal synapse first, and at what level does it cross?",
 ans:["It synapses almost right away, in the dorsal horn of the spinal cord where it enters. The second neuron crosses the midline inside the spinal cord, within a segment or two. It crosses in a thin band of white matter just in front of the central canal, the small hole in the middle of the gray matter. This band is the anterior white commissure. Then the second neuron climbs the opposite side, the left, to the thalamus. A third neuron goes on to the somatosensory cortex. Branches also go to the limbic system and the hypothalamus, which is why pain can bring emotional distress and body reactions such as nausea, sweating or fainting.","This is the spinothalamic tract, for pain, temperature and coarse touch. It crosses low, in the spinal cord, while the dorsal column pathway crosses high, in the medulla. That difference is what lets a doctor find where an injury is."],
 name:"spinothalamic tract",
 desc:"The navy fine touch pathway stays for comparison. The student clicks the pin over the right fingertip. A maroon line then runs from the hand into the cord, synapses in the right dorsal horn, crosses the midline just in front of the central canal, climbs the left side through the brainstem to the left thalamus, and ends in the cortex on the left.",
 pre:function(){S(["lev"]);showPaths(["dc"]);pin.setAttribute("display","");hits([pinHit],LEVHIT);},
 play:function(a){return waitOn(pinHit,pPin,a).then(function(){return draw("st",lST,ST,sigB,1900,a);}).then(function(){cap("Pain crosses in the cord, just in front of the central canal.");});}},

{title:"Moving the right hand",
 text:["The person decides to close the right hand. The command starts in the motor cortex, the strip of cortex that controls movement."],
 ask:"Which side of the motor cortex sends this command, and where does the pathway cross?",
 ans:["The left primary motor cortex, in the frontal lobe. The axons of its large output neurons, the pyramidal cells, run down through the brainstem, and most of them cross the midline at the bottom of the medulla, in a region called the pyramids. They continue down the right side of the cord and synapse on motor neurons in the ventral horn, which run out to the muscles of the right hand.","This is the corticospinal tract, the main pathway for voluntary movement, especially fine movement of the hands. Its neurons in the cortex are upper motor neurons, and the motor neurons in the cord are lower motor neurons."],
 name:"corticospinal tract",
 desc:"Both sensory pathways stay on the figure. The student clicks the left motor cortex. A gold dashed line then leaves the left cortex, runs down the left side of the brainstem, crosses the midline at the bottom of the medulla, runs down the right side of the cord, synapses in the right ventral horn, and runs out to the right hand, whose fingers close.",
 pre:function(){S(["lev"]);showPaths(["dc","st"]);hits([ctxHit],LEVHIT);},
 play:function(a){return waitOn(ctxHit,pCtx,a).then(function(){return draw("cs",lCS,CS,sigC,1900,a);}).then(function(){return tweenVal(0,1,500,a,handClose);}).then(function(){cap("The left side of the brain moves the right hand.");});}},

{title:"Cutting half the cord",
 text:["An injury cuts through the left half of the spinal cord at the level of this slice and leaves the right half intact. All three pathways are drawn at this level."],
 ask:"Below the cut, which sensations and movements are lost on the left side of the body, and which on the right?",
 ans:["On the left side, fine touch, vibration, position sense and voluntary movement are lost. At this level, the dorsal columns and the corticospinal tract for the left side of the body run in the left half of the cord, and none of them has crossed yet. On the right side, pain and temperature are lost, because the spinothalamic fibers from the right side have already crossed into the left half of the cord.","This split pattern is called Brown-Séquard syndrome, and it tells you the damage is in the spinal cord. In the brain, all three pathways have already crossed, so damage there takes everything from the same side of the body."],
 name:"Brown-Séquard syndrome",
 desc:"All three pathways on the figure. The student clicks the left half of the cord slice, and it is shaded maroon. A small figure of the person seen from behind then shows the loss below the level of the cut: the left side shaded navy and labeled touch, position and movement lost, and the right side shaded maroon and labeled pain and temperature lost.",
 pre:function(){S(["lev"]);showPaths(["dc","st","cs"]);pathLabels(false);hits([cutLHit],LEVHIT);},
 play:function(a){return waitOn(cutLHit,pCutL,a).then(function(){gCutL.setAttribute("display","");return wait(400,a);}).then(function(){gBody.setAttribute("display","");bodyShade(LOSS_N,LOSS_M,["touch, position","and movement","lost"],["pain and","temperature","lost"],true);cap("A split pattern like this means the damage is in the cord.");});}},

{title:"A clot in the medulla",
 text:["A blood clot damages the sensory tracts passing through the lower right side of the medulla. Use the two sensory pathways drawn on the figure."],
 ask:"On which side of the body will pain and temperature be abnormal, and on which side will proprioception be abnormal?",
 ans:["Pain and temperature will be abnormal on the left side. Their second neurons crossed in the spinal cord, so the pain fibers passing through the right medulla carry pain from the left side of the body. Proprioception will be abnormal on the right side. Those fibers have not crossed yet when they reach the lower medulla. They synapse and cross there.","The same rule works at every level. Below the place where a pathway crosses, damage affects the same side of the body. Above it, damage affects the opposite side."],
 name:"ipsilateral and contralateral",
 desc:"The figure with both sensory pathways. The student clicks the lower right part of the medulla, and a maroon clot appears there. The small figure of the person then shows the left side shaded maroon, labeled pain and temperature, and the right side shaded navy, labeled proprioception.",
 pre:function(){S(["lev"]);showPaths(["dc","st"]);hits([clotHit],LEVHIT);},
 play:function(a){return waitOn(clotHit,pClot,a).then(function(){gClot.setAttribute("display","");return wait(400,a);}).then(function(){gBody.setAttribute("display","");bodyShade(LOSS_M,LOSS_N,["pain and","temperature"],["proprioception"],false);cap("Pain is affected on the left, proprioception on the right.");});}},

{sec:"Touch, from skin to cortex",comp:"Competency 13",
 title:"Receptors in the skin",
 text:["Touch receptors respond to stretch, steady pressure, flutter or stroking, vibration and texture, and they come in several forms. Free nerve endings sense temperature, damaging stimuli and hair movement. Meissner corpuscles, near the surface, sense flutter and stroking and adapt quickly. Pacinian corpuscles, deep in the skin, sense vibration, have large receptive fields and adapt quickly, which is why you stop feeling your shirt soon after you put it on. Ruffini corpuscles, deep in the skin, sense stretch and adapt slowly. Merkel receptors, near the surface, sense steady pressure and texture and adapt slowly.","Test all five. Click each gold button above the skin to give that receptor its stimulus, and watch its firing line under the skin. Does it keep firing for as long as the stimulus lasts, or fire at first and then go quiet?"],
 ask:"A person reads Braille with a fingertip. Which of these receptors does most of the work, and why are fingertips so good at it?",
 ans:["Merkel receptors. They report steady pressure and texture, and they keep reporting while the finger rests on a dot, because they adapt slowly. Each one is a Merkel cell, which is not a neuron, paired with the enlarged ending of a sensory neuron. Pressure on the skin opens Piezo2 channels in the Merkel cell, the cell depolarizes, and it releases transmitter onto the sensory neuron. Merkel receptors are packed most densely in the fingertips.","Your five tests showed the difference. The free nerve endings, Merkel receptors and Ruffini endings kept firing for as long as the stimulus lasted; they adapt slowly. Meissner corpuscles fired only while the feather moved, and Pacinian corpuscles only while the phone buzzed; they adapt quickly and go quiet when nothing changes.","Practice changes the brain too. People who read Braille develop a larger area of somatosensory cortex for the fingertips."],
 name:"Merkel receptor",
 desc:"A slice of fingertip skin in three layers with five receptors: free nerve endings reaching into the epidermis, Merkel receptors at the base of the epidermis, a Meissner corpuscle just below, a Pacinian corpuscle deep down, and a Ruffini corpuscle in the dermis. Above the skin sit a stimulus for each receptor: warmth for the free nerve endings, a Braille dot for the Merkel receptors, a feather for the Meissner corpuscle, a buzzing phone for the Pacinian corpuscle, and a pull on the skin for the Ruffini ending. A short firing line sits under each receptor. The student tests each one in any order: the receptor lights up and its firing line fills with spikes. The free nerve endings, Merkel receptors and Ruffini ending keep firing for the whole stimulus; the Meissner corpuscle fires only while the feather moves, and the Pacinian corpuscle only while the phone buzzes.",
 pre:function(){S(["skin"]);},
 play:function(a){return skinAll(a);}},

{title:"The map in the cortex",
 text:["Touch information ends in the primary somatic sensory cortex, in the parietal lobe, on the strip of cortex just behind the central sulcus, called the postcentral gyrus. Each part of the body has its own region there, laid out in order like a map. Drawn as a body, this map is the somatosensory homunculus. It was first mapped by stimulating the cortex of awake patients during brain surgery, which is possible because the brain itself has no pain receptors. Within each body part's region, columns of neurons are devoted to particular kinds of receptor."],
 ask:"The lips and fingertips get far more cortex than the whole trunk. Why would the cortex be built that way?",
 ans:["Because the more sensitive a part of the body is, the larger its region of cortex. The lips and fingertips are packed with receptors that have small receptive fields, the same ones that let you tell two points apart only a few millimeters apart there. The trunk has few receptors with large receptive fields, so it needs little cortex. Because the pathways cross on the way up, damage to this strip on one side dulls sensation on the opposite side of the body.","The map is not fixed. A body part that is used more gets more cortex, and when a finger or limb is lost, neighboring areas take over its region. When that reorganization goes wrong, the brain can produce sensations, including pain, that it places in the missing limb."],
 name:"somatosensory homunculus",
 desc:"On the left, the touch area of the cortex is drawn as a curved strip on the left side of the brain, divided into regions from the midline down the side: foot, leg, trunk, arm, hand and fingers, face, lips and tongue. On the right, navy bars show how big each part really is. The student clicks the lips, the hand and fingers, and the trunk in turn, and each region fills in maroon beside its true size bar. The lips and hand take long stretches of cortex but have short bars; the trunk takes a short stretch but has a long bar. Then the rest of the map fills in.",
 pre:function(){S(["hom"]);},
 play:function(a){var seq=[[6,pLips],[4,pHand],[2,pTrunk]],k=0;
   function one(){if(k>=seq.length)return Promise.resolve();var s=seq[k++];return waitOn(HHIT[s[0]],s[1],a).then(function(){homShow(s[0],true);return wait(250,a);}).then(one);}
   return one().then(function(){var rest=[0,1,3,5,7],j=0;function nx(){if(j>=rest.length)return Promise.resolve();homShow(rest[j++],true);return wait(180,a).then(nx);}return nx();}).then(function(){cap("The more sensitive a body part, the more cortex it gets.");});}},

{sec:"Temperature and pain",comp:"Competencies 13 and 14",
 title:"Hot and cold",
 text:["In the skin, the temperature receptors are free nerve endings. Cold receptors respond mainly to temperatures below body temperature. Warm receptors respond from body temperature, 37 °C (98.6 °F), up to about 45 °C (113 °F). Above that, nociceptors take over and you feel painful heat. You have many more cold receptors than warm ones. Temperature receptors in the brain also help regulate body temperature."],
 ask:"Chili peppers feel hot in your mouth and mint feels cool, even at room temperature. How could a chemical feel like a temperature?",
 ans:["Because the receptors use ion channels that respond to both. Heat-sensing nerve endings use TRPV1 channels, which open with damaging heat and also with capsaicin, the chemical in chili peppers. A related channel, TRPM8, opens with cold and also with menthol, the chemical in mint. The labeled line does the rest: whatever opens those channels is felt as heat or cold.","Nociceptors use TRP channels too, which ties temperature and pain together. The discovery of these channels, and of the Piezo channels for touch, won the 2021 Nobel Prize in Physiology or Medicine."],
 name:"TRP channels",
 desc:"A temperature scale from 10 °C (50 °F) to 55 °C (131 °F): cold receptors below 37 °C (98.6 °F), warm receptors from 37 to 45 °C (98.6 to 113 °F), and nociceptors for painful heat above that. Below the scale are a mint leaf at the cold end and a chili pepper at the hot end. The student clicks the mint leaf, and an arrow shows menthol opening TRPM8, the cold channel. Then the student clicks the chili, and an arrow shows capsaicin opening TRPV1, the heat channel.",
 pre:function(){S(["temp"]);},
 play:function(a){return waitOn(mint,pMint,a).then(function(){tMint.setAttribute("display","");return waitOn(chili,pChili,a);}).then(function(){tChili.setAttribute("display","");cap("Chili opens the heat channel, and mint opens the cold one.");});}},

{title:"Two waves of pain",
 text:["Nociceptors are free nerve endings found in the skin, joints, muscles, bones and internal organs, but not in the brain or spinal cord. They respond to strong stimuli that damage tissue or could damage it. Their signals travel to the dorsal horn in two kinds of fiber. A-delta fibers are thin and have myelin, and they conduct at about 12 to 30 meters per second. C fibers are thin and have no myelin, and they conduct at only about 0.5 to 2 meters per second. For comparison, the large myelinated A-beta fibers that carry touch conduct at 30 to 70 meters per second.","You stub your toe, far from the spinal cord."],
 ask:"Which signal reaches the cord first, and how does each one feel?",
 ans:["The A-delta signal arrives first, because fibers with myelin conduct faster. It produces fast pain: sharp, stabbing and easy to locate. The C fiber signal arrives later and produces slow pain: dull, throbbing and harder to pin down.","C fibers also carry itch, from a subtype of nociceptor found mostly in the skin. Scratching makes a mildly painful sensation that seems to interrupt the itch."],
 name:"fast pain and slow pain",
 desc:"A lower leg and foot at the upper left, with a table leg in front of the toes. Two fibers run from the foot to the spinal cord at the right: an A-delta fiber with myelin on top and a thin C fiber without myelin below. The student clicks the toe, the foot hits the table leg, and a navy dot races along the A-delta fiber while a maroon dot creeps along the C fiber. On a time line below, an early navy marker reads sharp, fast pain and a later maroon marker reads dull, slow pain.",
 pre:function(){S(["fib"]);},
 play:function(a){return waitOn(toeHit,pToe,a).then(function(){return tweenVal(0,22,160,a,function(v){place(foot,v,0);});}).then(function(){return Promise.all([run(fA,[[200,FY1],[760,FY1]],700,a,true).then(function(){fM1.setAttribute("display","");fT1.textContent="sharp, fast pain";}),run(fC,[[200,FY2],[760,FY2]],2600,a,true)]);}).then(function(){fM2.setAttribute("display","");fT2.textContent="dull, slow pain";cap("The fiber with myelin delivers the sharp pain first.");});}},

{title:"Touching a hot stove",
 text:["Nociceptor fibers end in the dorsal horn of the spinal cord, and from there they set off two different things at once."],
 ask:"You touch a hot stove. Why does your hand pull back before you feel the pain?",
 ans:["Because the nociceptor's signal goes two ways at once. In the spinal cord it synapses on interneurons for a protective spinal reflex, the withdrawal reflex, which pulls the hand back without waiting for the brain. It also synapses on second neurons that carry the signal up to the brain, where it becomes the conscious feeling of pain. The reflex loop is shorter, so it finishes first.","A frog whose brain has been destroyed still pulls its foot out of hot water. It cannot feel pain, but its spinal reflex still works. The advantage of a spinal reflex is speed: it does not wait for the brain."],
 name:"protective spinal reflex",
 desc:"An arm seen from the side, with the upper arm hanging down, the biceps on its front, the elbow bent and the forearm and hand reaching out over a stove. A slice of spinal cord sits at the right with a box above it for the brain. The student clicks the stove, and the burner heats. A maroon dot travels from the hand to the cord. From there a gray dot crosses an interneuron and a navy dot runs out a motor neuron to the biceps, which bulges and pulls the forearm up off the stove. Meanwhile a second maroon dot climbs slowly to the brain, and only then does the word ouch appear.",
 pre:function(){S(["stove"]);},
 play:function(a){return waitOn(stoveHit,pStove,a).then(function(){burner.setAttribute("fill",MAROON);heat.setAttribute("display","");return tweenVal(0,4,160,a,foreAngle);}).then(function(){return run(sN,STN,700,a);}).then(function(){
   var up=run(sU,STU,1700,a).then(function(){ouch.textContent="Ouch!";});
   var reflex=run(sI,STI,300,a).then(function(){return run(sM,STM,800,a);}).then(function(){biceps.setAttribute("rx",19);return tweenVal(4,-42,300,a,foreAngle);});
   return Promise.all([up,reflex]);}).then(function(){cap("The reflex pulls the hand away before you feel the pain.");});}},

{title:"Pain felt in the arm",
 text:["Pain from internal organs, called visceral pain, is often hard to pin down and may be felt far from where it starts. A man having a heart attack feels pain spreading into his neck, his shoulder and down his left arm, even though nothing is wrong with his arm."],
 ask:"Why would the brain place pain from the heart in the skin of the arm?",
 ans:["Pain fibers from the heart and from the skin of the left arm converge on the same second neurons in the dorsal horn, and those neurons carry the signal up a single ascending tract. The brain cannot tell which input started it. Pain signals from the skin are far more common than pain from organs, so the brain places the pain in the skin.","This is referred pain. Each organ refers pain to a predictable area. For example, irritation of the diaphragm from a gallbladder problem can be felt in the right shoulder and neck, which is why the location of referred pain helps with diagnosis."],
 name:"referred pain",
 desc:"A man seen from the front, with his heart on his left side and his left arm on your right. A maroon line from the heart and a navy line from the skin of the left arm both run into one segment of the spinal cord and end on the same neuron, and one line runs from that neuron up to the somatosensory cortex. The student clicks the heart, a dot travels from the heart to the cortex, and then the left arm turns maroon with an exclamation mark.",
 pre:function(){S(["ref"]);},
 play:function(a){return waitOn(heartHit,pHeart,a).then(function(){return run(rsig,[[236,206],[380,232],[550,240],[568,232],[620,150],[610,96]],1700,a);}).then(function(){refArm.setAttribute("fill","#E9B8AE");rMark.setAttribute("display","");cap("Both signals share one pathway, so the brain blames the arm.");});}},

{sec:"Pain and its modulation",comp:"Competency 14",
 title:"Why an injury gets more tender",
 text:["Chemicals released where tissue is injured can switch nociceptors on, or sensitize them by lowering their threshold. They include histamine from mast cells, prostaglandins from damaged cells, and substance P from the sensory neurons themselves."],
 ask:"Why does a sprained ankle hurt when you barely touch it, and how does aspirin help?",
 ans:["The chemicals at the injury have lowered the threshold of the nociceptors, so a touch that would not normally hurt now makes them fire. This increased sensitivity to pain where tissue is damaged is called inflammatory pain. Aspirin blocks the production of prostaglandins, which reduces the inflammation and the sensitizing of the nociceptors.","Pain that lasts for weeks or months is chronic pain, and it can be far greater than the nociceptors' activity would explain, because the nervous system itself has changed. When it comes from damage to the somatosensory system, as in diabetic neuropathy, it is called neuropathic pain."],
 name:"inflammatory pain",
 desc:"A slice of skin over the ankle with a nociceptor ending in it, a finger above the skin, and a recording box at the upper right for the pain neuron's firing. The student clicks the finger, it touches the healthy skin lightly, and the recording stays flat. Then colored dots for histamine, prostaglandins and substance P gather around the nerve ending. The student touches just as lightly again, and this time the recording fills with spikes.",
 pre:function(){S(["inf"]);},
 play:function(a){return waitOn(infHit,pInf1,a).then(function(){return press(a);}).then(function(){return lift(a);}).then(function(){chem.setAttribute("display","");chemL.setAttribute("display","");return wait(500,a);}).then(function(){return waitOn(infHit,pInf2,a);}).then(function(){return press(a);}).then(function(){return growTrain(infTr,function(k){return trainWin(610,150,250,0,k,Math.round(9*k),50);},900,a);}).then(function(){return lift(a);}).then(function(){cap("After an injury, a light touch makes the pain neuron fire.");});}},

{title:"Rubbing a bumped shin",
 text:["Pain can be turned down in the spinal cord before it is ever sent to the brain. The classic explanation is the gate control theory. In the dorsal horn, a pain fiber excites a neuron that carries pain up to the brain, called a projection neuron. A large touch fiber from the same skin also enters here and excites a small calming neuron, an inhibitory interneuron, that synapses on the projection neuron."],
 ask:"You bump your shin and rub it. Judging from this circuit, what does rubbing do to the pain signal that reaches the brain?",
 ans:["It reduces it. Rubbing fires the large touch fibers, which excite the inhibitory interneuron. The interneuron inhibits the projection neuron, so fewer pain signals go up to the brain, even though the pain fiber is still firing. This is how the gate control theory explains why rubbing an injury, or a TENS unit on the skin, can ease pain.","Your textbook adds an important update: the gate control model was built on some inaccurate assumptions, and it leaves out the glial cells and microglia of the spinal cord, so newer models are replacing it. What still holds is that pain can be turned down in the spinal cord before it reaches the brain. Your competency asks you to explain the gate, so know this circuit, and know that it is a simplified model."],
 name:"gate control theory",
 desc:"A shin at the left, with a pain fiber and a large touch fiber running from it into the dorsal horn. The pain fiber excites a navy neuron that sends signals to the brain, shown as a busy spike recording at the upper right. The student clicks the hand on the shin, and it rubs. A navy dot runs along the touch fiber to a gray calming neuron, which connects to the neuron to the brain, and the spike recording thins out.",
 pre:function(){S(["gate"]);gTr.setAttribute("d",gtrain(14)(1));},
 play:function(a){return run(gsN,[[56,330],[300,330],[420,300]],700,a).then(function(){return waitOn(rubHit,pRub,a);}).then(function(){
   var rub=tweenVal(0,1,900,a,function(k){place(rubHand,62,250+Math.sin(k*Math.PI*4)*22);});
   var sig=run(gsT,[[56,190],[300,190],[380,230]],700,a).then(function(){return run(gsI,[[404,250],[470,286]],400,a);});
   return Promise.all([rub,sig]);}).then(function(){return growTrain(gTr,gtrain(4),800,a);}).then(function(){cap("Rubbing turns the pain signal down inside the spinal cord.");});}},

{title:"The body's own painkillers",
 text:["Pain can also be turned down from above. In an emergency, when survival depends on ignoring an injury, pathways coming down from the brain inhibit the pain neurons in the spinal cord. Neurons in pain pathways release enkephalins and dynorphins, two of the three families of the body's own opioids, called endogenous opioids. The third, beta-endorphin, is made in the anterior pituitary from the same prohormone as ACTH."],
 ask:"The opioid acts on this circuit. Does it work before the synapse, after it, or both?",
 ans:["Both. Before the synapse, opioid receptors on the end of the first sensory neuron reduce how much neurotransmitter it releases, such as substance P. After the synapse, opioid receptors inhibit the second sensory neuron, making it harder to bring to threshold. Opioid drugs such as morphine act on these same receptors, but with long use a person can develop tolerance and need larger doses.","Other treatments act elsewhere along the pathway. Capsaicin patches act on TRP channels, ziconotide blocks calcium channels on pain neurons, and neuromodulation uses electrodes to inhibit pain pathways."],
 name:"endogenous opioids",
 desc:"The dorsal horn circuit with the pain fiber firing and a busy spike recording of pain signals going to the brain. A box at the bottom stands for the pathway coming down from the brainstem. The student clicks it, a gold dashed line runs up to the synapse, and two gold badges marked op appear, one on the end of the pain fiber, labeled before the synapse, and one on the neuron to the brain, labeled after the synapse. The spike recording thins out.",
 pre:function(){S(["gate","op"]);gTr.setAttribute("d",gtrain(14)(1));[opPre,opPost,opT1,opT2].forEach(function(g){g.setAttribute("display","none");});opLine.setAttribute("display","none");},
 play:function(a){return run(gsN,[[56,330],[300,330],[420,300]],700,a).then(function(){return waitOn(opHit,pOp,a);}).then(function(){opLine.setAttribute("display","");return reveal(opLine,700,a);}).then(function(){[opPre,opPost,opT1,opT2].forEach(function(g){g.setAttribute("display","");});return growTrain(gTr,gtrain(3),800,a);}).then(function(){cap("The body's opioids act on both sides of the synapse.");});}},

{sec:"Review",comp:"Competencies 5, 13 and 14",
 title:"Summary with the scientific terms",
 text:["Inside the cord, gray matter holds cell bodies and synapses, and white matter holds the tracts. Sensory cell bodies sit in the dorsal root ganglia. Fine touch, vibration and proprioception climb on the same side and cross in the medulla. Pain, temperature and coarse touch synapse in the dorsal horn and cross in the spinal cord. Both relay in the thalamus to the somatosensory cortex, where the area given to a body part follows its sensitivity and the map can reorganize. Voluntary movement travels down in the corticospinal tract, which crosses at the pyramids. Skin receptors include free nerve endings and Meissner, Pacinian, Ruffini and Merkel receptors, and temperature uses TRP channels.","Fast pain travels in A-delta fibers with myelin, and slow pain and itch in C fibers without myelin. Nociceptor signals drive spinal reflexes and ascending pain. Referred pain comes from convergence. Chemicals at an injury sensitize nociceptors, and the gate, the descending pathways and the endogenous opioids reduce pain transmission."],
 ask:"Without scrolling back: a patient has lost pain sensation in the left leg and lost position sense in the right leg. Which side of the cord is damaged, and how do you know?",
 ans:["The right half. Position sense travels up on the same side, so losing it in the right leg means the right dorsal columns are damaged. Pain crosses in the cord, so pain fibers from the left leg travel up on the right side above where they enter, and losing pain in the left leg also points to the right half.","If you could not get there, redraw the three pathways from memory and cut them, the way your Competency Study Guide asks."],
 desc:"All three pathways on the figure. The student clicks the right half of the cord slice, and it is shaded maroon. The small figure of the person then shows the right side shaded navy, labeled position sense lost, and the left side shaded maroon, labeled pain lost.",
 pre:function(){S(["lev"]);showPaths(["dc","st","cs"]);pathLabels(false);hits([cutRHit],LEVHIT);},
 play:function(a){return waitOn(cutRHit,pCutR,a).then(function(){gCutR.setAttribute("display","");return Promise.all([run(sigA,DC,1300,a),run(sigB,ST,1300,a)]);}).then(function(){gBody.setAttribute("display","");bodyShade(LOSS_M,LOSS_N,["pain and","temperature","lost"],["touch, position","and movement","lost"],true);cap("Where each pathway crosses tells you where the damage is.");});}}
];
