import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config';

// Makes every PWA icon from one picture: npm run generate-pwa-assets
export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: minimal2023Preset,
  images: ['public/logo.svg'],
});
