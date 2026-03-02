"use client";

/**
 * Spaced Repetition System for Bible Verse Memorization
 * Intervals: 1 day, 3 days, 7 days, 14 days, 30 days
 */

const MEMORIZE_KEY = "bible_ai_memorization";

export interface MemorizeVerse {
  id: string;
  reference: string;
  text: string;
  addedAt: string;
  lastReviewed: string | null;
  nextReview: string;
  interval: number;
  mastery: number;
  reviewCount: number;
}

const INTERVALS = [1, 3, 7, 14, 30] as const;

function getDefaultData(): MemorizeVerse[] {
  const today = new Date().toISOString().split("T")[0];
  return [
    {
      id: "mem-1",
      reference: "Philippians 4:13",
      text: "I can do all things through Christ who strengthens me.",
      addedAt: new Date(Date.now() - 604800000 * 2).toISOString(),
      lastReviewed: new Date(Date.now() - 86400000).toISOString(),
      nextReview: today,
      interval: 3,
      mastery: 40,
      reviewCount: 4,
    },
    {
      id: "mem-2",
      reference: "Jeremiah 29:11",
      text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      addedAt: new Date(Date.now() - 604800000).toISOString(),
      lastReviewed: new Date(Date.now() - 86400000 * 3).toISOString(),
      nextReview: today,
      interval: 1,
      mastery: 20,
      reviewCount: 2,
    },
    {
      id: "mem-3",
      reference: "Psalm 23:1",
      text: "The Lord is my shepherd; I shall not want.",
      addedAt: new Date(Date.now() - 604800000 * 4).toISOString(),
      lastReviewed: new Date(Date.now() - 86400000 * 7).toISOString(),
      nextReview: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
      interval: 14,
      mastery: 70,
      reviewCount: 8,
    },
  ];
}

export function getMemorizeVerses(): MemorizeVerse[] {
  if (typeof window === "undefined") return getDefaultData();
  const stored = localStorage.getItem(MEMORIZE_KEY);
  if (!stored) return getDefaultData();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultData();
  }
}

function saveVerses(verses: MemorizeVerse[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MEMORIZE_KEY, JSON.stringify(verses));
}

export function addVerse(reference: string, text: string): MemorizeVerse {
  const verses = getMemorizeVerses();
  const today = new Date().toISOString().split("T")[0];
  const newVerse: MemorizeVerse = {
    id: `mem-${Date.now()}`,
    reference,
    text,
    addedAt: new Date().toISOString(),
    lastReviewed: null,
    nextReview: today,
    interval: 1,
    mastery: 0,
    reviewCount: 0,
  };
  verses.push(newVerse);
  saveVerses(verses);
  return newVerse;
}

export function reviewVerse(id: string, correct: boolean): MemorizeVerse | null {
  const verses = getMemorizeVerses();
  const verse = verses.find((v) => v.id === id);
  if (!verse) return null;

  const today = new Date();
  verse.lastReviewed = today.toISOString();
  verse.reviewCount += 1;

  if (correct) {
    const currentIntervalIndex = INTERVALS.indexOf(verse.interval as typeof INTERVALS[number]);
    const nextIndex = Math.min(currentIntervalIndex + 1, INTERVALS.length - 1);
    verse.interval = INTERVALS[nextIndex];
    verse.mastery = Math.min(verse.mastery + 20, 100);
  } else {
    verse.interval = INTERVALS[0];
    verse.mastery = Math.max(verse.mastery - 10, 0);
  }

  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + verse.interval);
  verse.nextReview = nextDate.toISOString().split("T")[0];

  saveVerses(verses);
  return verse;
}

export function removeVerse(id: string): void {
  const verses = getMemorizeVerses().filter((v) => v.id !== id);
  saveVerses(verses);
}

export function getDueVerses(): MemorizeVerse[] {
  const today = new Date().toISOString().split("T")[0];
  return getMemorizeVerses().filter((v) => v.nextReview <= today);
}

export function getMasteredCount(): number {
  return getMemorizeVerses().filter((v) => v.mastery >= 80).length;
}

export function blankWords(text: string, difficulty: number): { display: string; blanks: string[] } {
  const words = text.split(" ");
  const totalBlanks = Math.max(1, Math.floor(words.length * (difficulty / 100)));
  const indices = new Set<number>();

  while (indices.size < totalBlanks && indices.size < words.length) {
    indices.add(Math.floor(Math.random() * words.length));
  }

  const blanks: string[] = [];
  const display = words
    .map((word, i) => {
      if (indices.has(i)) {
        blanks.push(word.replace(/[.,;:!?'"]/g, ""));
        return "_____";
      }
      return word;
    })
    .join(" ");

  return { display, blanks };
}
