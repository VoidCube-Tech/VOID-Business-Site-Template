# VOID Frontend Master Blueprint V2 — Design System Editorial & Precisão Industrial

> **Documento Mestre Auto-Contido (V2).**
> Especifica a arquitetura técnica (Astro + React 19 Islands + Tailwind v4), a Engenharia de Cor Perceptual **OKLCH + HCT** (Obsidiana Frio + Branco-Osso Quente + Laranja Sinalizador 2%–5%), o pipeline de fotografia real (`Imagens para front`) e os 5 padrões composicionais inspirados em **Tequs** e **Imagica**.

---

## 1. Visão Geral da Arquitetura

```
VOID-Business-Site-Template/
├── .agent/
│   └── PROJECT_SPEC.md                        # Especificação executiva do projeto e Design System V2
├── docs/
│   ├── README.md                              # Índice da documentação
│   ├── FRONTEND_MASTER_BLUEPRINT.md           # Este documento mestre
│   ├── DESIGN_SYSTEM_OKLCH_AND_EFFECTS.md     # Matemática OKLCH/HCT, Tipografia Bicolor e Padrões Tequs/Imagica
│   ├── DEFENSIVE_CSS_AND_RESPONSIVENESS.md    # As 5 Leis do Defensive CSS (320px a 4K)
│   └── MOTION_TRANSITIONS_AND_ANTI_FREEZE.md  # Transições MPA VoidCube Anti-Freeze e Theme Wipe
├── public/
│   └── images/front/                          # Fotografias reais sincronizadas automaticamente
├── scripts/
│   ├── dev-server.mjs                         # Servidor de desenvolvimento resiliente
│   └── sync-front-images.mjs                  # Sincronizador automático de "C:\Users\dkaua\Pictures\Imagens para front"
├── src/
│   ├── features/
│   │   ├── home/                              # Home: Hero Tequs, Split 50/50 + Filetes 1px, Matriz Comparativa Fumê, Split Invertido
│   │   ├── services/                          # Produtos: Catálogo em Splits Assimétricos + Especificações 1px + Licenciamento
│   │   ├── about/                             # Sobre: Narrativa Institucional "Backed to Scale" + Governança 1px
│   │   ├── contact/                           # Contato: Briefing Direto + Configurador de Precisão Industrial
│   │   └── navigation/                        # Header Cápsula Fumê (Imagica/Tequs), Footer Linha Única e Modal Comercial
│   ├── layouts/
│   │   └── SiteLayout.astro                   # Shell HTML, JSON-LD, SEO, Átrio Desfocado e Cortina MPA
│   ├── pages/                                 # Rotas Astro (/, /produtos, /servicos, /sobre, /contato, /llms.txt, /ard.json)
│   ├── shared/
│   │   ├── brand/brand.ts                     # Identidade institucional Periphelion
│   │   ├── catalog/commercialDependencies.ts  # Governança comercial COM-01 a COM-06
│   │   ├── color/contrastValidator.ts         # Validador matemático WCAG 2.2 e Gamut sRGB em OKLCH
│   │   ├── discovery/agentDiscovery.ts        # Descoberta para agentes (llms.txt e ARD JSON)
│   │   ├── effects/                           # CorporateBackdrop.astro, AuroraBackground.astro, liquid-glass/
│   │   ├── loading/                           # LoadingShell.astro e settleLoadingMark (WAAPI)
│   │   ├── media/frontImages.ts               # Manifesto tipado gerado por sync-front-images.mjs
│   │   ├── motion/RevealOnView.astro          # IntersectionObserver para entrada sutil
│   │   └── ui/                                # Icon.astro, CommercialBadge.astro
│   └── styles/
│       ├── global.css                         # Tokens OKLCH Dual-Theme (Obsidiana Frio / Osso Quente / Laranja Sinalizador)
│       ├── typography.css                     # Plus Jakarta Sans + Instrument Serif + .headline-bicolor
│       ├── aurora.css                         # Elevações técnicas 1–5 e atmosfera sem brilho neon
│       ├── animation.css                      # Keyframes sutis
│       └── transitions.css                    # Cortina MPA #page-transition-veil e View Transitions
└── tests/
    ├── unit/                                  # Testes matemáticos de contraste OKLCH/WCAG e governança comercial
    ├── components/                            # Testes do modelo de escopo e manifesto de imagens
    └── integration/                           # Testes de build, Design System V2, responsividade e anti-freeze
```

---

## 2. Regras Fundamentais do Design System V2

### 2.1 Paleta de Precisão Industrial (Zero "Cara de IA")
- **Dark Mode (Padrão Inicial):**
  - Fundo Base (Obsidiana Frio): `oklch(11% 0.008 260)`
  - Superfície Secundária / Painéis: `oklch(14% 0.008 260)`
  - Bordas e Filetes Técnicos (`1px`): `oklch(22% 0.01 260)`
  - Texto Primário (Branco-Osso Quente): `oklch(95% 0.008 85)`
  - Texto Secundário / Metadados (Cinza Técnico): `oklch(60% 0.01 260)`
  - Cor de Acento / Instrumento (Laranja Sinalizador): `oklch(68% 0.18 45)` — aplicada em **2% a 5% da interface** (pontos ativos `4px–6px`, indicadores de status e seleção).
- **Light Mode (Inversão Harmônica):**
  - Fundo Base (Papel Osso Quente): `oklch(96% 0.008 85)`
  - Superfície Secundária: `oklch(92.5% 0.009 85)`
  - Bordas e Filetes Técnicos (`1px`): `oklch(82% 0.01 260)`
  - Texto Primário (Grafite Obsidiana): `oklch(14% 0.01 260)`
  - Texto Secundário (Cinza Técnico Escuro): `oklch(42% 0.012 260)`
  - Cor de Acento (Laranja Sinalizador Calibrado): `oklch(50% 0.16 45)`

### 2.2 Proibições Visuais Absolutas
1. **Proibido** usar objetos 3D abstratos em wireframe girando no topo das páginas.
2. **Proibido** usar gráficos SVG decorativos falsos ou *pills* empilhadas em excesso.
3. **Proibido** usar gradientes multicoloridos em títulos (`background-clip: text`); use sempre **Títulos Bicolores (`.headline-bicolor`)** onde a 1ª frase é Branco-Osso (`text-on-surface`) e a 2ª frase é Cinza Técnico (`text-on-surface-variant`).
4. **Proibido** usar brilhos neon esmeralda/roxo difusos sobre o fundo.

### 2.3 Pipeline de Fotografia Real (`npm run sync:images`)
- Todas as fotografias vêm da pasta curada pelo usuário: `C:\Users\dkaua\Pictures\Imagens para front`.
- O script `scripts/sync-front-images.mjs` sincroniza os arquivos para `public/images/front/` e atualiza `src/shared/media/frontImages.ts` automaticamente antes de `npm run dev` e `npm run build`.
- As fotos reais alimentam tanto o **Átrio Desfocado (`CorporateBackdrop.astro`)** quanto os **Quadros Fotográficos Editoriais** nas páginas `Início`, `Produtos`, `Sobre` e `Contato`.
