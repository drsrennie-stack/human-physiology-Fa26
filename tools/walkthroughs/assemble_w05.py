#!/usr/bin/env python3
"""Builds the Week 5 guided walkthroughs. Oct 4 2026.

Each one is the Week 4 graded potentials shell (head, engine, worksheet,
player, height sender) with tools/walkthroughs/w05-kit.js plus that topic's
scene file dropped in as the SCENE and STEPS blocks, and its names changed.
Only the scene, the steps and the names differ between walkthroughs, which is
the rule in guided-walkthrough-template.md.

Support videos: read from tools/walkthroughs/w05-videos.json (Oct 4 2026), which
holds the links Dr. Rennie finds and sends. Earlier note: Khan Academy could not be reached from the build
environment on Oct 4 2026, and the template says a URL that cannot be verified
is left out rather than shipped. V and SUP are empty, so no Stuck? button shows.

Run: python3 tools/walkthroughs/assemble_w05.py
"""
import pathlib, re, html, json
R = pathlib.Path(__file__).resolve().parents[2]
SHELL = (R / "biol005-w04-graded-potentials-guided.html").read_text(encoding="utf-8")

# Oct 5 2026: walkthrough sections whose notes section has a different name.
PREP_MAP = {
  "reflexes": {"Withdrawal and crossed extensor": "Withdrawal and crossed extensor reflexes", "Review": "Step by step: where the signal travels"},
  "sensory-coding": {"From stimulus to signal": "Receptors and transduction", "Kinds of receptors": "Receptor classes", "Adaptation": "Adaptation and habituation", "Review": "Step by step: where the signal travels"},
  "pathways-pain": {"Touch, from skin to cortex": "Somatic senses and their receptors", "Temperature and pain": "Somatic senses and their receptors", "Review": "Step by step: where the signal travels"},
  "csf-bbb": {"Review": "Step by step: where the signal travels"},
  "vision": {"Refractive errors": "Focusing light", "Phototransduction": "Photoreceptors and phototransduction", "Rods, cones and the pathway": "Processing in the retina and beyond", "Review": "Step by step: where the signal travels"},
  "hearing-balance": {"From air to fluid": "Hearing", "Hearing loss": "Hearing loss and the tuning fork tests", "Balance": "Balance (equilibrium)", "Review": "Step by step: where the signal travels"},
}
OSTAX = {
  "reflexes": "section 14.3, Motor Responses, the part on reflexes",
  "sensory-coding": "section 14.1, Sensory Perception, the first part on sensory receptors",
  "pathways-pain": "section 13.2, The Central Nervous System, the part on the spinal cord, and section 14.2, Central Processing",
  "csf-bbb": "section 13.3, Circulation and the Central Nervous System",
  "vision": "section 14.1, Sensory Perception, the part on vision",
  "hearing-balance": "section 14.1, Sensory Perception, the parts on hearing, balance, taste and smell",
}
STYLE_ADD = """
/* Oct 5 2026: Before you start card, and a video box students can see */
.prep{margin:4px 0 16px;padding:16px 18px;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(11,21,48,.10);max-width:72ch}
.prep-h{margin:0 0 8px;font-family:var(--display,inherit);font-weight:800;font-size:1.05rem;color:var(--maroon,#8B3A2E)}
.prep ol{margin:0 0 8px;padding-left:1.3em}.prep li{margin:0 0 6px;line-height:1.5}
.prep a{color:var(--maroon,#8B3A2E);font-weight:700}
.prep-then{margin:0;font-weight:700;color:var(--navy,#0B1530)}
.support .lab{display:flex;align-items:center;gap:8px;font-size:.95rem!important;letter-spacing:0!important;text-transform:none!important;color:var(--navy,#0B1530)!important;font-weight:800!important}
.support a{background:#FFD23F!important;color:#0B1530!important;box-shadow:0 2px 10px rgba(11,21,48,.18)!important}
.support a:hover{background:#FFC400!important}
.support a:focus-visible{outline:3px solid #0B1530;outline-offset:2px}
.readbox{margin:0 0 18px;padding:14px 16px;background:#FBF6F5;border-radius:12px}
.readbox:empty{display:none}
.zoombtn{position:absolute;top:10px;right:10px;z-index:2;min-height:40px;padding:0 14px;border-radius:999px;border:2px solid var(--navy,#0B1530);background:#fff;color:var(--navy,#0B1530);font:800 .82rem/1 var(--body,inherit);cursor:pointer;box-shadow:0 2px 8px rgba(11,21,48,.15)}
.zoombtn:hover{background:var(--navy,#0B1530);color:#fff}
.zoombtn:focus-visible,.zoomclose:focus-visible{outline:3px solid var(--gold,#C9A14A);outline-offset:3px}
.zoomov{position:fixed;inset:0;z-index:2147483600;background:#F7F8FA;display:flex;flex-direction:column;padding:12px 16px 16px}
.zoomov[hidden]{display:none}
.zoombar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 8px}
.zoomtip{font-weight:700;color:var(--navy,#0B1530);font-size:.95rem}
.zoomclose{min-height:44px;padding:0 20px;border-radius:999px;border:0;background:var(--maroon,#8B3A2E);color:#fff;font:800 .95rem/1 var(--body,inherit);cursor:pointer}
.zoomstage{flex:1;display:flex;align-items:center;justify-content:center;min-height:0}
.zoomstage svg{width:min(100%, calc((100vh - 90px) * 900 / 560));height:auto;max-height:calc(100vh - 90px);background:#fff;border-radius:12px;box-shadow:0 4px 18px rgba(11,21,48,.12)}
/* Oct 5 2026: #scene carries its own max-height (62vh, 38vh on narrow screens), which outranks the rule above and kept the enlarged figure at its normal size. This beats it. */
.zoomstage #scene{width:min(100%, calc((100vh - 90px) * 900 / 560));max-height:calc(100vh - 90px)}
.readbox .rb-h{margin:0 0 6px;font-weight:800;color:var(--maroon,#8B3A2E);font-size:.98rem}
.readbox ul{margin:0;padding-left:1.1em}.readbox li{margin:0 0 4px;line-height:1.45;font-size:.92rem}
.readbox a{color:var(--maroon,#8B3A2E);font-weight:700}
"""
ZOOM_HTML = r"""
<div class="zoomov" id="zoomOv" role="dialog" aria-modal="true" aria-label="Enlarged figure" hidden>
  <div class="zoombar"><span class="zoomtip">The figure still works here: click the things it asks you to.</span>
  <button type="button" class="zoomclose" id="zoomClose">Close</button></div>
  <div class="zoomstage" id="zoomStage"></div>
</div>
<script>
(function(){
  var btn=document.getElementById("zoomBtn"),ov=document.getElementById("zoomOv"),stage=document.getElementById("zoomStage"),
      close=document.getElementById("zoomClose"),svg=document.getElementById("scene");
  if(!btn||!ov||!svg)return;
  var home=svg.parentNode,next=svg.nextSibling;
  function open(){stage.appendChild(svg);ov.hidden=false;document.body.style.overflow="hidden";close.focus();}
  function shut(){home.insertBefore(svg,next);ov.hidden=true;document.body.style.overflow="";btn.focus();}
  btn.addEventListener("click",open);close.addEventListener("click",shut);
  ov.addEventListener("click",function(e){if(e.target===ov)shut();});
  document.addEventListener("keydown",function(e){if(!ov.hidden&&e.key==="Escape"){e.preventDefault();shut();}});
  /* moving to another step brings the figure home first */
  ["backBtn","nextBtn"].forEach(function(id){var b=document.getElementById(id);if(b)b.addEventListener("click",function(){if(!ov.hidden)shut();},true);});
}());
</script>
"""
PREP_JS = r"""
function figText(P){return (P.fig||"").replace(/^open Silverthorn /i,"").replace(/ in your eText beside this section\.?$/,"");}
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
    li.push("Read it in your textbook. "+(P.fig?"In Silverthorn, "+esc(P.fig.replace(/^open Silverthorn /i,"look at ").replace(/ in your eText beside this section\.?$/,"."))+" ":"")+"If you are using OpenStax instead, read "+esc(PREP_OST)+".");
    if(comp)li.push("Work on your Competency Study Guide: "+esc(comp)+". Do prompt A or prompt B for it.");
  }
  return '<div class="prep"><p class="prep-h">Before you start this part</p><ol>'+li.map(function(x){return "<li>"+x+"</li>";}).join("")+'</ol><p class="prep-then">Then come back here, work through the steps, and make your predictions.</p></div>';
}
"""

KIT = (R / "tools/walkthroughs/w05-kit.js").read_text(encoding="utf-8")

# slug, plain title (for <title> and worksheet), h1 html, start-over sublabel
WALKS = [
 ("reflexes", "Spinal reflexes", '<span class="tone">Spinal reflexes</span>, step by step.', "Step 1, a tap below the knee"),
 ("sensory-coding", "Sensory receptors and coding", '<span class="tone">Sensory receptors</span> and coding, step by step.', "Step 1, a touch receptor in the skin"),
 ("pathways-pain", "Spinal pathways, touch and pain", 'Spinal pathways, <span class="tone">touch and pain</span>, step by step.', "Step 1, gray matter and white matter"),
 ("csf-bbb", "Cerebrospinal fluid and the blood-brain barrier", '<span class="tone">Cerebrospinal fluid</span> and the blood-brain barrier, step by step.', "Step 1, the fluid around the brain"),
 ("vision", "Vision", '<span class="tone">Vision</span>, step by step.', "Step 1, light enters the eye"),
 ("hearing-balance", "Hearing, balance, taste and smell", '<span class="tone">Hearing and balance</span>, taste and smell, step by step.', "Step 1, sound is a pressure wave"),
]

def build(slug, title, h1, start):
    scene_f = R / ("tools/walkthroughs/w05-%s.scene.js" % slug)
    if not scene_f.exists():
        return None
    scene = scene_f.read_text(encoding="utf-8")
    s = SHELL
    a = s.index("/* ======================= build scene"); b = s.index("/* ======================= support videos")
    s = s[:a] + KIT.rstrip() + "\n\n" + scene.rstrip() + "\n\n" + s[b:]
    a = s.index("var V={"); b = s.index("function supportHTML")
    vids = json.loads((R / "tools/walkthroughs/w05-videos.json").read_text(encoding="utf-8")).get(slug, {})
    old = "(Khan Academy video, '+esc(v.n)+'"
    assert old in s
    s = s.replace(old, "('+esc(v.s||'Khan Academy')+' video, '+esc(v.n)+'")
    a3 = """'</h2>'+paras(s.text);"""
    assert a3 in s
    s = s.replace(a3, """'</h2>'+prepHTML(i)+paras(s.text);""")
    a4 = """return '<div class="support"><p class="lab">Stuck? Watch a short explanation</p><ul>'"""
    assert a4 in s
    s = s.replace(a4, """return '<div class="support"><p class="lab"><svg class="sarrow" viewBox="0 0 40 24" width="40" height="24" aria-hidden="true" focusable="false"><path d="M2 12 H30" stroke="#F2B705" stroke-width="5" stroke-linecap="round"/><path d="M24 4 L36 12 L24 20" fill="none" stroke="#F2B705" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>Watch this video if you need more help with this step</p><ul>'""")
    s = s.replace("</style>", STYLE_ADD + "</style>", 1)
    # Oct 5 2026: an Enlarge button opens the live figure full screen.
    a8 = '<button type="button" class="watch" id="watchBtn" hidden>Watch again</button>'
    assert s.count(a8) == 1
    s = s.replace(a8, '<button type="button" class="zoombtn" id="zoomBtn" aria-haspopup="dialog">Enlarge</button>\n        ' + a8)
    s = s.replace("</body>", ZOOM_HTML + "</body>", 1)
    a5 = '<p class="sr" id="sceneDesc" aria-live="polite"></p>'
    assert s.count(a5) == 1
    # Oct 5 2026: the reading box sits at the top of the right-hand column,
    # above the worksheet, so it never covers the figure or the step text.
    a7 = '<h2 id="wsTitle">Your worksheet</h2>'
    assert s.count(a7) == 1
    s = s.replace(a7, '<div class="readbox" id="readBox"></div>\n    ' + a7)
    a6 = """narr.innerHTML='<div class="fadein">'+h+'</div>';"""
    assert s.count(a6) == 1
    s = s.replace(a6, a6 + """var rb=document.getElementById("readBox");if(rb)rb.innerHTML=readHTML(i);""")

    # Oct 5 2026: a Before you start card at the start of each section, tying
    # the walkthrough to its notes, the book and the Competency Study Guide.
    notes_f = "biol005-w05-%s-walkthrough-notes.html" % slug
    nh = (R / notes_f).read_text(encoding="utf-8")
    secs_notes = {}
    for sid, h2, rest in re.findall(r'<section id="([^"]+)">\s*<h2>([^<]+)</h2>(.{0,900})', nh, re.S):
        fm = re.search(r'<p class="figref"><b>In your textbook:</b>\s*(.*?)</p>', rest, re.S)
        secs_notes[html.unescape(h2)] = {"id": sid, "h": html.unescape(h2), "fig": html.unescape(re.sub(r"<[^>]+>", "", fm.group(1))).strip() if fm else ""}
    prep = {}
    for sec in re.findall(r'\{sec:"([^"]+)"', scene):
        key = PREP_MAP.get(slug, {}).get(sec, sec)
        if key in secs_notes:
            prep[sec] = dict(secs_notes[key], review=(sec == "Review"))
    a = s.index("var V={"); b = s.index("function supportHTML")
    s = s[:a] + "var V=" + json.dumps(vids.get("V", {}), ensure_ascii=False) + ";\nvar SUP=" + json.dumps(vids.get("SUP", {}), ensure_ascii=False) + ";\n" + s[b:]
    a2 = s.index("function supportHTML")
    s = s[:a2] + "var PREP=" + json.dumps(prep, ensure_ascii=False) + ";\nvar PREP_NOTES=" + json.dumps(notes_f) + ";\nvar PREP_OST=" + json.dumps(OSTAX[slug]) + ";\n" + PREP_JS + s[a2:]
    t = html.escape(title, quote=False)
    for x, y in [("<title>Graded potentials, step by step | BIOL 005 Week 4</title>", "<title>%s, step by step | BIOL 005 Week 5</title>" % t),
                 ('<span class="tone">Graded</span> potentials, step by step.', h1),
                 ('<span class="course">BIOL 005 Human Physiology, Week 4</span>', '<span class="course">BIOL 005 Human Physiology, Week 5</span>'),
                 ('<a href="lecture-week.html?week=4" target="_top">Week 4 lectures</a>', '<a href="lecture-week.html?week=5" target="_top">Week 5 lectures</a>'),
                 ("biol005-w04-graded-potentials-walkthrough-notes.html", "biol005-w05-%s-walkthrough-notes.html" % slug),
                 ("BIOL 005 Week 4: Graded potentials, prediction worksheet", "BIOL 005 Week 5: %s, prediction worksheet" % t),
                 ('var KEY="bio005-w04-graded-potentials-guided-v1"', 'var KEY="bio005-w05-%s-guided-v1"' % slug),
                 ('var FRAME_ID="biol005-w04-graded-potentials-guided"', 'var FRAME_ID="biol005-w05-%s-guided"' % slug),
                 ("Start over from the beginning<span class=\"cn\">Step 1, a dendrite at rest</span>", "Start over from the beginning<span class=\"cn\">%s</span>" % start)]:
        assert s.count(x) == 1, (slug, x)
        s = s.replace(x, y)
    for bad in ("\u2014", "<em", "<i>", "Lora", "font-style:italic"):
        assert bad not in s, (slug, bad)
    out = R / ("biol005-w05-%s-guided.html" % slug)
    out.write_text(s, encoding="utf-8")
    return out.name

if __name__ == "__main__":
    for w in WALKS:
        n = build(*w)
        print("built", n) if n else print("skipped", w[0], "(no scene yet)")
