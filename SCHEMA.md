# Objective library schema

Each file in `data/` is a JSON object:

```json
{
  "objectives": [ ... ],
  "needs": [ { "id": "own_atlas_pass", "name": "...", "why": "..." } ]
}
```

`needs` lists objectives you reference in `requires` that belong to ANOTHER
category (not in `core.json`, not in your file). They are reconciled at merge.

## Objective

| field        | type            | notes |
|--------------|-----------------|-------|
| `id`         | string          | English snake_case, globally unique. Prefix with a verb: `craft_`, `own_`, `scan_`, `complete_`, `learn_`, `build_`, `visit_`... |
| `name`       | string          | Spanish, imperative, short. Use the official Spanish in-game names for items. |
| `description`| string          | Spanish, 1-2 sentences: what and why it is interesting. |
| `how`        | string          | Spanish: how to start/achieve it (where, who gives it, steps). |
| `requires`   | array           | All must be met. Each element: an objective id, `"units>=N"`, `"nanites>=N"`, `"quicksilver>=N"`, or a nested array meaning ANY-of (`[["own_nomad","own_roamer"]]`). Only list direct, real game gates. |
| `repeatable` | bool            | `true` = can be done endlessly (templates like "escanear toda la fauna de un planeta helado"). Repeatables do not count toward 100%. |
| `effort`     | string          | `short` (<20 min), `medium` (20-90 min), `long` (multi-session). |
| `tags`       | array of string | free, English: `combat`, `underwater`, `space`, `social`, `grind`, `story`, `building`... |
| `source`     | string          | URL backing the objective. |

Validate with: `python3 validate.py data/core.json data/<yours>.json`
