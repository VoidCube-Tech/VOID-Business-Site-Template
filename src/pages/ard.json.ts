import type { APIRoute } from 'astro';
import { buildArdManifest } from '../shared/discovery/agentDiscovery.ts';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? site.origin : 'https://periphelion.app';
  return new Response(JSON.stringify(buildArdManifest(baseUrl), null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
