#!/usr/bin/env python3
"""
Fail the build if instructor-only material reaches a student page.

    python3 leak-check.py                 # checks every student file it knows
    python3 leak-check.py index.html ...  # or just these

WHY THIS EXISTS
The week page rendered w['note'] in a cream box for weeks before anyone
noticed. That field is her planning voice, not her teaching voice:

    "Front-load orientation, not content."
    "Heaviest week in the course. Sensory and special senses sit here un-merged."
    "Yuba observance still to confirm."
    "If the term runs tight, this is the trim."

None of that is wrong. It is just not addressed to a nineteen-year-old who is
deciding whether this course is survivable, and a student reading "this is the
trim" learns something about the course they were never meant to know.

A promise not to do it again is worth nothing six weeks from now. This is a
check that runs, so the build breaks instead of the boundary.

HOW IT DECIDES
Two rules, both mechanical:

  1. FIELD RULE. Named fields in the data are instructor-only. Their rendered
     text must not appear in any student file. Compared on normalised text,
     so re-wrapping or re-punctuating does not sneak a line past.

  2. PHRASE RULE. A short list of planning idioms that should never be in
     front of a student whatever field they arrive in, like "still to
     confirm", "placeholder", "TBD", "if the term runs tight".

WHAT IT DOES NOT DO
It cannot judge tone. A sentence that is technically student-facing but reads
like a memo will pass this and still be wrong. That judgement stays human.
"""
import io, os, re, sys, json, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = next((d for d in (os.path.join(HERE, 'bio005-hub'), os.path.join(HERE, 'data'))
             if os.path.isdir(d)), os.path.join(HERE, 'bio005-hub'))

# Fields in the schedule and competency data that are hers alone.
INSTRUCTOR_FIELDS = {
    'week': ['note', 'exam'],
    'competency': ['yield'],
    'globals': ['BIO005_OPEN_DECISIONS', 'BIO005_CREDIT'],
}

# Planning idioms that should never face a student, whatever field carries them.
BANNED_PHRASES = [
    'still to confirm', 'to confirm', 'placeholder', 'tbd',
    'if the term runs tight', 'this is the trim', 'lowest-yield',
    'lowest yield', 'front-load orientation', 'un-merged', 'unmerged',
    'needs a deliberate decision', 'not proposals', 'proposed, not set',
    'scrubs to confirm', 'open decision',
]

# The student-facing files. Anything not listed is treated as instructor-facing
# and skipped, so a new instructor page does not have to be argued about.
STUDENT_GLOB = [
    'index.html', 'guides.html', 'guide-how-to-study.html',
    'guide-week-page.html', 'guide-drawing.html',
    'loop-switcher.html', 'ai-work-log.html',
]
STUDENT_GLOB += ['week-%02d.html' % i for i in range(1, 16)]
STUDENT_GLOB += ['prework-week-%02d.html' % i for i in range(1, 16)]

INSTRUCTOR_ONLY_FILES = {'design-system.html', 'label-kit.html', 'teaching-notes.html'}


def prose(html_text):
    """Just the words a reader meets. Script and style bodies come out first:
       a DOM property called `placeholder` is not planning language, and
       scanning it produced a false failure the first time this ran."""
    s = re.sub(r'(?is)<script\b.*?</script>', ' ', html_text)
    s = re.sub(r'(?is)<style\b.*?</style>', ' ', s)
    return s


def comments(html_text):
    """HTML comments separately. Nothing renders them, but view-source does,
       and planning candor in a comment is still planning candor in public."""
    return ' '.join(re.findall(r'(?s)<!--(.*?)-->', html_text))


def norm(s):
    """Squash whitespace and drop punctuation so a re-wrapped or re-punctuated
       copy of the same sentence still matches."""
    s = re.sub(r'<[^>]+>', ' ', s)
    s = s.replace('&middot;', ' ').replace('&amp;', '&').replace('&rarr;', ' ')
    s = re.sub(r"[^\w\s]", ' ', s.lower())
    return re.sub(r'\s+', ' ', s).strip()


def load():
    js = '''
      global.window = {};
      require('%s/bio005-competencies.remapped.js');
      require('%s/bio005-schedule-fall2026.remapped.js');
      console.log(JSON.stringify({
        weeks: window.BIO005_WEEKS,
        comps: window.BIO005_COMPETENCIES,
        globals: {
          BIO005_OPEN_DECISIONS: window.BIO005_OPEN_DECISIONS || null,
          BIO005_CREDIT: window.BIO005_CREDIT || null
        }
      }));
    ''' % (DATA, DATA)
    out = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if out.returncode != 0:
        raise SystemExit('could not read the data:\n' + out.stderr)
    return json.loads(out.stdout)


def secrets(data):
    """Every distinct sentence that belongs to her and not to a student."""
    out = []
    for w in data['weeks']:
        for f in INSTRUCTOR_FIELDS['week']:
            v = w.get(f)
            if isinstance(v, str) and len(v) > 25:
                out.append(('week %d .%s' % (w['wk'], f), v))
            elif isinstance(v, dict):
                for k2, v2 in v.items():
                    if isinstance(v2, str) and len(v2) > 25:
                        out.append(('week %d .%s.%s' % (w['wk'], f, k2), v2))
    for k, v in (data['globals'] or {}).items():
        if v:
            for item in (v if isinstance(v, list) else [v]):
                for k2, v2 in (item.items() if isinstance(item, dict) else []):
                    if isinstance(v2, str) and len(v2) > 25:
                        out.append(('%s.%s' % (k, k2), v2))
    return out


def main():
    data = load()
    named = sys.argv[1:]
    files = named or [f for f in STUDENT_GLOB if os.path.exists(f)]
    sec = secrets(data)

    print('checking %d student files against %d instructor sentences '
          'and %d banned phrases\n' % (len(files), len(sec), len(BANNED_PHRASES)))

    leaks = 0
    for f in files:
        base = os.path.basename(f)
        if base in INSTRUCTOR_ONLY_FILES:
            continue
        if not os.path.exists(f):
            print('  %-28s MISSING' % base)
            continue
        raw = io.open(f, encoding='utf-8', errors='replace').read()
        body = norm(prose(raw))
        hidden = norm(comments(raw))
        hits = []
        for scope, hay in (('on the page', body), ('in an HTML comment', hidden)):
            for where, text in sec:
                n = norm(text)
                # a solid run of the sentence, not a couple of common words
                probe = ' '.join(n.split()[:9])
                if len(probe) > 30 and probe in hay:
                    hits.append('%s: instructor text from %s: "%s..."'
                                % (scope, where, text[:60]))
            for phrase in BANNED_PHRASES:
                if norm(phrase) in hay:
                    hits.append('%s: banned phrase "%s"' % (scope, phrase))
        if hits:
            leaks += len(hits)
            print('  %-28s %d LEAK(S)' % (base, len(hits)))
            for h in hits:
                print('        ' + h)
        else:
            print('  %-28s clean' % base)

    print()
    if leaks:
        print('FAILED: %d leak(s). Instructor material is on a student page.' % leaks)
        sys.exit(1)
    print('PASSED: no instructor-only material on any student page.')


if __name__ == '__main__':
    main()
