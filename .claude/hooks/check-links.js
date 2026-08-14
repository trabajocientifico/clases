/* Hook PostToolUse (Write|Edit): tras editar un .html, comprueba que sus enlaces
   locales apunten a archivos que existen. Un href roto es un 404 en GitHub Pages.
   Sin dependencias: solo node. */
const fs = require('fs');
const path = require('path');

let raw = '';
process.stdin.on('data', c => (raw += c));
process.stdin.on('end', () => {
  let file;
  try {
    const payload = JSON.parse(raw);
    file =
      (payload.tool_input && payload.tool_input.file_path) ||
      (payload.tool_response && payload.tool_response.filePath);
  } catch {
    return;
  }
  if (!file || !/\.html$/i.test(file) || !fs.existsSync(file)) return;

  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const externo = /^(https?:|\/\/|#|mailto:|tel:|javascript:|data:)/i;
  const rotos = [];
  const vistos = new Set();

  for (const m of html.matchAll(/(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const href = (m[1] ?? m[2] ?? '').trim();
    if (!href || externo.test(href) || vistos.has(href)) continue;
    vistos.add(href);
    const destino = decodeURIComponent(href.split('#')[0].split('?')[0]);
    if (!destino) continue;
    if (!fs.existsSync(path.resolve(dir, destino))) rotos.push(href);
  }

  if (!rotos.length) return;
  const rel = path.relative(process.cwd(), file) || file;
  const aviso =
    `Enlaces locales rotos en ${rel}: ${rotos.join(', ')}. ` +
    `Cada uno es un 404 en GitHub Pages; corrige la ruta o crea el archivo.`;
  process.stdout.write(
    JSON.stringify({
      systemMessage: aviso,
      hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: aviso },
    })
  );
});
