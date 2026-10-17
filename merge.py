"""Merge category files into library.json: resolve aliases, drop duplicates.

Usage: python3 merge.py && python3 validate.py library.json
"""
import json

# Earlier file wins on duplicate ids.
FILES = ["core", "story", "vessels", "world", "exploration", "crafting", "growth", "cosmos"]

# Duplicate concepts under different ids: old -> kept id (None = drop the requirement).
ALIAS = {
    "install_pressure_membrane": "tech_aeration_membrane",
    "craft_construction_research_unit": "build_construction_research_unit",
    "install_terrain_manipulator": "craft_terrain_manipulator",  # Awakenings gives it free
    "freighter_matter_beam": "install_matter_beam",
    "hire_technician": "hire_base_technician",
    "build_overseers_office": "build_settlement_overseer_office",
    "sentinel_pillar_extract_weapon": "sentinel_pillar_extract",
    "trigger_starbirth": "buy_void_egg",
    "starbirth_neural_stem": "starbirth_mature_neural_stem",
    "starbirth_heart_node": "starbirth_mature_heart_node",
    "starbirth_fallen_host": "complete_starbirth_biogenesis",
    "salvage_derelict_hulk": "salvage_space_hulk",
    # unresolved `needs`
    "tech_radiation_deflector": "install_radiation_deflector",
    "tech_coolant_network": "install_coolant_network",
    "tech_thermic_layer": "install_thermic_layer",
    "tech_survey_device": "install_survey_device",
    "tech_economy_scanner": "install_economy_scanner",
    "tech_conflict_scanner": "install_conflict_scanner",
    "progress_they_who_returned": "start_they_who_returned",
    "merchants_guild_exalted": "guild_merchants_exalted",
    "story_main_missions_done": None,  # ponytail: vague gate, verify pass should pin the real mission
    "tech_signal_booster": None,  # starting buildable, not a gate
    "craft_signal_booster": None,
    "tech_toxin_suppressor": None,
    "tech_echo_locator": None,
    "tech_scan_harmoniser": None,
}
RANKS = ["initiate", "apprentice", "journeyman", "associate", "senior", "master", "elder", "exalted"]
for guild in ("explorers", "merchants", "mercenaries"):
    for n, rank in enumerate(RANKS, 1):
        ALIAS[f"reach_{guild}_guild_rank_{n}"] = f"guild_{guild}_{rank}"


def remap(req, self_id):
    if isinstance(req, list):
        alts = [remap(x, self_id) for x in req]
        if None in alts:  # one alternative is "no gate", so the whole any-of is satisfied
            return None
        return alts if len(alts) > 1 else alts[0]
    new = ALIAS.get(req, req)
    return None if new == self_id else new


def merge():
    library, extra_tags = {}, []
    for name in FILES:
        with open(f"data/{name}.json", encoding="utf-8") as f:
            data = json.load(f)
        extra_tags += [(ALIAS.get(i, i), tag) for tag, ids in data.get("tag_existing", {}).items() for i in ids]
        for o in data["objectives"]:
            if o["id"] in ALIAS or o["id"] in library:
                continue
            reqs = []
            for r in o["requires"]:
                r = remap(r, o["id"])
                if r and r not in reqs:
                    reqs.append(r)
            library[o["id"]] = {**o, "requires": reqs, "category": o.get("category", name)}
    for i, tag in extra_tags:
        if i in library and tag not in library[i]["tags"]:
            library[i]["tags"].append(tag)
    return list(library.values())


if __name__ == "__main__":
    objectives = merge()
    with open("library.json", "w", encoding="utf-8") as f:
        json.dump({"objectives": objectives}, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{len(objectives)} objectives -> library.json")
