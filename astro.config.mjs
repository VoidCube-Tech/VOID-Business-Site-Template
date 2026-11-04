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

// Suporte automático para GitHub Pages e Domínios Personalizados
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const site = PUBLIC_SITE_URL || (isGitHubPages ? 'https://voidcube-tech.github.io' : 'https://periphelion.app');
const base = PUBLIC_SITE_URL ? '/' : (isGitHubPages ? '/VOID-Business-Site-Template' : '/');

export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  site,
  base,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
