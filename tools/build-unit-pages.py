#!/usr/bin/env python3
"""
Build unit-01.html through unit-05.html from before-you-start.html.

    python3 tools/build-unit-pages.py

WHAT THESE PAGES ARE FOR
------------------------
One course-wide readiness page was the wrong shape. Twenty seven
concepts spanning fifteen weeks, taken once in August, means a student
reads about the nephron ten weeks before they need it and has forgotten
it by the time they do. Scrubs' words: when you get to acid base
balance, that is when we talk about pH and the math that goes with it,
not all in one place.

So each unit gets its own page carrying only the chemistry, anatomy and
math that unit uses, with questions written at that unit's depth. pH in
unit 1 is what the scale means. pH in unit 5 is a patient with a blood
gas. Same concept id, different question, and the question's own units
array is what keeps them apart.

before-you-start.html stays as the front door for the first week of
term and now routes to these five.

HOW IT WORKS
------------
Forked from before-you-start.html so there is one design, not six. The
page sets data-readiness-unit on the body, and readiness-check-view.js
filters the concepts and the questions to that unit. Nothing about the
boxes, the shadows, the colors or the result logic is duplicated.

Rerun after editing before-you-start.html or readiness-check.js. The
generated pages are overwritten, so do not hand edit them.
"""
import json, os, re, subprocess, sys

SRC = 'before-you-start.html'

UNITS = {
    1: dict(name='Unit 1', weeks='Weeks 1 to 3',
            topic='Foundations, membranes and cell signaling',
            line='This unit is about how the body holds itself steady, and how things get in and out of a cell.'),
    2: dict(name='Unit 2', weeks='Weeks 4 to 6',
            topic='Neurophysiology and muscle physiology',
            line='This unit is about how a nerve signal fires and how a muscle contracts. It leans hard on ions and on ATP.'),
    3: dict(name='Unit 3', weeks='Weeks 7 to 9',
            topic='Sensory, motor, autonomic and endocrine physiology',
            line='This unit is about how you sense things, how you move, and how hormones carry a message. Receptors and solubility do most of the work.'),
    4: dict(name='Unit 4', weeks='Weeks 10 to 12',
            topic='Cardiovascular and respiratory physiology',
            line='This unit is about the heart as a pump and the lungs as a gas exchanger. It is the most quantitative unit in the course.'),
    5: dict(name='Unit 5', weeks='Weeks 13 to 15',
            topic='Renal, digestive, metabolic, immune and reproductive physiology',
            line='This unit is about the kidney, acid and base balance, and what happens to food. pH comes back here properly, with a patient attached.'),
}


def load(root):
    js = ('global.window={};require(%s);'
          'process.stdout.write(JSON.stringify(global.window.BIO005_READINESS));'
          % json.dumps(os.path.join(root, 'readiness-check.js')))
    out = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if out.returncode:
        print(out.stderr.strip())
        return None
    return json.loads(out.stdout)


def counts(data, unit):
    """(concepts, questions) per box for this unit."""
    r = {}
    for key in ('chemistry', 'anatomy', 'math'):
        cs = [c for c in data[key]['concepts'] if unit in c.get('units', [])]
        ids = {c['id'] for c in cs}
        qs = [q for q in data[key]['questions']
              if unit in q.get('units', []) and q['concept'] in ids]
        r[key] = (len(cs), len(qs))
    return r


def one(s, old, new, label):
    if s.count(old) != 1:
        raise SystemExit('%s: expected 1 match, found %d' % (label, s.count(old)))
    return s.replace(old, new)


def build(src, data, unit):
    u = UNITS[unit]
    c = counts(data, unit)
    s = src

    # Body carries the unit. readiness-check-view.js reads it and filters.
    s = one(s, '<body>', '<body data-readiness-unit="%d">' % unit, 'body tag')

    s = re.sub(r'<title>.*?</title>',
               '<title>%s. What it assumes &middot; BIO 005 Human Physiology</title>' % u['name'],
               s, count=1, flags=re.S)
    s = re.sub(r'<meta name="description" content="[^"]*">',
               '<meta name="description" content="BIO 005 Human Physiology, Yuba College. '
               'The chemistry, anatomy and math %s uses, with a short check for each.">' % u['name'],
               s, count=1)

    # Cover
    s = re.sub(r'<p class="cp-eyebrow">.*?</p>',
               '<p class="cp-eyebrow">BIO 005 &middot; Human Physiology &middot; %s</p>' % u['name'],
               s, count=1, flags=re.S)
    s = re.sub(r'<h1>.*?</h1>',
               '<h1>What %s assumes you already have<span class="dot">.</span></h1>' % u['name'],
               s, count=1, flags=re.S)
    s = re.sub(r'<p class="cp-sub">.*?</p>',
               '<p class="cp-sub">%s &middot; %s</p>' % (u['topic'], u['weeks']),
               s, count=1, flags=re.S)
    s = re.sub(r'<span class="cb-l">.*?</span>',
               '<span class="cb-l">Yuba College &middot; Fall 2026 &middot; %s, %s</span>'
               % (u['name'], u['weeks'].lower()),
               s, count=1, flags=re.S)

    # Box headers carry this unit's real counts
    for key, box, label in (('chemistry', 'chem', 'Chemistry'),
                            ('anatomy', 'anat', 'Anatomy'),
                            ('math', 'math', 'Math')):
        nq = c[key][1]
        s = re.sub(r'(id="h-%s">%s</h2>\s*<p class="rd-box-tag">)[^<]*(</p>)' % (box, label),
                   lambda m, n=nq: m.group(1) + ('%d question%s &middot; about %d minutes'
                                                 % (n, '' if n == 1 else 's', max(2, round(n * 0.5)))) + m.group(2),
                   s, count=1)

    # Lede
    s = re.sub(r'<p class="intro-line">Physiology assumes.*?</p>',
               '<p class="intro-line">%s Here is what it assumes you bring with you: '
               '%d chemistry, %d anatomy and %d math. Not the whole course, just this unit. '
               'Take the checks, five minutes each, and each one tells you the same thing: '
               'either you are good to go, or here are the two or three things worth a look first.</p>'
               % (u['line'], c['chemistry'][0], c['anatomy'][0], c['math'][0]),
               s, count=1, flags=re.S)

    # The nav back goes to the schedule, not the course home
    s = s.replace('&larr; Back to the course home', '&larr; Back to the schedule')
    s = re.sub(r'(<div class="navcta">\s*<p>)[^<]*(</p>)',
               lambda m: m.group(1) + u['name'] + ' of five' + m.group(2), s, count=1)
    s = s.replace('href="welcome.html" target="_top">&larr; Back to the schedule',
                  'href="course-schedule.html" target="_top">&larr; Back to the schedule')

    # The router belongs on the front door, not on the destination. A unit
    # page linking to all five units is a page telling a student to leave.
    a = s.find('<section id="units"')
    if a >= 0:
        s = s[:a] + s[s.index('</section>', a) + 10:]
    s = s.replace('      <li><a href="#units">Go straight to your unit</a></li>\n', '')

    # Iframe id
    s = s.replace("'before-you-start'", "'unit-%02d'" % unit)

    # Generated banner, so nobody hand edits it
    s = s.replace('<head>',
                  '<head>\n<!-- GENERATED by tools/build-unit-pages.py from ' + SRC +
                  '.\n     Do not edit this file. Edit ' + SRC + ' or readiness-check.js\n'
                  '     and rerun the tool. -->', 1)
    return s


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)

    if not os.path.exists(SRC):
        print('Cannot find ' + SRC)
        return 1
    data = load(root)
    if not data:
        return 1

    src = open(SRC, encoding='utf-8').read()
    thin = []
    for unit in sorted(UNITS):
        page = 'unit-%02d.html' % unit
        out = build(src, data, unit)
        open(page, 'w', encoding='utf-8').write(out)
        c = counts(data, unit)
        tot_q = sum(v[1] for v in c.values())
        print('%s  chem %d/%d, anat %d/%d, math %d/%d  (%d questions)'
              % (page, c['chemistry'][0], c['chemistry'][1],
                 c['anatomy'][0], c['anatomy'][1],
                 c['math'][0], c['math'][1], tot_q))
        for key, v in c.items():
            if v[1] < v[0]:
                thin.append('%s %s: %d concepts but only %d questions'
                            % (page, key, v[0], v[1]))

    if thin:
        print('\nThin, fewer questions than concepts, so some concepts are')
        print('listed but never checked. Write questions for these:')
        for t in thin:
            print('   ' + t)
    return 0


if __name__ == '__main__':
    sys.exit(main())
