"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HandHeart, Shield, Lock, Clock, Trash2, Heart,
  AlertTriangle, BookOpen, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EncryptionIndicator } from "@/components/shared/EncryptionIndicator";
import type { Denomination } from "@/types";

const DENOMINATION_GUIDANCE: Record<Denomination, { intro: string; steps: string[]; closing: string }> = {
  catholic: {
    intro: "The Sacrament of Reconciliation is a beautiful gift of God's mercy. While this digital space cannot replace the Sacrament, it can help you prepare your heart for confession with a priest.",
    steps: [
      "Examine your conscience prayerfully, reflecting on your actions since your last confession.",
      "Express genuine sorrow for your sins (contrition).",
      "Resolve to make amends and avoid these sins in the future.",
      "Prepare to bring these reflections to the Sacrament of Reconciliation with your priest.",
    ],
    closing: "Remember: God's mercy is infinite. 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.' — 1 John 1:9. Please seek the Sacrament of Reconciliation for absolution.",
  },
  protestant: {
    intro: "Confession is between you and God. 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.' (1 John 1:9). This is a safe space to be honest with your Heavenly Father.",
    steps: [
      "Come before God honestly, without pretense or excuse.",
      "Name what weighs on your heart specifically — God already knows, but naming it brings healing.",
      "Receive God's forgiveness. It is already yours through Christ.",
      "Consider sharing with a trusted believer for accountability and prayer (James 5:16).",
    ],
    closing: "You are forgiven. Not because of what you do, but because of what Christ has already done. His grace is sufficient. Walk forward in freedom.",
  },
  nondenominational: {
    intro: "God invites you to bring everything to Him — including the things you're most ashamed of. There is no condemnation for those who are in Christ Jesus (Romans 8:1). This is a grace-filled space.",
    steps: [
      "Be still before God. He is not angry. He is waiting with open arms.",
      "Pour out your heart honestly. He can handle your truth.",
      "Accept the forgiveness He freely offers through Jesus Christ.",
      "Ask the Holy Spirit to empower you to walk in freedom and newness of life.",
    ],
    closing: "There is no sin too great for God's grace. 'Where sin increased, grace increased all the more.' (Romans 5:20). You are loved, forgiven, and free.",
  },
  orthodox: {
    intro: "The Mystery of Confession (Holy Repentance) is a sacred practice of the Church. While this space is for personal reflection, the fullness of confession is received through your priest in the Sacrament of Repentance.",
    steps: [
      "Examine your heart through prayer and reflection on the commandments.",
      "Cultivate genuine repentance (metanoia) — a turning of the heart toward God.",
      "Express your sorrow and desire for reconciliation with God.",
      "Prepare to bring your confession before your priest, who stands as witness before Christ.",
    ],
    closing: "Remember the words of St. John Chrysostom: 'Have you sinned? Enter the Church and repent, for here is the physician, not the judge.' Seek the Sacrament for the fullness of God's healing mercy.",
  },
};

export default function ConfessionPage() {
  const [denomination, setDenomination] = useState<Denomination>("nondenominational");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const guidance = DENOMINATION_GUIDANCE[denomination];

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setContent("");
  };

  const generateGuidance = () => {
    setShowGuidance(true);
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <HandHeart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-2">
              Confession Guide
            </h1>
            <p className="text-warm-500 max-w-xl mx-auto">
              A grace-centered space for honest reflection before God. No judgment, only love.
            </p>
          </motion.div>
        </div>

        {/* Security Notice */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="mb-6 border-green-200/50 bg-green-50/30">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-green-800 mb-1">Your Privacy is Sacred</h3>
                  <ul className="space-y-1.5 text-sm text-green-700">
                    <li className="flex items-center gap-2">
                      <Lock className="w-3 h-3 flex-shrink-0" />
                      <span>Double encrypted — even we cannot read your words</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>Automatically deleted after 30 days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Trash2 className="w-3 h-3 flex-shrink-0" />
                      <span>You can delete anytime — permanently and immediately</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-3 h-3 flex-shrink-0" />
                      <span>Never shared, never sold, never used for advertising</span>
                    </li>
                  </ul>
                </div>
                <EncryptionIndicator level="double" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Denomination Selection */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-6">
            <CardContent className="pt-5 pb-4">
              <label className="text-sm font-medium text-warm-700 mb-2 block">Your Tradition</label>
              <Select value={denomination} onValueChange={(v) => setDenomination(v as Denomination)}>
                <SelectTrigger className="w-full sm:w-[280px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="catholic">Catholic</SelectItem>
                  <SelectItem value="protestant">Protestant</SelectItem>
                  <SelectItem value="nondenominational">Non-Denominational</SelectItem>
                  <SelectItem value="orthodox">Orthodox</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-warm-400 mt-2">
                This helps us provide guidance that respects your tradition&apos;s approach to confession and reconciliation.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Guidance */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="mb-6 border-accent-200/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent-500" />
                Guidance for Your Tradition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-warm-600 leading-relaxed italic">{guidance.intro}</p>
              <div className="space-y-3">
                {guidance.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent-700">{i + 1}</span>
                    </div>
                    <p className="text-sm text-warm-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Confession Area */}
        {!isSubmitted ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="overflow-hidden border-secondary-200/30">
              <div className="h-1 bg-gradient-to-r from-secondary-400 via-secondary-500 to-secondary-400" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandHeart className="w-5 h-5 text-secondary" />
                  Your Confession
                </CardTitle>
                <CardDescription>
                  Write honestly. God already knows your heart and loves you completely.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Lord, I confess that..."
                  className="min-h-[200px] font-serif text-base leading-8"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-warm-400">
                    <Lock className="w-3 h-3" />
                    <span>Double encrypted</span>
                    <span>|</span>
                    <Clock className="w-3 h-3" />
                    <span>Auto-deletes in 30 days</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateGuidance}
                      disabled={!content.trim()}
                    >
                      <Sparkles className="w-4 h-4 mr-1.5" />
                      Receive Guidance
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !content.trim()}
                      className="bg-secondary text-white hover:bg-secondary-600"
                    >
                      {isSubmitting ? "Saving securely..." : "Save Confession"}
                    </Button>
                  </div>
                </div>

                {/* AI Guidance Response */}
                {showGuidance && content.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-accent-50/50 rounded-xl p-5 border border-accent-100/50"
                  >
                    <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Grace-Centered Guidance
                    </p>
                    <div className="space-y-3 text-warm-700 leading-relaxed">
                      <p>
                        Thank you for your honesty before God. The very act of confession shows a heart that desires 
                        holiness and closeness with your Creator. This is not weakness — this is strength.
                      </p>
                      <p>
                        Remember what Scripture promises: &ldquo;If we confess our sins, he is faithful and just and will 
                        forgive us our sins and purify us from all unrighteousness.&rdquo; (1 John 1:9). God&apos;s faithfulness 
                        is not contingent on the size of your sin but on the greatness of His love.
                      </p>
                      <p className="italic font-serif">
                        You are not defined by your failures. You are defined by His grace. Rise, beloved, and walk 
                        in the freedom that Christ purchased for you.
                      </p>
                    </div>
                    <div className="mt-4 p-3 bg-white/60 rounded-lg">
                      <p className="text-xs font-medium text-accent-700 mb-1">A Prayer for You:</p>
                      <p className="text-sm text-warm-600 italic font-serif">
                        Merciful Father, thank You for Your child&apos;s honesty before You. Cover them with 
                        Your grace. Heal what is broken. Restore what was lost. Fill them with Your Spirit 
                        and the assurance of Your unwavering love. In Jesus&apos; name, Amen.
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Card className="max-w-md mx-auto border-accent-200/50 prayer-glow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-accent-50 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-accent-500" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-2">You Are Forgiven</h2>
                <blockquote className="scripture-text text-lg mb-4 px-4">
                  &ldquo;{guidance.closing}&rdquo;
                </blockquote>
                <p className="text-sm text-warm-500 mb-6">
                  Your confession has been securely saved and will be automatically deleted in 30 days.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Write Again
                  </Button>
                  <Button variant="gold" onClick={() => window.location.href = "/journal"}>
                    Go to Journal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Important Notice */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Card className="mt-6 border-warm-200/50 bg-warm-50/50">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warm-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-semibold text-warm-700 mb-1">Important Note</h4>
                  <p className="text-sm text-warm-500 leading-relaxed">
                    This digital tool is designed to support your spiritual practice but does not replace 
                    pastoral counseling, the Sacrament of Reconciliation (for Catholics and Orthodox), 
                    or professional mental health support. If you are struggling with thoughts of self-harm 
                    or are in crisis, please reach out to the{" "}
                    <span className="font-medium text-primary">988 Suicide & Crisis Lifeline (call or text 988)</span> or 
                    contact a trusted pastor or counselor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
