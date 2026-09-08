#!/usr/bin/env python3
"""
Build the BIO 005 Competency Packet, HTML and PDF.

    python3 tools/build-competency-packet.py

Matches the BIO 004 Competency Packet: same cover, same running heads,
same two column competency layout, same load table, same tag pills.
Produced with WeasyPrint, the same engine that made the anatomy packet.

WHAT IS DIFFERENT FROM THE ANATOMY PACKET
-----------------------------------------
A prerequisite section in front, on Scrubs' instruction: the anatomy,
chemistry and math this course assumes, before the physiology it
teaches. Anatomy is a prerequisite here, not the subject, so it belongs
at the front as something to have rather than something to learn. Each
prerequisite says which units use it, so an evaluator can see the
entry expectations and a student can see when each one comes due.

WHAT IT IS NOT
--------------
Not competency-study-guide.html. That is the working checklist, on
screen, with tick boxes and a search. This is the printed artifact: for
students to work down on paper, and for another institution reviewing
the course for equivalency.

SOURCES
-------
bio005-competencies.js  the 268, and the unit titles and counts
readiness-check.js      the 27 prerequisites and their units
bio005-schedule-fall2026.js is not read: the term facts on the cover
come from BIO005_META, which is generated from it.
"""
import html as H
import json, os, subprocess, sys

OUT_HTML = 'competency-packet.html'
OUT_PDF = 'BIO005-Fall2026-Competency-Packet.pdf'

NAVY, NAVY_DEEP, MAROON, MAROON_DARK = '#08101F', '#060A18', '#7A2A22', '#5E201A'
GOLD, GOLD_DEEP, TINT, RULE = '#B8924A', '#8A6D33', '#ECEFF4', '#D1D5DB'
GRAY, OFFWHITE = '#414B5C', '#FAFAF9'


def node_json(root, expr):
    js = ("global.window={};require(%s);require(%s);"
          "process.stdout.write(JSON.stringify(%s));" % (
              json.dumps(os.path.join(root, 'bio005-competencies.js')),
              json.dumps(os.path.join(root, 'readiness-check.js')), expr))
    r = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr.strip())
        sys.exit(1)
    return json.loads(r.stdout)


def e(t):
    return H.escape(str(t), quote=False)


def fonts_from(path):
    """Reuse the embedded faces already in the repo rather than fetching."""
    import re
    s = open(path, encoding='utf-8').read()
    m = re.search(r'<style>\s*(@font-face.*?)</style>', s, re.S)
    return m.group(1) if m else ''


CSS = """
@page {
  size: letter;
  margin: 0.72in 0.7in 0.78in 0.7in;
  @top-left { content: "BIO 005 Human Physiology " "\\00B7" " Fall 2026 " "\\00B7" " Competency Packet";
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.6pt; color: %(navy)s; }
  @top-right { content: "Yuba College";
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.6pt; color: %(gray)s; }
  @bottom-left { content: "Dr. Sharilyn Rennie";
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.6pt; color: %(gray)s; }
  @bottom-right { content: "Page " counter(page) " of " counter(pages);
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.6pt; color: %(gray)s; }
}
@page cover {
  margin: 0;
  @top-left { content: none } @top-right { content: none }
  @bottom-left { content: none } @bottom-right { content: none }
}

* { box-sizing: border-box; }
body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 9.3pt;
  line-height: 1.45; color: %(navy)s; }

/* ---------- COVER ---------- */
.cover { page: cover; break-after: page; height: 11in; width: 8.5in;
  display: flex; flex-direction: column; padding: 2.05in 0.78in 0 0.78in; }
.mark { display: flex; align-items: flex-end; gap: 5pt; margin: 0 0 22pt; }
.mark i { display: block; border-radius: 1.5pt; }
.mark i:nth-child(1) { width: 15pt; height: 21pt; background: %(gold)s; }
.mark i:nth-child(2) { width: 15pt; height: 40pt; background: %(maroon)s; }
.mark i:nth-child(3) { width: 15pt; height: 30pt; background: %(navy)s; }
.cv-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 8pt; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase; color: %(maroon)s; margin: 0 0 12pt; }
.cover h1 { font-size: 37pt; font-weight: 800; letter-spacing: -.025em;
  line-height: 1.02; margin: 0 0 8pt; }
.cover h1 .dot { color: %(maroon)s; }
.cv-sub { font-size: 13pt; font-weight: 700; color: %(maroon)s; margin: 0 0 14pt; }
.cv-facts { font-size: 9.6pt; color: %(navy)s; margin: 0 0 20pt; }
.cv-facts div { margin: 0 0 3pt; }
.cv-rule { border: 0; border-top: .75pt solid %(rule)s; margin: 0 0 14pt; }
.cv-for { font-size: 9pt; margin: 0 0 9pt; max-width: 5.4in; }
.cv-for b { color: %(navy)s; }
.cv-band { position: absolute; left: 0; right: 0; bottom: 0; height: 0.72in;
  background: %(maroon_dark)s; color: #fff; display: flex; align-items: center;
  justify-content: space-between; padding: 0 0.78in; font-size: 9pt; }
.cv-band .r { font-family: 'DM Sans', sans-serif; font-weight: 700;
  letter-spacing: .1em; font-size: 8.4pt; }

/* ---------- SECTIONS ---------- */
h2.sec { font-size: 21pt; font-weight: 800; letter-spacing: -.02em; margin: 0 0 8pt; }
.sec-line { font-size: 9pt; color: %(navy)s; margin: 0 0 9pt; }
.lede { font-size: 9.6pt; margin: 0 0 11pt; }
.howto { border: .75pt solid %(rule)s; border-radius: 4pt; padding: 8pt 10pt;
  font-size: 8.3pt; line-height: 1.42; margin: 0 0 14pt; break-inside: avoid; }
.howto b { color: %(navy)s; }

.tbl-l { font-family: 'DM Sans', sans-serif; font-size: 7.6pt; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase; color: %(maroon)s; margin: 0 0 6pt; }
table { border-collapse: collapse; width: 100%%; font-size: 8.6pt; margin: 0 0 16pt;
  break-inside: avoid; }
thead th { background: %(navy)s; color: #fff; font-family: 'DM Sans', sans-serif;
  font-size: 7.4pt; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  text-align: left; padding: 6pt 7pt; }
thead th.n, td.n { text-align: right; }
tbody td { padding: 5.5pt 7pt; border-bottom: .5pt solid %(rule)s; }
tbody tr:last-child td { border-bottom: 0; font-weight: 700; }
td.mod { font-weight: 700; color: %(maroon)s; }

/* ---------- UNIT HEADER ---------- */
.unit { background: %(navy)s; color: #fff; border-radius: 5pt; padding: 9pt 12pt;
  margin: 0 0 9pt; break-inside: avoid; break-after: avoid; }
.unit h3 { font-size: 12.5pt; font-weight: 800; margin: 0 0 2pt; color: #fff; }
.unit .u-sub { font-family: 'DM Sans', sans-serif; font-size: 7.4pt; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: %(gold)s; }

/* ---------- COMPETENCY COLUMNS ---------- */
.cols { column-count: 2; column-gap: 20pt; }
.topic { font-family: 'DM Sans', sans-serif; font-size: 7.8pt; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: %(maroon)s;
  margin: 9pt 0 5pt; padding: 0 0 3pt; border-bottom: .5pt solid %(rule)s;
  break-after: avoid; break-inside: avoid; }
.topic:first-child { margin-top: 0; }
.c { display: flex; gap: 6pt; margin: 0 0 6pt; break-inside: avoid;
  font-size: 8.5pt; line-height: 1.4; }
.c .num { flex: 0 0 auto; min-width: 15pt; font-weight: 700; color: %(maroon)s;
  font-size: 8.3pt; }
.c .body { flex: 1 1 auto; }
.c .nm { font-weight: 700; color: %(navy)s; }
.tag { display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 6.2pt;
  font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  padding: 1.2pt 4pt; border-radius: 2pt; white-space: nowrap; margin-left: 3pt; }
.tag-lec { background: %(navy)s; color: #fff; }
.tag-lab { background: %(gold)s; color: %(navy)s; }

/* ---------- PREREQUISITES ---------- */
.pre-box { break-inside: avoid; margin: 0 0 11pt; }
.pre-h { font-family: 'DM Sans', sans-serif; font-size: 7.8pt; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: %(maroon)s;
  margin: 0 0 5pt; padding: 0 0 3pt; border-bottom: .5pt solid %(rule)s; }
.pre { display: flex; gap: 6pt; margin: 0 0 6pt; break-inside: avoid;
  font-size: 8.5pt; line-height: 1.4; }
.pre .num { flex: 0 0 auto; min-width: 15pt; font-weight: 700; color: %(maroon)s; font-size: 8.3pt; }
.pre .nm { font-weight: 700; color: %(navy)s; }
.pre .when { display: block; font-family: 'DM Sans', sans-serif; font-size: 6.6pt;
  font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: %(gray)s;
  margin-top: 1.5pt; }
.newpage { break-before: page; }

/* ---------- ON SCREEN ----------
   This is a print-first document and the PDF is the real artifact, but
   she asked for an HTML version too, so it has to be readable in a
   browser rather than a paper layout stretched across a window. */
@media screen {
  body { background: %(offwhite)s; padding: 0 0 60px; }
  .cover, .screenwrap { max-width: 8.5in; margin: 0 auto; background: #fff;
    box-shadow: 0 1px 2px rgba(8,16,31,.06), 0 10px 30px rgba(8,16,31,.10); }
  .cover { height: auto; min-height: 9in; padding: 1.2in 0.78in 1.4in; position: relative;
    margin-bottom: 28px; }
  .screenwrap { padding: 0.7in 0.78in 0.9in; font-size: 11.5px; }
  .screenwrap .c, .screenwrap .pre { font-size: 11.5px; }
  .screenwrap table { font-size: 11.5px; }
  .cv-band { position: absolute; }
  a { color: %(maroon_dark)s; }
  /* The cover and the body are both fixed at 8.5in for print. On a phone
     that is wider than the screen, so the page took a horizontal
     scrollbar. WCAG 2.2 reflow, 1.4.10. */
  .cover, .screenwrap { width: auto; max-width: min(8.5in, 100%%); }
  table { display: block; overflow-x: auto; }
  @media (max-width: 820px) {
    .cols { column-count: 1; }
    .cover { padding: 0.8in 24px 1.2in; min-height: 0; }
    .screenwrap { padding: 24px; }
    .cover h1 { font-size: 30pt; }
    .cv-band { position: static; height: auto; padding: 14px 24px;
      flex-wrap: wrap; gap: 6px; margin: 24px -24px -0.8in; }
  }
}
""" % dict(navy=NAVY, navy_deep=NAVY_DEEP, maroon=MAROON, maroon_dark=MAROON_DARK,
           gold=GOLD, gold_deep=GOLD_DEEP, tint=TINT, rule=RULE, gray=GRAY,
           offwhite=OFFWHITE)


def cover(meta):
    return """
<div class="cover">
  <div class="mark"><i></i><i></i><i></i></div>
  <p class="cv-eyebrow">BIO 005 &middot; Yuba College &middot; Fall 2026</p>
  <h1>Human Physiology<span class="dot">.</span></h1>
  <p class="cv-sub">Competency Packet &middot; Fall 2026</p>
  <div class="cv-facts">
    <div>15 weeks &middot; September 8 to December 16, 2026</div>
    <div>Section %(code)s &middot; %(campus)s</div>
    <div>Fully online, lecture and lab, no set meeting time</div>
  </div>
  <hr class="cv-rule">
  <p class="cv-for"><b>For students</b> &nbsp;A checklist of everything this course asks you to be
    able to do, and what it assumes you arrive with. Work down it. When you can do the thing
    without looking, that one is finished</p>
  <p class="cv-for"><b>For evaluating institutions</b> &nbsp;The full assessed content of BIO 005,
    by unit and topic, each competency tagged for written lecture examination, laboratory work,
    or both, preceded by the anatomy, chemistry and quantitative skills assumed on entry</p>
  <p class="cv-for"><b>Also in Canvas</b> &nbsp;The course syllabus and the course schedule</p>
  <div class="cv-band"><span>Yuba College &middot; Fall 2026</span>
    <span class="r">Dr. Sharilyn Rennie</span></div>
</div>
""" % dict(code=e(meta['code']), campus=e(meta['campus']))


UNIT_WEEKS = {1: 'Weeks 1 to 3', 2: 'Weeks 4 to 6', 3: 'Weeks 7 to 9',
              4: 'Weeks 10 to 12', 5: 'Weeks 13 to 15'}


def prereq_section(rd):
    boxes = [('anatomy', 'Anatomy assumed on entry',
              'Physiology asks how things work, so it assumes you know what the things are. '
              'These are not taught here. Each one names the unit that needs it.'),
             ('chemistry', 'Chemistry assumed on entry',
              'Not a chemistry course. These are the ideas physiology runs on, and each is '
              'revisited at the depth its unit requires rather than all at once.'),
             ('math', 'Quantitative skills assumed on entry',
              'Arithmetic, units and graph reading. Nothing beyond it, but it has to be fluent, '
              'because a question about the kidney should not become a question about unit conversion.')]
    out = ['<h2 class="sec">What this course assumes you already have</h2>',
           '<p class="sec-line">BIO 005 Human Physiology &middot; Yuba College &middot; Fall 2026 '
           '&middot; Dr. Sharilyn Rennie</p>',
           '<p class="lede">Twenty seven entry expectations, in three areas. They are not part of '
           'the 268 competencies below and no exam question asks them on their own. They are listed '
           'because physiology is built on them, and because a student who knows which of them is '
           'shaky can fix it before the unit that needs it arrives.</p>',
           '<div class="howto"><b>How to read this list.</b> Each entry names the units that '
           'use it. A concept listed for more than one unit is genuinely needed more than once, '
           'at a different depth each time: pH in unit 1 is what the scale means, and pH in '
           'unit 5 is a patient with a blood gas. Every entry has a short self check on the '
           'matching unit page in the course site.</div>']
    n = 0
    out.append('<div class="cols">')
    for key, title, blurb in boxes:
        out.append('<p class="pre-h">%s</p>' % e(title))
        out.append('<p style="font-size:8.2pt;margin:0 0 6pt;color:%s">%s</p>' % (GRAY, e(blurb)))
        for c in rd[key]['concepts']:
            n += 1
            units = ', '.join(str(u) for u in c['units'])
            plural = 'Units' if len(c['units']) > 1 else 'Unit'
            out.append('<div class="pre"><span class="num">%d.</span><span class="body">'
                       '<span class="nm">%s.</span> %s'
                       '<span class="when">%s %s</span></span></div>'
                       % (n, e(c['name']), e(c['need']), plural, units))
    out.append('</div>')
    return '\n'.join(out)


def load_table(mods, comps):
    rows = []
    for m in mods:
        s = [c for c in comps if c['module'] == m['n']]
        rows.append('<tr><td class="mod">%d</td><td>%s</td><td class="n">%d</td>'
                    '<td class="n">%d</td><td class="n">%d</td><td class="n">%d</td></tr>'
                    % (m['n'], e(m['title']), len(s),
                       sum(1 for c in s if c['lecture']), sum(1 for c in s if c['lab']),
                       sum(1 for c in s if c['yield'] == 'core')))
    rows.append('<tr><td></td><td>All five units</td><td class="n">%d</td><td class="n">%d</td>'
                '<td class="n">%d</td><td class="n">%d</td></tr>'
                % (len(comps), sum(1 for c in comps if c['lecture']),
                   sum(1 for c in comps if c['lab']),
                   sum(1 for c in comps if c['yield'] == 'core')))
    return ('<p class="tbl-l">Competency load by unit</p>'
            '<table><thead><tr><th>Unit</th><th>Title</th><th class="n">Total</th>'
            '<th class="n">Lecture</th><th class="n">Lab</th><th class="n">Must know</th>'
            '</tr></thead><tbody>' + ''.join(rows) + '</tbody></table>')


def competencies(mods, comps):
    out = ['<h2 class="sec">Course competencies</h2>',
           '<p class="sec-line">BIO 005 Human Physiology &middot; Yuba College &middot; Fall 2026 '
           '&middot; Fully online, lecture and lab &middot; Dr. Sharilyn Rennie</p>',
           '<p class="lede">These 268 competencies are the whole of what BIO 005 asks you to be '
           'able to do. They are what the Mastery Physio OS tracks and they are what every exam '
           'is written from. Nothing is assessed that is not on this list.</p>',
           '<div class="howto"><b>How to read this list.</b> Competencies are grouped first by '
           'unit, then by topic within the unit, in teaching order. Each one is tagged for where '
           'you are held to it: <span class="tag tag-lec">Lecture</span> means it is on the exam '
           'for that unit, and <span class="tag tag-lab">Lab</span> means you produce it on real '
           'output, a trace, a curve, a set of values or a calculation. Many carry both, because '
           'in physiology explaining a mechanism and reading what it does are two different '
           'skills.</div>',
           load_table(mods, comps)]
    for m in mods:
        s = [c for c in comps if c['module'] == m['n']]
        out.append('<div class="unit%s"><h3>Unit %d. %s</h3><p class="u-sub">%d competencies '
                   '&middot; %s &middot; %s</p></div>'
                   % (' newpage' if m['n'] > 1 else '', m['n'], e(m['title']), len(s),
                      UNIT_WEEKS[m['n']], e(m['exam'])))
        out.append('<div class="cols">')
        topic = None
        for c in s:
            if c['system'] != topic:
                topic = c['system']
                out.append('<p class="topic">%s</p>' % e(topic))
            tags = ''
            if c['lecture']:
                tags += '<span class="tag tag-lec">Lecture</span>'
            if c['lab']:
                tags += '<span class="tag tag-lab">Lab</span>'
            out.append('<div class="c"><span class="num">%d.</span><span class="body">'
                       '<span class="nm">%s.</span> %s %s</span></div>'
                       % (c['n'], e(c['name']), e(c['can']), tags))
        out.append('</div>')
    return '\n'.join(out)


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)

    comps = node_json(root, 'window.BIO005_COMPETENCIES')
    mods = node_json(root, 'window.BIO005_MODULES')
    meta = node_json(root, 'window.BIO005_META')
    rd = node_json(root, 'window.BIO005_READINESS')

    fonts = fonts_from('competency-study-guide.html')

    doc = ('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
           '<title>BIO 005 Human Physiology, Competency Packet, Fall 2026</title>\n'
           '<meta name="description" content="BIO 005 Human Physiology, Yuba College, Fall 2026. '
           'All 268 course competencies by unit and topic, tagged for lecture and laboratory, '
           'preceded by the anatomy, chemistry and quantitative skills assumed on entry. '
           'For student study use and for course-equivalency review.">\n'
           '<meta name="author" content="Dr. Sharilyn Rennie">\n'
           '<style>%s</style>\n<style>%s</style>\n</head>\n<body>\n%s\n'
           '<div class="screenwrap">\n%s\n<div class="newpage">%s</div>\n</div>\n'
           '</body>\n</html>\n'
           % (fonts, CSS, cover(meta), prereq_section(rd), competencies(mods, comps)))

    open(OUT_HTML, 'w', encoding='utf-8').write(doc)
    print('%s  %d KB' % (OUT_HTML, round(len(doc) / 1024)))

    try:
        from weasyprint import HTML
    except ImportError:
        print('weasyprint is not installed, so the PDF was not built.')
        print('  pip install weasyprint --break-system-packages')
        return 1
    HTML(filename=OUT_HTML, base_url=root).write_pdf(
        OUT_PDF,
        # Same metadata shape as the anatomy packet.
        )
    print('%s  %d KB' % (OUT_PDF, round(os.path.getsize(OUT_PDF) / 1024)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
