#!/usr/bin/env python3
"""
BIO 005 week pages, the 4 system version. Sep 8 2026.

One template, fifteen pages. The competencies and the due dates are fixed.
The route (Learn, Retrieve, Practice, Mastery Check) is the student's choice.
Investigate, Apply and Reflect are the three graded stages and carry the
category name and weight from the syllabus.

Run from the repo root:  python3 tools/gen_week_pages_v2.py
"""
import json, os, sys, datetime as dt
sys.path.insert(0, os.path.dirname(__file__))
import week01_intro as INTRO

WEEKS = [
    (1, '2026-09-08', '2026-09-13', 'How physiology works and what keeps you steady', 1),
    (2, '2026-09-14', '2026-09-20', 'The chemistry that does work in the body', 1),
    (3, '2026-09-21', '2026-09-27', 'Getting across the membrane', 1),
    (4, '2026-09-28', '2026-10-04', 'How cells talk, and the electrical signal', 2),
    (5, '2026-10-05', '2026-10-11', 'Synapses and central integration', 2),
    (6, '2026-10-12', '2026-10-18', 'Sensing the world, and the responses you do not control', 2),
    (7, '2026-10-19', '2026-10-25', 'Muscle, and how movement gets commanded', 2),
    (8, '2026-10-26', '2026-11-01', 'Hormones and reproduction, the slow control system', 2),
    (9, '2026-11-02', '2026-11-08', 'The heart as a pump', 3),
    (10, '2026-11-09', '2026-11-15', 'Pressure, flow, and holding blood pressure steady', 3),
    (11, '2026-11-16', '2026-11-22', 'Blood and how the body defends itself', 3),
    (12, '2026-11-23', '2026-11-29', 'Digestion, and how you use food for fuel', 3),
    (13, '2026-11-30', '2026-12-06', 'Breathing, gas transport, and the fast pH lever', 3),
    (14, '2026-12-07', '2026-12-13', 'The kidney and body fluid balance', 3),
    (15, '2026-12-14', '2026-12-16', 'The slow pH lever, and putting it all together', 3),
]
# Canvas turn-in links, per week. Add a week's links here when its Canvas items exist.
CANVAS = {
    1: {'lab': 'https://yccd.instructure.com/courses/42616/assignments/1240111',
        'log': 'https://yccd.instructure.com/courses/42616/assignments/1240401',
        'disc1a': 'https://yccd.instructure.com/courses/42616/discussion_topics/712733',
        'disc1b': 'https://yccd.instructure.com/courses/42616/discussion_topics/713315'},
}
def ext(href, label):
    return '<li><a href="%s" target="_blank" rel="noopener">%s<span class="vh"> (opens in a new tab)</span></a></li>' % (href, label)

PART = {1: 'Part 1, Foundations', 2: 'Part 2, Control systems', 3: 'Part 3, Systems in action'}
D = json.load(open(os.path.join(os.path.dirname(__file__), 'week-data.json')))

BRAND = '''<div class="mm-brandbar"><div class="mm-wrap">
  <a class="mm-mark" href="index.html" target="_top">
    <svg viewBox="40 10 125 148" width="22" height="26" role="img" aria-label="BIO 005 Human Physiology, course home">
      <g transform="translate(0,18)">
        <g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#0B1530"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#0B1530"/></g>
        <g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/><path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g>
        <g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g>
      </g>
    </svg>
    <span class="mm-wm">BIO <b>005</b><span class="mm-wmsub">Human Physiology</span></span>
  </a>
  <span class="mm-course">BIO 005 &middot; Fall 2026</span>
</div></div>'''

CSS = '''
:root{--navy:#0B1530;--navy-deep:#060A18;--navy-tint:#ECEFF4;--maroon:#8B3A2E;--maroon-dk:#6E2D24;--gold:#C9A14A;--gold-deep:#8A6D33;
--page:#FAFAF9;--card:#FFFFFF;--ink:#0B1530;--muted:#414B5C;--faint:#5A6675;--rule-soft:rgba(11,21,48,.10);
--shadow:0 1px 3px rgba(0,0,0,.08);--lift:0 8px 16px rgba(0,0,0,.10);
--display:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;--body:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif}
*,*::before,*::after{box-sizing:border-box}html,body{margin:0}
body{font-family:var(--body);background:var(--page);color:var(--ink);font-size:17px;line-height:1.55;-webkit-font-smoothing:antialiased}
em,i{font-style:normal;font-weight:700}
h1,h2,h3{font-family:var(--display);font-weight:800;letter-spacing:-.022em;margin:0;line-height:1.15}
p{margin:0}
a{color:var(--maroon);text-underline-offset:3px}
:focus-visible{outline:3px solid var(--maroon);outline-offset:3px;border-radius:4px}
.skip{position:absolute;left:-9999px;top:0;z-index:120;background:var(--navy);color:#fff;padding:13px 20px;font-weight:700;text-decoration:none}.skip:focus{left:0;top:0}
.vh{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.wrap{max-width:1080px;margin:0 auto;padding:0 22px}
header.top{padding:32px 0 6px}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--maroon);margin:0 0 10px}
header.top h1{font-size:clamp(28px,4.6vw,44px);color:var(--navy);max-width:24ch}
header.top .read{color:var(--muted);font-size:16.5px;margin:10px 0 0}
.opens{margin:16px 0 0;padding:12px 16px;background:var(--card);border-radius:10px;box-shadow:var(--shadow);font-size:15.5px;color:var(--muted)}
.opens b{color:var(--navy)}
/* the course introduction video, week 1 */
.intro{margin:22px 0 0;background:var(--card);border-radius:14px;box-shadow:var(--shadow);padding:18px 20px 16px}
.intro h2{font-size:12px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--maroon);margin:0 0 6px}
.intro .lede{font-size:16px;color:var(--muted);margin:0 0 12px;max-width:70ch}
.intro .grid{display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:18px;align-items:start}
.intro .frame{position:relative;width:100%;padding-top:56.25%;border-radius:10px;overflow:hidden;background:var(--navy)}
.intro .frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.intro h3{font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--faint);margin:0 0 6px}
.chap{list-style:none;margin:0;padding:0;max-height:min(420px,56vw);overflow:auto;border-radius:10px}
.chap li{margin:0}
.chap button{display:flex;gap:10px;align-items:baseline;width:100%;text-align:left;font:inherit;font-size:14.5px;line-height:1.35;color:var(--ink);
background:none;border:0;border-top:1px solid var(--rule-soft);padding:8px 8px;min-height:40px;cursor:pointer;border-radius:6px}
.chap li:first-child button{border-top:0}
.chap button:hover{background:#F3F4F7;color:var(--maroon)}
.chap button .t{font-family:var(--display);font-weight:800;color:var(--maroon);font-variant-numeric:tabular-nums;flex:0 0 3.4em;font-size:13.5px}
.chap button[aria-current="true"]{background:#FBF4F2}
.intro details{margin:14px 0 0}
.intro summary{cursor:pointer;font-weight:700;color:var(--navy);min-height:44px;display:flex;align-items:center;gap:8px}
.intro summary::-webkit-details-marker{display:none}
.intro summary::before{content:"\25B8";color:var(--maroon)}
.intro details[open] summary::before{content:"\25BE"}
.tx{max-width:74ch;font-size:15.5px;color:var(--muted);line-height:1.6}
.tx h4{font-family:var(--display);font-size:15px;color:var(--navy);margin:16px 0 4px}
.tx h4 .t{font-weight:700;color:var(--maroon);margin-right:8px;font-variant-numeric:tabular-nums}
.tx p{margin:0 0 6px}
@media (max-width:760px){.intro .grid{grid-template-columns:1fr}.chap{max-height:260px}}
@media print{.intro .frame,.chap{display:none}.intro details{display:block}.intro details summary{display:none}.tx{display:block}}
/* the fixed row */
.fixed{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;margin:22px 0 0}
.fx{background:var(--card);border-radius:14px;box-shadow:var(--shadow);padding:18px 20px;display:flex;flex-direction:column;gap:4px}
.fx h2{font-size:11.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--maroon)}
.fx .big{font-family:var(--display);font-weight:800;font-size:24px;color:var(--navy);line-height:1.15}
.fx .sm{font-size:14.5px;color:var(--faint)}
.fx ul{margin:2px 0 0;padding:0;list-style:none;font-size:15.5px}
.fx li{display:flex;justify-content:space-between;gap:10px;padding:4px 0;border-top:1px solid var(--rule-soft)}
.fx li:first-child{border-top:0;padding-top:0}
.fx li span:last-child{color:var(--faint);font-size:14px;white-space:nowrap}
.fx a{font-weight:700}
/* the route */
.route{margin:34px 0 0}
.route h2{font-size:22px;color:var(--navy)}
.route .lede{color:var(--muted);font-size:16.5px;margin:4px 0 16px;max-width:64ch}
.route .lede b{color:var(--navy)}
.grp{font-size:11.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--faint);margin:18px 0 8px}
.stages{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:14px}
.st{background:var(--card);border-radius:14px;box-shadow:var(--shadow);padding:18px 20px 16px;display:flex;flex-direction:column;gap:8px;min-height:190px;
transition:transform 200ms ease,box-shadow 200ms ease}
.st:hover{transform:translateY(-2px);box-shadow:var(--lift)}
.st .n{font-family:var(--display);font-weight:800;font-size:30px;line-height:1;color:var(--maroon)}
.st h3{font-size:19px;color:var(--navy)}
.st .q{font-size:15px;color:var(--muted)}
.st .cat{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;font-family:var(--display);font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
padding:5px 10px;border-radius:6px;background:var(--navy);color:#fff}
.st.free .cat{background:var(--navy-tint);color:var(--navy)}
.st .tools{list-style:none;margin:auto 0 0;padding:6px 0 0;display:flex;flex-wrap:wrap;gap:8px}
.st .tools a{display:inline-flex;align-items:center;min-height:38px;padding:6px 12px;border-radius:999px;border:1.5px solid var(--navy);color:var(--navy);
text-decoration:none;font-size:14.5px;font-weight:700;background:#fff;transition:background 160ms ease,color 160ms ease}
.st .tools a:hover{background:var(--navy);color:#fff}
.st .tools a.main{background:var(--maroon);border-color:var(--maroon);color:#fff}
.st .tools a.main:hover{background:var(--maroon-dk);border-color:var(--maroon-dk)}
.st .tools span.soon{display:inline-flex;align-items:center;min-height:38px;padding:6px 12px;border-radius:999px;border:1.5px dashed rgba(11,21,48,.35);color:var(--faint);font-size:14.5px;font-weight:600}
.st .fine{font-size:13.5px;color:var(--faint)}
.st .fine b{color:var(--navy)}
.branch{margin:14px 0 0;padding:14px 18px;background:var(--card);border-radius:12px;box-shadow:var(--shadow);font-size:15.5px;color:var(--muted);display:flex;gap:14px;flex-wrap:wrap;align-items:baseline}
.branch b{color:var(--navy)}
.branch .arr{color:var(--maroon);font-weight:800}
/* next */
.nextrow{display:flex;flex-wrap:wrap;gap:10px;margin:30px 0 0}
.btn{display:inline-flex;align-items:center;gap:8px;text-decoration:none;font-weight:700;font-size:15px;border-radius:10px;padding:11px 16px;min-height:44px;
border:1.5px solid var(--navy);color:var(--navy);background:transparent;transition:background 160ms ease,color 160ms ease}
.btn:hover{background:var(--navy);color:#fff}
.mm-foot{margin-top:44px}
.mm-flinks{list-style:none;margin:0 0 12px;padding:0;display:flex;flex-wrap:wrap;gap:6px 0;font-size:15px}
.mm-flinks li{display:flex;align-items:center}.mm-flinks li+li::before{content:"\\00B7";margin:0 12px;color:#9AA3B2}
.mm-fleg{margin:0;font-size:14px;color:#C9CFD6}
@media (max-width:600px){header.top{padding-top:22px}.st{min-height:0}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}.st:hover{transform:none}}
@media (forced-colors:active){.fx,.st,.branch,.opens{border:1px solid CanvasText}.st .cat{border:1px solid CanvasText}}
@media print{.skip,.mm-brandbar,.nextrow{display:none!important}body{background:#fff;font-size:10.5pt}.fx,.st,.branch{box-shadow:none;border:1px solid #000;break-inside:avoid}.st .tools a{border-color:#000;color:#000;background:#fff}}
'''

FOOT = '''<footer class="mm-foot"><div class="mm-wrap">
  <ul class="mm-flinks">
    <li><a href="index.html" target="_top">Course home</a></li>
    <li><a href="course-schedule.html" target="_top">Schedule</a></li>
    <li><a href="syllabus-fall2026.html" target="_top">Syllabus</a></li>
    <li><a href="https://yccd.instructure.com/courses/42616" target="_blank" rel="noopener">Canvas</a></li>
    <li><a href="virtual-office.html" target="_top">Virtual office</a></li>
    <li><a href="accessibility.html" target="_top">Accessibility</a></li>
  </ul>
  <p class="mm-fleg">BIO 005 Human Physiology &middot; Fall 2026 &middot; Dr. Sharilyn Rennie</p>
</div></footer>'''


def long(iso):
    d = dt.date.fromisoformat(iso)
    return d.strftime('%A, %B ') + str(d.day)


def a(href, label, main=False):
    return '<li><a%s href="%s" target="_top">%s</a></li>' % (' class="main"' if main else '', href, label)


def page(n, opens, closes, title, part):
    nn = '%02d' % n
    c = D['comp'][str(n)]
    lab = D['lab'][str(n)]
    reading = D['reading'][n - 1]
    close = dt.date.fromisoformat(closes)
    sunday = close.weekday() == 6
    fri = close - dt.timedelta(days=2)
    sat = dt.date.fromisoformat(opens) - dt.timedelta(days=2)
    prev_ = 'week-%02d.html' % (n - 1) if n > 1 else None
    next_ = 'week-%02d.html' % (n + 1) if n < 15 else None
    has_prompts = os.path.exists('week-%s-notesheet-prompts.html' % nn)

    enc = D['encounter'].get(str(n), '')
    labname_short = (D['lab'][str(n)]['name'] if D['lab'][str(n)]['kind'] != 'physioex' else D['lab'][str(n)]['name'].replace('&amp;', 'and'))
    if n == 1:
        disc_items = [('Discussion 1A: Digital Vision Board and Introduction', True), ('Discussion 1B: Week 1 Metacognitive Analysis', False)]
    else:
        disc_items = [('Discussion %d' % n, True)]
    close_s = close.strftime('%a %b ') + str(close.day)
    fri_s = fri.strftime('%a %b ') + str(fri.day)
    rows = []
    for name, has_post in disc_items:
        if sunday and has_post:
            rows.append('<li><span>%s</span><span>post %s, replies %s, 10 pm</span></li>' % (name, fri_s, close_s))
        else:
            rows.append('<li><span>%s</span><span>%s, 10 pm</span></li>' % (name, close_s))
    lb = D['lab'][str(n)]
    if lb['kind'] == 'physioex':
        due_lab = 'Lab: ' + lb['name'].replace('&amp;', 'and').split(',')[0]
    elif lb['name'].lower().startswith('dry lab:'):
        due_lab = 'Lab: ' + lb['name'].split(':', 1)[1].strip()
    else:
        due_lab = lb['name'].split(':')[0]
    rows.append('<li><span>%s</span><span>%s, 10 pm</span></li>' % (due_lab, close_s))
    rows.append('<li><span>Patient chart: %s</span><span>%s, 10 pm</span></li>' % (enc, close_s))
    due = ''.join(rows)
    due_big = ('Sunday, %s %d' % (close.strftime('%B'), close.day)) if sunday else long(closes)

    # lab card
    if lab['kind'] == 'physioex':
        labtools = a('assignment-physioex.html?week=%d' % n, 'PhysioEx, what to run', True)
        labname = lab['name'].replace('&amp;', 'and')
    else:
        labtools = ''
        labname = lab['name']
    if lab['sheet']:
        labtools += a(lab['sheet'][0], lab['sheet'][1].replace('Open the ', '').replace('Open your ', '').capitalize(), not labtools)
    if lab['kind'] == 'physioex':
        labtools += a('lab-report-form.html', 'Lab analysis sheet')   # the PhysioEx activity sheet, PhysioEx weeks only
    cv = CANVAS.get(n, {})
    if cv.get('lab'): labtools += ext(cv['lab'], 'Turn the lab in, Canvas')

    # discussion
    if n == 1:
        disc = (a('assignment-discussion-01-visionboard.html', 'Discussion 1A: Digital Vision Board', True)
                + ext(CANVAS[1]['disc1a'], 'Post 1A in Canvas')
                + a('assignment-discussion-01-metacognition.html', 'Discussion 1B: Week 1 Metacognitive Analysis', True)
                + ext(CANVAS[1]['disc1b'], 'Post 1B in Canvas'))
        discq = 'Two this week. 1A is your digital vision board with a short video introduction. 1B is what the evidence told you about how you learned the Week 1 material.'
    else:
        disc = a('assignment-discussion.html?week=%d' % n, 'Discussion %d' % n, True)
        discq = 'Discussion %d: something from this week\'s physiology, and your honest thinking about it.' % n

    apply_btn = a('assignment-apply.html?week=%d' % n, 'Open this week\'s chart entry', True)
    learn = (a('lecture-week.html?week=%d' % n, 'Lectures, in order', True)
             + a('week-%s-notes.html' % nn, 'Notes')
             + a('week-%s-competencies.html' % nn, 'Competencies')
             + a('sheets/BIO005-note-sheet-week-%s.pdf' % nn, 'Note sheet (PDF)')
             + (a('week-%s-notesheet-prompts.html' % nn, 'Note sheet questions') if has_prompts else ''))
    retrieve = (a('note-sheet.html?week=%d' % n, 'Note sheet, second color')
                + a('competency-brain-dump.html', 'Brain dump')
                + a('mastery-canvas.html', 'Draw it')
                + a('mastery-physio-os-standalone.html', 'Recall cards'))
    practice = (a('assignment-bookproblems.html?week=%d' % n, 'Book problems', True)
                + (a('worksheet-week02-graphing.html', 'Graphing worksheet') if n == 2 else '')
                + a('ungraded-sheet.html?week=%d' % n, 'All of it on one sheet'))

    intro = ''
    if n == 1:
        def mmss(sec): return '%d:%02d' % (sec // 60, sec % 60)
        chap = ''.join('<li><button type="button" data-t="%d"><span class="t">%s</span><span>%s</span></button></li>' % (t, mmss(t), title) for t, title in INTRO.CHAPTERS)
        tx = ''.join('<h4><span class="t">%s</span>%s</h4><p>%s</p>' % (mmss(INTRO.CHAPTERS[i][0]), title, body) for i, (title, body) in enumerate(INTRO.TRANSCRIPT))
        intro = ('<section class="intro" aria-labelledby="intro-h" id="intro">'
                 '<h2 id="intro-h">Before anything else: watch the course introduction</h2>'
                 '<p class="lede">About thirty minutes. It shows you how the course works, where everything is, and what I am asking of you. Use the chapters to jump to any part.</p>'
                 '<div class="grid"><div><div class="frame"><iframe id="introFrame" src="https://www.loom.com/embed/%s" title="Biology 5 Human Physiology course overview, Dr. Rennie" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>'
                 '<div><h3 id="chap-h">Chapters</h3><ol class="chap" aria-labelledby="chap-h">%s</ol></div></div>'
                 '<details><summary>Read the transcript</summary><div class="tx">%s</div></details>'
                 '</section>') % (INTRO.LOOM_ID, chap, tx)
    opens_note = ''
    if n > 1:
        opens_note = ('<p class="opens" id="opensNote" hidden><b>This week opens %s.</b> It unlocks early on Saturday, %s at 8:00 pm Pacific if you have finished the week before. Everything here is yours to look at now.</p>'
                      % (long(opens), sat.strftime('%B ') + str(sat.day)))

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Week {n} &middot; {title} &middot; BIO 005 Human Physiology</title>
<meta name="description" content="BIO 005 Week {n}: {title}. The competencies and due dates, and your route through the week.">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<link rel="stylesheet" href="assets/brandbar.css">
<!-- Generated by tools/gen_week_pages_v2.py, Sep 8 2026. Edit the generator, not this file. -->
<style>{CSS}</style>
</head>
<body data-opens="{opens}">
<a class="skip" href="#main">Skip to this week</a>
{BRAND}

<main id="main"><div class="wrap">
  <header class="top">
    <p class="eyebrow">{PART[part]} &middot; Week {n} of 15</p>
    <h1>{title}</h1>
    <p class="read">Reading: {reading}</p>
    {opens_note}
  </header>

  {intro}
  <div class="fixed">
    <section class="fx" aria-labelledby="fx-c">
      <h2 id="fx-c">Fixed: the competencies</h2>
      <p class="big">{c} this week</p>
      <p class="sm">Same for everyone. Each one is a single thing you will be able to do.</p>
      <p><a href="week-{nn}-competencies.html" target="_top">See the list &rarr;</a></p>
    </section>
    <section class="fx" aria-labelledby="fx-d">
      <h2 id="fx-d">Fixed: what is due</h2>
      <p class="big">{due_big}</p>
      <ul>{due}</ul>
      <p class="sm">Times are Pacific. Turn everything in through Canvas.</p>
    </section>
    <section class="fx" aria-labelledby="fx-y">
      <h2 id="fx-y">Yours: how you get there</h2>
      <p class="big">You choose the route</p>
      <p class="sm">Video, notes, textbook, drawing, out loud, or a mix. The Mastery Check tells you whether your choice worked.</p>
      <p><a href="how-this-course-works.html" target="_top">How this course works &rarr;</a></p>
    </section>
  </div>

  <section class="route" aria-labelledby="route-h">
    <h2 id="route-h">Your route through Week {n}</h2>
    <p class="lede">Seven stages. <b>The first four carry no points</b> and are where you choose how you learn. <b>The last three are graded</b> and are the same for everyone.</p>

    <p class="grp">Learn it your way, no points</p>
    <ol class="stages">
      <li class="st free"><span class="n">01</span><h3>Learn</h3><span class="cat">No points</span><p class="q">Build what you need to know. Pick your format.</p>
        <ul class="tools" aria-label="Learn tools">{learn}</ul></li>
      <li class="st free"><span class="n">02</span><h3>Retrieve</h3><span class="cat">No points</span><p class="q">Get it back with nothing open. Pick your mode.</p>
        <ul class="tools" aria-label="Retrieve tools">{retrieve}</ul></li>
      <li class="st free"><span class="n">03</span><h3>Practice</h3><span class="cat">No points</span><p class="q">Use it on problems you have not seen. Predict, commit, then check.</p>
        <ul class="tools" aria-label="Practice tools">{practice}</ul></li>
      <li class="st free"><span class="n">04</span><h3>Mastery Check</h3><span class="cat">No points</span><p class="q">Did the way you learned it work? Thirty questions, nothing open, you get a score.</p>
        <ul class="tools" aria-label="Mastery Check tools">{a('practice-exam.html?week=%d' % n, 'Build your check', True)}{a('assignment-practice-log.html', 'How to upload your report')}{ext(cv['log'], 'Upload it in Canvas') if cv.get('log') else ''}</ul>
        <p class="fine">Do one or ten. Upload the report so I can see how you are trending. The score is never graded.</p></li>
    </ol>
    <p class="branch"><b>The branch at 04.</b> <span><span class="arr">&rarr;</span> All solid? Go on to 05.</span> <span><span class="arr">&rarr;</span> Not yet? Back to 02 for that one competency, then check again.</span></p>

    <p class="grp">Show what you can do, graded</p>
    <ol class="stages" start="5">
      <li class="st"><span class="n">05</span><h3>Investigate</h3><span class="cat">Investigate It &middot; 25%</span><p class="q">{labname}.</p>
        <ul class="tools" aria-label="Lab tools">{labtools}</ul>
        <p class="fine">Prediction first, then the data. Due {'Sunday' if sunday else close.strftime('%A')}.</p></li>
      <li class="st"><span class="n">06</span><h3>Apply</h3><span class="cat">Use It &middot; 25%</span><p class="q">Patient chart entry: {enc}. Work it in the room you chose.</p>
        <ul class="tools" aria-label="Case tools">{apply_btn}{a('BIO005-patient-file.html', 'Patient file')}</ul>
        <p class="fine">Due {'Sunday' if sunday else close.strftime('%A')}.</p></li>
      <li class="st"><span class="n">07</span><h3>Reflect</h3><span class="cat">Think About It &middot; 15%</span><p class="q">{discq}</p>
        <ul class="tools" aria-label="Discussion tools">{disc}</ul>
        <p class="fine">{'Post by Friday, replies by Sunday.' if sunday else 'Post and replies by ' + close.strftime('%A') + '.'}</p></li>
    </ol>
  </section>

  <nav class="nextrow" aria-label="Other weeks">
    {('<a class="btn" href="%s" target="_top">&larr; Week %d</a>' % (prev_, n - 1)) if prev_ else ''}
    <a class="btn" href="course-schedule.html" target="_top">All fifteen weeks</a>
    {('<a class="btn" href="%s" target="_top">Week %d &rarr;</a>' % (next_, n + 1)) if next_ else ''}
  </nav>
</div></main>

{FOOT}

<script>
(function(){{
  /* Show the opening note only before the week has unlocked (Saturday 8 pm Pacific before its Monday). */
  var o = document.getElementById('opensNote'); if (!o) return;
  var p = document.body.getAttribute('data-opens').split('-');
  var mon = Date.UTC(+p[0], +p[1]-1, +p[2]);
  var sat = mon - 2*86400000;
  var off = (sat < Date.UTC(2026,10,1,9)) ? 7 : 8;
  if (Date.now() < sat + (20+off)*3600000) o.hidden = false;
}})();
(function(){{
  /* chapter buttons reload the Loom embed at that second; the current chapter is marked */
  var f = document.getElementById('introFrame'); if (!f) return;
  var base = f.getAttribute('src').split('?')[0];
  var btns = document.querySelectorAll('.chap button');
  [].forEach.call(btns, function(b){{
    b.addEventListener('click', function(){{
      f.src = base + '?t=' + b.getAttribute('data-t') + '&autoplay=1';
      [].forEach.call(btns, function(x){{ x.removeAttribute('aria-current'); }});
      b.setAttribute('aria-current', 'true');
      f.focus();
    }});
  }});
}})();
(function(){{var id='bio005-week-{nn}';
function post(){{try{{parent.postMessage({{frame:id,id:id,height:document.documentElement.scrollHeight}},'*');}}catch(e){{}}}}
if('ResizeObserver' in window){{new ResizeObserver(post).observe(document.documentElement);}}
window.addEventListener('load',post);window.addEventListener('resize',post);post();}})();
</script>
<script src="bio005-nav.js" defer></script>
<script src="schedule-fall2026.js"></script>
<script src="hootie.js"></script>
<script src="bio005-back.js"></script>
</body>
</html>
'''
    return html


if __name__ == '__main__':
    for w in WEEKS:
        out = 'week-%02d.html' % w[0]
        open(out, 'w', encoding='utf-8').write(page(*w))
        print('wrote', out)
