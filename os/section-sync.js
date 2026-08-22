/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   section-sync.js

   ONE section choice across the whole site.

   THE PROBLEM
   -----------
   welcome.html is the chooser. It writes the student's section to
   localStorage under 'bio005-section' as a raw string, one of:

       mw       Class 1, Mon / Wed, afternoon
       tr-am    Class 2, Tue / Thu, morning
       tr-eve   Class 3, Tue / Thu, evening

   The week pages and the course calendar all read that key, so a
   student picks once and those pages follow.

   Mastery OS did not. It keeps its own key, 'mos-section', in its
   own vocabulary ('mw' / 'tr-early' / 'tr-eve'), JSON encoded,
   and it never looked at 'bio005-section'. So a student picked
   their section on welcome, walked into Mastery OS, and got asked
   a second time. Worse, they could answer differently and end up
   with two disagreeing schedules in one browser.

   WHAT THIS DOES
   --------------
   Loaded BEFORE the Mastery OS app script, this seeds 'mos-section'
   from the canonical choice, so Mastery OS starts on the section
   the student already picked.

   THE mos-schedule TRAP
   ---------------------
   Mastery OS resolves its schedule as:

       store.get('mos-schedule')  ||  FALL_SECTIONS[MOS_SECTION]  || ...

   'mos-schedule' is a CACHED COPY of a resolved schedule and it
   wins outright. Updating 'mos-section' alone would therefore do
   nothing for a student who had already been through onboarding:
   the stale cached schedule would keep answering first.

   So when the mapped section actually changes, the cache is
   dropped and Mastery OS re-resolves from FALL_SECTIONS. The cache
   is left alone when nothing changed, so a student who never
   switches sections sees no churn.

   ENCODING, easy to get wrong
   ---------------------------
   'bio005-section' is written with setItem(key, value), a raw
   string:            mw
   'mos-section' is written through Mastery OS's own store, which
   JSON encodes:      "mw"
   Read and write each in its own format. Do not unify them; the
   two readers are independent and both already ship.
   ============================================================ */

(function () {
  'use strict';

  var KEY = 'bio005-section';

  /* Canonical section id -> Mastery OS section id.
     Mastery OS's FALL_SECTIONS accepts mw, tr-early, tr-eve and tr.
     tr-early and tr-eve both resolve to the same Tue/Thu schedule
     there, which is correct: Classes 2 and 3 share every date and
     differ only by time of day. */
  var TO_MOS = { 'mw': 'mw', 'tr-am': 'tr-early', 'tr-eve': 'tr-eve' };
  var VALID = { 'mw': 1, 'tr-am': 1, 'tr-eve': 1 };

  function fromParam() {
    try {
      var m = location.search.match(/[?&]sec=([^&#]+)/);
      if (m) {
        var v = decodeURIComponent(m[1]);
        if (VALID[v]) return v;
      }
    } catch (e) {}
    return null;
  }

  function saved() {
    try {
      var v = localStorage.getItem(KEY);
      return VALID[v] ? v : null;
    } catch (e) { return null; }
  }

  /* ?sec= wins and is persisted, matching what the week pages do,
     so a link into any page can set the section for the site. */
  var section = fromParam();
  if (section) {
    try { localStorage.setItem(KEY, section); } catch (e) {}
  } else {
    section = saved();
  }

  function syncToMasteryOS(sec) {
    if (!sec || !TO_MOS[sec]) return;
    var want = TO_MOS[sec];
    try {
      var have = null;
      try { have = JSON.parse(localStorage.getItem('mos-section')); } catch (e) { have = null; }
      if (have === want) return;              /* already in step, leave the cache alone */

      localStorage.setItem('mos-section', JSON.stringify(want));
      /* The cached schedule belongs to the previous section and
         would otherwise win. Drop it so Mastery OS re-resolves. */
      localStorage.removeItem('mos-schedule');
    } catch (e) {}
  }

  syncToMasteryOS(section);

  /* Exposed so a page can ask without re-implementing the rules. */
  window.BIO005_SECTION = {
    key: KEY,
    get: function () { return section; },
    track: function () { return section === 'mw' ? 'mw' : section ? 'tr' : null; },
    toMasteryOS: function (s) { return TO_MOS[s || section] || null; },
    set: function (s) {
      if (!VALID[s]) return false;
      section = s;
      try { localStorage.setItem(KEY, s); } catch (e) {}
      syncToMasteryOS(s);
      return true;
    }
  };
})();
