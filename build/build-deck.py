#!/usr/bin/env python3
"""
BIO 005 slide deck builder.

    python3 build-deck.py specs/w01-quantitative-skills.json

WHY THIS EXISTS
---------------
34 topics need 34 decks in ten days, and they all have to behave the same
way: same Prezi style zoom, same present window, same keyboard handling,
same clock, same iframe height sender, same accessibility floor. Writing
that chrome 34 times by hand is 34 chances to get it slightly different.

So the chrome is extracted once from the deck that was already built and
approved, slides-p-introduction-to-physiology.html, and lives in deck/.
This script drops new slide content into it. Every generated deck is a
single self contained file, ready to push, no assembly.

WHAT IS IN deck/
    engine.css       the whole stylesheet, verbatim
    engine.js        the whole slide engine, verbatim
    head.html        meta and font links
    chrome-top.html  skip link, progress bar, site header
    chrome-bottom.html  footer, clock, zoom overlay, engine script
    samples.html     real slide markup to copy component patterns from

THE SPEC
--------
A JSON file. See specs/ for real ones. Shape:

    {
      "slug": "quantitative-skills-for-physiology",
      "title": "Quantitative Skills for Physiology",
      "week": 1,
      "topicOf": "Topic 2 of 3",
      "description": "one line for the meta description",
      "competencies": ["w1-units-conversion", ...],
      "slides": [ { "type": "...", ... }, ... ]
    }

Slide types are the components the approved deck already uses. Anything
this script does not recognise raises rather than guessing, because a
silently dropped slide is worse than a failed build.
"""
import io, json, os, re, sys, html

HERE = os.path.dirname(os.path.abspath(__file__))
DECK = os.path.join(HERE, 'deck')


def part(name):
    return io.open(os.path.join(DECK, name), encoding='utf-8').read()


def esc(v):
    return html.escape(str(v if v is not None else ''), quote=False)


def rich(v):
    """Spec text may carry two inline markers and nothing else:
         *word*   key word. Red on a light slide, gold on a dark one, which
                  is why it is .hl and never .tc: .tc is a pale salmon that
                  only has contrast on the dark red slides.
         `word`   a term students will meet on an exam
         ||       a line break, the only markup a spec may force
       Everything else is escaped, so a stray angle bracket in a spec can
       never inject markup into a student facing page."""
    s = html.escape(str(v if v is not None else ''), quote=False)
    s = re.sub(r'\*([^*]+)\*', r'<span class="hl">\1</span>', s)
    s = re.sub(r'`([^`]+)`', r'<b class="kw">\1</b>', s)
    s = s.replace('||', '<br>')
    return s


# ---------------------------------------------------------------- slides

def s_title(d, n):
    return f"""<section class="slide terra"><span class="snum">{n}</span>
  <p class="kicker">{esc(d['kicker'])}</p>
  <h2 class="stitle" style="font-size:clamp(32px,6vw,56px)">{rich(d['title'])}</h2>
  <p class="lede" style="max-width:52em">{rich(d['lede'])}</p>
  <p class="lede" style="margin-top:26px;color:var(--onred);font-size:14px"><b style="color:var(--white)">Dr. Sharilyn Rennie</b> &nbsp;&middot;&nbsp; BIO 005 Human Physiology</p>
</section>"""


def s_boxes(d, n):
    """The signature slide: collapsed boxes that zoom out when clicked."""
    cards = '\n'.join(
        f"""    <button type="button" class="card rv"><span class="label">{rich(c['label'])}</span>
      <span class="say">{rich(c['say'])}</span></button>"""
        for c in d['cards'])
    grid = d.get('grid', 'grid2')
    return f"""<section class="slide"><span class="snum">{n}</span>
  <p class="kicker">{esc(d['kicker'])}</p>
  <h2 class="stitle">{rich(d['title'])}</h2>
  {f'<p class="lede">{rich(d["lede"])}</p>' if d.get('lede') else ''}
  <div class="{grid}">
{cards}
  </div>
</section>"""


def s_steps(d, n):
    steps = '\n'.join(
        f"""    <div class="step"><span class="n">{i+1}</span><div><span class="label">{rich(st['label'])}</span>
      <span class="say">{rich(st['say'])}</span></div></div>"""
        for i, st in enumerate(d['steps']))
    return f"""<section class="slide"><span class="snum">{n}</span>
  <p class="kicker">{esc(d['kicker'])}</p>
  <h2 class="stitle">{rich(d['title'])}</h2>
  {f'<p class="lede">{rich(d["lede"])}</p>' if d.get('lede') else ''}
  <div class="rows">
{steps}
  </div>
</section>"""


def s_bigline(d, n):
    tone = d.get('tone', '')
    if tone not in ('', 'terra', 'dark'):
        raise SystemExit('slide tone %r does not exist. Use terra or dark.' % tone)
    return f"""<section class="slide {tone}"><span class="snum">{n}</span>
  <p class="kicker">{esc(d['kicker'])}</p>
  <p class="bigline">{rich(d['line'])}</p>
  {f'<p class="lede">{rich(d["lede"])}</p>' if d.get('lede') else ''}
</section>"""


def s_formula(d, n):
    rowsrc = d.get('terms', [])
    rows = '\n'.join(
        f"""      <div class="row"><span class="dot"></span><div><h3 class="kw">{esc(t['sym'])}</h3><span class="say">{rich(t['means'])}</span></div></div>"""
        for t in rowsrc)
    return f"""<section class="slide"><span class="snum">{n}</span>
  <p class="kicker">{esc(d['kicker'])}</p>
  <h2 class="stitle">{rich(d['title'])}</h2>
  <div class="formula"><p class="eq">{esc(d['eq'])}</p></div>
  <div class="rows">
{rows}
  </div>
  {f'<p class="lede">{rich(d["plain"])}</p>' if d.get('plain') else ''}
</section>"""


def s_hook(d, n):
    tone = d.get('icontone', 'gold')
    icls = '' if tone == 'gold' else ' ' + tone
    return f"""<section class="slide"><span class="snum">{n}</span>
  <p class="kicker">{esc(d['kicker'])}</p>
  <h2 class="stitle">{rich(d['title'])}</h2>
  <div class="hook"><span class="hicon{icls}" aria-hidden="true">{esc(d.get('icon', '?'))}</span>
    <span class="say">{rich(d['say'])}</span></div>
</section>"""


def s_compare(d, n):
    def col(c, cls):
        items = '\n'.join(f'      <div class="row"><span class="dot"></span><span class="say">{rich(x)}</span></div>' for x in c['items'])
        return f"""    <div class="card"><span class="label {cls}">{rich(c['head'])}</span>
      <div class="rows">
{items}
      </div>
    </div>"""
    return f"""<section class="slide"><span class="snum">{n}</span>
  <p class="kicker">{esc(d['kicker'])}</p>
  <h2 class="stitle">{rich(d['title'])}</h2>
  <div class="grid2">
{col(d['left'], 'terra')}
{col(d['right'], 'teal')}
  </div>
</section>"""


def s_check(d, n):
    """A question slide. The answer is a zoom box so it stays hidden until
       the room has committed to an answer."""
    opts = '\n'.join(
        f"""    <button type="button" class="card rv"><span class="label">{esc(chr(65+i))}. {rich(o['text'])}</span>
      <span class="say">{rich(o['why'])}</span></button>"""
        for i, o in enumerate(d['options']))
    return f"""<section class="slide"><span class="snum">{n}</span>
  <p class="kicker">{esc(d.get('kicker', 'Check yourself'))}</p>
  <h2 class="stitle">{rich(d['q'])}</h2>
  <p class="lede">Commit to an answer before you open any box. Every box says why it is right or why it is not.</p>
  <div class="grid2">
{opts}
  </div>
</section>"""


def s_close(d, n):
    items = '\n'.join(f'    <div class="row"><span class="dot"></span><span class="say">{rich(x)}</span></div>' for x in d['points'])
    return f"""<section class="slide dark"><span class="snum">{n}</span>
  <p class="kicker">{esc(d.get('kicker', 'What to take away'))}</p>
  <h2 class="stitle">{rich(d['title'])}</h2>
  <div class="rows">
{items}
  </div>
  {f'<p class="lede">{rich(d["next"])}</p>' if d.get('next') else ''}
</section>"""


BUILDERS = {
    'title': s_title, 'boxes': s_boxes, 'steps': s_steps, 'bigline': s_bigline,
    'formula': s_formula, 'hook': s_hook, 'compare': s_compare,
    'check': s_check, 'close': s_close,
}


# ------------------------------------------------------------------ build

def build(spec):
    slides = []
    for i, d in enumerate(spec['slides']):
        t = d.get('type')
        if t not in BUILDERS:
            raise SystemExit('unknown slide type %r on slide %d of %s'
                             % (t, i + 1, spec['slug']))
        slides.append(BUILDERS[t](d, i + 1))

    deck_id = 'slides-p-' + spec['slug']
    head = part('head.html')
    head = re.sub(r'<title>.*?</title>',
                  '<title>BIO 005 &middot; P &middot; %s</title>' % esc(spec['title']), head, flags=re.S)
    head = re.sub(r'<meta name="description" content=".*?">',
                  '<meta name="description" content="%s">' % html.escape(spec['description'], quote=True), head, flags=re.S)

    top = part('chrome-top.html')
    top = re.sub(r'(<p class="typechip"><b aria-hidden="true">P</b> Physiology &middot; )[^<]*(</p>)',
                 r'\1Week %d\2' % spec['week'], top)
    top = re.sub(r'(<h1>).*?(</h1>)', r'\1%s\2' % esc(spec['title']), top, flags=re.S)

    bottom = part('chrome-bottom.html')
    bottom = re.sub(r'(<p>BIO 005 Human Physiology &nbsp;&middot;&nbsp; ).*?( &nbsp;&middot;&nbsp; Slide type: P, Physiology</p>)',
                    r'\1Week %d, %s\2' % (spec['week'], esc(spec['title'])), bottom, flags=re.S)
    bottom = bottom.replace("var ID = 'slides-p-introduction-to-physiology';",
                            "var ID = '%s';" % deck_id)

    out = ('<!DOCTYPE html>\n<html lang="en">\n<head>' + head
           + '<style>\n' + part('engine.css') + '</style>\n'
           + '<script>/* competencies covered: ' + ', '.join(spec.get('competencies', [])) + ' */</script>\n'
           + '</head>\n' + top
           + '<main class="deck" id="deck">\n\n'
           + '\n\n'.join(slides)
           + '\n\n' + bottom + '\n</body>\n</html>\n')

    if '—' in out or '–' in out:
        raise SystemExit('em or en dash found in %s. Not allowed.' % deck_id)
    return deck_id + '.html', out


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    for path in sys.argv[1:]:
        spec = json.load(io.open(path, encoding='utf-8'))
        name, out = build(spec)
        io.open(name, 'w', encoding='utf-8').write(out)
        print('%-52s %2d slides  %6.1f KB' % (name, len(spec['slides']), len(out) / 1024.0))


if __name__ == '__main__':
    main()
