"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, Sparkles, ChevronRight, Tag, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScriptureCard } from "@/components/shared/ScriptureCard";
import { BIBLE_BOOKS, DAILY_VERSES } from "@/constants/scripture";
import { BIBLE_VERSES, searchVerses, getVersesByTheme, ALL_THEMES } from "@/data/verses";
import type { BibleVerse } from "@/data/verses";

const TOPIC_COLORS: Record<string, string> = {
  love: "bg-red-50 text-red-600",
  faith: "bg-blue-50 text-blue-600",
  hope: "bg-green-50 text-green-600",
  peace: "bg-purple-50 text-purple-600",
  strength: "bg-amber-50 text-amber-600",
  forgiveness: "bg-pink-50 text-pink-600",
  wisdom: "bg-cyan-50 text-cyan-600",
  grace: "bg-indigo-50 text-indigo-600",
  joy: "bg-yellow-50 text-yellow-600",
  courage: "bg-orange-50 text-orange-600",
  healing: "bg-teal-50 text-teal-600",
  comfort: "bg-rose-50 text-rose-600",
  prayer: "bg-violet-50 text-violet-600",
  trust: "bg-sky-50 text-sky-600",
  anxiety: "bg-slate-50 text-slate-600",
  guidance: "bg-emerald-50 text-emerald-600",
  salvation: "bg-fuchsia-50 text-fuchsia-600",
  identity: "bg-lime-50 text-lime-600",
  purpose: "bg-stone-50 text-stone-600",
  perseverance: "bg-zinc-50 text-zinc-600",
  protection: "bg-neutral-50 text-neutral-600",
  community: "bg-amber-50 text-amber-700",
  worship: "bg-yellow-50 text-yellow-700",
  gratitude: "bg-orange-50 text-orange-700",
  obedience: "bg-red-50 text-red-700",
  faithfulness: "bg-blue-50 text-blue-700",
};

// Count verses per theme for topic display
const THEME_COUNTS: Record<string, number> = {};
BIBLE_VERSES.forEach((v) => {
  v.themes.forEach((t) => {
    THEME_COUNTS[t] = (THEME_COUNTS[t] || 0) + 1;
  });
});

// Top themes sorted by count
const TOP_THEMES = Object.entries(THEME_COUNTS)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 20)
  .map(([theme, count]) => ({ name: theme, count }));

export default function ScripturePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [selectedTestament, setSelectedTestament] = useState<"all" | "old" | "new">("all");
  const lastSearchRef = useRef("");

  const handleSearch = (overrideQuery?: string) => {
    const query = (overrideQuery ?? searchQuery).trim();
    if (!query) return;
    if (overrideQuery) setSearchQuery(overrideQuery);
    setActiveTheme(null);
    setHasSearched(true);
    lastSearchRef.current = query;
    const results = searchVerses(query);
    setSearchResults(results);
  };

  const handleThemeClick = (theme: string) => {
    setActiveTheme(theme);
    setSearchQuery(theme);
    setHasSearched(true);
    lastSearchRef.current = theme;
    const results = getVersesByTheme(theme);
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setActiveTheme(null);
    lastSearchRef.current = "";
  };

  const filteredBooks = BIBLE_BOOKS.filter((book) => {
    if (selectedTestament === "all") return true;
    return book.testament === selectedTestament;
  });

  // Default popular verses from the dataset
  const popularVerses = useMemo(() => BIBLE_VERSES.slice(0, 10), []);

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center justify-center gap-3">
            <Search className="w-8 h-8 text-accent-500" />
            Scripture Explorer
          </h1>
          <p className="text-warm-500 mt-2 max-w-xl mx-auto">
            Search {BIBLE_VERSES.length}+ popular Bible verses by topic, book, keyword, or reference. Instant results, no API needed.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder='Search by topic, verse, or keyword (e.g., "love", "John 3:16", "anxiety")'
              className="pl-12 pr-32 h-14 text-base rounded-xl shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="h-8 w-8 text-warm-400 hover:text-warm-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="gold"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick theme tags */}
          {!hasSearched && (
            <div className="flex flex-wrap items-center gap-2 mt-3 justify-center">
              <span className="text-xs text-warm-400">Try:</span>
              {["love", "peace", "strength", "hope", "faith", "anxiety", "forgiveness"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeClick(theme)}
                  className="text-xs px-2.5 py-1 rounded-full bg-accent-50 text-accent-700 hover:bg-accent-100 transition-colors capitalize"
                >
                  {theme}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Theme Badge */}
        {activeTheme && (
          <div className="max-w-2xl mx-auto mb-4 flex items-center gap-2">
            <Badge variant="gold" className="capitalize">
              <Tag className="w-3 h-3 mr-1" />
              {activeTheme}
            </Badge>
            <button
              onClick={clearSearch}
              className="text-xs text-warm-400 hover:text-warm-600 transition-colors"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {hasSearched && searchResults.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto mb-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold text-primary">
                  Results for &ldquo;{lastSearchRef.current}&rdquo;
                </h2>
                <Badge variant="outline">{searchResults.length} verses</Badge>
              </div>
              {searchResults.map((result, i) => (
                <motion.div
                  key={result.reference}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/scripture/${encodeURIComponent(result.reference)}`}>
                    <Card className="hover:shadow-md transition-all cursor-pointer group">
                      <CardContent className="pt-5">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-serif font-semibold text-primary group-hover:text-accent-600 transition-colors mb-1">
                              {result.reference}
                            </p>
                            <blockquote className="scripture-text text-base line-clamp-3">
                              {result.text}
                            </blockquote>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.themes.slice(0, 4).map((theme) => (
                                <button
                                  key={theme}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleThemeClick(theme);
                                  }}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-600 hover:bg-accent-100 transition-colors capitalize"
                                >
                                  {theme}
                                </button>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-warm-300 group-hover:text-accent-500 transition-colors flex-shrink-0 ml-4 mt-1" />
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="ghost" size="sm" className="text-xs" onClick={(e) => e.preventDefault()}>
                            <Sparkles className="w-3 h-3 mr-1" />
                            Apply to My Life
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs" onClick={(e) => e.preventDefault()}>
                            <BookOpen className="w-3 h-3 mr-1" />
                            Context & History
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {hasSearched && searchResults.length === 0 && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto mb-10 text-center py-12"
            >
              <Search className="w-12 h-12 text-warm-200 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                No verses found for &ldquo;{lastSearchRef.current}&rdquo;
              </h3>
              <p className="text-sm text-warm-400 mb-4">
                Try a different keyword, topic, or book name. You can also browse by topic below.
              </p>
              <Button variant="outline" onClick={clearSearch}>
                Clear Search
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default Popular Verses (before search) */}
        {!hasSearched && (
          <div className="max-w-2xl mx-auto mb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-primary">
                Popular Verses
              </h2>
              <Badge variant="outline">{popularVerses.length} verses</Badge>
            </div>
            {popularVerses.map((result, i) => (
              <motion.div key={result.reference} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/scripture/${encodeURIComponent(result.reference)}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-serif font-semibold text-primary group-hover:text-accent-600 transition-colors mb-1">
                            {result.reference}
                          </p>
                          <blockquote className="scripture-text text-base line-clamp-3">{result.text}</blockquote>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.themes.slice(0, 4).map((theme) => (
                              <button
                                key={theme}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleThemeClick(theme);
                                }}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-600 hover:bg-accent-100 transition-colors capitalize"
                              >
                                {theme}
                              </button>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-warm-300 group-hover:text-accent-500 transition-colors flex-shrink-0 ml-4 mt-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="ghost" size="sm" className="text-xs" onClick={(e) => e.preventDefault()}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          Apply to My Life
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs" onClick={(e) => e.preventDefault()}>
                          <BookOpen className="w-3 h-3 mr-1" />
                          Context & History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <Tabs defaultValue="topics" className="space-y-6">
          <TabsList className="bg-white/80 mx-auto flex w-fit">
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="browse">Browse Bible</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {TOP_THEMES.map((topic, i) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="hover:shadow-md transition-all cursor-pointer group" onClick={() => handleThemeClick(topic.name)}>
                    <CardContent className="pt-5 pb-4">
                      <div className={`w-10 h-10 rounded-lg ${TOPIC_COLORS[topic.name] || "bg-warm-50 text-warm-600"} flex items-center justify-center mb-3`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-semibold text-primary group-hover:text-accent-600 transition-colors capitalize">
                        {topic.name}
                      </h3>
                      <p className="text-xs text-warm-400 mt-0.5">{topic.count} verses</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {/* Testament Filter */}
            <div className="flex items-center justify-center gap-2">
              {[
                { value: "all" as const, label: "All Books" },
                { value: "old" as const, label: "Old Testament" },
                { value: "new" as const, label: "New Testament" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedTestament === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTestament(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredBooks.map((book, i) => (
                <motion.div
                  key={book.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Link href={`/scripture/${encodeURIComponent(book.name + " 1")}`}>
                    <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                      <CardContent className="pt-4 pb-3 px-3 text-center">
                        <p className="font-serif font-semibold text-sm text-primary group-hover:text-accent-600 transition-colors truncate">
                          {book.name}
                        </p>
                        <p className="text-[10px] text-warm-400 mt-0.5">{book.chapters} chapters</p>
                        <Badge
                          variant="outline"
                          className="mt-1.5 text-[9px]"
                        >
                          {book.testament === "old" ? "OT" : "NT"}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {DAILY_VERSES.slice(0, 6).map((verse, i) => (
                <motion.div
                  key={verse.reference}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ScriptureCard
                    reference={verse.reference}
                    text={verse.text}
                    theme={verse.theme}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
