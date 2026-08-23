const { chromium } = require('/home/claude/pft/node_modules/playwright');
const say = (...a) => console.log(...a);

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await b.newPage({ viewport: { width: 1280, height: 1000 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await page.goto('file:///home/claude/lab/out/week-01-foundations.html');
  await page.waitForTimeout(700);

  const R = await page.evaluate(() => {
    const r = window.LAB.W1.ROSA;
    return { sbp: r.sbp, dbp: r.dbp, hr: r.hr, rr: r.rr, temp: r.temp, spo2: r.spo2, key: r.pres.key, map: r.map, pp: r.pp };
  });
  say('ROSA:', JSON.stringify(R));

  const rows = await page.$$eval('#case-root .chart-t tbody tr[data-row]', rs => rs.map(r => r.dataset.row));
  say('CHART ROWS:', rows.join(', '));

  const fb = () => page.$$eval('#case-root .chart-fbrow:not([hidden]) .chart-fb', n => n.map(x => x.textContent.trim()));

  // ---- TEST 1: press check with everything blank ----
  say('\n=== test 1: submit an empty chart ===');
  await page.evaluate(() => [...document.querySelectorAll('#case-root button')].find(b => b.textContent === 'Check my chart').click());
  await page.waitForTimeout(300);
  let msgs = await fb();
  say('rows flagged:', msgs.length, '(expect 8, the two derived rows are still pending)');
  say('first message:', JSON.stringify(msgs[0].slice(0, 130)));

  // ---- TEST 2: chart every value correctly but mark the two missing rows "within range" ----
  say('\n=== test 2: pretend the unmeasured rows were normal ===');
  await page.evaluate((R) => {
    const set = (k, v, f) => {
      const i = document.getElementById('ch-c1-' + k + '-v');
      const s = document.getElementById('ch-c1-' + k + '-f');
      if (i && v !== null) i.value = String(v);
      if (s) s.value = f;
    };
    set('temp', R.temp, 'within');
    set('hr', R.hr, R.hr < 60 ? 'below' : R.hr > 100 ? 'above' : 'within');
    set('rr', R.rr, 'within');
    set('sbp', R.sbp, R.sbp > 130 ? 'above' : R.sbp < 90 ? 'below' : 'within');
    set('dbp', R.dbp, R.dbp > 85 ? 'above' : R.dbp < 60 ? 'below' : 'within');
    set('spo2', R.spo2, 'within');
    set('pain', null, 'within');   // <-- the lie: never measured, claimed normal
    set('glu', null, 'within');    // <-- same
  }, R);
  await page.evaluate(() => [...document.querySelectorAll('#case-root button')].find(b => b.textContent === 'Check my chart').click());
  await page.waitForTimeout(300);
  msgs = await fb();
  say('rows still wrong:', msgs.length, '(expect 2)');
  msgs.forEach(m => say('   ', JSON.stringify(m.slice(0, 140))));

  // ---- TEST 3: a value charted right but flagged wrong ----
  say('\n=== test 3: correct value, wrong reading ===');
  await page.evaluate(() => {
    document.getElementById('ch-c1-pain-f').value = 'na';
    document.getElementById('ch-c1-glu-f').value = 'na';
    document.getElementById('ch-c1-spo2-f').value = 'below';   // it is normal
  });
  await page.evaluate(() => [...document.querySelectorAll('#case-root button')].find(b => b.textContent === 'Check my chart').click());
  await page.waitForTimeout(300);
  msgs = await fb();
  say('rows still wrong:', msgs.length, '(expect 1)');
  say('message:', JSON.stringify(msgs[0].slice(0, 190)));

  // ---- TEST 4: fix it, chart should complete ----
  say('\n=== test 4: an honest chart ===');
  await page.evaluate(() => { document.getElementById('ch-c1-spo2-f').value = 'within'; });
  await page.evaluate(() => [...document.querySelectorAll('#case-root button')].find(b => b.textContent === 'Check my chart').click());
  await page.waitForTimeout(400);
  const live = await page.$eval('#case-root .chart-wrap', () => {
    const ns = [...document.querySelectorAll('#case-root [aria-live]')].map(n => n.textContent.trim()).filter(Boolean);
    return ns[ns.length - 1];
  });
  say('result:', JSON.stringify(live));
  const charted = await page.evaluate(() => window.LAB.charted.length);
  say('rows recorded for the PDF:', charted, '(expect 8)');

  // ---- derived rows fill from the worked steps ----
  say('\n=== derived rows carry down from the working ===');
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('#case-root .btn.cta')].filter(x => !x.disabled);
    if (b.length) b[0].click();
  });
  await page.waitForTimeout(400);
  const before = await page.evaluate(() => document.getElementById('ch-c1-map-v').value);
  say('MAP row before the working:', JSON.stringify(before), '(expect empty)');

  async function step(idx, value) {
    return page.evaluate(({ idx, value }) => {
      const ins = [...document.querySelectorAll('#case-root .ws-entry input')];
      const btns = [...document.querySelectorAll('#case-root .ws-step')].map(s => s.querySelector('button'));
      ins[idx].value = String(value);
      btns[idx].click();
    }, { idx, value });
  }
  await step(0, R.pp); await page.waitForTimeout(120);
  await step(1, Math.round(R.pp / 3 * 10) / 10); await page.waitForTimeout(120);
  await step(2, Math.round(R.map * 10) / 10); await page.waitForTimeout(120);
  await step(3, Math.round((R.map - 65) * 10) / 10); await page.waitForTimeout(400);
  const after = await page.evaluate(() => ({
    map: document.getElementById('ch-c1-map-v').value,
    pp: document.getElementById('ch-c1-pp-v').value,
    mapFlag: document.getElementById('ch-c1-map-f').value,
    charted: window.LAB.charted.length
  }));
  say('MAP row after:', JSON.stringify(after), '(expect the student\'s own values, 10 rows recorded)');

  // ---- the note ----
  say('\n=== the note ===');
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('#case-root .btn.cta')].filter(x => !x.disabled);
    if (b.length) b[0].click();
  });
  await page.waitForTimeout(400);
  // run the simulation and the loop to reach step 5
  await page.evaluate(() => { [...document.querySelectorAll('#case-root button')].filter(b => b.textContent.startsWith('Run '))[0].click(); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { [...document.querySelectorAll('#case-root button')].filter(b => b.textContent.startsWith('Run '))[1].click(); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const o = [...document.querySelectorAll('#case-root .opt:not([disabled])')]; if (o[1]) o[1].click(); });
  await page.waitForTimeout(250);
  await page.evaluate(() => { const b = [...document.querySelectorAll('#case-root .btn.cta')].filter(x => !x.disabled); if (b.length) b[0].click(); });
  await page.waitForTimeout(350);
  await page.evaluate(() => {
    [...document.querySelectorAll('#case-root .chip-drag')].forEach(c => {
      const id = c.getAttribute('data-label'); c.click();
      const box = document.querySelector(`#case-root .dropbox[data-drop="${id}"]`); if (box) box.click();
    });
  });
  await page.waitForTimeout(350);
  await page.evaluate(() => { const b = [...document.querySelectorAll('#case-root .btn.cta')].filter(x => !x.disabled); if (b.length) b[0].click(); });
  await page.waitForTimeout(450);

  const noteSecs = await page.$$eval('#case-root .note-sec h3', n => n.map(x => x.textContent));
  say('note headings:', noteSecs.join(' | '));

  // TEST: press check on an empty section
  await page.evaluate(() => {
    const secs = [...document.querySelectorAll('#case-root .note-sec')];
    const btn = secs[0].querySelector('button');
    if (btn) btn.click();
  });
  await page.waitForTimeout(250);
  const emptySec = await page.evaluate(() => {
    const s = document.querySelector('#case-root .note-sec .ws-fb:not([hidden])');
    return s ? s.textContent.trim().slice(0, 175) : 'none';
  });
  say('empty section refused:', JSON.stringify(emptySec));

  // TEST: the free-text box will not take a one word answer
  const shortAns = await page.evaluate(() => {
    const ta = document.querySelector('#case-root .note-sec textarea');
    if (!ta) return 'no textarea';
    ta.value = 'She fainted.';
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    const sec = ta.closest('.note-sec');
    const rec = [...sec.querySelectorAll('button')].find(b => b.textContent.trim() === 'Record this');
    if (!rec) return 'no Record button';
    rec.click();
    const fbs = [...sec.querySelectorAll('.ws-fb')].filter(f => !f.hidden);
    return fbs.length ? fbs[fbs.length - 1].textContent.trim().slice(0, 150) : 'none';
  });
  say('short answer refused:', JSON.stringify(shortAns));

  // TEST: the prompt leaves the page while they write
  const fold = await page.evaluate(() => {
    const slot = document.querySelector('#case-root .fold-slot');
    const before = slot.querySelector('.fold-body').textContent.trim().length;
    const hide = [...slot.querySelectorAll('button')].find(b => b.textContent.includes('hide the prompt'));
    if (!hide) return { error: 'prompt already folded' };
    hide.click();
    const after = slot.querySelector('.fold-body').textContent.trim().length;
    const reopen = [...slot.querySelectorAll('button')].filter(b => !b.hidden).map(b => b.textContent.trim());
    return { charsBefore: before, charsAfterHiding: after, buttonsLeft: reopen };
  });
  say('folding prompt:', JSON.stringify(fold));

  say('\nERRORS:', errs.length, errs.slice(0, 3).join(' || '));
  await b.close();
})();
