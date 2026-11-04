import React from 'react';
import { PHOTO_ARCHIVE_TEXTURE_SET } from '../../../shared/media/frontImages';

interface ComparisonRow {
  readonly criterion: string;
  readonly periphelion: boolean;
  readonly traditionalErp: boolean;
  readonly fragmentedTools: boolean;
}

const COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    criterion: 'Partidas dobradas e razão contábil em tempo real',
    periphelion: true,
    traditionalErp: false,
    fragmentedTools: false,
  },
  {
    criterion: 'Motor tributário nativo para IBS / CBS (Reforma Tributária)',
    periphelion: true,
    traditionalErp: true,
    fragmentedTools: false,
  },
  {
    criterion: 'Conciliação bancária automática via Open Finance e Pix',
    periphelion: true,
    traditionalErp: false,
    fragmentedTools: false,
  },
  {
    criterion: 'Consolidação multiempresa sem exportar planilhas',
    periphelion: true,
    traditionalErp: false,
    fragmentedTools: false,
  },
  {
    criterion: 'Implantação modular assistida sem parar a operação',
    periphelion: true,
    traditionalErp: false,
    fragmentedTools: true,
  },
  {
    criterion: 'Trilha de auditoria imutável por transação (SHA-256)',
    periphelion: true,
    traditionalErp: true,
    fragmentedTools: false,
  },
] as const;

export default function InteractiveArchitectureBlueprint() {
  return (
    <div id="interactive-architecture-blueprint" className="w-full">
      <div className="mb-10 max-w-3xl min-w-0">
        <h2 className="headline-bicolor text-2xl sm:text-3xl lg:text-4xl min-w-0 break-words">
          <span className="headline-bicolor-primary">Superioridade arquitetônica comprovada.</span>
          <span className="headline-bicolor-secondary">Comparativo direto contra sistemas legados.</span>
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-outline-variant">
        <picture className="contents">
          <source media="(max-width: 767px)" srcSet={PHOTO_ARCHIVE_TEXTURE_SET.mobileAvif} type="image/avif" />
          <source media="(max-width: 767px)" srcSet={PHOTO_ARCHIVE_TEXTURE_SET.mobileWebp} type="image/webp" />
          <source media="(min-width: 768px)" srcSet={PHOTO_ARCHIVE_TEXTURE_SET.avif} type="image/avif" />
          <source media="(min-width: 768px)" srcSet={PHOTO_ARCHIVE_TEXTURE_SET.webp} type="image/webp" />
          <img
            src={PHOTO_ARCHIVE_TEXTURE_SET.src}
            alt=""
            width={1280}
            height={853}
            aria-hidden="true"
            loading="lazy"
            fetchpriority="low"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-25"
          />
        </picture>

        <div className="smoked-comparison-surface relative z-10 overflow-x-auto p-3 sm:p-6">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="py-4 pr-4 pl-2 text-xs sm:text-sm font-semibold text-on-surface w-[43%]">
                  Critério de Engenharia
                </th>
                <th className="smoked-comparison-highlight rounded-t-md py-4 px-4 text-center text-xs sm:text-sm font-semibold text-on-surface w-[19%]">
                  Periphelion
                </th>
                <th className="py-4 px-4 text-center text-xs sm:text-sm font-semibold text-on-surface/85 w-[19%]">
                  ERPs Tradicionais
                </th>
                <th className="py-4 px-4 text-center text-xs sm:text-sm font-semibold text-on-surface/85 w-[19%]">
                  Planilhas &amp; Isolados
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {COMPARISON_ROWS.map((row, idx) => {
                const isLast = idx === COMPARISON_ROWS.length - 1;
                return (
                  <tr key={row.criterion}>
                    <td className="py-4 pr-4 pl-2 text-xs sm:text-sm font-medium text-on-surface min-w-0 break-words">
                      {row.criterion}
                    </td>
                    <td
                      className={[
                        'smoked-comparison-highlight py-4 px-4 text-center text-sm font-semibold text-on-surface',
                        isLast ? 'rounded-b-md' : '',
                      ].join(' ')}
                    >
                      <span aria-label="Atendido">✓</span>
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-on-surface-variant">
                      {row.traditionalErp ? (
                        <span className="text-on-surface" aria-label="Atendido">✓</span>
                      ) : (
                        <span aria-label="Não atendido">×</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-on-surface-variant">
                      {row.fragmentedTools ? (
                        <span className="text-on-surface" aria-label="Atendido">✓</span>
                      ) : (
                        <span aria-label="Não atendido">×</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
