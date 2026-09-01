#!/usr/bin/env python3
"""
The BIO 004 front door, in her teaching-resources card system.

    python3 build-bio4-front.py

Writes home.html and canvas-start.html into the repo.

THE DESIGN IS index.html's, NOT A NEW ONE
`index.html` in this repo is the Teaching Resources page, and its .cat cards
are the ones she pointed at: a solid colour edge to edge, a translucent
rounded-square icon tile, a big title, a line of description, and a small
uppercase go line at the bottom. Lifted off a white page by a real shadow.

Every value below is lifted from that file, unchanged:

    .cats   grid, auto-fit, minmax(340px,1fr), 20px gap
    .cat    radius 18, padding 28px 26px, min-height 214
            rest  box-shadow 0 14px 30px rgba(11,21,48,.18)
            hover translateY(-6px), 0 26px 50px rgba(11,21,48,.28)
            transition transform .22s ease, box-shadow .22s ease
    .ic     54px, radius 14, rgba(255,255,255,.18)
            on a light card, rgba(11,21,48,.12)
    h2      24px / 800      p 15px / 1.5      .go 13px / 800 / .12em upper
    colours #0B1530 ink, #8B3A2E rust, #C9A14A gold, #1F2D44 slate,
            #5E201A deep maroon, on #FFF

The earlier navy-page Launchpad version is gone. This is the card system she
asked for, with the lift.

ONE DOOR, THEN FOUR
Level one is a single card: Enter the course, in gold. Opening it swaps to
level two, the four doors. Same two-level idea, new clothes.

WHAT CARRIES OVER FROM THE ACCESSIBLE VERSION
The forced-colors block, because a solid-background card with `border:none`
loses its edge completely in Windows High Contrast. The focus move on open,
Back returning focus, Escape closing. Both panels present with no JavaScript.

ONE FIX TO HER CSS, AND WHY
teaching-resources sets no opacity on .cat p, which is right. An older copy of
this card system did, at .86, and that put body text at 6.11:1 on rust and
5.99:1 on gold, under AAA. There is no opacity here. Everything else is hers.
"""
import io, os, re

REPO = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'bio4')
BASE = 'https://drsrennie-stack.github.io/new-build-bio4-solano/'

# Her Launchpad's own glyphs, lifted unchanged so the two pages draw in the
# same hand. `cal` is the only new one.
GLYPH = {
    'door':  '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8"/>'
             '<path d="M11 12h10"/><path d="M17.5 8.5 21 12l-3.5 3.5"/>',
    'book':  '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>'
             '<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    'flask': '<path d="M10 2v7.5L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9.5V2"/>'
             '<path d="M8 2h8"/>',
    'brain': '<path d="M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.2-2.6 5.6-.8.8-1.4 1.9-1.4 3v.4H9v-.4'
             'c0-1.1-.6-2.2-1.4-3C6.2 13.2 5 11.4 5 9a7 7 0 0 1 7-7z"/><path d="M9 21h6"/>',
    'cal':   '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/>'
             '<path d="M3 10h18M8 2v5M16 2v5"/>',
}

# The four doors, in her order, in the colours index.html uses. `light` is her
# own modifier for a card whose text is ink rather than white; it also switches
# the icon tile from a white wash to a dark one.
DOORS = [
    {'key': 'lab', 'glyph': 'flask', 'bg': '#0B1530', 'fg': '#FFFFFF',
     'name': 'Lab',
     'sub': 'Lab sprints. Every structure you are responsible for on the models.',
     'go': 'Open the lab sprints',
     'href': 'lab-sprints.html'},

    {'key': 'lecture', 'glyph': 'book', 'bg': '#8B3A2E', 'fg': '#FFFFFF',
     'name': 'Lecture',
     'sub': 'Notes, pre-work, concept videos, workbooks and slide decks.',
     'go': 'Open the course materials',
     'href': 'course-materials.html'},

    {'key': 'study', 'glyph': 'brain', 'bg': '#C9A14A', 'fg': '#0B1530', 'light': True,
     'name': 'Study',
     'sub': 'Mastery OS. Your recall cards and the structures you keep missing.',
     'go': 'Open Mastery OS',
     'href': 'mastery-os-fall-2026.html'},

    {'key': 'syllabus', 'glyph': 'cal', 'bg': '#1F2D44', 'fg': '#FFFFFF',
     'name': 'Syllabus and schedule',
     'sub': 'Your section. Exam dates, grading, and the term calendar.',
     'go': 'Open your syllabus',
     'href': 'fall-2026-syllabus.html', 'secpick': True},
]

# Her Teaching Resources lockup, same three figures, same ink / rust / gold.
LOGO = (
    '<h1 class="logo">'
    '<svg viewBox="40 10 125 148" aria-hidden="true" focusable="false"><g transform="translate(0,18)">'
    '<g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#0B1530"/>'
    '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 '
    'L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#0B1530"/></g>'
    '<g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/>'
    '<path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 '
    'L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g>'
    '<g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/>'
    '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 '
    'L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g>'
    '</g></svg>'
    '<span><span class="t">BIO <span class="a">004</span></span>'
    '<span class="s">Human Anatomy &middot; Fall 2026</span></span>'
    '</h1>')


def icsq(glyph):
    """Her .ic tile. The stroke colour is not set here on purpose: the card
       system sets it with `.cat .ic svg *{stroke:var(--fg)}`, so the glyph is
       always the same colour as the card's own text and cannot drift away
       from it when a card changes colour."""
    return ('<span class="ic" aria-hidden="true">'
            '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" '
            'stroke-linecap="round" stroke-linejoin="round">%s</svg></span>' % GLYPH[glyph])


def doors_html(target):
    rel = ' rel="noopener"' if target == '_blank' else ''
    out = ''
    for d in DOORS:
        out += ('<a class="cat%s" id="door-%s" data-go="%s" href="%s" target="%s"%s%s '
                'style="--bg:%s;--fg:%s">'
                '%s<h3>%s</h3><p>%s</p>'
                '<span class="go">%s <span class="arr" aria-hidden="true">&rarr;</span></span>'
                '</a>'
                % (' light' if d.get('light') else '', d['key'], d['href'], d['href'],
                   target, rel, ' data-secpick="1"' if d.get('secpick') else '',
                   d['bg'], d['fg'], icsq(d['glyph']), d['name'], d['sub'], d['go']))
    return out


CSS = '''
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0B1530; --ink-deep:#060A18; --rust:#8B3A2E; --gold:#C9A14A;
  --slate:#1F2D44; --maroon:#5E201A;
  --line:#8C90A0; --muted:#4E5464; --tint:#F3EEE9;
  --rest:0 14px 30px rgba(11,21,48,.18);
  --lift:0 26px 50px rgba(11,21,48,.28);
}
html,body{font-size:17.5px;line-height:1.6}
body{font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;
  background:#FFF;color:var(--ink);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;border:0;background:none;color:inherit}
:focus-visible{outline:3px solid var(--rust);outline-offset:3px;border-radius:6px}
[hidden]{display:none !important}
.skip{position:absolute;left:-9999px;top:0;z-index:100;background:var(--ink);color:#FFF;
  padding:12px 18px;border-radius:0 0 8px 0;font-size:14px;font-weight:700}
.skip:focus{left:0}
.vh{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip:rect(0 0 0 0);white-space:nowrap;border:0}

.wrap{max-width:1120px;margin:0 auto;padding:0 max(28px,5vw)}
.site-header{padding:26px 0;border-bottom:.5px solid rgba(11,21,48,.10)}
.logo{display:inline-flex;align-items:center;gap:15px;font-size:inherit;font-weight:400}
.logo svg{height:54px;width:auto}
.logo .t{font-size:27px;font-weight:800;letter-spacing:-.02em;color:var(--ink);line-height:1;
  display:block}
.logo .t .a{color:var(--rust)}
.logo .s{font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:var(--ink);opacity:.72;display:block;margin-top:3px}

.hero{padding:50px 0 8px;max-width:760px}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;
  color:var(--rust);margin:0 0 16px;display:flex;align-items:center;gap:10px}
.eyebrow::before{content:"";width:26px;height:2px;background:var(--rust)}
.ph{font-size:52px;font-weight:800;letter-spacing:-.025em;line-height:1.05;margin:0 0 14px}
.ph .a{color:var(--rust)}
.lead{font-size:19px;opacity:.82;margin:0}
.seclab{display:inline-block;margin:18px 0 0;font-size:12px;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;color:var(--rust);
  border:1.5px solid var(--rust);border-radius:999px;padding:7px 15px}

/* HER CARDS. index.html, value for value. */
.cats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:20px;
  padding:36px 0 8px}
.cats.one{grid-template-columns:minmax(0,460px);padding-bottom:0}
.cat{position:relative;display:flex;flex-direction:column;gap:12px;
  background:var(--bg);color:var(--fg);border:none;border-radius:18px;padding:28px 26px;
  box-shadow:var(--rest);transition:transform .22s ease,box-shadow .22s ease;
  min-height:214px;text-align:left;width:100%}
.cat:hover{transform:translateY(-6px);box-shadow:var(--lift)}
.cat:focus-visible{outline:3px solid var(--fg);outline-offset:-5px;border-radius:18px}
.cat .ic{width:54px;height:54px;border-radius:14px;background:rgba(255,255,255,.18);
  display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.cat.light .ic{background:rgba(11,21,48,.12)}
.cat .ic svg{width:28px;height:28px}
.cat .ic svg *{stroke:var(--fg)}
.cat h3{font-size:24px;font-weight:800;letter-spacing:-.01em;line-height:1.15;margin:0;
  color:var(--fg)}
.cat p{font-size:15px;color:var(--fg);margin:0;flex:1 1 auto;line-height:1.5}
.cat .go{margin-top:auto;font-size:13px;font-weight:800;letter-spacing:.12em;
  text-transform:uppercase;color:var(--fg);display:inline-flex;align-items:center;gap:8px}
.cat .go .arr{transition:transform .2s}
.cat:hover .go .arr{transform:translateX(4px)}

.backrow{padding:26px 0 0}
.backrow button{display:inline-flex;align-items:center;gap:8px;min-height:44px;
  padding:11px 20px;border:1.5px solid rgba(11,21,48,.28);border-radius:999px;
  font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink)}
.backrow button:hover{border-color:var(--rust);color:var(--rust)}
.calrow{padding:20px 0 8px}
.calrow a{display:inline-flex;align-items:center;gap:8px;min-height:44px;
  padding:11px 20px;border:1.5px solid rgba(11,21,48,.28);border-radius:999px;
  font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink)}
.calrow a:hover{border-color:var(--rust);color:var(--rust)}

footer{padding:24px 0 40px;margin-top:34px;border-top:.5px solid rgba(11,21,48,.10);
  color:var(--muted);font-size:13px;font-weight:600}
footer .sig{color:var(--ink);font-weight:800}

@media(max-width:760px){.ph{font-size:38px}.hero{padding-top:34px}}

/* THE CANVAS COPY.

   A Canvas iframe gets ONE fixed height for every device and both levels. At
   full size this page wants 1915px on a 320px phone and 1077px on a laptop,
   and a single frame tall enough for the phone leaves 840px of nothing under
   the laptop.

   So the embed runs smaller: the hero shrinks, the cards lose their 214px
   floor and some padding, and the grid goes two-up sooner. Nothing is
   removed, it is the same five cards. The page also centres itself in
   whatever height it is given, so what spare height remains reads as even
   padding rather than a gap at the bottom. `safe` centring keeps a narrow
   device top-aligned instead of pushing it off the top. */
body.framed{display:grid;align-content:safe center;min-height:100vh}
body.framed .site-header{padding:16px 0}
body.framed .logo svg{height:40px}
body.framed .logo .t{font-size:21px}
body.framed .hero{padding:26px 0 0}
body.framed .ph{font-size:clamp(26px,4.4vw,34px);margin:0 0 10px}
body.framed .lead{font-size:16px}
body.framed .eyebrow{margin-bottom:11px}
body.framed .seclab{margin-top:13px}
body.framed .cats{padding:22px 0 4px;gap:14px;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
body.framed .cats.one{grid-template-columns:minmax(0,400px)}
body.framed .cat{min-height:0;padding:20px 20px 18px;gap:9px}
body.framed .cat .ic{width:44px;height:44px;border-radius:12px}
body.framed .cat .ic svg{width:23px;height:23px}
body.framed .cat h3{font-size:20px}
body.framed .cat p{font-size:14px}
body.framed .backrow{padding:16px 0 0}
body.framed footer{margin-top:22px;padding:16px 0 20px}
@media(prefers-reduced-motion:reduce){*{transition:none !important}
  .cat:hover{transform:none}}

/* WINDOWS HIGH CONTRAST.

   These cards carry `border:none` and say everything with a solid background.
   In forced-colors mode the background is replaced, so all four become the
   same colour as the page and the cards vanish as objects. The lift goes too,
   since shadows are dropped. Borders are the only thing that survives, so the
   cards get one.

   System colours only. A hex here is either ignored or honoured, and honoured
   is worse: it fights the scheme the reader chose. */
@media (forced-colors: active){
  .cat{border:2px solid ButtonBorder;background:ButtonFace;color:ButtonText;
    forced-color-adjust:none}
  .cat h2,.cat p,.cat .go{color:ButtonText}
  .cat .ic{border:1px solid ButtonBorder;background:ButtonFace}
  .cat .ic svg *{stroke:ButtonText}
  .cat:hover,.cat:focus-visible{border-color:Highlight}
  .backrow button,.calrow a{border:2px solid ButtonBorder;color:ButtonText}
  .skip{border:2px solid ButtonBorder}
  :focus-visible{outline:3px solid Highlight}
}

@media print{
  .cat{border:1px solid #000;box-shadow:none;break-inside:avoid;
    background:#fff !important;color:#000 !important}
  .cat h2,.cat p,.cat .go{color:#000 !important}
  .cat .ic svg *{stroke:#000}
  #p-doors{display:block !important}
  .backrow,.skip{display:none}
}
'''

SCRIPT = '''
(function () {
  'use strict';
  function $(s, r) { return (r || document).querySelector(s); }

  /* ---- sections -------------------------------------------------------
     Three sections, three sets of exam dates, so the syllabus door has to
     know which one is looking. ?sec= first, then the saved choice. Inside
     the Canvas frame that storage read is third-party and Safari refuses
     it, which is why the embed carries ?sec= and why this is wrapped: with
     no catch the script stops here and no door gets its link. */
  var SEC = {
    'mw':     { label: 'Class 1, Mon / Wed afternoon', syllabus: 'syllabus-class1.html' },
    'tr-am':  { label: 'Class 2, Tue / Thu morning',   syllabus: 'syllabus-class2.html' },
    'tr-eve': { label: 'Class 3, Tue / Thu evening',   syllabus: 'syllabus-class3.html' }
  };
  var sec = null;
  try {
    var m = location.search.match(/[?&]sec=([^&#]+)/);
    if (m) { sec = decodeURIComponent(m[1]); }
  } catch (e) {}
  if (!SEC[sec]) { try { sec = localStorage.getItem('bio004-section'); } catch (e) { sec = null; } }
  if (!SEC[sec]) { sec = null; }

  if (sec) {
    var lab = $('#seclab');
    if (lab) { lab.textContent = SEC[sec].label; lab.hidden = false; }
  }
  Array.prototype.forEach.call(document.querySelectorAll('a[data-go]'), function (a) {
    var go = a.getAttribute('data-go');
    if (a.hasAttribute('data-secpick') && sec) { go = SEC[sec].syllabus; }
    if (!sec) { a.setAttribute('href', go); return; }
    var bits = go.split('#');
    a.setAttribute('href', bits[0] + (bits[0].indexOf('?') > -1 ? '&' : '?') +
      'sec=' + encodeURIComponent(sec) + (bits[1] ? '#' + bits[1] : ''));
  });

  /* ---- the two levels -------------------------------------------------
     Both panels are in the HTML and both render with no script at all.
     This is what hides the second one and makes the first tile a control,
     so nothing is reachable only by JavaScript. */
  var home = $('#p-home'), doors = $('#p-doors'), enter = $('#enter'), back = $('#back');
  if (!home || !doors || !enter) { return; }

  doors.hidden = true;
  enter.setAttribute('aria-expanded', 'false');
  enter.setAttribute('aria-controls', 'p-doors');

  function show(which) {
    var toDoors = which === 'doors';
    home.hidden = toDoors;
    doors.hidden = !toDoors;
    enter.setAttribute('aria-expanded', toDoors ? 'true' : 'false');
    /* Focus has to follow, or a keyboard or screen reader user presses
       Enter and nothing appears to have happened: the thing that changed
       is not where they are standing. */
    var land = toDoors ? $('#doors-h') : enter;
    if (land) { land.focus(); }
  }

  enter.addEventListener('click', function () { show('doors'); });
  if (back) { back.addEventListener('click', function () { show('home'); }); }

  /* Escape goes back a level, the way it does everywhere else. */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !doors.hidden) { show('home'); }
  });
}());
'''

HEIGHT = '''
(function () {
  var ID = '__ID__';
  function send() {
    try {
      parent.postMessage({ id: ID, frameId: ID, height: Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight) }, '*');
    } catch (e) {}
  }
  window.addEventListener('load', send);
  window.addEventListener('resize', send);
  window.addEventListener('click', function () { setTimeout(send, 60); });
  if (window.ResizeObserver) { new ResizeObserver(send).observe(document.body); }
  send();
}());
'''

PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__</title>
<meta name="description" content="__DESC__">
__ROBOTS__<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
__COMMENT__
<style>__CSS__</style>
</head>
<body__BODYCLASS__>

<a class="skip" href="#main">Skip to the doors</a>

<header class="site-header"><div class="wrap">__LOGO__</div></header>

<main id="main"><div class="wrap">

  <!-- level one: one door -->
  <div class="panel" id="p-home">
    <div class="hero">
      <p class="eyebrow">Fall 2026</p>
      <h2 class="ph">Welcome to <span class="a">Human Anatomy</span>.</h2>
      <p class="lead">Everything for this course is behind one door.</p>
      <p class="seclab" id="seclab" hidden></p>
    </div>
    <div class="cats one">
      <button class="cat light" type="button" id="enter" style="--bg:#C9A14A;--fg:#0B1530">
        __ENTERICON__<h3>Enter the course</h3>
        <p>Lab, lecture, study, and your syllabus. All four in one place.</p>
        <span class="go">Open the doors <span class="arr" aria-hidden="true">&rarr;</span></span>
      </button>
    </div>
  </div>

  <!-- level two: the four doors -->
  <div class="panel" id="p-doors">
    <div class="backrow"><button type="button" id="back">&#8592; Back</button></div>
    <div class="hero">
      <h2 class="ph" id="doors-h" tabindex="-1">Where are you <span class="a">headed</span>?</h2>
      <p class="lead">Four doors. Everything in the course is behind one of them.</p>
    </div>
    <div class="cats">__DOORS__</div>
    <div class="calrow">
      <a data-go="welcome.html" href="welcome.html" target="__TARGET__"__REL__>Course home, and this week <span class="arr" aria-hidden="true">&rarr;</span></a>
    </div>
  </div>

</div></main>

<footer><div class="wrap">
  Questions about anything here, bring them to class or to office hours.
  &nbsp;<span class="sig">Dr. Sharilyn Rennie</span>
</div></footer>

<script>__SCRIPT__</script>
<script>__HEIGHT__</script>
</body>
</html>
'''


def page(which):
    canvas = (which == 'canvas')
    target = '_blank' if canvas else '_top'
    rel = ' rel="noopener"' if canvas else ''

    if canvas:
        comment = ('<!--\n'
                   '  ============================================================\n'
                   '  BIO 004 Human Anatomy, Fall 2026\n'
                   '  canvas-start.html\n'
                   '\n'
                   '  THE FRONT DOOR, FOR THE CANVAS HOME PAGE.\n'
                   '\n'
                   '  One tile: Enter the course. Opening it swaps to the four\n'
                   '  doors, the same way bio004-launchpad.html opens a door into\n'
                   '  its sub-deck. No page load in between.\n'
                   '\n'
                   '  USE\n'
                   '  ---\n'
                   '  One snippet on the Canvas home page, per section:\n'
                   '\n'
                   '    <p><iframe src="' + BASE + 'canvas-start.html?sec=mw"\n'
                   '      width="100%" height="__H__" style="border:0;width:100%"\n'
                   '      title="BIO 004 Human Anatomy"></iframe></p>\n'
                   '\n'
                   '  __H__ is measured, not guessed. node canvas-height.js loads\n'
                   '  this page at every width that matters, on BOTH levels, and\n'
                   '  reports the tallest. Re-run it after any change here.\n'
                   '\n'
                   '  sec=  mw | tr-am | tr-eve. BAKE IT IN. Inside the Canvas\n'
                   '        frame localStorage is third-party storage and Safari\n'
                   '        blocks it, so the URL parameter is the only thing that\n'
                   '        reliably says which section is looking. Without it the\n'
                   '        syllabus door goes to the section chooser, which still\n'
                   '        works, it is just one more click every time.\n'
                   '\n'
                   '  EVERY LINK OPENS IN A NEW TAB, on purpose, same as\n'
                   '  canvas-enter.html: Canvas strips script from page content so\n'
                   '  nothing embedded can size itself, localStorage in the frame\n'
                   '  is blocked in Safari, and dialogs get clipped. It also leaves\n'
                   '  Canvas where the student left it.\n'
                   '  ============================================================\n'
                   '-->')
        title = 'BIO 004 Human Anatomy'
        desc = ('BIO 004 Human Anatomy, Fall 2026. Enter the course: lab, lecture, study, '
                'and your syllabus.')
        robots = '<meta name="robots" content="noindex">\n'
        hid = 'bio004-canvas-start'
    else:
        comment = ('<!--\n'
                   '  ============================================================\n'
                   '  BIO 004 Human Anatomy, Fall 2026\n'
                   '  home.html\n'
                   '\n'
                   '  THE SITE FRONT DOOR. One tile: Enter the course. Opening it\n'
                   '  swaps to the four doors.\n'
                   '\n'
                   '  Built in the language of bio004-launchpad.html: navy ground,\n'
                   "  white tiles, gradient icon squares, the back pill, the quiet\n"
                   '  link under the deck. The Launchpad own subtitle, "Four\n'
                   '  doors. Everything in the course is behind one of them.", is\n'
                   '  reused because it is already the right sentence.\n'
                   '\n'
                   '  welcome.html is still the course home. It is not one of the\n'
                   '  four because it is not a peer of them, it is the whole hub.\n'
                   '  It sits under the deck as the quiet link, which is the\n'
                   "  Launchpad .calrow pattern for exactly this.\n"
                   '\n'
                   '  NOTE ON index.html: it currently serves the Teaching\n'
                   '  Resources page, which is an instructor page, so the plain\n'
                   '  repo URL opens on the wrong thing for a student. Copy this\n'
                   '  over it if you want that fixed. Nothing here depends on it.\n'
                   '\n'
                   '  Same script builds canvas-start.html, so the doors cannot\n'
                   '  drift apart. See build-bio4-front.py.\n'
                   '  ============================================================\n'
                   '-->')
        title = 'BIO 004 Human Anatomy, Fall 2026'
        desc = ('BIO 004 Human Anatomy at Solano Community College, Fall 2026. Lab, lecture, '
                'study tools, syllabus and schedule.')
        robots = ''
        hid = 'bio004-home'

    return (PAGE
            .replace('__BODYCLASS__', ' class="framed"' if canvas else '')
            .replace('__TITLE__', title)
            .replace('__DESC__', desc)
            .replace('__ROBOTS__', robots)
            .replace('__COMMENT__', comment)
            .replace('__CSS__', CSS)
            .replace('__LOGO__', LOGO)
            .replace('__ENTERICON__', icsq('door'))
            .replace('__DOORS__', doors_html(target))
            .replace('__TARGET__', target)
            .replace('__REL__', rel)
            .replace('__SCRIPT__', SCRIPT)
            .replace('__HEIGHT__', HEIGHT.replace('__ID__', hid)))


def main():
    if not os.path.isdir(REPO):
        raise SystemExit('cannot find the repo at ' + REPO)
    h = '1180'
    p = os.path.join(REPO, 'canvas-height.txt')
    if os.path.exists(p):
        h = io.open(p, encoding='utf-8').read().strip()
    for which, name in (('home', 'home.html'), ('canvas', 'canvas-start.html')):
        out = page(which).replace('__H__', h)
        if '—' in out or '–' in out:
            raise SystemExit('em or en dash in ' + name)
        for a in re.findall(r'<a [^>]*data-go="[^"]*"[^>]*>', out):
            if 'target=' not in a:
                raise SystemExit('a door with no target in ' + name)
        io.open(os.path.join(REPO, name), 'w', encoding='utf-8').write(out)
        print('%-22s %6.1f KB   1 door, then %d' % (name, len(out) / 1024.0, len(DOORS)))


if __name__ == '__main__':
    main()
