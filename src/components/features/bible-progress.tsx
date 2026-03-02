"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, BookOpen, Star, Lock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getGamification, getLevelProgress, ACHIEVEMENT_DEFINITIONS, XP_LEVELS, type GamificationData } from "@/lib/gamification";

export function BibleProgress() {
  const [data, setData] = useState<GamificationData | null>(null);

  useEffect(() => {
    setData(getGamification());
  }, []);

  if (!data) return null;

  const levelProgress = getLevelProgress(data.xp);
  const currentLevel = XP_LEVELS.find((l) => l.name === data.level);
  const nextLevelIndex = XP_LEVELS.findIndex((l) => l.name === data.level) + 1;
  const nextLevel = nextLevelIndex < XP_LEVELS.length ? XP_LEVELS[nextLevelIndex] : null;

  return (
    <div className="space-y-6">
      {/* XP and Level Card */}
      <Card className="border-accent-200/50 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-500" />
            Spiritual Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Level Display */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">{data.levelNumber}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif font-bold text-lg text-primary">{data.level}</span>
                <Badge variant="gold" className="text-[10px]">{data.xp} XP</Badge>
              </div>
              {nextLevel && (
                <>
                  <Progress value={levelProgress.percent} className="h-2 mb-1" />
                  <p className="text-[10px] text-warm-400">
                    {levelProgress.current} / {levelProgress.nextLevel} XP to {nextLevel.name}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Bible Read", value: `${data.biblePercentRead.toFixed(1)}%`, icon: BookOpen },
              { label: "Prayers", value: data.totalPrayers, icon: Star },
              { label: "Devotionals", value: data.totalDevotionals, icon: Award },
              { label: "Verses Memorized", value: data.totalVersesMemorized, icon: Trophy },
            ].map((stat) => (
              <div key={stat.label} className="bg-warm-50 rounded-lg p-3 text-center">
                <stat.icon className="w-4 h-4 text-accent-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-primary">{stat.value}</p>
                <p className="text-[10px] text-warm-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ACHIEVEMENT_DEFINITIONS.map((def, i) => {
              const unlocked = data.achievements.find((a) => a.id === def.id);
              return (
                <motion.div
                  key={def.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative rounded-xl p-3 text-center border transition-all ${
                    unlocked
                      ? "bg-accent-50/50 border-accent-200 shadow-sm"
                      : "bg-warm-50/50 border-warm-100 opacity-60"
                  }`}
                >
                  {!unlocked && (
                    <Lock className="w-3 h-3 text-warm-300 absolute top-2 right-2" />
                  )}
                  <span className="text-2xl block mb-1">{def.icon}</span>
                  <p className="text-xs font-semibold text-primary leading-tight">{def.title}</p>
                  <p className="text-[9px] text-warm-400 mt-0.5">{def.description}</p>
                  {unlocked && (
                    <p className="text-[8px] text-accent-600 mt-1">
                      {new Date(unlocked.unlockedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
