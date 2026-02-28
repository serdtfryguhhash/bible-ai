"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, BookOpen, Sparkles, ArrowRight, ChevronRight,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScriptureCard } from "@/components/shared/ScriptureCard";
import { BIBLE_BOOKS, DAILY_VERSES } from "@/constants/scripture";

const SEARCH_RESULTS = [
  { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", book: "Romans" },
  { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", book: "Jeremiah" },
  { reference: "Psalm 23:1-4", text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name's sake. Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.", book: "Psalms" },
];

const TOPICS = [
  { name: "Love", count: 687, color: "bg-red-50 text-red-600" },
  { name: "Faith", count: 458, color: "bg-blue-50 text-blue-600" },
  { name: "Hope", count: 342, color: "bg-green-50 text-green-600" },
  { name: "Peace", count: 289, color: "bg-purple-50 text-purple-600" },
  { name: "Strength", count: 256, color: "bg-amber-50 text-amber-600" },
  { name: "Forgiveness", count: 198, color: "bg-pink-50 text-pink-600" },
  { name: "Wisdom", count: 176, color: "bg-cyan-50 text-cyan-600" },
  { name: "Grace", count: 165, color: "bg-indigo-50 text-indigo-600" },
  { name: "Joy", count: 148, color: "bg-yellow-50 text-yellow-600" },
  { name: "Courage", count: 134, color: "bg-orange-50 text-orange-600" },
  { name: "Healing", count: 112, color: "bg-teal-50 text-teal-600" },
  { name: "Comfort", count: 98, color: "bg-rose-50 text-rose-600" },
];

export default function ScripturePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof SEARCH_RESULTS>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTestament, setSelectedTestament] = useState<"all" | "old" | "new">("all");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSearchResults(SEARCH_RESULTS);
    setIsSearching(false);
  };

  const filteredBooks = BIBLE_BOOKS.filter((book) => {
    if (selectedTestament === "all") return true;
    return book.testament === selectedTestament;
  });

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
            Search the entire Bible. Discover context, meaning, and how ancient wisdom applies to your life today.
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
              className="pl-12 pr-24 h-14 text-base rounded-xl shadow-sm"
            />
            <Button
              variant="gold"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-2xl mx-auto mb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-primary">
                Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <Badge variant="outline">{searchResults.length} verses</Badge>
            </div>
            {searchResults.map((result, i) => (
              <motion.div key={result.reference} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link href={`/scripture/${encodeURIComponent(result.reference)}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-serif font-semibold text-primary group-hover:text-accent-600 transition-colors mb-1">
                            {result.reference}
                          </p>
                          <blockquote className="scripture-text text-base line-clamp-3">{result.text}</blockquote>
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

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="bg-white/80 mx-auto flex w-fit">
            <TabsTrigger value="browse">Browse Bible</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

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

          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {TOPICS.map((topic, i) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-all cursor-pointer group" onClick={() => { setSearchQuery(topic.name); handleSearch(); }}>
                    <CardContent className="pt-5 pb-4">
                      <div className={`w-10 h-10 rounded-lg ${topic.color} flex items-center justify-center mb-3`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-semibold text-primary group-hover:text-accent-600 transition-colors">
                        {topic.name}
                      </h3>
                      <p className="text-xs text-warm-400 mt-0.5">{topic.count} verses</p>
                    </CardContent>
                  </Card>
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
