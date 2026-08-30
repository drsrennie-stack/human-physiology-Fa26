#!/usr/bin/env python3
"""
BIO 005 guide builder.

    python3 build-guide.py guides/*.json

The guides are the part of the site that is not a week. Short articles a
student reads once and comes back to: how to study this course, how the
week page works, how to draw from memory. They exist because a course
site that is only assignments feels like a filing cabinet, and because
half of what makes this course work is method rather than content.

Shares the chrome, the stylesheet and the nav with build-week.py by
importing them, so the two cannot drift apart.

Spec shape:
    {
      "slug": "how-to-study",
      "title": "How to study this course",
      "kicker": "Method",
      "standfirst": "one or two sentences under the title",
      "mins": 6,
      "sections": [
        { "h": "heading", "p": ["paragraph", "paragraph"],
          "list": ["bullet", "bullet"],
          "callout": "the one thing to remember from this section" }
      ],
      "next": { "href": "guide-drawing.html", "title": "Drawing from memory" }
    }
"""
import io, json, os, sys, html, re

import importlib.util
_spec = importlib.util.spec_from_file_location(
    'bw', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'build-week.py'))
bw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bw)

esc, rich, LOGO, NAV, FOOT = bw.esc, bw.rich, bw.LOGO, bw.NAV, bw.FOOT

# the stylesheet, lifted out of the week template so there is exactly one
# Percent signs are doubled inside the %-formatted shared template. Undo
# that here or every width:100% ships as width:100%% and is dropped.
CSS = bw.TEMPLATE[bw.TEMPLATE.index('<style>'):bw.TEMPLATE.index('</style>') + 8].replace('%%', '%')


def section_html(s):
    out = ['<section class="gsec">']
    if s.get('h'):
        out.append('<h2>%s</h2>' % rich(s['h']))
    for para in s.get('p', []):
        out.append('<p>%s</p>' % rich(para))
    if s.get('list'):
        out.append('<ul class="glist">' +
                   ''.join('<li><span>%s</span></li>' % rich(x) for x in s['list']) +
                   '</ul>')
    if s.get('steps'):
        out.append('<ol class="gsteps">' +
                   ''.join('<li><span>%s</span></li>' % rich(x) for x in s['steps']) +
                   '</ol>')
    if s.get('callout'):
        out.append('<p class="gcall">%s</p>' % rich(s['callout']))
    out.append('</section>')
    return ''.join(out)


PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<title>%(title)s &middot; BIO 005</title>
<meta name="description" content="%(desc)s">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
%(css)s
<style>
.gwrap{max-width:1180px;margin:0 auto;padding:0 max(16px,3vw)}
.gcols{display:grid;grid-template-columns:minmax(0,1fr);gap:26px;padding:16px 0 0}
@media(min-width:960px){.gcols{grid-template-columns:minmax(0,1fr) 258px;gap:40px}}
.ghero{padding:8px 0 0;max-width:62ch}
.ghero h1{font-size:clamp(1.7rem,3.6vw,2.3rem);max-width:22ch;margin:0 0 10px}
.gstand{font-size:1.02rem;color:var(--ink-soft);max-width:58ch;margin:0 0 10px}
.gmeta{font-size:.8rem;color:var(--ink-soft);font-weight:700;letter-spacing:.02em}
.gbody{max-width:62ch;padding:6px 0 0}
.gsec{padding:18px 0 0}
.gsec h2{font-size:1.16rem;font-weight:800;margin:0 0 8px;letter-spacing:-.02em}
.gsec p{font-size:1rem;line-height:1.66}
.glist,.gsteps{display:grid;gap:10px;margin:10px 0 14px}
.glist{list-style:none}
.glist li{display:grid;grid-template-columns:7px minmax(0,1fr);gap:12px;align-items:start;font-size:.97rem}
.glist li::before{content:'';height:7px;border-radius:50%%;background:var(--maroon);margin-top:9px}
.gsteps{list-style:none;counter-reset:g}
.gsteps li{display:grid;grid-template-columns:26px minmax(0,1fr);gap:12px;align-items:start;font-size:.97rem;counter-increment:g}
.gsteps li::before{content:counter(g);width:24px;height:24px;border-radius:999px;background:var(--navy-tint);
  color:var(--navy);font-size:.76rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:1px}
.gcall{background:var(--gold-pale);border-radius:var(--r);padding:13px 16px;font-size:.95rem;
       font-weight:600;margin:14px 0 0}
.gnext{background:var(--navy);color:#fff;border-radius:var(--rc);padding:18px 20px;margin:26px 0 0}
.gnext .eyebrow{color:#F0DCA8}
.gnext h2{font-size:1rem;margin:0 0 10px}
.gnext a{display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;border-radius:999px;
  background:var(--gold);color:#000;font-size:.82rem;font-weight:700;text-decoration:none}
.gtoc{list-style:none;display:grid;gap:1px}
.gtoc a{display:block;font-size:.86rem;font-weight:600;color:var(--navy);text-decoration:none;
        padding:10px;border-radius:7px;min-height:44px;display:flex;align-items:center}
.gtoc a:hover{background:var(--gold-pale)}
</style>
</head>
<body>
%(nav)s

<main class="gwrap" id="main">
<p class="crumb"><a href="guides.html" target="_top">Guides</a> &nbsp;&rsaquo;&nbsp; %(title)s</p>

<div class="gcols">
<div>
  <div class="ghero">
    <p class="eyebrow">%(kicker)s</p>
    <h1>%(title)s</h1>
    <p class="gstand">%(standfirst)s</p>
    <p class="gmeta">About %(mins)d minutes to read</p>
  </div>
  <article class="gbody">%(sections)s</article>
  %(next)s
</div>

<aside class="rail" aria-label="More guides">
  <div class="rcard">
    <h2>On this page</h2>
    <ul class="gtoc">%(toc)s</ul>
  </div>
  <div class="rcard">
    <h2>All guides</h2>
    <ul class="rlist">%(others)s</ul>
  </div>
  <div class="rcard">
    <h2>Go back</h2>
    <ul class="rlist">
      <li><a href="welcome.html" target="_top"><span class="dot" aria-hidden="true"></span><span>This week</span></a></li>
      <li><a href="start-here.html" target="_top"><span class="dot" aria-hidden="true"></span><span>Syllabus</span></a></li>
    </ul>
  </div>
</aside>
</div>
</main>

%(foot)s

<script>
(function () {
  var ID = 'guide-%(slug)s';
  function send() {
    try {
      var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      parent.postMessage({ id: ID, frameId: ID, height: h }, '*');
    } catch (e) {}
  }
  window.addEventListener('load', send);
  window.addEventListener('resize', send);
  if (window.ResizeObserver) { new ResizeObserver(send).observe(document.body); }
  send();
}());
</script>
</body>
</html>
'''


def slugify(t):
    return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')


def build(spec, allspecs):
    secs = [s for s in spec['sections'] if s.get('h')]
    for s in spec['sections']:
        if s.get('h'):
            s['_id'] = slugify(s['h'])

    body = ''.join(
        section_html(s).replace('<section class="gsec">',
                                '<section class="gsec" id="%s">' % s['_id'] if s.get('_id')
                                else '<section class="gsec">')
        for s in spec['sections'])

    toc = ''.join('<li><a href="#%s">%s</a></li>' % (s['_id'], esc(s['h'])) for s in secs)

    others = ''.join(
        '<li><a href="guide-%s.html" target="_top"><span class="dot" aria-hidden="true"></span>'
        '<span>%s<small>%s</small></span></a></li>'
        % (o['slug'], esc(o['title']), esc(o['kicker']))
        for o in allspecs if o['slug'] != spec['slug'])

    nxt = ''
    if spec.get('next'):
        nxt = ('<section class="gnext"><p class="eyebrow">Read next</p>'
               '<h2>%s</h2><a href="%s" target="_top">Open it</a></section>'
               % (esc(spec['next']['title']), esc(spec['next']['href'])))

    return 'guide-%s.html' % spec['slug'], PAGE % {
        'slug': spec['slug'],
        'title': esc(spec['title']),
        'desc': esc(spec['standfirst'])[:160],
        'kicker': esc(spec['kicker']),
        'standfirst': rich(spec['standfirst']),
        'mins': spec.get('mins', 5),
        'sections': body,
        'toc': toc,
        'others': others,
        'next': nxt,
        'css': CSS,
        'nav': NAV % {'logo': LOGO, 'navthis': '', 'navhome': ''},
        'foot': FOOT,
    }


INDEX = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<title>Guides &middot; BIO 005</title>
<meta name="description" content="Short guides on how to study BIO 005 Human Physiology: the method, the week page, and drawing from memory.">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
%(css)s
<style>
.gwrap{max-width:1180px;margin:0 auto;padding:0 max(16px,3vw)}
.ghero{padding:18px 0 4px;max-width:60ch}
.ghero h1{font-size:clamp(1.8rem,3.8vw,2.4rem);margin:0 0 10px}
.gstand{font-size:1.04rem;color:var(--ink-soft);max-width:58ch}
.gcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;padding:18px 0 0}
.gcard{background:#fff;border:1px solid var(--rule-soft);border-radius:var(--rc);box-shadow:var(--shadow);
       padding:20px;display:flex;flex-direction:column;gap:8px;text-decoration:none;color:var(--navy)}
.gcard:hover{border-color:var(--gold-deep);background:#fff}
.gcard .eyebrow{margin:0}
.gcard h2{font-size:1.08rem;font-weight:800;margin:0}
.gcard p{font-size:.9rem;color:var(--ink-soft);margin:0;flex:1}
.gcard .go{align-self:flex-start;margin-top:4px}
</style>
</head>
<body>
%(nav)s
<main class="gwrap" id="main">
  <div class="ghero">
    <p class="eyebrow">Guides</p>
    <h1>How this course works</h1>
    <p class="gstand">Short reads on method rather than content. Physiology is not a memorization
      subject and this course is not built like one, so it is worth ten minutes to understand what
      you are being asked to do and why.</p>
  </div>
  <div class="gcards">%(cards)s</div>
</main>
%(foot)s
<script>
(function () {
  var ID = 'guides';
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
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    specs = [json.load(io.open(p, encoding='utf-8')) for p in sys.argv[1:]]
    for spec in specs:
        name, out = build(spec, specs)
        if '—' in out or '–' in out:
            raise SystemExit('em or en dash in ' + name)
        io.open(name, 'w', encoding='utf-8').write(out)
        print('%-30s %6.1f KB' % (name, len(out) / 1024.0))

    cards = ''.join(
        '<a class="gcard" href="guide-%s.html" target="_top">'
        '<p class="eyebrow">%s</p><h2>%s</h2><p>%s</p>'
        '<span class="go">Read it, about %d min</span></a>'
        % (s['slug'], esc(s['kicker']), esc(s['title']), esc(s['standfirst']), s.get('mins', 5))
        for s in specs)
    out = INDEX % {'cards': cards, 'css': CSS,
                   'nav': NAV % {'logo': LOGO, 'navthis': '', 'navhome': ''}, 'foot': FOOT}
    io.open('guides.html', 'w', encoding='utf-8').write(out)
    print('%-30s %6.1f KB' % ('guides.html', len(out) / 1024.0))


if __name__ == '__main__':
    main()
