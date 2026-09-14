/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-week-grid.js

   ONE HOME FOR THE WEEK TITLES AND WHAT IS DUE IN EACH WEEK.

   TITLES ARE THE CANVAS TITLES. Scrubs sent the module list from
   Canvas on Sep 7 2026 and asked for that terminology everywhere.
   Students read Canvas first, so Canvas wins any disagreement. The
   descriptive titles in bio005-schedule-fall2026.js ("The chemistry
   that does work in the body") stay where they are as the teaching
   subtitle; these are the names.

   A DISAGREEMENT WORTH KNOWING ABOUT, weeks 5 to 8.
   Three sources in this repo describe those four weeks and they do
   not all agree:

     Canvas          5 The Nervous System   6 Muscle
                     7 Chemical Signaling & Endocrine Control
                     8 Reproductive Physiology
     PhysioEx map    5 Synapses  6 Muscle  7 Hormones  8 Reproduction
     BIO005_WEEKS    5 Synapses  6 Sensory  7 Muscle
                     8 Hormones AND reproduction together

   Canvas and the PhysioEx lab map agree with each other. The schedule
   of record is the outlier: it carries an extra sensory week at 6,
   which pushes muscle to 7 and forces hormones and reproduction to
   share week 8. Weeks 1 to 4 and 9 to 15 are identical in all three.

   This file follows Canvas. bio005-schedule-fall2026.js still needs
   realigning, and the sensory competencies (w7-*) need a home when it
   is. Flagged in compliance-notes.md; not silently re-mapped here,
   because moving 268 competencies is Scrubs' call and not a side
   effect of building a grid.

   WEEKS 13 TO 15 were below the fold in the screenshot. The titles
   here are written in her style from the content of record and are
   marked provisional:'yes'. The grid shows them with a quiet marker
   so nobody mistakes a guess for a decision. Replace them with the
   real Canvas titles and drop the flag.
   ============================================================ */
window.BIO005_WEEK_GRID = {
 "legend": {
  "check": {
   "label": "Mastery Check",
   "noPoints": true
  },
  "lab": {
   "label": "Lab",
   "noPoints": false
  },
  "apply": {
   "label": "Application case",
   "noPoints": false
  },
  "disc": {
   "label": "Discussion",
   "noPoints": false
  },
  "log": {
   "label": "Practice engagement sheet",
   "noPoints": true
  }
 },
 "weeks": [
  {
   "wk": 1,
   "title": "Foundations of Physiology",
   "sub": "How physiology works and what keeps you steady",
   "lab": "Standards and ranges",
   "labNote": "No PhysioEx this week",
   "due": [
    "check",
    "lab",
    "disc",
    "log"
   ],
   "extra": [
    "Start Here",
    "Vision board discussion"
   ]
  },
  {
   "wk": 2,
   "title": "The Cell, and How Cells Talk",
   "sub": "The cell, and how cells talk",
   "lab": "Dose response, full and partial agonists",
   "labNote": "No equipment, read the curves",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 3,
   "title": "Membranes, Transport & Compartments",
   "sub": "Getting across the membrane, and the electrical signal",
   "lab": "Diffusion, osmosis and transport",
   "labNote": "PhysioEx Ex 1, all five activities",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 4,
   "title": "The Nervous System",
   "sub": "Neurons, action potentials and synapses",
   "lab": "",
   "labNote": "Lab not named yet",
   "due": [
    "check",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 5,
   "title": "Muscle",
   "sub": "Reflexes, and sensing the world",
   "lab": "Muscle contraction",
   "labNote": "PhysioEx Ex 2, all activities",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 6,
   "title": "Chemical Signaling & Endocrine Control",
   "sub": "Muscle, and how movement gets commanded",
   "lab": "Glucose tolerance and hormone assay",
   "labNote": "PhysioEx Ex 4 and Ex 12",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 7,
   "title": "Reproductive Physiology",
   "sub": "Hormones, the autonomic system, and reproduction",
   "lab": "Hormone cycle graphs",
   "labNote": "No PhysioEx exercise, built worksheet",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ],
   "exam": {
    "n": 1,
    "covers": "Weeks 1 to 7",
    "window": "Mon Oct 26 to Wed Oct 28"
   }
  },
  {
   "wk": 8,
   "title": "Cardiac Function",
   "sub": "The heart as a pump",
   "lab": "Cardiac physiology and ECG",
   "labNote": "PhysioEx Ex 6",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 9,
   "title": "Circulation & Blood Pressure",
   "sub": "Pressure, flow, and holding blood pressure steady",
   "lab": "Hemodynamics",
   "labNote": "PhysioEx Ex 5",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 10,
   "title": "Blood & Immunity",
   "sub": "Blood and how the body defends itself",
   "lab": "Blood analysis and typing",
   "labNote": "PhysioEx Ex 11",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 11,
   "title": "Digestion, Absorption & Energy Balance",
   "sub": "Digestion, and how you use food for fuel",
   "lab": "Digestive enzymes and metabolic rate",
   "labNote": "PhysioEx Ex 8 and Ex 4",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 12,
   "title": "Respiratory Physiology",
   "provisional": "yes",
   "sub": "Breathing, gas transport, and the fast pH lever",
   "lab": "Pulmonary function",
   "labNote": "PhysioEx Ex 7 and Ex 10",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 13,
   "title": "Renal Physiology & Fluid Balance",
   "provisional": "yes",
   "sub": "The kidney and body fluid balance",
   "lab": "Renal system physiology",
   "labNote": "PhysioEx Ex 9",
   "due": [
    "check",
    "lab",
    "apply",
    "disc",
    "log"
   ]
  },
  {
   "wk": 14,
   "title": "Acid-Base Balance & Integration",
   "provisional": "yes",
   "sub": "The slow pH lever, and putting it all together",
   "lab": "Acid-base and ABG interpretation",
   "labNote": "PhysioEx Ex 10",
   "due": [
    "check",
    "lab",
    "log"
   ],
   "extra": [
    "Case conference recording",
    "Final patient file"
   ],
   "exam": {
    "n": 2,
    "covers": "Weeks 8 to 14",
    "window": "Mon Dec 14 to Wed Dec 16"
   }
  },
  {
   "wk": 15,
   "title": "Catch Up, and the Final",
   "sub": "Catch up, and the final",
   "due": [
    "check"
   ]
  }
 ]
};
