#!/usr/bin/env python3
"""Builds the Week 6 and Week 7 guided walkthroughs. Oct 17 2026.

Same build as assemble_w05.py, generalized by week: the Week 4 graded
potentials shell, the shared kit (w05-kit.js), the Before you start card at
the start of each section, the Stuck? reading box above the worksheet, the
yellow video box with seen-video notes, and the Enlarge button. Those pieces
are imported from assemble_w05.py so the two builds can never drift apart.

What differs: each walkthrough keeps everything about itself in three files
beside its scene, so nothing about one walkthrough lives in this script.
  w0N-<slug>.scene.js     the figures and STEPS
  w0N-<slug>.notes.json   title, h1, start label, OpenStax section, the
                          walkthrough-to-notes section map, and the notes
                          (built into pages by tools/make_walkthrough_notes_wk.py)
  w0N-<slug>.videos.json  the Stuck? videos, {"V":{}, "SUP":{}}
The textbook pointer on each notes section names the Silverthorn chapter and
the part to read, not a figure number.

Run the notes builder first, because the Before you start card reads the
notes page:  python3 tools/make_walkthrough_notes_wk.py 6
then:        python3 tools/walkthroughs/assemble_wk.py 6
"""
import pathlib, re, html, json, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import assemble_w05 as A
sys.path.insert(0, str(HERE.parent))
from week_label import relabel

R = A.R
SHELL = A.SHELL
KIT = A.KIT

# the walkthroughs of each week, in teaching order
# Oct 17 2026: in the Week 5 kit, every prompt arrow starts at the top left of its
# instruction, so an arrow pointing right runs through the words. For Weeks 6 and 7
# the arrow starts from the side of the instruction nearest its target, and the
# instruction gets a white halo, so a line that still passes behind it never
# strikes the words through. Week 5 is left as it is.
KIT_ADD = r"""
function promptAt(parent,x,y,lines,ax,ay,rx,ry,rr){
  var g=el("g",{},parent);
  var ring=el("circle",{cx:rx,cy:ry,r:rr,"data-r":rr,fill:"none",stroke:GOLD,"stroke-width":4},g);
  var w=0;lines.forEach(function(l){w=Math.max(w,l.length*17*0.56);});
  var h=(lines.length-1)*22, top=y-15, bot=y+h+5, sx, sy;
  if(ax>=x+w){sx=x+w+8;sy=y-6;}
  else if(ax<=x){sx=x-8;sy=y-6;}
  else if(ay>bot){sx=Math.min(Math.max(ax,x+12),x+w-12);sy=bot+6;}
  else{sx=Math.min(Math.max(ax,x+12),x+w-12);sy=top-6;}
  var cx=(sx+ax)/2,cy=(sy+ay)/2-12;
  el("path",{d:"M"+sx+" "+sy+" Q"+cx+" "+cy+" "+ax+" "+ay,fill:"none",stroke:GDEEP,"stroke-width":4,"marker-end":"url(#ag)"},g);
  lines.forEach(function(l,i){var t=tx(g,x,y+i*22,l,"tm",17,"start");t.setAttribute("stroke","#fff");t.setAttribute("stroke-width","5");t.setAttribute("stroke-linejoin","round");t.setAttribute("paint-order","stroke");});
  g.setAttribute("display","none");g._ring=ring;return g;}
"""

WEEKS = {
 6: ["nmj-contraction", "twitch-motor-units", "fuel-fatigue", "motor-control"],
 7: ["autonomic", "hormones", "pituitary", "reproduction"],
}

# Oct 17 2026: the textbook pointer is a chapter and a part, so the card says
# "read" rather than "look at" a figure.
PREP_JS = r"""
function figText(P){return P.fig||"";}
function readHTML(i){
  var sec=sectionOf(i),P=PREP[sec];if(!P)return "";
  var comp=compOf(i),notes='<a class="b5-keep" href="'+PREP_NOTES+"#"+P.id+'" target="_blank" rel="noopener">'+esc(P.h)+'</a>';
  var li=['<li><b>Your notes:</b> '+notes+'</li>'];
  if(!P.review){
    if(P.fig)li.push('<li><b>Silverthorn:</b> '+esc(figText(P))+'</li>');
    li.push('<li><b>OpenStax:</b> '+esc(PREP_OST.charAt(0).toUpperCase()+PREP_OST.slice(1))+'</li>');
    if(comp)li.push('<li><b>Competency Study Guide:</b> '+esc(comp)+', prompt A or B</li>');
  }
  return '<p class="rb-h">Stuck? Read about this part here</p><ul>'+li.join("")+'</ul>';
}
function prepHTML(i){
  var s=STEPS[i];if(!(i===0||s.sec))return "";
  var sec=sectionOf(i),P=PREP[sec];if(!P)return "";
  var comp=compOf(i),href=PREP_NOTES+"#"+P.id;
  var notes='<a class="b5-keep" href="'+href+'" target="_blank" rel="noopener">'+esc(P.h)+'</a>';
  var li=[];
  if(P.review){
    li.push("Reread the step-by-step sequences in your notes: "+notes+". Try to say each one out loud before you look.");
    li.push("Look back at your Competency Study Guide for this walkthrough and fill in anything you missed.");
  }else{
    li.push("Read this part of your notes: "+notes+".");
    li.push("Read it in your textbook. "+(P.fig?"In Silverthorn, read "+esc(P.fig)+". ":"")+"If you are using OpenStax instead, read "+esc(PREP_OST)+".");
    if(comp)li.push("Work on your Competency Study Guide: "+esc(comp)+". Do prompt A or prompt B for it.");
  }
  return '<div class="prep"><p class="prep-h">Before you start this part</p><ol>'+li.map(function(x){return "<li>"+x+"</li>";}).join("")+'</ol><p class="prep-then">Then come back here, work through the steps, and make your predictions.</p></div>';
}
"""


def meta(week, slug):
    return json.loads((HERE / ("w%02d-%s.notes.json" % (week, slug))).read_text(encoding="utf-8"))


def vids_of(week, slug):
    f = HERE / ("w%02d-%s.videos.json" % (week, slug))
    return json.loads(f.read_text(encoding="utf-8")) if f.exists() else {"V": {}, "SUP": {}}


def prior_for(week, slug):
    """video id -> title of the first earlier walkthrough (this week or the week before) that sends students to it"""
    out = {}
    if week == 6:
        order = [(5, w[0], w[1]) for w in A.WALKS]
    else:
        order = [(6, s, meta(6, s)["title"]) for s in WEEKS[6] if (HERE / ("w06-%s.notes.json" % s)).exists()]
    order += [(week, s, meta(week, s)["title"]) for s in WEEKS[week] if (HERE / ("w%02d-%s.notes.json" % (week, s))).exists()]
    w05 = json.loads((HERE / "w05-videos.json").read_text(encoding="utf-8"))
    for wk, s, title in order:
        if wk == week and s == slug:
            break
        d = w05.get(s, {}) if wk == 5 else vids_of(wk, s)
        used = {x[1] for lst in d.get("SUP", {}).values() for x in lst}
        for k in used:
            if k in d.get("V", {}):
                out.setdefault(A._vid(d["V"][k]["u"]), title)
    return out


def build(week, slug):
    scene_f = HERE / ("w%02d-%s.scene.js" % (week, slug))
    if not scene_f.exists():
        return None
    m = meta(week, slug)
    title, h1, start, ost = m["title"], m["h1"], m["start"], m["ostax"]
    scene = scene_f.read_text(encoding="utf-8")
    s = SHELL
    a = s.index("/* ======================= build scene"); b = s.index("/* ======================= support videos")
    s = s[:a] + KIT.rstrip() + "\n" + KIT_ADD + "\n" + scene.rstrip() + "\n\n" + s[b:]
    vids = vids_of(week, slug)
    old = "(Khan Academy video, '+esc(v.n)+'"
    assert old in s
    s = s.replace(old, "('+esc(v.s||'Khan Academy')+' video, '+esc(v.n)+'")
    a3 = """'</h2>'+paras(s.text);"""
    assert a3 in s
    s = s.replace(a3, """'</h2>'+prepHTML(i)+paras(s.text);""")
    a4 = """return '<div class="support"><p class="lab">Stuck? Watch a short explanation</p><ul>'"""
    assert a4 in s
    s = s.replace(a4, """return '<div class="support"><p class="lab"><svg class="sarrow" viewBox="0 0 40 24" width="40" height="24" aria-hidden="true" focusable="false"><path d="M2 12 H30" stroke="#F2B705" stroke-width="5" stroke-linecap="round"/><path d="M24 4 L36 12 L24 20" fill="none" stroke="#F2B705" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>Watch this video if you need more help with this step</p><ul>'""")
    s = s.replace("</style>", A.STYLE_ADD + "</style>", 1)
    a8 = '<button type="button" class="watch" id="watchBtn" hidden>Watch again</button>'
    assert s.count(a8) == 1
    s = s.replace(a8, '<button type="button" class="zoombtn" id="zoomBtn" aria-haspopup="dialog">Enlarge</button>\n        ' + a8)
    s = s.replace("</body>", A.ZOOM_HTML + "</body>", 1)
    a7 = '<h2 id="wsTitle">Your worksheet</h2>'
    assert s.count(a7) == 1
    s = s.replace(a7, '<div class="readbox" id="readBox"></div>\n    ' + a7)
    a6 = """narr.innerHTML='<div class="fadein">'+h+'</div>';"""
    assert s.count(a6) == 1
    s = s.replace(a6, a6 + """var rb=document.getElementById("readBox");if(rb)rb.innerHTML=readHTML(i);""")

    notes_f = "biol005-w%02d-%s-walkthrough-notes.html" % (week, slug)
    nh = (R / notes_f).read_text(encoding="utf-8")
    secs_notes = {}
    for sid, h2, rest in re.findall(r'<section id="([^"]+)">\s*<h2>([^<]+)</h2>(.{0,900})', nh, re.S):
        fm = re.search(r'<p class="figref"><b>In your textbook:</b>\s*Silverthorn\s*(.*?)\.?</p>', rest, re.S)
        secs_notes[html.unescape(h2)] = {"id": sid, "h": html.unescape(h2), "fig": html.unescape(re.sub(r"<[^>]+>", "", fm.group(1))).strip() if fm else ""}
    prep = {}
    pmap = m.get("prep_map", {})
    for sec in re.findall(r'\{sec:"([^"]+)"', scene):
        key = pmap.get(sec, sec)
        assert key in secs_notes, (slug, "walkthrough section has no notes section", sec, key, list(secs_notes))
        prep[sec] = dict(secs_notes[key], review=(sec == "Review"))
    a = s.index("var V={"); b = s.index("function supportHTML")
    s = s[:a] + "var V=" + json.dumps(vids.get("V", {}), ensure_ascii=False) + ";\nvar SUP=" + json.dumps(vids.get("SUP", {}), ensure_ascii=False) + ";\n" + s[b:]
    s = s.replace("var SUP=", "var PRIOR=" + json.dumps(prior_for(week, slug), ensure_ascii=False) + ";\n" + A.SEEN_JS + "var SUP=", 1)
    x = "class=\"look\">'+esc(x[2])+'</span></li>'"
    assert s.count(x) == 1, (slug, "look")
    s = s.replace(x, "class=\"look\">'+esc(x[2])+'</span>'+seenNote(x[1])+'</li>'")
    a2 = s.index("function supportHTML")
    s = s[:a2] + "var PREP=" + json.dumps(prep, ensure_ascii=False) + ";\nvar PREP_NOTES=" + json.dumps(notes_f) + ";\nvar PREP_OST=" + json.dumps(ost) + ";\n" + PREP_JS + s[a2:]
    t = html.escape(title, quote=False)
    W = str(week)
    for x, y in [("<title>Graded potentials, step by step | BIOL 005 Week 4</title>", "<title>%s, step by step | BIOL 005 Week %s</title>" % (t, W)),
                 ('<span class="tone">Graded</span> potentials, step by step.', h1),
                 ('<span class="course">BIOL 005 Human Physiology, Week 4</span>', '<span class="course">BIOL 005 Human Physiology, Week %s</span>' % W),
                 ('<a href="lecture-week.html?week=4" target="_top">Week 4 lectures</a>', '<a href="lecture-week.html?week=%s" target="_top">Week %s lectures</a>' % (W, W)),
                 ("biol005-w04-graded-potentials-walkthrough-notes.html", notes_f),
                 ("BIOL 005 Week 4: Graded potentials, prediction worksheet", "BIOL 005 Week %s: %s, prediction worksheet" % (W, t)),
                 ('var KEY="bio005-w04-graded-potentials-guided-v1"', 'var KEY="bio005-w%02d-%s-guided-v1"' % (week, slug)),
                 ('var FRAME_ID="biol005-w04-graded-potentials-guided"', 'var FRAME_ID="biol005-w%02d-%s-guided"' % (week, slug)),
                 ("Start over from the beginning<span class=\"cn\">Step 1, a dendrite at rest</span>", "Start over from the beginning<span class=\"cn\">%s</span>" % html.escape(start, quote=False))]:
        assert s.count(x) == 1, (slug, x)
        s = s.replace(x, y)
    for bad in ("—", "<em", "<i>", "Lora", "font-style:italic"):
        assert bad not in s, (slug, bad)
    out = R / ("biol005-w%02d-%s-guided.html" % (week, slug))
    s = relabel(s)   # Oct 18 2026: the week number students read follows Canvas
    out.write_text(s, encoding="utf-8")
    return out.name


if __name__ == "__main__":
    week = int(sys.argv[1])
    only = sys.argv[2:] or WEEKS[week]
    for slug in only:
        n = build(week, slug)
        print("built", n) if n else print("skipped", slug, "(no scene yet)")
