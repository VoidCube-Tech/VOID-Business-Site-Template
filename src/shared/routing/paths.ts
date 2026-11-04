/**
 * Resolução dinâmica de URLs e caminhos base para GitHub Pages e Domínios Customizados.
 *
 * Em produção no GitHub Pages:
 * import.meta.env.BASE_URL = '/VOID-Business-Site-Template/'
 *
 * Em desenvolvimento ou com domínio próprio:
 * import.meta.env.BASE_URL = '/'
 */
export function withBase(path: string): string {
  const base =
    typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
      ? import.meta.env.BASE_URL.replace(/\/$/, '')
      : '';

  const clean = path.startsWith('/') ? path : `/${path}`;

  if (clean === '/') {
    return base ? `${base}/` : '/';
  }

  return `${base}${clean}`;
}
