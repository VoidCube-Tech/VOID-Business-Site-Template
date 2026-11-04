# Guia Completo de Defensive CSS & Responsividade Intrínseca (320px a 4K)

Este documento define o padrão obrigatório de **Defensive CSS (CSS Defensivo)** e **Intrinsic Web Design** utilizado no template para garantir que **nenhum texto jamais saia para fora de um card, botão, aba ou rodapé**, independentemente do tamanho da tela (de celulares estreitos de `320px`, tablets de `768px`, laptops de `1024px` até monitores ultrawide `4K`).

---

## 1. Por que Layouts e Cards Quebram (Diagnóstico Técnico)

Sempre que um texto "escapa" para fora de um card ou gera rolagem lateral indesejada, a causa está em um destes 4 fatores:

1. **O comportamento padrão `min-width: auto` do Flexbox e CSS Grid:**
   Pela especificação da W3C, todo filho direto de um container `flex` ou `grid` possui `min-width: auto`. Isso significa que o navegador **proíbe a coluna ou card de encolher** para uma largura menor que a sua maior palavra contínua ou elemento interno.
2. **Palavras longas ou strings técnicas sem hifenização/quebra:**
   Termos em português como `Observabilidade`, `Disponibilidade`, e-mails corporativos (`arquitetura@techai.systems`) ou diagramas em `<pre>` ultrapassam facilmente `160px–220px` de largura contínua.
3. **Grades de 3 colunas acionadas cedo demais (`md:grid-cols-3` em 768px):**
   Em uma tela de tablet (`768px`), descontando `48px` de padding externo e `48px` de gaps entre colunas, restam `672px / 3 = 224px` por card. Descontando o padding interno do card (`p-7` = `56px`), a **área útil de texto cai para apenas `168px`**. Qualquer título `text-4xl` ou `text-5xl` estoura imediatamente.
4. **Uso indevido de `shrink-0` ou `truncate`:**
   - `shrink-0` em um valor grande (ex: `"100% IP do Cliente"`) dentro de um container `sm:flex-row` impede que o título quebre linha e empurra o parágrafo lateral para fora do card.
   - `truncate` (`white-space: nowrap; text-overflow: ellipsis`) corta informações cruciais de entregáveis em vez de permitir leitura confortável em múltiplas linhas.

---

## 2. As 5 Leis Obrigatórias de Defensive CSS

### Lei 1: Todo Card e Coluna Flex/Grid DEVE ter `min-w-0` e `overflow-hidden`
Nunca crie um card ou coluna de grid sem anular o `min-width: auto`:
```html
<!-- CORRETO -->
<article class="spotlight-card card-elevation-3 rounded-2xl p-6 sm:p-8 min-w-0 overflow-hidden">
  <div class="min-w-0">
    <h3 class="font-display text-xl font-bold text-on-surface min-w-0 break-words">
      Título Seguro que Quebra Linha
    </h3>
    <p class="mt-2 text-xs sm:text-sm text-on-surface-variant min-w-0 break-words">
      Descrição protegida contra overflow em qualquer resolução.
    </p>
  </div>
</article>
```

### Lei 2: Quebra de Palavra Defensiva (`break-words`, `hyphens-auto`, `break-all`)
- **Títulos, Abas e Parágrafos:** Use sempre `min-w-0 break-words` (e adicione `hyphens-auto leading-snug` em botões de abas de 2 colunas no mobile).
- **E-mails, URLs, Hashes e Identificadores:** Use sempre `break-all`:
  ```html
  <dd class="mt-0.5 text-on-surface font-semibold break-all">arquitetura@techai.systems</dd>
  ```
- **Blocos de Código / Diagramas (`<pre>`):** Use sempre `overflow-x-auto whitespace-pre-wrap break-words min-w-0` dentro de um container com `min-w-0 overflow-hidden`.

### Lei 3: Proibido usar `truncate` em Entregáveis e `shrink-0` em Textos Grandes
- Em listas de recursos (`<ul> / <li>`), o ícone de check (`✓`) recebe `shrink-0 mt-0.5`, mas o texto ao lado **nunca** deve usar `truncate`; deve usar `min-w-0 break-words leading-snug`:
  ```html
  <li class="flex items-start gap-2.5 text-xs text-on-surface min-w-0">
    <span class="font-mono text-primary text-[11px] font-bold shrink-0 mt-0.5">✓</span>
    <span class="min-w-0 break-words leading-snug">
      Isolamento total: seus dados não treinam modelos públicos
    </span>
  </li>
  ```
- Em cards horizontais de garantias (`flex-col sm:flex-row`), **nunca** coloque `shrink-0` no valor principal:
  ```html
  <div class="card-elevation-3 flex flex-col justify-between gap-3 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:gap-8 min-w-0 overflow-hidden">
    <div class="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface min-w-0 break-words">
      {item.value}
    </div>
    <p class="max-w-md text-xs sm:text-sm sm:text-right text-on-surface-variant min-w-0 break-words">
      {item.detail}
    </p>
  </div>
  ```

### Lei 4: Escalonamento Intrínseco de Grids (`sm:grid-cols-2 lg:grid-cols-3`)
- **Cards de Planos e Soluções (3 itens):**
  - Mobile (`< 640px`): 1 coluna (`grid-cols-1`)
  - Tablet (`640px – 1023px`): 2 colunas (`sm:grid-cols-2`)
  - Desktop (`>= 1024px`): 3 colunas (`lg:grid-cols-3`)
- **Cards de Métricas (4 itens):**
  - Mobile (`< 640px`): 1 coluna (`grid-cols-1`)
  - Tablet (`640px – 1023px`): 2 colunas (`sm:grid-cols-2`)
  - Desktop (`>= 1024px`): 4 colunas (`lg:grid-cols-4`)

### Lei 5: Escala Tipográfica Defensiva Dentro de Cards
- **Títulos de Hero (Página inteira):** `text-4xl sm:text-6xl lg:text-7xl`
- **Títulos de Seção:** `text-3xl sm:text-4xl` (ou `sm:text-5xl` quando ocupam largura máxima de leitura `max-w-3xl`)
- **Valores / Métricas / Garantias DENTRO de Cards em Grid:** Máximo `text-2xl sm:text-3xl lg:text-4xl` (proibido `text-5xl` dentro de cards divididos em colunas).

---

## 3. Componentes Estruturais Blindados

### 3.1. Rodapé (`Footer.astro`)
O rodapé possui 3 grupos de informação (Marca + Tagline, Links de Navegação e Copyright). Somados em linha única, eles exigem ~820px. Por isso:
- Abaixo de `768px`: Empilhado verticalmente e centralizado (`flex-col items-center text-center gap-6`).
- A partir de `768px` (`md:`): Alinhado em linha (`md:flex-row md:text-left justify-between`), com `flex-wrap` e `min-w-0` em todos os filhos.

### 3.2. Drawer Mobile (`Header.astro`) e Modal (`QuoteDialog.tsx`)
- **Drawer:** `w-[calc(100vw-1.5rem)] max-w-sm` — garante margem de segurança de `12px` em cada lado até em telas de `320px`.
- **Modal `<dialog>`:** `w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-2xl` — evita qualquer corte lateral em dispositivos pequenos.
- **Content-Visibility no Scroll:** Todas as seções abaixo da dobra usam `.section-contained` (`content-visibility: auto; contain-intrinsic-size: 0 650px;`) para manter 60fps constantes no scroll mobile.
