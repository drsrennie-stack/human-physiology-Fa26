/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   rubrics.js

   Per-competency self-check rubrics for Mastery OS. Both Mastery
   OS pages load this file and it was missing from the repo, so
   every visit fired a 404.

   This is a STUB. The map is empty. Nothing is invented.

   HOW MASTERY OS READS IT
   -----------------------
       function rubricFor(comp){
         var R = window.BIO005_RUBRICS;
         return (R && comp && R[comp.id]) ? R[comp.id] : null;
       }

   A rubric is an ARRAY OF STRINGS, one per thing the student
   should have produced. It drives two of the signature exercises:

   - Blank-Page Brain Dump. With a rubric, the student ticks off
     each item they actually recalled and gets a score out of the
     list. Without one, they fall back to rating their own dump as
     patchy, solid or thorough, which is the current behavior.

   - Draw it to Know it. With a rubric, the self-check box reveals
     the expected items one at a time after the drawing is done.
     Without one, the reveal step is skipped and the drawing step
     also drops out of the focus-block checklist.

   So an empty map behaves exactly as the missing file did, minus
   the 404. Filling in even a handful of competencies turns the
   scored version of both exercises back on for those.

   SHAPE
   -----
   Keyed by competency id, the same ids used in
   competenciesfall2026.js.

     window.BIO005_RUBRICS = {
       'w1-directional-terms': [
         'Superior and inferior, with an example of each',
         'Anterior and posterior, and why ventral and dorsal differ in four-legged animals',
         'Medial and lateral, referenced to the midline',
         'Proximal and distal, and why they apply to limbs',
         'Superficial and deep'
       ]
     };

   Write each item as something the student can look at and answer
   yes or no to. Items they can argue about do not score cleanly.
   ============================================================ */

window.BIO005_RUBRICS = {};
