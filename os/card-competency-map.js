/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   card-competency-map.js
   The bridge between the card bank and the competency set.

   STATUS: IN BUILD. This module is shape-correct and empty.
   Mastery Physio OS reads every one of these defensively, so an
   empty module degrades to a "not built yet" state in the UI
   instead of throwing. Fill it and the view lights up. Nothing
   else has to change.

   Shape: { "<competency id>": ["<card id>", ...] }. When the card bank
   is written, every card must be tagged to a competency id from
   bio005-competencies.js or answering it will not move any mastery bar.
   That is the exact break that cost the anatomy build a term.
   ============================================================ */

window.BIO005_CARD_COMPETENCY_MAP = {};
window.BIO005_CARD_MAP_STATUS = { inBuild: true };
