import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  commercialDependencies,
  engagementPlans,
  solutionModules,
  type CommercialDependencyId,
} from '../../src/shared/catalog/commercialDependencies.ts';
import {
  buildArdManifest,
  buildLlmsTxt,
} from '../../src/shared/discovery/agentDiscovery.ts';

describe('VOID-23 Commercial Dependencies & Agent Discovery', () => {
  it('mapeia integralmente todas as dependências comerciais COM-01 a COM-06', () => {
    const codes: CommercialDependencyId[] = ['COM-01', 'COM-02', 'COM-03', 'COM-04', 'COM-05', 'COM-06'];
    assert.deepEqual(Object.keys(commercialDependencies), codes);

    for (const code of codes) {
      const dep = commercialDependencies[code];
      assert.equal(dep.status, 'pending_commercial');
      assert.ok(dep.placeholderNote.length > 10);
    }
  });

  it('garante que nenhum plano ou módulo inventa valores monetários não aprovados (COM-04)', () => {
    const currencyRegex = /(?:R\$|US\$|\$|€)\s*\d+/i;

    for (const plan of engagementPlans) {
      assert.equal(
        currencyRegex.test(plan.pricingStatusLabel),
        false,
        `Plano ${plan.id} contém preço fixo não aprovado: ${plan.pricingStatusLabel}`,
      );
    }

    for (const mod of solutionModules) {
      assert.equal(currencyRegex.test(mod.description), false);
      assert.equal(mod.commercialDependencyId, 'COM-01');
    }
  });

  it('gera /llms.txt e /.well-known/ard.json consistentes com o catálogo e rotas', () => {
    const origin = 'https://periphelion.app';
    const llms = buildLlmsTxt(origin);
    assert.ok(llms.includes('Periphelion'));
    assert.ok(llms.includes(`${origin}/produtos`));

    const ard = buildArdManifest(origin);
    assert.equal(ard['@context'], 'https://agenticresourcediscovery.org/ns/v1');
    assert.equal(ard.documentationUrl, `${origin}/llms.txt`);
    assert.ok(ard.entries.length >= 2);
  });
});
