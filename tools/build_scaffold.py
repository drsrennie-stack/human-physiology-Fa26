#!/usr/bin/env python3
"""
Build the BIO 005 competency file (268) and the card authoring scaffold
from bio005-competencies.csv.

Outputs
  out/bio005-competencies.js   the 268 competency set, same field shape the
                               old 137 file used, so every downstream tool
                               (Mastery OS, competency map, schedule page,
                               mastery-evidence) reads it unmodified
  out/topics.json              module and topic metadata for the card bank
  out/briefs/brief-mNN.json    one authoring brief per module, listing every
                               competency with its card quota and DOK split
"""

import csv, json, os, re, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "out")
os.makedirs(os.path.join(OUT, "briefs"), exist_ok=True)

# ---------------------------------------------------------------- quotas
# Roughly 5,000 cards across 268 competencies. Core competencies carry the
# most because they are what the exams are built from. The DOK split starts
# heavy on recall because the engine gates DOK 2 behind DOK 1 and DOK 3
# behind DOK 2, so a thin DOK 1 layer would stall students at the gate.
QUOTA = {
    "core":    {"total": 19, 1: 8, 2: 7, 3: 4},
    "high":    {"total": 18, 1: 8, 2: 6, 3: 4},
    "support": {"total": 14, 1: 6, 2: 5, 3: 3},
}

# Coarse body-system tag for the dashboard, keyed off the fine topic.
GENERAL = {
    "Foundations of Physiology": "Foundations",
    "Quantitative Skills for Physiology": "Foundations",
    "Chemical Foundations": "Foundations",
    "Membrane Structure and Diffusion": "Cell Physiology",
    "Membrane Transport": "Cell Physiology",
    "Membrane Potential": "Cell Physiology",
    "Cell Signaling": "Cell Physiology",
    "Neurons and Neuroglia": "Nervous",
    "Electrical Signaling": "Nervous",
    "Synaptic Transmission": "Nervous",
    "Central Integration and Reflexes": "Nervous",
    "Skeletal Muscle Physiology": "Muscular",
    "Cardiac and Smooth Muscle": "Muscular",
    "General Sensory Physiology": "Sensory",
    "Special Senses": "Sensory",
    "Motor Control": "Nervous",
    "Autonomic Nervous System": "Autonomic",
    "Endocrine Principles": "Endocrine",
    "Endocrine Glands": "Endocrine",
    "Blood": "Blood",
    "Cardiac Electrophysiology": "Cardiovascular",
    "Cardiac Mechanics": "Cardiovascular",
    "Vascular Physiology": "Cardiovascular",
    "Cardiovascular Regulation": "Cardiovascular",
    "Respiratory Mechanics": "Respiratory",
    "Gas Exchange and Transport": "Respiratory",
    "Control of Ventilation": "Respiratory",
    "Renal Physiology": "Renal",
    "Acid Base and Fluid Balance": "Renal",
    "Digestive Physiology": "Digestive",
    "Metabolism and Energy Balance": "Metabolic",
    "Immune Physiology": "Immune",
    "Reproductive Physiology": "Reproductive",
    "Integration": "Integration",
}

FACET_CUES = [
    ("calc",     r"\bcalculat|\bconvert|\bcompute|equation\b|\bratio\b|percentage"),
    ("graph",    r"\bgraph|\bcurve|\bplot\b|\btracing\b|spirogram|\bslope\b|\baxes\b"),
    ("data",     r"\binterpret|\bdata set|\bread\b|\bmeasure|\brecord\b|\bvalues\b"),
    ("clinical", r"\bclinical|\bdisorder|\bdisease|\bpatient|\bdrug|\bpathology|"
                 r"\blesion|\bdeficien|\bexcess\b|\bfail|\bpoison|diabet|anemia|shock"),
    ("draw",     r"\bdiagram|\bdraw\b|\blabel\b|\btrace\b"),
    ("model",    r"\bsimulat|\bmodel\b"),
]

EST_BASE = {1: 8, 2: 12, 3: 18, 4: 24}
EST_YIELD = {"core": 1.3, "high": 1.0, "support": 0.7}


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def facets_for(row):
    f = []
    if row["Lecture"].strip() == "Yes":
        f.append("lecture")
    if row["Lab"].strip() == "Yes":
        f.append("lab")
    text = (row["Competency"] + " " + row["You should be able to"]).lower()
    for name, pat in FACET_CUES:
        if re.search(pat, text):
            f.append(name)
    return f


def est_for(dok, yld):
    raw = EST_BASE.get(dok, 12) * EST_YIELD.get(yld, 1.0)
    return int(round(raw / 5.0) * 5) or 5


def main():
    rows = list(csv.DictReader(
        open(os.path.join(ROOT, "comp268.csv"), newline="", encoding="utf-8-sig")))

    comps = []
    for r in rows:
        cid = r["ID"].strip()
        week = int(re.match(r"w(\d+)", cid).group(1))
        dok = int(r["DOK"])
        yld = r["Yield"].strip()
        topic = r["Topic"].strip()
        lecture = r["Lecture"].strip() == "Yes"
        lab = r["Lab"].strip() == "Yes"
        comps.append({
            "id": cid,
            "module": int(r["Module"]),
            "week": week,
            "system": topic,
            "general": GENERAL.get(topic, topic),
            "name": r["Competency"].strip(),
            "can": r["You should be able to"].strip(),
            "dok": dok,
            "yield": yld,
            "est": est_for(dok, yld),
            "facets": facets_for(r),
            # not written to the js, used by the scaffold only
            "_topicId": "t-" + slug(topic),
            "_moduleTitle": r["Module title"].strip(),
            "_lecture": lecture,
            "_lab": lab,
            "_labOnly": lab and not lecture,
            "_n": int(r["#"]),
        })

    write_competencies_js(comps)
    topics = write_topics_json(comps)
    write_briefs(comps, topics)
    report(comps)


# ---------------------------------------------------------------- js file
def write_competencies_js(comps):
    src = os.path.join(ROOT, "bio005-competencies.js.orig")
    head_end = "window.BIO005_COMPETENCIES = ["
    original = open(src, encoding="utf-8").read()
    header = original[: original.index(head_end)]
    tail = original[original.index("window.BIO005_MODULES"):]

    header = header.replace(
        "     dok      depth of knowledge, 1 recall, 2 apply, 3 analyze, 4 transfer",
        "     dok      depth of knowledge, 1 recall, 2 apply, 3 analyze\n"
        "              DOK 4 is deliberately absent. Transfer at that depth is\n"
        "              clinical medicine, not first year physiology.")
    header += (
        "/* ------------------------------------------------------------\n"
        "   REGENERATED at 268 competencies from bio005-competencies.csv.\n"
        "   The previous file in this repo held the superseded 137 set with\n"
        "   m1-* ids. PLACEHOLDERS item B resolved that in favour of 268, and\n"
        "   the card bank is tagged to these w1-* ids, so the two files have\n"
        "   to agree or answering a card moves no mastery bar.\n"
        "   ------------------------------------------------------------ */\n\n")

    lines = []
    cur_mod = None
    for c in comps:
        if c["module"] != cur_mod:
            cur_mod = c["module"]
            lines.append("\n/* ============================================================\n"
                         "   MODULE %d  %s\n"
                         "   ============================================================ */\n"
                         % (cur_mod, c["_moduleTitle"]))
        public = {k: v for k, v in c.items() if not k.startswith("_")}
        lines.append(json.dumps(public, ensure_ascii=False) + ",")

    body = head_end + "\n" + "\n".join(lines).rstrip(",") + "\n];\n\n"
    out = header + body + tail
    out = re.sub(r'"totalCompetencies":\s*\d+', '"totalCompetencies": %d' % len(comps), out)
    # DOK 4 is out of the course by decision, so it goes out of the label
    # table too. Leaving it would let a downstream tool render an "Extend"
    # tier that no competency and no card will ever populate.
    out = re.sub(r'dokLabels:\s*\{[^}]*\}',
                 'dokLabels: { 1:"Recall", 2:"Apply", 3:"Analyze" }', out)
    open(os.path.join(OUT, "bio005-competencies.js"), "w", encoding="utf-8").write(out)


# ------------------------------------------------------------- topics.json
def write_topics_json(comps):
    mods = collections.OrderedDict()
    for c in comps:
        m = mods.setdefault(c["module"], {
            "id": "m-%d-%s" % (c["module"], slug(c["_moduleTitle"])[:28]),
            "n": c["module"],
            "title": "Module %d. %s" % (c["module"], c["_moduleTitle"]),
            "topics": collections.OrderedDict(),
        })
        t = m["topics"].setdefault(c["_topicId"], {
            "id": c["_topicId"],
            "title": c["system"],
            "module": c["module"],
            "general": c["general"],
            "weeks": set(),
            "comps": [],
        })
        t["weeks"].add(c["week"])
        t["comps"].append(c["id"])

    out = {"courseLabel": "BIO 005 Human Physiology", "modules": []}
    for n, m in mods.items():
        tl = []
        for t in m["topics"].values():
            wk = sorted(t["weeks"])
            t["weeks"] = wk
            t["summary"] = "%s. %d competenc%s, week%s %s." % (
                t["title"], len(t["comps"]), "y" if len(t["comps"]) == 1 else "ies",
                "" if len(wk) == 1 else "s", ", ".join(str(w) for w in wk))
            tl.append(t)
        out["modules"].append({"id": m["id"], "n": m["n"], "title": m["title"], "topics": tl})
    json.dump(out, open(os.path.join(OUT, "topics.json"), "w", encoding="utf-8"),
              indent=1, ensure_ascii=False)
    return out


# ----------------------------------------------------------------- briefs
def write_briefs(comps, topics):
    by_mod = collections.defaultdict(list)
    for c in comps:
        q = QUOTA[c["yield"]]
        tags = []
        if c["_labOnly"]:
            tags = ["lab", "application"]
        elif c["_lab"]:
            tags = ["lecture", "lab"]
        else:
            tags = ["lecture"]
        by_mod[c["module"]].append({
            "competencyId": c["id"],
            "topicId": c["_topicId"],
            "topicTitle": c["system"],
            "week": c["week"],
            "name": c["name"],
            "can": c["can"],
            "yield": c["yield"],
            "competencyDok": c["dok"],
            "tags": tags,
            "labOnly": c["_labOnly"],
            "cards": {"total": q["total"], "dok1": q[1], "dok2": q[2], "dok3": q[3]},
        })
    for n, items in sorted(by_mod.items()):
        mt = next(m for m in topics["modules"] if m["n"] == n)
        json.dump({"module": n, "moduleId": mt["id"], "moduleTitle": mt["title"],
                   "competencies": items},
                  open(os.path.join(OUT, "briefs", "brief-m%d.json" % n), "w",
                       encoding="utf-8"), indent=1, ensure_ascii=False)


def report(comps):
    tot = dok = collections.Counter()
    n = 0
    for c in comps:
        q = QUOTA[c["yield"]]
        n += q["total"]
        for d in (1, 2, 3):
            dok[d] += q[d]
    per_mod = collections.Counter()
    for c in comps:
        per_mod[c["module"]] += QUOTA[c["yield"]]["total"]
    print("competencies %d   cards planned %d" % (len(comps), n))
    print("dok split", dict(dok))
    print("per module", dict(sorted(per_mod.items())))
    print("lab-only competencies",
          sum(1 for c in comps if c["_labOnly"]),
          "  lecture+lab", sum(1 for c in comps if c["_lab"] and c["_lecture"]))


if __name__ == "__main__":
    main()
