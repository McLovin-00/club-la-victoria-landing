import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesToOptimize = [
  { input: 'src/assets/hero-bg4.jpg', output: 'src/assets/hero-bg4.webp', width: 1920, quality: 80 },
  { input: 'src/assets/hero-bg.jpg', output: 'src/assets/hero-bg.webp', width: 1920, quality: 80 },
  { input: 'src/assets/mascota.png', output: 'src/assets/mascota.webp', width: 800, quality: 85 },
  { input: 'src/assets/tennis.jpg', output: 'src/assets/tennis.webp', width: 1200, quality: 80 },
  { input: 'src/assets/padel.jpg', output: 'src/assets/padel.webp', width: 1200, quality: 80 },
  { input: 'src/assets/pool.jpg', output: 'src/assets/pool.webp', width: 1200, quality: 80 },
  { input: 'src/assets/gym.jpg', output: 'src/assets/gym.webp', width: 1200, quality: 80 },
  { input: 'src/assets/merchandising/conjunto-blanco.png', output: 'src/assets/merchandising/conjunto-blanco.webp', width: 800, quality: 85 },
  { input: 'src/assets/merchandising/remera-negra.png', output: 'src/assets/merchandising/remera-negra.webp', width: 800, quality: 85 },
  { input: 'src/assets/merchandising/foto-gorras-1.jpg', output: 'src/assets/merchandising/foto-gorras-1.webp', width: 1000, quality: 80 },
  { input: 'src/assets/merchandising/foto-gorras-2.jpg', output: 'src/assets/merchandising/foto-gorras-2.webp', width: 1000, quality: 80 },
  // Newly added high-size assets to optimize
  { input: 'src/assets/logo-lobo.png', output: 'src/assets/logo-lobo.webp', width: 800, quality: 80 },
  { input: 'src/assets/merchandising/foto-gorras-3.png', output: 'src/assets/merchandising/foto-gorras-3.webp', width: 1000, quality: 80 },
  { input: 'src/assets/merchandising/foto-gorras-4.png', output: 'src/assets/merchandising/foto-gorras-4.webp', width: 1000, quality: 80 },
  { input: 'src/assets/merchandising/gorra-1.png', output: 'src/assets/merchandising/gorra-1.webp', width: 800, quality: 85 },
  { input: 'src/assets/merchandising/Gorras.jpeg', output: 'src/assets/merchandising/Gorras.webp', width: 1000, quality: 80 },
];

async function optimizeImage(config) {
  const inputPath = path.join(__dirname, config.input);
  const outputPath = path.join(__dirname, config.output);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${config.input} (file not found)`);
    return;
  }

  try {
    const info = await sharp(inputPath)
      .resize(config.width, null, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: config.quality })
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = info.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${config.input}`);
    console.log(`   ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (-${reduction}%)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${config.input}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Optimizando imágenes...\n');
  
  for (const config of imagesToOptimize) {
    await optimizeImage(config);
  }
  
  console.log('\n✨ Optimización completada!');
}

main();
