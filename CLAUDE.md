# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Materiales de clase de Trabajo Científico: sitio estático de HTML puro, sin build, sin dependencias, sin tests. Todo el contenido está en español.

## Estructura

Tres niveles independientes (`profundizacion-1`, `-2`, `-3`), cada uno con `presentaciones/` y `actividades/`. Cada carpeta tiene su `index.html`.

**Los niveles no se sincronizan.** Aunque `profundizacion-1` y `-2` compartan temas, son copias independientes: corregir un archivo de un nivel no implica tocar los demás. No propongas "propagar el cambio" salvo que se pida.

## Un archivo, autocontenido

Cada `.html` lleva su `<style>` y su `<script>` inline. La única dependencia externa en todo el repo es Google Fonts. No añadas archivos `.css`/`.js` sueltos, ni CDNs, ni bundlers, ni `package.json`.

## Dos sistemas visuales, no los mezcles

- **Todos los `index.html`** (raíz, nivel, `presentaciones/`, `actividades/`) usan el **ESTILO ESCENARIO** — neón sobre negro, `--accent:#00f5d4`, fuentes Fraunces/Inter/JetBrains Mono, una sola `<section class="slide">` con el motor de diapositivas al final. Al crear un índice nuevo, copia el de la carpeta hermana y cambia solo el contenido dentro de `<div id="stage">`.
- **Los archivos de contenido** traen su propia paleta y no siguen ese sistema: las presentaciones usan el estilo «plano» (`--navy:#0A1420`, `--cream`, `--amber`), las actividades el de taller (`--fondo:#0A0C10`, `--panel`, Space Grotesk).

Piezas del estilo escenario disponibles en los índices: `.tarjeta.barra.viva`, `.rejilla.menu[.archivos]`, `.menu.una|.dos|.cuatro`, `.eyebrow`, `.titular`, `.bajada`, `.entrar`, `.volver`, `.vacio` (estado vacío), y las clases de color `c1`–`c7`.

## La cadena de índices hay que actualizarla a mano

Al añadir o quitar un material, tres archivos quedan desincronizados si no se tocan:

1. `profundizacion-N/<carpeta>/index.html` — la tarjeta `<a class="tarjeta ...">` que enlaza el archivo.
2. `profundizacion-N/index.html` — el `<span class="mono">` de esa carpeta (dice `En preparación` mientras esté vacía).
3. `index.html` (raíz) — el recuento de la tarjeta del nivel (`"3 presentaciones · 3 actividades"`).

Esto ya está desfasado en `profundizacion-2/index.html`, que sigue marcando las presentaciones como `En preparación` aunque existan.

## Identificación y certificado (todas las actividades)

Las 10 actividades llevan el mismo añadido, con los mismos identificadores:

- `#portada` incluye `.campo` con `#nombre` y `#aviso-nombre`. `#btn-inicio` llama a `exigirNombre()` y solo arranca `comenzar()` si valida: dos palabras de dos letras o más, sin cifras ni símbolos. El nombre se guarda en `sessionStorage` bajo `tc-participante`.
- `revelar()` llama a `certificar()`, que rellena el certificado y abre `#velo-cert` a los 900 ms. `#btn-certificado` (en `.controles`) lo reabre.
- El PDF sale por `window.print()`: el bloque `@media print` oculta `.hoja` y deja solo el certificado en **A4 vertical**. No hay librería de PDF y no debe añadirse.
- El `@page` debe seguir en `portrait`. Con `landscape` el navegador maqueta apaisado y, si el diálogo de impresión tiene el papel en vertical, lo saca girado 90°. Los tamaños de impresión van en puntos y milímetros, no en `clamp()` con unidades de viewport, que no son fiables al imprimir.
- El overlay `#velo-cert` va **antes** del `<script>`: el bloque JS lo busca al cargar.
- El nombre de la actividad en el certificado sale de `document.title`, partido por el guion largo `—`. Todo título de actividad debe seguir el formato `Nombre de la actividad — Taller NN`.

Al crear una actividad nueva hay que replicar este bloque; `/nuevo-material` lo recuerda.

## Nombres y enlaces

- Contenido: `N_slug-en-kebab.html` (`1_metodo-cientifico.html`). Excepción histórica: `profundizacion-1/presentaciones/` no lleva prefijo numérico; respétala ahí y usa prefijo en el resto.
- Se publica en **GitHub Pages**. Enlaces siempre relativos y con `.html` explícito (`../index.html`, `presentaciones/index.html`); nunca rutas absolutas ni de directorio.

## Git

Commits directos a `main`, sin ramas ni PRs. Mensajes cortos en español.

## Skills para crear material

El material se genera con las skills globales `presentacion-html`, `mazo-animado-svg` y `juego-clasificar-terminos`. Para añadir un material nuevo y dejar los índices coherentes, usa `/nuevo-material`; para auditar el sitio entero, `/revisar-sitio`.
