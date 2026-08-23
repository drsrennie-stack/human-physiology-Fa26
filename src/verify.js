const { chromium } = require('/home/claude/pft/node_modules/playwright');
const FILE = 'file:///home/claude/lab/out/week-01-foundations.html';

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await b.newPage({ viewport: { width: 1280, height: 1000 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });

  await page.goto(FILE);
  await page.waitForTimeout(700);

  const say = (...a) => console.log(...a);

  // ---- shell ----
  const tabs = await page.$$eval('.tab', ts => ts.map(t => ({ t: t.textContent.trim().split(',')[0], locked: t.dataset.locked === 'true' })));
  say('TABS:', tabs.map(t => t.t + (t.locked ? ' [locked]' : '')).join(' | '));

  // Rosa's own gate is proven in verify-case.js. Here we open it directly so
  // this script can regression test everything downstream of it.
  await page.evaluate(() => { window.LAB.gates.case = true; });
  await page.evaluate(() => window.LAB.showTab('loops'));
  await page.waitForTimeout(200);

  // ---- loop lab: click a chip then click its box, all three loops ----
  await page.click('#tab-loops');
  await page.waitForTimeout(200);
  const loopCards = await page.$$('#loops-root .card');
  let placed = 0;
  for (const c of loopCards) {
    const chips = await c.$$('.chip-drag');
    if (!chips.length) continue;
    for (const chip of chips) {
      const id = await chip.getAttribute('data-label');
      await chip.click();
      const box = await c.$(`.dropbox[data-drop="${id}"]`);
      if (!box) { say('MISSING BOX for', id); continue; }
      await box.click();
      placed++;
    }
  }
  say('LOOP DROPS PLACED:', placed, '(expect 12)');
  const hits = await page.$$eval('#loops-root .dropbox.hit', n => n.length);
  say('BOXES MARKED CORRECT:', hits);

  // concept check
  const conceptOpts = await page.$$('#loops-root .card:last-of-type .opt, #loops-root .opt');
  await conceptOpts[2].click();
  await page.waitForTimeout(300);

  const vitalsLocked = await page.$eval('#tab-vitals', t => t.dataset.locked === 'true');
  say('VITALS GATE after loop lab, still locked?', vitalsLocked, '(expect false)');

  // ---- vitals table ----
  await page.click('#tab-vitals');
  await page.waitForTimeout(250);
  const caseNo = await page.$eval('.caseline .cl-v', n => n.textContent);
  say('DATASET NUMBER:', caseNo);

  // read the patient rows straight off the page and compute the answers
  const filled = await page.evaluate(() => {
    const P = window.LAB.W1.PATIENTS, MAP = window.LAB.W1.MAP, PP = window.LAB.W1.PP;
    let n = 0;
    P.forEach((p, i) => {
      const m = document.getElementById('ct-t1-' + i + '-map');
      const pp = document.getElementById('ct-t1-' + i + '-pp');
      if (m) { m.value = String(Math.round(MAP(p))); n++; }
      if (pp) { pp.value = String(PP(p)); n++; }
    });
    // task two, worked from the formula in reverse
    const back = [[93, 45], [70, 24], [95, 78], [62, 21], [80, 48]];
    back.forEach((r, i) => {
      const s = document.getElementById('ct-t2-' + i + '-sbp');
      const d = document.getElementById('ct-t2-' + i + '-dbp');
      if (s) { s.value = String(Math.round(r[0] + 2 * r[1] / 3)); n++; }
      if (d) { d.value = String(Math.round(r[0] - r[1] / 3)); n++; }
    });
    return n;
  });
  say('INPUTS FILLED:', filled, '(expect 34)');

  const checkBtns = await page.$$('#vitals-root button.btn');
  for (const btn of checkBtns) {
    const t = await btn.textContent();
    if (t.includes('Check my numbers')) await btn.click();
  }
  await page.waitForTimeout(300);
  const bad = await page.$$eval('#vitals-root input.bad', n => n.length);
  const ok = await page.$$eval('#vitals-root input.ok', n => n.length);
  say('CALC TABLE: correct', ok, '| wrong', bad, '(expect 34 / 0)');
  const flags = await page.$$eval('#vitals-root .rowflag', n => n.map(x => x.textContent).join(''));
  say('UNDER-65 FLAGS:', flags.split('').filter(c => c === 'Y').length ? flags : flags);

  // ---- decision chart ----
  let steps = 0;
  for (let i = 0; i < 6; i++) {
    const opts = await page.$$('#vitals-root .fc-node:not(.fc-end) .fc-opt:not([disabled])');
    if (!opts.length) break;
    // try each branch until one advances
    const before = await page.$$eval('#vitals-root .fc-node', n => n.length);
    for (const o of opts) {
      await o.click();
      await page.waitForTimeout(120);
      const after = await page.$$eval('#vitals-root .fc-node', n => n.length);
      if (after > before) { steps++; break; }
    }
    const ended = await page.$('#vitals-root .fc-end');
    if (ended) break;
  }
  const ending = await page.$eval('#vitals-root .fc-end h4', n => n.textContent).catch(() => 'NONE');
  say('CHART STEPS:', steps, '| ENDS AT:', ending);

  const curveLocked = await page.$eval('#tab-curve', t => t.dataset.locked === 'true');
  say('CURVE GATE after dataset, still locked?', curveLocked, '(expect false)');

  // ---- curve ----
  await page.click('#tab-curve');
  await page.waitForTimeout(200);
  const readCheck = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('[data-po2]').forEach(b => {
      b.click();
      const vals = Array.from(document.querySelectorAll('#curve-root .readout .val')).map(v => v.textContent);
      out.push(b.textContent + ' -> ' + vals[1]);
    });
    return out;
  });
  say('CURVE READOUTS:', readCheck.join(', '));
  await page.evaluate(() => document.querySelector('[data-shift="right"]').click());
  const rightSat = await page.$$eval('#curve-root .readout .val', n => n.map(x => x.textContent));
  say('RIGHT SHIFT at PO2 100:', rightSat.join(' | '));

  // ---- test ----
  await page.click('#tab-test');
  await page.waitForTimeout(200);
  const qCount = await page.$eval('#test-root .note', n => n.textContent);
  say('TEST:', qCount);
  for (let i = 0; i < 4; i++) {
    const o = await page.$$('#test-root .opt:not([disabled])');
    if (!o.length) break;
    await o[0].click(); await page.waitForTimeout(120);
    const nx = await page.$('#test-root .qcard .btnrow button');
    if (nx) { await nx.click(); await page.waitForTimeout(150); }
  }
  say('TEST ADVANCED 4 QUESTIONS OK');

  // ---- report ----
  await page.click('#tab-report');
  await page.waitForTimeout(300);
  const rows = await page.$$eval('#report-root table tbody tr', n => n.map(r => r.textContent.replace(/\s+/g, ' ').trim()));
  say('REPORT ROWS:');
  rows.forEach(r => say('   ', r));

  // ---- accessibility sweep ----
  const a11y = await page.evaluate(() => {
    const unlabelled = Array.from(document.querySelectorAll('input,select,textarea')).filter(i => {
      if (i.getAttribute('aria-label') || i.getAttribute('aria-labelledby')) return false;
      if (i.id && document.querySelector('label[for="' + i.id + '"]')) return false;
      return !i.closest('label');
    }).length;
    const unnamed = Array.from(document.querySelectorAll('button')).filter(btn =>
      !(btn.textContent || '').trim() && !btn.getAttribute('aria-label') && !btn.getAttribute('title')).length;
    const tables = Array.from(document.querySelectorAll('table'));
    const uncaptioned = tables.filter(t => !t.querySelector('caption')).length;
    const noTh = tables.filter(t => !t.querySelector('th')).length;
    const heads = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5')).map(h => +h.tagName[1]);
    let skips = 0;
    for (let i = 1; i < heads.length; i++) if (heads[i] - heads[i - 1] > 1) skips++;
    const svgNoLabel = Array.from(document.querySelectorAll('svg')).filter(s =>
      !s.getAttribute('aria-label') && s.getAttribute('role') !== 'presentation' && s.getAttribute('aria-hidden') !== 'true').length;
    return {
      unlabelledInputs: unlabelled, unnamedButtons: unnamed,
      tables: tables.length, uncaptionedTables: uncaptioned, tablesWithoutTh: noTh,
      h1: document.querySelectorAll('h1').length, headingSkips: skips,
      strayTermTags: document.querySelectorAll('t').length,
      svgWithoutLabel: svgNoLabel,
      focusable: document.querySelectorAll('a[href],button:not([disabled]),input,select,[tabindex]:not([tabindex="-1"])').length,
      landmarks: ['banner', 'navigation', 'main', 'contentinfo'].filter(r =>
        document.querySelector('header.brandbar, header.site-header') && document.querySelector('nav') && document.querySelector('main') && document.querySelector('footer')).length,
      emDash: (document.body.innerText.match(/—/g) || []).length,
      ariaExpanded: document.querySelectorAll('[aria-expanded]').length,
      ariaLive: document.querySelectorAll('[aria-live]').length
    };
  });
  say('A11Y:', JSON.stringify(a11y, null, 1));

  say('ERRORS:', errs.length, errs.slice(0, 5).join(' || '));

  // screenshots
  for (const [tab, name] of [['case', 'w1-case'], ['learn', 'w1-learn'], ['loops', 'w1-loops'], ['vitals', 'w1-vitals'], ['curve', 'w1-curve']]) {
    await page.click('#tab-' + tab);
    await page.waitForTimeout(250);
    await page.screenshot({ path: '/home/claude/lab/shots/' + name + '.png', fullPage: false });
  }
  await b.close();
})();
