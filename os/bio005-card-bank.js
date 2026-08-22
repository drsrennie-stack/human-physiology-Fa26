/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-card-bank.js
   The spaced recall card bank.

   STATUS: IN BUILD. This module is shape-correct and empty.
   Mastery Physio OS reads every one of these defensively, so an
   empty module degrades to a "not built yet" state in the UI
   instead of throwing. Fill it and the view lights up. Nothing
   else has to change.

   The anatomy equivalent holds roughly 2.4 MB of cards written against
   the BIO 004 competencies. None of it transfers, because physiology
   asks students to predict and trace rather than identify. Cards have
   to be written against the 268 physiology competencies.

   Until then the Recall view falls back to competency-level retrieval,
   which is what mastery-physio-os does natively: it shows the
   competency, the student says it out loud, then self-grades.
   ============================================================ */

window.BIO005_CARD_BANK = [];
window.BIO005_COURSE_CONTENT = {};
window.BIO005_CARD_BANK_STATUS = { inBuild: true, count: 0,
  message: "The card bank is being written. Recall is running on competency-level retrieval in the meantime, which works." };
