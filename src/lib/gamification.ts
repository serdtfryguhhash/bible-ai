"use client";

/**
 * Gamification System — XP, Levels, Achievements, Badges
 */

const GAMIFICATION_KEY = "bible_ai_gamification";

export interface GamificationData {
  xp: number;
  level: string;
  levelNumber: number;
  achievements: Achievement[];
  booksCompleted: string[];
  totalPrayers: number;
  totalJournalEntries: number;
  totalVersesMemorized: number;
  totalDevotionals: number;
  biblePercentRead: number;
  chaptersRead: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: "reading" | "prayer" | "journal" | "memorization" | "streak" | "community";
}

export const XP_LEVELS = [
  { name: "Seeker", min: 0, max: 199 },
  { name: "Disciple", min: 200, max: 599 },
  { name: "Faithful", min: 600, max: 1499 },
  { name: "Elder", min: 1500, max: 3999 },
  { name: "Saint", min: 4000, max: Infinity },
] as const;

export const ACHIEVEMENT_DEFINITIONS = [
  { id: "genesis-complete", title: "Genesis Complete", description: "Finished reading the book of Genesis", icon: "📖", category: "reading" as const, requirement: "Complete Genesis" },
  { id: "psalms-scholar", title: "Psalms Scholar", description: "Completed all 150 Psalms", icon: "🎵", category: "reading" as const, requirement: "Complete Psalms" },
  { id: "new-testament", title: "New Testament", description: "Read the entire New Testament", icon: "✝️", category: "reading" as const, requirement: "Complete New Testament" },
  { id: "whole-bible", title: "Whole Bible Reader", description: "Read the entire Bible cover to cover", icon: "👑", category: "reading" as const, requirement: "Complete entire Bible" },
  { id: "prayer-warrior", title: "Prayer Warrior", description: "Offered 100 prayers to God", icon: "⚔️", category: "prayer" as const, requirement: "100 prayers" },
  { id: "faithful-journaler", title: "Faithful Journaler", description: "Written 30 journal entries", icon: "📝", category: "journal" as const, requirement: "30 journal entries" },
  { id: "memory-master", title: "Memory Master", description: "Memorized 10 Bible verses", icon: "🧠", category: "memorization" as const, requirement: "10 verses memorized" },
  { id: "seven-day-streak", title: "Faithful Week", description: "7-day devotion streak", icon: "🔥", category: "streak" as const, requirement: "7-day streak" },
  { id: "thirty-day-streak", title: "Month of Faith", description: "30-day devotion streak", icon: "💎", category: "streak" as const, requirement: "30-day streak" },
  { id: "first-prayer", title: "First Prayer", description: "Offered your first prayer", icon: "🙏", category: "prayer" as const, requirement: "1 prayer" },
  { id: "first-journal", title: "First Entry", description: "Wrote your first journal entry", icon: "✍️", category: "journal" as const, requirement: "1 journal entry" },
  { id: "community-blessed", title: "Community Blessed", description: "Received 10 prayers from the community", icon: "💛", category: "community" as const, requirement: "10 community prayers" },
] as const;

export const XP_REWARDS = {
  prayer: 10,
  journal: 15,
  devotional: 20,
  scripture_read: 5,
  verse_memorized: 25,
  plan_day: 10,
  challenge_complete: 15,
  community_post: 10,
} as const;

function getDefaultGamification(): GamificationData {
  return {
    xp: 350,
    level: "Disciple",
    levelNumber: 2,
    achievements: [
      { id: "first-prayer", title: "First Prayer", description: "Offered your first prayer", icon: "🙏", unlockedAt: new Date(Date.now() - 604800000 * 4).toISOString(), category: "prayer" },
      { id: "first-journal", title: "First Entry", description: "Wrote your first journal entry", icon: "✍️", unlockedAt: new Date(Date.now() - 604800000 * 3).toISOString(), category: "journal" },
      { id: "seven-day-streak", title: "Faithful Week", description: "7-day devotion streak", icon: "🔥", unlockedAt: new Date(Date.now() - 604800000).toISOString(), category: "streak" },
    ],
    booksCompleted: [],
    totalPrayers: 47,
    totalJournalEntries: 12,
    totalVersesMemorized: 3,
    totalDevotionals: 18,
    biblePercentRead: 4.2,
    chaptersRead: ["Genesis 1", "Genesis 2", "Genesis 3", "Psalm 23", "Psalm 1", "John 1", "John 3", "Matthew 5", "Matthew 6", "Matthew 7", "Romans 8", "Philippians 4"],
  };
}

export function getGamification(): GamificationData {
  if (typeof window === "undefined") return getDefaultGamification();
  const stored = localStorage.getItem(GAMIFICATION_KEY);
  if (!stored) return getDefaultGamification();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultGamification();
  }
}

function saveGamification(data: GamificationData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data));
}

function calculateLevel(xp: number): { name: string; number: number } {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].min) {
      return { name: XP_LEVELS[i].name, number: i + 1 };
    }
  }
  return { name: "Seeker", number: 1 };
}

export function addXP(amount: number): GamificationData {
  const data = getGamification();
  data.xp += amount;
  const level = calculateLevel(data.xp);
  data.level = level.name;
  data.levelNumber = level.number;
  saveGamification(data);
  return data;
}

export function unlockAchievement(achievementId: string): GamificationData | null {
  const data = getGamification();
  if (data.achievements.find((a) => a.id === achievementId)) return null;
  const def = ACHIEVEMENT_DEFINITIONS.find((d) => d.id === achievementId);
  if (!def) return null;
  data.achievements.push({
    id: def.id,
    title: def.title,
    description: def.description,
    icon: def.icon,
    unlockedAt: new Date().toISOString(),
    category: def.category,
  });
  saveGamification(data);
  return data;
}

export function trackChapterRead(chapter: string): void {
  const data = getGamification();
  if (!data.chaptersRead.includes(chapter)) {
    data.chaptersRead.push(chapter);
    data.biblePercentRead = (data.chaptersRead.length / 1189) * 100;
    saveGamification(data);
  }
}

export function incrementStat(stat: "totalPrayers" | "totalJournalEntries" | "totalVersesMemorized" | "totalDevotionals"): void {
  const data = getGamification();
  data[stat] += 1;
  saveGamification(data);
}

export function getLevelProgress(xp: number): { current: number; nextLevel: number; percent: number } {
  const level = calculateLevel(xp);
  const currentLevelDef = XP_LEVELS.find((l) => l.name === level.name);
  const nextLevelIndex = XP_LEVELS.findIndex((l) => l.name === level.name) + 1;
  const nextLevelDef = nextLevelIndex < XP_LEVELS.length ? XP_LEVELS[nextLevelIndex] : null;

  if (!currentLevelDef || !nextLevelDef) {
    return { current: xp, nextLevel: xp, percent: 100 };
  }

  const progress = xp - currentLevelDef.min;
  const range = nextLevelDef.min - currentLevelDef.min;
  return { current: progress, nextLevel: range, percent: Math.min((progress / range) * 100, 100) };
}
