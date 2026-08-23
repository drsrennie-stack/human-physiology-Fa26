#!/usr/bin/env python3
"""
Assemble one week page from the shared engine plus that week's content.

    python3 build.py week01

Writes two files into out/:
    <slug>.html          a full standalone page, for GitHub Pages or Canvas
    <slug>.artifact.html the same page without the outer document tags,
                         for publishing as an artifact
"""
import sys, os, re, json

HERE = os.path.dirname(os.path.abspath(__file__))

def read(*p):
    return open(os.path.join(HERE, *p), encoding='utf-8').read()

def build(week):
    js = read('weeks', week + '.js')

    meta = {}
    m = re.search(r'/\*\s*META\s*(\{.*?\})\s*\*/', js, re.S)
    if not m:
        raise SystemExit('week file needs a /* META {...} */ block at the top')
    meta = json.loads(m.group(1))

    css = read('engine', 'base.css') + read('engine', 'add.css')
    engine = (read('engine', 'lab-core.js') + '\n' +
              read('engine', 'lab-parts.js') + '\n' +
              read('engine', 'lab-steps.js') + '\n' +
              read('engine', 'lab-chart.js'))

    frame_id = meta['slug']
    tail = """
/* iframe height sender, so the page sizes itself inside Canvas or Kajabi */
(function () {
  var FRAME_ID = '%s';
  function sendHeight() {
    var h = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight
    );
    try { window.parent.postMessage({ id: FRAME_ID, frameId: FRAME_ID, height: h, type: 'resize' }, '*'); } catch (e) {}
  }
  window.addEventListener('load', sendHeight);
  window.addEventListener('resize', sendHeight);
  document.addEventListener('DOMContentLoaded', sendHeight);
  if (window.ResizeObserver) {
    try { new ResizeObserver(sendHeight).observe(document.body); } catch (e) {}
  }
  document.addEventListener('click', function () { setTimeout(sendHeight, 260); }, true);
  setInterval(sendHeight, 1200);
})();
""" % frame_id

    head = (
        '<title>' + meta['title'] + '</title>\n'
        '<meta name="description" content="' + meta['description'] + '">\n'
        '<style>\n' + css + '\n</style>'
    )
    body = (
        '<div id="app"></div>\n'
        '<noscript><div style="max-width:70ch;margin:40px auto;padding:0 20px;font-family:Helvetica,Arial,sans-serif">'
        '<h1>' + meta['title'] + '</h1>'
        '<p>This lab is interactive, so it needs JavaScript switched on. '
        'Everything it covers is also written out in the course lab manual, '
        'which reads and prints without any scripting.</p></div></noscript>\n'
        '<script>\n' + engine + '\n' + js + '\n' + tail + '\n</script>'
    )

    artifact = head + '\n' + body + '\n'
    standalone = (
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        + head + '\n</head>\n<body>\n' + body + '\n</body>\n</html>\n'
    )

    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    open(os.path.join(HERE, 'out', meta['slug'] + '.html'), 'w', encoding='utf-8').write(standalone)
    open(os.path.join(HERE, 'out', meta['slug'] + '.artifact.html'), 'w', encoding='utf-8').write(artifact)

    print('built %s  |  %d KB standalone  |  em dashes: %d'
          % (meta['slug'], len(standalone) // 1024, standalone.count('—')))
    return meta

if __name__ == '__main__':
    for w in (sys.argv[1:] or ['week01']):
        build(w)
