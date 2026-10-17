"""Validate objective library files: unique ids, known references, no cycles.

Usage: python3 validate.py data/*.json
"""
import json
import re
import sys
from pathlib import Path

FIELDS = {"id", "name", "description", "how", "requires", "repeatable", "effort", "tags", "source"}
CATEGORIES = {"core", "story", "vessels", "world", "exploration", "crafting"}
CURRENCY = re.compile(r"^(units|nanites|quicksilver)>=\d+$")


def validate(files):
    objectives, known, errors = {}, set(), []
    for path in files:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        for need in data.get("needs", []):
            known.add(need["id"])
        for o in data["objectives"]:
            if o.get("id") in objectives:
                errors.append(f"{path}: duplicate id {o.get('id')}")
            missing = FIELDS - o.keys()
            if missing:
                errors.append(f"{path}: {o.get('id')} missing {sorted(missing)}")
            category = o.get("category", Path(path).stem)  # merge.py defaults to the file name
            if category not in CATEGORIES:
                errors.append(f"{path}: {o.get('id')} bad category {category!r}")
            if o.get("effort") not in ("short", "medium", "long"):
                errors.append(f"{path}: {o.get('id')} bad effort {o.get('effort')!r}")
            objectives[o.get("id")] = o
    known |= objectives.keys()

    def flatten(reqs):
        for r in reqs:
            if isinstance(r, list):
                yield from flatten(r)
            else:
                yield r

    def refs(o):
        return flatten(o.get("requires", []))

    for o in objectives.values():
        for r in refs(o):
            if not CURRENCY.match(r) and r not in known:
                errors.append(f"{o['id']}: unknown requirement {r}")

    # cycle detection, iterative DFS (white/grey/black)
    state = {}
    for start in objectives:
        if start in state:
            continue
        stack = [(start, iter(refs(objectives[start])))]
        state[start] = 1
        while stack:
            node, it = stack[-1]
            nxt = next((r for r in it if r in objectives), None)
            if nxt is None:
                state[node] = 2
                stack.pop()
            elif state.get(nxt) == 1:
                errors.append(f"cycle: {' -> '.join(n for n, _ in stack)} -> {nxt}")
            elif nxt not in state:
                state[nxt] = 1
                stack.append((nxt, iter(refs(objectives[nxt]))))
    return objectives, errors


if __name__ == "__main__":
    objectives, errors = validate(sys.argv[1:])
    print("\n".join(errors) or "OK")
    print(f"{len(objectives)} objectives, {len(errors)} errors")
    sys.exit(1 if errors else 0)
