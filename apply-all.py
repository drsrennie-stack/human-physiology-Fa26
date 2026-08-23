#!/usr/bin/env python3
"""
Apply every fix from the Aug 22 2026 audit to the BIO 005 repo.

    cd human-physiology-Fa26
    python3 apply-all.py

Safe to run twice. Every step checks whether it has already been done.
Run fix-lora-italics.py and fix-branding.py first, or alongside; this
script does not repeat their work.

WHAT IT FIXES
  1. competency-recall.html was dead. It reads window.BIO005, which
     nothing exported, so it replaced its own content with "The
     competency file did not load." The view is now exported from
     bio005-competencies.js, once, for every consumer.
  2. Sutter Internet becomes Yuba College in student-facing labels.
     The campus: data fields keep the registration wording.
  3. Maroon text on navy, 1.98:1, on physiology-course-home.
  4. The gold prerequisite box header, 4.01:1, on before-you-start
     and the six unit pages.
  5. An svg role="img" holding focusable brackets, pulmonary lab.
"""
import io, os, re, glob, sys

changed = []


def edit(path, fn, label):
    if not os.path.exists(path):
        print('  skip (not here): ' + path); return
    s = io.open(path, encoding='utf-8').read()
    out = fn(s)
    if out is None or out == s:
        print('  already done:    ' + path + '  (' + label + ')'); return
    io.open(path, 'w', encoding='utf-8').write(out)
    changed.append(path)
    print('  fixed:           ' + path + '  (' + label + ')')


# ---------------------------------------------------------------- 1
SHIM = '''

/* ============================================================
   THE window.BIO005 VIEW. Added Aug 2026 to fix a dead page.

   This file sets three globals: BIO005_COMPETENCIES, BIO005_MODULES
   and BIO005_META. competency-recall.html reads window.BIO005 and,
   not finding it, replaced its whole main element with "The
   competency file did not load. Check that bio005-competencies.js
   sits next to this page." The file was sitting right next to it.
   The name was simply never exported, so that page has been showing
   an error to anyone who opened it.

   mastery-physio-os-standalone.html built this same view privately.
   It belongs here instead, once, so every consumer gets it and the
   next page to read window.BIO005 works without a second copy.
   ============================================================ */
window.BIO005 = (function () {
  var C = window.BIO005_COMPETENCIES || [];
  function groupBy(key) {
    return C.reduce(function (acc, c) { (acc[c[key]] = acc[c[key]] || []).push(c); return acc; }, {});
  }
  return {
    all: C,
    modules: window.BIO005_MODULES || [],
    meta: window.BIO005_META || {},
    byId: C.reduce(function (a, c) { a[c.id] = c; return a; }, {}),
    byModule: groupBy('module'),
    byWeek: groupBy('week'),
    byGeneral: groupBy('general'),
    bySystem: groupBy('system'),
    total: C.length,
    totalEst: C.reduce(function (s, c) { return s + (c.est || 0); }, 0)
  };
}());
'''

print('1. export window.BIO005 so competency-recall.html works')
edit('bio005-competencies.js',
     lambda s: None if 'window.BIO005 = (function' in s else s + SHIM,
     'the missing export')

# ---------------------------------------------------------------- 2
print('\n2. Sutter Internet to Yuba College, student-facing labels only')
SUTTER = [
    ('Section BIOL-5-D9286 &middot; Sutter Internet &middot; Asynchronous online, lecture and lab',
     'Section BIOL-5-D9286 &middot; Yuba College &middot; Asynchronous online, lecture and lab'),
    ('<div>Section BIOL-5-D9286 &middot; Sutter Internet (NET)</div>',
     '<div>Section BIOL-5-D9286 &middot; Yuba College</div>'),
    ("label: 'Sutter Internet (NET), fully online'", "label: 'Yuba College, fully online'"),
    ("label:'Sutter Internet (NET), fully online'", "label:'Yuba College, fully online'"),
    ("'Sutter Internet (NET), fully online'", "'Yuba College, fully online'"),
    ('"label": "Sutter Internet (NET), fully online"', '"label": "Yuba College, fully online"'),
    ('"sectionLabel": "Sutter Internet (NET), fully online"', '"sectionLabel": "Yuba College, fully online"'),
    ('Sutter Internet (NET)<small>', 'Yuba College<small>'),
    ('section BIOL-5-D9286, Sutter Internet', 'section BIOL-5-D9286, Yuba College'),
]


def desutter(s):
    out = s
    for a, b in SUTTER:
        out = out.replace(a, b)
    return out


for f in sorted(glob.glob('*.html') + glob.glob('*.js') + glob.glob('os/*.html') + glob.glob('os/*.js')):
    edit(f, desutter, 'section label')

# ---------------------------------------------------------------- 3
DARKFIX = '''
/* ============================================================
   MAROON CANNOT CARRY TEXT ON NAVY. Added Aug 2026.
   #7A2A22 on #08101F measures 1.98:1 and #5E201A measures 1.30:1.
   Both are unreadable and both were in use on the dark sections of
   this page, on the eyebrows, the headline accent word and the big
   problem numerals.

   On a dark ground the same accent role is filled by a lightened
   maroon: #D0705F at 5.58:1 for headline-size text, and #EDB0A4 at
   10.28:1 for anything small. This is the same two-token split
   course-entry.html uses, and it is why that page passes AAA.
   ============================================================ */
.prob-section .section-eyebrow,
.hw-section .section-eyebrow,
.mod-section .section-eyebrow,
.dark .section-eyebrow{color:#EDB0A4;}
.prob-section .section-headline .accent,
.hw-section .section-headline .accent,
.mod-section .section-headline .accent,
.hero-headline .accent,
.dark .accent{color:#D0705F;}
.prob-num{color:#D0705F;}
</style>'''

print('\n3. maroon text on navy, physiology-course-home.html')
edit('physiology-course-home.html',
     lambda s: None if 'MAROON CANNOT CARRY TEXT ON NAVY' in s
     else (s.replace('</style>', DARKFIX, 1) if '</style>' in s else None),
     'dark-section accents')

# ---------------------------------------------------------------- 4
print('\n4. the gold prerequisite box header, 4.01:1')
for f in ['before-you-start.html'] + sorted(glob.glob('unit-0*.html')):
    edit(f,
         lambda s: None if '#8A6D33' not in s else
         s.replace('#8A6D33', '#63481A')
          .replace('white on gold-deep   #8A6D33  4.87:1  anatomy header, AA',
                   'white on gold-deep   #63481A  8.49:1  anatomy header, AAA'),
         'gold box darkened to clear AAA')

# ---------------------------------------------------------------- 5
print('\n5. svg role="img" holding focusable brackets')
edit('pulmonary-function-lab.html',
     lambda s: None if 'role="img" aria-label="\' + (opts.aria' not in s
     else s.replace('role="img" aria-label="\' + (opts.aria',
                    'role="group" aria-label="\' + (opts.aria'),
     'role img to group')

print('\n%d file%s changed.' % (len(changed), '' if len(changed) == 1 else 's'))
