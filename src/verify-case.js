const { chromium } = require('/home/claude/pft/node_modules/playwright');
const FILE = 'file:///home/claude/lab/out/week-01-foundations.html';
const say = (...a) => console.log(...a);

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await b.newPage({ viewport: { width: 1280, height: 1000 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });

  await page.goto(FILE);
  await page.waitForTimeout(700);

  const rosa = await page.evaluate(() => {
    const R = window.LAB.W1.ROSA;
    return { sbp: R.sbp, dbp: R.dbp, hr: R.hr, limb: R.pres.limb, key: R.pres.key, map: R.map, pp: R.pp, caseNo: window.LAB.caseNumber };
  });
  say('ROSA:', JSON.stringify(rosa));
  say('TABS:', (await page.$$eval('.tab', ts => ts.map(t => t.textContent.trim().split(',')[0] + (t.dataset.locked ? ' [locked]' : '')))).join(' | '));

  // ---------- THE CORE CLAIM ----------
  // Step 2 must not accept the final answer until the working is done.
  say('\n=== anti-shortcut check ===');
  const openBoxes = await page.evaluate(() => {
    // advance past step 1 by answering it correctly
    const opts = document.querySelectorAll('#case-root .opt');
    return { step1Options: opts.length };
  });
  say('step 1 options:', openBoxes.step1Options, '(step 2 not built yet)');

  // answer step 1: pick the correct option, then diagnose all 3 distractors
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('#case-root .opt')];
    const correct = btns.find(b => b.textContent.includes('None of them'));
    correct.click();
  });
  await page.waitForTimeout(300);
  const sels = await page.$$('#case-root .elim-row select');
  say('distractors to diagnose:', sels.length, '(expect 3)');

  // try a WRONG reason first, to prove it is checked
  await sels[0].selectOption({ index: 1 });
  await page.waitForTimeout(200);
  let firstFb = await page.$eval('#case-root .elim-row .ws-fb', n => n.textContent.trim().slice(0, 60));
  say('after first (possibly wrong) reason:', JSON.stringify(firstFb));

  // now solve all three by brute force over the options
  await page.evaluate(() => {
    document.querySelectorAll('#case-root .elim-row').forEach(row => {
      const sel = row.querySelector('select');
      const n = sel.options.length;
      for (let i = 1; i < n && !sel.disabled; i++) {
        sel.value = sel.options[i].value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(500);
  const step2There = await page.$('#case-root .ws');
  say('step 2 appeared after step 1 completed:', !!step2There);

  // Count how many worked-step inputs are enabled right now
  const gate = await page.evaluate(() => {
    const ins = [...document.querySelectorAll('#case-root .ws-entry input')];
    return { total: ins.length, enabled: ins.filter(i => !i.disabled).length };
  });
  say('worked-step boxes:', gate.total, '| open right now:', gate.enabled, '(must be 1)');

  // THE TEST: type the correct FINAL answer into the final box. It is disabled, so this must fail.
  const cheat = await page.evaluate((mapVal) => {
    const ins = [...document.querySelectorAll('#case-root .ws-entry input')];
    const last = ins[ins.length - 1];
    const wasDisabled = last.disabled;
    last.value = String(Math.round(mapVal * 10) / 10);
    const btns = [...document.querySelectorAll('#case-root .ws-step button')];
    const lastBtn = btns[btns.length - 1];
    const btnDisabled = lastBtn.disabled;
    lastBtn.click();
    return { wasDisabled, btnDisabled, advanced: !!document.querySelector('#case-root .ws-step:last-child.done') };
  }, rosa.map);
  say('CHEAT ATTEMPT, correct MAP typed straight into the last box:');
  say('   final input disabled:', cheat.wasDisabled, '| its check button disabled:', cheat.btnDisabled, '| advanced:', cheat.advanced);
  say('   VERDICT:', (cheat.wasDisabled && cheat.btnDisabled && !cheat.advanced) ? 'BLOCKED, as designed' : '*** LEAK ***');

  // ---------- misconception traps ----------
  say('\n=== misconception traps on step 2 ===');
  async function tryStep(idx, value) {
    return await page.evaluate(({ idx, value }) => {
      const ins = [...document.querySelectorAll('#case-root .ws-entry input')];
      const btns = [...document.querySelectorAll('#case-root .ws-step')].map(s => s.querySelector('button'));
      ins[idx].value = String(value);
      btns[idx].click();
      const fb = ins[idx].closest('.ws-step').querySelector('.ws-fb');
      return fb ? fb.textContent.trim() : '';
    }, { idx, value });
  }
  say('step1, added instead of subtracted ->', JSON.stringify((await tryStep(0, rosa.sbp + rosa.dbp)).slice(0, 90)));
  say('step1, reversed              ->', JSON.stringify((await tryStep(0, rosa.dbp - rosa.sbp)).slice(0, 90)));
  await tryStep(0, rosa.pp);
  await page.waitForTimeout(150);
  say('step2, halved instead of thirds ->', JSON.stringify((await tryStep(1, rosa.pp / 2)).slice(0, 90)));
  await tryStep(1, Math.round(rosa.pp / 3 * 10) / 10);
  await page.waitForTimeout(150);
  say('step3, averaged the two numbers ->', JSON.stringify((await tryStep(2, (rosa.sbp + rosa.dbp) / 2)).slice(0, 100)));
  await tryStep(2, Math.round(rosa.map * 10) / 10);
  await page.waitForTimeout(150);
  say('step4, wrong sign               ->', JSON.stringify((await tryStep(3, 65 - rosa.map)).slice(0, 90)));
  await tryStep(3, Math.round((rosa.map - 65) * 10) / 10);
  await page.waitForTimeout(500);

  const step2done = await page.$$eval('#case-root .ws-step.done', n => n.length);
  say('worked steps completed:', step2done, '(expect 4)');

  // ---------- step 3, the simulation ----------
  say('\n=== step 3, simulation ===');
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('#case-root .btn.cta')].filter(x => !x.disabled);
    if (b.length) b[0].click();
  });
  await page.waitForTimeout(500);
  const runBtns = await page.$$eval('#case-root .btnrow button', bs => bs.map(b => b.textContent.trim()));
  say('run buttons:', runBtns.filter(t => t.startsWith('Run')).join(' | '));
  await page.evaluate(() => {
    [...document.querySelectorAll('#case-root button')].filter(b => b.textContent.startsWith('Run '))[0].click();
  });
  await page.waitForTimeout(400);
  const s1 = await page.$$eval('#case-root .stat .val', v => v.map(x => x.textContent));
  say('healthy reference:', s1.join(' | '));
  await page.evaluate(() => {
    [...document.querySelectorAll('#case-root button')].filter(b => b.textContent.startsWith('Run '))[1].click();
  });
  await page.waitForTimeout(400);
  const s2 = await page.$$eval('#case-root .stat .val', v => v.map(x => x.textContent));
  say('Rosa (' + rosa.key + '):    ', s2.join(' | '));

  // answer the comparison question
  await page.evaluate(() => {
    const o = [...document.querySelectorAll('#case-root .opt:not([disabled])')];
    if (o[1]) o[1].click();
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('#case-root .btn.cta')].filter(x => !x.disabled);
    if (b.length) b[0].click();
  });
  await page.waitForTimeout(400);

  // ---------- step 4, the loop ----------
  say('\n=== step 4, the loop ===');
  const placed = await page.evaluate(() => {
    let n = 0;
    const chips = [...document.querySelectorAll('#case-root .chip-drag')];
    chips.forEach(c => {
      const id = c.getAttribute('data-label');
      c.click();
      const box = document.querySelector(`#case-root .dropbox[data-drop="${id}"]`);
      if (box) { box.click(); n++; }
    });
    return n;
  });
  say('loop parts placed:', placed, '(expect 3)');
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('#case-root .btn.cta')].filter(x => !x.disabled);
    if (b.length) b[0].click();
  });
  await page.waitForTimeout(400);

  // ---------- step 5, the diagnosis ----------
  say('\n=== step 5, the diagnosis ===');
  const diagOpts = await page.$$eval('#case-root .opt:not([disabled])', os => os.map(o => o.textContent.trim().slice(1, 75)));
  say('options offered:');
  diagOpts.forEach(o => say('   ', o));
  // pick the correct one by matching against the expected text for her seeded limb
  const correctText = await page.evaluate(() => {
    const R = window.LAB.W1.ROSA;
    return R.pres.limb;
  });
  say('her seeded limb:', correctText);
  // scope strictly to step five's own card, so step one's old feedback cannot be read by mistake
  const clicked = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#case-root .card')];
    const card = cards.reverse().find(c => c.textContent.includes('So why did Rosa fall'));
    const os = [...card.querySelectorAll('.opt:not([disabled])')];
    const first = os[0];
    first.click();
    const fb = card.querySelector('.fb:not([hidden])');
    const said = fb ? fb.textContent.trim().slice(0, 24) : 'none';
    return { clickedFirstOption: first.textContent.slice(1, 70), pageSaid: said };
  });
  say('first click result:', JSON.stringify(clicked));
  await page.waitForTimeout(300);
  const sels5 = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#case-root .card')].reverse();
    const card = cards.find(c => c.textContent.includes('So why did Rosa fall'));
    return card.querySelectorAll('.elim-row select').length;
  });
  say('distractors to diagnose in step five:', sels5, '(expect 3)');
  await page.evaluate(() => {
    document.querySelectorAll('#case-root .elim-row').forEach(row => {
      const sel = row.querySelector('select');
      if (sel.disabled) return;
      for (let i = 1; i < sel.options.length && !sel.disabled; i++) {
        sel.value = sel.options[i].value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(600);

  const caseGate = await page.$eval('#tab-loops', t => t.dataset.locked === 'true');
  say('\nCASE GATE, loop lab still locked?', caseGate, '(expect false)');
  const endTitle = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#case-root .card')];
    const last = cards[cards.length - 1];
    return last ? (last.querySelector('h3') || {}).textContent : 'none';
  });
  say('closing card:', endTitle);
  const fallWhy = await page.evaluate(() => {
    const n = [...document.querySelectorAll('#case-root .note')].filter(p => p.textContent.includes('put her on the floor'));
    return n.length ? n[n.length - 1].textContent.trim().slice(0, 150) : 'none';
  });
  say('why she went down:', fallWhy);

  // ---------- working recorded ----------
  const working = await page.evaluate(() => window.LAB.working.map(w => w.step + ' = ' + w.entered + ' (' + w.attempts + ' tries)'));
  say('\nWORKING RECORDED FOR THE PDF:');
  working.forEach(w => say('   ', w));

  // ---------- accessibility ----------
  const a11y = await page.evaluate(() => {
    const unlabelled = [...document.querySelectorAll('input,select,textarea')].filter(i => {
      if (i.getAttribute('aria-label') || i.getAttribute('aria-labelledby')) return false;
      if (i.id && document.querySelector('label[for="' + i.id + '"]')) return false;
      return !i.closest('label');
    }).length;
    const unnamed = [...document.querySelectorAll('button')].filter(b =>
      !(b.textContent || '').trim() && !b.getAttribute('aria-label') && !b.getAttribute('title')).length;
    const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5')].map(h => +h.tagName[1]);
    let skips = 0;
    for (let i = 1; i < heads.length; i++) if (heads[i] - heads[i - 1] > 1) skips++;
    return {
      unlabelledInputs: unlabelled, unnamedButtons: unnamed,
      h1: document.querySelectorAll('h1').length, headingSkips: skips,
      strayTermTags: document.querySelectorAll('t').length,
      uncaptionedTables: [...document.querySelectorAll('table')].filter(t => !t.querySelector('caption')).length,
      svgWithoutLabel: [...document.querySelectorAll('svg')].filter(s => !s.getAttribute('aria-label') && s.getAttribute('aria-hidden') !== 'true').length,
      emDash: (document.body.innerText.match(/—/g) || []).length,
      liveRegions: document.querySelectorAll('[aria-live]').length
    };
  });
  say('\nA11Y:', JSON.stringify(a11y));
  say('ERRORS:', errs.length, errs.slice(0, 4).join(' || '));

  await page.evaluate(() => window.LAB.showTab('case'));
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/home/claude/lab/shots/case-full.png', fullPage: false });
  await b.close();
})();
