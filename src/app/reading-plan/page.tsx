"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  BookMarked,
  Check,
  ChevronDown,
  ChevronRight,
  Flame,
  ArrowRight,
  Calendar,
  Clock,
  Target,
  Trophy,
  Scroll,
  BookText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  READING_PLANS_DATA,
  getProgress,
  toggleDay,
  calculateStreak,
  getEstimatedCompletion,
} from "@/data/reading-plans";
import type { ReadingPlanData, ReadingPlanProgress } from "@/data/reading-plans";

function PlanIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "scroll":
      return <Scroll className={className} />;
    case "bible":
      return <BookText className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

function PlanColorClasses(color: string) {
  switch (color) {
    case "emerald":
      return {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-400",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        progress: "from-emerald-400 to-emerald-500",
        glow: "shadow-emerald-500/10",
        dot: "bg-emerald-400",
        hover: "hover:bg-emerald-500/10",
      };
    case "blue":
      return {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-400",
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        progress: "from-blue-400 to-blue-500",
        glow: "shadow-blue-500/10",
        dot: "bg-blue-400",
        hover: "hover:bg-blue-500/10",
      };
    case "amber":
    default:
      return {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-400",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        progress: "from-amber-400 to-amber-500",
        glow: "shadow-amber-500/10",
        dot: "bg-amber-400",
        hover: "hover:bg-amber-500/10",
      };
  }
}

interface PlanCardProps {
  plan: ReadingPlanData;
  onSelect: (planId: string) => void;
}

function PlanCard({ plan, onSelect }: PlanCardProps) {
  const [progress, setProgress] = useState<ReadingPlanProgress | null>(null);
  const colors = PlanColorClasses(plan.color);

  useEffect(() => {
    setProgress(getProgress(plan.id));
  }, [plan.id]);

  const completedCount = progress?.completedDays.length || 0;
  const percentComplete = Math.round((completedCount / plan.totalDays) * 100);
  const streak = progress ? calculateStreak(progress.completedDays) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`bg-white/[0.04] border-white/[0.08] backdrop-blur-sm overflow-hidden cursor-pointer group hover:bg-white/[0.06] transition-all shadow-xl ${colors.glow}`}
        onClick={() => onSelect(plan.id)}
      >
        <div className={`h-1 bg-gradient-to-r ${colors.progress}`} />
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
              <PlanIcon icon={plan.icon} className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`${colors.badge} text-[10px]`}>
                  {plan.category}
                </Badge>
                {completedCount > 0 && (
                  <Badge className="bg-white/10 text-white/50 border-white/10 text-[10px]">
                    {percentComplete}% complete
                  </Badge>
                )}
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                {plan.title}
              </h3>
              <p className="text-white/40 text-sm mb-3">{plan.subtitle}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{plan.description}</p>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {plan.totalDays} days
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{plan.estimatedMinutes} min/day
                </span>
                {streak > 0 && (
                  <span className="flex items-center gap-1 text-amber-400/70">
                    <Flame className="w-3 h-3" />
                    {streak}-day streak
                  </span>
                )}
              </div>

              {/* Progress bar */}
              {completedCount > 0 && (
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-white/40">
                      {completedCount} of {plan.totalDays} days
                    </span>
                    <span className={`text-xs font-medium ${colors.text}`}>
                      {percentComplete}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${colors.progress} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentComplete}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${colors.progress} text-white font-semibold shadow-lg`}
                >
                  {completedCount > 0 ? "Continue" : "Start Plan"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface PlanDetailProps {
  plan: ReadingPlanData;
  onBack: () => void;
}

function PlanDetail({ plan, onBack }: PlanDetailProps) {
  const [progress, setProgress] = useState<ReadingPlanProgress | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const colors = PlanColorClasses(plan.color);

  useEffect(() => {
    setProgress(getProgress(plan.id));
  }, [plan.id]);

  const handleToggleDay = useCallback(
    (day: number) => {
      const updated = toggleDay(plan.id, day);
      setProgress({ ...updated });
    },
    [plan.id]
  );

  const completedCount = progress?.completedDays.length || 0;
  const percentComplete = Math.round((completedCount / plan.totalDays) * 100);
  const streak = progress ? calculateStreak(progress.completedDays) : 0;
  const estimatedCompletion = getEstimatedCompletion(plan.id, plan.totalDays);

  // Group days by week
  const weeks: { weekNum: number; days: typeof plan.days }[] = [];
  const totalWeeks = Math.ceil(plan.totalDays / 7);
  for (let w = 0; w < totalWeeks; w++) {
    const weekDays = plan.days.slice(w * 7, (w + 1) * 7);
    weeks.push({ weekNum: w + 1, days: weekDays });
  }

  // Auto-expand the current week
  useEffect(() => {
    if (progress && progress.completedDays.length > 0) {
      const lastCompleted = Math.max(...progress.completedDays);
      const currentWeek = Math.floor((lastCompleted - 1) / 7);
      setExpandedWeek(currentWeek);
    } else {
      setExpandedWeek(0);
    }
  }, [progress]);

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        All Reading Plans
      </button>

      {/* Plan header */}
      <Card className={`bg-white/[0.04] border-white/[0.08] backdrop-blur-sm overflow-hidden shadow-2xl ${colors.glow}`}>
        <div className={`h-1.5 bg-gradient-to-r ${colors.progress}`} />
        <CardContent className="pt-6 pb-6 px-6 sm:px-8">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
              <PlanIcon icon={plan.icon} className={`w-7 h-7 ${colors.text}`} />
            </div>
            <div>
              <Badge className={`${colors.badge} mb-2`}>{plan.category}</Badge>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {plan.title}
              </h2>
              <p className="text-white/40 text-sm mt-1">{plan.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/[0.03] rounded-xl p-3 text-center">
              <Target className={`w-5 h-5 ${colors.text} mx-auto mb-1`} />
              <p className="text-lg font-bold text-white">{percentComplete}%</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Complete</p>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3 text-center">
              <Check className={`w-5 h-5 ${colors.text} mx-auto mb-1`} />
              <p className="text-lg font-bold text-white">{completedCount}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Days Done</p>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3 text-center">
              <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{streak}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Day Streak</p>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3 text-center">
              <Calendar className={`w-5 h-5 ${colors.text} mx-auto mb-1`} />
              <p className="text-sm font-bold text-white">{estimatedCompletion || "Start today"}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Est. Completion</p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/50">
                {completedCount} of {plan.totalDays} days completed
              </span>
              <span className={`text-sm font-semibold ${colors.text}`}>
                {percentComplete}%
              </span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${colors.progress} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${percentComplete}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weeks accordion */}
      <div className="space-y-3">
        {weeks.map(({ weekNum, days }) => {
          const isExpanded = expandedWeek === weekNum - 1;
          const weekCompleted = days.filter((d) =>
            progress?.completedDays.includes(d.day)
          ).length;
          const weekTotal = days.length;
          const weekPercent = Math.round((weekCompleted / weekTotal) * 100);

          return (
            <Card
              key={weekNum}
              className="bg-white/[0.04] border-white/[0.08] backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : weekNum - 1)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      weekPercent === 100
                        ? `${colors.bg}`
                        : "bg-white/5"
                    }`}
                  >
                    {weekPercent === 100 ? (
                      <Trophy className={`w-4 h-4 ${colors.text}`} />
                    ) : (
                      <span className="text-xs font-semibold text-white/50">
                        {weekNum}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-white">
                      Week {weekNum}
                    </h3>
                    <p className="text-[11px] text-white/40">
                      {weekCompleted}/{weekTotal} days complete
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {weekPercent > 0 && weekPercent < 100 && (
                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className={`h-full bg-gradient-to-r ${colors.progress} rounded-full`}
                        style={{ width: `${weekPercent}%` }}
                      />
                    </div>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-white/30 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 space-y-2 border-t border-white/5 pt-3">
                      {days.map((day) => {
                        const isCompleted = progress?.completedDays.includes(day.day) || false;
                        return (
                          <motion.div
                            key={day.day}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (day.day % 7) * 0.05 }}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                              isCompleted
                                ? "bg-white/[0.03]"
                                : `bg-transparent ${colors.hover}`
                            }`}
                          >
                            <button
                              onClick={() => handleToggleDay(day.day)}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                isCompleted
                                  ? `${colors.bg} ${colors.border} ${colors.text}`
                                  : "border-white/20 hover:border-white/40"
                              }`}
                            >
                              {isCompleted && (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-xs font-medium ${isCompleted ? colors.text : "text-white/40"}`}>
                                  Day {day.day}
                                </span>
                                <span className={`font-serif text-sm font-semibold ${isCompleted ? "text-white/50 line-through" : "text-white/80"}`}>
                                  {day.title}
                                </span>
                              </div>
                              <p className="text-xs text-white/30">
                                {day.passages.join(" | ")}
                              </p>
                              {day.description && (
                                <p className="text-xs text-white/20 mt-1 leading-relaxed">
                                  {day.description}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function ReadingPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const activePlan = READING_PLANS_DATA.find((p) => p.id === selectedPlan) || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-lg font-bold text-white/90">Bible.ai</span>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-[#1a1a2e] hover:from-amber-500 hover:to-amber-600 font-semibold shadow-lg shadow-amber-500/20"
            >
              Sign Up Free
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {activePlan ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PlanDetail plan={activePlan} onBack={() => setSelectedPlan(null)} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 mb-3">
                    <BookMarked className="w-5 h-5 text-amber-400" />
                    <span className="text-sm text-white/50 uppercase tracking-widest">
                      Reading Plans
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                    Your Bible Reading Journey
                  </h1>
                  <p className="text-white/40 text-sm max-w-md mx-auto">
                    Choose a plan, track your daily progress, and build a habit of consistent time in Scripture.
                  </p>
                </motion.div>
              </div>

              {/* Plan Cards */}
              <div className="space-y-6">
                {READING_PLANS_DATA.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>

              {/* CTA */}
              <motion.div
                className="text-center mt-12 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-amber-500/[0.10] to-amber-400/[0.05] border-amber-400/[0.15] backdrop-blur-sm">
                  <CardContent className="py-8 px-6 sm:px-10 text-center">
                    <h3 className="text-xl font-serif font-bold text-white mb-2">
                      Want AI-Powered Commentary?
                    </h3>
                    <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
                      Sign up to unlock AI commentary for each day&apos;s reading, personalized reflections, and community discussion.
                    </p>
                    <Link href="/signup">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-amber-400 to-amber-500 text-[#1a1a2e] hover:from-amber-500 hover:to-amber-600 font-semibold shadow-lg shadow-amber-500/20"
                      >
                        Get Started Free
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/20 text-xs">
            &copy; 2026 Bible.ai. Made with love and reverence.
          </p>
        </div>
      </footer>
    </div>
  );
}
