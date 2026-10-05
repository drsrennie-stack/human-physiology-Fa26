#!/usr/bin/env python3
"""
tools/build_week_entry.py

Builds the weekly entry page, week-NN-entry.html, from one template and
tools/week-entry-data.json. The page is the weekly loop with every box
linked to that week's page, plus a link back to weekly-loop.html.

Run:   python3 tools/build_week_entry.py 4        builds week-04-entry.html
       python3 tools/build_week_entry.py all      builds every week in the data file

A step whose link is null shows "Not posted yet" and is not clickable.
Colors come from assets/brand.css. The diagram uses the same hex values
because SVG attributes cannot read CSS variables.

Brand restyle Sep 24 2026: the page now carries the shared MedMasters
chrome from assets/brandbar.css (brand bar, back link, eyebrow, two-tone
headline, dark footer) and the site scripts virtual-office.html loads.
Only brand colors appear in the diagram: the preview box is navy-tint
with a navy edge (it was slate gray), arrows are navy, and the badges
are W navy, S maroon, T gold with a navy ring (W was orange).
The data format in tools/week-entry-data.json is unchanged.
"""
import json, sys, html, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT/'tools'/'week-entry-data.json').read_text(encoding='utf-8'))

N='#0B1530'; M='#8B3A2E'; G='#414B5C'; GOLD='#C9A14A'; INK='#060A18'; TINT='#ECEFF4'
# G is ink-soft, used for secondary TEXT only. Fills and arrows are brand colors.

# key, title, subline, time, kind, badges
STEPS = [
 ('preread','Pre-read','Figures, bold terms, pre-read worksheet','30 min max','prev',('W','S')),
 ('first','First pass','Slides, then your Competency Study Guide','3 to 4 hours','learn',('W',)),
 ('second','Second pass','Same slides again, in a second color','30 to 60 min','learn',()),
 ('upload','Upload your guide','Competency Study Guide, both colors','10 min','learn',('S',)),
 ('study','Study it','Cards and brain dumps','4 sessions of 30 to 45 min','retr',()),
 ('check','Mastery Check','Which competencies are solid?','35 to 50 min per try','check',('S',)),
 ('lab','The lab','PhysioEx, then your lab worksheet','2 to 3 hours','assess',('S',)),
 ('case','Application case','Work the case using the physiology','About 1 hour','assess',('S',)),
 ('patient','Your patient',"Document this week's findings",'About 30 min','assess',('T',)),
 ('discussion','The discussion','What your check showed, what you changed','About 1 hour','assess',('S',)),
]
def wsteps(week):
    # Oct 4 2026: a week may leave steps out (Week 5 has no patient case); the
    # rest keep their order and are numbered in sequence.
    return [t for t in STEPS if t[0] in week['steps']]

PHASE = {'prev':'Preview','learn':'Learning','retr':'Retrieval','check':'Checking','assess':'Use it'}

def esc(s): return html.escape(s, quote=True)

def badge(cx,cy,letter):
    # white on navy 18.04:1, white on maroon 7.66:1, navy-deep on gold 8.16:1.
    # Gold gets a navy ring because gold against a white box is only 2.42:1.
    fill,tc,ring,rw={'W':(N,'#fff','#fff','2'),'S':(M,'#fff','#fff','2'),'T':(GOLD,INK,N,'1.5')}[letter]
    return (f'<g aria-hidden="true"><circle cx="{cx}" cy="{cy}" r="11.5" fill="{fill}" stroke="{ring}" stroke-width="{rw}"/>'
            f'<text x="{cx}" y="{cy+4.5}" font-size="12" font-weight="800" fill="{tc}" text-anchor="middle">{letter}</text></g>')
def badges(right,top,letters):
    return ''.join('\n    '+badge(right-26*i,top+2,l) for i,l in enumerate(reversed(letters)))

def wrap(inner, link, label):
    if not link: return inner
    return f'<a href="{esc(link)}" target="_top" aria-label="{esc(label)}">\n    {inner}\n    </a>'

def wide(y,step,link):
    key,title,sub,time,kind,letters=step
    fill={'prev':TINT,'learn':N,'assess':'#fff'}[kind]
    st={'prev':' stroke="#0B1530" stroke-width="1.5"','assess':' stroke="#0B1530" stroke-width="1"'}.get(kind,'')
    tc={'learn':'#fff'}.get(kind,N); sc={'learn':'#fff','prev':N}.get(kind,G)
    shown=time if link else 'Not posted yet'
    inner=(f'<rect x="40" y="{y}" width="280" height="58" rx="10" fill="{fill}"{st} filter="url(#lift)"/>\n'
      f'    <text x="56" y="{y+24}" font-size="15" font-weight="700" fill="{tc}">{esc(title)}</text>\n'
      f'    <text x="304" y="{y+24}" font-size="12" font-weight="700" fill="{sc}" text-anchor="end">{esc(shown)}</text>\n'
      f'    <text x="56" y="{y+43}" font-size="12" fill="{sc}">{esc(sub)}</text>'+badges(316,y,letters))
    return wrap(inner, link, f'{title}, opens this week\'s page')

def loopbox(y,step,link):
    key,title,sub,time,kind,letters=step
    fill,st,tc,sc={'retr':(M,'','#fff','#fff'),'check':(GOLD,' stroke="#0B1530" stroke-width="1"',INK,INK)}[kind]
    shown=time if link else 'Not posted yet'
    inner=(f'<rect x="82" y="{y}" width="196" height="66" rx="10" fill="{fill}"{st} filter="url(#lift)"/>\n'
      f'    <text x="180" y="{y+22}" font-size="15" font-weight="700" fill="{tc}" text-anchor="middle">{esc(title)}</text>\n'
      f'    <text x="180" y="{y+40}" font-size="12" fill="{sc}" text-anchor="middle">{esc(sub)}</text>\n'
      f'    <text x="180" y="{y+57}" font-size="12" font-weight="700" fill="{sc}" text-anchor="middle">{esc(shown)}</text>'+badges(274,y,letters))
    return wrap(inner, link, f'{title}, opens this week\'s page')

def down(y1,y2): return f'<line x1="180" y1="{y1}" x2="180" y2="{y2}" stroke="{N}" stroke-width="2" marker-end="url(#ahGray)"/>'
def mk(i,c): return f'<marker id="{i}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="{c}"/></marker>'

def svg(week):
    L={k:week['steps'][k]['link'] for k,*_ in STEPS}; S={s[0]:s for s in STEPS}
    return f"""<svg viewBox="-10 0 372 1080" role="group" aria-labelledby="loopTitle" xmlns="http://www.w3.org/2000/svg">
  <title id="loopTitle">Week {week['n']} loop. Each step is a link to this week's page.</title>
  <defs>
    <filter id="lift" x="-10%" y="-20%" width="120%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-color="#000" flood-opacity="0.12"/></filter>
    {mk('ahGray',N)}
    {mk('ahMaroon',M)}
    {mk('ahNavy',N)}
  </defs>
  <g font-family="'Plus Jakarta Sans',system-ui,sans-serif" fill="{N}">
    <text x="40" y="30" font-size="13" font-weight="700" fill="{G}" aria-hidden="true">Preview</text>
    {wide(42,S['preread'],L['preread'])}
    {down(100,134)}
    <text x="40" y="124" font-size="13" font-weight="700" fill="{N}" aria-hidden="true">Learn</text>
    {wide(136,S['first'],L['first'])}
    {down(194,212)}
    {wide(214,S['second'],L['second'])}
    {down(272,290)}
    {wide(292,S['upload'],L['upload'])}
    {down(350,408)}
    <text x="196" y="386" font-size="13" font-weight="700" fill="{M}" aria-hidden="true">Retrieve and check</text>
    {loopbox(410,S['study'],L['study'])}
    <path d="M278 443 C350 443 350 653 278 653" fill="none" stroke="{N}" stroke-width="2" marker-end="url(#ahGray)"/>
    <path d="M82 653 C18 653 18 443 82 443" fill="none" stroke="{M}" stroke-width="2.5" marker-end="url(#ahMaroon)"/>
    <text x="180" y="530" font-size="14" font-weight="700" fill="{M}" text-anchor="middle" aria-hidden="true">Not yet?</text>
    <text x="180" y="550" font-size="12" fill="{G}" text-anchor="middle" aria-hidden="true">Go back around for the</text>
    <text x="180" y="566" font-size="12" fill="{G}" text-anchor="middle" aria-hidden="true">competency the check names</text>
    {loopbox(620,S['check'],L['check'])}
    <path d="M82 676 H10 V243 H36" fill="none" stroke="{N}" stroke-width="1.75" stroke-dasharray="5 4" marker-end="url(#ahNavy)"/>
    <text transform="translate(5 470) rotate(-90)" font-size="11" fill="{N}" text-anchor="middle" aria-hidden="true">Could not start it? Back to second pass</text>
    {down(686,742)}
    <text x="192" y="718" font-size="13" font-weight="700" aria-hidden="true">All solid</text>
    <text x="40" y="762" font-size="13" font-weight="700" fill="{G}" aria-hidden="true">Use it</text>
    {wide(772,S['lab'],L['lab'])}
    {down(830,848)}
    {wide(850,S['case'],L['case'])}
    {down(908,926)}
    {wide(928,S['patient'],L['patient'])}
    {down(986,1004)}
    {wide(1006,S['discussion'],L['discussion'])}
  </g>
</svg>"""

def steplist(week):
    out=[]
    for key,title,sub,time,kind,letters in STEPS:
        st=week['steps'][key]; link=st['link']
        tags=[]
        if 'W' in letters: tags.append('has a worksheet: your Competency Study Guide, which you submit at the upload step' if key=='first' else 'has a worksheet')
        if key=='check': tags.append('it counts when an attempt has at least 50 questions and scores 80 percent or higher')
        if 'S' in letters: tags.append('you submit it in Canvas')
        if 'T' in letters: tags.append('you track this all term')
        t=f'. {time}'+(f', {", ".join(tags)}' if tags else '')+'.'
        name=f'<a href="{esc(link)}" target="_top">{esc(title)}</a>' if link else f'{esc(title)} <span class="soon">(not posted yet)</span>'
        extras=''
        if st['extras']:
            extras='<ul>'+''.join(f'<li><a href="{esc(h)}" target="_top">{esc(n)}</a></li>' for n,h in st['extras'])+'</ul>'
        out.append(f'      <li><strong>{PHASE[kind]}.</strong> {name}{esc(t)}{extras}</li>')
    return '\n'.join(out)


# ---------------------------------------------------------------------------
# The straight line. Sep 26 2026: Scrubs asked for the loop as one straight
# line with each step's pages attached to it, like her Process diagram, so a
# student never steps sideways onto a menu page before reaching the work.
# A week whose steps carry "pages" in tools/week-entry-data.json gets this
# layout; a week without them keeps the diagram above.
#   step keys used:  what (one line), pages [{label, href|null, desc, optional}],
#                    empty (text when there are no pages), loop (draw the way
#                    back after this step), title / sub / time / badges overrides
# ---------------------------------------------------------------------------
BADGE_CLS = {'W': 'wbadge', 'S': 'wbadge abadge', 'T': 'wbadge tbadge'}
BADGE_SR = {'W': 'has a worksheet', 'S': 'you submit this in Canvas', 'T': 'you track this all term'}

def uses_line(week):
    return all('pages' in week['steps'][k] for k, *_ in wsteps(week))

def line(week):
    out = ['<ol class="line" aria-label="This week\'s steps, in order">']
    for i, (key, title, sub, time, kind, letters) in enumerate(wsteps(week), 1):
        st = week['steps'][key]
        title = st.get('title', title); time = st.get('time', time)
        letters = tuple(st.get('badges', letters))
        bd = ''.join(f'<span class="{BADGE_CLS[l]}" aria-hidden="true">{l}</span>' for l in letters)
        sr = ''.join(f'<span class="mm-vh">, {BADGE_SR[l]}</span>' for l in letters)
        items = []
        for pgi in st['pages']:
            opt = '<span class="opt">Optional</span>' if pgi.get('optional') else ''
            desc = f'<span class="pd">{esc(pgi["desc"])}</span>' if pgi.get('desc') else ''
            if pgi.get('href'):
                items.append(f'<li><a class="pg" href="{esc(pgi["href"])}" target="_top"><span class="pl">{esc(pgi["label"])}{opt}</span>{desc}</a></li>')
            else:
                items.append(f'<li><div class="pg pg-text"><span class="pl">{esc(pgi["label"])}{opt}</span>{desc}</div></li>')
        pages = (f'<p class="ph">Pages for this step</p><ul class="pages">{"".join(items)}</ul>' if items
                 else f'<p class="ph">Pages for this step</p><p class="none">{esc(st.get("empty", "Nothing new to open for this step."))}</p>')
        out.append(
            f'<li class="stop k-{kind}" id="s-{key}"><span class="node" aria-hidden="true">{i}</span>'
            f'<div class="scard"><p class="phase">{PHASE[kind]}</p>'
            f'<div class="shead"><h2><span class="mm-vh">Step {i}. </span>{esc(title)}{sr}</h2>'
            f'<span class="time">{esc(time)}</span><span class="bdg">{bd}</span></div>'
            f'<p class="what">{esc(st["what"])}</p>{pages}</div></li>')
        if st.get('loop'):
            out.append(
                '<li class="loopback"><span class="node" aria-hidden="true">'
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg></span>'
                '<div class="lcard"><p class="lh">Go around at least 3 times.</p>'
                '<p>After each try, go back to <a href="#s-study">Study it</a> for the competencies the report lists, then take the Mastery Check again. Aim for 80 percent before you stop. You can always do more.</p>'
                '<p>Could not start a competency at all? Go back to <a href="#s-second">Second pass</a> for that one.</p>'
                '<p class="lgo">At least 3 tries and at 80 percent? Keep going down the line.</p></div></li>')
    out.append('</ol>')
    return '\n'.join(out)

LINE_STYLE = r"""<style>
/* The straight line: one numbered node per step on a navy line, a white
   card beside it, and that step's pages listed inside the card.
   Maroon link text on white 7.66:1, ink-soft on white 8.93:1. */
.line{list-style:none;margin:24px 0 0;padding:0;position:relative;display:grid;gap:14px}
.line::before{content:"";position:absolute;left:17px;top:20px;bottom:20px;width:2px;background:var(--navy)}
.stop,.loopback{position:relative;padding-left:52px}
.node{position:absolute;left:0;top:14px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;font-variant-numeric:tabular-nums}
.k-prev .node{background:var(--navy-tint);color:var(--navy);box-shadow:inset 0 0 0 2px var(--navy)}
.k-learn .node{background:var(--navy);color:var(--white)}
.k-retr .node{background:var(--maroon);color:var(--white)}
.k-check .node{background:var(--gold);color:var(--navy-deep);box-shadow:inset 0 0 0 2px var(--navy)}
.k-assess .node{background:var(--white);color:var(--navy);box-shadow:inset 0 0 0 2px var(--navy)}
.scard,.lcard{background:var(--white);border-radius:8px;box-shadow:0 1px 3px rgba(11,21,48,.08);padding:14px 18px 16px}
.phase{margin:0;font-size:13px;font-weight:700;color:var(--ink-soft)}
.shead{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;margin-top:2px}
.shead h2{margin:0;font-size:20px;line-height:1.25;color:var(--navy)}
.time{font-size:14px;font-weight:700;color:var(--ink-soft)}
.bdg{display:flex;gap:6px;margin-left:auto}
.what{margin:8px 0 0;font-size:16px;line-height:1.55;color:var(--ink)}
.ph{margin:12px 0 6px;font-size:13px;font-weight:700;color:var(--maroon-dark)}
.pages{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.pg{display:grid;gap:2px;padding:10px 12px;border:1px solid var(--line);border-radius:6px;text-decoration:none;color:var(--ink);background:var(--white);transition:var(--motion)}
a.pg:hover{transform:translateY(-2px);box-shadow:var(--lift)}
a.pg:focus-visible{outline:3px solid var(--maroon);outline-offset:2px}
.pl{font-weight:700;font-size:16px;color:var(--maroon);display:flex;flex-wrap:wrap;align-items:center;gap:8px}
a.pg .pl::after{content:"\2192";font-weight:700}
.pg-text .pl{color:var(--navy)}
.pd{font-size:14px;line-height:1.45;color:var(--ink-soft)}
.opt{font-size:12px;font-weight:700;color:var(--ink-soft);border:1px solid var(--ink-soft);border-radius:99px;padding:0 8px}
.none{margin:0;font-size:15px;color:var(--ink-soft)}
.loopback .node{background:var(--white);color:var(--maroon);box-shadow:inset 0 0 0 2px var(--maroon)}
.lcard{border:1.5px dashed var(--maroon);box-shadow:none}
.lcard p{margin:6px 0 0;font-size:15px;line-height:1.5}
.lcard .lh{margin:0;font-weight:800;color:var(--maroon-dark);font-size:16px}
.lcard a{color:var(--maroon);font-weight:700}
.lcard .lgo{font-weight:700;color:var(--navy)}
/* Sep 27 2026, Scrubs: each step card takes the color of its phase, the same
   boxes as the weekly loop diagram: Preview navy-tint, Learn navy, Study it
   maroon, Mastery Check gold, Use it white with a navy outline. The page
   links inside stay white cards. White on navy 18.04:1, white on maroon
   7.66:1, navy on gold 8.2:1, navy on navy-tint 16.3:1. */
.k-prev .scard{background:var(--navy-tint);box-shadow:inset 0 0 0 1.5px var(--navy)}
.k-assess .scard{background:var(--white);box-shadow:inset 0 0 0 1.5px var(--navy),0 1px 3px rgba(11,21,48,.08)}
.k-learn .scard{background:var(--navy)}
.k-retr .scard{background:var(--maroon)}
.k-check .scard{background:var(--gold);box-shadow:inset 0 0 0 1.5px var(--navy)}
.k-learn .scard>.phase,.k-learn .shead h2,.k-learn .time,.k-learn .what,.k-learn .ph,.k-learn .none,
.k-retr .scard>.phase,.k-retr .shead h2,.k-retr .time,.k-retr .what,.k-retr .ph,.k-retr .none{color:#fff}
.k-check .scard>.phase,.k-check .shead h2,.k-check .time,.k-check .what,.k-check .ph,.k-check .none{color:var(--navy-deep)}
.k-prev .ph,.k-assess .ph{color:var(--maroon-dark)}
.k-learn .bdg>*,.k-retr .bdg>*,.k-check .bdg>*{box-shadow:0 0 0 2px #fff}
.k-learn .pg,.k-retr .pg,.k-check .pg{border-color:transparent}
@media (prefers-reduced-motion:reduce){.pg,a.pg:hover{transition:none;transform:none}}
@media (max-width:420px){.stop,.loopback{padding-left:46px}.node{width:32px;height:32px;font-size:14px}.line::before{left:15px}.bdg{margin-left:0}}
@media print{.scard,.lcard,.pg{box-shadow:none!important}a.pg .pl::after{content:""}.k-learn .scard,.k-retr .scard,.k-check .scard,.k-prev .scard{background:#fff!important;border:1px solid #000}.k-learn .scard *,.k-retr .scard *,.k-check .scard *{color:#000!important}}
</style>"""

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Week {n}, start here &middot; BIO 005 Human Physiology</title>
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<link rel="stylesheet" href="assets/brand.css">
<link rel="stylesheet" href="assets/brandbar.css">
<meta name="description" content="Week {n} of BIO 005 on one page. Every step of the weekly loop, linked to this week's material.">
<script>
(function(){{
  var framed = false;
  try {{ framed = (window.top !== window.self); }} catch(e){{ framed = true; }}
  if(framed) document.documentElement.className += " framed";
}}());
</script>
__STYLE__
</head>
<body>
<a class="skip" href="#main">Skip to this week's steps</a>

<div class="mm-brandbar"><div class="mm-wrap">
  <a class="mm-mark" href="course-start.html" target="_top">
    <svg viewBox="40 10 125 148" width="22" height="26" role="img" aria-label="BIO 005 Human Physiology, course home"><g transform="translate(22.03,6.53) scale(4.73)"><circle cx="8" cy="8" r="4.2" fill="#0B1530"/><circle cx="17" cy="8" r="4.2" fill="#8B3A2E"/><circle cx="26" cy="8" r="4.2" fill="#C9A14A"/><rect x="5.5" y="15" width="5" height="14" rx="2.5" fill="#0B1530"/><rect x="14.5" y="15" width="5" height="14" rx="2.5" fill="#8B3A2E"/><rect x="23.5" y="15" width="5" height="14" rx="2.5" fill="#C9A14A"/></g></svg>
    <span><span class="mm-wm">BIO <b>005</b></span><span class="mm-wmsub">Human Physiology</span></span>
  </a>
  <span class="mm-course">BIO 005 &middot; Fall 2026</span>
</div></div>

<nav class="topnav" aria-label="Back"><div class="loop-wrap">
  <a class="mm-back" id="siteBack" href="course.html" target="_top">&larr; Course home</a>
  <a class="mm-back" id="chipBack" href="https://yccd.instructure.com/courses/42616/modules" target="_top">&larr; Back to Canvas modules</a>
</div></nav>

<main id="main">
<header class="loop-head"><div class="loop-wrap">
  <p class="mm-eyebrow">Week {n}, start here</p>
  <h1 class="mm-display"><span>Week {n}</span>: {title}.</h1>
  <p class="entry-meta">{meta}</p>
  <p class="entry-how">Start at the top and work your way down. Click any step to open it. Your patient this week is {patient}. <a href="weekly-loop.html" target="_top">How the weekly loop works</a></p>
</div></header>

<div class="loop-wrap">
__KEY__

__BODY__
</div>
</main>

<footer class="mm-foot"><div class="mm-wrap">
  <nav class="mm-flinks" aria-label="Course links">
    <a href="course-start.html" target="_top">Course home</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="course-questions.html" target="_top">Questions, answered</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="syllabus-fall2026.html" target="_top">Syllabus</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="course-schedule.html" target="_top">Schedule</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="ai-in-this-course.html" target="_blank" rel="noopener">How AI is used in this course <span aria-hidden="true">&#8599;</span><span class="mm-vh"> Opens the course site in a new tab.</span></a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="accessibility.html" target="_top">Accessibility</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="https://yccd.instructure.com/courses/42616" target="_blank" rel="noopener">Canvas</a>
  </nav>
  <p class="mm-fleg">BIO 005 Human Physiology &middot; Fall 2026 &middot; Dr. Sharilyn Rennie<br>
     If a page does not work for you, tell me in the Virtual Office and I will fix it.</p>
</div></footer>

<!-- Ask Hootie, on every page. -->
<script src="schedule-fall2026.js"></script>
<script src="hootie.js"></script>
<!-- A way back, on every page. -->
<script src="bio005-back.js"></script>
<script>
(function(){{
  var FRAME_ID = "bio005-week-{nn}-entry";
  function sendHeight(){{
    var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight,
                     document.body.offsetHeight, document.documentElement.offsetHeight);
    try{{ window.parent.postMessage({{ id: FRAME_ID, frameId: FRAME_ID, type: "resize", height: h }}, "*"); }}catch(e){{}}
  }}
  window.addEventListener("load", sendHeight);
  window.addEventListener("resize", sendHeight);
  if(typeof ResizeObserver !== "undefined"){{
    try{{ new ResizeObserver(sendHeight).observe(document.body); }}catch(e){{}}
  }}
  setTimeout(sendHeight, 400);
  setTimeout(sendHeight, 1500);
}}());
</script>
</body>
</html>
"""

def build(n):
    w=dict(DATA['weeks'][str(n)]); w['n']=n
    page=PAGE.format(n=n, nn=f'{n:02d}', title=esc(w['title']), opens=esc(w['opens']), closes=esc(w['closes']),
                     meta=(('Opens %s. Your first discussion post is due %s at 10:00 pm, and everything else is due %s at 10:00 pm.' % (esc(w['opens']), esc(w['discussion_first_post']), esc(w['closes']))) if w.get('discussion_first_post') else ('Opens %s. Everything is due %s at 10:00 pm.' % (esc(w['opens']), esc(w['closes'])))), patient=esc(w['patient_label']))
    if uses_line(w):
        body=line(w); style=STYLE+'\n'+LINE_STYLE
        page=page.replace('Start at the top and work your way down. Click any step to open it.','Start at the top and work your way down. Each step lists the pages you need for it. Nothing has to be printed: you can work on your own paper, as long as you label every page with your name, the week, the step, and the competency or question number.')
    else:
        body=('<figure class="diagram">\n'+svg(w)+'\n</figure>\n\n<details class="steplist">\n<summary>See this week\'s steps as a list</summary>\n    <ol>\n'
              +steplist(w)+'\n    </ol>\n</details>')
        style=STYLE
    page=page.replace('__STYLE__',style).replace('__KEY__',KEY).replace('__BODY__',body)
    out=ROOT/f'week-{n:02d}-entry.html'; out.write_text(page,encoding='utf-8')
    missing=[title for key,title,*_ in wsteps(w) if not w['steps'][key]['link']]
    print(f'built {out.name}' + (f'  NOT POSTED YET: {", ".join(missing)}' if missing else ''))

STYLE = r"""<style>
/* Page-specific rules only. Palette tokens come from assets/brand.css,
   the brand bar, footer, back link, eyebrow, display headline and
   primary button from assets/brandbar.css.
   Brand restyle Sep 24 2026: MedMasters editorial look, forked from
   virtual-office.html. White cards on off-white with a shadow, radius
   8px, no borders. Headings Open Sans 800. No italics. */
em,i{font-style:normal}
.loop-wrap{max-width:44rem;margin:0 auto;padding:0 20px}
.topnav{padding:6px 0 0}
#chipBack{display:none}
.framed #chipBack{display:inline-flex}
.framed #siteBack{display:none}
.loop-head{padding:14px 0 8px}
.loop-head .lede{margin-top:14px;color:var(--ink-soft);font-size:17px}
.loop-head .lede + .lede{margin-top:12px}
.loop-head .lede strong{color:var(--navy)}
h2,h3{font-family:"Open Sans","Plus Jakarta Sans",system-ui,sans-serif;font-weight:800;letter-spacing:-.018em;color:var(--maroon-dark)}
h2{margin-top:40px;font-size:clamp(21px,3vw,27px);line-height:1.2}
h3{font-size:17px}
.card{border:0;border-radius:8px;box-shadow:0 1px 3px rgba(11,21,48,.08)}
.card:hover{box-shadow:0 8px 16px rgba(11,21,48,.10)}
.card-static:hover{box-shadow:0 1px 3px rgba(11,21,48,.08)}
.keybox{margin:20px 0 0;background:var(--white);border:0;border-radius:8px;box-shadow:0 1px 3px rgba(11,21,48,.08)}
.keybox summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;min-height:44px;padding:10px 16px;font-weight:700;color:var(--navy)}
.keybox summary::-webkit-details-marker{display:none}
.keybox summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--maroon);border-bottom:2px solid var(--maroon);transform:rotate(-45deg);transition:transform 200ms ease;flex:none}
.keybox[open] summary::before{transform:rotate(45deg)}
.keybox summary:focus-visible{outline:3px solid var(--maroon);outline-offset:2px;border-radius:8px}
.keybox .legend{margin:0;padding:4px 16px 16px}
@media (prefers-reduced-motion:reduce){.keybox summary::before{transition:none}}
.legend{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px 20px;font-size:15px;font-weight:600}
.legend li{display:flex;align-items:center;gap:8px}
/* Swatches. Preview was slate gray, which is not a brand color; it is
   now navy-tint with a navy edge so it still reads apart from the white
   Use it boxes and the solid navy Learn boxes. */
.sw{width:18px;height:18px;border-radius:var(--r-sm);display:inline-block;flex:none}
.sw-prev{background:var(--navy-tint);box-shadow:inset 0 0 0 1.5px var(--navy)}
.sw-learn{background:var(--navy)}
.sw-retr{background:var(--maroon)}
.sw-check{background:var(--gold);box-shadow:inset 0 0 0 1px var(--navy)}
.sw-assess{background:var(--white);box-shadow:inset 0 0 0 1px var(--navy)}
/* Badges. W was orange, off brand. Now W navy, S maroon,
   T gold with a navy-deep letter and a navy ring, because gold on a
   white card is only 2.42:1 and the ring is what edges it.
   White on navy 18.04:1, white on maroon 7.66:1, navy-deep on gold 8.16:1. */
.wbadge{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--navy);color:var(--white);font-size:12px;font-weight:800;flex:none}
.abadge{background:var(--maroon);color:var(--white)}
.tbadge{background:var(--gold);color:var(--navy-deep);box-shadow:inset 0 0 0 1.5px var(--navy)}
.diagram{margin:24px 0 0;padding:0}
.diagram svg{display:block;width:100%;max-width:30rem;height:auto;margin:0 auto}
.timenote{margin:12px auto 0;max-width:30rem;font-size:15px;color:var(--ink-soft);text-align:center}
.reentry{display:grid;gap:16px;margin:0;padding:0;list-style:none}
.reentry .card{margin:0}
.fix{padding:0}
.fix summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:12px;min-height:44px;padding:14px 20px;font-family:"Open Sans","Plus Jakarta Sans",system-ui,sans-serif;font-weight:800;letter-spacing:-.01em;font-size:17px;color:var(--maroon-dark)}
.fix summary::-webkit-details-marker{display:none}
.fix summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--maroon-dark);border-bottom:2px solid var(--maroon-dark);transform:rotate(-45deg);transition:transform 200ms ease;flex:none}
.fix[open] summary::before{transform:rotate(45deg)}
.fix summary:focus-visible{outline:3px solid var(--maroon);outline-offset:2px;border-radius:8px}
.fix-body{padding:0 20px 18px 40px}
@media (prefers-reduced-motion:reduce){.fix summary::before{transition:none}}
.reentry > li{list-style:none}

.reentry p{margin:0}
.chip{display:inline-block;font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--white);border-radius:4px;padding:4px 10px;margin:2px 0 10px}
.chip-learn{background:var(--navy)}
.chip-retr{background:var(--maroon)}
.note{margin:20px 0 0}
.words ol{margin:0;padding-left:22px}
.words li{margin:6px 0}
.words .t{color:var(--maroon-dark);font-weight:700}
@media (prefers-reduced-motion:reduce){.card,.card:hover{transition:none;transform:none}}
.printbtn{margin:18px 0 0}

.entry-meta{font-size:17px;margin:14px 0 0;color:var(--ink-soft)}
.entry-how{margin:10px 0 0;font-size:17px;color:var(--ink-soft)}
.entry-how a{font-weight:700;color:var(--maroon)}
.entry-how a:hover{color:var(--maroon-dark)}
/* Linked diagram boxes. Hover lifts the box on a shadow, the way the
   cards do. Focus is a 3px maroon outline around the whole step, badges
   included: maroon on the off-white page is 7.33:1. Gold used to be the
   hover and focus edge, and gold on a light page is 2.32:1. */
.diagram svg a{cursor:pointer;text-decoration:none;transition:filter 200ms ease}
.diagram svg a:hover{filter:drop-shadow(0 6px 8px rgba(11,21,48,.28))}
.diagram svg a:focus{outline:none}
.diagram svg a:focus-visible{outline:3px solid #8B3A2E;outline-offset:3px}
@media (prefers-reduced-motion:reduce){.diagram svg a{transition:none}}
.steplist{background:var(--white);border:0;border-radius:8px;box-shadow:0 1px 3px rgba(11,21,48,.08);margin:24px 0 0}
.steplist summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;min-height:44px;padding:10px 16px;font-weight:700;color:var(--navy)}
.steplist summary::-webkit-details-marker{display:none}
.steplist summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--maroon);border-bottom:2px solid var(--maroon);transform:rotate(-45deg);transition:transform 200ms ease;flex:none}
.steplist summary:focus-visible{outline:3px solid var(--maroon);outline-offset:2px;border-radius:8px}
.steplist[open] summary::before{transform:rotate(45deg)}
.steplist ol{margin:0;padding:4px 20px 18px 40px}
.steplist li{margin:8px 0}
.steplist .soon{color:var(--ink-soft);font-weight:600}
.steplist ul{margin:4px 0 0;padding-left:20px}
@media (prefers-reduced-motion:reduce){.steplist summary::before{transition:none}}
@media print{
  html,body{background:#fff!important}
  body{padding-bottom:0!important} /* bio005-back.js pads the body for its floating button; not on paper */
  .skip,.topnav,.mm-brandbar,.mm-foot{display:none!important}
  .keybox,.steplist{box-shadow:none!important}
  a{color:inherit;text-decoration:none}
}
</style>"""
KEY = r"""<details class="keybox">
<summary>What the colors and letters mean</summary>
<ul class="legend">
  <li><span class="sw sw-prev" aria-hidden="true"></span>Light navy: previewing the chapter</li>
  <li><span class="sw sw-learn" aria-hidden="true"></span>Navy: learning it</li>
  <li><span class="sw sw-retr" aria-hidden="true"></span>Maroon: pulling it back out of memory</li>
  <li><span class="sw sw-check" aria-hidden="true"></span>Gold: checking what is solid</li>
  <li><span class="sw sw-assess" aria-hidden="true"></span>White: showing what you know</li>
  <li><span class="wbadge" aria-hidden="true">W</span>This step has a worksheet</li>
  <li><span class="wbadge abadge" aria-hidden="true">S</span>You submit this in Canvas</li>
  <li><span class="wbadge tbadge" aria-hidden="true">T</span>You track this all term</li>
</ul>
</details>"""

# Sep 27 2026, Scrubs: the Course tools dock follows the same steps. Every
# week built as a straight line is written into bio005-dock.js (and the
# os/ copy) between the LINE-STEPS markers, so the dock's groups are the
# week's steps, in order, with the same pages under each.
def dock_steps():
    import json, re
    out = {}
    for k, w in DATA['weeks'].items():
        if not uses_line(w): continue
        steps = []
        for key, title, sub, time, kind, letters in wsteps(w):
            st = w['steps'][key]
            steps.append({'key': key, 'title': st.get('title', title), 'time': st.get('time', time), 'what': st['what'],
                          'pages': [{'label': g['label'], 'href': g.get('href'), 'desc': g.get('desc', ''), 'opt': bool(g.get('optional'))} for g in st['pages']]})
        out[int(k)] = {'entry': f'week-{int(k):02d}-entry.html', 'steps': steps}
    block = '/*LINE-STEPS*/ var LINE_STEPS = ' + json.dumps(out, ensure_ascii=False) + '; /*END-LINE-STEPS*/'
    for f in ('bio005-dock.js', 'os/bio005-dock.js'):
        path = ROOT / f
        if not path.exists(): continue
        t = path.read_text(encoding='utf-8')
        t2 = re.sub(r'/\*LINE-STEPS\*/.*?/\*END-LINE-STEPS\*/', lambda m: block, t, count=1, flags=re.S)
        if t2 == t and '/*LINE-STEPS*/' not in t: print('no LINE-STEPS marker in', f); continue
        path.write_text(t2, encoding='utf-8')
    print('dock steps written for weeks', sorted(out))

if __name__=='__main__':
    arg=sys.argv[1] if len(sys.argv)>1 else 'all'
    for n in (sorted(int(k) for k in DATA['weeks']) if arg=='all' else [int(arg)]): build(n)
    dock_steps()
