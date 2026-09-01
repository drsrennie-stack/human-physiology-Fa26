/*
 * What height does the Canvas iframe actually need?
 *
 *   node canvas-height.js
 *
 * A Canvas embed gets one fixed height for every device AND for both levels
 * of the page. Too short and someone scrolls inside the frame; too tall and a
 * laptop looks at empty navy. This opens the page at every width that matters,
 * measures level one AND level two, takes the tallest, and writes the number
 * to bio4/canvas-height.txt so the builder can put it in the embed snippet.
 *
 * Run it after any change to the page, then rebuild. A guessed height goes
 * stale without saying so.
 */
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const WIDTHS = [320, 360, 390, 430, 480, 560, 660, 760, 900, 1100, 1400];

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  let max = 0, at = '';
  console.log('width   level 1   level 2');
  for (const w of WIDTHS) {
    const p = await (await b.newContext({ viewport: { width: w, height: 400 } })).newPage();
    await p.goto('file://' + path.resolve('bio4/canvas-start.html') + '?sec=mw');
    await p.waitForTimeout(450);
    const h1 = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.click('#enter');
    await p.waitForTimeout(250);
    const h2 = await p.evaluate(() => document.documentElement.scrollHeight);
    for (const [h, lvl] of [[h1, 1], [h2, 2]]) {
      if (h > max) { max = h; at = `${w}px wide, level ${lvl}`; }
    }
    console.log(`${String(w).padStart(5)}px  ${String(h1).padStart(6)}px  ${String(h2).padStart(6)}px`);
  }
  const rec = Math.ceil(max / 10) * 10;
  console.log(`\ntallest ${max}px at ${at}  ->  height="${rec}"`);
  fs.writeFileSync('bio4/canvas-height.txt', String(rec) + '\n');
  console.log('bio4/canvas-height.txt written. Now: python3 build-bio4-front.py');
  await b.close();
})();
