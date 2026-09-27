#!/usr/bin/env python3
"""Builds biol005-w04-action-potential-guided.html from the graded potentials
walkthrough shell plus tools/walkthroughs/action-potential.scene.js.
Only the scene, the steps, the support videos and the names change."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[2]
s = (R / "biol005-w04-graded-potentials-guided.html").read_text(encoding="utf-8")
scene = (R / "tools/walkthroughs/action-potential.scene.js").read_text(encoding="utf-8")
a = s.index("/* ======================= build scene"); b = s.index("/* ======================= support videos")
s = s[:a] + scene.rstrip() + "\n\n" + s[b:]
a = s.index("var V={"); b = s.index("function supportHTML")
s = s[:a] + '''var V={
  ap:{u:"https://www.youtube.com/watch?v=h2H6POZowiU",n:"Neuron action potential description"},
  apm:{u:"https://www.youtube.com/watch?v=MZz4OUOyFvg",n:"Neuron action potential mechanism"}
};
var SUP={};
SUP["Reaching "+M+"55 mV"]=[["What happens when the membrane reaches threshold?","ap","Listen for the voltage reaching threshold and then shooting up."]];
SUP["Stopping at +30"]=[["Why does sodium stop coming in at the peak?","apm","Listen for the inactivation gate closing and the potassium channels opening."]];
SUP["Coming back down"]=[["What brings the voltage back down?","apm","Listen for potassium leaving the cell and the voltage falling."]];
SUP["Dipping below rest"]=[["Why does the voltage dip below rest?","ap","Listen for the voltage going below rest before it comes back."]];
''' + s[b:]
for x, y in [("<title>Graded potentials, step by step | BIOL 005 Week 4</title>", "<title>The action potential, step by step | BIOL 005 Week 4</title>"),
             ('<span class="tone">Graded</span> potentials, step by step.', 'The <span class="tone">action potential</span>, step by step.'),
             ("biol005-w04-graded-potentials-walkthrough-notes.html", "biol005-w04-action-potential-walkthrough-notes.html"),
             ("BIOL 005 Week 4: Graded potentials, prediction worksheet", "BIOL 005 Week 4: The action potential, prediction worksheet"),
             ('var KEY="bio005-w04-graded-potentials-guided-v1"', 'var KEY="bio005-w04-action-potential-guided-v1"'),
             ('var FRAME_ID="biol005-w04-graded-potentials-guided"', 'var FRAME_ID="biol005-w04-action-potential-guided"')]:
    assert s.count(x) == 1, x
    s = s.replace(x, y)
(R / "biol005-w04-action-potential-guided.html").write_text(s, encoding="utf-8")
print("built biol005-w04-action-potential-guided.html")
