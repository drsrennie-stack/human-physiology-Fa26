#!/usr/bin/env python3
"""
tools/walkthrough_videos.py

Reads the support videos out of a guided walkthrough (its V and SUP tables)
so other pages can list the same videos: the instructor preview page and the
Videos for this topic box on each walkthrough's written notes. Sep 27 2026.
"""
import re

def videos(src):
    ka = re.search(r'var KA="([^"]*)"', src)
    blk = src[src.index("var V={"):]
    if ka: blk = blk.replace('KA+"', '"' + ka.group(1))
    V = dict(re.findall(r'(\w+):\{u:"([^"]+)",n:"[^"]*"\}', blk))
    N = dict(re.findall(r'(\w+):\{u:"[^"]+",n:"([^"]*)"\}', blk))
    out = []
    sup = src[src.index("var V={"):src.index("function supportHTML")].replace('"+M+"', "\u2212")
    for m in re.finditer(r'(?:"([^"]+)"|SUP\["([^"]+)"\])\s*[:=]\s*\[((?:\["[^"]*","\w+","[^"]*"\],?)+)\]', sup):
        step = (m.group(1) or m.group(2)).replace('"+M+"', "−")
        for q, k, _ in re.findall(r'\["([^"]*)","(\w+)","([^"]*)"\]', m.group(3)):
            u = lambda t: re.sub(r"\\u([0-9a-fA-F]{4})", lambda z: chr(int(z.group(1), 16)), t)
            out.append((u(step), u(q), N.get(k, ""), V.get(k, "")))
    # put them in the order the steps come in the walkthrough
    order = [t.replace('"+M+"', "\u2212") for t in re.findall(r'\n\{(?:sec:"[^"]*",comp:"[^"]*",\s*)?\s*title:"((?:[^"]|"\+M\+")*)"', src)]
    out.sort(key=lambda r: order.index(r[0]) if r[0] in order else 999)
    return out

def grouped(src):
    """One entry per video, in first-use order: (name, url, [(step, question), ...])."""
    seen, res = {}, []
    for step, q, n, u in videos(src):
        if not u: continue
        if u not in seen:
            seen[u] = (n, u, []); res.append(seen[u])
        seen[u][2].append((step, q))
    return res

