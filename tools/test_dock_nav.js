/* Site nav and Course tools dock headless test. Serve the repo root on :8765, then: node tools/test_dock_nav.js. 28 checks. */
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath: process.env.CHROME || undefined});
  let pass=0, fail=0; const ok=(c,m)=>{ if(c)pass++; else {fail++; console.log('FAIL',m);} };
  for (const f of ['week-01.html','rx-cards.html','slides-p-membrane-transport.html','welcome.html','practice-exam.html','unit-01.html','patient-chart-book.html']) {
    const p = await b.newPage({viewport:{width:1200,height:900}}); const errs=[];
    p.on('pageerror', e=>errs.push(e.message));
    await p.goto('http://localhost:8765/'+f, {waitUntil:'networkidle'}); await p.waitForTimeout(300);
    const r = await p.evaluate(()=>({launch:!!document.querySelector('.bd-launch'), dockScripts:document.querySelectorAll('script[src*="bio005-dock.js"]').length, back:!!document.querySelector('.b5-back'), backBottom:(document.querySelector('.b5-back')||{}).style?.bottom, stages:[...document.querySelectorAll('.b5site button[data-stage]')].length}));
    console.log(f, JSON.stringify(r), errs.length?errs:'');
    ok(errs.length===0,'no errors '+f); ok(r.launch,'dock launcher present '+f); ok(r.dockScripts===1,'dock loaded once '+f);
    await p.close();
  }
  const p = await b.newPage({viewport:{width:1200,height:900}}); const errs=[]; p.on('pageerror', e=>errs.push(e.message));
  await p.goto('http://localhost:8765/week-01.html', {waitUntil:'networkidle'}); await p.waitForTimeout(300);
  await p.click('#b5-practice-btn'); await p.waitForTimeout(400);
  const d = await p.evaluate(()=>{ const heads=[...document.querySelectorAll('.bd-gh')]; return {open:document.querySelector('.bd-panel').classList.contains('on'), groups:heads.map(h=>h.textContent.trim().replace(/\s+/g,' ')), expanded:heads.filter(h=>h.getAttribute('aria-expanded')==='true').map(h=>h.getAttribute('data-grp')), focused:document.activeElement.getAttribute('data-grp'), tiles:[...document.querySelectorAll('#'+heads.find(h=>h.getAttribute('data-grp')==='2 Practice').getAttribute('aria-controls')+' .bd-tile')].map(t=>t.querySelector('.bd-n').textContent.trim())}; });
  console.log(JSON.stringify(d,null,1));
  ok(d.open,'dock opens from the Practice button'); ok(d.expanded.length===1&&d.expanded[0]==='2 Practice','only Practice expanded'); ok(d.focused==='2 Practice','focus on the group heading');
  ok(d.tiles.some(t=>/Kahoot/.test(t))&&d.tiles.some(t=>/Physiology gamesSoon|Physiology games/.test(t)),'kahoot and games tiles');
  await p.screenshot({path:'shots/dock-practice.png'});
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  ok(await p.evaluate(()=>!document.querySelector('.bd-panel').classList.contains('on')),'Escape closes the dock');
  // all links in dock resolve (local files)
  const hrefs = await p.evaluate(()=>[...document.querySelectorAll('.bd-tile[href]')].map(a=>a.getAttribute('href')));
  const fs=require('fs'); const base='https://drsrennie-stack.github.io/human-physiology-Fa26/';
  const missing=hrefs.filter(h=>h.startsWith(base)).map(h=>h.slice(base.length).split(/[?#]/)[0]).filter(h=>!fs.existsSync('/tmp/claude-0/-home-claude/ef636122-ecd5-5523-a73b-bedab5c19592/scratchpad/human-physiology-Fa26/'+h));
  console.log('missing',missing); ok(missing.length===0,'dock links resolve');
  await p.click('.bd-launch'); await p.waitForTimeout(400);
  const g = await p.evaluate(()=>[...document.querySelectorAll('.bd-gh')].map(h=>h.getAttribute('data-grp')+':'+h.getAttribute('aria-expanded')));
  console.log(g);
  await p.screenshot({path:'shots/dock-open.png'});
  // mobile
  const m = await b.newPage({viewport:{width:390,height:800}});
  await m.goto('http://localhost:8765/week-01.html', {waitUntil:'networkidle'}); await m.waitForTimeout(300);
  const mv = await m.evaluate(()=>({launch:getComputedStyle(document.querySelector('.bd-launch')).display, stage:getComputedStyle(document.querySelector('li.b5-stage')).display}));
  console.log('mobile',mv); ok(mv.launch!=='none'&&mv.stage==='none','mobile: dock pill shows, stage items hidden');
  await m.click('.bd-launch'); await m.waitForTimeout(400); await m.screenshot({path:'shots/dock-mobile.png'});
  console.log('errors',errs,'pass',pass,'fail',fail);
  await b.close();
})();
