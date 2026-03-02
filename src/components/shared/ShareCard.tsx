"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Copy, Check, BookOpen, Heart, Brain, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getGamification } from "@/lib/gamification";

interface ShareCardProps {
  open: boolean;
  onClose: () => void;
}

export function ShareCard({ open, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [streak, setStreak] = useState(7);
  const [versesMemorized, setVersesMemorized] = useState(3);
  const [level, setLevel] = useState("Disciple");
  const [score, setScore] = useState(58);
  const [xp, setXp] = useState(350);

  useEffect(() => {
    const data = getGamification();
    setVersesMemorized(data.totalVersesMemorized);
    setLevel(data.level);
    setXp(data.xp);
  }, [open]);

  const shareText = `I have been on a ${streak}-day prayer streak and memorized ${versesMemorized} verses on Bible AI! Level: ${level} (${xp} XP) | Devotion Score: ${score}/100 | Join me on my faith journey at bible.ai`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-accent-500" />
            Share Your Faith Journey
          </DialogTitle>
          <DialogDescription>
            Share your progress and inspire others in their walk with God.
          </DialogDescription>
        </DialogHeader>

        {/* Preview Card */}
        <div ref={cardRef} className="bg-gradient-to-br from-primary via-primary-600 to-primary-800 rounded-2xl p-6 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 text-6xl">✝</div>
            <div className="absolute bottom-4 left-4 text-4xl">📖</div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold">Bible.ai</h3>
                <p className="text-[10px] text-white/60">Faith Companion</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex items-center gap-4 mb-4">
              {/* Devotion Ring */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 70 70">
                  <circle cx="35" cy="35" r="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                  <circle
                    cx="35" cy="35" r="30" fill="none"
                    stroke="#D4A843" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{score}</span>
                  <span className="text-[8px] text-white/60">Score</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-semibold">{streak}-day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-300" />
                  <span className="text-sm">{versesMemorized} verses memorized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm">Level: {level}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Badge className="bg-white/20 text-white border-white/30 text-[10px]">
                {xp} XP earned
              </Badge>
            </div>

            <p className="text-center text-[10px] text-white/40 mt-3">bible.ai — Your AI Faith Companion</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
            {copied ? "Copied!" : "Copy Text"}
          </Button>
          <Button variant="gold" className="flex-1" onClick={handleCopy}>
            <Download className="w-4 h-4 mr-1.5" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
