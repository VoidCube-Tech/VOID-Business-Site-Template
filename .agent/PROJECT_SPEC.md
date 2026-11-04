# Especificação Arquitetural & Design System V2 — Periphelion ERP

> **Propósito:** Eliminar 100% da estética artificial de "template de IA" (gradientes neon difusos, gráficos SVG sintéticos, wireframes 3D giratórios e grids simétricos repetitivos), adotando uma direção de **Engenharia Editorial & Precisão Industrial** inspirada em **Tequs** e **Imagica**, sustentada por matemática perceptual **OKLCH + HCT**, fotografia arquitetônica real (`C:\Users\dkaua\Pictures\Imagens para front`) e o fundo de átrio desfocado.

---

## 1. Engenharia de Cor Perceptual (OKLCH + HCT — Precisão Industrial)

### 1.1 Dark Mode (Padrão Principal — Obsidiana Frio & Osso Quente)
| Token Semântico | Valor OKLCH | Papel Visual no Sistema |
|---|---|---|
| `--theme-background` / `--theme-surface` | `oklch(11% 0.008 260)` | **Obsidiana Frio:** Fundo base de carvão profundo com micro-matiz azulado (`260°`) para evitar tela chapada. |
| `--theme-surface-container` | `oklch(14% 0.008 260)` | **Superfície Secundária:** Painéis técnicos interativos, configurador e células destacadas. |
| `--theme-outline-variant` | `oklch(22% 0.01 260)` | **Filete Técnico (`1px`):** Bordas de precisão, divisórias de especificações em lista e linhas da matriz comparativa. |
| `--theme-on-background` / `--theme-on-surface` | `oklch(95% 0.008 85)` | **Branco-Osso Quente:** Texto primário e 1ª linha dos títulos bicolores. Contraste WCAG AAA ($\ge 16:1$) sem fadiga ocular. |
| `--theme-on-surface-variant` | `oklch(60% 0.01 260)` | **Cinza Técnico:** Metadados, parágrafos de apoio e 2ª linha dos títulos bicolores. Contraste WCAG AA ($\ge 4.6:1$). |
| `--theme-primary` | `oklch(68% 0.18 45)` | **Laranja Sinalizador (Instrumento):** Restrito a **2% a 5% da tela** — micro-pontos ativos (`4px`–`6px`), indicadores de status e foco operacional. |

### 1.2 Light Mode (Inversão Harmônica — Papel Osso Quente & Grafite Técnico)
| Token Semântico | Valor OKLCH | Papel Visual no Sistema |
|---|---|---|
| `--theme-background` / `--theme-surface` | `oklch(96% 0.008 85)` | **Papel Osso Quente:** Superfície editorial clara sem brancura estéril. |
| `--theme-surface-container` | `oklch(92.5% 0.009 85)` | **Superfície Secundária Clara:** Painéis técnicos e containers. |
| `--theme-outline-variant` | `oklch(82% 0.01 260)` | **Filete Técnico Claro (`1px`):** Divisórias de lista e bordas sutis. |
| `--theme-on-background` / `--theme-on-surface` | `oklch(14% 0.01 260)` | **Grafite Obsidiana:** Texto primário com contraste WCAG AAA ($\ge 14:1$). |
| `--theme-on-surface-variant` | `oklch(42% 0.012 260)` | **Cinza Técnico Escuro:** Segundas linhas de título e metadados (WCAG AA $\ge 5.2:1$). |
| `--theme-primary` | `oklch(50% 0.16 45)` | **Laranja Sinalizador Escuro:** Calibrado em gamut sRGB para contraste WCAG AA sobre fundo claro. |

---

## 2. Os 5 Padrões Visuais de Referência (`/Utilidades` — Tequs & Imagica)

1. **Navbar Cápsula em Vidro Fumê (`navbar.png` + Tequs):**
   - Barra superior flutuante (`rounded-full`) com vidro escuro translúcido (`backdrop-blur-xl`), logotipo estático `Periphelion` à esquerda, links centrais limpos (`Início`, `Produtos`, `Sobre`, `Contato`), seletor de tema minimalista e botão de ação à direita com ponto indicador de `6px` em **Laranja Sinalizador (`oklch(68% 0.18 45)`)**.
2. **Títulos Bicolores de Alto Contraste (`Captura 164358` & `164433`):**
   - Proibido usar gradientes multicoloridos de IA em títulos.
   - Todo título principal (`h1`, `h2`) é composto por duas afirmações empilhadas do mesmo peso e corpo:
     - **Linha 1:** Branco-Osso Quente (`text-on-surface` / `oklch(95% 0.008 85)`).
     - **Linha 2:** Cinza Técnico (`text-on-surface-variant` / `oklch(60% 0.01 260)`).
3. **Seção Split 50/50 com Fotografia Real + Lista de Filetes `1px` (`Captura 164433`):**
   - Coluna fotográfica com imagem real de `C:\Users\dkaua\Pictures\Imagens para front` em proporção arquitetônica (`aspect-[4/5]` ou altura integral).
   - Coluna editorial em fundo Obsidiana com uma única tag discreta em cápsula (`rounded-full border border-outline-variant`), título bicolor, parágrafo conciso e **lista vertical separada por filetes horizontais de `1px` (`border-outline-variant`)**, onde cada item possui apenas um micro-ponto de `4px` em Laranja Sinalizador (`bg-primary`) e texto técnico direto, finalizando com link sublinhado (`→`).
4. **Seção Split Invertida `Backed to Scale` (`Captura 164505`):**
   - Coluna esquerda com título direto, dois parágrafos executivos enxutos em `oklch(60% 0.01 260)`, link sublinhado (`→`) e selos/indicadores institucionais monocromáticos na base.
   - Coluna direita com fotografia real enquadrada (`rounded-md`) e profundidade óptica sutil.
5. **Matriz Comparativa em Vidro Fumê sobre Fotografia (`Captura 164534`):**
   - Tabela comparativa translúcida (`backdrop-blur-xl`) sobreposta à fotografia arquitetônica real, na qual a coluna **Periphelion** recebe destaque vertical em Obsidiana Sólido (`oklch(11% 0.008 260)`) com marcações `✓` nítidas, contrastando com colunas secundárias (`ERPs Tradicionais` e `Sistemas Fragmentados`) com `×` em cinza técnico.

---

## 3. Pipeline de Fotografia Real (`Imagens para front`)

- **Diretório Fonte:** `C:\Users\dkaua\Pictures\Imagens para front`
- **Sincronização Automática:** `scripts/sync-front-images.mjs` copia todas as imagens da pasta para `public/images/front/` e gera o manifesto tipado `src/shared/media/frontImages.ts` antes de `npm run dev` e `npm run build`.
- **Aplicação Dupla:**
  1. **Átrio Desfocado Global (`CorporateBackdrop.astro`):** Usa a fotografia real da pasta com máscara de profundidade de campo (bordas arquitetônicas reconhecíveis + centro difundido em Obsidiana Frio sem brilho verde neon).
  2. **Recortes Editoriais Nítidos:** Exibidos nas seções Split e no fundo da Matriz Comparativa em Vidro Fumê.

---

## 4. Regras de Engenharia Intocáveis

- **Defensive CSS (320px a 4K):** `min-w-0` em filhos de flex/grid, `break-words` em títulos/textos, `break-all` em e-mails/URLs, zero `truncate` em listas de especificações.
- **Governança Comercial (`COM-01..06`):** Sem preços fixos inventados no texto visível; preservar atributos `data-commercial-placeholder` para contratos de auditoria.
- **Transições MPA Anti-Freeze:** Navegação confirmada exclusivamente no evento `click` com `#page-transition-veil` (`pointer-events: none`), failsafe `<= 1200ms` e limpeza garantida em `pageshow` / `DOMContentLoaded`.
