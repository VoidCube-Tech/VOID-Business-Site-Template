import React, { useState } from 'react';

interface MetricItem {
  readonly title: string;
  readonly subtitle: string;
  readonly detail: string;
}

interface EntityScenario {
  readonly id: 'single' | 'multi' | 'holding';
  readonly label: string;
  readonly metrics: readonly MetricItem[];
}

const SCENARIOS: readonly EntityScenario[] = [
  {
    id: 'single',
    label: '1 a 3 CNPJs',
    metrics: [
      {
        title: '1 dia útil',
        subtitle: 'vs. 8 dias no modelo tradicional',
        detail: 'Partidas dobradas na origem de cada lançamento.',
      },
      {
        title: '< 500ms',
        subtitle: 'Latência de conciliação bancária',
        detail: 'Conexão Open Finance e baixa automática via Pix.',
      },
      {
        title: 'Zero Retificação',
        subtitle: 'Auditoria fiscal pré-emissão',
        detail: 'Validação preventiva de regras IBS, CBS e SPED.',
      },
      {
        title: 'Visão D+90',
        subtitle: 'Liquidez contínua de caixa',
        detail: 'Projeção consolidada de recebíveis e pagamentos.',
      },
    ],
  },
  {
    id: 'multi',
    label: '4 a 10 CNPJs',
    metrics: [
      {
        title: '2 dias úteis',
        subtitle: 'vs. 14 dias no modelo tradicional',
        detail: 'Consolidação instantânea de filiais e centros de custo.',
      },
      {
        title: 'Rateio Automático',
        subtitle: 'Por filial e centro de resultado',
        detail: 'Distribuição contábil com base em critérios auditáveis.',
      },
      {
        title: 'Conformidade Fiscal',
        subtitle: 'Regime multiestado integrado',
        detail: 'Apuração unificada de ICMS, IPI, IBS e CBS.',
      },
      {
        title: 'Caixa Centralizado',
        subtitle: 'Visibilidade de saldos do grupo',
        detail: 'Gestão integrada de contas e liquidez entre filiais.',
      },
    ],
  },
  {
    id: 'holding',
    label: '11+ CNPJs',
    metrics: [
      {
        title: '3 dias úteis',
        subtitle: 'vs. 20 dias no modelo tradicional',
        detail: 'Fechamento societário completo da holding.',
      },
      {
        title: 'Intercompany',
        subtitle: 'Eliminação contábil de mútuos',
        detail: 'Operações entre controladas neutralizadas na DRE.',
      },
      {
        title: 'Governança Total',
        subtitle: 'Trilha auditável por transação',
        detail: 'Assinaturas determinísticas prontas para auditorias.',
      },
      {
        title: 'Cenários Estratégicos',
        subtitle: 'Modelagem para o conselho',
        detail: 'Simulação de exposição financeira e alocação de capital.',
      },
    ],
  },
] as const;

export default function InteractiveClosingSimulator() {
  const [selectedId, setSelectedId] = useState<EntityScenario['id']>('multi');
  const current = SCENARIOS.find((item) => item.id === selectedId) ?? SCENARIOS[1];

  return (
    <div id="interactive-closing-simulator" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
        {/* Coluna Esquerda (4/12): Título Estático + Seletor Minimalista */}
        <div className="lg:col-span-4 min-w-0">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-on-surface min-w-0 break-words">
            Impacto
          </h2>
          <p className="mt-3 max-w-sm text-sm sm:text-base leading-relaxed text-on-surface-variant min-w-0 break-words">
            Selecione o porte societário para comparar o ciclo de fechamento e liquidez.
          </p>

          <div
            role="radiogroup"
            aria-label="Porte Societário"
            className="mt-6 flex flex-wrap gap-2"
          >
            {SCENARIOS.map((scenario) => {
              const isActive = scenario.id === selectedId;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSelectedId(scenario.id)}
                  className={[
                    'rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer',
                    isActive
                      ? 'border-on-surface bg-on-surface text-background'
                      : 'border-outline-variant bg-transparent text-on-surface-variant hover:border-outline hover:text-on-surface',
                  ].join(' ')}
                >
                  {scenario.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita (8/12): Grid 2x2 com Texto Reduzido e Direto */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-10 sm:gap-y-14 min-w-0">
          {current.metrics.map((metric) => (
            <article key={metric.title} className="min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-on-surface min-w-0 break-words">
                {metric.title}
              </h3>
              <p className="mt-1 font-display text-sm text-on-surface-variant min-w-0 break-words">
                {metric.subtitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant min-w-0 break-words">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
