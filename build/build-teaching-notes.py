#!/usr/bin/env python3
"""
Build teaching-notes.html: the instructor view.

    python3 build-teaching-notes.py

This is the page her planning notes belong on, and the only one. Every field
that leak-check.py forbids on a student page is here instead, side by side
with what the student actually sees for the same week, so the boundary is
visible rather than remembered.

NOT FOR STUDENTS, AND SAID SO IN THREE PLACES
The filename is not linked from any student page, the page says what it is in
its first line, and it carries a noindex robots tag. That is as far as a
static site can go: GitHub Pages serves whatever is in the repo to whoever
asks. Anyone with the URL can read it.

That is a real limit and it is stated on the page. If something must not be
guessable, it does not belong in a public repo at all, and the page says that
too rather than implying a privacy it cannot provide.

NO STUDENT NAMES, EVER
Nothing here is per-student. Her standing rule is that student identifiers
never enter a file that persists, and this file persists.
"""
import io, os, datetime, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('bw', os.path.join(HERE, 'build-week.py'))
bw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bw)
esc, LOGO, FOOT = bw.esc, bw.LOGO, bw.FOOT
CSS = bw.TEMPLATE[bw.TEMPLATE.index('<style>'):bw.TEMPLATE.index('</style>') + 8].replace('%%', '%')


def rows(data):
    out = ''
    for w in sorted(data['weeks'], key=lambda x: x['wk']):
        comps = [c for c in data['comps'] if c['week'] == w['wk']]
        mins = sum(c.get('est', 0) for c in comps)
        core = len([c for c in comps if c.get('yield') == 'core'])
        d3 = len([c for c in comps if c.get('dok') == 3])
        note = w.get('note')
        stu = w.get('studentNote')
        others = bw.paired(w)

        flags = []
        if w.get('short'):
            flags.append('<span class="tn-flag">Short week</span>')
        if others:
            flags.append('<span class="tn-flag tn-warn">Deadline shared with week %s</span>'
                         % ' and '.join(str(n) for n in others))
        if mins / 60.0 >= 9:
            flags.append('<span class="tn-flag tn-warn">%.1f h of competency work</span>' % (mins / 60.0))

        out += (
            '<tr>'
            '<th scope="row"><span class="tn-wk">%d</span>'
            '<span class="tn-title">%s</span>'
            '<span class="tn-dates">%s to %s</span>'
            '<span class="tn-due">Due %s</span>%s</th>'
            '<td class="tn-mine">%s</td>'
            '<td class="tn-theirs">%s</td>'
            '<td class="tn-nums">'
            '<span><b>%d</b> competencies</span>'
            '<span><b>%d</b> core</span>'
            '<span><b>%d</b> at DOK 3</span>'
            '<span><b>%.1f h</b> estimated</span>'
            '</td>'
            '</tr>'
            % (w['wk'], esc(w['title']),
               bw.fmt(w['opens']).replace('day ', 'day '), bw.fmt(w['closes']),
               bw.fmt(bw.due_of(w)),
               ('<span class="tn-flags">%s</span>' % ''.join(flags)) if flags else '',
               ('<p>%s</p>' % esc(note)) if note else '<p class="tn-none">nothing</p>',
               ('<p>%s</p>' % esc(stu)) if stu else '<p class="tn-none">nothing</p>',
               len(comps), core, d3, mins / 60.0))
    return out


PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<title>Teaching notes, not for students &middot; BIO 005</title>
<meta name="description" content="Instructor planning notes for BIO 005. Not linked from the student site.">
%(css)s
<style>
.tn-wrap{max-width:1280px;margin:0 auto;padding:0 max(16px,3vw)}
.tn-bar{background:var(--terra);color:#fff;padding:14px 0}
.tn-bar p{margin:0;font-family:var(--display);font-size:.8rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase}
.tn-head{padding:36px 0 26px}
.tn-head h1{font-size:clamp(1.6rem,3vw,2.2rem);letter-spacing:-.025em;margin:0 0 12px}
.tn-head p{font-size:1rem;color:var(--navy-70);max-width:74ch;margin:0 0 10px;line-height:1.6}
.tn-warnbox{background:#fff;border:1px solid var(--navy-15);border-left:4px solid var(--terra);
  border-radius:var(--card-radius);padding:16px 18px;max-width:78ch;margin:18px 0 0}
.tn-warnbox p{font-size:.94rem;color:var(--navy);margin:0 0 8px}
.tn-warnbox p:last-child{margin:0}
.tn-scroll{overflow-x:auto;padding:0 0 40px}
table.tn{width:100%%;min-width:1000px;border-collapse:collapse;font-size:.92rem}
table.tn th,table.tn td{text-align:left;vertical-align:top;padding:16px 14px;
  border-bottom:1px solid var(--navy-15)}
table.tn thead th{font-family:var(--display);font-size:.7rem;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--terra);padding-bottom:10px;white-space:nowrap}
table.tn tbody th{width:250px}
.tn-wk{display:inline-block;font-family:var(--display);font-size:1.4rem;font-weight:800;
  color:var(--terra);line-height:1}
.tn-title{display:block;font-weight:700;margin:4px 0 6px;line-height:1.3}
.tn-dates,.tn-due{display:block;font-size:.8rem;color:var(--navy-70);font-weight:500}
.tn-due{font-weight:700;color:var(--navy)}
.tn-flags{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0 0}
.tn-flag{font-family:var(--display);font-size:.6rem;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;background:var(--navy-tint);color:var(--navy);
  border-radius:99px;padding:3px 8px}
.tn-flag.tn-warn{background:var(--terra);color:#fff}
.tn-mine{width:30%%;background:#FBF6F5}
.tn-theirs{width:30%%}
.tn-mine p,.tn-theirs p{margin:0;line-height:1.55}
.tn-none{color:var(--navy-70);font-style:normal}
.tn-nums{white-space:nowrap}
.tn-nums span{display:block;font-size:.82rem;color:var(--navy-70);margin:0 0 3px}
.tn-nums b{color:var(--navy);font-weight:700}
@media print{.tn-bar{background:none;color:#000;border-bottom:2px solid #000}}
</style>
</head>
<body>

<a class="skip" href="#main">Skip to the notes</a>

<header class="tn-bar"><div class="tn-wrap">
  <p>Teaching notes &middot; not for students &middot; not linked from the course site</p>
</div></header>

<main id="main">
<div class="tn-wrap">
  <div class="tn-head">
    <h1>Week notes, yours and theirs, side by side</h1>
    <p>Everything in the left column is your planning voice and appears on no student
      page. <code>leak-check.py</code> fails the build if it does. The right column is
      what a student actually reads for that week.</p>

    <div class="tn-warnbox">
      <p><b>This page is public.</b> GitHub Pages serves whatever is in the repo to
        anyone who asks for the URL. It is not linked from the student site and it
        carries a noindex tag, so it will not be stumbled on or found by search, but a
        student who guesses the filename can read it.</p>
      <p>That is as far as a static site goes. If something genuinely must not be seen,
        keep it out of the repo rather than trusting an unlinked page.</p>
      <p><b>Nothing here is per-student, and nothing here should ever be.</b> No names,
        no grades, no identifiers, in this file or any other that persists.</p>
    </div>
  </div>

  <div class="tn-scroll">
    <table class="tn">
      <caption class="vh">Every week, with your planning note, the student-facing note,
        and the load figures</caption>
      <thead><tr>
        <th scope="col">Week</th>
        <th scope="col">Your note</th>
        <th scope="col">What the student sees</th>
        <th scope="col">Load</th>
      </tr></thead>
      <tbody>%(rows)s</tbody>
    </table>
  </div>
</div>
</main>

%(foot)s
</body>
</html>
'''


def main():
    data = bw.load_data()
    out = PAGE % {'css': CSS, 'rows': rows(data), 'foot': FOOT}
    if '—' in out or '–' in out:
        raise SystemExit('em or en dash in teaching-notes.html')
    io.open('teaching-notes.html', 'w', encoding='utf-8').write(out)
    print('%-24s %6.1f KB   %d weeks' % ('teaching-notes.html', len(out) / 1024.0, len(data['weeks'])))


if __name__ == '__main__':
    main()
