"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Heart, MessageSquare, Share2, Plus, Sparkles,
  BookOpen, HandHeart, Star, Filter, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import type { CommunityPost } from "@/types";

const SAMPLE_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    user_id: "user-1",
    author_name: "Grace Walker",
    type: "devotional",
    title: "God's Faithfulness in the Waiting",
    content: "Today's journal entry led me to Lamentations 3:22-23 — 'His compassions never fail. They are new every morning.' I've been waiting on God for direction in my career for months. This morning, I realized the waiting IS the direction. He's teaching me patience and trust. Anyone else in a season of waiting? You're not forgotten. His mercies are new every single morning.",
    scripture_reference: "Lamentations 3:22-23",
    tags: ["waiting", "faithfulness", "patience"],
    likes_count: 84,
    comments_count: 12,
    is_pinned: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "post-2",
    user_id: "user-2",
    author_name: "David Chen",
    type: "testimony",
    title: "He Answered My Prayer!",
    content: "Three months ago I posted a prayer request here for my wife's health. Today I'm here to testify — her latest tests came back clear! God is a healer. I want to thank everyone who prayed for us. Your prayers moved mountains. Never underestimate the power of a community lifting each other up before the throne of grace.",
    tags: ["testimony", "healing", "answered-prayer"],
    likes_count: 156,
    comments_count: 34,
    is_pinned: true,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "post-3",
    user_id: "user-3",
    author_name: "Ruth Okafor",
    type: "prayer",
    title: "Please Pray for My Family",
    content: "My parents are going through a difficult season in their marriage. I'm asking this community to lift them up in prayer. Pray for reconciliation, forgiveness, and the restoration that only God can bring. Thank you, brothers and sisters.",
    tags: ["prayer-request", "family", "marriage"],
    likes_count: 67,
    comments_count: 23,
    is_pinned: false,
    created_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: "post-4",
    user_id: "user-4",
    author_name: "Michael Torres",
    type: "discussion",
    title: "How do you handle doubt?",
    content: "I've been a believer for 15 years, but lately I've been experiencing seasons of doubt. Not about God's existence, but about His goodness in the midst of suffering. How do you all navigate doubt? I'd love to hear your perspectives. I think honest conversations about this are important for our growth.",
    tags: ["doubt", "discussion", "faith"],
    likes_count: 92,
    comments_count: 41,
    is_pinned: false,
    created_at: new Date(Date.now() - 28800000).toISOString(),
  },
  {
    id: "post-5",
    user_id: "user-5",
    author_name: "Emma Wright",
    type: "devotional",
    title: "Finding God in the Mundane",
    content: "I used to think spiritual experiences had to be dramatic — a burning bush, a parting sea. But through my daily journaling with Bible.ai, I'm learning that God shows up in the quiet moments. In a child's laughter. In a stranger's kindness. In the sunrise I almost missed because I was scrolling my phone. Today, I'm choosing to pay attention.",
    scripture_reference: "Psalm 46:10",
    tags: ["presence", "mindfulness", "daily-faith"],
    likes_count: 73,
    comments_count: 8,
    is_pinned: false,
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
];

const POST_TYPE_CONFIG = {
  devotional: { icon: BookOpen, color: "bg-blue-50 text-blue-600", label: "Devotional" },
  testimony: { icon: Star, color: "bg-amber-50 text-amber-600", label: "Testimony" },
  prayer: { icon: HandHeart, color: "bg-purple-50 text-purple-600", label: "Prayer Request" },
  discussion: { icon: MessageSquare, color: "bg-green-50 text-green-600", label: "Discussion" },
};

export default function CommunityPage() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostType, setNewPostType] = useState<string>("devotional");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <Users className="w-8 h-8 text-accent-500" />
              Community
            </h1>
            <p className="text-warm-500 mt-1">Share, pray, and grow together with believers worldwide.</p>
          </div>
          <Button variant="gold" onClick={() => setShowNewPost(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            New Post
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all">
              <TabsList className="bg-white/80 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="devotional">Devotionals</TabsTrigger>
                <TabsTrigger value="testimony">Testimonies</TabsTrigger>
                <TabsTrigger value="prayer">Prayer Wall</TabsTrigger>
                <TabsTrigger value="discussion">Discussions</TabsTrigger>
              </TabsList>

              {["all", "devotional", "testimony", "prayer", "discussion"].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4">
                  {SAMPLE_POSTS.filter((p) => tab === "all" || p.type === tab).map((post, i) => {
                    const typeConfig = POST_TYPE_CONFIG[post.type];
                    const TypeIcon = typeConfig.icon;

                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card className={`hover:shadow-md transition-all ${post.is_pinned ? "border-accent-200 ring-1 ring-accent-100" : ""}`}>
                          {post.is_pinned && <div className="h-0.5 bg-gradient-to-r from-accent-400 to-accent-500" />}
                          <CardContent className="pt-5">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10 flex-shrink-0">
                                <AvatarFallback className="text-sm">{post.author_name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-warm-800">{post.author_name}</span>
                                  <span className="text-xs text-warm-400">{formatDate(post.created_at, "relative")}</span>
                                  {post.is_pinned && <Badge variant="gold" className="text-[9px]">Pinned</Badge>}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={`${typeConfig.color} text-[10px]`}>
                                    <TypeIcon className="w-2.5 h-2.5 mr-1" />
                                    {typeConfig.label}
                                  </Badge>
                                </div>
                                <h3 className="font-serif text-lg font-semibold text-primary mb-2">{post.title}</h3>
                                <p className="text-sm text-warm-600 leading-relaxed mb-3">{post.content}</p>
                                {post.scripture_reference && (
                                  <div className="bg-primary-50/50 rounded-lg px-3 py-2 mb-3 inline-block">
                                    <span className="text-xs font-serif font-semibold text-primary">{post.scripture_reference}</span>
                                  </div>
                                )}
                                {post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mb-3">
                                    {post.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-[10px]">#{tag}</Badge>
                                    ))}
                                  </div>
                                )}
                                <div className="flex items-center gap-1 pt-2 border-t border-warm-50">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleLike(post.id)}
                                    className={likedPosts.has(post.id) ? "text-red-500" : "text-warm-400"}
                                  >
                                    <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                                    <span className="text-xs">{post.likes_count + (likedPosts.has(post.id) ? 1 : 0)}</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-warm-400">
                                    <MessageSquare className="w-4 h-4 mr-1" />
                                    <span className="text-xs">{post.comments_count}</span>
                                  </Button>
                                  {post.type === "prayer" && (
                                    <Button variant="ghost" size="sm" className="text-warm-400">
                                      <HandHeart className="w-4 h-4 mr-1" />
                                      <span className="text-xs">Praying</span>
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="sm" className="text-warm-400 ml-auto">
                                    <Share2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-500" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Active Members", value: "12,847" },
                  { label: "Posts This Week", value: "423" },
                  { label: "Prayers Lifted", value: "8,291" },
                  { label: "Testimonies Shared", value: "156" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-warm-500">{stat.label}</span>
                    <span className="font-semibold text-primary">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-accent-200/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HandHeart className="w-4 h-4 text-accent-500" />
                  Prayer Wall
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {SAMPLE_POSTS.filter((p) => p.type === "prayer").slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-purple-50/50 rounded-lg p-3 border border-purple-100/30">
                    <p className="text-xs font-medium text-purple-800 mb-1">{post.author_name}</p>
                    <p className="text-xs text-purple-700 line-clamp-2">{post.content}</p>
                    <Button variant="ghost" size="sm" className="mt-1 text-[10px] text-purple-600 h-6 px-2">
                      <HandHeart className="w-3 h-3 mr-1" />
                      Pray for this
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["faith", "prayer", "gratitude", "healing", "courage", "testimony", "waiting", "trust", "peace", "worship"].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary-50 transition-colors">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New Post Dialog */}
      <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Share with the Community</DialogTitle>
            <DialogDescription>Your words can encourage, inspire, and lift up fellow believers.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={newPostType} onValueChange={setNewPostType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="devotional">Devotional</SelectItem>
                <SelectItem value="testimony">Testimony</SelectItem>
                <SelectItem value="prayer">Prayer Request</SelectItem>
                <SelectItem value="discussion">Discussion</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <Textarea
              placeholder="Share what's on your heart..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowNewPost(false)}>Cancel</Button>
            <Button variant="gold">
              <Plus className="w-4 h-4 mr-1.5" />
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
