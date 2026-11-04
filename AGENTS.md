# Regras de Engenharia & Design System V2 (`VOID-Business-Site-Template` / Periphelion)

Sempre que atuar neste repositório, siga rigorosamente as especificações em [`.agent/PROJECT_SPEC.md`](./.agent/PROJECT_SPEC.md) e a documentação em [`docs/FRONTEND_MASTER_BLUEPRINT.md`](./docs/FRONTEND_MASTER_BLUEPRINT.md):

## 1. Sistema de Cores Perceptual (OKLCH + HCT — Precisão Industrial)
- **Dark Mode (Padrão Principal):**
  - Fundo Base (Obsidiana Frio): `oklch(11% 0.008 260)`
  - Superfícies Secundárias / Painéis: `oklch(14% 0.008 260)` com filetes/bordas `1px` em `oklch(22% 0.01 260)`
  - Texto Primário (Branco-Osso Quente): `oklch(95% 0.008 85)` (WCAG AAA $\ge 7.0:1$)
  - Texto Secundário / Metadados (Cinza Técnico): `oklch(60% 0.01 260)` (WCAG AA $\ge 4.5:1$)
  - Cor de Acento / Instrumento (Laranja Sinalizador): `oklch(68% 0.18 45)` — restrita a **2% a 5% da interface** (micro-pontos ativos, contadores de status ou indicadores de sistema).
- **Light Mode (Inversão Harmônica):**
  - Papel Osso Quente (`oklch(96% 0.008 85)`), Grafite Obsidiana (`oklch(14% 0.01 260)`), Cinza Técnico Escuro (`oklch(42% 0.012 260)`) e Laranja Sinalizador calibrado (`oklch(50% 0.16 45)`).
- **Zero Estética Artificial de IA:** Proibido usar brilhos neon espalhados, gradientes multicoloridos em títulos, gráficos SVG falsos ou objetos 3D em wireframe girando.

## 2. Arquitetura Visual Editorial (Padrão Tequs / Imagica)
- **Títulos Bicolores (`headline-bicolor`):** Linha principal em Branco-Osso Quente (`text-on-surface`) e linha complementar imediatamente abaixo no mesmo corpo em Cinza Técnico (`text-on-surface-variant`).
- **Seções Split Assimétricas + Filetes `1px`:** Fotografias reais de `C:\Users\dkaua\Pictures\Imagens para front` (sincronizadas via `npm run sync:images`) pareadas com listas técnicas separadas por filetes horizontais de `1px` (`border-outline-variant`) e micro-ponto `4px` em Laranja Sinalizador (`bg-primary`).
- **Matriz Comparativa em Vidro Fumê:** Tabela comparativa com `backdrop-blur-xl` sobre fotografia real, destacando a coluna `Periphelion` em superfície sólida Obsidiana (`bg-background`).

## 3. Defensive CSS & Responsividade Intrínseca (320px a 4K)
- Todo container flex/grid com texto DEVE possuir `min-w-0` e `break-words` (`break-all` para e-mails/URLs).
- Nunca use `truncate` em itens de lista de especificações nem force 3 colunas em `768px` (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

## 4. Governança Comercial & Transições Anti-Freeze
- Preserve os placeholders `data-commercial-placeholder="COM-01..06"` sem inventar preços fixos visíveis.
- Acione transições MPA (`#page-transition-veil`) exclusivamente no evento `click` confirmado, com failsafe `<= 1200ms` e limpeza em `pageshow` / `DOMContentLoaded`.
