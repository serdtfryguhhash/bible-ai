"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Lock, PenLine, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EncryptionIndicator } from "@/components/shared/EncryptionIndicator";
import { useJournal } from "@/hooks/useJournal";
import { formatDate, getMoodEmoji, getMoodLabel } from "@/lib/utils";

export default function JournalEntryPage() {
  const params = useParams();
  const date = params.date as string;
  const { getEntry, getDecryptedContent } = useJournal();
  const entry = getEntry(date);

  if (!entry) {
    return (
      <div className="min-h-screen parchment-bg flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <PenLine className="w-12 h-12 text-warm-300 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-primary mb-2">No Entry Found</h2>
          <p className="text-warm-500 mb-6">You haven&apos;t written a journal entry for this date yet.</p>
          <Link href="/journal">
            <Button variant="gold">Write Today&apos;s Entry</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const content = getDecryptedContent(entry);

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/journal">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Journal
            </Button>
          </Link>
          <EncryptionIndicator level="standard" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-hidden border-accent-200/30">
            <div className="h-1.5 bg-gradient-to-r from-primary via-accent-400 to-primary" />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-accent-500" />
                <span className="text-sm text-warm-500">{formatDate(entry.date)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {entry.mood && (
                    <Badge variant="gold">
                      {getMoodEmoji(entry.mood)} {getMoodLabel(entry.mood)}
                    </Badge>
                  )}
                  <span className="text-xs text-warm-400">{entry.word_count} words</span>
                </div>
                <div className="flex items-center gap-1 text-warm-400">
                  <Lock className="w-3 h-3" />
                  <span className="text-xs">Private</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-warm max-w-none">
                {content.split("\n").map((paragraph, i) => (
                  <p key={i} className="text-warm-700 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
              {entry.scripture_references.length > 0 && (
                <div className="mt-6 pt-4 border-t border-warm-100">
                  <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-2">
                    Referenced Scripture
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.scripture_references.map((ref) => (
                      <Link key={ref} href={`/scripture/${encodeURIComponent(ref)}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary-50">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {ref}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
