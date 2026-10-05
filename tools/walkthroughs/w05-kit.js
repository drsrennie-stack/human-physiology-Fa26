/* ======================= build scene ======================= */
/* Week 5 scene kit. Oct 4 2026. Shared helpers prepended to every Week 5
   scene by tools/walkthroughs/assemble_w05.py. Same engine as Week 4: el,
   tx, place, tweenPath, tweenVal, wait, markers and arrow come from the
   shell. Everything here only draws and moves; no step logic lives here. */
markers();
var REG={};
function G(n,p){var g=el("g",{},p||svg);REG[n]=g;return g;}
function only(l){for(var k in REG)REG[k].setAttribute("display","none");l.forEach(function(k){if(REG[k])REG[k].setAttribute("display","");});}
var GOLD="#C9A14A",TISS="#F6E9E6",FLUID="#E3F0F6",FLOW="#2F6F8F"; /* tissue, fluid and fluid-flow tints for figures only, never text */

/* a line through points, optionally dashed */
function poly(p,pts,col,w,dash){
  var a={points:pts.map(function(q){return q[0]+","+q[1];}).join(" "),fill:"none",stroke:col||NAVY,"stroke-width":w||5,"stroke-linejoin":"round","stroke-linecap":"round"};
  if(dash)a["stroke-dasharray"]=dash;
  return el("polyline",a,p);
}
/* reveal a line from its start, then leave it solid */
function reveal(line,dur,a){
  var L=line.getTotalLength?line.getTotalLength():0;
  if(!a||reduce||!L){line.removeAttribute("stroke-dashoffset");if(line._dash)line.setAttribute("stroke-dasharray",line._dash);else line.removeAttribute("stroke-dasharray");return Promise.resolve();}
  line.setAttribute("stroke-dasharray",L+" "+L);line.setAttribute("stroke-dashoffset",L);
  return tweenVal(L,0,dur,a,function(v){line.setAttribute("stroke-dashoffset",v);}).then(function(){line.removeAttribute("stroke-dashoffset");if(line._dash)line.setAttribute("stroke-dasharray",line._dash);else line.removeAttribute("stroke-dasharray");});
}
/* a traveling signal: a filled dot with a white rim */
function dot(p,col,r){var g=el("g",{},p);el("circle",{r:r||11,fill:col||MAROON,stroke:"#fff","stroke-width":2.5},g);g.setAttribute("display","none");return g;}
function run(g,pts,dur,a,keep){
  g.setAttribute("display","");place(g,pts[0][0],pts[0][1]);
  return tweenPath(g,pts.slice(1),dur,a).then(function(){if(!keep)g.setAttribute("display","none");});
}
function hide(list){list.forEach(function(g){g.setAttribute("display","none");});}
/* a round badge with a sign or a short word inside */
function badge(p,x,y,s,col,r){var g=el("g",{},p);el("circle",{r:r||16,fill:col||NAVY},g);var t=el("text",{"class":"iw","font-size":(r||16)+4},g);t.textContent=s;place(g,x,y);g._t=t;g._c=g.firstChild;return g;}
function setBadge(g,s,col){g._t.textContent=s;g._c.setAttribute("fill",col);g.setAttribute("display","");}
/* a white labeled box */
function box(p,x,y,w,h,s,cls,size,stroke){
  var g=el("g",{},p);
  el("rect",{x:x,y:y,width:w,height:h,rx:8,fill:"#fff",stroke:stroke||NAVY,"stroke-width":2.5},g);
  var lines=String(s).split("\n"),sz=size||15,y0=y+h/2-(lines.length-1)*(sz+3)/2+sz*0.35;
  g._t=lines.map(function(l,i){return tx(g,x+w/2,y0+i*(sz+3),l,cls||"tn",sz,"middle");});
  return g;
}
/* a spike train: n identical spikes spread across width w, baseline at y */
function trainD(x,y,w,n,h){
  if(n<=0)return "M"+x+" "+y+" h"+w;
  var d="M"+x+" "+y,step=w/n,cx=x;
  for(var i=0;i<n;i++){var sx=x+step*(i+0.5);d+=" H"+(sx-3)+" L"+sx+" "+(y-h)+" L"+(sx+3)+" "+y;}
  return d+" H"+(x+w);
}
function trainPath(p,col,w){return el("path",{d:"",fill:"none",stroke:col||NAVY,"stroke-width":w||3,"stroke-linejoin":"round"},p);}
/* spikes that only appear in part of a window: on from fraction f0 to f1, n spikes */
function trainWin(x,y,w,f0,f1,n,h){
  var a=x+w*f0,b=x+w*f1,d="M"+x+" "+y+" H"+a;
  var step=(b-a)/Math.max(n,1);
  for(var i=0;i<n;i++){var sx=a+step*(i+0.5);d+=" H"+(sx-3)+" L"+sx+" "+(y-h)+" L"+(sx+3)+" "+y;}
  return d+" H"+(x+w);
}
/* grow a spike train across its window, left to right */
function growTrain(path,fn,dur,a){
  if(!a||reduce){path.setAttribute("d",fn(1));return Promise.resolve();}
  return tweenVal(0,1,dur,a,function(k){path.setAttribute("d",fn(k));});
}
/* the caption line, drawn last so it sits on top */
var CAP=null;
function makeCap(){var g=G("cap");CAP=tx(g,392,528,"","tn",18,"middle");return g;}
function cap(s){if(CAP)CAP.textContent=s||"";}

/* ---- Oct 5 2026: student actions, shared by every Week 5 walkthrough ---- */
/* Oct 5 2026: while a step waits for the student's action, Next stays
   locked for students (not in preview), so the action cannot be skipped. */
function lockNext(on){var nb=document.getElementById("nextBtn");if(!nb||(typeof PREVIEW!=="undefined"&&PREVIEW))return;if(on)nb.disabled=true;else nb.disabled=false;}
function promptAt(parent,x,y,lines,ax,ay,rx,ry,rr){
  var g=el("g",{},parent);
  var ring=el("circle",{cx:rx,cy:ry,r:rr,"data-r":rr,fill:"none",stroke:GOLD,"stroke-width":4},g);
  el("path",{d:"M"+(x-6)+" "+(y-6)+" Q"+((x+ax)/2)+" "+(y-14)+" "+ax+" "+ay,fill:"none",stroke:GDEEP,"stroke-width":4,"marker-end":"url(#ag)"},g);
  lines.forEach(function(l,i){tx(g,x,y+i*22,l,"tm",17,"start");});
  g.setAttribute("display","none");g._ring=ring;return g;}
function waitOn(tgt,prm,a){
  if(!a||reduce){if(prm)prm.setAttribute("display","none");return Promise.resolve();}
  if(prm)prm.setAttribute("display","");
  tgt.style.cursor="pointer";
  return new Promise(function(res){var my=runId,done=false,k=0,t;setTimeout(function(){if(!done)lockNext(true);},0);
    function fin(){if(done)return;done=true;clearInterval(t);if(my===runId)lockNext(false);tgt.removeEventListener("click",fin);document.removeEventListener("keydown",key,true);if(prm)prm.setAttribute("display","none");res();}
    function key(e){if((e.key==="Enter"||e.key===" ")&&!/TEXTAREA|INPUT|BUTTON|SELECT|^A$/.test(e.target.tagName||"")){e.preventDefault();fin();}}
    tgt.addEventListener("click",fin);document.addEventListener("keydown",key,true);
    t=setInterval(function(){if(my!==runId){fin();return;}k++;if(prm&&prm._ring){var r0=+prm._ring.getAttribute("data-r");prm._ring.setAttribute("r",r0+((k%10)<5?(k%5):5-(k%5))*2);}},70);});}

