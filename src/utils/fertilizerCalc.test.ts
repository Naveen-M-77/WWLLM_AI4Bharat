import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFertilizerRequirements, convertToAcres, CROP_NPK_DATABASE } from './fertilizerCalc';

test('convertToAcres converts units accurately', () => {
  assert.equal(convertToAcres(1, 'acre'), 1);
  assert.equal(convertToAcres(2, 'hectare'), 4.9421);
  assert.equal(convertToAcres(4, 'bigha'), 2.5);
  assert.equal(convertToAcres(0, 'acre'), 1); // fallback to 1 for zero/negative
});

test('calculateFertilizerRequirements computes correct bags for Wheat', () => {
  const result = calculateFertilizerRequirements({
    crop: 'wheat',
    area: 1,
    unit: 'acre',
    soilFertilityLevel: 'medium',
    organicManureApplied: false
  });

  // For 1 acre wheat: N=50, P=24, K=16
  // DAP = 24 / 0.46 = ~52.17 kg -> ~1.0 bag
  // N from DAP = 52.17 * 0.18 = 9.39 kg
  // Remaining N = 50 - 9.39 = 40.61 kg
  // Urea = 40.61 / 0.46 = 88.28 kg -> ~1.8 bags
  // MOP = 16 / 0.60 = 26.67 kg -> ~0.5 bag

  assert.equal(result.grossAreaAcres, 1);
  assert.equal(result.recommendedN_kg, 50);
  assert.equal(result.recommendedP_kg, 24);
  assert.equal(result.recommendedK_kg, 16);
  assert.equal(result.dapBags50kg, 1.0);
  assert.equal(result.ureaBags50kg, 1.8);
  assert.equal(result.mopBags50kg, 0.5);
  assert.equal(result.applicationSchedule.length, 3);
});

test('calculateFertilizerRequirements scales correctly with high soil fertility and FYM manure', () => {
  const standard = calculateFertilizerRequirements({
    crop: 'wheat',
    area: 2,
    unit: 'acre',
    soilFertilityLevel: 'medium',
    organicManureApplied: false
  });

  const reduced = calculateFertilizerRequirements({
    crop: 'wheat',
    area: 2,
    unit: 'acre',
    soilFertilityLevel: 'high',
    organicManureApplied: true
  });

  // High soil fertility (0.75) and organic manure (0.9) reduces total chemical requirement
  assert.ok(reduced.ureaBags50kg < standard.ureaBags50kg);
  assert.ok(reduced.dapBags50kg < standard.dapBags50kg);
  assert.ok(reduced.mopBags50kg < standard.mopBags50kg);
});

test('CROP_NPK_DATABASE contains all expected core crops', () => {
  const crops = Object.keys(CROP_NPK_DATABASE);
  assert.ok(crops.includes('wheat'));
  assert.ok(crops.includes('rice'));
  assert.ok(crops.includes('cotton'));
  assert.ok(crops.includes('sugarcane'));
  assert.ok(crops.includes('mustard'));
  assert.ok(crops.includes('tomato'));
});
