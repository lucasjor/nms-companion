# story.json - notas

## Nexus y Community Research: son contenido PERMANENTE, no de Expediciones
- Nexus: tablero multijugador de la Anomalia Espacial, introducido en Beyond (2.00, "Moved multiplayer mission selection to the Nexus"). Misiones diarias de Quicksilver, de fin de semana y cifradas; todas se pueden hacer en solitario. Disponible en Switch desde 4.10. Fuentes: https://nomanssky.fandom.com/wiki/The_Nexus , https://nomanssky.fandom.com/wiki/Update_2.00 , https://nomanssky.fandom.com/wiki/Update_4.10
- Mas tipos de misiones Nexus agregados en actualizaciones normales: mundo corrupto (4.20), prole vil (5.00), pesca (5.50). No dependen de expediciones.
- Community Research: la serie original (semanas 1-8 y mision 9, ago 2018 - ene 2019) fue un evento por tiempo limitado YA TERMINADO (no incluido). Hoy la "Investigacion comunitaria" es el mecanismo permanente por el cual cada mision del Nexus suma progreso para que el Quicksilver Synthesis Companion desbloquee objetos (capa geometrica 4.30, esculturas de hielo y decals 4.70, fuegos artificiales 5.20). Fuentes: https://nomanssky.fandom.com/wiki/Community_Research , Update_4.30, 4.70, 5.20.
- Matiz: las expediciones pueden tener sus PROPIOS objetivos comunitarios opcionales (p. ej. Swarm 6.40: "Prismatic Core" con misiones Purge/Restoration/Sabotage; Remnant 6.20; ver Expedition_Terminus). Esos objetivos de expedicion estan excluidos; los permanentes si se incluyeron.

## Excluido por ser de expedicion (tiempo limitado)
Leviathan (3.90, bucle temporal estilo roguelike; no hay evidencia de que sea permanente: "when the expedition concludes your progress becomes a Survival save"), Singularity, Aquarius, The Cursed, Liquidators, Corvette, Breach, Remnant (expedicion comunitaria), Swarm, "Our Journey Continues" (Cosmos). Premios de expedicion se canjean en el Quicksilver Synthesis Companion pero no hay forma de repetir la expedicion (no verificado que existan reposiciones).
Excepciones que si son permanentes: Autofagos (nacio en Singularity 4.30 / Echoes 4.40 como mision permanente), Bobina de gravitinos y Plantas de residuos (Remnant), mundos purpura / In Stellar Multitudes (Worlds II).

## Correcciones a core.json
1. warp_purple: segun In_Stellar_Multitudes, el acceso a sistemas purpura es recompensa de completar "In Stellar Multitudes" (necesita They Who Returned + Camino del Atlas). Deberia requerir `complete_in_stellar_multitudes` (id mio), no solo warp_blue.
2. complete_artemis_path solo requiere first_warp. Deberia requerir `complete_the_purge` (o ser alias de la cadena completa; mi cadena va Awakenings -> Alone Amidst -> Ghosts -> Leap -> First Traveller -> Patterns -> 16/16 -> Purge -> New Beginnings).
3. own_living_ship solo requiere access_space_anomaly. En realidad se obtiene via Starbirth (cadena `complete_starbirth_biogenesis`, requiere Huevo del Vacio, ~3.200 Quicksilver segun The_Melody_of_the_Egg, portales y esperas). Nota: el unico otro camino es premio de expedicion.
4. own_nautilon requiere solo build_base_computer; el plano de la Camara del Nautilon se obtiene en "Dreams of the Deep" (`complete_dreams_of_the_deep`, que empieza al terminar 16/16 o con el hito Pionero); si no, hay otras fuentes que no verifique.
5. build_hyperdrive requiere solo leave_first_planet; en la historia el plano llega del Carguero estrellado (`get_hyperdrive_blueprint_freighter`) tras la base. Se podria enlazar.
6. own_freighter requiere first_warp; en la historia el primer carguero gratis llega durante "Fantasmas en la Maquina" (batalla espacial), o tras comprar. No verifique el resto de formas.
7. own_settlement requiere first_warp; ademas hace falta reputacion y recursos (ver pagina Settlement) y una carta/ mision "The Settlers".
8. access_space_anomaly requiere first_warp: la wiki (Space_Anomaly) dice que aparece tras el primer salto, correcto.

## Dudas / inciertos
- Nombres en espanol: sólo algunos titulos vienen de la wiki en espanol (Despertares, Solo Entre las Estrellas, Fantasmas en la Maquina, Un Salto en la Oscuridad, El Primer Viajero, Patrones en el Tiempo, La Purga, Nuevos Comienzos, Bajo una Estrella Rebelde, Un Rastro de Metal, Comando de Carguero, Sueños de las Profundidades, Nacimiento Estelar, Investigacion Cientifica/de Armas/Agricola, Tecnico de Exonaves, La Gira del Supervisor, Archivos Informaticos Basicos). Son de la wiki es (posible traduccion automatica), no verificados contra el juego en consola. "Autofagos", "tablon de misiones", "Quicksilver" y otros no tienen verificacion.
- Cosmos 7.0: la wiki de Fandom solo tiene la fecha (sin texto); use la resena de PSU. La tabla de plataformas de la wiki deja Xbox/Switch vacio para 7.00 y 6.30/6.40; no confirmado que esten en consola Xbox/Switch. Requisito para ser director de estacion no confirmado.
- Misiones del tablon: la lista y rangos proviene de Mission_Board (version Worlds Part I). Las actualizaciones 4.60 (Orbital) cambiaron gremios/estaciones; pueden haber diferencias.
- complete_expanding_the_base: asumo que se cierra tras las 4 ramas; la wiki no lo dice explicitamente.
- Atlas Path: algunos totales de hitos son del texto del pagina; el rework 4.50 podria haber cambiado numeros.
- Mision Interceptor (reparar nave interceptora, 4.20), Journey Milestones, Pilot Interface: no incluidas como cadena; core ya tiene own_sentinel_interceptor.
- Breach 6.10 (naufragios de corbetas): no pude verificar que el contenido de salvamento sea permanente; no incluido.
- Planetary NPC procedural missions (4.50) y "Autophage repeating missions" incluidas como repetibles genericas.

## Ideas para otras categorias
- Exploracion: Echo Locator / Dissonant planets; Knowledge Stones y aprender idiomas (Gek/Korvax/Vy'keen/Autophage/Atlas); Monolitos; Journey Milestones (cada hito) y medallas; Fishing (Aquarius): caña, peces; POI de espacio profundo (7.0).
- Bases/economia: Colossal Archive (Worlds I), Terminal de comercio galactico, asentamientos (mejoras S-class), Alliances/stations (7.0), bases orbitales (7.0), Waste Processing Plant / Colossus flatbed.
- Naves/vehiculos: Interceptor (Pilot Interface), Corbeta (Workshop, modulos, tractor beam), nave viviente, Voltaic Staff (multiherramienta), Atlantid multi-tool desde monolitos infundidos, Exocraft Colossus configs.
- Mascotas: Xeno Arena (cria de criaturas, Egg Sequencer, 8 afinidades), companion register de 30.
- Combate: Sentinel Pillar, Walkers, piratas, Hardframe.
