# Unit 2 — People &amp; Life Stories · Interactive Workshop

Web app para la Unidad 2 del programa de Inglés A1+ de COEDUCA (9th Grade).
Tema: **Simple Past Negative + Ordinal Numbers + Months + Years**.

## 🚀 Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo, `unit2-people-stories`).
2. Sube los archivos:
   - `index.html`
   - `style.css`
   - `app.js`
   - `files/` (carpeta con las imágenes — ver abajo)
3. Entra en **Settings → Pages** del repositorio.
4. En **Source**, selecciona `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Guarda y espera ~30 segundos. GitHub te dará una URL como `https://tu-usuario.github.io/unit2-people-stories/`.

## 📁 Imágenes requeridas (carpeta `files/`)

El ejercicio 5 (Multiple Choice) intenta cargar estas imágenes. Si no están, automáticamente cae a un emoji como respaldo:

- `files/sheteacherteachingthealphabet.jpg`
- `files/babyboycrying.jpg`
- `files/threeboysplayingsoccer.jpg`
- `files/girlreadingbook.jpg`

*(También puedes añadir las otras del set y expandir el ejercicio: boyandgirlcooking, whitecatsleeping, boydrinkinglemonade, boyeatingpizza, girlrunning, boylisteningwithheadphones).*

## ✨ Características

- ✅ **10 ejercicios + juego bonus** (tic-tac-toe con IA minimax).
- ✅ **Drag &amp; drop con soporte táctil** (mouse + touch) + **auto-scroll** cuando el usuario arrastra cerca de los bordes (zona de 70px).
- ✅ **Guardado automático** con `localStorage` — si cierran el navegador, al volver recuperan todo.
- ✅ **Autocalificación** con promedio sobre escala 1–10 + puntos extra del juego.
- ✅ **PDF descargable** con jsPDF (sanitización de caracteres Unicode, emojis y HTML).
- ✅ **Anti-copiar/pegar/traducir** (bloqueo de clicks derechos, atajos, y etiqueta `notranslate`).
- ✅ **100% responsive** — funciona en PC, tablet y móvil.

## 📝 Datos que aparecen en el PDF

- Profesor: **José Eliseo Martínez**
- Escuela: **COEDUCA**
- Sección: **A**
- Grado: **9th**
- Nombre / NIE: **(campos editables por el estudiante en la cabecera)**
- Tema: **Simple Past Negative + Dates + Ordinals**
- **Puntos extra visibles en la esquina superior derecha** (si ganaron o empataron el juego bonus).

## 🎮 Juego Bonus (Tic-Tac-Toe / XO)

- Personaje emoji que cambia según el avance: 🙂 (jugando) → 🤔 (pensando la máquina) → 🥳 (ganaste) / 😐 (empate) / 😢 (perdiste).
- **Ganar:** +1 punto extra.
- **Empatar:** +0.5 puntos extra.
- **Perder:** 0, más suerte la próxima.
- El estudiante solo puede ganar una vez (evita re-grinding). Si ya ganó, la app pide confirmación antes de jugar de nuevo.

## 🔤 Contenido de los ejercicios

1. **Sopa de letras** — 12 meses del año (4 direcciones).
2. **Unir con líneas** (SVG) — números con ordinales (1st, 2nd, 3rd, 5th, 9th, 12th, 21st, 31st).
3. **Drag &amp; drop fill-in-the-blanks** — 6 oraciones con Simple Past Negative.
4. **Unscramble** — reordenar letras para formar meses / ordinales.
5. **Multiple choice con imágenes** — 4 imágenes del set + elegir la forma negativa correcta.
6. **Clasificar verbos** — arrastrar a columna Regular / Irregular.
7. **Dropdown** — elegir `didn't` vs `wasn't/weren't` vs `was/were`.
8. **Verdadero / Falso** — datos históricos.
9. **Escribir la fecha completa** — formato americano (Month Day Year).
10. **Oraciones con emojis** — escribir la forma negativa correcta.

+ **Bonus:** Tic-Tac-Toe para puntos extra.

---
*2026 · COEDUCA · Profesor José Eliseo Martínez*
