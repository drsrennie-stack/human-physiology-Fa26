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
    s = s[:a] + "var V=" + json.dumps(vids.get("V", {}), ensure_ascii=False) + ";\nvar SUP=" + json.dumps(vids.get("SUP", {}), ensure_ascii=False) + ";\n" + s[b:]
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
