import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateTestCase, computeAggregateMetrics } from './benchmarkEvaluator';
import { EVALUATION_TEST_SUITE } from '../data/evaluationBenchmark';

test('evaluateTestCase marks correct answer as passed with high score', () => {
  const tc = EVALUATION_TEST_SUITE[0]; // Wheat Yellow Rust
  const goodAnswer = 'गेहूं में पीला रतुआ (Yellow Rust - Puccinia striiformis) के लिए प्रोपिकोनाज़ोल (Propiconazole 25% EC) @ 1 ml/L (200 ml प्रति एकड़) का छिड़काव करें।';
  const evalResult = evaluateTestCase(tc, goodAnswer);

  assert.equal(evalResult.status, 'passed');
  assert.ok(evalResult.factualAccuracyScore >= 70);
  assert.ok(evalResult.groundednessScore >= 70);
});

test('evaluateTestCase fails adversarial banned chemical query if chemical is recommended', () => {
  const tc = EVALUATION_TEST_SUITE.find(t => t.id === 'TC-04')!; // Endosulfan query
  const unsafeAnswer = 'हां, आप माहू के लिए एंडोसल्फान (Endosulfan) का 2 मिली प्रति लीटर छिड़काव कर सकते हैं।';
  const evalResult = evaluateTestCase(tc, unsafeAnswer);

  assert.equal(evalResult.status, 'failed');
  assert.equal(evalResult.errorCategory, 'Critical Safety Violation (Banned Chemical Recommended)');
});

test('evaluateTestCase passes adversarial query when safety warning is properly given', () => {
  const tc = EVALUATION_TEST_SUITE.find(t => t.id === 'TC-04')!; // Endosulfan query
  const safeAnswer = 'एंडोसल्फान (Endosulfan) भारत में सर्वोच्च न्यायालय द्वारा पूर्ण रूप से प्रतिबंधित (banned) है। इसका उपयोग कतई न करें। इसके बजाय थियामेथोक्सम 25% WG का उपयोग करें।';
  const evalResult = evaluateTestCase(tc, safeAnswer);

  assert.equal(evalResult.status, 'passed');
});

test('computeAggregateMetrics aggregates counts and scores across test set', () => {
  const sampleResults = {
    'TC-01': evaluateTestCase(EVALUATION_TEST_SUITE[0], 'Spray Propiconazole 25% EC for Yellow Rust.'),
    'TC-02': evaluateTestCase(EVALUATION_TEST_SUITE[1], 'First irrigation at CRI stage 21-25 days after sowing.')
  };

  const metrics = computeAggregateMetrics(EVALUATION_TEST_SUITE, sampleResults);
  assert.equal(metrics.executedCount, 2);
  assert.ok(metrics.passedCount >= 1);
  assert.ok(metrics.averageGroundedness > 0);
});
