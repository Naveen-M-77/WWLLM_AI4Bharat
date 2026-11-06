import test from 'node:test';
import assert from 'node:assert/strict';
import { retrieveRelevantAdvisories, computeGroundednessScore, checkAgrochemicalSafety, tokenize } from './ragEngine';
import { AGRI_KNOWLEDGE_BASE } from '../data/agriKnowledgeBase';

test('tokenize extracts clean words and filters common stopwords', () => {
  const tokens = tokenize('How to control yellow rust in wheat crop?');
  assert.ok(tokens.includes('control'));
  assert.ok(tokens.includes('yellow'));
  assert.ok(tokens.includes('rust'));
  assert.ok(tokens.includes('wheat'));
  assert.ok(tokens.includes('crop'));
  assert.ok(!tokens.includes('how'));
  assert.ok(!tokens.includes('to'));
  assert.ok(!tokens.includes('in'));
});

test('retrieveRelevantAdvisories accurately matches wheat yellow rust query', () => {
  const results = retrieveRelevantAdvisories('What fungicide should I spray for yellow rust in wheat?', AGRI_KNOWLEDGE_BASE, 3);
  assert.ok(results.length > 0);
  assert.equal(results[0].chunk.id, 'kb_wheat_yellow_rust');
  assert.ok(results[0].score > 3);
});

test('retrieveRelevantAdvisories returns CRI irrigation bulletin for watering stage query', () => {
  const results = retrieveRelevantAdvisories('When should I give first irrigation to dwarf wheat?', AGRI_KNOWLEDGE_BASE, 3);
  assert.ok(results.length > 0);
  assert.equal(results[0].chunk.id, 'kb_wheat_cri_irrigation');
});

test('computeGroundednessScore yields high score when answer contains source entities', () => {
  const source = AGRI_KNOWLEDGE_BASE.find(c => c.id === 'kb_wheat_yellow_rust')!;
  const answer = 'For yellow rust in wheat, spray Propiconazole 25% EC at 1 ml per liter of water. Grow resistant varieties like DBW 187.';
  const score = computeGroundednessScore(answer, [source]);
  assert.ok(score >= 70, `Score was ${score}`);
});

test('checkAgrochemicalSafety catches banned chemicals like Endosulfan', () => {
  const safety1 = checkAgrochemicalSafety('Can I spray Endosulfan for bollworm?');
  assert.equal(safety1.isSafe, false);
  assert.ok(safety1.warning?.includes('Endosulfan is completely banned'));

  const safety2 = checkAgrochemicalSafety('Spray Emamectin Benzoate 5% SG for bollworm.');
  assert.equal(safety2.isSafe, true);
});
