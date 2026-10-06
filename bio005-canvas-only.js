/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-canvas-only.js

   CANVAS IS HOME. Oct 5 2026, Scrubs: students work from Canvas, and each
   Canvas item opens one page here. That page is a dead end on purpose: no
   site menu, no footer links, no Course tools or Back buttons, and no link to
   any other page on this site. The one way onward is Back to Canvas.

   What still works on a page: buttons and controls inside it, links to PDFs,
   links to videos and other outside sites, links to Canvas, and links that
   jump within the same page.

   To bring the website back, set ON to false. To preview the full site
   without changing anything for students, add ?site=1 to a page address.
   Loaded by bio005-back.js, and directly by pages that do not load it.
   ============================================================ */
/* Oct 5 2026: HOLD. Pages listed here show a "not open yet" notice instead
   of their content, whatever Canvas says, until Scrubs has reviewed them.
   Add ?preview=1 to the address to see a held page. To release a page, take
   its pattern out of HOLD_PAGES (or empty the list). */
(function () {
  var HOLD_PAGES = [/\/biol005-w05-[a-z-]+-guided\.html$/];
  /* Oct 5 2026, Scrubs: all six Week 5 walkthroughs open on their own at
     Tuesday, October 6, 8:00 am Pacific (15:00 UTC), the time Canvas Step 2
     gives. Before then a held page says when it opens. */
  var RELEASE_AT = Date.UTC(2026, 9, 6, 15, 0, 0);
  if (Date.now() >= RELEASE_AT) return;
  if (/[?&]preview=1\b/.test(location.search)) return;
  var held = HOLD_PAGES.some(function (r) { return r.test(location.pathname); });
  if (!held) return;
  function cover() {
    var css = document.createElement('style');
    css.textContent = 'body>*:not(.b5-held){display:none!important}html,body{background:#F7F8FA!important}';
    document.head.appendChild(css);
    var d = document.createElement('div');
    d.className = 'b5-held';
    d.setAttribute('role', 'main');
    d.style.cssText = 'max-width:620px;margin:12vh auto 0;padding:30px 32px;background:#fff;border-radius:16px;' +
      'box-shadow:0 4px 18px rgba(11,21,48,.10);font:16px/1.6 "Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:#0B1530';
    d.innerHTML = '<h1 style="font-size:28px;line-height:1.15;margin:0 0 10px;font-weight:800">This walkthrough is not open yet</h1>' +
      '<p style="margin:0 0 12px">It opens on Tuesday, October 6 at 8:00 am Pacific. Come back then.</p>' +
      '<p style="margin:0 0 22px">In the meantime, you can work on the pre-read, read the written notes, and start your Competency Study Guide.</p>' +
      '<a href="https://yccd.instructure.com/courses/42616/modules" target="_top" style="display:inline-flex;align-items:center;min-height:48px;padding:12px 22px;border-radius:10px;background:#8B3A2E;color:#fff;text-decoration:none;font-weight:800">Back to Canvas</a>';
    document.body.appendChild(d);
  }
  if (document.body) cover(); else document.addEventListener('DOMContentLoaded', cover);
}());

(function () {
  var ON = true;
  var CANVAS = 'https://yccd.instructure.com/courses/42616/modules';
  if (!ON || window.__b5CanvasOnly) return;
  if (/[?&]site=1\b/.test(location.search)) return;
  window.__b5CanvasOnly = true;

  var css = document.createElement('style');
  css.textContent =
    '.b5site,.b5nav,.b5foot,.mm-flinks,.mm-back,.b5-back,.b5-backwrap,.bd-dock,#siteBack,.framehead,' +
    'a.back,.chip-back,.b5-sitebar,.siteback{display:none!important}' +
    /* Oct 5 2026: the Course tools dock (bio005-dock.js), its first-visit hint,
       and Hootie (hootie.js), with its Stuck? nudge, are site navigation too. */
    '.bd-launch,.bd-panel,.bd-scrim,.bd-hint,.dock-coach,.dc-mark,.hoo-btn,.hoo-panel,.hoo-nudge,#hoo-panel{display:none!important}' +
    '.mm-brandbar a{pointer-events:none;cursor:default}' +
    '.b5-nolink{color:inherit;text-decoration:none;cursor:default}' +
    '.b5-tocanvas{position:fixed;left:18px;bottom:18px;z-index:2147483000;display:inline-flex;align-items:center;' +
    'gap:8px;min-height:48px;padding:10px 18px;border-radius:999px;background:#0B1530;color:#fff!important;' +
    'font:700 15px/1.2 "Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;text-decoration:none!important;' +
    'box-shadow:0 4px 14px rgba(11,21,48,.25)}' +
    '.b5-tocanvas:hover{background:#8B3A2E}' +
    '.b5-tocanvas:focus-visible{outline:3px solid #C9A14A;outline-offset:3px}' +
    '@media print{.b5-tocanvas{display:none!important}}' +
    '@media (max-width:560px){.b5-tocanvas{left:10px;bottom:10px}}';
  (document.head || document.documentElement).appendChild(css);

  function sitePage(a) {
    var h = a.getAttribute('href');
    if (!h || h.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(h)) return false;
    /* a walkthrough's own Before you start link to its notes stays live */
    if (a.classList && a.classList.contains('b5-keep')) return false;
    var u;
    try { u = new URL(h, location.href); } catch (e) { return false; }
    if (u.origin !== location.origin) return false;
    if (/\.(pdf|png|jpe?g|gif|svg|webp|mp4|mp3|zip|docx?|pptx?|xlsx?|csv)$/i.test(u.pathname)) return false;
    if (u.pathname === location.pathname && u.search === location.search) return false;
    return true;
  }
  function strip(a) {
    if (a.classList.contains('b5-tocanvas')) return;
    if (!sitePage(a)) return;
    /* In a header, menu, toolbar or footer a dead link is just clutter, so it
       goes. In running text it stays as words, so the sentence still reads. */
    if (a.closest('header, nav, footer, [role="navigation"], .top-in, .toolbar')) { a.parentNode.removeChild(a); return; }
    var s = document.createElement('span');
    s.className = (a.className ? a.className + ' ' : '') + 'b5-nolink';
    s.innerHTML = a.innerHTML;
    a.parentNode.replaceChild(s, a);
  }
  function sweep(root) {
    [].slice.call((root || document).querySelectorAll('a[href]')).forEach(strip);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a && !a.classList.contains('b5-tocanvas') && sitePage(a)) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  function start() {
    sweep(document);
    if (!document.querySelector('.b5-tocanvas')) {
      var b = document.createElement('a');
      b.className = 'b5-tocanvas';
      b.href = CANVAS;
      b.target = '_top';
      b.textContent = 'Back to Canvas';
      document.body.appendChild(b);
    }
    if (window.MutationObserver) {
      new MutationObserver(function (ms) {
        ms.forEach(function (m) {
          [].slice.call(m.addedNodes).forEach(function (n) {
            if (n.nodeType !== 1) return;
            if (n.matches && n.matches('a[href]')) strip(n); else sweep(n);
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
}());
