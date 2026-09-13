const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath: process.env.CHROME || undefined}); const p = await b.newPage({viewport:{width:1100,height:900}});
  const errs=[]; p.on('pageerror', e=>errs.push(e.message)); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
  let pass=0, fail=0; const ok=(c,m)=>{ if(c){pass++;} else {fail++; console.log('FAIL', m);} };
  await p.goto('http://localhost:8765/rx-cards.html?week=2', {waitUntil:'networkidle'});
  await p.waitForFunction(()=>window.BIO005_RX && document.getElementById('nNew').textContent!=='0');
  let s = await p.evaluate(()=>({nNew:+nNew.textContent,nRev:+nRev.textContent,line:dueline.textContent,weeks:document.getElementById('weeks').value,cards:BIO005_RX.cards.length,nav:!!document.querySelector('.b5site'),title:document.title,h2:[...document.querySelectorAll('h2')].map(h=>h.textContent)}));
  console.log(s);
  ok(s.cards===4980,'4980 cards flattened'); ok(s.nNew===12,'12 new by default'); ok(s.nRev===0,'no reviews yet'); ok(s.weeks==='2','week 2 selected'); ok(s.nav,'site nav injected');
  // week derived from competency: count cards in play for weeks<=2
  const inplay = await p.evaluate(()=>BIO005_RX.cards.filter(c=>c.week<=2).length); console.log('in play w1-2',inplay); ok(inplay>200,'week from competency');
  await p.click('#start'); await p.waitForSelector('#review:not([hidden])');
  ok(await p.evaluate(()=>document.activeElement.classList.contains('opt')),'focus on first option');
  // answer correctly via keyboard
  const ci = await p.evaluate(()=>{ const c=BIO005_RX.cards.find(x=>x.q===stem.textContent); return c.ci; });
  await p.keyboard.press(String(ci+1));
  ok(await p.evaluate(()=>!verdict.hidden && verdict.classList.contains('right')),'right verdict');
  ok(await p.evaluate(()=>[...rate.querySelectorAll('button')].every(b=>!b.disabled)),'all four ratings open after right');
  ok(await p.evaluate(()=>iv2.textContent==='1 day' && iv3.textContent==='4 days'),'new card intervals good=1 easy=4');
  await p.keyboard.press('3'); // Good
  // answer wrong
  const ci2 = await p.evaluate(()=>{ const c=BIO005_RX.cards.find(x=>x.q===stem.textContent); return c.ci; });
  await p.keyboard.press(String(((ci2+1)%4)+1));
  ok(await p.evaluate(()=>verdict.classList.contains('wrong')),'wrong verdict');
  ok(await p.evaluate(()=>{const bs=[...rate.querySelectorAll('button')]; return !bs[0].disabled && bs[1].disabled && bs[2].disabled && bs[3].disabled;}),'only Again after a miss');
  ok(await p.evaluate(()=>document.activeElement===rate.querySelector('button')),'focus on Again after miss');
  await p.keyboard.press('1');
  const tot = await p.evaluate(()=>prog.textContent); console.log('progress', tot); ok(/of 13$/.test(tot),'missed card re-queued (13)');
  await p.keyboard.press('Escape');
  const f = await p.evaluate(()=>({seen:fSeen.textContent,right:fRight.textContent,tom:fTomorrow.textContent,gaps:[...document.querySelectorAll('#gaps li b')].map(x=>x.textContent),active:document.activeElement.id}));
  console.log(f); ok(f.seen==='2'&&f.right==='1','session counts'); ok(f.gaps.length===1,'one gap listed'); ok(f.active==='fin-h','focus moved to finish heading');
  // persistence
  const st = await p.evaluate(()=>JSON.parse(localStorage.getItem('bio005-rx-v1')));
  const recs=Object.values(st.cards); console.log(recs); ok(recs.length===2,'two records saved'); ok(recs.some(r=>r.st==='rev'&&r.iv===1)&&recs.some(r=>r.st==='learn'),'states saved');
  // reload: relearning card due tomorrow, not today
  await p.reload({waitUntil:'networkidle'}); await p.waitForFunction(()=>window.BIO005_RX);
  const s2 = await p.evaluate(()=>({nNew:+nNew.textContent,nLearn:+nLearn.textContent,nRev:+nRev.textContent,fc:[...document.querySelectorAll('#forecast .n')].map(x=>+x.textContent)}));
  console.log(s2); ok(s2.nNew===10,'new limit counts today\'s 2'); ok(s2.fc[1]===2,'2 due tomorrow in forecast');
  // SM-2 math
  const m = await p.evaluate(()=>[BIO005_RX.next({st:'rev',iv:10,ease:2.5},2).iv, BIO005_RX.next({st:'rev',iv:10,ease:2.5},1).iv, BIO005_RX.next({st:'rev',iv:10,ease:2.5},3).iv, BIO005_RX.next({st:'rev',iv:10,ease:2.5},0), BIO005_RX.next({st:'rev',iv:150,ease:2.5},2).iv, BIO005_RX.next({st:'rev',iv:5,ease:1.3},0).ease]);
  console.log(m); ok(m[0]===25&&m[1]===12&&m[2]===33,'good/hard/easy multipliers'); ok(m[3].iv===1&&m[3].ease===2.3&&m[3].st==='learn','again resets'); ok(m[4]===180,'cap 180'); ok(m[5]===1.3,'ease floor');
  await p.screenshot({path:'shots/rx-home.png',fullPage:true});
  await p.click('#start'); await p.waitForSelector('#review:not([hidden])'); await p.keyboard.press('2'); await p.screenshot({path:'shots/rx-review.png',fullPage:true});
  // axe-lite: every button has a name, headings ordered, landmarks
  const a11y = await p.evaluate(()=>{ const bad=[...document.querySelectorAll('button,a')].filter(b=>!(b.textContent.trim()||b.getAttribute('aria-label'))); return {unnamed:bad.length, main:!!document.querySelector('main'), skip:!!document.querySelector('a.skip'), lang:document.documentElement.lang, italics:getComputedStyle(document.querySelector('em')||document.body).fontStyle}; });
  console.log(a11y); ok(a11y.unnamed===0&&a11y.main&&a11y.skip,'a11y basics');

  // ---- weak spots and drill ----
  await p.goto('http://localhost:8765/rx-cards.html?week=2', {waitUntil:'networkidle'}); await p.waitForFunction(()=>window.BIO005_RX);
  const w = await p.evaluate(()=>({n:BIO005_RX.weak().length, li:document.querySelectorAll('#weak li').length, rowHidden:document.getElementById('weakrow').hidden, wk:[...document.querySelectorAll('#week .n')].map(x=>+x.textContent)}));
  console.log('weak', w); ok(w.n===1&&w.li===1&&!w.rowHidden,'one weak competency listed after the earlier miss'); ok(w.wk[6]>=2,'today shows cards answered');
  await p.click('#weak li button'); await p.waitForSelector('#review:not([hidden])');
  const d = await p.evaluate(()=>({mode:!document.getElementById('mode').hidden, prog:prog.textContent, st:mState.textContent}));
  console.log('drill', d); ok(d.mode&&/of 1$/.test(d.prog),'drill holds only the weak card');
  const ci3 = await p.evaluate(()=>{ const c=BIO005_RX.cards.find(x=>x.q===stem.textContent); return c.ci; });
  await p.keyboard.press(String(ci3+1)); await p.keyboard.press('3');
  const after = await p.evaluate(()=>{ const st=JSON.parse(localStorage.getItem('bio005-rx-v1')); const r=Object.values(st.cards).find(r=>r.lapses===1); return {st:r.st, iv:r.iv, line:finline.textContent}; });
  console.log(after); ok(after.st==='learn'&&after.iv===1,'drill right answer did not advance a card already reviewed today'); ok(/drill/.test(after.line),'drill finish line');
  console.log('pass', pass, 'fail', fail);
  console.log('errors:', errs, '\npass', pass, 'fail', fail);
  await b.close();
})();
