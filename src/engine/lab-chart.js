/* =====================================================================
   THE CLINICAL PHYSIOLOGY LAB, shared engine
   Part 4: the patient chart and the note underneath it.

   THE CHART
   The same flowsheet every week. Values arrive the way they do in real
   life, buried in a handover paragraph, and the student pulls each one
   into its row and then judges it against the reference range.

   The rule that makes it a chart rather than a worksheet: a blank row is
   never an answer. If a value was not measured, the student has to say
   so. Leaving it empty is treated as an incomplete chart, because that
   is exactly what it is.

   THE NOTE
   The same five prompts every week. Pertinent abnormals, pertinent
   negatives, what was not obtained, the mechanism, then the student's
   own sentences. Every section demands an answer, including an explicit
   "nothing pertinent", for the same reason.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, $$ = L.$$, fmt = L.fmt;

L.charted = [];   /* what the student wrote, for the printed record */
L.noted = [];

var FLAGS = [
  { id: '', text: 'Choose' },
  { id: 'below', text: 'Below range' },
  { id: 'within', text: 'Within range' },
  { id: 'above', text: 'Above range' },
  { id: 'na', text: 'Not obtained' }
];

function refText(row) {
  if (row.lo == null && row.hi == null) return row.ref || '';
  if (row.lo == null) return 'up to ' + row.hi;
  if (row.hi == null) return row.lo + ' and above';
  return row.lo + ' to ' + row.hi;
}
function trueFlag(row, v) {
  if (v == null) return 'na';
  if (row.lo != null && v < row.lo) return 'below';
  if (row.hi != null && v > row.hi) return 'above';
  return 'within';
}

/* =====================================================================
   THE CHART
   cfg: {
     id, ctx, bucket, onComplete, caption,
     groups: [{ title, note, rows: [{
        key, label, unit, lo, hi, dp, tol,
        value: function (ctx) { return <number> or null; },
        pending: 'text shown while a derived row is waiting'
     }]}]
   }
   ===================================================================== */
function chartSheet(cfg) {
  var rows = [];
  var wrap = el('div');
  var live = el('p', { class: 'note', 'aria-live': 'polite', style: 'margin:14px 0 0' });
  var locked = false;

  cfg.groups.forEach(function (g) {
    var tbl = el('table', { class: 'chart-t' });
    tbl.appendChild(el('caption', { text: g.title }));
    var th = el('thead');
    th.innerHTML = '<tr><th scope="col">Measurement</th><th scope="col" class="num">Value</th>' +
      '<th scope="col">Units</th><th scope="col">Reference range</th><th scope="col">Your reading</th></tr>';
    tbl.appendChild(th);
    var tb = el('tbody');

    g.rows.forEach(function (row) {
      var idv = 'ch-' + cfg.id + '-' + row.key + '-v';
      var idf = 'ch-' + cfg.id + '-' + row.key + '-f';
      var input = el('input', {
        type: 'text', inputmode: 'decimal', id: idv, autocomplete: 'off',
        'aria-label': row.label + ', value'
      });
      var sel = el('select', { id: idf, 'aria-label': row.label + ', your reading' });
      FLAGS.forEach(function (f) { sel.appendChild(el('option', { value: f.id, text: f.text })); });

      var rec = { row: row, input: input, sel: sel, done: false, group: g.title };
      var fbCell = el('td', { class: 'chart-fb', colspan: '5' });
      var fbRow = el('tr', { class: 'chart-fbrow' }, fbCell);
      fbRow.hidden = true;
      rec.fbRow = fbRow; rec.fbCell = fbCell;

      if (row.pending) {
        input.disabled = true; sel.disabled = true;
        input.placeholder = '';
        rec.pending = true;
      }

      var tr = el('tr', { 'data-row': row.key }, [
        el('th', { scope: 'row', class: 'chart-lab' }, [
          el('span', { text: row.label }),
          row.pending ? el('small', { class: 'chart-pend', text: row.pending }) : null
        ]),
        el('td', { class: 'num' }, input),
        el('td', { class: 'chart-u', text: row.unit || '' }),
        el('td', { class: 'chart-r', text: refText(row) }),
        el('td', null, sel)
      ]);
      rec.tr = tr;
      rows.push(rec);
      tb.appendChild(tr);
      tb.appendChild(fbRow);
    });

    tbl.appendChild(tb);
    wrap.appendChild(el('div', { class: 'chart-wrap' }, tbl));
    if (g.note) wrap.appendChild(el('p', { class: 'note', style: 'margin:8px 0 18px', html: g.note }));
  });

  function check() {
    if (locked) return;
    var right = 0, wrong = 0, blank = 0;
    var firstProblem = null;

    rows.forEach(function (rec) {
      if (rec.pending) return;
      var row = rec.row;
      var want = row.value(cfg.ctx);
      var wantFlag = trueFlag(row, want);
      var rawV = rec.input.value.trim();
      var gotF = rec.sel.value;

      rec.input.classList.remove('ok', 'bad');
      rec.sel.classList.remove('ok', 'bad');
      rec.fbRow.hidden = true;

      /* the rule: nothing may be left undecided */
      if (!gotF) {
        blank++;
        rec.sel.classList.add('bad');
        say(rec, 'This row has not been dispositioned. Every row needs a reading, even if the reading is that nothing was measured. A blank row in a chart means nobody can tell whether it was done, forgotten, or normal.');
        if (!firstProblem) firstProblem = rec;
        return;
      }

      var vOK, fOK = (gotF === wantFlag);

      if (wantFlag === 'na') {
        vOK = (rawV === '');
        if (!vOK) {
          rec.input.classList.add('bad');
          say(rec, 'Nothing in the handover gives you this value, so there is nothing to write in the box. Clear it and mark the row not obtained.');
          wrong++; if (!firstProblem) firstProblem = rec;
          return;
        }
        if (!fOK) {
          rec.sel.classList.add('bad');
          say(rec, 'This was never measured. That is not the same as normal, and it is not the same as blank. Mark it not obtained, so anyone reading the chart knows it is missing rather than fine.');
          wrong++; if (!firstProblem) firstProblem = rec;
          return;
        }
        rec.sel.classList.add('ok');
        rec.done = true; right++;
        return;
      }

      if (rawV === '') {
        blank++;
        rec.input.classList.add('bad');
        say(rec, 'This value is in the handover. Find it and chart it.');
        if (!firstProblem) firstProblem = rec;
        return;
      }
      var got = parseFloat(rawV);
      var tol = row.tol == null ? 0.05 : row.tol;
      vOK = !isNaN(got) && Math.abs(got - want) <= tol;

      if (!vOK) {
        rec.input.classList.add('bad');
        say(rec, 'That is not the number in the handover. Read the paragraph again rather than the one next to it: transcription errors are the commonest chart error there is, and they follow a patient for days.');
        wrong++; if (!firstProblem) firstProblem = rec;
        return;
      }
      rec.input.classList.add('ok');

      if (!fOK) {
        rec.sel.classList.add('bad');
        say(rec, 'The value is charted correctly, but the reading is not. ' + fmt(want, row.dp == null ? 0 : row.dp) +
          ' against a range of ' + refText(row) + ' is <b>' + flagWord(wantFlag) + '</b>. ' +
          (wantFlag === 'within'
            ? 'Marking a normal value abnormal starts a hunt for a problem that is not there.'
            : 'A value outside its range has to be seen as outside its range, every time, before anything else can follow from it.'));
        wrong++; if (!firstProblem) firstProblem = rec;
        return;
      }
      rec.sel.classList.add('ok');
      rec.done = true; right++;
    });

    var total = rows.filter(function (r) { return !r.pending; }).length;
    var msg = right + ' of ' + total + ' rows charted correctly.';
    if (blank) msg += ' ' + blank + ' still undecided.';
    if (wrong) msg += ' ' + wrong + ' to look at again.';
    live.innerHTML = '<strong>' + msg + '</strong>';

    if (right === total) {
      locked = true;
      rows.forEach(function (rec) {
        if (rec.pending) return;
        rec.input.readOnly = true; rec.sel.disabled = true;
        L.charted.push({
          group: rec.group, label: rec.row.label,
          value: rec.input.value.trim() === '' ? 'not obtained' : rec.input.value.trim() + ' ' + (rec.row.unit || ''),
          reading: flagWord(rec.sel.value)
        });
      });
      if (cfg.bucket) L.score(cfg.bucket, true);
      live.innerHTML = '<strong>The chart is complete.</strong> Every row has a value or a reason there is not one.';
      if (cfg.onComplete) cfg.onComplete();
    } else {
      if (cfg.bucket) L.score(cfg.bucket, false);
      if (firstProblem) firstProblem.input.focus();
    }
  }

  function say(rec, html) {
    rec.fbRow.hidden = false;
    rec.fbCell.innerHTML = html;
    L.wireTerms(rec.fbCell);
  }
  function flagWord(f) {
    return { below: 'below range', within: 'within range', above: 'above range', na: 'not obtained' }[f] || f;
  }

  /* fill a derived row later, from a value the student has already proved */
  function fill(key, value, dp) {
    rows.forEach(function (rec) {
      if (rec.row.key !== key) return;
      rec.pending = false;
      rec.input.value = fmt(value, dp == null ? 1 : dp);
      rec.input.readOnly = true;
      rec.input.classList.add('ok');
      rec.sel.disabled = false;
      rec.sel.value = trueFlag(rec.row, value);
      rec.sel.classList.add('ok');
      rec.sel.disabled = true;
      var p = rec.tr.querySelector('.chart-pend');
      if (p) p.textContent = 'carried down from your own working';
      L.charted.push({
        group: rec.group, label: rec.row.label,
        value: fmt(value, dp == null ? 1 : dp) + ' ' + (rec.row.unit || ''),
        reading: flagWord(trueFlag(rec.row, value))
      });
    });
  }

  var node = el('div', null, [
    el('p', { class: 'ws-rule', html:
      '<strong>Chart every row.</strong> A row you leave blank is not a row you skipped, it is a row nobody can account for. ' +
      'If the handover does not give you a value, mark it <b>not obtained</b>. Not measured is a finding. Blank is not.' }),
    wrap,
    el('div', { class: 'btnrow' }, [
      el('button', { class: 'btn', type: 'button', text: 'Check my chart', onclick: check })
    ]),
    live
  ]);
  return { node: node, fill: fill };
}
L.chartSheet = chartSheet;

/* =====================================================================
   A PROMPT THAT STEPS OUT OF THE WAY
   The question is read, then folded away, so the surface a student is
   writing on does not carry the question text. It is always one button
   away, and reopening it is announced.
   ===================================================================== */
function foldingPrompt(label, promptHTML) {
  var slot = el('div', { class: 'fold-slot' });
  var openBtn = el('button', {
    class: 'btn sec sm', type: 'button', 'aria-expanded': 'false',
    onclick: function () { toggle(); }
  }, 'Show the prompt again');
  openBtn.hidden = true;

  var body = el('div', { class: 'fold-body' });
  body.innerHTML = promptHTML;

  var readBtn = el('button', {
    class: 'btn cta sm', type: 'button',
    onclick: function () { toggle(); }
  }, [el('span', { text: 'I have read it, hide the prompt' }), el('span', { class: 'arw', 'aria-hidden': 'true', text: '→' })]);

  var open = true;
  function toggle() {
    open = !open;
    if (open) {
      body.innerHTML = promptHTML;
      L.wireTerms(body);
      slot.appendChild(readBtn);
      openBtn.hidden = true;
      openBtn.setAttribute('aria-expanded', 'true');
    } else {
      /* removed from the page, not merely hidden */
      body.innerHTML = '';
      if (readBtn.parentNode) readBtn.parentNode.removeChild(readBtn);
      openBtn.hidden = false;
      openBtn.setAttribute('aria-expanded', 'false');
    }
  }

  slot.appendChild(el('p', { class: 'fold-label', text: label }));
  slot.appendChild(body);
  slot.appendChild(readBtn);
  slot.appendChild(openBtn);
  L.wireTerms(body);
  return slot;
}
L.foldingPrompt = foldingPrompt;

/* =====================================================================
   THE NOTE
   cfg: {
     id, bucket, onComplete,
     sections: [{
       key, title, prompt,
       options: [{ id, text, correct: true|false }],
       noneText: 'No pertinent abnormal findings',
       noneCorrect: false,
       because: 'shown once the section is right'
     }],
     free: [{ key, label, prompt, minWords }]
   }
   ===================================================================== */
function clinicalNote(cfg) {
  var wrap = el('div');
  var remaining = cfg.sections.length + (cfg.free || []).length;
  var live = el('p', { class: 'note', 'aria-live': 'polite', style: 'margin:14px 0 0' });

  cfg.sections.forEach(function (sec) {
    var boxes = [];
    var noneBox = null;
    var listEl = el('div', { class: 'note-opts' });
    var settled = false;

    function mk(id, text, isNone) {
      var iid = 'nt-' + cfg.id + '-' + sec.key + '-' + id;
      var cb = el('input', { type: 'checkbox', id: iid, value: id });
      cb.addEventListener('change', function () {
        if (isNone && cb.checked) boxes.forEach(function (b) { b.cb.checked = false; });
        else if (!isNone && cb.checked && noneBox) noneBox.checked = false;
      });
      var lab = el('label', { class: 'note-opt', for: iid }, [cb, el('span', { text: text })]);
      listEl.appendChild(lab);
      return cb;
    }

    sec.options.forEach(function (o) { boxes.push({ o: o, cb: mk(o.id, o.text, false) }); });
    if (sec.noneText) noneBox = mk('__none', sec.noneText, true);

    var fb = el('p', { class: 'ws-fb', 'aria-live': 'polite' }); fb.hidden = true;
    var btn = el('button', { class: 'btn sm', type: 'button', text: 'Check this section', onclick: check });

    function check() {
      if (settled) return;
      var picked = boxes.filter(function (b) { return b.cb.checked; });
      var noneOn = noneBox && noneBox.checked;
      fb.hidden = false;

      if (!picked.length && !noneOn) {
        fb.className = 'ws-fb warn';
        fb.innerHTML = '<strong>Nothing selected. </strong>A section left empty says nothing at all. If there is genuinely nothing to report here, say that explicitly by ticking "' +
          (sec.noneText || 'nothing pertinent') + '". In a real note, silence and "none found" are read completely differently.';
        return;
      }

      var wantIds = sec.options.filter(function (o) { return o.correct; }).map(function (o) { return o.id; });
      var gotIds = picked.map(function (b) { return b.o.id; });
      var missed = wantIds.filter(function (i) { return gotIds.indexOf(i) < 0; });
      var extra = gotIds.filter(function (i) { return wantIds.indexOf(i) < 0; });
      var noneShouldBe = wantIds.length === 0;

      if (noneOn && !noneShouldBe) {
        fb.className = 'ws-fb bad';
        fb.innerHTML = '<strong>There is something here. </strong>You have said nothing is pertinent, but there is at least one finding in this section that changes what you would do next. Go back to your chart.';
        if (cfg.bucket) L.score(cfg.bucket, false);
        return;
      }
      if (!noneOn && noneShouldBe) {
        fb.className = 'ws-fb bad';
        fb.innerHTML = '<strong>Nothing here is pertinent. </strong>Everything you selected is real, but none of it changes what happens next for this patient. Saying so explicitly is the answer.';
        if (cfg.bucket) L.score(cfg.bucket, false);
        return;
      }
      if (missed.length || extra.length) {
        fb.className = 'ws-fb bad';
        var m = '<strong>Not quite. </strong>';
        if (missed.length) m += 'You have left out ' + missed.length + ' finding' + (missed.length > 1 ? 's' : '') + ' that matter' + (missed.length > 1 ? '' : 's') + ' here. ';
        if (extra.length) m += 'You have included ' + extra.length + ' that ' + (extra.length > 1 ? 'do' : 'does') + ' not belong in this section. ';
        m += 'Over-reporting is not a safe error: a note that flags everything hides the thing that mattered.';
        fb.innerHTML = m;
        if (cfg.bucket) L.score(cfg.bucket, false);
        return;
      }

      settled = true;
      boxes.forEach(function (b) { b.cb.disabled = true; });
      if (noneBox) noneBox.disabled = true;
      btn.hidden = true;
      fb.className = 'ws-fb ok';
      fb.innerHTML = '<strong>Yes. </strong>' + (sec.because || '');
      L.wireTerms(fb);
      if (cfg.bucket) L.score(cfg.bucket, true);
      L.noted.push({
        section: sec.title,
        answer: noneOn ? sec.noneText : picked.map(function (b) { return b.o.text; }).join('; ')
      });
      remaining--;
      done();
    }

    wrap.appendChild(el('div', { class: 'note-sec' }, [
      el('h3', { text: sec.title }),
      sec.prompt ? el('p', { class: 'note', html: sec.prompt }) : null,
      listEl,
      el('div', { class: 'btnrow', style: 'margin-top:12px' }, btn),
      fb
    ]));
  });

  (cfg.free || []).forEach(function (f) {
    var tid = 'nf-' + cfg.id + '-' + f.key;
    var ta = el('textarea', { id: tid, rows: '5', 'aria-label': f.label, placeholder: '' });
    var count = el('p', { class: 'note', style: 'margin:8px 0 0', 'aria-live': 'polite' });
    var fb = el('p', { class: 'ws-fb' }); fb.hidden = true;
    var settled = false;
    var min = f.minWords || 15;

    function words() { return ta.value.trim().split(/\s+/).filter(Boolean).length; }
    ta.addEventListener('input', function () {
      var w = words();
      count.textContent = w + ' word' + (w === 1 ? '' : 's') + '. At least ' + min + ' are needed.';
    });

    var btn = el('button', {
      class: 'btn sm', type: 'button', text: 'Record this',
      onclick: function () {
        if (settled) return;
        var w = words();
        fb.hidden = false;
        if (w < min) {
          fb.className = 'ws-fb warn';
          fb.textContent = 'That is ' + w + ' words. This one is not multiple choice, and it is the part your instructor actually reads. Say what you think is happening to this patient and why, in your own words.';
          ta.focus();
          return;
        }
        settled = true;
        ta.readOnly = true;
        btn.hidden = true;
        fb.className = 'ws-fb ok';
        fb.innerHTML = '<strong>Recorded. </strong>This prints on your PDF exactly as you wrote it.';
        L.noted.push({ section: f.label, answer: ta.value.trim() });
        remaining--;
        done();
      }
    });

    wrap.appendChild(el('div', { class: 'note-sec' }, [
      el('h3', { text: f.label }),
      L.foldingPrompt(f.label, f.prompt),
      el('label', { class: 'sr-only', for: tid, text: f.label }),
      ta, count,
      el('div', { class: 'btnrow', style: 'margin-top:12px' }, btn),
      fb
    ]));
  });

  function done() {
    if (remaining > 0) {
      live.textContent = remaining + ' section' + (remaining === 1 ? '' : 's') + ' still to complete.';
      return;
    }
    live.innerHTML = '<strong>The note is complete.</strong>';
    if (cfg.onComplete) cfg.onComplete();
  }

  return el('div', null, [
    el('p', { class: 'ws-rule', html:
      '<strong>Every section gets an answer.</strong> If there is nothing to report in a section, say so in as many words. ' +
      'A note that skips a heading and a note that says "none found" read completely differently to whoever picks up this patient next.' }),
    wrap, live
  ]);
}
L.clinicalNote = clinicalNote;
})();
