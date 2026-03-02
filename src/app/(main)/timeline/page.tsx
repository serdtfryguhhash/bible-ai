"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock, BookOpen, Heart, PenLine, Trophy, Star, Plus,
  Sparkles, Check, Church, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

const TIMELINE_KEY = "bible_ai_timeline";

interface TimelineEvent {
  id: string;
  type: "journal" | "prayer_answered" | "plan_milestone" | "devotional" | "custom" | "baptism" | "memorized" | "achievement";
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    id: "tl-1",
    type: "custom",
    title: "Began My Faith Journey with Bible.ai",
    description: "Started using Bible.ai as my daily faith companion. Committed to daily devotionals and prayer.",
    date: new Date(Date.now() - 86400000 * 60).toISOString(),
    icon: "star",
    color: "bg-accent-100 text-accent-700 border-accent-200",
  },
  {
    id: "tl-2",
    type: "journal",
    title: "First Journal Entry",
    description: "Wrote my first journal entry about finding peace in God's timing. It felt like opening a conversation with God.",
    date: new Date(Date.now() - 86400000 * 55).toISOString(),
    icon: "pen",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "tl-3",
    type: "prayer_answered",
    title: "Prayer Answered: Financial Provision",
    description: "God provided through an unexpected source. His timing is always perfect. The check arrived exactly when we needed it.",
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    icon: "heart",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "tl-4",
    type: "achievement",
    title: "Earned 'Faithful Week' Badge",
    description: "Completed a 7-day devotion streak! Every day showed up, prayed, and read God's Word.",
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
    icon: "trophy",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    id: "tl-5",
    type: "plan_milestone",
    title: "Started 'Journey Through the Gospels'",
    description: "Embarked on a 30-day reading plan to walk with Jesus through all four Gospel accounts.",
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    icon: "book",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    id: "tl-6",
    type: "memorized",
    title: "Memorized Philippians 4:13",
    description: "I can do all things through Christ who strengthens me. This verse has become my anchor.",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    icon: "brain",
    color: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "tl-7",
    type: "devotional",
    title: "Devotional: Finding Peace in the Storm",
    description: "Today's devotional on Philippians 4:6-7 spoke directly to my heart. God's peace is real.",
    date: new Date(Date.now() - 86400000).toISOString(),
    icon: "sparkles",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
];

const ICON_MAP: Record<string, React.ElementType> = {
  star: Star,
  pen: PenLine,
  heart: Heart,
  trophy: Trophy,
  book: BookOpen,
  brain: Brain,
  sparkles: Sparkles,
  check: Check,
  church: Church,
  clock: Clock,
};

function getTimelineEvents(): TimelineEvent[] {
  if (typeof window === "undefined") return DEFAULT_EVENTS;
  const stored = localStorage.getItem(TIMELINE_KEY);
  if (!stored) return DEFAULT_EVENTS;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_EVENTS;
  }
}

function saveTimeline(events: TimelineEvent[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIMELINE_KEY, JSON.stringify(events));
}

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState("custom");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const loaded = getTimelineEvents();
    setEvents(loaded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const typeConfig: Record<string, { icon: string; color: string }> = {
      custom: { icon: "star", color: "bg-accent-100 text-accent-700 border-accent-200" },
      baptism: { icon: "church", color: "bg-blue-100 text-blue-700 border-blue-200" },
      prayer_answered: { icon: "heart", color: "bg-green-100 text-green-700 border-green-200" },
      journal: { icon: "pen", color: "bg-blue-100 text-blue-700 border-blue-200" },
      achievement: { icon: "trophy", color: "bg-amber-100 text-amber-700 border-amber-200" },
    };
    const config = typeConfig[newType] || typeConfig.custom;
    const newEvent: TimelineEvent = {
      id: `tl-${Date.now()}`,
      type: newType as TimelineEvent["type"],
      title: newTitle,
      description: newDesc,
      date: new Date(newDate).toISOString(),
      icon: config.icon,
      color: config.color,
    };
    const updated = [newEvent, ...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setEvents(updated);
    saveTimeline(updated);
    setNewTitle("");
    setNewDesc("");
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <Clock className="w-8 h-8 text-accent-500" />
              Faith Timeline
            </h1>
            <p className="text-warm-500 mt-1">Your spiritual journey, beautifully recorded.</p>
          </div>
          <Button variant="gold" onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Add Milestone
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-primary">{events.length}</p>
              <p className="text-xs text-warm-400">Total Milestones</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {events.filter((e) => e.type === "prayer_answered").length}
              </p>
              <p className="text-xs text-warm-400">Prayers Answered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {events.length > 0
                  ? Math.ceil((new Date().getTime() - new Date(events[events.length - 1].date).getTime()) / (86400000))
                  : 0}
              </p>
              <p className="text-xs text-warm-400">Days on Journey</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-300 via-accent-200 to-warm-100" />

          <div className="space-y-6">
            {events.map((event, i) => {
              const IconComponent = ICON_MAP[event.icon] || Star;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Icon Circle */}
                  <div className={`absolute left-3 sm:left-5 w-7 h-7 rounded-full ${event.color} border flex items-center justify-center z-10`}>
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  {/* Card */}
                  <Card className="hover:shadow-md transition-all">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px]">
                          {event.type.replace("_", " ")}
                        </Badge>
                        <span className="text-xs text-warm-400">
                          {formatDate(event.date, "full")}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-warm-600 leading-relaxed">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Start marker */}
          <div className="relative pl-16 sm:pl-20 mt-6">
            <div className="absolute left-3 sm:left-5 w-7 h-7 rounded-full bg-primary flex items-center justify-center z-10">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm font-serif italic text-warm-400 pt-1">
              The beginning of your faith journey...
            </p>
          </div>
        </div>
      </div>

      {/* Add Milestone Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-500" />
              Add Milestone
            </DialogTitle>
            <DialogDescription>
              Record a significant moment in your spiritual journey.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={newType} onValueChange={setNewType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Milestone</SelectItem>
                <SelectItem value="baptism">Baptism</SelectItem>
                <SelectItem value="prayer_answered">Prayer Answered</SelectItem>
                <SelectItem value="journal">Journal Highlight</SelectItem>
                <SelectItem value="achievement">Achievement</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What happened?"
            />
            <Textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Describe this moment..."
              className="min-h-[80px]"
            />
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button variant="gold" onClick={handleAdd} disabled={!newTitle.trim()}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add to Timeline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
