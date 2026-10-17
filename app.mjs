import { isAvailable, isCurrency, isDone, markDone, pick, progress, unmet } from "./logic.mjs";

const CATEGORIES = {
  core: "Hitos clave",
  story: "Historia y misiones",
  vessels: "Naves, vehículos y mascotas",
  world: "Bases, economía y combate",
  exploration: "Exploración",
  crafting: "Fabricación y tecnología",
};
const EFFORT = { short: "Corto", medium: "Medio", long: "Largo" };
const MONEY = ["units", "nanites", "quicksilver"];
const KEY = "nms-companion";

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const { objectives } = await (await fetch("library.json")).json();
const byId = new Map(objectives.map((o) => [o.id, o]));

let state = load();

// Rebuilds state from untrusted JSON (localStorage or an imported backup), keeping only well-formed fields.
// Throws if `done` is missing, so a broken backup never replaces real progress.
function sanitize(d) {
  const str = (s) => (typeof s === "string" ? s : "");
  return {
    done: Object.fromEntries(Object.entries(d.done).filter(([id, n]) => byId.has(id) && Number.isInteger(n) && n > 0)),
    money: Object.fromEntries(MONEY.map((k) => [k, Math.max(0, Number(d.money?.[k]) || 0)])),
    skipped: Array.isArray(d.skipped) ? d.skipped.filter((id) => byId.has(id)) : [],
    lastCategory: str(d.lastCategory),
    current: byId.has(d.current) ? d.current : null,
    reports: Array.isArray(d.reports) ? d.reports.filter((r) => r && typeof r.text === "string").map((r) => ({ id: str(r.id), text: r.text, date: str(r.date) })) : [],
    filters: { effort: str(d.filters?.effort), category: str(d.filters?.category) },
  };
}

function load() {
  try {
    return sanitize(JSON.parse(localStorage.getItem(KEY)));
  } catch {
    return sanitize({ done: {} });
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // private mode / storage full: the session still works, backup export still works
  }
}

function reqLabel(r) {
  if (Array.isArray(r)) return r.map(reqLabel).join(" o ");
  const m = isCurrency(r) && r.split(">=");
  if (m) return `${Number(m[1]).toLocaleString("es")} ${m[0]}`;
  return byId.get(r)?.name ?? r;
}

function details(o) {
  const missing = unmet(o, state);
  return `
    <div class="chips"><span>${CATEGORIES[o.category]}</span><span>${EFFORT[o.effort]}</span>${o.repeatable ? "<span>Repetible</span>" : ""}</div>
    <p>${esc(o.description)}</p>
    <p class="how">${esc(o.how)}</p>
    ${o.requires.length ? `<p class="small">Requisitos: ${o.requires.map((r) => `<span class="${missing.includes(r) ? "locked" : "done"}">${esc(reqLabel(r))}</span>`).join(" · ")}</p>` : ""}
    ${o.repeatable && state.done[o.id] ? `<p class="small">Hecho ${esc(state.done[o.id])} ${state.done[o.id] === 1 ? "vez" : "veces"}.</p>` : ""}
    <p class="small"><a href="${esc(o.source)}" target="_blank" rel="noopener">Fuente</a></p>`;
}

// --- Ahora ---
function next() {
  const f = state.filters;
  let o = pick(objectives, state, f);
  if (!o && state.skipped.length) {
    state.skipped = []; // ran out: recycle skipped ones
    o = pick(objectives, state, f);
  }
  state.current = o?.id ?? null;
  if (o) state.lastCategory = o.category;
  save();
  renderNow();
}

function renderNow() {
  const o = byId.get(state.current);
  if (o && !isAvailable(o, state)) return next(); // stale: done elsewhere or requirements changed
  if (!o) {
    $("current").innerHTML = `<div class="card"><p>No hay objetivos disponibles con estos filtros.</p></div>`;
    return;
  }
  $("current").innerHTML = `
    <div class="card">
      <h2>${esc(o.name)}</h2>
      ${details(o)}
      <div class="row">
        <button class="primary" id="btnDone">✓ Hecho</button>
        <button id="btnSkip">↻ Otro</button>
      </div>
      <div class="row" style="margin-top:8px"><button id="btnReport">⚑ Reportar error</button></div>
    </div>`;
  $("btnDone").onclick = () => {
    markDone(byId, state, o.id);
    state.current = null; // repeatables stay available, so move on explicitly
    renderAll();
    next();
  };
  $("btnSkip").onclick = () => {
    state.skipped = [o.id, ...state.skipped].slice(0, 50);
    next();
  };
  $("btnReport").onclick = () => {
    const text = prompt(`¿Qué está mal en "${o.name}"?`);
    if (!text) return;
    state.reports.push({ id: o.id, text, date: new Date().toISOString().slice(0, 10) });
    save();
    renderMe();
  };
}

// --- Biblioteca ---
function status(o) {
  return isDone(o, state) ? "done" : isAvailable(o, state) ? "available" : "locked";
}

function renderLibrary() {
  const q = $("search").value.trim().toLowerCase();
  const st = $("lStatus").value;
  const cat = $("lCategory").value;
  const list = objectives.filter(
    (o) => (!st || status(o) === st) && (!cat || o.category === cat) && (!q || o.name.toLowerCase().includes(q)),
  );
  // ponytail: render the first 100 matches; search narrows the rest
  $("libCount").textContent = `${list.length} objetivos${list.length > 100 ? " (mostrando 100, buscá para filtrar)" : ""}`;
  $("libList").innerHTML = list
    .slice(0, 100)
    .map((o) => {
      const s = status(o);
      return `<details data-id="${esc(o.id)}"><summary class="${s}">${s === "done" ? "✓ " : s === "locked" ? "🔒 " : ""}${esc(o.name)}</summary>
        ${details(o)}
        <button data-toggle>${s === "done" ? "Desmarcar" : "Marcar como hecho"}</button></details>`;
    })
    .join("");
}

$("libList").addEventListener("click", (e) => {
  if (!e.target.matches("[data-toggle]")) return;
  const id = e.target.closest("details").dataset.id;
  if (isDone(byId.get(id), state)) delete state.done[id];
  else markDone(byId, state, id);
  save();
  renderAll();
});

// --- Yo ---
function renderMe() {
  for (const k of MONEY) $(`m-${k}`).value = state.money[k] || "";
  const p = progress(objectives, state);
  $("catProgress").innerHTML = Object.entries(CATEGORIES)
    .map(([k, label]) => `<span>${label}</span><span>${p[k]?.done ?? 0} / ${p[k]?.total ?? 0}</span>`)
    .join("");
  $("onboarding").innerHTML = objectives
    .filter((o) => o.category === "core")
    .map((o) => `<label class="check"><input type="checkbox" data-id="${esc(o.id)}" ${state.done[o.id] ? "checked" : ""}><span>${esc(o.name)}</span></label>`)
    .join("");
  $("reports").innerHTML = state.reports.length
    ? state.reports.map((r) => `<p>${esc(r.date)} · <b>${esc(byId.get(r.id)?.name ?? r.id)}</b>: ${esc(r.text)}</p>`).join("")
    : "Ninguno todavía.";
}

for (const k of MONEY) {
  $(`m-${k}`).addEventListener("change", (e) => {
    state.money[k] = Math.max(0, Number(e.target.value) || 0);
    save();
    renderAll();
  });
}

$("onboarding").addEventListener("change", (e) => {
  const id = e.target.dataset.id;
  if (e.target.checked) markDone(byId, state, id);
  else delete state.done[id];
  save();
  renderAll();
});

$("copyReports").onclick = () =>
  navigator.clipboard.writeText(JSON.stringify(state.reports, null, 1)).then(() => alert("Copiado"));

$("export").onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(state)], { type: "application/json" }));
  a.download = `nms-companion-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
};
$("import").onclick = () => $("importFile").click();
$("importFile").onchange = async (e) => {
  try {
    state = sanitize(JSON.parse(await e.target.files[0].text()));
    save();
    renderAll();
    alert("Backup importado");
  } catch {
    alert("Ese archivo no es un backup válido");
  }
};

// --- shell ---
function renderTotal() {
  const p = Object.values(progress(objectives, state));
  const done = p.reduce((a, c) => a + c.done, 0);
  const total = p.reduce((a, c) => a + c.total, 0);
  const pct = total ? (100 * done) / total : 0;
  $("totalBar").style.width = `${pct}%`;
  $("totalText").textContent = `${done} de ${total} objetivos únicos · ${pct.toFixed(1)}%`;
}

function renderAll() {
  renderNow();
  renderTotal();
  renderLibrary();
  renderMe();
}

const catOptions = `<option value="">Todas las categorías</option>` +
  Object.entries(CATEGORIES).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
$("fCategory").innerHTML = $("lCategory").innerHTML = catOptions;
$("fEffort").value = state.filters.effort ?? "";
$("fCategory").value = state.filters.category ?? "";
for (const id of ["fEffort", "fCategory"]) {
  $(id).addEventListener("change", () => {
    state.filters = { effort: $("fEffort").value, category: $("fCategory").value };
    next();
  });
}
for (const id of ["search", "lStatus", "lCategory"]) $(id).addEventListener("input", renderLibrary);

document.querySelector("nav").addEventListener("click", (e) => {
  const tab = e.target.dataset.tab;
  if (!tab) return;
  for (const b of document.querySelectorAll("nav button")) b.classList.toggle("on", b === e.target);
  for (const s of document.querySelectorAll("main section")) s.hidden = s.id !== tab;
});

renderAll();
if (!state.current) next();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
