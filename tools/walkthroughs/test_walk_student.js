/* tools/walkthroughs/test_walk_student.js. Oct 17 2026.

   Walks one guided walkthrough start to finish the way a student does, then
   again in preview. Serves the repo itself on a free port and blocks every
   request that is not to localhost (fonts and the like), so it runs offline.

   As a student (no ?preview=1, bio005-canvas-only.js stubbed so the hold
   does not get in the way):
     - types a prediction into the worksheet on every Predict step, then
       presses Show me
     - while a step waits on a hands-on action, checks that Next is locked,
       then clicks the middle of the visible gold ring (the thing it asks for)
     - checks Next unlocks once the step is done
     - flags any figure label that runs off the 900 x 560 figure, any two
       labels that overlap, and any script error
   In preview: clicks Show me and Next through every step and checks for
   script errors.

   Run: node tools/walkthroughs/test_walk_student.js biol005-w06-nmj-contraction-guided.html
   Exit code 1 if anything failed. Overlaps are warnings, printed with the step. */
const path = require('path');
const { spawn } = require('child_process');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/usr/local/lib/node_modules/playwright'); }
const ROOT = path.resolve(__dirname, '..', '..');
const FILE = process.argv[2];
const PORT = 8800 + Math.floor(Math.random() * 150);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const srv = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
  await sleep(900);
  const browser = await pw.chromium.launch();
  const fails = [], warns = [];
  try {
    for (const mode of ['student', 'preview']) {
      const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|net::ERR/.test(m.text())) errs.push('console: ' + m.text()); });
      await page.route('**/*', r => {
        const u = r.request().url();
        if (!u.startsWith('http://127.0.0.1:' + PORT)) return r.abort();
        if (mode === 'student' && /bio005-canvas-only\.js/.test(u)) return r.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
        if (u.split('?')[0].endsWith('/' + FILE)) {
          /* the engine lives inside a closure; expose read-only hooks for the test */
          return r.fetch().then(res => res.text()).then(body => r.fulfill({ status: 200, contentType: 'text/html', body:
            body.replace('var PREVIEW=', 'window.__T={get STEPS(){return STEPS;},get cur(){return cur;},get busy(){return busy;}};var PREVIEW=') }));
        }
        return r.continue();
      });
      const url = 'http://127.0.0.1:' + PORT + '/' + FILE + (mode === 'preview' ? '?preview=1' : '');
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await sleep(700);
      const n = await page.evaluate(() => __T.STEPS.length);
      if (mode === 'student') console.log(FILE + ': ' + n + ' steps');
      let hands = 0;
      for (let i = 0; i < n; i++) {
        const info = await page.evaluate(() => { const s = __T.STEPS[__T.cur]; return { cur: __T.cur, title: s.title, ask: !!s.ask, auto: !!s.auto }; });
        if (info.cur !== i) { fails.push(mode + ' step ' + (i + 1) + ': expected to be on this step, on ' + (info.cur + 1)); break; }
        const tag = mode + ' step ' + (i + 1) + ' "' + info.title + '"';
        if (mode === 'student' && info.ask) {
          await page.fill('textarea[data-k="p' + i + '"]', 'My prediction is that something specific will change here.');
          await sleep(150);
        }
        const canPlay = await page.evaluate(() => { const b = document.getElementById('playBtn'); return !b.hidden && !b.disabled; });
        if (!info.auto && canPlay) await page.click('#playBtn');
        else if (!info.auto && mode === 'student' && info.ask) fails.push(tag + ': Show me did not unlock after typing a prediction');
        /* run the step: click each gold ring as it appears, until the play finishes */
        const t0 = Date.now();
        let sawRing = false;
        while (Date.now() - t0 < 30000) {
          await sleep(250);
          const ring = await page.evaluate(() => {
            const rs = [].slice.call(document.querySelectorAll('#scene circle[data-r]'));
            for (const c of rs) {
              let vis = true, e = c;
              while (e && e.id !== 'scene') { if (e.getAttribute && e.getAttribute('display') === 'none') { vis = false; break; } e = e.parentNode; }
              if (!vis) continue;
              const b = c.getBoundingClientRect();
              if (b.width > 0) return { x: b.left + b.width / 2, y: b.top + b.height / 2, next: document.getElementById('nextBtn').disabled };
            }
            return null;
          });
          if (ring) {
            sawRing = true; hands++;
            if (mode === 'student' && !ring.next && i < n - 1) fails.push(tag + ': Next was not locked while the step waited for a click');
            await page.mouse.click(ring.x, ring.y);
            await sleep(350);
            continue;
          }
          const busy = await page.evaluate(() => __T.busy);
          if (!busy) { await sleep(300); const again = await page.evaluate(() => __T.busy); if (!again) break; }
        }
        if (Date.now() - t0 >= 30000) fails.push(tag + ': the step never finished (a click target may be missing or the ring is not over it)');
        /* labels */
        if (mode === 'student') {
          const lab = await page.evaluate(() => {
            const svg = document.getElementById('scene'), out = [], boxes = [];
            const ts = [].slice.call(svg.querySelectorAll('text')).filter(t => {
              if (!t.textContent.trim()) return false;
              let e = t; while (e && e !== svg) { if (e.getAttribute && e.getAttribute('display') === 'none') return false; e = e.parentNode; }
              return true;
            });
            ts.forEach(t => {
              let b; try { b = t.getBBox(); } catch (e) { return; }
              const m = t.getCTM(), s = svg.getCTM();
              /* move into figure coordinates: apply the text's own transform relative to the svg */
              const k = s.inverse().multiply(m);
              const x = k.a * b.x + k.c * b.y + k.e, y = k.b * b.x + k.d * b.y + k.f, w = b.width * k.a, h = b.height * k.d;
              if (x < -2 || y < -2 || x + w > 902 || y + h > 562) out.push('off the figure: "' + t.textContent + '"');
              boxes.push({ x, y, w, h, s: t.textContent });
            });
            for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) {
              const A = boxes[a], B = boxes[b];
              const ix = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x), iy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
              if (ix > 3 && iy > 4) out.push('overlap: "' + A.s + '" and "' + B.s + '"');
            }
            return out;
          });
          lab.forEach(x => (/^off/.test(x) ? fails : warns).push(tag + ': ' + x));
        }
        if (i < n - 1) {
          const locked = await page.evaluate(() => document.getElementById('nextBtn').disabled);
          if (locked) { fails.push(tag + ': Next stayed locked after the step finished'); break; }
          await page.click('#nextBtn');
          await sleep(300);
        }
      }
      if (mode === 'student') console.log('  hands-on clicks made: ' + hands);
      errs.forEach(e => fails.push(mode + ': script error: ' + e));
      await ctx.close();
    }
  } finally {
    await browser.close();
    srv.kill();
  }
  warns.forEach(w => console.log('  WARN ' + w));
  fails.forEach(f => console.log('  FAIL ' + f));
  console.log(fails.length ? '  RESULT: ' + fails.length + ' failure(s)' : '  RESULT: pass');
  process.exit(fails.length ? 1 : 0);
})();
