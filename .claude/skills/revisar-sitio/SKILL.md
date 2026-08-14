---
name: revisar-sitio
description: Audita el sitio entero de clases — enlaces relativos rotos, tarjetas de índice que no coinciden con los archivos en disco, textos "En preparación" obsoletos y recuentos desfasados en el índice raíz. Úsala cuando pidan revisar, comprobar o auditar el sitio, los índices o los enlaces.
---

Auditoría de solo lectura. No arregles nada hasta informar; luego pregunta si aplicas las correcciones.

## 1. Enlaces rotos

Para cada `.html` del repo, extrae los `href` locales (los que no empiezan por `http`, `#` ni `mailto:`) y comprueba que el archivo destino existe, resolviendo la ruta desde la carpeta del archivo que lo enlaza. Todo `href` local debe terminar en `.html` explícito: se publica en GitHub Pages y las rutas de directorio no sirven.

## 2. Tarjetas de índice frente a los archivos en disco

Para cada `profundizacion-N/<presentaciones|actividades>/index.html`, compara las tarjetas `<a class="tarjeta ...">` con los `.html` que hay en esa carpeta (ignorando el propio `index.html`). Señala:

- Archivos presentes que ninguna tarjeta enlaza.
- Tarjetas que enlazan archivos inexistentes.
- Carpetas con archivos que siguen mostrando el estado vacío `<div class="vacio">`.

## 3. Metadatos desfasados

- `profundizacion-N/index.html`: el `<span class="mono">` de una carpeta dice `En preparación` aunque la carpeta ya tenga material.
- `index.html` (raíz): el recuento de cada nivel (`"3 presentaciones · 3 actividades"`) no cuadra con lo que hay en disco.

## 4. Coherencia de estilo

- Todo `index.html` debe usar el ESTILO ESCENARIO (busca el comentario `ESTILO ESCENARIO` en su `<style>`).
- Ningún archivo debe referenciar recursos externos aparte de Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) — ni CDNs, ni `.css`/`.js` sueltos.

## 5. Informe

Agrupa los hallazgos por archivo, con la línea concreta cuando la tengas, y ordénalos: primero los enlaces rotos (dan 404 en producción), después las tarjetas que faltan, y al final los metadatos desfasados. Si no hay nada, dilo en una línea.
