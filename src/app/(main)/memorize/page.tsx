"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Plus, Check, X, RotateCcw, Sparkles, BookOpen,
  Trophy, Clock, Star, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  getMemorizeVerses,
  addVerse,
  reviewVerse,
  removeVerse,
  getDueVerses,
  getMasteredCount,
  blankWords,
  type MemorizeVerse,
} from "@/lib/spaced-repetition";

export default function MemorizePage() {
  const [verses, setVerses] = useState<MemorizeVerse[]>([]);
  const [dueVerses, setDueVerses] = useState<MemorizeVerse[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newRef, setNewRef] = useState("");
  const [newText, setNewText] = useState("");
  const [reviewMode, setReviewMode] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [blankedVerse, setBlankedVerse] = useState<{ display: string; blanks: string[] } | null>(null);
  const [mastered, setMastered] = useState(0);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const all = getMemorizeVerses();
    setVerses(all);
    setDueVerses(getDueVerses());
    setMastered(getMasteredCount());
  };

  const handleAddVerse = () => {
    if (!newRef.trim() || !newText.trim()) return;
    addVerse(newRef, newText);
    setNewRef("");
    setNewText("");
    setShowAdd(false);
    refreshData();
  };

  const startReview = () => {
    const due = getDueVerses();
    if (due.length === 0) return;
    setDueVerses(due);
    setCurrentReview(0);
    setReviewMode(true);
    setShowAnswer(false);
    const difficulty = Math.max(30, 100 - due[0].mastery);
    setBlankedVerse(blankWords(due[0].text, difficulty));
  };

  const handleReviewResult = (correct: boolean) => {
    const current = dueVerses[currentReview];
    reviewVerse(current.id, correct);

    if (currentReview < dueVerses.length - 1) {
      const nextIndex = currentReview + 1;
      setCurrentReview(nextIndex);
      setShowAnswer(false);
      setUserAnswer("");
      const nextVerse = dueVerses[nextIndex];
      const difficulty = Math.max(30, 100 - nextVerse.mastery);
      setBlankedVerse(blankWords(nextVerse.text, difficulty));
    } else {
      setReviewMode(false);
      refreshData();
    }
  };

  const handleRemove = (id: string) => {
    removeVerse(id);
    refreshData();
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <Brain className="w-8 h-8 text-accent-500" />
              Scripture Memory
            </h1>
            <p className="text-warm-500 mt-1">Hide God&apos;s Word in your heart through spaced repetition.</p>
          </div>
          <div className="flex items-center gap-3">
            {dueVerses.length > 0 && (
              <Badge variant="warning">
                <Clock className="w-3 h-3 mr-1" />
                {dueVerses.length} due for review
              </Badge>
            )}
            <Button variant="gold" onClick={() => setShowAdd(true)}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add Verse
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Verses", value: verses.length, icon: BookOpen, color: "text-blue-500 bg-blue-50" },
            { label: "Mastered", value: mastered, icon: Trophy, color: "text-accent-500 bg-accent-50" },
            { label: "Due Today", value: dueVerses.length, icon: Clock, color: "text-orange-500 bg-orange-50" },
            { label: "Reviews Done", value: verses.reduce((s, v) => s + v.reviewCount, 0), icon: Star, color: "text-purple-500 bg-purple-50" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-warm-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Review CTA */}
            {dueVerses.length > 0 && !reviewMode && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-accent-200/50 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
                  <CardContent className="pt-6 pb-6 text-center">
                    <Brain className="w-12 h-12 text-accent-500 mx-auto mb-3" />
                    <h2 className="text-xl font-serif font-bold text-primary mb-2">Time to Review!</h2>
                    <p className="text-sm text-warm-500 mb-4">
                      You have {dueVerses.length} verse{dueVerses.length !== 1 ? "s" : ""} due for review today.
                    </p>
                    <Button variant="gold" size="lg" onClick={startReview}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Start Review
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Review Mode */}
            <AnimatePresence>
              {reviewMode && blankedVerse && dueVerses[currentReview] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="border-purple-200/50 overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400" />
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Reviewing: {dueVerses[currentReview].reference}
                        </CardTitle>
                        <Badge variant="accent">
                          {currentReview + 1} / {dueVerses.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-primary-50/50 rounded-xl p-5 border border-primary-100/50">
                        <p className="text-lg font-serif text-primary leading-relaxed">
                          {blankedVerse.display}
                        </p>
                      </div>

                      {!showAnswer ? (
                        <div className="space-y-3">
                          <Input
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Fill in the missing words..."
                            className="text-base"
                          />
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => setShowAnswer(true)}>
                              Show Answer
                            </Button>
                            <Button variant="gold" className="flex-1" onClick={() => setShowAnswer(true)}>
                              Check
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                            <p className="text-xs font-medium text-green-700 mb-2">Full Verse</p>
                            <p className="text-sm text-green-800 leading-relaxed font-serif italic">
                              &ldquo;{dueVerses[currentReview].text}&rdquo;
                            </p>
                          </div>
                          <p className="text-xs text-warm-400 text-center">How did you do?</p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => handleReviewResult(false)}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Needs Work
                            </Button>
                            <Button
                              variant="gold"
                              className="flex-1"
                              onClick={() => handleReviewResult(true)}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Got It!
                            </Button>
                          </div>
                        </div>
                      )}

                      <Progress value={dueVerses[currentReview].mastery} className="h-2" />
                      <p className="text-[10px] text-warm-400 text-center">
                        Mastery: {dueVerses[currentReview].mastery}% | Next interval: {dueVerses[currentReview].interval} day{dueVerses[currentReview].interval !== 1 ? "s" : ""}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* All Verses */}
            <div className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-primary">Your Verses</h2>
              {verses.map((verse, i) => (
                <motion.div
                  key={verse.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`transition-all hover:shadow-md ${verse.mastery >= 80 ? "border-accent-200/50 bg-accent-50/10" : ""}`}>
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="gold" className="text-[10px]">{verse.reference}</Badge>
                          {verse.mastery >= 80 && (
                            <Badge variant="success" className="text-[10px]">
                              <Trophy className="w-3 h-3 mr-0.5" /> Mastered
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-warm-300 h-6 w-6 p-0" onClick={() => handleRemove(verse.id)}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-warm-600 leading-relaxed font-serif italic mb-3">
                        &ldquo;{verse.text}&rdquo;
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-warm-400">
                          <span>Mastery: {verse.mastery}%</span>
                          <span>Reviews: {verse.reviewCount}</span>
                          <span>Interval: {verse.interval}d</span>
                        </div>
                        <Progress value={verse.mastery} className="w-20 h-1.5" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-accent-200/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-500" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { step: "1", text: "Add verses you want to memorize" },
                  { step: "2", text: "Review daily with fill-in-the-blank exercises" },
                  { step: "3", text: "Intervals increase as you master each verse" },
                  { step: "4", text: "1 day → 3 days → 7 days → 14 days → 30 days" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-accent-700">{item.step}</span>
                    </div>
                    <p className="text-sm text-warm-600">{item.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Verses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { ref: "John 3:16", text: "For God so loved the world..." },
                  { ref: "Romans 8:28", text: "And we know that in all things..." },
                  { ref: "Psalm 119:105", text: "Your word is a lamp for my feet..." },
                  { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is..." },
                ].map((verse) => (
                  <button
                    key={verse.ref}
                    onClick={() => { setNewRef(verse.ref); setShowAdd(true); }}
                    className="w-full text-left flex items-center justify-between py-2 px-2 rounded-lg hover:bg-warm-50 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-primary">{verse.ref}</p>
                      <p className="text-[10px] text-warm-400">{verse.text}</p>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-warm-300" />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Verse Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent-500" />
              Add Verse to Memorize
            </DialogTitle>
            <DialogDescription>
              &ldquo;I have hidden your word in my heart that I might not sin against you.&rdquo; — Psalm 119:11
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newRef}
              onChange={(e) => setNewRef(e.target.value)}
              placeholder="Reference (e.g., John 3:16)"
            />
            <Textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Full verse text..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button variant="gold" onClick={handleAddVerse} disabled={!newRef.trim() || !newText.trim()}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add to Memory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
