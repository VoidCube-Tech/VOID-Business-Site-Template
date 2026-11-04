// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const { PUBLIC_SITE_URL } = loadEnv(
  process.env.NODE_ENV ?? 'production',
  process.cwd(),
  'PUBLIC_'
);

export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  site: PUBLIC_SITE_URL || 'https://periphelion.app',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
