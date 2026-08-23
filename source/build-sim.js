/* Builds the single self contained patient file HTML from sim-data.js */
const fs = require("fs");
const path = require("path");
const D = require("./sim-data.js");

const KEY = "physio-2026-rennie";

function enc(str){
  if(str == null || str === "") return "";
  const bytes = Buffer.from(String(str), "utf8");
  const out = Buffer.alloc(bytes.length);
  for(let i=0;i<bytes.length;i++){ out[i] = bytes[i] ^ (KEY.charCodeAt(i % KEY.length) & 0xff); }
  return out.toString("base64");
}

// encode NORMALS
const NORMALS = {};
Object.keys(D.NORMALS).forEach(k => { NORMALS[k] = enc(D.NORMALS[k]); });

// encode variants, strip the answer key
const VARIANTS = D.VARIANTS.map(v => {
  const r = {};
  Object.keys(v.r).forEach(k => { r[k] = enc(v.r[k]); });
  return { id:v.id, who:v.who, role:v.role, beats:v.beats.map(enc), r };
});

const payload =
  "var KEY = " + JSON.stringify(KEY) + ";\n" +
  "var COURSE = " + JSON.stringify(D.COURSE) + ";\n" +
  "var WEEKS = " + JSON.stringify(D.WEEKS) + ";\n" +
  "var CATS = " + JSON.stringify(D.CATS) + ";\n" +
  "var TESTS = " + JSON.stringify(D.TESTS) + ";\n" +
  "var NORMALS = " + JSON.stringify(NORMALS) + ";\n" +
  "var VARIANTS = " + JSON.stringify(VARIANTS) + ";\n";

const tpl = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
if(tpl.indexOf("/*__DATA__*/") < 0) throw new Error("data placeholder missing");
let html = tpl.replace("/*__DATA__*/", payload);

// sanity: no em dashes anywhere in the shipped file
const em = (html.match(/—/g) || []).length;
if(em) { html = html.replace(/—/g, ","); console.log("Replaced " + em + " em dash(es)."); }

const outDir = path.join(__dirname, "out");
fs.mkdirSync(outDir, { recursive:true });
const outFile = path.join(outDir, "BIO005-patient-file.html");
fs.writeFileSync(outFile, html, "utf8");

// ---- instructor answer key ----
let key = "# BIO 005 Progressive Patient File, instructor key\n\n";
key += "Dr. Sharilyn Rennie. " + D.COURSE.section + ". " + D.COURSE.term + ".\n\n";
key += "Master code, opens every week at once for your own review: `" + D.COURSE.masterCode + "`\n\n";
key += "## Week unlock codes\n\n| Week | Title | Dates | Code | Order tokens |\n|---|---|---|---|---|\n";
D.WEEKS.forEach(w => { key += `| ${w.n} | ${w.title} | ${w.dates} | \`${w.code}\` | ${w.budget} |\n`; });
key += "\n## Patient variants\n\n";
D.VARIANTS.forEach(v => {
  key += `### Variant ${v.id}. ${v.who}, ${v.role}\n\n`;
  key += `**Condition:** ${v.label}\n\n`;
  key += `**What it teaches:** ${v.teach}\n\n`;
  const flags = Object.keys(v.r).filter(k => {
    const t = D.TESTS.find(t => t.id === k);
    return t && ["chem","cbc","fe","endo","abg","renal","card","pft","gi"].includes(t.cat);
  });
  key += "**Key abnormal results:**\n\n";
  flags.forEach(k => {
    const t = D.TESTS.find(t => t.id === k);
    key += `- ${t.name}: ${v.r[k]}${t.ref ? "  (ref " + t.ref + ")" : ""}\n`;
  });
  key += "\n";
});
fs.writeFileSync(path.join(outDir, "BIO005-patient-file-KEY.md"), key, "utf8");

console.log("Built " + outFile + " (" + Math.round(fs.statSync(outFile).size/1024) + " KB)");
console.log("Variants: " + VARIANTS.length + ", tests: " + D.TESTS.length + ", weeks: " + D.WEEKS.length);
