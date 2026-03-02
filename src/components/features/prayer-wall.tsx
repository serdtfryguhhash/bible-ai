"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, Plus, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface PrayerWallRequest {
  id: string;
  author: string;
  isAnonymous: boolean;
  content: string;
  prayingCount: number;
  createdAt: string;
}

const SEED_PRAYERS: PrayerWallRequest[] = [
  {
    id: "pw-1",
    author: "Sarah M.",
    isAnonymous: false,
    content: "Please pray for my son who is struggling with addiction. God is able to break every chain.",
    prayingCount: 127,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "pw-2",
    author: "Anonymous",
    isAnonymous: true,
    content: "I am facing a difficult medical diagnosis. Praying for peace and healing. God is my refuge.",
    prayingCount: 89,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "pw-3",
    author: "James K.",
    isAnonymous: false,
    content: "My family is going through a financial crisis. We trust God as our provider but it is hard. Please stand with us in prayer.",
    prayingCount: 64,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "pw-4",
    author: "Maria L.",
    isAnonymous: false,
    content: "Prayers for my marriage. We are going through a rough season and need God's restoration and wisdom.",
    prayingCount: 203,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "pw-5",
    author: "Anonymous",
    isAnonymous: true,
    content: "I have lost my faith and I am trying to find my way back to God. Please pray that He reveals Himself to me again.",
    prayingCount: 341,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export function PrayerWall() {
  const [prayers, setPrayers] = useState<PrayerWallRequest[]>(SEED_PRAYERS);
  const [prayedFor, setPrayedFor] = useState<Set<string>>(new Set());
  const [showAdd, setShowAdd] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handlePray = (id: string) => {
    if (prayedFor.has(id)) return;
    setPrayedFor((prev) => { const next = new Set(Array.from(prev)); next.add(id); return next; });
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, prayingCount: p.prayingCount + 1 } : p))
    );
  };

  const handleAdd = () => {
    if (!newContent.trim()) return;
    const newPrayer: PrayerWallRequest = {
      id: `pw-${Date.now()}`,
      author: isAnonymous ? "Anonymous" : newAuthor || "Beloved Child",
      isAnonymous,
      content: newContent,
      prayingCount: 1,
      createdAt: new Date().toISOString(),
    };
    setPrayers([newPrayer, ...prayers]);
    setNewContent("");
    setNewAuthor("");
    setShowAdd(false);
  };

  return (
    <Card className="border-purple-200/50 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-purple-500" />
            Community Prayer Wall
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowAdd(!showAdd)}>
            <Plus className="w-4 h-4 mr-1" />
            Add Prayer
          </Button>
        </div>
        <p className="text-xs text-warm-400">Lift each other up in prayer</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pb-3 border-b border-warm-100"
            >
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Share your prayer request..."
                className="min-h-[80px] text-sm"
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-warm-300"
                  />
                  <span className="text-xs text-warm-500">Post anonymously</span>
                </label>
                {!isAnonymous && (
                  <Input
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Your name"
                    className="w-36 h-8 text-xs"
                  />
                )}
                <Button variant="gold" size="sm" onClick={handleAdd} className="ml-auto" disabled={!newContent.trim()}>
                  <Heart className="w-3.5 h-3.5 mr-1" />
                  Share
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {prayers.map((prayer, i) => (
          <motion.div
            key={prayer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-purple-50/30 rounded-xl p-4 border border-purple-100/30"
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="text-[10px] bg-purple-100 text-purple-700">
                  {prayer.isAnonymous ? "?" : prayer.author.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-warm-700">{prayer.author}</span>
                  <span className="text-[10px] text-warm-400">{formatDate(prayer.createdAt, "relative")}</span>
                </div>
                <p className="text-sm text-warm-600 leading-relaxed mb-2">{prayer.content}</p>
                <Button
                  variant={prayedFor.has(prayer.id) ? "gold" : "ghost"}
                  size="sm"
                  onClick={() => handlePray(prayer.id)}
                  className="h-7 text-xs"
                  disabled={prayedFor.has(prayer.id)}
                >
                  <HandHeart className="w-3.5 h-3.5 mr-1" />
                  {prayedFor.has(prayer.id) ? "Praying" : "Pray"}
                  <motion.span
                    key={prayer.prayingCount}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="ml-1.5"
                  >
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">
                      {prayer.prayingCount}
                    </Badge>
                  </motion.span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
