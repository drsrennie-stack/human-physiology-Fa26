/* Reproductive hormones. Oct 17 2026. Week 7 walkthrough 4 of 4.
   Week 7 competencies 16 to 21, with competency 22 (reading the cycle graph)
   practiced on the 28 day cycle figure.
   Figures, each shown and hidden per step:
   - axis: the hypothalamus, portal vessels and pituitary in section, with the
     blood carrying LH and FSH to a testis and an ovary; a GnRH pulse recorder
   - testis: one seminiferous tubule cut across, with Sertoli cells, germ
     cells maturing from the wall to the lumen, tight junctions, and Leydig
     cells outside it; a small axis at the right for LH, FSH and feedback
   - cyc: a 28 day cycle: the ovary with its follicle at the left, the
     feedback sign, LH and FSH, estradiol and progesterone, and the lining
   - lin: a large cross section of the uterine lining with glands and spiral
     arteries, beside a small graph of estradiol and progesterone
   - preg: the uterus with an implanted embryo, the ovary with its corpus
     luteum, and progesterone with and without pregnancy
   - plac: hCG, progesterone and estrogen from conception to birth
   - lab: labor drawn as a loop around the uterus
   - milk: one alveolus of the breast with its duct, myoepithelial cells,
     and the prolactin and oxytocin lines from the pituitary
   Every step the student acts in uses promptAt and waitOn from w05-kit.js,
   so Next stays locked until the student has done the action. */

function gs(x,m,w){var z=(x-m)/w;return Math.exp(-z*z/2);}
function setD(g,on){g.setAttribute("display",on?"":"none");}
function qpts(x0,y0,cx,cy,x1,y1,n){var o=[];for(var i=0;i<=n;i++){var t=i/n,u=1-t;o.push([u*u*x0+2*u*t*cx+t*t*x1,u*u*y0+2*u*t*cy+t*t*y1]);}return o;}
function chip(p,x,y,w,h,s,size){var g=el("g",{},p);g._r=el("rect",{x:x,y:y,width:w,height:h,rx:h/2,fill:"#FFF6D6",stroke:GOLD,"stroke-width":3},g);g._t=tx(g,x+w/2,y+h/2+5,s,"tn",size||14,"middle");return g;}
function chipOn(g,on){g._r.setAttribute("fill",on?"#FFF6D6":"#EEF0F3");g._r.setAttribute("stroke",on?GOLD:INK2);g._r.setAttribute("stroke-width",on?3:1.5);}

/* ======================= the gonadal axis (steps 1 to 3) ======================= */
var gAx=G("axis");
/* hypothalamus with two GnRH neurons */
el("ellipse",{cx:450,cy:72,rx:118,ry:42,fill:TINT,stroke:INK2,"stroke-width":2.5},gAx);
tx(gAx,322,66,"hypothalamus","tn",15,"end");
[[428,68],[474,64]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:8,fill:NAVY},gAx);el("line",{x1:q[0],y1:q[1],x2:450,y2:112,stroke:NAVY,"stroke-width":2.5},gAx);});
tx(gAx,560,64,"GnRH neurons","t",13,"start");
/* stalk, portal vessels and the two lobes */
el("path",{d:"M436 108 L438 164 M464 108 L470 164",stroke:INK2,"stroke-width":2.5,fill:"none"},gAx);
el("path",{d:"M444 112 q8 6 0 12 q-8 6 0 12 q8 6 -4 14 L424 166",stroke:MAROON,"stroke-width":2.5,fill:"none"},gAx);
el("path",{d:"M456 112 q-8 6 0 12 q8 6 0 12 q-8 6 -14 16 L432 168",stroke:MAROON,"stroke-width":2.5,fill:"none"},gAx);
tx(gAx,412,134,"portal vessels","tm",13,"end");
var axAnt=el("ellipse",{cx:418,cy:194,rx:42,ry:32,fill:"#fff",stroke:NAVY,"stroke-width":3},gAx);
el("ellipse",{cx:492,cy:192,rx:28,ry:27,fill:TINT,stroke:INK2,"stroke-width":2},gAx);
tx(gAx,370,198,"anterior pituitary","tn",14,"end");tx(gAx,526,230,"posterior pituitary","t",13,"start");
/* blood out to the two gonads */
el("path",{d:"M418 226 L418 272 M150 272 L750 272 M150 272 L150 328 M750 272 L750 334",stroke:"#EBC9C2","stroke-width":14,"stroke-linecap":"round",fill:"none"},gAx);
tx(gAx,600,262,"blood","t",13,"middle");
/* testis with tubules, ovary with follicles */
el("ellipse",{cx:150,cy:392,rx:82,ry:60,fill:"#fff",stroke:NAVY,"stroke-width":3},gAx);
[[112,372],[146,360],[182,374],[124,410],[160,404],[192,416],[140,436]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:13,fill:"none",stroke:INK2,"stroke-width":2},gAx);});
tx(gAx,150,474,"testis","tn",15,"middle");
el("ellipse",{cx:750,cy:392,rx:84,ry:54,fill:"#fff",stroke:MAROON,"stroke-width":3},gAx);
[[712,380,14],[760,372,22],[796,404,10],[730,414,9],[700,402,7]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:q[2],fill:"#F6E1C6",stroke:MAROON,"stroke-width":1.5},gAx);el("circle",{cx:q[0],cy:q[1],r:Math.max(3,q[2]*0.3),fill:"#fff",stroke:NAVY,"stroke-width":1.2},gAx);});
tx(gAx,750,474,"ovary","tm",15,"middle");
/* what each hormone reaches, shown in step 3 */
var axM=el("g",{},gAx);
[["LH: Leydig cells","tn",340],["make testosterone","t",358],["FSH: Sertoli cells","tn",386],["support sperm making","t",404],["and make inhibin","t",422]].forEach(function(r){tx(axM,246,r[2],r[0],r[1],14,"start");});
var axF=el("g",{},gAx);
[["LH: theca cells","tn",340],["make androgens","t",358],["FSH: granulosa cells","tn",386],["turn them into estradiol","t",404],["and make inhibin","t",422]].forEach(function(r){tx(axF,654,r[2],r[0],r[1],14,"end");});
/* the hormones moving */
var axG=dot(gAx,NAVY,8),axLm=dot(gAx,NAVY,10),axFm=dot(gAx,GDEEP,10),axLf=dot(gAx,NAVY,10),axFf=dot(gAx,GDEEP,10);
var AX_G=[[450,72],[450,112],[440,140],[424,170],[418,190]];
var AX_M=[[418,200],[418,272],[150,272],[150,334]],AX_F=[[418,200],[418,272],[750,272],[750,338]];
var axKey=el("g",{},gAx);
el("circle",{cx:612,cy:150,r:9,fill:NAVY},axKey);tx(axKey,628,155,"LH","tn",14,"start");
el("circle",{cx:676,cy:150,r:9,fill:GDEEP},axKey);tx(axKey,692,155,"FSH","t",14,"start");
el("circle",{cx:752,cy:150,r:8,fill:NAVY},axKey);tx(axKey,768,155,"GnRH","t",14,"start");
/* GnRH pulse recorder (step 2) */
var gPulse=el("g",{},gAx);
el("rect",{x:300,y:292,width:300,height:76,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gPulse);
tx(gPulse,310,310,"GnRH released into the portal vessels","t",12,"start");
var pulseTr=trainPath(gPulse,NAVY,3);
el("rect",{x:300,y:378,width:300,height:76,rx:8,fill:"#fff",stroke:INK2,"stroke-width":1.5},gPulse);
tx(gPulse,310,396,"LH and FSH released","t",12,"start");
var lhfsh=el("path",{d:"",fill:"none",stroke:GDEEP,"stroke-width":3},gPulse);
function pulseD(k,steady){/* k: how far across; steady: fraction of the window given steadily */
  var x0=310,w=280,y=360,d="M"+x0+" "+y,n=6;
  for(var i=0;i<n;i++){var sx=x0+w*(i+0.5)/n;if(sx>x0+w*k)break;
    if(steady&&sx>x0+w*steady){continue;}
    d+=" H"+(sx-5)+" L"+(sx-1)+" "+(y-34)+" L"+(sx+3)+" "+y;}
  if(steady&&k>steady){d+=" H"+(x0+w*steady)+" V"+(y-26)+" H"+(x0+w*k);}else d+=" H"+(x0+w*k);
  return d;}
function lhD(k,steady){var x0=310,w=280,d="";for(var i=0;i<=40;i++){var f=i/40;if(f>k)break;var v=0.75;if(steady&&f>steady)v=0.75*Math.max(0.12,1-(f-steady)*2.4);var x=x0+w*f,y=448-v*40;d+=(i?" L":"M")+x.toFixed(1)+" "+y.toFixed(1);}return d;}
var dripB=chip(gPulse,345,462,210,36,"give GnRH steadily",14);
var axHyHit=el("ellipse",{cx:450,cy:72,rx:118,ry:42,fill:"transparent"},gAx);
var axTeHit=el("ellipse",{cx:150,cy:392,rx:84,ry:62,fill:"transparent"},gAx);
var axOvHit=el("ellipse",{cx:750,cy:392,rx:86,ry:58,fill:"transparent"},gAx);
var pAxHy=promptAt(gAx,600,100,["Click the hypothalamus","to release a pulse of GnRH"],566,90,450,72,40);
var pDrip=promptAt(gAx,628,474,["Click to give GnRH","as a steady drip"],566,480,450,480,40);
var pAxTe=promptAt(gAx,250,170,["Click the testis"],196,346,150,392,46);
var pAxOv=promptAt(gAx,520,200,["Now click the ovary"],704,346,750,392,46);
function axReset(){hide([axG,axLm,axFm,axLf,axFf]);setD(axM,false);setD(axF,false);setD(gPulse,false);setD(axKey,true);pulseTr.setAttribute("d","");lhfsh.setAttribute("d","");chipOn(dripB,true);[axHyHit,axTeHit,axOvHit].forEach(function(h){setD(h,false);});}
function gnrhPulse(a){return run(axG,AX_G,700,a).then(function(){return Promise.all([run(axLm,AX_M,1300,a,true),run(axFm,AX_M,1500,a,true),run(axLf,AX_F,1300,a,true),run(axFf,AX_F,1500,a,true)]);});}

/* ======================= the testis (steps 4 to 7) ======================= */
var gTe=G("testis");
var TC=[270,300];
function pol(a,r){var t=a*Math.PI/180;return [TC[0]+r*Math.cos(t),TC[1]+r*Math.sin(t)];}
el("circle",{cx:TC[0],cy:TC[1],r:180,fill:"#FBF7F6",stroke:NAVY,"stroke-width":4},gTe);
var SERT=[];
for(var k=0;k<8;k++){(function(k){var a=k*45,pts=[pol(a-9,174),pol(a-6,112),pol(a-8,50),pol(a+8,50),pol(a+6,112),pol(a+9,174)];
  SERT.push(el("polygon",{points:pts.map(function(q){return q[0].toFixed(1)+","+q[1].toFixed(1);}).join(" "),fill:"#EFE6D8",stroke:INK2,"stroke-width":1.5},gTe));
  var n=pol(a,150);el("ellipse",{cx:n[0],cy:n[1],rx:6,ry:8,fill:INK2,opacity:.55},gTe);})(k);}
var GERM=el("g",{},gTe);
for(k=0;k<8;k++){var a=k*45+22.5;
  [[160,9,"#C9D3E6"],[128,11,"#DCE3EF"],[104,10,"#DCE3EF"],[78,7,"#E6EAF2"]].forEach(function(c){var q=pol(a,c[0]);el("circle",{cx:q[0],cy:q[1],r:c[1],fill:c[2],stroke:NAVY,"stroke-width":1.5},GERM);});
  var h=pol(a,38),t0=pol(a+20,18);el("line",{x1:h[0],y1:h[1],x2:t0[0],y2:t0[1],stroke:NAVY,"stroke-width":1.5},GERM);el("ellipse",{cx:h[0],cy:h[1],rx:4,ry:3,fill:NAVY},GERM);}
el("circle",{cx:TC[0],cy:TC[1],r:46,fill:"none",stroke:INK2,"stroke-width":1.5,"stroke-dasharray":"4 4"},gTe);
tx(gTe,TC[0],TC[1]+5,"lumen","t",12,"middle");
/* tight junctions between neighboring Sertoli cells */
var TJ=el("g",{},gTe);
for(k=0;k<8;k++){var p0=pol(k*45+13,146),p1=pol(k*45+32,146);el("line",{x1:p0[0],y1:p0[1],x2:p1[0],y2:p1[1],stroke:GOLD,"stroke-width":5,"stroke-linecap":"round"},TJ);}
var tjRing=el("circle",{cx:TC[0],cy:TC[1],r:146,fill:"none",stroke:GOLD,"stroke-width":3,"stroke-dasharray":"8 6"},gTe);
/* Leydig cells in the space between tubules, with a capillary */
var LEY=[[438,150],[460,168],[452,128],[476,146]].map(function(q){return el("circle",{cx:q[0],cy:q[1],r:11,fill:"#F2D6CF",stroke:MAROON,"stroke-width":2},gTe);});
el("circle",{cx:430,cy:186,r:8,fill:"none",stroke:MAROON,"stroke-width":3},gTe);
tx(gTe,500,158,"Leydig cells","tm",14,"start");tx(gTe,500,174,"between the tubules","t",12,"start");
var teLeyT=tx(gTe,500,200,"make testosterone","tm",13,"start");
tx(gTe,470,290,"Sertoli cell","tn",14,"start");
var teSerT=[tx(gTe,470,310,"makes androgen-binding","t",12,"start"),tx(gTe,470,326,"protein and inhibin","t",12,"start")];
tx(gTe,470,372,"spermatogonia at the wall","t",13,"start");
tx(gTe,470,420,"sperm move toward the lumen","t",13,"start");
el("line",{x1:466,y1:368,x2:422,y2:362,stroke:INK2,"stroke-width":1.2,"stroke-dasharray":"3 3"},gTe);
el("line",{x1:466,y1:416,x2:304,y2:316,stroke:INK2,"stroke-width":1.2,"stroke-dasharray":"3 3"},gTe);
tx(gTe,20,110,"one seminiferous tubule, cut across","t",13,"start");
/* small axis at the right */
box(gTe,680,24,200,40,"hypothalamus","tn",14);
var tePit=box(gTe,680,116,200,40,"anterior pituitary","tn",14);
var teGarr=arrow(gTe,780,66,780,110,NAVY,4);var teGT=tx(gTe,792,94,"GnRH","t",13,"start");
var teLH=badge(gTe,730,214,"LH",NAVY,22),teFSH=badge(gTe,830,214,"FSH",GDEEP,22);
teFSH._t.setAttribute("font-size",17);
/* feedback */
var teFb=el("g",{},gTe);
var fbT1=poly(teFb,[[482,138],[600,90],[674,48]],NAVY,3,"7 5"),fbT2=poly(teFb,[[600,90],[674,134]],NAVY,3,"7 5");fbT1._dash=fbT2._dash="7 5";
var fbI=poly(teFb,[[452,346],[660,346],[890,346],[890,142],[884,142]],GDEEP,3,"7 5");fbI._dash="7 5";
var fbM=[badge(teFb,652,60,"−",NAVY,11),badge(teFb,652,122,"−",NAVY,11),badge(teFb,890,240,"−",GDEEP,11)];
var fbTT=tx(teFb,592,74,"testosterone","tn",13,"end"),fbIT=tx(teFb,760,364,"inhibin","t",13,"middle");
/* outside testosterone (step 7) */
var shotB=chip(gTe,700,390,170,40,"testosterone shot",15);
var teStat=[0,1,2,3].map(function(i){return tx(gTe,20,28+i*19,"","tm",13,"start");});
/* the moving parts */
var tLH=dot(gTe,NAVY,9),tFSH=dot(gTe,GDEEP,9),tT1=dot(gTe,NAVY,7),tT2=dot(gTe,NAVY,7),tInh=dot(gTe,GDEEP,7),tTfb=dot(gTe,NAVY,7);
var teLHHit=el("circle",{cx:730,cy:214,r:28,fill:"transparent"},gTe),teFSHHit=el("circle",{cx:830,cy:214,r:28,fill:"transparent"},gTe);
var tjHit=el("circle",{cx:pol(22.5,146)[0],cy:pol(22.5,146)[1],r:26,fill:"transparent"},gTe);
var teLeyHit=el("circle",{cx:458,cy:148,r:30,fill:"transparent"},gTe),teSerHit=el("circle",{cx:380,cy:300,r:30,fill:"transparent"},gTe);
var pTeLH=promptAt(gTe,560,262,["Click LH"],708,234,730,214,32);
var pTeFSH=promptAt(gTe,560,262,["Now click FSH"],808,236,830,214,32);
var pTj=promptAt(gTe,470,470,["Click a gold tight junction","between two Sertoli cells"],420,368,pol(22.5,146)[0],pol(22.5,146)[1],26);
var pTeT=promptAt(gTe,560,470,["Click the Leydig cells to","send testosterone back"],478,170,458,148,32);
var pTeI=promptAt(gTe,520,470,["Now click the Sertoli cell","to send inhibin back"],392,330,380,300,32);
var pShot=promptAt(gTe,470,470,["Click to give a","testosterone shot"],700,430,785,410,40);
function teIdle(){LEY.forEach(function(c){c.setAttribute("fill","#F2D6CF");c.setAttribute("opacity",1);});SERT.forEach(function(s){s.setAttribute("fill","#EFE6D8");});
  GERM.setAttribute("opacity",1);[teLH,teFSH].forEach(function(b){b.setAttribute("opacity",1);});teGarr.setAttribute("opacity",1);teGT.setAttribute("opacity",1);}
function teReset(){hide([tLH,tFSH,tT1,tT2,tInh,tTfb]);teIdle();setD(teLeyT,false);teSerT.forEach(function(t){setD(t,false);});setD(TJ,true);setD(tjRing,false);setD(teFb,false);setD(shotB,false);
  [fbT1,fbT2,fbI].forEach(function(l){l.setAttribute("stroke-width",3);});teStat.forEach(function(t){t.textContent="";});
  [teLHHit,teFSHHit,tjHit,teLeyHit,teSerHit].forEach(function(h){setD(h,false);});}
function teLHFSH(a){return run(tLH,[[730,214],[600,196],[466,152]],1000,a).then(function(){LEY.forEach(function(c){c.setAttribute("fill","#E3A99C");});setD(teLeyT,true);
  return Promise.all([run(tT1,[[452,150],[400,190],[380,250]],800,a),run(tT2,[[440,160],[430,186]],500,a)]);});}

/* ======================= the 28 day cycle (steps 8 to 12, 16, 21) ======================= */
var gCy=G("cyc");
var CYL=28;
function OV(){return CYL-14;}
function XD(d){return 290+(d-1)*(580/(CYL-1));}
function STD(d){var o=OV();return d<=o?1+(d-1)*13/(o-1):14+(d-o);}
function fLH(s){return 0.1+0.88*gs(s,13.2,0.5);}
function fFSH(s){return 0.16+0.14*gs(s,3.5,2.5)+0.26*gs(s,13.2,0.55)+0.12*gs(s,28.5,1.8)-0.05*gs(s,21,3);}
function fE2(s){return 0.12+(s<=12.2?0.86*gs(s,12.2,3):0.86*gs(s,12.2,0.8))+0.42*gs(s,21.5,2.6);}
function fP4(s){return 0.04+0.92*gs(s,21,2.6);}
function fTh(s){if(s<5)return 0.42-(s-1)*0.08;if(s<14)return 0.1+(s-5)/9*0.5;if(s<23)return 0.6+(s-14)/9*0.4;return 1-(s-23)/5*0.12;}
function yT(v){return 170-v*115;}function yM(v){return 322-v*105;}function yL(v){return 440-v*76;}
/* frames */
el("line",{x1:290,y1:170,x2:872,y2:170,stroke:INK2,"stroke-width":1.5},gCy);
el("line",{x1:290,y1:322,x2:872,y2:322,stroke:INK2,"stroke-width":1.5},gCy);
el("line",{x1:290,y1:440,x2:872,y2:440,stroke:INK2,"stroke-width":1.5},gCy);
tx(gCy,296,48,"from the pituitary","t",12,"start");tx(gCy,296,212,"from the ovary","t",12,"start");tx(gCy,296,372,"uterine lining","t",12,"start");
var cyTicks=el("g",{},gCy);
var cyPhF=tx(gCy,0,18,"follicular phase","tn",14,"middle"),cyPhL=tx(gCy,0,18,"luteal phase","tn",14,"middle");
var cyOvL=el("line",{x1:0,y1:26,x2:0,y2:444,stroke:MAROON,"stroke-width":2,"stroke-dasharray":"6 5"},gCy),cyOvT=tx(gCy,0,18,"ovulation","tm",14,"middle");
var cyMen=el("rect",{x:0,y:444,width:0,height:6,fill:MAROON},gCy);var cyMenT=tx(gCy,0,434,"menstruation","tm",11,"start");
var cLH=el("path",{d:"",fill:"none",stroke:NAVY,"stroke-width":3.5,"stroke-linejoin":"round"},gCy);
var cFSH=el("path",{d:"",fill:"none",stroke:INK2,"stroke-width":3,"stroke-dasharray":"8 5"},gCy);
var cE2=el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":3.5,"stroke-linejoin":"round"},gCy);
var cP4=el("path",{d:"",fill:"none",stroke:GDEEP,"stroke-width":3.5,"stroke-linejoin":"round"},gCy);
var cTh=el("path",{d:"",fill:TISS,stroke:MAROON,"stroke-width":2},gCy);
var lLH=tx(gCy,0,0,"LH","tn",14,"start"),lFSH=tx(gCy,0,0,"FSH","t",14,"middle"),lE2=tx(gCy,0,0,"estradiol","tm",14,"start"),lP4=tx(gCy,0,0,"progesterone","t",14,"start");
var cyCur=el("line",{x1:0,y1:28,x2:0,y2:444,stroke:GOLD,"stroke-width":3},gCy);
/* peak notes for reading the graph (step 16) */
var cyRead=el("g",{},gCy);
var rdT=[tx(cyRead,0,0,"surge, set off by estradiol","tn",12,"start"),tx(cyRead,0,0,"dominant follicle","tm",12,"end"),tx(cyRead,0,0,"corpus luteum","t",12,"start")];
/* the ovary and its follicle */
el("ellipse",{cx:130,cy:130,rx:105,ry:78,fill:"#FBF3F1",stroke:MAROON,"stroke-width":3},gCy);
tx(gCy,40,44,"ovary","tm",14,"start");
var SMF=[[66,104],[74,166],[196,96],[192,166]].map(function(q){var g=el("g",{},gCy);g._c=el("circle",{cx:q[0],cy:q[1],r:12,fill:"#F6E1C6",stroke:MAROON,"stroke-width":1.5},g);g._o=el("circle",{cx:q[0],cy:q[1],r:4,fill:"#fff",stroke:NAVY,"stroke-width":1.2},g);return g;});
var DOM=el("g",{},gCy);
var domTh=el("circle",{cx:130,cy:130,r:40,fill:"none",stroke:"#D9A79C","stroke-width":8},DOM);
var domGr=el("circle",{cx:130,cy:130,r:36,fill:"#F6E1C6",stroke:MAROON,"stroke-width":1.5},DOM);
var domAn=el("circle",{cx:140,cy:130,r:20,fill:FLUID,stroke:FLOW,"stroke-width":1},DOM);
var domOo=el("circle",{cx:110,cy:130,r:8,fill:"#fff",stroke:NAVY,"stroke-width":2},DOM);
var oocyte=el("g",{},gCy);el("circle",{r:9,fill:"#fff",stroke:NAVY,"stroke-width":2.5},oocyte);el("circle",{r:3,fill:NAVY},oocyte);
var CLg=el("g",{},gCy);var clC=el("circle",{cx:130,cy:130,r:40,fill:GOLD,stroke:GDEEP,"stroke-width":2,opacity:.85},CLg);
var clF=el("path",{d:"M108 118 q10 6 0 12 q10 6 0 12 M152 118 q-10 6 0 12 q-10 6 0 12",fill:"none",stroke:GDEEP,"stroke-width":1.5},CLg);
var cyStage=tx(gCy,130,236,"","tn",14,"middle");
var cyTG=el("g",{},gCy);tx(cyTG,130,262,"outer ring: theca cells (LH)","t",12,"middle");tx(cyTG,130,280,"inner cells: granulosa (FSH)","t",12,"middle");
/* the feedback sign */
el("rect",{x:25,y:296,width:210,height:150,rx:10,fill:"#fff",stroke:INK2,"stroke-width":1.5},gCy);
tx(gCy,130,318,"estradiol feedback on the","t",13,"middle");tx(gCy,130,335,"hypothalamus and pituitary","t",13,"middle");
var cySign=badge(gCy,130,384,"−",NAVY,30);cySign._t.setAttribute("font-size",40);
var cyStat=tx(gCy,130,436,"","tm",13,"middle");
var cySignHit=el("circle",{cx:130,cy:384,r:38,fill:"transparent"},gCy);
/* day buttons */
var dayB=chip(gCy,0,466,84,32,"",14);
var cy32B=chip(gCy,30,462,200,36,"a 32 day cycle",15),runB=chip(gCy,30,462,200,36,"run the whole cycle",15);
var cyPeakHit=el("rect",{x:0,y:30,width:60,height:90,fill:"transparent"},gCy);
function setDay(lbl,d){dayB.setAttribute("transform","translate("+(XD(d)-42)+" 0)");dayB._t.textContent=lbl;setD(dayB,true);}
function pathTo(fn,yf,d){var s="",o=1;for(var x=1;x<=d+1e-6;x+=0.1){s+=(s?" L":"M")+XD(x).toFixed(1)+" "+yf(fn(STD(x))).toFixed(1);o=x;}if(d-o>0.01)s+=" L"+XD(d).toFixed(1)+" "+yf(fn(STD(d))).toFixed(1);return s;}
function thTo(d){var s="M"+XD(1)+" 440",last=1;for(var x=1;x<=d+1e-6;x+=0.1){s+=" L"+XD(x).toFixed(1)+" "+yL(fTh(STD(x))).toFixed(1);last=x;}return s+" L"+XD(last).toFixed(1)+" 440 Z";}
function cyFrame(){
  cyTicks.innerHTML="";var ds=[1,7,14,21,28];if(CYL!==28)ds.push(CYL);
  ds.forEach(function(d){el("line",{x1:XD(d),y1:440,x2:XD(d),y2:448,stroke:INK2,"stroke-width":2},cyTicks);tx(cyTicks,XD(d),462,String(d),"t",12,"middle");});
  tx(cyTicks,272,462,"day","t",12,"end");
  var o=OV();cyPhF.setAttribute("x",XD((1+o)/2));cyPhL.setAttribute("x",XD((o+CYL)/2));
  [cyOvL].forEach(function(l){l.setAttribute("x1",XD(o));l.setAttribute("x2",XD(o));});cyOvT.setAttribute("x",XD(o));
  cyMen.setAttribute("x",XD(1));cyMen.setAttribute("width",XD(5)-XD(1));cyMenT.setAttribute("x",XD(1)+4);
  var dl=o-14;
  lLH.setAttribute("x",XD(13.2+dl)+12);lLH.setAttribute("y",yT(0.9));
  lFSH.setAttribute("x",XD(3.5+dl*0.2));lFSH.setAttribute("y",yT(0.36)-6);
  lE2.setAttribute("x",XD(1+1.2*(o-1)/13));lE2.setAttribute("y",292);
  lP4.setAttribute("x",XD(21+dl)+16);lP4.setAttribute("y",yM(0.96)-10);
  rdT[0].setAttribute("x",XD(13.2+dl)+12);rdT[0].setAttribute("y",yT(0.9)+18);
  rdT[1].setAttribute("x",XD(1+10*(o-1)/13)-6);rdT[1].setAttribute("y",206);
  rdT[2].setAttribute("x",XD(21+dl)+16);rdT[2].setAttribute("y",193);
  cyPeakHit.setAttribute("x",XD(13.2+dl)-30);
}
/* everything on the cycle figure for one day */
function cycState(d,ovl){
  var s=STD(d);
  cLH.setAttribute("d",pathTo(fLH,yT,d));cFSH.setAttribute("d",pathTo(fFSH,yT,d));cE2.setAttribute("d",pathTo(fE2,yM,d));cP4.setAttribute("d",pathTo(fP4,yM,d));cTh.setAttribute("d",thTo(d));
  cyCur.setAttribute("x1",XD(d));cyCur.setAttribute("x2",XD(d));
  setD(cyOvL,ovl||s>=14);setD(cyOvT,ovl||s>=14);setD(cyMen,d>=5);setD(cyMenT,d>=5);
  /* follicles */
  var sm=s<5?12:s<9?12*(1-(s-5)/4):s>=25?8:0;SMF.forEach(function(g){setD(g,sm>0.5);g._c.setAttribute("r",Math.max(sm,0.1));g._o.setAttribute("r",Math.max(sm*0.33,0.1));});
  var R=s<5?0:s<12?20+(s-5)/7*38:s<14?58+(s-12)*3:0;
  setD(DOM,R>0);if(R>0){domTh.setAttribute("r",R+4);domGr.setAttribute("r",R);domAn.setAttribute("r",Math.max(0,R*0.62-4));domAn.setAttribute("cx",130+R*0.18);domOo.setAttribute("cx",130-R*0.62);}
  setD(oocyte,s>=14&&s<16);place(oocyte,34,66);
  var cr=s<14?0:s<20.6?26+(s-14)*3.6:s<25?50-(s-20.6)*3.2:20;setD(CLg,cr>0);clC.setAttribute("r",cr);
  if(s>=25){clC.setAttribute("fill","#fff");clC.setAttribute("stroke",INK2);clF.setAttribute("display","none");}else{clC.setAttribute("fill",GOLD);clC.setAttribute("stroke",GDEEP);clF.setAttribute("display","");}
  setD(lLH,s>=12.6);setD(lFSH,s>=4.5);setD(lE2,s>=4);setD(lP4,s>=19);
  cyStage.textContent=s<5?"several follicles start to grow":s<12?"one dominant follicle":s<14?"a mature follicle":s<15.5?"ovulation":s<25?"the corpus luteum":"the corpus luteum breaks down";
  var plus=s>=11.8&&s<14.2;setBadge(cySign,plus?"+":"−",plus?MAROON:NAVY);
  cyStat.textContent=s<11.8?"LH and FSH held low":s<14.2?"LH surge":s<16?"back to negative feedback":"progesterone holds them low";
}
function cyRun(d0,d1,dur,a,ovl){if(!a||reduce){cycState(d1,ovl);return Promise.resolve();}return tweenVal(d0,d1,dur,a,function(v){cycState(v,ovl);});}
var pDay=function(x){return promptAt(gCy,20,522,["Click the day button to move the cycle on"],x-46,484,x,482,32);};
var pD7=pDay(XD(7)),pD14=pDay(XD(14)),pD21=pDay(XD(21));
var pD12=promptAt(gCy,20,522,["Click day 12 to move the cycle on"],XD(12)-46,484,XD(12),482,32);
var pSign=promptAt(gCy,250,522,["Estradiol has stayed high. Click the sign to flip it."],156,416,130,384,40);
var p32=promptAt(gCy,250,522,["Click to stretch this into a 32 day cycle"],232,490,130,480,34);
var pRun=promptAt(gCy,250,522,["Click to run the whole cycle, day 1 to day 28"],232,490,130,480,34);
var pPeak=promptAt(gCy,620,140,["Click the peak that tells","you when ovulation happened"],590,96,XD(13.2),68,32);
function cyReset(){CYL=28;cyFrame();cycState(1);[dayB,cy32B,runB,cyRead,cyTG].forEach(function(g){setD(g,false);});[cySignHit,cyPeakHit].forEach(function(h){setD(h,false);});chipOn(cy32B,true);chipOn(runB,true);chipOn(dayB,true);}

/* ======================= the uterine lining (steps 13 to 15) ======================= */
var gLi=G("lin");
el("rect",{x:40,y:404,width:540,height:56,fill:"#E8C0B6",stroke:MAROON,"stroke-width":2},gLi);
for(k=0;k<12;k++){el("ellipse",{cx:64+k*44,cy:420+(k%2)*20,rx:18,ry:4,fill:"#D79A8C"},gLi);}
el("rect",{x:40,y:368,width:540,height:36,fill:"#EBCFC8",stroke:MAROON,"stroke-width":1.5},gLi);
var liFun=el("g",{},gLi);
var liLayer=el("path",{d:"",fill:TISS,stroke:MAROON,"stroke-width":2},liFun);
var liArt=[150,250,350,450,550].map(function(){return el("path",{d:"",fill:"none",stroke:MAROON,"stroke-width":4,"stroke-linecap":"round"},gLi);});
var liGl=[95,200,300,400,505].map(function(){var g={o:el("path",{d:"",fill:"none",stroke:INK2,"stroke-width":8,"stroke-linecap":"round","stroke-linejoin":"round"},liFun),i:el("path",{d:"",fill:"none",stroke:"#fff","stroke-width":3.5,"stroke-linecap":"round","stroke-linejoin":"round"},liFun)};return g;});
var liSec=el("g",{},liFun);
var liBlood=el("g",{},gLi);
[[90,0],[170,-14],[250,-4],[330,-18],[410,-6],[490,-16],[560,-2]].forEach(function(q){el("circle",{cx:q[0],cy:q[1],r:6,fill:MAROON},liBlood);});
tx(gLi,300,40,"uterine cavity","t",14,"middle");
var liLabF=tx(gLi,592,330,"functional layer:","tn",13,"start"),liLabF2=tx(gLi,592,346,"shed each cycle","t",12,"start");
tx(gLi,592,388,"basal layer: stays","tn",13,"start");tx(gLi,592,438,"myometrium (muscle)","tn",13,"start");
el("line",{x1:52,y1:486,x2:76,y2:486,stroke:INK2,"stroke-width":7},gLi);tx(gLi,84,491,"glands","t",13,"start");
el("path",{d:"M190 492 q4 -6 8 0 q4 6 8 0 q4 -6 8 0",fill:"none",stroke:MAROON,"stroke-width":3},gLi);tx(gLi,222,491,"spiral arteries","t",13,"start");
/* small graph */
function XM(d){return 620+(d-1)*(260/27);}
el("line",{x1:620,y1:190,x2:880,y2:190,stroke:INK2,"stroke-width":1.5},gLi);
tx(gLi,620,30,"hormone levels","t",13,"start");
function mPath(fn){var s="";for(var x=1;x<=28.001;x+=0.25)s+=(s?" L":"M")+XM(x).toFixed(1)+" "+(190-fn(x)*140).toFixed(1);return s;}
el("path",{d:mPath(fE2),fill:"none",stroke:MAROON,"stroke-width":3},gLi);el("path",{d:mPath(fP4),fill:"none",stroke:GDEEP,"stroke-width":3},gLi);
tx(gLi,XM(12)-14,80,"estradiol","tm",12,"end");tx(gLi,880,40,"progesterone","t",12,"end");
var liCur=el("line",{x1:0,y1:44,x2:0,y2:190,stroke:GOLD,"stroke-width":3},gLi),liCurT=tx(gLi,0,204,"","tn",12,"middle");
var liE=el("circle",{r:6,fill:MAROON,stroke:"#fff","stroke-width":2},gLi),liP=el("circle",{r:6,fill:GDEEP,stroke:"#fff","stroke-width":2},gLi);
var liB=[["day 12",12],["day 21",21],["day 28",28]].map(function(b,i){var g=chip(gLi,600+i*100,214,80,30,b[0],14);g._d=b[1];return g;});
function glD(x,top,amp){var y0=396,y1=top+10,n=Math.max(2,Math.round((y0-y1)/13)),s="M"+x+" "+y0;for(var i=1;i<=n;i++){var y=y0-(y0-y1)*i/n;s+=" L"+(x+(i%2?amp:-amp)*(i<n?1:0)).toFixed(1)+" "+y.toFixed(1);}return s;}
function arD(x,top,amp){var y0=452,y1=top+26,s="M"+x+" "+y0;for(var y=y0;y>=y1;y-=3){s+=" L"+(x+amp*Math.sin((y0-y)/26*2*Math.PI)).toFixed(1)+" "+y.toFixed(1);}return s;}
function layerD(top){var s="M40 368 L40 "+top;for(var x=40;x<580;x+=30)s+=" q15 "+(x%60?-6:6)+" 30 0";return s+" L580 368 Z";}
var LIX=[95,200,300,400,505],LAX=[150,250,350,450,550];
function linState(day,o){o=o||{};var th=o.th!=null?o.th:fTh(day),top=368-(26+th*240),sec=day>=15&&day<27,ga=o.ga!=null?o.ga:(day<14?0.5:Math.min(9,(day-14)*1.4)),aa=o.aa!=null?o.aa:(day<14?2+th*6:Math.min(12,6+(day-14)*0.8));
  liLayer.setAttribute("d",layerD(top));
  liGl.forEach(function(g,i){var d=glD(LIX[i],top,ga);g.o.setAttribute("d",d);g.i.setAttribute("d",d);});
  liArt.forEach(function(p,i){p.setAttribute("d",arD(LAX[i],top,aa));p.setAttribute("stroke",o.cons?"#D9B3AB":MAROON);p.setAttribute("stroke-width",o.cons?1.6:4);});
  liSec.innerHTML="";if(sec&&!o.cons){LIX.forEach(function(x){el("circle",{cx:x+6,cy:top+16,r:4,fill:GOLD},liSec);el("circle",{cx:x-6,cy:top+30,r:3,fill:GOLD},liSec);});}
  liLayer.setAttribute("fill",o.cons?"#E9DCD8":TISS);
  var fy=Math.max(272,Math.min(330,(top+368)/2));liLabF.setAttribute("y",fy);liLabF2.setAttribute("y",fy+16);
  liCur.setAttribute("x1",XM(day));liCur.setAttribute("x2",XM(day));liCurT.setAttribute("x",XM(day));liCurT.textContent="day "+Math.round(day);
  liE.setAttribute("cx",XM(day));liE.setAttribute("cy",190-fE2(day)*140);liP.setAttribute("cx",XM(day));liP.setAttribute("cy",190-fP4(day)*140);
}
function liRun(d0,d1,dur,a){if(!a||reduce){linState(d1);return Promise.resolve();}return tweenVal(d0,d1,dur,a,function(v){linState(v);});}
function liTarget(i){liB.forEach(function(g,j){chipOn(g,j===i);});}
var pLi=[0,1,2].map(function(i){var x=640+i*100;return promptAt(gLi,300,522,["Click "+["day 12","day 21","day 28"][i]+" to move the cycle on"],x-40,260,x,229,30);});
function liReset(){linState(4);liFun.removeAttribute("transform");liFun.setAttribute("opacity",1);setD(liBlood,false);liTarget(-1);}

/* ======================= implantation and hCG (step 17) ======================= */
var gPr=G("preg");
el("path",{d:"M220 70 C320 70 350 140 340 210 C330 260 280 290 250 304 L250 324 L190 324 L190 304 C160 290 110 260 100 210 C90 140 120 70 220 70 Z",fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},gPr);
el("path",{d:"M220 92 C300 92 322 146 314 205 C306 248 268 270 244 282 L196 282 C172 270 134 248 126 205 C118 146 140 92 220 92 Z",fill:TISS,stroke:MAROON,"stroke-width":1.5},gPr);
el("path",{d:"M220 124 C268 124 284 160 280 204 C276 236 254 254 236 264 L204 264 C186 254 164 236 160 204 C156 160 172 124 220 124 Z",fill:"#fff",stroke:MAROON,"stroke-width":1.5},gPr);
tx(gPr,90,300,"uterus","tm",14,"end");tx(gPr,220,210,"thick lining","t",12,"middle");
el("path",{d:"M330 108 Q450 40 556 132",fill:"none",stroke:MAROON,"stroke-width":5},gPr);tx(gPr,450,112,"uterine tube","t",12,"middle");
var emb=el("g",{},gPr);el("circle",{cx:252,cy:118,r:13,fill:"#fff",stroke:NAVY,"stroke-width":2.5},emb);el("path",{d:"M243 112 a10 10 0 0 1 18 0 z",fill:NAVY},emb);
tx(gPr,264,52,"embryo, in the lining","tn",13,"start");el("line",{x1:270,y1:58,x2:256,y2:104,stroke:INK2,"stroke-width":1.2,"stroke-dasharray":"3 3"},gPr);
el("ellipse",{cx:650,cy:170,rx:86,ry:58,fill:"#fff",stroke:MAROON,"stroke-width":3},gPr);
var prCL=el("circle",{cx:650,cy:170,r:30,fill:GOLD,stroke:GDEEP,"stroke-width":2},gPr);
tx(gPr,650,248,"ovary","tm",14,"middle");tx(gPr,744,108,"corpus luteum","tn",13,"start");el("line",{x1:742,y1:112,x2:676,y2:152,stroke:INK2,"stroke-width":1.2,"stroke-dasharray":"3 3"},gPr);
el("path",{d:"M262 136 L300 252 L560 252 L622 196",fill:"none",stroke:"#EBC9C2","stroke-width":10,"stroke-linecap":"round","stroke-linejoin":"round"},gPr);
tx(gPr,430,276,"blood","t",12,"middle");
var prHcg=[0,1,2].map(function(){return dot(gPr,NAVY,8);});
var prHT=tx(gPr,430,238,"hCG","tn",14,"middle");
/* progesterone with and without pregnancy */
function XP(d){return 120+(d-14)*700/22;}
el("line",{x1:120,y1:470,x2:822,y2:470,stroke:INK2,"stroke-width":1.5},gPr);
tx(gPr,120,370,"progesterone in the blood","t",13,"start");
[14,21,28,35].forEach(function(d){el("line",{x1:XP(d),y1:470,x2:XP(d),y2:478,stroke:INK2,"stroke-width":2},gPr);tx(gPr,XP(d),492,String(d),"t",12,"middle");});
tx(gPr,104,492,"day","t",12,"end");
function prP(d,preg){var v=fP4(Math.min(d,28));if(d>28)v=0.04;if(preg&&d>21)v=0.96+(d-21)*0.003;return v;}
function prPath(d1,preg){var s="";for(var x=14;x<=d1+1e-6;x+=0.25)s+=(s?" L":"M")+XP(x).toFixed(1)+" "+(470-prP(x,preg)*100).toFixed(1);return s;}
el("path",{d:prPath(36,false),fill:"none",stroke:INK2,"stroke-width":2.5,"stroke-dasharray":"7 5"},gPr);
tx(gPr,820,458,"no pregnancy: falls, lining sheds","t",12,"end");
var prLine=el("path",{d:"",fill:"none",stroke:GDEEP,"stroke-width":4},gPr);
var prLT=tx(gPr,820,360,"pregnancy: hCG keeps it high","tn",12,"end");
var embHit=el("circle",{cx:252,cy:118,r:26,fill:"transparent"},gPr);
var pEmb=promptAt(gPr,370,170,["Click the embryo","to implant it"],276,136,252,118,30);
function prReset(){hide(prHcg);prLine.setAttribute("d",prPath(21,true));setD(prLT,false);setD(prHT,false);prCL.setAttribute("r",30);}

/* ======================= the placenta takes over (step 18) ======================= */
var gPl=G("plac");
function XW(w){return 110+w*18.5;}function yW(v){return 380-v*300;}
el("line",{x1:110,y1:380,x2:852,y2:380,stroke:INK2,"stroke-width":1.5},gPl);
[0,10,20,30,40].forEach(function(w){el("line",{x1:XW(w),y1:380,x2:XW(w),y2:388,stroke:INK2,"stroke-width":2},gPl);tx(gPl,XW(w),402,String(w),"t",12,"middle");});
tx(gPl,94,402,"weeks","t",12,"end");
function fH(w){return w<=9.5?gs(w,9.5,2.6):0.12+0.88*gs(w,9.5,3.2);}
function fCLP(w){return w<6?0.18:w<10.5?0.18*(1-(w-6)/4.5):0;}
function fPt(w){return w<6?0.18:0.18+0.77*(w-6)/34;}
function fEs(w){return 0.03+0.77*(w/40)*(w/40);}
function wPath(fn,w1){var s="";for(var w=0;w<=w1+1e-6;w+=0.25)s+=(s?" L":"M")+XW(w).toFixed(1)+" "+yW(fn(w)).toFixed(1);return s;}
var plBand=el("rect",{x:XW(7),y:80,width:XW(9)-XW(7),height:300,fill:GOLD,opacity:.22},gPl);
el("rect",{x:XW(7),y:80,width:XW(9)-XW(7),height:300,fill:"none",stroke:GOLD,"stroke-width":2.5,"stroke-dasharray":"6 4"},gPl);
el("path",{d:wPath(fH,40),fill:"none",stroke:NAVY,"stroke-width":3.5},gPl);
el("path",{d:wPath(fEs,40),fill:"none",stroke:MAROON,"stroke-width":3.5},gPl);
el("path",{d:wPath(fPt,40),fill:"none",stroke:GDEEP,"stroke-width":3.5},gPl);
var plCL=el("path",{d:wPath(fCLP,14),fill:"none",stroke:GDEEP,"stroke-width":2.5,"stroke-dasharray":"6 4"},gPl);
tx(gPl,330,92,"hCG","tn",14,"start");tx(gPl,700,268,"estrogen","tm",14,"start");tx(gPl,850,80,"progesterone (total)","t",14,"end");
var plCLT=[tx(gPl,116,294,"progesterone from","t",12,"start"),tx(gPl,116,310,"the corpus luteum","t",12,"start")];
var plHT=tx(gPl,XW(8),62,"the placenta takes over","tn",13,"middle");
var plEff=el("g",{},gPl);
box(plEff,24,420,270,62,"progesterone: keeps the\nuterine muscle quiet","tn",13,GDEEP);
box(plEff,315,420,270,62,"estrogen: grows the uterus\nand the breast ducts","tm",13,MAROON);
box(plEff,606,420,270,62,"relaxin: softens the cervix\nand loosens pelvic ligaments","tn",13,INK2);
var plHit=el("rect",{x:XW(8)-38,y:200,width:76,height:180,fill:"transparent"},gPl);
var pPl=promptAt(gPl,470,200,["Click the gold band, weeks 7 to 9,","where progesterone changes source"],XW(8)+30,290,XW(8),300,34);
function plReset(){setD(plCL,false);plCLT.forEach(function(t){setD(t,false);});setD(plHT,false);setD(plEff,false);}

/* ======================= labor (step 19) ======================= */
var gLa=G("lab");
var laUt=el("g",{},gLa);
el("path",{d:"M450 100 C560 100 600 180 590 260 C580 330 520 370 480 392 L480 412 L420 412 L420 392 C380 370 320 330 310 260 C300 180 340 100 450 100 Z",fill:"#F2D6CF",stroke:MAROON,"stroke-width":3},laUt);
el("path",{d:"M450 122 C540 122 570 190 564 258 C556 318 508 352 470 374 L430 374 C392 352 344 318 336 258 C330 190 360 122 450 122 Z",fill:"#fff",stroke:MAROON,"stroke-width":1.5},laUt);
var fetus=el("g",{},gLa);
el("ellipse",{cx:452,cy:236,rx:52,ry:70,fill:TISS,stroke:MAROON,"stroke-width":2},fetus);
el("circle",{cx:450,cy:338,r:36,fill:TISS,stroke:MAROON,"stroke-width":2},fetus);
el("path",{d:"M412 210 q-14 30 6 56 M492 210 q14 30 -6 56",fill:"none",stroke:MAROON,"stroke-width":2},fetus);
tx(gLa,500,428,"cervix","t",12,"start");
var LAN=[[30,232,210,56,"stretch receptors\nin the cervix fire"],[345,22,210,50,"hypothalamus"],[660,120,220,56,"posterior pituitary\nreleases oxytocin"],[660,340,220,56,"uterine muscle\ncontracts harder"],[345,440,210,50,"head pushes harder\non the cervix"]].map(function(n){return box(gLa,n[0],n[1],n[2],n[3],n[4],"tn",14);});
var LAP=[qpts(130,232,140,60,343,46,16),qpts(557,46,760,40,770,118,16),[[770,178],[770,338]],qpts(660,382,600,462,557,466,12),qpts(343,466,140,470,130,290,16)];
var LAA=LAP.map(function(p){var e=poly(gLa,p,MAROON,3);e.setAttribute("marker-end","url(#am)");return e;});
var laDot=dot(gLa,MAROON,9);
var laRound=tx(gLa,450,300,"","tm",15,"middle");
var laDel=chip(gLa,640,446,220,40,"deliver the baby",15);
var laHit=el("rect",{x:345,y:440,width:210,height:50,fill:"transparent"},gLa);
var pLaStart=promptAt(gLa,30,330,["Click here to start","a contraction"],330,450,450,465,40);
var pDel=promptAt(gLa,30,330,["Click to deliver","the baby"],636,474,750,466,40);
function laW(w){LAA.forEach(function(e){e.setAttribute("stroke-width",w);});}
function laReset(){hide([laDot]);laW(3);LAA.forEach(function(e){e.setAttribute("stroke",MAROON);});setD(laDel,false);place(fetus,0,0);fetus.setAttribute("opacity",1);laUt.removeAttribute("transform");laRound.textContent="";LAN.forEach(function(b){b.firstChild.setAttribute("fill","#fff");});}
function laLoop(a,w){var i=0;laW(w);
  function nx(){if(i>=LAP.length)return Promise.resolve();var p=LAP[i];var bi=(i+1)%5;i++;
    return run(laDot,p,520,a).then(function(){LAN[bi].firstChild.setAttribute("fill","#FFF6D6");
      if(bi===3)return tweenVal(1,0.94,180,a,function(v){laUt.setAttribute("transform","translate(450 260) scale("+v+") translate(-450 -260)");}).then(function(){return tweenVal(0.94,1,180,a,function(v){laUt.setAttribute("transform","translate(450 260) scale("+v+") translate(-450 -260)");});});}).then(nx);}
  return nx();}

/* ======================= lactation (step 20) ======================= */
var gMi=G("milk");
var AC=[250,300];
function apol(a,r){var t=a*Math.PI/180;return [AC[0]+r*Math.cos(t),AC[1]+r*Math.sin(t)];}
var miAlv=el("g",{},gMi);
el("path",{d:"M318 372 L440 454",stroke:MAROON,"stroke-width":28,"stroke-linecap":"round"},miAlv);
el("path",{d:"M318 372 L440 454",stroke:"#fff","stroke-width":18,"stroke-linecap":"round"},miAlv);
var ALV=[];
for(k=0;k<12;k++){(function(k){var a=k*30,p=[apol(a-13,64),apol(a-14,102),apol(a+14,102),apol(a+13,64)];
  ALV.push(el("polygon",{points:p.map(function(q){return q[0].toFixed(1)+","+q[1].toFixed(1);}).join(" "),fill:"#F3E3D3",stroke:MAROON,"stroke-width":1.5},miAlv));
  var n=apol(a,88);el("circle",{cx:n[0],cy:n[1],r:5,fill:INK2,opacity:.6},miAlv);})(k);}
var MYO=[];
for(k=0;k<6;k++){var mp=apol(k*60+15,110);MYO.push(el("ellipse",{cx:mp[0],cy:mp[1],rx:30,ry:6,fill:INK2,opacity:.85,transform:"rotate("+(k*60+105)+" "+mp[0]+" "+mp[1]+")"},miAlv));}
var miMilk=el("g",{},miAlv);
[[-30,-20],[0,-34],[28,-14],[-18,14],[14,22],[34,10],[-38,8],[6,-6]].forEach(function(q){el("circle",{cx:AC[0]+q[0],cy:AC[1]+q[1],r:7,fill:"#FFF6D6",stroke:GOLD,"stroke-width":1.5},miMilk);});
el("ellipse",{cx:462,cy:468,rx:30,ry:18,fill:TISS,stroke:MAROON,"stroke-width":2.5},gMi);
tx(gMi,20,250,"alveolar cells","tn",13,"start");el("line",{x1:128,y1:248,x2:166,y2:268,stroke:INK2,"stroke-width":1.2,"stroke-dasharray":"3 3"},gMi);
tx(gMi,20,346,"myoepithelial","tn",13,"start");tx(gMi,20,362,"cells","tn",13,"start");el("line",{x1:116,y1:350,x2:150,y2:346,stroke:INK2,"stroke-width":1.2,"stroke-dasharray":"3 3"},gMi);
tx(gMi,312,470,"duct to the nipple","t",12,"end");
box(gMi,600,24,280,40,"hypothalamus","tn",14);
var miAnt=box(gMi,600,110,130,48,"anterior\npituitary","tn",13),miPos=box(gMi,750,110,130,48,"posterior\npituitary","tm",13);
var miNerve=poly(gMi,[[492,452],[580,330],[588,180],[606,66]],INK2,2.5,"6 4");miNerve._dash="6 4";
tx(gMi,596,300,"nerve signal","t",12,"start");tx(gMi,596,316,"from the nipple","t",12,"start");
var miPrl=poly(gMi,[[665,158],[520,214],[322,252]],NAVY,3),miOxy=poly(gMi,[[815,158],[815,404],[640,404],[364,338]],MAROON,3);
var miPrlT=tx(gMi,440,196,"prolactin","tn",14,"start"),miOxyT=tx(gMi,700,396,"oxytocin","tm",14,"middle");
var miRes=[tx(gMi,20,40,"prolactin: alveolar cells make milk","tn",14,"start"),tx(gMi,20,58,"for the next feeding","t",12,"start"),tx(gMi,20,96,"oxytocin: myoepithelial cells squeeze","tm",14,"start"),tx(gMi,20,114,"and push milk out, the let-down","t",12,"start")];
var miD1=dot(gMi,INK2,8),miD2=dot(gMi,NAVY,9),miD3=dot(gMi,MAROON,9),miOut=[0,1,2].map(function(){return dot(gMi,GOLD,7);});
var suckB=chip(gMi,510,450,150,36,"baby suckles",15);
var pSuck=promptAt(gMi,380,520,["Click to let the baby suckle"],560,494,585,468,34);
function miReset(){hide([miD1,miD2,miD3].concat(miOut));setD(miMilk,false);miRes.forEach(function(t){setD(t,false);});[miPrl,miOxy,miPrlT,miOxyT].forEach(function(g){g.setAttribute("opacity",.25);});
  ALV.forEach(function(p){p.setAttribute("fill","#F3E3D3");});MYO.forEach(function(m){m.setAttribute("ry",6);});miAlv.removeAttribute("transform");}

makeCap();
function resetAll(){axReset();teReset();cyReset();liReset();prReset();plReset();laReset();miReset();cap("");}
function S(l){only(l.concat(["cap"]));resetAll();}

/* ======================= steps ======================= */
var STEPS=[
{sec:"The gonadal axis",comp:"Competency 16",
 title:"One more hypothalamic-pituitary axis",
 text:["In the last walkthrough you followed the pattern every hypothalamic-pituitary axis uses. Neurons in the hypothalamus release a hormone into the portal vessels, it reaches the anterior pituitary, and the pituitary sends its own hormone through the blood to a target gland. The target gland's hormone then feeds back to turn the axis down. Reproduction uses the same pattern, and here it is one more time.","The hypothalamus releases gonadotropin-releasing hormone, GnRH. In the anterior pituitary, GnRH acts on the cells called gonadotrophs, and they release two hormones, luteinizing hormone (LH) and follicle-stimulating hormone (FSH). Together these are the gonadotropins, the hormones that act on the gonads: the testes and the ovaries. Click the hypothalamus to release a pulse of GnRH."],
 name:"hypothalamic-pituitary-gonadal axis",
 auto:true,
 desc:"The hypothalamus at the top with two GnRH neurons, portal vessels running down the pituitary stalk to the anterior pituitary, and the posterior pituitary beside it. A blood vessel leaves the anterior pituitary and runs to a testis on the left and an ovary on the right. When the student clicks the hypothalamus, a navy GnRH dot travels down the portal vessels to the anterior pituitary, and then navy LH dots and gold FSH dots travel through the blood to both the testis and the ovary.",
 pre:function(){S(["axis"]);setD(axHyHit,true);},
 play:function(a){return waitOn(axHyHit,pAxHy,a).then(function(){return gnrhPulse(a);}).then(function(){cap("The same two hormones, LH and FSH, act in both sexes.");});}},

{title:"Pulses, not a steady stream",
 text:["GnRH is not released continuously. The GnRH neurons fire together in bursts, so GnRH reaches the pituitary in pulses, and the pituitary releases LH and FSH in matching pulses. The two recordings below the pituitary show the pulses going into the portal vessels and the LH and FSH coming out. Click the button below it to give GnRH as a steady drip instead."],
 ask:"If GnRH reaches the pituitary steadily instead of in pulses, what happens to LH and FSH release?",
 ans:["LH and FSH fall. When the gonadotrophs are exposed to GnRH all the time, they reduce their response to it (their GnRH receptors are down-regulated), so after a brief rise they release less LH and FSH, not more. The pituitary responds to the pattern of the signal, not only to how much of it arrives.","This is used in medicine. Drugs that act like GnRH, given continuously, shut down LH and FSH and so shut down the gonads' hormone production. They are used, for example, to lower testosterone in some prostate cancers."],
 name:"pulsatile GnRH",
 desc:"The axis figure with two recordings below the pituitary: GnRH released into the portal vessels, shown as a row of sharp pulses, and LH and FSH released, shown as a steady line. The student clicks the button labeled give GnRH steadily. The GnRH recording changes from pulses to a flat raised line, and the LH and FSH line falls toward the bottom of its box.",
 pre:function(){S(["axis"]);setD(gPulse,true);setD(axKey,false);pulseTr.setAttribute("d",pulseD(1,0));lhfsh.setAttribute("d",lhD(1,0));},
 play:function(a){pulseTr.setAttribute("d",pulseD(0.45,0));lhfsh.setAttribute("d",lhD(0.45,0));return waitOn(dripB,pDrip,a).then(function(){chipOn(dripB,false);return tweenVal(0.45,1,1600,a,function(k){pulseTr.setAttribute("d",pulseD(k,0.45));lhfsh.setAttribute("d",lhD(k,0.45));});}).then(function(){cap("A steady GnRH signal turns LH and FSH down.");});}},

{title:"Two cells in each gonad",
 text:["LH and FSH act in both sexes, and in each gonad they act on two different kinds of cell that sit side by side and work as a pair. One cell of each pair makes steroid hormones, and the other supports the developing gametes, the sperm or the egg. Click the testis, then the ovary."],
 ask:"In the testis and in the ovary, which cell does LH act on and which does FSH act on, and what does each cell make?",
 ans:["In the testis, LH acts on the Leydig cells, which sit between the tubules and make testosterone. FSH acts on the Sertoli cells inside the tubules, which support sperm development and make inhibin.","In the ovary, LH acts on the theca cells, the outer layer of the follicle, which make androgens. FSH acts on the granulosa cells, the inner layer, which convert those androgens into estradiol with the enzyme aromatase, and also make inhibin. So in both sexes LH drives the cell that makes the steroid, FSH drives the cell that supports the gamete, and the FSH-driven cell makes inhibin."],
 name:"Leydig and Sertoli cells, theca and granulosa cells",
 desc:"The axis figure. The student clicks the testis, and labels appear beside it: LH acts on Leydig cells, which make testosterone; FSH acts on Sertoli cells, which support sperm making and make inhibin. Then the student clicks the ovary, and labels appear beside it: LH acts on theca cells, which make androgens; FSH acts on granulosa cells, which turn them into estradiol and make inhibin.",
 pre:function(){S(["axis"]);setD(axTeHit,true);setD(axOvHit,true);},
 play:function(a){return waitOn(axTeHit,pAxTe,a).then(function(){return run(axLm,AX_M,700,a,true);}).then(function(){setD(axM,true);return waitOn(axOvHit,pAxOv,a);}).then(function(){return run(axLf,AX_F,700,a,true);}).then(function(){setD(axF,true);cap("LH reaches the steroid-making cell, FSH the support cell.");});}},

{sec:"The testis",comp:"Competencies 16 and 17",
 title:"Leydig cells and Sertoli cells",
 text:["Sperm are made inside the seminiferous tubules, the long coiled tubes that fill the testis. The figure shows one tubule cut across. Germ cells start at the outer wall as spermatogonia and mature as they move inward, through spermatocytes and spermatids, until sperm are released into the lumen in the middle. This takes a little over two months. Tall Sertoli cells run from the wall to the lumen and wrap around the germ cells, feeding and supporting them. The Leydig cells sit outside the tubule, in the tissue between tubules, next to the blood vessels.","Click LH, and then FSH, at the right."],
 ask:"Testosterone is needed for sperm production, but the Leydig cells that make it sit outside the tubule. How does testosterone reach the developing sperm, and how is it kept concentrated there?",
 ans:["Testosterone is a steroid, so it diffuses from the Leydig cells straight into the nearby tubule, as a local (paracrine) signal, as well as into the blood. Inside the tubule, FSH stimulates the Sertoli cells to make androgen-binding protein, which binds testosterone and keeps it at a high concentration around the developing sperm.","Sperm production needs both signals acting on the Sertoli cells: FSH, and testosterone from the Leydig cells. The Sertoli cells also release inhibin, which you will use in the next steps."],
 name:"androgen-binding protein",
 desc:"One seminiferous tubule cut across: Sertoli cells run like spokes from the outer wall to the lumen, with germ cells between them, small spermatogonia at the wall, larger spermatocytes and spermatids farther in, and sperm in the lumen. Leydig cells sit outside the tubule at the upper right, beside a capillary. A small axis at the right shows the hypothalamus, the anterior pituitary, and round badges for LH and FSH. The student clicks LH: a navy dot travels to the Leydig cells, which darken and are labeled make testosterone, and testosterone dots move into the tubule. Then the student clicks FSH: a gold dot travels to a Sertoli cell, which turns gold and is labeled makes androgen-binding protein and inhibin.",
 pre:function(){S(["testis"]);setD(teLHHit,true);setD(teFSHHit,true);},
 play:function(a){return waitOn(teLHHit,pTeLH,a).then(function(){return teLHFSH(a);}).then(function(){return waitOn(teFSHHit,pTeFSH,a);}).then(function(){return run(tFSH,[[830,214],[830,290],[560,290],[384,300]],1100,a);}).then(function(){SERT[0].setAttribute("fill","#F3DFA8");teSerT.forEach(function(t){setD(t,true);});cap("Sperm production needs FSH and testosterone together.");});}},

{title:"The blood-testis barrier",
 text:["Neighboring Sertoli cells are joined near the outer wall by tight junctions, drawn in gold. Only the spermatogonia sit outside that seal, against the wall. Every later stage, from the spermatocytes inward, sits on the lumen side of it. Click one of the gold tight junctions."],
 ask:"What do these tight junctions keep apart, and why does that separation matter?",
 ans:["They divide the tubule into an outer compartment, which is open to the blood and holds the spermatogonia, and an inner compartment, sealed off from the blood, where the later germ cells develop. This seal is the blood-testis barrier.","It matters for two reasons. Developing sperm make proteins the immune system has never met, because they first appear at puberty, long after the immune system learned what belongs to the body. The barrier keeps immune cells and antibodies away from them so they are not attacked as foreign. It also lets the Sertoli cells control the fluid around the developing sperm, including keeping testosterone high with androgen-binding protein."],
 name:"blood-testis barrier",
 desc:"The tubule cross section, with short gold bars joining each pair of neighboring Sertoli cells just inside the outer wall. The student clicks one gold bar, and a gold dashed ring appears through all the junctions, separating the spermatogonia at the wall from the later germ cells inside. A note at the top says the tight junctions seal off the inner compartment: the blood-testis barrier.",
 pre:function(){S(["testis"]);setD(tjHit,true);},
 play:function(a){return waitOn(tjHit,pTj,a).then(function(){return tweenVal(0,1,500,a,function(k){tjRing.setAttribute("display","");tjRing.setAttribute("opacity",k);});}).then(function(){teStat[0].textContent="Tight junctions between Sertoli cells seal off";teStat[1].textContent="the inner compartment: the blood-testis barrier.";cap("The seal keeps developing sperm away from the blood.");});}},

{title:"Feedback in the male",
 text:["Like every axis, this one turns itself down. Two hormones from the testis feed back to the hypothalamus and pituitary. Click the Leydig cells to send testosterone back, then click the Sertoli cell to send inhibin back."],
 ask:"Where does testosterone act to turn the axis down, where does inhibin act, and which of the two holds back FSH alone?",
 ans:["Testosterone feeds back on both the hypothalamus, where it reduces GnRH release, and the anterior pituitary, where it reduces LH release in particular. Inhibin, from the Sertoli cells, acts on the anterior pituitary and reduces FSH release. Inhibin is the one that feeds back on FSH alone, and it does the same in both sexes, where it comes from the granulosa cells of the ovary.","Both are negative feedback, so when sperm production and testosterone run high, the signals that drive them are turned down, and when they fall, GnRH, LH and FSH rise again."],
 name:"inhibin",
 desc:"The tubule with the small axis at the right. The student clicks the Leydig cells, and a navy dashed line runs from them to both the hypothalamus and the anterior pituitary, each marked with a minus sign and labeled testosterone. Then the student clicks the Sertoli cell, and a gold dashed line runs from it to the anterior pituitary only, marked with a minus sign and labeled inhibin.",
 pre:function(){S(["testis"]);setD(teLeyT,true);teSerT.forEach(function(t){setD(t,true);});setD(teLeyHit,true);setD(teSerHit,true);
   setD(teFb,true);[fbT1,fbT2,fbI,fbTT,fbIT].concat(fbM).forEach(function(g){setD(g,false);});},
 play:function(a){return waitOn(teLeyHit,pTeT,a).then(function(){[fbT1,fbT2].forEach(function(l){setD(l,true);});return Promise.all([reveal(fbT1,700,a),reveal(fbT2,700,a),run(tTfb,[[482,138],[600,90],[674,48]],700,a)]);}).then(function(){setD(fbM[0],true);setD(fbM[1],true);setD(fbTT,true);return waitOn(teSerHit,pTeI,a);}).then(function(){setD(fbI,true);return Promise.all([reveal(fbI,900,a),run(tInh,[[452,346],[660,346],[890,346],[890,142]],900,a)]);}).then(function(){setD(fbM[2],true);setD(fbIT,true);cap("Inhibin holds back FSH; testosterone holds back GnRH and LH.");});}},

{title:"Testosterone from outside",
 text:["Some people take testosterone or related anabolic steroids to build muscle. The level of testosterone inside the testis normally runs far higher than the level in the blood, because the Leydig cells release it right beside the tubules. Click the button to give a testosterone shot."],
 ask:"After the shot, the testosterone level in the blood is high, yet sperm production falls. Why?",
 ans:["The high blood testosterone acts as negative feedback. GnRH, LH and FSH all fall. Without LH, the Leydig cells stop making testosterone, so the very high level inside the testis drops, even though the blood level is high. Without FSH and that local testosterone, the Sertoli cells cannot support sperm development, so sperm production falls and the testes can shrink.","So adding the male hormone lowers fertility. The step that explains it is the negative feedback on GnRH and LH, which shuts down the testis's own testosterone where sperm production needs it."],
 name:"suppression of the axis by exogenous testosterone",
 desc:"The tubule with both feedback lines drawn. The student clicks the button labeled testosterone shot. The feedback lines thicken, the GnRH arrow and the LH and FSH badges fade, the Leydig cells turn pale, and the germ cells inside the tubule fade. Notes at the top list what happened: LH and FSH fall, the Leydig cells go quiet, testosterone inside the testis falls, and sperm production drops.",
 pre:function(){S(["testis"]);setD(teFb,true);setD(shotB,true);},
 play:function(a){return waitOn(shotB,pShot,a).then(function(){chipOn(shotB,false);[fbT1,fbT2,fbI].forEach(function(l){l.setAttribute("stroke-width",6);});return wait(400,a);}).then(function(){teGarr.setAttribute("opacity",.2);teGT.setAttribute("opacity",.2);[teLH,teFSH].forEach(function(b){b.setAttribute("opacity",.25);});teStat[0].textContent="1. GnRH, LH and FSH fall.";return wait(600,a);})
   .then(function(){LEY.forEach(function(c){c.setAttribute("fill","#F4F1F0");});teStat[1].textContent="2. The Leydig cells go quiet.";return wait(600,a);})
   .then(function(){teStat[2].textContent="3. Testosterone inside the testis falls.";return tweenVal(1,0.3,700,a,function(v){GERM.setAttribute("opacity",v);});})
   .then(function(){teStat[3].textContent="4. Sperm production drops.";cap("Outside testosterone shuts down the testis's own supply.");});}},

{sec:"The ovarian cycle",comp:"Competencies 16, 18 and 22",
 title:"Days 1 to 7: follicles start to grow",
 text:["The ovary works in a cycle that averages 28 days. Day 1 is the first day of menstrual bleeding. The figure shows the ovary at the left, and on the right the hormone levels across the cycle: LH and FSH from the pituitary at the top, estradiol and progesterone from the ovary in the middle, and the thickness of the uterine lining at the bottom.","Early in the cycle, FSH rises a little and a small group of follicles starts to grow. Each follicle is an egg (oocyte) surrounded by granulosa cells, with a ring of theca cells outside. LH drives the theca cells to make androgens, and FSH drives the granulosa cells to turn those androgens into estradiol, the main estrogen. Click day 7."],
 ask:"Estradiol is rising, yet LH and FSH stay low. What is holding them down?",
 ans:["Negative feedback. At these moderate levels, estradiol from the growing follicles inhibits GnRH release from the hypothalamus and LH and FSH release from the pituitary. Inhibin from the granulosa cells adds extra inhibition of FSH.","As FSH falls, only one follicle, the one with the most FSH receptors and the best blood supply, keeps growing. This is the dominant follicle, and the others stop growing and break down."],
 name:"follicular phase",
 desc:"The 28 day cycle figure. At the left, the ovary holds four small follicles, and below it a box shows estradiol's feedback on the hypothalamus and pituitary with a minus sign. On the right, three stacked graphs: LH and FSH, estradiol and progesterone, and the lining thickness, with day 1 to 28 along the bottom. The student clicks the day 7 button. A gold line moves from day 1 to day 7 while the curves draw in: FSH rises a little, estradiol starts to rise, LH stays low, and the lining, shed at the start, begins to rebuild. In the ovary one follicle grows larger, with an outer ring of theca cells and an inner layer of granulosa cells, while the small ones shrink. The sign stays minus.",
 pre:function(){S(["cyc"]);setD(cyTG,true);setDay("day 7",7);},
 play:function(a){return waitOn(dayB,pD7,a).then(function(){setD(dayB,false);return cyRun(1,7,2200,a);}).then(function(){cap("Moderate estradiol keeps LH and FSH low.");});}},

{title:"The feedback flips",
 text:["By day 12 the dominant follicle is large and its granulosa cells are pouring out estradiol. Estradiol has now stayed high for about two days. Click the feedback sign to flip it."],
 ask:"The same hormone acting on the same hypothalamus and pituitary switches from braking to accelerating. What was different about the estradiol signal, and what does LH do next?",
 ans:["The estradiol level was both high and sustained, staying above a threshold for about two days. That switches its effect on the hypothalamus and pituitary from negative to positive feedback. GnRH release rises and the pituitary releases a large burst of LH, the LH surge, with a smaller rise in FSH.","This is positive feedback: the high estradiol makes the hypothalamus and pituitary release more LH instead of less, so the signal surges instead of correcting itself. Progesterone, which starts to rise from the follicle at this point, also helps the surge."],
 name:"LH surge",
 desc:"The cycle figure at about day 11, with estradiol near its peak and a minus sign in the feedback box. The student clicks the sign, and it changes to a maroon plus sign labeled LH surge. The gold day line then moves on to about day 13, and the LH curve shoots up into a tall, narrow peak while FSH rises a little.",
 pre:function(){S(["cyc"]);setD(cySignHit,true);setD(cyTG,true);cycState(11.5);},
 play:function(a){return waitOn(cySignHit,pSign,a).then(function(){cycState(11.8);return cyRun(11.8,13.6,1600,a);}).then(function(){cap("High, steady estradiol flips the feedback to positive.");});}},

{title:"Ovulation",
 text:["The LH surge does several things to the mature follicle. The egg finishes its first meiotic division, the follicle wall weakens and breaks open, and the theca and granulosa cells start to change into a new structure. Ovulation happens roughly a day and a half after the surge begins (about 32 to 36 hours). Click day 14."],
 ask:"Positive feedback cannot stop itself. What ends this loop?",
 ans:["The surge switches itself off. LH starts turning the follicle cells toward making progesterone, so estradiol falls even before the follicle ruptures, and the pituitary becomes less responsive. Then the follicle ruptures and releases the egg, and its remaining cells turn into the corpus luteum.","As the corpus luteum starts making progesterone along with estrogen, the feedback on the hypothalamus and pituitary goes back to negative. The egg, swept into the uterine tube, can be fertilized for only about a day."],
 name:"ovulation",
 desc:"The cycle figure at the top of the LH surge, with a large mature follicle in the ovary. The student clicks the day 14 button. The follicle disappears and the egg moves out of the ovary at its upper left edge. A dashed maroon line marks ovulation on all three graphs. Estradiol drops, the LH peak ends, and the feedback sign goes back to minus.",
 pre:function(){S(["cyc"]);setDay("day 14",14);cycState(13.6);},
 play:function(a){return waitOn(dayB,pD14,a).then(function(){setD(dayB,false);return cyRun(13.6,14.6,1000,a);}).then(function(){return tweenVal(0,1,600,a,function(k){place(oocyte,130-96*k,130-64*k);});}).then(function(){cap("Ovulation ends the surge, and estradiol falls.");});}},

{title:"The corpus luteum",
 text:["After ovulation the ruptured follicle fills in and becomes the corpus luteum, a yellowish gland (its name means yellow body). Its cells make progesterone and also estrogen and inhibin. This second half of the cycle is the luteal phase. Click day 21."],
 ask:"During these two weeks, no new follicle matures. Why not?",
 ans:["Progesterone together with estrogen, and inhibin from the corpus luteum, exert strong negative feedback on the hypothalamus and pituitary. LH and FSH stay low, so no new follicle gets the FSH it needs to grow toward ovulation.","Progesterone peaks about a week after ovulation. In the uterus it gets the lining ready for an embryo, which is the next section."],
 name:"luteal phase",
 desc:"The cycle figure just after ovulation. The student clicks the day 21 button. The day line moves to day 21. In the ovary, a gold corpus luteum grows where the follicle was. Progesterone rises to its peak and estradiol rises to a second, smaller peak, while LH and FSH stay low. The lining keeps thickening. The feedback sign stays minus.",
 pre:function(){S(["cyc"]);setDay("day 21",21);cycState(14.6);},
 play:function(a){return waitOn(dayB,pD21,a).then(function(){setD(dayB,false);return cyRun(14.6,21,2000,a);}).then(function(){cap("The corpus luteum makes progesterone and estrogen.");});}},

{title:"Why some cycles are longer",
 text:["Without a pregnancy, the corpus luteum has a built-in lifespan of about 12 days. It then breaks down into a scar, the corpus albicans, its hormones fall, and the next cycle begins. The whole 28 day cycle is shown. Click the button to stretch it into a 32 day cycle."],
 ask:"This person's cycles run 32 days. On about what day do they ovulate, and which phase got longer?",
 ans:["About day 18. The luteal phase stays fairly constant at about 14 days, because the corpus luteum's lifespan is fixed, so ovulation falls about 14 days before the next period starts. The extra four days are in the follicular phase, which is the part of the cycle whose length varies from person to person and from cycle to cycle.","That is why counting forward from the last period is a poor way to predict ovulation, while counting back 14 days from the next period works better."],
 name:"luteal phase length",
 desc:"The full 28 day cycle on the figure, with ovulation marked at day 14. The student clicks the button labeled a 32 day cycle. The figure redraws over 32 days: the follicular phase stretches, the LH surge and ovulation move to day 18, and the luteal phase still lasts 14 days, from day 18 to day 32.",
 pre:function(){S(["cyc"]);setD(cy32B,true);cycState(28,true);},
 play:function(a){return waitOn(cy32B,p32,a).then(function(){chipOn(cy32B,false);return tweenVal(28,32,900,a,function(v){CYL=v;cyFrame();cycState(v,true);});}).then(function(){CYL=32;cyFrame();cycState(32,true);cap("The follicular phase stretched; the luteal phase did not.");});}},

{sec:"The uterine cycle",comp:"Competencies 19 and 22",
 title:"Rebuilding the lining",
 text:["The lining of the uterus, the endometrium, has two layers. The deep basal layer stays from cycle to cycle. The functional layer on top grows each cycle and is shed if no embryo implants. Glands run up through it, and spiral arteries supply it. At day 4, menstruation is ending and only a thin layer is left. Click day 12."],
 ask:"Which hormone rebuilds the lining over the next week, and where is it coming from?",
 ans:["Estradiol, from the granulosa cells of the growing follicles. Estrogen makes the cells of the functional layer divide, so the lining thickens, the glands lengthen, and the spiral arteries grow up into it. This is the proliferative phase, and it lines up with the follicular phase of the ovary.","Estrogen also prepares the lining for the next phase by adding progesterone receptors, and it makes the mucus of the cervix thin and watery around ovulation, which helps sperm get through."],
 name:"proliferative phase",
 desc:"A large cross section of the uterine lining: the uterine cavity at the top, then the functional layer, the basal layer, and the muscle layer, the myometrium, at the bottom. Gray glands run up through the lining and maroon spiral arteries come up from the muscle. A small graph at the upper right shows estradiol and progesterone over 28 days with a gold marker at day 4, and three buttons below it for days 12, 21 and 28. The student clicks day 12. The marker moves to day 12 as estradiol climbs, the functional layer thickens, the glands lengthen and stay straight, and the arteries grow upward.",
 pre:function(){S(["lin"]);liTarget(0);linState(4);},
 play:function(a){return waitOn(liB[0],pLi[0],a).then(function(){return liRun(4,12,1800,a);}).then(function(){cap("Estradiol from the follicles rebuilds the lining.");});}},

{title:"Getting ready for an embryo",
 text:["Ovulation has happened, and the corpus luteum is now running the cycle. Click day 21."],
 ask:"Which hormone changes the lining now, what structure is it coming from, and what is the change preparing for?",
 ans:["Progesterone, from the corpus luteum, with help from its estrogen. Progesterone turns the lining from growing to secreting. The glands coil and release a fluid rich in glycogen and nutrients, the spiral arteries become more coiled, and the lining becomes ready to receive an embryo. This is the secretory phase, and it lines up with the luteal phase of the ovary.","Progesterone also makes the cervical mucus thick and sticky, forming a plug that keeps bacteria and sperm out."],
 name:"secretory phase",
 desc:"The lining at day 14, thick, with straight glands. The student clicks day 21. The marker moves to day 21 as progesterone climbs to its peak, the lining thickens further, the glands become coiled and gold dots of secretion appear in them, and the spiral arteries coil more tightly.",
 pre:function(){S(["lin"]);liTarget(1);linState(14);},
 play:function(a){return waitOn(liB[1],pLi[1],a).then(function(){return liRun(14,21,1800,a);}).then(function(){cap("Progesterone makes the glands coil and secrete.");});}},

{title:"When the corpus luteum dies",
 text:["No embryo has implanted, and the corpus luteum is near the end of its lifespan. Click day 28."],
 ask:"The lining is lost because a hormone goes away, not because a hormone arrives. Which hormone, and how does its loss make the lining come away?",
 ans:["Progesterone. As the corpus luteum breaks down, progesterone (and estrogen) falls. Without progesterone, the spiral arteries constrict, so the functional layer is starved of oxygen and dies. Then the arteries relax, blood flows into the dying tissue, and the functional layer breaks away and is shed with the blood. This is menstruation, the menstrual phase, and its first day is day 1 of the next cycle.","The basal layer stays behind, and estradiol from the next group of follicles rebuilds the functional layer from it. If the corpus luteum were rescued and progesterone stayed up, the lining would stay too, which is what happens in pregnancy."],
 name:"menstrual phase",
 desc:"The thick secretory lining at day 24. The student clicks day 28. The marker moves to day 28 as progesterone falls. The spiral arteries thin and turn pale as they constrict, and the functional layer turns pale. Then the functional layer lifts away into the uterine cavity and fades, with drops of blood, leaving the basal layer and a thin layer behind.",
 pre:function(){S(["lin"]);liTarget(2);linState(24);},
 play:function(a){return waitOn(liB[2],pLi[2],a).then(function(){return liRun(24,27.5,1400,a);}).then(function(){linState(27.5,{cons:true});return wait(900,a);}).then(function(){setD(liBlood,true);place(liBlood,0,0);
   return Promise.all([tweenVal(0,1,1000,a,function(k){liFun.setAttribute("transform","translate(0 "+(-34*k)+")");liFun.setAttribute("opacity",1-k);}),tweenVal(0,1,1000,a,function(k){place(liBlood,0,320-80*k);})]);})
   .then(function(){liFun.removeAttribute("transform");liFun.setAttribute("opacity",1);setD(liBlood,false);linState(28,{th:0.12,cons:true,ga:0.5,aa:2});
     cap("Falling progesterone lets the functional layer shed.");});}},

{title:"Reading the whole cycle",
 text:["Here is the whole cycle again, with all four hormone curves and the lining. In lab you will read graphs like this one and place ovulation on them. Click the peak that tells you when ovulation happened."],
 ask:"Which peak do you use to place ovulation, does ovulation come before or after it, and what single hormone would you measure in the second half of a cycle to prove that ovulation happened?",
 ans:["The LH surge. Ovulation comes after it, roughly a day and a half after the surge begins. The estradiol peak comes about a day before the LH surge and is the signal that set it off.","To prove ovulation happened, measure progesterone in the second half of the cycle, about a week after the expected ovulation. A clear rise means a corpus luteum formed, and a corpus luteum only forms from a follicle that ovulated. In a cycle without ovulation, the LH surge is missing and progesterone never rises."],
 name:"reading the cycle graph",
 desc:"The full 28 day cycle with all four curves: LH, FSH, estradiol and progesterone, and the lining thickness. The student clicks the tall, narrow LH peak. A dashed ovulation line appears at day 14, just after the LH peak, and notes appear by each peak: the LH surge, set off by estradiol; the estradiol peak, from the dominant follicle; and the progesterone peak, from the corpus luteum.",
 pre:function(){S(["cyc"]);cycState(28,false);setD(cyOvL,false);setD(cyOvT,false);setD(cyPeakHit,true);},
 play:function(a){return waitOn(cyPeakHit,pPeak,a).then(function(){setD(cyOvL,true);return reveal(cyOvL,600,a);}).then(function(){setD(cyOvT,true);setD(cyRead,true);cap("Ovulation follows the LH surge; progesterone proves it.");});}},

{sec:"Pregnancy",comp:"Competency 20",
 title:"Implantation and hCG",
 text:["If an egg is fertilized in the uterine tube, the embryo reaches the uterus and implants in the lining about a week after ovulation. The outer cells of the embryo, the trophoblast, which will form part of the placenta, start releasing a hormone called human chorionic gonadotropin, hCG. Click the embryo to implant it."],
 ask:"hCG keeps the corpus luteum alive past its usual 12 days. Which hormone's receptor does hCG bind, and why does that work?",
 ans:["The LH receptor. hCG is very similar in structure to LH, and the cells of the corpus luteum already carry LH receptors, so hCG binds them and keeps the corpus luteum alive and making progesterone and estrogen. This is the rescue of the corpus luteum.","Because progesterone stays high, the lining is not shed and there is no menstrual period. hCG passes into the urine, and home pregnancy tests work by detecting it."],
 name:"human chorionic gonadotropin (hCG)",
 desc:"The uterus at the left with a thick lining and a small embryo in the lining at the top. A uterine tube runs to the ovary at the right, which holds a gold corpus luteum. A blood vessel connects them. Below, a graph of progesterone from day 14 to day 36 shows a dashed line that falls at the end of a cycle with no pregnancy. The student clicks the embryo. Navy hCG dots travel through the blood to the corpus luteum, which grows, and a solid progesterone line is drawn that stays high instead of falling.",
 pre:function(){S(["preg"]);},
 play:function(a){return waitOn(embHit,pEmb,a).then(function(){setD(prHT,true);var p=[[262,136],[300,252],[560,252],[622,196],[640,176]];return Promise.all(prHcg.map(function(d,i){return wait(i*300,a).then(function(){return run(d,p,1300,a);});}));})
   .then(function(){return Promise.all([tweenVal(30,38,500,a,function(v){prCL.setAttribute("r",v);}),tweenVal(21,36,1500,a,function(v){prLine.setAttribute("d",prPath(v,true));})]);}).then(function(){setD(prLT,true);cap("hCG rescues the corpus luteum, so progesterone stays up.");});}},

{title:"The placenta takes over",
 text:["The graph runs from conception to birth, about 40 weeks counted in the usual way. hCG climbs fast, peaks in the first trimester, and then falls. Meanwhile the placenta grows and starts making its own progesterone and estrogen. Click the gold band, where the source of progesterone changes."],
 ask:"Suppose the placenta failed to take over and the corpus luteum died on its usual schedule. What would happen?",
 ans:["Progesterone would fall, the lining would break down and be shed just as at the end of a cycle, and the pregnancy would be lost. Around weeks 7 to 9, the placenta takes over most of the progesterone production from the corpus luteum (sources give slightly different weeks, and by the end of the first trimester the placenta is the main source). After that, the corpus luteum is no longer needed.","For the rest of pregnancy, placental progesterone keeps the uterine muscle quiet and maintains the lining; placental estrogen makes the uterus and the breast ducts grow; and relaxin, made by the corpus luteum and the placenta, is thought to soften the cervix and loosen the ligaments of the pelvis in preparation for birth (much of what is known about relaxin comes from animal studies)."],
 name:"luteal-placental shift",
 desc:"A graph from week 0 to week 40 of pregnancy. hCG, in navy, rises steeply to a peak in the first trimester and then falls to a low level. Estrogen, in maroon, rises slowly and then steeply toward birth. Total progesterone, in gold, rises across pregnancy. A gold band marks weeks 7 to 9. The student clicks the band. A dashed curve appears for progesterone from the corpus luteum, which fades away across the band while placental progesterone rises, and the band is labeled the placenta takes over. Three boxes appear below: progesterone keeps the uterine muscle quiet; estrogen grows the uterus and the breast ducts; relaxin softens the cervix and loosens pelvic ligaments.",
 pre:function(){S(["plac"]);},
 play:function(a){return waitOn(plHit,pPl,a).then(function(){setD(plCL,true);return reveal(plCL,900,a);}).then(function(){plCLT.forEach(function(t){setD(t,true);});setD(plHT,true);return wait(500,a);}).then(function(){setD(plEff,true);cap("The placenta takes over making progesterone.");});}},

{sec:"Labor and milk",comp:"Competency 21",
 title:"Labor as a loop",
 text:["Late in pregnancy, estrogen increases the number of oxytocin receptors on the uterine muscle, the myometrium, and the cervix softens. When the fetal head presses down on the cervix, stretch receptors there send signals up to the hypothalamus. Oxytocin neurons in the hypothalamus release oxytocin from their endings in the posterior pituitary, and oxytocin makes the uterine muscle contract. Prostaglandins made in the uterus add to the contractions. Click the box at the bottom to start a contraction, and keep going around the loop."],
 ask:"Each turn of the loop is stronger than the last. What finally breaks the loop, and why could nothing short of that stop it?",
 ans:["Delivery of the baby. This is positive feedback: stretch of the cervix causes oxytocin release, oxytocin causes stronger contractions, and stronger contractions push the head harder into the cervix, causing more stretch. A positive feedback loop keeps building until the stimulus itself is removed, and the stimulus here is the head stretching the cervix. Only when the baby is delivered does the stretch end and the loop stop.","Synthetic oxytocin is given in hospitals to start labor or to make contractions stronger."],
 name:"positive feedback in labor",
 desc:"A uterus in the middle with the fetus head down against the cervix. Five boxes surround it in a loop, joined by maroon arrows: at the bottom, the head pushes harder on the cervix; at the left, stretch receptors in the cervix fire; at the top, the hypothalamus; at the upper right, the posterior pituitary releases oxytocin; at the lower right, the uterine muscle contracts harder. The student clicks the bottom box three times. Each time, a dot travels around the loop, each box lights up as it is reached, the uterus squeezes, and the arrows grow thicker. Then the student clicks deliver the baby. The fetus moves down and out, and the arrows turn gray.",
 pre:function(){S(["lab"]);},
 play:function(a){var r=0;function round(){r++;return waitOn(laHit,pLaStart,a).then(function(){LAN.forEach(function(b){b.firstChild.setAttribute("fill","#fff");});laRound.textContent="contraction "+r;return laLoop(a,3*r);});}
   return round().then(round).then(round).then(function(){setD(laDel,true);return waitOn(laDel,pDel,a);}).then(function(){chipOn(laDel,false);laRound.textContent="";return tweenVal(0,1,1000,a,function(k){place(fetus,0,60*k);fetus.setAttribute("opacity",1-k);});}).then(function(){LAA.forEach(function(e){e.setAttribute("stroke",INK2);});laW(2);cap("Delivery removes the stretch, so the loop stops.");});}},

{title:"Making milk and letting it down",
 text:["During pregnancy, estrogen, progesterone and prolactin prepare the breast, but the high progesterone from the placenta keeps it from making milk. After delivery, the placenta is gone, progesterone falls, and milk production begins. The figure shows one alveolus, a small sac lined by alveolar cells that make milk, wrapped by myoepithelial cells that can contract. Milk leaves through a duct to the nipple. Click the button to let the baby suckle."],
 ask:"A stressed mother is making plenty of milk, but her baby gets little of it. Which hormone's job failed, and what does stress have to do with it?",
 ans:["Oxytocin, which controls milk ejection. Suckling sends signals up a nerve to the hypothalamus, which sets off two separate hormone responses. Prolactin from the anterior pituitary makes the alveolar cells produce milk, mostly for the next feeding. Oxytocin from the posterior pituitary makes the myoepithelial cells contract and squeeze the milk out into the ducts, the let-down. Her milk production is fine, so prolactin is working, but stress can inhibit oxytocin release, so the milk is made and not ejected.","Prolactin is controlled mainly by inhibition: dopamine from the hypothalamus normally holds it down, and suckling reduces that inhibition. Oxytocin release can also become a learned response, so a baby's cry alone can set off let-down."],
 name:"milk production and milk ejection",
 desc:"One alveolus of the breast in cross section: a ring of alveolar cells around a central space, with dark myoepithelial cells wrapped around the outside and a duct running down to the nipple. At the upper right are the hypothalamus, the anterior pituitary and the posterior pituitary. The student clicks the button labeled baby suckles. A gray dot travels up a nerve from the nipple to the hypothalamus. A navy prolactin dot then runs from the anterior pituitary to the alveolar cells, which darken, and milk droplets fill the alveolus. Then a maroon oxytocin dot runs from the posterior pituitary to the myoepithelial cells, which thicken as the alveolus squeezes, and milk droplets flow down the duct to the nipple.",
 pre:function(){S(["milk"]);},
 play:function(a){return waitOn(suckB,pSuck,a).then(function(){chipOn(suckB,false);return run(miD1,[[492,452],[580,330],[588,180],[606,66]],1100,a);})
   .then(function(){[miPrl,miPrlT].forEach(function(g){g.setAttribute("opacity",1);});return run(miD2,[[665,158],[520,214],[322,252]],900,a);})
   .then(function(){ALV.forEach(function(p){p.setAttribute("fill","#E8C9A8");});setD(miMilk,true);setD(miRes[0],true);setD(miRes[1],true);return wait(500,a);})
   .then(function(){[miOxy,miOxyT].forEach(function(g){g.setAttribute("opacity",1);});return run(miD3,[[815,158],[815,404],[640,404],[364,338]],1100,a);})
   .then(function(){MYO.forEach(function(m){m.setAttribute("ry",9);});setD(miRes[2],true);setD(miRes[3],true);
     return Promise.all([tweenVal(1,0.93,400,a,function(v){miAlv.setAttribute("transform","translate(250 300) scale("+v+") translate(-250 -300)");})].concat(miOut.map(function(d,i){return wait(i*250,a).then(function(){return run(d,[[300,350],[440,454]],700,a);});})));})
   .then(function(){cap("Prolactin makes the milk; oxytocin lets it down.");});}},

{sec:"Review",comp:"Competencies 16 to 21",
 title:"Summary with the scientific terms",
 text:["GnRH from the hypothalamus reaches the anterior pituitary in pulses and releases LH and FSH. In the testis, LH drives the Leydig cells to make testosterone, and FSH and testosterone drive the Sertoli cells to support spermatogenesis behind the blood-testis barrier and to make androgen-binding protein and inhibin. Testosterone feeds back on GnRH and LH, and inhibin on FSH. In the ovary, LH acts on theca cells and FSH on granulosa cells to make estradiol. Moderate estradiol is negative feedback; high, sustained estradiol is positive feedback and sets off the LH surge, and ovulation follows. The corpus luteum makes progesterone and estrogen for a fairly fixed 14 day luteal phase.","In the uterus, estradiol drives the proliferative phase and progesterone the secretory phase, and falling progesterone makes the spiral arteries constrict and the functional layer shed. In pregnancy, hCG acts on the LH receptor to rescue the corpus luteum until the placenta takes over progesterone production. Labor is positive feedback through oxytocin that ends with delivery, and after birth prolactin makes milk while oxytocin ejects it. Click the button to run the whole cycle one more time."],
 ask:"Without scrolling back: a blood test on day 21 of a 28 day cycle shows a high progesterone level. What does that tell you happened about a week earlier, and which structure made the progesterone?",
 ans:["Ovulation happened, around day 14. The progesterone came from the corpus luteum, which forms only from a follicle that has ovulated, and which makes the most progesterone about a week after ovulation.","If you could not get there, sketch the four hormone curves from memory and label what made each peak, the way your Competency Study Guide asks."],
 desc:"The 28 day cycle figure, empty at day 1. The student clicks the button labeled run the whole cycle. The gold day line sweeps from day 1 to day 28 while all the curves draw in: FSH rises a little, estradiol climbs to a peak, the feedback sign flips to plus and LH surges, ovulation is marked at day 14, the corpus luteum grows and progesterone peaks, and the lining thickens and then begins to shrink as the hormones fall.",
 pre:function(){S(["cyc"]);setD(runB,true);},
 play:function(a){return waitOn(runB,pRun,a).then(function(){chipOn(runB,false);return cyRun(1,28,6000,a);}).then(function(){cap("One cycle: follicle, surge, ovulation, corpus luteum.");});}}
];
