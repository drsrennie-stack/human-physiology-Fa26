/* bio005-levels.js  (Nov 11 2026, Scrubs)
   Turns a page's 70 / 80 / 90 / 100 level table into four colored cards, adds a
   "My target" picker, remembers the choice in this browser, and prints the target
   at the top of the page's PDF. Handwritten pages tell students what to write on page one.

   Finds:  <div class="b5-levels" data-targets="Case 1|Case 2" data-mode="hand|print"> ...table... </div>
           or a <table class="pw-lv"> (lab pages), whose old radio picker (.pw-tg) is kept in sync and hidden.
   Nov 11 2026 (late): everything moves into one "Your grade" block at the very top of the page:
   what it is worth, the student's name (pages that print), the target picker, then the level cards.
   data-mode="none" shows the levels with no picker (discussions, Mastery Checks).
   data-worth="..." replaces the default worth line. data-name="1" adds the name field without a picker.
   The name is kept in this browser (b5-name) and prints at the top of the PDF with the target. */
(function () {
  var NAMES = { 70: 'Foundational', 80: 'Mechanistic', 90: 'Applied', 100: 'Integrated' };
  var COL = { 70: ['#C9A14A', '#0B1530'], 80: ['#C2734D', '#0B1530'], 90: ['#8B3A2E', '#FFFFFF'], 100: ['#0B1530', '#FFFFFF'] };
  var page = (location.pathname.split('/').pop() || 'index') + (/[?&]week=\d+/.test(location.search) ? location.search.match(/[?&](week=\d+)/)[1] : '');
  function get(k) { try { return localStorage.getItem('b5-target:' + page + ':' + k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem('b5-target:' + page + ':' + k, v); } catch (e) {} }
  function el(t, a, h) { var x = document.createElement(t); if (a) for (var k in a) x.setAttribute(k, a[k]); if (h != null) x.innerHTML = h; return x; }

  var css = '.b5-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:12px 0 8px}' +
    '.b5-card{border-radius:14px;padding:16px 16px 14px;box-shadow:0 1px 3px rgba(0,0,0,.10)}' +
    '.b5-card .p{font-family:"Open Sans",system-ui,sans-serif;font-size:34px;font-weight:800;line-height:1;margin:0}' +
    '.b5-card .n{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin:4px 0 10px}' +
    '.b5-card .plus{font-size:13px;font-weight:700;margin:0 0 6px}' +
    '.b5-card ul{margin:0;padding-left:1.1em}.b5-card li{margin:0 0 6px;line-height:1.45;font-size:14.5px}' +
    '.b5-card a{color:inherit}' +
    '.b5-pick{border:0;margin:14px 0 0;padding:0}.b5-pick legend{font-weight:800;font-size:16px;margin:0 0 8px;padding:0;color:#060B1A}' +
    '.b5-opts{display:flex;flex-wrap:wrap;gap:10px}' +
    '.b5-opts label{display:inline-flex;align-items:center;gap:8px;border:2px solid #0B1530;border-radius:999px;padding:9px 16px;font-weight:800;cursor:pointer;background:#fff;color:#0B1530;min-height:44px}' +
    '.b5-opts input{width:18px;height:18px;margin:0}' +
    '.b5-opts label:has(input:checked){background:#0B1530;color:#fff}' +
    '.b5-opts label:focus-within{outline:3px solid #B8924A;outline-offset:2px}' +
    '.b5-say{margin:10px 0 0;font-weight:700;color:#060B1A}' +
    '.b5-print{display:none}' +
    '.b5-top{background:#fff;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.08);padding:18px 20px 16px;margin:18px auto 18px;max-width:min(1080px,calc(100% - 32px));box-sizing:border-box}' +
    '.b5-top .b5-k{margin:0;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#7A2E24}' +
    '.b5-top h2{font-family:"Open Sans",system-ui,sans-serif;font-weight:800;font-size:22px;color:#060B1A;margin:4px 0 6px;line-height:1.2}' +
    '.b5-worth{margin:0 0 4px;font-size:16px;line-height:1.5;color:#1f2a44}.b5-worth b{color:#060B1A}' +
    '.b5-nm{margin:12px 0 0}.b5-nm label{display:block;font-weight:800;font-size:15px;color:#060B1A;margin:0 0 4px}' +
    '.b5-nm input{font:inherit;font-size:16px;padding:9px 12px;border:1.5px solid #8C90A0;border-radius:10px;width:100%;max-width:24rem;box-sizing:border-box}' +
    '.b5-nm input:focus{outline:3px solid #B8924A;outline-offset:2px}' +
    '.b5-hand{margin:12px 0 0;font-weight:700;color:#060B1A}' +
    '.b5-top details{margin:12px 0 0}.b5-top summary{cursor:pointer;font-weight:800;color:#060B1A;min-height:44px;display:flex;align-items:center;gap:8px;border:2px solid #B8924A;border-radius:999px;padding:6px 16px;width:max-content;max-width:100%;box-sizing:border-box}' +
    '.b5-top summary:focus-visible{outline:3px solid #B8924A;outline-offset:2px}' +
    '.b5-moved{font-weight:700;color:#414B5C;margin:8px 0}' +
    '@media print{.b5-print{display:block;border:2px solid #000;border-radius:8px;padding:8px 12px;margin:0 0 12px;font-weight:800;color:#000;background:#fff}' +
    '.b5-card{background:#fff!important;color:#000!important;border:1px solid #000;box-shadow:none}.b5-pick,.b5-say,.b5-top,.b5-moved{display:none!important}}';
  var st = el('style', null, css); document.head.appendChild(st);

  function rowsOf(table) {
    var out = [];
    [].forEach.call(table.querySelectorAll('tbody tr'), function (tr) {
      var th = tr.querySelector('th'), td = tr.querySelector('td'); if (!th || !td) return;
      var m = (th.textContent || '').match(/(70|80|90|100)\s*%/); if (!m) return;
      out.push({ p: +m[1], html: td.innerHTML });
    });
    return out.length === 4 ? out : null;
  }
  function bullets(html) {
    var parts = html.replace(/^\s*Also[,:]?\s+/i, '').replace(/([.?!])\s+(?=[A-Z<])/g, '$1\u0001').split('\u0001');
    return '<ul>' + parts.filter(function (x) { return x.replace(/<[^>]+>/g, '').trim(); }).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
  }
  /* Scrubs, Nov 11 2026: short or low-effort answers, or answers that sound AI-written, do not pass. */
  var DEFAULT_FAIL = 'Short or one-line answers. Answers that do not talk about this patient or this case. Answers that sound written by AI. Blank or missing parts, or work turned in just to open the next unit.';
  var all = [];   /* every picker on the page, for the print banner */
  var parts = [];  /* what goes into the top block: {grid, picks, mode, holder} */
  function nm() { try { return localStorage.getItem('b5-name') || ''; } catch (e) { return ''; } }
  function setNm(v) { try { localStorage.setItem('b5-name', v); } catch (e) {} }
  function banner() {
    var b = document.getElementById('b5PrintTarget');
    if (!b) { b = el('div', { id: 'b5PrintTarget', 'class': 'b5-print' }); document.body.insertBefore(b, document.body.firstChild); }
    var bits = all.map(function (g) { var v = get(g.key); return (g.label ? g.label + ': ' : '') + (v ? v + '% (' + NAMES[v] + ')' : 'not chosen'); });
    var from = document.querySelector('[data-target-from]');
    if (from) { var fv = null; try { fv = localStorage.getItem('b5-target:' + from.getAttribute('data-target-from') + ':main'); } catch (e) {} bits.push('Lab: ' + (fv ? fv + '% (' + NAMES[fv] + ')' : 'not chosen')); }
    b.textContent = (nm() ? 'Name: ' + nm() + '   ' : '') + (bits.length ? 'My target. ' + bits.join('   ') + '   ' : '') + 'Printed ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  function build(holder, table, targets, mode, oldPick) {
    var rows = rowsOf(table); if (!rows) return;
    var grid = el('div', { 'class': 'b5-grid' });
    rows.forEach(function (r, i) {
      var c = COL[r.p], card = el('div', { 'class': 'b5-card', style: 'background:' + c[0] + ';color:' + c[1] });
      card.innerHTML = '<p class="p">' + r.p + '%</p><p class="n">' + NAMES[r.p] + '</p>' +
        (i ? '<p class="plus">Everything in ' + rows[i - 1].p + '%, plus:</p>' : '<p class="plus">What your work shows:</p>') + bullets(r.html);
      grid.appendChild(card);
    });
    var fail = (holder.getAttribute && holder.getAttribute('data-fail')) || table.getAttribute('data-fail') || DEFAULT_FAIL;
    if (fail) {
      var fc = el('div', { 'class': 'b5-card b5-fail', style: 'background:#E6E7EB;color:#0B1530' });
      fc.innerHTML = '<p class="p">Under 70%</p><p class="n">Not passing</p><p class="plus">Work that earns this:</p>' + bullets(fail);
      grid.insertBefore(fc, grid.firstChild);
    }
    table.style.display = 'none';
    var wrap = table.closest('.tblscroll') || table; wrap.parentNode.insertBefore(grid, wrap.nextSibling);
    var after = grid, picks = [];
    parts.push({ grid: grid, picks: picks, mode: mode, holder: holder });
    if (mode === 'none') return;
    targets.forEach(function (label, ti) {
      var key = label ? label.replace(/\W+/g, '') : 'main', name = 'b5t-' + all.length;
      var fs = el('fieldset', { 'class': 'b5-pick' });
      fs.innerHTML = '<legend>' + (label ? 'My target for ' + label : 'My target for this assignment') + '</legend><div class="b5-opts">' +
        [70, 80, 90, 100].map(function (p) { return '<label><input type="radio" name="' + name + '" value="' + p + '"> ' + p + '%</label>'; }).join('') + '</div>';
      var say = el('p', { 'class': 'b5-say', 'aria-live': 'polite' });
      fs.appendChild(say);
      after.parentNode.insertBefore(fs, after.nextSibling); after = fs; picks.push(fs);
      var g = { key: key, label: label }; all.push(g);
      function show() {
        var v = get(key);
        say.textContent = !v ? 'Pick one before you start.' :
          (mode === 'print' ? 'Your target, ' + v + '%, prints at the top of your PDF with your name.' : 'Write your name and "Target' + (label ? ' for ' + label : '') + ': ' + v + '%" at the top of your first page.');
        if (oldPick && v) { var o = oldPick.querySelector('input[value="' + v + '"]'); if (o && !o.checked) { o.checked = true; o.dispatchEvent(new Event('change', { bubbles: true })); } }
        banner();
      }
      [].forEach.call(fs.querySelectorAll('input'), function (inp) {
        if (get(key) === inp.value) inp.checked = true;
        inp.addEventListener('change', function () { put(key, inp.value); show(); });
      });
      show();
    });
    if (oldPick) oldPick.style.display = 'none';
  }
  var NAME_IDS = ['studentName', 'stName'];
  function top() {
    if (!parts.length) return;
    var first = parts[0].holder, cfg = function (a) { return (first.getAttribute && first.getAttribute(a)) || ''; };
    var mode = parts[0].mode, tabs = !!document.querySelector('[role="tabpanel"]');
    var multi = parts[0].picks.length > 1;
    var worth = cfg('data-worth') || (mode === 'none'
      ? 'Your grade is the level your work reaches: <b>70%, 80%, 90% or 100%</b>. The boxes below show what each level needs. Under 70% does not pass.'
      : 'You choose what this is worth. <b>Pick your target: 70%, 80%, 90% or 100%.</b> ' + (multi ? 'Each one is graded on its own. ' : '') + 'Your grade is the level your work reaches. Under 70% does not pass.');
    var sec = el('section', { id: 'b5Top', 'class': 'b5-top', 'aria-labelledby': 'b5TopH' },
      '<p class="b5-k">Your grade</p><h2 id="b5TopH">What this assignment is worth</h2><p class="b5-worth">' + worth + '</p>');
    if (cfg('data-target-from')) sec.setAttribute('data-target-from', cfg('data-target-from'));
    var wantName = mode === 'print' || cfg('data-name') === '1';
    if (wantName) {
      var box = el('div', { 'class': 'b5-nm' }, '<label for="b5Name">Your name, as it appears in Canvas</label><input type="text" id="b5Name" autocomplete="name">');
      sec.appendChild(box);
      var inp = box.querySelector('input'), old = NAME_IDS.map(function (i) { return document.getElementById(i); }).filter(Boolean)[0];
      inp.value = nm() || (old && old.value) || '';
      var sync = function () { setNm(inp.value.trim()); if (old) { old.value = inp.value; old.dispatchEvent(new Event('input', { bubbles: true })); } banner(); };
      inp.addEventListener('input', sync); sync();
      if (old) { var l = document.querySelector('label[for="' + old.id + '"]'); if (l) l.style.display = 'none'; old.style.display = 'none'; }
    } else if (mode === 'hand') {
      sec.appendChild(el('p', { 'class': 'b5-hand' }, 'On paper: write your name and your target at the top of your first page.'));
    }
    parts.forEach(function (pt) { pt.picks.forEach(function (fs) { sec.appendChild(fs); }); });
    var cards = el(tabs ? 'details' : 'div', null, tabs ? '<summary>See what 70%, 80%, 90% and 100% need</summary>' : '');
    parts.forEach(function (pt) {
      var hold = pt.holder, ln = hold.querySelector && hold.querySelector('p.note'), mark = el('span');
      pt.grid.parentNode.insertBefore(mark, pt.grid);
      cards.appendChild(pt.grid);
      if (ln && hold.classList.contains('b5-levels')) cards.appendChild(ln);
      /* a card that held nothing but the levels goes away; otherwise leave a pointer to the top */
      var box = hold.classList.contains('b5-levels') ? (hold.closest('.card') || hold) : null;
      var rest = 'x';
      if (box) { var cl = box.cloneNode(true); [].forEach.call(cl.querySelectorAll('table,span:empty'), function (n) { n.parentNode.removeChild(n); }); rest = (cl.textContent || '').replace(/\s+/g, ''); }
      if (box && !rest) { box.parentNode.removeChild(box); return; }
      mark.parentNode.replaceChild(el('p', { 'class': 'b5-moved' }, pt.mode === 'none' ? 'What each level needs is at the top of this page.' : 'Your target and what each level needs are at the top of this page.'), mark);
    });
    sec.appendChild(cards);
    var main = document.getElementById('main') || document.querySelector('main') || document.body;
    /* very top: above anything that sits between the site header and main (the heart lab's EKG video card) */
    var at = main.firstChild, host = main, prev = main.previousElementSibling, lift = null;
    while (prev && !/^(HEADER|NAV|SCRIPT|STYLE)$/.test(prev.tagName) && !/skip/i.test(prev.className + ' ' + (prev.getAttribute('href') || ''))) { lift = prev; prev = prev.previousElementSibling; }
    if (lift) { host = lift.parentNode; at = lift; }
    host.insertBefore(sec, at);
    banner();
  }
  function init() {
    [].forEach.call(document.querySelectorAll('.b5-levels'), function (h) {
      var t = h.querySelector('table'); if (!t) return;
      var targets = (h.getAttribute('data-targets') || '').split('|').map(function (s) { return s.trim(); });
      build(h, t, targets, h.getAttribute('data-mode') || 'hand', null);
    });
    [].forEach.call(document.querySelectorAll('table.pw-lv'), function (t) {
      if (t.closest('.b5-levels')) return;
      var card = t.closest('.card') || t.parentNode, old = card.querySelector('.pw-tg');
      build(card, t, [''], 'print', old);
    });
    top();
    window.addEventListener('beforeprint', banner);
  }
  window.BIO005_TARGET = function (k) { return get(k || 'main'); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
