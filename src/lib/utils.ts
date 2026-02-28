import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, format: "full" | "short" | "relative" = "full"): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (format === "relative") {
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }

  if (format === "short") {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "BIBLE-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function getMoodEmoji(mood: string): string {
  const moods: Record<string, string> = {
    grateful: "🙏",
    joyful: "✨",
    peaceful: "🕊️",
    struggling: "💪",
    seeking: "🔍",
    hopeful: "🌅",
    sorrowful: "💧",
    anxious: "🌊",
  };
  return moods[mood] || "📖";
}

export function getMoodLabel(mood: string): string {
  const labels: Record<string, string> = {
    grateful: "Grateful",
    joyful: "Joyful",
    peaceful: "Peaceful",
    struggling: "Struggling",
    seeking: "Seeking",
    hopeful: "Hopeful",
    sorrowful: "Sorrowful",
    anxious: "Anxious",
  };
  return labels[mood] || mood;
}

export function getPrayerCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    health: "Health & Healing",
    family: "Family",
    work: "Work & Career",
    relationships: "Relationships",
    spiritual_growth: "Spiritual Growth",
    financial: "Financial",
    guidance: "Guidance & Wisdom",
    gratitude: "Gratitude",
    world: "World & Community",
    other: "Other",
  };
  return labels[category] || category;
}

export function getPrayerCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    health: "❤️",
    family: "👨‍👩‍👧‍👦",
    work: "💼",
    relationships: "🤝",
    spiritual_growth: "🌱",
    financial: "💰",
    guidance: "🧭",
    gratitude: "🙌",
    world: "🌍",
    other: "✝️",
  };
  return icons[category] || "🙏";
}

export function getDenominationLabel(denomination: string): string {
  const labels: Record<string, string> = {
    catholic: "Catholic",
    protestant: "Protestant",
    nondenominational: "Non-Denominational",
    orthodox: "Orthodox",
  };
  return labels[denomination] || denomination;
}

export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = dates
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDate = new Date(sorted[0]);
  lastDate.setHours(0, 0, 0, 0);

  const diffFromToday = Math.floor(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffFromToday > 1) return 0;

  for (let i = 1; i < sorted.length; i++) {
    const current = new Date(sorted[i]);
    current.setHours(0, 0, 0, 0);
    const prev = new Date(sorted[i - 1]);
    prev.setHours(0, 0, 0, 0);

    const diff = Math.floor(
      (prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
