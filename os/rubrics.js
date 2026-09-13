/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   rubrics.js

   WHAT A STUDENT SHOULD HAVE PRODUCED, ITEM BY ITEM.

   This is the answer key for the exercises a student does on
   paper: the blank-page brain dump, drawing from memory, and
   teaching it out loud at a whiteboard. They work it on paper
   with nothing in front of them, then open this list and tick
   what they actually produced. The count is the score, and it
   feeds mastery, the weak spot dashboard and the gap finder.

   WHY IT IS A CHECKLIST AND NOT A WORD COUNT
   ------------------------------------------
   The previous version counted words in a text box and asked
   "patchy, solid or thorough". A word count measures typing,
   and a three-way self-rating measures mood. Neither tells a
   student what they left out, which is the only thing a brain
   dump is for. A specific list does both jobs at once: it
   scores the attempt and it hands back the repair list.

   WHY THE ITEMS READ THE WAY THEY DO
   ----------------------------------
   Every item is something a student can look at their own page
   and answer yes or no about. "Named the sensor, the integrating
   center and the effector for that variable" can be ticked or
   not. "Understands feedback" cannot. These are also what would
   be looked for on the midterm, so a student who works through
   this list knows what the standard is rather than guessing at
   it.

   STATUS
   ------
   Week 1 is written out properly, item by item, Sep 13 2026.
   Weeks 2 to 15 fall through to draw-checklists.js, which holds
   items generated from the competency statements. Those are a
   floor rather than a finished answer key, and each week should
   be written out here before it opens.

   FORMAT
   ------
   window.BIO005_RUBRICS = { "<competency id>": [ "item", ... ] }
   Entries here win over anything generated.
   ============================================================ */

window.BIO005_RUBRICS = {

  /* ---------- WEEK 1. Foundations of Physiology ---------- */

  "w1-levels-function": [
    "Defined physiology as the study of function, how the body and its parts work, rather than what they look like",
    "Listed the levels of organization in order: molecule, cell, tissue, organ, organ system, organism",
    "Took one specific process and placed it at the right level",
    "Said which level explains that process best, and why not the level above or below it",
    "Said in one line how physiology differs from anatomy, and why the two are worked together"
  ],

  "w1-structure-function": [
    "Stated the principle: what a structure can do is set by how it is built",
    "Picked one structure and named the single feature its function depends on",
    "Predicted what happens to the function when that feature changes",
    "Did the same for a second structure, from a different organ system",
    "Named something you would actually see in a patient, or in a measurement, when that structure changes"
  ],

  "w1-homeostasis": [
    "Defined homeostasis as holding the internal environment inside a narrow range",
    "Defined regulated variable and named a real one",
    "Defined setpoint, and said it is a range rather than a single number",
    "Separated homeostasis from chemical equilibrium: equilibrium has no gradient left and needs no energy",
    "Separated homeostasis from steady state: steady state holds constant because input equals output, and that costs energy",
    "Said why a living body is never at equilibrium"
  ],

  "w1-feedback-components": [
    "Drew the loop with all seven parts labeled: stimulus, sensor, afferent path, integrating center, efferent path, effector, response",
    "Drew the feedback arrow from the response back onto the stimulus",
    "Picked one real variable, body temperature or blood glucose, and traced it through all seven",
    "Named the actual sensor, integrating center and effector for that variable, not just the boxes",
    "Showed the direction: the response pushes against the change that started it",
    "Said what the loop is holding steady, and roughly what range"
  ],

  "w1-feedback-types": [
    "Negative feedback: the response opposes the change and moves the variable back toward setpoint",
    "Positive feedback: the response reinforces the change and pushes the variable further from where it started",
    "Gave a physiological example of negative feedback and named the variable it holds",
    "Gave a physiological example of positive feedback",
    "Explained why a positive loop cannot stop itself: nothing in the loop opposes the change",
    "Named the outside event that ends the positive example chosen"
  ],

  "w1-feedforward": [
    "Feedforward: the response starts before the variable has changed, on an anticipatory signal",
    "Gave a feedforward example and named the signal that triggers it early",
    "Acclimatization: a longer adjustment to an environmental change that lasts",
    "Gave an acclimatization example and said roughly how long it takes",
    "Said how to tell the two apart in a scenario, using timing and how long the change lasts",
    "Said what feedforward buys the body that feedback alone cannot"
  ],

  "w1-control-pathways": [
    "Local control: the signal stays in the tissue where the change happened and acts on nearby cells only",
    "Reflex control: the signal travels through the nervous or endocrine system to a target somewhere else",
    "Gave an example of each",
    "Said how far the signal travels in each, and roughly how fast",
    "Took one scenario, classified it, and gave the reason for the call",
    "Said why the body needs both rather than one or the other"
  ],

  "w1-mass-balance": [
    "Wrote the mass balance equation with every term: intake plus production, minus output and metabolism",
    "Labeled what each term means for a real substance",
    "Said what has to be true for the amount in the body to hold constant: everything in equals everything out",
    "Worked the numbers for one solute or for body water and got an answer",
    "Changed one term and showed the new result underneath",
    "Named where each term actually happens in the body"
  ],

  "w1-units-conversion": [
    "Converted molarity to osmolarity and showed the particle count that makes them differ",
    "Converted using milliequivalents and showed where the valence comes in",
    "Showed a pressure in mmHg in a context where that unit is the one used",
    "Showed a flow in liters per minute",
    "Turned a percent solution into grams, and then into moles",
    "Carried the units down every line and cancelled them",
    "Checked at the end that the units left over are the units the question asked for"
  ],

  "w1-lab-graphing": [
    "Put the independent variable on the x axis and the dependent variable on the y axis",
    "Labeled both axes with the quantity and its unit",
    "Used an even scale, and started it where the data needs it to start",
    "Described the trend in words, including its direction",
    "Read a slope off the graph and gave it with units",
    "Said what that slope means physiologically, not just what the number is"
  ],

  "w1-lab-experimental-design": [
    "Stated the hypothesis as something that could turn out to be wrong",
    "Named the independent variable, the one deliberately changed",
    "Named the dependent variable, the one measured",
    "Named the control condition",
    "Said what that control rules out, specifically",
    "Named one variable held constant, and why it had to be"
  ],

  "w1-lab-measurement-error": [
    "Random error: scatters both directions, unpredictable, and shrinks when you repeat and average",
    "Systematic error: shifts every value the same direction, and averaging will not touch it",
    "Gave an example of each from a real physiological measurement",
    "Said why physiological measurements are repeated and averaged rather than taken once",
    "Said which of the two a calibration fixes, and which one it does not",
    "Said why a single measurement outside a reference range is not by itself a finding"
  ]

};

/* ============================================================
   WEEKS 2 TO 15

   Not written yet. Until they are, Mastery OS falls through to
   draw-checklists.js, which carries items split out of each
   competency statement. Those are usable but they are fragments
   of a sentence rather than things a student can clearly tick,
   so a week is better off written out here before it opens.
   ============================================================ */
