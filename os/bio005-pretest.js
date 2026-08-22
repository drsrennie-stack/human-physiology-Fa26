/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-pretest.js
   The diagnostic pretest that seeds a student's starting mastery.

   STATUS: IN BUILD. This module is shape-correct and empty.
   Mastery Physio OS reads every one of these defensively, so an
   empty module degrades to a "not built yet" state in the UI
   instead of throwing. Fill it and the view lights up. Nothing
   else has to change.

   available() returns false, so the OS simply does not offer the
   pretest and students start from an unrated map. That is a clean
   degradation, not a broken state.

   To build it: sample 2 to 3 core competencies per module, ask one
   DOK 2 question each, and return { <competency id>: 0..3 } from
   onFinish so applyPretest can seed the confidence map.
   ============================================================ */

window.BIO005_PRETEST = {
  inBuild: true,
  available: function () { return false; },
  open: function (opts) { if (opts && opts.onFinish) opts.onFinish({}); }
};
