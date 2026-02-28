"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookMarked, Flame, Users, Clock, ChevronRight, Check, Play, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { READING_PLANS } from "@/constants/scripture";

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState<"my-plans" | "discover">("my-plans");

  const myProgress = {
    planId: "gospels-30",
    currentDay: 5,
    totalDays: 30,
    streak: 5,
    completedDays: [1, 2, 3, 4, 5],
  };

  const progressPercent = (myProgress.currentDay / myProgress.totalDays) * 100;

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <BookMarked className="w-8 h-8 text-accent-500" />
              Reading Plans
            </h1>
            <p className="text-warm-500 mt-1">Structured Bible reading with AI-powered commentary.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="gold">
              <Flame className="w-3 h-3 mr-1" />
              5-day plan streak
            </Badge>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "my-plans" ? "default" : "outline"}
            onClick={() => setActiveTab("my-plans")}
          >
            My Plans
          </Button>
          <Button
            variant={activeTab === "discover" ? "default" : "outline"}
            onClick={() => setActiveTab("discover")}
          >
            Discover
          </Button>
        </div>

        {activeTab === "my-plans" ? (
          <div className="space-y-6">
            {/* Current Plan */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden border-accent-200/50 shadow-md">
                <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="gold" className="mb-2">Currently Reading</Badge>
                      <CardTitle className="text-2xl">Journey Through the Gospels</CardTitle>
                      <p className="text-sm text-warm-500 mt-1">Walk with Jesus through all four Gospel accounts in 30 days.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-accent-50 flex items-center justify-center border-2 border-accent-200">
                        <span className="text-2xl font-bold text-accent-700">{myProgress.currentDay}</span>
                      </div>
                      <p className="text-xs text-warm-400 mt-1">Day {myProgress.currentDay} of {myProgress.totalDays}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-warm-500">Progress</span>
                      <span className="text-sm font-medium text-accent-600">{Math.round(progressPercent)}%</span>
                    </div>
                    <Progress value={progressPercent} />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-warm-500">
                      <Flame className="w-4 h-4 text-accent-500" />
                      <span>{myProgress.streak}-day streak</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-warm-500">
                      <Users className="w-4 h-4 text-warm-400" />
                      <span>12,847 readers</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-warm-500">
                      <Clock className="w-4 h-4 text-warm-400" />
                      <span>~15 min/day</span>
                    </div>
                  </div>

                  {/* Today's Reading Preview */}
                  <Card className="bg-primary-50/50 border-primary-100/50">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="accent">Day {myProgress.currentDay}</Badge>
                        <Badge variant="outline" className="text-[10px]">Today</Badge>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                        {READING_PLANS[0].readings[4]?.title || "The Sermon on the Mount"}
                      </h3>
                      <p className="text-sm text-warm-500 mb-3">
                        Matthew 5:1-48
                      </p>
                      <p className="text-sm text-warm-600 leading-relaxed line-clamp-3">
                        {READING_PLANS[0].readings[4]?.commentary || ""}
                      </p>
                      <Link href={`/plans/gospels-30`}>
                        <Button variant="gold" size="sm" className="mt-3">
                          <Play className="w-4 h-4 mr-1.5" />
                          Continue Reading
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Week Progress */}
                  <div>
                    <p className="text-sm font-medium text-warm-600 mb-3">This Week</p>
                    <div className="grid grid-cols-7 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                        const isCompleted = myProgress.completedDays.includes(day);
                        const isToday = day === myProgress.currentDay;
                        return (
                          <div key={day} className="text-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 ${
                              isCompleted ? "bg-accent-400 text-white" :
                              isToday ? "bg-accent-100 text-accent-700 border-2 border-accent-300" :
                              "bg-warm-50 text-warm-400"
                            }`}>
                              {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-sm">{day}</span>}
                            </div>
                            <p className="text-[10px] text-warm-400">Day {day}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Completed Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent-500" />
                  Completed Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-warm-400">
                  <Trophy className="w-12 h-12 mx-auto mb-3 text-warm-200" />
                  <p className="text-sm">Complete your first plan to see it here!</p>
                  <p className="text-xs mt-1">You&apos;re {Math.round(progressPercent)}% through your current plan.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {READING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all group">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={
                        plan.difficulty === "beginner" ? "success" :
                        plan.difficulty === "intermediate" ? "accent" : "secondary"
                      } className="text-[10px]">
                        {plan.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">{plan.category}</Badge>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-primary mb-2 group-hover:text-accent-600 transition-colors">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-warm-500 leading-relaxed mb-4">{plan.description}</p>
                    <div className="flex items-center gap-4 text-xs text-warm-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {plan.duration_days} days
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {plan.participants_count.toLocaleString()} readers
                      </span>
                    </div>
                    <Link href={`/plans/${plan.id}`}>
                      <Button variant="gold" className="w-full group">
                        Start Plan
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
