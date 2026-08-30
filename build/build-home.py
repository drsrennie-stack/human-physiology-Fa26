#!/usr/bin/env python3
"""
BIO 005 home page builder.

    python3 build-home.py

Builds index.html: the front door once a student is inside the course.
Carries the calendar so they can jump backward to anything they missed,
and forward to see what is coming.

DESIGN, AND WHERE IT COMES FROM
Read off her own live pages, not guessed at:

  medmasterscollaborative.com     the page is banded, not white top to
                                  bottom. White hero, a thin maroon strip,
                                  then several tall near-black #060A18
                                  sections. Eyebrows and buttons are 10 to
                                  11px, weight 700, uppercase, tracked
                                  2 to 3px. Key words inside a headline get
                                  set in a heavier face and a warm red.

  BIO 004 games.html              the app-tile pattern. A coloured ground,
                                  white cards floating on it, a 74px navy
                                  rounded square holding a flat 46px glyph
                                  in white and gold, a small uppercase chip,
                                  a solid button. Cards lift 2px on hover.
                                  Tokens: --r-card 16px, --r-block 8px,
                                  shadow-rest and shadow-hover.

So this page runs dark navy, then off-white, then maroon, then the dark
footer. It is not a white page with a list on it.

The current week is worked out in the browser from the real date, so the
page is correct in December without anyone editing it.
"""
import io, os, sys, json, datetime, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('bw', os.path.join(HERE, 'build-week.py'))
bw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bw)
esc, rich, LOGO, NAV, FOOT = bw.esc, bw.rich, bw.LOGO, bw.NAV, bw.FOOT
# The shared stylesheet lives inside a %%-formatted template, so its literal
# percent signs are doubled there. Undo that on the way out, or every
# width:100%% ships as width:100%%%% and the browser drops the declaration.
CSS = bw.TEMPLATE[bw.TEMPLATE.index('<style>'):bw.TEMPLATE.index('</style>') + 8].replace('%%', '%')

MONTHS = ['September', 'October', 'November', 'December']
DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']


def D(s):
    y, m, d = [int(x) for x in s.split('-')]
    return datetime.date(y, m, d)


def month_grid(year, month, weeks):
    """One month, Monday first. Each cell knows which course week it is in,
       so clicking any day takes you to that week."""
    first = datetime.date(year, month, 1)
    nxt = datetime.date(year + (month == 12), (month % 12) + 1, 1)
    lead = first.weekday()
    cells = []

    for _ in range(lead):
        cells.append('<td class="pad"></td>')

    d = first
    while d < nxt:
        wk = None
        for w in weeks:
            if D(w['opens']) <= d <= D(w['closes']):
                wk = w
                break
        cls, inner = ['day'], str(d.day)
        title = d.strftime('%B %-d')
        if wk:
            cls.append('inwk')
            opens = (d == D(wk['opens']))
            due = (d == D(wk['closes']))
            # The name a screen reader hears carries everything the colour and
            # the edge bars carry visually, so nothing is available by sight only.
            says = '%s. Week %d, %s' % (title, wk['wk'], esc(wk['title']))
            if opens:
                cls.append('opens')
                says += '. Week %d opens' % wk['wk']
            if due:
                cls.append('due')
                says += '. Week %d work is due, 11:59 pm' % wk['wk']
            inner = ('<a href="week-%02d.html" target="_top" aria-label="%s">'
                     '<span class="dn">%d</span></a>'
                     % (wk['wk'], says, d.day))
        cells.append('<td class="%s" data-date="%s">%s</td>'
                     % (' '.join(cls), d.isoformat(), inner))
        d += datetime.timedelta(days=1)

    while len(cells) % 7:
        cells.append('<td class="pad"></td>')

    rows = ''.join('<tr>' + ''.join(cells[i:i + 7]) + '</tr>' for i in range(0, len(cells), 7))
    full = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    head = ''.join('<th scope="col"><span aria-hidden="true">%s</span>'
                   '<span class="vh">%s</span></th>' % (x, full[i])
                   for i, x in enumerate(DOW))
    return ('<div class="cal"><h3>%s</h3><table>'
            '<caption class="vh">%s %d, every day links to its course week</caption>'
            '<thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>'
            % (first.strftime('%B'), first.strftime('%B'), year, head, rows))


# ---------------------------------------------------------------------------
# App icons. Same vocabulary as the BIO 004 games page: a flat 48-unit glyph
# in white, gold and navy, sitting inside a 74px rounded navy square.
# Gold stays the accent inside the icon: it sits on navy, where terra is
# only 2.63:1 and would disappear.
# ---------------------------------------------------------------------------
ICONS = {
    'setup':
        '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">'
        '<rect x="7" y="6" width="30" height="34" rx="5" fill="#FFFFFF"/>'
        '<path d="M14 16h14M14 23h14M14 30h8" stroke="#040711" stroke-width="2.6" stroke-linecap="round"/>'
        '<circle cx="34" cy="33" r="10" fill="#DCB45C"/>'
        '<path d="M29.5 33l3.2 3.2 6-6.4" stroke="#040711" stroke-width="3" stroke-linecap="round" '
        'stroke-linejoin="round" fill="none"/></svg>',
    # Her own brain glyph, copied from the BIO 004 games page so the two
    # courses share an icon rather than each having their own version.
    'brain':
        '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">'
        '<path d="M24 10c-6 0-9 3-9 7 0 1-3 2-3 6s3 5 3 7c0 4 4 8 9 8s9-4 9-8c0-2 3-3 3-7s-3-5-3-6c0-4-3-7-9-7z" '
        'fill="#FFFFFF"/>'
        '<path d="M24 12v24M18 18h12M18 28h12" stroke="#8B3A2E" stroke-width="2.4" stroke-linecap="round"/></svg>',
    'syllabus':
        '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">'
        '<rect x="9" y="6" width="30" height="36" rx="4" fill="#FFFFFF"/>'
        '<path d="M9 10a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v5H9z" fill="#DCB45C"/>'
        '<path d="M16 23h16M16 29h16M16 35h10" stroke="#040711" stroke-width="2.6" stroke-linecap="round"/></svg>',
    'cards':
        '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">'
        '<rect x="7" y="12" width="21" height="28" rx="3" fill="#FFFFFF"/>'
        '<rect x="18" y="7" width="21" height="28" rx="3" fill="#DCB45C" stroke="#040711" stroke-width="2"/>'
        '<path d="M23 16h11M23 21h11M23 26h7" stroke="#040711" stroke-width="2" stroke-linecap="round"/></svg>',
}

TILES = [
    ('setup', 'course-entry.html', 'Do this first', 'Set up and tech check',
     'Fifteen minutes, and it saves you a bad week later. Check that your browser, '
     'camera and Canvas all work before the first assignment is due.'),
    ('brain', 'guide-how-to-study.html', 'Method', 'How to study this course',
     'Rereading feels like studying, but it is not what makes the material stick. '
     'This explains what to do instead, and why.'),
    ('syllabus', 'start-here.html', 'Admin', 'Syllabus and grading',
     'Office hours, how points are earned, deadlines, and the late work policy. '
     'Read it once in week one so nothing surprises you in week ten.'),
    ('cards', 'competency-recall.html', 'Study', 'Recall cards',
     'Short practice you can do most days. Fifteen minutes at a time beats '
     'two hours the night before.'),
]


PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<title>Human Physiology &middot; BIO 005 &middot; Fall 2026</title>
<meta name="description" content="BIO 005 Human Physiology, an integrative approach. Yuba College, Fall 2026, fully online. Course calendar, all fifteen weeks, and where to start.">
%(css)s
<style>
/* ==========================================================================
   BANDS
   Her own sites are not white top to bottom. medmasterscollaborative.com
   runs white, a maroon strip, then tall #060A18 sections. The BIO 004 games
   page puts white cards on a maroon ground. This page does the same:
   navy hero, off-white middle, maroon tiles, dark footer.
   ========================================================================== */
.band{width:100%%}
.band-dark{background:var(--navy);color:#fff}
.band-maroon{background:var(--maroon);color:#fff}
.band-light{background:var(--offwhite)}
.hwrap{max-width:1180px;margin:0 auto;padding:0 max(16px,3vw)}
.band-dark h1,.band-dark h2,.band-maroon h2{color:#fff}
.band-dark :focus-visible,.band-maroon :focus-visible{outline-color:#fff}

/* eyebrow: her signature, tiny and heavy and widely tracked */
.eyeb{font-family:var(--display);font-weight:700;font-size:.72rem;letter-spacing:.14em;
      text-transform:uppercase;margin:0 0 .6rem}
.band-dark .eyeb{color:var(--straw-light)}
/* straw-light is only 5.96:1 on terra, so the terra band uses white. */
.band-maroon .eyeb{color:#fff}
.band-light .eyeb{color:var(--maroon-dark)}

/* ---------- hero ---------- */
.hero{padding:56px 0 42px}
.hero h1{font-size:clamp(1.9rem,4.2vw,2.9rem);line-height:1.1;max-width:20ch;margin:0 0 18px;letter-spacing:-.025em}
.hero h1 .hl{color:var(--gold-bright)}
.hero .stand{font-size:1.08rem;color:#D6DCE6;max-width:60ch;margin:0 0 14px;line-height:1.65}
.hero .stand:last-of-type{margin-bottom:28px}
.ctas{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.btnA,.btnB{display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;
  border-radius:var(--r-block);font-family:var(--display);font-size:.95rem;font-weight:700;
  text-decoration:none;border:2px solid transparent}
/* Hover inverts rather than shifting a shade. Gold-on-navy going to
   navy-on-gold is unmistakable; gold to straw was not. The border keeps its
   colour so the button stays visible once its fill matches the band. */
.btnA{background:var(--gold-bright);border-color:var(--gold-bright);color:#040711}
.btnA:hover,.btnA:focus-visible{background:var(--navy);color:var(--gold-bright);
  border-color:var(--gold-bright)}
.btnB{background:transparent;border-color:#fff;color:#fff}
.btnB:hover,.btnB:focus-visible{background:#fff;color:var(--navy)}
.nowcard .btnA{background:var(--terra);border-color:var(--terra);color:#fff}
.nowcard .btnA:hover,.nowcard .btnA:focus-visible{background:#fff;color:var(--terra);
  border-color:var(--terra)}

/* ---------- this week: a white card sitting across the band edge ---------- */
/* This card straddles the edge of the dark band, so it needs a real drop
   shadow to sit above both grounds rather than butting against them. */
.nowcard{background:#fff;color:var(--navy);border-radius:var(--r-card);box-shadow:var(--shadow-lift);
  padding:30px max(20px,2.4vw);margin:0 0 -48px;position:relative;z-index:2;
  display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
@media(min-width:860px){.nowcard{grid-template-columns:minmax(0,1fr) auto;align-items:center}}
.nowcard .eyeb{color:var(--maroon-dark)}
.nowcard h2{font-size:clamp(1.3rem,2.2vw,1.7rem);color:var(--navy);margin:0 0 10px;max-width:24ch;letter-spacing:-.02em}
.nowcard p{color:var(--ink-soft);font-size:1rem;margin:0;max-width:54ch}
.nowmeta{display:flex;gap:24px;flex-wrap:wrap;margin:18px 0 0}
.nowmeta div{font-size:.92rem;font-weight:600}
.nowmeta b{display:block;font-family:var(--display);color:var(--maroon-dark);font-size:.66rem;
  letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:3px}
.spacer{height:48px}

/* ---------- section heads ---------- */
.sec{padding:46px 0}
.sechead{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:start;
         padding-bottom:18px;margin-bottom:26px;border-bottom:1px solid var(--rule-soft)}
.band-maroon .sechead{border-bottom-color:rgba(255,255,255,.3)}
.secnum{font-family:var(--display);font-size:.8rem;font-weight:800;letter-spacing:.14em;
        padding-top:6px;color:var(--gold-text)}
.band-maroon .secnum{color:#fff}
.sechead h2{font-size:clamp(1.3rem,2.2vw,1.65rem);letter-spacing:-.02em;margin:0 0 5px;max-width:26ch}
.sechead p{font-size:.97rem;color:var(--ink-soft);margin:0;max-width:62ch}
.band-maroon .sechead p{color:#fff}
@media(max-width:600px){.sechead{grid-template-columns:1fr;gap:4px}.secnum{padding:0}}

/* ---------- calendar ---------- */
/* ---------- calendar carousel ----------
   Without JavaScript all four months render stacked and the control bar
   stays hidden, so nothing is unreachable. JavaScript then shows the bar
   and pages one month at a time, opening on the month the term is in. */
.calbar{display:flex;align-items:center;gap:12px;margin:0 0 16px;max-width:420px}
.calnav{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;
  border:1px solid var(--navy-50);background:#fff;border-radius:var(--btn-radius);
  color:var(--navy);font-size:1.2rem;line-height:1;cursor:pointer;padding:0}
.calnav:hover{background:var(--navy);color:#fff;border-color:var(--navy)}
.calnow{flex:1;margin:0;text-align:center;font-family:var(--display);font-size:.8rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;color:var(--terra)}
.calnow .of{display:block;font-family:var(--font);font-size:.72rem;font-weight:600;
  letter-spacing:normal;text-transform:none;color:var(--navy-70);margin-top:2px}
.cals{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%%,336px),1fr));gap:18px;max-width:760px}
.cals.carousel{display:block;max-width:420px}
.cal{background:#fff;border-radius:var(--r-card);box-shadow:var(--shadow-rest);padding:18px 16px 12px}
.cal h3{font-family:var(--display);font-size:.72rem;font-weight:700;letter-spacing:.16em;
        text-transform:uppercase;color:var(--maroon-dark);margin:0 0 12px;padding-left:4px}
.cal table{width:100%%;border-collapse:collapse;table-layout:fixed}
.cal th{font-size:.7rem;font-weight:700;color:var(--ink-soft);padding:0 0 6px;text-align:center}
.cal td{min-height:44px;height:44px;vertical-align:middle;padding:1px;text-align:center}
.cal .dn{font-size:.86rem;font-weight:600}
.cal td.day{color:var(--ink-soft);font-size:.86rem}
.cal td.inwk{padding:0}
/* The target is the whole 44px cell, the AAA size, not just the numeral. 2.5.8. */
.cal td.inwk a{display:flex;align-items:center;justify-content:center;width:100%%;height:100%%;
  min-height:44px;border-radius:6px;text-decoration:none;color:var(--navy);
  background:var(--navy-tint);border:1px solid #7C8798}
.cal td.inwk a:hover{background:var(--straw-light);border-color:var(--gold-text)}
/* Opens and due are told apart by WHERE the bar sits, not only by its colour,
   and both are named in each link's accessible name. 1.4.1. */
.cal td.opens a{border-left:4px solid var(--navy)}
.cal td.due a{border-bottom:4px solid var(--maroon)}
.cal td.today a{outline:3px solid var(--maroon);outline-offset:-3px;font-weight:800}
.callegend{display:flex;gap:18px;flex-wrap:wrap;margin:18px 0 0;font-size:.88rem;color:var(--ink-soft)}
.callegend span{display:flex;align-items:center;gap:8px}
.callegend i{width:16px;height:16px;border-radius:4px;background:var(--navy-tint);
  border:1px solid #7C8798;border-left:4px solid var(--navy)}
.callegend i.d{border-left:1px solid #7C8798;border-bottom:4px solid var(--maroon)}

/* ---------- the fifteen weeks ---------- */
/* The current week gets a terra arrow, a wash and a heavier border. Three
   cues, only one of which is colour, so 1.4.1 holds. The visible tag
   "This week" is what a screen reader hears. */
.wklist{display:grid;gap:10px;padding-left:28px}
@media(max-width:640px){.wklist{padding-left:22px}}
.wkrow{position:relative;display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:16px;
  align-items:center;background:#fff;border:1px solid var(--navy-15);border-radius:var(--r-card);
  box-shadow:var(--shadow-rest);padding:15px 20px;text-decoration:none;color:var(--navy);
  transition:transform 200ms ease,box-shadow 200ms ease}
.wkrow:hover{transform:translateY(-2px);box-shadow:var(--shadow-hover)}
.wkrow .no{font-family:var(--display);font-size:1.1rem;font-weight:800;color:var(--gold-text)}
.wkrow h3{font-size:1rem;font-weight:700;margin:0 0 2px}
.wkrow p{font-size:.86rem;color:var(--ink-soft);margin:0}
.wkrow .when{font-size:.84rem;font-weight:700;color:var(--ink-soft);white-space:nowrap}
.wkrow[data-state="past"]{box-shadow:none;background:#F1F3F5}
.wkrow[data-state="past"] h3{color:var(--ink-soft)}
.wkrow[data-state="now"]{background:#EFF0F2;box-shadow:var(--shadow-hover)}
/* Terra is 6.72:1 on the grey, just under AAA, so the number darkens. */
.wkrow[data-state="now"] .no{color:var(--terra-dark)}
.wkrow[data-state="now"]::before{content:"";position:absolute;left:-30px;top:50%%;
  transform:translateY(-50%%);width:32px;height:22px;
  background:url("data:image/svg+xml,%%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 28'%%3E%%3Cg fill='none' stroke='%%23040711' stroke-width='8.5' stroke-linecap='round' stroke-linejoin='round'%%3E%%3Cpath d='M4 23 C 13 23 14 13 28 12'/%%3E%%3Cpath d='M28 5 L38 12 L28 19'/%%3E%%3C/g%%3E%%3Cg fill='none' stroke='%%23DCB45C' stroke-width='4.5' stroke-linecap='round' stroke-linejoin='round'%%3E%%3Cpath d='M4 23 C 13 23 14 13 28 12'/%%3E%%3Cpath d='M28 5 L38 12 L28 19'/%%3E%%3C/g%%3E%%3C/svg%%3E") center/contain no-repeat}
@media(max-width:640px){.wkrow[data-state="now"]::before{left:-26px;width:25px;height:17px}}
.tagnow{font-family:var(--display);font-size:.62rem;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;background:var(--maroon);color:#fff;border-radius:99px;
  padding:3px 10px;margin-left:9px;white-space:nowrap}
@media(max-width:640px){.wkrow{grid-template-columns:38px minmax(0,1fr)}.wkrow .when{grid-column:2}}

/* ---------- app tiles, the BIO 004 games pattern ---------- */
.tiles{display:grid;gap:1.05rem;grid-template-columns:repeat(auto-fill,minmax(238px,1fr))}
.tile{background:#fff;color:var(--navy);border-radius:var(--r-card);box-shadow:var(--shadow-rest);
  padding:1.4rem 1.3rem 1.2rem;display:flex;flex-direction:column;text-decoration:none;
  transition:transform 200ms ease,box-shadow 200ms ease}
.tile:hover{transform:translateY(-2px);box-shadow:var(--shadow-hover)}
.appicon{width:74px;height:74px;border-radius:18px;display:grid;place-items:center;
  background:var(--navy);margin-bottom:1rem;box-shadow:var(--shadow-rest)}
.appicon svg{width:46px;height:46px;display:block}
.chip{display:inline-block;font-family:var(--display);font-weight:700;font-size:.64rem;
  letter-spacing:.12em;text-transform:uppercase;border-radius:99px;padding:.24rem .64rem;
  margin-bottom:.6rem;background:var(--navy-tint);color:var(--navy);align-self:flex-start}
.tile h3{font-size:1.16rem;margin:0 0 .4rem}
.tile p{font-size:.94rem;color:var(--ink-soft);margin:0 0 1.1rem}
.tile .open{margin-top:auto;font-family:var(--display);font-weight:700;font-size:.9rem;color:var(--maroon)}
</style>
</head>
<body>
%(nav)s

<main id="main">

  <div class="band band-dark">
    <div class="hwrap">
      <section class="hero" aria-labelledby="h-hero">
        <p class="eyeb">BIO 005 &middot; Yuba College &middot; Fall 2026 &middot; Fully online</p>
        <h1 id="h-hero">Human Physiology,<br><span class="hl">an integrative approach</span></h1>
        <p class="stand">Physiology is the study of how the living body actually works. Not what the
          parts are called, but what they do, how they do it, and what happens when they stop.
          Over fifteen weeks you will work up from a single cell to the whole person: how a cell
          moves things across its membrane, how a nerve fires, how a muscle pulls, how the heart
          pumps, how the lung and the kidney keep your blood chemistry inside the narrow range
          your cells can survive.</p>
        <p class="stand">The word that ties it together is <strong>integrative</strong>. No organ
          works alone. Hold your breath and your kidney hears about it. Stand up too fast and your
          heart, your blood vessels and your brain all respond within a second. You will spend the
          term learning to trace those connections rather than memorising the parts separately.</p>
        <div class="ctas">
          <a class="btnA" href="#thisweek">Go to this week</a>
          <a class="btnB" href="guides.html" target="_top">How this course works</a>
        </div>
      </section>

      <section id="thisweek" class="nowcard" aria-labelledby="h-now">
        <div>
          <p class="eyeb" id="nowk">Week 1 of 15</p>
          <h2 id="h-now"><span id="nowtitle">%(w1title)s</span></h2>
          <p id="nowline">%(w1line)s</p>
          <div class="nowmeta">
            <div><b>Opens</b><span id="nowopen">%(w1open)s</span></div>
            <div><b>Everything due</b><span id="nowdue">%(w1due)s</span></div>
          </div>
        </div>
        <a class="btnA" id="nowgo" href="week-01.html" target="_top">Open week 1</a>
      </section>
    </div>
  </div>

  <div class="band band-light">
    <div class="hwrap">
      <div class="spacer"></div>

      <section class="sec" aria-labelledby="h-cal">
        <div class="sechead">
          <p class="secnum"><span class="vh">Section </span>02</p>
          <div>
            <h2 id="h-cal">The calendar</h2>
            <p>Every day of the term links to the week it belongs to. Use it to go back and pick up
              anything you missed, or to look ahead at what is coming.</p>
            <p class="vh">The calendar shows one month at a time. Use the previous and next month
              buttons, or the left and right arrow keys while a month button has focus. Every week
              is also listed in full further down this page, under All fifteen weeks.</p>
          </div>
        </div>
        <div class="calbar" id="calbar" hidden>
          <button type="button" class="calnav" id="calprev" aria-controls="cals"
                  aria-label="Previous month"><span aria-hidden="true">&lsaquo;</span></button>
          <p class="calnow" id="calnow" aria-live="polite" aria-atomic="true"></p>
          <button type="button" class="calnav" id="calnext" aria-controls="cals"
                  aria-label="Next month"><span aria-hidden="true">&rsaquo;</span></button>
        </div>
        <div class="cals" id="cals">%(cals)s</div>
        <p class="callegend">
          <span><i aria-hidden="true"></i> Bar on the left: the week opens</span>
          <span><i class="d" aria-hidden="true"></i> Bar underneath: everything is due, 11:59 pm</span>
        </p>
      </section>

      <section class="sec" aria-labelledby="h-weeks">
        <div class="sechead">
          <p class="secnum"><span class="vh">Section </span>03</p>
          <div>
            <h2 id="h-weeks">All fifteen weeks</h2>
            <p>The term runs in three parts. Foundations sets up the rules every system follows,
              control systems covers the nerves and hormones that give the orders, and systems in
              action is those rules running inside real organs.</p>
          </div>
        </div>
        <div class="wklist">%(wklist)s</div>
      </section>
    </div>
  </div>

  <div class="band band-maroon">
    <div class="hwrap">
      <section class="sec" aria-labelledby="h-start">
        <div class="sechead">
          <p class="secnum"><span class="vh">Section </span>04</p>
          <div>
            <h2 id="h-start">Start here</h2>
            <p>If you are new to the course, or something is not working, these four are where to go.</p>
          </div>
        </div>
        <div class="tiles">%(tiles)s</div>
      </section>
    </div>
  </div>

</main>

%(foot)s

<script>
(function () {
  'use strict';
  var WEEKS = %(weekjson)s;

  function D(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var today = new Date(); today.setHours(0, 0, 0, 0);

  var cur = null;
  for (var i = 0; i < WEEKS.length; i++) {
    if (today >= D(WEEKS[i].opens) && today <= D(WEEKS[i].closes)) { cur = WEEKS[i]; break; }
  }
  if (!cur) { cur = (today < D(WEEKS[0].opens)) ? WEEKS[0] : WEEKS[WEEKS.length - 1]; }

  function pretty(s) {
    return D(s).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  document.getElementById('nowk').textContent = 'Week ' + cur.wk + ' of 15';
  document.getElementById('nowtitle').textContent = cur.title;
  document.getElementById('nowline').textContent =
    (today < D(cur.opens) ? 'This week opens ' + pretty(cur.opens) + '.'
                          : 'This week is open now. Everything in it is due Sunday night.');
  document.getElementById('nowopen').textContent = pretty(cur.opens);
  document.getElementById('nowdue').textContent = pretty(cur.closes) + ', 11:59 pm';
  var go = document.getElementById('nowgo');
  go.setAttribute('href', 'week-' + (cur.wk < 10 ? '0' : '') + cur.wk + '.html');
  go.textContent = 'Open week ' + cur.wk;

  /* ---------- calendar carousel ----------
     Progressive enhancement. The markup ships four months stacked and the
     control bar hidden, so with JavaScript off nothing is unreachable.
     Here we reveal the bar, hide all but one month with the hidden
     attribute (which takes them out of the tab order AND out of the
     accessibility tree, so a keyboard user never tabs into an invisible
     month), and open on the month the term is actually in. */
  var cals = document.getElementById('cals');
  var bar = document.getElementById('calbar');
  var months = cals ? Array.prototype.slice.call(cals.querySelectorAll('.cal')) : [];

  if (bar && months.length > 1) {
    var label = document.getElementById('calnow');
    var names = months.map(function (m) {
      var h = m.querySelector('h3');
      return h ? h.textContent.trim() : '';
    });
    var at = today.getFullYear() === 2026 ? Math.min(Math.max(today.getMonth() - 8, 0), months.length - 1) : 0;

    function show(i, announce) {
      at = (i + months.length) %% months.length;
      months.forEach(function (m, k) { m.hidden = (k !== at); });
      label.innerHTML = '';
      label.appendChild(document.createTextNode(names[at] + ' 2026'));
      /* The count sits on its own line visually, so without a separator a
         screen reader runs it straight on: "September 2026Month 1 of 4". */
      var sep = document.createElement('span');
      sep.className = 'vh';
      sep.textContent = ', ';
      label.appendChild(sep);
      var of = document.createElement('span');
      of.className = 'of';
      of.textContent = 'Month ' + (at + 1) + ' of ' + months.length;
      label.appendChild(of);
      if (announce === false) { label.setAttribute('aria-live', 'off'); }
      else { label.setAttribute('aria-live', 'polite'); }
    }

    cals.classList.add('carousel');
    bar.hidden = false;
    show(at, false);
    label.setAttribute('aria-live', 'polite');

    document.getElementById('calprev').addEventListener('click', function () { show(at - 1); });
    document.getElementById('calnext').addEventListener('click', function () { show(at + 1); });
    /* Arrow keys work while a month button has focus. Focus is deliberately
       left where it is, so repeated presses keep paging. */
    bar.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1); }
      if (e.key === 'Home') { e.preventDefault(); show(0); }
      if (e.key === 'End') { e.preventDefault(); show(months.length - 1); }
    });
  }

  var iso = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');
  var td = document.querySelector('[data-date="' + iso + '"]');
  if (td) { td.classList.add('today'); }

  Array.prototype.forEach.call(document.querySelectorAll('.wkrow'), function (row) {
    var wk = +row.getAttribute('data-wk');
    var w = WEEKS.filter(function (x) { return x.wk === wk; })[0];
    if (!w) { return; }
    var state = today > D(w.closes) ? 'past' : (wk === cur.wk ? 'now' : 'ahead');
    row.setAttribute('data-state', state);
    if (state === 'now') {
      var h = row.querySelector('h3');
      if (h && !h.querySelector('.tagnow')) {
        var t = document.createElement('span');
        t.className = 'tagnow'; t.textContent = 'This week';
        h.appendChild(t);
      }
    }
  });
}());
</script>

<script>
(function () {
  var ID = 'bio005-home';
  function send() {
    try { parent.postMessage({ id: ID, frameId: ID,
      height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) }, '*'); } catch (e) {}
  }
  window.addEventListener('load', send); window.addEventListener('resize', send);
  if (window.ResizeObserver) { new ResizeObserver(send).observe(document.body); }
  send();
}());
</script>
</body>
</html>
'''


def main():
    data = bw.load_data()
    weeks = sorted(data['weeks'], key=lambda w: w['wk'])
    counts = {}
    for c in data['comps']:
        counts[c['week']] = counts.get(c['week'], 0) + 1

    cals = ''.join(month_grid(2026, m, weeks) for m in (9, 10, 11, 12))

    def part(wk):
        return 'Foundations' if wk <= 3 else ('Control systems' if wk <= 8 else 'Systems in action')

    wklist = ''.join(
        '<a class="wkrow" href="week-%02d.html" target="_top" data-wk="%d">'
        '<span class="no">%02d</span>'
        '<span><h3>%s</h3><p>%s</p></span>'
        '<span class="when">%s</span></a>'
        % (w['wk'], w['wk'], w['wk'], esc(w['title']), part(w['wk']),
           D(w['opens']).strftime('%b %-d'))
        for w in weeks)

    tiles = ''.join(
        '<a class="tile" href="%s" target="_top">'
        '<span class="appicon">%s</span>'
        '<span class="chip">%s</span>'
        '<h3>%s</h3><p>%s</p>'
        '<span class="open">Open it &rsaquo;</span></a>'
        % (href, ICONS[key], esc(chip), esc(title), esc(blurb))
        for key, href, chip, title, blurb in TILES)

    weekjson = json.dumps([
        {'wk': w['wk'], 'title': w['title'], 'opens': w['opens'],
         'closes': w['closes'], 'n': counts.get(w['wk'], 0)}
        for w in weeks])

    w1 = weeks[0]
    out = PAGE % {
        'css': CSS,
        'nav': NAV % {'logo': LOGO, 'navthis': '', 'navhome': 'aria-current="page"'},
        'foot': FOOT,
        'cals': cals,
        'wklist': wklist,
        'tiles': tiles,
        'weekjson': weekjson,
        'w1title': esc(w1['title']),
        'w1line': 'This week opens %s.' % D(w1['opens']).strftime('%A %B %-d'),
        'w1open': D(w1['opens']).strftime('%A %B %-d'),
        'w1due': D(w1['closes']).strftime('%A %B %-d') + ', 11:59 pm',
    }
    if '—' in out or '–' in out:
        raise SystemExit('em or en dash in index.html')
    io.open('index.html', 'w', encoding='utf-8').write(out)
    print('%-20s %6.1f KB  %d weeks, 4 months, %d app tiles'
          % ('index.html', len(out) / 1024.0, len(weeks), len(TILES)))


if __name__ == '__main__':
    main()
