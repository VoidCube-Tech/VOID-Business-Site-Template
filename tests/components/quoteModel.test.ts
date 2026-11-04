import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildQuoteMailtoHref,
  buildQuoteSummaryText,
  createInitialQuoteDraft,
  toggleModuleSelection,
  validateQuoteDraft,
} from '../../src/features/contact/quoteModel.ts';

describe('Modular Quote Configurator State & Validation (COM-04 / COM-05 / COM-06)', () => {
  it('inicializa rascunho com valores padrão válidos e preserva ao menos 1 módulo', () => {
    const draft = createInitialQuoteDraft();
    assert.equal(draft.selectedModuleIds.length, 1);

    const afterAttemptRemoveLast = toggleModuleSelection(
      draft.selectedModuleIds,
      draft.selectedModuleIds[0],
    );
    assert.equal(
      afterAttemptRemoveLast.length,
      1,
      'Não deve permitir desmarcar o último módulo restante',
    );

    const withSecondModule = toggleModuleSelection(draft.selectedModuleIds, 'compliance-fiscal');
    assert.equal(withSecondModule.length, 2);
  });

  it('valida campos obrigatórios e gera resumo técnico com sinalização COM-04 e COM-05', () => {
    const invalidDraft = createInitialQuoteDraft();
    const invalidResult = validateQuoteDraft(invalidDraft);
    assert.equal(invalidResult.valid, false);
    assert.ok(invalidResult.errors.name);
    assert.ok(invalidResult.errors.email);
    assert.ok(invalidResult.errors.company);
    assert.ok(invalidResult.errors.challenge);

    const validDraft = {
      ...createInitialQuoteDraft('apogeu', 'gestao-financeira'),
      selectedModuleIds: ['gestao-financeira', 'compliance-fiscal'],
      name: 'Deyvid Kauã',
      email: 'deyvid@voidcode.tech',
      company: 'VoidCode Tech',
      role: 'Software Engineer',
      challenge: 'Implantação de módulo fiscal para Reforma Tributária e conciliação bancária Open Finance.',
    };

    const validResult = validateQuoteDraft(validDraft);
    assert.equal(validResult.valid, true);

    const summary = buildQuoteSummaryText(validDraft);
    assert.ok(summary.includes('Condição Modular [COM-05]: Combinação elegível'));
    assert.ok(summary.includes('Status Comercial [COM-04]: Cotação técnica sob consulta'));

    const mailto = buildQuoteMailtoHref(validDraft);
    assert.ok(mailto.startsWith('mailto:contato@periphelion.app?subject='));
  });
});
