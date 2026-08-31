/* Three-way comparison of the competency data.
     LIVE     what is actually in her GitHub repo right now
     LOCAL    the source file I have been building from
     SHIPPED  the remapped file the pre-work pages are generated from
   Compared record by record, not byte by byte, so a reformat does not
   masquerade as a change and a real change cannot hide inside one. */
function load(path) {
  delete require.cache[require.resolve(path)];
  global.window = {};
  require(path);
  return window.BIO005_COMPETENCIES;
}
const LIVE = load('./physio/bio005-competencies.js');
const LOCAL = load('./bio005-hub/bio005-competencies.js');
const SHIP = load('./bio005-hub/bio005-competencies.remapped.js');

const idx = a => Object.fromEntries(a.map(c => [c.id, c]));
const L = idx(LIVE), M = idx(LOCAL), S = idx(SHIP);

function setdiff(a, b, an, bn) {
  const only = Object.keys(a).filter(k => !(k in b));
  if (only.length) console.log(`  in ${an} but not ${bn} (${only.length}):`, only.join(', '));
  return only.length;
}

console.log('counts:  LIVE', LIVE.length, ' LOCAL', LOCAL.length, ' SHIPPED', SHIP.length);
console.log('\n--- are the same competencies present? ---');
let d = 0;
d += setdiff(L, M, 'LIVE', 'LOCAL');
d += setdiff(M, L, 'LOCAL', 'LIVE');
d += setdiff(M, S, 'LOCAL', 'SHIPPED');
d += setdiff(S, M, 'SHIPPED', 'LOCAL');
if (!d) console.log('  identical id sets across all three');

const FIELDS = ['name', 'can', 'dok', 'yield', 'est', 'general', 'system'];
console.log('\n--- LIVE vs LOCAL: does any content differ? ---');
let contentDiff = 0;
Object.keys(L).forEach(id => {
  if (!M[id]) return;
  FIELDS.forEach(f => {
    const a = JSON.stringify(L[id][f]), b = JSON.stringify(M[id][f]);
    if (a !== b) {
      contentDiff++;
      if (contentDiff <= 6) console.log(`  ${id}.${f}\n     LIVE  ${a}\n     LOCAL ${b}`);
    }
  });
});
console.log(contentDiff ? `  ${contentDiff} field差` : '  no content differences in any of ' + FIELDS.join('/'));

console.log('\n--- week assignment: LIVE vs SHIPPED ---');
const moved = [];
Object.keys(S).forEach(id => {
  if (L[id] && L[id].week !== S[id].week) moved.push({ id, from: L[id].week, to: S[id].week, topic: S[id].general });
});
console.log(`  ${moved.length} of ${SHIP.length} competencies sit on a different week than the live file says`);
const byTopic = {};
moved.forEach(m => {
  const k = `${m.topic}: week ${m.from} -> ${m.to}`;
  byTopic[k] = (byTopic[k] || 0) + 1;
});
Object.entries(byTopic).sort().forEach(([k, n]) => console.log(`     ${String(n).padStart(3)}  ${k}`));

console.log('\n--- do any topics get SPLIT across weeks in the shipped data? ---');
const topicWeeks = {};
SHIP.forEach(c => { (topicWeeks[c.general] = topicWeeks[c.general] || new Set()).add(c.week); });
const split = Object.entries(topicWeeks).filter(([, s]) => s.size > 1);
console.log(split.length ? split.map(([t, s]) => `  ${t}: weeks ${[...s].join(', ')}`).join('\n')
                         : '  none, every topic sits entirely in one week');
