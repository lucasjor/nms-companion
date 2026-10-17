# vessels.json notes

Research: fandom wiki via MediaWiki API (extracts of Starship, Freighter, Frigate, Exocraft, Multi-Tool, Corvette, Companion Pets/Egg, Egg Sequencer, Xeno Arena (6.30), Starbirth, Void Egg, Derelict Freighter, Cargo Bulkhead, etc.). Game is at 7.x "Cosmos" (Sep 2026); the wiki has almost no text for the 7.00 release notes, so Cosmos content is only covered where dedicated pages exist (Space Hulk, Tractor Beam, derelict freighter changes).

## Corrections to core.json
- own_capital_freighter: wrong "how". Capital freighters cannot be bought roaming; they appear in post-warp pirate battles (from the 3rd rescued freighter on) and are bought after winning. Cooldown 3 h and 5 warps.
- own_corvette: there is no "constructor desbloqueable"; the Corvette Workshop exists in every populated station (also outlaw/abandoned). Needs landing gear, habitation, access, cockpit, reactor, engine, weapon. requires should include visit_space_station. (Part cap conflicts: Corvette page says 160 since 6.03, Starship page says 100.) Corvette is NOT only reachable via expeditions anymore.
- own_living_ship: item is "Huevo del Vacío (Void Egg)", 3200 Quicksilver, then Starbirth (6 stages with ~24h organ maturation). Add quicksilver>=3200 to requires. Further living ships cost 10,000 Nanites.
- own_sentinel_interceptor: interceptors crash on dissonant planets (found by defeating the last sentinel wave, Harmonic Camp interface, or Carrier AI Fragments since 5.00); cockpit must be added. "planetas con centinelas dañados" is inaccurate.
- own_frigate: frigates are hired from captains near other freighters (marked green); wiki says up to 30 once you own a freighter.
- own_nautilon: needs blueprint for Nautilon Chamber from Dreams of the Deep or 10 Salvaged Data at the Blueprint Analyser; Humboldt Drive separately from the Anomaly.
- own_minotaur / own_nomad: geobay blueprints sold in Anomaly for Salvaged Data (10 each for Minotaur); Nomad was also a Community Expedition reward but is now buyable. Roamer/Nomad also come free from Exocraft Technician.
- build_exocraft_geobay: blueprint source is the Exocraft Technician mission or the Anomaly/Blueprint Analyser, not "técnico en tu base".
- adopt_companion: creatures are fed Creature Pellets (mechanical ones: Ion Battery); start with 2 slots.
- warp_purple: not verifiable from the pages I fetched; I used it only as the gate for the Exocraft Summoning Unit (purple-system materials).

## Uncertain / not verified
- Cost of companion slot 4 and slots 19-30; Atlantid multitool monolith prerequisite; hyperdrive freighter levels names; where Minotaur Bore, Colossus Mineral Rig and Nautilon Dredging Laser blueprints are sold.
- Merchants Guild bulkhead rank: 8 (Cargo Bulkhead page) vs 9 (Freighter page).
- Royal multitool: Sentinel Pillar page says "only known way", Monolith page lists it too.
- Frigate class thresholds and exact rank-up counts are from the wiki, may be outdated.
- Squadron costs were stripped of their currency in the extract.

## Excluded (expedition-only / Twitch)
Golden Vector, Utopia Speeder, Starborn Runner, Iron Vulture, Boundary Herald, Normandy, Leviathan, vintage Sentinel Interceptor ("Our Journey Continues"), Fearsome Visor, Outlaw Cape, Hardframe/Liquidator Minotaur upgrades (Exped. 14, check if re-offered), biological horror egg (Exped. 3), worm companion (Exped. 4), Twitch ships/pets.

## Ideas for other categories
- Cosmos: space stations you can claim/decorate, deep-space outposts, salvage contracts and mission board, spacewalking, alliances, new base parts, trader asteroid mining.
- Purple system crafting (Activated Quartzite, Crystallised Helium).
- Hazardous flora Nexus missions, Under a Rebel Star (Shroud of Freedom), Observatory sites (Storage Augmentation), Manufacturing Facility puzzles.
- Echo Locator/Dissonance Resonator drops, They Who Returned questline (Void Motes, Polyphonic Core, Scan Harmoniser).
- Starship technology blueprints/upgrade modules and exocraft tech blueprints belong to crafting/tech.
- Creature taming Nexus missions and the Arena League guidance medals; Guild standing ranks.
