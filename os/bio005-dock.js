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
  /* ---------------------------------------------------------------
     OPENING DATES

     A tile with a date here stops saying "Soon" and says when it opens,
     for example "Opens Sat Oct 10". It becomes a working link on its own
     the moment that time passes, with nothing to switch on by hand.

     Write the date as 'YYYY-MM-DDTHH:MM:SS-07:00' for Pacific daylight
     time, which runs to Nov 1 2026, and '-08:00' after that.

     A tile with no entry here keeps saying "Soon", which is the honest
     answer when there is no date yet. Add a line and it changes.
     --------------------------------------------------------------- */
  var BIO005_PLANNED = {
    /* 'review-chemistry.html':      '2026-09-19T20:00:00-07:00', */
    /* 'review-math.html':           '2026-09-19T20:00:00-07:00', */
    /* 'lab-sprints.html':           '2026-09-26T20:00:00-07:00', */
    /* 'lab-competencies.html':      '2026-09-26T20:00:00-07:00', */
    /* 'clinical-tests.html':        '2026-10-03T20:00:00-07:00', */
    /* 'reading-data.html':          '2026-10-03T20:00:00-07:00', */
    /* 'practice-lecture-exam.html': '2026-10-03T20:00:00-07:00', */
    /* 'bio005-day-review.html':     '2026-10-10T20:00:00-07:00', */
    /* 'study-session-signup.html':  '2026-09-12T20:00:00-07:00', */
    /* 'bio005-tour-poster.html':    '2026-09-12T20:00:00-07:00'  */
  };

  var B5_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var B5_MONS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /* Returns the badge text for a tile that is not open yet, or null when
     it is open. A tile flagged soon with no date still reads "Soon". */
  function b5Pending(t) {
    var key = null, u = String(t.url || '');
    for (var k in BIO005_PLANNED) {
      if (u.indexOf(k) !== -1) { key = k; break; }
    }
    if (key) {
      var when = new Date(BIO005_PLANNED[key]);
      if (when > new Date()) {
        return 'Opens ' + B5_DAYS[when.getDay()] + ' ' + B5_MONS[when.getMonth()] + ' ' + when.getDate();
      }
      return null;                 /* the date has passed, the tile goes live */
    }
    return t.soon ? 'Soon' : null;
  }

  var SEC_KEY = 'bio005-section';

  var SECTIONS = {
    'net':    { label: 'Yuba College, fully online', syllabus: 'syllabus-fall2026.html', hub: 'course-start.html' }
  };

  function section() {
    var s = null;
    try { var m = location.search.match(/[?&]sec=([^&#]+)/); if (m) s = decodeURIComponent(m[1]); } catch (e) {}
    if (!SECTIONS[s]) { try { s = localStorage.getItem(SEC_KEY); } catch (e) { s = null; } }
    return SECTIONS[s] ? s : null;
  }

  /* QR codes, inline SVG, generated at build time. */
  var QR = {
    howto: "<svg width=\"39\" height=\"39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m1 0h1m2 0h2m2 0h1m1 0h1m5 0h2m1 0h3m1 0h7m-37 1h1m5 0h1m2 0h1m2 0h3m2 0h1m1 0h4m1 0h3m1 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m3 0h1m1 0h2m1 0h1m1 0h2m2 0h1m4 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m2 0h3m1 0h1m1 0h2m3 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m2 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h3m4 0h2m2 0h1m2 0h1m1 0h1m5 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h1m1 0h1m1 0h1m2 0h3m1 0h3m2 0h1m1 0h1m-27 1h1m3 0h1m1 0h3m1 0h2m2 0h4m2 0h4m2 0h2m1 0h5m2 0h1m-37 1h2m1 0h3m3 0h3m1 0h2m2 0h2m2 0h3m1 0h1m1 0h2m3 0h1m2 0h1m-34 1h1m1 0h4m1 0h3m3 0h1m2 0h1m2 0h4m1 0h3m2 0h3m-34 1h2m1 0h1m3 0h1m2 0h3m1 0h4m1 0h3m1 0h2m1 0h1m1 0h2m1 0h2m1 0h2m-32 1h1m1 0h2m1 0h2m1 0h1m4 0h1m2 0h3m1 0h1m1 0h1m2 0h3m2 0h3m-36 1h1m3 0h1m6 0h1m1 0h5m3 0h8m2 0h2m-33 1h4m1 0h1m3 0h3m1 0h2m1 0h2m1 0h5m2 0h2m1 0h5m-35 1h1m1 0h1m1 0h2m3 0h1m4 0h5m2 0h2m6 0h1m1 0h2m1 0h1m-32 1h1m1 0h2m5 0h4m1 0h1m2 0h4m2 0h2m1 0h3m1 0h3m-36 1h1m1 0h3m2 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m2 0h1m3 0h2m3 0h1m1 0h2m-33 1h1m1 0h3m3 0h2m1 0h1m1 0h3m2 0h1m1 0h2m1 0h2m1 0h1m1 0h2m1 0h1m-34 1h1m6 0h2m1 0h2m4 0h3m1 0h2m1 0h1m1 0h1m2 0h2m3 0h2m-36 1h1m2 0h4m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1m1 0h6m2 0h1m1 0h3m2 0h1m-35 1h1m1 0h2m4 0h1m2 0h3m1 0h3m3 0h1m1 0h1m1 0h1m1 0h3m1 0h2m-32 1h2m2 0h4m2 0h2m2 0h1m1 0h2m4 0h2m2 0h1m1 0h1m1 0h5m-35 1h1m5 0h1m2 0h1m4 0h1m1 0h1m1 0h3m5 0h1m3 0h2m1 0h2m-34 1h5m2 0h1m3 0h2m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1m2 0h2m2 0h4m-37 1h1m2 0h1m3 0h1m1 0h1m1 0h1m6 0h1m2 0h3m1 0h1m1 0h1m4 0h3m-33 1h1m2 0h3m3 0h3m1 0h1m2 0h1m1 0h4m1 0h1m1 0h1m1 0h1m1 0h1m-30 1h2m3 0h2m2 0h1m2 0h5m1 0h5m1 0h1m3 0h5m1 0h1m-37 1h2m1 0h1m2 0h4m1 0h3m2 0h7m1 0h1m2 0h9m-28 1h1m1 0h2m3 0h2m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m3 0h1m-33 1h7m1 0h3m3 0h4m4 0h3m1 0h1m1 0h1m1 0h1m1 0h1m-33 1h1m5 0h1m5 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1m4 0h1m3 0h4m-36 1h1m1 0h3m1 0h1m1 0h1m5 0h1m3 0h5m3 0h1m1 0h8m-36 1h1m1 0h3m1 0h1m4 0h2m1 0h1m1 0h3m3 0h2m1 0h2m1 0h4m1 0h1m2 0h1m-37 1h1m1 0h3m1 0h1m2 0h4m3 0h3m2 0h1m1 0h2m1 0h3m1 0h1m2 0h2m-35 1h1m5 0h1m3 0h2m2 0h1m2 0h2m1 0h2m1 0h2m2 0h1m2 0h1m1 0h4m-36 1h7m1 0h1m1 0h1m1 0h4m1 0h1m1 0h6m2 0h1m3 0h1m2 0h3\"/></svg>",
    histology: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 35 35\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m2 0h1m2 0h1m1 0h1m1 0h4m3 0h1m2 0h7m-33 1h1m5 0h1m1 0h2m2 0h1m1 0h3m4 0h1m2 0h1m1 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m10 0h2m4 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h7m4 0h1m3 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m4 0h1m1 0h1m2 0h1m1 0h6m2 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m1 0h1m2 0h6m2 0h2m3 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-19 1h2m2 0h1m1 0h3m1 0h1m-25 1h5m1 0h9m2 0h1m1 0h1m2 0h4m1 0h1m1 0h1m1 0h1m-32 1h4m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m2 0h6m1 0h1m2 0h1m3 0h3m-32 1h1m1 0h4m1 0h2m2 0h1m1 0h2m2 0h1m1 0h1m5 0h4m1 0h1m-32 1h3m1 0h1m2 0h1m1 0h2m4 0h1m5 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-30 1h1m2 0h4m1 0h1m3 0h2m2 0h1m1 0h1m4 0h2m1 0h3m-29 1h2m2 0h1m2 0h1m1 0h2m1 0h1m2 0h5m2 0h1m2 0h1m4 0h2m-33 1h2m4 0h2m2 0h1m1 0h6m2 0h1m1 0h1m1 0h2m1 0h2m2 0h1m-32 1h2m1 0h3m1 0h3m2 0h1m1 0h1m1 0h1m3 0h2m1 0h1m1 0h1m2 0h1m1 0h1m-30 1h1m1 0h1m2 0h2m3 0h4m2 0h2m1 0h1m1 0h3m2 0h2m2 0h1m-32 1h1m2 0h3m5 0h1m7 0h2m2 0h2m1 0h1m2 0h1m1 0h2m-29 1h4m1 0h1m2 0h5m4 0h1m3 0h2m2 0h1m1 0h1m-31 1h2m5 0h1m2 0h1m2 0h1m1 0h1m1 0h2m1 0h5m4 0h1m-30 1h1m1 0h2m1 0h2m1 0h6m2 0h2m3 0h4m1 0h2m2 0h1m-32 1h6m5 0h4m1 0h5m2 0h1m1 0h2m2 0h1m1 0h2m-33 1h1m5 0h3m3 0h1m2 0h1m4 0h1m1 0h1m4 0h3m1 0h1m-32 1h1m3 0h1m2 0h1m2 0h1m1 0h1m1 0h1m1 0h1m3 0h8m1 0h2m-31 1h1m3 0h1m1 0h1m1 0h1m1 0h1m2 0h1m3 0h1m1 0h1m4 0h5m3 0h1m-25 1h1m1 0h2m1 0h1m2 0h1m2 0h1m4 0h1m3 0h3m1 0h1m-33 1h7m1 0h1m3 0h1m1 0h5m1 0h1m1 0h3m1 0h1m1 0h1m1 0h2m-32 1h1m5 0h1m2 0h1m4 0h2m3 0h6m3 0h5m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h5m1 0h1m2 0h1m1 0h1m1 0h6m2 0h1m-33 1h1m1 0h3m1 0h1m1 0h4m1 0h1m2 0h5m2 0h3m2 0h1m1 0h1m-31 1h1m1 0h3m1 0h1m1 0h1m6 0h1m1 0h1m2 0h1m1 0h1m1 0h3m4 0h1m-32 1h1m5 0h1m1 0h3m4 0h2m3 0h2m3 0h1m2 0h3m-31 1h7m1 0h1m1 0h1m1 0h3m2 0h1m4 0h3m2 0h1m1 0h1m1 0h1\"/></svg>",
    mastery: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m1 0h1m1 0h4m1 0h1m2 0h1m1 0h3m7 0h7m-37 1h1m5 0h1m2 0h2m6 0h2m2 0h2m1 0h1m3 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h2m2 0h1m1 0h1m3 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h2m1 0h2m1 0h1m1 0h2m2 0h3m1 0h2m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m4 0h2m3 0h1m1 0h1m1 0h3m2 0h2m3 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h1m1 0h9m1 0h3m2 0h1m4 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-27 1h4m2 0h1m2 0h2m2 0h2m1 0h3m-29 1h1m1 0h1m3 0h2m3 0h5m8 0h1m3 0h1m2 0h1m2 0h1m1 0h1m-37 1h1m2 0h2m4 0h1m2 0h1m4 0h1m1 0h1m1 0h1m1 0h1m2 0h3m1 0h2m3 0h2m-37 1h2m1 0h1m1 0h3m2 0h1m1 0h4m3 0h5m1 0h1m1 0h1m2 0h1m2 0h1m2 0h1m-37 1h1m2 0h3m2 0h1m2 0h2m6 0h1m2 0h2m2 0h1m1 0h1m2 0h3m-34 1h1m2 0h2m1 0h2m1 0h1m2 0h5m2 0h2m2 0h2m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m-37 1h3m2 0h1m2 0h2m1 0h3m1 0h3m1 0h2m1 0h2m3 0h5m1 0h1m2 0h1m-35 1h2m1 0h3m1 0h2m1 0h4m1 0h3m1 0h3m1 0h1m1 0h2m4 0h2m1 0h1m-37 1h2m3 0h1m3 0h1m2 0h3m7 0h2m3 0h2m2 0h3m1 0h1m-36 1h2m2 0h1m1 0h1m4 0h2m1 0h1m1 0h1m11 0h1m1 0h2m-31 1h1m7 0h1m3 0h2m1 0h1m1 0h2m3 0h3m1 0h2m1 0h2m2 0h3m-37 1h4m1 0h2m2 0h1m6 0h2m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m3 0h1m1 0h1m-37 1h2m1 0h3m3 0h3m1 0h1m1 0h2m1 0h1m4 0h2m1 0h3m1 0h1m2 0h1m-34 1h1m1 0h1m3 0h3m4 0h2m1 0h1m2 0h2m3 0h1m3 0h1m1 0h2m1 0h1m1 0h1m-34 1h3m4 0h2m1 0h1m2 0h2m1 0h4m1 0h2m1 0h5m5 0h1m-37 1h1m3 0h3m1 0h1m2 0h1m3 0h1m1 0h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m2 0h4m-36 1h2m1 0h2m5 0h2m3 0h1m2 0h2m2 0h1m2 0h1m1 0h2m1 0h3m-32 1h1m1 0h1m1 0h1m8 0h2m6 0h2m2 0h2m1 0h1m5 0h1m-35 1h1m4 0h6m1 0h1m4 0h1m1 0h1m1 0h2m1 0h2m2 0h2m1 0h2m1 0h1m-37 1h2m1 0h7m2 0h2m1 0h2m2 0h5m2 0h2m1 0h2m1 0h1m3 0h1m-34 1h1m3 0h4m3 0h1m3 0h2m4 0h1m1 0h7m2 0h1m-36 1h4m2 0h5m1 0h1m1 0h2m2 0h3m3 0h1m3 0h5m2 0h2m-29 1h2m1 0h2m2 0h3m1 0h1m1 0h4m1 0h1m1 0h1m3 0h1m3 0h1m-37 1h7m1 0h1m4 0h1m1 0h3m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m3 0h1m-37 1h1m5 0h1m4 0h3m1 0h1m2 0h2m7 0h2m3 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h4m2 0h1m2 0h3m2 0h6m-33 1h1m1 0h3m1 0h1m5 0h1m4 0h1m1 0h1m3 0h1m2 0h1m1 0h2m2 0h2m1 0h1m-36 1h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m2 0h4m1 0h1m-37 1h1m5 0h1m3 0h1m3 0h1m1 0h1m1 0h1m1 0h1m1 0h1m5 0h3m1 0h1m-33 1h7m1 0h2m1 0h2m3 0h1m3 0h1m3 0h1m3 0h2m1 0h1m1 0h1m2 0h1\"/></svg>",
    recall: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m1 0h2m2 0h7m1 0h1m2 0h1m2 0h3m1 0h7m-37 1h1m5 0h1m2 0h3m1 0h2m1 0h2m1 0h4m2 0h2m1 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m3 0h2m2 0h2m1 0h2m4 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h3m1 0h2m1 0h2m3 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h1m2 0h1m1 0h2m1 0h1m2 0h1m2 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h4m2 0h4m1 0h1m2 0h1m1 0h1m5 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h3m1 0h1m2 0h1m1 0h1m1 0h3m2 0h1m1 0h1m-27 1h1m3 0h1m1 0h5m1 0h2m2 0h2m2 0h5m1 0h2m1 0h5m2 0h1m-35 1h1m1 0h2m3 0h1m1 0h1m1 0h2m2 0h2m2 0h1m1 0h1m1 0h1m1 0h2m3 0h1m2 0h1m-34 1h2m1 0h4m1 0h1m1 0h1m2 0h1m2 0h1m2 0h4m1 0h3m2 0h3m-34 1h1m2 0h1m4 0h5m2 0h3m2 0h2m1 0h1m2 0h1m1 0h2m1 0h2m1 0h2m-36 1h1m1 0h1m2 0h3m2 0h5m2 0h1m2 0h3m1 0h1m1 0h1m2 0h3m2 0h3m-33 1h2m1 0h1m1 0h1m1 0h1m1 0h6m3 0h8m2 0h2m-34 1h2m1 0h1m1 0h2m1 0h1m1 0h1m4 0h1m1 0h1m2 0h2m1 0h2m2 0h2m1 0h5m-34 1h1m1 0h1m5 0h1m1 0h2m2 0h3m3 0h2m6 0h1m1 0h2m1 0h1m-32 1h1m2 0h1m5 0h1m1 0h2m1 0h1m2 0h2m1 0h2m1 0h2m1 0h3m1 0h3m-36 1h1m1 0h1m5 0h3m3 0h1m1 0h1m6 0h1m3 0h2m3 0h1m1 0h2m-34 1h1m2 0h2m2 0h1m1 0h1m1 0h2m1 0h3m1 0h2m1 0h1m2 0h2m1 0h1m1 0h2m1 0h1m-35 1h2m5 0h1m3 0h3m3 0h2m2 0h3m2 0h1m2 0h2m3 0h2m-36 1h1m1 0h9m2 0h3m1 0h1m1 0h4m1 0h1m2 0h1m1 0h3m2 0h1m-35 1h2m1 0h2m2 0h2m1 0h1m2 0h4m4 0h1m1 0h1m1 0h1m1 0h3m1 0h2m-33 1h3m2 0h3m1 0h1m1 0h2m2 0h1m1 0h2m2 0h1m1 0h2m2 0h1m1 0h1m1 0h5m-36 1h5m5 0h1m1 0h2m1 0h1m1 0h1m1 0h3m5 0h1m3 0h2m1 0h2m-35 1h2m3 0h1m4 0h2m1 0h1m2 0h1m2 0h3m3 0h1m2 0h2m2 0h4m-37 1h3m6 0h2m2 0h2m3 0h1m2 0h3m1 0h1m1 0h1m4 0h3m-33 1h5m1 0h2m1 0h2m1 0h3m1 0h1m1 0h6m1 0h1m1 0h1m1 0h1m-30 1h1m1 0h2m1 0h1m3 0h2m1 0h6m1 0h2m3 0h1m3 0h5m-35 1h2m2 0h5m3 0h1m1 0h1m1 0h7m1 0h1m2 0h8m1 0h1m-29 1h2m1 0h1m2 0h5m1 0h1m1 0h2m1 0h1m2 0h1m3 0h1m-33 1h7m1 0h1m1 0h1m1 0h2m1 0h4m3 0h3m1 0h1m1 0h1m1 0h1m1 0h1m-33 1h1m5 0h1m2 0h2m1 0h1m3 0h4m1 0h3m4 0h1m3 0h4m-36 1h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m3 0h1m1 0h4m3 0h1m1 0h8m-36 1h1m1 0h3m1 0h1m4 0h1m1 0h2m2 0h2m4 0h1m1 0h2m1 0h4m1 0h1m1 0h2m-37 1h1m1 0h3m1 0h1m2 0h1m4 0h5m1 0h2m1 0h2m1 0h3m1 0h1m2 0h2m-35 1h1m5 0h1m2 0h1m4 0h2m1 0h2m1 0h2m1 0h2m2 0h1m2 0h1m1 0h4m-36 1h7m1 0h1m1 0h3m2 0h1m1 0h1m1 0h6m2 0h1m3 0h1m2 0h3\"/></svg>",
    loops: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 31 31\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m1 0h1m1 0h3m1 0h1m3 0h1m3 0h7m-29 1h1m5 0h1m2 0h3m1 0h2m1 0h2m2 0h1m1 0h1m5 0h1m-29 1h1m1 0h3m1 0h1m1 0h2m1 0h3m3 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m2 0h1m3 0h3m1 0h1m4 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m2 0h1m2 0h2m4 0h1m3 0h1m1 0h3m1 0h1m-29 1h1m5 0h1m1 0h1m1 0h2m5 0h2m1 0h1m1 0h1m5 0h1m-29 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-20 1h4m3 0h1m-17 1h1m1 0h1m3 0h2m1 0h1m1 0h2m3 0h1m2 0h2m2 0h1m2 0h1m1 0h1m-27 1h1m1 0h1m3 0h1m1 0h2m2 0h3m2 0h2m1 0h2m3 0h2m-29 1h2m2 0h3m1 0h1m2 0h1m2 0h2m3 0h2m1 0h2m1 0h2m1 0h1m-29 1h2m2 0h1m5 0h1m3 0h3m1 0h1m1 0h2m3 0h1m-25 1h2m3 0h1m1 0h3m3 0h1m1 0h1m2 0h1m2 0h1m5 0h1m-29 1h2m1 0h3m2 0h1m2 0h3m1 0h1m1 0h1m1 0h2m1 0h2m3 0h2m-27 1h2m2 0h1m1 0h1m1 0h1m4 0h1m1 0h3m8 0h1m-29 1h1m1 0h1m1 0h2m2 0h1m2 0h2m1 0h3m1 0h2m2 0h1m-23 1h1m1 0h1m2 0h4m4 0h2m1 0h1m2 0h1m2 0h1m5 0h1m-28 1h5m1 0h4m1 0h1m2 0h2m1 0h3m1 0h2m2 0h3m-29 1h3m3 0h1m1 0h4m1 0h3m1 0h1m1 0h1m3 0h1m1 0h1m2 0h1m-27 1h1m1 0h1m2 0h1m1 0h1m1 0h1m8 0h1m1 0h1m-23 1h3m1 0h1m1 0h1m3 0h1m1 0h3m1 0h1m3 0h6m1 0h1m-20 1h4m1 0h1m1 0h3m2 0h1m3 0h3m1 0h1m-29 1h7m1 0h1m1 0h1m1 0h1m2 0h4m1 0h1m1 0h1m1 0h1m3 0h1m-29 1h1m5 0h1m2 0h2m1 0h2m1 0h2m3 0h1m3 0h1m-25 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m2 0h1m2 0h7m1 0h1m-28 1h1m1 0h3m1 0h1m3 0h2m3 0h1m2 0h2m1 0h1m1 0h4m1 0h1m-29 1h1m1 0h3m1 0h1m1 0h1m3 0h2m1 0h3m2 0h2m2 0h1m2 0h2m-29 1h1m5 0h1m2 0h1m1 0h1m1 0h3m2 0h1m1 0h1m1 0h1m2 0h1m-26 1h7m1 0h1m1 0h7m3 0h1m1 0h1m1 0h2m2 0h1\"/></svg>",
    atlas: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 35 35\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m1 0h6m2 0h1m1 0h1m4 0h2m1 0h7m-33 1h1m5 0h1m3 0h1m1 0h3m1 0h1m1 0h3m1 0h1m3 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m1 0h2m1 0h1m2 0h2m1 0h2m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m6 0h2m1 0h1m1 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m2 0h1m2 0h1m2 0h1m1 0h3m2 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m1 0h4m1 0h1m2 0h1m1 0h3m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h2m4 0h1m2 0h7m-24 1h1m3 0h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h1m2 0h10m2 0h1m-31 1h1m6 0h2m1 0h1m1 0h2m1 0h1m5 0h1m1 0h1m3 0h3m-32 1h1m1 0h1m3 0h1m1 0h2m3 0h3m2 0h1m1 0h2m1 0h1m1 0h2m2 0h1m1 0h1m-27 1h1m4 0h2m1 0h1m1 0h1m4 0h2m3 0h1m5 0h1m-32 1h3m2 0h2m4 0h3m1 0h2m2 0h2m1 0h1m3 0h1m1 0h2m2 0h1m-33 1h1m2 0h1m4 0h1m1 0h1m3 0h1m3 0h3m1 0h1m3 0h2m1 0h2m-31 1h2m2 0h1m1 0h1m5 0h1m1 0h2m1 0h2m2 0h3m1 0h4m2 0h1m-31 1h1m2 0h1m2 0h11m3 0h1m2 0h3m1 0h2m-28 1h2m1 0h3m3 0h1m1 0h1m3 0h1m1 0h1m1 0h3m2 0h1m1 0h2m1 0h1m-31 1h2m1 0h1m4 0h2m1 0h1m1 0h3m1 0h1m3 0h2m5 0h4m-33 1h4m1 0h2m2 0h1m3 0h1m1 0h1m1 0h1m2 0h2m1 0h3m1 0h1m1 0h1m1 0h1m-29 1h1m3 0h1m2 0h1m1 0h3m2 0h3m1 0h3m3 0h1m-28 1h3m1 0h1m1 0h2m1 0h1m3 0h3m2 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-32 1h3m1 0h2m4 0h2m1 0h2m1 0h1m2 0h2m2 0h1m1 0h3m2 0h2m-30 1h6m2 0h2m4 0h3m3 0h2m3 0h1m2 0h2m-30 1h1m4 0h1m1 0h4m1 0h1m2 0h3m1 0h6m1 0h1m3 0h1m-33 1h4m2 0h1m1 0h3m1 0h4m1 0h6m1 0h6m1 0h2m-25 1h5m1 0h5m3 0h1m1 0h1m3 0h1m1 0h3m-33 1h7m1 0h2m4 0h2m2 0h1m1 0h2m2 0h1m1 0h1m1 0h2m1 0h1m-32 1h1m5 0h1m3 0h4m2 0h1m4 0h1m2 0h1m3 0h1m2 0h2m-33 1h1m1 0h3m1 0h1m1 0h1m2 0h1m4 0h1m4 0h1m2 0h6m-30 1h1m1 0h3m1 0h1m2 0h1m1 0h3m3 0h2m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m-31 1h1m1 0h3m1 0h1m2 0h1m2 0h4m2 0h1m2 0h1m1 0h2m1 0h4m-30 1h1m5 0h1m2 0h1m2 0h2m1 0h3m3 0h2m1 0h1m4 0h1m-30 1h7m1 0h3m1 0h1m4 0h1m1 0h4m1 0h1m4 0h1m2 0h1\"/></svg>",
    calendar: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m1 0h5m4 0h7m1 0h1m2 0h1m1 0h7m-37 1h1m5 0h1m1 0h1m1 0h3m5 0h1m1 0h4m2 0h1m1 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m2 0h3m1 0h1m1 0h1m2 0h3m2 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m5 0h2m4 0h1m1 0h3m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m1 0h1m2 0h4m1 0h2m3 0h5m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m3 0h3m1 0h3m2 0h4m3 0h1m1 0h1m1 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h2m1 0h2m1 0h2m1 0h3m2 0h1m1 0h1m2 0h2m-29 1h1m1 0h2m1 0h3m8 0h3m2 0h1m1 0h2m2 0h2m1 0h1m2 0h1m1 0h2m-37 1h1m2 0h2m4 0h2m3 0h2m1 0h1m1 0h2m2 0h1m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m-32 1h4m2 0h1m1 0h3m3 0h1m1 0h1m2 0h2m6 0h1m2 0h1m-35 1h5m7 0h3m1 0h1m3 0h1m3 0h5m3 0h3m-35 1h1m1 0h1m3 0h1m1 0h3m2 0h3m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h2m1 0h5m-37 1h2m2 0h1m2 0h2m1 0h2m3 0h3m1 0h1m2 0h1m3 0h3m1 0h4m1 0h2m-37 1h2m4 0h1m2 0h1m2 0h3m2 0h1m1 0h2m3 0h2m2 0h3m1 0h1m1 0h2m-34 1h4m1 0h1m1 0h2m1 0h1m1 0h2m2 0h1m2 0h4m3 0h1m1 0h3m2 0h2m-35 1h1m2 0h4m2 0h3m1 0h1m3 0h3m2 0h4m5 0h2m1 0h1m-36 1h3m4 0h5m1 0h1m1 0h1m3 0h1m1 0h3m1 0h2m2 0h1m4 0h2m-36 1h1m2 0h1m1 0h1m3 0h1m4 0h1m4 0h3m3 0h3m1 0h3m2 0h2m-37 1h1m2 0h3m1 0h1m1 0h1m1 0h1m1 0h1m2 0h3m5 0h1m2 0h4m1 0h2m1 0h1m-36 1h1m1 0h6m7 0h5m1 0h1m1 0h1m2 0h4m1 0h2m3 0h1m-35 1h2m1 0h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h2m1 0h2m2 0h1m2 0h1m1 0h2m3 0h1m-34 1h10m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m1 0h2m1 0h1m3 0h1m-35 1h2m4 0h2m1 0h1m1 0h1m1 0h1m5 0h1m2 0h1m1 0h1m3 0h1m2 0h3m-35 1h3m3 0h1m1 0h1m1 0h1m4 0h1m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h4m1 0h3m-36 1h1m1 0h1m1 0h1m4 0h1m2 0h5m1 0h1m1 0h1m2 0h1m2 0h1m1 0h8m-36 1h3m2 0h1m1 0h7m2 0h3m2 0h1m1 0h1m8 0h1m1 0h1m-36 1h1m2 0h2m2 0h1m5 0h4m3 0h2m1 0h2m1 0h1m1 0h2m1 0h3m1 0h1m-31 1h2m4 0h2m2 0h2m2 0h5m1 0h1m1 0h9m-28 1h1m2 0h3m1 0h1m1 0h1m5 0h4m1 0h1m3 0h1m1 0h1m1 0h1m-37 1h7m1 0h3m3 0h2m2 0h1m7 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h3m4 0h1m1 0h1m1 0h2m1 0h2m2 0h3m3 0h1m2 0h1m-36 1h1m1 0h3m1 0h1m2 0h2m1 0h1m1 0h1m1 0h4m1 0h1m6 0h6m1 0h2m-37 1h1m1 0h3m1 0h1m1 0h5m3 0h2m1 0h3m1 0h1m3 0h4m1 0h1m2 0h2m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h3m3 0h2m3 0h3m5 0h1m1 0h1m-33 1h1m5 0h1m2 0h3m1 0h1m4 0h2m4 0h2m3 0h4m1 0h1m-35 1h7m1 0h1m1 0h3m2 0h1m1 0h1m4 0h5m5 0h5\"/></svg>",
    study: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h3m7 0h7m-37 1h1m5 0h1m1 0h10m1 0h4m2 0h2m3 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h2m3 0h1m1 0h1m2 0h4m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h2m1 0h2m2 0h2m1 0h3m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h4m4 0h3m5 0h1m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m3 0h1m4 0h1m4 0h2m1 0h2m1 0h1m1 0h1m1 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-27 1h2m1 0h1m2 0h1m1 0h1m3 0h2m1 0h1m1 0h2m-29 1h1m2 0h6m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m2 0h2m1 0h1m2 0h1m2 0h1m1 0h3m-36 1h1m3 0h1m1 0h3m6 0h4m1 0h3m2 0h2m3 0h2m1 0h2m-36 1h1m3 0h3m1 0h1m2 0h1m2 0h3m4 0h1m1 0h1m3 0h2m1 0h2m1 0h2m1 0h1m-29 1h1m1 0h1m5 0h3m1 0h1m3 0h1m1 0h11m-37 1h1m2 0h2m1 0h2m1 0h1m2 0h5m2 0h2m2 0h2m1 0h3m1 0h2m1 0h1m2 0h1m-37 1h1m3 0h2m1 0h1m1 0h1m1 0h1m2 0h5m2 0h9m2 0h2m-31 1h2m1 0h3m1 0h3m1 0h2m2 0h3m4 0h5m2 0h5m-35 1h1m2 0h1m2 0h2m6 0h1m1 0h1m1 0h1m1 0h3m1 0h2m2 0h2m1 0h4m-36 1h1m1 0h1m2 0h2m3 0h4m4 0h1m5 0h1m2 0h1m1 0h1m3 0h1m-35 1h1m1 0h4m3 0h6m2 0h1m1 0h2m1 0h1m2 0h3m1 0h1m1 0h1m-32 1h3m2 0h3m1 0h1m1 0h1m4 0h2m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m3 0h1m1 0h1m-33 1h2m3 0h2m1 0h1m1 0h3m6 0h3m1 0h2m2 0h3m2 0h1m-37 1h1m4 0h3m3 0h1m1 0h1m2 0h2m6 0h1m1 0h1m1 0h6m-34 1h1m2 0h2m3 0h1m5 0h2m3 0h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-34 1h1m2 0h5m1 0h2m1 0h1m1 0h3m2 0h4m2 0h6m1 0h1m1 0h2m-36 1h2m11 0h1m2 0h4m3 0h1m1 0h1m3 0h7m-36 1h2m1 0h1m1 0h1m2 0h2m2 0h1m1 0h2m3 0h1m2 0h1m2 0h3m1 0h1m5 0h1m-37 1h1m8 0h2m2 0h2m3 0h1m2 0h3m1 0h3m4 0h3m-35 1h5m1 0h1m2 0h1m2 0h6m1 0h4m4 0h1m2 0h1m4 0h2m-37 1h1m1 0h1m1 0h1m3 0h2m1 0h1m4 0h1m2 0h1m2 0h1m4 0h1m1 0h1m1 0h1m2 0h3m-37 1h1m2 0h2m1 0h4m2 0h5m1 0h1m1 0h1m1 0h4m2 0h5m1 0h3m-29 1h3m2 0h1m1 0h1m2 0h2m5 0h2m1 0h1m3 0h1m1 0h2m-36 1h7m1 0h1m6 0h3m1 0h2m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m3 0h1m-37 1h1m5 0h1m1 0h1m2 0h1m2 0h2m4 0h1m1 0h1m1 0h2m1 0h2m3 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m3 0h4m1 0h1m4 0h1m1 0h7m2 0h1m-36 1h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h1m1 0h4m2 0h2m5 0h2m2 0h4m-37 1h1m1 0h3m1 0h1m2 0h3m3 0h1m1 0h1m3 0h3m3 0h1m4 0h2m2 0h1m-37 1h1m5 0h1m4 0h2m1 0h1m2 0h1m6 0h1m7 0h1m1 0h3m-37 1h7m1 0h2m2 0h1m3 0h1m3 0h1m2 0h2m3 0h2m1 0h1m1 0h1m2 0h1\"/></svg>",
    home: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m4 0h1m5 0h2m1 0h2m1 0h1m1 0h1m2 0h1m1 0h7m-37 1h1m5 0h1m2 0h1m2 0h1m4 0h1m1 0h1m2 0h1m4 0h2m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m5 0h1m2 0h4m3 0h3m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h2m2 0h1m1 0h1m2 0h6m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h1m5 0h2m3 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h3m1 0h1m2 0h2m1 0h1m1 0h3m1 0h1m1 0h2m2 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h2m4 0h2m3 0h3m1 0h1m4 0h1m-29 1h1m1 0h5m2 0h1m2 0h1m5 0h4m1 0h4m3 0h5m-33 1h1m1 0h1m2 0h3m1 0h2m1 0h4m5 0h1m4 0h1m2 0h1m1 0h1m1 0h1m-35 1h2m1 0h4m2 0h5m2 0h1m2 0h2m2 0h1m1 0h11m-37 1h2m1 0h3m7 0h1m2 0h1m1 0h1m2 0h2m3 0h1m1 0h1m1 0h3m3 0h1m-35 1h1m3 0h1m10 0h1m4 0h1m1 0h2m1 0h1m1 0h2m1 0h5m-37 1h1m1 0h4m1 0h3m1 0h1m1 0h1m2 0h9m3 0h2m1 0h1m-32 1h9m1 0h8m2 0h2m3 0h1m1 0h1m1 0h1m1 0h3m1 0h2m-35 1h4m2 0h5m1 0h2m1 0h2m2 0h1m1 0h2m1 0h1m1 0h1m1 0h3m2 0h2m-37 1h2m1 0h4m1 0h2m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m1 0h3m1 0h1m1 0h2m-35 1h1m2 0h1m3 0h1m1 0h1m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1m2 0h1m2 0h1m1 0h3m-36 1h1m1 0h2m2 0h1m2 0h1m1 0h1m2 0h3m2 0h1m1 0h2m1 0h1m1 0h3m1 0h3m2 0h2m-34 1h3m2 0h1m1 0h3m1 0h2m3 0h3m2 0h1m1 0h1m1 0h1m7 0h1m-35 1h1m2 0h2m4 0h1m3 0h1m1 0h1m1 0h1m2 0h5m2 0h2m1 0h3m-34 1h1m2 0h1m2 0h2m3 0h2m2 0h1m2 0h2m2 0h1m1 0h2m1 0h2m3 0h1m-34 1h3m2 0h2m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m3 0h1m2 0h4m1 0h4m2 0h1m-37 1h2m1 0h3m1 0h1m1 0h1m1 0h2m1 0h3m2 0h2m2 0h2m1 0h7m3 0h1m-35 1h2m1 0h2m1 0h4m1 0h3m2 0h5m1 0h4m1 0h4m1 0h3m-37 1h1m2 0h3m1 0h1m1 0h1m1 0h2m1 0h3m6 0h1m7 0h1m2 0h1m-35 1h1m2 0h2m1 0h2m1 0h1m1 0h4m2 0h1m2 0h2m2 0h2m1 0h2m1 0h2m2 0h3m-37 1h1m2 0h3m1 0h2m1 0h5m1 0h1m4 0h1m1 0h1m2 0h1m1 0h2m1 0h3m2 0h1m-37 1h1m2 0h1m2 0h3m1 0h1m1 0h3m1 0h3m3 0h5m1 0h5m1 0h3m-29 1h1m1 0h1m5 0h4m1 0h3m1 0h4m3 0h2m-34 1h7m3 0h1m4 0h1m1 0h1m3 0h1m4 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h1m2 0h2m4 0h3m1 0h2m1 0h1m1 0h1m1 0h1m3 0h2m2 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h4m4 0h1m2 0h9m1 0h2m-36 1h1m1 0h3m1 0h1m1 0h4m3 0h1m1 0h2m1 0h5m2 0h4m1 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h5m2 0h1m1 0h2m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m2 0h2m1 0h1m2 0h1m3 0h4m4 0h3m2 0h2m2 0h1m-37 1h7m1 0h4m2 0h2m1 0h1m1 0h1m2 0h1m1 0h3m5 0h5\"/></svg>",
    exams: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m2 0h3m2 0h1m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1m3 0h7m-37 1h1m5 0h1m1 0h2m1 0h3m3 0h1m3 0h2m5 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m2 0h3m4 0h4m3 0h2m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h1m1 0h2m1 0h3m1 0h3m1 0h2m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h2m1 0h2m2 0h4m3 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m3 0h4m1 0h1m2 0h1m1 0h1m1 0h1m1 0h3m3 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h4m1 0h4m1 0h3m1 0h2m2 0h3m-29 1h1m5 0h1m1 0h3m6 0h1m1 0h1m2 0h4m3 0h2m2 0h3m-35 1h2m2 0h1m1 0h1m2 0h1m1 0h2m3 0h1m1 0h5m3 0h1m3 0h2m1 0h2m-36 1h2m2 0h1m1 0h7m4 0h1m2 0h2m4 0h2m1 0h8m-34 1h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h3m1 0h2m2 0h1m1 0h1m1 0h2m2 0h4m2 0h1m-34 1h1m1 0h4m1 0h1m2 0h1m2 0h1m2 0h2m2 0h2m1 0h3m1 0h2m1 0h1m2 0h1m-37 1h2m1 0h1m1 0h1m1 0h1m3 0h1m1 0h4m1 0h7m2 0h3m1 0h1m1 0h1m-34 1h3m1 0h4m1 0h1m1 0h6m3 0h3m4 0h1m1 0h1m1 0h3m1 0h2m-37 1h6m2 0h2m1 0h1m4 0h1m1 0h1m1 0h1m2 0h2m1 0h2m2 0h2m1 0h4m-37 1h1m2 0h5m3 0h2m1 0h1m1 0h2m1 0h2m1 0h4m3 0h2m1 0h1m1 0h2m-36 1h6m1 0h2m9 0h3m2 0h1m1 0h4m2 0h1m2 0h2m-35 1h3m2 0h2m1 0h1m3 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h1m-37 1h1m2 0h3m2 0h2m1 0h1m1 0h2m5 0h1m3 0h1m1 0h3m4 0h1m2 0h1m-37 1h2m4 0h4m2 0h4m1 0h1m4 0h5m2 0h2m1 0h3m-35 1h3m1 0h2m2 0h5m2 0h1m1 0h1m1 0h1m1 0h3m3 0h1m1 0h1m2 0h1m1 0h1m-34 1h2m1 0h1m1 0h2m1 0h1m2 0h2m1 0h2m5 0h1m4 0h2m1 0h4m2 0h1m-37 1h4m1 0h1m1 0h2m1 0h4m2 0h1m2 0h2m1 0h3m3 0h6m2 0h1m-35 1h5m2 0h1m1 0h2m1 0h3m3 0h1m2 0h1m2 0h3m1 0h1m5 0h1m-37 1h4m4 0h1m7 0h1m1 0h4m1 0h1m2 0h2m3 0h1m1 0h2m-35 1h1m1 0h1m3 0h3m2 0h1m5 0h1m3 0h1m3 0h1m1 0h2m1 0h2m2 0h3m-37 1h1m1 0h4m1 0h1m1 0h3m3 0h1m6 0h1m4 0h1m1 0h1m1 0h1m2 0h1m1 0h1m-37 1h1m5 0h3m1 0h3m1 0h1m1 0h4m2 0h1m1 0h3m1 0h5m1 0h1m1 0h1m-29 1h1m4 0h7m2 0h2m2 0h1m1 0h1m3 0h1m-33 1h7m2 0h1m1 0h1m2 0h4m1 0h3m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m3 0h1m-37 1h1m5 0h1m2 0h2m2 0h1m1 0h1m2 0h2m4 0h1m2 0h2m3 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m2 0h3m3 0h1m2 0h1m3 0h1m1 0h2m1 0h6m1 0h2m-36 1h1m1 0h3m1 0h1m2 0h4m3 0h4m3 0h1m2 0h1m2 0h2m2 0h4m-37 1h1m1 0h3m1 0h1m3 0h3m1 0h2m4 0h3m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m4 0h1m1 0h1m6 0h1m1 0h1m5 0h2m2 0h1m3 0h1m-37 1h7m1 0h1m4 0h1m1 0h2m2 0h2m3 0h1m3 0h2m1 0h1m1 0h1m2 0h1\"/></svg>",
    canvas: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m2 0h1m3 0h3m1 0h2m1 0h2m1 0h3m2 0h1m1 0h7m-37 1h1m5 0h1m4 0h2m1 0h4m1 0h1m2 0h1m4 0h2m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h1m3 0h5m2 0h2m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h1m4 0h2m1 0h1m2 0h1m1 0h3m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h4m2 0h2m3 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h1m3 0h1m2 0h2m1 0h1m1 0h1m1 0h1m1 0h4m2 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h3m1 0h1m6 0h3m1 0h1m2 0h1m1 0h1m-29 1h1m1 0h5m2 0h1m1 0h3m4 0h3m1 0h2m1 0h1m4 0h5m-31 1h1m4 0h1m2 0h6m5 0h1m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m-36 1h2m2 0h1m1 0h1m3 0h1m1 0h1m1 0h1m2 0h1m2 0h2m4 0h2m1 0h8m-35 1h1m2 0h1m2 0h3m2 0h2m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1m3 0h3m3 0h1m-37 1h2m1 0h1m2 0h1m3 0h1m1 0h2m3 0h1m4 0h1m1 0h2m1 0h1m1 0h2m1 0h5m-37 1h4m1 0h1m1 0h1m4 0h2m2 0h5m1 0h3m3 0h2m1 0h1m-32 1h5m1 0h5m3 0h4m2 0h2m5 0h1m1 0h1m1 0h3m1 0h2m-36 1h1m2 0h1m3 0h4m2 0h2m1 0h2m2 0h1m1 0h2m3 0h1m1 0h3m2 0h2m-37 1h3m1 0h1m1 0h2m2 0h1m3 0h1m1 0h1m2 0h1m2 0h4m3 0h2m1 0h1m1 0h2m-34 1h1m1 0h2m1 0h1m1 0h2m2 0h3m2 0h1m1 0h4m1 0h2m1 0h1m2 0h1m1 0h3m-34 1h2m1 0h3m4 0h5m2 0h1m1 0h2m1 0h1m1 0h3m1 0h3m2 0h2m-36 1h1m1 0h1m1 0h1m3 0h2m4 0h1m3 0h3m1 0h2m1 0h1m1 0h1m7 0h1m-35 1h2m2 0h1m2 0h1m1 0h5m1 0h1m1 0h1m2 0h1m1 0h3m2 0h2m1 0h3m-33 1h4m3 0h1m3 0h2m1 0h1m2 0h3m1 0h1m2 0h1m1 0h2m3 0h1m-30 1h1m1 0h1m2 0h1m1 0h2m2 0h2m1 0h1m2 0h2m4 0h2m1 0h4m2 0h1m-37 1h1m2 0h3m4 0h4m1 0h2m2 0h3m1 0h2m2 0h6m3 0h1m-37 1h1m1 0h1m1 0h5m1 0h1m4 0h1m2 0h2m2 0h1m2 0h1m1 0h1m1 0h4m1 0h3m-37 1h4m3 0h6m1 0h3m6 0h1m2 0h1m4 0h1m2 0h1m-35 1h1m1 0h1m2 0h2m1 0h2m2 0h3m2 0h1m3 0h1m2 0h2m1 0h2m1 0h2m2 0h3m-37 1h1m2 0h3m2 0h2m1 0h1m1 0h2m1 0h1m4 0h1m4 0h1m1 0h2m1 0h3m2 0h1m-37 1h1m1 0h2m1 0h2m4 0h1m2 0h1m1 0h3m3 0h1m1 0h3m1 0h5m1 0h1m-27 1h1m1 0h2m1 0h2m1 0h4m2 0h2m2 0h3m3 0h2m-34 1h7m2 0h3m3 0h1m1 0h1m3 0h2m3 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h1m1 0h1m1 0h3m2 0h3m1 0h2m1 0h1m3 0h1m3 0h2m2 0h1m-37 1h1m1 0h3m1 0h1m1 0h2m2 0h1m2 0h2m5 0h1m1 0h2m1 0h6m1 0h2m-36 1h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h1m1 0h2m2 0h1m1 0h1m3 0h4m1 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h3m4 0h2m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m2 0h2m1 0h1m1 0h2m4 0h3m4 0h3m2 0h2m2 0h1m-37 1h7m1 0h1m2 0h1m3 0h1m1 0h1m1 0h1m2 0h5m5 0h5\"/></svg>",
    weak: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 43 43\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m2 0h2m2 0h5m1 0h2m2 0h1m4 0h1m1 0h2m2 0h7m-41 1h1m5 0h1m3 0h2m2 0h1m2 0h1m2 0h3m2 0h1m1 0h4m3 0h1m5 0h1m-41 1h1m1 0h3m1 0h1m1 0h2m1 0h3m1 0h1m1 0h2m1 0h3m9 0h1m1 0h1m1 0h3m1 0h1m-41 1h1m1 0h3m1 0h1m1 0h2m1 0h3m1 0h1m3 0h1m2 0h1m1 0h4m1 0h1m4 0h1m1 0h3m1 0h1m-41 1h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h2m1 0h5m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1m1 0h3m1 0h1m-41 1h1m5 0h1m1 0h2m1 0h3m2 0h2m2 0h1m3 0h5m5 0h1m5 0h1m-41 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-33 1h1m7 0h1m1 0h2m1 0h4m2 0h2m1 0h3m-33 1h1m1 0h5m5 0h3m2 0h1m4 0h1m2 0h3m1 0h1m1 0h1m2 0h5m-39 1h2m5 0h2m3 0h3m2 0h3m2 0h2m1 0h1m2 0h1m2 0h6m1 0h3m-41 1h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m5 0h1m2 0h2m5 0h2m3 0h2m1 0h2m-36 1h2m4 0h2m2 0h2m2 0h2m2 0h1m1 0h2m3 0h3m2 0h2m1 0h1m2 0h1m2 0h1m-41 1h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h2m1 0h1m1 0h2m1 0h8m1 0h3m3 0h4m-40 1h1m1 0h3m2 0h1m1 0h2m2 0h1m3 0h1m2 0h1m1 0h1m4 0h2m1 0h6m1 0h3m-41 1h2m2 0h5m1 0h2m1 0h5m2 0h1m3 0h1m1 0h3m3 0h2m-34 1h1m3 0h2m1 0h1m2 0h1m1 0h1m1 0h2m5 0h2m3 0h2m6 0h2m1 0h1m1 0h2m-40 1h3m2 0h1m1 0h4m3 0h1m1 0h1m4 0h1m1 0h4m1 0h1m2 0h2m1 0h1m1 0h2m1 0h1m-41 1h4m1 0h1m1 0h1m2 0h1m1 0h1m2 0h1m2 0h2m3 0h1m4 0h2m1 0h1m2 0h7m-39 1h1m2 0h3m1 0h4m1 0h2m2 0h1m2 0h2m1 0h1m1 0h3m1 0h1m2 0h2m1 0h3m-37 1h1m1 0h1m3 0h1m2 0h4m5 0h2m1 0h2m2 0h1m2 0h1m5 0h1m2 0h1m-39 1h1m2 0h3m2 0h3m4 0h1m1 0h4m2 0h2m1 0h3m5 0h1m2 0h1m-39 1h1m1 0h1m1 0h2m3 0h1m1 0h1m1 0h2m1 0h1m2 0h3m1 0h1m1 0h1m2 0h1m1 0h11m-40 1h1m1 0h1m1 0h2m1 0h2m1 0h7m2 0h3m2 0h3m1 0h2m1 0h1m1 0h2m2 0h1m-37 1h2m1 0h1m1 0h4m2 0h3m4 0h2m8 0h3m1 0h1m1 0h2m1 0h1m-38 1h1m1 0h3m2 0h5m2 0h2m1 0h1m2 0h6m1 0h1m1 0h1m1 0h1m4 0h1m-39 1h4m1 0h1m1 0h1m1 0h2m2 0h1m2 0h5m2 0h3m2 0h1m2 0h1m2 0h4m1 0h2m-41 1h1m1 0h2m1 0h3m1 0h3m3 0h2m3 0h1m1 0h1m3 0h2m1 0h1m2 0h1m1 0h1m-33 1h2m3 0h3m1 0h1m2 0h3m1 0h2m1 0h2m8 0h2m3 0h2m-37 1h3m2 0h1m1 0h1m1 0h2m1 0h1m2 0h2m7 0h3m1 0h3m5 0h3m-40 1h1m1 0h1m1 0h1m2 0h3m1 0h3m4 0h1m1 0h4m4 0h1m1 0h5m1 0h2m1 0h2m-41 1h1m4 0h4m5 0h1m1 0h1m2 0h1m1 0h1m2 0h1m1 0h5m2 0h2m2 0h1m-38 1h1m1 0h1m5 0h1m1 0h3m3 0h1m2 0h4m1 0h1m3 0h1m3 0h3m1 0h2m-38 1h1m2 0h5m1 0h1m1 0h5m1 0h1m1 0h1m2 0h2m1 0h1m3 0h1m2 0h5m1 0h2m-32 1h1m2 0h2m1 0h8m1 0h1m1 0h1m2 0h1m2 0h2m3 0h3m1 0h1m-41 1h7m3 0h5m1 0h2m3 0h1m3 0h3m1 0h4m1 0h1m1 0h3m-39 1h1m5 0h1m1 0h2m1 0h1m3 0h1m1 0h2m1 0h2m5 0h1m2 0h1m1 0h1m3 0h2m-38 1h1m1 0h3m1 0h1m1 0h4m7 0h1m1 0h1m1 0h5m1 0h1m2 0h5m1 0h3m-41 1h1m1 0h3m1 0h1m1 0h2m2 0h1m4 0h3m1 0h1m1 0h3m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m-41 1h1m1 0h3m1 0h1m1 0h5m3 0h1m4 0h1m2 0h1m2 0h4m2 0h5m-38 1h1m5 0h1m2 0h3m3 0h2m3 0h3m3 0h3m3 0h1m1 0h1m1 0h2m1 0h1m-40 1h7m1 0h3m1 0h2m1 0h1m1 0h1m4 0h1m1 0h3m1 0h2m4 0h5\"/></svg>",
    today: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\" class=\"segno\"><path class=\"qrline\" stroke=\"#0B1530\" d=\"M1 1.5h7m3 0h3m4 0h7m1 0h1m2 0h1m1 0h7m-37 1h1m5 0h1m3 0h2m1 0h1m1 0h3m4 0h1m4 0h2m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h2m3 0h3m3 0h2m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1m2 0h1m4 0h5m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h3m1 0h1m3 0h4m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h1m1 0h1m1 0h1m1 0h1m5 0h1m3 0h4m2 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-29 1h1m1 0h2m2 0h1m4 0h3m1 0h1m2 0h1m1 0h1m-29 1h1m1 0h5m3 0h2m1 0h1m1 0h1m1 0h1m1 0h2m1 0h4m4 0h5m-35 1h2m2 0h2m1 0h1m1 0h2m1 0h2m1 0h6m2 0h2m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m-36 1h3m3 0h1m3 0h1m6 0h1m3 0h1m4 0h2m1 0h8m-36 1h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m3 0h1m1 0h1m2 0h2m1 0h1m1 0h1m3 0h3m3 0h1m-37 1h2m1 0h1m1 0h2m2 0h1m3 0h1m3 0h1m1 0h1m2 0h4m1 0h1m1 0h2m1 0h5m-37 1h1m4 0h1m3 0h1m2 0h3m1 0h9m3 0h2m1 0h1m-32 1h2m2 0h6m3 0h4m3 0h3m4 0h1m1 0h1m1 0h3m1 0h2m-37 1h4m1 0h1m4 0h1m1 0h4m2 0h1m2 0h4m3 0h1m1 0h3m2 0h2m-34 1h2m1 0h2m2 0h4m2 0h1m1 0h2m2 0h2m1 0h1m3 0h2m1 0h1m1 0h2m-36 1h4m1 0h1m3 0h1m2 0h1m2 0h1m2 0h6m1 0h2m1 0h1m2 0h1m1 0h3m-33 1h6m1 0h2m1 0h4m4 0h2m3 0h3m1 0h3m2 0h2m-35 1h4m1 0h3m1 0h2m1 0h2m3 0h3m2 0h1m1 0h1m1 0h1m7 0h1m-37 1h2m4 0h5m1 0h2m1 0h1m1 0h1m1 0h1m2 0h1m1 0h3m2 0h2m1 0h3m-33 1h4m1 0h1m2 0h1m2 0h1m2 0h1m2 0h3m1 0h1m2 0h1m1 0h2m3 0h1m-33 1h2m2 0h6m1 0h1m2 0h2m1 0h1m3 0h1m4 0h2m1 0h4m2 0h1m-34 1h2m3 0h2m1 0h1m1 0h1m1 0h2m1 0h4m1 0h2m2 0h6m3 0h1m-36 1h1m1 0h2m1 0h3m2 0h2m2 0h1m2 0h2m2 0h1m1 0h2m1 0h1m1 0h4m1 0h3m-37 1h2m3 0h1m1 0h1m1 0h2m2 0h4m1 0h2m3 0h1m2 0h1m4 0h1m2 0h1m-35 1h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h2m2 0h1m2 0h2m2 0h2m1 0h2m1 0h2m2 0h3m-37 1h1m1 0h1m1 0h1m2 0h2m3 0h1m1 0h1m1 0h1m2 0h3m4 0h1m1 0h2m1 0h3m-34 1h1m1 0h12m2 0h3m3 0h1m1 0h3m1 0h5m1 0h2m-28 1h3m2 0h1m2 0h4m2 0h2m2 0h3m3 0h2m-34 1h7m5 0h2m1 0h1m1 0h1m3 0h1m4 0h1m1 0h1m1 0h1m1 0h1m1 0h3m-37 1h1m5 0h1m1 0h1m4 0h1m3 0h3m1 0h2m1 0h1m3 0h1m3 0h2m2 0h1m-37 1h1m1 0h3m1 0h1m1 0h4m3 0h2m3 0h1m1 0h1m1 0h2m1 0h6m1 0h2m-36 1h1m1 0h3m1 0h1m1 0h1m3 0h4m1 0h5m1 0h1m3 0h4m1 0h1m3 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h2m3 0h3m3 0h2m1 0h1m3 0h1m1 0h2m-37 1h1m5 0h1m3 0h1m1 0h2m1 0h1m4 0h3m4 0h3m2 0h2m2 0h1m-37 1h7m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m4 0h5m5 0h5\"/></svg>",
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
  /* The week that is open now. bio005-nav.js publishes it as
     window.BIO005_SITE; when the dock runs on a page without the nav the
     dates are worked out here from the same calendar. */
  var chosenWeek = 0;   /* 0 means "the week that is open now" */
  function calendarWeekN() {
    if (window.BIO005_SITE && window.BIO005_SITE.current) return window.BIO005_SITE.current.n;
    var start = new Date(2026, 8, 7).getTime(), now = Date.now();
    return Math.max(1, Math.min(15, Math.floor((now - start) / (7 * 86400000)) + 1));
  }
  function currentWeekN() {
    if (chosenWeek) return chosenWeek;
    if (window.BIO005_SITE && window.BIO005_SITE.current) return window.BIO005_SITE.current.n;
    var start = new Date(2026, 8, 7).getTime(), now = Date.now();
    return Math.max(1, Math.min(15, Math.floor((now - start) / (7 * 86400000)) + 1));
  }
  function currentWeekTitle(n) {
    var W = window.BIO005_SITE && window.BIO005_SITE.weeks; if (W && W[n - 1] && W[n - 1].n === n) return W[n - 1].title || '';
    return '';
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* One definition per tool. tone drives the icon gradient. */
  /*LINE-STEPS*/ var LINE_STEPS = {"4": {"entry": "week-04-entry.html", "steps": [{"key": "preread", "title": "Pre-read", "time": "30 min max", "what": "Look over the chapter before you learn it: the figures and the bold terms. Then fill in the pre-read worksheet. Stop at 30 minutes.", "pages": [{"label": "Pre-read and worksheet", "href": "week-04-preread.html", "desc": "The figures, the bold terms, and the pre-read worksheet you turn in. Already printed it? You do not need to print it again.", "opt": false}]}, {"key": "first", "title": "First pass", "time": "3 to 4 hours", "what": "Work through the walkthroughs in order, typing each prediction into the worksheet on the right before you press Show me. Then use the written notes to fill in your Competency Study Guide in your first color.", "pages": [{"label": "Competency Study Guide", "href": "note-sheet.html?week=4", "desc": "Your worksheet for the week. Print it, or work the same prompts on your own paper. Already printed it from the Start here page? You do not need to print it again.", "opt": false}, {"label": "Walkthroughs and slides", "href": "lecture-week.html?week=4", "desc": "The Week 4 lessons in order, starting with the walkthroughs. Short Khan Academy videos sit inside each walkthrough, on the steps they match: press Stuck? Watch a short explanation. Opens Monday, September 28 at 8:00 am.", "opt": false}, {"label": "Written notes", "href": "week-04-notes.html", "desc": "Notes for each walkthrough in bullets, definitions and sequences, to study from after the walkthrough. Read them on screen, or print them: the PDF link is at the top of the notes page. If you already printed the notes, you do not need to print them again.", "opt": false}]}, {"key": "second", "title": "Second pass", "time": "30 to 60 min", "what": "Go back through the same walkthroughs, slides and notes from First pass. Add to your Competency Study Guide in a second color.", "pages": []}, {"key": "upload", "title": "Upload your guide", "time": "10 min", "what": "Upload the Competency Study Guide you printed at the start of the week, or your own labeled pages, now filled in with both colors from Steps 2 and 3. Scan or photograph every page, combine them into one PDF, and upload it to the Step 4 assignment in Canvas.", "pages": [{"label": "Upload your guide in Canvas", "href": "https://yccd.instructure.com/courses/42616/modules/items/2714381", "desc": "The Week 4, Step 4 assignment. Upload one PDF with every page, competency 1 first.", "opt": false}, {"label": "How the Competency Study Guide works", "href": "assignment-notesheet.html?week=4", "desc": "What to scan and how to make one PDF", "opt": true}]}, {"key": "study", "title": "Study it", "time": "4 sessions of 30 to 45 min", "what": "Pull the week back out of memory. Spread it over at least four days instead of one sitting.", "pages": [{"label": "Rx Cards", "href": "rx-cards.html?week=4&only=1", "desc": "At least 20 cards a session and 60 cards a week", "opt": false}, {"label": "Brain Dump", "href": "competency-brain-dump.html?week=4", "desc": "Pick a competency, close everything, write or draw all you can, then check it", "opt": false}]}, {"key": "check", "title": "Mastery Check", "time": "30 to 50 min per try, at least 3 tries", "what": "Take the Mastery Check, about 30 questions a try. Do at least 3 tries with Study it in between, and aim for 80 percent before you stop. You can always do more. Turn in the report from every try.", "pages": [{"label": "Mastery Check", "href": "practice-exam.html?week=4&n=30", "desc": "Set to Week 4 and 30 questions. Each try is a fresh set.", "opt": false}, {"label": "How to submit your reports", "href": "assignment-practice-log.html", "desc": "Save each report as a PDF, or print your weekly practice log, which has every try in one PDF", "opt": false}]}, {"key": "lab", "title": "The lab", "time": "2 to 3 hours", "what": "Run PhysioEx, then fill in the lab worksheet and turn it in.", "pages": [{"label": "PhysioEx lab", "href": "assignment-physioex.html?week=4", "desc": "The simulation and what to record", "opt": false}, {"label": "Lab worksheet", "href": "lab-worksheet-week04.html", "desc": "Where your results and answers go. Already printed it? You do not need to print it again.", "opt": false}]}, {"key": "case", "title": "Your patient, in Rounds", "time": "About 1 hour 30 min", "what": "Rounds is Camila's online chart, laid out like a hospital record. Follow the steps down the left side: predict first, file the numbers, answer the five questions and your entry point's question, and write your note. You type everything, so nothing is printed.", "pages": [{"label": "Rounds: Week 4", "href": "patient-rounds.html?week=4", "desc": "Everything for the case is here. Weeks 1 to 3 are already filed from your paper chart.", "opt": false}]}, {"key": "patient", "title": "Check your chart", "time": "About 10 min", "what": "A quick check. In Rounds, click My entries and finish anything that says Not written yet. Then sign and click Export this week to PDF, and save it. You upload the whole chart once, in the week of Midterm 1.", "pages": [{"label": "Rounds: Week 4", "href": "patient-rounds.html?week=4", "desc": "Click My entries on the right to see anything still empty.", "opt": false}]}, {"key": "discussion", "title": "Exam practice and Discussion 4", "time": "About 2 hours", "what": "Two timed quizzes, one question each. In each, you record on Studio inside the quiz: 15 minutes building your model from memory on a whiteboard, then 5 to 7 minutes teaching it. Your videos go to me only, graded complete or incomplete. Then post your meta-analysis in Discussion 4 and reply to two classmates.", "pages": [{"label": "Directions for the exam practice", "href": "discussion-week04.html", "desc": "Read these first: what you need, the timing, the steps and how it is graded. Your Discussion 4 prompt is here too.", "opt": false}, {"label": "Exam practice, Question 1 (timed quiz)", "href": "https://yccd.instructure.com/courses/42616/quizzes/384885", "desc": "28 minutes from the moment it opens. Be set up and recording-ready before you open it.", "opt": false}, {"label": "Exam practice, Question 2 (timed quiz)", "href": "https://yccd.instructure.com/courses/42616/quizzes/384886", "desc": "Opens after you submit Question 1.", "opt": false}]}]}, "5": {"entry": "week-05-entry.html", "steps": [{"key": "preread", "title": "Pre-read", "time": "30 min max", "what": "Look over the chapter before you learn it: the figures and the bold terms. Then fill in the pre-read worksheet. Stop at 30 minutes.", "pages": [{"label": "Pre-read and worksheet", "href": "week-05-preread.html", "desc": "The headings, the figures, and the pre-read worksheet you turn in. Already printed it? You do not need to print it again.", "opt": false}]}, {"key": "first", "title": "First pass", "time": "3 to 4 hours", "what": "Work through the six walkthroughs in order, typing each prediction into the worksheet on the right before you press Show me. Then use the written notes to fill in your Competency Study Guide in your first color.", "pages": [{"label": "Competency Study Guide", "href": "note-sheet.html?week=5", "desc": "Your worksheet for the week. Print it, or work the same prompts on your own paper. Already printed it from the Start here page? You do not need to print it again.", "opt": false}, {"label": "Walkthroughs", "href": "lecture-week.html?week=5", "desc": "The six Week 5 walkthroughs, in order. Opens Monday, October 5 at 8:00 am.", "opt": false}, {"label": "Written notes", "href": "week-05-notes.html", "desc": "Notes for each walkthrough in bullets, definitions and sequences, to study from after the walkthrough. Read them on screen, or print them: the PDF link is at the top of the notes page. If you already printed the notes, you do not need to print them again.", "opt": false}]}, {"key": "second", "title": "Second pass", "time": "30 to 60 min", "what": "Go back through the same walkthroughs and notes from First pass. Add to your Competency Study Guide in a second color.", "pages": []}, {"key": "upload", "title": "Upload your guide", "time": "10 min", "what": "Upload the Competency Study Guide you printed at the start of the week, or your own labeled pages, now filled in with both colors from Steps 2 and 3. Scan or photograph every page, combine them into one PDF, and upload it to the Step 4 assignment in Canvas.", "pages": [{"label": "Upload your guide in Canvas", "href": "https://yccd.instructure.com/courses/42616/modules", "desc": "The Week 5, Step 4 assignment, in the Week 5 module. Upload one PDF with every page, competency 1 first.", "opt": false}, {"label": "How the Competency Study Guide works", "href": "assignment-notesheet.html?week=5", "desc": "What to scan and how to make one PDF", "opt": true}]}, {"key": "study", "title": "Study it", "time": "4 sessions of 30 to 45 min", "what": "Pull the week back out of memory. Spread it over at least four days instead of one sitting.", "pages": [{"label": "Rx Cards", "href": "rx-cards.html?week=5&only=1", "desc": "At least 20 cards a session and 60 cards a week", "opt": false}, {"label": "Brain Dump", "href": "competency-brain-dump.html?week=5", "desc": "Pick a competency, close everything, write or draw all you can, then check it", "opt": false}]}, {"key": "check", "title": "Mastery Check", "time": "30 to 50 min per try, at least 3 tries", "what": "Take the Mastery Check, about 30 questions a try. Do at least 3 tries with Study it in between, and aim for 80 percent before you stop. You can always do more. Turn in the report from every try.", "pages": [{"label": "Mastery Check", "href": "practice-exam.html?week=5&n=30", "desc": "Set to Week 5 and 30 questions. Each try is a fresh set.", "opt": false}, {"label": "How to submit your reports", "href": "assignment-practice-log.html", "desc": "Save each report as a PDF, or print your weekly practice log, which has every try in one PDF", "opt": false}]}, {"key": "lab", "title": "The lab", "time": "2 to 3 hours", "what": "There is no PhysioEx this week. Run the tests on yourself with the sensory and reflex lab, record your data, and turn it in.", "pages": [{"label": "Sensory and reflex lab", "href": "lab-week05-sensory-reflex.html", "desc": "Three pages to print, the tests to run, and the tables for your data. Print page 3 at 100 percent.", "opt": false}]}, {"key": "case", "title": "Your patient, in Rounds", "time": "About 1 hour 30 min", "what": "Rounds is Camila's online chart, laid out like a hospital record. Follow the steps down the left side: predict first, file the numbers, answer the five questions and your entry point's question, and write your note. You type everything, so nothing is printed.", "pages": [{"label": "Rounds: Week 5", "href": "patient-rounds.html?week=5", "desc": "Everything for the case is here. Your earlier weeks are already filed.", "opt": false}]}, {"key": "patient", "title": "Check your chart", "time": "About 10 min", "what": "A quick check. In Rounds, click My entries and finish anything that says Not written yet. Then sign and click Export this week to PDF, and save it. You upload the whole chart once, in the week of Midterm 1.", "pages": [{"label": "Rounds: Week 5", "href": "patient-rounds.html?week=5", "desc": "Click My entries on the right to see anything still empty.", "opt": false}]}, {"key": "discussion", "title": "Exam practice and Discussion 5", "time": "About 2 hours", "what": "Two parts. In Discussion 5 you check last week's two practice videos against the rubrics and the key, post your scores and analysis, and reply to two classmates. Then two new timed quizzes on this week's material, one question each, recorded on Studio inside the quiz the same way as last week: 15 minutes building your model from memory, then 5 to 7 minutes teaching it. Your videos go to me only.", "pages": [{"label": "Discussion 5, exam practice part 2", "href": "discussion-week05.html", "desc": "Score last week's videos and post your analysis. The rubrics and the key are in the Canvas discussion.", "opt": false}, {"label": "Exam practice, Questions 1 and 2 (timed quizzes)", "href": null, "desc": "In the Week 5 module in Canvas. Same directions and timing as last week: 28 minutes each, and Question 2 opens after you submit Question 1.", "opt": false}]}]}}; /*END-LINE-STEPS*/

  /* Sep 27 2026, Scrubs: from Week 4 on, a week is one straight line of ten
     steps. For those weeks the dock's groups ARE the steps, in order, each
     holding the same pages the week's steps page lists, so the dock and
     the week never disagree. Weeks 1 to 3 keep the four stages below.
     LINE_STEPS is written by tools/build_week_entry.py. */
  function lineTools(wn, nn, wt, TW) {
    var L = LINE_STEPS[wn], t = [];
    var ICON = { preread: 'doc', first: 'play', second: 'pencil', upload: 'doc', study: 'cards', check: 'target',
                 lab: 'flask', 'case': 'target', patient: 'doc', discussion: 'people' };
    t.push({ g: TW, name: 'Week ' + wn + ' steps' + (chosenWeek ? '' : ', this week'), sub: (wt ? wt + '. ' : '') + 'All ten steps in order, with the pages for each',
             url: BASE + L.entry, icon: 'target', tone: 'gold', qr: 'today',
             kw: 'this week today now week page current steps line order' });
    t.push({ g: TW, name: 'Course calendar', sub: 'Every week, every due date, every exam window',
             url: BASE + 'course-schedule.html', icon: 'cal', tone: 'navy', qr: 'calendar',
             kw: 'calendar schedule dates due deadlines weeks exam window when' });
    L.steps.forEach(function (s, i) {
      var g = 'Step ' + (i + 1) + '. ' + s.title;
      if (!s.pages.length) {
        t.push({ g: g, name: s.title, sub: s.what + ' (' + s.time + ')', url: BASE + L.entry + '#s-' + s.key,
                 icon: ICON[s.key] || 'doc', tone: 'navy', kw: s.title + ' ' + s.what });
        return;
      }
      s.pages.forEach(function (p, j) {
        var ext = !!(p.href && /^https?:/.test(p.href));
        t.push({ g: g, name: p.label + (p.opt ? ' (optional)' : ''), sub: p.desc || (j === 0 ? s.what : s.title),
                 url: p.href ? (ext ? p.href : BASE + p.href) : '', ext: ext,
                 icon: ICON[s.key] || 'doc', tone: j % 2 ? 'terra' : (j ? 'navy' : 'gold'),
                 kw: s.title + ' ' + p.label + ' ' + (p.desc || '') + ' ' + s.what });
      });
    });
    var MO = 'More for any week';
    t.push({ g: MO, name: 'Every week\'s lectures', sub: 'All fifteen weeks, by week', url: BASE + 'door-lecture.html', icon: 'play', tone: 'navy',
             kw: 'lectures all weeks library videos' });
    t.push({ g: MO, name: 'Kahoot library', sub: 'Dr. Rennie\'s Kahoots. Physiology sets get added through the term',
             url: 'https://drsrennie-stack.github.io/new-build-bio4-solano/kahoots.html', icon: 'play', tone: 'gold', ext: true, kw: 'kahoot kahoots quiz game review play' });
    return t;
  }

  function aboutTools() {
    var t = [];
    /* ---------- ABOUT THE COURSE ---------- */
    t.push({ g: 'About the course', name: 'Course home', sub: 'The front of the course',
             url: BASE + 'course.html', icon: 'home', tone: 'navy', qr: 'home',
             kw: 'home hub front start main course' });
    t.push({ g: 'About the course', name: 'How this course works', sub: 'How every week works, step by step',
             url: BASE + 'weekly-loop.html', icon: 'target', tone: 'gold',
             kw: 'how course works stages learn practice apply check intro' });
    t.push({ g: 'About the course', name: 'Syllabus', sub: 'Policies, dates, exam windows',
             url: BASE + 'syllabus-fall2026.html', icon: 'doc', tone: 'navy',
             kw: 'syllabus policy rules grading late work ai policy contact' });
    t.push({ g: 'About the course', name: 'Questions and answers', sub: 'The questions students ask most',
             url: BASE + 'course-questions.html', icon: 'doc', tone: 'terra',
             kw: 'questions answers faq help how do i' });
    t.push({ g: 'About the course', name: 'Accessibility', sub: 'How this was built, what was checked, what is still open',
             url: BASE + 'accessibility.html', icon: 'target', tone: 'terra',
             kw: 'accessibility access screen reader contrast keyboard captions dsps accommodation wcag' });
    t.push({ g: 'About the course', name: 'Virtual Office', sub: 'Ask (or Offer) Help in Canvas, where the whole class sees the answer',
             url: 'https://yccd.instructure.com/courses/42616/discussion_topics/711800', icon: 'people', tone: 'terra', ext: true,
             kw: 'office hours ask question help contact instructor forum' });
    t.push({ g: 'About the course', name: 'Canvas', sub: 'Turn work in, see grades',
             url: 'https://yccd.instructure.com/courses/42616/modules', icon: 'globe', tone: 'navy', qr: 'canvas', ext: true,
             kw: 'canvas grades submit turn in lms' });

    return t;
  }

  function tools() {
    var t = [];
    var wn = currentWeekN(), nn = pad2(wn), wt = currentWeekTitle(wn);
    var TW = chosenWeek ? 'Week ' + wn : 'This week';
    if (LINE_STEPS[wn]) return lineTools(wn, nn, wt, TW).concat(aboutTools());

    /* ============================================================
       CATALOG, REORGANIZED Sep 13 2026 ON SCRUBS' INSTRUCTION

       The groups are the four stages every week page uses, in the
       order a student works them, with This week pinned open on top
       and About the course at the bottom. Every week-specific tile
       points at the week that is open now, so the dock changes by
       itself every Monday.

         This week     the page you are on this week, and what is live
         1 Learn       what I teach, and the reviews if you need them
         2 Practice    getting it back: cards, dumps, drawing, problems
         3 Apply       the graded work, and the patient file
         4 Check       the Mastery Check and the report
         About         syllabus, schedule, help
       ============================================================ */

    /* ---------- STUDY TOOLS. Sep 25 2026, Scrubs: the study tools
       sit on top, open by default, so none of them is ever two groups
       deep. They moved here from This week, Practice and Check rather
       than being copied, so nothing appears twice. ---------- */
    var ST = 'Study tools';
    t.push({ g: ST, name: 'Rx Cards', sub: 'Spaced recall that gets harder as you prove it',
             url: BASE + 'rx-cards.html?week=' + wn, icon: 'cards', tone: 'gold', qr: 'recall',
             kw: 'cards recall rx flashcards spaced repetition quiz retrieval practice anki study tools' });
    t.push({ g: ST, name: 'Brain Dump', sub: 'Spin a random competency, do it from memory, then check it against its list',
             url: BASE + 'competency-brain-dump.html', icon: 'brain', tone: 'navy',
             kw: 'brain dump braindump randomizer random spin rubric check memory blank page retrieve recall write study tools' });
    t.push({ g: ST, name: 'Mastery Check', sub: 'About 30 questions a try, at least 3 tries, aim for 80 percent, nothing open, and the reports you upload',
             url: BASE + 'practice-exam.html?week=' + wn + (wn === 8 ? '' : '&n=50'), icon: 'target', tone: 'gold', qr: 'mastery',
             kw: 'mastery check practice exam gap finder test questions score report study tools' });
    t.push({ g: ST, name: 'Draw It to Know It', sub: 'Draw a mechanism from memory, then check what you covered',
             url: BASE + 'mastery-physio-os-standalone.html?week=' + wn + '&open=drawknow', icon: 'pencil', tone: 'terra',
             kw: 'draw it to know it drawing canvas memory mechanism sketch diagram map study tools' });

    /* ---------- THIS WEEK. Open by default, on purpose. ---------- */
    t.push({ g: TW, name: 'Week ' + wn + (chosenWeek ? '' : ', this week'), sub: wt || 'The week page: all four stages, in order',
             url: BASE + 'week-' + nn + '.html', icon: 'target', tone: 'gold', qr: 'today',
             kw: 'this week today now week page current stages' });
    t.push({ g: TW, name: 'Course calendar', sub: 'Every week, every due date, every exam window',
             url: BASE + 'course-schedule.html', icon: 'cal', tone: 'navy', qr: 'calendar',
             kw: 'calendar schedule dates due deadlines weeks exam window when' });

    /* ---------- 1 LEARN, in the order of record: book first, then the lectures ---------- */
    t.push({ g: '1 Learn', name: 'Competencies', sub: 'What you have to be able to do this week',
             url: BASE + 'week-' + nn + '-competencies.html', icon: 'target', tone: 'navy',
             kw: 'competencies competency list objectives what to know checklist' });
    t.push({ g: '1 Learn', name: 'Competency Study Guide', sub: 'Pass 1 in your first color with the lessons, pass 2 in a second color',
             url: BASE + 'note-sheet.html?week=' + wn, icon: 'pencil', tone: 'gold',
             kw: 'Competency Study Guide notesheet boxes competency print handwritten journal' });
    t.push({ g: '1 Learn', name: 'Learn It With Dr. Rennie', sub: 'This week\'s lessons and videos, in order',
             url: BASE + 'lecture-week.html?week=' + wn, icon: 'play', tone: 'terra',
             kw: 'lecture lectures video watch slides teach week' });
    t.push({ g: '1 Learn', name: 'Notes', sub: 'The written version of what I teach, for reading and rereading',
             url: BASE + 'week-' + nn + '-notes.html', icon: 'doc', tone: 'navy',
             kw: 'notes reading written text week' });
    t.push({ g: '1 Learn', name: 'Every week\'s lectures', sub: 'All fifteen weeks, by week',
             url: BASE + 'door-lecture.html', icon: 'play', tone: 'navy',
             kw: 'lectures all weeks library videos' });

    /* ---------- 2 PRACTICE ---------- */
    /* Sep 24 2026: book problems were dropped from Week 4 on; Weeks 1 to 3 keep them. */
    if (wn < 4) t.push({ g: '2 Practice', name: 'Book problems', sub: 'Problems you have not seen. Predict, commit, then check',
             url: BASE + 'assignment-bookproblems.html?week=' + wn, icon: 'doc', tone: 'navy',
             kw: 'book problems textbook silverthorn questions chapter' });
    t.push({ g: '2 Practice', name: 'Kahoot library', sub: 'Dr. Rennie\'s Kahoots. Physiology sets get added through the term',
             url: 'https://drsrennie-stack.github.io/new-build-bio4-solano/kahoots.html', icon: 'play', tone: 'gold', ext: true,
             kw: 'kahoot kahoots quiz game review play' });

    /* ---------- 3 APPLY ---------- */
    /* Sep 24 2026: Week 8 is the Midterm 1 week, no teaching, no lab, case or discussion. */
    if (wn === 8) t.push({ g: '3 Apply', name: 'Midterm 1', sub: 'In Canvas, Thursday Oct 29 8:00 am to Sunday Nov 1 10:00 pm. Show Me What You Know, 17.5%',
             url: BASE + 'week-08.html#apply', icon: 'target', tone: 'gold',
             kw: 'midterm exam test draw teach video window' });
    if (wn !== 8) t.push({ g: '3 Apply', name: 'This week\'s lab', sub: 'What to run, what to record, and how to turn it in. Investigate It, 25%',
             url: BASE + (wn >= 3 ? 'assignment-physioex.html?week=' + Math.max(wn, 4) : 'week-' + nn + '.html#apply'), icon: 'flask', tone: 'gold',
             kw: 'lab physioex worksheet investigate data record turn in' });
    if (wn !== 8) t.push({ g: '3 Apply', name: wn >= 3 ? 'Your patient: case and chart' : 'Use It case',
             sub: wn >= 3 ? 'This week\'s patient case and your chart, together in Rounds' : 'This week\'s case on your patient, five questions. Use It, 20%',
             url: BASE + (wn >= 3 ? 'patient-rounds.html?week=' + Math.max(wn, 4) : 'assignment-apply.html?week=' + wn), icon: 'target', tone: 'terra',
             kw: 'use it case apply patient questions entry point weekly' });
    if (wn !== 8) t.push({ g: '3 Apply', name: 'Discussion', sub: 'Post by Friday, two replies by Sunday. Think About It, 15%',
             url: BASE + (wn === 1 ? 'assignment-discussion-01-metacognition.html' : 'assignment-discussion.html?week=' + wn), icon: 'people', tone: 'navy',
             kw: 'discussion post reply metacognition think about it' });

    /* ---------- PATIENT FILE ---------- */

    /* ---------- 4 CHECK ---------- */
    t.push({ g: '4 Check', name: 'Competency checklist', sub: 'Tick what you can do from memory',
             url: BASE + 'week-' + nn + '-competencies.html', icon: 'doc', tone: 'navy',
             kw: 'checklist competencies tick ready' });

    return t.concat(aboutTools());

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
'html.bd-has-dock .b5-back{bottom:76px !important}',
'@media(max-width:520px){html.bd-has-dock .b5-back{bottom:78px !important}}',
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
'.bd-wk{display:inline-flex;align-items:center;gap:8px;margin-left:2px}',
'.bd-wkl{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#F2E2B8}',
'.bd-wksel{font:700 13.5px/1.2 "Plus Jakarta Sans",system-ui,sans-serif;color:#fff;background:rgba(255,255,255,.10);',
'  border:1.5px solid rgba(255,255,255,.35);border-radius:9px;padding:8px 10px;min-height:40px;max-width:min(52vw,360px);cursor:pointer}',
'.bd-wksel option{color:#0B1530;background:#fff}',
'.bd-wksel:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}',
'@media(max-width:520px){.bd-wkl{display:none}.bd-wksel{max-width:44vw}}',
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
'.bd-ic.gold{background:linear-gradient(145deg,#C9A14A,#A87F2E);color:#0B1530}',
'.bd-ic.terra{background:linear-gradient(145deg,#8B3A2E,#8B3A2E);color:#fff}',
'/* Was a sage-teal, which is not in the palette. Terra, like every other accent. */',
'.bd-ic.green{background:linear-gradient(145deg,#8B3A2E,#8B3A2E);color:#fff}',
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
'.bd-tile.soon .bd-s{color:#AEB8C6;opacity:1}',   /* was #98A3B4 at 5.95:1 on the tile, under AA for small text. 7.57:1 now. */
'.bd-tile.soon .bd-ic{filter:grayscale(.75)}',
'.bd-soon{display:inline-block;margin-left:7px;font-size:9.5px;font-weight:800;letter-spacing:.08em;white-space:nowrap;',
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

  /* COURSE TOOLS IS OFF, SEPTEMBER 8 2026.

     Scrubs asked for the launcher pill to come out for now. It is a
     switch rather than a deletion because the rest of this file is
     load bearing: solo frame mode, the target="_top" interception and
     BIO005_CONTENT_HEIGHT all live here and every page's height sender
     calls them. Removing the script tag would take those with it.

     Set this back to true to bring the pill back on all pages at once. */
  var SHOW_DOCK = true;   /* back on, Sep 13 2026, regrouped by the four stages */

  function build() {
    if (!SHOW_DOCK) return;
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

    /* The Back pill (bio005-back.js) shares this corner and usually loads
       first, so it cannot see the launcher when it measures. Lift it above
       the launcher here, the same 12px gap it uses itself. */
    document.documentElement.classList.add('bd-has-dock');

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
      '<label class="bd-wk"><span class="bd-wkl">Week</span><select class="bd-wksel" aria-label="Which week\'s tools to show"></select></label>' +
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

    /* THE WEEK PICKER. Every week-specific tile points at the week that is
       open now. A student who wants last week's notes, Competency Study Guide, cards
       or case picks that week here and every tile in the dock follows.
       Only weeks that have opened are listed; the choice lasts while the
       page is open and goes back to the current week next time. */
    var wksel = panel.querySelector('.bd-wksel');
    function fillWeeks() {
      var cw = calendarWeekN(), html = '';
      for (var n = 1; n <= cw; n++) {
        var t = currentWeekTitle(n);
        html += '<option value="' + n + '"' + (n === (chosenWeek || cw) ? ' selected' : '') + '>' + n + (n === cw ? ' (this week)' : '') + (t ? ': ' + t : '') + '</option>';
      }
      wksel.innerHTML = html;
    }
    fillWeeks();
    wksel.addEventListener('change', function () {
      var n = parseInt(wksel.value, 10);
      chosenWeek = (n === calendarWeekN()) ? 0 : n;
      render(input.value);
      live.textContent = 'Showing Week ' + n + ' tools';
    });

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
    /* Study tools and This week are the first two groups, and both start open. */
    return Object.prototype.hasOwnProperty.call(st, g) ? !!st[g] : (i <= 1);
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

    /* SOON TILES STAY IN THEIR OWN GROUP. Reversed Aug 2026.

       This used to hoist everything flagged soon into one Coming soon
       heap at the end, on the reasoning that working tools should not
       be interleaved with ones that do not work. That reasoning holds
       when three things are unfinished. It fails at twenty one: the
       dock became one long Coming soon pile with four nearly empty
       headings above it, and the Lecture, Lab, Study and Admin shape
       stopped being visible at all.

       The shape is the point. A student who opens the dock in week 1
       should see what the course is made of, including the parts that
       are not switched on yet. Inside each group the ready tiles sort
       first and the soon ones follow, so nothing working is buried,
       and every soon tile still says Soon and is not a link. */

    var groups = [], seen = {};
    list.forEach(function (t) { if (!seen[t.g]) { seen[t.g] = []; groups.push(t.g); } seen[t.g].push(t); });

    /* Group ORDER comes from the catalog, so Lecture, Lab, Study and Admin
       stay in that order even when a whole group is still unbuilt. Only the
       tiles INSIDE a group are reordered, ready first and soon after. A
       global sort would have done both and pushed Lab to the bottom for
       having nothing switched on yet, which is the opposite of the point. */
    groups.forEach(function (g) {
      seen[g].sort(function (a, b) { return (b5Pending(a) ? 1 : 0) - (b5Pending(b) ? 1 : 0); });
    });

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
        var b5p = b5Pending(t);
        if (b5p) {
          html += '<div class="bd-cell"><div class="bd-tile soon">' +
            '<span class="bd-ic ' + t.tone + '">' + icon(t.icon) + '</span>' +
            '<span class="bd-tx"><span class="bd-n">' + esc(t.name) +
              '<span class="bd-soon">' + esc(b5p) + '</span></span>' +
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

  /* Open straight to one group: the top bar's stage buttons call this.
     Only that group is expanded, it is scrolled into view, and focus
     lands on its heading so a keyboard user hears where they are. */
  function openTo(group) {
    if (!panel) return;
    var all = [];
    tools().forEach(function (t) { if (all.indexOf(t.g) < 0) all.push(t.g); });
    all.forEach(function (g) { setGroupOpen(g, g === group); });
    show();
    window.setTimeout(function () {
      var h = body.querySelector('.bd-gh[data-grp="' + group.replace(/"/g, '\\"') + '"]');
      if (h) { h.scrollIntoView({ block: 'start' }); h.focus(); }
    }, 90);
  }
  window.BIO005_DOCK = { open: openTo, show: function () { show(); }, close: close };

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
    chosenWeek = 0;
    if (panel.querySelector('.bd-wksel')) { var ws = panel.querySelector('.bd-wksel'); ws.innerHTML = ''; (function(){ var cw = calendarWeekN(), h=''; for (var n=1;n<=cw;n++){ var t=currentWeekTitle(n); h+='<option value="'+n+'"'+(n===cw?' selected':'')+'>'+n+(n===cw?' (this week)':'')+(t?': '+t:'')+'</option>'; } ws.innerHTML=h; }()); }
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
  /* DATA AND ENGINE SEPARATED, Sep 7 2026.
     This used to bail out entirely on `if (window.BIO005_HOOTIE) return`.
     That is correct for the engine and wrong for the data. The two
     standalone pages, rx-cards.html and
     unit-05-standalone.html, inline hootie.js rather than loading it, so
     BIO005_HOOTIE was already set by the time this ran, the function
     returned on line one, and neither the schedule nor the 248 answer
     bank was ever fetched. Hootie was mounted on both pages and answered
     every single question with "I cannot see the schedule from this
     page." Now the data loads whether or not the engine is already here,
     and only the engine load is skipped. */
  (function loadHootie() {
    if (window.BIO005_OPEN_VIEW) return;   /* public link, see ?open=1 above */
    var engineHere = !!window.BIO005_HOOTIE
                  || !!document.querySelector('script[src*="hootie.js"]');

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
    /* the answer bank first: hootie reads window.BIO005_QUESTIONS */
    if (!window.BIO005_QUESTIONS) add(sibling('bio005-question-bank.js'));
    if (!engineHere) add(sibling('hootie.js'));
  })();
})();
