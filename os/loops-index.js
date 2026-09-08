/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   loops-index.js
   Short concept walkthrough videos.

   STATUS: IN BUILD. This module is shape-correct and empty.
   Mastery Physio OS reads every one of these defensively, so an
   empty module degrades to a "not built yet" state in the UI
   instead of throwing. Fill it and the view lights up. Nothing
   else has to change.

   In BIO 004 this is Loops: short lab identification walkthroughs shot
   over cadaver and slide material. That format does not carry to an
   online physiology course with no in-person lab, so the replacement
   is an open decision. Scrubs is deciding what goes here.

   Whatever replaces it, keep the shape below and the Today view and
   the per-competency resource buttons will pick it up automatically.
     BIO005_LOOPS: [{ id, title, competencies:[ids], min, url }]
   ============================================================ */

window.BIO005_LOOPS = [];
window.BIO005_LOOPS_BASE = "";
window.BIO005_LOOPS_IMG = {};
window.BIO005_LOOPS_FOR = function () { return []; };
window.BIO005_LOOPS_STATUS = { inBuild: true, replaces: "Loops",
  message: "The video walkthrough format for physiology has not been chosen yet." };
