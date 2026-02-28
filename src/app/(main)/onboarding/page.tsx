"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Church, Heart, ArrowRight, ArrowLeft,
  Check, Sparkles, Shield, Bell, PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Denomination } from "@/types";

const STEPS = [
  { title: "Welcome", icon: BookOpen },
  { title: "Your Tradition", icon: Church },
  { title: "Your Journey", icon: Heart },
  { title: "Preferences", icon: Bell },
  { title: "Ready", icon: Sparkles },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [denomination, setDenomination] = useState<Denomination | "">("");
  const [goals, setGoals] = useState<string[]>([]);
  

  const toggleGoal = (goal: string) => {
    setGoals((prev) => prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen parchment-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.title}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                i < currentStep ? "bg-accent-500 text-white" :
                i === currentStep ? "bg-primary text-white" :
                "bg-warm-100 text-warm-400"
              }`}>
                {i < currentStep ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 ${i < currentStep ? "bg-accent-400" : "bg-warm-200"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Welcome */}
            {currentStep === 0 && (
              <Card className="text-center">
                <CardContent className="pt-12 pb-10 px-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-serif font-bold text-primary mb-3">Welcome to Bible.ai</h1>
                  <p className="text-lg text-warm-500 mb-8 max-w-md mx-auto leading-relaxed">
                    We&apos;re so glad you&apos;re here. Let&apos;s set up your personal faith companion so it serves you well on your spiritual journey.
                  </p>
                  <p className="text-sm text-warm-400 italic font-serif mb-8">
                    &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo; — Jeremiah 29:11
                  </p>
                  <Button variant="gold" size="xl" onClick={nextStep}>
                    Let&apos;s Begin
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 1: Denomination */}
            {currentStep === 1 && (
              <Card>
                <CardContent className="pt-10 pb-8 px-8">
                  <div className="text-center mb-8">
                    <Church className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-serif font-bold text-primary mb-2">Your Tradition</h2>
                    <p className="text-warm-500">This helps us tailor content that respects your theological perspective.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    {[
                      { value: "catholic" as Denomination, label: "Catholic", desc: "Roman Catholic tradition" },
                      { value: "protestant" as Denomination, label: "Protestant", desc: "Reformed & evangelical traditions" },
                      { value: "nondenominational" as Denomination, label: "Non-Denominational", desc: "Independent Christian" },
                      { value: "orthodox" as Denomination, label: "Orthodox", desc: "Eastern Orthodox tradition" },
                    ].map((denom) => (
                      <button
                        key={denom.value}
                        onClick={() => setDenomination(denom.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          denomination === denom.value
                            ? "border-accent-400 bg-accent-50 shadow-sm"
                            : "border-warm-100 hover:border-warm-200"
                        }`}
                      >
                        <p className="font-serif font-semibold text-primary">{denom.label}</p>
                        <p className="text-xs text-warm-400 mt-0.5">{denom.desc}</p>
                        {denomination === denom.value && (
                          <Badge variant="gold" className="mt-2 text-[10px]">
                            <Check className="w-2.5 h-2.5 mr-1" /> Selected
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-xs text-warm-400 mt-4">
                    You can change this anytime in Settings. All denominations are treated with equal respect.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Goals */}
            {currentStep === 2 && (
              <Card>
                <CardContent className="pt-10 pb-8 px-8">
                  <div className="text-center mb-8">
                    <Heart className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-serif font-bold text-primary mb-2">Your Faith Goals</h2>
                    <p className="text-warm-500">What would you like to focus on? (Select all that apply)</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                    {[
                      "Daily devotional habit",
                      "Deeper prayer life",
                      "Bible reading consistency",
                      "Understanding Scripture context",
                      "Journaling practice",
                      "Community connection",
                      "Spiritual accountability",
                      "Growing in faith",
                    ].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-3 rounded-lg border text-left text-sm transition-all ${
                          goals.includes(goal)
                            ? "border-accent-400 bg-accent-50 text-accent-800"
                            : "border-warm-100 text-warm-600 hover:border-warm-200"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {goals.includes(goal) && <Check className="w-3.5 h-3.5 text-accent-500" />}
                          {goal}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <Card>
                <CardContent className="pt-10 pb-8 px-8">
                  <div className="text-center mb-8">
                    <Bell className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-serif font-bold text-primary mb-2">Daily Reminders</h2>
                    <p className="text-warm-500">When would you like your daily devotional?</p>
                  </div>
                  <div className="max-w-xs mx-auto space-y-4">
                    <div>
                      <label className="text-sm font-medium text-warm-700 mb-1.5 block">Daily Reminder Time</label>
                      <Input type="time" defaultValue="07:00" />
                    </div>
                    <div className="space-y-3 pt-4">
                      {[
                        { label: "Morning devotional", checked: true },
                        { label: "Prayer reminders", checked: true },
                        { label: "Daily verse email", checked: true },
                        { label: "Weekly newsletter", checked: false },
                      ].map((pref) => (
                        <label key={pref.label} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={pref.checked} className="rounded border-warm-300 text-accent-500" />
                          <span className="text-sm text-warm-700">{pref.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 bg-green-50 rounded-lg p-3 border border-green-100 max-w-xs mx-auto">
                    <div className="flex items-center gap-2 text-xs text-green-700">
                      <Shield className="w-3 h-3" />
                      <span>Your data is encrypted and never sold. No ads, ever.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Ready */}
            {currentStep === 4 && (
              <Card className="text-center">
                <CardContent className="pt-12 pb-10 px-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-3">You&apos;re All Set!</h2>
                  <p className="text-lg text-warm-500 mb-6 max-w-md mx-auto">
                    Your personal faith companion is ready. Start with a journal entry and receive your first AI-powered devotional.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="gold" size="xl" onClick={() => window.location.href = "/journal"}>
                      <PenLine className="w-5 h-5 mr-2" />
                      Start Journaling
                    </Button>
                    <Button variant="outline" size="xl" onClick={() => window.location.href = "/devotional"}>
                      <BookOpen className="w-5 h-5 mr-2" />
                      Today&apos;s Devotional
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <div className="flex items-center justify-between mt-6">
            <Button variant="ghost" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back
            </Button>
            <Button variant="gold" onClick={nextStep}>
              Continue
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
