# Ionic PWA

A basic Ionic React app (tabs starter) that is also a **PWA**: it can be installed like a phone app and it still opens with no internet.

## Run it

```bash
npm install
npm run dev
```

To test the PWA part, use a build (the service worker only runs there):

```bash
npm run build
npm run preview
```

Open the address it shows (`http://localhost:4173`). In Chrome or Edge, an **Install** icon appears at the right end of the address bar.

## How this app was made a PWA (5 steps)

You can do the same to any Ionic React app made with `ionic start ... --type=react`.

### 1. Install the plugin and the icon maker

```bash
npm install -D vite-plugin-pwa @vite-pwa/assets-generator
```

### 2. Make the icons from one picture

Put your logo in `public/logo.svg` (this app has a simple blue one). Create `pwa-assets.config.ts` next to `package.json`:

```ts
import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: minimal2023Preset,
  images: ['public/logo.svg'],
});
```

Add this line to `"scripts"` in `package.json`, then run it:

```json
"generate-pwa-assets": "pwa-assets-generator"
```

```bash
npm run generate-pwa-assets
```

It writes `favicon.ico`, `apple-touch-icon-180x180.png`, `pwa-64x64.png`, `pwa-192x192.png`, `pwa-512x512.png` and `maskable-icon-512x512.png` into `public/`.

### 3. Add the plugin to `vite.config.ts`

```ts
import { VitePWA } from 'vite-plugin-pwa';

// inside plugins: [ ... ]
VitePWA({
  registerType: 'autoUpdate',
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
```

### 4. Clean up `index.html` and `public/`

- Delete `public/manifest.json` and the `<link rel="manifest" href="/manifest.json" />` line. The plugin makes a new manifest and adds its link when you build.
- Add these lines in `<head>`:

```html
<meta name="theme-color" content="#3880ff" />
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" href="/logo.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
```

### 5. Build and check

```bash
npm run build
npm run preview
```

The build prints `PWA v2.0.0 ... files generated dist/sw.js`. Then, in Chrome or Edge:

1. Open the preview address, press **F12**, and go to **Application**.
2. **Manifest** shows the name *Ionic PWA* and the icons.
3. **Service workers** shows `sw.js` as *activated and running*.
4. In **Network**, choose **Offline** and reload: the app still opens.
5. Click the **Install** icon in the address bar to install it like an app.

A PWA needs **HTTPS** to install, except on `localhost`. A GitHub Codespace address or GitHub Pages both use HTTPS.
