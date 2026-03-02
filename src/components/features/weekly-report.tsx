"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Loader2, Sparkles, BookOpen, Heart, Brain, Target, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WeeklyReportData {
  devotionalsCompleted: number;
  prayersOffered: number;
  scripturesRead: number;
  versesMemorized: number;
  streakDays: number;
  growthInsight: string;
  recommendedFocus: string;
  encouragement: string;
  generatedAt: string;
}

const DEFAULT_REPORT: WeeklyReportData = {
  devotionalsCompleted: 5,
  prayersOffered: 14,
  scripturesRead: 12,
  versesMemorized: 2,
  streakDays: 7,
  growthInsight: "This week you showed remarkable consistency in your prayer life, especially in the areas of guidance and family. Your journal entries reveal a deepening trust in God's timing.",
  recommendedFocus: "Consider spending more time in the Psalms this week. Your recent prayers about peace and anxiety suggest the Psalms could be deeply nourishing for your soul right now.",
  encouragement: "You are further along than you think. The fact that you showed up every day this week — even when it was hard — is a testament to the work God is doing in your heart. Keep going, faithful one.",
  generatedAt: new Date().toISOString(),
};

export function WeeklyReport() {
  const [report, setReport] = useState<WeeklyReportData>(DEFAULT_REPORT);
  const [loading, setLoading] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/weekly-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ denomination: "nondenominational" }),
      });
      const data = await res.json();
      if (data.success) {
        setReport(data.report);
        setShowFull(true);
      }
    } catch {
      setShowFull(true);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Devotionals", value: report.devotionalsCompleted, icon: BookOpen, color: "text-blue-500 bg-blue-50" },
    { label: "Prayers", value: report.prayersOffered, icon: Heart, color: "text-red-500 bg-red-50" },
    { label: "Scriptures", value: report.scripturesRead, icon: BookOpen, color: "text-green-500 bg-green-50" },
    { label: "Memorized", value: report.versesMemorized, icon: Brain, color: "text-purple-500 bg-purple-50" },
  ];

  return (
    <Card className="border-accent-200/50 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-500" />
            Weekly Spiritual Report
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={generateReport} disabled={loading}>
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-1`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-lg font-bold text-primary">{stat.value}</p>
              <p className="text-[10px] text-warm-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {showFull ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* Growth Insight */}
            <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100/30">
              <p className="text-xs uppercase tracking-widest text-blue-600 font-medium mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Growth Insight
              </p>
              <p className="text-sm text-warm-600 leading-relaxed">{report.growthInsight}</p>
            </div>

            {/* Recommended Focus */}
            <div className="bg-green-50/50 rounded-xl p-3 border border-green-100/30">
              <p className="text-xs uppercase tracking-widest text-green-600 font-medium mb-1.5 flex items-center gap-1">
                <Target className="w-3 h-3" />
                Focus for Next Week
              </p>
              <p className="text-sm text-warm-600 leading-relaxed">{report.recommendedFocus}</p>
            </div>

            {/* Encouragement */}
            <div className="bg-accent-50/50 rounded-xl p-3 border border-accent-100/30">
              <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-1.5 flex items-center gap-1">
                <Heart className="w-3 h-3" />
                Encouragement
              </p>
              <p className="text-sm text-warm-600 leading-relaxed italic font-serif">{report.encouragement}</p>
            </div>
          </motion.div>
        ) : (
          <Button variant="gold" className="w-full" onClick={generateReport} disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Generate Full Report
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
