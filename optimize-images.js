import sharp from 'sharp';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');

const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

function chooseWidthFor(filePath) {
  const p = filePath.replaceAll('\\', '/');
  if (p.includes('/instalaciones/') && p.match(/foto-|cancha|pool|piscina|tenis|padel/)) return 1200;
  if (p.includes('hero') || p.includes('/hero-')) return 1920;
  if (p.includes('/merchandising/')) return 1000;
  if (p.includes('/actividades/')) return 800;
  if (p.includes('/icons/') || p.includes('/actividades/')) return 500;
  return 1200;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(res));
    } else {
      files.push(res);
    }
  }
  return files;
}

async function optimizeFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!SUPPORTED_EXT.includes(ext)) return null;
  if (ext === '.webp') return null; // already optimized

  const relative = path.relative(ROOT, file);
  const width = chooseWidthFor(relative);
  const quality = 80;

  const outPath = file.replace(ext, '.webp');

  try {
    // Skip if output exists and is newer than source
    if (existsSync(outPath)) {
      const [sStat, oStat] = await Promise.all([fs.stat(file), fs.stat(outPath)]);
      if (oStat.mtimeMs >= sStat.mtimeMs) {
        return { file: relative, skipped: true };
      }
    }

    const buffer = await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    await fs.writeFile(outPath, buffer);

    const origSize = (await fs.stat(file)).size;
    const newSize = buffer.length;
    const reduction = ((origSize - newSize) / origSize * 100).toFixed(1);

    return { file: relative, origSize, newSize, reduction };
  } catch (err) {
    return { file: relative, error: err.message };
  }
}

async function main() {
  console.log('🚀 Buscando imágenes en', ASSETS_DIR);
  const files = await walk(ASSETS_DIR);
  const imageFiles = files.filter(f => {
    const e = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(e);
  });

  console.log(`Encontradas ${imageFiles.length} imágenes a procesar.`);

  const results = [];
  for (const file of imageFiles) {
    process.stdout.write(`Optimizing ${path.relative(ROOT, file)}... `);
    // eslint-disable-next-line no-await-in-loop
    const res = await optimizeFile(file);
    if (!res) {
      console.log('skipped');
      continue;
    }
    if (res.error) console.log(`❌ ${res.error}`);
    else if (res.skipped) console.log('already up-to-date');
    else console.log(`✅ ${(res.origSize/1024).toFixed(0)}KB → ${(res.newSize/1024).toFixed(0)}KB (-${res.reduction}%)`);
    results.push(res);
  }

  console.log('\n✨ Optimización completada! Resumen:');
  const success = results.filter(r => !r.error && !r.skipped).length;
  const skipped = results.filter(r => r && r.skipped).length;
  const failed = results.filter(r => r && r.error).length;
  console.log(`  - Optimizadas: ${success}`);
  console.log(`  - Omitidas (up-to-date): ${skipped}`);
  console.log(`  - Errores: ${failed}`);
}

main().catch(err => {
  console.error('Fatal:', err);
});
