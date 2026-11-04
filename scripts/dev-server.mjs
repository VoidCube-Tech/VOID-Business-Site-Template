import devServer from '../node_modules/astro/dist/core/dev/index.js';

try {
  const server = await devServer({
    server: {
      port: 4321,
      host: '127.0.0.1',
    },
  });
  console.log(`[PERIPHELION-DEV] Dev server running on http://127.0.0.1:4321`);
} catch (err) {
  console.error('[PERIPHELION-DEV-ERROR]', err);
  process.exit(1);
}
