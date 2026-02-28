"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles, Heart, Share2, Copy, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScriptureDetailPage() {
  const params = useParams();
  const reference = decodeURIComponent(params.reference as string);
  const [showApply, setShowApply] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleApplyToLife = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setShowApply(true);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Link href="/scripture">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Scripture Explorer
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Scripture Display */}
          <Card className="overflow-hidden border-accent-200/50 shadow-md">
            <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-accent-500" />
                <Badge variant="gold">Scripture</Badge>
              </div>
              <CardTitle className="text-3xl">{reference}</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="scripture-text text-xl leading-relaxed mb-6">
                &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. Then you will call on me and come and pray to me, and I will listen to you. You will seek me and find me when you seek me with all your heart.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2 text-sm text-warm-400">
                <Badge variant="outline">NIV Translation</Badge>
                <span>|</span>
                <span>Jeremiah 29:11-13</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-warm-100">
                <Button variant="ghost" size="sm"><Heart className="w-4 h-4 mr-1.5" /> Save</Button>
                <Button variant="ghost" size="sm"><Copy className="w-4 h-4 mr-1.5" /> Copy</Button>
                <Button variant="ghost" size="sm"><Share2 className="w-4 h-4 mr-1.5" /> Share</Button>
                <Button
                  variant="gold"
                  size="sm"
                  className="ml-auto"
                  onClick={handleApplyToLife}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  {isGenerating ? "Generating..." : "Apply to My Life"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Context Tabs */}
          <Tabs defaultValue="context">
            <TabsList className="bg-white/80">
              <TabsTrigger value="context">Historical Context</TabsTrigger>
              <TabsTrigger value="meaning">Deep Meaning</TabsTrigger>
              <TabsTrigger value="cross">Cross References</TabsTrigger>
            </TabsList>

            <TabsContent value="context">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-accent-500" />
                    <h3 className="font-serif font-semibold text-primary">Historical Context</h3>
                  </div>
                  <p className="text-warm-700 leading-relaxed">
                    Jeremiah wrote this letter to the Jewish exiles in Babylon around 597 BC. The people of Judah 
                    had been forcibly removed from their homeland and were living in a foreign land, surrounded by 
                    pagan culture and far from the Temple. False prophets were telling them their exile would be short, 
                    but God, through Jeremiah, revealed it would last 70 years.
                  </p>
                  <p className="text-warm-700 leading-relaxed">
                    In this context, God&apos;s promise of plans for &ldquo;hope and a future&rdquo; is even more remarkable. 
                    He was telling a displaced, discouraged people to settle in, build homes, plant gardens, and pray for 
                    the city where they were captive. The promise wasn&apos;t for immediate deliverance but for ultimate restoration.
                  </p>
                  <div className="bg-warm-50 rounded-lg p-4 mt-4">
                    <p className="text-xs uppercase tracking-wider text-warm-500 font-medium mb-2">Key Details</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-warm-400">Author:</span> <span className="text-warm-700">Jeremiah</span></div>
                      <div><span className="text-warm-400">Date:</span> <span className="text-warm-700">~597 BC</span></div>
                      <div><span className="text-warm-400">Audience:</span> <span className="text-warm-700">Jewish Exiles</span></div>
                      <div><span className="text-warm-400">Genre:</span> <span className="text-warm-700">Prophetic Letter</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meaning">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-accent-500" />
                    <h3 className="font-serif font-semibold text-primary">Hebrew Word Study</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-primary-50/50 rounded-lg p-4 border border-primary-100/50">
                      <p className="font-serif font-semibold text-primary">&ldquo;Plans&rdquo; (Hebrew: machashavah)</p>
                      <p className="text-sm text-warm-600 mt-1">
                        This word means &ldquo;thoughts, purposes, inventions.&rdquo; It implies deliberate, careful planning — 
                        not a casual afterthought. God&apos;s plans for you are intentional and specific.
                      </p>
                    </div>
                    <div className="bg-primary-50/50 rounded-lg p-4 border border-primary-100/50">
                      <p className="font-serif font-semibold text-primary">&ldquo;Prosper&rdquo; (Hebrew: shalom)</p>
                      <p className="text-sm text-warm-600 mt-1">
                        Often translated &ldquo;peace,&rdquo; shalom encompasses wholeness, completeness, wellness, and harmony. 
                        God&apos;s plan isn&apos;t merely material prosperity but total flourishing of body, soul, and spirit.
                      </p>
                    </div>
                    <div className="bg-primary-50/50 rounded-lg p-4 border border-primary-100/50">
                      <p className="font-serif font-semibold text-primary">&ldquo;Hope&rdquo; (Hebrew: tikvah)</p>
                      <p className="text-sm text-warm-600 mt-1">
                        Literally means &ldquo;a cord&rdquo; or &ldquo;a rope.&rdquo; It carries the image of being tethered to 
                        something sure — like a lifeline. God&apos;s hope is not wishful thinking but a secure anchor for your soul.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cross">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <h3 className="font-serif font-semibold text-primary mb-3">Related Passages</h3>
                  {[
                    { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him..." },
                    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding..." },
                    { ref: "Isaiah 55:8-9", text: "For my thoughts are not your thoughts, neither are your ways my ways..." },
                    { ref: "Psalm 37:4", text: "Take delight in the Lord, and he will give you the desires of your heart." },
                  ].map((cross) => (
                    <Link key={cross.ref} href={`/scripture/${encodeURIComponent(cross.ref)}`}>
                      <div className="p-3 rounded-lg hover:bg-warm-50 transition-colors border border-warm-100/50 cursor-pointer">
                        <p className="font-serif font-semibold text-sm text-primary">{cross.ref}</p>
                        <p className="text-sm text-warm-500 italic mt-0.5 line-clamp-1">{cross.text}</p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Apply to My Life */}
          {showApply && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-accent-200/50 shadow-lg prayer-glow overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent-500" />
                    Apply to Your Life
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-warm-700 leading-relaxed">
                    Just as God spoke to the exiles in Babylon, He speaks to you in your current season. 
                    Whatever &ldquo;exile&rdquo; you may be experiencing — a difficult job, a challenging relationship, 
                    an uncertain future — God&apos;s plans for you remain good.
                  </p>
                  <p className="text-warm-700 leading-relaxed">
                    Notice that God doesn&apos;t promise the absence of difficulty. He promises His presence in it. 
                    He asks you to seek Him with all your heart. Not halfheartedly, not occasionally, but with 
                    everything you have. And when you do, He promises you will find Him.
                  </p>
                  <div className="bg-accent-50/50 rounded-xl p-5 border border-accent-100/50">
                    <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-2">Reflection Questions</p>
                    <ul className="space-y-2 text-sm text-warm-700">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-500 mt-0.5">1.</span>
                        What area of your life feels like &ldquo;exile&rdquo; right now?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-500 mt-0.5">2.</span>
                        How can you &ldquo;build and plant&rdquo; even in a difficult season?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-500 mt-0.5">3.</span>
                        What does it look like to seek God with ALL your heart today?
                      </li>
                    </ul>
                  </div>
                  <Link href="/journal">
                    <Button variant="gold" className="w-full">
                      Respond in Your Journal
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
