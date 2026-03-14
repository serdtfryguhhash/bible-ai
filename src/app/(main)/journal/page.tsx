"use client";
"use client";

import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine, Calendar, ChevronLeft, ChevronRight, Lock, Sparkles,
  Save, Clock, BookOpen, Search, Flame, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EncryptionIndicator } from "@/components/shared/EncryptionIndicator";
import { ScriptureCard } from "@/components/shared/ScriptureCard";
import { useJournal } from "@/hooks/useJournal";
import { getDailyVerse } from "@/constants/scripture";
import { formatDate, getMoodEmoji, wordCount } from "@/lib/utils";

const MOODS = [
  { value: "grateful", emoji: "🙏", label: "Grateful" },
  { value: "joyful", emoji: "✨", label: "Joyful" },
  { value: "peaceful", emoji: "🕊️", label: "Peaceful" },
  { value: "hopeful", emoji: "🌅", label: "Hopeful" },
  { value: "seeking", emoji: "🔍", label: "Seeking" },
  { value: "struggling", emoji: "💪", label: "Struggling" },
  { value: "sorrowful", emoji: "💧", label: "Sorrowful" },
  { value: "anxious", emoji: "🌊", label: "Anxious" },
] as const;

export default function JournalPage() {
  const { entries, isSaving, saveEntry, getDecryptedContent } = useJournal();
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showDevotional, setShowDevotional] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [generatedDevotional, setGeneratedDevotional] = useState<{
    title: string;
    scripture_reference: string;
    scripture_text: string;
    reflection: string;
    prayer_prompt: string;
    action_step: string;
  } | null>(null);

  const dailyVerse = getDailyVerse();
  const todayEntry = entries.find((e) => e.date === selectedDate);

  useEffect(() => {
    if (todayEntry) {
      setContent(getDecryptedContent(todayEntry));
      setSelectedMood(todayEntry.mood || "");
    } else {
      setContent("");
      setSelectedMood("");
    }
  }, [selectedDate, todayEntry, getDecryptedContent]);

  const handleSave = async () => {
    if (!content.trim()) return;
    await saveEntry(
      selectedDate,
      content,
      selectedMood as "grateful" | "joyful" | "peaceful" | "struggling" | "seeking" | "hopeful" | "sorrowful" | "anxious" | undefined,
      [],
      []
    );
  };

  const generateDevotional = async () => {
    if (!content.trim()) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2500));
    setGeneratedDevotional({
      title: "Finding Peace in the Storm",
      scripture_reference: "Philippians 4:6-7",
      scripture_text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      reflection: `Your words today reveal a heart that is both honest and seeking. You've shared your struggles openly, and that takes courage. God sees every word you've written, and He meets you right where you are - not where you think you should be.\n\nThe apostle Paul wrote these words from a prison cell, yet he spoke of peace and joy. His circumstances didn't change, but his perspective was transformed by the presence of God. Your situation may feel overwhelming right now, but remember: the same God who sustained Paul sustains you.\n\nThis isn't about pretending everything is fine. It's about bringing everything - the good, the hard, the confusing - to the One who already knows and already cares. Your journal entry today is itself an act of faith.`,
      prayer_prompt: "Lord, I bring You everything I wrote about today. You know my heart better than I do. Where I am anxious, bring Your peace. Where I am uncertain, be my guide. Help me to release what I cannot control and trust that You are working all things together for good. I choose to believe that Your plans for me are plans for hope and a future. In Jesus' name, Amen.",
      action_step: "Choose one worry from today's entry and write it on a small piece of paper. Then physically place it in your Bible at Philippians 4:6-7. Each time you see it, whisper a prayer of surrender. Let this tangible act remind you that God is holding what you've released.",
    });
    setShowDevotional(true);
    setIsGenerating(false);
  };

  const navigateDate = (direction: "prev" | "next") => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + (direction === "next" ? 1 : -1));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d <= today) {
      setSelectedDate(d.toISOString().split("T")[0]);
    }
  };

  const filteredEntries = entries.filter((e) => {
    if (!searchQuery) return true;
    const decrypted = getDecryptedContent(e);
    return decrypted.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <PenLine className="w-8 h-8 text-accent-500" />
              My Journal
            </h1>
            <p className="text-warm-500 mt-1">A safe space to pour out your heart before God.</p>
          </div>
          <div className="flex items-center gap-3">
            <EncryptionIndicator level="standard" />
            <div className="flex items-center gap-1.5 bg-accent-50 rounded-full px-3 py-1.5">
              <Flame className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-accent-700">7-day streak</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Navigator */}
            <Card className="border-accent-200/30">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent-500" />
                    <span className="font-serif font-semibold text-primary">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateDate("next")}
                    disabled={selectedDate === new Date().toISOString().split("T")[0]}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Daily Verse */}
            <ScriptureCard
              reference={dailyVerse.reference}
              text={dailyVerse.text}
              theme={dailyVerse.theme}
              showActions={false}
            />

            {/* Mood Selector */}
            <Card>
              <CardContent className="py-4">
                <p className="text-sm font-medium text-warm-600 mb-3">How are you feeling today?</p>
                <div className="flex flex-wrap gap-2">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value === selectedMood ? "" : mood.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedMood === mood.value
                          ? "bg-primary text-white shadow-sm"
                          : "bg-warm-50 text-warm-600 hover:bg-warm-100"
                      }`}
                    >
                      <span>{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Writing Area */}
            <Card className="overflow-hidden border-accent-200/30">
              <div className="h-1 bg-gradient-to-r from-primary via-accent-400 to-primary" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <PenLine className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Write your thoughts...</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-warm-400">
                    <Lock className="w-3 h-3" />
                    <span>Encrypted</span>
                    <span className="mx-1">|</span>
                    <span>{wordCount(content)} words</span>
                  </div>
                </div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Dear Lord, today I am feeling..."
                  className="min-h-[300px] journal-paper font-sans text-warm-800 text-base leading-8 border-none bg-transparent resize-none focus-visible:ring-0 p-0"
                />
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-warm-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-warm-400" />
                    <span className="text-xs text-warm-400">
                      {todayEntry ? `Last saved ${formatDate(todayEntry.updated_at, "relative")}` : "Not yet saved"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleSave}
                      disabled={isSaving || !content.trim()}
                    >
                      <Save className="w-4 h-4 mr-1.5" />
                      {isSaving ? "Saving..." : "Save Entry"}
                    </Button>
                    <Button
                      variant="gold"
                      onClick={generateDevotional}
                      disabled={isGenerating || !content.trim()}
                    >
                      <Sparkles className="w-4 h-4 mr-1.5" />
                      {isGenerating ? "Generating..." : "Generate Devotional"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Devotional */}
            <AnimatePresence>
              {showDevotional && generatedDevotional && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden border-accent-200/50 shadow-lg prayer-glow">
                    <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-accent-500" />
                        <Badge variant="gold">Your Personal Devotional</Badge>
                      </div>
                      <CardTitle className="text-2xl">{generatedDevotional.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Scripture */}
                      <div className="bg-primary-50/50 rounded-xl p-5 border border-primary-100/50">
                        <p className="text-xs uppercase tracking-widest text-primary-400 font-medium mb-2">Scripture</p>
                        <p className="font-serif font-semibold text-primary mb-2">{generatedDevotional.scripture_reference}</p>
                        <blockquote className="scripture-text text-lg">
                          &ldquo;{generatedDevotional.scripture_text}&rdquo;
                        </blockquote>
                      </div>

                      {/* Reflection */}
                      <div>
                        <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-3 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          Reflection
                        </p>
                        {generatedDevotional.reflection.split("\n\n").map((para, i) => (
                          <p key={i} className="text-warm-700 leading-relaxed mb-3 last:mb-0">{para}</p>
                        ))}
                      </div>

                      {/* Prayer Prompt */}
                      <div className="bg-accent-50/50 rounded-xl p-5 border border-accent-100/50">
                        <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-3 flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" />
                          Prayer
                        </p>
                        <p className="text-warm-700 leading-relaxed italic font-serif">
                          {generatedDevotional.prayer_prompt}
                        </p>
                      </div>

                      {/* Action Step */}
                      <div className="bg-green-50/50 rounded-xl p-5 border border-green-100/50">
                        <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
                          Action Step
                        </p>
                        <p className="text-warm-700 leading-relaxed">{generatedDevotional.action_step}</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">Share Devotional</Button>
                        <Button variant="ghost" size="sm">Save to Favorites</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Total Entries", value: "42", icon: PenLine },
                    { label: "Day Streak", value: "7", icon: Flame },
                    { label: "This Month", value: "12", icon: Calendar },
                    { label: "Devotionals", value: "38", icon: Sparkles },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-warm-50 rounded-lg p-3 text-center">
                      <stat.icon className="w-4 h-4 text-accent-500 mx-auto mb-1" />
                      <p className="text-xl font-bold text-primary">{stat.value}</p>
                      <p className="text-[10px] text-warm-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Entries</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-400" />
                  <Input
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-8 text-xs"
                  />
                </div>
                {filteredEntries.slice(0, 5).map((entry) => {
                  const decrypted = getDecryptedContent(entry);
                  const isSelected = entry.date === selectedDate;
                  return (
                    <button
                      key={entry.id}
                      onClick={() => setSelectedDate(entry.date)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        isSelected
                          ? "bg-primary-50 border border-primary-100"
                          : "hover:bg-warm-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-primary">
                          {formatDate(entry.date, "short")}
                        </span>
                        {entry.mood && (
                          <span className="text-xs">{getMoodEmoji(entry.mood)}</span>
                        )}
                      </div>
                      <p className="text-xs text-warm-500 line-clamp-2">{decrypted}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-warm-400">{entry.word_count} words</span>
                        <Lock className="w-2.5 h-2.5 text-warm-300" />
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Writing Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Writing Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "What are you most grateful for today?",
                  "Where did you see God at work this week?",
                  "What Scripture has been on your mind?",
                  "Write a letter to God about your current season.",
                  "Describe a moment of unexpected grace.",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setContent(prompt + "\n\n")}
                    className="w-full text-left px-3 py-2 rounded-lg bg-accent-50/50 hover:bg-accent-50 border border-accent-100/30 text-sm text-warm-600 transition-colors"
                  >
                    <span className="text-accent-500 mr-1.5">✦</span>
                    {prompt}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
