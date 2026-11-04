# Periphelion — Gestão Empresarial, Finanças & ERP em Nuvem

> **Modelo Canônico de Frontend Corporativo de Alta Fidelidade (VOID / Periphelion Model)**  
> Desenvolvido com Astro v7 (Static Site Generation), React 19 Islands, Tailwind CSS v4 e Engenharia de Cores Perceptual OKLCH + HCT.

---

## 1. Visão Geral do Projeto

O **Periphelion** é uma plataforma de gestão empresarial e financeira focada em operações críticas multifilial, conciliação bancária Open Finance em tempo real, motor fiscal adaptado à Reforma Tributária (IBS/CBS) e controladoria estratégica.

Este repositório foi construído para servir como o **modelo de referência e padrão de design** para novos frontends corporativos da organização, eliminando 100% da estética artificial de templates de IA e adotando padrões de design industrial inspirados nas referências visuais de Tequs e Imagica:
- **Zero Estética de IA:** Sem gradientes neon artificiais, sem ilustrações genéricas e sem wireframes 3D girando.
- **Marca Tipográfica Pura:** Apenas a tipografia imponente do nome na barra de navegação e na aba do navegador.
- **Engenharia de Cor Perceptual (OKLCH):** Fundo base em Obsidiana Frio (`#07080c`), texto em Branco-Osso Quente (`#f0efe9`) e acento Laranja Sinalizador (`#ea6a2a`) estritamente restrito a 2%–5% da tela.
- **Composição Editorial:** Títulos bicolores, seções com lentes fotográficas *Half-Blur* (metade foto nítida / metade texto com vidro fosco) e matriz comparativa em vidro fumê.
- **Pipeline de Imagens com Sharp:** Conversão automática de fotografias de alta resolução para **AVIF** e **WebP** com economia de até **98%** de dados em redes móveis (3G/4G).
- **Descoberta por Agentes de IA (GEO / ARD):** Suporte nativo a agentes autônomos via `llms.txt` e manifesto `/.well-known/ard.json`.

---

## 2. Arquitetura: Strict Feature-Sliced Design (FSD)

O código é estritamente estruturado em camadas unidirecionais (`pages` → `layouts` / `features` → `shared`):

```
VOID-Business-Site-Template/
├── public/
│   ├── images/front/                          # Fotografias reais otimizadas (AVIF, WebP, JPG)
│   └── favicon.svg                            # Ícone limpo/transparente
├── scripts/
│   ├── dev-server.mjs                         # Inicializador do dev server
│   └── sync-front-images.mjs                  # Pipeline Sharp: gera AVIF/WebP desktop e mobile
├── src/
│   ├── features/                              # Fatias verticais por domínio (zero import cruzado)
│   │   ├── home/                              # Home: Hero, Escala e Matriz Comparativa Fumê
│   │   ├── services/                          # Produtos: Catálogo dos 5 módulos
│   │   ├── about/                             # Sobre: Narrativa institucional e 4 etapas de implantação
│   │   ├── contact/                           # Contato: Composer arquitetônico em 3 linhas
│   │   └── navigation/                        # Header cápsula com interruptor físico e Footer
│   ├── layouts/
│   │   └── SiteLayout.astro                   # Shell HTML, preloads de fontes/imagens e véu MPA
│   ├── pages/                                 # Rotas Astro (/, /produtos, /servicos, /sobre, /contato)
│   ├── shared/                                # Camada compartilhada transversal
│   │   ├── brand/brand.ts                     # Dados imutáveis da marca
│   │   ├── catalog/commercialDependencies.ts  # Contrato de módulos e planos (COM-01 a COM-06)
│   │   ├── color/contrastValidator.ts         # Validação matemática WCAG 2.2 e gamut sRGB
│   │   ├── discovery/agentDiscovery.ts        # Geradores de llms.txt e ard.json
│   │   ├── effects/                           # CorporateBackdrop, AuroraBackground e Liquid Glass
│   │   ├── loading/                           # LoadingShell e transições assíncronas
│   │   ├── media/frontImages.ts               # Manifesto tipado gerado por Sharp
│   │   ├── motion/RevealOnView.astro          # IntersectionObserver suave de revelação
│   │   ├── sections/                          # Seções reutilizadas em múltiplas páginas
│   │   └── ui/ResponsivePicture.astro         # Tag <picture> com entrega condicional mobile/desktop
│   └── styles/
│       ├── global.css                         # Variáveis @theme inline e font fallbacks (CLS = 0.000)
│       ├── aurora.css                         # Lentes split-lens e elevações
│       ├── transitions.css                    # Transições MPA com failsafe anti-freeze
│       └── typography.css                     # Escala tipográfica e .headline-bicolor
└── tests/                                     # Suíte de 23 testes automatizados (Node native runner)
```

---

## 3. Instruções de Execução

### Pré-requisitos
- **Node.js:** Versão `>= 22.12.0` (recomendado Node 22 LTS).
- **NPM:** Versão `>= 10.x`.

### Instalação das Dependências
```bash
npm install
```

### Sincronização & Otimização de Imagens
O projeto possui um pipeline automatizado com Sharp que lê as fotos de `C:\Users\dkaua\Pictures\Imagens para front` (ou utiliza o cache existente em `public/images/front/`), gerando as variantes desktop (2048px) e mobile (960px) em AVIF, WebP e JPG:
```bash
npm run sync:images
```
*(Nota: O script possui cache por `mtime`. A primeira execução leva alguns segundos; execuções subsequentes levam ~120ms).*

### Executando em Ambiente de Desenvolvimento
```bash
npm run dev
```
Acesse a aplicação no navegador em:  
**`http://127.0.0.1:4321/`**

### Executando os Testes Automatizados
O projeto conta com 23 testes cobrindo contraste de cores WCAG 2.2 AAA/AA, integridade arquitetural FSD, validação do modelo de escopo, saídas estáticas do build e compressão de imagens:
```bash
npm test
```

### Compilação para Produção (Static Site Generation — SSG)
```bash
npm run build
```
Os arquivos estáticos finais de produção serão gerados na pasta **`dist/`**, prontos para hospedagem em qualquer provedor estático (GitHub Pages, Cloudflare Pages, Vercel, Netlify ou AWS S3/CloudFront).

### Visualizando o Build Localmente
```bash
npm run preview
```

---

## 4. Governança Comercial & Agentic Web (GEO / ARD)

- **Placeholders Comerciais COM-01..06:** Protegidos contra a inclusão de preços fixos ou promessas contratuais não homologadas.
- **`/llms.txt`:** Sumário executivo otimizado para que agentes de IA (ChatGPT, Claude, Perplexity) consumam o catálogo de módulos sem alucinações.
- **`/.well-known/ard.json`:** Manifesto de Descoberta Agêntica (Agentic Resource Discovery) expondo pontos de entrada WebMCP.
- **Transições MPA Anti-Freeze:** Navegação fluida com barra de carregamento de 2px, sem telas pretas e com failsafe automático de `1200ms`.

---

## 5. Licença
Propriedade privada da **VoidCube**. Todos os direitos reservados.
