#!/usr/bin/env python3
"""
Pre-work notes builder.

    python3 build-prework.py 1            # one week
    python3 build-prework.py 1 6 8        # several
    python3 build-prework.py all          # all fifteen

Generates prework-week-NN.html: the page a student works through BEFORE the
videos and before any AI, turning each competency into a note in their own
words.

THE ARITHMETIC THIS IS BUILT AROUND
Her own est field puts the competency work at 107.4 hours across the term,
which is 7.2 h/week against a Carnegie budget of 14.4 h/week for four units.
That is half the budget before reading, lab, the problem log, the weekly post
or the videos. Adding a note-writing layer ON TOP of that peaks at 12.6 h in
Week 6, which does not survive contact with a real student.

So the note is not extra. The note IS the study. A student who writes these
has done the competency work; they are not reading first and then writing.
That is the whole design, and every wording choice on the page says so.

WHY THE NOTE CHANGES SHAPE
The dok field is already in her data and it is not decoration:
    DOK 1, 7 competencies    recall        the term in your own words
    DOK 2, 101 competencies  apply         the rule, plus one worked instance
    DOK 3, 160 competencies  reason        a causal chain, or a drawing
Sixty percent of this course is DOK 3, so a definition-shaped note box would
be the wrong tool for most of it. Each card asks for what its level needs.

WHAT MAKES IT HARD TO OUTSOURCE
The same spine as the problem log: a source line naming a figure or a section
heading or a video timestamp. AI does not know which figure is which in her
edition, and it does not know where a thing sits in her videos.

THE FLAG IS THE POINT
Every card has "I could not get this on my own". That is not a confession,
it is the instrument. It hands her a ranked list every week of exactly where
to intervene, which is the substantive, instructor-initiated interaction the
RSI rule asks for and which a quiz score cannot give her.

PRIVACY
Everything a student types stays in their own browser under a bio005- key.
Nothing is sent anywhere. Their name is never required.
"""
import io, os, sys, json, html, datetime, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('bw', os.path.join(HERE, 'build-week.py'))
bw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bw)
esc, LOGO, NAV, FOOT = bw.esc, bw.LOGO, bw.NAV, bw.FOOT
CSS = bw.TEMPLATE[bw.TEMPLATE.index('<style>'):bw.TEMPLATE.index('</style>') + 8].replace('%%', '%')

# What each depth-of-knowledge level actually asks a student to produce.
DOK = {
    1: {
        'tag': 'Say it',
        'ask': 'Write what this means in your own words. If you find yourself '
               'copying the book, you have not got it yet.',
        'hint': 'In my own words...',
    },
    2: {
        'tag': 'Use it',
        'ask': 'Write the rule, then one worked instance of it. A real example '
               'with real values, not "for example, a cell".',
        'hint': 'The rule is... and here it is working: ...',
    },
    3: {
        'tag': 'Reason it',
        'ask': 'Write the chain. If this thing changes, what happens next, and '
               'why does that follow? Draw it on paper if the chain has more '
               'than two steps, and say here what you drew.',
        'hint': 'If ... rises, then ... because ...',
    },
}


def load():
    return bw.load_data()


def human_time(mins):
    """Say it the way a person would. "216 minutes" is exactly the kind of
       number that makes a week look unsurvivable; "about three and a half
       hours" is the same fact and reads as a plan."""
    if mins < 75:
        return 'About %d minutes' % int(round(mins / 5.0) * 5)
    h = mins / 60.0
    whole = int(h)
    frac = h - whole
    if frac < 0.2:
        word = '%d hours' % whole
    elif frac < 0.4:
        word = '%d and a quarter hours' % whole
    elif frac < 0.65:
        word = '%d and a half hours' % whole
    elif frac < 0.85:
        word = '%d and three quarter hours' % whole
    else:
        word = '%d hours' % (whole + 1)
    return 'About ' + word


def build(wk, data):
    weeks = {w['wk']: w for w in data['weeks']}
    if wk not in weeks:
        raise SystemExit('week %d is not in the schedule' % wk)
    w = weeks[wk]
    comps = [c for c in data['comps'] if c['week'] == wk]
    if not comps:
        raise SystemExit('week %d has no competencies' % wk)

    # group by topic, in the order the topics first appear
    topics, order = {}, []
    for c in comps:
        g = c['general']
        if g not in order:
            order.append(g)
            topics[g] = []
        topics[g].append(c)

    groups = ''
    for gi, g in enumerate(order):
        cs = topics[g]
        mins = sum(c.get('est', 0) for c in cs)
        cards = ''
        for c in cs:
            d = DOK.get(c.get('dok', 2), DOK[2])
            cid = esc(c['id'])
            cards += (
                '<li class="pw-card" data-id="%s">'
                '<div class="pw-head">'
                '<span class="pw-dok pw-dok%d">%s</span>'
                '<h3>%s</h3>'
                '</div>'
                '<p class="pw-can">%s</p>'
                '<p class="pw-ask">%s</p>'
                '<label class="vh" for="n-%s">My note for %s</label>'
                '<textarea id="n-%s" data-note="%s" rows="3" placeholder="%s"></textarea>'
                '<div class="pw-foot">'
                '<label class="pw-flag"><input type="checkbox" data-flag="%s">'
                '<span>I could not get this on my own</span></label>'
                '<span class="pw-count" data-count="%s" aria-live="polite"></span>'
                '</div>'
                '</li>'
                % (cid, c.get('dok', 2), esc(d['tag']), esc(c['name']),
                   esc(c['can']), esc(d['ask']),
                   cid, esc(c['name']), cid, cid, esc(d['hint']),
                   cid, cid))

        groups += (
            '<section class="pw-group" aria-labelledby="g%d">'
            '<div class="pw-ghead">'
            '<h2 id="g%d">%s</h2>'
            '<p class="pw-time">%s if you write as you read</p>'
            '</div>'
            '<div class="pw-src">'
            '<label for="src-%d">Where you got this. Name the figure, the section '
            'heading, or the point in my video. Not a page number, those move '
            'between printings.</label>'
            '<input type="text" id="src-%d" data-src="%d" '
            'placeholder="Silverthorn fig 6.7, and the control pathways video at about 4 minutes">'
            '</div>'
            '<ul class="pw-list">%s</ul>'
            '</section>'
            % (gi, gi, esc(g), human_time(mins), gi, gi, gi, cards))

    total_min = sum(c.get('est', 0) for c in comps)
    ids = json.dumps([c['id'] for c in comps])
    names = json.dumps({c['id']: c['name'] for c in comps})

    nxt = ''
    if wk + 1 in weeks:
        nxt = ('<a class="btnB" href="prework-week-%02d.html" target="_top">'
               'Next week\'s notes</a>' % (wk + 1))

    return ('prework-week-%02d.html' % wk, PAGE % {
        'css': CSS,
        'nav': NAV % {'logo': LOGO, 'navthis': '', 'navhome': ''},
        'foot': FOOT,
        'wk': wk,
        'title': esc(w['title']),
        'opens': bw.fmt(w['opens']),
        'closes': bw.fmt(w['closes']),
        'hours': human_time(total_min).replace('About ', 'roughly '),
        'ngroups': len(order),
        'groups': groups,
        'ids': ids,
        'names': names,
        'next': nxt,
    })


PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<title>Pre-work notes &middot; Week %(wk)d &middot; BIO 005</title>
<meta name="description" content="BIO 005 Week %(wk)d pre-work. Turn each thing you need to be able to do into a note in your own words, before the videos and before any AI.">
%(css)s
<style>
.pw-wrap{max-width:900px;margin:0 auto;padding:0 max(16px,3vw)}
.band-dark{background:var(--navy);color:#fff}
.pw-hero{padding:44px 0 36px}
.pw-hero .eyeb{font-family:var(--display);font-weight:700;font-size:.72rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--straw-light);margin:0 0 .6rem}
.pw-hero h1{font-size:clamp(1.7rem,3.4vw,2.4rem);line-height:1.15;margin:0 0 14px;
  letter-spacing:-.025em;color:#fff;max-width:22ch}
.pw-hero p{color:#D6DCE6;font-size:1.02rem;line-height:1.65;max-width:62ch;margin:0 0 12px}
.pw-hero .when{font-size:.9rem;color:var(--straw-light);font-weight:600;margin:16px 0 0}

/* the one thing that has to land before they start */
.pw-rule{background:#fff;color:var(--navy);border-radius:var(--card-radius);
  padding:22px 24px;margin:0 0 -40px;position:relative;z-index:2;box-shadow:var(--shadow-lift)}
.pw-rule h2{font-size:1.05rem;margin:0 0 8px}
.pw-rule p{font-size:.96rem;margin:0 0 10px;max-width:64ch}
.pw-rule p:last-child{margin-bottom:0}
.pw-rule b{font-weight:700}
.pw-spacer{height:40px}

.pw-bar{position:sticky;top:0;z-index:30;background:var(--offwhite);
  border-bottom:1px solid var(--navy-15);padding:12px 0;margin:0 0 8px}
.pw-bar .pw-wrap{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.pw-meter{flex:1;min-width:160px;height:8px;background:var(--navy-15);border-radius:99px;overflow:hidden}
.pw-meter span{display:block;height:100%%;width:0;background:var(--terra);
  transition:width 220ms ease}
.pw-stat{font-size:.86rem;font-weight:700;color:var(--navy);white-space:nowrap}
.pw-stat .flagged{color:var(--terra);font-weight:800}

.pw-group{padding:30px 0 4px;border-top:1px solid var(--navy-15)}
.pw-group:first-of-type{border-top:0}
.pw-ghead h2{font-size:1.25rem;margin:0 0 4px;letter-spacing:-.02em}
.pw-time{font-size:.86rem;color:var(--navy-70);margin:0 0 16px}
.pw-src{background:#fff;border:1px solid var(--navy-15);border-radius:var(--card-radius);
  padding:14px 16px;margin:0 0 16px}
.pw-src label{display:block;font-size:.86rem;color:var(--navy-70);margin:0 0 8px;max-width:68ch}
.pw-src input{width:100%%;font:inherit;font-size:.94rem;color:var(--navy);background:#fff;
  border:1px solid var(--navy-50);border-radius:var(--btn-radius);padding:11px 12px;min-height:44px}

.pw-list{list-style:none;display:grid;gap:14px;margin:0;padding:0}
.pw-card{background:#fff;border:1px solid var(--navy-15);border-radius:var(--card-radius);
  padding:18px 20px}
.pw-card[data-done="yes"]{background:#F6FAF6;border-color:#9BBBA0}
.pw-card[data-flagged="yes"]{border-left:5px solid var(--terra)}
.pw-head{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:0 0 8px}
.pw-head h3{font-size:1.02rem;margin:0;letter-spacing:-.01em}
.pw-dok{font-family:var(--display);font-size:.62rem;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;border-radius:99px;padding:3px 9px;white-space:nowrap;
  background:var(--navy-tint);color:var(--navy)}
.pw-dok3{background:var(--terra);color:#fff}
.pw-can{font-size:.95rem;color:var(--navy);margin:0 0 8px;max-width:70ch}
.pw-ask{font-size:.86rem;color:var(--navy-70);margin:0 0 10px;max-width:70ch}
.pw-card textarea{width:100%%;font:inherit;font-size:.95rem;line-height:1.55;color:var(--navy);
  background:#fff;border:1px solid var(--navy-50);border-radius:var(--btn-radius);
  padding:11px 12px;min-height:80px;resize:vertical}
.pw-foot{display:flex;align-items:center;justify-content:space-between;gap:14px;
  flex-wrap:wrap;margin:10px 0 0}
.pw-flag{display:flex;align-items:center;gap:9px;min-height:44px;cursor:pointer;
  font-size:.88rem;font-weight:600;color:var(--navy)}
.pw-flag input{width:24px;height:24px;flex:0 0 auto;accent-color:var(--terra)}
.pw-count{font-size:.8rem;color:var(--navy-70);font-weight:600}

.pw-end{background:#fff;border:1px solid var(--navy-15);border-radius:var(--card-radius);
  padding:24px;margin:34px 0 0}
.pw-end h2{font-size:1.1rem;margin:0 0 8px}
.pw-end p{font-size:.94rem;margin:0 0 14px;max-width:66ch;color:var(--navy)}
.pw-acts{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 4px}
.btnA,.btnB{display:inline-flex;align-items:center;justify-content:center;min-height:44px;
  padding:12px 20px;border-radius:var(--btn-radius);font-family:var(--display);
  font-size:.86rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  text-decoration:none;border:2px solid transparent;cursor:pointer}
.btnA{background:var(--terra);border-color:var(--terra);color:#fff}
.btnA:hover{background:#fff;color:var(--terra)}
.btnB{background:#fff;border-color:var(--navy-50);color:var(--navy)}
.btnB:hover{background:var(--navy);color:#fff;border-color:var(--navy)}
.pw-said{font-size:.88rem;font-weight:700;color:var(--terra);margin:12px 0 0;min-height:1.2em}
.pw-endspace{height:50px}

@media print{
  .topbar,.site-footer,.pw-bar,.pw-acts,.band-dark{display:none}
  .pw-card,.pw-src{break-inside:avoid;page-break-inside:avoid}
  .pw-card textarea{border:1px solid #000;min-height:60px}
}
</style>
</head>
<body>
%(nav)s

<main id="main">

<div class="band-dark">
  <div class="pw-wrap">
    <section class="pw-hero" aria-labelledby="h1">
      <p class="eyeb">Week %(wk)d &middot; Pre-work</p>
      <h1 id="h1">%(title)s</h1>
      <p>Before the videos. Before any AI. Work through the list below and turn each
        thing you need to be able to do into a note in your own words.</p>
      <p class="when">Opens %(opens)s &middot; due with everything else, %(closes)s, 11:59 pm</p>
    </section>

    <section class="pw-rule" aria-labelledby="h-rule">
      <h2 id="h-rule">This is not extra work on top of studying. This is the studying.</h2>
      <p>The %(hours)s of work this week are the hours you spend writing these notes. If you
        read the chapter first and then come here to write it up, you have done it twice
        and learned it once.</p>
      <p><b>Open the book. Read a paragraph. Close the book. Write the note.</b> If you
        cannot write it with the book closed, you have not read it yet, you have looked at it.</p>
      <p>Say where you got each one. Naming a figure or a section heading or a point in
        one of my videos takes five seconds and it is the thing that makes this yours.</p>
    </section>
  </div>
</div>

<div class="pw-spacer"></div>

<div class="pw-bar">
  <div class="pw-wrap">
    <div class="pw-meter" role="img" aria-labelledby="pw-stat"><span id="pw-fill"></span></div>
    <p class="pw-stat" id="pw-stat">Nothing written yet</p>
  </div>
</div>

<div class="pw-wrap">
  %(groups)s

  <section class="pw-end" aria-labelledby="h-end">
    <h2 id="h-end">When you are done</h2>
    <p>Copy this into the Canvas assignment, or print it. Anything you flagged comes
      to the top of the copy, because that is the part I want to see first. I read
      those flags every week and they decide what I make next.</p>
    <div class="pw-acts">
      <button type="button" class="btnA" id="pw-copy">Copy for Canvas</button>
      <button type="button" class="btnB" id="pw-print">Print or save as PDF</button>
      %(next)s
    </div>
    <p class="pw-said" id="pw-said" role="status"></p>
  </section>

  <div class="pw-endspace"></div>
</div>

</main>

%(foot)s

<script>
(function () {
  'use strict';
  var WK = %(wk)d;
  var IDS = %(ids)s;
  var NAMES = %(names)s;
  var KEY = 'bio005-prework-w' + WK;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var state = { notes: {}, flags: {}, srcs: {} };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { state = JSON.parse(raw) || state; }
  } catch (e) {}
  state.notes = state.notes || {};
  state.flags = state.flags || {};
  state.srcs = state.srcs || {};

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* A note counts as written at 40 characters. That is not a quality bar, it
     is just enough to tell a real attempt from an empty box, and the number
     is shown so nobody has to guess where the line is. */
  var MIN = 40;

  function paintCard(id) {
    var card = $('.pw-card[data-id="' + id + '"]');
    if (!card) { return; }
    var n = (state.notes[id] || '').trim().length;
    card.setAttribute('data-done', n >= MIN ? 'yes' : 'no');
    card.setAttribute('data-flagged', state.flags[id] ? 'yes' : 'no');
    var c = $('[data-count]', card);
    if (c) {
      c.textContent = n === 0 ? '' :
        (n >= MIN ? 'Written' : (MIN - n) + ' more characters');
    }
  }

  function paintTotals() {
    var done = IDS.filter(function (id) {
      return (state.notes[id] || '').trim().length >= MIN;
    }).length;
    var flagged = IDS.filter(function (id) { return state.flags[id]; }).length;
    var pct = IDS.length ? Math.round(done / IDS.length * 100) : 0;
    $('#pw-fill').style.width = pct + '%%';
    var msg = done === 0 ? 'Nothing written yet'
            : done + ' of ' + IDS.length + ' written';
    if (flagged) {
      msg += ', <span class="flagged">' + flagged + ' flagged for me</span>';
    }
    $('#pw-stat').innerHTML = msg;
    $('.pw-meter').setAttribute('aria-label', msg.replace(/<[^>]+>/g, ''));
  }

  $$('[data-note]').forEach(function (t) {
    var id = t.getAttribute('data-note');
    t.value = state.notes[id] || '';
    t.addEventListener('input', function () {
      state.notes[id] = t.value;
      save(); paintCard(id); paintTotals();
    });
  });

  $$('[data-flag]').forEach(function (b) {
    var id = b.getAttribute('data-flag');
    b.checked = !!state.flags[id];
    b.addEventListener('change', function () {
      state.flags[id] = b.checked;
      save(); paintCard(id); paintTotals();
    });
  });

  $$('[data-src]').forEach(function (i) {
    var g = i.getAttribute('data-src');
    i.value = state.srcs[g] || '';
    i.addEventListener('input', function () { state.srcs[g] = i.value; save(); });
  });

  IDS.forEach(paintCard);
  paintTotals();

  function transcript() {
    var out = ['BIO 005 pre-work notes, week ' + WK, ''];
    var flagged = IDS.filter(function (id) { return state.flags[id]; });
    if (flagged.length) {
      out.push('WHAT I COULD NOT GET ON MY OWN');
      flagged.forEach(function (id) { out.push('  - ' + NAMES[id]); });
      out.push('');
    }
    $$('.pw-group').forEach(function (g, gi) {
      out.push(g.querySelector('h2').textContent.toUpperCase());
      var src = (state.srcs[gi] || '').trim();
      out.push('  Source: ' + (src || '(not given)'));
      out.push('');
      $$('.pw-card', g).forEach(function (card) {
        var id = card.getAttribute('data-id');
        out.push('  ' + NAMES[id] + (state.flags[id] ? '   [could not get this on my own]' : ''));
        var n = (state.notes[id] || '').trim();
        out.push(n ? '    ' + n.split('\\n').join('\\n    ') : '    (not written)');
        out.push('');
      });
    });
    return out.join('\\n');
  }

  function say(t) { $('#pw-said').textContent = t; }

  $('#pw-copy').addEventListener('click', function () {
    var text = transcript();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { say('Copied. Paste it into the Canvas assignment.'); },
        function () { say('Could not copy. Use Print instead and save as PDF.'); });
    } else {
      say('Could not copy here. Use Print instead and save as PDF.');
    }
  });

  $('#pw-print').addEventListener('click', function () { window.print(); });
}());
</script>

<script>
(function () {
  var ID = 'bio005-prework-%(wk)d';
  function send() {
    try { parent.postMessage({ id: ID, frameId: ID,
      height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) }, '*'); } catch (e) {}
  }
  window.addEventListener('load', send); window.addEventListener('resize', send);
  if (window.ResizeObserver) { new ResizeObserver(send).observe(document.body); }
  document.addEventListener('input', function () { setTimeout(send, 200); });
  send();
}());
</script>
</body>
</html>
'''


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)
    data = load()
    wks = list(range(1, 16)) if args == ['all'] else [int(a) for a in args]
    for wk in wks:
        name, out = build(wk, data)
        if '—' in out or '–' in out:
            raise SystemExit('em or en dash in ' + name)
        io.open(name, 'w', encoding='utf-8').write(out)
        n = len([c for c in data['comps'] if c['week'] == wk])
        print('%-26s %6.1f KB   %2d cards' % (name, len(out) / 1024.0, n))


if __name__ == '__main__':
    main()
