"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SCORE_LABELS = [
  { min: 0, max: 20, label: "Seed", color: "#A8A29E", emoji: "🌰" },
  { min: 21, max: 40, label: "Sprout", color: "#22C55E", emoji: "🌱" },
  { min: 41, max: 60, label: "Growing", color: "#3B82F6", emoji: "🌿" },
  { min: 61, max: 80, label: "Blooming", color: "#A855F7", emoji: "🌸" },
  { min: 81, max: 100, label: "Flourishing", color: "#D4A843", emoji: "🌳" },
] as const;

const DEVOTION_SCORE_KEY = "bible_ai_devotion_score";

interface DevotionData {
  prayerDates: string[];
  devotionalDates: string[];
  lastActive: string;
  gracePeriodUsed: boolean;
}

function getDevotionData(): DevotionData {
  if (typeof window === "undefined") {
    return { prayerDates: [], devotionalDates: [], lastActive: "", gracePeriodUsed: false };
  }
  const stored = localStorage.getItem(DEVOTION_SCORE_KEY);
  if (!stored) {
    const defaults: DevotionData = {
      prayerDates: Array.from({ length: 7 }, (_, i) =>
        new Date(Date.now() - 86400000 * i).toISOString().split("T")[0]
      ),
      devotionalDates: Array.from({ length: 5 }, (_, i) =>
        new Date(Date.now() - 86400000 * i).toISOString().split("T")[0]
      ),
      lastActive: new Date().toISOString().split("T")[0],
      gracePeriodUsed: false,
    };
    return defaults;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return { prayerDates: [], devotionalDates: [], lastActive: "", gracePeriodUsed: false };
  }
}

function calculateScore(data: DevotionData): number {
  const today = new Date();
  const last30Days: string[] = [];
  for (let i = 0; i < 30; i++) {
    last30Days.push(new Date(today.getTime() - 86400000 * i).toISOString().split("T")[0]);
  }
  const prayerDays = last30Days.filter((d) => data.prayerDates.includes(d)).length;
  const devotionalDays = last30Days.filter((d) => data.devotionalDates.includes(d)).length;
  const prayerScore = (prayerDays / 30) * 50;
  const devotionalScore = (devotionalDays / 30) * 50;
  return Math.round(Math.min(prayerScore + devotionalScore, 100));
}

function calculateStreak(data: DevotionData): number {
  const allDates = Array.from(new Set([...data.prayerDates, ...data.devotionalDates])).sort().reverse();
  if (allDates.length === 0) return 0;
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const twoDaysAgo = new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0];
  if (!allDates.includes(today) && !allDates.includes(yesterday)) {
    if (!allDates.includes(twoDaysAgo)) return 0;
  }
  let streak = 0;
  let checkDate = new Date(today);
  if (!allDates.includes(today)) {
    if (allDates.includes(yesterday)) {
      checkDate = new Date(yesterday);
    } else {
      return 0;
    }
  }
  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().split("T")[0];
    if (allDates.includes(dateStr)) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else {
      const prevStr = new Date(checkDate.getTime() - 86400000).toISOString().split("T")[0];
      if (allDates.includes(prevStr)) {
        checkDate = new Date(checkDate.getTime() - 86400000);
      } else {
        break;
      }
    }
  }
  return streak;
}

export function DevotionScore() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const data = getDevotionData();
    const s = calculateScore(data);
    const st = calculateStreak(data);
    setScore(s);
    setStreak(st);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= s) {
        setAnimatedScore(s);
        clearInterval(interval);
      } else {
        setAnimatedScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const scoreLabel = SCORE_LABELS.find(
    (l) => animatedScore >= l.min && animatedScore <= l.max
  ) || SCORE_LABELS[0];

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <Card className="border-accent-200/50 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent-500" />
          Devotion Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E7E5E4" strokeWidth="6" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none"
                stroke={scoreLabel.color} strokeWidth="6" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] as const }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-primary">{animatedScore}</span>
              <span className="text-[10px] text-warm-400">/ 100</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{scoreLabel.emoji}</span>
              <span className="font-serif font-semibold text-primary">{scoreLabel.label}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-warm-500">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{streak}-day streak</span>
            </div>
            <p className="text-xs text-warm-400">
              {score < 40 ? "Keep growing! Every prayer and devotional counts."
                : score < 70 ? "You are growing beautifully in your faith journey."
                : "Your faithfulness is inspiring! Keep flourishing."}
            </p>
            <p className="text-[10px] text-warm-300 italic">1-day grace period before streak breaks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
