#!/usr/bin/env python3
"""
Stop the anatomy course writing into the physiology course.

    cd human-physiology-Fa26
    python3 fix-storage-collision.py

THE BUG
-------
Anatomy content was showing up in the physiology Mastery OS, and the
physiology OS was opening with data a student had never entered.

Both courses are published on GitHub Pages under the same user site:

    drsrennie-stack.github.io/new-build-bio4-solano/
    drsrennie-stack.github.io/human-physiology-Fa26/

localStorage is scoped to the ORIGIN, and the origin for both of those
is drsrennie-stack.github.io. The path does not scope anything. So the
two courses share one storage bucket, and any key they both use is one
key, not two.

Most keys were namespaced and were fine: bio004-recall-v2 and
bio005-recall-v2 never met. Four were not:

    mos-schedule      the OS schedule cache. This is the one doing the
                      visible damage: anatomy writes its schedule here
                      and physiology reads it straight back out.
    mos-section       the section picker
    loopScores_v1     loop practice scores
    loopsEngine_v1    loop engine state

Whichever course the student opened last won.

THE FIX
-------
Every one of those keys is prefixed bio005- in this repo, so they can
no longer collide with anything in the anatomy repo. A small migration
runs once per browser and deletes the four old shared keys, because
leaving them there means the anatomy build keeps writing to storage
this course no longer reads, and the stale values sit in the student's
browser forever.

DO THE SAME IN THE ANATOMY REPO. Prefixing one side stops physiology
reading anatomy's data, which is the half that was hurting. Prefixing
both sides is what actually separates the two courses.
"""
import io, os, re, sys

RENAME = {
    'mos-schedule':   'bio005-mos-schedule',
    'mos-section':    'bio005-mos-section',
    'loopScores_v1':  'bio005-loopScores_v1',
    'loopsEngine_v1': 'bio005-loopsEngine_v1',
}

MIGRATION = """
/* ============================================================
   ONE-TIME STORAGE CLEANUP, Aug 2026.

   These four keys used to be unprefixed, which meant this course and
   BIO 004 shared them: both are served from drsrennie-stack.github.io
   and localStorage is scoped to the origin, not the path. Anatomy's
   schedule was landing in the physiology OS.

   The keys are namespaced now. This clears the old shared ones so a
   student who used either course before does not carry the collision
   around in their browser. It runs once and marks itself done.
   ============================================================ */
(function () {
  try {
    if (localStorage.getItem('bio005-storage-split') === '1') { return; }
    ['mos-schedule', 'mos-section', 'loopScores_v1', 'loopsEngine_v1']
      .forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} });
    localStorage.setItem('bio005-storage-split', '1');
  } catch (e) {}
}());
"""

TARGETS = ['os/mastery-physio-os.html', 'os/section-sync.js', 'os/mastery-evidence.js',
           'mastery-physio-os-standalone.html', 'os/bio005-dock.js', 'bio005-dock.js']


def main():
    if not os.path.exists('bio005-competencies.js'):
        print('Run this from the repo root.'); sys.exit(1)

    total = 0
    for rel in TARGETS:
        if not os.path.exists(rel):
            continue
        s = io.open(rel, encoding='utf-8').read()
        before = s
        n = 0
        for old, new in RENAME.items():
            # Only inside a quoted string, so a comment mentioning the key
            # by name is left alone and stays readable.
            for q in ("'", '"'):
                pat = q + old + q
                n += s.count(pat)
                s = s.replace(pat, q + new + q)
        if s != before:
            io.open(rel, 'w', encoding='utf-8').write(s)
            total += n
            print('  %-40s %d key%s renamed' % (rel, n, '' if n == 1 else 's'))

    print('\n%d storage key reference%s namespaced.' % (total, '' if total == 1 else 's'))

    # the one-time cleanup, on the two OS pages a student actually opens
    for rel in ['os/mastery-physio-os.html', 'mastery-physio-os-standalone.html']:
        if not os.path.exists(rel):
            continue
        s = io.open(rel, encoding='utf-8').read()
        if 'bio005-storage-split' in s and 'ONE-TIME STORAGE CLEANUP' in s:
            print('  cleanup already present: ' + rel)
            continue
        i = s.lower().find('<script')
        if i == -1:
            print('  no script tag to attach the cleanup to: ' + rel)
            continue
        s = s[:i] + '<script>' + MIGRATION + '</script>\n' + s[i:]
        io.open(rel, 'w', encoding='utf-8').write(s)
        print('  cleanup added: ' + rel)

    print('\nStill to do: run the same rename in new-build-bio4-solano, with a')
    print('bio004- prefix. Prefixing one side stops physiology reading anatomy.')
    print('Prefixing both is what separates the two courses.')


if __name__ == '__main__':
    main()
