#!/usr/bin/env python3
"""
BIO 005 week pages, the four stage version. PROTOTYPE, Sep 12 2026.

Learn -> Practice -> Apply -> Check. Same competencies, same due dates,
same tools and links as the v2 page; what changes is the shelf they sit
on and the order a student meets them in. Dr. Rennie's teaching is the
first and largest thing on the page.

Reuses from gen_week_pages_v2: WEEKS, CANVAS, week-data.json, the brand
bar, the footer, the helpers, and the base CSS. The colored tool cards
are the ones from door-study.html (a.tool with c-maroon, c-navy, c-gold)
so a student meets the same card here that they meet on the Study door.

Run from the repo root:
  python3 tools/gen_week_pages_v3.py 3            writes prototype-week-03.html (solid hero cards, white supporting cards)
  python3 tools/gen_week_pages_v3.py 3 --solid    every card solid, for comparison
  python3 tools/gen_week_pages_v3.py 3 --live     writes week-03.html (only after approval)
"""
import os, sys, datetime as dt
sys.path.insert(0, os.path.dirname(__file__))
import gen_week_pages_v2 as V2

WEEKS, CANVAS, D, PART, BRAND, FOOT = V2.WEEKS, V2.CANVAS, V2.D, V2.PART, V2.BRAND, V2.FOOT
long, ext = V2.long, V2.ext

# The big question that opens each week. One line, clinical where it can be.
# Fill the rest in as each week is built; a week without one shows the title only.
BIG_Q = {
    1: 'Why does a body that is never at rest still hold its temperature, its blood sugar and its blood pressure almost steady?',
    2: 'Why does a small change in pH make an enzyme stop working, and what does that do to a patient?',
    3: 'Why can giving a patient the wrong IV fluid make her cells swell?',
    4: 'How does a cell send a message down a meter of nerve in a few milliseconds?',
    5: 'How does one synapse decide whether a signal goes on or stops?',
    6: 'How does your body respond to something before you have consciously noticed it?',
    7: 'What has to happen, in order, for a muscle to shorten, and where can it fail?',
    8: 'Why do hormones take minutes to hours to act, and why is that the point?',
    9: 'What makes the heart fill and empty in the right order every beat?',
    10: 'What holds blood pressure steady when you stand up, and what happens when it does not?',
    11: 'How does the body tell its own cells from an invader?',
    12: 'What does the body do with a holiday meal, and how does it decide what to do with the energy?',
    13: 'How can breathing faster change the pH of the blood in minutes?',
    14: 'How does the kidney keep body water and sodium steady when intake changes every day?',
    15: 'When the fast pH lever is not enough, what does the kidney do, and how long does it take?',
}

# The stage shelves. Color and icon are the wayfinding: the same four
# everywhere. Learn is maroon (her teaching, the brand's primary accent),
# Practice is navy, Apply is gold, Check is navy on the navy tint so it reads
# as the "checked off" state the site already uses for completed things.
ICON = {
    'learn': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v6"/></svg>',
    'practice': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5 3 3 0 0 0 1 5.5V19a2.5 2.5 0 0 0 4.5 1.5"/><path d="M14.5 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5 3 3 0 0 1-1 5.5V19a2.5 2.5 0 0 1-4.5 1.5"/><path d="M12 4v16"/></svg>',
    'apply': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a4 4 0 0 0 8 0v-1"/><circle cx="18" cy="12" r="2.5"/></svg>',
    'check': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    'play': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l14 8-14 8z"/></svg>',
    'book': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
    'notes': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h11l4 4v14H5z"/><path d="M15 3v5h5"/><path d="M9 12h6M9 16h4"/></svg>',
    'list': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    'pen': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7a2.8 2.8 0 0 0-4-4l-7 7-1 5z"/><path d="M4 20h6"/></svg>',
    'cards': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/></svg>',
    'graph': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V4"/><path d="M4 20h16"/><path d="M7 15l4-5 3 3 5-7"/></svg>',
    'flask': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7 15h10"/></svg>',
    'chart': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 14l2 2 4-4"/></svg>',
    'talk': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
    'target': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    'upload': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 20h16"/></svg>',
}

CSS_V3 = V2.CSS + '''
/* ---------- four stage page, Sep 12 2026 ---------- */
/* the orientation card */
.orient{margin:22px 0 0;background:var(--card);border-radius:14px;box-shadow:var(--shadow);padding:20px 22px 18px}
.orient .bq-l{font-size:11.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--maroon);margin:0 0 6px}
.orient .bq{font-family:var(--display);font-weight:800;font-size:clamp(19px,2.6vw,24px);line-height:1.25;color:var(--navy);max-width:34ch;margin:0}
.orient .facts{display:flex;flex-wrap:wrap;gap:6px 22px;margin:12px 0 0;font-size:15px;color:var(--muted)}
.orient .facts b{color:var(--navy)}
.map{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.map li{display:flex;align-items:center;gap:8px}
.map li+li::before{content:"\\2192";color:var(--faint);font-weight:800;font-size:18px;margin-right:2px}
.map a{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:6px 14px 6px 8px;border-radius:999px;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:.06em;text-transform:uppercase;
  color:var(--navy);background:#fff;border:1.5px solid var(--rule-soft);transition:background 160ms ease,color 160ms ease}
.map a .dot{width:26px;height:26px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;background:var(--sc);flex:none}
.map a .dot svg{width:15px;height:15px;stroke:var(--si)}
.map a:hover{background:var(--navy-tint)}
.why{margin:14px 0 0;padding:12px 16px;border-radius:10px;background:var(--navy-tint);font-size:15.5px;color:var(--ink);display:flex;gap:12px;align-items:flex-start}
.why .who{flex:none;font-family:var(--display);font-weight:800;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--maroon);padding-top:3px;white-space:nowrap}
.why p{margin:0}

/* the shelves */
.shelf{margin:34px 0 0;scroll-margin-top:16px}
.shelf .head{display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap}
@media (max-width:640px){.shelf .head>div{flex:1 1 200px}.shelf .tag{margin-left:64px;align-self:flex-start}}
.shelf .sico{width:50px;height:50px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:var(--sc);flex:none}
.shelf .sico svg{width:25px;height:25px;stroke:var(--si)}
.shelf h2{font-size:24px;color:var(--navy);line-height:1.15}
.shelf h2 .stg{display:block;font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--sc2,var(--sc));margin:0 0 3px}
.shelf .purpose{color:var(--muted);font-size:16px;margin:4px 0 0;max-width:66ch}
.shelf .tag{display:inline-block;margin:0 0 0 auto;align-self:center;font-family:var(--display);font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:5px 10px;border-radius:6px;white-space:nowrap}
.shelf.free .tag{background:var(--navy-tint);color:var(--navy)}
.shelf.graded .tag{background:var(--navy);color:#fff}
.shelf.learn{--sc:#8B3A2E;--si:#fff}
.shelf.practice{--sc:#0B1530;--si:#fff}
.shelf.apply{--sc:#C9A14A;--si:#0B1530;--sc2:#8A6D33}
.shelf.check{--sc:#ECEFF4;--si:#0B1530;--sc2:#0B1530}
.shelf.check .sico{border:2px solid #0B1530}
.sub{font-size:11.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--faint);margin:18px 0 8px}

/* the colored tool cards, from door-study.html */
.tools{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));margin:14px 0 0;padding:0;list-style:none}
.tools li{margin:0;display:flex}
a.tool{position:relative;display:flex;flex-direction:column;width:100%;text-decoration:none;color:inherit;background:var(--card);border:1px solid var(--rule-soft);border-radius:14px;
  padding:22px 20px 18px;box-shadow:var(--shadow);overflow:hidden;transition:transform 200ms ease,box-shadow 200ms ease}
a.tool:hover{transform:translateY(-2px);box-shadow:var(--lift)}
a.tool::before{content:'';position:absolute;left:0;right:0;top:0;height:5px;background:var(--tab)}
a.tool{--accent:#0B1530;--tab:#0B1530;--ink2:#fff}
a.tool.c-navy{--accent:#0B1530;--tab:#0B1530;--ink2:#fff}
a.tool.c-maroon{--accent:#8B3A2E;--tab:#8B3A2E;--ink2:#fff}
a.tool.c-gold{--accent:#C9A14A;--tab:#B0871F;--ink2:#0B1530}
a.tool.c-check{--accent:#ECEFF4;--tab:#0B1530;--ink2:#0B1530}
a.tool.c-check .ico{border:2px solid #0B1530}
.ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:2px 0 12px;flex:0 0 auto;background:var(--accent)}
.ico svg{width:22px;height:22px;display:block;stroke:var(--ink2)}
a.tool h3{font-size:18px;color:var(--navy);margin:0 0 5px;line-height:1.25}
a.tool p{font-size:15px;color:var(--muted);margin:0}
a.tool .np{display:inline-block;margin-top:10px;font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--maroon);border:1px solid var(--maroon);border-radius:99px;padding:3px 10px;align-self:flex-start}
a.tool .go{margin-top:auto;padding-top:12px;font-weight:800;color:var(--maroon);font-size:15px}

/* the hero card: Dr. Rennie teaching. Bigger than every other card on the page. */
.tools li.herow{grid-column:1/-1}
a.tool.hero{flex-direction:row;align-items:center;gap:20px;padding:24px 24px 22px}
a.tool.hero .hb{flex:1;min-width:0}
a.tool.hero .ico{width:64px;height:64px;border-radius:16px;margin:0}
a.tool.hero .ico svg{width:32px;height:32px}
a.tool.hero h3{font-size:clamp(20px,2.8vw,26px);margin:0 0 6px}
a.tool.hero p{font-size:16.5px;max-width:64ch}
a.tool.hero .go{margin:0;flex:none;white-space:nowrap;display:inline-flex;align-items:center;min-height:44px;padding:8px 18px;border-radius:999px;background:var(--accent);color:var(--ink2);font-size:15px}
a.tool.hero.c-check .go{background:var(--navy);color:#fff}
a.tool.hero:hover .go{filter:brightness(.92)}
@media (max-width:700px){a.tool.hero{flex-direction:column;align-items:flex-start}a.tool.hero .go{margin:12px 0 0}}

/* the supporting row under a hero: smaller, quieter cards */
.tools.small{grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr))}
.tools.small a.tool{padding:16px 16px 14px}
.tools.small .ico{width:36px;height:36px;border-radius:10px;margin-bottom:10px}
.tools.small .ico svg{width:18px;height:18px}
.tools.small a.tool h3{font-size:16px}
.tools.small a.tool p{font-size:14px}
.tools.small a.tool::before{height:4px}

/* done when */
.done{margin:34px 0 0;background:var(--card);border-radius:14px;box-shadow:var(--shadow);padding:20px 22px 18px;border-left:0}
.done .head{display:flex;gap:12px;align-items:center}
.done .sico{width:44px;height:44px;border-radius:12px;background:var(--navy);display:flex;align-items:center;justify-content:center;flex:none}
.done .sico svg{width:24px;height:24px;stroke:#fff}
.done h2{font-size:22px;color:var(--navy)}
.done .lede{color:var(--muted);font-size:15.5px;margin:4px 0 0}
.done ul{list-style:none;margin:14px 0 0;padding:0}
.done li{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid var(--rule-soft);font-size:16px}
.done li:first-child{border-top:0;padding-top:4px}
.done .box{flex:none;width:22px;height:22px;border:2px solid var(--navy);border-radius:6px;margin-top:2px}
.done li .when{margin-left:auto;color:var(--faint);font-size:14.5px;white-space:nowrap;padding-top:2px}
.done li.rec .box{border-style:dashed}
.done li.rec{color:var(--muted)}
.done .fine{font-size:14px;color:var(--faint);margin:12px 0 0}
@media (max-width:600px){.done li{flex-wrap:wrap}.done li .when{margin-left:34px}}
@media (forced-colors:active){a.tool,.orient,.done,.why{border:1px solid CanvasText}.shelf .sico,.ico,.map a .dot{border:1px solid CanvasText}}
@media print{a.tool{box-shadow:none;border:1px solid #000;break-inside:avoid}a.tool.hero .go{background:#fff;color:#000;border:1px solid #000}.map a{border-color:#000}}
/* ---------- SOLID variant: the cards are filled with the stage color, like the front doors ---------- */
body.solid a.tool{background:var(--accent);color:var(--ink2);border-color:transparent}
body.solid a.tool::before{display:none}
body.solid a.tool h3{color:var(--ink2)}
body.solid a.tool p{color:var(--ink2);opacity:.92}
body.solid a.tool .ico{background:rgba(255,255,255,.18)}
body.solid a.tool.c-gold .ico,body.solid a.tool.c-check .ico{background:rgba(11,21,48,.10)}
body.solid a.tool .np{color:var(--ink2);border-color:currentColor;opacity:.95}
body.solid a.tool .go{color:var(--ink2)}
body.solid a.tool.hero .go{background:#fff;color:var(--accent)}
body.solid a.tool.hero.c-gold .go,body.solid a.tool.hero.c-check .go{background:var(--navy);color:#fff}
body.solid a.tool.c-check{background:#ECEFF4;color:#0B1530;border:1.5px solid #0B1530}
body.solid a.tool.c-check .ico{border:2px solid #0B1530;background:#fff}
body.solid a.tool:focus-visible{outline:3px solid var(--navy);outline-offset:3px;box-shadow:0 0 0 3px #fff}
body.solid a.tool.c-navy:focus-visible{outline-color:var(--maroon)}
@media print{body.solid a.tool{background:#fff;color:#000}body.solid a.tool h3,body.solid a.tool p{color:#000}}
/* ---------- MIX (the default): the four hero cards are solid in the stage color, the supporting cards stay white with the colored tile ---------- */
:is(body.mix a.tool.hero,body.mix a.tool.lead){background:var(--accent);color:var(--ink2);border-color:transparent}
:is(body.mix a.tool.hero,body.mix a.tool.lead)::before{display:none}
:is(body.mix a.tool.hero,body.mix a.tool.lead) h3{color:var(--ink2)}
:is(body.mix a.tool.hero,body.mix a.tool.lead) p{color:var(--ink2);opacity:.92}
:is(body.mix a.tool.hero,body.mix a.tool.lead) .ico{background:rgba(255,255,255,.18)}
:is(body.mix a.tool.hero,body.mix a.tool.lead).c-gold .ico,:is(body.mix a.tool.hero,body.mix a.tool.lead).c-check .ico{background:rgba(11,21,48,.10)}
:is(body.mix a.tool.hero,body.mix a.tool.lead) .np{color:var(--ink2);border-color:currentColor;opacity:.95}
:is(body.mix a.tool.hero,body.mix a.tool.lead) .go{color:var(--ink2)}
:is(body.mix a.tool.hero,body.mix a.tool.lead) .go{background:#fff;color:var(--accent)}
:is(body.mix a.tool.hero,body.mix a.tool.lead).c-gold .go,:is(body.mix a.tool.hero,body.mix a.tool.lead).c-check .go{background:var(--navy);color:#fff}
:is(body.mix a.tool.hero,body.mix a.tool.lead).c-check{background:#ECEFF4;color:#0B1530;border:1.5px solid #0B1530}
:is(body.mix a.tool.hero,body.mix a.tool.lead).c-check .ico{border:2px solid #0B1530;background:#fff}
:is(body.mix a.tool.hero,body.mix a.tool.lead):focus-visible{outline:3px solid var(--navy);outline-offset:3px;box-shadow:0 0 0 3px #fff}
:is(body.mix a.tool.hero,body.mix a.tool.lead).c-navy:focus-visible{outline-color:var(--maroon)}
@media print{:is(body.mix a.tool.hero,body.mix a.tool.lead){background:#fff;color:#000}:is(body.mix a.tool.hero,body.mix a.tool.lead) h3,:is(body.mix a.tool.hero,body.mix a.tool.lead) p{color:#000}}

/* the solid cards carry the front door shadow, so they sit up off the page like the doors do */
:is(body.mix a.tool.hero,body.mix a.tool.lead,body.solid a.tool){border-radius:18px;box-shadow:0 14px 30px rgba(4,7,17,.20)}
:is(body.mix a.tool.hero,body.mix a.tool.lead,body.solid a.tool):hover{transform:translateY(-5px);box-shadow:0 26px 50px rgba(4,7,17,.30)}
:is(body.mix a.tool.hero,body.mix a.tool.lead,body.solid a.tool) .ico{background:rgba(255,255,255,.18)}
:is(body.mix a.tool.hero.c-gold,body.mix a.tool.lead.c-gold,body.mix a.tool.hero.c-check,body.solid a.tool.c-gold,body.solid a.tool.c-check) .ico{background:rgba(11,21,48,.10)}
a.tool.hero .go{text-transform:uppercase;letter-spacing:.1em;font-size:13.5px}
@media (prefers-reduced-motion:reduce){:is(body.mix a.tool.hero,body.mix a.tool.lead,body.solid a.tool):hover{transform:none}}
'''



def card(href, color, icon, title, blurb, main=False, go=None, ext_=False, np=None, lead=False):
    tgt = ' target="_blank" rel="noopener"' if ext_ else ' target="_top"'
    sr = '<span class="vh"> (opens in a new tab)</span>' if ext_ else ''
    body = '<h3>%s%s</h3><p>%s</p>%s' % (title, sr, blurb, ('<span class="np">%s</span>' % np) if np else '')
    if main:
        body = '<span class="hb">' + body + '</span>'
    return ('<li%s><a class="tool %s%s%s" href="%s"%s>'
            '<span class="ico" aria-hidden="true">%s</span>'
            '%s%s</a></li>'
            % (' class="herow"' if main else '', color, ' hero' if main else '', ' lead' if lead else '', href, tgt, ICON[icon], body,
               ('<span class="go">%s</span>' % go) if go else ''))


def page(n, opens, closes, title, part, solid=False):
    nn = '%02d' % n
    c = D['comp'][str(n)]
    lab = D['lab'][str(n)]
    reading = D['reading'][n - 1]
    enc = D['encounter'].get(str(n), '')
    close = dt.date.fromisoformat(closes)
    sunday = close.weekday() == 6
    fri = close - dt.timedelta(days=2)
    close_s = close.strftime('%A, %B ') + str(close.day)
    close_short = ('Sunday' if sunday else close.strftime('%A')) + ' 10 pm'
    fri_short = 'Friday 10 pm'
    prev_ = 'week-%02d.html' % (n - 1) if n > 1 else None
    next_ = 'week-%02d.html' % (n + 1) if n < 15 else None
    has_prompts = os.path.exists('week-%s-notesheet-prompts.html' % nn)
    cv = CANVAS.get(n, {})
    bigq = BIG_Q.get(n, '')

    # ---- LEARN ----
    learn_hero = card('lecture-week.html?week=%d' % n, 'c-maroon', 'learn', 'Learn It With Dr. Rennie',
                      'Start here. I will walk you through this week\'s big physiological problem and show you how to think through the important concepts. The lectures are short and in order.',
                      main=True, go='Start the lectures &rarr;')
    learn_sub = (card('week-%s-notes.html' % nn, 'c-maroon', 'notes', 'Notes', 'The written version of what I teach, for reading and rereading.')
                 + card('week-%s-competencies.html' % nn, 'c-maroon', 'list', 'Competencies', '%d this week. Each one is a single thing you will be able to do.' % c)
                 + card('sheets/BIO005-note-sheet-week-%s.pdf' % nn, 'c-maroon', 'pen', 'Note sheet', 'One box per competency. Pass 1 from the book, pass 2 from the lectures, in a second color.')
                 + (card('week-%s-notesheet-prompts.html' % nn, 'c-maroon', 'notes', 'Note sheet questions', 'The prompt for each box, on screen.') if has_prompts else '')
                 + card('https://openstax.org/details/books/anatomy-and-physiology-2e', 'c-maroon', 'book', 'OpenStax, free extra', 'A second explanation when you want one. Silverthorn is the required text.', ext_=True))

    # ---- PRACTICE ----
    practice = (card('competency-brain-dump.html', 'c-navy', 'practice', 'Try It From Memory',
                     'Do not look anything up yet. See what your brain can produce. What you forget tells you what needs another pass.',
                     main=True, go='Open a brain dump &rarr;')
                + card('note-sheet.html?week=%d' % n, 'c-navy', 'pen', 'Note sheet, second pass', 'Back into the same boxes in a second color, after the lectures.')
                + card('mastery-canvas.html', 'c-navy', 'pen', 'Draw it', 'A blank canvas. Mechanism, sequence, loop. Produce it from nothing, then check it.')
                + card('mastery-physio-os-standalone.html', 'c-navy', 'cards', 'Recall cards', 'Spaced recall with the full reason every answer is right or wrong.')
                + card('assignment-bookproblems.html?week=%d' % n, 'c-navy', 'graph', 'Book problems', 'Problems you have not seen. Predict, commit, then check.')
                + (card('worksheet-week02-graphing.html', 'c-navy', 'graph', 'Graphing worksheet', 'Three figures to read and answer by hand.') if n == 2 else '')
                + card('ungraded-sheet.html?week=%d' % n, 'c-navy', 'list', 'All of it on one sheet', 'Every practice item for the week on one printable page.'))

    # ---- APPLY ----
    if lab['kind'] == 'physioex':
        labname = lab['name'].replace('&amp;', 'and')
        lab_cards = card('assignment-physioex.html?week=%d' % n, 'c-gold', 'flask', 'Lab: ' + labname.split(',')[0],
                         labname.split(',', 1)[1].strip() + '. What to run, what to record, and the clinical correlation.' if ',' in labname else 'What to run, what to record, and the clinical correlation.',
                         np='Investigate It &middot; 25%', lead=True)
        if lab['sheet']:
            lab_cards += card(lab['sheet'][0], 'c-gold', 'flask', (lambda t: t[0].upper() + t[1:])(lab['sheet'][1].replace('Open the ', '').replace('Open your ', '').replace(' iv ', ' IV ')), lab.get('corr', '') or 'The case that goes with this lab.')
        lab_cards += card('lab-report-form.html', 'c-gold', 'chart', 'Lab analysis sheet', 'Where your PhysioEx results and your interpretation go.')
    else:
        lab_cards = card(lab['sheet'][0] if lab['sheet'] else 'door-lab.html', 'c-gold', 'flask', lab['name'].replace('Dry lab: ', ''), lab.get('corr', '') or 'Prediction first, then the data.', np='Investigate It &middot; 25%', lead=True)
    if cv.get('lab'):
        lab_cards += card(cv['lab'], 'c-gold', 'upload', 'Turn the lab in', 'Canvas. Due %s.' % close_short, ext_=True)
    apply_cards = (card('assignment-apply.html?week=%d' % n, 'c-gold', 'apply', 'Patient chart: ' + enc,
                        'Your patient, this week\'s entry. Use the physiology you just learned to read what is happening to her.', np='Use It &middot; 25%', lead=True)
                   + card('BIO005-patient-file.html', 'c-gold', 'notes', 'Patient file', 'The running file. Every week adds a page.'))
    if n == 1:
        disc_cards = (card('assignment-discussion-01-visionboard.html', 'c-gold', 'talk', 'Discussion 1A: Digital Vision Board', 'Who you are, and a short video introduction.', np='Think About It &middot; 15%', lead=True)
                      + card('assignment-discussion-01-metacognition.html', 'c-gold', 'talk', 'Discussion 1B: Week 1 Metacognitive Analysis', 'What the evidence told you about how you learned this week.', np='Think About It &middot; 15%', lead=True))
    else:
        disc_cards = card('assignment-discussion.html?week=%d' % n, 'c-gold', 'talk', 'Discussion %d' % n, 'Something from this week\'s physiology, and your honest thinking about it. Post by Friday, replies by Sunday.', np='Think About It &middot; 15%', lead=True)

    # ---- CHECK ----
    check = (card('practice-exam.html?week=%d' % n, 'c-check', 'target', 'Build your check',
                  'Thirty questions on this week\'s competencies, nothing open. You get a score and the exact competencies to go back to.',
                  main=True, go='Start a check &rarr;')
             + card('week-%s-competencies.html' % nn, 'c-check', 'list', 'Competency checklist', 'Tick the ones you can do from memory. The blanks are your list for another pass.')
             + card('assignment-practice-log.html', 'c-check', 'upload', 'Upload your report', 'Do one check or ten. Send me the report so I can see how you are trending and reach out if I should.')
             + (card(cv['log'], 'c-check', 'upload', 'Upload it in Canvas', 'Where the report goes.', ext_=True) if cv.get('log') else ''))

    # ---- done when ----
    if n == 1:
        disc_done = ('<li><span class="box" aria-hidden="true"></span><span>Discussion 1A posted in Canvas, with your video introduction</span><span class="when">%s</span></li>'
                     '<li><span class="box" aria-hidden="true"></span><span>Discussion 1B posted, and two replies</span><span class="when">%s</span></li>') % (close_short, close_short)
    else:
        disc_done = ('<li><span class="box" aria-hidden="true"></span><span>Discussion %d: your post</span><span class="when">%s</span></li>'
                     '<li><span class="box" aria-hidden="true"></span><span>Discussion %d: two replies</span><span class="when">%s</span></li>') % (n, fri_short if sunday else close_short, n, close_short)
    labdone = ('Lab turned in: ' + (lab['name'].replace('&amp;', 'and').split(',')[0] if lab['kind'] == 'physioex' else lab['name'].replace('Dry lab: ', '').split(':')[0]))
    done = ('<li><span class="box" aria-hidden="true"></span><span>%s</span><span class="when">%s</span></li>' % (labdone, close_short)
            + '<li><span class="box" aria-hidden="true"></span><span>Patient chart entry: %s</span><span class="when">%s</span></li>' % (enc, close_short)
            + disc_done
            + '<li class="rec"><span class="box" aria-hidden="true"></span><span>Practice exam report uploaded (no points, but I read every one)</span><span class="when">%s</span></li>' % close_short)

    opens_note = ''
    if n > 1:
        opens_note = ('<p class="opens" id="opensNote" hidden><b>This week opens %s at 8:00 am Pacific.</b> Everything here is yours to look at now.</p>' % long(opens))
    intro = V2.build_intro() if n == 1 else ''

    bq_block = ('<p class="bq-l">This week\'s big question</p><p class="bq">%s</p>' % bigq) if bigq else ''

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Week {n} &middot; {title} &middot; BIO 005 Human Physiology</title>
<meta name="description" content="BIO 005 Week {n}: {title}. Learn, practice, apply, check.">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<link rel="stylesheet" href="assets/brandbar.css">
<!-- Generated by tools/gen_week_pages_v3.py, the four stage page. Edit the generator, not this file. -->
<style>{CSS_V3}</style>
</head>
<body data-opens="{opens}" class="{'solid' if solid else 'mix'}">
<a class="skip" href="#main">Skip to this week</a>
{BRAND}

<main id="main"><div class="wrap">
  <header class="top">
    <p class="eyebrow">{PART[part]} &middot; Week {n} of 15</p>
    <h1>{title}</h1>
    {opens_note}
  </header>

  {intro}
  <section class="orient" aria-labelledby="orient-h">
    <h2 id="orient-h" class="vh">This week at a glance</h2>
    {bq_block}
    <p class="facts"><span><b>{c} competencies</b>, the same for everyone</span><span>Reading: <b>{reading.rstrip('.')}</b></span><span>Everything due <b>{close_s}, 10 pm Pacific</b></span></p>
    <ol class="map" aria-label="The four stages, in order">
      <li><a href="#learn" style="--sc:#8B3A2E;--si:#fff"><span class="dot" aria-hidden="true">{ICON['learn']}</span>Learn</a></li>
      <li><a href="#practice" style="--sc:#0B1530;--si:#fff"><span class="dot" aria-hidden="true">{ICON['practice']}</span>Practice</a></li>
      <li><a href="#apply" style="--sc:#C9A14A;--si:#0B1530"><span class="dot" aria-hidden="true">{ICON['apply']}</span>Apply</a></li>
      <li><a href="#check" style="--sc:#ECEFF4;--si:#0B1530"><span class="dot" aria-hidden="true">{ICON['check']}</span>Check</a></li>
    </ol>
    <div class="why"><span class="who">Dr. Rennie</span><p>I will teach you the major concepts first. Then you will practice getting them back, use them to solve a physiological problem, and check what still needs work before it costs you points.</p></div>
  </section>

  <section class="shelf learn free" id="learn" aria-labelledby="learn-h">
    <div class="head"><span class="sico" aria-hidden="true">{ICON['learn']}</span>
      <div><h2 id="learn-h"><span class="stg">Stage 1 of 4</span>Learn</h2><p class="purpose">This is where I teach you what you need to understand. Watch first; everything under it helps you deepen what I taught.</p></div>
      <span class="tag">No points</span></div>
    <ul class="tools" aria-label="Learn">{learn_hero}</ul>
    <p class="sub">Build the details</p>
    <ul class="tools small" aria-label="Supporting material">{learn_sub}</ul>
  </section>

  <section class="shelf practice free" id="practice" aria-labelledby="practice-h">
    <div class="head"><span class="sico" aria-hidden="true">{ICON['practice']}</span>
      <div><h2 id="practice-h"><span class="stg">Stage 2 of 4</span>Practice</h2><p class="purpose">Try getting it back and working with it while mistakes are still useful. This is part of learning, not a test. Pick the ones that suit you.</p></div>
      <span class="tag">No points</span></div>
    <ul class="tools" aria-label="Practice">{practice}</ul>
  </section>

  <section class="shelf apply graded" id="apply" aria-labelledby="apply-h">
    <div class="head"><span class="sico" aria-hidden="true">{ICON['apply']}</span>
      <div><h2 id="apply-h"><span class="stg">Stage 3 of 4</span>Apply</h2><p class="purpose">Now use what you learned. This is where the physiology becomes a patient, a lab result, a decision. These three are graded and are the same for everyone.</p></div>
      <span class="tag">Graded</span></div>
    <p class="sub">The lab</p>
    <ul class="tools" aria-label="Lab">{lab_cards}</ul>
    <p class="sub">Your patient</p>
    <ul class="tools" aria-label="Patient chart">{apply_cards}</ul>
    <p class="sub">The discussion</p>
    <ul class="tools" aria-label="Discussion">{disc_cards}</ul>
  </section>

  <section class="shelf check free" id="check" aria-labelledby="check-h">
    <div class="head"><span class="sico" aria-hidden="true">{ICON['check']}</span>
      <div><h2 id="check-h"><span class="stg">Stage 4 of 4</span>Check</h2><p class="purpose">Find the gaps now, before they cost you points. Nothing here is graded. A low score is information, and it tells you exactly which competency to go back to.</p></div>
      <span class="tag">No points</span></div>
    <ul class="tools" aria-label="Check">{check}</ul>
  </section>

  <section class="done" aria-labelledby="done-h">
    <div class="head"><span class="sico" aria-hidden="true">{ICON['check']}</span>
      <div><h2 id="done-h">You're done with Week {n} when&hellip;</h2><p class="lede">Everything goes in through Canvas. Times are Pacific.</p></div></div>
    <ul>{done}</ul>
    <p class="fine">The dashed one is not graded. It is the one thing I ask for so I can see how you are doing and reach out if I should.</p>
  </section>

  <nav class="nextrow" aria-label="Other weeks">
    {('<a class="btn" href="%s" target="_top">&larr; Week %d</a>' % (prev_, n - 1)) if prev_ else ''}
    <a class="btn" href="course-schedule.html" target="_top">All fifteen weeks</a>
    {('<a class="btn" href="%s" target="_top">Week %d &rarr;</a>' % (next_, n + 1)) if next_ else ''}
  </nav>
</div></main>

{FOOT}

<script>
(function(){{
  /* Show the opening note only before the week opens (its Monday, 8:00 am Pacific). */
  var o = document.getElementById('opensNote'); if (!o) return;
  var p = document.body.getAttribute('data-opens').split('-');
  var mon = Date.UTC(+p[0], +p[1]-1, +p[2]);
  var off = (mon < Date.UTC(2026,10,1,9)) ? 7 : 8;
  if (Date.now() < mon + (8+off)*3600000) o.hidden = false;
}})();
(function(){{
  var f = document.getElementById('introFrame'); if (!f) return;
  var base = f.getAttribute('src').split('?')[0];
  var btns = document.querySelectorAll('.chap button');
  [].forEach.call(btns, function(b){{
    b.addEventListener('click', function(){{
      f.src = base + '?t=' + b.getAttribute('data-t') + '&autoplay=1';
      [].forEach.call(btns, function(x){{ x.removeAttribute('aria-current'); }});
      b.setAttribute('aria-current', 'true');
      f.focus();
    }});
  }});
}})();
(function(){{var id='bio005-week-{nn}';
function post(){{try{{parent.postMessage({{frame:id,id:id,height:document.documentElement.scrollHeight}},'*');}}catch(e){{}}}}
if('ResizeObserver' in window){{new ResizeObserver(post).observe(document.documentElement);}}
window.addEventListener('load',post);window.addEventListener('resize',post);post();}})();
</script>
<script src="bio005-nav.js" defer></script>
<script src="schedule-fall2026.js"></script>
<script src="hootie.js"></script>
<script src="bio005-back.js"></script>
</body>
</html>
'''
    return html


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    live = '--live' in sys.argv
    solid = '--solid' in sys.argv
    weeks = [int(x) for x in args] or [3]
    for w in WEEKS:
        if w[0] not in weeks: continue
        out = ('week-%02d.html' if live else ('prototype-week-%02d-solid.html' if solid else 'prototype-week-%02d.html')) % w[0]
        open(out, 'w', encoding='utf-8').write(page(*w, solid=solid))
        print('wrote', out)


# ---------------------------------------------------------------------------
# doors.html: THE CANVAS ENTRY PAGE. Four doors, the four stages of the
# current week. Sep 12 2026, Scrubs: "the four doors should be the four
# stages we just built and we will put that on the main entry page."
# Framed in Canvas; every link target="_top". Reads the current week from
# bio005-nav.js (loaded with the site nav switched off) so it always points
# at this week's page and its Learn / Practice / Apply / Check sections.
# ---------------------------------------------------------------------------
DOORS = [
    ('learn', 'Learn', 'Learn It With Dr. Rennie', 'Start here. I teach you this week\'s big physiological problem and how to think through the important concepts. Then the notes and reading, to build the details.', 'Start with the lectures', '#8B3A2E', '#FFFFFF', ''),
    ('practice', 'Practice', 'Try It From Memory', 'Get it back without looking. Brain dumps, drawing, recall cards, book problems. Mistakes here are useful and none of it is graded.', 'Open Practice', '#0B1530', '#FFFFFF', ''),
    ('apply', 'Apply', 'Use What You Learned', 'The lab, your patient\'s chart, and the discussion. This is where the physiology becomes a patient, a result, a decision. These three are graded.', 'Open Apply', '#C9A14A', '#0B1530', ' light'),
    ('check', 'Check', 'Find the Gaps', 'A thirty question check on this week\'s competencies, and the checklist. Nothing here is graded. A low score tells you exactly what to go back to.', 'Open Check', '#ECEFF4', '#0B1530', ' light check'),
]


def doors():
    cards = ''
    for key, stage, title, blurb, go, bg, fg, extra in DOORS:
        cards += ('<li><a class="cat%s" data-stage="%s" href="week-01.html#%s" target="_top" style="--bg:%s;--fg:%s">'
                  '<span class="ic" aria-hidden="true">%s</span>'
                  '<span class="stg">%s</span><h3>%s</h3><p>%s</p>'
                  '<span class="go">%s <span class="arr" aria-hidden="true">&rarr;</span></span></a></li>'
                  % (extra, key, key, bg, fg, ICON[key], stage, title, blurb, go))
    bigq_js = '{' + ','.join('%d:%s' % (k, repr(v)) for k, v in BIG_Q.items()) + '}'
    return f'''<!DOCTYPE html>
<html lang="en" data-site-nav="off">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BIO 005 Human Physiology, this week</title>
<meta name="description" content="BIO 005 Human Physiology at Yuba College, Fall 2026. This week's four stages: Learn, Practice, Apply, Check.">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<!--
  BIO 005 Human Physiology, Fall 2026, Yuba College
  doors.html, THE CANVAS ENTRY PAGE. Generated by tools/gen_week_pages_v3.py
  (the doors() function). Edit the generator, not this file.

  Four doors, the four stages of the current week: Learn, Practice, Apply,
  Check. Same colors and icons as the week pages, so the door a student
  opens here is the shelf they land on. The current week comes from
  bio005-nav.js at load; the site nav itself is switched off on this page
  because Canvas is the frame around it.
-->
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
:root{{--ink:#0B1530;--rust:#8B3A2E;--gold:#C9A14A;--page:#FAFAF9;--muted:#414B5C;
  --rest:0 14px 30px rgba(4,7,17,.20);--lift:0 26px 50px rgba(4,7,17,.30);
  --display:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
  --body:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif}}
html,body{{font-size:17.5px;line-height:1.55}}
body{{font-family:var(--body);background:var(--page);color:var(--ink);-webkit-font-smoothing:antialiased}}
em,i{{font-style:normal;font-weight:700}}
a{{color:inherit;text-decoration:none}}
:focus-visible{{outline:3px solid var(--rust);outline-offset:3px;border-radius:6px}}
.skip{{position:absolute;left:-9999px;top:0;z-index:100;background:var(--ink);color:#FFF;padding:12px 18px;border-radius:0 0 8px 0;font-size:14px;font-weight:700}}
.skip:focus{{left:0}}
.vh{{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}}
.wrap{{max-width:1120px;margin:0 auto;padding:0 max(24px,4vw)}}
.site-header{{padding:22px 0 18px;border-bottom:.5px solid rgba(4,7,17,.12);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}}
.logo{{display:inline-flex;align-items:center;gap:14px}}
.logo svg{{height:46px;width:auto}}
.logo .t{{font-family:var(--display);font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1;display:block}}
.logo .t .a{{color:var(--rust)}}
.logo .s{{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;opacity:.72;display:block;margin-top:3px}}
.pills{{display:flex;flex-wrap:wrap;gap:8px}}
.pills a{{display:inline-flex;align-items:center;min-height:40px;padding:8px 16px;border:1.5px solid rgba(4,7,17,.30);border-radius:999px;font-size:12.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}}
.pills a:hover{{border-color:var(--rust);color:var(--rust)}}

.hero{{padding:34px 0 6px;max-width:820px}}
.eyebrow{{font-size:12px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--rust);margin:0 0 12px;display:flex;align-items:center;gap:10px}}
.eyebrow::before{{content:"";width:26px;height:2px;background:var(--rust)}}
.ph{{font-family:var(--display);font-size:clamp(30px,4.6vw,46px);font-weight:800;letter-spacing:-.025em;line-height:1.08;margin:0 0 12px}}
.ph .a{{color:var(--rust)}}
.bq{{font-size:18px;color:var(--muted);margin:0;max-width:60ch}}
.bq b{{color:var(--ink)}}
.due{{margin:12px 0 0;font-size:15px;color:var(--muted)}}
.due b{{color:var(--ink)}}

.cats{{list-style:none;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;padding:30px 0 8px}}
@media (min-width:1000px){{.cats{{grid-template-columns:repeat(4,minmax(0,1fr))}}}}
@media (max-width:560px){{.cats{{grid-template-columns:1fr}}}}
.cat{{position:relative;display:flex;flex-direction:column;gap:10px;background:var(--bg);color:var(--fg);border-radius:18px;padding:26px 24px;
  box-shadow:var(--rest);transition:transform .22s ease,box-shadow .22s ease;min-height:230px;width:100%;height:100%}}
.cat:hover{{transform:translateY(-6px);box-shadow:var(--lift)}}
.cat:focus-visible{{outline:3px solid var(--fg);outline-offset:-5px;border-radius:18px}}
.cat.check{{border:2px solid var(--ink)}}
.cat .ic{{width:54px;height:54px;border-radius:14px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;flex:0 0 auto}}
.cat.light .ic{{background:rgba(11,21,48,.12)}}
.cat.check .ic{{background:#fff;border:2px solid var(--ink)}}
.cat .ic svg{{width:28px;height:28px;stroke:var(--fg)}}
.cat .stg{{font-size:11.5px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;opacity:.85}}
.cat h3{{font-family:var(--display);font-size:23px;font-weight:800;letter-spacing:-.01em;line-height:1.15;margin:0}}
.cat p{{font-size:15px;margin:0;flex:1 1 auto;line-height:1.5;opacity:.94}}
.cat .go{{margin-top:auto;font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px}}
.cat .go .arr{{transition:transform .2s}}
.cat:hover .go .arr{{transform:translateX(4px)}}
.order{{list-style:none;display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;padding:6px 0 0;font-size:13px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}}
.order li+li::before{{content:"\\2192";margin-right:10px;color:var(--gold)}}
.why{{margin:22px 0 0;padding:14px 18px;border-radius:12px;background:#ECEFF4;font-size:15.5px;display:flex;gap:12px;align-items:flex-start;max-width:820px}}
.why .who{{flex:none;font-family:var(--display);font-weight:800;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--rust);padding-top:3px;white-space:nowrap}}
footer{{padding:22px 0 36px;margin-top:30px;border-top:.5px solid rgba(4,7,17,.12);color:var(--muted);font-size:13px;font-weight:600;display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center}}
footer .sig{{color:var(--ink);font-weight:800;margin-left:auto}}

body.framed .site-header{{padding:14px 0 12px}}
body.framed .hero{{padding-top:22px}}
body.framed .cats{{padding-top:22px}}
body.framed .cat{{min-height:0;padding:22px 20px}}
@media (max-width:640px){{.cat{{min-height:0}}.logo .t{{font-size:20px}}}}
@media (prefers-reduced-motion:reduce){{*{{transition:none!important}}.cat:hover{{transform:none}}.cat:hover .go .arr{{transform:none}}}}
@media (forced-colors:active){{.cat{{border:1px solid CanvasText}}.cat .ic{{border:1px solid CanvasText}}}}
@media print{{.cat{{background:#fff!important;color:#000!important;box-shadow:none;border:1px solid #000}}.cat .ic svg{{stroke:#000}}.pills,.skip{{display:none}}}}
</style>
</head>
<body>
<a class="skip" href="#doors">Skip to the four doors</a>
<div class="wrap">
  <header class="site-header">
    <a class="logo" href="index.html" target="_top" aria-label="BIO 005 Human Physiology, course home">
      <svg viewBox="40 10 125 148" role="img" aria-hidden="true"><g transform="translate(0,18)"><g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#0B1530"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#0B1530"/></g><g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/><path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g><g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g></g></svg>
      <span><span class="t">BIO <span class="a">005</span></span><span class="s">Human Physiology &middot; Fall 2026</span></span>
    </a>
    <nav class="pills" aria-label="Course pages">
      <a href="index.html" target="_top">Course home</a>
      <a href="course-schedule.html" target="_top">All 15 weeks</a>
      <a href="syllabus-fall2026.html" target="_top">Syllabus</a>
    </nav>
  </header>

  <main id="main">
    <section class="hero">
      <p class="eyebrow" id="wk-eyebrow">This week</p>
      <h1 class="ph" id="wk-title">Learn with me, then <span class="a">practice, apply, and check.</span></h1>
      <p class="bq" id="wk-bq"></p>
      <p class="due" id="wk-due"></p>
    </section>

    <h2 id="doors" class="vh">The four stages of this week</h2>
    <ul class="cats" aria-labelledby="doors">{cards}</ul>
    <ol class="order" aria-label="The order"><li>Learn</li><li>Practice</li><li>Apply</li><li>Check</li></ol>

    <div class="why"><span class="who">Dr. Rennie</span><p>I teach the major concepts first. Then you practice getting them back, use them to solve a physiological problem, and check what still needs work before it costs you points.</p></div>
  </main>

  <footer>
    <a href="virtual-office.html" target="_top">Virtual office</a>
    <a href="https://yccd.instructure.com/courses/42616" target="_blank" rel="noopener">Canvas<span class="vh"> (opens in a new tab)</span></a>
    <a href="accessibility.html" target="_top">Accessibility</a>
    <span class="sig">Dr. Sharilyn Rennie</span>
  </footer>
</div>

<script src="bio005-nav.js"></script>
<script>
(function () {{
  var BIGQ = {bigq_js};
  var S = window.BIO005_SITE; if (!S || !S.current) return;
  var cur = S.current, n = cur.n;
  document.getElementById('wk-eyebrow').textContent = 'Week ' + n + ' of 15 \\u00B7 ' + cur.title;
  var q = BIGQ[n];
  if (q) document.getElementById('wk-bq').innerHTML = '<b>This week\\u2019s big question.</b> ' + q;
  var closes = cur.closes.split('-');
  var d = new Date(+closes[0], +closes[1] - 1, +closes[2]);
  var day = d.toLocaleDateString('en-US', {{ weekday: 'long', month: 'long', day: 'numeric' }});
  document.getElementById('wk-due').innerHTML = 'Everything graded is due <b>' + day + ' at 10:00 pm Pacific</b>.';
  [].forEach.call(document.querySelectorAll('.cat[data-stage]'), function (a) {{
    a.setAttribute('href', cur.file + '#' + a.getAttribute('data-stage'));
  }});
}}());
(function () {{
  try {{ if (window.top !== window.self) document.body.classList.add('framed'); }} catch (e) {{ document.body.classList.add('framed'); }}
  var ID = 'bio005-doors';
  function send() {{ try {{ parent.postMessage({{ id: ID, frameId: ID, frame: ID, height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) }}, '*'); }} catch (e) {{}} }}
  window.addEventListener('load', send); window.addEventListener('resize', send);
  if (window.ResizeObserver) {{ new ResizeObserver(send).observe(document.body); }}
  send();
}}());
</script>
</body>
</html>
'''


if __name__ == '__main__' and '--doors' in sys.argv:
    open('doors.html', 'w', encoding='utf-8').write(doors())
    print('wrote doors.html')
