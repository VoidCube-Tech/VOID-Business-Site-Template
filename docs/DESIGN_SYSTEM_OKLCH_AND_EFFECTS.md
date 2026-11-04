# Engenharia de Design System: OKLCH + HCT, Tipografia Bicolor & Composição Editorial (V2)

> **Foco Pedagógico (Design System Mastery):** Como construir interfaces de precisão industrial que escapam completamente da estética genérica de "template de IA" usando teoria perceptual de cores (HCT → OKLCH), regra de acento de 2%–5%, tipografia bicolor e composição com fotografia real.

---

## 1. Por que interfaces parecem "geradas por IA" (e como evitar)

Interfaces geradas por IA sofrem de cinco vícios visuais recorrentes:
1. **Saturação difusa (Neon Glow):** Gradientes radiais verdes/roxos/cianos de alto croma espalhados por toda a tela.
2. **Simetria monótona:** Seções sempre estruturadas como `Eyebrow em CAPS + Título com Gradiente + Subtítulo centralizado + Grid de 3 ou 4 cards idênticos`.
3. **Ornamentação sintética:** Gráficos SVG falsos, *pills* repetitivas e objetos 3D em wireframe girando sem função informacional.
4. **Contraste estéril:** Preto puro `#000000` contra branco puro `#FFFFFF`, causando fadiga visual (halos de astigmatismo em telas OLED).
5. **Ausência de matéria real:** Falta de fotografia arquitetônica/humana com iluminação física real.

---

## 2. Arquitetura Cromática Perceptual (OKLCH + HCT)

No espaço **OKLCH** (`oklch(L C H)`), controlamos ortogonalmente:
- **$L$ (Lightness perceptual):** Garante contraste WCAG 2.2 previsível antes mesmo de escolher o matiz.
- **$C$ (Chroma):** Mantido intencionalmente microscópico (`0.008` a `0.012`) nas superfícies e textos para criar sensação de **matéria mineral / anodizada**, reservando croma alto (`0.18`) exclusivamente para o **Instrumento de Acento** (2% a 5% da área).
- **$H$ (Hue):** Contraponto térmico entre **Fundo Frio (`260°` Obsidiana Azulado)** e **Texto Quente (`85°` Branco-Osso)**.

### 2.1 Tabela Mestra de Tokens — Dark Mode (Obsidiana Frio & Instrumento)

| Token CSS | Valor OKLCH | Contraste sobre Fundo | Função no Design System |
|---|---|---|---|
| `--theme-background` | `oklch(11% 0.008 260)` | `1.00:1` | **Obsidiana Frio:** Fundo base de carvão profundo com leve matiz azulado (`260°`) para não chapar a tela. |
| `--theme-surface-container` | `oklch(14% 0.008 260)` | `1.12:1` | **Superfície Secundária:** Painéis técnicos, coluna destacada e blocos de interação. |
| `--theme-outline-variant` | `oklch(22% 0.01 260)` | `1.45:1` | **Filete Técnico (`1px`):** Divisórias horizontais de especificações e bordas de precisão. |
| `--theme-on-background` | `oklch(95% 0.008 85)` | **`16.8:1` (AAA)** | **Branco-Osso Quente:** Texto principal e 1ª linha dos títulos bicolores; elimina ofuscamento em OLED. |
| `--theme-on-surface-variant` | `oklch(60% 0.01 260)` | **`4.8:1` (AA)** | **Cinza Técnico:** Metadados, textos explicativos e 2ª linha dos títulos bicolores. |
| `--theme-primary` | `oklch(68% 0.18 45)` | **`6.4:1` (AA)** | **Laranja Sinalizador:** Cor de instrumento usada em **apenas 2% a 5% da interface** (pontos ativos `4px–6px`, indicadores de status). |

### 2.2 Tabela Mestra de Tokens — Light Mode (Papel Osso Quente & Grafite)

| Token CSS | Valor OKLCH | Contraste sobre Fundo | Função no Design System |
|---|---|---|---|
| `--theme-background` | `oklch(96% 0.008 85)` | `1.00:1` | **Papel Osso Quente:** Fundo editorial claro com temperatura orgânica. |
| `--theme-surface-container` | `oklch(92.5% 0.009 85)` | `1.11:1` | **Superfície Secundária Clara:** Painéis técnicos e containers. |
| `--theme-outline-variant` | `oklch(82% 0.01 260)` | `1.38:1` | **Filete Técnico Claro (`1px`):** Linhas divisórias de especificação. |
| `--theme-on-background` | `oklch(14% 0.01 260)` | **`14.9:1` (AAA)** | **Grafite Obsidiana:** Texto primário e 1ª linha dos títulos bicolores. |
| `--theme-on-surface-variant` | `oklch(42% 0.012 260)` | **`5.3:1` (AA)** | **Cinza Técnico Escuro:** Segundas linhas de título e metadados. |
| `--theme-primary` | `oklch(50% 0.16 45)` | **`4.7:1` (AA)** | **Laranja Sinalizador Calibrado:** Ajustado em luminosidade para cumprir WCAG AA sobre papel claro. |

---

## 3. Os 5 Arquétipos de Composição (Referência Tequs & Imagica)

### 3.1 Navbar Cápsula Fumê (`Header.astro`)
- Cápsula flutuante (`rounded-full`) com fundo translúcido escuro (`bg-surface-container/80 backdrop-blur-xl`) e borda `1px` em `border-outline-variant`.
- Esquerda: Logotipo `Periphelion` estático em Branco-Osso (`text-on-surface`).
- Centro: Links diretos sem adornos (`Início`, `Produtos`, `Sobre`, `Contato`).
- Direita: Seletor de tema compacto + botão cápsula de ação com um ponto indicador de `6px` em **Laranja Sinalizador (`bg-primary`)**.

### 3.2 Tipografia Bicolor de Alto Contraste (`.headline-bicolor`)
- Substitui qualquer gradiente colorido de texto.
- Construída com duas sentenças curtas de mesmo tamanho tipográfico (`clamp(2rem, 3.8vw, 3.5rem)`):
  ```html
  <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08]">
    <span class="block text-on-surface">Comprovado em operações críticas.</span>
    <span class="block text-on-surface-variant">Engenharia contábil e fiscal unificada.</span>
  </h2>
  ```

### 3.3 Seção Split 50/50 com Lista de Filetes `1px`
- **Coluna Fotográfica:** Fotografia real de alta resolução sincronizada de `C:\Users\dkaua\Pictures\Imagens para front`.
- **Coluna Técnica:**
  1. Uma única micro-cápsula no topo (`rounded-full border border-outline-variant px-3 py-1 text-xs text-on-surface-variant`).
  2. Título Bicolor (`.headline-bicolor`).
  3. Parágrafo curto (`max-w-xl text-on-surface-variant`).
  4. Lista de especificações separada por `divide-y divide-outline-variant border-y border-outline-variant`, onde cada linha exibe apenas um ponto de `4px` em `bg-primary` (Laranja Sinalizador) e o texto técnico direto.
  5. Link de ação sublinhado (`border-b border-on-surface pb-0.5 text-sm font-medium text-on-surface`) com seta `→`.

### 3.4 Matriz Comparativa em Vidro Fumê sobre Fotografia
- Quadro comparativo amplo com `backdrop-blur-xl bg-surface-container/65` posicionado sobre fotografia real.
- A coluna **Periphelion** recebe fundo sólido `bg-background` (`oklch(11% 0.008 260)`), criando contraste arquitetônico imediato com ícones `✓` claros, enquanto as colunas tradicionais ficam translúcidas com `×` em `text-on-surface-variant`.

### 3.5 Átrio Desfocado com Fotografia Real (`CorporateBackdrop.astro`)
- Utiliza fotografia arquitetônica real da pasta `Imagens para front` com máscara de profundidade de campo: nitidez estrutural periférica (`blur(4px)`) e difusão central (`blur(20px)`) tingida pelo Obsidiana Frio (`oklch(11% 0.008 260)`), sem nenhum halo verde ou neon.
