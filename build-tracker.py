#!/usr/bin/env python3
"""
Scan the BIO 005 repo and write build-tracker.html.

    cd human-physiology-Fa26
    python3 build-tracker.py

Rerun it any time. It reads the actual files on disk, so the tracker is
never a list of what you meant to build, it is a list of what is there.

WHY IT IS GENERATED
A hand-kept build list goes stale in a week and then lies to you, which
is worse than having none. This one cannot: if a notes page exists the
row goes green, and if you delete it the row goes back.
"""
import io, json, os, re, subprocess, sys
from datetime import date, timedelta

OPEN_DAY = date(2026, 9, 7)     # the Monday students get the link
TERM_DAY = date(2026, 9, 8)     # first day of term

def node_json(expr, files):
    js = 'global.window={};' + ''.join("require('%s');" % os.path.abspath(f) for f in files)
    js += 'process.stdout.write(JSON.stringify(%s));' % expr
    r = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[:400]); sys.exit(1)
    return json.loads(r.stdout)


# A file whose name does not match its topic. Listed rather than guessed at,
# so the tracker credits the deck that exists instead of asking for it twice.
ALIAS = {
    'Foundations of Physiology': ['introduction'],
}


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def main():
    if not os.path.exists('bio005-competencies.js'):
        print('Run this from the repo root.'); sys.exit(1)

    data = node_json(
        '{comps:window.BIO005_COMPETENCIES, weeks:window.BIO005_WEEKS, term:window.BIO005_TERM}',
        ['bio005-competencies.js', 'bio005-schedule-fall2026.js'])
    comps, weeks = data['comps'], data['weeks']

    # cards, by competency
    bank = node_json('window.BIO005_CARD_BANK', ['os/bio005-card-bank.js'])
    cards = []
    def walk(o):
        if isinstance(o, list):
            for x in o:
                if isinstance(x, dict) and 'q' in x: cards.append(x)
                else: walk(x)
        elif isinstance(o, dict):
            for v in o.values(): walk(v)
    walk(bank)
    cards_by_comp = {}
    for c in cards:
        cards_by_comp.setdefault(c.get('competencyId'), []).append(c)

    draws = node_json('window.BIO005_DRAW||window.BIO005_DRAW_CHECKLISTS||[]', ['os/draw-checklists.js'])
    draw_weeks = {}
    for d in (draws if isinstance(draws, list) else draws.values()):
        if isinstance(d, dict) and d.get('week'):
            draw_weeks[d['week']] = draw_weeks.get(d['week'], 0) + 1

    files = set(os.listdir('.'))

    # labs that exist, mapped to the week they serve
    LAB_WEEK = {'osmosis-iv-fluids-lab.html': 2,
                'pulmonary-function-lab.html': 12,
                'cbc-pcr-lab.html': 10}
    labs_by_week = {}
    for f, wk in LAB_WEEK.items():
        if f in files: labs_by_week.setdefault(wk, []).append(f)

    by_comp = {c['id']: c for c in comps}

    rows = []
    for w in weeks:
        wk = w['wk']
        ids = w.get('competencies') or []
        topics = []
        for i in ids:
            c = by_comp.get(i)
            if c and c['system'] not in topics: topics.append(c['system'])
        ncards = sum(len(cards_by_comp.get(i, [])) for i in ids)

        def has_any(patterns):
            for f in files:
                lf = f.lower()
                if all(p in lf for p in patterns): return f
            return None

        def has_topic(kind, topic):
            """A file counts for a topic if its name carries the kind AND a
               meaningful word from the topic. Matching the whole slug missed
               slides-p-introduction-to-physiology, which is the Foundations
               of Physiology deck under a different name. Under-reporting a
               built asset is worse than the odd generous match: it sends you
               off to rebuild something you already have."""
            words = [w for w in slug(topic).split('-') if len(w) >= 5
                     and w not in ('physiology',)]
            words += ALIAS.get(topic, [])
            for f in files:
                lf = f.lower()
                if kind not in lf: continue
                if any(w in lf for w in words): return f
            return None

        notes  = [t for t in topics if has_topic('notes', t)]
        slides = [t for t in topics if has_topic('slides', t)]
        video  = [t for t in topics if has_topic('video', t)]
        wbook  = has_any(['workbook', 'week%02d' % wk])
        hub    = ('week-%02d.html' % wk) if ('week-%02d.html' % wk) in files else None

        rows.append({
            'wk': wk, 'title': w.get('title', ''), 'module': w.get('module'),
            'opens': w.get('opens'), 'closes': w.get('closes'),
            'topics': topics, 'ncomp': len(ids), 'ncards': ncards,
            'notes': len(notes), 'slides': len(slides), 'video': len(video),
            'workbook': bool(wbook), 'hub': bool(hub),
            'labs': labs_by_week.get(wk, []),
            'draws': draw_weeks.get(wk, 0),
        })

    tot_topics = sum(len(r['topics']) for r in rows)
    done_notes = sum(r['notes'] for r in rows)
    done_slides = sum(r['slides'] for r in rows)
    done_video = sum(r['video'] for r in rows)
    days = (OPEN_DAY - date.today()).days

    site = [
        ('Front door', 'course-entry.html' in files),
        ('Course home', 'welcome.html' in files),
        ('Course calendar', 'course-calendar.html' in files),
        ('Course schedule', 'course-schedule.html' in files),
        ('Study guide, all 268', 'competency-study-guide.html' in files),
        ('Competency packet', 'competency-packet.html' in files),
        ('Mastery OS', os.path.exists('os/mastery-physio-os.html')),
        ('Recall cards, %d' % len(cards), len(cards) > 0),
        ('Readiness check', 'before-you-start.html' in files),
        ('Drawing canvas', 'mastery-canvas.html' in files),
        ('Grading page', 'what-you-do.html' in files),
        ('Lab manual', 'clinical-physiology-lab-manual.html' in files),
        ('Syllabus', 'syllabus.html' in files),
        ('Course materials page', 'course-materials.html' in files),
        ('Chemistry review', 'review-chemistry.html' in files),
        ('Math review', 'review-math.html' in files),
        ('Anatomy review', 'review-anatomy.html' in files),
    ]

    def cell(n, of):
        if of == 0: return '<td class="c none">n/a</td>'
        if n >= of: return '<td class="c ok">%d of %d</td>' % (n, of)
        if n == 0:  return '<td class="c no">0 of %d</td>' % of
        return '<td class="c part">%d of %d</td>' % (n, of)

    tr = []
    for r in rows:
        t = len(r['topics'])
        tr.append(
            '<tr%s>' % (' class="m1"' if r['module'] == 1 else '') +
            '<th scope="row"><span class="wk">Week %d</span><span class="wt">%s</span>'
            '<span class="wd">%s topic%s &middot; %d competencies</span></th>'
            % (r['wk'], r['title'], t, '' if t == 1 else 's', r['ncomp']) +
            cell(r['notes'], t) + cell(r['video'], t) + cell(r['slides'], t) +
            ('<td class="c ok">yes</td>' if r['workbook'] else '<td class="c no">none</td>') +
            ('<td class="c ok">%d</td>' % len(r['labs']) if r['labs'] else '<td class="c no">none</td>') +
            '<td class="c ok">%d</td>' % r['ncards'] +
            ('<td class="c ok">%d</td>' % r['draws'] if r['draws'] else '<td class="c no">0</td>') +
            '</tr>')

    html = TEMPLATE.format(
        days=days,
        openday=OPEN_DAY.strftime('%A %B %-d'),
        termday=TERM_DAY.strftime('%A %B %-d'),
        generated=date.today().strftime('%B %-d, %Y'),
        nweeks=len(rows), ntopics=tot_topics, ncards=len(cards),
        notes_done=done_notes, slides_done=done_slides, video_done=done_video,
        rows='\n'.join(tr),
        sitelist='\n'.join(
            '<li class="%s"><span class="dot" aria-hidden="true"></span>%s<span class="st">%s</span></li>'
            % ('ok' if ok else 'no', name, 'built' if ok else 'not built')
            for name, ok in site),
    )
    io.open('build-tracker.html', 'w', encoding='utf-8').write(html)
    print('build-tracker.html written')
    print('  %d weeks, %d topics, %d cards' % (len(rows), tot_topics, len(cards)))
    print('  notes %d/%d   videos %d/%d   slides %d/%d'
          % (done_notes, tot_topics, done_video, tot_topics, done_slides, tot_topics))
    print('  %d days to open day' % days)


TEMPLATE = r'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<title>Build tracker &middot; BIO 005 Human Physiology</title>
<meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<!-- GENERATED by build-tracker.py. Rerun it, do not hand edit.
     Instructor page. Do not link this from anywhere students reach. -->
<style>
:root{{--navy:#08101F;--navy-deep:#060A18;--navy-tint:#ECEFF4;--maroon:#7A2A22;--maroon-dark:#5E201A;
--gold:#B8924A;--gold-deep:#8A6D33;--gold-text:#6E5018;--gold-pale:#F7EFD9;--white:#fff;--offwhite:#FAFAF9;
--ink-soft:#414B5C;--muted:#5A6273;--rule:#D5DAE2;--r:8px;--rc:16px;
--shadow:0 1px 3px rgba(8,16,31,.08),0 1px 2px rgba(8,16,31,.05);
--font:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}}
*,*::before,*::after{{box-sizing:border-box}} html,body{{margin:0}}
body{{font-family:var(--font);background:var(--offwhite);color:var(--navy);line-height:1.55}}
em,i,cite,dfn,var,address{{font-style:normal}}
h1,h2,h3{{margin:0;letter-spacing:-.02em}} p{{margin:0}}
a{{color:var(--navy);text-underline-offset:2px}} a:hover{{color:var(--maroon-dark)}}
:focus-visible{{outline:3px solid var(--navy);outline-offset:3px}}
.skip{{position:absolute;left:-9999px;top:0;background:var(--navy);color:#fff;padding:12px 18px;font-weight:700;z-index:9}}
.skip:focus{{left:0;top:0}}
.site-header{{background:#fff;border-bottom:.5px solid rgba(8,16,31,.10);padding:18px max(20px,4vw)}}
.shi{{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap}}
.shi svg{{height:48px;width:auto;display:block}}
.t1{{font-size:.71rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-text)}}
.t2{{font-size:1.45rem;font-weight:800;line-height:1.1}} .t3{{font-size:.9rem;color:var(--ink-soft)}}
.hero{{background:var(--navy);color:#fff;padding:38px max(20px,4vw)}}
.hi{{max-width:1180px;margin:0 auto}}
.hero .eyebrow{{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#E9C877;margin:0 0 10px}}
.hero h1{{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 10px}}
.hero h1 .a{{color:#E9C877}}
.hero p{{color:#DDE3EC;max-width:70ch}}
.kpis{{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;padding:0;list-style:none}}
.kpis li{{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);border-radius:var(--r);padding:11px 15px;min-width:132px}}
.kpis .k{{display:block;font-size:.64rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#E9C877;margin-bottom:3px}}
.kpis .v{{display:block;font-weight:800;font-size:1.15rem}}
.wrap{{max-width:1180px;margin:0 auto;padding:28px max(20px,4vw) 70px}}
.card{{background:#fff;border:1px solid var(--rule);border-radius:var(--rc);box-shadow:var(--shadow);padding:24px max(18px,2vw);margin:0 0 22px}}
.card h2{{font-size:1.3rem;font-weight:800;margin:0 0 6px}}
.card > p.sub{{color:var(--ink-soft);margin:0 0 18px;max-width:76ch}}
.kicker{{font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--maroon-dark);margin:0 0 8px}}
.callout{{background:var(--gold-pale);border:1px solid var(--gold-deep);border-radius:var(--rc);padding:22px 24px;margin:0 0 22px}}
.callout h2{{font-size:1.2rem;margin:0 0 8px;color:var(--gold-text)}}
.callout p{{color:var(--navy);max-width:74ch;margin:0 0 10px}}
.callout p:last-child{{margin-bottom:0}}
table{{width:100%;border-collapse:collapse}}
.scroll{{overflow-x:auto}}
th,td{{border:1px solid var(--rule);padding:9px 10px;text-align:left;vertical-align:top}}
thead th{{background:var(--navy);color:#fff;font-size:.68rem;font-weight:700;letter-spacing:.1em;
text-transform:uppercase;border-color:var(--navy);white-space:nowrap}}
tbody th{{background:var(--offwhite);min-width:230px}}
tr.m1 tbody th,tbody tr.m1 th{{background:var(--gold-pale)}}
.wk{{display:block;font-weight:800;font-size:.98rem}}
.wt{{display:block;font-size:.86rem;color:var(--ink-soft);margin-top:2px}}
.wd{{display:block;font-size:.72rem;color:var(--muted);margin-top:4px}}
td.c{{text-align:center;font-weight:700;font-size:.82rem;white-space:nowrap}}
td.ok{{background:var(--navy-tint);color:var(--navy)}}
td.part{{background:var(--gold-pale);color:var(--gold-text)}}
td.no{{color:var(--maroon-dark)}}
td.none{{color:var(--muted);font-weight:400}}
ul.state{{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}}
ul.state li{{display:flex;align-items:center;gap:10px;font-size:.92rem;border:1px solid var(--rule);border-radius:var(--r);padding:9px 12px}}
ul.state li.ok{{background:var(--navy-tint);border-color:var(--navy)}}
ul.state li.no{{border:2px dashed var(--muted)}}
ul.state .dot{{width:9px;height:9px;border-radius:99px;flex:0 0 auto;background:var(--navy)}}
ul.state li.no .dot{{background:var(--maroon)}}
ul.state .st{{margin-left:auto;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft)}}
ol.tiers{{margin:0;padding-left:0;list-style:none;counter-reset:t}}
ol.tiers > li{{counter-increment:t;border:1px solid var(--rule);border-radius:var(--rc);padding:18px 20px;margin:0 0 12px;background:#fff}}
ol.tiers > li.now{{border:2px solid var(--maroon)}}
ol.tiers h3{{font-size:1.05rem;font-weight:800;margin:0 0 4px}}
ol.tiers .tag{{display:inline-block;font-size:.64rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
padding:4px 11px;border-radius:99px;background:var(--navy);color:#fff;margin-bottom:9px}}
ol.tiers li.now .tag{{background:var(--maroon)}}
ol.tiers li.later .tag{{background:#fff;color:var(--muted);border:1px solid var(--muted)}}
ol.tiers ul{{margin:10px 0 0;padding-left:20px;color:var(--ink-soft);font-size:.93rem}}
ol.tiers li li{{margin:0 0 6px}}
.days{{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px;margin:0;padding:0;list-style:none}}
.days li{{border:1px solid var(--rule);border-radius:var(--r);padding:12px 14px;background:#fff}}
.days .d{{display:block;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-text);margin-bottom:5px}}
.days .w{{display:block;font-size:.9rem;color:var(--navy);font-weight:600}}
.days li.milestone{{background:var(--navy);border-color:var(--navy)}}
.days li.milestone .d{{color:#E9C877}} .days li.milestone .w{{color:#fff}}
footer{{background:var(--navy-deep);color:#fff;padding:28px max(20px,4vw)}}
.fi{{max-width:1180px;margin:0 auto;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline}}
footer .c{{font-size:.7rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#E9C877}}
@media print{{.hero{{background:#fff;color:#000}} .hero h1,.hero p{{color:#000}} footer{{display:none}}}}
@media (prefers-reduced-motion:reduce){{*{{transition:none!important;animation:none!important}}}}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to the tracker</a>
<header class="site-header"><div class="shi">
<svg viewBox="40 10 125 148" role="img" aria-label="BIO 005 Human Physiology"><g transform="translate(0,18)"><g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#08101F"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#08101F"/></g><g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#5E201A"/><path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#5E201A"/></g><g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#B8924A"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#B8924A"/></g></g></svg>
<div><div class="t1">Build tracker &middot; instructor only</div><div class="t2">Human Physiology</div>
<div class="t3">BIO 005 &middot; Yuba College &middot; Fall 2026</div></div></div></header>

<section class="hero"><div class="hi">
<p class="eyebrow">Generated {generated}</p>
<h1>{days} days to <span class="a">open day</span></h1>
<p>Students get the link on {openday}. The term opens {termday}. Everything below was read off the files in the repo, not off a list, so it cannot drift from what is actually built.</p>
<ul class="kpis">
<li><span class="k">Days left</span><span class="v">{days}</span></li>
<li><span class="k">Weeks</span><span class="v">{nweeks}</span></li>
<li><span class="k">Teaching topics</span><span class="v">{ntopics}</span></li>
<li><span class="k">Recall cards</span><span class="v">{ncards}</span></li>
<li><span class="k">Notes written</span><span class="v">{notes_done} of {ntopics}</span></li>
<li><span class="k">Videos made</span><span class="v">{video_done} of {ntopics}</span></li>
</ul>
</div></section>

<div class="wrap"><main id="main">

<div class="callout">
<h2>The one decision that makes this possible</h2>
<p><strong>You do not need fifteen weeks of material by September 7.</strong> You need Week 1 finished, the container built for the other fourteen, and a rhythm that keeps you two weeks ahead of the class. Thirty four topics in fifteen days is not a plan, it is how a term gets away from you in October.</p>
<p>Module 1 is three weeks and seven topics. That is the September 7 target. Weeks 2 and 3 give you a fortnight of runway from day one, and the two week buffer is what you defend for the rest of the term.</p>
</div>

<section class="card">
<p class="kicker">What is already done</p>
<h2>The scaffolding is finished</h2>
<p class="sub">This is the part that usually eats a summer, and it is behind you. The course can technically open on this alone.</p>
<ul class="state">
{sitelist}
</ul>
</section>

<section class="card">
<p class="kicker">Priorities, in order</p>
<h2>What to build, and what can wait</h2>
<ol class="tiers">
<li class="now"><span class="tag">Tier 1 &middot; before Sep 7</span>
<h3>Module 1 teaching material, seven topics</h3>
<ul>
<li><strong>Week 1</strong>, Foundations of Physiology, Quantitative Skills, Chemical Foundations</li>
<li><strong>Week 2</strong>, Membrane Structure and Diffusion, Membrane Transport, Membrane Potential</li>
<li><strong>Week 3</strong>, Cell Signaling</li>
<li>Each topic is one notes page, one concept video, one slide deck</li>
<li>Plus the syllabus, which does not exist yet and is the one thing a college will ask for</li>
</ul></li>

<li class="now"><span class="tag">Tier 1 &middot; before Sep 7</span>
<h3>The container, built once, filled forever</h3>
<ul>
<li><strong>A week hub template.</strong> Only week-01 exists. Build it as a generator that reads the schedule, the way the calendar does, and fourteen weeks appear for free</li>
<li><strong>course-materials.html</strong>, the page four dock tiles already point at</li>
<li>Both are a day of work that saves a fortnight later</li>
</ul></li>

<li><span class="tag">Tier 2 &middot; week 1 to 3 of term</span>
<h3>Stay two weeks ahead, and add the drawings</h3>
<ul>
<li>Module 2 topics, six of them, built while the class is inside Module 1</li>
<li>Weekly drawing prompt per week, off the checklists already written</li>
<li>The three review pages, chemistry, math and anatomy</li>
<li>The patient file project brief, which students start early and you want stable before they do</li>
</ul></li>

<li class="later"><span class="tag">Tier 3 &middot; after the term opens</span>
<h3>The lab, and everything else</h3>
<ul>
<li>The lab manual is written and three labs are built. <strong>PhysioEx covers the gap</strong> while you finish your own, which is exactly what a fallback is for</li>
<li>Your own simulators replace PhysioEx one week at a time, in the week they are needed</li>
<li>Lab skills checklist, generated from the lab manual, which already carries what students should be able to do and what they hand in</li>
<li>Practice exams, brain dump prompts, Virtual Office, Study With Me</li>
</ul></li>
</ol>
</section>

<section class="card">
<p class="kicker">Fifteen days</p>
<h2>The runway</h2>
<p class="sub">Two topics a day is the pace. Below that, Module 1 does not land.</p>
<ul class="days">
<li><span class="d">Aug 24 to 25</span><span class="w">Syllabus, then the week hub generator. Container first.</span></li>
<li><span class="d">Aug 26 to 28</span><span class="w">Week 1, three topics. Notes, video, slides for each.</span></li>
<li><span class="d">Aug 29 to 30</span><span class="w">course-materials.html, wired to the real notes and videos.</span></li>
<li><span class="d">Aug 31 to Sep 2</span><span class="w">Week 2, three topics.</span></li>
<li><span class="d">Sep 3</span><span class="w">Week 3, Cell Signaling. Module 1 content complete.</span></li>
<li><span class="d">Sep 4</span><span class="w">Week 1 drawing prompt and the patient file brief.</span></li>
<li class="milestone"><span class="d">Sep 5 to 6</span><span class="w">Walk the course as a student. Fix what you find. Nothing new.</span></li>
<li class="milestone"><span class="d">Sep 7</span><span class="w">Open day. Send the link.</span></li>
</ul>
</section>

<section class="card">
<p class="kicker">Every week, every asset</p>
<h2>Where the gaps actually are</h2>
<p class="sub">Module 1 is shaded. Cards and competencies are done for all fifteen weeks, which is why the right hand side of this table is the good news.</p>
<div class="scroll">
<table>
<caption class="skip">Build status by week and asset type</caption>
<thead><tr>
<th scope="col">Week</th><th scope="col">Notes</th><th scope="col">Video</th><th scope="col">Slides</th>
<th scope="col">Workbook</th><th scope="col">Lab</th><th scope="col">Cards</th><th scope="col">Drawings</th>
</tr></thead>
<tbody>
{rows}
</tbody></table>
</div>
</section>

</main></div>
<footer><div class="fi"><p><strong>Dr. Sharilyn Rennie</strong></p>
<p class="c">Build tracker &middot; regenerate with build-tracker.py</p></div></footer>
</body>
</html>
'''

if __name__ == '__main__':
    main()
