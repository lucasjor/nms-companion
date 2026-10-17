// Run: node test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isAvailable, markDone, pick, progress } from "./logic.mjs";

const o = (id, requires = [], extra = {}) => ({ id, requires, repeatable: false, effort: "short", category: "core", ...extra });
const objs = [
  o("a"),
  o("b", ["a"]),
  o("c", ["b", "units>=100"]),
  o("d", [["a", "x"]]),
  o("r", [], { repeatable: true, category: "story" }),
];
const byId = new Map(objs.map((x) => [x.id, x]));
const fresh = () => ({ done: {}, money: {}, skipped: [], lastCategory: "" });

let s = fresh();
assert.deepEqual(objs.filter((x) => isAvailable(x, s)).map((x) => x.id), ["a", "r"]);

markDone(byId, s, "c"); // implies b and a
assert.ok(s.done.a && s.done.b && s.done.c);
assert.equal(isAvailable(byId.get("d"), s), true); // any-of satisfied via a

s = fresh();
markDone(byId, s, "b");
assert.equal(isAvailable(byId.get("c"), s), false); // money gate
s.money.units = 100;
assert.equal(isAvailable(byId.get("c"), s), true);

markDone(byId, s, "r");
markDone(byId, s, "r");
assert.equal(s.done.r, 2);
assert.equal(isAvailable(byId.get("r"), s), true); // repeatables stay available
assert.deepEqual(progress(objs, s).core, { done: 2, total: 4 });

s = fresh();
s.lastCategory = "core";
assert.equal(pick(objs, s, {}, () => 0).id, "r"); // avoids repeating last category
s.skipped = ["r"];
assert.equal(pick(objs, s, {}, () => 0).id, "a");

// growth bias: low roll picks from growth objectives, high roll from everything
const g = [o("plain"), o("money", [], { tags: ["growth"] })];
s = fresh();
assert.equal(pick(g, s, {}, () => 0).id, "money");
assert.equal(pick(g, s, {}, () => 0.99).id, "money"); // rng 0.99 -> last of the pool
assert.equal(pick(g, s, {}, ((xs) => () => xs.shift())([0.5, 0, 0])).id, "plain");

// smoke test on the real library: a new player always has something to do
const lib = JSON.parse(readFileSync(new URL("./library.json", import.meta.url))).objectives;
const libById = new Map(lib.map((x) => [x.id, x]));
s = fresh();
assert.ok(pick(lib, s));
for (const x of lib) markDone(libById, s, x.id); // marking everything never throws
console.log("ok");
