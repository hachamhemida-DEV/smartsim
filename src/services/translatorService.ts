/**
 * Translator Service — mock
 * Real endpoint: GET /api/v1/phrases?situation={situation}&lang={lang}
 */
import { MOCK } from "../constants";
import { simulateDelay } from "./mockDelay";
import { phrases } from "../data/phrases";
import type { PhraseEntry } from "../types/models";

export async function getPhrasesBySituation(
  situation: PhraseEntry["situation"]
): Promise<PhraseEntry[]> {
  if (MOCK) {
    await simulateDelay();
    return phrases.filter((p) => p.situation === situation);
  }
  throw new Error("Real API not implemented");
}

export async function getAllPhrases(): Promise<PhraseEntry[]> {
  if (MOCK) {
    await simulateDelay();
    return phrases;
  }
  throw new Error("Real API not implemented");
}

export async function searchPhrases(query: string): Promise<PhraseEntry[]> {
  if (MOCK) {
    await simulateDelay();
    const q = query.toLowerCase();
    return phrases.filter(
      (p) =>
        Object.values(p.source).some((v) => v.toLowerCase().includes(q)) ||
        Object.values(p.contextual).some((v) => v.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  throw new Error("Real API not implemented");
}
