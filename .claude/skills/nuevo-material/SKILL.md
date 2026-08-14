---
name: nuevo-material
description: Añade una presentación o una actividad nueva a un nivel de profundización y deja la cadena de índices coherente (tarjeta en el índice de la carpeta, metadatos del índice del nivel y recuento en el índice raíz). Úsala cuando pidan crear, añadir o incorporar un material a profundizacion-1, -2 o -3.
---

Argumentos: `$ARGUMENTS` (p. ej. `profundizacion-3 presentaciones "El método científico"`). Si falta el nivel, la carpeta o el tema, pregúntalos antes de escribir nada.

## 1. Sitúa el material

- Nivel: `profundizacion-1`, `-2` o `-3`. Carpeta: `presentaciones/` o `actividades/`.
- Nombre del archivo: `N_slug-en-kebab.html`, donde `N` es el siguiente número libre en esa carpeta. **Excepción**: en `profundizacion-1/presentaciones/` los archivos no llevan prefijo numérico — mantén ese formato ahí.
- Los niveles son independientes: no copies el cambio a los otros dos.

## 2. Crea el archivo de contenido

Invoca la skill global que corresponda y deja que ella genere el HTML:

- Presentación de diapositivas → `presentacion-html`.
- Explicación de un concepto escena a escena, con dibujo animado → `mazo-animado-svg`.
- Juego o taller de clasificar/ordenar términos → `juego-clasificar-terminos`.

Si ya hay archivos hermanos en esa carpeta, ábrelos primero: el material nuevo debe usar la misma paleta y el mismo estilo que ellos. Un archivo, autocontenido, con `<style>` y `<script>` inline; Google Fonts es la única dependencia externa permitida.

**Si es una actividad**, copia además el bloque de identificación y certificado de una actividad existente (por ejemplo `profundizacion-1/actividades/1_metodo-cientifico.html`), que es idéntico en las diez:

- El CSS de `.campo`, `.velo`, `.certificado` y el `@media print`, al final del `<style>`.
- El `div.campo` con `#nombre` y `#aviso-nombre`, dentro de `#portada` justo antes de `#btn-inicio`.
- `<button id="btn-certificado" class="secundario" hidden>Certificado</button>` en `.controles`.
- El overlay `#velo-cert` **antes** del `<script>`.
- El bloque JS final (`exigirNombre`, `certificar`, `folio`, …) y las dos conexiones: `#btn-inicio` debe llamar a `exigirNombre()` antes de `comenzar()`, y `revelar()` debe terminar llamando a `certificar()`.

El título del documento tiene que seguir el formato `Nombre de la actividad — Taller NN`: el certificado lo parte por el guion largo.

## 3. Engancha la tarjeta en el índice de la carpeta

Edita `profundizacion-N/<carpeta>/index.html`:

- Si el índice está en estado vacío (`<div class="vacio">`), sustituye ese bloque por la rejilla de tarjetas copiando la estructura de la carpeta hermana equivalente de otro nivel.
- Si ya hay rejilla, añade un `<a class="tarjeta barra viva ...">` más, **imitando exactamente el patrón de ese archivo** — los índices no son idénticos entre sí: unos usan `class="rejilla menu archivos"` con el verbo `Entrar`, otros `class="menu cols-3"` con `<span class="num">` y el verbo `Abrir`. Sigue el que ya esté en uso.
- Ajusta la clase de recuento si aplica (`.menu.una`, `.dos`, `.cuatro`) y el `--min` en línea.
- El `href` es relativo, dentro de la misma carpeta, con `.html` explícito.

## 4. Actualiza el resto de la cadena

- `profundizacion-N/index.html`: en la tarjeta de esa carpeta, el `<span class="mono">` deja de decir `En preparación`.
- `index.html` (raíz): actualiza el recuento de la tarjeta del nivel (`"3 presentaciones · 3 actividades"`).

## 5. Verifica

- Todos los `href` locales nuevos apuntan a archivos que existen.
- Abre el archivo nuevo y el índice modificado en el navegador para comprobar que se ven bien.
- Informa de qué archivos creaste y cuáles editaste.
