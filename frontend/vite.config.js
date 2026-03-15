import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          // Cache public map tiles for offline use
          {
            urlPattern: /^https:\/\/(?:[abc]\.)?tile\.openstreetmap\.org\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'map-tiles', expiration: { maxEntries: 500, maxAgeSeconds: 24 * 60 * 60 } },
          },
          // Cache Cesium static assets used by the globe.
          {
            urlPattern: /^\/cesium\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'cesium-assets', expiration: { maxEntries: 500, maxAgeSeconds: 7 * 24 * 60 * 60 } },
          },
          // Cache backend API responses for offline fallback.
          {
            urlPattern: /\/api\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'api-cache', expiration: { maxEntries: 120, maxAgeSeconds: 2 * 60 * 60 } },
          },
        ],
      },
      manifest: {
        name: 'Orion Aurora Platform',
        short_name: 'Aurora',
        description: 'Hyper-local aurora forecasting for astrophotographers',
        theme_color: '#0a0f1e',
        background_color: '#0a0f1e',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
});
