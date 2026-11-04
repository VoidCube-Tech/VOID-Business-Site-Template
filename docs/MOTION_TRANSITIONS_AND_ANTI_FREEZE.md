# Motor de Transições de Página (Estilo VoidCube), Loading Cinético WAAPI & Theme Wipe

Este documento especifica a arquitetura completa de movimento, carregamento e transição entre páginas e temas do projeto, desenhada para entregar **fluidez cinematográfica com zero risco de congelamento (Anti-Freeze)**.

---

## 1. Arquitetura de Transição entre Páginas (VoidCube MPA Scrim Veil)

### 1.1. O Problema do Carregamento Infinito (E Como Foi Resolvido)
Em sites MPA, tentar antecipar a navegação no evento `pointerdown` ou prender a tela até o evento `window.load` gera congelamentos intermitentes:
- Se o usuário pressionar o botão do mouse (`pointerdown`) sobre um link e arrastar um pouco antes de soltar (ou fizer scroll no celular tocando sobre um link), o navegador **cancela a navegação**, mas o script já ativou a tela de loading, deixando o usuário preso em carregamento infinito.
- Se uma fonte ou recurso secundário demorar na rede, esperar apenas por `window.load` bloqueia a leitura de um HTML que já está pronto no DOM.

### 1.2. A Solução em Duas Camadas (`SiteLayout.astro` + `LoadingShell.astro` + `transitions.css`)

#### Camada A: Saída Suave ao Clicar (`#page-transition-veil` + `#page-transition-loader`)
1. O listener escuta **exclusivamente o evento `click` confirmado** (`!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey`).
2. Valida se o clique ocorreu em um `<a href="/...">` interno que realmente muda de página (ignorando âncoras `#`, `download` ou `target="_blank"`).
3. Adiciona imediatamente (`0ms`) a classe `html.page-is-navigating` e `#page-transition-loader.is-loading`:
   - A barra superior de `3px` desliza no topo.
   - O véu `#page-transition-veil` (`pointer-events: none`) aplica um escurecimento suave (`color-mix(in srgb, var(--color-background) 70%, black 30%)` + `backdrop-filter: blur(2px)`) em `160ms`.
   - O conteúdo atual (`#techai-page-content`) sofre uma leve compressão óptica (`opacity: 0.88; filter: brightness(0.92); transform: scale(0.998)`).
4. **Failsafe de 1200ms e Limpeza de BFCache:**
   - Um timer `setTimeout(hideLoader, 1200)` destrava automaticamente a interface caso o usuário interrompa a navegação.
   - Listeners em `pageshow`, `pagehide`, `DOMContentLoaded` e `visibilitychange` limpam imediatamente qualquer classe de navegação ao voltar pelo histórico do navegador.

#### Camada B: Entrada Cinética com Física WAAPI (`LoadingShell.astro` + `motion.ts`)
1. No `<head>`, `document.documentElement.classList.add('page-loading-enabled')` previne qualquer Flash of Unstyled Content (FOUC).
2. Assim que o DOM está interativo (`DOMContentLoaded`), o `LoadingShell` chama `settleLoadingMark(mark, 220)`:
   ```typescript
   export function settleLoadingMark(mark: HTMLElement, duration: number = 280): Animation | undefined {
     if (!mark) return undefined;
     if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
       mark.style.animation = 'none';
       mark.style.transform = 'none';
       return undefined;
     }
     const transform = getComputedStyle(mark).transform;
     mark.style.animation = 'none';
     return mark.animate(
       [
         { transform },
         { transform: 'translateY(0) rotate(0deg) scale(1)' }
       ],
       { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
     );
   }
   ```
3. Enquanto o overlay dissolve em `220ms`, o conteúdo (`[data-loading-content]`) faz a transição reversa de `brightness(0.92) -> brightness(1)` e `opacity: 0 -> 1`, completando a sensação de câmera cinematográfica do VoidCube.

---

## 2. Troca de Tema: Circular Clip-Path Wipe (`Header.astro` + `aurora.css`)

### 2.1. Regras de Empilhamento CSS (`aurora.css`)
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}

/* Impede que transições CSS individuais de cards atrasem o snapshot da View Transition */
html.theme-transitioning,
html.theme-transitioning *,
html.theme-transitioning *::before,
html.theme-transitioning *::after {
  transition: none !important;
}
```

### 2.2. Geometria de Cobertura Total e Debounce Anti-Click-Storm
- Calcula o raio exato até o vértice mais distante da viewport:
  $$R_{\text{max}} = \sqrt{\max(x, W - x)^2 + \max(y, H - y)^2}$$
- Anima `::view-transition-new(root)` em `180ms cubic-bezier(0.22, 1, 0.36, 1)`.
- Os ícones de Sol Radiante (`[data-theme-icon="light"]`) e Lua Crescente com Estrela (`[data-theme-icon="dark"]`) são controlados declarativamente por seletores CSS `:root[data-theme="dark"]` e `:root[data-theme="light"]` com animações `icon-sun-rise` e `icon-moon-orbit` (`cubic-bezier(0.34, 1.56, 0.64, 1)`), garantindo zero piscada (Zero-FOUC) no carregamento inicial.
