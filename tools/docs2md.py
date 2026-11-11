#!/usr/bin/env python3
"""Mirror a Claude Doc into small Markdown files, one per top-level section.

Why: the design doc and build plan are ~110k characters each. Builders read only the
section a ticket needs (docs/spec/<doc>/NN-section.md) instead of the whole doc.

Usage (owner only; the input is the saved result of a Claude Docs `read` of the doc's
root node, which the Docs tool writes to a file when the doc is large):
    python3 -I tools/docs2md.py <saved-read.txt> <design|plan> <source-url>
Writes docs/spec/<name>/index.md plus one file per H2 section, replacing old files.
"""
import json, re, sys, shutil, datetime, xml.etree.ElementTree as ET
from pathlib import Path

src, name, url = sys.argv[1], sys.argv[2], sys.argv[3]
data = json.JSONDecoder().raw_decode(open(src).read())[0]["data"]
rev, root = data["rev"], ET.fromstring(data["xml"])

def inline(el):
    out = []
    for c in el:
        t = c.tag
        if t == "text":
            s = "".join(inline_text(c))
            out.append(s)
        elif t == "code":
            out.append("`" + "".join(c.itertext()) + "`")
        elif t == "link":
            out.append("[" + "".join(c.itertext()) + "](" + c.get("href", "") + ")")
        elif t == "date":
            out.append(c.get("value", ""))
        elif t == "mention":
            out.append(c.get("name", ""))
        else:
            out.append(inline(c))
    return "".join(out)

def inline_text(el):
    s = el.text or ""
    for c in el:
        inner = "".join(c.itertext())
        if c.tag == "bold": s += f"**{inner}**"
        elif c.tag == "code": s += f"`{inner}`"
        else: s += inner
        s += c.tail or ""
    yield s

def block(el, depth=0):
    t = el.tag
    if t == "paragraph":
        h = el.get("heading")
        txt = inline(el).strip()
        if not txt: return []
        return [("#" * int(h) + " " if h else "") + txt, ""]
    if t == "list":
        lines = []
        for i, li in enumerate(el.findall("listItem")):
            sub = [l for c in li for l in block(c, depth + 1) if l != ""]
            if not sub: continue
            mark = f"{i+1}." if el.get("ordered") in ("true", "1") else "-"
            lines.append("  " * depth + f"{mark} " + sub[0].lstrip())
            lines += ["  " * (depth + 1) + l.lstrip() for l in sub[1:]]
        return lines + [""]
    if t == "table":
        rows = [[" ".join(l for c in cell for l in block(c) if l).replace("|", "/") for cell in row.findall("cell")]
                for row in el.findall("row")]
        if not rows: return []
        w = max(len(r) for r in rows)
        rows = [r + [""] * (w - len(r)) for r in rows]
        out = ["| " + " | ".join(rows[0]) + " |", "|" + "---|" * w]
        out += ["| " + " | ".join(r) + " |" for r in rows[1:]]
        return out + [""]
    if t == "codeBlock":
        return ["```", "".join(el.itertext()), "```", ""]
    return [l for c in el for l in block(c, depth)]

lines = [l for c in root for l in block(c)]
sections, cur = [("00-intro", [])], None
for l in lines:
    if l.startswith("## "):
        slug = re.sub(r"[^a-z0-9]+", "-", l[3:].lower()).strip("-")[:48]
        sections.append((f"{len(sections):02d}-{slug}", [l, ""]))
    else:
        sections[-1][1].append(l)

out = Path(__file__).resolve().parent.parent / "docs" / "spec" / name
shutil.rmtree(out, ignore_errors=True); out.mkdir(parents=True)
today = datetime.date.today().isoformat()
head = f"<!-- Mirror of {url} (rev {rev}, synced {today}). Read only: the Claude Doc decides. -->\n\n"
idx = [f"# {name}: section index", "", head.strip(), "",
       "| File | Section | Words |", "|---|---|---|"]
for fn, body in sections:
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(body)).strip() + "\n"
    (out / f"{fn}.md").write_text(head + text)
    title = body[0][3:] if body and body[0].startswith("## ") else "Title and intro"
    idx.append(f"| {fn}.md | {title} | {len(text.split())} |")
(out / "index.md").write_text("\n".join(idx) + "\n")
print(f"{name}: rev {rev}, {len(sections)} files in {out}")
