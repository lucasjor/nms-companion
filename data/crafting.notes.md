# crafting.json - notas

## Fuentes y versión
- AssistantNMS/App (GitHub, `assets/json/{en,es,es-la}`): Products, ConstructedTechnology, Technology, TechnologyModule, UpgradeModules, Refinery, NutrientProcessor, Cooking, RawMaterials, Curiosity. `assets/data/meta.json` indica **GameVersion 6.01 (Voyagers, 2025-08-28)**; el último commit del repo es de oct-2025. Es decir, NO cubre contenido posterior a 6.01 (hasta oct-2026): hay que revisar actualizaciones nuevas a mano.
- Wiki (nomanssky.fandom.com, API MediaWiki vía curl): fuente de cada objetivo (URL de la página del ítem; si no existe se usa Nutrient_Processor/Refiner/Crafting/Technology/Upgrade_Module) y de las reglas de desbloqueo (Synthesis Laboratory, Factory Override Unit, Salvaged Data, Construction Research Unit/Station, Technology Merchant, Upgrade Control, Salvaged Frigate Module, Upgrade Module).
- Nombres en español: es-la (fallback es). **ConstructedTechnology no tiene traducción al español en AssistantNMS** (solo 23 ítems), así que refinerías, procesador de nutrientes, terminales, AMU, etc. llevan el nombre en inglés y descripción propia en español. Lo mismo pasa con algunas semillas y planos. Revisar con el juego en español.
- Generador: `scratchpad/crafting/scripts/gen.py` (+ `fetch_wiki.py`).

## Contenido (677 objetivos)
- 317 platos del Procesador de nutrientes (`cook_*`), 70 refinados por producto de salida (`refine_*`; puerta = refinador portátil/mediano/grande según el mínimo de entradas de la receta), 114 fabricaciones (productos con receta + equipos clave + objetivos "fabricar N"), ~164 instalaciones de tecnología (Exotraje, Multiherramienta, Nave, Exovehículo, Minotauro, Nautilón, Carguero) y plantillas/ranuras de módulos de mejora (S por ranura + clases C/B/A/S repetibles por categoría).
- Puertas reales modeladas: recetas con coste "Factory Override" => Unidad de anulación de fábrica o Laboratorio de síntesis (250 nanitas); equipos con coste "Salvaged Data" => `unlock_construction_research`; planos de tecnología => `visit_space_station` + `nanites>=coste`; tecnología de carguero => `own_freighter` + Módulos de fragata recuperados; platos 100% pescado => `install_fishing_rig`.

## Correcciones a core.json
1. `build_exocraft_geobay` (y por tanto los exovehículos): los geobays cuestan 4-10 Datos recuperados (coste "SalvagedData" en AssistantNMS) => debería requerir `unlock_construction_research` (definido en crafting.json), no solo `build_base_computer`.
2. `own_nautilon` requiere solo `build_base_computer`, pero la Cámara del Nautilón también cuesta 10 Datos recuperados => idem.
3. `warp_red/green/blue`: el plano (Cadmio/Emerilio/Indio) cuesta 80/120/200 nanitas y se compra a comerciantes de tecnología; conviene `visit_space_station` y `nanites>=`. `warp_purple` (Unidad Atlante, 200 nanitas + Resonancia) no está confirmado que dependa de `warp_blue`: dudoso.
4. `own_corvette` requiere solo `leave_first_planet`; la corbeta se obtiene en la Anomalía, probablemente debería requerir `access_space_anomaly` (no verificado).

## Dudas / sin verificar
- Los planos de tecnología: el wiki dice que las terminales de investigación de la Anomalía (exotraje/multiherramienta/nave/exovehículo) cobran Datos recuperados, mientras que AssistantNMS y el wiki del Technology Merchant indican nanitas. El "how" menciona ambas vías; se modeló el coste en nanitas.
- Recetas de productos 'prod90-93' (Puente de consciencia, Núcleo pulsante, Membrana imposible, Semillas de cristal): no se incluyeron (propósito no verificado).
- Excluidos por ser exclusivos de expediciones o sin fuente permanente verificada: Liquidator (Minotauro), Lost Angler's Rig, Singularity Engine, Frameshift Catapult, Waveform Engine, Advanced Launch System, Sputtering/Temporal/Plasma Starship Trail, Archive Bypass Implant, Resonance Amplifier, Photonix Core/Boltcaster SM (solo edición limitada), Tentacled Figurine, Anomaly Suppressor.
- No incluidos por ser tecnologías de arranque/historia (ya cubiertas en core o dadas gratis): Hazard Protection, Life Support, Jetpack, Pulse Engine, Launch Thruster, Hyperdrive, Deflector Shield, Photon Cannon, Mining Beam, Scanner, Analysis Visor, Boltcaster, Aeration Membrane, Drives de color (core `warp_*`), Traductor de Artemis.
- Recetas de Nautilón/Minotauro/Exovehículo: la restricción de qué exovehículo concreto usa cada tecnología se generalizó a "algún exovehículo" (salvo Minotauro/Nautilón).
- Módulos de mejora de nave estelar (hiperimpulsor, escudos, motor de pulso): AssistantNMS solo lista módulos de arma de nave; no se crearon ranuras específicas.
- Recetas de refinado: el "how" lista hasta 3 recetas de ejemplo; hay más variantes en los datos.

## IDEAS para otras categorías
- Exploración: encontrar Cristales de tormenta (declarado en `needs` como `find_storm_crystal`), Módulos de tecnología enterrados (Datos recuperados), Instalaciones de manufactura (Unidades de anulación de fábrica).
- Bases/construcción: partes de la Estación de investigación de construcción (decoración, granja: bandejas hidropónicas, Alimentador automático, Unidad de ganado), cables/interruptores/generadores (conTech 46-62), Unidad de minería autónoma, Teletransportador de base, módulos de carguero.
- Economía: Cronos (nanitas por platos), Iteración: Ares (nanitas por hitos/productos), vender productos fabricados de alto valor (Fusion Ignitor, Stasis Device).
- Naves/carguero: Módulos de fragata recuperados, Control de mejoras del carguero (recoloreo, ranuras), mejoras consumibles de fragata.
- Pesca: Fishing Rig, Bait Box, Auto-Trap, Exo-Skiff y platos de pescado (Aquarius); "The Angler".
- Autophage/Voyagers: Scan Harmoniser y Polyphonic Core (planos gratis en la historia Autophage), materiales Cuarcita/Litio/Metano/Helio cristalizado (refinados incluidos aquí).
- Estación de actualización de multiherramienta y Estación de actualización del exotraje (inventario): no cubiertas aquí.
- Nexus / Cuerpo de misiones: ítems de misión de la Anomalía que dan módulos de mejora.
