"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Sparkles, BookOpen, Heart, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const INSIGHTS_KEY = "bible_ai_prayer_insights";

interface PrayerInsight {
  theme: string;
  count: number;
  color: string;
  scripture: string;
  scriptureText: string;
  message: string;
}

const DEFAULT_INSIGHTS: PrayerInsight[] = [
  {
    theme: "Guidance",
    count: 12,
    color: "bg-blue-100 text-blue-700",
    scripture: "Proverbs 3:5-6",
    scriptureText: "Trust in the Lord with all your heart and lean not on your own understanding.",
    message: "You have been seeking direction frequently. God hears your desire for clarity.",
  },
  {
    theme: "Health",
    count: 8,
    color: "bg-red-100 text-red-700",
    scripture: "Jeremiah 17:14",
    scriptureText: "Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.",
    message: "Your prayers for healing show deep compassion. The Great Physician is listening.",
  },
  {
    theme: "Relationships",
    count: 6,
    color: "bg-purple-100 text-purple-700",
    scripture: "Colossians 3:14",
    scriptureText: "And over all these virtues put on love, which binds them all together in perfect unity.",
    message: "You care deeply about your relationships. Love is the thread that holds them together.",
  },
  {
    theme: "Gratitude",
    count: 5,
    color: "bg-green-100 text-green-700",
    scripture: "1 Thessalonians 5:18",
    scriptureText: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    message: "Your heart of gratitude is beautiful. Thankfulness opens doors to deeper joy.",
  },
];

function getInsights(): PrayerInsight[] {
  if (typeof window === "undefined") return DEFAULT_INSIGHTS;
  const stored = localStorage.getItem(INSIGHTS_KEY);
  if (!stored) return DEFAULT_INSIGHTS;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_INSIGHTS;
  }
}

export function PrayerInsights() {
  const [insights, setInsights] = useState<PrayerInsight[]>(DEFAULT_INSIGHTS);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setInsights(getInsights());
  }, []);

  const refreshInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/prayer-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prayers: insights.map((i) => ({ category: i.theme.toLowerCase(), count: i.count })),
          denomination: "nondenominational",
        }),
      });
      const data = await res.json();
      if (data.success && data.insights) {
        setInsights(data.insights);
        if (typeof window !== "undefined") {
          localStorage.setItem(INSIGHTS_KEY, JSON.stringify(data.insights));
        }
      }
    } catch {
      // Keep current insights on error
    } finally {
      setLoading(false);
    }
  };

  const totalPrayers = insights.reduce((sum, i) => sum + i.count, 0);

  return (
    <Card className="border-accent-200/50 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            Prayer Insights
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshInsights} disabled={loading}>
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-warm-400">AI analysis of your prayer patterns</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Summary */}
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="accent">{totalPrayers} prayers analyzed</Badge>
          <Badge variant="outline">{insights.length} themes found</Badge>
        </div>

        {/* Theme Bars */}
        {insights.map((insight, i) => (
          <motion.div
            key={insight.theme}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <button
              onClick={() => setExpanded(expanded === insight.theme ? null : insight.theme)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Badge className={`${insight.color} text-[10px]`}>{insight.theme}</Badge>
                  <span className="text-xs text-warm-400">{insight.count} prayers</span>
                </div>
                <div className="w-24 h-2 bg-warm-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(insight.count / totalPrayers) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                  />
                </div>
              </div>
            </button>

            {expanded === insight.theme && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-2 mt-2 mb-3 space-y-2"
              >
                <p className="text-xs text-warm-600 leading-relaxed flex items-start gap-1.5">
                  <Sparkles className="w-3 h-3 text-accent-500 mt-0.5 flex-shrink-0" />
                  {insight.message}
                </p>
                <div className="bg-primary-50/50 rounded-lg p-3 border border-primary-100/30">
                  <p className="text-[10px] uppercase tracking-widest text-primary font-medium mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Scripture for You
                  </p>
                  <p className="text-xs font-serif font-semibold text-primary">{insight.scripture}</p>
                  <p className="text-xs text-warm-600 italic mt-1">&ldquo;{insight.scriptureText}&rdquo;</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        <div className="pt-2 border-t border-warm-50">
          <p className="text-[10px] text-warm-300 italic flex items-center gap-1">
            <Heart className="w-3 h-3" />
            God hears every prayer. Your patterns reveal His work in your heart.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
