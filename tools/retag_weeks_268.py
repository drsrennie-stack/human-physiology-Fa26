#!/usr/bin/env python3
"""
Move the 268 competency set onto the Aug 23 week ORDER, without renaming
anything and without merging anything.

Decision of record, Aug 24 2026: keep 268, keep every competency id exactly as
it is, keep the sensory competencies un-merged, and change only which week each
competency is taught in.

That makes this a much smaller and safer change than the 258 migration:

  * No competency id changes. So card `competencyId` fields do not move, and
    os/card-competency-map.js stays byte-identical.
  * Card `week` fields are derived from bio005-competencies.js by
    tools/assemble_bank.py, so they follow automatically on the next assemble.
  * Nothing is deleted. 268 in, 268 out.

The id prefixes (w1-, w7- and so on) are now historical labels, not week
numbers. That is deliberate: renaming them is what would force a card
migration, and the whole point of this decision was to avoid one. The `week`
field on the competency record is the truth. Nothing should read the prefix.

Outputs under build268/:
  bio005-competencies.js        regenerated, 268, 3 parts, new week field
  bio005-week-reassignment.csv  audit trail, all 268, old week -> new week
  WEEK-REASSIGNMENT-REPORT.md

Run from the repo root:  python3 tools/retag_weeks_268.py
"""

import csv, json, os, re, collections, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, "build268")

# ----------------------------------------------------------------------------
# The Aug 23 week ORDER, carried in her student-facing voice rather than as
# textbook noun phrases. The order is the schedule of record. The titles follow
# the student language rule, which is the Aug 24 call.
# ----------------------------------------------------------------------------

WEEK_TITLES = {
    1:  "How physiology works and what keeps you steady",
    2:  "The chemistry that does work in the body",
    3:  "Getting across the membrane",
    4:  "The action potential",
    5:  "The nervous system, from sensing to moving",
    6:  "How muscle makes force",
    7:  "Hormones, the slow control system",
    8:  "Reproduction, and the clearest positive feedback loop",
    9:  "The heart as a pump",
    10: "Pressure, flow, and holding blood pressure steady",
    11: "Blood, and how the body defends itself",
    12: "Digestion, and how you use food for fuel",
    13: "Breathing, gas transport, and blood pH",
    14: "The kidney, and body fluid balance",
    15: "The slow lever on pH, and putting it all together",
}

PARTS = [
    (1, "Part 1. Foundations", [1, 2, 3],
     "The toolkit. Nothing is a body system yet. Homeostasis, feedback, mass "
     "balance, the chemistry that does work here, and how things cross a membrane."),
    (2, "Part 2. Control Systems", [4, 5, 6, 7, 8],
     "Signal from sensor to effector, electrically and chemically. The same "
     "control loop, run first with ions and then with hormones."),
    (3, "Part 3. Systems in Action", [9, 10, 11, 12, 13, 14, 15],
     "The same control loop again in one system after another, until the "
     "pattern is the thing you recognise rather than the facts."),
]

TOPIC_WEEK = {
    "Foundations of Physiology": 1,
    "Quantitative Skills for Physiology": 1,
    "Chemical Foundations": 2,
    "Membrane Structure and Diffusion": 3,
    "Membrane Transport": 3,
    "Membrane Potential": 4,
    "Neurons and Neuroglia": 4,
    "Electrical Signaling": 4,
    "Synaptic Transmission": 4,
    "Central Integration and Reflexes": 5,
    "General Sensory Physiology": 5,
    "Special Senses": 5,
    "Motor Control": 5,
    "Autonomic Nervous System": 5,
    "Skeletal Muscle Physiology": 6,
    "Cardiac and Smooth Muscle": 6,
    "Cell Signaling": 7,
    "Endocrine Principles": 7,
    "Endocrine Glands": 7,
    "Reproductive Physiology": 8,
    "Cardiac Electrophysiology": 9,
    "Cardiac Mechanics": 9,
    "Vascular Physiology": 10,
    "Cardiovascular Regulation": 10,
    "Blood": 11,
    "Immune Physiology": 11,
    "Digestive Physiology": 12,
    "Metabolism and Energy Balance": 12,
    "Respiratory Mechanics": 13,
    "Gas Exchange and Transport": 13,
    "Control of Ventilation": 13,
    "Acid Base and Fluid Balance": 13,
    "Renal Physiology": 14,
    "Integration": 15,
}

# Per-competency overrides, every one recorded in the schedule of record.
EXCEPTIONS = {
    "w1-fluid-compartments":        (3,  "compartments belong with membranes and transport"),
    "w1-compartment-shifts":        (3,  "clinical volume shifts follow the compartments"),
    "w14-atp-pathways":             (2,  "Week 2 lists the metabolic pathways in outline"),
    "w9-growth-hormone":            (12, "metabolic actions sit with energy balance"),
    "w9-thyroid":                   (12, "metabolic rate sits with energy balance"),
    "w9-stress-response":           (12, "cortisol's metabolic actions sit with energy balance"),
    "w9-islet-hormones":            (12, "insulin and glucagon sit with energy balance"),
    "w9-diabetes":                  (12, "follows the islet hormones"),
    "w9-lab-glucose-tolerance":     (12, "follows the islet hormones"),
    "w9-adrenal-cortex":            (10, "aldosterone sits with renin angiotensin and blood volume"),
    "w8-adrenal-medulla":           (9,  "Week 9 names the adrenal medulla directly"),
    "w9-calcium-homeostasis":       (14, "Week 14 names sodium, potassium, and calcium balance"),
    "w9-posterior-pituitary":       (7,  "stays with the axis template"),
    "w9-lab-hormone-assay":         (7,  "stays with the axis template"),
    "w11-lymph-return":             (11, "lymphatic return pairs with immune surveillance"),
    "w11-edema":                    (10, "edema stays with Starling forces"),
    "w13-buffer-systems":           (13, "buffers come with the fast respiratory lever"),
    "w13-respiratory-ph-control":   (13, "the fast lever"),
    "w13-renal-ph-control":         (15, "the slow lever"),
    "w13-acid-base-disorders":      (15, "read once both levers are on the table"),
    "w13-acid-base-compensation":   (15, "read once both levers are on the table"),
    "w13-lab-abg-interpretation":   (15, "read once both levers are on the table"),
    "w13-volume-osmolarity":        (14, "volume and osmolarity sit with fluid and electrolyte balance"),
}

EST_BY_DOK = {1: 15, 2: 20, 3: 27}


def main():
    rows = list(csv.DictReader(open(os.path.join(ROOT, "bio005-competencies.csv"),
                                    encoding="utf-8-sig")))
    assert len(rows) == 268, "expected the 268 set, got %d" % len(rows)

    if os.path.isdir(BUILD):
        shutil.rmtree(BUILD)
    os.makedirs(BUILD)

    audit, recs = [], []
    for r in rows:
        cid = r["ID"]
        old_week = int(cid.split("-")[0][1:])
        if cid in EXCEPTIONS:
            wk, why = EXCEPTIONS[cid]
        else:
            wk, why = TOPIC_WEEK[r["Topic"]], "topic moves as a block"

        part = next(p for p in PARTS if wk in p[2])
        facets = ([  "lecture"] if r["Lecture"] else []) + (["lab"] if r["Lab"] else [])
        dok = int(r["DOK"])
        recs.append({
            "id": cid, "module": part[0], "week": wk,
            "system": r["Topic"], "general": r["Topic"],
            "name": r["Competency"], "can": r["You should be able to"],
            "dok": dok, "yield": r["Yield"], "est": EST_BY_DOK[dok],
            "facets": facets,
        })
        audit.append({"id": cid, "topic": r["Topic"], "old_week": old_week,
                      "new_week": wk,
                      "action": "moved" if wk != old_week else "unchanged",
                      "reason": why})

    assert len(recs) == 268
    assert len({r["id"] for r in recs}) == 268, "id collision"

    per_week = collections.Counter(r["week"] for r in recs)
    EXPECTED = {1: 12, 2: 7, 3: 16, 4: 29, 5: 35, 6: 20, 7: 18, 8: 7,
                9: 17, 10: 13, 11: 19, 12: 23, 13: 24, 14: 21, 15: 7}
    bad = {w: (per_week[w], EXPECTED[w]) for w in EXPECTED if per_week[w] != EXPECTED[w]}
    if bad:
        print("WEEK COUNT MISMATCH (got, expected):", bad, file=sys.stderr)
        sys.exit(1)

    with open(os.path.join(BUILD, "bio005-week-reassignment.csv"), "w",
              newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["id", "topic", "old_week", "new_week",
                                          "action", "reason"])
        w.writeheader(); w.writerows(audit)

    total_est = sum(r["est"] for r in recs)
    modules = [{"n": p[0], "title": p[1], "weeks": p[2],
                "exam": (None if p[0] == 1 else "Midterm checkpoint" if p[0] == 2
                         else "Case conference and final patient file"),
                "examOpens": None,
                "examCloses": (None if p[0] == 1 else "2026-11-01" if p[0] == 2
                               else "2026-12-16"),
                "focus": p[3]} for p in PARTS]
    meta = {"course": "BIO 005 Human Physiology", "code": "BIOL-5-D9286",
            "college": "Yuba College", "campus": "Sutter Internet (NET)",
            "term": "Fall 2026",
            "delivery": "Fully asynchronous online, lecture and lab",
            "start": "2026-09-08", "end": "2026-12-16", "census": "2026-09-27",
            "lastDrop": "2026-11-21", "seats": 30, "waitlist": 10,
            "instructor": "Dr. Sharilyn Rennie",
            "totalCompetencies": 268, "totalEst": total_est,
            "weekTitles": WEEK_TITLES, "orderAdopted": "2026-08-23",
            "setConfirmed": "2026-08-24"}

    header = """/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-competencies.js

   GENERATED by tools/retag_weeks_268.py. Do not hand edit.
   Source of truth: bio005-competencies.csv

   268 competencies. Decision of record, Aug 24 2026: the set stays at
   268, every id keeps its exact name, and the sensory competencies are
   NOT merged. Only the week each competency is taught in has changed,
   onto the order adopted Aug 23.

   WARNING ABOUT THE IDS. An id prefix like w7- is a historical label,
   not a week number, and after this pass many of them disagree with the
   week the competency is actually taught in. That is deliberate:
   renaming ids is what would have forced a re-tag of all 4,980 cards,
   and avoiding that was the point of this decision.

   Read the `week` field. Never parse the prefix.

   est is minutes of study per competency, weighted by DOK: Recall 15,
   Apply 20, Analyze 27.
   ============================================================ */

"""
    js = header + "window.BIO005_COMPETENCIES = [\n"
    js += ",\n".join("  " + json.dumps(r, ensure_ascii=False) for r in recs)
    js += "\n];\n\n"
    js += "window.BIO005_MODULES = " + json.dumps(modules, ensure_ascii=False, indent=2) + ";\n\n"
    js += "window.BIO005_META = " + json.dumps(meta, ensure_ascii=False, indent=2) + ";\n\n"
    js += """/* The view every page reads. Exported here so it exists exactly once. */
window.BIO005 = (function () {
  var C = window.BIO005_COMPETENCIES || [];
  function groupBy(key) {
    return C.reduce(function (acc, c) { (acc[c[key]] = acc[c[key]] || []).push(c); return acc; }, {});
  }
  return {
    all: C,
    modules: window.BIO005_MODULES || [],
    meta: window.BIO005_META || {},
    byId: C.reduce(function (a, c) { a[c.id] = c; return a; }, {}),
    byModule: groupBy('module'),
    byWeek: groupBy('week'),
    byGeneral: groupBy('general'),
    bySystem: groupBy('system'),
    total: C.length,
    totalEst: C.reduce(function (s, c) { return s + (c.est || 0); }, 0)
  };
}());
"""
    open(os.path.join(BUILD, "bio005-competencies.js"), "w", encoding="utf-8").write(js)

    moved = sum(1 for a in audit if a["action"] == "moved")
    mism = [(r["id"], r["week"]) for r in recs
            if int(r["id"].split("-")[0][1:]) != r["week"]]

    L = ["# BIO 005 week reassignment report\n",
         "Decision of record, Aug 24 2026: **keep 268, keep every id, merge nothing.** "
         "Only the week assignment changes, onto the order adopted Aug 23.\n",
         "## Totals\n", "| | |", "|---|---|",
         "| Competencies in | 268 |",
         "| Competencies out | 268 |",
         "| **Moved to a different week** | **%d** |" % moved,
         "| Stayed in the same week | %d |" % (268 - moved),
         "| Competency ids changed | **0** |",
         "| Cards needing a re-tag | **0** |",
         "| Total study minutes | %d (%.0f hours) |" % (total_est, total_est / 60.0), "",
         "Because no id changed, `os/card-competency-map.js` is unchanged and every "
         "card keeps the competency it proves. Card `week` fields are derived from "
         "this file by `tools/assemble_bank.py`, so they follow on the next assemble.\n",
         "## Competencies per week\n",
         "| Week | Title | Competencies |", "|---|---|---|"]
    for w in range(1, 16):
        flag = "  **heaviest week**" if per_week[w] == max(per_week.values()) else ""
        L.append("| %d | %s | %d%s |" % (w, WEEK_TITLES[w], per_week[w], flag))
    L += ["", "## The one thing to look at\n",
          "**Week 5 carries %d competencies, and Weeks 4 and 5 carry %d between them.** "
          "The average week is %.0f.\n" % (per_week[5], per_week[4] + per_week[5],
                                           268 / 15.0),
          "That is the direct cost of not merging the sensory competencies. The Aug 23 "
          "sensory shrink, eighteen down to eight, existed specifically to relieve this "
          "block, because Weeks 4 and 5 now hold what four weeks used to hold: neurons, "
          "action potentials, synapses, reflexes, sensory, special senses, motor, and "
          "autonomic.\n",
          "You have chosen to keep all eighteen, which is a defensible call. It is worth "
          "knowing that it is the reason Week 5 is the heaviest week in the course by a "
          "wide margin, and worth deciding now rather than in October whether Week 5 gets "
          "a lighter workbook to compensate.\n",
          "One lever if it needs relieving later, and it does not require touching any "
          "id: move the six membrane potential competencies from Week 4 back to Week 3. "
          "That gives Week 3 twenty two and Week 4 twenty three.\n",
          "## Ids that no longer match their week\n",
          "%d of the 268 ids carry a prefix that disagrees with the week they are now "
          "taught in. This is expected and harmless as long as nothing parses the "
          "prefix. Read the `week` field.\n" % len(mism)]
    open(os.path.join(BUILD, "WEEK-REASSIGNMENT-REPORT.md"), "w",
         encoding="utf-8").write("\n".join(L))

    print("268 -> 268. moved %d, unchanged %d, ids changed 0, cards re-tagged 0"
          % (moved, 268 - moved))
    print("per-week counts match. study minutes %d (%.0f hours)"
          % (total_est, total_est / 60.0))
    print("ids whose prefix no longer matches their week: %d (expected)" % len(mism))
    print("week loads:", {w: per_week[w] for w in range(1, 16)})


if __name__ == "__main__":
    main()
