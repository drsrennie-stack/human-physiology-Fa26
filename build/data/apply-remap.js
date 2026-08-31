/* Remaps the 268 competency week fields and the schedule titles onto the
   sequence adopted Aug 29 2026. Writes new files beside the originals.
   The originals are not touched. */
const fs=require('fs');
global.window={};require('./bio005-competencies.js');require('./bio005-schedule-fall2026.js');
const C=window.BIO005_COMPETENCIES, W=window.BIO005_WEEKS;

const MAP = {
  'Foundations of Physiology':1,'Quantitative Skills for Physiology':1,
  'Chemical Foundations':2,
  'Membrane Structure and Diffusion':3,'Membrane Transport':3,'Membrane Potential':3,
  'Cell Signaling':4,'Neurons and Neuroglia':4,'Electrical Signaling':4,
  'Synaptic Transmission':5,'Central Integration and Reflexes':5,
  'General Sensory Physiology':6,'Special Senses':6,
  'Autonomic Nervous System':6,
  'Motor Control':7,'Skeletal Muscle Physiology':7,'Cardiac and Smooth Muscle':7,
  'Endocrine Principles':8,'Endocrine Glands':8,'Reproductive Physiology':8,
  'Cardiac Electrophysiology':9,'Cardiac Mechanics':9,
  'Vascular Physiology':10,'Cardiovascular Regulation':10,
  'Blood':11,'Immune Physiology':11,
  'Digestive Physiology':12,'Metabolism and Energy Balance':12,
  'Respiratory Mechanics':13,'Gas Exchange and Transport':13,'Control of Ventilation':13,
  'Renal Physiology':14,
  'Acid Base and Fluid Balance':15,'Integration':15
};
const TITLES=[
 'How physiology works and what keeps you steady',
 'The chemistry that does work in the body',
 'Getting across the membrane',
 'How cells talk, and the electrical signal',
 'Synapses and central integration',
 'Sensing the world, and the responses you do not control',
 'Muscle, and how movement gets commanded',
 'Hormones and reproduction, the slow control system',
 'The heart as a pump',
 'Pressure, flow, and holding blood pressure steady',
 'Blood and how the body defends itself',
 'Digestion, and how you use food for fuel',
 'Breathing, gas transport, and the fast pH lever',
 'The kidney and body fluid balance',
 'The slow pH lever, and putting it all together'
];

let moved=0;
C.forEach(c=>{ const w=MAP[c.general]; if(w==null) throw new Error('unmapped: '+c.general);
  if(c.week!==w){moved++;} c.week=w; });

const byW={}; C.forEach(c=>{(byW[c.week]=byW[c.week]||[]).push(c.id);});

W.forEach((w,i)=>{ w.title=TITLES[i]; w.competencies=byW[w.wk]||[];
  w.module = w.wk<=3?1 : w.wk<=8?2 : 3; });

/* ------------------------------------------------------------------
   THANKSGIVING, decided Aug 30 2026.
   Week 12 opens Mon Nov 23 and its content is unchanged. What changes
   is only the deadline: nothing is due on Sun Nov 29, the Thanksgiving
   weekend. Weeks 12 and 13 share one due date, Sun Dec 6, so a student
   gets a fourteen-day window across the break instead of a deadline
   landing in the middle of it.

   A week's deadline is w.due when it has one and w.closes otherwise, so
   every other week is untouched and the builders need one helper, not a
   special case for November.
   ------------------------------------------------------------------ */
/* ------------------------------------------------------------------
   TWO KINDS OF NOTE, KEPT APART ON PURPOSE.

   w.note is hers. Planning voice: census logistics, which block to trim
   if the term runs tight, what is still unconfirmed with Yuba. It is
   rendered on teaching-notes.html and nowhere else, and leak-check.py
   fails the build if it turns up on a student page.

   w.studentNote is theirs. Only the facts a student has to act on, in
   the voice the rest of the site uses.

   THESE ARE DRAFTS. I wrote them from the facts already in her notes.
   Every one needs her eye before September 8.
   ------------------------------------------------------------------ */
const STUDENT_NOTES = {
  1: 'The term starts on a Tuesday, so week one is six days rather than seven. '
   + 'It is deliberately light. Use it to get set up.',
  3: 'Census is Sunday September 27, the same day this week closes. If you are '
   + 'deciding whether to stay in the course, you will have your first exam '
   + 'back before then.',
  8: 'The midterm sits in this week. It is due Sunday November 1 with everything else.',
  10: 'Veterans Day falls on Wednesday November 11. Nothing is due that day.',
  11: 'The last day to drop with a W is Saturday November 21, which is inside '
    + 'this week. You will have three graded exams back before that date.',
  15: 'Three days only, December 14 to 16. The case conference and your final '
    + 'patient file are due Wednesday December 16.'
};

const PAIR = { weeks:[12,13], due:'2026-12-06' };
W.forEach(w => {
  if (PAIR.weeks.indexOf(w.wk) === -1) return;
  w.due = PAIR.due;
  w.pair = PAIR.weeks.slice();
  w.pairNote = 'Weeks 12 and 13 share one deadline. Nothing is due on the '
             + 'Thanksgiving weekend. Everything from both weeks is due '
             + 'Sunday December 6, 11:59 pm.';
});
W.forEach(w => {
  if (STUDENT_NOTES[w.wk]) { w.studentNote = STUDENT_NOTES[w.wk]; }
});
/* Weeks 12 and 13 tell the student about the shared deadline instead. */
W.forEach(w => {
  if (w.pairNote) { w.studentNote = w.pairNote; }
});

const w12 = W.find(w => w.wk === 12);
if (w12) {
  w12.note = 'THANKSGIVING WEEK. Thu Nov 26 and Fri Nov 27 are holidays. '
           + 'Nothing is due on Sun Nov 29. This week and Week 13 share a '
           + 'single deadline of Sun Dec 6, so the break sits inside a '
           + 'fourteen-day window rather than against a due date. Content '
           + 'and opening dates are unchanged.';
}

function block(varname,data,banner){
  return '/* '+banner+' */\n(function () {\n  window.'+varname+' = '+JSON.stringify(data,null,1)+';\n}());\n';
}
const stamp='BIO 005 Human Physiology, Fall 2026. Regenerated '+new Date().toISOString().slice(0,10)+
  '. Week fields remapped onto the adopted sequence: endocrine and reproductive at week 8, blood with immunity at week 11, acid base split into the fast respiratory lever at 13 and the slow renal one at 15.';

/* keep the window.BIO005 helper from the original file verbatim, because
   competency-recall.html and the OS both read it and it exists exactly once */
const orig = fs.readFileSync('bio005-competencies.js','utf8');
const i = orig.indexOf('window.BIO005 = (function');
if (i === -1) { throw new Error('could not find the window.BIO005 export in the original'); }
const exportBlock = orig.slice(i);

/* And carry every OTHER global the competency file exports. Emitting only
   BIO005_COMPETENCIES silently dropped BIO005_MODULES, which is what
   competency-recall.html builds its "Mastery by unit" panel from, so that
   panel rendered nothing at all. Same failure as the schedule file: discover
   the exports, do not list them from memory. */
const COMP_EXPORTS = (function () {
  const before = global.window;
  global.window = {};
  delete require.cache[require.resolve('./bio005-competencies.js')];
  require('./bio005-competencies.js');
  const own = Object.keys(global.window).filter(k => /^BIO005_/.test(k));
  global.window = before;
  return own;
}());
console.log('competency exports carried through:', COMP_EXPORTS.join(', '), '+ the BIO005 helper');

fs.writeFileSync('bio005-competencies.remapped.js',
  COMP_EXPORTS.map(k => block(k, k === 'BIO005_COMPETENCIES' ? C : window[k], stamp)).join('\n')
  + '\n' + exportBlock);
/* The schedule file exports five globals, not one. Emitting only
   BIO005_WEEKS silently dropped BIO005_TERM, BIO005_WEEK_SHAPE,
   BIO005_GRADING and BIO005_OPEN_DECISIONS, which course-schedule.html
   reads for the term dates, the census and drop deadlines and the weekly
   beat structure. Dropping them turned those into "TBD". Carry every
   export through; remap only the one that needs remapping. */
/* Discovered by comparing exports rather than listing them by hand: the
   repo's file carries BIO005_CREDIT too, which an earlier hard-coded list
   would have dropped on the floor. Take whatever the source actually
   exports, so a field she adds later survives the next remap. */
/* Both files were required into the same window, so asking that window what
   it holds returns the competency globals as well. Re-require the schedule
   on its own to find out what IT exports, and nothing else. */
const SCHED_EXPORTS = (function () {
  const before = global.window;
  global.window = {};
  delete require.cache[require.resolve('./bio005-schedule-fall2026.js')];
  require('./bio005-schedule-fall2026.js');
  const own = Object.keys(global.window).filter(k => /^BIO005_/.test(k));
  global.window = before;
  return own;
}());
if (SCHED_EXPORTS.indexOf('BIO005_WEEKS') === -1) {
  throw new Error('the schedule file did not export BIO005_WEEKS');
}
console.log('schedule exports carried through:', SCHED_EXPORTS.join(', '));
fs.writeFileSync('bio005-schedule-fall2026.remapped.js',
  SCHED_EXPORTS.map(k => block(k, k === 'BIO005_WEEKS' ? W : window[k], stamp)).join('\n'));

console.log('competency week fields changed:', moved, 'of', C.length);
console.log('WK  n   topics');
for(let w=1;w<=15;w++){
  const cs=C.filter(c=>c.week===w); const t=[...new Set(cs.map(c=>c.general))];
  console.log(String(w).padStart(2)+' '+String(cs.length).padStart(3)+'  '+TITLES[w-1]);
}
console.log('\ntotal', C.length, '| dangling refs:', W.reduce((s,w)=>s+w.competencies.filter(id=>!C.find(c=>c.id===id)).length,0));
