/* tools/print_page_pdf.js. Oct 17 2026.

   Prints a worksheet page from this repo to a Letter PDF, the way the Week 5
   pre-read and lab PDFs were made: serve the repo locally, open the page with
   ?site=1 so the Canvas-only script leaves it alone, block every request that
   is not to localhost (fonts load from the repo), open anything folded
   ("Open everything" on a lab page, every details element), then print with
   the page's own print styles.

   Run: node tools/print_page_pdf.js week-06-preread.html sheets/BIO005-Week6-Preread.pdf --cols2
   (--cols2 sets two columns to a page, the Week 5 pre-read layout)
*/
const path = require('path');
const { spawn } = require('child_process');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/usr/local/lib/node_modules/playwright'); }
const ROOT = path.resolve(__dirname, '..');
const [page_, out] = process.argv.slice(2);
const PORT = 8950 + Math.floor(Math.random() * 40);
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const srv = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
  await sleep(900);
  const b = await pw.chromium.launch();
  try {
    const pg = await b.newPage();
    const errs = [];
    pg.on('pageerror', e => errs.push(e.message));
    await pg.route('**/*', r => r.request().url().startsWith('http://127.0.0.1:' + PORT) ? r.continue() : r.abort());
    await pg.goto('http://127.0.0.1:' + PORT + '/' + page_ + (page_.includes('?') ? '&' : '?') + 'site=1&preview=1', { waitUntil: 'domcontentloaded' });
    await sleep(900);
    await pg.evaluate(() => {
      [].forEach.call(document.querySelectorAll('button'), b => { if (/open everything/i.test(b.textContent)) b.click(); });
      [].forEach.call(document.querySelectorAll('details'), d => d.open = true);
      /* the print copies of typed answers are made on beforeprint */
      window.dispatchEvent(new Event('beforeprint'));
    });
    if (process.argv.includes('--cols2')) {
      /* Week 5 pre-read layout: two columns to a Letter page, so the sheet is half as long */
      await pg.addStyleTag({ content: '@media print{@page{size:letter;margin:0.45in}main .wrap{max-width:none!important;column-count:2;column-gap:0.28in;column-fill:auto;padding:0!important}.card{break-inside:auto!important;margin:0 0 10px!important;padding:10px 12px!important}.q,fieldset,li{break-inside:avoid}h2,h3,.sub{break-after:avoid}.card h2{break-after:avoid}p,legend,.q label,li{font-size:11px!important;line-height:1.4!important}.where,.note,.lead{font-size:10px!important}h2{font-size:15px!important}.sub{font-size:12.5px!important;margin:10px 0 6px!important}.mm-display{font-size:22px!important}.printcopy{min-height:3.6em!important;font-size:11px!important}.choices label{font-size:10.5px!important;min-height:0!important;padding:2px 8px!important}.choices input{width:13px!important;height:13px!important}}' });
    }
    await sleep(500);
    await pg.emulateMedia({ media: 'print' });
    await pg.pdf({ path: path.resolve(ROOT, out), format: 'Letter', printBackground: true, preferCSSPageSize: true });
    if (errs.length) console.log('script errors:', errs.join(' | '));
    console.log('printed', out);
  } finally { await b.close(); srv.kill(); }
})();
