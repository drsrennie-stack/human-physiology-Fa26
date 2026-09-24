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
"""
import json, sys, html, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT/'tools'/'week-entry-data.json').read_text(encoding='utf-8'))

N='#0B1530'; M='#8B3A2E'; G='#414B5C'; GOLD='#C9A14A'; INK='#060A18'; O='#F28C28'

# key, title, subline, time, kind, badges
STEPS = [
 ('preread','Pre-read','Figures, bold terms, pre-read worksheet','30 min max','prev',('W','S')),
 ('first','First pass','Interactive slides, then fill your note sheet','3 to 4 hours','learn',('W',)),
 ('second','Second pass','Same slides again, in a second color','30 to 60 min','learn',()),
 ('upload','Upload your note sheet','One photo file, both colors showing','10 min','learn',('S',)),
 ('study','Study it','Cards and brain dumps','4 sessions of 30 to 45 min','retr',()),
 ('check','Mastery Check','Which competencies are solid?','20 to 30 min per try','check',('S',)),
 ('lab','The lab','PhysioEx, then your lab worksheet','2 to 3 hours','assess',('S',)),
 ('case','Application case','Work the case using the physiology','About 1 hour','assess',('S',)),
 ('patient','Your patient',"Document this week's findings",'About 30 min','assess',('T',)),
 ('discussion','The discussion','What your check showed, what you changed','About 1 hour','assess',('S',)),
]
PHASE = {'prev':'Preview','learn':'Learning','retr':'Retrieval','check':'Checking','assess':'Use it'}

def esc(s): return html.escape(s, quote=True)

def badge(cx,cy,letter):
    fill,tc={'W':(O,N),'S':(M,'#fff'),'T':(N,'#fff')}[letter]
    return (f'<g aria-hidden="true"><circle cx="{cx}" cy="{cy}" r="11.5" fill="{fill}" stroke="#fff" stroke-width="2"/>'
            f'<text x="{cx}" y="{cy+4.5}" font-size="12" font-weight="800" fill="{tc}" text-anchor="middle">{letter}</text></g>')
def badges(right,top,letters):
    return ''.join('\n    '+badge(right-26*i,top+2,l) for i,l in enumerate(reversed(letters)))

def wrap(inner, link, label):
    if not link: return inner
    return f'<a href="{esc(link)}" target="_top" aria-label="{esc(label)}">\n    {inner}\n    </a>'

def wide(y,step,link):
    key,title,sub,time,kind,letters=step
    fill={'prev':G,'learn':N,'assess':'#fff'}[kind]; st=' stroke="#0B1530" stroke-width="1"' if kind=='assess' else ''
    tc='#fff' if kind!='assess' else N; sc='#fff' if kind!='assess' else G
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

def down(y1,y2): return f'<line x1="180" y1="{y1}" x2="180" y2="{y2}" stroke="{G}" stroke-width="2" marker-end="url(#ahGray)"/>'
def mk(i,c): return f'<marker id="{i}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="{c}"/></marker>'

def svg(week):
    L={k:week['steps'][k]['link'] for k,*_ in STEPS}; S={s[0]:s for s in STEPS}
    return f"""<svg viewBox="-10 0 372 1080" role="group" aria-labelledby="loopTitle" xmlns="http://www.w3.org/2000/svg">
  <title id="loopTitle">Week {week['n']} loop. Each step is a link to this week's page.</title>
  <defs>
    <filter id="lift" x="-10%" y="-20%" width="120%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-color="#000" flood-opacity="0.12"/></filter>
    {mk('ahGray',G)}
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
    <path d="M278 443 C350 443 350 653 278 653" fill="none" stroke="{G}" stroke-width="2" marker-end="url(#ahGray)"/>
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
        if 'W' in letters: tags.append('has a worksheet: your note sheet, which you submit at the upload step' if key=='first' else 'has a worksheet')
        if 'S' in letters: tags.append('you submit it in Canvas')
        if 'T' in letters: tags.append('you track this all term')
        t=f'. {time}'+(f', {", ".join(tags)}' if tags else '')+'.'
        name=f'<a href="{esc(link)}" target="_top">{esc(title)}</a>' if link else f'{esc(title)} <span class="soon">(not posted yet)</span>'
        extras=''
        if st['extras']:
            extras='<ul>'+''.join(f'<li><a href="{esc(h)}" target="_top">{esc(n)}</a></li>' for n,h in st['extras'])+'</ul>'
        out.append(f'      <li><strong>{PHASE[kind]}.</strong> {name}{esc(t)}{extras}</li>')
    return '\n'.join(out)

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Week {n}, start here &middot; BIO 005 Human Physiology</title>
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<link rel="stylesheet" href="assets/brand.css">
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

<nav class="topnav" aria-label="Back"><div class="loop-wrap">
  <a id="siteBack" href="course.html" target="_top">&larr; Course home</a>
  <a id="chipBack" href="https://yccd.instructure.com/courses/42616/modules" target="_top">&larr; Back to Canvas modules</a>
</div></nav>

<main id="main">
<header class="loop-head"><div class="loop-wrap">
  <h1>Week {n}: {title}</h1>
  <p class="entry-meta">Opens {opens}. Your first discussion post is due {disc} at 10:00 pm, and everything else is due {closes} at 10:00 pm.</p>
  <p class="entry-how">Start at the top and work your way down. Click any step to open it. Your patient this week is {patient}. <a href="weekly-loop.html" target="_top">How the weekly loop works</a></p>
</div></header>

<div class="loop-wrap">
__KEY__

<figure class="diagram">
__SVG__
</figure>

<details class="steplist">
<summary>See this week's steps as a list</summary>
    <ol>
__LIST__
    </ol>
</details>
</div>
</main>

<footer class="site-foot"><div class="loop-wrap">
  <p>BIO 005 Human Physiology &middot; Fall 2026 &middot; Dr. Sharilyn Rennie</p>
</div></footer>

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
                     disc=esc(w['discussion_first_post']), patient=esc(w['patient_label']))
    page=page.replace('__STYLE__',STYLE).replace('__KEY__',KEY).replace('__SVG__',svg(w)).replace('__LIST__',steplist(w))
    out=ROOT/f'week-{n:02d}-entry.html'; out.write_text(page,encoding='utf-8')
    missing=[title for key,title,*_ in STEPS if not w['steps'][key]['link']]
    print(f'built {out.name}' + (f'  NOT POSTED YET: {", ".join(missing)}' if missing else ''))

STYLE = r"""<style>
/* Page-specific rules only. Every token comes from assets/brand.css. */
.loop-wrap{max-width:44rem;margin:0 auto;padding:0 20px}
.topnav{padding:16px 0 0}
.topnav a{font-weight:600;text-decoration:none;color:var(--maroon-dark)}
.topnav a:hover{text-decoration:underline}
#chipBack{display:none}
.framed #chipBack{display:inline}
.framed #siteBack{display:none}
.loop-head{padding:28px 0 8px}
.loop-head .lede{margin-top:6px}
.loop-head .lede + .lede{margin-top:12px}
h2{margin-top:40px}
.keybox{margin:20px 0 0;background:var(--white);border:1px solid var(--navy-tint);border-radius:var(--r);box-shadow:var(--shadow)}
.keybox summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;min-height:44px;padding:10px 16px;font-weight:700;color:var(--navy)}
.keybox summary::-webkit-details-marker{display:none}
.keybox summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--navy);border-bottom:2px solid var(--navy);transform:rotate(-45deg);transition:transform 200ms ease;flex:none}
.keybox[open] summary::before{transform:rotate(45deg)}
.keybox summary:focus-visible{outline:3px solid var(--navy);outline-offset:2px}
.keybox .legend{margin:0;padding:4px 16px 16px}
@media (prefers-reduced-motion:reduce){.keybox summary::before{transition:none}}
.legend{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px 20px;font-size:15px;font-weight:600}
.legend li{display:flex;align-items:center;gap:8px}
.sw{width:18px;height:18px;border-radius:var(--r-sm);display:inline-block}
.sw-prev{background:var(--ink-soft)}
.sw-learn{background:var(--navy)}
.sw-retr{background:var(--maroon)}
.sw-check{background:var(--gold);border:1px solid var(--navy)}
.sw-assess{background:var(--white);border:1px solid var(--navy)}
.wbadge{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#F28C28;color:var(--navy);font-size:12px;font-weight:800}
.abadge{background:var(--maroon);color:var(--white)}
.tbadge{background:var(--navy);color:var(--white)}
.diagram{margin:24px 0 0;padding:0}
.diagram svg{display:block;width:100%;max-width:30rem;height:auto;margin:0 auto}
.timenote{margin:12px auto 0;max-width:30rem;font-size:15px;color:var(--ink-soft);text-align:center}
.reentry{display:grid;gap:16px;margin:0;padding:0;list-style:none}
.reentry .card{margin:0}
.fix{padding:0}
.fix summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:12px;min-height:44px;padding:14px 20px;font-family:var(--disp);font-weight:600;font-size:17px;color:var(--maroon-dark)}
.fix summary::-webkit-details-marker{display:none}
.fix summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--maroon-dark);border-bottom:2px solid var(--maroon-dark);transform:rotate(-45deg);transition:transform 200ms ease;flex:none}
.fix[open] summary::before{transform:rotate(45deg)}
.fix summary:focus-visible{outline:3px solid var(--navy);outline-offset:2px}
.fix-body{padding:0 20px 18px 40px}
@media (prefers-reduced-motion:reduce){.fix summary::before{transition:none}}
.reentry > li{list-style:none}

.reentry p{margin:0}
.chip{display:inline-block;font-size:13px;font-weight:700;color:var(--white);border-radius:999px;padding:2px 11px;margin:2px 0 9px}
.chip-learn{background:var(--navy)}
.chip-retr{background:var(--maroon)}
.note{margin:20px 0 0}
.words ol{margin:0;padding-left:22px}
.words li{margin:6px 0}
.words .t{color:var(--maroon-dark);font-weight:700}
.site-foot{margin:48px 0 32px;color:var(--ink-soft);font-size:15px}
@media (prefers-reduced-motion:reduce){.card,.card:hover{transition:none;transform:none}}

.entry-meta{font-size:16px;margin:8px 0 0}
.entry-how{margin:10px 0 0;font-size:16px}
.diagram svg a{cursor:pointer;text-decoration:none}
.diagram svg a:focus{outline:none}
.diagram svg a:focus-visible rect{stroke:#C9A14A;stroke-width:4}
.diagram svg a:hover rect{stroke:#C9A14A;stroke-width:3}
.steplist{background:var(--white);border:1px solid var(--navy-tint);border-radius:var(--r);box-shadow:var(--shadow);margin:24px 0 0}
.steplist summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;min-height:44px;padding:10px 16px;font-weight:700;color:var(--navy)}
.steplist summary::-webkit-details-marker{display:none}
.steplist summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--navy);border-bottom:2px solid var(--navy);transform:rotate(-45deg);transition:transform 200ms ease;flex:none}
.steplist[open] summary::before{transform:rotate(45deg)}
.steplist ol{margin:0;padding:4px 20px 18px 40px}
.steplist li{margin:8px 0}
.steplist .soon{color:var(--ink-soft);font-weight:600}
.steplist ul{margin:4px 0 0;padding-left:20px}
@media (prefers-reduced-motion:reduce){.steplist summary::before{transition:none}}
</style>"""
KEY = r"""<details class="keybox">
<summary>What the colors and letters mean</summary>
<ul class="legend">
  <li><span class="sw sw-prev" aria-hidden="true"></span>Slate: previewing the chapter</li>
  <li><span class="sw sw-learn" aria-hidden="true"></span>Navy: learning it</li>
  <li><span class="sw sw-retr" aria-hidden="true"></span>Maroon: pulling it back out of memory</li>
  <li><span class="sw sw-check" aria-hidden="true"></span>Gold: checking what is solid</li>
  <li><span class="sw sw-assess" aria-hidden="true"></span>White: showing what you know</li>
  <li><span class="wbadge" aria-hidden="true">W</span>This step has a worksheet</li>
  <li><span class="wbadge abadge" aria-hidden="true">S</span>You submit this in Canvas</li>
  <li><span class="wbadge tbadge" aria-hidden="true">T</span>You track this all term</li>
</ul>
</details>"""

if __name__=='__main__':
    arg=sys.argv[1] if len(sys.argv)>1 else 'all'
    for n in (sorted(int(k) for k in DATA['weeks']) if arg=='all' else [int(arg)]): build(n)
