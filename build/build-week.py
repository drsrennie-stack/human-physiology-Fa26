#!/usr/bin/env python3
"""
BIO 005 week hub builder.

    python3 build-week.py weeks/w01.json
    python3 build-week.py weeks/*.json

Generates week-NN.html: the one page a student opens to find out what to do
this week. Fifteen of them, all identical in shape, so a student learns the
layout once in Week 1 and never has to learn it again.

WHY A GENERATOR
The hub is the page every student opens every week, so it is the page where
a small inconsistency costs the most. Building fifteen by hand is fifteen
chances to word the same thing differently. This reads the real competency
and schedule data, so the counts, dates and titles cannot drift from the
source.

THE PATH
Steps are fixed and in order, the way an ACLS algorithm is: do these in
sequence, then branch at the end. Progress is ticked off in the student's
own browser and never leaves it.

WHAT IS NOT INVENTED
Anything this script does not have a real value for renders as a visible
"not linked yet" state rather than a dead link or a made up one. A student
seeing "coming Friday" is fine. A student clicking a 404 is not.
"""
import io, json, os, re, sys, html, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
# The data lives in bio005-hub in the working tree and in build/data inside
# the shipped package. Look for both rather than making the package a special
# case that only works if you remember to move a folder.
DATA = next((d for d in (os.path.join(HERE, 'bio005-hub'), os.path.join(HERE, 'data'))
             if os.path.isdir(d)), os.path.join(HERE, 'bio005-hub'))


def esc(v):
    return html.escape(str(v if v is not None else ''), quote=False)


def rich(v):
    """Spec text may use *word* or **word** for emphasis and nothing else.
       Double asterisks are handled first so they are not eaten by the
       single asterisk rule."""
    s = html.escape(str(v if v is not None else ''), quote=False)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'\*([^*]+)\*', r'<strong>\1</strong>', s)
    return s


def load_data():
    """Read the real competency and schedule files rather than duplicating
       their contents here, so a remap flows straight through."""
    import subprocess
    js = '''
      global.window = {};
      require('%s/bio005-competencies.remapped.js');
      require('%s/bio005-schedule-fall2026.remapped.js');
      console.log(JSON.stringify({
        comps: window.BIO005_COMPETENCIES,
        weeks: window.BIO005_WEEKS
      }));
    ''' % (DATA, DATA)
    out = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if out.returncode != 0:
        raise SystemExit('could not read the data files:\n' + out.stderr)
    return json.loads(out.stdout)


def due_of(w):
    """A week's deadline. Normally the day it closes, but Weeks 12 and 13
       share one due date so that nothing lands on the Thanksgiving weekend.
       Everything that shows a deadline goes through here rather than reading
       closes directly, so the pairing is expressed once."""
    return w.get('due') or w['closes']


def paired(w):
    """The other weeks sharing this deadline, if any."""
    return [n for n in (w.get('pair') or []) if n != w['wk']]


def fmt(d):
    y, m, dd = [int(x) for x in d.split('-')]
    return datetime.date(y, m, dd).strftime('%A %B %-d')


def step_html(i, s):
    link = s.get('link')
    where = s.get('where', '')
    mins = s.get('mins')
    if link:
        action = ('<a class="go" href="%s" target="_top">%s</a>'
                  % (esc(link), esc(s.get('cta', 'Open'))))
    elif s.get('noaction'):
        action = ''   # nothing to click, like a reading in a physical book
    else:
        action = '<span class="pending">%s</span>' % esc(s.get('pending', 'Link coming Friday'))
    meta = []
    if where:
        meta.append('<span class="where">' + esc(where) + '</span>')
    if mins:
        meta.append('<span class="mins">about ' + esc(mins) + ' minutes</span>')
    return ('<li class="step">'
            '<div class="stepnum" aria-hidden="true">%d</div>'
            '<div class="stepbody">'
            '<h3>%s</h3>'
            '<p class="do">%s</p>'
            '%s'
            '%s'
            '</div>'
            '<label class="stepdone" for="s%d">'
            '<input type="checkbox" id="s%d" data-step="%d">'
            '<span class="vh">Mark step %d done</span>'
            '</label>'
            '</li>'
            % (i + 1, rich(s['title']), rich(s['do']),
               ('<p class="meta">' + ' &middot; '.join(meta) + '</p>') if meta else '',
               ('<div class="steprow">' + action + '</div>') if action else '',
               i + 1, i + 1, i + 1, i + 1))


# The words BIO 005 Human Physiology sit right beside the mark inside the same
# link, so naming the mark as well makes a screen reader say it twice.
LOGO = ('<svg viewBox="40 10 125 148" aria-hidden="true" focusable="false">'
        '<g transform="translate(0,18)">'
        '<g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#040711"/>'
        '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 '
        'C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#040711"/></g>'
        '<g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/>'
        '<path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 '
        'C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g>'
        '<g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#DCB45C"/>'
        '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 '
        'C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#DCB45C"/></g></g></svg>')



NAV = '''
<a class="skip" href="#main">Skip to the main content</a>
<header class="topbar">
  <div class="tb">
    <a class="brand" href="index.html" target="_top">
      %(logo)s
      <span><b>BIO 005</b><i>Human Physiology</i></span>
    </a>
    <nav class="mainnav" aria-label="Course sections">
      <a href="index.html" target="_top" %(navhome)s>Home</a>
      <a href="welcome.html" target="_top" %(navthis)s>This week</a>
      <a href="course-materials.html" target="_top">Lecture</a>
      <a href="clinical-physiology-lab-manual.html" target="_top">Lab</a>
      <a href="competency-recall.html" target="_top">Study</a>
      <a href="guides.html" target="_top">Guides</a>
      <a href="start-here.html" target="_top">Admin</a>
    </nav>
  </div>
</header>
'''

FOOT = '''
<footer class="site-footer"><div class="fi">
  <div>
    <p class="n">Dr. Sharilyn Rennie</p>
    <p class="c">BIO 005 Human Physiology &middot; Fall 2026</p>
  </div>
  <nav class="footnav" aria-label="Footer">
    <a href="welcome.html" target="_top">All weeks</a>
    <a href="guides.html" target="_top">Guides</a>
    <a href="start-here.html" target="_top">Syllabus</a>
    <a href="competency-map.html" target="_top">Competencies</a>
  </nav>
</div></footer>
'''

def build(spec, data):
    wk = spec['week']
    w = [x for x in data['weeks'] if x['wk'] == wk]
    if not w:
        raise SystemExit('week %s is not in the schedule file' % wk)
    w = w[0]
    comps = [c for c in data['comps'] if c['week'] == wk]
    est = sum(c.get('est', 0) for c in comps)
    part = ('Foundations' if wk <= 3 else 'Control systems' if wk <= 8 else 'Systems in action')

    topics = []
    for c in comps:
        if c['general'] not in topics:
            topics.append(c['general'])

    chips = ['Opens ' + fmt(w['opens']), '%d competencies' % len(comps)]
    if w.get('short'):
        chips.append('Short week')

    steps = ''.join(step_html(i, s) for i, s in enumerate(spec['steps']))

    complist = ''.join(
        '<li><span class="cid">%s</span> <span class="cname">%s</span>'
        '<span class="ccan">%s</span></li>'
        % (esc(c['id']), esc(c['name']), esc(c.get('can', '')))
        for c in comps)

    wkgrid = ''.join(
        '<li><a href="week-%02d.html" target="_top"%s>%d</a></li>'
        % (x['wk'], ' aria-current="page"' if x['wk'] == wk else '', x['wk'])
        for x in sorted(data['weeks'], key=lambda z: z['wk']))

    chapters = ''.join(
        '<li><span class="k">Ch %s</span><span class="v">%s%s</span></li>'
        % (esc(c['n']), esc(c['title']),
           ('<br><small style="font-weight:500;color:var(--ink-soft)">' + rich(c['note']) + '</small>')
           if c.get('note') else '')
        for c in spec.get('chapters', []))
    others = paired(w)
    chapters += ('<li><span class="k">Due</span><span class="v">%s, 11:59 pm%s</span></li>'
                 % (fmt(due_of(w)),
                    ('<br><small style="font-weight:500;color:var(--ink-soft)">'
                     'Shared with week %s. Nothing is due on the Thanksgiving weekend.</small>'
                     % ' and '.join(str(n) for n in others)) if others else ''))
    chapters += ('<li><span class="k">Study</span><span class="v">%.1f hours by the map</span></li>'
                 % (est / 60.0))

    nxt = ''
    nw = [x for x in data['weeks'] if x['wk'] == wk + 1]
    if nw:
        nxt = ('<section class="nextcard"><p class="eyebrow">Next week</p>'
               '<h2>Week %d, %s</h2><p>%s</p>'
               '<a href="week-%02d.html" target="_top">Look ahead</a></section>'
               % (nw[0]['wk'], esc(nw[0]['title']),
                  rich(spec.get('nextline', 'Opens ' + fmt(nw[0]['opens']) + '.')),
                  nw[0]['wk']))

    know_items = spec.get('know', [])
    know = ''.join('<li>%s</li>' % rich(k) for k in know_items)

    return ('week-%02d.html' % wk, TEMPLATE % {
        'wk': wk,
        'title': esc(w['title']),
        'part': part,
        'oneline': rich(spec['oneline']),
        'chips': ''.join('<li>%s</li>' % esc(c) for c in chips),
        'about': rich(spec['about']),
        'watch': ''.join('<li><span>%s</span></li>' % rich(x) for x in spec.get('watch', [])),
        'nwatch': len(spec.get('watch', [])),
        'steps': steps,
        'nsteps': len(spec['steps']),
        'chapters': chapters,
        'wkgrid': wkgrid,
        'knowblock': '' if not know else KNOWBLOCK % {
            'know': know, 'nknow': len(know_items), 'knowlead': rich(spec.get('knowlead', ''))},
        'complist': complist,
        'ncomp': len(comps),
        'topics': ', '.join(esc(t) for t in topics),
        'next': nxt,
        'notenote': ('<p class="wknote">%s</p>' % rich(w['note'])) if w.get('note') else '',
        'nav': NAV % {'logo': LOGO, 'navthis': 'aria-current="page"', 'navhome': ''},
        'foot': FOOT,
    })


KNOWBLOCK = '''
  <details class="drop">
    <summary>Structures you should already know <span class="tag">%(nknow)d</span></summary>
    <div class="dropbody">
      <p class="lead">%(knowlead)s</p>
      <ul class="knowlist">%(know)s</ul>
      <p class="knowfoot">Not familiar with one? The
        <a href="anatomy-review.html" target="_top">anatomy review page</a> covers them, and
        <a href="https://openstax.org/details/books/anatomy-and-physiology-2e" target="_blank" rel="noopener">OpenStax</a>
        is free and searchable. You do not need to have taken anatomy to do well here. You do need to
        look these up when they come past.</p>
    </div>
  </details>
'''

TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<title>Week %(wk)d &middot; %(title)s &middot; BIO 005</title>
<meta name="description" content="BIO 005 Human Physiology, Week %(wk)d: %(title)s. What to do this week, in order.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{
  /* ============================================================
     MedMasters card system tokens.
     From her spec, extracted off the live medmasterscollaborative.com
     pricing section. Three values changed, each noted, because the
     original drops below the WCAG floor this course has to hold.
     ============================================================ */
  --navy:#040711;                     /* body text, headings, borders, and the dark band.
                                         20.12:1 on white. Deepened from the spec's #0B1530
                                         at her request: much darker. */
  --navy-70:rgba(4,7,17,.70);         /* de-emphasized text. 7.88:1 on white, 7.54:1 on off-white.
                                         This is the LIGHTEST alpha that still clears AAA on both
                                         grounds, so it de-emphasizes as much as the floor allows.
                                         CHANGED from the spec's --navy-55, which measured 4.04:1
                                         and fails even AA for normal text. */
  --navy-75:var(--navy-70);           /* alias, older rules still name it */
  --navy-50:rgba(4,7,17,.50);         /* boundary of a control. 3.79:1, clears 1.4.11.
                                         CHANGED: the spec used --navy-15 on .cta-outline, and a
                                         button whose only edge is 1.37:1 is not identifiable. */
  --navy-15:rgba(4,7,17,.15);         /* decorative hairlines ONLY. Card edges and dividers, which
                                         carry no information, so 1.40:1 is fine there. */
  --terra:#8B3A2E;                    /* the only accent on a light ground. 7.66:1 on white */
  --terra-dark:#6E2C23;               /* terra hover. 10.26:1 on white */
  --white:#FFFFFF;

  /* Dark grounds need their own accent: terra on navy is 2.36:1, which is
     unusable (2.63:1). These three are her own BIO 004 tokens, not cream. */
  --gold-bright:#DCB45C;              /* 10.28:1 on navy */
  --straw:#E8CE85;
  --straw-light:#F2E2B8;              /* 15.66:1 on navy */
  --navy-deep:#01030A;                /* the footer, deeper still */
  --navy-tint:#EBEDF2;
  --offwhite:#FAFAF9;

  /* aliases kept so the older rules on the week and guide pages
     keep working against the new palette */
  --maroon:var(--terra); --maroon-dark:var(--terra-dark);
  --ink-soft:var(--navy-70);
  --rule:var(--navy-50); --rule-soft:var(--navy-15);
  --gold:var(--gold-bright); --gold-deep:#8A6D33; --gold-text:#8B3A2E; --gold-pale:#F7EFD9;
  --gray-lock:#767E8C;

  /* rhythm, from the spec */
  --card-radius:8px; --btn-radius:4px; --badge-radius:3px;
  --grid-gap:14px; --card-pad:24px 22px;
  --r:8px; --rc:8px; --r-block:8px; --r-card:8px;
  /* The pricing cards in her spec are flat by design and stay flat: .vl-card
     declares no shadow. These three are for the page furniture that has to
     read as lifted, above all the hero card that straddles the band edge. */
  --shadow:0 1px 3px rgba(4,7,17,.10);
  --shadow-rest:0 1px 3px rgba(4,7,17,.10);
  --shadow-hover:0 14px 30px rgba(4,7,17,.24);
  --shadow-lift:0 22px 48px rgba(4,7,17,.45);

  --font:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;
  --display:'Open Sans',system-ui,-apple-system,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
html,body{margin:0}
body{font-family:var(--font);background:var(--offwhite);color:var(--navy);line-height:1.6;font-size:16px}
em,i,cite,dfn,var,address{font-style:normal}
h1,h2,h3,h4{margin:0;letter-spacing:-.02em;font-family:var(--display);font-weight:800}
p{margin:0 0 12px}
ul,ol{margin:0;padding:0}
a{color:var(--maroon-dark)}
.vh{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
:focus-visible{outline:3px solid var(--navy);outline-offset:2px;box-shadow:0 0 0 6px var(--gold-bright);border-radius:4px}
.skip{position:absolute;left:-9999px;top:0;z-index:80;background:var(--navy);color:#fff;padding:12px 18px;font-weight:700;text-decoration:none}
.skip:focus{left:0;top:0}

/* ---------- top bar ---------- */
.topbar{background:#fff;border-bottom:1px solid var(--rule-soft);position:sticky;top:0;z-index:40}
.tb{max-width:1180px;margin:0 auto;padding:0 max(16px,3vw);display:flex;align-items:center;
    gap:22px;flex-wrap:wrap;min-height:62px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--navy);padding:8px 0}
.brand svg{height:30px;width:auto;display:block}
.brand span{display:flex;flex-direction:column;line-height:1.1}
.brand b{font-size:.94rem;font-weight:800;letter-spacing:-.01em}
.brand i{font-size:.72rem;color:var(--ink-soft);font-weight:600}
.mainnav{display:flex;gap:0;flex-wrap:wrap;margin-left:auto}
/* The current page is marked three ways: a gold rule under it, a darker ink,
   and a heavier weight. The gold rule is 1.9:1 on white, which is fine as
   reinforcement but could not carry the state on its own, so the weight and
   colour shift carry it too and aria-current carries it for a screen reader. */
.mainnav a{position:relative;font-size:.9rem;font-weight:600;color:var(--navy-70);
  text-decoration:none;padding:10px 6px;margin:0 10px;min-height:44px;min-width:44px;
  display:flex;align-items:center;justify-content:center}
.mainnav a:hover{color:var(--navy)}
.mainnav a:hover::after,.mainnav a[aria-current="page"]::after{
  content:"";position:absolute;left:0;right:0;bottom:7px;height:3px;border-radius:2px}
.mainnav a:hover::after{background:var(--navy-15)}
.mainnav a[aria-current="page"]{color:var(--navy);font-weight:800}
.mainnav a[aria-current="page"]::after{background:var(--gold-bright)}
.mainnav a[aria-current="page"]:hover::after{background:var(--gold-bright)}

/* ---------- shell ---------- */
.shell{max-width:1180px;margin:0 auto;padding:0 max(16px,3vw) 0}
.crumb{font-size:.78rem;color:var(--ink-soft);padding:16px 0 0}
.crumb a{color:var(--ink-soft)}

.hero{padding:6px 0 4px}
.eyebrow{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--maroon-dark);margin:0 0 6px}
h1{font-size:clamp(1.6rem,3.4vw,2.15rem);margin:0 0 8px;line-height:1.14;max-width:30ch}
.sub{color:var(--ink-soft);font-size:.95rem;margin:0 0 14px;max-width:64ch}
.herorow{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin:0 0 4px}
.chips{list-style:none;display:flex;gap:6px;flex-wrap:wrap}
.chips li{font-size:.76rem;font-weight:700;color:var(--ink-soft);background:#fff;
          border:1px solid var(--rule-soft);border-radius:999px;padding:5px 12px}
.wknote{background:var(--gold-pale);border-radius:var(--r);padding:11px 14px;font-size:.88rem;
        margin:14px 0 0;max-width:70ch}

.cols{display:grid;grid-template-columns:minmax(0,1fr);gap:26px;padding:22px 0 0}
@media(min-width:960px){.cols{grid-template-columns:minmax(0,1fr) 296px;gap:34px}}

/* ---------- the path ---------- */
.panel{background:#fff;border:1px solid var(--rule-soft);border-radius:var(--rc);box-shadow:var(--shadow)}
.panelhead{padding:18px 20px 0}
.panelhead h2{font-size:1.1rem;font-weight:800;margin:0 0 4px}
.panelhead p{font-size:.9rem;color:var(--ink-soft);margin:0;max-width:62ch}
.pmeter{display:flex;align-items:center;gap:12px;padding:14px 20px 0}
.bar{flex:1;height:8px;background:var(--navy-tint);border-radius:999px;overflow:hidden}
.bar span{display:block;height:100%%;background:var(--gold);width:0;transition:width 220ms ease}
.ptext{font-size:.82rem;font-weight:700;color:var(--ink-soft);white-space:nowrap}

.path{list-style:none;padding:14px 12px 16px}
.step{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:12px;align-items:start;
      padding:13px 10px;border-radius:var(--r)}
.step + .step{border-top:1px solid var(--rule-soft)}
.step[data-done="yes"]{background:var(--offwhite)}
.step[data-done="yes"] .stepbody h3{color:var(--ink-soft)}
.stepnum{width:26px;height:26px;border-radius:999px;background:var(--navy-tint);color:var(--navy);
         font-weight:800;font-size:.78rem;display:flex;align-items:center;justify-content:center;margin-top:2px}
.step[data-done="yes"] .stepnum{background:var(--gold);border:1.5px solid #5C4110}
.stepbody h3{font-size:.97rem;font-weight:700;margin:0 0 3px}
.stepbody .do{font-size:.89rem;color:var(--ink-soft);margin:0;max-width:60ch}
.stepbody .meta{font-size:.76rem;color:var(--ink-soft);margin:6px 0 0}
.steprow{margin:9px 0 0}
.go{display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;border-radius:999px;
    background:var(--maroon);color:#fff;font-size:.82rem;font-weight:700;text-decoration:none;
    border:1.5px solid var(--maroon)}
.go:hover{background:var(--maroon-dark);border-color:var(--maroon-dark)}
.pending{display:inline-flex;align-items:center;min-height:44px;padding:10px 15px;border-radius:999px;
  border:1.5px dashed var(--gray-lock);color:#4A5261;font-size:.79rem;font-weight:700}
/* The label is the target, so the whole 44px box is clickable, not the box glyph. 2.5.8. */
.stepdone{display:flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;cursor:pointer}
.stepdone input{width:24px;height:24px;accent-color:var(--maroon)}
@media(max-width:640px){.step{grid-template-columns:26px minmax(0,1fr) 30px;gap:10px}}

/* ---------- collapsibles ---------- */
details.drop{background:#fff;border:1px solid var(--rule-soft);border-radius:var(--rc);
             box-shadow:var(--shadow);margin:14px 0 0}
details.drop > summary{list-style:none;cursor:pointer;padding:15px 20px;min-height:52px;
  display:flex;align-items:center;gap:10px;font-size:.97rem;font-weight:700}
details.drop > summary::-webkit-details-marker{display:none}
details.drop > summary::after{content:'+';margin-left:auto;font-size:1.25rem;font-weight:700;color:var(--maroon)}
details.drop[open] > summary::after{content:'\2212'}
details.drop > summary .tag{font-size:.72rem;font-weight:700;color:var(--ink-soft);
  background:var(--navy-tint);border-radius:999px;padding:3px 10px}
.dropbody{padding:0 20px 20px}
.dropbody > p:first-child{margin-top:0}
.dropbody .lead{font-size:.9rem;color:var(--ink-soft);max-width:64ch}

.watch{list-style:none;display:grid;gap:9px;margin:4px 0 0}
.watch li{display:grid;grid-template-columns:7px minmax(0,1fr);gap:11px;align-items:start;font-size:.92rem}
.watch li::before{content:'';height:7px;border-radius:50%%;background:var(--maroon);margin-top:8px}
.watch li span{min-width:0}

.knowlist{list-style:none;display:flex;flex-wrap:wrap;gap:7px;margin:10px 0 12px}
.knowlist li{font-size:.85rem;font-weight:600;background:var(--offwhite);border:1px solid var(--rule-soft);
             border-radius:999px;padding:6px 13px}
.knowfoot{font-size:.86rem;color:var(--ink-soft);margin:0;max-width:66ch}

.cplist{list-style:none;display:grid;gap:11px;margin:10px 0 0}
.cplist li{border-left:2px solid var(--rule-soft);padding-left:12px}
.cid{font:600 .72rem ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--gold-text)}
.cname{font-weight:700;font-size:.9rem;display:block}
.ccan{display:block;font-size:.86rem;color:var(--ink-soft)}

/* ---------- rail ---------- */
.rail{display:grid;gap:14px;align-content:start}
@media(min-width:960px){.rail{position:sticky;top:78px}}
.rcard{background:#fff;border:1px solid var(--rule-soft);border-radius:var(--rc);
       box-shadow:var(--shadow);padding:16px 18px}
.rcard h2{font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
          color:var(--maroon-dark);margin:0 0 10px}
.glance{list-style:none;display:grid;gap:9px}
.glance li{display:grid;grid-template-columns:76px minmax(0,1fr);gap:8px;font-size:.86rem;align-items:start}
.glance dt,.glance .k{color:var(--ink-soft);font-weight:700;font-size:.78rem;padding-top:1px}
.glance .v{font-weight:600}

.wkgrid{list-style:none;display:grid;grid-template-columns:repeat(5,1fr);gap:5px}
.wkgrid a{display:flex;align-items:center;justify-content:center;min-height:44px;border-radius:7px;
  font-size:.82rem;font-weight:700;text-decoration:none;color:var(--navy);
  background:var(--offwhite);border:1px solid var(--rule-soft)}
.wkgrid a:hover{background:var(--gold-pale);border-color:var(--gold-deep)}
.wkgrid a[aria-current="page"]{background:var(--maroon);border-color:var(--maroon);color:#fff}

.rlist{list-style:none;display:grid;gap:2px}
.rlist a{display:block;font-size:.87rem;font-weight:600;text-decoration:none;color:var(--navy);
  padding:10px;border-radius:7px;min-height:44px;display:flex;align-items:center;gap:9px}
.rlist a:hover{background:var(--gold-pale)}
.rlist .dot{flex:0 0 6px;height:6px;border-radius:50%%;background:var(--gold)}
.rlist small{display:block;font-weight:500;color:var(--ink-soft);font-size:.78rem}

.nextcard{background:var(--navy);color:#fff;border-radius:var(--rc);padding:18px 20px;margin:14px 0 0}
.nextcard .eyebrow{color:#F0DCA8}
.nextcard h2{font-size:1rem;font-weight:800;margin:0 0 5px}
.nextcard p{font-size:.88rem;color:#D6DCE6;margin:0 0 12px;max-width:58ch}
.nextcard a{display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;border-radius:999px;
  background:var(--gold);color:#000;font-size:.82rem;font-weight:700;text-decoration:none}

.site-footer{background:var(--navy-deep);color:#fff;padding:26px max(16px,3vw);margin-top:44px}
.fi{max-width:1180px;margin:0 auto;display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;align-items:center}
.site-footer .n{font-weight:800;margin:0;font-size:.95rem}
.site-footer .c{font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#F0DCA8;margin:0}
.footnav{display:flex;gap:4px;flex-wrap:wrap}
.footnav a{color:#D6DCE6;font-size:.84rem;font-weight:600;text-decoration:none;padding:10px 14px;border-radius:999px;min-height:44px;display:flex;align-items:center}
.footnav a:hover{background:rgba(255,255,255,.10);color:#fff}

/* On a phone a sticky seven-item bar eats a third of the screen, so it
   sits at the top of the document instead of on top of it. Nothing is
   hidden behind a scroll or a menu button either way. */
@media(max-width:760px){
  .topbar{position:static}
  .tb{gap:8px;min-height:0;padding-top:8px;padding-bottom:8px}
  .brand svg{height:26px}
  .brand b{font-size:.88rem}
  .mainnav{margin-left:0;width:100%%;gap:0}
  .mainnav a{font-size:.82rem;padding:9px 4px;margin:0 8px}
}

/* ============================================================
   MEDMASTERS CARD SYSTEM
   Her spec, implemented. Type scale kept at her numbers.
   Flat cards: hairline border, 8px radius, no shadow, no lift.
   The emphasis treatment is a 2px terra border and nothing else.
   ============================================================ */

/* ---- section shell ---- */
.vl-section{background:var(--white);padding:48px max(40px,5vw)}
.vl-eyebrow{font-size:11px;font-weight:700;letter-spacing:3.3px;text-transform:uppercase;
  color:var(--terra);margin:0 0 18px}
.vl-headline{font-family:var(--display);font-size:30px;font-weight:800;line-height:33px;
  letter-spacing:-.6px;color:var(--navy);margin:0 0 26px;text-wrap:balance}
.vl-headline .accent{color:var(--terra)}

/* ---- grid ---- */
.vl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--grid-gap);margin:0 0 22px}
/* margin-top:auto on the CTA is what lands every button on the same
   baseline however long the copy above it runs. */
.vl-card{background:var(--white);border:1px solid var(--navy-15);border-radius:var(--card-radius);
  padding:var(--card-pad);display:flex;flex-direction:column;position:relative}
.vl-card.featured{border:2px solid var(--terra)}
.vl-card.soon{border-style:dashed}

/* ---- card parts ---- */
.vl-badge{position:absolute;top:-10px;right:22px;font-size:11px;font-weight:700;
  letter-spacing:1.98px;text-transform:uppercase;color:var(--white);background:var(--terra);
  border-radius:var(--badge-radius);padding:4px 10px}
.vl-badge.quiet{background:var(--navy)}
/* Numbers belong here only because the set is a real progression.
   Do not carry them onto cards that have no order. */
.vl-num{font-size:28px;font-weight:800;line-height:28px;letter-spacing:-.56px;color:var(--terra);
  margin:0 0 12px;font-variant-numeric:tabular-nums}
.vl-tier{font-size:18px;font-weight:800;line-height:28.8px;letter-spacing:-.27px;color:var(--navy);
  margin:0 0 8px}
.vl-price{font-size:13px;font-weight:700;line-height:20.8px;color:var(--terra);margin:0 0 14px;
  font-variant-numeric:tabular-nums}
.vl-price .was{color:var(--navy-70);font-weight:500;text-decoration:line-through;margin-right:6px}
.vl-tagline{font-size:13px;font-weight:400;line-height:20.15px;color:var(--navy);margin:0 0 16px}
/* A rule, not a border on the card: it separates the pitch from the
   specifics without boxing anything in. */
.vl-divider{height:1px;background:var(--navy-15);margin:0 0 14px}
.vl-includes{font-size:11px;font-weight:700;letter-spacing:2.09px;text-transform:uppercase;
  color:var(--navy);margin:0 0 10px}
.vl-list{list-style:none;margin:0 0 20px;padding:0}
.vl-list li{font-size:13px;font-weight:500;line-height:19px;color:var(--navy);
  padding:4px 0 4px 15px;margin:0 0 2.4px;position:relative}
/* Custom dot rather than a list marker, so the colour and size are ours
   and the text hangs properly under itself. */
.vl-list li::before{content:"";position:absolute;left:0;top:10px;width:5px;height:5px;
  border-radius:50%%;background:var(--terra)}

/* ---- buttons ---- */
.vl-cta{margin-top:auto;display:block;text-align:center;text-decoration:none;
  font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border-radius:var(--btn-radius);padding:14px;min-height:44px;
  transition:opacity 160ms ease,background 160ms ease}
.cta-outline{color:var(--navy);border:1px solid var(--navy-50)}
.cta-outline:hover{background:var(--navy);color:var(--white);border-color:var(--navy)}
.cta-solid{color:var(--white);background:var(--terra);border:1px solid var(--terra)}
.cta-solid:hover{background:var(--terra-dark);border-color:var(--terra-dark)}
.cta-quiet{color:var(--navy-70);border:1px dashed var(--navy-50)}
.vl-cta:focus-visible{outline:3px solid var(--terra);outline-offset:2px}

/* ---- note under a grid ---- */
.vl-note{font-size:13px;line-height:19px;color:var(--navy);margin:0}
.vl-note a{color:var(--terra);font-weight:700;text-decoration:none;border-bottom:1px solid var(--terra)}

/* ---- on a dark or terra ground the cards stay white, but the
        surrounding type has to switch: terra is 2.36:1 on navy. ---- */
/* These reach section-level type only. .vl-num lives inside a card, and a
   card is white on every ground, so it must keep its terra. */
.band-dark .vl-eyebrow{color:var(--straw-light)}
.band-dark .vl-headline{color:var(--white)}
.band-maroon .vl-eyebrow,.band-maroon .vl-headline{color:var(--white)}

@media(max-width:800px){
  .vl-grid{grid-template-columns:1fr}
  .vl-cta{margin-top:8px}
  .vl-headline{font-size:26px;line-height:30px}
}
@media print{
  .vl-card,.vl-card.featured,.vl-card.soon{border:1px solid #000;break-inside:avoid;page-break-inside:avoid}
  .vl-badge,.cta-solid{background:none;color:#000;border:1px solid #000}
  .vl-list li::before{background:#000}
}

@media(prefers-reduced-motion:reduce){*{transition:none!important}}
@media print{
  .topbar,.site-footer,.rail,.pmeter,.stepdone,.go,.pending{display:none}
  body{background:#fff;font-size:11.5px}
  .cols{grid-template-columns:1fr}
  details.drop{border:0}details.drop > summary::after{content:''}
  .dropbody{display:block!important}
}
</style>
</head>
<body>
%(nav)s

<main class="shell" id="main">
<p class="crumb"><a href="welcome.html" target="_top">All weeks</a> &nbsp;&rsaquo;&nbsp; Week %(wk)d</p>

<div class="hero">
  <p class="eyebrow">%(part)s &middot; Week %(wk)d of 15</p>
  <h1>%(title)s</h1>
  <p class="sub">%(oneline)s</p>
  <div class="herorow"><ul class="chips">%(chips)s</ul></div>
  %(notenote)s
</div>

<div class="cols">
<div class="content">

  <section class="panel" aria-labelledby="pathh">
    <div class="panelhead">
      <h2 id="pathh">Do these in order</h2>
      <p>Each step sets up the next one. The last three only work if the earlier ones were done honestly.</p>
    </div>
    <div class="pmeter">
      <div class="bar"><span id="barfill"></span></div>
      <p class="ptext" id="ptext" role="status" aria-live="polite">0 of %(nsteps)d</p>
    </div>
    <ol class="path" id="path">%(steps)s</ol>
  </section>

  <details class="drop">
    <summary>What to watch for <span class="tag">%(nwatch)d things</span></summary>
    <div class="dropbody">
      <p class="lead">%(about)s</p>
      <ul class="watch">%(watch)s</ul>
    </div>
  </details>

  %(knowblock)s

  <details class="drop">
    <summary>Competencies this week covers <span class="tag">%(ncomp)d</span></summary>
    <div class="dropbody">
      <p class="lead">%(topics)s. Nothing on an exam comes from outside this list.</p>
      <ul class="cplist">%(complist)s</ul>
    </div>
  </details>

  %(next)s

</div>

<aside class="rail" aria-label="This week at a glance">

  <div class="rcard">
    <h2>Reading</h2>
    <ul class="glance">%(chapters)s</ul>
  </div>

  <div class="rcard">
    <h2>Jump to a week</h2>
    <ul class="wkgrid">%(wkgrid)s</ul>
  </div>

  <div class="rcard">
    <h2>Guides</h2>
    <ul class="rlist">
      <li><a href="guide-how-to-study.html" target="_top"><span class="dot" aria-hidden="true"></span>
        <span>How to study this course<small>The method, and why it is built this way</small></span></a></li>
      <li><a href="guide-week-page.html" target="_top"><span class="dot" aria-hidden="true"></span>
        <span>How this page works<small>What each step is asking of you</small></span></a></li>
      <li><a href="guide-drawing.html" target="_top"><span class="dot" aria-hidden="true"></span>
        <span>Drawing from memory<small>The chart entry, done well</small></span></a></li>
    </ul>
  </div>

  <div class="rcard">
    <h2>Stuck?</h2>
    <ul class="rlist">
      <li><a href="guides.html" target="_top"><span class="dot" aria-hidden="true"></span><span>All guides</span></a></li>
      <li><a href="anatomy-review.html" target="_top"><span class="dot" aria-hidden="true"></span><span>Anatomy review</span></a></li>
      <li><a href="competency-recall.html" target="_top"><span class="dot" aria-hidden="true"></span><span>Recall cards</span></a></li>
    </ul>
  </div>

</aside>
</div>
</main>

%(foot)s

<script>
(function () {
  'use strict';
  var KEY = 'bio005-week-%(wk)d-progress';
  var boxes = Array.prototype.slice.call(document.querySelectorAll('[data-step]'));
  var done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  function paint() {
    var n = 0;
    boxes.forEach(function (b) {
      var k = b.getAttribute('data-step');
      b.checked = !!done[k];
      b.closest('.step').setAttribute('data-done', b.checked ? 'yes' : 'no');
      if (b.checked) { n += 1; }
    });
    var pct = boxes.length ? Math.round(n / boxes.length * 100) : 0;
    document.getElementById('barfill').style.width = pct + '%%';
    document.getElementById('ptext').textContent =
      n + ' of ' + boxes.length + (n === boxes.length && n ? ', finished' : '');
  }
  boxes.forEach(function (b) {
    b.addEventListener('change', function () {
      done[b.getAttribute('data-step')] = b.checked;
      try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {}
      paint();
    });
  });
  paint();
}());
</script>

<script>
(function () {
  var ID = 'week-%(wk)02d';
  function send() {
    try {
      var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      parent.postMessage({ id: ID, frameId: ID, height: h }, '*');
    } catch (e) {}
  }
  window.addEventListener('load', send);
  window.addEventListener('resize', send);
  document.addEventListener('change', function () { setTimeout(send, 150); });
  document.addEventListener('toggle', function () { setTimeout(send, 220); }, true);
  if (window.ResizeObserver) { new ResizeObserver(send).observe(document.body); }
  send();
}());
</script>
</body>
</html>
'''



def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    data = load_data()
    for path in sys.argv[1:]:
        spec = json.load(io.open(path, encoding='utf-8'))
        name, out = build(spec, data)
        if '—' in out or '–' in out:
            raise SystemExit('em or en dash found in ' + name)
        io.open(name, 'w', encoding='utf-8').write(out)
        print('%-16s %2d steps  %6.1f KB' % (name, len(spec['steps']), len(out) / 1024.0))


if __name__ == '__main__':
    main()
