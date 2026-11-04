export type CommercialDependencyId = 'COM-01' | 'COM-02' | 'COM-03' | 'COM-04' | 'COM-05' | 'COM-06';

export interface CommercialDependency {
  readonly id: CommercialDependencyId;
  readonly title: string;
  readonly owner: 'Comercial' | 'Marketing' | 'Comercial / Financeiro' | 'Comercial / Atendimento';
  readonly status: 'pending_commercial';
  readonly placeholderNote: string;
}

export interface SolutionModule {
  readonly id:
    | 'gestao-financeira'
    | 'compliance-fiscal'
    | 'suprimentos-estoque'
    | 'vendas-faturamento'
    | 'inteligencia-preditiva';
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly featured?: boolean;
  readonly badge?: string;
  readonly icon:
    | 'account_balance'
    | 'receipt_long'
    | 'inventory_2'
    | 'shopping_cart'
    | 'trending_up';
  readonly highlights: readonly string[];
  readonly ctaLabel: string;
  readonly commercialDependencyId: CommercialDependencyId;
}

export interface EngagementPlan {
  readonly id:
    | 'orbita'
    | 'apogeu'
    | 'constelacao';
  readonly name: string;
  readonly description: string;
  readonly engagementModelLabel: string;
  readonly engagementModelValue: string;
  readonly pricingStatusLabel: string;
  readonly featured?: boolean;
  readonly badge?: string;
  readonly features: readonly string[];
  readonly ctaLabel: string;
  readonly commercialDependencyId: CommercialDependencyId;
}

export const commercialDependencies: Readonly<Record<CommercialDependencyId, CommercialDependency>> = {
  'COM-01': {
    id: 'COM-01',
    title: 'Catálogo Oficial de Módulos ERP Periphelion',
    owner: 'Comercial',
    status: 'pending_commercial',
    placeholderNote: 'Catálogo demonstrativo de módulos de gestão financeira e operacional aguardando homologação comercial.',
  },
  'COM-02': {
    id: 'COM-02',
    title: 'Posicionamento & Copy Institucional Oficial Periphelion',
    owner: 'Marketing',
    status: 'pending_commercial',
    placeholderNote: 'Posicionamento executivo demonstrativo Periphelion sujeito à customização da diretoria comercial.',
  },
  'COM-03': {
    id: 'COM-03',
    title: 'Estrutura de Planos ERP (Órbita, Apogeu, Constelação)',
    owner: 'Comercial',
    status: 'pending_commercial',
    placeholderNote: 'Divisão em 3 planos modulares sinalizada como placeholder estrutural.',
  },
  'COM-04': {
    id: 'COM-04',
    title: 'Tabela de Assinatura & Implantação ERP',
    owner: 'Comercial / Financeiro',
    status: 'pending_commercial',
    placeholderNote: 'Valores sob consulta executiva — nenhum preço fechado é exibido sem aprovação da tabela comercial.',
  },
  'COM-05': {
    id: 'COM-05',
    title: 'Política de Módulos Adicionais e Escalonamento',
    owner: 'Comercial',
    status: 'pending_commercial',
    placeholderNote: 'Condições especiais para contratação combinada de módulos aguardando regra comercial.',
  },
  'COM-06': {
    id: 'COM-06',
    title: 'Canal Oficial de Demonstração e Diagnóstico ERP',
    owner: 'Comercial / Atendimento',
    status: 'pending_commercial',
    placeholderNote: 'Fluxo de diagnóstico direcionado para canal consultivo de demonstração.',
  },
};

export const solutionModules: readonly SolutionModule[] = [
  {
    id: 'gestao-financeira',
    eyebrow: 'Fluxo & Tesouraria',
    title: 'Gestão Financeira & Tesouraria',
    description:
      'Conciliação bancária em tempo real, fluxo de caixa projetado e liquidação instantânea via Open Finance.',
    featured: true,
    badge: 'Núcleo Central',
    icon: 'account_balance',
    highlights: [
      'Conciliação Open Finance e OFX',
      'Projeção de liquidez multimoeda',
      'Rateio automático por centro de custo',
    ],
    ctaLabel: 'Conhecer Gestão Financeira',
    commercialDependencyId: 'COM-01',
  },
  {
    id: 'compliance-fiscal',
    eyebrow: 'Conformidade & Reforma Tributária',
    title: 'Compliance Fiscal & Tributário',
    description:
      'Motor fiscal parametrizado para SPED, transição IBS/CBS da Reforma Tributária e emissão contínua de notas.',
    icon: 'receipt_long',
    highlights: [
      'Transição nativa para IBS e CBS',
      'Emissão assíncrona NF-e, NFS-e e MDF-e',
      'Auditoria preventiva do SPED Fiscal',
    ],
    ctaLabel: 'Ver Motor Fiscal',
    commercialDependencyId: 'COM-01',
  },
  {
    id: 'suprimentos-estoque',
    eyebrow: 'Logística & Suprimentos',
    title: 'Suprimentos, Estoque & Compras',
    description:
      'Rastreabilidade multigalpão, reposição automática por demanda e cotação integrada com fornecedores.',
    icon: 'inventory_2',
    highlights: [
      'Controle de múltiplos CDs, lotes e séries',
      'Cotações e compras automatizadas',
      'Reposição orientada ao giro real',
    ],
    ctaLabel: 'Explorar Suprimentos',
    commercialDependencyId: 'COM-01',
  },
  {
    id: 'vendas-faturamento',
    eyebrow: 'Comercial & Faturamento',
    title: 'Vendas, CRM & Faturamento',
    description:
      'Gestão ágil de propostas, tabelas dinâmicas de preço, alçadas de crédito e faturamento sem atrito.',
    icon: 'shopping_cart',
    highlights: [
      'Tabelas dinâmicas por canal e região',
      'Aprovação automática de limite e crédito',
      'Integração nativa com B2B e e-commerce',
    ],
    ctaLabel: 'Ver Módulo de Vendas',
    commercialDependencyId: 'COM-01',
  },
  {
    id: 'inteligencia-preditiva',
    eyebrow: 'Gestão Estratégica',
    title: 'Controladoria & Análise Estratégica',
    description:
      'Painéis consolidados para acompanhamento contínuo de liquidez, simulação de cenários financeiros e governança para a diretoria.',
    icon: 'trending_up',
    highlights: [
      'Modelagem de liquidez e capital de giro',
      'Simulação de cenários orçamentários',
      'Painéis executivos para diretoria e conselho',
    ],
    ctaLabel: 'Ver Controladoria',
    commercialDependencyId: 'COM-01',
  },
];

export const engagementPlans: readonly EngagementPlan[] = [
  {
    id: 'orbita',
    name: 'Órbita',
    description:
      'Controle financeiro, conformidade fiscal e faturamento ágil para empresas em expansão.',
    engagementModelLabel: 'Modelo de Implantação',
    engagementModelValue: 'SaaS Gerenciado & Setup Ágil',
    pricingStatusLabel: 'Valor sob consulta executiva',
    features: [
      'Núcleo Financeiro e Fiscal ativo',
      'Conciliação Open Finance e NF-e',
      'Migração assistida e treinamento',
      'Suporte corporativo com SLA',
    ],
    ctaLabel: 'Consultar Plano Órbita',
    commercialDependencyId: 'COM-03',
  },
  {
    id: 'apogeu',
    name: 'Apogeu',
    description:
      'ERP completo para operações multifiliais, estoque avançado e inteligência preditiva integrada.',
    engagementModelLabel: 'Modelo de Implantação',
    engagementModelValue: 'Implantação Assistida & Sustentação',
    pricingStatusLabel: 'Valor sob consulta executiva',
    featured: true,
    badge: 'Mais Escolhido',
    features: [
      'Todos os 5 módulos integrados',
      'Multiempresa e múltiplos centros de custo',
      'APIs e webhooks em tempo real',
      'Gerente de conta e SLA prioritário',
    ],
    ctaLabel: 'Solicitar Proposta Apogeu',
    commercialDependencyId: 'COM-04',
  },
  {
    id: 'constelacao',
    name: 'Constelação',
    description:
      'Arquitetura dedicada para grupos corporativos com alta volumetria e regras sob medida.',
    engagementModelLabel: 'Modelo de Implantação',
    engagementModelValue: 'Arquitetura Sob Medida & Squad Dedicada',
    pricingStatusLabel: 'Escopo sob medida',
    features: [
      'Nuvem dedicada com isolamento lógico',
      'Regras tributárias customizadas',
      'Auditoria contínua de governança',
      'Engenharia 24/7 e Arquiteto dedicado',
    ],
    ctaLabel: 'Falar com Consultor Constelação',
    commercialDependencyId: 'COM-04',
  },
];
