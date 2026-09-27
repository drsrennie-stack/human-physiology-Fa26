#!/usr/bin/env python3
"""
tools/lesson_videos_w04.py

Videos for the Week 4 topics that do not have a walkthrough yet. Each list
goes in a Videos for this topic box near the top of that topic's notes page
(between VIDEOS markers, so re-running replaces it) and is where the future
walkthrough takes its Stuck? buttons from. Sep 27 2026, Scrubs supplied or
approved these; every title was read from YouTube's own oEmbed record in
Chrome on Sep 27 2026 (channel khanacademymedicine).

Run: python3 tools/lesson_videos_w04.py
"""
import html, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
def e(s): return html.escape(s, quote=True)

VIDEOS = {
 "biol005-w04-ap-conduction-notes.html": [
   ("Action potential patterns", "https://www.youtube.com/watch?v=jM-gvSqsP5A",
    "How does a neuron signal a stronger stimulus when every spike is the same size?"),
   ("Effects of axon diameter and myelination", "https://www.youtube.com/watch?v=_Lj_F9GADa4",
    "Why do thick, myelinated axons conduct fastest?"),
 ],
 "biol005-w04-synapse-notes.html": [
   ("Neuronal synapses (chemical)", "https://www.youtube.com/watch?v=Tbq-KZaXiL4",
    "What happens at a chemical synapse, from start to finish?"),
   ("Synapse structure", "https://www.youtube.com/watch?v=iqf3ft0mh1M",
    "What are the parts of a synapse?"),
   ("Neurotransmitter release", "https://www.youtube.com/watch?v=Ac-Npt3vgCE",
    "What happens at the axon terminal when an action potential arrives?"),
   ("Types of neurotransmitters", "https://www.youtube.com/watch?v=FXYX_ksRwIk",
    "What are the main kinds of neurotransmitter, and how do they differ?"),
   ("Types of neurotransmitter receptors", "https://www.youtube.com/watch?v=yg44T2HcA2o",
    "What is the difference between fast and slow receptors?"),
 ],
 "biol005-w04-synaptic-integration-notes.html": [
   ("Neuron graded potential mechanism", "https://www.youtube.com/watch?v=NaAwVrOEyss",
    "EPSPs and IPSPs are graded potentials. How does one form and add to others?"),
   ("Neuroplasticity", "https://www.youtube.com/watch?v=J8wW1t1JqUc",
    "How can the connections between neurons change with use?"),
   ("Long term potentiation and synaptic plasticity", "https://www.youtube.com/watch?v=uVQXZudZd5s",
    "What is long-term potentiation, and how does a synapse get stronger?"),
 ],
}

CSS = ('<style id="vids-css">.vids{scroll-margin-top:96px;background:#fff;border-radius:12px;padding:16px 20px;margin:0 0 20px;'
       'box-shadow:0 1px 3px rgba(11,21,48,.08)}.vids h2{margin:0 0 6px}.vids ul{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:10px}'
       '.vids li{margin:0}.vids a{font-weight:700}.vids .with{display:block;font-size:14px;color:#414B5C}.vids .mm-vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}@media print{.vids{display:none}}</style>')

def box(items):
    li = "".join('<li><a href="%s" target="_blank" rel="noopener">%s<span class="mm-vh"> (Khan Academy video, opens in a new tab)</span></a>'
                 '<span class="with">Watch it for: %s</span></li>' % (e(u), e(n), e(q)) for n, u, q in items)
    return ('<!--VIDEOS--><section class="vids" id="videos" aria-labelledby="vidsH"><h2 id="vidsH">Videos for this topic</h2>'
            '<p>Short Khan Academy videos that go with this topic. Watch them before you read the notes if that helps you, or come back to one when a part is unclear.</p>'
            '<ul>%s</ul></section><!--/VIDEOS-->' % li)

for f, items in VIDEOS.items():
    p = ROOT / f; s = p.read_text(encoding="utf-8")
    s = re.sub(r"<!--VIDEOS-->.*?<!--/VIDEOS-->", "", s, flags=re.S)
    if 'id="vids-css"' not in s: s = s.replace("</head>", CSS + "\n</head>", 1)
    m = re.search(r'<div class="key">.*?</div>', s, flags=re.S)
    s = s[:m.end()] + box(items) + s[m.end():]
    p.write_text(s, encoding="utf-8"); print("videos added to", f)
