"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Sparkles, Heart, Share2, Calendar, ChevronRight,
  Flame, Clock, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScriptureCard } from "@/components/shared/ScriptureCard";
import { getDailyVerse, DAILY_VERSES } from "@/constants/scripture";
import { formatDate } from "@/lib/utils";
import type { Devotional } from "@/types";

const SAMPLE_DEVOTIONALS: Devotional[] = [
  {
    id: "dev-1",
    title: "Finding Peace in the Storm",
    scripture_reference: "Philippians 4:6-7",
    scripture_text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    reflection: "In the midst of life's storms, God offers a peace that doesn't make sense to the world. This isn't the absence of trouble — it's the presence of God in the trouble. Paul wrote these words from prison, yet his heart overflowed with joy. The key is in the practice: prayer, petition, and thanksgiving. When we bring our anxieties to God with grateful hearts, He replaces our worry with His supernatural peace.",
    prayer_prompt: "Lord, I surrender my anxieties to You today. Guard my heart and mind with Your peace that surpasses understanding.",
    action_step: "Write down three things you're anxious about, then write three things you're thankful for. Present both lists to God in prayer.",
    denomination_context: "nondenominational",
    theme: "peace",
    date: new Date().toISOString().split("T")[0],
    is_public: true,
    likes_count: 247,
    created_at: new Date().toISOString(),
  },
  {
    id: "dev-2",
    title: "The Strength to Continue",
    scripture_reference: "Isaiah 40:31",
    scripture_text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reflection: "There's a beautiful progression in this verse: soaring, running, walking. Sometimes faith feels like soaring — mountaintop experiences where God's presence is palpable. Other times, we're running — pressing forward with determination. But most of our faith journey happens in the walking — the daily, ordinary, faithful steps. God promises strength for all three.",
    prayer_prompt: "Father, renew my strength today. Whether I'm soaring, running, or simply putting one foot in front of the other, sustain me.",
    action_step: "Take a literal walk today. With each step, whisper 'I hope in You, Lord.' Let your physical journey mirror your spiritual one.",
    denomination_context: "nondenominational",
    theme: "endurance",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    is_public: true,
    likes_count: 189,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "dev-3",
    title: "Fearfully and Wonderfully Made",
    scripture_reference: "Psalm 139:13-14",
    scripture_text: "For you created my inmost being; you knit me together in my mother's womb. I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    reflection: "In a world that constantly tells us we're not enough, David reminds us of an unshakeable truth: we are God's handiwork. The Hebrew word for 'wonderfully' carries the sense of being set apart, distinct, remarkable. You weren't mass-produced. God knit you together with intention, purpose, and love. Every part of you — your personality, your gifts, your struggles — is known and loved by the Creator.",
    prayer_prompt: "Creator God, help me to see myself as You see me — not through the lens of comparison or criticism, but through the lens of Your love.",
    action_step: "Stand in front of a mirror and read Psalm 139:14 aloud to yourself. Say it until you believe it. You are God's masterpiece.",
    denomination_context: "nondenominational",
    theme: "identity",
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    is_public: true,
    likes_count: 312,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export default function DevotionalPage() {
  const [activeTab, setActiveTab] = useState("today");
  const [likedDevotionals, setLikedDevotionals] = useState<Set<string>>(new Set());
  const dailyVerse = getDailyVerse();
  const todayDevotional = SAMPLE_DEVOTIONALS[0];

  const toggleLike = (id: string) => {
    setLikedDevotionals((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-accent-500" />
              Daily Devotional
            </h1>
            <p className="text-warm-500 mt-1">Scripture, reflection, and prayer for your day.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="gold">
              <Flame className="w-3 h-3 mr-1" />
              7-day streak
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Devotional */}
              <div className="lg:col-span-2 space-y-6">
                {/* Today's Verse */}
                <ScriptureCard
                  reference={dailyVerse.reference}
                  text={dailyVerse.text}
                  theme={dailyVerse.theme}
                />

                {/* Devotional Content */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="overflow-hidden border-accent-200/50 shadow-md prayer-glow">
                    <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="gold">Today&apos;s Devotional</Badge>
                        <span className="text-xs text-warm-400">{formatDate(todayDevotional.date, "short")}</span>
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl">{todayDevotional.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Scripture */}
                      <div className="bg-primary-50/50 rounded-xl p-5 border border-primary-100/50">
                        <p className="font-serif font-semibold text-primary mb-2">{todayDevotional.scripture_reference}</p>
                        <blockquote className="scripture-text text-lg">
                          &ldquo;{todayDevotional.scripture_text}&rdquo;
                        </blockquote>
                      </div>

                      {/* Reflection */}
                      <div>
                        <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-3 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          Reflection
                        </p>
                        <p className="text-warm-700 leading-relaxed">{todayDevotional.reflection}</p>
                      </div>

                      {/* Prayer */}
                      <div className="bg-accent-50/50 rounded-xl p-5 border border-accent-100/50">
                        <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-3 flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" />
                          Prayer
                        </p>
                        <p className="text-warm-700 leading-relaxed italic font-serif">
                          {todayDevotional.prayer_prompt}
                        </p>
                      </div>

                      {/* Action Step */}
                      <div className="bg-green-50/50 rounded-xl p-5 border border-green-100/50">
                        <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
                          Action Step
                        </p>
                        <p className="text-warm-700 leading-relaxed">{todayDevotional.action_step}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-warm-100">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(todayDevotional.id)}
                            className={likedDevotionals.has(todayDevotional.id) ? "text-red-500" : ""}
                          >
                            <Heart className={`w-4 h-4 mr-1.5 ${likedDevotionals.has(todayDevotional.id) ? "fill-current" : ""}`} />
                            {todayDevotional.likes_count + (likedDevotionals.has(todayDevotional.id) ? 1 : 0)}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-1.5" />
                            Share
                          </Button>
                        </div>
                        <Link href="/journal">
                          <Button variant="accent" size="sm">
                            Write in Journal
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">This Week&apos;s Themes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {["Peace", "Endurance", "Identity", "Grace", "Purpose", "Trust", "Joy"].map((theme, i) => (
                      <div key={theme} className="flex items-center justify-between py-2 border-b border-warm-50 last:border-0">
                        <span className="text-sm text-warm-600">{theme}</span>
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-accent-400" : "bg-warm-200"}`} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/journal" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Write Journal Entry
                      </Button>
                    </Link>
                    <Link href="/prayer" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="w-4 h-4 mr-2" />
                        Add Prayer Request
                      </Button>
                    </Link>
                    <Link href="/scripture" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Explore Scripture
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAMPLE_DEVOTIONALS.map((dev, i) => (
                <motion.div
                  key={dev.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/devotional/${dev.id}`}>
                    <Card className="h-full hover:shadow-md transition-all cursor-pointer group">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="gold" className="text-[10px]">{dev.theme}</Badge>
                          <span className="text-xs text-warm-400">{formatDate(dev.date, "short")}</span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-primary mb-2 group-hover:text-accent-600 transition-colors">
                          {dev.title}
                        </h3>
                        <p className="text-sm text-warm-500 line-clamp-3 mb-3">{dev.reflection}</p>
                        <p className="text-xs font-serif text-accent-600">{dev.scripture_reference}</p>
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-warm-50">
                          <span className="flex items-center gap-1 text-xs text-warm-400">
                            <Heart className="w-3 h-3" /> {dev.likes_count}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {DAILY_VERSES.slice(0, 8).map((verse, i) => (
                <motion.div
                  key={verse.reference}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ScriptureCard
                    reference={verse.reference}
                    text={verse.text}
                    theme={verse.theme}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
