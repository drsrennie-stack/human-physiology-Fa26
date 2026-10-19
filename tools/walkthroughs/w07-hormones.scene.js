/* How hormones work. Oct 17 2026. Week 7, walkthrough 2 of 4.
   Week 7 competencies 7 to 11: hormone classes, transport and half life,
   receptors and target response, hormone interactions, and control of
   hormone release. The hypothalamic-pituitary axes are left to walkthrough 3.
   Figures, each shown and hidden per step:
   - intro: an endocrine cell, a capillary, a target cell with receptors and a
     cell without them (reused, relabeled, for the review with insulin)
   - make: a peptide-making cell (rough ER, Golgi, stored vesicles) beside a
     steroid-making cell (smooth ER, cholesterol droplet), over a capillary
   - target: one target cell with a surface receptor and a receptor inside the
     cell, a nucleus with a gene
   - amine: tyrosine sent to an adrenal medulla cell and a thyroid cell, and on
     to a surface receptor and a nuclear receptor
   - blood: a capillary with steroid molecules and carrier proteins
   - half: the half life graph with the liver and a kidney
   - epi: an adrenal gland releasing epinephrine to an airway, a small artery
     in the skin and gut, and the heart
   - dose: a target cell's receptors and its dose-response curve
   - syn, perm, anta: synergism, permissiveness and antagonism
   - pth, neur, troph: the humoral, neural and hormonal triggers
   Every step the student acts in uses promptAt and waitOn from w05-kit.js,
   so Next stays locked until the student has done the action. */

/* ---- small shared drawings ---- */
function hexPts(cx,cy,r){var p=[];for(var k=0;k<6;k++){var a=Math.PI/180*(60*k+30);p.push((cx+r*Math.cos(a)).toFixed(1)+","+(cy+r*Math.sin(a)).toFixed(1));}return p.join(" ");}
/* a peptide molecule: a short chain of beads */
function molP(p,col){var g=el("g",{},p);[-8,0,8].forEach(function(d){el("circle",{cx:d,cy:0,r:5,fill:col||GDEEP,stroke:"#fff","stroke-width":1.5},g);});g.setAttribute("display","none");return g;}
/* a steroid molecule: a ring */
function molS(p){var g=el("g",{},p);el("polygon",{points:hexPts(0,0,8),fill:MAROON,stroke:"#fff","stroke-width":1.5},g);g.setAttribute("display","none");return g;}
/* a gold button drawn in the figure */
function chip(p,x,y,w,h,s,size){var g=el("g",{tabindex:"0",role:"button","aria-label":s},p);g._r=el("rect",{x:x,y:y,width:w,height:h,rx:h/2,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},g);g._t=tx(g,x+w/2,y+h/2+5,s,"tn",size||14,"middle");g._s=s;return g;}
function chipSet(c,done){c._r.setAttribute("fill",done?"#EEF0F3":"#FFF6D6");c._r.setAttribute("stroke",done?INK2:GOLD);c._r.setAttribute("stroke-width",done?1.5:3);c._t.textContent=(done?"✓ ":"")+c._s;}
function lerp(a,b,k){return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k];}
function show(list,on){list.forEach(function(g){g.setAttribute("display",on?"":"none");});}
/* a receptor cup on a membrane, opening toward the side the hormone comes from (dir -1 up, 1 down) */
function cup(p,x,y,dir,col){return el("path",{d:"M"+(x-9)+" "+(y+dir*14)+" L"+(x-9)+" "+(y-dir*4)+" L"+(x+9)+" "+(y-dir*4)+" L"+(x+9)+" "+(y+dir*14),fill:"none",stroke:col||NAVY,"stroke-width":4,"stroke-linejoin":"round"},p);}
/* a kidney, seen from the front */
function kidney(p,cx,cy,s){return el("path",{d:"M"+(cx+10*s)+" "+(cy-44*s)+" C"+(cx-40*s)+" "+(cy-50*s)+" "+(cx-46*s)+" "+(cy+40*s)+" "+(cx+4*s)+" "+(cy+46*s)+" C"+(cx+34*s)+" "+(cy+48*s)+" "+(cx+42*s)+" "+(cy+22*s)+" "+(cx+22*s)+" "+(cy+8*s)+" C"+(cx+14*s)+" "+(cy+2*s)+" "+(cx+14*s)+" "+(cy-4*s)+" "+(cx+22*s)+" "+(cy-10*s)+" C"+(cx+44*s)+" "+(cy-26*s)+" "+(cx+36*s)+" "+(cy-42*s)+" "+(cx+10*s)+" "+(cy-44*s)+" Z",fill:"#E9CFC9",stroke:MAROON,"stroke-width":2.5},p);}
/* a thyroid gland: two lobes joined by an isthmus */
function thyroid(p,cx,cy,rx,ry){var g=el("g",{},p);
  el("rect",{x:cx-rx,y:cy+ry*0.25,width:rx*2,height:ry*0.3,rx:8,fill:"#E9B8AE",stroke:MAROON,"stroke-width":2.5},g);
  el("ellipse",{cx:cx-rx,cy:cy,rx:rx*0.95,ry:ry,fill:"#E9B8AE",stroke:MAROON,"stroke-width":2.5},g);
  el("ellipse",{cx:cx+rx,cy:cy,rx:rx*0.95,ry:ry,fill:"#E9B8AE",stroke:MAROON,"stroke-width":2.5},g);
  return g;}

/* ======================= intro: a hormone and its target (step 1, review) ======================= */
var gIn=G("intro");
el("rect",{x:20,y:270,width:860,height:60,fill:FLUID},gIn);
el("line",{x1:20,y1:270,x2:880,y2:270,stroke:FLOW,"stroke-width":3},gIn);el("line",{x1:20,y1:330,x2:880,y2:330,stroke:FLOW,"stroke-width":3},gIn);
tx(gIn,30,306,"blood","t",14,"start");
arrow(gIn,800,350,860,350,INK2,3);tx(gIn,790,355,"blood flow","t",12,"end");
var inGland=el("ellipse",{cx:170,cy:160,rx:120,ry:76,fill:TISS,stroke:MAROON,"stroke-width":3},gIn);
el("circle",{cx:130,cy:150,r:26,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2},gIn);
var inVes=el("g",{},gIn);[[205,190],[232,168],[248,200],[190,214],[222,214]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:9,fill:"#fff",stroke:GDEEP,"stroke-width":2},inVes);el("circle",{cx:q[0],cy:q[1],r:3.5,fill:GDEEP},inVes);});
var inGT=tx(gIn,170,66,"endocrine cell","tn",15,"middle");
var inA=el("ellipse",{cx:530,cy:150,rx:110,ry:66,fill:"#fff",stroke:NAVY,"stroke-width":3},gIn);
el("circle",{cx:530,cy:140,r:22,fill:TINT,stroke:INK2,"stroke-width":2},gIn);
var IN_R=[[480,209],[530,216],[580,209]];
IN_R.forEach(function(q){cup(gIn,q[0],q[1],1,NAVY);});
var inAT=tx(gIn,530,66,"target cell: has the receptor","tn",15,"middle");
var inAR=tx(gIn,530,106,"","tm",15,"middle");
var inB=el("g",{},gIn);
el("ellipse",{cx:770,cy:150,rx:96,ry:66,fill:"#fff",stroke:INK2,"stroke-width":3},inB);
el("circle",{cx:770,cy:140,r:22,fill:TINT,stroke:INK2,"stroke-width":2},inB);
tx(inB,770,66,"no receptor for it","t",15,"middle");
var inBR=tx(inB,770,106,"","t",14,"middle");
var inH=[0,1,2,3,4,5].map(function(){return dot(gIn,GDEEP,8);});
/* review only: glucose in the blood and the insulin labels */
var inGlu=el("g",{},gIn);[[60,288],[110,312],[300,290],[360,314],[430,292],[640,288],[700,312],[760,292],[250,312],[520,306]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:5,fill:NAVY,opacity:.8},inGlu);});
var inRv=el("g",{},gIn);
tx(inRv,170,380,"trigger: blood glucose rises","tm",14,"middle");
tx(inRv,560,380,"insulin travels free in the plasma","t",14,"middle");
tx(inRv,560,402,"half life: about 5 minutes","t",14,"middle");
var inHit=el("ellipse",{cx:170,cy:160,rx:124,ry:80,fill:"transparent"},gIn);
var inBloodHit=el("rect",{x:20,y:262,width:860,height:76,fill:"transparent"},gIn);
var pIn=promptAt(gIn,300,420,["Click the endocrine cell","to release its hormone"],210,248,170,160,60);
var pInRv=promptAt(gIn,330,450,["Click the blood to raise blood glucose"],420,330,450,300,36);
function introRun(a){
  var all=inH.map(function(d,i){var path=i<3?[[210,205],[210,300],[IN_R[i][0],300],[IN_R[i][0],IN_R[i][1]+8]]:[[210,205],[210,300],[880,288+(i-3)*12]];
    return wait(i*260,a).then(function(){return run(d,path,1600,a,i<3);});});
  return Promise.all(all).then(function(){inA.setAttribute("fill","#E6EAF3");inAR.textContent="responds";});
}

/* ======================= make: peptide and steroid production lines (steps 2, 3) ======================= */
var gMk=G("make");
el("rect",{x:20,y:395,width:860,height:60,fill:FLUID},gMk);
el("line",{x1:20,y1:395,x2:880,y2:395,stroke:FLOW,"stroke-width":3},gMk);el("line",{x1:20,y1:455,x2:880,y2:455,stroke:FLOW,"stroke-width":3},gMk);
tx(gMk,30,430,"blood","t",14,"start");
el("rect",{x:30,y:70,width:400,height:300,rx:50,fill:TISS,stroke:MAROON,"stroke-width":3},gMk);
el("rect",{x:470,y:70,width:400,height:300,rx:50,fill:TISS,stroke:MAROON,"stroke-width":3},gMk);
tx(gMk,230,52,"a cell that makes a peptide","tn",15,"middle");tx(gMk,670,52,"a cell that makes a steroid","tn",15,"middle");
/* the peptide cell */
el("circle",{cx:95,cy:150,r:34,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2},gMk);tx(gMk,95,206,"nucleus","t",13,"middle");
[0,1,2].forEach(function(i){var y=118+i*22;el("path",{d:"M170 "+y+" q20 -12 40 0 t40 0 t40 0 t40 0",fill:"none",stroke:MAROON,"stroke-width":3},gMk);
  for(var k=0;k<8;k++)el("circle",{cx:176+k*20,cy:y+(k%2?6:-6),r:2.6,fill:NAVY},gMk);});
tx(gMk,250,96,"rough ER","t",13,"middle");
[0,1,2,3].forEach(function(i){el("path",{d:"M258 "+(206+i*10)+" q42 -16 84 0",fill:"none",stroke:GDEEP,"stroke-width":3},gMk);});
tx(gMk,300,262,"Golgi","t",13,"middle");
var VS=[[90,322],[130,332],[170,320],[210,334],[250,322],[290,332],[330,320],[370,330]];
var mkVes=VS.map(function(q){var g=el("g",{},gMk);el("circle",{r:13,fill:"#fff",stroke:GDEEP,"stroke-width":2.5},g);el("circle",{r:4.5,fill:GDEEP},g);place(g,q[0],q[1]);return g;});
var mkVesT=tx(gMk,230,296,"stored in vesicles","t",13,"middle");
var mkP=molP(gMk),mkOut=VS.map(function(){return molP(gMk);});
/* the steroid cell */
el("circle",{cx:535,cy:150,r:34,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2},gMk);tx(gMk,535,206,"nucleus","t",13,"middle");
[0,1,2].forEach(function(i){var y=118+i*22;el("path",{d:"M620 "+y+" q20 -12 40 0 t40 0 t40 0 t40 0",fill:"none",stroke:MAROON,"stroke-width":3},gMk);});
tx(gMk,700,96,"smooth ER","t",13,"middle");
el("ellipse",{cx:560,cy:300,rx:42,ry:28,fill:"#FFF6E0",stroke:GDEEP,"stroke-width":2.5},gMk);
tx(gMk,560,350,"cholesterol","t",13,"middle");
var mkGhost=el("circle",{cx:720,cy:300,r:20,fill:"none",stroke:INK2,"stroke-width":2,"stroke-dasharray":"4 4"},gMk);
var mkLeakT=tx(gMk,720,262,"a vesicle cannot hold it","tm",13,"middle");
var mkS=molS(gMk);
var mkErHit=el("rect",{x:160,y:96,width:190,height:76,fill:"transparent"},gMk);
var mkVesHit=el("rect",{x:66,y:300,width:330,height:52,fill:"transparent"},gMk);
var mkChHit=el("ellipse",{cx:560,cy:300,rx:50,ry:36,fill:"transparent"},gMk);
var pMkEr=promptAt(gMk,40,484,["Click the rough ER to make a batch of hormone"],240,176,250,134,46);
var pMkVes=promptAt(gMk,40,484,["Now click the stored vesicles to release them"],200,352,230,326,44);
var pMkCh=promptAt(gMk,460,484,["Click the cholesterol to make the hormone"],560,340,560,300,44);
function vesCount(n){mkVes.forEach(function(v,i){v.setAttribute("display",i<n?"":"none");place(v,VS[i][0],VS[i][1]);});}
function pepMake(a){
  var path=[[176,112],[330,118],[330,140],[300,210],VS[3]];
  return run(mkP,path,1200,a).then(function(){vesCount(4);return run(mkP,[[176,134],[330,140],[300,220],VS[4]],900,a);}).then(function(){vesCount(5);return run(mkP,[[176,156],[330,162],[300,230],VS[5]],900,a);}).then(function(){vesCount(6);});
}
function pepRelease(a){
  return tweenVal(0,1,700,a,function(k){for(var i=0;i<6;i++)place(mkVes[i],VS[i][0],VS[i][1]+(366-VS[i][1])*k);}).then(function(){
    vesCount(0);
    return Promise.all(mkOut.slice(0,6).map(function(m,i){return run(m,[[VS[i][0],372],[VS[i][0]+20,425],[VS[i][0]+120,425]],1200,a,true);}));
  });
}
function sterMake(a){
  return run(mkS,[[560,300],[640,140],[780,150],[720,300]],1500,a,true).then(function(){mkGhost.setAttribute("display","");return wait(500,a);})
    .then(function(){mkLeakT.setAttribute("display","");return run(mkS,[[720,300],[760,330],[790,380],[790,425],[860,425]],1300,a,true);});
}

/* ======================= target: where each one binds (step 4) ======================= */
var gTg=G("target");
tx(gTg,30,40,"outside the cell","t",13,"start");
el("rect",{x:100,y:100,width:700,height:330,rx:50,fill:"#fff",stroke:NAVY,"stroke-width":4},gTg);
el("ellipse",{cx:590,cy:300,rx:150,ry:86,fill:TINT,stroke:INK2,"stroke-width":2.5},gTg);
tx(gTg,590,242,"nucleus","t",13,"middle");
el("path",{d:"M470 300 q15 -12 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0",fill:"none",stroke:NAVY,"stroke-width":3},gTg);
var tgGene=el("rect",{x:566,y:290,width:50,height:20,rx:4,fill:GOLD,opacity:.55},gTg);tx(gTg,591,334,"a gene","t",12,"middle");
/* the surface receptor and its pathway */
el("rect",{x:238,y:86,width:24,height:32,rx:5,fill:NAVY},gTg);cup(gTg,250,84,-1,NAVY);
tx(gTg,276,132,"surface receptor","t",13,"start");
var tgEnz=el("rect",{x:180,y:240,width:110,height:40,rx:12,fill:"#fff",stroke:MAROON,"stroke-width":2.5},gTg);
tx(gTg,235,300,"an enzyme already there","t",13,"middle");
var tgSm=[0,1,2,3,4].map(function(){return dot(gTg,GOLD,5);});
var tgT1=tx(gTg,235,322,"seconds to minutes","tm",14,"middle");
/* the receptor inside the cell and its pathway */
var tgIR=el("rect",{x:684,y:150,width:34,height:20,rx:8,fill:NAVY},gTg);
tx(gTg,700,192,"receptor inside the cell","t",13,"middle");
var tgMrna=el("path",{d:"M0 0 q6 -6 12 0 t12 0 t12 0",fill:"none",stroke:MAROON,"stroke-width":3},gTg);
var tgProt=el("ellipse",{cx:380,cy:384,rx:24,ry:14,fill:MAROON},gTg);
var tgT2=tx(gTg,380,412,"new protein: 90 minutes or more","tm",14,"middle");
var tgPep=molP(gTg),tgSte=molS(gTg),tgCx=molS(gTg);
var tgBtn=chip(gTg,380,18,150,40,"release both");
var pTg=promptAt(gTg,40,470,["Click the button to release both hormones"],420,64,455,38,40);
function targetRun(a){
  var pep=run(tgPep,[[160,40],[250,74]],700,a,true).then(function(){return Promise.all(tgSm.map(function(d,i){return run(d,[[250,124],[200+i*16,256]],600,a,true);}));})
    .then(function(){tgEnz.setAttribute("fill","#F3C9C0");tgT1.setAttribute("display","");});
  var ste=run(tgSte,[[690,40],[690,100],[701,150]],1100,a,true).then(function(){tgSte.setAttribute("display","none");tgIR.setAttribute("display","none");tgCx.setAttribute("display","");return run(tgCx,[[701,160],[640,230],[591,288]],1000,a,true);})
    .then(function(){tgGene.setAttribute("opacity","1");tgMrna.setAttribute("display","");return tweenVal(0,1,1300,a,function(k){var p=lerp([580,300],[400,372],k);tgMrna.setAttribute("transform","translate("+p[0]+" "+p[1]+")");});})
    .then(function(){tgProt.setAttribute("display","");tgT2.setAttribute("display","");});
  return Promise.all([pep,ste]);
}

/* ======================= amine: one start, two behaviors (step 5) ======================= */
var gAm=G("amine");
var amTyr=box(gAm,340,20,220,44,"tyrosine, an amino acid","tn",15,GDEEP);
arrow(gAm,390,66,250,106,INK2,3);arrow(gAm,510,66,650,106,INK2,3);
el("rect",{x:40,y:112,width:360,height:176,rx:40,fill:TISS,stroke:MAROON,"stroke-width":3},gAm);
el("rect",{x:500,y:112,width:360,height:176,rx:40,fill:TISS,stroke:MAROON,"stroke-width":3},gAm);
tx(gAm,220,140,"adrenal medulla cell","tn",14,"middle");tx(gAm,680,140,"thyroid cell","tn",14,"middle");
var amLt=tx(gAm,220,176,"epinephrine: stored, like a peptide","tm",14,"middle"),amRt=tx(gAm,680,176,"thyroid hormone: acts like a steroid","tm",14,"middle");
var AV=[[130,250],[175,250],[220,250],[265,250],[310,250]];
var amVes=AV.map(function(q){var g=el("g",{},gAm);el("circle",{r:12,fill:"#fff",stroke:GDEEP,"stroke-width":2.5},g);el("circle",{r:4,fill:NAVY},g);place(g,q[0],q[1]);return g;});
el("rect",{x:20,y:302,width:860,height:52,fill:FLUID},gAm);
el("line",{x1:20,y1:302,x2:880,y2:302,stroke:FLOW,"stroke-width":3},gAm);el("line",{x1:20,y1:354,x2:880,y2:354,stroke:FLOW,"stroke-width":3},gAm);
tx(gAm,450,333,"blood","t",13,"middle");
var amCar=[[600,330],[780,330]].map(function(q){return el("ellipse",{cx:q[0],cy:q[1],rx:20,ry:11,fill:NAVY,opacity:.85},gAm);});
var amCarT=tx(gAm,860,333,"carrier","t",12,"end");
el("rect",{x:60,y:394,width:320,height:96,fill:"#fff",stroke:NAVY,"stroke-width":3},gAm);
el("rect",{x:520,y:394,width:320,height:96,fill:"#fff",stroke:NAVY,"stroke-width":3},gAm);
cup(gAm,220,394,-1,NAVY);
tx(gAm,220,440,"target cell:","t",13,"middle");tx(gAm,220,458,"receptor on the surface","t",13,"middle");
var amNuc=el("ellipse",{cx:680,cy:452,rx:110,ry:28,fill:TINT,stroke:INK2,"stroke-width":2},gAm);
tx(gAm,680,416,"target cell:","t",13,"middle");tx(gAm,680,457,"receptor in the nucleus","t",12,"middle");
var amE=dot(gAm,NAVY,7),amT=molS(gAm),amTyrD=dot(gAm,GDEEP,7),amTyrD2=dot(gAm,GDEEP,7);
var pAm=promptAt(gAm,600,40,["Click tyrosine"],566,42,450,42,44);
function amineRun(a){
  var L=run(amTyrD,[[400,66],[250,110],[220,250]],1000,a).then(function(){amVes[2].setAttribute("display","");return wait(500,a);})
    .then(function(){return tweenVal(250,284,500,a,function(v){place(amVes[2],220,v);});})
    .then(function(){amVes[2].setAttribute("display","none");return run(amE,[[220,290],[220,330],[220,394]],1100,a,true);})
    .then(function(){amLt.setAttribute("display","");});
  var R=run(amTyrD2,[[500,66],[650,110],[680,230]],1000,a).then(function(){return run(amT,[[680,230],[640,290],[600,318]],800,a,true);})
    .then(function(){return tweenVal(0,1,700,a,function(k){place(amT,600+60*k,318);amCar[0].setAttribute("cx",600+60*k);});})
    .then(function(){return wait(300,a);}).then(function(){return run(amT,[[660,318],[690,370],[700,400],[760,450]],1100,a,true);})
    .then(function(){amNuc.setAttribute("fill","#F3E3C0");amRt.setAttribute("display","");});
  return Promise.all([L,R]);
}

/* ======================= blood: carrier proteins and free hormone (steps 6, 8) ======================= */
var gBl=G("blood");
el("rect",{x:20,y:80,width:860,height:180,fill:FLUID},gBl);
el("line",{x1:20,y1:80,x2:880,y2:80,stroke:FLOW,"stroke-width":3},gBl);el("line",{x1:20,y1:260,x2:880,y2:260,stroke:FLOW,"stroke-width":3,"stroke-dasharray":"30 8"},gBl);
tx(gBl,30,106,"plasma inside a capillary","t",13,"start");
var blT=tx(gBl,870,106,"","tn",15,"end");
var blTot=tx(gBl,870,300,"","t",14,"end");
el("ellipse",{cx:450,cy:350,rx:150,ry:46,fill:TISS,stroke:MAROON,"stroke-width":2.5},gBl);
tx(gBl,450,356,"target cell","t",14,"middle");
var SEED=11;function rnd(){SEED=(SEED*16807)%2147483647;return (SEED-1)/2147483646;}
var BF=[];for(var i=0;i<40;i++)BF.push([60+rnd()*780,128+rnd()*112]);
var BSL=[];for(var k=0;k<20;k++){var c=k<10?k:k-10,r=k<10?k%2:1-(k-10)%2;BSL.push([92+c*78,170+r*58]);}
var blCar=BSL.map(function(q){var g=el("g",{},gBl);el("ellipse",{rx:26,ry:13,fill:NAVY,opacity:.85},g);g.setAttribute("display","none");place(g,q[0],q[1]);return g;});
var blH=BF.map(function(){return molS(gBl);});
function site(c,s){return [BSL[c][0]+(s?13:-13),BSL[c][1]-15];}
/* where each hormone sits when bound: hormones 0 to 18 on carriers 0 to 9, 19 on carrier 10, 20 to 38 on the rest */
var BB=[];for(var i=0;i<19;i++)BB.push(site(Math.floor(i/2),i%2));BB.push(site(10,0));
for(var i=0;i<19;i++){var s=i+1;BB.push(site(10+Math.floor(s/2),s%2));}
var blChipA=chip(gBl,40,300,210,40,"add carrier protein");
var blChipB=chip(gBl,40,300,250,40,"double the carrier protein");
var pBlA=promptAt(gBl,40,466,["Click the button to add the carrier proteins"],120,346,145,320,40);
var pBlB=promptAt(gBl,40,466,["Click the button to double the carrier protein"],130,346,165,320,40);
function blState(nCar,bound,free,hidden){
  blCar.forEach(function(g,i){g.setAttribute("display",i<nCar?"":"none");place(g,BSL[i][0],BSL[i][1]);});
  blH.forEach(function(h,i){if(hidden.indexOf(i)>=0||i>=bound.length+free.length+100){h.setAttribute("display","none");return;}h.setAttribute("display","");});
  bound.forEach(function(i){place(blH[i],BB[i][0],BB[i][1]);});free.forEach(function(i){place(blH[i],BF[i][0],BF[i][1]);});
}
function range(a,b){var o=[];for(var i=a;i<b;i++)o.push(i);return o;}
function carIn(from,to,a){return tweenVal(-420,0,700,a,function(v){for(var i=from;i<to;i++){blCar[i].setAttribute("display","");place(blCar[i],BSL[i][0]+v,BSL[i][1]);}});}
function bindAll(list,a){var st=list.map(function(i){return [blH[i]._x,blH[i]._y];});return tweenVal(0,1,900,a,function(k){list.forEach(function(i,j){var p=lerp(st[j],BB[i],k);place(blH[i],p[0],p[1]);});});}

/* ======================= half: half life (step 7) ======================= */
var gHf=G("half");
el("line",{x1:90,y1:370,x2:560,y2:370,stroke:NAVY,"stroke-width":2.5},gHf);el("line",{x1:90,y1:370,x2:90,y2:88,stroke:NAVY,"stroke-width":2.5},gHf);
tx(gHf,90,72,"hormone left in the blood","tn",14,"start");tx(gHf,325,398,"time after one release","t",14,"middle");
el("line",{x1:90,y1:230,x2:560,y2:230,stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"6 5"},gHf);
tx(gHf,82,234,"half","t",12,"end");tx(gHf,82,96,"all","t",12,"end");
function decay(th){return function(k){var d="",n=90,m=Math.floor(n*k);for(var i=0;i<=m;i++){var u=i/n;d+=(i?" L":"M")+(90+u*470).toFixed(1)+" "+(370-Math.pow(0.5,u/th)*280).toFixed(1);}return d;};}
var hfP=trainPath(gHf,GDEEP,4),hfS=trainPath(gHf,MAROON,4);
var TP=0.06,TS=0.42,XP=90+TP*470,XS=90+TS*470;
var hfMP=el("line",{x1:XP,y1:230,x2:XP,y2:370,stroke:GDEEP,"stroke-width":2,"stroke-dasharray":"4 4"},gHf);
var hfMS=el("line",{x1:XS,y1:230,x2:XS,y2:370,stroke:MAROON,"stroke-width":2,"stroke-dasharray":"4 4"},gHf);
var hfTP=el("g",{},gHf);tx(hfTP,196,300,"peptide, free:","t",13,"start");tx(hfTP,196,318,"half gone in minutes","t",13,"start");
var hfTS=el("g",{},gHf);tx(hfTS,XS+10,200,"steroid on carriers:","tm",13,"start");tx(hfTS,XS+10,218,"half gone much later","tm",13,"start");
el("path",{d:"M612 116 Q740 86 866 116 Q856 148 796 170 Q712 204 646 198 Q604 184 612 116 Z",fill:"#E3C2BA",stroke:MAROON,"stroke-width":2.5},gHf);
tx(gHf,742,246,"liver: breaks hormones down","t",13,"middle");
kidney(gHf,742,318,0.9);
tx(gHf,742,384,"kidney: filters free hormone","t",13,"middle");
var hfDots=[0,1,2,3,4,5].map(function(){return molP(gHf);});
var hfCar=el("g",{},gHf);el("ellipse",{rx:22,ry:12,fill:NAVY,opacity:.85},hfCar);el("polygon",{points:hexPts(-10,-14,7),fill:MAROON,stroke:"#fff","stroke-width":1.5},hfCar);el("polygon",{points:hexPts(10,-14,7),fill:MAROON,stroke:"#fff","stroke-width":1.5},hfCar);hfCar.setAttribute("display","none");
var hfChP=chip(gHf,90,424,210,40,"release a peptide");
var hfChS=chip(gHf,320,424,240,40,"release a bound steroid");
var pHfP=promptAt(gHf,600,470,["Click to release a peptide"],320,446,195,444,34);
var pHfS=promptAt(gHf,600,470,["Now release a bound steroid"],580,446,440,444,34);
function hfPep(a){
  var moves=hfDots.map(function(d,i){var dest=i%2?[700+i*10,320]:[700+i*10,150];return wait(i*120,a).then(function(){return run(d,[[100,100],[140+i*14,240],dest],900,a);});});
  return Promise.all([growTrain(hfP,decay(TP),1300,a)].concat(moves)).then(function(){show([hfMP,hfTP],true);});
}
function hfSte(a){
  return Promise.all([growTrain(hfS,decay(TS),2600,a),run(hfCar,[[110,110],[300,250],[500,340]],2600,a,true)]).then(function(){show([hfMS,hfTS],true);});
}

/* ======================= epi: one hormone, three tissues (step 9) ======================= */
var gEp=G("epi");
kidney(gEp,110,170,1);
el("path",{d:"M70 132 Q82 86 110 80 Q138 86 150 132 Q110 120 70 132 Z",fill:"#FFF6E0",stroke:GDEEP,"stroke-width":2.5},gEp);
tx(gEp,110,64,"adrenal gland","tn",14,"middle");tx(gEp,110,238,"kidney","t",12,"middle");
var EPX=[260,480,720];
el("path",{d:"M150 106 H840",fill:"none",stroke:FLOW,"stroke-width":14,opacity:.3,"stroke-linecap":"round"},gEp);
EPX.forEach(function(x){el("path",{d:"M"+x+" 106 V246",fill:"none",stroke:FLOW,"stroke-width":12,opacity:.3},gEp);});
tx(gEp,480,90,"epinephrine travels in the blood","t",13,"middle");
/* airway */
el("circle",{cx:260,cy:320,r:72,fill:TISS,stroke:MAROON,"stroke-width":2},gEp);
var epAm=el("circle",{cx:260,cy:320,r:44,fill:"none",stroke:MAROON,"stroke-width":12,opacity:.7},gEp);
var epAl=el("circle",{cx:260,cy:320,r:32,fill:"#fff",stroke:INK2,"stroke-width":2},gEp);
/* small artery */
el("circle",{cx:480,cy:320,r:72,fill:TISS,stroke:MAROON,"stroke-width":2},gEp);
var epVm=el("circle",{cx:480,cy:320,r:46,fill:"none",stroke:MAROON,"stroke-width":12,opacity:.7},gEp);
var epVl=el("circle",{cx:480,cy:320,r:34,fill:"#E9B8AE",stroke:INK2,"stroke-width":2},gEp);
/* heart */
var epHeart=el("g",{},gEp);var epHi=el("g",{},epHeart);
el("path",{d:"M-8 -52 C-10 -86 40 -92 46 -58",fill:"none",stroke:MAROON,"stroke-width":16,"stroke-linecap":"round"},epHi);el("path",{d:"M-8 -52 C-10 -86 40 -92 46 -58",fill:"none",stroke:"#E9B8AE","stroke-width":11,"stroke-linecap":"round"},epHi);[[6,-80,0,-98],[20,-84,20,-102],[34,-80,40,-96]].forEach(function(q){el("line",{x1:q[0],y1:q[1],x2:q[2],y2:q[3],stroke:MAROON,"stroke-width":5,"stroke-linecap":"round"},epHi);});el("path",{d:"M14 -46 L30 -74",fill:"none",stroke:MAROON,"stroke-width":14,"stroke-linecap":"round"},epHi);el("path",{d:"M14 -46 L30 -74",fill:"none",stroke:"#D9A79C","stroke-width":9,"stroke-linecap":"round"},epHi);el("path",{d:"M-46 -34 C-74 -4 -66 42 -28 70 C-12 82 4 80 22 64 C56 36 70 -2 54 -34 C40 -58 -24 -60 -46 -34 Z",fill:"#E9B8AE",stroke:MAROON,"stroke-width":3},epHi);el("path",{d:"M6 -50 C14 -10 4 30 -18 70",fill:"none",stroke:MAROON,"stroke-width":2,"stroke-dasharray":"5 4"},epHi);
place(epHeart,720,326);
[["airway","beta-2",260],["small artery, skin and gut","alpha-1",480],["heart","beta-1",720]].forEach(function(r){tx(gEp,r[2],420,r[0]+": "+r[1],"tn",14,"middle");});
var epE=[tx(gEp,260,444,"relaxes: airway widens","tm",14,"middle"),tx(gEp,480,444,"constricts: artery narrows","tm",14,"middle"),tx(gEp,720,444,"beats faster and harder","tm",14,"middle")];
var epD=EPX.map(function(){return dot(gEp,GDEEP,8);});
var epHit=el("circle",{cx:110,cy:110,r:46,fill:"transparent"},gEp);
var pEp=promptAt(gEp,190,40,["Click the adrenal gland to release epinephrine"],150,84,110,110,44);
function epiRun(a){
  return Promise.all(epD.map(function(d,i){return run(d,[[150,106],[EPX[i],106],[EPX[i],250]],1200,a);})).then(function(){
    var air=tweenVal(0,1,800,a,function(k){epAl.setAttribute("r",32+16*k);epAm.setAttribute("r",44+16*k);});
    var art=tweenVal(0,1,800,a,function(k){epVl.setAttribute("r",34-16*k);epVm.setAttribute("r",46-16*k);});
    var beat=tweenVal(0,4,1600,a,function(v){var s=1+0.1*Math.abs(Math.sin(v*Math.PI));epHi.setAttribute("transform","scale("+s.toFixed(3)+")");});
    return Promise.all([air,art,beat]);
  }).then(function(){epHi.setAttribute("transform","scale(1.05)");show(epE,true);});
}

/* ======================= dose: receptor number and sensitivity (step 10) ======================= */
var gDs=G("dose");
tx(gDs,200,92,"target cell","t",14,"middle");
el("circle",{cx:200,cy:230,r:120,fill:"#fff",stroke:NAVY,"stroke-width":4},gDs);
el("circle",{cx:200,cy:230,r:36,fill:TINT,stroke:INK2,"stroke-width":2},gDs);
var dsRec=[];for(var i=0;i<14;i++){var g=el("g",{},gDs);cup(g,0,0,-1,MAROON);dsRec.push(g);}
var dsN=tx(gDs,200,384,"","tn",15,"middle");
function dsLayout(n){dsN.textContent="receptors: "+n;dsRec.forEach(function(g,i){if(i>=n){g.setAttribute("display","none");return;}g.setAttribute("display","");var ang=360/n*i-90,rad=ang*Math.PI/180;g.setAttribute("transform","translate("+(200+120*Math.cos(rad)).toFixed(1)+" "+(230+120*Math.sin(rad)).toFixed(1)+") rotate("+(ang+90)+")");});}
el("line",{x1:440,y1:380,x2:860,y2:380,stroke:NAVY,"stroke-width":2.5},gDs);el("line",{x1:440,y1:380,x2:440,y2:88,stroke:NAVY,"stroke-width":2.5},gDs);
tx(gDs,440,72,"response","tn",14,"start");tx(gDs,650,408,"hormone concentration","t",14,"middle");
function sig(m){return function(k){var d="",n=70,q=Math.floor(n*k);for(var i=0;i<=q;i++){var u=i/n,f=1/(1+Math.exp(-(u-m)/0.07));d+=(i?" L":"M")+(440+u*420).toFixed(1)+" "+(380-f*270).toFixed(1);}return d;};}
var dsNorm=trainPath(gDs,NAVY,4),dsDown=trainPath(gDs,MAROON,4),dsUp=trainPath(gDs,GDEEP,4);
var dsTN=tx(gDs,664,256,"normal","tn",13,"start"),dsTD=tx(gDs,764,300,"fewer receptors","tm",13,"start"),dsTU=tx(gDs,556,200,"more receptors","t",13,"end");
var dsHi=chip(gDs,26,420,180,40,"weeks of high hormone",13),dsLo=chip(gDs,216,420,180,40,"weeks of low hormone",13);
var pDsHi=promptAt(gDs,440,470,["Click: weeks of high hormone"],210,446,116,440,34);
var pDsLo=promptAt(gDs,440,470,["Now click: weeks of low hormone"],400,446,306,440,34);
function dsChange(from,to,a){return tweenVal(from,to,700,a,function(v){dsLayout(Math.round(v));});}

/* ======================= syn, perm: two bar figures (steps 11, 12) ======================= */
function barFig(name,title,note){
  var g=G(name);
  el("line",{x1:380,y1:380,x2:860,y2:380,stroke:NAVY,"stroke-width":2.5},g);el("line",{x1:380,y1:380,x2:380,y2:88,stroke:NAVY,"stroke-width":2.5},g);
  tx(g,380,72,title,"tn",14,"start");if(note)tx(g,860,100,note,"t",12,"end");
  return g;
}
var BX=[470,620,770];
function bars(g,cols){return cols.map(function(c,i){return el("rect",{x:BX[i]-45,y:380,width:90,height:0,fill:c,opacity:.85},g);});}
function barTo(b,h,a){return tweenVal(0,h,700,a,function(v){b.setAttribute("y",380-v);b.setAttribute("height",v);});}
/* synergism */
var gSy=barFig("syn","rise in blood glucose","a sketch, not measured values");
el("path",{d:"M52 150 Q190 104 340 150 Q328 196 262 228 Q170 270 98 262 Q44 244 52 150 Z",fill:"#E3C2BA",stroke:MAROON,"stroke-width":3},gSy);
tx(gSy,170,196,"liver","tn",15,"middle");
el("rect",{x:40,y:320,width:300,height:44,fill:FLUID},gSy);el("line",{x1:40,y1:320,x2:340,y2:320,stroke:FLOW,"stroke-width":3},gSy);el("line",{x1:40,y1:364,x2:340,y2:364,stroke:FLOW,"stroke-width":3},gSy);
tx(gSy,48,392,"blood","t",13,"start");
var syB=bars(gSy,[GDEEP,NAVY,MAROON]),SYH=[70,50,190];
var sySum=el("g",{},gSy);el("line",{x1:718,y1:260,x2:822,y2:260,stroke:INK2,"stroke-width":2.5,"stroke-dasharray":"6 4"},sySum);tx(sySum,712,264,"the two added","t",12,"end");
var syC=[chip(gSy,405,398,130,38,"glucagon",13),chip(gSy,555,398,130,38,"epinephrine",13),chip(gSy,705,398,130,38,"both together",13)];
var syG=[];[[70,342],[100,330],[130,350],[160,336],[190,346],[220,332],[250,348],[280,338],[310,344],[85,352],[205,326],[295,328]].forEach(function(q){var d=el("circle",{cx:q[0],cy:q[1],r:5,fill:NAVY},gSy);syG.push(d);});
var pSy=[promptAt(gSy,40,470,["Click glucagon"],420,436,470,417,32),promptAt(gSy,40,470,["Now click epinephrine"],560,436,620,417,32),promptAt(gSy,40,470,["Now click both together"],710,436,770,417,32)];
function syGlu(n){syG.forEach(function(d,i){d.setAttribute("display",i<n?"":"none");});}
/* permissiveness */
var gPm=barFig("perm","how far the reproductive system matures");
el("rect",{x:142,y:96,width:40,height:300,rx:16,fill:"#F4F5F8",stroke:INK2,"stroke-width":2},gPm);
for(var i=0;i<9;i++)el("line",{x1:146,y1:112+i*32,x2:178,y2:112+i*32,stroke:INK2,"stroke-width":2},gPm);
var pmThy=thyroid(gPm,162,250,36,70);
tx(gPm,162,420,"thyroid gland","tn",14,"middle");
var pmB=bars(gPm,[MAROON,GDEEP,NAVY]),PMH=[90,4,270];
var pmT=[tx(gPm,470,280,"delayed","tm",14,"middle"),tx(gPm,620,360,"none","t",14,"middle"),tx(gPm,770,100,"full","tn",14,"middle")];
var pmC=[chip(gPm,400,398,140,38,"reproductive only",13),chip(gPm,550,398,140,38,"thyroid only",13),chip(gPm,700,398,140,38,"both",13)];
var pPm=[promptAt(gPm,40,470,["Click: reproductive hormones only"],420,436,470,417,32),promptAt(gPm,40,470,["Now click: thyroid hormone only"],560,436,620,417,32),promptAt(gPm,40,470,["Now click both"],710,436,770,417,32)];

/* ======================= anta: insulin and glucagon (step 13) ======================= */
var gAn=G("anta");
el("rect",{x:40,y:70,width:110,height:400,fill:FLUID},gAn);el("line",{x1:40,y1:70,x2:40,y2:470,stroke:FLOW,"stroke-width":3},gAn);el("line",{x1:150,y1:70,x2:150,y2:470,stroke:FLOW,"stroke-width":3},gAn);
tx(gAn,95,60,"blood","t",14,"middle");
el("rect",{x:200,y:150,width:520,height:300,rx:40,fill:TISS,stroke:MAROON,"stroke-width":3},gAn);
tx(gAn,460,438,"liver cell","tn",14,"middle");
el("path",{d:"M330 172 V136 M330 136 L314 110 M330 136 L346 110",fill:"none",stroke:NAVY,"stroke-width":6,"stroke-linecap":"round"},gAn);
el("path",{d:"M566 166 q4 -36 8 0 t8 0 t8 0 t8 0 t8 0 t8 0",fill:"none",stroke:INK2,"stroke-width":4},gAn);
tx(gAn,330,192,"insulin receptor","t",13,"middle");tx(gAn,590,192,"glucagon receptor","t",13,"middle");
var GLY=[];(function(){var cx=460,cy=310,n=0;for(var ring=0;ring<4;ring++){var m=ring?ring*7:1;for(var j=0;j<m;j++){var a=2*Math.PI*j/m,r=ring*15;GLY.push(el("circle",{cx:cx+r*Math.cos(a),cy:cy+r*Math.sin(a),r:6,fill:GDEEP,stroke:"#fff","stroke-width":1},gAn));}}})();
tx(gAn,560,314,"glycogen","t",13,"start");
el("rect",{x:810,y:190,width:40,height:260,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gAn);
var anLev=el("rect",{x:814,y:190,width:32,height:0,rx:5,fill:NAVY,opacity:.8},gAn);
tx(gAn,830,178,"blood glucose","tn",14,"middle");
function anLevel(f){var h=252*f;anLev.setAttribute("y",446-h);anLev.setAttribute("height",h);}
function glyN(n){GLY.forEach(function(c,i){c.setAttribute("display",i<n?"":"none");});}
var anGl=[0,1,2,3,4,5].map(function(){return dot(gAn,NAVY,6);});
var anIns=dot(gAn,NAVY,9),anGcg=dot(gAn,GDEEP,9);
var anC1=chip(gAn,260,36,140,40,"insulin"),anC2=chip(gAn,520,36,140,40,"glucagon");
var anT=tx(gAn,460,250,"","tm",14,"middle");
var pAn1=promptAt(gAn,430,124,["Click insulin first"],406,74,330,56,34),pAn2=promptAt(gAn,680,130,["Now click glucagon"],640,84,590,56,34);

/* ======================= pth: a change in the blood (step 14) ======================= */
var gPt=G("pth");
var ptThy=thyroid(gPt,200,240,48,90);
var PTG=[[152,184],[152,296],[248,184],[248,296]].map(function(q){return el("circle",{cx:q[0],cy:q[1],r:14,fill:"#F6D88A",stroke:GDEEP,"stroke-width":2.5},gPt);});
tx(gPt,200,128,"thyroid, seen from behind","t",13,"middle");tx(gPt,200,362,"four parathyroid glands","tn",14,"middle");
el("rect",{x:540,y:128,width:200,height:26,fill:"#F4F1E8",stroke:INK2,"stroke-width":2.5},gPt);
[[540,128],[540,154],[740,128],[740,154]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:17,fill:"#F4F1E8",stroke:INK2,"stroke-width":2.5},gPt);});
el("rect",{x:536,y:131,width:208,height:20,fill:"#F4F1E8"},gPt);
tx(gPt,640,200,"bone","t",13,"middle");
kidney(gPt,640,316,0.9);tx(gPt,640,388,"kidney","t",13,"middle");
var ptE=[tx(gPt,640,220,"releases Ca2+ into the blood","tm",13,"middle"),tx(gPt,640,408,"keeps more Ca2+ out of the urine","tm",13,"middle")];
el("rect",{x:820,y:110,width:40,height:290,rx:8,fill:"#fff",stroke:NAVY,"stroke-width":2.5},gPt);
var ptLev=el("rect",{x:824,y:110,width:32,height:0,rx:5,fill:FLOW,opacity:.8},gPt);
el("line",{x1:810,y1:221,x2:870,y2:221,stroke:INK2,"stroke-width":2,"stroke-dasharray":"4 3"},gPt);tx(gPt,804,225,"normal","t",12,"end");
tx(gPt,840,92,"blood Ca2+","tn",14,"middle");
function ptLevel(f){var h=282*f;ptLev.setAttribute("y",396-h);ptLev.setAttribute("height",h);}
var ptT=tx(gPt,420,250,"","tm",14,"middle");
var ptPth=[0,1,2,3].map(function(){return dot(gPt,GDEEP,8);}),ptCa=[0,1,2,3].map(function(){return dot(gPt,FLOW,7);});
var ptHit=el("rect",{x:800,y:100,width:80,height:310,fill:"transparent"},gPt);
var pPt=promptAt(gPt,300,470,["Click the gauge to lower blood Ca2+"],796,330,840,255,42);
function ptGlands(on){PTG.forEach(function(c){c.setAttribute("fill",on?MAROON:"#F6D88A");});}

/* ======================= neur: a signal from a neuron (step 15) ======================= */
var gNr=G("neur");
tx(gNr,170,62,"from the brain: a sudden fright","t",13,"middle");
arrow(gNr,170,72,170,100,INK2,3);
el("ellipse",{cx:170,cy:170,rx:90,ry:62,fill:"#fff",stroke:NAVY,"stroke-width":3},gNr);
el("path",{d:"M126 138 Q138 132 148 150 L160 166 L180 166 L192 150 Q202 132 214 138 L206 162 Q232 176 222 202 Q208 212 194 196 L180 180 L160 180 L146 196 Q132 212 118 202 Q108 176 134 162 Z",fill:TINT,stroke:INK2,"stroke-width":2},gNr);
tx(gNr,170,254,"spinal cord","t",13,"middle");
var nrBody=el("circle",{cx:212,cy:168,r:9,fill:NAVY},gNr);
var NRP=[[212,168],[300,226],[420,276],[560,300]];
poly(gNr,NRP,NAVY,4);
tx(gNr,340,214,"sympathetic neuron","tn",13,"start");
el("ellipse",{cx:640,cy:300,rx:180,ry:118,fill:"#FFF6E0",stroke:GDEEP,"stroke-width":3},gNr);
el("ellipse",{cx:640,cy:300,rx:96,ry:62,fill:TISS,stroke:MAROON,"stroke-width":2.5},gNr);
tx(gNr,640,166,"adrenal gland, cut open","tn",14,"middle");
tx(gNr,640,212,"cortex","t",13,"middle");tx(gNr,640,262,"medulla","tm",13,"middle");
var NRC=[];[[600,290],[628,290],[656,290],[684,290],[586,316],[614,316],[642,316],[670,316],[698,316],[614,340],[642,340],[670,340]].forEach(function(q){NRC.push(el("circle",{cx:q[0],cy:q[1],r:10,fill:"#F2D6CF",stroke:MAROON,"stroke-width":1.5},gNr));});
tx(gNr,640,392,"chromaffin cells","t",13,"middle");
el("path",{d:"M736 300 H880",fill:"none",stroke:FLOW,"stroke-width":12,opacity:.35},gNr);
tx(gNr,880,280,"to the blood","t",13,"end");
var nrT=[tx(gNr,492,252,"acetylcholine","tn",13,"start"),tx(gNr,820,330,"epinephrine","tm",13,"middle")];
var nrSig=dot(gNr,NAVY,9),nrAch=[0,1,2].map(function(){return dot(gNr,GOLD,5);}),nrEpi=[0,1,2,3].map(function(){return dot(gNr,MAROON,7);});
var nrHit=el("circle",{cx:200,cy:170,r:40,fill:"transparent"},gNr);
var pNr=promptAt(gNr,40,440,["Click the sympathetic neuron","in the spinal cord"],176,232,200,170,38);

/* ======================= troph: a signal from another hormone (step 16) ======================= */
var gTr=G("troph");
var trBox=box(gTr,40,60,300,64,"anterior pituitary\n(the next walkthrough)","tn",15);
el("path",{d:"M190 124 V300 H520",fill:"none",stroke:FLOW,"stroke-width":14,opacity:.3},gTr);
var trTsh=tx(gTr,214,214,"TSH, a trophic hormone","tm",14,"start");
el("rect",{x:620,y:110,width:40,height:360,rx:16,fill:"#F4F5F8",stroke:INK2,"stroke-width":2},gTr);
for(var i=0;i<11;i++)el("line",{x1:624,y1:126+i*32,x2:656,y2:126+i*32,stroke:INK2,"stroke-width":2},gTr);
thyroid(gTr,640,290,58,104);
var TRF=[];[[566,230],[592,256],[566,282],[592,308],[566,334],[592,204],[688,230],[714,256],[688,282],[714,308],[688,334],[714,204]].forEach(function(q){TRF.push(el("circle",{cx:q[0],cy:q[1],r:10,fill:"#FFF6E0",stroke:MAROON,"stroke-width":1.5},gTr));});
tx(gTr,640,92,"thyroid gland, from the front","tn",14,"middle");
el("path",{d:"M748 340 H860 V470",fill:"none",stroke:FLOW,"stroke-width":14,opacity:.3},gTr);
var trOut=el("g",{},gTr);tx(trOut,846,390,"thyroid hormone","tm",13,"end");tx(trOut,846,408,"(T3 and T4)","tm",13,"end");tx(trOut,846,426,"to the whole body","tm",13,"end");
var trD=[0,1,2,3].map(function(){return dot(gTr,GDEEP,8);}),trO=[0,1,2,3].map(function(){return dot(gTr,MAROON,7);});
var pTr=promptAt(gTr,260,160,["Click the box to release TSH"],300,128,190,92,44);

makeCap();
function resetAll(){
  /* intro */
  hide(inH);inA.setAttribute("fill","#fff");inAR.textContent="";inBR.textContent="";inGT.textContent="endocrine cell";inAT.textContent="target cell: has the receptor";
  inB.setAttribute("display","");inGlu.setAttribute("display","none");inRv.setAttribute("display","none");show([inHit],true);show([inBloodHit],false);inAR.setAttribute("class","tm");
  /* make */
  vesCount(3);hide(mkOut);hide([mkP,mkS]);show([mkGhost,mkLeakT],false);
  /* target */
  hide([tgPep,tgSte,tgCx].concat(tgSm));tgEnz.setAttribute("fill","#fff");tgIR.setAttribute("display","");tgGene.setAttribute("opacity",".55");show([tgMrna,tgProt,tgT1,tgT2],false);chipSet(tgBtn,false);
  /* amine */
  hide([amE,amT,amTyrD,amTyrD2]);amVes.forEach(function(v,i){v.setAttribute("display",i===2?"none":"");place(v,AV[i][0],AV[i][1]);});show([amLt,amRt],false);amCar[0].setAttribute("cx",600);amNuc.setAttribute("fill",TINT);
  /* blood */
  show([blChipA,blChipB],false);chipSet(blChipA,false);chipSet(blChipB,false);blT.textContent="";blTot.textContent="";
  /* half */
  hfP.setAttribute("d","");hfS.setAttribute("d","");show([hfMP,hfMS,hfTP,hfTS],false);hide(hfDots);hfCar.setAttribute("display","none");chipSet(hfChP,false);chipSet(hfChS,false);
  /* epi */
  hide(epD);epAl.setAttribute("r",32);epAm.setAttribute("r",44);epVl.setAttribute("r",34);epVm.setAttribute("r",46);epHi.setAttribute("transform","");show(epE,false);
  /* dose */
  dsLayout(8);dsNorm.setAttribute("d",sig(0.5)(1));dsDown.setAttribute("d","");dsUp.setAttribute("d","");show([dsTD,dsTU],false);chipSet(dsHi,false);chipSet(dsLo,false);
  /* syn, perm */
  syB.forEach(function(b){b.setAttribute("height",0);b.setAttribute("y",380);});sySum.setAttribute("display","none");syGlu(0);syC.forEach(function(c){chipSet(c,false);});
  pmB.forEach(function(b){b.setAttribute("height",0);b.setAttribute("y",380);});show(pmT,false);pmC.forEach(function(c){chipSet(c,false);});
  /* anta */
  glyN(8);anLevel(0.62);hide(anGl.concat([anIns,anGcg]));chipSet(anC1,false);chipSet(anC2,false);anT.textContent="";
  /* pth */
  ptLevel(0.62);ptGlands(false);show(ptE,false);hide(ptPth.concat(ptCa));ptT.textContent="";
  /* neur */
  hide([nrSig].concat(nrAch,nrEpi));show(nrT,false);NRC.forEach(function(c){c.setAttribute("fill","#F2D6CF");});
  /* troph */
  hide(trD.concat(trO));trTsh.setAttribute("display","none");trOut.setAttribute("display","none");TRF.forEach(function(c){c.setAttribute("fill","#FFF6E0");});
  cap("");
}
function S(l){only(l.concat(["cap"]));resetAll();}
/* the blood figure's two start states */
function bloodA(){blState(0,[],range(0,20),range(20,40));blT.textContent="free hormone: 20 of 20";}
function bloodB(){blState(10,range(0,19),[19],range(20,40));blT.textContent="free hormone: 1 of 20";}

/* ======================= steps ======================= */
var STEPS=[
{sec:"Three kinds of hormone",comp:"Competency 7",
 title:"Messages carried by the blood",
 text:["A hormone is a chemical made by specialized cells and released into the blood, which carries it to distant target cells where it acts at very low concentrations. The cells that make hormones are endocrine cells. Many of them sit together in endocrine glands, such as the thyroid, the adrenal glands and the pancreas.","The blood carries a hormone past almost every cell in the body, but only some cells respond. You saw why in Week 2: a signal molecule acts only on a cell that has a receptor for it. A cell with the right receptor is a target cell. Click the endocrine cell to release its hormone, and watch which cell responds."],
 name:"target cell",
 auto:true,
 desc:"On the left, an endocrine cell with hormone stored in small vesicles. A capillary runs across the middle of the figure. Above it on the right are two cells: a target cell with three receptors on its lower surface, and another cell with no receptor for this hormone. When the student clicks the endocrine cell, gold hormone dots leave it, enter the blood and flow to the right. Three dots bind the receptors on the target cell, which lights up and is labeled responds. The rest flow past the other cell, which does not respond.",
 pre:function(){S(["intro"]);},
 play:function(a){return waitOn(inHit,pIn,a).then(function(){return introRun(a);}).then(function(){inBR.textContent="no response";cap("Only the cell with the right receptor responds.");});}},

{title:"Peptide hormones are made ahead",
 text:["Hormones fall into three chemical classes: peptides, steroids and amines. Most hormones are peptides, chains of amino acids. Insulin, glucagon and parathyroid hormone are all peptides.","A peptide hormone is made like any protein meant for export. Ribosomes on the rough endoplasmic reticulum (rough ER) build a long, inactive chain called a preprohormone, which is trimmed to a prohormone inside the ER. The Golgi apparatus packages the prohormone into secretory vesicles, where enzymes cut it into the active hormone. Click the rough ER to make a batch of hormone, then click the stored vesicles to release them."],
 ask:"When the signal to release arrives, does the cell have to start making the hormone, or is hormone already waiting? And how does it get out of the cell?",
 ans:["Hormone is already waiting. A peptide-making cell builds its hormone ahead of time and stores it in secretory vesicles, so it can release it within moments of the signal. The vesicles fuse with the cell membrane and empty their contents outside the cell, a process called exocytosis, and the hormone moves into the blood.","Peptides dissolve easily in plasma because they are water soluble (lipophobic). That same property keeps them from crossing a cell membrane, so they have to act on receptors on the surface of the target cell."],
 name:"peptide hormone",
 desc:"Two cells side by side over a capillary. The left cell makes a peptide: it has a nucleus, rough ER dotted with ribosomes, a Golgi stack, and three stored vesicles near its lower membrane. The student clicks the rough ER, and gold peptide molecules travel from the rough ER through the Golgi into new vesicles, until six vesicles are stored. Then the student clicks the stored vesicles, which move to the membrane and empty, and the peptide molecules enter the blood.",
 pre:function(){S(["make"]);},
 play:function(a){return waitOn(mkErHit,pMkEr,a).then(function(){return pepMake(a);}).then(function(){return waitOn(mkVesHit,pMkVes,a);}).then(function(){return pepRelease(a);}).then(function(){cap("Peptides are made ahead, stored, and released by exocytosis.");});}},

{title:"Steroid hormones are made when needed",
 text:["Steroid hormones are all made from cholesterol. They include cortisol and aldosterone from the adrenal cortex, and estrogen, progesterone and testosterone from the ovaries and testes. Enzymes in the smooth endoplasmic reticulum, and in mitochondria, convert cholesterol into the hormone one step at a time.","Steroids are lipophilic, meaning they dissolve in lipids, so they move easily through cell membranes. Click the cholesterol droplet in the right-hand cell to make some hormone."],
 ask:"Why can't a steroid-making cell store its hormone in vesicles, the way a peptide-making cell does?",
 ans:["Because the hormone would leak right out. A steroid passes easily through any membrane, including the membrane of a vesicle, so the cell cannot keep a supply on hand. Instead it makes the hormone when it is needed, and the hormone diffuses out of the cell as soon as it is made. To release more, the cell has to make more.","Lipophilic molecules dissolve poorly in plasma, so most steroid molecules travel in the blood bound to carrier proteins. You will see that in the next section."],
 name:"steroid hormone",
 desc:"The same two cells. The right cell makes a steroid: it has a nucleus, smooth ER without ribosomes, and a cholesterol droplet. The student clicks the cholesterol, and a maroon steroid molecule travels through the smooth ER. A dashed vesicle outline appears around it, labeled a vesicle cannot hold it, and the steroid slips straight out of the vesicle, through the cell membrane and into the blood.",
 pre:function(){S(["make"]);},
 play:function(a){return waitOn(mkChHit,pMkCh,a).then(function(){return sterMake(a);}).then(function(){cap("A steroid leaks through membranes, so it cannot be stored.");});}},

{title:"Where each one binds",
 text:["How a hormone gets into the blood also decides where its receptor sits. You met both kinds of receptor in Week 2. Peptide hormones cannot cross the cell membrane, so they bind receptors on the cell surface, and most of these pass the message inside through second messengers such as cAMP. Steroid hormones diffuse into the cell and bind receptors in the cytoplasm or the nucleus, and the hormone and receptor together turn genes on or off.","Click the button to release a peptide and a steroid at the same moment."],
 ask:"Both hormones reach the same target cell together. Which response shows up first, and why?",
 ans:["The peptide's response comes first, within seconds to minutes. Its surface receptor sets off a second messenger, and the second messenger changes the activity of proteins the cell already has, such as enzymes and ion channels. The steroid's response is slower, usually 90 minutes or more, because the hormone and its receptor have to turn on a gene, and the cell then has to make messenger RNA and build a new protein before anything changes. This is called a genomic effect.","Some steroids also bind receptors on the cell membrane and cause fast effects that do not involve genes, but the classic steroid action is the slow one through genes."],
 name:"surface receptors and intracellular receptors",
 desc:"One large target cell with a nucleus. On its top surface is a receptor, and inside the cell, near the top right, is a second receptor. The student clicks the release both button. A peptide binds the surface receptor, small gold second messenger dots spread down to an enzyme that is already in the cell, and the enzyme lights up, labeled seconds to minutes. At the same time a steroid passes through the membrane, binds the receptor inside the cell, and the pair moves into the nucleus to a gene. Messenger RNA leaves the nucleus and a new protein appears, labeled new protein: 90 minutes or more.",
 pre:function(){S(["target"]);},
 play:function(a){return waitOn(tgBtn,pTg,a).then(function(){chipSet(tgBtn,true);return targetRun(a);}).then(function(){cap("The peptide acts in seconds. The steroid needs new protein.");});}},

{title:"Amines: one class, two behaviors",
 text:["The third class, the amine hormones, are small molecules made from a single amino acid. Melatonin, from the pineal gland, is made from tryptophan. The others are made from tyrosine: the catecholamines (epinephrine, norepinephrine and dopamine) and the thyroid hormones. They share a starting molecule, but they do not behave alike.","Click tyrosine to send it down two production lines: one in a cell of the adrenal medulla, which makes epinephrine, and one in a thyroid cell, which makes thyroid hormone."],
 ask:"Epinephrine and thyroid hormone both start as tyrosine. Which one behaves like a peptide, and which one behaves like a steroid?",
 ans:["Epinephrine behaves like a peptide. It dissolves in water, so the cell stores it in vesicles and releases it by exocytosis, and it binds receptors on the surface of its target cells. Thyroid hormone behaves like a steroid. It is lipophilic, travels in the blood mostly bound to carrier proteins, and binds receptors inside the cell, in the nucleus, where it turns genes on or off.","What decides it is the molecule itself: whether it dissolves in water or in lipid. Catecholamines are water soluble. Thyroid hormones, built from two tyrosines with iodine attached, are lipid soluble."],
 name:"amine hormones",
 desc:"Tyrosine sits at the top center, with arrows to two cells: an adrenal medulla cell on the left and a thyroid cell on the right. A capillary with carrier proteins runs below them, and below that are two target cells: one with a receptor on its surface, one with a receptor in its nucleus. The student clicks tyrosine. On the left, it becomes epinephrine stored in a vesicle, the vesicle empties into the blood, and epinephrine binds the surface receptor; the label reads epinephrine: stored, like a peptide. On the right, thyroid hormone leaves the cell, rides on a carrier protein, lets go, crosses into the target cell and reaches the nucleus; the label reads thyroid hormone: acts like a steroid.",
 pre:function(){S(["amine"]);},
 play:function(a){return waitOn(amTyr,pAm,a).then(function(){return amineRun(a);}).then(function(){cap("Same start, but they split by how they dissolve.");});}},

{sec:"Traveling in the blood",comp:"Competency 8",
 title:"Riding on a carrier protein",
 text:["Plasma is mostly water, so peptide hormones and catecholamines dissolve in it and travel free. Steroids and thyroid hormones dissolve poorly in water, so most of their molecules travel bound to carrier proteins. Some carriers are general, such as albumin, and some carry one hormone, such as thyroxine-binding globulin.","The drawing shows twenty molecules of a steroid in a capillary. Click the button to add the carrier proteins found in normal plasma."],
 ask:"Once most of the hormone is stuck to carriers, which molecules can leave the blood and reach the target cell?",
 ans:["Only the free, unbound molecules. A carrier protein is too large to leave the capillary, so hormone attached to it cannot reach a receptor. For cortisol, only about 5 to 10 percent of the hormone in plasma is free. For thyroxine, the main thyroid hormone, well under 1 percent is free.","The bound hormone is not wasted. As free hormone leaves the blood, some bound molecules let go of their carriers to take its place, so the bound hormone works as a reserve that keeps the free level steady."],
 name:"free hormone",
 desc:"A capillary with twenty maroon steroid molecules, all free, and a counter reading free hormone: 20 of 20. A target cell sits just outside the capillary. The student clicks add carrier protein. Ten navy carrier proteins slide in, nineteen of the molecules attach to them, and the counter drops to 1 of 20. The one free molecule leaves the capillary and enters the target cell. Then one bound molecule lets go of its carrier, and the counter reads 1 of 19.",
 pre:function(){S(["blood"]);bloodA();show([blChipA],true);},
 play:function(a){return waitOn(blChipA,pBlA,a).then(function(){chipSet(blChipA,true);return carIn(0,10,a);}).then(function(){return bindAll(range(0,19),a);})
   .then(function(){blT.textContent="free hormone: 1 of 20";return wait(500,a);}).then(function(){return run(blH[19],[[BF[19][0],BF[19][1]],[450,262],[450,336]],1100,a);})
   .then(function(){blT.textContent="free hormone: 0 of 19";return wait(400,a);}).then(function(){var s=[blH[18]._x,blH[18]._y];return tweenVal(0,1,700,a,function(k){var p=lerp(s,BF[19],k);place(blH[18],p[0],p[1]);});})
   .then(function(){blT.textContent="free hormone: 1 of 19";cap("Only free hormone can leave the blood and act.");});}},

{title:"How long a hormone lasts",
 text:["Hormones do not stay in the blood for long. Enzymes in the blood and tissues break them down, the liver changes them into forms the body can get rid of, and the kidneys filter them into the urine. The time it takes for half of a hormone to disappear from the blood is its half life.","Click each button to release one pulse of hormone, and watch how fast it disappears."],
 ask:"Which disappears from the blood faster, the free peptide or the bound steroid, and how does being bound protect the steroid?",
 ans:["The peptide disappears much faster. Free peptide molecules are exposed to the enzymes that break them down, and they are small enough for the kidneys to filter, so most peptide hormones have half lives of minutes. Insulin's half life is about 5 minutes. While a steroid rides on its carrier, it is shielded from those enzymes and too large to be filtered, so steroid half lives are longer: about an hour for cortisol. Thyroxine, almost all of it bound, lasts about a week.","A short half life lets the body change a hormone's level quickly. Stop releasing it, and it is gone within minutes. A long half life gives a steady level that changes slowly."],
 name:"half life",
 desc:"On the left, a graph of hormone left in the blood against time, with a dashed line at the halfway level. On the right, the liver, labeled breaks hormones down, and a kidney, labeled filters free hormone. The student clicks release a peptide: a gold curve drops steeply, peptide molecules travel to the liver and kidney, and a marker shows half gone in minutes. Then the student clicks release a bound steroid: a maroon curve falls slowly while a carrier protein with two steroid molecules drifts along, and a marker shows half gone much later.",
 pre:function(){S(["half"]);},
 play:function(a){return waitOn(hfChP,pHfP,a).then(function(){chipSet(hfChP,true);return hfPep(a);}).then(function(){return waitOn(hfChS,pHfS,a);}).then(function(){chipSet(hfChS,true);return hfSte(a);}).then(function(){cap("Free peptides vanish in minutes. Bound steroids linger.");});}},

{title:"More carrier, same free hormone",
 text:["The amount of carrier protein can change. During pregnancy, and in people taking estrogen, the liver makes more of the carrier for thyroid hormone, thyroxine-binding globulin.","The drawing starts with the blood from two steps ago: most of the hormone bound and a little free. Click the button to double the carrier protein."],
 ask:"Right after the carrier doubles, what happens to the free hormone? And once the gland has adjusted, which number has changed for good, the total hormone or the free hormone?",
 ans:["At first the free hormone falls, because the new carriers soak it up. The body's feedback control responds to free hormone, not total hormone, so the gland releases more until the free level is back to normal. In the end the total hormone in the blood has risen, but the free hormone, the part that acts, is normal, and the person feels well.","That is why a test of total hormone can mislead. When carrier levels may have changed, the useful number is the free hormone level."],
 name:"total hormone and free hormone",
 desc:"The capillary with ten carrier proteins, nineteen bound steroid molecules and one free one. The counter reads free hormone: 1 of 20, and a label reads total hormone: 20. The student clicks double the carrier protein. Ten more carriers slide in, the free molecule attaches to one, and the counter drops to 0 of 20. Then twenty new molecules flow in from the gland, nineteen of them attach, and one stays free. The counter reads free hormone: 1 of 40, and the label reads total hormone: 40.",
 pre:function(){S(["blood"]);bloodB();blTot.textContent="total hormone: 20";show([blChipB],true);},
 play:function(a){return waitOn(blChipB,pBlB,a).then(function(){chipSet(blChipB,true);return carIn(10,20,a);}).then(function(){return bindAll([19],a);})
   .then(function(){blT.textContent="free hormone: 0 of 20";cap("Free hormone falls, so the gland releases more.");return wait(900,a);})
   .then(function(){var nw=range(20,40);nw.forEach(function(i){blH[i].setAttribute("display","");place(blH[i],24,130+((i*37)%110));});
     return tweenVal(0,1,1400,a,function(k){nw.forEach(function(i){var d=i<39?BB[i]:BF[i],p=lerp([24,130+((i*37)%110)],d,k);place(blH[i],p[0],p[1]);});});})
   .then(function(){blT.textContent="free hormone: 1 of 40";blTot.textContent="total hormone: 40";cap("Total hormone rose, but free hormone is back to normal.");});}},

{sec:"Receptors decide the response",comp:"Competency 9",
 title:"One hormone, three tissues",
 text:["A hormone's message is not in the hormone alone. The response depends on which receptor the target cell has and which pathway that receptor turns on inside the cell. Epinephrine, released into the blood by the adrenal medulla, shows this well, because it binds several kinds of adrenergic receptor.","The smooth muscle around the airways has beta-2 receptors. The smooth muscle in the walls of small arteries in the skin and the gut has alpha-1 receptors. Heart muscle has beta-1 receptors. Click the adrenal gland to release epinephrine."],
 ask:"The same epinephrine reaches all three tissues. What will it do to the airway, the small artery and the heart?",
 ans:["The airway's smooth muscle relaxes and the airway widens, the artery's smooth muscle contracts and the artery narrows, and the heart beats faster and more forcefully. Two of the responses run in opposite directions, even though the hormone is identical. The difference is in the target cells, which carry different receptors linked to different pathways. Beta receptors raise cAMP, which relaxes airway smooth muscle and speeds up heart muscle. Alpha-1 receptors raise Ca2+ inside smooth muscle cells, which makes the artery contract.","Together these help during exercise or danger: wider airways bring in more air, a faster heart pumps more blood, and narrowing the arteries in the skin and gut sends more of that blood to the muscles. The small arteries in skeletal muscle have beta-2 receptors, so epinephrine widens them."],
 name:"adrenergic receptors: alpha-1, beta-1 and beta-2",
 desc:"An adrenal gland sits on top of a kidney at the upper left. A blood vessel runs from it across the top of the figure and branches down to three tissues: an airway in cross section with a ring of smooth muscle, labeled beta-2; a small artery in the skin and gut in cross section, labeled alpha-1; and the heart, labeled beta-1. The student clicks the adrenal gland, and epinephrine dots travel to all three. The airway opens wider, the artery narrows, and the heart beats quickly.",
 pre:function(){S(["epi"]);},
 play:function(a){return waitOn(epHit,pEp,a).then(function(){return epiRun(a);}).then(function(){cap("Same hormone, different receptors, different responses.");});}},

{title:"Changing the number of receptors",
 text:["Target cells can change how many receptors they have. When hormone levels stay high for a long time, a cell removes receptors from its membrane, which is called down-regulation. When hormone levels stay low, it adds receptors, which is called up-regulation. You met both in Week 2 as ways a cell adjusts its sensitivity.","The graph shows how strongly the cell responds at each hormone concentration, its dose-response curve. Click each button to see what weeks of high or low hormone do to the receptors and to the curve."],
 ask:"After weeks of very high hormone, the cell has fewer receptors. Will it now need more hormone or less to give the same response?",
 ans:["More. With fewer receptors, less of the hormone finds a receptor at any concentration, so the curve shifts to the right and the cell is less sensitive. After weeks of low hormone, the cell adds receptors, the curve shifts to the left, and the cell is more sensitive. The hormone has not changed. The target cell has.","Down-regulation is part of the reason some drugs lose their effect with heavy use, a change called tolerance."],
 name:"up-regulation and down-regulation",
 desc:"On the left, a round target cell with eight receptors on its surface. On the right, a graph of response against hormone concentration with a navy S-shaped curve labeled normal. The student clicks weeks of high hormone: the cell drops to four receptors, and a maroon curve labeled fewer receptors appears to the right of the normal one. Then the student clicks weeks of low hormone: the cell grows to fourteen receptors, and a gold curve labeled more receptors appears to the left.",
 pre:function(){S(["dose"]);},
 play:function(a){return waitOn(dsHi,pDsHi,a).then(function(){chipSet(dsHi,true);return dsChange(8,4,a);}).then(function(){dsTD.setAttribute("display","");return growTrain(dsDown,sig(0.72),900,a);})
   .then(function(){return waitOn(dsLo,pDsLo,a);}).then(function(){chipSet(dsLo,true);return dsChange(4,14,a);}).then(function(){dsTU.setAttribute("display","");return growTrain(dsUp,sig(0.3),900,a);})
   .then(function(){cap("Fewer receptors, less sensitive. More receptors, more sensitive.");});}},

{sec:"Hormones working together",comp:"Competency 10",
 title:"Synergism",
 text:["Cells are rarely exposed to only one hormone at a time, and hormones can change one another's effects. Glucagon, epinephrine and cortisol all raise blood glucose. Each one alone raises it by a certain amount.","Click each button in turn: glucagon alone, epinephrine alone, and then the two together."],
 ask:"When glucagon and epinephrine are given together, will blood glucose rise by the sum of their separate effects, by less, or by more?",
 ans:["By more. The combined rise is greater than the two separate rises added together. When the effect of two or more hormones together is greater than the sum of their separate effects, it is called synergism. Cortisol joins in too: all three together raise blood glucose more than their separate effects added up, which is part of why blood glucose climbs during severe stress or illness.","Synergism does not require the hormones to share a receptor. Each acts through its own receptor and pathway, and the pathways reinforce one another."],
 name:"synergism",
 desc:"On the left, the liver above a strip of blood. On the right, a bar graph of the rise in blood glucose, drawn as a sketch. The student clicks glucagon, and a gold bar rises; then epinephrine, and a navy bar rises; then both together. A dashed line marks where the third bar would stop if the two effects simply added, and the maroon bar for both together rises well past it. More glucose dots appear in the blood each time.",
 pre:function(){S(["syn"]);},
 play:function(a){var k=0;function one(){if(k>=3)return Promise.resolve();var i=k++;return waitOn(syC[i],pSy[i],a).then(function(){chipSet(syC[i],true);syGlu(i===2?12:i===0?4:3);if(i===2)sySum.setAttribute("display","");return barTo(syB[i],SYH[i],a);}).then(function(){return wait(300,a);}).then(one);}
   return one().then(function(){cap("Together, the rise is bigger than the sum.");});}},

{title:"Permissiveness",
 text:["In some pairs, one hormone cannot exert its full effect unless a second hormone is present, even though the second hormone may do little on its own. This is permissiveness. Silverthorn uses the maturation of the reproductive system as the example, and OpenStax points to the same pair: thyroid hormone and the reproductive hormones.","Click each button to see how far the reproductive system matures with the reproductive hormones but no thyroid hormone, with thyroid hormone alone, and with both."],
 ask:"Thyroid hormone does almost nothing to the reproductive system by itself. Why does it still matter?",
 ans:["Because without it, the reproductive hormones cannot do their full job. With the reproductive hormones but no thyroid hormone, maturation is delayed. Thyroid hormone alone causes no maturation at all. With both, maturation is normal. Thyroid hormone is permissive: it permits the reproductive hormones to exert their full effect.","Thyroid hormone is permissive for other hormones too. It increases the number of beta receptors in tissues such as the heart, which lets epinephrine have its full effect. This is one reason a person with too much thyroid hormone can have a racing heart."],
 name:"permissiveness",
 desc:"On the left, a thyroid gland on the front of the windpipe. On the right, a bar graph of how far the reproductive system matures. The student clicks reproductive only, and a short maroon bar rises, labeled delayed. Then thyroid only, and the bar barely leaves the axis, labeled none. Then both, and a tall navy bar rises to the top, labeled full.",
 pre:function(){S(["perm"]);},
 play:function(a){var k=0;function one(){if(k>=3)return Promise.resolve();var i=k++;return waitOn(pmC[i],pPm[i],a).then(function(){chipSet(pmC[i],true);return barTo(pmB[i],PMH[i],a);}).then(function(){pmT[i].setAttribute("display","");return wait(300,a);}).then(one);}
   return one().then(function(){cap("Reproductive hormones need thyroid hormone to work fully.");});}},

{title:"Antagonism",
 text:["Sometimes two hormones work against each other. Insulin lowers blood glucose, and glucagon raises it. Both act on liver cells, which can store glucose as glycogen, a large branched chain of glucose molecules.","Click insulin first, then glucagon, and watch the liver cell and the blood glucose gauge."],
 ask:"Insulin and glucagon act on the same liver cell with opposite effects. Do they compete for the same receptor?",
 ans:["No. Insulin binds its own receptor, a receptor enzyme, and glucagon binds a different receptor, a G protein coupled receptor. Insulin tells the liver cell to take up glucose and store it as glycogen, so blood glucose falls. Glucagon tells it to break glycogen down and release glucose, so blood glucose rises.","Two hormones with opposite effects that act through different receptors and pathways are functional antagonists. Antagonism can also happen when two molecules compete for the same receptor, as many drugs do, but that is a different mechanism."],
 name:"functional antagonism",
 desc:"A blood vessel runs down the left side, a large liver cell fills the middle with a cluster of glycogen inside, and a gauge on the right shows blood glucose. On the top of the liver cell are two different receptors: the insulin receptor and the glucagon receptor. The student clicks insulin: it binds its receptor, glucose dots move from the blood into the cell, the glycogen cluster grows, and the gauge falls. Then the student clicks glucagon: it binds its own receptor, the glycogen cluster shrinks, glucose dots move out into the blood, and the gauge rises.",
 pre:function(){S(["anta"]);},
 play:function(a){return waitOn(anC1,pAn1,a).then(function(){chipSet(anC1,true);return run(anIns,[[330,60],[330,106]],500,a,true);})
   .then(function(){anT.textContent="glucose stored";return Promise.all(anGl.map(function(d,i){return wait(i*120,a).then(function(){return run(d,[[95,120+i*50],[200,300],[440,310]],900,a);});}).concat([tweenVal(8,22,1500,a,function(v){glyN(Math.round(v));}),tweenVal(0.62,0.3,1500,a,anLevel)]));})
   .then(function(){return waitOn(anC2,pAn2,a);}).then(function(){chipSet(anC2,true);anIns.setAttribute("display","none");return run(anGcg,[[590,60],[590,124]],500,a,true);})
   .then(function(){anT.textContent="glucose released";return Promise.all(anGl.map(function(d,i){return wait(i*120,a).then(function(){return run(d,[[440,310],[200,300],[95,120+i*50]],900,a);});}).concat([tweenVal(22,8,1500,a,function(v){glyN(Math.round(v));}),tweenVal(0.3,0.62,1500,a,anLevel)]));})
   .then(function(){cap("Opposite effects, through two different receptors.");});}},

{sec:"What tells a gland to release",comp:"Competency 11",
 title:"A change in the blood",
 text:["Endocrine cells release their hormone in response to one of three kinds of trigger: a change in the blood, a signal from a neuron, or another hormone. OpenStax calls these humoral, neural and hormonal stimuli, and Silverthorn describes the same three as the starting points of endocrine reflex pathways.","In the simplest case, the endocrine cell itself senses a change in the blood and responds, with no nerve or other hormone involved. Four small parathyroid glands sit on the back of the thyroid, and their cells sense the Ca2+ concentration in the blood. Click the gauge to lower blood Ca2+."],
 ask:"Blood Ca2+ falls. What will the parathyroid glands do, and what will stop them once Ca2+ is back to normal?",
 ans:["They release parathyroid hormone (PTH). PTH acts on bone to release Ca2+ into the blood, and on the kidneys to keep more Ca2+ from being lost in the urine. As blood Ca2+ rises back to normal, the parathyroid cells sense it and release less PTH. That is negative feedback: the response removes the stimulus.","A trigger that is a change in the blood is a humoral stimulus. Another example is the pancreas: when blood glucose rises after a meal, its beta cells sense the glucose directly and release insulin."],
 name:"humoral stimulus",
 desc:"On the left, the thyroid seen from behind, with four small parathyroid glands on its back. In the middle, a bone and a kidney. On the right, a gauge of blood Ca2+ with a normal mark. The student clicks the gauge, and the level falls below normal. The parathyroid glands light up and gold PTH dots travel to the bone and the kidney, labeled releases Ca2+ into the blood and keeps more Ca2+ out of the urine. Ca2+ dots travel back to the gauge, the level returns to normal, and the parathyroid glands go quiet.",
 pre:function(){S(["pth"]);},
 play:function(a){return waitOn(ptHit,pPt,a).then(function(){return tweenVal(0.62,0.24,700,a,ptLevel);}).then(function(){ptGlands(true);ptT.textContent="PTH released";
   return Promise.all(ptPth.map(function(d,i){var dest=i%2?[600,316]:[600,141];return wait(i*150,a).then(function(){return run(d,[[250,240],[420,i%2?300:180],dest],1000,a);});}));})
   .then(function(){show(ptE,true);return Promise.all(ptCa.map(function(d,i){var s=i%2?[680,316]:[680,141];return wait(i*150,a).then(function(){return run(d,[s,[840,250]],900,a);});}).concat([tweenVal(0.24,0.62,1300,a,ptLevel)]));})
   .then(function(){ptGlands(false);ptT.textContent="PTH release slows";cap("Low Ca2+ triggers PTH, and PTH brings Ca2+ back up.");});}},

{title:"A signal from a neuron",
 text:["Some endocrine cells release their hormone when a neuron tells them to. The adrenal medulla, the inner part of the adrenal gland, is a modified part of the sympathetic nervous system. Sympathetic neurons from the spinal cord run straight to it and synapse on its cells, which are called chromaffin cells.","You follow the sympathetic pathway in detail in the autonomic walkthrough. Click the sympathetic neuron in the spinal cord to send the signal of a sudden fright."],
 ask:"The neuron fires. What does it release onto the chromaffin cells, and what do they release into the blood?",
 ans:["The sympathetic neuron releases acetylcholine onto the chromaffin cells, and they respond by releasing epinephrine, along with a smaller amount of norepinephrine, into the blood. It happens within seconds, which is why a fright can make your heart pound almost at once.","A nerve signal that triggers hormone release is a neural stimulus. The posterior pituitary also releases hormones on a neural signal, and the next walkthrough covers it."],
 name:"neural stimulus",
 desc:"On the left, a slice of the spinal cord with a sympathetic neuron whose axon runs to the adrenal gland, drawn cut open on the right with its outer cortex and inner medulla full of chromaffin cells. A vessel carries blood away to the right. The student clicks the neuron in the spinal cord. A navy signal travels down the axon to the medulla, gold acetylcholine dots appear at the chromaffin cells, the cells light up, and maroon epinephrine dots flow out into the blood.",
 pre:function(){S(["neur"]);},
 play:function(a){return waitOn(nrHit,pNr,a).then(function(){return run(nrSig,NRP,1100,a);}).then(function(){nrT[0].setAttribute("display","");return Promise.all(nrAch.map(function(d,i){return run(d,[[560,300],[600+i*30,300+(i-1)*18]],500,a);}));})
   .then(function(){NRC.forEach(function(c){c.setAttribute("fill","#E9A99C");});nrT[1].setAttribute("display","");return Promise.all(nrEpi.map(function(d,i){return wait(i*200,a).then(function(){return run(d,[[650,316],[740,300],[880,300]],1000,a);});}));})
   .then(function(){cap("A nerve signal releases epinephrine within seconds.");});}},

{title:"A signal from another hormone",
 text:["Some hormones exist to control other endocrine glands. A hormone that tells another endocrine gland to release its hormone is called a trophic hormone. For example, thyroid-stimulating hormone (TSH) from the anterior pituitary travels in the blood to the thyroid gland, which responds by releasing thyroid hormone.","Where TSH comes from, and how its release is controlled, is the subject of the next walkthrough. Click the box at the upper left to release TSH."],
 ask:"TSH reaches the thyroid. What does the thyroid do, and what kind of stimulus is this?",
 ans:["The thyroid releases thyroid hormone (T3 and T4) into the blood, and it travels to cells all over the body. A hormone that triggers the release of another hormone is a hormonal stimulus.","Many glands are controlled this way, in chains of hormones. The next walkthrough follows these chains from the hypothalamus through the pituitary to the glands they control."],
 name:"hormonal stimulus",
 desc:"At the upper left, a box for the anterior pituitary, which the next walkthrough covers. A blood vessel runs from it down and across to the thyroid gland, drawn from the front on the windpipe with small round follicles in its two lobes. The student clicks the box, and gold TSH dots travel to the thyroid, labeled TSH, a trophic hormone. The follicles light up, and maroon thyroid hormone dots leave the thyroid in a vessel, labeled thyroid hormone (T3 and T4) to the whole body.",
 pre:function(){S(["troph"]);},
 play:function(a){return waitOn(trBox,pTr,a).then(function(){trTsh.setAttribute("display","");return Promise.all(trD.map(function(d,i){return wait(i*200,a).then(function(){return run(d,[[190,128],[190,300],[530,300]],1300,a);});}));})
   .then(function(){TRF.forEach(function(c){c.setAttribute("fill","#F6D88A");});return Promise.all(trO.map(function(d,i){return wait(i*200,a).then(function(){return run(d,[[700,320],[760,340],[860,340],[860,480]],1200,a);});}));})
   .then(function(){trOut.setAttribute("display","");cap("One hormone, TSH, tells the thyroid to release its own.");});}},

{sec:"Review",comp:"Competencies 7 to 11",
 title:"Summary with the scientific terms",
 text:["Peptide hormones are made ahead from a preprohormone, stored in vesicles and released by exocytosis. They dissolve in plasma, have half lives of minutes, and bind surface receptors that act through second messengers. Steroid hormones are made from cholesterol when needed, diffuse out of the cell, travel mostly bound to carrier proteins with longer half lives, and bind receptors in the cytoplasm or nucleus to change which genes are active. Amines come from tyrosine or tryptophan: catecholamines act like peptides and thyroid hormones act like steroids.","Only free hormone leaves the blood and acts. A response depends on the target cell's receptors, and receptor number sets sensitivity through up-regulation and down-regulation. Hormones interact by synergism, permissiveness and antagonism. Glands release hormone in response to humoral, neural or hormonal stimuli."],
 ask:"Without scrolling back: after a meal, blood glucose rises and beta cells in the pancreas release insulin, a peptide. Classify the trigger, and predict how insulin leaves the cell, how it travels in the blood, and where its receptor is.",
 ans:["The trigger is humoral: a change in the blood that the beta cells sense directly. Insulin is stored in vesicles and leaves the cell by exocytosis. It dissolves in plasma and travels free, which is why its half life is only about 5 minutes. Its receptor is on the surface of the target cell, because a peptide cannot cross the cell membrane.","If you could not get there, redraw the three production lines from memory, the way your Competency Study Guide asks."],
 desc:"The first figure again, relabeled. On the left, a beta cell in the pancreas with insulin stored in vesicles. A capillary runs across the middle, and above it on the right is a muscle cell with insulin receptors. The student clicks the blood, and glucose dots fill it, labeled trigger: blood glucose rises. The beta cell releases insulin, which travels free in the plasma to the muscle cell and binds its surface receptors, and the muscle cell takes up glucose. Labels read insulin travels free in the plasma, and half life: about 5 minutes.",
 pre:function(){S(["intro"]);inGT.textContent="beta cell in the pancreas";inAT.textContent="muscle cell: insulin receptors";inB.setAttribute("display","none");show([inHit],false);show([inBloodHit],true);},
 play:function(a){return waitOn(inBloodHit,pInRv,a).then(function(){inGlu.setAttribute("display","");return wait(500,a);}).then(function(){return introRun(a);})
   .then(function(){inAR.textContent="takes up glucose";inRv.setAttribute("display","");cap("A humoral trigger, a stored peptide, a surface receptor.");});}}
];
