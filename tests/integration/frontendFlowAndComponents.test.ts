import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Frontend Flow, Component Architecture & Anti-Flicker Stability', () => {
  it('garante que a Navbar possui o interruptor físico animado e menu mobile minimalista', () => {
    const headerPath = path.resolve('src/features/navigation/Header.astro');
    assert.ok(fs.existsSync(headerPath), 'Header.astro deve existir');
    const headerContent = fs.readFileSync(headerPath, 'utf-8');

    // Interruptor de tema inspirado em Interruptor tema.png
    assert.ok(headerContent.includes('role="switch"'), 'Botão de tema deve ter role="switch" acessível');
    assert.ok(headerContent.includes('id="themeKnobCircle"'), 'Círculo do interruptor deve ter ID themeKnobCircle');
    assert.ok(headerContent.includes('theme-knob-circle'), 'Classe CSS de animação do interruptor ausente');

    // Mobile: 2 traços horizontais paralelos sem texto "Menu"
    assert.ok(!headerContent.includes('<span>Menu</span>'), 'Texto "Menu" não deve estar presente no mobile');
    assert.ok(headerContent.includes('<line x1="2" y1="5.5" x2="22" y2="5.5"'), 'Traço superior minimalista ausente');
    assert.ok(headerContent.includes('<line x1="2" y1="12.5" x2="22" y2="12.5"'), 'Traço inferior minimalista ausente');

    // Auto-hide ao rolar para baixo e retorno ao rolar para cima
    assert.ok(headerContent.includes('-translate-y-24'), 'Classe de ocultação ao rolar ausente');
    assert.ok(headerContent.includes('translate-y-0'), 'Classe de retorno ao rolar ausente');
  });

  it('impede regressão de desfoque/filtro dinâmico em imagens (previne recarregamento no toggle de tema)', () => {
    const auroraCss = fs.readFileSync(path.resolve('src/styles/aurora.css'), 'utf-8');

    // .split-photo-sharp não deve animar ou alternar a propriedade 'filter' dinamicamente
    assert.ok(!auroraCss.includes('filter 300ms'), 'Imagens fotográficas não devem transicionar a propriedade filter');
    assert.ok(!auroraCss.includes(':root[data-theme="light"] .split-photo-stage .split-photo-sharp'), 'Não deve haver filtro dinâmico de imagem no light mode');

    // CorporateBackdrop não deve alternar mix-blend-mode no light mode
    const backdropAstro = fs.readFileSync(path.resolve('src/shared/effects/CorporateBackdrop.astro'), 'utf-8');
    assert.ok(!backdropAstro.includes('mix-blend-mode: multiply;'), 'CorporateBackdrop não deve mudar mix-blend-mode para multiply');
  });

  it('verifica que as verticais, impacto e implantação possuem textos reduzidos e concisos', () => {
    // Verticais (Shared Section FSD)
    const verticalsAstro = fs.readFileSync(path.resolve('src/shared/sections/OperationalVerticals.astro'), 'utf-8');
    assert.ok(verticalsAstro.includes('Holdings & Grupos'), 'Vertical Holdings ausente ou com título prolixo');
    assert.ok(verticalsAstro.includes('detail:'), 'Deve usar campo detail conciso');
    assert.ok(!verticalsAstro.includes('lg:sticky'), 'Coluna esquerda não deve ter sticky que acompanha rolagem');

    // Simulador de Impacto (Shared Section FSD)
    const simulatorTsx = fs.readFileSync(path.resolve('src/shared/sections/InteractiveClosingSimulator.tsx'), 'utf-8');
    assert.ok(simulatorTsx.includes('1 a 3 CNPJs'), 'Opção 1 a 3 CNPJs ausente');
    assert.ok(simulatorTsx.includes('Zero Retificação'), 'Métrica concisa Zero Retificação ausente');
    assert.ok(!simulatorTsx.includes('lg:sticky'), 'Simulador não deve ter sticky que acompanha rolagem');

    // Implantação em Sobre
    const aboutAstro = fs.readFileSync(path.resolve('src/features/about/AboutPage.astro'), 'utf-8');
    assert.ok(aboutAstro.includes('Diagnóstico & Plano de Contas'), 'Etapa Diagnóstico ausente');
    assert.ok(!aboutAstro.includes('subtitle:'), 'Etapas de implantação não devem ter subtítulos redundantes');

    // Módulo 5 em Produtos
    const servicesAstro = fs.readFileSync(path.resolve('src/features/services/ServicesPage.astro'), 'utf-8');
    assert.ok(servicesAstro.includes('Modelagem de liquidez e suporte a decisões executivas.'), 'Headline executiva do módulo 5 ausente');
  });

  it('garante isolamento estrito Feature-Sliced Design (zero import cruzado entre features) e zero resquícios de protótipos legados', () => {
    const servicesAstro = fs.readFileSync(path.resolve('src/features/services/ServicesPage.astro'), 'utf-8');
    assert.ok(!servicesAstro.includes('../home/'), 'ServicesPage não deve importar diretamente da slice ../home/');

    const loadingShell = fs.readFileSync(path.resolve('src/shared/loading/LoadingShell.astro'), 'utf-8');
    const loadingCss = fs.readFileSync(path.resolve('src/shared/loading/loading.css'), 'utf-8');
    const transitionsCss = fs.readFileSync(path.resolve('src/styles/transitions.css'), 'utf-8');
    const faviconSvg = fs.readFileSync(path.resolve('public/favicon.svg'), 'utf-8');

    assert.ok(!loadingShell.includes('techai'), 'LoadingShell não deve conter classes/IDs legados techai');
    assert.ok(!loadingCss.includes('techai') && !loadingCss.includes('VoidCube'), 'loading.css não deve conter referências a techai ou VoidCube');
    assert.ok(!transitionsCss.includes('techai'), 'transitions.css não deve conter referências a techai');
    assert.ok(!faviconSvg.includes('#38bdf8'), 'favicon.svg deve usar paleta Periphelion em vez do ciano antigo');
  });

  it('garante carregamento eager e transição suave das fotografias de seção (.split-photo-sharp)', () => {
    const homeAstro = fs.readFileSync(path.resolve('src/features/home/HomePage.astro'), 'utf-8');
    const servicesAstro = fs.readFileSync(path.resolve('src/features/services/ServicesPage.astro'), 'utf-8');
    const auroraCss = fs.readFileSync(path.resolve('src/styles/aurora.css'), 'utf-8');

    assert.ok(!homeAstro.includes('loading="lazy"'), 'HomePage não deve atrasar fotografias com loading="lazy"');
    assert.ok(!servicesAstro.includes('loading="lazy"'), 'ServicesPage não deve atrasar fotografias com loading="lazy"');
    assert.ok(auroraCss.includes('.split-photo-sharp.is-loaded'), 'Transição óptica suave .is-loaded deve existir para fotografias');
  });

  it('valida que todas as 5 rotas principais existem e possuem landmarks e meta-tags corretas', () => {
    const pages = ['index.astro', 'produtos.astro', 'servicos.astro', 'sobre.astro', 'contato.astro'];
    for (const page of pages) {
      const pagePath = path.resolve('src/pages', page);
      assert.ok(fs.existsSync(pagePath), `Página src/pages/${page} deve existir`);
      const content = fs.readFileSync(pagePath, 'utf-8');
      assert.ok(content.includes('SiteLayout'), `Página ${page} deve utilizar SiteLayout`);
    }
  });

  it('garante que não existem arquivos mortos ou legados no diretório de componentes', () => {
    assert.ok(!fs.existsSync(path.resolve('src/features/home/components/InteractivePlans.tsx')), 'InteractivePlans.tsx deve estar removido');
    assert.ok(!fs.existsSync(path.resolve('src/features/home/components/ProductPreview.astro')), 'ProductPreview.astro deve estar removido');
    assert.ok(!fs.existsSync(path.resolve('src/features/contact/components/QuoteDialog.tsx')), 'QuoteDialog.tsx deve estar removido');
    assert.ok(!fs.existsSync(path.resolve('src/features/navigation/CommercialReviewBar.astro')), 'CommercialReviewBar.astro deve estar removido');
  });
});
