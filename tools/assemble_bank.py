#!/usr/bin/env python3
"""
Assemble the authored per-topic card JSON into the two files Mastery Physio OS
loads:

  out/bio005-card-bank.js       window.BIO005_CARD_BANK, every card in one file
  out/card-competency-map.js    window.BIO005_CARD_COMPETENCY_MAP, the bridge

The map carries entries at BOTH grains:

  "<topicId>"              -> every competency the chapter covers
  "<topicId>:<cardId>"     -> the one competency that card actually proves

recall-view.js reads the card-level key first, and mastery-evidence.js is
patched to do the same. Without the card-level grain, answering one card in
Renal Physiology would credit all nineteen renal competencies at once, which is
the exact break that cost the anatomy build a term.
"""

import json, os, sys, glob, collections, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "out")
CARDS = os.path.join(ROOT, "cards")

BANNED = ["—", "–", ", ND", ", MD", "TODO", "TBD", "to be customized",
          "none of the above", "None of the above", "all of the above",
          "All of the above"]


def load_topics():
    return json.load(open(os.path.join(OUT, "topics.json"), encoding="utf-8"))


def load_cards():
    """Group by the topicId INSIDE each file, not by filename.

    Two chapters were too large for one authoring pass and were split into
    -p1 and -p2 files. Both halves declare the same topicId, so they merge
    here and the card ids are renumbered straight through the chapter.
    Without the renumber both halves would start at c1 and every id would
    collide, which is exactly the bug the anatomy bank hit: two different
    cards sharing one spacing record and one competency identity.

    Order is by filename, so the renumbering is deterministic and a card
    keeps its id across rebuilds. Card ids are localStorage keys."""
    by_topic = collections.OrderedDict()
    for path in sorted(glob.glob(os.path.join(CARDS, "*.json"))):
        doc = json.load(open(path, encoding="utf-8"))
        stem = os.path.basename(path)[:-5]
        tid = doc.get("topicId") or re.sub(r"-p\d+$", "", stem)
        by_topic.setdefault(tid, []).extend(doc["cards"])
    for tid, cards in by_topic.items():
        for i, c in enumerate(cards, 1):
            c["id"] = "c%d" % i
    return by_topic


def validate(by_topic, comp_ids):
    errs, warns = [], []
    total = 0
    dok = collections.Counter()
    pos = collections.Counter()
    for tid, cards in sorted(by_topic.items()):
        seen_ids, seen_q = set(), set()
        for c in cards:
            total += 1
            where = "%s %s" % (tid, c.get("id"))
            for f in ("id", "dok", "q", "a", "options", "correctIndex",
                      "explanation", "competencyId"):
                if f not in c:
                    errs.append("%s missing field %s" % (where, f))
            if c.get("id") in seen_ids:
                errs.append("%s duplicate card id" % where)
            seen_ids.add(c.get("id"))
            q = re.sub(r"\s+", " ", (c.get("q") or "")).strip().lower()
            if q in seen_q:
                errs.append("%s duplicate question text" % where)
            seen_q.add(q)
            opts = c.get("options") or []
            if len(opts) != 4:
                errs.append("%s has %d options, needs 4" % (where, len(opts)))
            if len(set(opts)) != len(opts):
                errs.append("%s has repeated options" % where)
            ci = c.get("correctIndex")
            if not isinstance(ci, int) or not (0 <= ci < len(opts)):
                errs.append("%s correctIndex out of range" % where)
            else:
                pos[ci] += 1
            d = c.get("dok")
            if d not in (1, 2, 3):
                errs.append("%s dok is %r, must be 1, 2 or 3" % (where, d))
            else:
                dok[d] += 1
            if c.get("competencyId") not in comp_ids:
                errs.append("%s competencyId %r is not in the competency set"
                            % (where, c.get("competencyId")))
            blob = json.dumps(c, ensure_ascii=False)
            for b in BANNED:
                if b in blob:
                    errs.append("%s contains banned text %r" % (where, b))
            try:
                blob.encode("ascii")
            except UnicodeEncodeError:
                bad = sorted(set(ch for ch in blob if ord(ch) > 127))
                warns.append("%s non-ascii %s" % (where, " ".join(bad)))
    return errs, warns, total, dok, pos


def main():
    topics = load_topics()
    by_topic = load_cards()
    comps = {}
    ns = {}
    src = open(os.path.join(OUT, "bio005-competencies.js"), encoding="utf-8").read()
    arr = src[src.index("window.BIO005_COMPETENCIES = [") + len("window.BIO005_COMPETENCIES = "):]
    arr = arr[: arr.index("\n];") + 2]
    arr = re.sub(r"/\*.*?\*/", "", arr, flags=re.S)
    for c in json.loads(arr):
        comps[c["id"]] = c

    errs, warns, total, dok, pos = validate(by_topic, set(comps))
    for w in warns[:20]:
        print("WARN", w)
    if errs:
        for e in errs[:60]:
            print("ERROR", e)
        print("%d errors. Nothing written." % len(errs))
        sys.exit(1)

    # ------------------------------------------------------------- the bank
    bank = {"courseLabel": "BIO 005 Human Physiology", "modules": []}
    written = 0
    for m in topics["modules"]:
        mod = {"id": m["id"], "n": m["n"], "title": m["title"], "topics": []}
        for t in m["topics"]:
            cards = by_topic.get(t["id"])
            if not cards:
                continue
            for c in cards:
                cid = c["competencyId"]
                comp = comps[cid]
                c["topic"] = t["title"]
                c["week"] = comp["week"]
                c["yield"] = comp["yield"]
                tags = list(c.get("tags") or [])
                for extra in (t["title"], "dok" + str(c["dok"]), comp["yield"]):
                    if extra not in tags:
                        tags.append(extra)
                c["tags"] = tags
            mod["topics"].append({
                "id": t["id"], "title": t["title"], "summary": t["summary"],
                "weeks": t["weeks"], "cards": cards,
            })
            written += len(cards)
        if mod["topics"]:
            bank["modules"].append(mod)

    done_mods = sorted(m["n"] for m in bank["modules"])
    header = (
        "/* ============================================================\n"
        "   BIO 005 Human Physiology, Yuba College, Fall 2026\n"
        "   bio005-card-bank.js   GENERATED FILE, DO NOT HAND-EDIT\n"
        "\n"
        "   Every recall card in the course, in one file.\n"
        "   %d cards, %d modules, %d chapters, %d competencies covered.\n"
        "\n"
        "   Generated by tools/assemble_bank.py from the per-topic card JSON\n"
        "   in cards/. To change a card, edit its topic file and run that\n"
        "   script again. Editing this file by hand will be overwritten.\n"
        "\n"
        "   Every card carries a competencyId from bio005-competencies.js.\n"
        "   That is what moves a mastery bar. A card without one answers into\n"
        "   the void, which is the exact break that cost the anatomy build a\n"
        "   term. The assembler refuses to write the file if any card is\n"
        "   missing one or points at an id that does not exist.\n"
        "\n"
        "   DOK 1 recall, 2 apply, 3 analyze. There is no DOK 4: transfer at\n"
        "   that depth is clinical medicine, not first year physiology.\n"
        "\n"
        "   tags: lecture, lab, application. A competency that is lab only\n"
        "   carries lab and application, so a student can pull the lab work\n"
        "   apart from the lecture work.\n"
        "   ============================================================ */\n\n"
    ) % (written, len(bank["modules"]),
         sum(len(m["topics"]) for m in bank["modules"]),
         len(set(c["competencyId"] for cs in by_topic.values() for c in cs)))

    body = "window.BIO005_CARD_BANK = " + json.dumps(bank, ensure_ascii=False,
                                                     separators=(",", ":")) + ";\n"
    tail = (
        "\n/* The engine reads either global. Kept as an alias so anything\n"
        "   written against the older COURSE_CONTENT name still resolves. */\n"
        "window.BIO005_COURSE_CONTENT = window.BIO005_CARD_BANK;\n\n"
        "window.BIO005_CARD_BANK_STATUS = { inBuild: %s, count: %d,\n"
        "  modules: %s,\n"
        "  message: %s };\n"
    ) % ("true" if len(done_mods) < 5 else "false",
         written, json.dumps(done_mods),
         json.dumps(
             "Modules %s are written. The rest of the bank is in progress."
             % ", ".join(str(n) for n in done_mods)
             if len(done_mods) < 5 else "The bank is complete."))
    open(os.path.join(OUT, "bio005-card-bank.js"), "w", encoding="utf-8").write(header + body + tail)

    # -------------------------------------------------------------- the map
    m_out = collections.OrderedDict()
    per_comp = collections.Counter()
    for m in bank["modules"]:
        for t in m["topics"]:
            seen = []
            for c in t["cards"]:
                cid = c["competencyId"]
                per_comp[cid] += 1
                if cid not in seen:
                    seen.append(cid)
                m_out["%s:%s" % (t["id"], c["id"])] = {"comps": [cid]}
            m_out[t["id"]] = {"title": t["title"], "comps": seen}

    reachable = len(per_comp)
    map_header = (
        "/* ============================================================\n"
        "   BIO 005 Human Physiology, Yuba College, Fall 2026\n"
        "   card-competency-map.js   GENERATED FILE, DO NOT HAND-EDIT\n"
        "\n"
        "   THE BRIDGE BETWEEN THE CARDS AND MASTERY OS.\n"
        "\n"
        "   Mastery OS tracks competencies. Recall tracks cards. Without this\n"
        "   file a student could answer every card in the bank and every\n"
        "   mastery bar would still read zero.\n"
        "\n"
        "   TWO GRAINS, AND WHY BOTH ARE HERE\n"
        "\n"
        "     \"<topicId>\"           every competency that chapter covers\n"
        "     \"<topicId>:<cardId>\"  the one competency that card proves\n"
        "\n"
        "   The chapter grain alone is not good enough here. Renal Physiology\n"
        "   is one chapter holding nineteen competencies, so crediting the\n"
        "   chapter would hand a student mastery of the countercurrent\n"
        "   multiplier for answering a card about micturition. Both\n"
        "   recall-view.js and mastery-evidence.js read the card key first and\n"
        "   fall back to the chapter.\n"
        "\n"
        "   Coverage: %d of %d cards reach a competency. %d of %d competencies\n"
        "   are reachable by card.\n"
        "   ============================================================ */\n\n"
    ) % (written, written, reachable, len(comps))

    map_body = ("window.BIO005_CARD_COMPETENCY_MAP = "
                + json.dumps(m_out, ensure_ascii=False, separators=(",", ":")) + ";\n"
                + "window.BIO005_CARD_MAP_STATUS = { inBuild: %s, cards: %d, competencies: %d };\n"
                % ("true" if len(done_mods) < 5 else "false", written, reachable))
    open(os.path.join(OUT, "card-competency-map.js"), "w", encoding="utf-8").write(map_header + map_body)

    # ------------------------------------------------------------- report
    print("cards written      %d" % written)
    print("dok split          1:%d  2:%d  3:%d" % (dok[1], dok[2], dok[3]))
    print("correctIndex       0:%d 1:%d 2:%d 3:%d" % (pos[0], pos[1], pos[2], pos[3]))
    print("competencies hit   %d of %d" % (reachable, len(comps)))
    print("modules complete   %s" % done_mods)
    import collections as _c
    byy = _c.Counter(); cardsy = _c.Counter()
    for cid, n in per_comp.items():
        byy[comps[cid]["yield"]] += 1
        cardsy[comps[cid]["yield"]] += n
    want = _c.Counter(c["yield"] for c in comps.values() if c["module"] in done_mods)
    print("coverage by yield:")
    for y in ("core", "high", "support"):
        print("   %-8s %3d of %3d competencies, %5d cards"
              % (y, byy[y], want[y], cardsy[y]))
    short = [(cid, n, comps[cid]["yield"]) for cid, n in per_comp.items()
             if n < {"core": 19, "high": 18, "support": 14}[comps[cid]["yield"]]]
    if short:
        print("under quota:", short)
    missing_in_done = [cid for cid, c in comps.items()
                       if c["module"] in done_mods and cid not in per_comp]
    if missing_in_done:
        print("NO CARDS but module is done:", missing_in_done)


if __name__ == "__main__":
    main()
