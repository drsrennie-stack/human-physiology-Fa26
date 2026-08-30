const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const out = {};
  for (const f of process.argv.slice(2)) {
    const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
    await p.goto('file://' + require('path').resolve(f)); await p.waitForTimeout(700);
    const cdp = await p.context().newCDPSession(p);
    await cdp.send('Accessibility.enable');
    const { nodes } = await cdp.send('Accessibility.getFullAXTree');
    const skip = { none:1, generic:1, InlineTextBox:1, StaticText:1, LineBreak:1, GenericContainer:1 };
    const lines = nodes.filter(n => !n.ignored).map(n => {
      const role = (n.role && n.role.value) || '';
      const name = (n.name && n.name.value) || '';
      return skip[role] ? null : role + (name ? ': "' + name.replace(/\s+/g,' ').trim().slice(0,80) + '"' : '');
    }).filter(Boolean);
    out[f] = lines;
    console.log('=== ' + f + '  (' + lines.length + ' nodes)');
    console.log(lines.slice(0, 28).join('\n'));
    // every control must have a name
    const unnamed = await p.evaluate(() => {
      const sel = 'a[href], button, input:not([type=hidden]), select, textarea, summary';
      return [...document.querySelectorAll(sel)].filter(el => {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') return false;
        const lab = el.id && document.querySelector('label[for="' + el.id + '"]');
        const name = (el.getAttribute('aria-label') || '') +
                     (lab ? lab.textContent : '') +
                     (el.getAttribute('title') || '') + el.textContent;
        return !name.trim();
      }).map(el => el.outerHTML.slice(0, 80));
    });
    console.log('  controls with no accessible name: ' + unnamed.length);
    unnamed.forEach(u => console.log('    ! ' + u));
    await p.close();
  }
  fs.writeFileSync('a11y-tree.json', JSON.stringify(out, null, 1));
  await b.close();
})();
