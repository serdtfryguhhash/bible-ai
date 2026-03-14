"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Heart, Share2, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DevotionalDetailPage() {
  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Link href="/devotional">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Devotionals
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-hidden border-accent-200/50 shadow-lg prayer-glow">
            <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="gold">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Devotional
                </Badge>
                <span className="text-xs text-warm-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Today
                </span>
              </div>
              <CardTitle className="text-3xl">Finding Peace in the Storm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-primary-50/50 rounded-xl p-6 border border-primary-100/50">
                <p className="text-xs uppercase tracking-widest text-primary-400 font-medium mb-2">Scripture</p>
                <p className="font-serif font-semibold text-primary text-lg mb-3">Philippians 4:6-7</p>
                <blockquote className="scripture-text text-xl leading-relaxed">
                  &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.&rdquo;
                </blockquote>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Reflection
                </p>
                <div className="space-y-4 text-warm-700 leading-relaxed">
                  <p>
                    In the midst of life&apos;s storms, God offers a peace that doesn&apos;t make sense to the world. 
                    This isn&apos;t the absence of trouble - it&apos;s the presence of God in the trouble. 
                    Paul wrote these words from a prison cell, yet his heart overflowed with joy and peace.
                  </p>
                  <p>
                    The key is in the practice: prayer, petition, and thanksgiving. When we bring our anxieties 
                    to God with grateful hearts, He replaces our worry with His supernatural peace. This peace 
                    acts as a guard - the Greek word &quot;phroureo&quot; is a military term for a garrison protecting a city. 
                    God&apos;s peace stands guard over your heart and mind.
                  </p>
                  <p>
                    Notice Paul doesn&apos;t say we won&apos;t face anxious situations. He says in every situation, 
                    bring it to God. Your anxiety is not a sign of weak faith - it&apos;s an invitation to deeper 
                    trust. Every worry is a prayer waiting to happen.
                  </p>
                </div>
              </div>

              <div className="bg-accent-50/50 rounded-xl p-6 border border-accent-100/50">
                <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-4 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  Prayer
                </p>
                <p className="text-warm-700 leading-relaxed italic font-serif text-lg">
                  Lord, I surrender my anxieties to You today. I bring every worry, every fear, every 
                  &quot;what if&quot; and place them at Your feet. Guard my heart and mind with Your peace that 
                  surpasses all understanding. Help me to trust that You are working even when I cannot see. 
                  Replace my anxiety with gratitude, my fear with faith, my worry with worship. 
                  In Jesus&apos; name, Amen.
                </p>
              </div>

              <div className="bg-green-50/50 rounded-xl p-6 border border-green-100/50">
                <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
                  Action Step
                </p>
                <p className="text-warm-700 leading-relaxed">
                  Write down three things you&apos;re anxious about, then write three things you&apos;re thankful for. 
                  Present both lists to God in prayer. Keep the gratitude list somewhere visible today as a 
                  reminder that God&apos;s goodness is greater than your worries.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-warm-100">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-1.5" />
                    248 Likes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-1.5" />
                    Share
                  </Button>
                </div>
                <Link href="/journal">
                  <Button variant="gold" size="sm">
                    Respond in Journal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
