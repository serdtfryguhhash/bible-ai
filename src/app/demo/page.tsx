"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Share2,
  Copy,
  Sun,
  Moon,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDailyDevotional, DAILY_DEVOTIONALS } from "@/data/devotionals";
import type { DailyDevotional } from "@/data/devotionals";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function formatDateLong(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DemoPage() {
  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    const daily = getDailyDevotional();
    setDevotional(daily);
    setDayIndex(DAILY_DEVOTIONALS.indexOf(daily));
  }, []);

  const goToDay = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (dayIndex - 1 + DAILY_DEVOTIONALS.length) % DAILY_DEVOTIONALS.length
        : (dayIndex + 1) % DAILY_DEVOTIONALS.length;
    setDayIndex(newIndex);
    setDevotional(DAILY_DEVOTIONALS[newIndex]);
    setShowQuestions(false);
    setExpandedQuestion(null);
    setLiked(false);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!devotional) return;
    navigator.clipboard.writeText(
      `"${devotional.verse.text}" - ${devotional.verse.reference}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!devotional) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
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
        {/* Greeting & Date */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-3">
            {new Date().getHours() < 17 ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-amber-400" />
            )}
            <span className="text-sm text-white/50 uppercase tracking-widest">
              Daily Devotional
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
            {getGreeting()}
          </h1>
          <p className="text-white/40 text-sm flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDateLong()}
          </p>
        </motion.div>

        {/* Day Navigation */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => goToDay("prev")}
            className="text-white/40 hover:text-white hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-1">
            Day {devotional.day} of 30
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => goToDay("next")}
            className="text-white/40 hover:text-white hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={devotional.day}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="space-y-6"
          >
            {/* Verse of the Day */}
            <Card className="bg-white/[0.04] border-white/[0.08] backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              <CardContent className="pt-8 pb-6 px-6 sm:px-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-amber-400/70 uppercase tracking-widest font-medium">
                      Verse of the Day
                    </p>
                    <p className="text-sm font-serif font-semibold text-amber-300">
                      {devotional.verse.reference}
                    </p>
                  </div>
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-white/90 italic pl-4 border-l-2 border-amber-400/30">
                  &ldquo;{devotional.verse.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2 mt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLiked(!liked)}
                    className={`rounded-full ${liked ? "text-red-400 hover:text-red-300" : "text-white/30 hover:text-white/60"} hover:bg-white/5`}
                  >
                    <Heart className={`w-4 h-4 mr-1.5 ${liked ? "fill-current" : ""}`} />
                    <span className="text-xs">{liked ? "Saved" : "Save"}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="rounded-full text-white/30 hover:text-white/60 hover:bg-white/5"
                  >
                    <Copy className="w-4 h-4 mr-1.5" />
                    <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-white/30 hover:text-white/60 hover:bg-white/5"
                  >
                    <Share2 className="w-4 h-4 mr-1.5" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Devotional Title */}
            <div className="text-center py-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {devotional.title}
              </h2>
            </div>

            {/* Reflection */}
            <Card className="bg-white/[0.04] border-white/[0.08] backdrop-blur-sm shadow-xl">
              <CardContent className="pt-6 pb-6 px-6 sm:px-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <p className="text-xs text-amber-400/70 uppercase tracking-widest font-medium">
                    Reflection
                  </p>
                </div>
                <p className="text-white/70 leading-[1.9] text-[15px]">
                  {devotional.reflection}
                </p>
              </CardContent>
            </Card>

            {/* Prayer Prompt */}
            <Card className="bg-gradient-to-br from-amber-500/[0.08] to-amber-400/[0.03] border-amber-400/[0.12] backdrop-blur-sm shadow-xl">
              <CardContent className="pt-6 pb-6 px-6 sm:px-10">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-amber-400" />
                  <p className="text-xs text-amber-400/70 uppercase tracking-widest font-medium">
                    Prayer
                  </p>
                </div>
                <p className="text-white/80 leading-[1.9] text-[15px] font-serif italic">
                  {devotional.prayerPrompt}
                </p>
              </CardContent>
            </Card>

            {/* Discussion Questions */}
            <Card className="bg-white/[0.04] border-white/[0.08] backdrop-blur-sm shadow-xl overflow-hidden">
              <CardContent className="pt-6 pb-6 px-6 sm:px-10">
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-amber-400" />
                    <p className="text-xs text-amber-400/70 uppercase tracking-widest font-medium">
                      Discussion Questions
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-white/30 transition-transform duration-300 ${
                      showQuestions ? "rotate-90" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showQuestions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 mt-5">
                        {devotional.discussionQuestions.map((question, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() =>
                              setExpandedQuestion(
                                expandedQuestion === i ? null : i
                              )
                            }
                            className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                              expandedQuestion === i
                                ? "bg-amber-500/10 border border-amber-400/20"
                                : "bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06]"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-amber-400">
                                  {i + 1}
                                </span>
                              </span>
                              <p
                                className={`text-sm leading-relaxed ${
                                  expandedQuestion === i
                                    ? "text-white/90"
                                    : "text-white/60"
                                }`}
                              >
                                {question}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Day Indicators */}
            <div className="flex items-center justify-center gap-1 py-4">
              {Array.from({ length: Math.min(30, DAILY_DEVOTIONALS.length) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDayIndex(i);
                    setDevotional(DAILY_DEVOTIONALS[i]);
                    setShowQuestions(false);
                    setExpandedQuestion(null);
                    setLiked(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === dayIndex
                      ? "w-6 bg-amber-400"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  aria-label={`Go to day ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-amber-500/[0.10] to-amber-400/[0.05] border-amber-400/[0.15] backdrop-blur-sm">
            <CardContent className="py-8 px-6 sm:px-10 text-center">
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Continue Your Journey
              </h3>
              <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
                Sign up free to unlock personalized AI devotionals based on your journal entries, prayer tracking, reading plans, and more.
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 to-amber-500 text-[#1a1a2e] hover:from-amber-500 hover:to-amber-600 font-semibold shadow-lg shadow-amber-500/20"
                >
                  Begin Your Journey - Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-white/30 text-xs mt-3">
                No credit card required
              </p>
            </CardContent>
          </Card>
        </motion.div>
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
