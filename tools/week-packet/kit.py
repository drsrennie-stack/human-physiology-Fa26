# -*- coding: utf-8 -*-
"""Layout kit for the BIO 005 Week 2 packet.

Every block that carries a table, a sequence, a map, a callout or a worked
problem is break-inside:avoid, so nothing splits across a page. That was the
explicit ask and it is enforced here rather than page by page.
"""
import html as H

def esc(s): return H.escape(s, quote=False)

CSS = r"""
:root{
  --navy:#0B1530; --navy-72:#4F576A; --navy-15:rgba(11,21,48,.15);
  --terra:#8B3A2E; --terra-dark:#6B2A20; --gold:#C9A14A;
  --wash:#FAFAF9; --tint:#EEF1F5; --rule:#E3E6EA;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;
  color:var(--navy);font-size:10.2pt;line-height:1.45;background:#fff;font-style:normal}
em,i,cite,dfn,var{font-style:normal}

.page{page-break-after:always;break-after:page}
.page:last-child{page-break-after:auto;break-after:auto}

/* ---------- cover ---------- */
.cover{height:9.2in;display:flex;flex-direction:column;justify-content:flex-end}
.cover .logo{margin:0 0 28px}
.cover h1{font-size:40pt;font-weight:800;letter-spacing:-.02em;line-height:1.02;margin:0}
.cover h1 .dot{color:var(--terra)}
.cover .sub{font-size:13pt;font-weight:700;margin:10px 0 0}
.rule{width:74px;height:4px;background:var(--gold);margin:18px 0 26px;border-radius:2px}

.eyebrow{font-size:7.6pt;font-weight:700;letter-spacing:.26em;text-transform:uppercase;
  color:var(--terra);margin:0 0 8px}
.eyebrow.grey{color:var(--navy-72)}

/* ---------- part / chapter openers ---------- */
.partno{font-size:7.6pt;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--terra)}
h1.big{font-size:27pt;font-weight:800;letter-spacing:-.02em;line-height:1.05;margin:4px 0 0}
h1.big .dot{color:var(--terra)}
h2.ch{font-size:19pt;font-weight:800;letter-spacing:-.015em;margin:2px 0 2px;line-height:1.1}
.chsub{font-size:7.6pt;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--terra);margin:0 0 10px}
.lede{font-size:10.4pt;color:var(--navy-72);margin:0 0 14px;max-width:62em}

/* by the end */
.bte{display:grid;grid-template-columns:78px 1fr;gap:12px;margin:0 0 16px;
  break-inside:avoid;page-break-inside:avoid}
.bte .lab{font-size:7.4pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--navy-72);padding-top:2px}
.bte ol{margin:0;padding-left:1.15em}
.bte li{margin:0 0 4px}

/* ---------- headings in the body ---------- */
h3.sec{font-size:13pt;font-weight:800;color:var(--terra);margin:20px 0 6px;letter-spacing:-.01em;
  break-after:avoid;page-break-after:avoid}
h4.sub{font-size:10.6pt;font-weight:800;margin:14px 0 5px;break-after:avoid;page-break-after:avoid}
p{margin:0 0 8px}
ul.b,ol.n{margin:0 0 10px;padding-left:1.2em}
ul.b li,ol.n li{margin:0 0 5px}
ol.n{counter-reset:none}

/* ---------- captioned table ---------- */
.tbl{border:1px solid var(--rule);border-radius:7px;overflow:hidden;margin:0 0 14px;
  break-inside:avoid;page-break-inside:avoid}
.tbl .cap{font-size:7.4pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--terra);padding:9px 12px 8px}
.tbl table{width:100%;border-collapse:collapse;font-size:9.4pt}
.tbl th{background:var(--navy);color:#fff;text-align:left;padding:7px 12px;font-weight:700;font-size:9.6pt}
.tbl td{padding:6px 12px;border-top:1px solid var(--rule);vertical-align:top}
.tbl tbody tr:nth-child(even) td{background:var(--wash)}
.tbl td:first-child{font-weight:700;white-space:normal}

/* ---------- sequence strip ---------- */
.seq{border:1px solid var(--rule);border-radius:7px;padding:11px 13px 6px;margin:0 0 14px;
  break-inside:avoid;page-break-inside:avoid}
.seq .cap{font-size:7.4pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--terra);margin:0 0 9px}
.seq ol{list-style:none;margin:0;padding:0;counter-reset:s}
.seq li{counter-increment:s;display:grid;grid-template-columns:26px 1fr;gap:10px;
  padding:0 0 9px;position:relative}
.seq li::before{content:counter(s);display:flex;align-items:center;justify-content:center;
  width:22px;height:22px;border-radius:50%;background:var(--navy);color:#fff;
  font-size:8.6pt;font-weight:800}
.seq li:not(:last-child)::after{content:"";position:absolute;left:11px;top:24px;bottom:2px;
  width:1.5px;background:var(--navy-15)}
.seq li b{display:block}
.seq li span{font-size:9.5pt;color:var(--navy-72)}

/* ---------- concept map ---------- */
.map{border:1px solid var(--rule);border-radius:7px;padding:12px 13px 8px;margin:0 0 14px;
  break-inside:avoid;page-break-inside:avoid;background:var(--wash)}
.map .cap{font-size:7.4pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--terra);margin:0 0 4px}
.map .root{font-size:10.4pt;font-weight:800;margin:0 0 10px}
.mapgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.branch{background:#fff;border:1px solid var(--rule);border-radius:6px;padding:9px 11px}
.branch .bt{font-size:9.6pt;font-weight:800;color:var(--terra);margin:0 0 4px}
.branch ul{margin:0;padding-left:1.05em;font-size:9.2pt}
.branch li{margin:0 0 3px}

/* ---------- callout ---------- */
.hold{background:var(--tint);border-radius:7px;padding:11px 14px;margin:0 0 14px;
  break-inside:avoid;page-break-inside:avoid}
.hold .cap{font-size:7.4pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--terra-dark);margin:0 0 5px}
.hold p:last-child{margin-bottom:0}

/* ---------- worked problem ---------- */
.prob{border:1px solid var(--rule);border-radius:7px;padding:12px 14px 8px;margin:0 0 14px;
  break-inside:avoid;page-break-inside:avoid}
.prob .cap{font-size:7.4pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--terra);margin:0 0 5px}
.prob .q{font-weight:700;margin:0 0 5px}
.prob .given{font-size:9.3pt;color:var(--navy-72);margin:0 0 8px}
.prob .wl{font-size:7.4pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--navy-72);margin:0 0 5px}
.prob ol{margin:0;padding-left:1.2em;font-size:9.6pt}
.prob li{margin:0 0 4px}

/* ---------- contents ---------- */
.toc{margin:6px 0 0}
.toc .row{display:grid;grid-template-columns:22px 1fr auto;gap:10px;align-items:baseline;
  padding:9px 0;border-bottom:1px solid var(--rule)}
.toc .n{font-weight:800;color:var(--terra)}
.toc .t{font-weight:700;font-size:11pt}
.toc .s{display:block;font-size:7.4pt;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:var(--navy-72);margin-top:2px}
.toc .p{font-weight:700;color:var(--navy-72)}

@media print{
  .page{page-break-after:always}
  h3.sec,h4.sub{page-break-after:avoid}
  .tbl,.seq,.map,.hold,.prob,.bte{page-break-inside:avoid}
}
"""

def tbl(cap, headers, rows):
    th = "".join('<th>%s</th>' % esc(h) for h in headers)
    tr = "".join('<tr>%s</tr>' % "".join('<td>%s</td>' % c for c in r) for r in rows)
    return ('<div class="tbl"><p class="cap">%s</p><table><thead><tr>%s</tr></thead>'
            '<tbody>%s</tbody></table></div>' % (esc(cap), th, tr))

def seq(cap, steps):
    li = "".join('<li><div><b>%s</b><span>%s</span></div></li>' % (t, d) for t, d in steps)
    return '<div class="seq"><p class="cap">%s</p><ol>%s</ol></div>' % (esc(cap), li)

def cmap(cap, root, branches):
    b = "".join('<div class="branch"><p class="bt">%s</p><ul>%s</ul></div>'
                % (esc(t), "".join('<li>%s</li>' % x for x in items))
                for t, items in branches)
    return ('<div class="map"><p class="cap">%s</p><p class="root">%s</p>'
            '<div class="mapgrid">%s</div></div>' % (esc(cap), root, b))

def hold(cap, *paras):
    return ('<div class="hold"><p class="cap">%s</p>%s</div>'
            % (esc(cap), "".join('<p>%s</p>' % p for p in paras)))

def prob(n, q, given, steps):
    return ('<div class="prob"><p class="cap">Worked problem %d</p><p class="q">%s</p>'
            '<p class="given">%s</p><p class="wl">The work</p><ol>%s</ol></div>'
            % (n, q, given, "".join('<li>%s</li>' % s for s in steps)))

def ul(items): return '<ul class="b">%s</ul>' % "".join('<li>%s</li>' % i for i in items)
def ol(items): return '<ol class="n">%s</ol>' % "".join('<li>%s</li>' % i for i in items)
def p(t):      return '<p>%s</p>' % t
def sec(t):    return '<h3 class="sec">%s</h3>' % esc(t)
def sub(t):    return '<h4 class="sub">%s</h4>' % esc(t)
