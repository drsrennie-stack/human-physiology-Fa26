#!/usr/bin/env python3
"""
tools/make_notes_pdf.py

Printable written notes, one tagged PDF/UA-1 file per lecture and one packet
per week, in notes/. Sep 26 2026. Scrubs asked for ready-made PDFs of the
notes that are printer friendly in color and spacing, that respect the cost
of printing, and that keep every bit of the material.

What changes on paper, and why
  - Two columns of 8.6 pt text on letter paper with 0.45 in margins. A notes
    page that printed to 26 sheets from the browser comes out at a third of
    that, and nothing is cut.
  - No filled backgrounds. Navy cards, tinted boxes and shadows become white
    with a thin gray rule, so a page costs text ink, not panel ink. Headings
    keep the course maroon and navy, so the page still reads in color.
  - Figures keep their full content and are capped in height so one drawing
    never takes a whole page.
  - The moving models cannot move on paper. Their controls and canvas come
    out, a one line note says the model is on the course site, and the
    things-to-try text beside each model stays.
  - The clinical panels that open on click are printed open, the same as the
    pages' own print view.
  - The page's reading layout (sections that fold) is switched off, so the
    PDF is the plain document.

Run:  python3 tools/make_notes_pdf.py            every lecture and every packet
      python3 tools/make_notes_pdf.py 4          only Week 4
"""
import asyncio, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import make_pdf as M
from weasyprint import HTML
import pikepdf

ROOT = M.ROOT
OUT = M.OUT
SITE = "drsrennie-stack.github.io/human-physiology-Fa26/"

# week -> [(file, lecture title)], in teaching order
NOTES = {
 1: [("biol005-m01-maintain-control-notes.html", "How the body maintains control")],
 2: [("biol005-w02-chemistry-notes.html", "Chemistry for physiology"),
     ("biol005-w02-cell-notes.html", "The cell"),
     ("biol005-w02-transport-notes.html", "Membrane transport"),
     ("biol005-w02-signaling-notes.html", "Cell signaling")],
 3: [("biol005-w03-compartments-notes.html", "Body fluid compartments")],
 4: [("biol005-w04-neurons-glia-notes.html", "Neurons and glia"),
     ("biol005-w04-membrane-potential-notes.html", "The resting membrane potential"),
     ("biol005-w04-action-potential-notes.html", "Graded potentials and the action potential"),
     ("biol005-w04-ap-conduction-notes.html", "How action potentials carry information"),
     ("biol005-w04-synapse-notes.html", "The chemical synapse"),
     ("biol005-w04-synaptic-integration-notes.html", "Integration at the synapse")],
}

PREP = r"""(meta) => {
  const [title, week, file, site] = meta;
  /* site chrome that has no meaning on paper */
  document.querySelectorAll('header.site-header, .site-header, footer, .mm-foot, .wb, .wb-launch, .lightbox, #printbtn, .rm-bar, .rm-toc')
    .forEach(n => n.remove());
  /* the moving models: every part of the model (its canvas, controls,
     readouts and live status line share one class prefix, such as syn-)
     comes out, and a one line pointer to the course site goes in its place.
     The explanation and the things to try stay. */
  document.querySelectorAll('canvas').forEach(c => {
    const m = /(^|\s)([a-z]+)-canvas\b/.exec(c.className || '');
    if (!m || m[2] === 'wb') return;
    const pre = m[2] + '-';
    const parts = [].slice.call(document.querySelectorAll('[class]')).filter(e =>
      typeof e.className === 'string' && e.className.split(/\s+/).some(k => k.indexOf(pre) === 0));
    const tops = parts.filter(e => !parts.some(o => o !== e && o.contains(e)));
    if (!tops.length) return;
    const note = document.createElement('p');
    note.className = 'modelnote';
    note.textContent = 'Moving model: run it on the course site, ' + site + file;
    tops[0].replaceWith(note);
    tops.slice(1).forEach(e => e.remove());
  });
  document.querySelectorAll('button').forEach(b => b.remove());
  /* everything folded prints open */
  document.querySelectorAll('details').forEach(d => d.open = true);
  document.querySelectorAll('[hidden]').forEach(h => { if (!h.closest('.rm-panel')) h.removeAttribute('hidden'); });
  /* a running head so a loose sheet can be put back in order */
  const h1 = document.querySelector('h1');
  if (h1) {
    const k = document.createElement('p');
    k.className = 'kick';
    k.textContent = 'BIO 005 Human Physiology · Week ' + week + ' notes · Dr. Sharilyn Rennie';
    h1.insertAdjacentElement('beforebegin', k);
  }
  /* WeasyPrint cannot lay out a grid or flex box inside a column, so on
     paper they become plain blocks: the same content, stacked */
  document.querySelectorAll('main *').forEach(e => {
    const d = getComputedStyle(e).display;
    if (d === 'grid' || d === 'flex') e.style.setProperty('display', 'block', 'important');
    else if (d === 'inline-grid' || d === 'inline-flex') e.style.setProperty('display', 'inline-block', 'important');
  });
  const st = document.createElement('style');
  st.textContent = `
  @page{size:letter;margin:0.42in 0.45in 0.5in;
    @bottom-left{content:"BIO 005 · Week ${week} · ${title.replace(/"/g,'')}";font:6.8pt 'Plus Jakarta Sans',sans-serif;color:#555}
    @bottom-right{content:"page " counter(page) " of " counter(pages);font:6.8pt 'Plus Jakarta Sans',sans-serif;color:#555}}
  html,body{background:#fff!important}
  main *{font-size:inherit!important;background:#fff!important;color:#0B1530!important;border-color:#B9BFC9!important}
  main *::before, main *::after{background:none!important;box-shadow:none!important;color:#8B3A2E!important;font-size:inherit!important}
  main h2, main h2 *{color:#8B3A2E!important}
  main .kick, main .eyebrow, main .tag, main .stg{color:#8B3A2E!important}
  main th{background:#F3F4F7!important}
  main .hl, main mark{background:#FFF3C4!important}
  main figcaption{font-size:7.4pt!important;color:#333!important}
  main table{font-size:7.4pt!important}
  main .modelnote{font-size:7.4pt!important;color:#414B5C!important}
  main h1{font-size:16pt!important}
  main h2{font-size:10.6pt!important}
  main h3{font-size:9.2pt!important}
  main h4, main h5{font-size:8.8pt!important}
  body{font-family:'Plus Jakarta Sans',sans-serif!important;font-size:8.6pt!important;line-height:1.34!important;color:#0B1530!important;margin:0!important}
  *{box-shadow:none!important;text-shadow:none!important}
  main, main .wrap, .wrap{max-width:none!important;padding:0!important;margin:0!important}
  main{column-count:2;column-gap:0.24in;column-fill:auto}
  main .kick{column-span:all;font-size:7pt!important;font-weight:700;color:#8B3A2E!important;margin:0 0 2pt!important}
  h1{column-span:all;font-size:16pt!important;line-height:1.1!important;margin:0 0 6pt!important;color:#0B1530!important}
  h2{font-size:10.6pt!important;line-height:1.2!important;margin:9pt 0 3pt!important;color:#8B3A2E!important;break-after:avoid;page-break-after:avoid}
  h3{font-size:9.2pt!important;line-height:1.22!important;margin:6pt 0 2pt!important;color:#0B1530!important;break-after:avoid}
  h4,h5{font-size:8.8pt!important;margin:5pt 0 2pt!important;break-after:avoid}
  p, li, td, th, dd, dt, figcaption, span, div{font-size:inherit}
  p{margin:0 0 4pt!important;max-width:none!important}
  ul, ol{margin:0 0 4pt 1.15em!important;padding:0!important}
  li{margin:0 0 1.5pt!important;padding-top:0!important;padding-bottom:0!important}
  section, .card, .sl, .key, .eq, .chain, .term, .tgroup, .cprof, .prob, .clin, .cmp, .mapcard, aside, .note, .box{
    background:#fff!important;border-radius:3pt!important;padding:0!important;margin:0 0 5pt!important;min-height:0!important;height:auto!important}
  .card, .key, .eq, .prob, .clin, .cmp, .mapcard, .cprof, aside{border:0.6pt solid #B9BFC9!important;padding:4pt 6pt!important}
  .card.navy, .navy, [class*="dark"]{color:#0B1530!important}
  .card.navy *, .navy *{color:#0B1530!important}
  [style*="background"]{background:#fff!important}
  .eyebrow, .tag, .stg{font-size:6.6pt!important;letter-spacing:.06em!important;color:#8B3A2E!important;background:#fff!important;margin:0 0 1pt!important}
  .prob, .eq, figure, table, .chain, .key{break-inside:avoid;page-break-inside:avoid}
  figure{margin:3pt 0 6pt!important;padding:0!important;border:0!important}
  figure img, img, svg{max-width:100%!important;height:auto!important;max-height:3.1in!important;display:block;margin:0 auto 2pt}
  figcaption{font-size:7.4pt!important;line-height:1.28!important;color:#333!important;margin:2pt 0 0!important}
  table{width:100%!important;border-collapse:collapse!important;font-size:7.4pt!important;margin:2pt 0 6pt!important}
  th, td{padding:1.8pt 3pt!important;border:0.5pt solid #B9BFC9!important;vertical-align:top;background:#fff!important;color:#0B1530!important}
  th{font-weight:700!important;background:#F3F4F7!important}
  .hl, mark{background:#FFF3C4!important;color:#0B1530!important}
  .term b, .term strong, dt{color:#0B1530!important}
  .modelnote{font-size:7.4pt!important;color:#414B5C!important;border:0.6pt dashed #999!important;padding:3pt 5pt!important;margin:2pt 0 6pt!important}
  a{color:#0B1530!important;text-decoration:none!important}
  .scroller{overflow:visible!important}
  `;
  document.head.appendChild(st);
}"""

async def build_one(file, title, week):
    prep = "(" + PREP + ")(" + repr([title, week, file, SITE]).replace("'", '"') + ")"
    return await M.render(file, None, title, None, prep=prep)

def write(html, target, title, desc):
    target.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=html, base_url=str(ROOT) + '/').write_pdf(target, pdf_variant='pdf/ua-1', uncompressed_pdf=False)
    M.stamp(target, title, desc)

def main():
    weeks = [int(a) for a in sys.argv[1:]] or sorted(NOTES)
    for w in weeks:
        docs = []
        for i, (f, t) in enumerate(NOTES[w], 1):
            if not (ROOT / f).exists():
                print("missing", f); continue
            html = asyncio.run(build_one(f, t, w))
            doc = HTML(string=html, base_url=str(ROOT) + '/').render(pdf_variant='pdf/ua-1')
            name = "notes/BIO005-Week%d-Notes-%d-%s.pdf" % (w, i, f.replace("biol005-", "").replace("-notes.html", ""))
            target = OUT / name
            target.parent.mkdir(parents=True, exist_ok=True)
            doc.write_pdf(target, pdf_variant='pdf/ua-1', uncompressed_pdf=False)
            M.stamp(target, "BIO 005 Week %d notes: %s" % (w, t), "Written notes for %s, printable, two columns" % t)
            print("  ", name, M.audit(target))
            docs.append(doc)
        if len(docs) > 1:
            # one packet for the week: the same pages, rendered once, tagged as one document
            pk = OUT / ("notes/BIO005-Week%d-Notes-all.pdf" % w)
            docs[0].copy([pg for d in docs for pg in d.pages]).write_pdf(pk, pdf_variant='pdf/ua-1', uncompressed_pdf=False)
            M.stamp(pk, "BIO 005 Week %d notes, all lectures" % w, "Every written notes page for Week %d, in teaching order, printable" % w)
            print("   packet", pk.name, M.audit(pk))

if __name__ == "__main__":
    main()
