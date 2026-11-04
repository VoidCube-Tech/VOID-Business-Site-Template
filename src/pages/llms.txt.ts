import type { APIRoute } from 'astro';
import { buildLlmsTxt } from '../shared/discovery/agentDiscovery.ts';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? site.origin : 'https://periphelion.app';
  return new Response(buildLlmsTxt(baseUrl), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
