"use client";

/**
 * Spiritual Guide Memory — Accumulates spiritual context for AI personalization
 * Tracks: prayer patterns, favorite scriptures, spiritual challenges,
 * devotional history, reading plan progress, journal themes.
 */

const MEMORY_KEY = "bible_ai_spiritual_memory";

export interface SpiritualMemory {
  prayerPatterns: PrayerPattern[];
  favoriteScriptures: string[];
  spiritualChallenges: string[];
  devotionalHistory: DevotionalRecord[];
  readingPlanProgress: ReadingProgress[];
  journalThemes: JournalTheme[];
  lastUpdated: string;
}

export interface PrayerPattern {
  category: string;
  frequency: number;
  lastPrayed: string;
  themes: string[];
}

export interface DevotionalRecord {
  date: string;
  title: string;
  theme: string;
  scriptureReference: string;
}

export interface ReadingProgress {
  planId: string;
  planTitle: string;
  currentDay: number;
  totalDays: number;
  lastRead: string;
}

export interface JournalTheme {
  theme: string;
  frequency: number;
  lastMentioned: string;
  mood: string;
}

function getDefaultMemory(): SpiritualMemory {
  return {
    prayerPatterns: [],
    favoriteScriptures: [],
    spiritualChallenges: [],
    devotionalHistory: [],
    readingPlanProgress: [],
    journalThemes: [],
    lastUpdated: new Date().toISOString(),
  };
}

export function getSpiritualMemory(): SpiritualMemory {
  if (typeof window === "undefined") return getDefaultMemory();
  const stored = localStorage.getItem(MEMORY_KEY);
  if (!stored) return getDefaultMemory();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultMemory();
  }
}

function saveMemory(memory: SpiritualMemory): void {
  if (typeof window === "undefined") return;
  memory.lastUpdated = new Date().toISOString();
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

export function trackPrayerPattern(category: string, themes: string[]): void {
  const memory = getSpiritualMemory();
  const existing = memory.prayerPatterns.find((p) => p.category === category);
  if (existing) {
    existing.frequency += 1;
    existing.lastPrayed = new Date().toISOString();
    existing.themes = Array.from(new Set([...existing.themes, ...themes])).slice(0, 10);
  } else {
    memory.prayerPatterns.push({
      category,
      frequency: 1,
      lastPrayed: new Date().toISOString(),
      themes,
    });
  }
  saveMemory(memory);
}

export function trackFavoriteScripture(reference: string): void {
  const memory = getSpiritualMemory();
  if (!memory.favoriteScriptures.includes(reference)) {
    memory.favoriteScriptures = [reference, ...memory.favoriteScriptures].slice(0, 20);
    saveMemory(memory);
  }
}

export function trackSpiritualChallenge(challenge: string): void {
  const memory = getSpiritualMemory();
  if (!memory.spiritualChallenges.includes(challenge)) {
    memory.spiritualChallenges = [challenge, ...memory.spiritualChallenges].slice(0, 10);
    saveMemory(memory);
  }
}

export function trackDevotionalCompletion(title: string, theme: string, scriptureReference: string): void {
  const memory = getSpiritualMemory();
  memory.devotionalHistory = [
    {
      date: new Date().toISOString(),
      title,
      theme,
      scriptureReference,
    },
    ...memory.devotionalHistory,
  ].slice(0, 30);
  saveMemory(memory);
}

export function trackReadingProgress(planId: string, planTitle: string, currentDay: number, totalDays: number): void {
  const memory = getSpiritualMemory();
  const existing = memory.readingPlanProgress.find((p) => p.planId === planId);
  if (existing) {
    existing.currentDay = currentDay;
    existing.lastRead = new Date().toISOString();
  } else {
    memory.readingPlanProgress.push({
      planId,
      planTitle,
      currentDay,
      totalDays,
      lastRead: new Date().toISOString(),
    });
  }
  saveMemory(memory);
}

export function trackJournalTheme(theme: string, mood: string): void {
  const memory = getSpiritualMemory();
  const existing = memory.journalThemes.find((t) => t.theme === theme);
  if (existing) {
    existing.frequency += 1;
    existing.lastMentioned = new Date().toISOString();
    existing.mood = mood;
  } else {
    memory.journalThemes = [
      { theme, frequency: 1, lastMentioned: new Date().toISOString(), mood },
      ...memory.journalThemes,
    ].slice(0, 20);
  }
  saveMemory(memory);
}

/** Build a context string for AI prompts from accumulated memory */
export function buildSpiritualContext(): string {
  const memory = getSpiritualMemory();
  const parts: string[] = [];

  if (memory.prayerPatterns.length > 0) {
    const topPatterns = memory.prayerPatterns
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);
    parts.push(
      `PRAYER PATTERNS: The user frequently prays about: ${topPatterns
        .map((p) => `${p.category} (${p.frequency} times, themes: ${p.themes.join(", ")})`)
        .join("; ")}.`
    );
  }

  if (memory.favoriteScriptures.length > 0) {
    parts.push(
      `FAVORITE SCRIPTURES: ${memory.favoriteScriptures.slice(0, 5).join(", ")}.`
    );
  }

  if (memory.spiritualChallenges.length > 0) {
    parts.push(
      `SPIRITUAL CHALLENGES: The user has been working through: ${memory.spiritualChallenges.slice(0, 5).join(", ")}.`
    );
  }

  if (memory.devotionalHistory.length > 0) {
    const recentThemes = Array.from(new Set(memory.devotionalHistory.slice(0, 10).map((d) => d.theme)));
    parts.push(
      `RECENT DEVOTIONAL THEMES: ${recentThemes.join(", ")}.`
    );
  }

  if (memory.readingPlanProgress.length > 0) {
    parts.push(
      `READING PLAN PROGRESS: ${memory.readingPlanProgress
        .map((p) => `${p.planTitle}: Day ${p.currentDay}/${p.totalDays}`)
        .join("; ")}.`
    );
  }

  if (memory.journalThemes.length > 0) {
    const topThemes = memory.journalThemes
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);
    parts.push(
      `JOURNAL THEMES: The user frequently writes about: ${topThemes
        .map((t) => `${t.theme} (mood: ${t.mood})`)
        .join(", ")}.`
    );
  }

  if (parts.length === 0) {
    return "This is a new user. No spiritual history available yet. Be welcoming and introductory.";
  }

  return `SPIRITUAL MEMORY (use this to personalize your response):\n${parts.join("\n")}`;
}
