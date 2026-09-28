#!/usr/bin/env node
/* ============================================================
   tools/check_ehr_chart.js

   Does bio005-chart-ehr.js contradict bio005-patient-chart.js?

   The case file is the source of truth for the story. The EHR file
   holds the grid: vital signs against a time, intake and output, the
   medication record and the orders. A flowsheet needs more rows than
   a paragraph does, so some values in the EHR file are new. This
   checks that the new ones are constrained rather than invented.

   Four checks:
     1. Every mean arterial pressure follows from its own blood
        pressure, (systolic + 2 x diastolic) / 3, within rounding.
     2. Every intake and output column adds up: oral + intravenous is
        total in, urine + other is total out, and in minus out is the
        net.
     3. Every interval value that sits outside the range the case
        file states for that measure that week is listed, with the
        range, so a human can confirm the direction is right. These
        are warnings and not failures: a patient who is recovering
        legitimately moves past the last value the story mentions.
     4. Reports how many values came straight out of the case file
        and lists the ones that did not, so a human can read them.

   Run:  node tools/check_ehr_chart.js
   Exit: 0 if the arithmetic in checks 1 and 2 holds, 1 if it does
         not. Check 3 never fails the run; it prints for reading.
   ============================================================ */

var path = require('path');
var dir = path.resolve(__dirname, '..');
global.window = {};
require(path.join(dir, 'bio005-patient-chart.js'));
require(path.join(dir, 'bio005-chart-ehr.js'));
var C = window.BIO005_CHART, E = window.BIO005_EHR;
var WKS = Object.keys(E.weeks).map(Number).sort(function (a, b) { return a - b; });

function weekText(n) {
  var w = C.weeks[n];
  var t = [w.arc, w.title, w.date, w.when, w.encounter].join(' ');
  w.chart.forEach(function (r) { t += ' ' + r[0] + ' ' + r[1]; });
  (w.panels || []).forEach(function (p) { t += ' ' + p.name + ' ' + p.when; p.rows.forEach(function (r) { t += ' ' + r.join(' '); }); });
  (w.tools || []).forEach(function (x) { t += ' ' + x[0] + ' ' + x[1]; });
  Object.keys(w.tracks).forEach(function (k) { t += ' ' + w.tracks[k].data + ' ' + w.tracks[k].go; });
  (E.weeks[n].panels || []).forEach(function (p) { p.rows.forEach(function (r) { t += ' ' + r.join(' '); }); });
  return t.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/,/g, '');
}
/* Pooled by patient: a value carried into a later baseline column is not new. */
var pool = { A:'', B:'' };
WKS.forEach(function (n) { pool[C.patientByWeek[n]] += ' ' + weekText(n); });
function has(t, x) { return new RegExp('(^|[^\\d.])' + x.replace('.', '\\.') + '(?!\\d)(?!\\.\\d)').test(t); }
function firstNum(v) { var m = String(v).replace(/,/g, '').match(/-?\d+(?:\.\d+)?/); return m ? Number(m[0]) : null; }

var fail = [], warn = [];

/* 1. mean arterial pressures */
var mapChecked = 0;
WKS.forEach(function (n) {
  E.weeks[n].flow.forEach(function (c, i) {
    if (!c.map || !c.bp) { return; }
    var p = c.bp.split('/').map(Number);
    var want = Math.round((p[0] + 2 * p[1]) / 3);
    mapChecked++;
    if (Math.abs(want - Number(c.map)) > 0.6) {
      fail.push('MAP  wk' + n + ' col' + i + ': ' + c.bp + ' charted as ' + c.map + ', should be ' + want);
    }
  });
});

/* 2. intake and output arithmetic */
var ioChecked = 0;
WKS.forEach(function (n) {
  (E.weeks[n].io || []).forEach(function (c, i) {
    var oral = firstNum(c.oral), iv = firstNum(c.iv), ti = firstNum(c.totalIn);
    var ur = firstNum(c.urine), ot = firstNum(c.other), to = firstNum(c.totalOut), net = firstNum(c.net);
    var sign = /minus|^-/.test(String(c.net)) ? -1 : 1;
    var where = 'IO   wk' + n + ' io[' + i + ']: ';
    if (oral != null && iv != null && ti != null) {
      ioChecked++;
      if (oral + iv !== ti) { fail.push(where + oral + ' + ' + iv + ' is ' + (oral + iv) + ', charted total in ' + ti); }
    }
    if (ur != null && ot != null && to != null) {
      ioChecked++;
      if (ur + ot !== to) { fail.push(where + 'urine ' + ur + ' + other ' + ot + ' is ' + (ur + ot) + ', charted total out ' + to); }
    }
    if (ti != null && to != null && net != null) {
      ioChecked++;
      if (ti - to !== net * sign) { fail.push(where + ti + ' minus ' + to + ' is ' + (ti - to) + ', charted net ' + c.net); }
    }
  });
});

/* 3. interval values sit inside the range the case file states */
var rangeChecked = 0;
WKS.forEach(function (n) {
  var t = pool[C.patientByWeek[n]], ex = E.weeks[n];
  var byKey = {};
  ex.flow.forEach(function (c) {
    Object.keys(c).forEach(function (k) {
      if (k === 't' || k === 'bp' || k === 'map' || k === 'o2' || k === 'pupils' || k === 'dtr' || k === 'temp' || k === 'wt') { return; }
      var v = firstNum(c[k]);
      if (v == null) { return; }
      (byKey[k] = byKey[k] || []).push({ v:v, stated:has(t, String(c[k]).replace(/,/g, '')) });
    });
  });
  Object.keys(byKey).forEach(function (k) {
    var rows = byKey[k];
    var stated = rows.filter(function (r) { return r.stated; }).map(function (r) { return r.v; });
    if (stated.length < 2) { return; }
    var lo = Math.min.apply(null, stated), hi = Math.max.apply(null, stated);
    rows.forEach(function (r) {
      if (r.stated) { return; }
      rangeChecked++;
      if (r.v < lo || r.v > hi) {
        warn.push('wk' + n + ' ' + k + ' = ' + r.v + ', outside the range the case states that week, ' + lo + ' to ' + hi
          + '. Confirm the direction of travel is right.');
      }
    });
  });
});

/* 4. how much is straight from the case file, and what is not */
var fromCase = 0, novel = [];
WKS.forEach(function (n) {
  var t = pool[C.patientByWeek[n]], ex = E.weeks[n];
  function chk(where, k, raw) {
    if (k === 'map') { return; }                       /* derived, checked above */
    var v = String(raw).replace(/<[^>]+>/g, '').replace(/,/g, '');
    var ns = v.match(/-?\d+(?:\.\d+)?/g);
    if (!ns) { return; }
    if (ns.every(function (x) { return has(t, x); })) { fromCase++; }
    else { novel.push('wk' + n + ' ' + where + '.' + k + ' = ' + v); }
  }
  ex.flow.forEach(function (c, i) { Object.keys(c).forEach(function (k) { if (k !== 't') { chk('flow[' + i + ']', k, c[k]); } }); });
  (ex.io || []).forEach(function (c, i) { Object.keys(c).forEach(function (k) { if (k !== 't') { chk('io[' + i + ']', k, c[k]); } }); });
});

console.log('mean arterial pressures checked: ' + mapChecked);
console.log('intake and output sums checked:  ' + ioChecked);
console.log('interval values range checked:   ' + rangeChecked);
console.log('values taken straight from the case file: ' + fromCase);
console.log('values written for the flowsheet and not in the case file: ' + novel.length);
console.log('');
if (fail.length) {
  console.log('ARITHMETIC FAILURES (' + fail.length + '):');
  fail.forEach(function (f) { console.log('  ' + f); });
} else {
  console.log('All arithmetic checks pass: every mean arterial pressure follows from its blood pressure, and every fluid column adds up.');
}
if (warn.length) {
  console.log('\nInterval values that run past what the story states (' + warn.length + '), for a human to confirm:');
  warn.forEach(function (w) { console.log('  ' + w); });
}
if (process.argv.indexOf('--list-new') !== -1) {
  console.log('\nValues written for the flowsheet, for a human to read:');
  novel.forEach(function (x) { console.log('  ' + x); });
}
process.exit(fail.length ? 1 : 0);
