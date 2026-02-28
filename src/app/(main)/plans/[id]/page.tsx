"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Check, ChevronRight, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { READING_PLANS } from "@/constants/scripture";

export default function PlanDetailPage() {
  const plan = READING_PLANS[0];
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2, 3, 4]);
  const [expandedDay, setExpandedDay] = useState<number>(5);

  const toggleComplete = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Link href="/plans">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Plans
          </Button>
        </Link>

        {/* Plan Header */}
        <Card className="mb-6 overflow-hidden border-accent-200/50">
          <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
          <CardHeader>
            <Badge variant="gold" className="w-fit mb-2">{plan.category}</Badge>
            <CardTitle className="text-3xl">{plan.title}</CardTitle>
            <p className="text-warm-500 mt-1">{plan.description}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-warm-500">Day {completedDays.length} of {plan.duration_days}</span>
              <span className="text-sm font-medium text-accent-600">
                {Math.round((completedDays.length / plan.duration_days) * 100)}%
              </span>
            </div>
            <Progress value={(completedDays.length / plan.duration_days) * 100} />
          </CardContent>
        </Card>

        {/* Readings */}
        <div className="space-y-3">
          {plan.readings.map((reading) => {
            const isCompleted = completedDays.includes(reading.day);
            const isExpanded = expandedDay === reading.day;

            return (
              <motion.div key={reading.day} layout>
                <Card className={`transition-all ${isCompleted ? "border-green-200/50" : ""} ${isExpanded ? "shadow-md" : ""}`}>
                  <CardContent className="pt-4 pb-4">
                    <button
                      onClick={() => setExpandedDay(isExpanded ? -1 : reading.day)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleComplete(reading.day); }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                              isCompleted
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-warm-200 hover:border-accent-300"
                            }`}
                          >
                            {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs text-warm-400">{reading.day}</span>}
                          </button>
                          <div>
                            <h3 className="font-serif font-semibold text-primary">{reading.title}</h3>
                            <p className="text-xs text-warm-400">{reading.scripture_references.join(", ")}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-warm-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-warm-100 space-y-4"
                      >
                        <div>
                          <Badge variant="outline" className="mb-2 text-[10px]">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {reading.scripture_references.join(", ")}
                          </Badge>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-2 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> AI Commentary
                          </p>
                          <p className="text-sm text-warm-700 leading-relaxed">{reading.commentary}</p>
                        </div>

                        <div className="bg-accent-50/50 rounded-lg p-4 border border-accent-100/50">
                          <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-2 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> Reflection Question
                          </p>
                          <p className="text-sm text-warm-700 italic">{reading.reflection_question}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => toggleComplete(reading.day)}>
                            <Check className="w-4 h-4 mr-1" />
                            {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                          </Button>
                          <Link href="/journal">
                            <Button variant="gold" size="sm">
                              Reflect in Journal
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
