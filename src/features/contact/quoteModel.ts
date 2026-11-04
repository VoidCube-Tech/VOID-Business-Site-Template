import {
  engagementPlans,
  solutionModules,
  type EngagementPlan,
  type SolutionModule,
} from '../../shared/catalog/commercialDependencies.ts';

export interface QuoteDraft {
  name: string;
  email: string;
  company: string;
  role: string;
  selectedModuleIds: string[];
  selectedPlanId: string;
  challenge: string;
}

export interface QuoteValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof QuoteDraft, string>>;
}

export function createInitialQuoteDraft(preselectedPlanId?: string, preselectedModuleId?: string): QuoteDraft {
  const validPlan = engagementPlans.find((plan) => plan.id === preselectedPlanId);
  const validModule = solutionModules.find((mod) => mod.id === preselectedModuleId);

  return {
    name: '',
    email: '',
    company: '',
    role: '',
    selectedModuleIds: validModule ? [validModule.id] : [solutionModules[0].id],
    selectedPlanId: validPlan ? validPlan.id : engagementPlans[1].id,
    challenge: '',
  };
}

export function toggleModuleSelection(currentIds: readonly string[], moduleId: string): string[] {
  const exists = currentIds.includes(moduleId);
  if (exists) {
    if (currentIds.length <= 1) {
      return [...currentIds];
    }
    return currentIds.filter((id) => id !== moduleId);
  }
  return [...currentIds, moduleId];
}

export function validateQuoteDraft(draft: QuoteDraft): QuoteValidationResult {
  const errors: Partial<Record<keyof QuoteDraft, string>> = {};

  if (!draft.name || draft.name.trim().length < 2) {
    errors.name = 'Informe seu nome completo.';
  }

  const emailTrimmed = (draft.email || '').trim();
  if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    errors.email = 'Informe um e-mail corporativo válido.';
  }

  if (!draft.company || draft.company.trim().length < 2) {
    errors.company = 'Informe o nome da sua empresa ou organização.';
  }

  if (!draft.selectedModuleIds || draft.selectedModuleIds.length === 0) {
    errors.selectedModuleIds = 'Selecione ao menos um módulo de solução.';
  }

  if (!draft.selectedPlanId || !engagementPlans.some((plan) => plan.id === draft.selectedPlanId)) {
    errors.selectedPlanId = 'Selecione uma modalidade de atendimento.';
  }

  if (!draft.challenge || draft.challenge.trim().length < 10) {
    errors.challenge = 'Descreva brevemente o contexto ou desafio técnico (mín. 10 caracteres).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function resolveSelectedModules(moduleIds: readonly string[]): SolutionModule[] {
  return solutionModules.filter((mod) => moduleIds.includes(mod.id));
}

export function resolveSelectedPlan(planId: string): EngagementPlan {
  return engagementPlans.find((plan) => plan.id === planId) ?? engagementPlans[1];
}

export function buildQuoteSummaryText(draft: QuoteDraft): string {
  const selectedModules = resolveSelectedModules(draft.selectedModuleIds);
  const selectedPlan = resolveSelectedPlan(draft.selectedPlanId);
  const moduleTitles = selectedModules.map((mod) => mod.title).join(', ');
  const isMultiModule = selectedModules.length > 1;

  const lines = [
    'SOLICITAÇÃO DE DIAGNÓSTICO ERP — PERIPHELION',
    '----------------------------------------------------------------',
    `Nome: ${draft.name.trim()}`,
    `E-mail Corporativo: ${draft.email.trim()}`,
    `Empresa: ${draft.company.trim()}${draft.role.trim() ? ` (${draft.role.trim()})` : ''}`,
    `Modalidade de Engajamento: ${selectedPlan.name} (${selectedPlan.engagementModelValue})`,
    `Módulos de Interesse (${selectedModules.length}): ${moduleTitles}`,
    isMultiModule
      ? 'Condição Modular [COM-05]: Combinação elegível para avaliação de benefício progressivo multi-módulo (sujeita à validação comercial).'
      : 'Condição Modular [COM-05]: Escopo de módulo único.',
    `Status Comercial [COM-04]: Cotação técnica sob consulta executiva (${selectedPlan.pricingStatusLabel}).`,
    '',
    'Contexto & Desafio Operacional:',
    draft.challenge.trim(),
  ];

  return lines.join('\n');
}

export function buildQuoteMailtoHref(draft: QuoteDraft, recipientEmail = 'contato@periphelion.app'): string {
  const subject = encodeURIComponent(
    `[Diagnóstico ERP] ${draft.company.trim() || 'Corporativo'} — ${resolveSelectedPlan(draft.selectedPlanId).name}`,
  );
  const body = encodeURIComponent(buildQuoteSummaryText(draft));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
