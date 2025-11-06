import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import fs from 'fs';
import { componentTagger } from 'lovable-tagger';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Detect local dev HTTPS certs (generate with mkcert into ./certs)
  const certDir = path.resolve(__dirname, 'certs');
  let httpsConfig: { key: Buffer; cert: Buffer } | undefined;

  try {
    const certPath = path.join(certDir, 'localhost.pem');
    const keyPath = path.join(certDir, 'localhost-key.pem');
    if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
      httpsConfig = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(keyPath.replace('.pem', '-key.pem')),
      };
      console.log('Using local HTTPS certs from', certDir);
    }
  } catch (e) {
    const msg = e && (e as Error).message ? (e as Error).message : String(e);
    console.warn('Could not load local HTTPS certs:', msg);
  }

  return {
    server: {
      host: '::',
      port: 8080,
      ...(httpsConfig ? { https: httpsConfig } : {}),
    },

    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      // PWA with Service Worker for caching
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,webp,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        manifest: {
          name: 'Club La Victoria',
          short_name: 'La Victoria',
          description: 'Club de Cazadores La Victoria - Entidad deportiva y social desde 1944',
          theme_color: '#16a34a',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/logo.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/logo.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),

      // Compression plugin for gzip and brotli in production
      mode === 'production' &&
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
          threshold: 10240,
          deleteOriginFile: false,
        }),

      mode === 'production' &&
        viteCompression({
          algorithm: 'brotliCompress',
          ext: '.br',
          threshold: 10240,
          deleteOriginFile: false,
        }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-slot'],
            'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
            carousel: ['embla-carousel-react', 'embla-carousel-autoplay'],
            icons: ['lucide-react', 'react-icons'],
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      minify: 'esbuild',
      chunkSizeWarningLimit: 500,
      sourcemap: false,
      cssMinify: true,
      reportCompressedSize: true,
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      esbuildOptions: {
        target: 'es2020',
      },
    },

    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      treeShaking: true,
    },
  };
});
