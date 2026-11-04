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

// Plugin Vite para aplicar ciclos de vida eficientes de cache em ativos estáticos e imagens otimizadas
function periphelionCacheHeadersPlugin() {
  const applyHeaders = (middlewares) => {
    middlewares.use((req, res, next) => {
      const url = req.url || '';
      if (
        url.includes('/images/front/') ||
        url.includes('/_astro/') ||
        url.endsWith('/favicon.svg')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      next();
    });
  };

  return {
    name: 'periphelion-cache-headers',
    configureServer(server) {
      applyHeaders(server.middlewares);
    },
    configurePreviewServer(server) {
      applyHeaders(server.middlewares);
    },
  };
}

export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  site,
  base,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), periphelionCacheHeadersPlugin()],
  },
});
