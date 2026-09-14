/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-week-grid.js

   ONE HOME FOR THE WEEK TITLES AND WHAT STUDENTS DO IN EACH WEEK.
   Rendered by course-grid.html, which is the page framed into the
   Canvas "Weekly Schedule" page. Canvas holds one paragraph and one
   iframe, so a schedule change is made here, not in Canvas.

   Rev Sep 14 2026.
     1. The three ungraded Learn steps now show on every week:
        note sheet pass 1, watch the lectures, note sheet pass 2.
        They sit ahead of the lab, the case and the discussion
        because that is the order of the week: pass 1 from the book,
        then the lectures, then pass 2 in a second color.
     2. Week 5 lab named. It is a dry lab, not a missing one.
     3. provisional flags dropped from weeks 13 to 15. Those titles
        are now carried by bio005-lab-plan.js as well, so they are
        settled, not guesses.

   TITLES ARE THE CANVAS MODULE NAMES. Students read Canvas first, so
   Canvas wins the naming. The teaching subtitle under each one is the
   student-language title from bio005-schedule-fall2026.js, which is
   how the week pages and the dock describe the same week.

   STILL OPEN, weeks 6 and 7. Canvas and the PhysioEx lab map put
   muscle in week 6 and endocrine in week 7. The schedule of record
   (BIO005_WEEKS) carries a sensory week at 6, which pushes muscle to
   7 and makes week 8 carry hormones and reproduction together. So the
   week 6 and week 7 LECTURE topics on the week pages sit one week
   behind the LABS listed here. This file follows Canvas and does not
   silently re-map 268 competencies. Scrubs' call.
   ============================================================ */
window.BIO005_WEEK_GRID = {

  /* Graded: the lab, the application case, the discussion. Everything
     marked noPoints is on the checklist because students need to see
     it, not because it is collected. */
  legend: {
    pass1:  { label:'Note sheet, pass 1, from the book', noPoints:true  },
    video:  { label:'Watch the week lectures',           noPoints:true  },
    pass2:  { label:'Note sheet, pass 2, second color',  noPoints:true  },
    lab:    { label:'Lab',                               noPoints:false },
    apply:  { label:'Application case',                  noPoints:false },
    disc:   { label:'Discussion',                        noPoints:false },
    check:  { label:'Mastery Check',                     noPoints:true  },
    log:    { label:'Practice engagement sheet',         noPoints:true  }
  },

  weeks: [
    { wk:1,  title:'Foundations of Physiology',
      sub:'How physiology works and what keeps you steady',
      lab:'Standards and ranges', labNote:'Dry lab, no PhysioEx this week',
      due:['pass1','video','pass2','lab','disc','check','log'],
      /* The vision board IS the introduction, Scrubs Sep 7 2026. There is
         no separate introduce yourself discussion; listing both had
         students posting twice. */
      extra:['Start Here', 'Vision board discussion', 'Short week, the term opens on a Tuesday'] },

    { wk:2,  title:'Molecules, Water & Energy',
      sub:'The chemistry that does work in the body',
      lab:'Enzyme activity, amylase', labNote:'PhysioEx Ex 8, amylase activity only',
      due:['pass1','video','pass2','lab','apply','disc','check','log'],
      extra:['Optional chemistry review page, for anyone who wants the prerequisite refreshed'] },

    { wk:3,  title:'Membranes, Transport & Compartments',
      sub:'Getting across the membrane',
      lab:'Diffusion, osmosis and transport', labNote:'PhysioEx Ex 1, all five activities',
      due:['pass1','video','pass2','lab','apply','disc','check','log'],
      extra:['Census is Sun Sep 27, the day this week closes'] },

    { wk:4,  title:'Electrical Signaling',
      sub:'How cells talk, and the electrical signal',
      lab:'The action potential', labNote:'PhysioEx Ex 3',
      due:['pass1','video','pass2','lab','apply','disc','check','log'] },

    { wk:5,  title:'The Nervous System',
      sub:'Synapses and central integration',
      lab:'The reflex, the pupil and the autonomic exam', labNote:'Dry lab, no PhysioEx exercise',
      due:['pass1','video','pass2','lab','apply','disc','check','log'],
      extra:['Heaviest week in the course'] },

    { wk:6,  title:'Muscle',
      sub:'How muscle makes force',
      lab:'Muscle contraction', labNote:'PhysioEx Ex 2, all activities',
      due:['pass1','video','pass2','lab','apply','disc','check','log'] },

    { wk:7,  title:'Chemical Signaling & Endocrine Control',
      sub:'Hormones, the slow control system',
      lab:'Glucose tolerance and hormone assay', labNote:'PhysioEx Ex 4 and Ex 12',
      due:['pass1','video','pass2','lab','apply','disc','check','log'] },

    { wk:8,  title:'Reproductive Physiology',
      sub:'The reproductive cycles',
      lab:'Reading the cycle from graphs and images', labNote:'Dry lab, built worksheet',
      due:['pass1','video','pass2','lab','apply','disc','check','log'],
      exam:{ n:1, covers:'Weeks 1 to 7', window:'Mon Oct 26 to Wed Oct 28' } },

    { wk:9,  title:'Cardiac Function',
      sub:'The heart as a pump',
      lab:'Cardiac physiology and ECG', labNote:'PhysioEx Ex 6',
      due:['pass1','video','pass2','lab','apply','disc','check','log'] },

    { wk:10, title:'Circulation & Blood Pressure',
      sub:'Pressure, flow, and holding blood pressure steady',
      lab:'Hemodynamics', labNote:'PhysioEx Ex 5',
      due:['pass1','video','pass2','lab','apply','disc','check','log'],
      extra:['Veterans Day falls Wed Nov 11'] },

    { wk:11, title:'Blood & Immunity',
      sub:'Blood and how the body defends itself',
      lab:'Blood analysis and typing', labNote:'PhysioEx Ex 11',
      due:['pass1','video','pass2','lab','apply','disc','check','log'],
      extra:['Last day to drop is Sat Nov 21'] },

    { wk:12, title:'Digestion, Absorption & Energy Balance',
      sub:'Digestion, and how you use food for fuel',
      lab:'Digestive enzymes and metabolic rate', labNote:'PhysioEx Ex 8 and Ex 4',
      due:['pass1','video','pass2','lab','apply','disc','check','log'],
      extra:['Thanksgiving Nov 26 and 27, nothing graded lands on those days'] },

    { wk:13, title:'Respiratory Physiology',
      sub:'Breathing, gas transport, and the fast pH lever',
      lab:'Pulmonary function', labNote:'PhysioEx Ex 7 and Ex 10',
      due:['pass1','video','pass2','lab','apply','disc','check','log'] },

    { wk:14, title:'Renal Physiology & Fluid Balance',
      sub:'The kidney and body fluid balance',
      lab:'Renal system physiology', labNote:'PhysioEx Ex 9',
      due:['pass1','video','pass2','lab','apply','disc','check','log'] },

    { wk:15, title:'Acid-Base Balance & Integration',
      sub:'The slow pH lever, and putting it all together',
      lab:'Acid-base and ABG interpretation', labNote:'PhysioEx Ex 10',
      due:['pass1','video','pass2','lab','check','log'],
      extra:['Three days only, Dec 14 to 16', 'Case conference recording', 'Patient chart, the whole term, due Wed Dec 16 at 10 pm'],
      exam:{ n:2, covers:'Weeks 8 to 14', window:'Mon Dec 14 to Wed Dec 16' } }
  ]
};
