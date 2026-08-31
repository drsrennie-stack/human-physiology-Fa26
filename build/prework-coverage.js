/* Does every competency in her file appear, exactly once, on the right
   pre-work page? Checked against the rendered HTML, not the builder, so a
   bug in generation would show up here rather than being assumed away. */
const { chromium } = require('playwright');
global.window = {};
require('./bio005-hub/bio005-competencies.remapped.js');
const C = window.BIO005_COMPETENCIES;

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const seen = new Map();          // id -> [pages it appeared on]
  let cards = 0;

  for (let wk = 1; wk <= 15; wk++) {
    const p = await b.newPage();
    await p.goto('file://' + require('path').resolve(`prework-week-${String(wk).padStart(2,'0')}.html`));
    await p.waitForTimeout(250);
    const found = await p.evaluate(() => [...document.querySelectorAll('.pw-card')].map(c => ({
      id: c.getAttribute('data-id'),
      name: c.querySelector('h3').textContent.trim(),
      can: c.querySelector('.pw-can').textContent.trim(),
      dok: c.querySelector('.pw-dok').textContent.trim()
    })));
    cards += found.length;
    found.forEach(f => {
      if (!seen.has(f.id)) seen.set(f.id, []);
      seen.get(f.id).push({ wk, ...f });
    });
    const want = C.filter(c => c.week === wk);
    const missing = want.filter(c => !found.find(f => f.id === c.id));
    const extra = found.filter(f => !want.find(c => c.id === f.id));
    console.log(`week ${String(wk).padStart(2)}  in your file ${String(want.length).padStart(2)}  on the page ${String(found.length).padStart(2)}` +
      (missing.length ? `  MISSING ${missing.map(m=>m.id).join(',')}` : '') +
      (extra.length ? `  EXTRA ${extra.map(m=>m.id).join(',')}` : '') +
      (!missing.length && !extra.length ? '  ok' : ''));
    await p.close();
  }

  console.log(`\ncards rendered: ${cards}   competencies in your file: ${C.length}`);
  const never = C.filter(c => !seen.has(c.id));
  const twice = [...seen.entries()].filter(([, v]) => v.length > 1);
  console.log('appearing nowhere:', never.length ? never.map(c=>c.id).join(', ') : 'none');
  console.log('appearing twice:  ', twice.length ? twice.map(([k,v])=>k+' on '+v.map(x=>x.wk).join('+')).join(', ') : 'none');

  // is the wording hers, verbatim?
  let drift = 0;
  C.forEach(c => {
    const f = (seen.get(c.id) || [])[0];
    if (!f) return;
    if (f.name !== c.name || f.can !== c.can) { drift++; if (drift < 4) console.log('  DRIFT', c.id); }
  });
  console.log('cards whose wording differs from your file:', drift);

  // do the note prompts follow her dok field?
  const tag = { 1: 'Say it', 2: 'Use it', 3: 'Reason it' };
  let bad = 0;
  C.forEach(c => { const f = (seen.get(c.id) || [])[0]; if (f && f.dok !== tag[c.dok]) bad++; });
  console.log('cards whose prompt does not match your dok level:', bad);

  await b.close();
})();
