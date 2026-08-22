#!/usr/bin/env python3
"""
Scan every student-facing page for instructor and build vocabulary.
See LANGUAGE.md for the rules. Run before pushing.

    python3 tools/language-audit.py
"""
import re, html, os, sys

STUDENT_PAGES = [
    'welcome.html', 'index.html', 'competency-study-guide.html', 'course-schedule.html',
    'competency-recall.html', 'physiology-course-home.html', 'physiology-course-map.html',
    'os/mastery-physio-os.html',   # the standalone build is generated from this, not audited twice
    'anatomy-review.html',
    'before-you-start.html',
    'week-01.html',
    'unit-01.html', 'unit-02.html', 'unit-03.html', 'unit-04.html', 'unit-05.html',
    'competency-packet.html',
    'workbook_week01_fluid-homeostasis.html',
    'workbook_week02_membranes-transport.html',
    'workbook_week03_membrane-potential.html',
]

# Instructor tools. DOK, yield and facets are correct here.
INSTRUCTOR_PAGES = {'competency-map.html'}

BANNED = [
    (r'(?<![-\w])DOK\b',              'DOK',                'Know it / Use it / Work it out'),
    (r'\bdepth of knowledge\b',       'depth of knowledge', 'thinking level'),
    (r'\bhigh[- ]yield\b',            'high-yield',         'must know'),
    (r'\bfacets?\b',                  'facets',             'internal tag, drop it'),
    (r'\basynchronous\b',             'asynchronous',       'online, on your own time'),
    (r'\bsynchronous\b',              'synchronous',        'at a set time'),
    (r'\bexaminable\b',               'examinable',         'on the exam'),
    (r'\bassessed on\b',              'assessed on',        'on Exam 3'),
    (r'\bdemonstrate\b',              'demonstrate',        'show'),
    (r'\bmodule\b',                   'module',             'unit'),
    (r'\bscaffold\w*\b',              'scaffold',           'say the actual thing'),
    (r'\bformative\b|\bsummative\b',  'formative/summative','say the actual thing'),
    (r'\bmetacognit\w+\b',            'metacognition',      'say the actual thing'),
    (r'\bTBL\b|\biRAT\b|\btRAT\b',    'TBL/iRAT/tRAT',      'not in this course'),
    (r'\bTO CONFIRM\b',               'TO CONFIRM',         'internal build note'),
    (r'(?<!\w)placeholder(?!=)\b',    'placeholder',        'internal build note'),
    (r'\bschema\b|\bslug\b|\blocalStorage\b|\bJSON\b',
                                      'code word',          'students never see code words'),
]

# Real subject vocabulary and instructor-panel strings that look like hits but are fine.
ALLOW = [
    r'ATP yield', r'High-yield concepts',      # physiology term; instructor config panel
    r'yield of', r'energy yield',
    r'BIO005_', r'\.js\b', r'querySelector', r'addEventListener',
    r'aria-', r'data-', r'localStorage\.', r'JSON\.',
    r'placeholder=', r'tag-dok', r'class=',   # attributes and css classes, not copy
]

def page_text(path):
    """Return (markup text, [JS string literals]).

    The JS half matters: labels like "Asynchronous online" and "Beat 1" are
    built at run time, so a markup-only scan reports a page clean while a
    student is reading the banned word on screen. That happened once.
    """
    raw = open(path, encoding='utf-8', errors='replace').read()

    literals = []
    for block in re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', raw, flags=re.S):
        block = re.sub(r'/\*.*?\*/', ' ', block, flags=re.S)
        block = re.sub(r'(?m)^\s*//.*$', ' ', block)
        for a, b in re.findall(r'"([^"\\\n]{4,140})"|\'([^\'\\\n]{4,140})\'', block):
            lit = a or b
            if ' ' not in lit:                     # identifiers, ids, classes
                continue
            if re.match(r'^[\s#.\w:,>+~*\[\]=-]+$', lit):   # css selectors
                continue
            literals.append(lit)

    s = re.sub(r'<script.*?</script>', ' ', raw, flags=re.S)
    s = re.sub(r'<style.*?</style>',  ' ', s, flags=re.S)
    s = re.sub(r'<!--.*?-->',         ' ', s, flags=re.S)
    markup = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s)))
    return markup, literals


def allowed(context):
    return any(re.search(a, context, re.I) for a in ALLOW)

def bold_check(page):
    """Two things that are easy to regress and hard to see in a diff.

    1. Bold density. Bold is a retrieval cue, not emphasis. Once a page is
       more than about a quarter bold, the bold has stopped pointing at
       anything. See LANGUAGE.md.
    2. .idlist without .plain. The checklist form of that list puts a tick
       box on every line and sets it in a 190px column, which is right for
       a checklist and unreadable for teaching prose. A rewrite of a week
       page dropped .plain from all seventeen lists once and every
       explanation on the page came back bold, boxed and in three columns.
    """
    raw = open(page, encoding='utf-8', errors='replace').read()
    notes = []

    chunks = re.findall(r'<li>(.*?)</li>|<p class="ask">(.*?)</p>', raw, flags=re.S)
    body = bold = 0
    for a, b in chunks:
        it = a or b
        text = html.unescape(re.sub(r'<[^>]+>', '', it))
        body += len(text)
        for m in re.findall(r'<b>(.*?)</b>', it, flags=re.S):
            bold += len(html.unescape(re.sub(r'<[^>]+>', '', m)))
    if body:
        pct = round(bold / body * 100)
        if pct > 30:
            notes.append('bold is %d%% of the body text. Aim under 30. '
                         'Bold the term, the number and the rule, not the sentence.' % pct)

    # Only the week pages. competency-study-guide and anatomy-review are
    # checklists on purpose, and a tick box per line is the point there.
    plain = len(re.findall(r'class="idlist plain"', raw))
    check = len(re.findall(r'class="idlist"', raw))
    if re.match(r'week-\d\d\.html$', os.path.basename(page)) and check > 1 and plain == 0:
        notes.append('%d idlist blocks and none are .plain. Teaching prose in the '
                     'checklist form gets a tick box per line and three columns.' % check)
    return notes


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)
    total = 0
    for page in STUDENT_PAGES:
        if not os.path.exists(page):
            continue
        markup, literals = page_text(page)
        hits = []

        # markup: one blob, context is meaningful
        for pattern, label, better in BANNED:
            for m in re.finditer(pattern, markup, re.I):
                ctx = markup[max(0, m.start() - 55):m.end() + 55].strip()
                if not allowed(ctx):
                    hits.append((label, better, ctx))

        # JS strings: check each on its own, so a data field name next door
        # cannot make an unrelated string look guilty
        for lit in literals:
            for pattern, label, better in BANNED:
                if re.search(pattern, lit, re.I) and not allowed(lit):
                    hits.append((label, better, lit.strip()))
                    break

        if hits:
            total += len(hits)
            print(f'\n{page}')
            for label, better, ctx in hits[:12]:
                print(f'   {label:18} say: {better}')
                print(f'   {"":18} ...{ctx[:150]}...')
            if len(hits) > 12:
                print(f'   ... and {len(hits) - 12} more')

    style = 0
    for page in STUDENT_PAGES:
        if not os.path.exists(page):
            continue
        notes = bold_check(page)
        if notes:
            style += len(notes)
            print('\n%s' % page)
            for n in notes:
                print('   style              %s' % n)

    print()
    if style and not total:
        print('No banned vocabulary, but %d style problem(s) above. See LANGUAGE.md.' % style)
        return 1
    if total:
        print(f'{total} student-facing problems, plus {style} style problem(s). See LANGUAGE.md.')
        return 1
    print('Clean. No instructor or build vocabulary on any student page.')
    print('That does not mean the writing is good. Read it as a student and')
    print('check it is exact as well as plain.')
    return 0

if __name__ == '__main__':
    sys.exit(main())
