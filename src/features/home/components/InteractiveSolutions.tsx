import React from 'react';
import { PHOTO_NIGHT_GRID_SET } from '../../../shared/media/frontImages';

export default function InteractiveSolutions() {
  return (
    <div id="interactive-solutions-widget" className="w-full">
      {/* Quadro com Imagem ao Fundo: Metade Esquerda Nítida em Destaque, Metade Direita Desfocada com o Texto */}
      <div className="split-photo-stage min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-end md:items-center">
        <picture className="contents">
          <source media="(max-width: 767px)" srcSet={PHOTO_NIGHT_GRID_SET.mobileAvif} type="image/avif" />
          <source media="(max-width: 767px)" srcSet={PHOTO_NIGHT_GRID_SET.mobileWebp} type="image/webp" />
          <source media="(min-width: 768px)" srcSet={PHOTO_NIGHT_GRID_SET.avif} type="image/avif" />
          <source media="(min-width: 768px)" srcSet={PHOTO_NIGHT_GRID_SET.webp} type="image/webp" />
          <img
            src={PHOTO_NIGHT_GRID_SET.src}
            alt="Fachada corporativa iluminada representando operação financeira contínua."
            loading="eager"
            decoding="async"
            className="split-photo-sharp object-center"
          />
        </picture>

        {/* Lente de Desfoque na Metade Direita (Desktop) / Inferior (Mobile) */}
        <div className="split-lens-right" aria-hidden="true" />

        <div className="relative z-10 w-full p-6 sm:p-12 lg:p-16">
          <div className="w-full md:max-w-[52%] lg:max-w-[48%] md:ml-auto min-w-0">
            <h3 className="headline-bicolor text-2xl sm:text-3xl lg:text-4xl min-w-0 break-words">
              <span className="headline-bicolor-primary">Conciliação bancária contínua.</span>
              <span className="headline-bicolor-secondary">Liquidez em tempo real via Open Finance.</span>
            </h3>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-on-surface-variant min-w-0 break-words">
              Reconcilie extratos automaticamente, liquide recebíveis via Pix e consolide o caixa multiempresa sem planilhas intermediárias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
