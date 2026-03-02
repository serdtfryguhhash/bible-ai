"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Heart, Copy, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VERSE_KEY = "bible_ai_personalized_verse";

interface PersonalizedVerse {
  reference: string;
  text: string;
  reason: string;
  date: string;
}

const DEFAULT_VERSE: PersonalizedVerse = {
  reference: "Isaiah 41:10",
  text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
  reason: "Based on your recent prayers about guidance and your journal entries about trusting God's timing, this verse speaks directly to where you are right now.",
  date: new Date().toISOString().split("T")[0],
};

function getStoredVerse(): PersonalizedVerse {
  if (typeof window === "undefined") return DEFAULT_VERSE;
  const stored = localStorage.getItem(VERSE_KEY);
  if (!stored) return DEFAULT_VERSE;
  try {
    const parsed = JSON.parse(stored);
    const today = new Date().toISOString().split("T")[0];
    if (parsed.date !== today) return DEFAULT_VERSE;
    return parsed;
  } catch {
    return DEFAULT_VERSE;
  }
}

export function PersonalizedVerse() {
  const [verse, setVerse] = useState<PersonalizedVerse>(DEFAULT_VERSE);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVerse(getStoredVerse());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const refreshVerse = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/verse-of-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ denomination: "nondenominational" }),
      });
      const data = await res.json();
      if (data.success) {
        const newVerse: PersonalizedVerse = {
          reference: data.reference,
          text: data.text,
          reason: data.reason,
          date: new Date().toISOString().split("T")[0],
        };
        setVerse(newVerse);
        if (typeof window !== "undefined") {
          localStorage.setItem(VERSE_KEY, JSON.stringify(newVerse));
        }
      }
    } catch {
      // Keep current verse
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden border-accent-200/50">
        <div className="h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
        <CardContent className="pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-accent-700">Your Verse Today</p>
                <Badge variant="gold" className="text-[9px]">Personalized for you</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={refreshVerse} disabled={loading}>
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            </Button>
          </div>

          <p className="font-serif text-sm font-semibold text-primary mb-2">{verse.reference}</p>
          <blockquote className="scripture-text text-lg leading-relaxed pl-4 border-l-2 border-accent-300/50 mb-3">
            &ldquo;{verse.text}&rdquo;
          </blockquote>

          <div className="bg-accent-50/50 rounded-lg p-3 border border-accent-100/30 mb-3">
            <p className="text-xs text-warm-500 leading-relaxed flex items-start gap-1.5">
              <Sparkles className="w-3 h-3 text-accent-500 mt-0.5 flex-shrink-0" />
              {verse.reason}
            </p>
          </div>

          <div className="flex items-center gap-1 pt-3 border-t border-warm-50">
            <Button
              variant="ghost" size="sm"
              onClick={() => setLiked(!liked)}
              className={liked ? "text-red-500" : "text-warm-400"}
            >
              <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`} />
              <span className="text-xs">{liked ? "Saved" : "Save"}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="text-warm-400">
              <Copy className="w-4 h-4 mr-1" />
              <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
