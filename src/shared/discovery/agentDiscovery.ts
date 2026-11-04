import { engagementPlans, solutionModules } from '../catalog/commercialDependencies.ts';
import { BRAND } from '../brand/brand.ts';

export interface ArdEntry {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly contentType: 'text/html' | 'text/plain';
  readonly protocol: 'webmcp-declarative' | 'http-get';
}

export interface ArdManifest {
  readonly '@context': 'https://agenticresourcediscovery.org/ns/v1';
  readonly name: string;
  readonly description: string;
  readonly documentationUrl: string;
  readonly entries: readonly ArdEntry[];
}

export function buildLlmsTxt(siteOrigin = 'https://periphelion.app'): string {
  const base = siteOrigin.replace(/\/$/, '');
  const solutionsList = solutionModules
    .map((s) => `- **${s.title}** (${s.eyebrow}): ${s.description}`)
    .join('\n');
  const plansList = engagementPlans
    .map((p) => `- **${p.name}** (${p.engagementModelValue}): ${p.description} — Status: ${p.pricingStatusLabel}`)
    .join('\n');

  return [
    `# ${BRAND.name} — ${BRAND.tagline}`,
    '',
    `> Plataforma de gestão empresarial e inteligência financeira concebida para alta performance e precisão operacional. Desenvolvida com arquitetura modular, sistema de cores OKLCH e Agent Discovery nativo.`,
    '',
    '## Páginas Principais',
    `- [Início — Visão Geral Executiva](${base}/)`,
    `- [Produtos — Catálogo de Módulos ERP](${base}/produtos)`,
    `- [Sobre — Manifesto, Metodologia e Governança](${base}/sobre)`,
    `- [Contato — Demonstração Executiva & Escopo Modular](${base}/contato)`,
    '',
    '## Módulos do Periphelion ERP',
    solutionsList,
    '',
    '## Modalidades de Implantação',
    plansList,
    '',
    '## Descoberta Agêntica (WebMCP & ARD)',
    `- Manifesto ARD: ${base}/.well-known/ard.json`,
    '- Formulário declarativo WebMCP (`toolname="submit_enterprise_diagnosis_request"`) disponível na seção de Contato e no modal de diagnóstico.',
  ].join('\n');
}

export function buildArdManifest(siteOrigin = 'https://periphelion.app'): ArdManifest {
  const base = siteOrigin.replace(/\/$/, '');
  return {
    '@context': 'https://agenticresourcediscovery.org/ns/v1',
    name: `${BRAND.name} — Plataforma de Gestão ERP`,
    description:
      'Plataforma ERP corporativa com catálogo modular de soluções (Gestão Financeira, Compliance Fiscal, Suprimentos, Vendas e IA Preditiva) e configuração de escopo.',
    documentationUrl: `${base}/llms.txt`,
    entries: [
      {
        id: `${base}/#submit_enterprise_diagnosis_request`,
        name: 'Solicitar Demonstração & Diagnóstico ERP',
        description:
          'Formulário HTML declarativo compatível com WebMCP para selecionar módulos de gestão e preparar solicitação de proposta.',
        url: `${base}/contato`,
        contentType: 'text/html',
        protocol: 'webmcp-declarative',
      },
      {
        id: `${base}/produtos`,
        name: 'Catálogo de Módulos ERP',
        description: 'Módulos de Gestão Financeira, Compliance Fiscal, Suprimentos, Vendas e Inteligência Preditiva.',
        url: `${base}/produtos`,
        contentType: 'text/html',
        protocol: 'http-get',
      },
    ],
  };
}
