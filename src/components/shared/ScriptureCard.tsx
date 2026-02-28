"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Share2, Heart, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ScriptureCardProps {
  reference: string;
  text: string;
  theme?: string;
  showActions?: boolean;
  className?: string;
}

export function ScriptureCard({ reference, text, theme, showActions = true, className }: ScriptureCardProps) {
  const [liked, setLiked] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${text}" — ${reference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className={`overflow-hidden border-accent-200/50 ${className}`}>
        <div className="h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
        <CardContent className="pt-6 pb-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0 mt-1">
              <BookOpen className="w-4 h-4 text-accent-600" />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-accent-700 mb-1">{reference}</p>
              {theme && (
                <span className="text-[10px] uppercase tracking-wider text-warm-400 font-medium">{theme}</span>
              )}
            </div>
          </div>
          <blockquote className="scripture-text text-lg leading-relaxed pl-4 border-l-2 border-accent-300/50">
            &ldquo;{text}&rdquo;
          </blockquote>
          {showActions && (
            <div className="flex items-center gap-1 mt-4 pt-3 border-t border-warm-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-500" : "text-warm-400"}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`} />
                <span className="text-xs">{liked ? "Saved" : "Save"}</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="text-warm-400">
                <Copy className="w-4 h-4 mr-1" />
                <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-warm-400">
                <Share2 className="w-4 h-4 mr-1" />
                <span className="text-xs">Share</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
