// Pure objective logic, shared by app.mjs and test.mjs.
const CURRENCY = /^(units|nanites|quicksilver)>=(\d+)$/;

export const isCurrency = (req) => typeof req === "string" && CURRENCY.test(req);

export function met(req, state) {
  if (Array.isArray(req)) return req.some((r) => met(r, state));
  const m = CURRENCY.exec(req);
  return m ? (state.money[m[1]] || 0) >= Number(m[2]) : Boolean(state.done[req]);
}

export const isDone = (o, state) => !o.repeatable && Boolean(state.done[o.id]);

export const isAvailable = (o, state) => !isDone(o, state) && o.requires.every((r) => met(r, state));

export const unmet = (o, state) => o.requires.filter((r) => !met(r, state));

// Marks an objective done and, transitively, its all-of prerequisites.
// ponytail: any-of branches are not inferred (we can't know which path the player took).
export function markDone(byId, state, id) {
  state.done[id] = (state.done[id] || 0) + 1;
  const stack = [id];
  while (stack.length) {
    const o = byId.get(stack.pop());
    for (const r of o?.requires ?? []) {
      if (typeof r !== "string" || isCurrency(r) || state.done[r]) continue;
      state.done[r] = 1;
      stack.push(r);
    }
  }
}

// ~1 in 4 suggestions comes from "growth" objectives (earning money, expanding inventory).
export const GROWTH_RATE = 0.25;

// Two-stage random pick: category first, then objective, so the ~300 cooking
// recipes don't drown everything else. One-shots weigh 3x repeatables.
export function pick(objectives, state, { effort = "", category = "" } = {}, rng = Math.random) {
  const all = objectives.filter(
    (o) =>
      isAvailable(o, state) &&
      (!effort || o.effort === effort) &&
      (!category || o.category === category) &&
      !state.skipped.includes(o.id),
  );
  if (!all.length) return null;
  const growth = all.filter((o) => o.tags?.includes("growth"));
  const pool = growth.length && rng() < GROWTH_RATE ? growth : all;
  const cats = [...new Set(pool.map((o) => o.category))];
  const fresh = cats.length > 1 ? cats.filter((c) => c !== state.lastCategory) : cats;
  const cat = fresh[Math.floor(rng() * fresh.length)];
  const inCat = pool.filter((o) => o.category === cat);
  const weights = inCat.map((o) => (o.repeatable ? 1 : 3));
  let x = rng() * weights.reduce((a, b) => a + b, 0);
  return inCat.find((_, i) => (x -= weights[i]) < 0) ?? inCat.at(-1);
}

export function progress(objectives, state) {
  const result = {};
  for (const o of objectives) {
    if (o.repeatable) continue;
    const r = (result[o.category] ??= { done: 0, total: 0 });
    r.total++;
    if (state.done[o.id]) r.done++;
  }
  return result;
}
