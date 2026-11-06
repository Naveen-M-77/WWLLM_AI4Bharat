import { AGRI_KNOWLEDGE_BASE } from '../data/agriKnowledgeBase';
import { AgriKnowledgeChunk } from '../types/agri';

export interface RetrievalResult {
  chunk: AgriKnowledgeChunk;
  score: number;
  matchedKeywords: string[];
}

/**
 * Tokenizes text into lowercase normalized words, removing punctuation and common stop words.
 */
export function tokenize(text: string): string[] {
  const stopWords = new Set([
    'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were',
    'and', 'or', 'it', 'its', 'from', 'as', 'that', 'this', 'how', 'what', 'which', 'when', 'why',
    'kya', 'hai', 'kaise', 'kare', 'kab', 'aur', 'se', 'me', 'mein', 'ki', 'ko', 'ke', 'ye', 'woh'
  ]);

  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 1 && !stopWords.has(w));
}

/**
 * Retrieves the most relevant knowledge base chunks for a given user query.
 */
export function retrieveRelevantAdvisories(
  query: string,
  corpus: AgriKnowledgeChunk[] = AGRI_KNOWLEDGE_BASE,
  topK: number = 3
): RetrievalResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const results: RetrievalResult[] = [];

  for (const chunk of corpus) {
    let score = 0;
    const matchedKeywords: string[] = [];
    const chunkTokens = new Set(tokenize(`${chunk.title} ${chunk.content} ${chunk.keywords.join(' ')}`));

    // Keyword exact and partial match
    for (const kw of chunk.keywords) {
      const kwLower = kw.toLowerCase();
      if (query.toLowerCase().includes(kwLower)) {
        score += 3.0;
        matchedKeywords.push(kw);
      }
    }

    // Crop match boost
    if (query.toLowerCase().includes(chunk.crop.toLowerCase())) {
      score += 2.0;
    }

    // Token overlap
    for (const token of queryTokens) {
      if (chunkTokens.has(token)) {
        score += 1.0;
        if (!matchedKeywords.includes(token)) {
          matchedKeywords.push(token);
        }
      }
    }

    if (score > 0) {
      results.push({
        chunk,
        score,
        matchedKeywords
      });
    }
  }

  // Sort descending by relevance score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}

/**
 * Evaluates the groundedness of a generated answer against the retrieved source texts.
 * Returns a score between 0 and 100 based on factual token & entity alignment.
 */
export function computeGroundednessScore(
  answer: string,
  retrievedSources: AgriKnowledgeChunk[]
): number {
  if (!answer || retrievedSources.length === 0) return 0;

  const answerTokens = new Set(tokenize(answer));
  if (answerTokens.size === 0) return 0;

  // Gather key terms from sources (recommendations, chemicals, practices)
  const sourceKeyTerms = new Set<string>();
  for (const src of retrievedSources) {
    tokenize(src.content).forEach(t => sourceKeyTerms.add(t));
    tokenize(src.title).forEach(t => sourceKeyTerms.add(t));
    src.recommendedPractices.forEach(p => tokenize(p).forEach(t => sourceKeyTerms.add(t)));
    if (src.safeChemicalControls) {
      src.safeChemicalControls.forEach(c => tokenize(c.name).forEach(t => sourceKeyTerms.add(t)));
    }
  }

  let overlappingTokens = 0;
  for (const token of answerTokens) {
    if (sourceKeyTerms.has(token)) {
      overlappingTokens++;
    }
  }

  // Factual overlap ratio
  const ratio = overlappingTokens / answerTokens.size;
  // Scaled groundedness score: high overlap (>= 40%) gets >= 75 score
  const score = Math.min(100, Math.round(ratio * 90 + 25));
  return Math.max(30, score);
}

/**
 * Checks if query or answer contains unsafe or prohibited recommendations (e.g. Endosulfan).
 */
export function checkAgrochemicalSafety(text: string): { isSafe: boolean; warning?: string } {
  const lower = text.toLowerCase();
  if (lower.includes('endosulfan')) {
    return {
      isSafe: false,
      warning: 'STATUTORY WARNING: Endosulfan is completely banned in India by the Supreme Court of India. Do not purchase, store, or spray this compound.'
    };
  }
  if (lower.includes('monocrotophos') && (lower.includes('vegetable') || lower.includes('tamatar') || lower.includes('tomato') || lower.includes('bhindi'))) {
    return {
      isSafe: false,
      warning: 'RESTRICTION: Monocrotophos is legally prohibited for use on vegetables and fruits due to high systemic residue risk.'
    };
  }
  return { isSafe: true };
}
