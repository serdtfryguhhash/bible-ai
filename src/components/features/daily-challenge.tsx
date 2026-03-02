"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Send, Award, BookOpen, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const CHALLENGE_KEY = "bible_ai_daily_challenge";

interface ChallengeData {
  scripture: string;
  scriptureText: string;
  question: string;
  date: string;
  reflection: string | null;
  streakDays: string[];
}

const DEFAULT_CHALLENGES: ChallengeData[] = [
  {
    scripture: "Romans 12:2",
    scriptureText: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is — his good, pleasing and perfect will.",
    question: "What is one pattern of this world that you find yourself conforming to, and how might God be calling you to be transformed in that area?",
    date: new Date().toISOString().split("T")[0],
    reflection: null,
    streakDays: [],
  },
];

function getChallengeData(): ChallengeData {
  if (typeof window === "undefined") return DEFAULT_CHALLENGES[0];
  const stored = localStorage.getItem(CHALLENGE_KEY);
  if (!stored) return DEFAULT_CHALLENGES[0];
  try {
    const data = JSON.parse(stored);
    const today = new Date().toISOString().split("T")[0];
    if (data.date !== today) {
      return { ...DEFAULT_CHALLENGES[0], streakDays: data.streakDays || [] };
    }
    return data;
  } catch {
    return DEFAULT_CHALLENGES[0];
  }
}

function saveChallengeData(data: ChallengeData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHALLENGE_KEY, JSON.stringify(data));
}

export function DailyChallenge() {
  const [challenge, setChallenge] = useState<ChallengeData>(DEFAULT_CHALLENGES[0]);
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const data = getChallengeData();
    setChallenge(data);
    if (data.reflection) {
      setReflection(data.reflection);
      setSubmitted(true);
    }
  }, []);

  const streakCount = challenge.streakDays?.length || 0;
  const hasWeekBadge = streakCount >= 7;

  const handleSubmit = () => {
    if (!reflection.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const today = new Date().toISOString().split("T")[0];
      const updatedDays = [...(challenge.streakDays || [])];
      if (!updatedDays.includes(today)) updatedDays.push(today);
      const updated = { ...challenge, reflection, streakDays: updatedDays };
      saveChallengeData(updated);
      setChallenge(updated);
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  const generateNew = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ denomination: "nondenominational" }),
      });
      const data = await res.json();
      if (data.success) {
        const today = new Date().toISOString().split("T")[0];
        const newChallenge: ChallengeData = {
          scripture: data.scripture,
          scriptureText: data.scriptureText,
          question: data.question,
          date: today,
          reflection: null,
          streakDays: challenge.streakDays || [],
        };
        saveChallengeData(newChallenge);
        setChallenge(newChallenge);
        setReflection("");
        setSubmitted(false);
      }
    } catch {
      // Keep current challenge on error
    } finally {
      setGenerating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card className="border-accent-200/50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" />
              Daily Scripture Challenge
            </CardTitle>
            <div className="flex items-center gap-2">
              {hasWeekBadge && (
                <Badge variant="gold" className="text-[10px]">
                  <Award className="w-3 h-3 mr-1" />
                  Faithful Week
                </Badge>
              )}
              <Badge variant="accent" className="text-[10px]">
                {streakCount}-day streak
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary-50/50 rounded-xl p-4 border border-primary-100/50">
            <p className="font-serif font-semibold text-primary text-sm mb-1">{challenge.scripture}</p>
            <blockquote className="text-sm text-warm-600 leading-relaxed italic">
              &ldquo;{challenge.scriptureText}&rdquo;
            </blockquote>
          </div>

          <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100/30">
            <p className="text-xs uppercase tracking-widest text-purple-600 font-medium mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Reflection Question
            </p>
            <p className="text-sm text-warm-700 leading-relaxed">{challenge.question}</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50/50 rounded-xl p-4 border border-green-100/50"
            >
              <p className="text-xs font-medium text-green-700 mb-2">Your Reflection</p>
              <p className="text-sm text-green-800 italic">{reflection}</p>
              <p className="text-[10px] text-green-600 mt-2">Challenge completed for today!</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <Textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your reflection (2-3 sentences)..."
                className="min-h-[80px] text-sm"
              />
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={generateNew} disabled={generating}>
                  {generating ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Zap className="w-3.5 h-3.5 mr-1" />}
                  New Challenge
                </Button>
                <Button variant="gold" size="sm" onClick={handleSubmit} disabled={!reflection.trim() || loading}>
                  {loading ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Send className="w-3.5 h-3.5 mr-1" />}
                  Submit Reflection
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
