#!/usr/bin/env python3
"""
Put the one shared nav on every page in the repo.

    python3 apply-nav.py physio/*.html          # writes in place
    python3 apply-nav.py --dry physio/*.html    # report only, change nothing

WHY
Right now the site has no consistent navigation. Of 46 pages, 21 carry no
site nav at all, and the ones that do carry five unrelated menus: in-page
section jumps on the unit pages, a unit list on the study guide, a week list
on the lab manual, a ten-item app menu on the OS page, and a four-item menu
on index. A student who learns the menu on one page learns nothing that
transfers to the next. That is WCAG 3.2.3 Consistent Navigation, a Level AA
criterion, and it is also just the thing that makes a site feel like a site.

WHAT THIS DOES, AND WHAT IT REFUSES TO DO
It inserts the shared header immediately after <body>, and the shared footer
immediately before </body>, and it marks the current page in the nav so the
gold rule lands in the right place.

It does NOT delete anything. An in-page jump menu ("Chemistry, the red box")
is real navigation for that page and belongs to it, so the shared bar goes
above it and the page keeps its own. Only a page that already carries the
shared bar is skipped, which makes this safe to run twice.

It does not touch the stylesheet. Pages that do not already load the shared
CSS get the nav markup plus a minimal scoped block so the bar still renders
correctly rather than inheriting whatever that page happens to define.
"""
import io, os, re, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('bw', os.path.join(HERE, 'build-week.py'))
bw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bw)

CSS_ALL = bw.TEMPLATE[bw.TEMPLATE.index('<style>'):bw.TEMPLATE.index('</style>') + 8].replace('%%', '%')

# Which nav item lights up for which file. Anything not listed gets no
# current-page mark rather than a wrong one.
CURRENT = {
    'index.html': 'index.html',
    'welcome.html': 'welcome.html',
    'physiology-course-home.html': 'welcome.html',
    'course-materials.html': 'course-materials.html',
    'clinical-physiology-lab-manual.html': 'clinical-physiology-lab-manual.html',
    'competency-recall.html': 'competency-recall.html',
    'competency-map.html': 'competency-recall.html',
    'competency-study-guide.html': 'competency-recall.html',
    'competency-packet.html': 'competency-recall.html',
    'guides.html': 'guides.html',
    'guide-how-to-study.html': 'guides.html',
    'guide-week-page.html': 'guides.html',
    'guide-drawing.html': 'guides.html',
    'start-here.html': 'start-here.html',
    'before-you-start.html': 'start-here.html',
    'course-entry.html': 'start-here.html',
    'course-schedule.html': 'index.html',
    'course-calendar.html': 'index.html',
    'schedule.html': 'index.html',
}
for i in range(1, 16):
    CURRENT['week-%02d.html' % i] = 'welcome.html'
for i in range(1, 6):
    CURRENT['unit-0%d.html' % i] = 'course-materials.html'

MARKER = 'data-shared-nav'

# A page that does not already load the shared stylesheet still needs enough
# CSS for the bar to render. Scoped to the bar so it cannot disturb the page.
FALLBACK = """<style data-shared-nav-css>
/* On :root, not on .sn-scope. The skip link sits outside the bar, so scoping
   the tokens to the bar left its background transparent: white on white. */
:root{--sn-navy:#040711;--sn-navy-70:rgba(4,7,17,.70);--sn-navy-15:rgba(4,7,17,.15);
  --sn-gold:#DCB45C;--sn-deep:#01030A;--sn-straw:#F2E2B8;
  --sn-font:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif}
.sn-scope *,.sn-scope *::before,.sn-scope *::after{box-sizing:border-box}
.sn-skip{position:absolute;left:-9999px;top:0;z-index:200;background:var(--sn-navy);color:#fff;
  padding:14px 18px;min-height:44px;display:flex;align-items:center;
  font:700 15px/1.2 var(--sn-font);text-decoration:none}
.sn-skip:focus{left:0;top:0}
.sn-bar{background:#fff;border-bottom:1px solid var(--sn-navy-15);font-family:var(--sn-font)}
.sn-in{max-width:1180px;margin:0 auto;padding:0 max(16px,3vw);display:flex;align-items:center;
  gap:22px;flex-wrap:wrap;min-height:62px}
.sn-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--sn-navy);padding:8px 0}
.sn-brand svg{height:30px;width:auto;display:block}
.sn-brand span{display:flex;flex-direction:column;line-height:1.1}
.sn-brand b{font-size:.94rem;font-weight:800}
.sn-brand i{font-size:.72rem;color:var(--sn-navy-70);font-weight:600;font-style:normal}
.sn-links{display:flex;flex-wrap:wrap;margin-left:auto}
.sn-links a{position:relative;font-size:.9rem;font-weight:600;color:var(--sn-navy-70);
  text-decoration:none;padding:10px 6px;margin:0 10px;min-height:44px;min-width:44px;
  display:flex;align-items:center;justify-content:center}
.sn-links a:hover{color:var(--sn-navy)}
.sn-links a:hover::after,.sn-links a[aria-current="page"]::after{content:"";position:absolute;
  left:0;right:0;bottom:7px;height:3px;border-radius:2px}
.sn-links a:hover::after{background:var(--sn-navy-15)}
.sn-links a[aria-current="page"]{color:var(--sn-navy);font-weight:800}
.sn-links a[aria-current="page"]::after{background:var(--sn-gold)}
.sn-scope :focus-visible{outline:3px solid var(--sn-navy);outline-offset:2px;
  box-shadow:0 0 0 6px var(--sn-gold);border-radius:4px}
.sn-foot{background:var(--sn-deep);color:#fff;padding:26px max(16px,3vw);margin-top:44px;
  font-family:var(--sn-font)}
.sn-foot .sn-fi{max-width:1180px;margin:0 auto;display:flex;justify-content:space-between;
  gap:18px;flex-wrap:wrap;align-items:center}
.sn-foot p{margin:0}
.sn-foot .sn-n{font-weight:800;font-size:.95rem}
.sn-foot .sn-c{font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--sn-straw)}
.sn-foot nav{display:flex;flex-wrap:wrap}
.sn-foot nav a{color:#D6DCE6;font-size:.84rem;font-weight:600;text-decoration:none;
  padding:10px 14px;min-height:44px;display:flex;align-items:center}
.sn-foot nav a:hover{color:#fff;text-decoration:underline}
@media(max-width:760px){
  .sn-bar{position:static}
  .sn-in{gap:8px;min-height:0;padding-top:8px;padding-bottom:8px}
  .sn-links{margin-left:0;width:100%}
  .sn-links a{font-size:.82rem;padding:9px 4px;margin:0 8px}
}
@media(prefers-reduced-motion:reduce){.sn-scope *{transition:none!important}}
</style>"""

ITEMS = [
    ('index.html', 'Home'),
    ('welcome.html', 'This week'),
    ('course-materials.html', 'Lecture'),
    ('clinical-physiology-lab-manual.html', 'Lab'),
    ('competency-recall.html', 'Study'),
    ('guides.html', 'Guides'),
    ('start-here.html', 'Admin'),
]

FOOT_ITEMS = [
    ('welcome.html', 'All weeks'),
    ('guides.html', 'Guides'),
    ('start-here.html', 'Syllabus'),
    ('competency-map.html', 'Competencies'),
]


def has_skip(s):
    return bool(re.search(r'class=["\'][^"\']*\bskip[\w-]*["\']', s, re.I))


def header(current, target, tag):
    links = ''.join(
        '\n      <a href="{href}" target="_top"{cur}>{label}</a>'.format(
            href=href, label=label,
            cur=' aria-current="page"' if href == current else '')
        for href, label in ITEMS)
    landing = '\n<div id="sn-main" tabindex="-1"></div>' if target == 'sn-main' else ''
    # A page that already has a skip link keeps it. Two of them means a
    # keyboard user tabs twice through near-identical controls, and it pushes
    # the page's own one out of first position, where axe stops exempting it.
    skip = ('' if target is None else
            '\n<a class="sn-skip" href="#{target}" {mark}>Skip to the main content</a>')
    return (
        skip +
        '\n<{tag} class="sn-scope sn-bar" {mark}>'
        '\n  <nav class="sn-in" aria-label="Course sections">'
        '\n    <a class="sn-brand" href="index.html" target="_top">{logo}'
        '\n      <span><b>BIO 005</b><i>Human Physiology</i></span></a>'
        '\n    <span class="sn-links">{links}'
        '\n    </span>'
        '\n  </nav>'
        '\n</{tag}>'
        '{landing}\n'
    ).format(target=target or '', mark=MARKER, tag=tag, logo=bw.LOGO,
             links=links, landing=landing)


def footer(tag):
    links = ''.join('\n      <a href="{0}" target="_top">{1}</a>'.format(h, l)
                    for h, l in FOOT_ITEMS)
    return (
        '\n<{tag} class="sn-scope sn-foot" {mark}>'
        '\n  <div class="sn-fi">'
        '\n    <div><p class="sn-n">Dr. Sharilyn Rennie</p>'
        '\n      <p class="sn-c">BIO 005 Human Physiology &middot; Fall 2026</p></div>'
        '\n    <nav aria-label="Footer">{links}'
        '\n    </nav>'
        '\n  </div>'
        '\n</{tag}>\n'
    ).format(tag=tag, mark=MARKER, links=links)


FULLSCREEN_HINTS = (
    re.compile(r'(?:html|body)\s*\{[^}]*overflow\s*:\s*hidden', re.I),
    re.compile(r'(?:html|body)\s*\{[^}]*height\s*:\s*100(?:vh|dvh)', re.I),
)


def fullscreen(name, s):
    """A slide deck or a full-viewport app pins itself to the viewport with
       position:fixed and hides overflow. Dropping a 62px bar and a footer into
       that either breaks the layout or renders it off screen where nobody can
       reach it. Those pages are left alone and reported, not guessed at. They
       are reached from the week pages, which do carry the bar."""
    if name.startswith('slides-'):
        return 'slide deck'
    if any(r.search(s) for r in FULLSCREEN_HINTS) and s.count('position:fixed') >= 6:
        return 'full-viewport app'
    return None


def skip_target(s):
    """Point the skip link at the page's own main content when it has one,
       rather than inserting a landing div it does not need."""
    m = re.search(r'<main\b[^>]*\bid=["\']([^"\']+)["\']', s, re.I)
    if m:
        return m.group(1), False
    m = re.search(r'\bid=["\'](main|content|main-content)["\']', s, re.I)
    if m:
        return m.group(1), False
    if re.search(r'<main\b', s, re.I):
        return 'sn-main-el', True   # give the page's own <main> the id
    return 'sn-main', True


def already(s):
    """True if this page carries the shared bar, in either form: the pages the
       builders generate use .mainnav, injected pages use the marker."""
    return MARKER in s or 'class="mainnav"' in s


def loads_shared_css(s):
    return '--gold-bright' in s or '--navy-70' in s


def process(path, dry):
    name = os.path.basename(path)
    s = io.open(path, encoding='utf-8', errors='replace').read()

    if already(s):
        return name, 'skipped, already has the shared bar', False
    why = fullscreen(name, s)
    if why:
        return name, 'SKIPPED, %s, the bar would break it' % why, False
    m = re.search(r'<body\b[^>]*>', s, re.I)
    if not m:
        return name, 'SKIPPED, no <body> tag', False
    if '</body>' not in s.lower():
        return name, 'SKIPPED, no closing </body>', False

    current = CURRENT.get(name)
    target, made = skip_target(s)
    if has_skip(s):
        target = None          # the page has its own skip link, leave it alone

    # Only claim the banner and contentinfo landmarks if the page has none.
    # A second <header> is a second banner, which axe flags and which makes a
    # screen reader's landmark list ambiguous.
    own_banner = re.search(r'<header\b|role=["\']banner["\']', s, re.I)
    own_foot = re.search(r'<footer\b|role=["\']contentinfo["\']', s, re.I)
    htag = 'div' if own_banner else 'header'
    ftag = 'div' if own_foot else 'footer'

    add = header(current, target, htag)
    if not loads_shared_css(s):
        add = '\n' + FALLBACK + add
        note = 'nav + footer + scoped css'
    else:
        note = 'nav + footer'
    if target is None:
        note += ' + kept its own skip link'
    note += ' [%s bar, %s]' % (htag, 'kept its own footer' if own_foot else 'footer added')

    out = s[:m.end()] + add + s[m.end():]
    if target == 'sn-main-el':
        out = re.sub(r'<main\b', '<main id="sn-main-el" tabindex="-1"', out, count=1, flags=re.I)
    i = out.lower().rindex('</body>')
    if not own_foot:
        out = out[:i] + footer('footer') + out[i:]

    if '—' in add or '–' in add:
        return name, 'SKIPPED, em dash in the injected markup', False
    if not dry:
        io.open(path, 'w', encoding='utf-8').write(out)
    return name, note + (' (current: %s)' % current if current else ' (no current page mark)'), True


def main():
    args = sys.argv[1:]
    dry = '--dry' in args
    files = [a for a in args if a != '--dry']
    if not files:
        print(__doc__)
        sys.exit(1)
    changed = 0
    for f in sorted(files):
        name, note, did = process(f, dry)
        changed += 1 if did else 0
        print('%-46s %s' % (name, note))
    print('\n%d of %d %s' % (changed, len(files), 'would change' if dry else 'changed'))


if __name__ == '__main__':
    main()
