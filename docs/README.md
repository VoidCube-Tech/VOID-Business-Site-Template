# Documentação de Arquitetura & Design System V2 — Periphelion ERP

Este diretório documenta o **Design System de Precisão Industrial & Editorial (V2)** do projeto **Periphelion**, unindo engenharia perceptual de cores (**OKLCH + HCT**), composição inspirada em **Tequs / Imagica**, pipeline de fotografia real (`C:\Users\dkaua\Pictures\Imagens para front`), **Defensive CSS** e transições anti-congelamento.

## Índice de Manuais

1. [**`FRONTEND_MASTER_BLUEPRINT.md`**](./FRONTEND_MASTER_BLUEPRINT.md)
   - Visão completa da árvore do projeto, stack tecnológica, regras contra estética artificial de IA e pipeline automático de imagens reais.
2. [**`DESIGN_SYSTEM_OKLCH_AND_EFFECTS.md`**](./DESIGN_SYSTEM_OKLCH_AND_EFFECTS.md)
   - Teoria e tabelas de tokens OKLCH + HCT (`Obsidiana Frio oklch(11% 0.008 260)`, `Branco-Osso Quente oklch(95% 0.008 85)`, `Cinza Técnico oklch(60% 0.01 260)` e `Laranja Sinalizador oklch(68% 0.18 45)` restrito a 2%–5%), Tipografia Bicolor e os 5 padrões composicionais (Navbar Cápsula Fumê, Split 50/50 com Filetes `1px`, Matriz Comparativa em Vidro Fumê, Split Invertido e Átrio Desfocado Real).
3. [**`DEFENSIVE_CSS_AND_RESPONSIVENESS.md`**](./DEFENSIVE_CSS_AND_RESPONSIVENESS.md)
   - As 5 Leis do Defensive CSS (`min-w-0`, `break-words`, `break-all`, escalonamento responsivo de 320px a 4K).
4. [**`MOTION_TRANSITIONS_AND_ANTI_FREEZE.md`**](./MOTION_TRANSITIONS_AND_ANTI_FREEZE.md)
   - Arquitetura de transição MPA sem congelamento (`#page-transition-veil`), failsafe de `1200ms` e alternância de tema com Circular Clip-Path Wipe.
