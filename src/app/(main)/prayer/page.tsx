"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Plus, Check, Clock, Filter, Sparkles, Lock,
  HandHeart, Star, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { EncryptionIndicator } from "@/components/shared/EncryptionIndicator";
import { usePrayer } from "@/hooks/usePrayer";
import { getPrayerCategoryLabel, getPrayerCategoryIcon, formatDate } from "@/lib/utils";
import type { PrayerCategory } from "@/types";

const CATEGORIES: PrayerCategory[] = [
  "health", "family", "work", "relationships", "spiritual_growth",
  "financial", "guidance", "gratitude", "world", "other",
];

const AI_SUGGESTED_PRAYERS = [
  "Lord, grant me wisdom for the decisions I face today. Help me to lean not on my own understanding but to acknowledge You in all my ways.",
  "Father, I lift up my family to You. Strengthen our bonds, heal any brokenness, and fill our home with Your peace and love.",
  "Holy Spirit, search my heart. Reveal anything that stands between me and deeper intimacy with You. Create in me a clean heart.",
  "Lord, I pray for those who are suffering around the world right now. Bring comfort to the afflicted and justice to the oppressed.",
];

export default function PrayerPage() {
  const { prayers, addPrayer, markAsAnswered, incrementPrayCount, getDecryptedContent, getByStatus } = usePrayer();
  const [showNewPrayer, setShowNewPrayer] = useState(false);
  const [newPrayerContent, setNewPrayerContent] = useState("");
  const [newPrayerCategory, setNewPrayerCategory] = useState<PrayerCategory>("guidance");
  const [isPublic, setIsPublic] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showAnsweredDialog, setShowAnsweredDialog] = useState(false);
  const [answeredPrayerId, setAnsweredPrayerId] = useState("");
  const [answeredNote, setAnsweredNote] = useState("");
  
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  const activePrayers = getByStatus("active");
  const answeredPrayers = getByStatus("answered");
  const ongoingPrayers = getByStatus("ongoing");

  const filteredPrayers = prayers.filter((p) => {
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (filterCategory !== "all" && p.category !== filterCategory) return false;
    return true;
  });

  const handleAddPrayer = async () => {
    if (!newPrayerContent.trim()) return;
    await addPrayer(newPrayerContent, newPrayerCategory, isPublic);
    setNewPrayerContent("");
    setShowNewPrayer(false);
  };

  const handleMarkAnswered = async () => {
    if (answeredPrayerId) {
      await markAsAnswered(answeredPrayerId, answeredNote);
      setShowAnsweredDialog(false);
      setAnsweredPrayerId("");
      setAnsweredNote("");
    }
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <Heart className="w-8 h-8 text-accent-500" />
              Prayer Journal
            </h1>
            <p className="text-warm-500 mt-1">Bring your requests to God and watch Him move.</p>
          </div>
          <div className="flex items-center gap-3">
            <EncryptionIndicator level="standard" />
            <Button variant="gold" onClick={() => setShowNewPrayer(true)}>
              <Plus className="w-4 h-4 mr-1.5" />
              New Prayer
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Prayers", value: activePrayers.length, icon: Heart, color: "text-red-500 bg-red-50" },
            { label: "Answered", value: answeredPrayers.length, icon: Check, color: "text-green-500 bg-green-50" },
            { label: "Ongoing", value: ongoingPrayers.length, icon: Clock, color: "text-blue-500 bg-blue-50" },
            { label: "Total Prayed", value: prayers.reduce((sum, p) => sum + p.pray_count, 0), icon: HandHeart, color: "text-accent-500 bg-accent-50" },
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
          {/* Prayer List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-3.5 h-3.5 mr-1.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {getPrayerCategoryIcon(cat)} {getPrayerCategoryLabel(cat)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* New Prayer Form */}
            <AnimatePresence>
              {showNewPrayer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="border-accent-200/50 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-accent-400 to-accent-500" />
                    <CardContent className="pt-6 space-y-4">
                      <Textarea
                        value={newPrayerContent}
                        onChange={(e) => setNewPrayerContent(e.target.value)}
                        placeholder="Lord, I bring before You..."
                        className="min-h-[120px] font-serif text-base"
                      />
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Select value={newPrayerCategory} onValueChange={(v) => setNewPrayerCategory(v as PrayerCategory)}>
                          <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {getPrayerCategoryIcon(cat)} {getPrayerCategoryLabel(cat)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex items-center gap-4 ml-auto">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isPublic}
                              onChange={(e) => setIsPublic(e.target.checked)}
                              className="rounded border-warm-300"
                            />
                            <span className="text-sm text-warm-600">Share on prayer wall</span>
                          </label>
                          <Button variant="ghost" size="sm" onClick={() => setShowNewPrayer(false)}>Cancel</Button>
                          <Button variant="gold" size="sm" onClick={handleAddPrayer} disabled={!newPrayerContent.trim()}>
                            <Heart className="w-4 h-4 mr-1.5" />
                            Add Prayer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prayer List */}
            <div className="space-y-3">
              {filteredPrayers.map((prayer, i) => {
                const content = getDecryptedContent(prayer);
                return (
                  <motion.div
                    key={prayer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className={`transition-all hover:shadow-md ${
                      prayer.status === "answered" ? "border-green-200/50 bg-green-50/20" :
                      prayer.status === "ongoing" ? "border-blue-200/50" : ""
                    }`}>
                      <CardContent className="pt-5 pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getPrayerCategoryIcon(prayer.category)}</span>
                            <Badge variant={
                              prayer.status === "answered" ? "success" :
                              prayer.status === "ongoing" ? "accent" : "outline"
                            }>
                              {prayer.status === "answered" ? "Answered" :
                               prayer.status === "ongoing" ? "Ongoing" : "Active"}
                            </Badge>
                            <Badge variant="outline" className="text-[10px]">
                              {getPrayerCategoryLabel(prayer.category)}
                            </Badge>
                          </div>
                          <span className="text-xs text-warm-400">{formatDate(prayer.created_at, "relative")}</span>
                        </div>
                        <p className="text-warm-700 leading-relaxed mb-3">{content}</p>
                        {prayer.status === "answered" && prayer.answered_note && (
                          <div className="bg-green-50 rounded-lg p-3 mb-3 border border-green-100">
                            <p className="text-xs font-medium text-green-700 mb-1 flex items-center gap-1">
                              <Star className="w-3 h-3" /> How God Answered
                            </p>
                            <p className="text-sm text-green-800">{prayer.answered_note}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 text-xs text-warm-400">
                            <HandHeart className="w-3 h-3" />
                            <span>Prayed {prayer.pray_count} times</span>
                            {!prayer.is_public && <Lock className="w-3 h-3 ml-2" />}
                          </div>
                          <div className="flex gap-1.5">
                            {prayer.status === "active" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => incrementPrayCount(prayer.id)}
                                  className="text-xs"
                                >
                                  <HandHeart className="w-3.5 h-3.5 mr-1" />
                                  Pray
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setAnsweredPrayerId(prayer.id);
                                    setShowAnsweredDialog(true);
                                  }}
                                  className="text-xs text-green-600"
                                >
                                  <Check className="w-3.5 h-3.5 mr-1" />
                                  Answered
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggested Prayer */}
            <Card className="border-accent-200/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-500" />
                  Suggested Prayer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-warm-700 leading-relaxed italic font-serif mb-4">
                  {AI_SUGGESTED_PRAYERS[currentSuggestion]}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSuggestion((prev) => (prev + 1) % AI_SUGGESTED_PRAYERS.length)}
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    New Suggestion
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewPrayerContent(AI_SUGGESTED_PRAYERS[currentSuggestion]);
                      setShowNewPrayer(true);
                    }}
                  >
                    Use This Prayer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prayer Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {CATEGORIES.map((cat) => {
                  const count = prayers.filter((p) => p.category === cat).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-warm-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm text-warm-600">
                        <span>{getPrayerCategoryIcon(cat)}</span>
                        {getPrayerCategoryLabel(cat)}
                      </span>
                      <Badge variant="outline" className="text-[10px]">{count}</Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recent Answered Prayers */}
            {answeredPrayers.length > 0 && (
              <Card className="border-green-200/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    God&apos;s Faithfulness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-warm-500 mb-3">
                    {answeredPrayers.length} prayer{answeredPrayers.length !== 1 ? "s" : ""} answered
                  </p>
                  <div className="space-y-2">
                    {answeredPrayers.slice(0, 3).map((prayer) => (
                      <div key={prayer.id} className="bg-green-50/50 rounded-lg p-3 border border-green-100/50">
                        <p className="text-xs text-green-800 line-clamp-2">{getDecryptedContent(prayer)}</p>
                        <p className="text-[10px] text-green-600 mt-1">
                          {prayer.answered_date && formatDate(prayer.answered_date, "relative")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Mark Answered Dialog */}
      <Dialog open={showAnsweredDialog} onOpenChange={setShowAnsweredDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-500" />
              Prayer Answered!
            </DialogTitle>
            <DialogDescription>
              Celebrate God&apos;s faithfulness. How did He answer this prayer?
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={answeredNote}
            onChange={(e) => setAnsweredNote(e.target.value)}
            placeholder="Share how God moved in this situation..."
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAnsweredDialog(false)}>Cancel</Button>
            <Button variant="gold" onClick={handleMarkAnswered}>
              <Check className="w-4 h-4 mr-1.5" />
              Mark as Answered
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
