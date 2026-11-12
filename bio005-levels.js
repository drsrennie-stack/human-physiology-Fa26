/* bio005-levels.js  (Nov 11 2026, Scrubs)
   Turns a page's 70 / 80 / 90 / 100 level table into four colored cards, adds a
   "My target" picker, remembers the choice in this browser, and prints the target
   at the top of the page's PDF. Handwritten pages tell students what to write on page one.

   Finds:  <div class="b5-levels" data-targets="Case 1|Case 2" data-mode="hand|print"> ...table... </div>
           or a <table class="pw-lv"> (lab pages), whose old radio picker (.pw-tg) is kept in sync and hidden. */
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
    '@media print{.b5-print{display:block;border:2px solid #000;border-radius:8px;padding:8px 12px;margin:0 0 12px;font-weight:800;color:#000;background:#fff}' +
    '.b5-card{background:#fff!important;color:#000!important;border:1px solid #000;box-shadow:none}.b5-pick,.b5-say{display:none}}';
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
  var all = [];   /* every picker on the page, for the print banner */
  function banner() {
    var b = document.getElementById('b5PrintTarget');
    if (!b) { b = el('div', { id: 'b5PrintTarget', 'class': 'b5-print' }); document.body.insertBefore(b, document.body.firstChild); }
    var bits = all.map(function (g) { var v = get(g.key); return (g.label ? g.label + ': ' : '') + (v ? v + '% (' + NAMES[v] + ')' : 'not chosen'); });
    b.textContent = 'My target. ' + bits.join('   ') + '   Printed ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
    var fail = (holder.getAttribute && holder.getAttribute('data-fail')) || table.getAttribute('data-fail');
    if (fail) {
      var fc = el('div', { 'class': 'b5-card b5-fail', style: 'background:#E6E7EB;color:#0B1530' });
      fc.innerHTML = '<p class="p">Under 70%</p><p class="n">Not passing</p><p class="plus">Work that earns this:</p>' + bullets(fail);
      grid.insertBefore(fc, grid.firstChild);
    }
    table.style.display = 'none';
    var wrap = table.closest('.tblscroll') || table; wrap.parentNode.insertBefore(grid, wrap.nextSibling);
    var after = grid;
    targets.forEach(function (label, ti) {
      var key = label ? label.replace(/\W+/g, '') : 'main', name = 'b5t-' + all.length;
      var fs = el('fieldset', { 'class': 'b5-pick' });
      fs.innerHTML = '<legend>' + (label ? 'My target for ' + label : 'My target for this assignment') + '</legend><div class="b5-opts">' +
        [70, 80, 90, 100].map(function (p) { return '<label><input type="radio" name="' + name + '" value="' + p + '"> ' + p + '%</label>'; }).join('') + '</div>';
      var say = el('p', { 'class': 'b5-say', 'aria-live': 'polite' });
      fs.appendChild(say);
      after.parentNode.insertBefore(fs, after.nextSibling); after = fs;
      var g = { key: key, label: label }; all.push(g);
      function show() {
        var v = get(key);
        say.textContent = !v ? 'Pick one before you start.' :
          (mode === 'print' ? 'Your target, ' + v + '%, prints at the top of your PDF.' : 'Write "Target' + (label ? ' for ' + label : '') + ': ' + v + '%" at the top of your first page.');
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
    window.addEventListener('beforeprint', banner);
  }
  window.BIO005_TARGET = function (k) { return get(k || 'main'); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
