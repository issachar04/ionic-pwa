import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    // Turns the app into a PWA: writes the manifest and the service worker on build
    VitePWA({
      // Install new versions of the app automatically
      registerType: 'autoUpdate',
      // Files in public/ that the service worker keeps for offline use
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Ionic PWA',
        short_name: 'IonicPWA',
        description: 'A basic Ionic React app that installs like a phone app',
        theme_color: '#3880ff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Playwright e2e specs live in e2e/.
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
