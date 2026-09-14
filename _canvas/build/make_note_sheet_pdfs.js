/* BIO 005 note sheet PDFs.
   Renders note-sheet.html at two competencies to a page and prints it to a
   PDF that goes in Canvas Files, so a student never has to leave Canvas to
   get the sheet. Serve the repo on 8777 first:  python3 -m http.server 8777

   Two things have to be done to the page before printing.
   1. The shared site chrome (brand bar, footer, Hootie, the back button) is
      injected by script, so the print stylesheet does not know to hide it.
   2. .sheetpage is 9.9in in print, which overflows the printable area by a
      hair and emits a blank page after the last sheet. 9.2in is the largest
      value that stays at one sheet per page. */
const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const WEEKS = [1, 2];
const OUT = '/home/claude/canvas-build/pdfs/';
const SHEET_HEIGHT = '9.2in';

(async () => {
  const b = await chromium.launch();
  for (const w of WEEKS) {
    const pg = await b.newPage();
    const errs = [];
    pg.on('pageerror', e => errs.push(e.message));
    await pg.goto('http://127.0.0.1:8777/note-sheet.html?week=' + w + '&per=2',
                  { waitUntil: 'networkidle' });
    await pg.waitForTimeout(500);
    await pg.evaluate((h) => {
      [].slice.call(document.body.children).forEach(function (el) {
        if (el.id !== 'sheets') el.remove();
      });
      var s = document.createElement('style');
      s.textContent = '@media print{.sheetpage{height:' + h + '}' +
                      '.sheetpage:last-child{break-after:auto;page-break-after:auto}}';
      document.head.appendChild(s);
    }, SHEET_HEIGHT);
    await pg.waitForTimeout(250);
    const nn = String(w).padStart(2, '0');
    await pg.pdf({ path: OUT + 'BIO005-note-sheet-week-' + nn + '.pdf',
                   printBackground: true, preferCSSPageSize: true });
    console.log('week ' + w + (errs.length ? ' ERRORS ' + errs.join('; ') : ' ok'));
    await pg.close();
  }
  await b.close();
})();
