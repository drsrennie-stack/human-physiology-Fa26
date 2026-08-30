#!/usr/bin/env python3
"""
Build design-system.html: the card system shown working, on all three grounds.

    python3 build-spec.py

The point of this page is that it is not a picture of the system, it is the
system. It inlines the same stylesheet the course pages ship, so if a token
changes, this page changes with it and cannot quietly go stale.
"""
import io, os, datetime, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('bw', os.path.join(HERE, 'build-week.py'))
bw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bw)
CSS = bw.TEMPLATE[bw.TEMPLATE.index('<style>'):bw.TEMPLATE.index('</style>') + 8].replace('%%', '%')

SWATCHES = [
    ('--navy',        '#040711',           'Body text, headings, the dark band', '20.12:1 on white'),
    ('--navy-70',     'rgba(4,7,17,.70)',  'De-emphasized text',                 '7.88:1 on white'),
    ('--navy-50',     'rgba(4,7,17,.50)',  'The edge of a control',              '3.79:1, clears 1.4.11'),
    ('--navy-15',     'rgba(4,7,17,.15)',  'Decorative hairlines only',          '1.40:1, carries no meaning'),
    ('--navy-deep',   '#01030A',           'The footer',                         '20.61:1 on white'),
    ('--terra',       '#8B3A2E',           'The only accent on light',           '7.66:1 on white'),
    ('--terra-dark',  '#6E2C23',           'Terra hover',                        '10.26:1 on white'),
    ('--gold-bright', '#DCB45C',           'Emphasis on a dark ground',          '10.28:1 on navy'),
    ('--straw-light', '#F2E2B8',           'Quiet text on a dark ground',        '15.66:1 on navy'),
    ('--offwhite',    '#FAFAF9',           'Page ground',                        'card white sits on it'),
]

SCALE = [
    ('Eyebrow',   '11px',  '700', '+3.3px',  'Uppercase, terra. The signature.'),
    ('Headline',  '30px',  '800', '-0.6px',  'Display face, navy. One phrase may take the accent.'),
    ('Number',    '28px',  '800', '-0.56px', 'Terra. Only where the set is a real progression.'),
    ('Tier name', '18px',  '800', '-0.27px', 'Navy.'),
    ('Price',     '13px',  '700', 'normal',  'Terra, tabular numerals.'),
    ('Tagline',   '13px',  '400', 'normal',  'Navy.'),
    ('Includes',  '11px',  '700', '+2.09px', 'Uppercase, navy. Raised from 9.5px.'),
    ('List item', '13px',  '500', 'normal',  'Navy, terra dot. Raised from 12px.'),
    ('Button',    '11px',  '700', '+2px',    'Uppercase. Raised from 10px.'),
    ('Badge',     '11px',  '700', '+1.98px', 'Uppercase, white on terra. Raised from 9px.'),
]

CARDS = [
    ('', '01', 'The plain card', '1px navy-15 hairline',
     'The default. Nothing about it competes for attention.',
     ['Hairline border at 1px', 'Radius 8px', 'No shadow, no lift'],
     'cta-outline', 'Read more'),
    ('featured', '02', 'The featured card', '2px terra border',
     'One card in a set carries the weight. The border is the whole treatment.',
     ['No fill', 'No shadow', 'No change of scale'],
     'cta-solid', 'Start here'),
    ('soon', '03', 'The not-yet card', 'Dashed border',
     'Dashed reads as provisional without needing the word.',
     ['Same geometry', 'Quiet button', 'Badge says when'],
     'cta-quiet', 'Coming soon'),
]

PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design system &middot; BIO 005 and MedMasters</title>
<meta name="description" content="The MedMasters card system shown working: tokens, type scale, card variants and buttons on light, dark and terra grounds.">
%(css)s
<style>
.band{width:100%%}
.band-dark{background:var(--navy);color:#fff}
.band-maroon{background:var(--terra);color:#fff}
.band-light{background:var(--offwhite)}
.wrap{max-width:1100px;margin:0 auto;padding:0 max(20px,4vw)}
.sec{padding:52px 0}
.sec + .sec{border-top:1px solid var(--navy-15)}
.band-dark .sec + .sec,.band-maroon .sec + .sec{border-top-color:rgba(255,255,255,.3)}
h1{font-family:var(--display);font-size:clamp(1.9rem,4vw,2.6rem);letter-spacing:-.025em;margin:0 0 14px}
.lede{font-size:1.05rem;color:#D6DCE6;max-width:62ch;margin:0 0 8px;line-height:1.65}
.band-dark h2,.band-maroon h2{color:#fff}
h2{font-family:var(--display);font-size:1.4rem;letter-spacing:-.02em;margin:0 0 6px}
.subs{font-size:.97rem;color:var(--navy-70);max-width:62ch;margin:0 0 26px}
.band-maroon .subs{color:#fff}

/* swatches */
.sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;list-style:none;padding:0;margin:0}
.sw li{border:1px solid var(--navy-15);border-radius:var(--card-radius);overflow:hidden;background:#fff}
.sw .chipc{height:64px;border-bottom:1px solid var(--navy-15)}
.sw .m{padding:12px 14px}
.sw code{font:700 12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--navy);display:block}
.sw .hexv{font:500 11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--navy-70);display:block;margin:2px 0 6px}
.sw .use{font-size:12px;color:var(--navy);display:block;font-weight:600}
.sw .ratio{font-size:11px;color:var(--navy-70);display:block;margin-top:2px}

/* type scale table */
/* A wide table scrolls inside its own box so the page itself never scrolls
   sideways at 320px or at 400%% zoom. 1.4.10. */
.tscroll{overflow-x:auto}
.scale{width:100%%;min-width:520px;border-collapse:collapse;font-size:13px}
.scale caption{text-align:left;font-size:12px;color:var(--navy-70);padding:0 0 10px}
.scale th{text-align:left;font-family:var(--display);font-size:11px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--terra);padding:0 12px 10px 0;border-bottom:1px solid var(--navy-15)}
.scale td{padding:11px 12px 11px 0;border-bottom:1px solid var(--navy-15);vertical-align:top;color:var(--navy)}
.scale td:nth-child(2),.scale td:nth-child(3),.scale td:nth-child(4){
  font:500 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:nowrap}
.scale .nm{font-weight:700}

/* button row */
.btnrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;max-width:660px}
.btnrow .vl-cta{margin-top:0}

.note{font-size:13px;line-height:1.6;color:var(--navy);background:#fff;
  border:1px solid var(--navy-15);border-left:4px solid var(--terra);
  border-radius:var(--card-radius);padding:16px 18px;max-width:70ch;margin:22px 0 0}
.note b{font-weight:700}
.note ol{margin:10px 0 0;padding-left:20px}
.note li{margin:0 0 7px}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to the main content</a>

<header class="band band-dark">
  <div class="wrap">
    <section class="sec">
      <p class="vl-eyebrow" style="color:var(--straw-light)">Design system &middot; version 1</p>
      <h1>The card system, shown working</h1>
      <p class="lede">Not a picture of the system. This page loads the same stylesheet the course
        pages load, so if a token changes here, it has already changed there. Generated %(date)s.</p>
    </section>
  </div>
</header>

<main id="main">

<div class="band band-light">
  <div class="wrap">

    <section class="sec" aria-labelledby="h-tok">
      <h2 id="h-tok">Tokens</h2>
      <p class="subs">Everything else pulls from these ten. Change one here and it updates
        everywhere, which is the only reason to keep them in one block.</p>
      <ul class="sw">%(swatches)s</ul>
    </section>

    <section class="sec" aria-labelledby="h-type">
      <h2 id="h-type">Type scale</h2>
      <p class="subs">Small type, heavy weights, wide tracking on the uppercase labels. That
        combination is what makes the cards read as deliberate rather than generic.</p>
      <div class="tscroll"><table class="scale">
        <caption>Every size in the system, and where it is used.</caption>
        <thead><tr><th scope="col">Role</th><th scope="col">Size</th><th scope="col">Weight</th>
          <th scope="col">Tracking</th><th scope="col">Notes</th></tr></thead>
        <tbody>%(scale)s</tbody>
      </table></div>
    </section>

    <section class="sec" aria-labelledby="h-cards">
      <h2 id="h-cards">The three card states</h2>
      <p class="subs">Same geometry every time. The only thing that changes is the border.</p>
      <div class="vl-grid">%(cards)s</div>
      <p class="vl-note">Every button lands on the same baseline because the card is a flex column
        and the button takes <b>margin-top:auto</b>. Without that the cards look accidental.</p>
    </section>

    <section class="sec" aria-labelledby="h-btn">
      <h2 id="h-btn">Buttons</h2>
      <p class="subs">Three weights of emphasis, one shape. All are 44px tall, which is the
        enhanced target size, not the minimum.</p>
      <div class="btnrow">
        <a class="vl-cta cta-solid" href="#h-btn">Solid, the primary</a>
        <a class="vl-cta cta-outline" href="#h-btn">Outline, the default</a>
        <a class="vl-cta cta-quiet" href="#h-btn">Quiet, not yet live</a>
      </div>
      <div class="note">
        <p><b>Three values differ from the original spec.</b></p>
        <ol>
          <li><b>--navy-55 became --navy-75.</b> The original measured 4.04:1 on white. Normal text
            needs 4.5:1 for AA and 7:1 for AAA. The replacement measures 8.10:1.</li>
          <li><b>The outline button no longer borders on --navy-15.</b> A button's edge is what
            tells you it is a button, so 1.4.11 asks for 3:1 and --navy-15 is 1.37:1. It now uses
            --navy-50 at 3.45:1. Card edges and dividers still use --navy-15, because those carry
            no information.</li>
          <li><b>Sizes under 11px were raised to 11px.</b> Weight and tracking are unchanged, so the
            look holds. No WCAG rule sets a minimum size, so this one is a judgement call about
            students reading on a phone, and it is the change you might reasonably want reversed.</li>
        </ol>
      </div>
    </section>

  </div>
</div>

<div class="band band-dark">
  <div class="wrap">
    <section class="sec" aria-labelledby="h-dark">
      <h2 id="h-dark">On a dark ground</h2>
      <p class="lede">Terra measures 2.63:1 against navy, so it cannot be the accent here. On dark,
        quiet text takes --straw-light and emphasis takes --gold-bright. The cards themselves do
        not change: they stay white.</p>
      <div class="vl-grid">%(cards)s</div>
    </section>
  </div>
</div>

<div class="band band-maroon">
  <div class="wrap">
    <section class="sec" aria-labelledby="h-terra">
      <h2 id="h-terra">On a terra ground</h2>
      <p class="subs">Here even --straw-light is only 5.96:1, so surrounding type is plain white.
        The cards stay white and unchanged, which is the point of the system.</p>
      <div class="vl-grid">%(cards)s</div>
    </section>
  </div>
</div>

</main>

<footer class="site-footer" role="contentinfo"><div class="fi">
  <div>
    <p class="n">Dr. Sharilyn Rennie</p>
    <p class="c">Design system &middot; generated %(date)s</p>
  </div>
</div></footer>

<script>
(function () {
  var ID = 'bio005-design-system';
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
    swatches = ''.join(
        '<li><div class="chipc" style="background:%s" aria-hidden="true"></div>'
        '<div class="m"><code>%s</code><span class="hexv">%s</span>'
        '<span class="use">%s</span>%s</div></li>'
        % (val, name, val, use, ('<span class="ratio">%s</span>' % ratio) if ratio else '')
        for name, val, use, ratio in SWATCHES)

    scale = ''.join(
        '<tr><td class="nm">%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'
        % row for row in SCALE)

    cards = ''.join(
        '<article class="vl-card%s">'
        '<span class="vl-badge%s">%s</span>'
        '<p class="vl-num">%s</p>'
        '<h3 class="vl-tier">%s</h3>'
        '<p class="vl-tagline">%s</p>'
        '<div class="vl-divider"></div>'
        '<p class="vl-includes">What defines it</p>'
        '<ul class="vl-list">%s</ul>'
        '<a class="vl-cta %s" href="#h-cards">%s</a></article>'
        % ((' ' + mod) if mod else '',
           ' quiet' if mod != 'featured' else '',
           badge, num, tier, tagline,
           ''.join('<li>%s</li>' % b for b in bullets),
           cta, ctatext)
        for mod, num, tier, badge, tagline, bullets, cta, ctatext in CARDS)

    out = PAGE % {
        'css': CSS,
        'date': datetime.date.today().strftime('%B %-d, %Y'),
        'swatches': swatches,
        'scale': scale,
        'cards': cards,
    }
    if '—' in out or '–' in out:
        raise SystemExit('em or en dash in design-system.html')
    io.open('design-system.html', 'w', encoding='utf-8').write(out)
    print('%-24s %6.1f KB' % ('design-system.html', len(out) / 1024.0))


if __name__ == '__main__':
    main()
