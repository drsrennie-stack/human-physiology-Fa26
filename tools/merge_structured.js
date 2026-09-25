/* ============================================================
   tools/merge_structured.js

   Merges the structured prompts in tools/prompts/structured/weekNN.json
   (a bold question, bullet steps, and a one line answer) into
   assets/bio005-sheet-data.js as it.ax and it.bx, matched on competency
   NAME. The plain it.a and it.b strings are rewritten from the same words,
   so any page that still shows the paragraph shows the new wording.
   Weeks 1 to 3 have no structured file and are never touched.
   Sep 25 2026.

   Run: node tools/merge_structured.js 4
   ============================================================ */
const fs = require('fs'), path = require('path');
const ROOT = process.cwd();
const FILE = path.join(ROOT, 'assets/bio005-sheet-data.js');
global.window = {};
require(FILE);
const S = window.BIO005_SHEET;

function flat(p){
  const out = [p.q];
  let lead = null;
  p.do.forEach(s => {
    if (typeof s === 'string') out.push(s);
    else out[out.length - 1] = out[out.length - 1].replace(/:$/, ': ') + s.sub.join(', ') + '.';
  });
  out.push('In one line: ' + p.one.charAt(0).toLowerCase() + p.one.slice(1));
  return out.join(' ').replace(/\s+/g, ' ').replace(/: \s*/g, ': ');
}

const weeks = process.argv.slice(2);
let n = 0, bad = [];
weeks.forEach(w => {
  const P = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/prompts/structured/week' + String(w).padStart(2,'0') + '.json'), 'utf8'));
  const items = S[String(w)].items;
  Object.keys(P).forEach(name => {
    const it = items.find(i => i.name === name);
    if (!it) { bad.push('week ' + w + ': "' + name + '" matches no competency'); return; }
    ['a','b'].forEach(k => { it[k + 'x'] = P[name][k]; it[k] = flat(P[name][k]); });
    n++;
  });
  items.forEach(i => { if (!P[i.name]) bad.push('week ' + w + ': "' + i.name + '" has no structured prompt'); });
});
const banner = fs.readFileSync(FILE, 'utf8').split('window.BIO005_SHEET')[0];
fs.writeFileSync(FILE, banner + 'window.BIO005_SHEET = ' + JSON.stringify(S, null, 1) + ';\n');
console.log('merged ' + n); bad.forEach(b => console.log('  ' + b));
