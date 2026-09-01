/* Level two is a state axe never sees on load, so audit it explicitly:
   open the door, then run the full tag set and the 320px reflow check. */
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await (await b.newContext({ viewport:{width:1200,height:900} })).newPage();
  const axe = fs.readFileSync(require.resolve('axe-core'), 'utf8');
  let bad = 0;
  for (const f of process.argv.slice(2)) {
    await p.goto('file://' + path.resolve(f) + '?sec=mw');
    await p.waitForTimeout(400);
    await p.click('#enter');
    await p.waitForTimeout(300);
    await p.addScriptTag({ content: axe });
    const r = await p.evaluate(() => axe.run(document, { runOnly: { type:'tag', values:
      ['wcag2a','wcag2aa','wcag2aaa','wcag21a','wcag21aa','wcag22aa','best-practice'] } }));
    const focus = await p.evaluate(() => document.activeElement.id);
    const small = await p.evaluate(() => [...document.querySelectorAll('#p-doors a,#back')]
      .filter(e => { const r = e.getBoundingClientRect(); return r.width < 44 || r.height < 44; }).length);
    await p.setViewportSize({ width: 320, height: 800 });
    await p.waitForTimeout(200);
    const of = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    await p.setViewportSize({ width: 1200, height: 900 });
    bad += r.violations.length + small + (of ? 1 : 0) + (focus === 'doors-h' ? 0 : 1);
    console.log(`${f.padEnd(24)} axe ${r.violations.length}  targets<44px ${small}  320px overflow ${of}  focus lands on "${focus}"`);
    r.violations.forEach(v => console.log('   ', v.id, v.nodes.length));
  }
  console.log(bad ? `\n${bad} ISSUE(S) at level two` : '\nlevel two clean');
  await b.close();
  process.exit(bad ? 1 : 0);
})();
