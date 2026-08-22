/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-dock.js

   ONE DOCK, EVERY PAGE.

   WHY
   ---
   Every tool in this course lived somewhere different. Loops on
   the hub, Recall Rx in a block halfway down, Mastery OS in a
   panel at the bottom, the calendar in the header, the syllabus
   in a chip. A student reading a notes page who wanted a card
   deck had to go back, find the hub, scroll, and click. That is
   four decisions to reach one tool, repeated all term.

   This is one launcher, bottom left, on every page. Same place,
   same contents, same behavior, whatever page they are on.

   WHY BOTTOM LEFT
   ---------------
   Hootie sits at right:18px bottom:18px. Two floating buttons in
   the same corner would overlap on a phone.

   DESIGN NOTES
   ------------
   Closed, it is a single pill. That is the whole resting state:
   one target, no menu bar, nothing competing with the page.

   Open, it is a search box plus grouped app tiles. Typing filters
   instantly, so a student who knows what they want types three
   letters and presses Enter. A student who does not know browses
   the tiles. Both paths are one interaction from anywhere.

   Every tile carries a QR so a student on a laptop can send the
   tool to their phone without typing a URL. The QR codes are
   inline SVG baked in at build time: no third-party script, no
   network request, nothing that can track a student, and they
   still work if the page is loaded and the wifi drops.

   ACCESSIBILITY
   -------------
   role="dialog" with aria-modal, focus moves to the search box on
   open and returns to the launcher on close, Tab is trapped while
   open, Escape closes, arrow keys walk the tiles, aria-expanded on
   the launcher, a live region announces the filtered count, and
   every color pair in here was measured at 7:1 or better.
   prefers-reduced-motion removes the transitions.

   DEPENDENCIES
   ------------
   None required. If course-links.js, schedule-fall2026.js or
   session-links.js happen to be on the page the dock uses them to
   resolve the student's section and this week. If they are absent
   it still works, it just shows the generic links.
   ============================================================ */
/* ============================================================
   SOLO FRAME MODE, so Kajabi needs ONE embed and not twenty-eight

   THE PROBLEM
   Every internal link on this site carries target="_top". That is
   correct for Canvas, where a tool is embedded as one page and a
   link should break out of the frame rather than nest a course
   inside a course. It is exactly wrong for a single Kajabi embed:
   the student clicks anything and the whole Kajabi page navigates
   away to github.io. Which is why, without this, you would need a
   separate embed for every page you wanted reachable.

   THE FIX
   Add ?embed=solo to the iframe's address. From then on this file
   keeps navigation inside the frame: it intercepts clicks on
   internal links, cancels the target="_top" jump, and navigates
   the frame itself, carrying embed=solo forward so the mode
   survives every hop. One embed, the whole site reachable inside
   it, the Kajabi page never navigating away.

   WHY INTERCEPT CLICKS RATHER THAN REWRITE THE LINKS
   The dock builds its tiles after this runs, the coachmark adds
   more later, and several pages render links from data. Rewriting
   the DOM once would miss all of them and rewriting it repeatedly
   is a MutationObserver nobody wants to maintain. One capture
   phase listener on the document catches every link that will
   ever exist on the page, including ones added a minute from now.

   WHAT IT LEAVES ALONE
   External hosts, target="_blank", mailto and tel, downloads,
   same page #anchors, and any click with a modifier key so
   "open in new tab" still works. Off this mode, which is the
   default, nothing about the site changes.

   SCROLL
   Navigating inside a tall frame leaves the reader stranded in
   the middle of the Kajabi page looking at the middle of a new
   document. The frame asks the parent to scroll it back to the
   top; the receiver in the embed block does it.
   ============================================================ */
(function () {
  'use strict';
  if (window.__BIO005_SOLO__) return;
  window.__BIO005_SOLO__ = true;

  var FLAG = 'embed', VALUE = 'solo', SKEY = 'bio005-embed-mode';

  /* CONTENT HEIGHT, NOT VIEWPORT HEIGHT.
     Inside a frame, documentElement.scrollHeight and body.scrollHeight are
     both max(content, viewport), and the viewport IS the frame. A page that
     measures either can only ever tell the parent to grow, so a frame that
     was once tall stays tall and the page shows a band of empty background
     under its footer. Measuring the children gives a number that can go
     down as well as up. Exposed globally so every page's own sender can
     use it without each one being rewritten. */
  window.BIO005_CONTENT_HEIGHT = function () {
    var h = 0, b = document.body;
    if (!b) return 0;
    for (var i = 0; i < b.children.length; i++) {
      var el = b.children[i];
      var cs = window.getComputedStyle(el);
      if (cs.position === 'fixed' || cs.display === 'none') continue;
      var r = el.getBoundingClientRect();
      if (r.height) h = Math.max(h, r.bottom + (window.pageYOffset || 0));
    }
    return Math.ceil(h);
  };

  /* The parent posts the slice of this frame that is on screen. Without it
     nothing changes and the launcher stays as it was. */
  var VIEW = null;
  function placeFloaters(){
    if (!VIEW) return;
    var d = document.documentElement;
    if (d.className.indexOf('bd-inframe') < 0) d.className += ' bd-inframe';
    var pad = 18;
    var btn = document.querySelector('.bd-launch');
    if (btn){
      var bottom = VIEW.top + VIEW.height - pad - btn.offsetHeight;
      btn.style.top = Math.max(VIEW.top + pad, bottom) + 'px';
      btn.style.left = pad + 'px';
    }
    var panel = document.querySelector('.bd-panel');
    if (panel){
      var pt = VIEW.top + VIEW.height - pad - panel.offsetHeight;
      panel.style.top = Math.max(VIEW.top + pad, pt) + 'px';
    }
    var scrim = document.querySelector('.bd-scrim');
    if (scrim){ scrim.style.top = VIEW.top + 'px'; scrim.style.height = VIEW.height + 'px'; }
  }
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.type !== 'bio005-viewport') return;
    if (typeof d.top !== 'number' || typeof d.height !== 'number') return;
    VIEW = { top: d.top, height: d.height };
    placeFloaters();
  }, false);
  window.addEventListener('resize', placeFloaters);

  function framed() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }

  function wanted() {
    var q = (location.search + '&' + location.hash.replace('#', '&'));
    if (new RegExp('[?&]' + FLAG + '=' + VALUE + '\\b').test(q)) {
      try { sessionStorage.setItem(SKEY, VALUE); } catch (e) {}
      return true;
    }
    /* A link built elsewhere can lose the parameter. sessionStorage
       is per tab and per origin, so it carries the mode across the
       gap without leaking into a normal visit in another tab. It is
       the backup, not the source of truth: some browsers partition
       or block storage in a third party frame, which is why the
       parameter is threaded through every link as well. */
    try { return sessionStorage.getItem(SKEY) === VALUE; } catch (e) { return false; }
  }

  if (!framed() || !wanted()) return;

  window.__BIO005_SOLO_ON__ = true;

  function tellParent(type) {
    try { parent.postMessage({ type: type, from: 'bio005' }, '*'); } catch (e) {}
  }

  function withFlag(href) {
    var a = document.createElement('a');
    a.href = href;                                  /* resolves relative URLs */
    if (new RegExp('[?&]' + FLAG + '=' + VALUE + '\\b').test(a.search)) return a.href;
    a.search = (a.search ? a.search + '&' : '?') + FLAG + '=' + VALUE;
    return a.href;
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.hasAttribute('download')) return;
    if (a.target === '_blank') return;

    var href = a.getAttribute('href') || '';
    if (/^(mailto:|tel:|javascript:|data:)/i.test(href)) return;
    if (href.charAt(0) === '#') return;             /* same page anchor */

    /* Same origin only. An external tool opening inside the frame
       would be a course nested in a course. */
    if (a.protocol !== location.protocol || a.host !== location.host) return;

    /* A hash link to this very page is an in page jump, not a nav. */
    if (a.pathname === location.pathname && a.search === location.search && a.hash) return;

    e.preventDefault();
    tellParent('scrollTop');
    location.href = withFlag(a.href);
  }, true);

  /* Landing on a new page inside the frame: bring the reader to the
     top of it rather than wherever the Kajabi page was scrolled. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { tellParent('scrollTop'); });
  } else {
    tellParent('scrollTop');
  }
}());

(function () {
  'use strict';
  if (window.__BIO005_DOCK__) return;      /* never inject twice */
  window.__BIO005_DOCK__ = true;

  /* The OS lives in os/, not at the repo root. Every tile below builds an
     absolute URL off BASE, so the path has to include the folder or the
     three most used buttons in the dock, Today, Mastery and Recall, all
     404 in production while working perfectly on a local server opened
     from inside os/. */
  var BASE = 'https://drsrennie-stack.github.io/human-physiology-Fa26/';
  var SEC_KEY = 'bio005-section';

  var SECTIONS = {
    'net':    { label: 'Sutter Internet (NET), fully online', syllabus: 'syllabus.html', hub: 'welcome.html' }
  };

  function section() {
    var s = null;
    try { var m = location.search.match(/[?&]sec=([^&#]+)/); if (m) s = decodeURIComponent(m[1]); } catch (e) {}
    if (!SECTIONS[s]) { try { s = localStorage.getItem(SEC_KEY); } catch (e) { s = null; } }
    return SECTIONS[s] ? s : null;
  }

  /* QR codes, inline SVG, generated at build time. */
  var QR = {
    howto: "<svg width=\"39\" height=\"39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m1 0h1m2 0h2m2 0h1m1 0h1m5 0h2m1 0h3m1 0h7m-37 1h1m5 0h1m2 0h1m2 0h3m2 0h1m1 0h4m1 0h3m1 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m3 0h1m1 0h2m1 0h1m1 0h2m2 0h1m4 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m2 0h3m1 0h1m1 0h2m3 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m2 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h3m4 0h2m2 0h1m2 0h1m1 0h1m5 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h1m1 0h1m1 0h1m2 0h3m1 0h3m2 0h1m1 0h1m-27 1h1m3 0h1m1 0h3m1 0h2m2 0h4m2 0h4m2 0h2m1 0h5m2 0h1m-37 1h2m1 0h3m3 0h3m1 0h2m2 0h2m2 0h3m1 0h1m1 0h2m3 0h1m2 0h1m-34 1h1m1 0h4m1 0h3m3 0h1m2 0h1m2 0h4m1 0h3m2 0h3m-34 1h2m1 0h1m3 0h1m2 0h3m1 0h4m1 0h3m1 0h2m1 0h1m1 0h2m1 0h2m1 0h2m-32 1h1m1 0h2m1 0h2m1 0h1m4 0h1m2 0h3m1 0h1m1 0h1m2 0h3m2 0h3m-36 1h1m3 0h1m6 0h1m1 0h5m3 0h8m2 0h2m-33 1h4m1 0h1m3 0h3m1 0h2m1 0h2m1 0h5m2 0h2m1 0h5m-35 1h1m1 0h1m1 0h2m3 0h1m4 0h5m2 0h2m6 0h1m1 0h2m1 0h1m-32 1h1m1 0h2m5 0h4m1 0h1m2 0h4m2 0h2m1 0h3m1 0h3m-36 1h1m1 0h3m2 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m2 0h1m3 0h2m3 0h1m1 0h2m-33 1h1m1 0h3m3 0h2m1 0h1m1 0h3m2 0h1m1 0h2m1 0h2m1 0h1m1 0h2m1 0h1m-34 1h1m6 0h2m1 0h2m4 0h3m1 0h2m1 0h1m1 0h1m2 0h2m3 0h2m-36 1h1m2 0h4m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1m1 0h6m2 0h1m1 0h3m2 0h1m-35 1h1m1 0h2m4 0h1m2 0h3m1 0h3m3 0h1m1 0h1m1 0h1m1 0h3m1 0h2m-32 1h2m2 0h4m2 0h2m2 0h1m1 0h2m4 0h2m2 0h1m1 0h1m1 0h5m-35 1h1m5 0h1m2 0h1m4 0h1m1 0h1m1 0h3m5 0h1m3 0h2m1 0h2m-34 1h5m2 0h1m3 0h2m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1m2 0h2m2 0h4m-37 1h1m2 0h1m3 0h1m1 0h1m1 0h1m6 0h1m2 0h3m1 0h1m1 0h1m4 0h3m-33 1h1m2 0h3m3 0h3m1 0h1m2 0h1m1 0h4m1 0h1m1 0h1m1 0h1m1 0h1m-30 1h2m3 0h2m2 0h1m2 0h5m1 0h5m1 0h1m3 0h5m1 0h1m-37 1h2m1 0h1m2 0h4m1 0h3m2 0h7m1 0h1m2 0h9m-28 1h1m1 0h2m3 0h2m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m3 0h1m-33 1h7m1 0h3m3 0h4m4 0h3m1 0h1m1 0h1m1 0h1m1 0h1m-33 1h1m5 0h1m5 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1m4 0h1m3 0h4m-36 1h1m1 0h3m1 0h1m1 0h1m5 0h1m3 0h5m3 0h1m1 0h8m-36 1h1m1 0h3m1 0h1m4 0h2m1 0h1m1 0h3m3 0h2m1 0h2m1 0h4m1 0h1m2 0h1m-37 1h1m1 0h3m1 0h1m2 0h4m3 0h3m2 0h1m1 0h2m1 0h3m1 0h1m2 0h2m-35 1h1m5 0h1m3 0h2m2 0h1m2 0h2m1 0h2m1 0h2m2 0h1m2 0h1m1 0h4m-36 1h7m1 0h1m1 0h1m1 0h4m1 0h1m1 0h6m2 0h1m3 0h1m2 0h3\"/></svg>",
    histology: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 35 35\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m2 0h1m2 0h1m1 0h1m1 0h4m3 0h1m2 0h7m-33 1h1m5 0h1m1 0h2m2 0h1m1 0h3m4 0h1m2 0h1m1 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m10 0h2m4 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h7m4 0h1m3 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m4 0h1m1 0h1m2 0h1m1 0h6m2 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m1 0h1m2 0h6m2 0h2m3 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-19 1h2m2 0h1m1 0h3m1 0h1m-25 1h5m1 0h9m2 0h1m1 0h1m2 0h4m1 0h1m1 0h1m1 0h1m-32 1h4m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m2 0h6m1 0h1m2 0h1m3 0h3m-32 1h1m1 0h4m1 0h2m2 0h1m1 0h2m2 0h1m1 0h1m5 0h4m1 0h1m-32 1h3m1 0h1m2 0h1m1 0h2m4 0h1m5 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-30 1h1m2 0h4m1 0h1m3 0h2m2 0h1m1 0h1m4 0h2m1 0h3m-29 1h2m2 0h1m2 0h1m1 0h2m1 0h1m2 0h5m2 0h1m2 0h1m4 0h2m-33 1h2m4 0h2m2 0h1m1 0h6m2 0h1m1 0h1m1 0h2m1 0h2m2 0h1m-32 1h2m1 0h3m1 0h3m2 0h1m1 0h1m1 0h1m3 0h2m1 0h1m1 0h1m2 0h1m1 0h1m-30 1h1m1 0h1m2 0h2m3 0h4m2 0h2m1 0h1m1 0h3m2 0h2m2 0h1m-32 1h1m2 0h3m5 0h1m7 0h2m2 0h2m1 0h1m2 0h1m1 0h2m-29 1h4m1 0h1m2 0h5m4 0h1m3 0h2m2 0h1m1 0h1m-31 1h2m5 0h1m2 0h1m2 0h1m1 0h1m1 0h2m1 0h5m4 0h1m-30 1h1m1 0h2m1 0h2m1 0h6m2 0h2m3 0h4m1 0h2m2 0h1m-32 1h6m5 0h4m1 0h5m2 0h1m1 0h2m2 0h1m1 0h2m-33 1h1m5 0h3m3 0h1m2 0h1m4 0h1m1 0h1m4 0h3m1 0h1m-32 1h1m3 0h1m2 0h1m2 0h1m1 0h1m1 0h1m1 0h1m3 0h8m1 0h2m-31 1h1m3 0h1m1 0h1m1 0h1m1 0h1m2 0h1m3 0h1m1 0h1m4 0h5m3 0h1m-25 1h1m1 0h2m1 0h1m2 0h1m2 0h1m4 0h1m3 0h3m1 0h1m-33 1h7m1 0h1m3 0h1m1 0h5m1 0h1m1 0h3m1 0h1m1 0h1m1 0h2m-32 1h1m5 0h1m2 0h1m4 0h2m3 0h6m3 0h5m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h5m1 0h1m2 0h1m1 0h1m1 0h6m2 0h1m-33 1h1m1 0h3m1 0h1m1 0h4m1 0h1m2 0h5m2 0h3m2 0h1m1 0h1m-31 1h1m1 0h3m1 0h1m1 0h1m6 0h1m1 0h1m2 0h1m1 0h1m1 0h3m4 0h1m-32 1h1m5 0h1m1 0h3m4 0h2m3 0h2m3 0h1m2 0h3m-31 1h7m1 0h1m1 0h1m1 0h3m2 0h1m4 0h3m2 0h1m1 0h1m1 0h1\"/></svg>",
    mastery: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m1 0h1m1 0h4m1 0h1m2 0h1m1 0h3m7 0h7m-37 1h1m5 0h1m2 0h2m6 0h2m2 0h2m1 0h1m3 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h2m2 0h1m1 0h1m3 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h2m1 0h2m1 0h1m1 0h2m2 0h3m1 0h2m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m4 0h2m3 0h1m1 0h1m1 0h3m2 0h2m3 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h1m1 0h9m1 0h3m2 0h1m4 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-27 1h4m2 0h1m2 0h2m2 0h2m1 0h3m-29 1h1m1 0h1m3 0h2m3 0h5m8 0h1m3 0h1m2 0h1m2 0h1m1 0h1m-37 1h1m2 0h2m4 0h1m2 0h1m4 0h1m1 0h1m1 0h1m1 0h1m2 0h3m1 0h2m3 0h2m-37 1h2m1 0h1m1 0h3m2 0h1m1 0h4m3 0h5m1 0h1m1 0h1m2 0h1m2 0h1m2 0h1m-37 1h1m2 0h3m2 0h1m2 0h2m6 0h1m2 0h2m2 0h1m1 0h1m2 0h3m-34 1h1m2 0h2m1 0h2m1 0h1m2 0h5m2 0h2m2 0h2m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m-37 1h3m2 0h1m2 0h2m1 0h3m1 0h3m1 0h2m1 0h2m3 0h5m1 0h1m2 0h1m-35 1h2m1 0h3m1 0h2m1 0h4m1 0h3m1 0h3m1 0h1m1 0h2m4 0h2m1 0h1m-37 1h2m3 0h1m3 0h1m2 0h3m7 0h2m3 0h2m2 0h3m1 0h1m-36 1h2m2 0h1m1 0h1m4 0h2m1 0h1m1 0h1m11 0h1m1 0h2m-31 1h1m7 0h1m3 0h2m1 0h1m1 0h2m3 0h3m1 0h2m1 0h2m2 0h3m-37 1h4m1 0h2m2 0h1m6 0h2m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m3 0h1m1 0h1m-37 1h2m1 0h3m3 0h3m1 0h1m1 0h2m1 0h1m4 0h2m1 0h3m1 0h1m2 0h1m-34 1h1m1 0h1m3 0h3m4 0h2m1 0h1m2 0h2m3 0h1m3 0h1m1 0h2m1 0h1m1 0h1m-34 1h3m4 0h2m1 0h1m2 0h2m1 0h4m1 0h2m1 0h5m5 0h1m-37 1h1m3 0h3m1 0h1m2 0h1m3 0h1m1 0h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m2 0h4m-36 1h2m1 0h2m5 0h2m3 0h1m2 0h2m2 0h1m2 0h1m1 0h2m1 0h3m-32 1h1m1 0h1m1 0h1m8 0h2m6 0h2m2 0h2m1 0h1m5 0h1m-35 1h1m4 0h6m1 0h1m4 0h1m1 0h1m1 0h2m1 0h2m2 0h2m1 0h2m1 0h1m-37 1h2m1 0h7m2 0h2m1 0h2m2 0h5m2 0h2m1 0h2m1 0h1m3 0h1m-34 1h1m3 0h4m3 0h1m3 0h2m4 0h1m1 0h7m2 0h1m-36 1h4m2 0h5m1 0h1m1 0h2m2 0h3m3 0h1m3 0h5m2 0h2m-29 1h2m1 0h2m2 0h3m1 0h1m1 0h4m1 0h1m1 0h1m3 0h1m3 0h1m-37 1h7m1 0h1m4 0h1m1 0h3m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m3 0h1m-37 1h1m5 0h1m4 0h3m1 0h1m2 0h2m7 0h2m3 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h4m2 0h1m2 0h3m2 0h6m-33 1h1m1 0h3m1 0h1m5 0h1m4 0h1m1 0h1m3 0h1m2 0h1m1 0h2m2 0h2m1 0h1m-36 1h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m2 0h4m1 0h1m-37 1h1m5 0h1m3 0h1m3 0h1m1 0h1m1 0h1m1 0h1m1 0h1m5 0h3m1 0h1m-33 1h7m1 0h2m1 0h2m3 0h1m3 0h1m3 0h1m3 0h2m1 0h1m1 0h1m2 0h1\"/></svg>",
    recall: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m1 0h2m2 0h7m1 0h1m2 0h1m2 0h3m1 0h7m-37 1h1m5 0h1m2 0h3m1 0h2m1 0h2m1 0h4m2 0h2m1 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m3 0h2m2 0h2m1 0h2m4 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h3m1 0h2m1 0h2m3 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h1m2 0h1m1 0h2m1 0h1m2 0h1m2 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h4m2 0h4m1 0h1m2 0h1m1 0h1m5 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h3m1 0h1m2 0h1m1 0h1m1 0h3m2 0h1m1 0h1m-27 1h1m3 0h1m1 0h5m1 0h2m2 0h2m2 0h5m1 0h2m1 0h5m2 0h1m-35 1h1m1 0h2m3 0h1m1 0h1m1 0h2m2 0h2m2 0h1m1 0h1m1 0h1m1 0h2m3 0h1m2 0h1m-34 1h2m1 0h4m1 0h1m1 0h1m2 0h1m2 0h1m2 0h4m1 0h3m2 0h3m-34 1h1m2 0h1m4 0h5m2 0h3m2 0h2m1 0h1m2 0h1m1 0h2m1 0h2m1 0h2m-36 1h1m1 0h1m2 0h3m2 0h5m2 0h1m2 0h3m1 0h1m1 0h1m2 0h3m2 0h3m-33 1h2m1 0h1m1 0h1m1 0h1m1 0h6m3 0h8m2 0h2m-34 1h2m1 0h1m1 0h2m1 0h1m1 0h1m4 0h1m1 0h1m2 0h2m1 0h2m2 0h2m1 0h5m-34 1h1m1 0h1m5 0h1m1 0h2m2 0h3m3 0h2m6 0h1m1 0h2m1 0h1m-32 1h1m2 0h1m5 0h1m1 0h2m1 0h1m2 0h2m1 0h2m1 0h2m1 0h3m1 0h3m-36 1h1m1 0h1m5 0h3m3 0h1m1 0h1m6 0h1m3 0h2m3 0h1m1 0h2m-34 1h1m2 0h2m2 0h1m1 0h1m1 0h2m1 0h3m1 0h2m1 0h1m2 0h2m1 0h1m1 0h2m1 0h1m-35 1h2m5 0h1m3 0h3m3 0h2m2 0h3m2 0h1m2 0h2m3 0h2m-36 1h1m1 0h9m2 0h3m1 0h1m1 0h4m1 0h1m2 0h1m1 0h3m2 0h1m-35 1h2m1 0h2m2 0h2m1 0h1m2 0h4m4 0h1m1 0h1m1 0h1m1 0h3m1 0h2m-33 1h3m2 0h3m1 0h1m1 0h2m2 0h1m1 0h2m2 0h1m1 0h2m2 0h1m1 0h1m1 0h5m-36 1h5m5 0h1m1 0h2m1 0h1m1 0h1m1 0h3m5 0h1m3 0h2m1 0h2m-35 1h2m3 0h1m4 0h2m1 0h1m2 0h1m2 0h3m3 0h1m2 0h2m2 0h4m-37 1h3m6 0h2m2 0h2m3 0h1m2 0h3m1 0h1m1 0h1m4 0h3m-33 1h5m1 0h2m1 0h2m1 0h3m1 0h1m1 0h6m1 0h1m1 0h1m1 0h1m-30 1h1m1 0h2m1 0h1m3 0h2m1 0h6m1 0h2m3 0h1m3 0h5m-35 1h2m2 0h5m3 0h1m1 0h1m1 0h7m1 0h1m2 0h8m1 0h1m-29 1h2m1 0h1m2 0h5m1 0h1m1 0h2m1 0h1m2 0h1m3 0h1m-33 1h7m1 0h1m1 0h1m1 0h2m1 0h4m3 0h3m1 0h1m1 0h1m1 0h1m1 0h1m-33 1h1m5 0h1m2 0h2m1 0h1m3 0h4m1 0h3m4 0h1m3 0h4m-36 1h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m3 0h1m1 0h4m3 0h1m1 0h8m-36 1h1m1 0h3m1 0h1m4 0h1m1 0h2m2 0h2m4 0h1m1 0h2m1 0h4m1 0h1m1 0h2m-37 1h1m1 0h3m1 0h1m2 0h1m4 0h5m1 0h2m1 0h2m1 0h3m1 0h1m2 0h2m-35 1h1m5 0h1m2 0h1m4 0h2m1 0h2m1 0h2m1 0h2m2 0h1m2 0h1m1 0h4m-36 1h7m1 0h1m1 0h3m2 0h1m1 0h1m1 0h6m2 0h1m3 0h1m2 0h3\"/></svg>",
    loops: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 31 31\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m1 0h1m1 0h3m1 0h1m3 0h1m3 0h7m-29 1h1m5 0h1m2 0h3m1 0h2m1 0h2m2 0h1m1 0h1m5 0h1m-29 1h1m1 0h3m1 0h1m1 0h2m1 0h3m3 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m2 0h1m3 0h3m1 0h1m4 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m2 0h1m2 0h2m4 0h1m3 0h1m1 0h3m1 0h1m-29 1h1m5 0h1m1 0h1m1 0h2m5 0h2m1 0h1m1 0h1m5 0h1m-29 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-20 1h4m3 0h1m-17 1h1m1 0h1m3 0h2m1 0h1m1 0h2m3 0h1m2 0h2m2 0h1m2 0h1m1 0h1m-27 1h1m1 0h1m3 0h1m1 0h2m2 0h3m2 0h2m1 0h2m3 0h2m-29 1h2m2 0h3m1 0h1m2 0h1m2 0h2m3 0h2m1 0h2m1 0h2m1 0h1m-29 1h2m2 0h1m5 0h1m3 0h3m1 0h1m1 0h2m3 0h1m-25 1h2m3 0h1m1 0h3m3 0h1m1 0h1m2 0h1m2 0h1m5 0h1m-29 1h2m1 0h3m2 0h1m2 0h3m1 0h1m1 0h1m1 0h2m1 0h2m3 0h2m-27 1h2m2 0h1m1 0h1m1 0h1m4 0h1m1 0h3m8 0h1m-29 1h1m1 0h1m1 0h2m2 0h1m2 0h2m1 0h3m1 0h2m2 0h1m-23 1h1m1 0h1m2 0h4m4 0h2m1 0h1m2 0h1m2 0h1m5 0h1m-28 1h5m1 0h4m1 0h1m2 0h2m1 0h3m1 0h2m2 0h3m-29 1h3m3 0h1m1 0h4m1 0h3m1 0h1m1 0h1m3 0h1m1 0h1m2 0h1m-27 1h1m1 0h1m2 0h1m1 0h1m1 0h1m8 0h1m1 0h1m-23 1h3m1 0h1m1 0h1m3 0h1m1 0h3m1 0h1m3 0h6m1 0h1m-20 1h4m1 0h1m1 0h3m2 0h1m3 0h3m1 0h1m-29 1h7m1 0h1m1 0h1m1 0h1m2 0h4m1 0h1m1 0h1m1 0h1m3 0h1m-29 1h1m5 0h1m2 0h2m1 0h2m1 0h2m3 0h1m3 0h1m-25 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m2 0h1m2 0h7m1 0h1m-28 1h1m1 0h3m1 0h1m3 0h2m3 0h1m2 0h2m1 0h1m1 0h4m1 0h1m-29 1h1m1 0h3m1 0h1m1 0h1m3 0h2m1 0h3m2 0h2m2 0h1m2 0h2m-29 1h1m5 0h1m2 0h1m1 0h1m1 0h3m2 0h1m1 0h1m1 0h1m2 0h1m-26 1h7m1 0h1m1 0h7m3 0h1m1 0h1m1 0h2m2 0h1\"/></svg>",
    atlas: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 35 35\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m1 0h6m2 0h1m1 0h1m4 0h2m1 0h7m-33 1h1m5 0h1m3 0h1m1 0h3m1 0h1m1 0h3m1 0h1m3 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m1 0h2m1 0h1m2 0h2m1 0h2m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m6 0h2m1 0h1m1 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m2 0h1m2 0h1m2 0h1m1 0h3m2 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m1 0h4m1 0h1m2 0h1m1 0h3m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h2m4 0h1m2 0h7m-24 1h1m3 0h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h1m2 0h10m2 0h1m-31 1h1m6 0h2m1 0h1m1 0h2m1 0h1m5 0h1m1 0h1m3 0h3m-32 1h1m1 0h1m3 0h1m1 0h2m3 0h3m2 0h1m1 0h2m1 0h1m1 0h2m2 0h1m1 0h1m-27 1h1m4 0h2m1 0h1m1 0h1m4 0h2m3 0h1m5 0h1m-32 1h3m2 0h2m4 0h3m1 0h2m2 0h2m1 0h1m3 0h1m1 0h2m2 0h1m-33 1h1m2 0h1m4 0h1m1 0h1m3 0h1m3 0h3m1 0h1m3 0h2m1 0h2m-31 1h2m2 0h1m1 0h1m5 0h1m1 0h2m1 0h2m2 0h3m1 0h4m2 0h1m-31 1h1m2 0h1m2 0h11m3 0h1m2 0h3m1 0h2m-28 1h2m1 0h3m3 0h1m1 0h1m3 0h1m1 0h1m1 0h3m2 0h1m1 0h2m1 0h1m-31 1h2m1 0h1m4 0h2m1 0h1m1 0h3m1 0h1m3 0h2m5 0h4m-33 1h4m1 0h2m2 0h1m3 0h1m1 0h1m1 0h1m2 0h2m1 0h3m1 0h1m1 0h1m1 0h1m-29 1h1m3 0h1m2 0h1m1 0h3m2 0h3m1 0h3m3 0h1m-28 1h3m1 0h1m1 0h2m1 0h1m3 0h3m2 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-32 1h3m1 0h2m4 0h2m1 0h2m1 0h1m2 0h2m2 0h1m1 0h3m2 0h2m-30 1h6m2 0h2m4 0h3m3 0h2m3 0h1m2 0h2m-30 1h1m4 0h1m1 0h4m1 0h1m2 0h3m1 0h6m1 0h1m3 0h1m-33 1h4m2 0h1m1 0h3m1 0h4m1 0h6m1 0h6m1 0h2m-25 1h5m1 0h5m3 0h1m1 0h1m3 0h1m1 0h3m-33 1h7m1 0h2m4 0h2m2 0h1m1 0h2m2 0h1m1 0h1m1 0h2m1 0h1m-32 1h1m5 0h1m3 0h4m2 0h1m4 0h1m2 0h1m3 0h1m2 0h2m-33 1h1m1 0h3m1 0h1m1 0h1m2 0h1m4 0h1m4 0h1m2 0h6m-30 1h1m1 0h3m1 0h1m2 0h1m1 0h3m3 0h2m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m-31 1h1m1 0h3m1 0h1m2 0h1m2 0h4m2 0h1m2 0h1m1 0h2m1 0h4m-30 1h1m5 0h1m2 0h1m2 0h2m1 0h3m3 0h2m1 0h1m4 0h1m-30 1h7m1 0h3m1 0h1m4 0h1m1 0h4m1 0h1m4 0h1m2 0h1\"/></svg>",
    calendar: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m1 0h5m4 0h7m1 0h1m2 0h1m1 0h7m-37 1h1m5 0h1m1 0h1m1 0h3m5 0h1m1 0h4m2 0h1m1 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m2 0h3m1 0h1m1 0h1m2 0h3m2 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m5 0h2m4 0h1m1 0h3m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m1 0h1m2 0h4m1 0h2m3 0h5m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m3 0h3m1 0h3m2 0h4m3 0h1m1 0h1m1 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h2m1 0h2m1 0h2m1 0h3m2 0h1m1 0h1m2 0h2m-29 1h1m1 0h2m1 0h3m8 0h3m2 0h1m1 0h2m2 0h2m1 0h1m2 0h1m1 0h2m-37 1h1m2 0h2m4 0h2m3 0h2m1 0h1m1 0h2m2 0h1m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m-32 1h4m2 0h1m1 0h3m3 0h1m1 0h1m2 0h2m6 0h1m2 0h1m-35 1h5m7 0h3m1 0h1m3 0h1m3 0h5m3 0h3m-35 1h1m1 0h1m3 0h1m1 0h3m2 0h3m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h2m1 0h5m-37 1h2m2 0h1m2 0h2m1 0h2m3 0h3m1 0h1m2 0h1m3 0h3m1 0h4m1 0h2m-37 1h2m4 0h1m2 0h1m2 0h3m2 0h1m1 0h2m3 0h2m2 0h3m1 0h1m1 0h2m-34 1h4m1 0h1m1 0h2m1 0h1m1 0h2m2 0h1m2 0h4m3 0h1m1 0h3m2 0h2m-35 1h1m2 0h4m2 0h3m1 0h1m3 0h3m2 0h4m5 0h2m1 0h1m-36 1h3m4 0h5m1 0h1m1 0h1m3 0h1m1 0h3m1 0h2m2 0h1m4 0h2m-36 1h1m2 0h1m1 0h1m3 0h1m4 0h1m4 0h3m3 0h3m1 0h3m2 0h2m-37 1h1m2 0h3m1 0h1m1 0h1m1 0h1m1 0h1m2 0h3m5 0h1m2 0h4m1 0h2m1 0h1m-36 1h1m1 0h6m7 0h5m1 0h1m1 0h1m2 0h4m1 0h2m3 0h1m-35 1h2m1 0h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h2m1 0h2m2 0h1m2 0h1m1 0h2m3 0h1m-34 1h10m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m1 0h2m1 0h1m3 0h1m-35 1h2m4 0h2m1 0h1m1 0h1m1 0h1m5 0h1m2 0h1m1 0h1m3 0h1m2 0h3m-35 1h3m3 0h1m1 0h1m1 0h1m4 0h1m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h4m1 0h3m-36 1h1m1 0h1m1 0h1m4 0h1m2 0h5m1 0h1m1 0h1m2 0h1m2 0h1m1 0h8m-36 1h3m2 0h1m1 0h7m2 0h3m2 0h1m1 0h1m8 0h1m1 0h1m-36 1h1m2 0h2m2 0h1m5 0h4m3 0h2m1 0h2m1 0h1m1 0h2m1 0h3m1 0h1m-31 1h2m4 0h2m2 0h2m2 0h5m1 0h1m1 0h9m-28 1h1m2 0h3m1 0h1m1 0h1m5 0h4m1 0h1m3 0h1m1 0h1m1 0h1m-37 1h7m1 0h3m3 0h2m2 0h1m7 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h3m4 0h1m1 0h1m1 0h2m1 0h2m2 0h3m3 0h1m2 0h1m-36 1h1m1 0h3m1 0h1m2 0h2m1 0h1m1 0h1m1 0h4m1 0h1m6 0h6m1 0h2m-37 1h1m1 0h3m1 0h1m1 0h5m3 0h2m1 0h3m1 0h1m3 0h4m1 0h1m2 0h2m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h3m3 0h2m3 0h3m5 0h1m1 0h1m-33 1h1m5 0h1m2 0h3m1 0h1m4 0h2m4 0h2m3 0h4m1 0h1m-35 1h7m1 0h1m1 0h3m2 0h1m1 0h1m4 0h5m5 0h5\"/></svg>",
    study: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h3m7 0h7m-37 1h1m5 0h1m1 0h10m1 0h4m2 0h2m3 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h2m3 0h1m1 0h1m2 0h4m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h2m1 0h2m2 0h2m1 0h3m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h4m4 0h3m5 0h1m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m3 0h1m4 0h1m4 0h2m1 0h2m1 0h1m1 0h1m1 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-27 1h2m1 0h1m2 0h1m1 0h1m3 0h2m1 0h1m1 0h2m-29 1h1m2 0h6m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m2 0h2m1 0h1m2 0h1m2 0h1m1 0h3m-36 1h1m3 0h1m1 0h3m6 0h4m1 0h3m2 0h2m3 0h2m1 0h2m-36 1h1m3 0h3m1 0h1m2 0h1m2 0h3m4 0h1m1 0h1m3 0h2m1 0h2m1 0h2m1 0h1m-29 1h1m1 0h1m5 0h3m1 0h1m3 0h1m1 0h11m-37 1h1m2 0h2m1 0h2m1 0h1m2 0h5m2 0h2m2 0h2m1 0h3m1 0h2m1 0h1m2 0h1m-37 1h1m3 0h2m1 0h1m1 0h1m1 0h1m2 0h5m2 0h9m2 0h2m-31 1h2m1 0h3m1 0h3m1 0h2m2 0h3m4 0h5m2 0h5m-35 1h1m2 0h1m2 0h2m6 0h1m1 0h1m1 0h1m1 0h3m1 0h2m2 0h2m1 0h4m-36 1h1m1 0h1m2 0h2m3 0h4m4 0h1m5 0h1m2 0h1m1 0h1m3 0h1m-35 1h1m1 0h4m3 0h6m2 0h1m1 0h2m1 0h1m2 0h3m1 0h1m1 0h1m-32 1h3m2 0h3m1 0h1m1 0h1m4 0h2m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m3 0h1m1 0h1m-33 1h2m3 0h2m1 0h1m1 0h3m6 0h3m1 0h2m2 0h3m2 0h1m-37 1h1m4 0h3m3 0h1m1 0h1m2 0h2m6 0h1m1 0h1m1 0h6m-34 1h1m2 0h2m3 0h1m5 0h2m3 0h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-34 1h1m2 0h5m1 0h2m1 0h1m1 0h3m2 0h4m2 0h6m1 0h1m1 0h2m-36 1h2m11 0h1m2 0h4m3 0h1m1 0h1m3 0h7m-36 1h2m1 0h1m1 0h1m2 0h2m2 0h1m1 0h2m3 0h1m2 0h1m2 0h3m1 0h1m5 0h1m-37 1h1m8 0h2m2 0h2m3 0h1m2 0h3m1 0h3m4 0h3m-35 1h5m1 0h1m2 0h1m2 0h6m1 0h4m4 0h1m2 0h1m4 0h2m-37 1h1m1 0h1m1 0h1m3 0h2m1 0h1m4 0h1m2 0h1m2 0h1m4 0h1m1 0h1m1 0h1m2 0h3m-37 1h1m2 0h2m1 0h4m2 0h5m1 0h1m1 0h1m1 0h4m2 0h5m1 0h3m-29 1h3m2 0h1m1 0h1m2 0h2m5 0h2m1 0h1m3 0h1m1 0h2m-36 1h7m1 0h1m6 0h3m1 0h2m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m3 0h1m-37 1h1m5 0h1m1 0h1m2 0h1m2 0h2m4 0h1m1 0h1m1 0h2m1 0h2m3 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m3 0h4m1 0h1m4 0h1m1 0h7m2 0h1m-36 1h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h1m1 0h4m2 0h2m5 0h2m2 0h4m-37 1h1m1 0h3m1 0h1m2 0h3m3 0h1m1 0h1m3 0h3m3 0h1m4 0h2m2 0h1m-37 1h1m5 0h1m4 0h2m1 0h1m2 0h1m6 0h1m7 0h1m1 0h3m-37 1h7m1 0h2m2 0h1m3 0h1m3 0h1m2 0h2m3 0h2m1 0h1m1 0h1m2 0h1\"/></svg>",
    home: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m4 0h1m5 0h2m1 0h2m1 0h1m1 0h1m2 0h1m1 0h7m-37 1h1m5 0h1m2 0h1m2 0h1m4 0h1m1 0h1m2 0h1m4 0h2m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m5 0h1m2 0h4m3 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h2m2 0h1m1 0h1m2 0h6m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h1m5 0h2m3 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h3m1 0h1m2 0h2m1 0h1m1 0h3m1 0h1m1 0h2m2 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h2m4 0h2m3 0h3m1 0h1m4 0h1m-29 1h1m1 0h5m2 0h1m2 0h1m5 0h4m1 0h4m3 0h5m-33 1h1m1 0h1m2 0h3m1 0h2m1 0h4m5 0h1m4 0h1m2 0h1m1 0h1m1 0h1m-35 1h2m1 0h4m2 0h5m2 0h1m2 0h2m2 0h1m1 0h11m-37 1h2m1 0h3m7 0h1m2 0h1m1 0h1m2 0h2m3 0h1m1 0h1m1 0h3m3 0h1m-35 1h1m3 0h1m10 0h1m4 0h1m1 0h2m1 0h1m1 0h2m1 0h5m-37 1h1m1 0h4m1 0h3m1 0h1m1 0h1m2 0h9m3 0h2m1 0h1m-32 1h9m1 0h8m2 0h2m3 0h1m1 0h1m1 0h1m1 0h3m1 0h2m-35 1h4m2 0h5m1 0h2m1 0h2m2 0h1m1 0h2m1 0h1m1 0h1m1 0h3m2 0h2m-37 1h2m1 0h4m1 0h2m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m1 0h3m1 0h1m1 0h2m-35 1h1m2 0h1m3 0h1m1 0h1m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1m2 0h1m2 0h1m1 0h3m-36 1h1m1 0h2m2 0h1m2 0h1m1 0h1m2 0h3m2 0h1m1 0h2m1 0h1m1 0h3m1 0h3m2 0h2m-34 1h3m2 0h1m1 0h3m1 0h2m3 0h3m2 0h1m1 0h1m1 0h1m7 0h1m-35 1h1m2 0h2m4 0h1m3 0h1m1 0h1m1 0h1m2 0h5m2 0h2m1 0h3m-34 1h1m2 0h1m2 0h2m3 0h2m2 0h1m2 0h2m2 0h1m1 0h2m1 0h2m3 0h1m-34 1h3m2 0h2m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m3 0h1m2 0h4m1 0h4m2 0h1m-37 1h2m1 0h3m1 0h1m1 0h1m1 0h2m1 0h3m2 0h2m2 0h2m1 0h7m3 0h1m-35 1h2m1 0h2m1 0h4m1 0h3m2 0h5m1 0h4m1 0h4m1 0h3m-37 1h1m2 0h3m1 0h1m1 0h1m1 0h2m1 0h3m6 0h1m7 0h1m2 0h1m-35 1h1m2 0h2m1 0h2m1 0h1m1 0h4m2 0h1m2 0h2m2 0h2m1 0h2m1 0h2m2 0h3m-37 1h1m2 0h3m1 0h2m1 0h5m1 0h1m4 0h1m1 0h1m2 0h1m1 0h2m1 0h3m2 0h1m-37 1h1m2 0h1m2 0h3m1 0h1m1 0h3m1 0h3m3 0h5m1 0h5m1 0h3m-29 1h1m1 0h1m5 0h4m1 0h3m1 0h4m3 0h2m-34 1h7m3 0h1m4 0h1m1 0h1m3 0h1m4 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h1m2 0h2m4 0h3m1 0h2m1 0h1m1 0h1m1 0h1m3 0h2m2 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h4m4 0h1m2 0h9m1 0h2m-36 1h1m1 0h3m1 0h1m1 0h4m3 0h1m1 0h2m1 0h5m2 0h4m1 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h5m2 0h1m1 0h2m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m2 0h2m1 0h1m2 0h1m3 0h4m4 0h3m2 0h2m2 0h1m-37 1h7m1 0h4m2 0h2m1 0h1m1 0h1m2 0h1m1 0h3m5 0h5\"/></svg>",
    exams: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m2 0h3m2 0h1m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1m3 0h7m-37 1h1m5 0h1m1 0h2m1 0h3m3 0h1m3 0h2m5 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m2 0h3m4 0h4m3 0h2m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h1m1 0h2m1 0h3m1 0h3m1 0h2m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h2m1 0h2m2 0h4m3 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m3 0h4m1 0h1m2 0h1m1 0h1m1 0h1m1 0h3m3 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h4m1 0h4m1 0h3m1 0h2m2 0h3m-29 1h1m5 0h1m1 0h3m6 0h1m1 0h1m2 0h4m3 0h2m2 0h3m-35 1h2m2 0h1m1 0h1m2 0h1m1 0h2m3 0h1m1 0h5m3 0h1m3 0h2m1 0h2m-36 1h2m2 0h1m1 0h7m4 0h1m2 0h2m4 0h2m1 0h8m-34 1h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h3m1 0h2m2 0h1m1 0h1m1 0h2m2 0h4m2 0h1m-34 1h1m1 0h4m1 0h1m2 0h1m2 0h1m2 0h2m2 0h2m1 0h3m1 0h2m1 0h1m2 0h1m-37 1h2m1 0h1m1 0h1m1 0h1m3 0h1m1 0h4m1 0h7m2 0h3m1 0h1m1 0h1m-34 1h3m1 0h4m1 0h1m1 0h6m3 0h3m4 0h1m1 0h1m1 0h3m1 0h2m-37 1h6m2 0h2m1 0h1m4 0h1m1 0h1m1 0h1m2 0h2m1 0h2m2 0h2m1 0h4m-37 1h1m2 0h5m3 0h2m1 0h1m1 0h2m1 0h2m1 0h4m3 0h2m1 0h1m1 0h2m-36 1h6m1 0h2m9 0h3m2 0h1m1 0h4m2 0h1m2 0h2m-35 1h3m2 0h2m1 0h1m3 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h1m-37 1h1m2 0h3m2 0h2m1 0h1m1 0h2m5 0h1m3 0h1m1 0h3m4 0h1m2 0h1m-37 1h2m4 0h4m2 0h4m1 0h1m4 0h5m2 0h2m1 0h3m-35 1h3m1 0h2m2 0h5m2 0h1m1 0h1m1 0h1m1 0h3m3 0h1m1 0h1m2 0h1m1 0h1m-34 1h2m1 0h1m1 0h2m1 0h1m2 0h2m1 0h2m5 0h1m4 0h2m1 0h4m2 0h1m-37 1h4m1 0h1m1 0h2m1 0h4m2 0h1m2 0h2m1 0h3m3 0h6m2 0h1m-35 1h5m2 0h1m1 0h2m1 0h3m3 0h1m2 0h1m2 0h3m1 0h1m5 0h1m-37 1h4m4 0h1m7 0h1m1 0h4m1 0h1m2 0h2m3 0h1m1 0h2m-35 1h1m1 0h1m3 0h3m2 0h1m5 0h1m3 0h1m3 0h1m1 0h2m1 0h2m2 0h3m-37 1h1m1 0h4m1 0h1m1 0h3m3 0h1m6 0h1m4 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-37 1h1m5 0h3m1 0h3m1 0h1m1 0h4m2 0h1m1 0h3m1 0h5m1 0h1m1 0h1m-29 1h1m4 0h7m2 0h2m2 0h1m1 0h1m3 0h1m-33 1h7m2 0h1m1 0h1m2 0h4m1 0h3m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m3 0h1m-37 1h1m5 0h1m2 0h2m2 0h1m1 0h1m2 0h2m4 0h1m2 0h2m3 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m2 0h3m3 0h1m2 0h1m3 0h1m1 0h2m1 0h6m1 0h2m-36 1h1m1 0h3m1 0h1m2 0h4m3 0h4m3 0h1m2 0h1m2 0h2m2 0h4m-37 1h1m1 0h3m1 0h1m3 0h3m1 0h2m4 0h3m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m4 0h1m1 0h1m6 0h1m1 0h1m5 0h2m2 0h1m3 0h1m-37 1h7m1 0h1m4 0h1m1 0h2m2 0h2m3 0h1m3 0h2m1 0h1m1 0h1m2 0h1\"/></svg>",
    canvas: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m2 0h1m3 0h3m1 0h2m1 0h2m1 0h3m2 0h1m1 0h7m-37 1h1m5 0h1m4 0h2m1 0h4m1 0h1m2 0h1m4 0h2m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h1m3 0h5m2 0h2m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h1m4 0h2m1 0h1m2 0h1m1 0h3m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h4m2 0h2m3 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h1m3 0h1m2 0h2m1 0h1m1 0h1m1 0h1m1 0h4m2 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h3m1 0h1m6 0h3m1 0h1m2 0h1m1 0h1m-29 1h1m1 0h5m2 0h1m1 0h3m4 0h3m1 0h2m1 0h1m4 0h5m-31 1h1m4 0h1m2 0h6m5 0h1m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m-36 1h2m2 0h1m1 0h1m3 0h1m1 0h1m1 0h1m2 0h1m2 0h2m4 0h2m1 0h8m-35 1h1m2 0h1m2 0h3m2 0h2m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1m3 0h3m3 0h1m-37 1h2m1 0h1m2 0h1m3 0h1m1 0h2m3 0h1m4 0h1m1 0h2m1 0h1m1 0h2m1 0h5m-37 1h4m1 0h1m1 0h1m4 0h2m2 0h5m1 0h3m3 0h2m1 0h1m-32 1h5m1 0h5m3 0h4m2 0h2m5 0h1m1 0h1m1 0h3m1 0h2m-36 1h1m2 0h1m3 0h4m2 0h2m1 0h2m2 0h1m1 0h2m3 0h1m1 0h3m2 0h2m-37 1h3m1 0h1m1 0h2m2 0h1m3 0h1m1 0h1m2 0h1m2 0h4m3 0h2m1 0h1m1 0h2m-34 1h1m1 0h2m1 0h1m1 0h2m2 0h3m2 0h1m1 0h4m1 0h2m1 0h1m2 0h1m1 0h3m-34 1h2m1 0h3m4 0h5m2 0h1m1 0h2m1 0h1m1 0h3m1 0h3m2 0h2m-36 1h1m1 0h1m1 0h1m3 0h2m4 0h1m3 0h3m1 0h2m1 0h1m1 0h1m7 0h1m-35 1h2m2 0h1m2 0h1m1 0h5m1 0h1m1 0h1m2 0h1m1 0h3m2 0h2m1 0h3m-33 1h4m3 0h1m3 0h2m1 0h1m2 0h3m1 0h1m2 0h1m1 0h2m3 0h1m-30 1h1m1 0h1m2 0h1m1 0h2m2 0h2m1 0h1m2 0h2m4 0h2m1 0h4m2 0h1m-37 1h1m2 0h3m4 0h4m1 0h2m2 0h3m1 0h2m2 0h6m3 0h1m-37 1h1m1 0h1m1 0h5m1 0h1m4 0h1m2 0h2m2 0h1m2 0h1m1 0h1m1 0h4m1 0h3m-37 1h4m3 0h6m1 0h3m6 0h1m2 0h1m4 0h1m2 0h1m-35 1h1m1 0h1m2 0h2m1 0h2m2 0h3m2 0h1m3 0h1m2 0h2m1 0h2m1 0h2m2 0h3m-37 1h1m2 0h3m2 0h2m1 0h1m1 0h2m1 0h1m4 0h1m4 0h1m1 0h2m1 0h3m2 0h1m-37 1h1m1 0h2m1 0h2m4 0h1m2 0h1m1 0h3m3 0h1m1 0h3m1 0h5m1 0h1m-27 1h1m1 0h2m1 0h2m1 0h4m2 0h2m2 0h3m3 0h2m-34 1h7m2 0h3m3 0h1m1 0h1m3 0h2m3 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h1m1 0h1m1 0h3m2 0h3m1 0h2m1 0h1m3 0h1m3 0h2m2 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m2 0h1m2 0h2m5 0h1m1 0h2m1 0h6m1 0h2m-36 1h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h1m1 0h2m2 0h1m1 0h1m3 0h4m1 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h3m4 0h2m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m2 0h2m1 0h1m1 0h2m4 0h3m4 0h3m2 0h2m2 0h1m-37 1h7m1 0h1m2 0h1m3 0h1m1 0h1m1 0h1m2 0h5m5 0h5\"/></svg>",
    weak: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 43 43\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m2 0h2m2 0h5m1 0h2m2 0h1m4 0h1m1 0h2m2 0h7m-41 1h1m5 0h1m3 0h2m2 0h1m2 0h1m2 0h3m2 0h1m1 0h4m3 0h1m5 0h1m-41 1h1m1 0h3m1 0h1m1 0h2m1 0h3m1 0h1m1 0h2m1 0h3m9 0h1m1 0h1m1 0h3m1 0h1m-41 1h1m1 0h3m1 0h1m1 0h2m1 0h3m1 0h1m3 0h1m2 0h1m1 0h4m1 0h1m4 0h1m1 0h3m1 0h1m-41 1h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h2m1 0h5m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1m1 0h3m1 0h1m-41 1h1m5 0h1m1 0h2m1 0h3m2 0h2m2 0h1m3 0h5m5 0h1m5 0h1m-41 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-33 1h1m7 0h1m1 0h2m1 0h4m2 0h2m1 0h3m-33 1h1m1 0h5m5 0h3m2 0h1m4 0h1m2 0h3m1 0h1m1 0h1m2 0h5m-39 1h2m5 0h2m3 0h3m2 0h3m2 0h2m1 0h1m2 0h1m2 0h6m1 0h3m-41 1h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m5 0h1m2 0h2m5 0h2m3 0h2m1 0h2m-36 1h2m4 0h2m2 0h2m2 0h2m2 0h1m1 0h2m3 0h3m2 0h2m1 0h1m2 0h1m2 0h1m-41 1h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h2m1 0h1m1 0h2m1 0h8m1 0h3m3 0h4m-40 1h1m1 0h3m2 0h1m1 0h2m2 0h1m3 0h1m2 0h1m1 0h1m4 0h2m1 0h6m1 0h3m-41 1h2m2 0h5m1 0h2m1 0h5m2 0h1m3 0h1m1 0h3m3 0h2m-34 1h1m3 0h2m1 0h1m2 0h1m1 0h1m1 0h2m5 0h2m3 0h2m6 0h2m1 0h1m1 0h2m-40 1h3m2 0h1m1 0h4m3 0h1m1 0h1m4 0h1m1 0h4m1 0h1m2 0h2m1 0h1m1 0h2m1 0h1m-41 1h4m1 0h1m1 0h1m2 0h1m1 0h1m2 0h1m2 0h2m3 0h1m4 0h2m1 0h1m2 0h7m-39 1h1m2 0h3m1 0h4m1 0h2m2 0h1m2 0h2m1 0h1m1 0h3m1 0h1m2 0h2m1 0h3m-37 1h1m1 0h1m3 0h1m2 0h4m5 0h2m1 0h2m2 0h1m2 0h1m5 0h1m2 0h1m-39 1h1m2 0h3m2 0h3m4 0h1m1 0h4m2 0h2m1 0h3m5 0h1m2 0h1m-39 1h1m1 0h1m1 0h2m3 0h1m1 0h1m1 0h2m1 0h1m2 0h3m1 0h1m1 0h1m2 0h1m1 0h11m-40 1h1m1 0h1m1 0h2m1 0h2m1 0h7m2 0h3m2 0h3m1 0h2m1 0h1m1 0h2m2 0h1m-37 1h2m1 0h1m1 0h4m2 0h3m4 0h2m8 0h3m1 0h1m1 0h2m1 0h1m-38 1h1m1 0h3m2 0h5m2 0h2m1 0h1m2 0h6m1 0h1m1 0h1m1 0h1m4 0h1m-39 1h4m1 0h1m1 0h1m1 0h2m2 0h1m2 0h5m2 0h3m2 0h1m2 0h1m2 0h4m1 0h2m-41 1h1m1 0h2m1 0h3m1 0h3m3 0h2m3 0h1m1 0h1m3 0h2m1 0h1m2 0h1m1 0h1m-33 1h2m3 0h3m1 0h1m2 0h3m1 0h2m1 0h2m8 0h2m3 0h2m-37 1h3m2 0h1m1 0h1m1 0h2m1 0h1m2 0h2m7 0h3m1 0h3m5 0h3m-40 1h1m1 0h1m1 0h1m2 0h3m1 0h3m4 0h1m1 0h4m4 0h1m1 0h5m1 0h2m1 0h2m-41 1h1m4 0h4m5 0h1m1 0h1m2 0h1m1 0h1m2 0h1m1 0h5m2 0h2m2 0h1m-38 1h1m1 0h1m5 0h1m1 0h3m3 0h1m2 0h4m1 0h1m3 0h1m3 0h3m1 0h2m-38 1h1m2 0h5m1 0h1m1 0h5m1 0h1m1 0h1m2 0h2m1 0h1m3 0h1m2 0h5m1 0h2m-32 1h1m2 0h2m1 0h8m1 0h1m1 0h1m2 0h1m2 0h2m3 0h3m1 0h1m-41 1h7m3 0h5m1 0h2m3 0h1m3 0h3m1 0h4m1 0h1m1 0h3m-39 1h1m5 0h1m1 0h2m1 0h1m3 0h1m1 0h2m1 0h2m5 0h1m2 0h1m1 0h1m3 0h2m-38 1h1m1 0h3m1 0h1m1 0h4m7 0h1m1 0h1m1 0h5m1 0h1m2 0h5m1 0h3m-41 1h1m1 0h3m1 0h1m1 0h2m2 0h1m4 0h3m1 0h1m1 0h3m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m-41 1h1m1 0h3m1 0h1m1 0h5m3 0h1m4 0h1m2 0h1m2 0h4m2 0h5m-38 1h1m5 0h1m2 0h3m3 0h2m3 0h3m3 0h3m3 0h1m1 0h1m1 0h2m1 0h1m-40 1h7m1 0h3m1 0h2m1 0h1m1 0h1m4 0h1m1 0h3m1 0h2m4 0h5\"/></svg>",
    today: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0b1530\" d=\"M1 1.5h7m3 0h3m4 0h7m1 0h1m2 0h1m1 0h7m-37 1h1m5 0h1m3 0h2m1 0h1m1 0h3m4 0h1m4 0h2m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h2m3 0h3m3 0h2m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1m2 0h1m4 0h5m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h1m3 0h4m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h1m1 0h1m1 0h1m1 0h1m5 0h1m3 0h4m2 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h1m1 0h2m2 0h1m4 0h3m1 0h1m2 0h1m1 0h1m-29 1h1m1 0h5m3 0h2m1 0h1m1 0h1m1 0h1m1 0h2m1 0h4m4 0h5m-35 1h2m2 0h2m1 0h1m1 0h2m1 0h2m1 0h6m2 0h2m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m-36 1h3m3 0h1m3 0h1m6 0h1m3 0h1m4 0h2m1 0h8m-36 1h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m3 0h1m1 0h1m2 0h2m1 0h1m1 0h1m3 0h3m3 0h1m-37 1h2m1 0h1m1 0h2m2 0h1m3 0h1m3 0h1m1 0h1m2 0h4m1 0h1m1 0h2m1 0h5m-37 1h1m4 0h1m3 0h1m2 0h3m1 0h9m3 0h2m1 0h1m-32 1h2m2 0h6m3 0h4m3 0h3m4 0h1m1 0h1m1 0h3m1 0h2m-37 1h4m1 0h1m4 0h1m1 0h4m2 0h1m2 0h4m3 0h1m1 0h3m2 0h2m-34 1h2m1 0h2m2 0h4m2 0h1m1 0h2m2 0h2m1 0h1m3 0h2m1 0h1m1 0h2m-36 1h4m1 0h1m3 0h1m2 0h1m2 0h1m2 0h6m1 0h2m1 0h1m2 0h1m1 0h3m-33 1h6m1 0h2m1 0h4m4 0h2m3 0h3m1 0h3m2 0h2m-35 1h4m1 0h3m1 0h2m1 0h2m3 0h3m2 0h1m1 0h1m1 0h1m7 0h1m-37 1h2m4 0h5m1 0h2m1 0h1m1 0h1m1 0h1m2 0h1m1 0h3m2 0h2m1 0h3m-33 1h4m1 0h1m2 0h1m2 0h1m2 0h1m2 0h3m1 0h1m2 0h1m1 0h2m3 0h1m-33 1h2m2 0h6m1 0h1m2 0h2m1 0h1m3 0h1m4 0h2m1 0h4m2 0h1m-34 1h2m3 0h2m1 0h1m1 0h1m1 0h2m1 0h4m1 0h2m2 0h6m3 0h1m-36 1h1m1 0h2m1 0h3m2 0h2m2 0h1m2 0h2m2 0h1m1 0h2m1 0h1m1 0h4m1 0h3m-37 1h2m3 0h1m1 0h1m1 0h2m2 0h4m1 0h2m3 0h1m2 0h1m4 0h1m2 0h1m-35 1h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h2m2 0h1m2 0h2m2 0h2m1 0h2m1 0h2m2 0h3m-37 1h1m1 0h1m1 0h1m2 0h2m3 0h1m1 0h1m1 0h1m2 0h3m4 0h1m1 0h2m1 0h3m-34 1h1m1 0h12m2 0h3m3 0h1m1 0h3m1 0h5m1 0h2m-28 1h3m2 0h1m2 0h4m2 0h2m2 0h3m3 0h2m-34 1h7m5 0h2m1 0h1m1 0h1m3 0h1m4 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h1m4 0h1m3 0h3m1 0h2m1 0h1m3 0h1m3 0h2m2 0h1m-37 1h1m1 0h3m1 0h1m1 0h4m3 0h2m3 0h1m1 0h1m1 0h2m1 0h6m1 0h2m-36 1h1m1 0h3m1 0h1m1 0h1m3 0h4m1 0h5m1 0h1m3 0h4m1 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h2m3 0h3m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m3 0h1m1 0h2m1 0h1m4 0h3m4 0h3m2 0h2m2 0h1m-37 1h7m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m4 0h5m5 0h5\"/></svg>",
  };

  var I = {
    brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 4 1V4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3 3 0 0 1-4 1"/>',
    cards:'<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M7 9h6M7 13h4"/><path d="M21 8v9a2 2 0 0 1-2 2"/>',
    loop:'<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    people:'<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3.2"/><path d="M22 20v-2a4 4 0 0 0-3-3.8"/>',
    home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    pencil:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M6.5 15h11"/>',
    play:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3z"/>'
  };
  function icon(k) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[k] || '') + '</svg>';
  }

  /* One definition per tool. tone drives the icon gradient. */
  function tools() {
    var sec = section(), S = sec ? SECTIONS[sec] : null;
    var q = sec ? ('?sec=' + sec) : '';
    var t = [];

    /* First tile in the dock, on purpose. It is the only one that answers
       "what do I do right now" without the student choosing anything, and
       it was previously reachable from nowhere at all. */
    /* The tour sheet. It is a page of QR codes, one per short video, so a
       student can watch on a phone while they work on the laptop. First in
       This week because that group is the one open by default. */
    t.push({ g: 'This week', name: 'How to videos', sub: 'Short tours of the course. Scan a code, watch on your phone',
             url: BASE + 'bio005-tour-poster.html', icon: 'doc', tone: 'gold', qr: 'howto', soon: true,
             kw: 'how to video videos tour tours walkthrough guide scan qr getting started orientation help' });
    t.push({ g: 'This week', name: 'Today', sub: 'The one thing to do now, and your other class days',
             url: BASE + 'os/mastery-physio-os.html' + q, icon: 'play', tone: 'gold', qr: 'today', key: 'today',
             kw: 'today now next what do i do day daily plan tonight prework ahead' });
    /* The Week N tile is gone. Today already opens on the right day and
       carries Earlier week and Later week, and the course calendar tile
       below covers browsing the whole term. Three doors onto the same
       week was two too many. */
    t.push({ g: 'This week', name: 'Study With Me', sub: 'Join a session this week or start one yourself',
             url: BASE + 'study-session-signup.html' + q, icon: 'people', tone: 'terra', qr: 'study', kw: 'study with me sessions group hours host', soon: true });
    t.push({ g: 'This week', name: 'Course calendar', sub: 'Every class day and what to prepare for it',
             url: BASE + 'course-schedule.html' + q, icon: 'cal', tone: 'navy', qr: 'calendar',
             /* 'start here' and 'how this course works' land here on
                purpose. Both had their own tiles and came out, and the
                Start here walkthrough is a dialog on this page now, so
                a student searching the old names arrives at the thing
                itself rather than at an empty result. */
             kw: 'calendar schedule dates start here checklist orientation walkthrough '
               + 'how this course works pedagogy tbl why week one' });

    /* ---------- COURSE MATERIALS ----------

       This group did not exist. Nine unrelated things sat under
       "Study tools": the notes a student reads and the engine that
       decides what to test them on, side by side, with nothing to
       tell them apart. Material you study is not the same kind of
       thing as machinery that studies you, and one heading over
       both makes the list something to scan rather than use.

       Still ONE dock. Two headings inside it, not two buttons. A
       second floating button is another entryway to the same files
       ordered a third way, and too many entryways is the problem
       this course already had. */
    /* ONE DOOR TO THE MATERIALS.

       Third pass on this, and the page changed under it, which is
       what settles it. Notes, Pre-work sheets and Concept videos
       were separate tiles because the materials page did not show
       its own categories. The redesigned page does: Everything,
       Pre-work sheets, Notes, Concept videos, Workbooks, Slide
       decks and Practice exams are tabs across the top, visible the
       moment it opens, with the modules underneath.

       So the tiles were duplicating a control that is now the first
       thing a student sees. One tile, and the page does the sorting
       it was built to do. Their keywords stay here, so typing
       prework or videos still lands in the right place. */
    t.push({ g: 'Course materials', name: 'Course materials', sub: 'Notes, pre-work, videos, workbooks and decks, by module',
             url: BASE + 'course-materials.html', icon: 'doc', tone: 'navy', qr: 'materials', soon: true,
             kw: 'materials notes reading module chapter prework pre-work worksheet sheet night '
               + 'before homework guided videos concept watch lecture walkthrough workbooks slides '
               + 'decks practice exams index everything all' });
    t.push({ g: 'Lab materials', name: 'Lab sprints', sub: 'Every structure you are responsible for on the models',
             url: BASE + 'lab-sprints.html', icon: 'flask', tone: 'navy', soon: true,
             qr: 'labs', kw: 'lab sprints models dissection structures practical stations bench' });
    t.push({ g: 'Lab materials', name: 'Digital Atlas', sub: 'Turn the structures around and look at them',
             url: 'https://share.articulate.com/UOHEe3p6DmTC4nXuUTE02', icon: 'globe', tone: 'gold',
             qr: 'atlas', ext: true, kw: 'atlas 3d explore rotate structures lab' });
    t.push({ g: 'Course materials', name: 'Exam modules', sub: 'Exactly what each exam covers',
             url: BASE + 'competency-map.html' + q, icon: 'flask', tone: 'navy', qr: 'exams', kw: 'exam modules covers scope' });
    /* OPENSTAX, AS A REFERENCE, NOT AS A TEXT.

       There is no book to buy in this course and the required
       materials page says so plainly. This tile has to not undo
       that, which is why it is named for what it is and the
       subtitle says 'not required' before a student has to wonder.

       The live edition is Anatomy and Physiology 2e, and the second
       half of that title is the catch: BIO 005 is anatomy only. A
       student who reads it cover to cover will study a lot of
       physiology that is not on any exam here. It earns its place
       as a second explanation and a second set of figures when the
       notes have not landed, and that is the job the subtitle
       gives it. */
    t.push({ g: 'Course materials', name: 'OpenStax reference', sub: 'Free online book, for a second explanation or more figures. Not required',
             url: 'https://openstax.org/details/books/anatomy-and-physiology-2e',
             icon: 'globe', tone: 'terra', ext: true,
             kw: 'openstax textbook book text reference free online chapter reading second '
               + 'explanation figures diagrams anatomy physiology' });
    /* soon:true pulls this out of its group and drops it at the end
       under Coming soon, rendered as plain text rather than a link.
       A tile that goes somewhere unfinished is worse than one that
       says plainly it is not ready. */
    t.push({ g: 'Course materials', name: 'Case deep dives', sub: 'One clinical case per topic, with the PDF',
             url: BASE + 'welcome.html' + q, icon: 'flask', tone: 'terra', soon: true,
             kw: 'deep dive cases clinical index topics' });
    t.push({ g: 'Practice and recall', name: 'Mastery OS', sub: 'Your cards, your weak spots, and a plan around them',
             url: BASE + 'os/mastery-physio-os.html' + q, icon: 'brain', tone: 'gold', qr: 'mastery',
             kw: 'mastery os plan cram competency recall cards flashcards spaced question rx study '
               + 'weakness weak spot board dashboard gaps' });
    t.push({ g: 'Practice and recall', name: 'Recall cards', sub: 'Straight into the cards that are due today',
             url: BASE + 'os/mastery-physio-os.html#s-recall' + '', icon: 'cards', tone: 'green', qr: 'recall',
             kw: 'recall cards flashcards spaced due today question' });
    /* Lives on the MedMasters site, not in this repo, and it was only
       reachable from the Loops upload kit. It is a drill tool, so it
       belongs beside the other drill tools. */
    t.push({ g: 'Practice and recall', name: 'Muscle charts, I O A', sub: 'Origins, insertions, actions and innervation, drilled interactively',
             url: 'https://www.medmasterscollaborative.com/muscle-charts-i-o-a-inn', icon: 'cards', tone: 'terra',
             ext: true, qr: 'muscles',
             kw: 'muscle charts origin insertion action innervation ioa oia drill table muscles' });
    t.push({ g: 'Lab materials', name: 'Loops', sub: 'Thirty-nine image loops for fast visual practice',
             url: 'https://drsrennie-stack.github.io/loops/', icon: 'loop', tone: 'terra', qr: 'loops', ext: true, kw: 'loops images practice lab' });
    /* The histology help tile was removed on Aug 22. It was an anatomy
       leftover, slide tools and microscope work, and this course retires
       histology entirely. It also carried no url, so it rendered as a
       live link to href="undefined" on every page the dock is on, which
       is every page. See the guard in the renderer below. */
    /* The weak spot board was a tile here. It is the front panel of
       Mastery OS, one tile up, and the practice exam links straight
       into it when a paper is marked, which is the moment a student
       actually wants it. Its keywords moved onto Mastery OS. */
    t.push({ g: 'Practice and recall', name: 'Draw it from memory', sub: 'Draw the structure first, then check it against the list',
             url: BASE + 'mastery-canvas.html', icon: 'pencil', tone: 'gold', qr: 'canvas', kw: 'draw drawing canvas memory checklist', soon: true });
    t.push({ g: 'Practice and recall', name: 'What I got done today', sub: 'And what you meant to do and did not',
             url: BASE + 'bio005-day-review.html', icon: 'target', tone: 'terra', qr: 'today', kw: 'today review day summary time missed', soon: true });
    /* THE BANK IS NOT THE STUDENT TOOL.

       This used to point at bio005-braindump-bank-fall2026.html, which is
       the printable list of every prompt with its answer key beside it,
       built to run the class from. Handing a student the answer key and
       calling it practice is the one thing a brain dump cannot survive.
       The practice tool spins for one prompt, times it, and keeps the key
       hidden until they say they are done. */
    /* The three Summer midterm practice exams are still in the repo
       but they are a fixed paper for a term that no longer exists.
       This draws a fresh one per exam from the live question bank. */
    t.push({ g: 'Practice and recall', name: 'Practice exam', sub: 'A fresh 100 point paper in the real format, scored, with the reasoning',
             url: BASE + 'practice-lecture-exam.html', icon: 'doc', tone: 'terra', qr: 'pexam', soon: true,
             kw: 'practice exam lecture test mock paper multiple choice quiz midterm final revision' });
    t.push({ g: 'Practice and recall', name: 'Brain dump practice', sub: 'Spin for a prompt, set your clock, write it on paper, then check yourself',
             url: BASE + 'brain-dump-practice.html', icon: 'pencil', tone: 'navy', qr: 'braindump', soon: true,
             kw: 'brain dump practice prompt wheel spin timer paper retrieval blank page' });
    /* soon:true pulls a tile out of its group and drops it into Coming
       soon at the very bottom, dimmed and not clickable. Set it on
       anything that exists but is not finished, rather than hiding it,
       so students can see what is on the way. */
    t.push({ g: 'Practice and recall', name: 'Repair Round', sub: 'The in-class repair activity, still being built',
             url: BASE + 'repair-round-activity.html', icon: 'target', tone: 'gold', soon: true,
             kw: 'repair round activity capture sheet pairs in class' });

    t.push({ g: 'About the course', name: 'Syllabus', sub: S ? S.label : 'Pick your section first',
             url: BASE + (S ? S.syllabus : 'fall-2026-syllabus.html'), icon: 'doc', tone: 'navy', kw: 'syllabus grading policy', soon: true });

    /* welcome.html IS the course home. Offering a "Course home" tile
       while a student is standing on it is a dead click, so it is left
       out on that page. */
    if (!/\/welcome\.html$|\/$/.test(location.pathname)) {
      t.push({ g: 'About the course', name: 'Course home', sub: S ? S.label : 'Pick your section',
               url: BASE + 'welcome.html' + q, icon: 'home', tone: 'gold', qr: 'home', kw: 'home welcome start' });
    }
    /* First in Course, because the question a student cannot answer is the
       thing most likely to stop them, and the board is faster than my inbox. */
    t.push({ g: 'About the course', name: 'Virtual Office', sub: 'Ask a question where the whole class sees the answer',
             url: BASE + 'virtual-office.html' + q, icon: 'people', tone: 'terra', soon: true,
             kw: 'virtual office question board discussion ask help stuck forum post canvas' });
    /* Start here and How this course works were tiles in this group.
       Both are week-one orientation: read once, never opened again,
       and occupying two of the dock's slots for the other sixteen
       weeks. The pages stay where they are, linked from the calendar
       walkthrough and the syllabus, which is where a student is when
       the question comes up. */
    return t;
  }

  var CSS = [
/* Never print: the launcher, the panel and the scrim are fixed overlays,
   so on any page saved or printed to PDF they land on top of the content. */
'@media print{.bd-launch,.bd-panel,.bd-scrim{display:none !important}}',
/* EMBEDDED, SO position:fixed DOES NOT FLOAT.
   In a Kajabi embed the frame is sized to the whole page, so the frame's
   own viewport IS the whole page. position:fixed then pins the launcher
   to the bottom of all of it, which puts it far below whatever the
   student is actually looking at: it reads as a second page. The parent
   sends the visible band and these two ride it instead. */
'html.bd-inframe .bd-launch{position:absolute;bottom:auto;transition:top 90ms linear}',
'html.bd-inframe .bd-panel{position:absolute;bottom:auto}',
'html.bd-inframe .bd-scrim{position:absolute;inset:auto 0 auto 0}',
'.bd-launch{position:fixed;left:18px;bottom:18px;z-index:2147483000;display:inline-flex;align-items:center;gap:9px;',
'  background:#0B1530;color:#fff;border:0;border-radius:999px;padding:12px 18px 12px 14px;cursor:pointer;',
'  font:800 14px/1 "Plus Jakarta Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:-.01em;',
'  box-shadow:0 14px 34px -12px rgba(11,21,48,.62),0 3px 10px -4px rgba(11,21,48,.4);',
'  transition:transform .18s ease,box-shadow .18s ease}',
'.bd-launch:hover{transform:translateY(-2px);box-shadow:0 20px 44px -14px rgba(11,21,48,.7)}',
'.bd-launch:focus-visible{outline:3px solid #C9A14A;outline-offset:3px}',
'.bd-launch svg{width:19px;height:19px;color:#C9A14A}',
'@media(max-width:520px){.bd-launch .bd-lt{display:none}.bd-launch{padding:14px}}',

'.bd-scrim{position:fixed;inset:0;z-index:2147483001;background:rgba(6,10,24,.62);',
'  opacity:0;pointer-events:none;transition:opacity .2s ease}',
'.bd-scrim.on{opacity:1;pointer-events:auto}',

'.bd-panel{position:fixed;left:14px;bottom:14px;z-index:2147483002;width:min(680px,calc(100vw - 28px));',
'  max-height:min(78vh,720px);display:flex;flex-direction:column;background:#0B1530;border-radius:22px;',
'  box-shadow:0 40px 90px -24px rgba(0,0,0,.7);overflow:hidden;',
'  transform:translateY(14px) scale(.985);opacity:0;pointer-events:none;',
'  transition:transform .22s cubic-bezier(.2,.8,.3,1),opacity .18s ease;',
'  font-family:"Plus Jakarta Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif}',
'.bd-panel.on{transform:none;opacity:1;pointer-events:auto}',

'.bd-top{display:flex;align-items:center;gap:12px;padding:16px 16px 12px}',
'.bd-title{font-weight:800;font-size:15px;color:#fff;letter-spacing:-.01em;white-space:nowrap}',
'.bd-sec{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#F2E2B8}',
'.bd-x{margin-left:auto;background:rgba(255,255,255,.12);border:0;color:#fff;width:34px;height:34px;',
'  border-radius:50%;cursor:pointer;font-size:17px;line-height:1;display:flex;align-items:center;justify-content:center}',
'.bd-x:hover{background:rgba(255,255,255,.22)}',
'.bd-x:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}',

'.bd-search{margin:0 16px 6px;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.10);',
'  border:1px solid rgba(255,255,255,.20);border-radius:12px;padding:10px 13px}',
'.bd-search:focus-within{border-color:#C9A14A;box-shadow:0 0 0 3px rgba(201,161,74,.35)}',
'.bd-search svg{width:16px;height:16px;color:#F2E2B8;flex:0 0 auto}',
'.bd-search input{flex:1;background:none;border:0;outline:none;color:#fff;font:600 14.5px/1.3 inherit}',
'.bd-search input::placeholder{color:rgba(255,255,255,.72)}',
'.bd-hint{font-size:11px;color:rgba(255,255,255,.72);white-space:nowrap}',

'.bd-body{overflow:auto;padding:6px 16px 18px;scrollbar-width:thin}',
'.bd-g{font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#F2E2B8;',
'  margin:14px 2px 9px}',

"/* COLLAPSIBLE GROUPS.\n"+
"   Twenty-six tiles at once is twenty-six decisions before the\n"+
"   student has done anything. The groups fold, This week is open\n"+
"   and the rest are shut, so opening the dock asks one question\n"+
"   instead of twenty-six. The count stays on every shut header so\n"+
"   a closed group is never a mystery box, and typing in the search\n"+
"   opens everything, because a filtered list you cannot see is\n"+
"   worse than no filter at all. */",
'.bd-gh{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:9px;width:100%;',
'  cursor:pointer;margin:14px 0 9px;padding:7px 8px;border-radius:9px;',
'  font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#F2E2B8}',
'.bd-gh:hover{background:rgba(255,255,255,.07)}',
'.bd-gh:focus-visible{outline:3px solid #F2E2B8;outline-offset:2px}',
'.bd-gh .cv{flex:none;transition:transform 180ms ease}',
'.bd-gh[aria-expanded="false"] .cv{transform:rotate(-90deg)}',
'.bd-gh .ct{margin-left:auto;letter-spacing:.06em;color:rgba(255,255,255,.62);font-size:10.5px}',
'.bd-grid[hidden]{display:none}',
"/* THE RAGGED GAP UNDER SHORT TILES.\n"+
"   Cells were not stretching, so a tile whose text wrapped to four\n"+
"   lines left a hole beside every shorter one in its row. Stretch\n"+
"   the row and let each tile fill its cell: the row is as tall as\n"+
"   its tallest tile and nothing is left hanging. */",
'.bd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px;align-items:stretch}',
'.bd-cell{height:100%}',
'.bd-tile{height:100%}',

'.bd-tile{position:relative;display:flex;align-items:flex-start;gap:11px;text-decoration:none;',
'  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:16px;padding:12px;',
'  transition:transform .16s ease,background .16s ease,border-color .16s ease}',
'.bd-tile:hover{transform:translateY(-2px);background:rgba(255,255,255,.13);border-color:#C9A14A}',
'.bd-tile:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}',
'.bd-ic{flex:0 0 auto;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;',
'  box-shadow:inset 0 1px 0 rgba(255,255,255,.4)}',
'.bd-ic svg{width:20px;height:20px}',
'.bd-ic.navy{background:linear-gradient(145deg,#31527a,#16294a);color:#fff}',
'.bd-ic.gold{background:linear-gradient(145deg,#DCB45C,#A87F2E);color:#0B1530}',
'.bd-ic.terra{background:linear-gradient(145deg,#7A2A22,#8B3A2E);color:#fff}',
'/* Was a sage-teal, which is not in the palette. Terra, like every other accent. */',
'.bd-ic.green{background:linear-gradient(145deg,#7A2A22,#8B3A2E);color:#fff}',
'.bd-tx{min-width:0;padding-right:22px}',
'/* Room for the QR button so a long name never runs under it. */',
'.bd-n{display:block;font-weight:800;font-size:14px;color:#fff;letter-spacing:-.01em}',
'.bd-s{display:block;font-size:11.5px;line-height:1.35;color:#fff;opacity:.86;margin-top:2px}',
'.bd-ext{font-size:10px;color:#F2E2B8;margin-left:5px}',
'/* COMING SOON.',
'   Dimmed with solid colors rather than opacity: an opacity on the tile',
'   would drag the name and the note down with it, and that is the exact',
'   contrast bug being swept out of this codebase. #C3CAD6 is 8.9:1 on the',
'   dock navy and #98A3B4 is 5.6:1, so both still clear AA while plainly',
'   reading as not-yet. */',
'.bd-tile.soon{background:rgba(255,255,255,.035);border-color:rgba(255,255,255,.09);cursor:default}',
'.bd-tile.soon:hover{transform:none;background:rgba(255,255,255,.035);border-color:rgba(255,255,255,.09)}',
'.bd-tile.soon .bd-n{color:#C3CAD6}',
'.bd-tile.soon .bd-s{color:#98A3B4;opacity:1}',
'.bd-tile.soon .bd-ic{filter:grayscale(.75)}',
'.bd-soon{display:inline-block;margin-left:7px;font-size:9.5px;font-weight:800;letter-spacing:.12em;',
'  text-transform:uppercase;color:#0B1530;background:#C3CAD6;border-radius:999px;padding:2px 7px;vertical-align:1px}',

'.bd-qrb{position:absolute;z-index:2;top:8px;right:8px;width:26px;height:26px;border-radius:8px;border:0;cursor:pointer;',
'  background:rgba(255,255,255,.14);color:#fff;display:flex;align-items:center;justify-content:center;padding:0}',
'.bd-qrb:hover{background:#C9A14A;color:#0B1530}',
'.bd-qrb:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}',
'.bd-qrb svg{width:14px;height:14px}',
'.bd-qr{display:none;margin-top:10px;background:#fff;border-radius:10px;padding:7px;width:104px;height:104px}',
'.bd-qr svg{width:100%;height:100%;display:block;shape-rendering:crispEdges}',
'.bd-cell.qron .bd-qr{display:block}',
'.bd-cell{position:relative;display:flex;flex-direction:column}',
'/* The QR button is a sibling of the tile, so the cell has to be the\n   positioning context or every button stacks against the panel and the\n   tile swallows the click. */',

'.bd-none{color:#fff;opacity:.86;font-size:14px;padding:22px 2px}',
'.bd-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
'@media(prefers-reduced-motion:reduce){.bd-launch,.bd-panel,.bd-tile,.bd-scrim,.bd-gh .cv{transition:none}}'
  ].join('');

  var SEARCH_IC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>';
  var GRID_IC   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>';
  var QR_IC     = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM19 19h2v2h-2z"/></svg>';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var launcher, scrim, panel, input, body, live, lastFocus = null, open = false;

  function build() {
    var st = document.createElement('style');
    st.setAttribute('data-bio005-dock', '');
    st.textContent = CSS;
    document.head.appendChild(st);

    launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'bd-launch';
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-haspopup', 'dialog');
    launcher.innerHTML = GRID_IC + '<span class="bd-lt">Course tools</span>';
    launcher.setAttribute('aria-label', 'Course tools. Opens every study tool for this course.');
    document.body.appendChild(launcher);

    scrim = document.createElement('div');
    scrim.className = 'bd-scrim';
    document.body.appendChild(scrim);

    panel = document.createElement('div');
    panel.className = 'bd-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Course tools');
    panel.hidden = true;

    var sec = section();
    panel.innerHTML =
      '<div class="bd-top"><span class="bd-title">Course tools</span>' +
      (sec ? '<span class="bd-sec">' + esc(SECTIONS[sec].label) + '</span>' : '') +
      '<button class="bd-x" type="button" aria-label="Close course tools">&#10005;</button></div>' +
      '<div class="bd-search">' + SEARCH_IC +
        '<input type="search" autocomplete="off" placeholder="Type to find a tool, then Enter" ' +
        'aria-label="Filter course tools" aria-describedby="bd-hint-x">' +
        '<span class="bd-hint" id="bd-hint-x">Esc to close</span></div>' +
      '<div class="bd-body"></div>' +
      '<div class="bd-live" role="status" aria-live="polite"></div>';
    document.body.appendChild(panel);

    input = panel.querySelector('input');
    body  = panel.querySelector('.bd-body');
    live  = panel.querySelector('.bd-live');

    render('');

    launcher.addEventListener('click', toggle);
    panel.querySelector('.bd-x').addEventListener('click', close);
    scrim.addEventListener('click', close);
    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = body.querySelector('.bd-tile');
        if (first) { e.preventDefault(); first.click(); }
      } else if (e.key === 'ArrowDown') {
        var f = body.querySelector('.bd-tile');
        if (f) { e.preventDefault(); f.focus(); }
      }
    });
    document.addEventListener('keydown', onKey, true);
  }

  /* WHICH GROUPS START OPEN

     The default is the first group only, which is This week. A
     student opening the dock sees the two or three things that are
     actually live today, and the rest as one-line headers with a
     count. Whatever they fold or unfold is remembered, so a student
     who wants everything open gets it back every time. */
  var GKEY = 'bio005-dock-groups';

  function groupState() {
    try { return JSON.parse(localStorage.getItem(GKEY) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function groupOpen(g, i) {
    var st = groupState();
    return Object.prototype.hasOwnProperty.call(st, g) ? !!st[g] : (i === 0);
  }
  function setGroupOpen(g, on) {
    var st = groupState(); st[g] = !!on;
    try { localStorage.setItem(GKEY, JSON.stringify(st)); } catch (e) {}
  }

  function render(q) {
    q = String(q || '').trim().toLowerCase();
    var list = tools().filter(function (t) {
      if (!q) return true;
      return (t.name + ' ' + t.sub + ' ' + (t.kw || '') + ' ' + t.g).toLowerCase().indexOf(q) >= 0;
    });

    if (!list.length) {
      body.innerHTML = '<p class="bd-none">Nothing matches &ldquo;' + esc(q) + '&rdquo;. Clear the box to see everything.</p>';
      live.textContent = 'No tools match';
      return;
    }

    /* Anything flagged soon leaves its own group and collects at the end
       under one heading, so the tools that work are not interleaved with
       the ones that do not. */
    var SOON_G = 'Coming soon';
    var ready = list.filter(function (t) { return !t.soon; });
    var soon  = list.filter(function (t) { return t.soon; });
    soon.forEach(function (t) { t.g = SOON_G; });
    list = ready.concat(soon);

    var groups = [], seen = {};
    list.forEach(function (t) { if (!seen[t.g]) { seen[t.g] = []; groups.push(t.g); } seen[t.g].push(t); });

    /* Searching opens everything: a hit hidden inside a folded group
       reads as no result. Browsing folds everything but This week. */
    var searching = !!q;

    var html = '';
    groups.forEach(function (g, gi) {
      var open = searching || groupOpen(g, gi);
      var gid  = 'bd-grp-' + gi;
      html += '<button type="button" class="bd-gh" data-grp="' + esc(g) + '" '
            +   'aria-expanded="' + (open ? 'true' : 'false') + '" aria-controls="' + gid + '">'
            +   '<svg class="cv" width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" '
            +     'fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" '
            +     'stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
            +   '<span>' + esc(g) + '</span>'
            +   '<span class="ct">' + seen[g].length + '</span>'
            + '</button>'
            + '<div class="bd-grid" id="' + gid + '"' + (open ? '' : ' hidden') + '>';
      seen[g].forEach(function (t) {
        /* Not a link. A tile that goes somewhere unfinished is worse than
           one that plainly says it is not ready yet. */
        if (t.soon) {
          html += '<div class="bd-cell"><div class="bd-tile soon">' +
            '<span class="bd-ic ' + t.tone + '">' + icon(t.icon) + '</span>' +
            '<span class="bd-tx"><span class="bd-n">' + esc(t.name) +
              '<span class="bd-soon">Soon</span></span>' +
            '<span class="bd-s">' + esc(t.sub) + '</span></span>' +
          '</div></div>';
          return;
        }
        /* No url means no link. A tile that reaches here without one used
           to render href="undefined" and send a student to a 404. It now
           degrades to the same not-yet treatment as a tile marked soon. */
        if (!t.url) {
          html += '<div class="bd-cell"><div class="bd-tile soon">' +
            '<span class="bd-ic ' + (t.tone || 'navy') + '">' + icon(t.icon) + '</span>' +
            '<span class="bd-tx"><span class="bd-n">' + esc(t.name) +
              '<span class="bd-soon">Soon</span></span>' +
            '<span class="bd-s">' + esc(t.sub) + '</span></span>' +
          '</div></div>';
          return;
        }
        var target = t.ext ? ' target="_blank" rel="noopener"' : ' target="_top"';
        html += '<div class="bd-cell">' +
          '<a class="bd-tile" href="' + esc(t.url) + '"' + target + '>' +
            '<span class="bd-ic ' + t.tone + '">' + icon(t.icon) + '</span>' +
            '<span class="bd-tx"><span class="bd-n">' + esc(t.name) +
              (t.ext ? '<span class="bd-ext" aria-label="opens in a new tab">&#8599;</span>' : '') +
            '</span><span class="bd-s">' + esc(t.sub) + '</span></span>' +
          '</a>' +
          (t.qr && QR[t.qr] ?
            '<button class="bd-qrb" type="button" aria-expanded="false" ' +
            'aria-label="Show a QR code for ' + esc(t.name) + ' to open it on your phone">' + QR_IC + '</button>' +
            '<span class="bd-qr">' + QR[t.qr] + '</span>' : '') +
        '</div>';
      });
      html += '</div>';
    });
    body.innerHTML = html;

    body.querySelectorAll('.bd-gh').forEach(function (h) {
      h.addEventListener('click', function () {
        var panel = document.getElementById(h.getAttribute('aria-controls'));
        var open  = h.getAttribute('aria-expanded') !== 'true';
        h.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.hidden = !open;
        setGroupOpen(h.getAttribute('data-grp'), open);
        live.textContent = h.getAttribute('data-grp') + (open ? ' expanded' : ' collapsed');
      });
    });

    body.querySelectorAll('.bd-qrb').forEach(function (b) {
      b.addEventListener('click', function () {
        var cell = b.parentNode, on = cell.classList.toggle('qron');
        b.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    });

    /* Arrow keys walk the tiles, so the whole dock is usable without
       a mouse and without 15 tab stops. */
    var tiles = [].slice.call(body.querySelectorAll('.bd-tile'));
    tiles.forEach(function (a, i) {
      a.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = i + 1;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = i - 1;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tiles.length - 1;
        else return;
        e.preventDefault();
        if (n < 0) { input.focus(); return; }
        if (tiles[n]) tiles[n].focus();
      });
    });

    live.textContent = list.length + (list.length === 1 ? ' tool' : ' tools') + (q ? ' match ' + q : ' available');
  }

  function toggle() { open ? close() : show(); }

  function show() {
    lastFocus = document.activeElement;
    panel.hidden = false;
    /* next frame so the transition actually runs */
    window.requestAnimationFrame(function () {
      scrim.classList.add('on');
      panel.classList.add('on');
    });
    launcher.setAttribute('aria-expanded', 'true');
    open = true;
    input.value = '';
    render('');
    window.setTimeout(function () { input.focus(); }, 60);
  }

  function close() {
    if (!open) return;
    scrim.classList.remove('on');
    panel.classList.remove('on');
    launcher.setAttribute('aria-expanded', 'false');
    open = false;
    window.setTimeout(function () { if (!open) panel.hidden = true; }, 220);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  function onKey(e) {
    if (!open) {
      /* "t" opens the dock, but never while the student is typing. */
      var el = document.activeElement, tag = el ? (el.tagName || '').toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || (el && el.isContentEditable)) return;
      if (e.key === 't' && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); show(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = panel.querySelectorAll('button, a[href], input');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ============================================================
     PUBLIC VIEW: ?open=1

     Some pages get handed to people who are not in the course. The
     Study With Me poster on a wall, the three-app flyer, a link to a
     colleague. Course tools opens every page on this site, so on a
     public link it hands over the lectures and the notes too.

     ?open=1 on the address means: this page, no dock. It is a flag on
     the real page, not a second copy of it, so there is one URL, one
     calendar, one thing to keep up to date.

     The flag is remembered for the tab, so following a link off the
     page does not put the dock back.
     ============================================================ */
  function isOpenView() {
    try {
      if (/[?&]open=1(&|$)/.test(window.location.search)) {
        try { sessionStorage.setItem('bio005-open-view', '1'); } catch (e) {}
        return true;
      }
      return sessionStorage.getItem('bio005-open-view') === '1';
    } catch (e) {
      return /[?&]open=1(&|$)/.test(window.location.search);
    }
  }

  window.BIO005_OPEN_VIEW = isOpenView();

  if (!window.BIO005_OPEN_VIEW) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
  }

  /* ============================================================
     THE READING FORMAT

     bio005-reading-mode.js turns a long page into its own sections
     with a complete contents list on top. It is loaded from here for
     one reason: the dock is already on every page, and there is no
     shared stylesheet in this repo to hang it off instead. One line
     here reaches the whole course.

     It decides for itself whether a page qualifies, and leaves slide
     decks, timers and tools alone. Nothing it does removes content:
     every section stays listed, searchable and one click from open.

     To take it off the whole course, delete this block.
     ============================================================ */
  (function loadReadingMode() {
    if (window.__BIO005_READING__) return;
    var here = document.querySelector('script[src*="bio005-dock.js"]');
    var src  = here
      ? here.getAttribute('src').replace('bio005-dock.js', 'bio005-reading-mode.js')
      : 'bio005-reading-mode.js';
    var el = document.createElement('script');
    el.src = src;
    el.async = false;
    el.onerror = function () {};   /* absent file, page carries on unchanged */
    document.head.appendChild(el);
  })();

  /* ============================================================
     HOOTIE

     Stuck? Ask Hootie was on 21 pages out of 514, so on all but a
     handful of the course a student who got stuck had nowhere to ask.
     Loaded from here for the same reason as the reading format: the
     dock is already on every page and there is no shared stylesheet
     to hang it off instead.

     Guarded twice. window.BIO005_HOOTIE means it has already run, and
     a script tag for it already in the page means the page loads its
     own copy, so neither case loads it a second time.

     To take it off the whole course, delete this block.
     ============================================================ */
  (function loadHootie() {
    if (window.BIO005_OPEN_VIEW) return;   /* public link, see ?open=1 above */
    if (window.BIO005_HOOTIE) return;
    if (document.querySelector('script[src*="hootie.js"]')) return;

    var here = document.querySelector('script[src*="bio005-dock.js"]');
    function sibling(name) {
      return here ? here.getAttribute('src').replace('bio005-dock.js', name) : name;
    }
    function add(src) {
      var el = document.createElement('script');
      el.src = src;
      el.async = false;              /* injected scripts still run in order */
      el.onerror = function () {};   /* absent file, page carries on unchanged */
      document.head.appendChild(el);
    }

    /* Hootie needs the schedule: buildContext returns null without
       BIO005_SESSIONS and BIO005_MODULES, and a null context means it
       mounts nothing at all. That is why it was on 21 pages, the 31 that
       load the schedule, and nowhere else. Load the data first where a
       page does not already have it, then Hootie. */
    if (!window.BIO005_SESSIONS || !window.BIO005_MODULES) {
      if (!document.querySelector('script[src*="schedule-fall2026.js"]')) {
        add(sibling('schedule-fall2026.js'));
      }
    }
    add(sibling('hootie.js'));
  })();
})();
