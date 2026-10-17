# world.json notes (Bases, Asentamientos, Economia, Combate, Social)

Fuentes: MediaWiki API de nomanssky.fandom.com (WebFetch da HTTP 402 y curl normal da Cloudflare; `api.php?action=parse` funciona pero se rate-limita con 429), nomansskyresources.com y las notas de Xeno Arena 6.3 / Swarm 6.4. Las paginas de la wiki que pude leer son las que citan los `source`. Las ultimas paginas de actualizacion (6.40, "Community Research") no pude bajarlas por 429.

## Nexus y Quicksilver: respuesta

**Nexus = contenido permanente, NO parte de las Expediciones.**
- Wiki (Nexus): "multiplayer mission board onboard the Space Anomaly"; Release History: *Beyond* (anade a la Anomalia) y *Fractal* (habilitado en Switch). No hay mencion a expediciones.
- Misiones normales, cifradas (signo morado), diarias de Quicksilver (marca amarilla/gotas doradas) y de fin de semana (hexagono turquesa). Se pueden hacer en solitario y sin conexion, salvo la de fin de semana que exige conexion al servicio de descubrimiento en linea. Hasta 4 jugadores por mision; 8 en la Anomalia en consola (32 en PC).
- Tipos (wiki): Collect an Item, Construct an Outpost, Construct an Underwater Outpost, Raid a Planetary Depot, Unearth Ancient Bones, Survey a Planet, Tame Wild Creatures, Eliminate Planetary Monstrosities, Eliminate Hazardous Flora, Investigate Anomalous Region (finde), Rescue Stranded Lifeform, Hunt Dangerous Pirates. nomansskyresources anade Hack a Sentinel Pillar, Root Out Corrupted Sentinels, Exterminate Vile Broods, Purge the Infestation, Catch Uncommon Fish, Eliminate Swarms (Swarm 6.4).

**Quicksilver = moneda permanente; las Expediciones son solo UNA fuente mas (y excluida aca).**
- Fuentes permanentes (wiki "Quicksilver"): mision diaria del Nexus 400 (hasta 3 acumuladas por partida), mision de finde del Nexus 1.800 (1 por semana), Nada en la historia 150 (varias veces), Hielo estelar condensado (encuentro espacial con motor de pulso) 100, y el evento de asentamiento "Un ciudadano buscado" ~450. Historial: NEXT 1.58 lo anade; Beyond permite ganarlo con misiones no limitadas; Waypoint 4.00 sube Nexus a 400/1800.
- Fuentes que NO inclui: Expediciones (recompensas de fase), Twitch drops, y las misiones "Community Research" que la wiki lista como "Time-limited missions ... no longer available". nomansskyresources menciona ademas 15 QS por visitar ruinas con un "Historiographical Dosimeter" y "derelict freighter loot / dar comida a Cronus" como raras: no pude verificarlo en la wiki, lo dejo fuera.
- Gasto: en el Companion de Sintesis de Quicksilver ("Quincy", Anomalia, junto al Nexus). Catalogo permanente con precios (wiki, tabla 6.1, hasta Community Mission 109): estatuas bronce/plata/oro (300/400/500; Astronaut, Blob, Gek, Walker, Diplo, Fighter, Atlas, y hielo/vidrio), decales 400, banners 220, posters 400, plantas decorativas 500 (87 en total), emotes 1.500, gadgets 800, titulos 800, ByteBeat 800, accesorios de mascota 1.600, cascos 3.000, capas 3.000, mochila 3.500, visajes 3.200, figuritas 3.200, estelas de mochila/nave 800/2.100, estelas de carguero 800, fuegos artificiales 50-60, Myth Beacon 80, **Void Egg 3.200 (unica forma de empezar Starbirth/nave viviente)**, set blindado (750/750/1.000/1.000/3.000). Total para todo: 267.250 QS. Tambien entrega gratis recompensas de expedicion ya ganadas (compartidas entre partidas de la cuenta).
- Duda abierta: muchos items del catalogo estan marcados en la wiki como parte de una "Community Mission ID N Tier T" (misiones comunitarias de tiempo limitado) que los desbloquean. No esta claro si hoy hay que haber participado cuando estuvo activa. La wiki dice que el total de 267.250 QS incluye "todos los items de la tienda hasta la mision 109", lo que sugiere que se compran sin restriccion, pero no lo confirme en juego. Por eso mis objetivos de compra cubren solo items con precio, sin prometer que todos esten disponibles.

## Correcciones a core.json
1. `unlock_nexus`: "hablá con Priest Entity / terminal del Nexus" es impreciso. El Nexus es un tablero de misiones (con holograma) en la cubierta de naves de la Anomalia, a la derecha de la rampa; no lo da Nada. Se puede usar apenas accedes a la Anomalia.
2. `own_living_ship`: el Void Egg cuesta 3.200 Quicksilver (la wiki lo confirma como unica via de inicio de Starbirth). Correcto lo demas.
3. `own_settlement`: ademas de "seguir la mision", para ser supervisor hace falta reputacion minima con la raza y entregar 3 Convergence Cubes / Vy'keen Daggers / GekNip. Los asentamientos NO estan en Switch 1 (si en Switch 2). Se consiguen con la mision "The Settlers" o comprando una Settlement Chart al Cartografo (5 Navigation Data). Maximo 4 asentamientos simultaneos.
4. `own_freighter`/`own_capital_freighter`: el primer carguero rescatado de piratas es gratis; los dos primeros salvados son cargueros comunes (hasta 19 slots) y desde el tercero siempre son capital.
5. `build_exocraft_geobay`: la wiki indica que el Tecnico de exovehiculos solo se contrata despues de avanzar con Supervisor, Cientifico, Armero y Granjero.
6. `own_nautilon`: la Camara del Nautilon se obtiene en la mision "Dreams of the Deep" o por 10 Salvaged Data en el Analizador de planos; no exige explicitamente una base submarina.
7. `own_sentinel_interceptor`: desde la 5.00 el camino mas fiable es el Carrier AI Fragment (se obtiene destruyendo el Carguero centinela de busqueda espacial 5), que marca el lugar del interceptor estrellado en planetas disonantes.
8. `build_base_computer`: ojo, el nombre dice "reclamar una base" y la descripcion es correcta; ningun cambio.

## `needs` declarados
`tech_survey_device`, `tech_economy_scanner`, `tech_conflict_scanner` (crafting/tech) y `complete_they_who_returned` (story).

## Items dudosos / decisiones
- Nombres en espanol: no pude verificar nombres oficiales en juego salvo los de interlenguaje de la wiki (Construccion de bases, Terminal de comercio galactico, Bandeja hidroponica, Panel solar, Cuadrupedo Centinela, Interceptor Centinela, Carguero Centinela, Nivel de busqueda, Cumulo de nanites, Batalla espacial). El resto son traducciones propias con el nombre en ingles entre parentesis; rangos de gremio ("Iniciado, Aprendiz, Oficial...") tambien son traduccion propia.
- Rangos de gremio: wiki lista Unknown 0, Initiate 3, Apprentice 8, Journeyman 14, Associate 21, Senior 30, Master 40, Elder 60, Exalted 100 (puntos de reputacion). nomansskyresources usa una numeracion distinta (Mission Rank). Guild Envoy da +5 en su primera mision.
- Reputacion con razas (Gek/Korvax/Vy'keen): no hay umbrales numericos verificados, por eso son objetivos genericos.
- Niveles de busqueda (wiki "Wanted level"): 1 la unidad que te vio, 2 = 5 drones, 3 = 2 Quads, 4 = muchos drones + mecha Hardframe, 5 = 2 Quads + drones + mecha + Caminante. La pagina del Walker dice que el Caminante aparece ya en 4 estrellas; hay inconsistencia entre paginas.
- "Sentinel Dreadnoughts" y "Sentinel boarding": no encontre mecanica verificada. Lo que existe es el Carguero/Portanaves centinela (busqueda espacial 5, destruible, no tiene entrada). Pirate Dreadnought si es real (Echoes 4.40).
- "Derelict freighter bosses": no hay un jefe verificado; el contenido son Horrores, torretas Rogue AI, drones de seguridad. Omitido.
- Concursos de fotos: no confirmado como contenido real en consola; omitido. "Community Research" actual: no confirmado (la wiki los trata como historicos); omitido.
- Mision "Terminal de comercio galactico en base": plano por mision del Supervisor o por Salvaged Data en la Anomalia; el costo exacto no se verifico.
- Costes de planos: Panel solar 8 SD, Bateria 3 SD, Generador electromagnetico/Extractores 10 SD, cultivos 3 SD (wiki), Modulo de teletransporte "2" (la unidad se perdio en el texto; asumi Salvaged Data pero no la nombro).
- `settlement` features (rasgos): la wiki dice hasta 18 rasgos, "Settlements ... Switch 2 only". Los "Citizen disputes" tienen resultados "Unknown" en la wiki.
- La tecnica "hundir el mercado" con Cobalto esta documentada en la wiki (Galactic Trade Terminal) pero figura tambien bajo explotaciones; la dejo como estrategia marcada `repeatable`.
- La configuracion de "console multiplayer" depende de suscripcion (PS Plus / Game Pass / Nintendo Switch Online).

## IDEAS para otras categorias (no incluidas)
- Story/missions: "The Settlers" (secundaria), "Dreams of the Deep", "Under a Rebel Star" (Forged Passport/outlaw), "They Who Returned" (Autophage), "Expanding the Base"/Scientific/Weapons/Agricultural/Exocraft Technician (las cubri como contratar NPC; las misiones en si podrian ser objetivos propios), "Starbirth".
- Crafting/tech: Survey Device, Economy Scanner, Conflict Scanner, Cargo Scan Deflector, Haz-Mat Gauntlet, Positron Ejector/Neutron Cannon/Plasma Launcher/Scatter Blaster (armas citadas para centinelas y horrores), Emergency Warp Unit, Corvette modules desde Derelict Freighter.
- Fauna/companions: Xeno Arena (Morphogenetics, Egg Sequencer, Retroviral Pellets, limite de companeros 30, 8 afinidades); las acciones de cria y batalla de arena merecen su propia categoria.
- Freighter/fleet: frigate expeditions, Fleet Command Room, squadron upgrades (C->B 1.200 nanites, etc.), Pirate Frigates, Salvaged Fleet Unit.
- Exploration: Sentinel Boundary Map, Settlement Charts, Colossal Archives, Ancient Bones, Hotspot hunting, Dissonant systems, Crashed Interceptor sites (Harmonic Camp), Traveller Graves.
- Ships/vehicles: Sentinel Interceptor ships con partes propias, Pirate frigates, Solar ships.
- Economy extras no incluidos: Nanite farming via Runaway Mould (Curious Deposit), cocinar para Iteration: Cronus (50-320 nanites por plato), Iteration Ares/Helios daily trades, Tainted Metal.
