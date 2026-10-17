# Notas de exploration.json (v2, basada en wikitext descargado)

## Metodología
- Contenido verificado contra wikitext del wiki de nomanssky.fandom.com vía API MediaWiki (parse/categorymembers). Archivos en `.../scratchpad/exploration/downloads`. Cada `source` es una página realmente descargada (algunas rutas son redirecciones, p. ej. Sandworm -> Shaihuluda).
- Hubo rate limit (429) al final: no se pudieron bajar Biome - Lush/Barren/Scorched/Frozen/Toxic ni páginas de Dissonant System/Echo Locator/Emergency Signal Scanner/Nautilon; esos datos se tomaron de las páginas `Biome`, `Harmonic Interface`, `Derelict Freighter`, `Underwater` ya descargadas.
- Nombres en español: se usaron los títulos del wiki en español (nomanssky.fandom.com/es) cuando existían (Yermo, Ardiente, Congelado, Irradiado, Pantanoso, Volcánico, Horror biológico, Interfaz Atlas, Núcleo Galáctico, Amplificador de señal, Supresor de toxinas, Deflector de radiación, Red Refrigerante, Capa Térmica). Ese wiki es una traducción de la comunidad, NO la localización oficial del juego, y tiene errores (p. ej. 'Fallo de contención' en realidad es Containment Failure, no Boundary Failure; usé 'Fallo de límite' como traducción propia). Verificar en el juego en español.
- Nombres propios sin equivalente en el wiki español (Gigante gaseoso, Mundo acuático, Reliquia, Piedra de memoria, nombres de tormentas) son traducciones propias.

## Correcciones al core.json
- `tech_aeration_membrane`: el wiki español llama 'Membrana de ventilación' al Aeration Membrane; no verificado cuál es el nombre oficial.
- `unlock_portals`: según Portal, la activación se enseña en la misión de Artemis 'A Leap in the Dark'; core lo hace depender solo de `first_warp`. Probablemente debería requerir `complete_artemis_path` o la misión correspondiente.
- `access_space_anomaly` requiere solo `first_warp`; correcto salvo que la Anomalía aparezca por historia.

## Cambios respecto a v1
- Eliminado el bioma 'Disonante': Disonancia es un nivel de centinelas/sistemas, no un bioma. Ahora hay 'planeta disonante' + Campamento armónico, Eco de sentiencia, anomalía gravitatoria (requieren Localizador de ecos / Armonizador de escaneo).
- Biomas reales: Exuberante, Yermo, Ardiente, Congelado, Tóxico, Irradiado, Muerto, Pantanoso, Volcánico, Mundo acuático, Exótico, Mega exótico (rojo/verde/azul), Gigante gaseoso (Worlds Parte II, sistemas púrpura), Reliquia (Worlds Parte II); subtipos Infestado y Submarino.
- Hitos con umbrales reales (Journey Milestones): a pie, alienígenas conocidos, palabras totales, saltos de hiperimpulsor, zoología planetaria, y títulos 5..55.
- Idiomas: 5 (Gek, Korvax, Vy'keen, Atlas, Autófago) con totales del wiki (921/858/930/222/889 grupos de palabras, Worlds Parte I 5.03). Los hitos de 100/500 palabras por idioma son metas personales mías, no del juego.

## Omitido / incierto
- Leviatán: es una fragata de expedición (Expedición 7), excluida. No hallé 'criaturas espaciales' documentadas; omitido.
- Mundos Edén (Category:Eden Worlds): sin leer; omitido.
- Planetas anómalos/Glitch: solo el 'fallo de realidad estabilizada' de biomas exóticos está documentado.
- Monolitos tienen 17 tipos (Category:Monoliths), no desglosados.
- Cartas planetarias: 4 tipos (sitio seguro, socorro, puesto habitado, artefactos); modeladas como un único objetivo repetible.
- Requisito de sonar del Nautilon (Ruinas sumergidas / Edificio hundido) se modeló como `own_nautilon`; el Sonar de alta potencia es una mejora del Nautilon, ver categoría de vehículos.

## Needs declaradas
tech_signal_booster, tech_toxin_suppressor, tech_radiation_deflector, tech_coolant_network, tech_thermic_layer, tech_echo_locator, tech_scan_harmoniser, progress_they_who_returned, complete_atlas_path.

## Ideas para otras categorías
- Misiones/historia: El Camino del Atlas, They Who Returned, The Purge, Nuevos comienzos (salto de galaxia), A Leap in the Dark.
- Combate/economía: Instalaciones de fabricación y Centros de operaciones (Centinelas), Pilar centinela.
- Bases/economía: Cultivo de Bolas de gravitino, Asentamientos (core own_settlement), Archivo colosal y trueque de artefactos.
- Naves/vehículos: Nautilon Sonar de alta potencia, Radar Power Resonator del exovehículo, Amplificador de señal avanzado del exovehículo, Minotaur Radar Array.
- Coleccionables: Equipos de pesca (Aquarius), Huesos antiguos / fósiles, Piedras de memoria y reliquias constructibles.
