# ⚾ CATÁLOGO MAESTRO DE JUGADAS — ScoreVoz

Referencia para construir el parser de voz (`interpretVoice`). Cada jugada trae:
- **Voz:** frases que el anotador puede decir (con jerga incluida).
- **Marca:** qué hace la app (notación, avances, outs, AB/H/RBI).
- **Estado:** ✅ ya implementado · ⚠️ pendiente.

Notación de posiciones: 1=pitcher, 2=cátcher, 3=primera, 4=segunda, 5=tercera, 6=short, 7=left, 8=center, 9=right.

---

## 1. HITS ✅

| Jugada | Voz | Marca |
|--------|-----|-------|
| Sencillo (1B) | "sencillo", "hit", "imparable", "indiscutible", "sencillo al [campo]", "se embasó de hit", "llegó quieto a primera" | H, 1B, **AB**, bateador a 1ª, avanza corredores |
| Doble (2B) | "doble", "tubey", "doblete", "de dos esquinas" | H, 2B, AB, bateador a 2ª, corredores avanzan ~2 |
| Triple (3B) | "triple", "tribey", "de tres bases" | H, 3B, AB, bateador a 3ª, casi todos anotan |
| Jonrón (HR) | "jonrón", "home run", "cuadrangular", "la botó", "la sacó", "para la calle", "vuelacercas", "bambinazo" | H, HR, AB, **todos anotan + bateador**, RBI = corredores + 1 |

---

## 2. OUTS AÉREOS

| Jugada | Voz | Marca | Estado |
|--------|-----|-------|--------|
| Elevado / fly out | "elevado al [pos]", "fly al [pos]", "palomita", "globo", "elevadito" | out **F+pos** (ej. F8), AB, no hit | ✅ |
| Línea out | "línea al [pos]", "linietazo atrapado" | out **L+pos** (ej. L6), AB | ⚠️ |
| Foul fly out | "elevado de foul atrapado", "fly de foul" | out, AB | ⚠️ |
| **Elevado de sacrificio (SF)** | "elevado de sacrificio", "fly de sacrificio", "elevado y anota de tercera" | Condición: corredor en 3ª + <2 outs + fly atrapado → corredor **anota**. Out al bateador, **SF (NO cuenta AB)**, **RBI** al bateador, no hit | ⚠️ |

---

## 3. OUTS DE ROLA (ground outs)

| Jugada | Voz | Marca | Estado |
|--------|-----|-------|--------|
| Rola y out en 1ª | "rola al [pos]", "rodado a [pos]", "rola y out", "ground out" | out **pos-3** (6-3, 4-3, 5-3, 1-3; 3U si sin asistencia), AB, no hit | ⚠️ |
| Out forzado en otra base | "rola y fuerzan en [base]", "out forzado en [base]" | out forzado, notación según jugada | ⚠️ |

---

## 4. PONCHES ✅

| Jugada | Voz | Marca |
|--------|-----|-------|
| Tirándole (KS) | "ponche tirándole", "abanicó", "tiró y falló" | K, out, AB |
| Sin tirarle (KL) | "ponche cantado", "sin tirarle", "lo poncharon mirando" | ꓘ (K invertida), out, AB |
| Corrido (KC) | "ponche corrido", "se le cayó la tercera", "ponche y corre" | Si 1ª ocupada + <2 outs = **out auto**. Si no: safe en 1ª (K+AB, no out) u out 2-3 |

---

## 5. BASES POR BOLA Y GOLPEADO

| Jugada | Voz | Marca | Estado |
|--------|-----|-------|--------|
| Base por bola (BB) | "base por bola", "boleto", "lo pasaron", "transferencia", "base" | BB, **NO AB**, bateador a 1ª, **avance forzado**. Bases llenas → caballito (anota + RBI) | ✅ |
| Intencional (BBI) | "base intencional", "lo pasaron a propósito" | BBI, igual que BB | ✅ |
| Golpeado (HBP) | "pelotazo", "lo golpeó", "dead ball", "golpeado" | HBP, **NO AB**, bateador a 1ª, avance forzado | ⚠️ |

---

## 6. TOQUES (bunts)

| Jugada | Voz | Marca | Estado |
|--------|-----|-------|--------|
| Toque de sacrificio (out) | "toque de sacrificio", "toque y out", **"toque de bola"** (default) | out al bateador **2-3**, **SAC (no cuenta AB si avanza corredor)**, avanza corredor(es) | ⚠️ (hoy siempre marca out) |
| **Toque de hit (bunt single)** | "toque de hit", "se embasó con toque", "toque y safe", "toque y llega a primera" | **H, 1B, AB**, bateador a 1ª (es hit) | ⚠️ |

> **Regla de desambiguación:** "toque de bola" solo = out 2-3. Si trae "de hit / safe / embasado / llega" = bunt single.

---

## 7. JUGADAS DE CORREDORES ✅ (avance manual)

| Jugada | Voz | Marca |
|--------|-----|-------|
| Robo (SB) | "se robó la [base]", "robó segunda/tercera/home" | SB al corredor, avanza |
| Out robando (CS) | "lo sacaron robando", "atrapado robando", "out en el robo" | out (CS), 2-X |
| Wild pitch (WP) | "wild pitch", "lanzamiento descontrolado", "se le fue al pitcher" | corredor avanza, carrera limpia si anota |
| Passed ball (PB) | "passed ball", "pelota pasada", "se le fue al cátcher" | corredor avanza, carrera sucia si anota |
| Balk (BK) | "balk", "movimiento ilegal" | corredores avanzan 1 base |
| Revire (PO) | "lo sacaron en revire", "revire a [base]", "pickoff" | out (PO) |
| Avanzó por error | "avanzó por error", "error y avanza" | corredor avanza, carrera **sucia** si anota |

---

## 8. OUTS MÚLTIPLES

| Jugada | Voz | Marca | Estado |
|--------|-----|-------|--------|
| **Doble play (DP)** | "doble play", "doble matanza", "rola para doble play 6-4-3", "two y dos" | **2 outs**, notación (ej. 6-4-3), AB al bateador, no hit, **no RBI** en force DP | ⚠️ |
| Triple play (TP) | "triple play", "triple matanza" | **3 outs** | ⚠️ |

---

## 9. FIELDER'S CHOICE Y ERRORES

| Jugada | Voz | Marca | Estado |
|--------|-----|-------|--------|
| **Fielder's choice (FC)** | "jugada de selección", "fielder's choice", "sacan al de adelante", "out al corredor de adelante" | out al corredor forzado, bateador **safe en 1ª** (no hit, **sí AB**) | ⚠️ |
| Error (E) | "error del [pos]", "se le cayó", "mala tirada", "error y safe" | bateador/corredor avanza por error, **no hit, sí AB**, carrera **sucia** si anota | ⚠️ |

---

## 10. OTRAS

| Jugada | Voz | Marca | Estado |
|--------|-----|-------|--------|
| Interferencia (INT) | "interferencia" | bateador a 1ª | ⚠️ |
| Obstrucción (OB) | "obstrucción" | corredor avanza | ⚠️ |

---

## RESUMEN DE REGLAS DE CONTEO (para el motor)

- **AB (turno al bat):** cuenta en hits, outs de bola/aéreos, ponches, FC, error. **NO cuenta** en: BB, BBI, HBP, SF, SAC (toque de sacrificio).
- **H (hit):** solo 1B, 2B, 3B, HR, toque de hit.
- **RBI:** se acredita al bateador por cada corredor que anota por su jugada (hit, SF, caballito). **NO** en: error, force DP, wild pitch/passed ball, balk, carrera sucia.
- **Carrera sucia (unearned):** la que anota por error o passed ball.
- **Foul con 2 strikes:** NO suma strike (excepto toque fallido con 2 strikes = OUT). ⚠️ pendiente.
- **Cursor:** tras 3er out → siguiente bateador en orden consecutivo, siguiente entrada. NO resetear al primero. ⚠️ pendiente.

---

*Las frases de jerga local que falten, agrégalas tú — tú conoces cómo se dice en tu liga.*
