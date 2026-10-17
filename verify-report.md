# Verification report: NMS objective library (stratified sample, seed 42)

Method: `random.seed(42)`; for each of the 6 categories, `random.sample` of 10 from the non-repeatable objectives (60 total). Sources fetched through the fandom MediaWiki API (cached in the scratchpad `verify/downloads`), plus the official xeno-arena-update page for one item. A few extra item pages (Hydraulic_Wiring, Refined_Flour, Tortured_Honey_Cake) were fetched to check content where the cited source page was generic. Sample file: `.../scratchpad/verify/sample.json`.

No expedition-only objective was found in the sample. Minotaur's page mentions Expedition 14 upgrades, but the library objective does not use them.

## Error rate per category

| Category | n | OK | MINOR | WRONG | UNVERIFIABLE | MINOR+WRONG rate | WRONG rate |
|---|---|---|---|---|---|---|---|
| core | 10 | 3 | 4 | 3 | 0 | 70% | 30% |
| story | 10 | 5 | 5 | 0 | 0 | 50% | 0% |
| vessels | 10 | 6 | 2 | 1 | 1 | 30% | 10% |
| world | 10 | 6 | 3 | 0 | 1 | 30% | 0% |
| exploration | 10 | 6 | 3 | 0 | 1 | 30% | 0% |
| crafting | 10 | 4 | 4 | 0 | 2 | 40% | 0% |
| **Total** | 60 | 30 | 21 | 4 | 5 | 42% | 7% |

## Sampled ids

core: reach_journey_milestones_50, access_space_anomaly, repair_pulse_engine, own_freighter, own_minotaur, own_colossus, unlock_nexus, build_base_computer, first_warp, warp_blue
story: craft_warp_cell_from_antimatter, get_hyperdrive_blueprint_freighter, complete_ghosts_in_the_machine, craft_atlas_seeds_and_heart_of_the_sun, meet_damaged_autophage_atlantideum, rebel_star_distress_beacon, reach_vykeen_rank_5, decode_message_16_at_station, reach_korvax_rank_2, learn_atlas_seed_photic_jade
vessels: arena_league_progress, adopt_radioactive_companion, trade_companion_egg, own_mt_atlantid_s, roamer_fully_upgraded, freighter_call_quick_menu, summon_nautilon_first_time, ride_giant_creature, freighter_paint_turquoise, own_shuttle_s_class
world: build_cultivation_chamber, battle_holo_arena_wild, buy_qs_statue_blob, own_second_settlement, build_settlement_distribution_centre, build_bio_dome, build_large_scale_farm, reduce_sentinel_alert_settlement, find_em_hotspot, build_solar_panel
exploration: learn_autophage_all, milestone_walk_15000, learn_vykeen_100, learn_korvax_500, milestone_zoology_7, visit_biome_mega_exotic_red, find_submerged_ruins, find_atlas_interface, milestone_walk_100000, learn_autophage_500
crafting: craft_hydraulic_wiring, install_conflict_scanner, cook_cake_batter, install_s_class_cyclotron_ballista_upgrade, install_s_class_toxic_protection_upgrade, cook_tortured_honey_cake, install_neutron_shielding, cook_refined_flour, craft_dirty_bronze, craft_frigate_fuel_200_tonnes

OK (30): reach_journey_milestones_50, unlock_nexus, first_warp, get_hyperdrive_blueprint_freighter, craft_atlas_seeds_and_heart_of_the_sun, meet_damaged_autophage_atlantideum, rebel_star_distress_beacon, learn_atlas_seed_photic_jade, arena_league_progress, adopt_radioactive_companion, freighter_call_quick_menu, summon_nautilon_first_time, ride_giant_creature, freighter_paint_turquoise, battle_holo_arena_wild, buy_qs_statue_blob, build_settlement_distribution_centre, build_bio_dome, build_large_scale_farm, build_solar_panel, milestone_walk_15000, learn_vykeen_100, learn_korvax_500, milestone_zoology_7, find_submerged_ruins, milestone_walk_100000, install_conflict_scanner, cook_cake_batter, install_s_class_cyclotron_ballista_upgrade, install_s_class_toxic_protection_upgrade.

## WRONG (4)

1. **repair_pulse_engine** (core). Source: Awakenings. The `requires` direction is reversed. The Awakenings page repairs the Pulse Engine first (Metal Plating + Hermetic Seal, "With the Pulse Engine now repaired ... the player will now ... repair the starship's Launch Thrusters using 50 Pure Ferrite and Di-hydrogen Jelly"), and only then leaves the planet.
   - requires: `["repair_launch_thruster"]` -> `[]`, and add `repair_pulse_engine` to the requires of `repair_launch_thruster`. Check the order against the repair_launch_thruster `how` too.
   - how -> "Seguí 'Despertares': craftea Placa de metal (50 Polvo de ferrita) y un Sello hermético (su plano está en un edificio abandonado, se marca con la Baliza de socorro) y repará el motor de pulso."
   - Confidence: high on the source text; the live game order was not verified.

2. **own_freighter** (core). Source: Freighter + Ghosts_in_the_Machine. `requires ["first_warp"]` is not the real gate. Space battles and freighters unlock during "Ghosts in the Machine", when you arrive at the Apollo-contact station system. The Awakenings release notes say a freighter is not obtainable earlier. The Freighter page also gives a 3-hour and 5-warp cooldown between battles.
   - requires: `["first_warp"]` -> `["complete_ghosts_in_the_machine"]`. Use the id of the Apollo-contact step if one exists in the story file; otherwise use the whole mission as a conservative gate.
   - how -> "Tras avanzar 'Fantasmas en la Máquina' (al llegar al sistema del contacto de Apollo) aparece una batalla espacial: defendé el carguero de los piratas y el capitán te lo regala si no tenés uno. Después hay un enfriamiento de 3 h y 5 saltos entre batallas."
   - Also: the freighter is free only while you have none. A purchase option exists.

3. **warp_blue** (core). Source: Indium_Drive.
   - requires: add `access_space_anomaly`. The blueprint is sold only by Iteration: Hyperion on the Anomaly, for 200 nanites.
   - requires: `["warp_green","nanites>=200"]` -> `["access_space_anomaly","nanites>=200"]`. The wiki says the Indium Drive does not need the Emeril or Cadmium drives installed. Crafting needs 250 Emeril (the material) + 5 Wiring Loom, not the Emeril Drive.
   - how -> "Comprá el plano del Motor de indio a Hyperion en la Anomalía (200 nanites). Fabricalo con 250 Emeril y 5 Paneles de cableado e instalalo en la nave."
   - description: "Requiere el Mod de curvatura de Indio" -> "Permite saltar a sistemas de estrella azul."
   - The name uses the English "Indium Drive". The Spanish wiki page `es:` is "Motor de indio".

4. **own_mt_atlantid_s** (vessels). Source: Multi-Tool. The Atlantid type is not sold at merchants. The page says it is obtained from a Monolith in a Korvax system after partial progress of "They Who Returned". Merchants only sell the other types. Class is raised at the Multi-Tool Upgrade Station with nanites, not by "mejorar la ranura".
   - how -> "Conseguí el multiherramienta Atlantid en un Monolito en un sistema Korvax (tras avanzar 'Los que regresaron') y subí su clase a S en la Estación de mejora de multiherramientas de una estación espacial (cuesta nanitas)."
   - requires: keep `own_mt_atlantid`; add `nanites>=N` if the cost is confirmed.
   - description "hasta 60 ranuras" is correct (the wiki gives a maximum of 60 slots for S-class).

## MINOR (21)

**core**
- access_space_anomaly: how says "Avanzá en la historia ... hasta que se te ofrezca". The Space_Anomaly page says it first spawns after one warp, then it can be summoned from the Quick Menu. how -> "Después de tu primer salto a otro sistema, la Anomalía puede aparecer; luego invocala desde el menú rápido." The requires `first_warp` is correct.
- own_minotaur: the source page does not say how to get it. The Colossus page says geobay blueprints come from an Exocraft Terminal or the Anomaly Exocraft Research Terminal (Iteration: Perses) for Salvaged Data, or from side missions. Add the acquisition to how, and add `access_space_anomaly` to requires or a Salvaged Data cost. The generic `build_exocraft_geobay` gate is not a real hard gate: each geobay has its own blueprint.
- own_colossus: same as Minotaur. Fix how -> "Aprendé el plano del geobay del Colossus (Terminal de exovehículos / Terminal de investigación de exovehículos en la Anomalía, Datos recuperados) y construilo." The source gives Colossus 30 tech slots and 50 cargo, which matches "gran inventario".
- build_base_computer: the source says the blueprint is learned in Awakenings from Damaged Machinery (together with the Terrain Manipulator), and the craft costs 30 Chromatic Metal. The page notes it cannot be found elsewhere in the game. how -> "El plano se obtiene en 'Despertares' al examinar la Maquinaria dañada; fabricalo (30 Metal cromático) y colocalo." requires `[]` -> a gate on `repair_pulse_engine` or the Awakenings step that follows it.

**story**
- craft_warp_cell_from_antimatter: terminology. The name says "Célula de salto" and first_warp says "Célula de curvatura". Use one term (official Spanish: Célula de curvatura). The content (30 Oxygen + 50 Ferrite Dust, 20% hyperdrive, Replacement Antimatter) matches.
- complete_ghosts_in_the_machine: how only mentions the end. The mission runs from the Holo-Terminus and Apollo contact, through the base, Overseer and Scientist, Personal Forcefield and 60 nanites for a multi-tool module, to the raid on a Korvax Manufacturing Facility (repair the terminal, then the creature decision). It ends with a 3-star wanted level and "A Leap in the Dark". how -> that summary. description "segundo capítulo" -> "tercera misión de la ruta de Artemis" (wiki: third story mission of the Artemis Path; "second proper").
- reach_vykeen_rank_5 and reach_korvax_rank_2: the thresholds are correct (rank 5 = 30 standing, rank 2 = 8). Wording problems: the table gives the standing needed to access missions of that rank, and donations to a Guild Envoy apply to guilds, not races. Also "+1 per mission" is correct. how -> "...misiones de rango bajo de ese tablón; las donaciones al Enviado solo valen para gremios." Reword the description as "30 puntos de reputación = rango 5".
- decode_message_16_at_station: how skips the decode step. The station NPC gives encoded coordinates, and you have to return to the Base Computer (ideally via the station teleporter) to decode them. how -> add "volvé a tu Ordenador de base para decodificar las coordenadas".

**vessels**
- trade_companion_egg: the Companions page says only "players may trade eggs", with no steps. how "Entregá un huevo en multijugador" is vague. Name the mechanic (multiplayer, e.g. the Anomaly or a shared session) or mark the objective as multiplayer-only (tag `social`).
- own_shuttle_s_class: description says S-class has "más ranuras". The Starship page says an S-class ship does not necessarily have max slots. description -> "bonus de clase 50% o más; hasta 60 ranuras de tecnología al mejorarla". The class-upgrade terminal ("Terminal de equipamiento de naves") is not named in the source.

**world**
- build_cultivation_chamber: correct for freighter bases (Endurance), requires own_freighter OK. how never says how to unlock it. The page gives a craft of 50 Silver + 25 Oxygen + 10 Faecium, with a blueprint. Add both (source of the blueprint not given on the page; likely Construction Research Station) and `access_space_anomaly` / `use_construction_research_station` if confirmed in-game.
- own_second_settlement: "hasta cuatro asentamientos" is not in the source. The offering (3 Convergence Cubes / Vy'keen Daggers / GekNip) and the "no construction in progress" warning are correct. Claiming also needs enough faction standing. Remove the cap or confirm it in-game.
- find_em_hotspot: Hotspot page confirms Survey Device + Surveying Mode + C/B/A/S. The `build_base_computer` gate is not supported: hotspots are found with the Analysis Visor survey device, no base is needed. Remove it (keep `install_survey_device`).

**exploration**
- learn_autophage_all: 889 Autophage words is confirmed by the Language page ("Autophage & Atlas words have not been tested yet" though). The missing gate is the Echoes story (Echo Locator / Harmonic Camp / They Who Returned) as inferred from that mission page, not stated by the Language page. Add `start_they_who_returned` (or the Harmonic Camp step) to requires.
- visit_biome_mega_exotic_red: the red subtype is in red systems, but the source also says purple and yellow systems can host any of the three subtypes. `warp_red` is therefore not a strict gate. Planets are identified from the info panel when you exit the ship (not only from the scan). Soften the how.
- find_atlas_interface: the source shows 11 Interfaces and the Curiosity Beads, which matches. The Atlas Path needs Awakenings first, and continuing needs milestones (5 for the first seed). `["first_warp"]` -> add `complete_awakenings` or equivalent. how: "aparece junto a la estación" -> "usá la Galaxia/mapa: tras salir de una interfaz se marca la siguiente".

**crafting**
- craft_hydraulic_wiring: the recipe (Carbon Nanotubes x2, Salt x20, Di-hydrogen x40) is correct on the item page, but the source link is the generic Crafting page. The blueprint is found in Manufacturing Facilities and Operations Centres or bought at the Synthesis Laboratory for 250 nanites. requires: add `nanites>=250` to the Synthesis Lab branch. Point `source` at /wiki/Hydraulic_Wiring.
- install_neutron_shielding: description says it protects "a bordo de una exonave"; it is **Exocraft** technology (hazard protection for exocraft, radioactive environments). description -> "...dentro de un exovehículo...". Materials (Deuterium x95, Ionised Cobalt x50, Wiring Loom x1) and the `requires` branch of exocraft are correct. The "≈120 nanites / Tech Merchant" claim is not on the source page.
- craft_dirty_bronze: recipe (Pure Ferrite x100 + Pyrite x50) correct. Blueprint is in Manufacturing Facilities/Operations Centres or the Synthesis Laboratory (250 nanites); the page never mentions Factory Override Units. Add `nanites>=250` to the lab branch. Also craftable only with the blueprint.
- craft_frigate_fuel_200_tonnes: recipe (Di-hydrogen x200 + Tritium x200) correct. The blueprint is a reward of the **Freighter Command** mission. how says only "una vez conocida la receta". how -> "El plano es la recompensa de la misión 'Mando del carguero'." Add that mission as a requires.

## UNVERIFIABLE (5)

- roamer_fully_upgraded: the source (Roamer) only mentions adjacency bonuses with fully upgraded ~30 u/s. "Hasta 3 módulos ... cuadro 2x2 o línea" and the Técnico de exovehículos purchase are not in it. The id/name mismatch ("fully_upgraded" vs "con módulos adyacentes") should be fixed. Re-source or drop the specifics.
- reduce_sentinel_alert_settlement: the source lists features that decrease alert (suppressors, deflectors, turrets and so on) but never mentions funding "supresión centinela" under "Mejorar el asentamiento". Rewrite how generically ("aceptá rasgos como supresores o deflectores").
- learn_autophage_500: how ("Campamentos autófagos, Chatarra armónica y Ruinas") is not on the Language page. See the gate note under learn_autophage_all.
- cook_tortured_honey_cake and cook_refined_flour: the content is **correct** against the item pages (Writhing, Roiling Batter + Synthetic Honey; Heptaploid Wheat, Glass Grains or Kelp Rice = 3 recipes), but the cited `source` (Nutrient_Processor) has no recipes. Fix `source` to /wiki/Tortured_Honey_Cake and /wiki/Refined_Flour. Note refined flour has three recipes and the how lists only the first.

## Systemic patterns

1. **Core/story `requires` follow a simplified chain, not the real mission order.** All three core WRONG items are gates: Pulse Engine before Launch Thruster (reversed), first_warp as the freighter gate (real gate is Ghosts in the Machine), and a non-gate `warp_green` for the Indium Drive while the real gate (Anomaly access) is missing. Core is the most fragile category (70% MINOR+WRONG), and core gates feed everything else.
2. **Acquisition of the blueprint is the usual hole.** Many objectives say "once the recipe is known" or "buy it from a merchant" without the source or the cost: the Synthesis Laboratory (250 nanites), the Anomaly Research Terminals (Exocraft geobays, Salvaged Data), the Freighter Command reward, the Awakenings Damaged Machinery blueprint. Result: `requires` lack nanite or Anomaly gates.
3. **Templated families cite generic or wrong source pages.** Cooking and upgrade-module entries point to Nutrient_Processor, Upgrade_Module or Crafting, which do not contain the recipe or availability. Rank, language and Journey Milestone families are accurate on numbers but repeat one boilerplate `how`. Three families showed specifics not in the source (settlement cap of four, tech-merchant prices for exocraft tech, 2x2 module layout).

Smaller patterns: Spanish terminology drifts (Célula de salto/curvatura, "exonave" for Exocraft, English "Indium Drive"); `build_large_scale_farm` and `arena_league_progress` have no checkable completion criterion; Xeno Arena (Update 6.30, April 2026) is real and current (cited page lists PC; console parity not confirmed in the source, but the notes mention consoles and Switch 2).

Caveats: the wiki Journey Milestones values come from 1.77 data and some pages (Starship, Multi-Tool) are community-maintained; in-game verification was not possible, so the order in item 1 of WRONG reflects the cited page.
