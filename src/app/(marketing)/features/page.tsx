"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, PenLine, Heart, Search, Users, Shield, Flame,
  ArrowRight, BookMarked, HandHeart, ChevronRight, Check,
  Sparkles, Cross, Lock, Bell, Compass, BarChart3, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: PenLine,
    title: "AI Daily Journal",
    description:
      "Write your heart out in a safe, encrypted journal. AI generates personalized devotionals with scripture, reflection, prayer prompts, and action steps tailored to your day. Each entry becomes a unique devotional crafted just for you.",
    color: "bg-primary-50 text-primary-600",
    gradient: "from-primary-50 to-primary-100/50",
    highlights: [
      "End-to-end encrypted entries",
      "AI-generated devotionals from your words",
      "Scripture matched to your feelings",
      "Daily action steps and prayer prompts",
    ],
  },
  {
    icon: Heart,
    title: "Prayer Journal",
    description:
      "Log prayer requests by category, track answered prayers, and receive AI-suggested daily prayers. Watch how God moves in your life over time with a beautiful timeline of His faithfulness.",
    color: "bg-red-50 text-red-600",
    gradient: "from-red-50 to-red-100/50",
    highlights: [
      "Categorize by family, health, work, and more",
      "Track answered prayers with dates",
      "AI-suggested daily prayers",
      "Faithfulness timeline visualization",
    ],
  },
  {
    icon: HandHeart,
    title: "Confession Guide",
    description:
      "A grace-centered, denomination-sensitive space for confession. Doubly encrypted and auto-deleted after 30 days. No judgment, only grace. Available for Catholic, Protestant, and Orthodox traditions.",
    color: "bg-purple-50 text-purple-600",
    gradient: "from-purple-50 to-purple-100/50",
    highlights: [
      "Double encryption for maximum privacy",
      "Auto-deleted after 30 days",
      "Denomination-sensitive guidance",
      "Grace-centered, never judgmental",
    ],
  },
  {
    icon: Search,
    title: "Scripture Explorer",
    description:
      "Search the entire Bible with AI-powered explanations. Understand historical context, original language insights, and apply ancient wisdom to your modern life. Cross-reference passages and explore themes.",
    color: "bg-blue-50 text-blue-600",
    gradient: "from-blue-50 to-blue-100/50",
    highlights: [
      "AI-powered verse explanations",
      "Historical and cultural context",
      "Cross-references and related passages",
      "Apply to My Life feature",
    ],
  },
  {
    icon: BookMarked,
    title: "Reading Plans",
    description:
      "Pre-built plans with AI commentary, streak tracking, and community accountability. From beginner-friendly introductions to through-the-Bible-in-a-year challenges. Never read alone.",
    color: "bg-green-50 text-green-600",
    gradient: "from-green-50 to-green-100/50",
    highlights: [
      "Beginner to advanced plans",
      "AI commentary on each passage",
      "Streak tracking and reminders",
      "Community accountability partners",
    ],
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Share devotionals, post prayer requests, celebrate testimonies, and join discussion forums. Connect with believers worldwide in a safe, moderated, uplifting space.",
    color: "bg-amber-50 text-amber-600",
    gradient: "from-amber-50 to-amber-100/50",
    highlights: [
      "Share and discover devotionals",
      "Community prayer requests",
      "Testimony celebrations",
      "Moderated discussion forums",
    ],
  },
  {
    icon: Compass,
    title: "Denomination Support",
    description:
      "Bible.ai respects your tradition. Whether Catholic, Protestant, Non-Denominational, or Orthodox, the AI adapts its theological framing to honor your beliefs and practices.",
    color: "bg-indigo-50 text-indigo-600",
    gradient: "from-indigo-50 to-indigo-100/50",
    highlights: [
      "Catholic, Protestant, Orthodox support",
      "Denomination-specific devotionals",
      "Tradition-sensitive confession guide",
      "Appropriate liturgical references",
    ],
  },
  {
    icon: Flame,
    title: "Streak & Growth Tracking",
    description:
      "Build a daily habit of faith with streak tracking, milestone celebrations, and growth insights. See how your prayer life, journaling, and scripture reading deepen over weeks and months.",
    color: "bg-orange-50 text-orange-600",
    gradient: "from-orange-50 to-orange-100/50",
    highlights: [
      "Daily streak tracking",
      "Milestone celebrations",
      "Growth insights and analytics",
      "Weekly and monthly summaries",
    ],
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Gentle, customizable reminders for your quiet time, prayer moments, and reading plan progress. Set your preferred times and Bible.ai will keep you on track without being intrusive.",
    color: "bg-teal-50 text-teal-600",
    gradient: "from-teal-50 to-teal-100/50",
    highlights: [
      "Customizable reminder times",
      "Quiet time notifications",
      "Reading plan nudges",
      "Weekly devotional digests",
    ],
  },
];

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Every journal entry and prayer is encrypted before it leaves your device. Only you can read your words.",
  },
  {
    icon: Shield,
    title: "No Ads, Ever",
    description: "Your faith journey is not our revenue stream. We never show ads or sell your data to third parties.",
  },
  {
    icon: Cross,
    title: "Theologically Sound",
    description: "Real scripture, real wisdom. Our AI is trained to provide biblically accurate and doctrinally responsible content.",
  },
  {
    icon: HandHeart,
    title: "Grace-Centered AI",
    description: "Every response is crafted with compassion, gentleness, and genuine pastoral care. No judgment, only love.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen parchment-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-primary">Bible.ai</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-warm-600 hover:text-primary transition-colors">Sign In</Link>
            <Link href="/signup">
              <Button variant="gold" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gold" className="mb-6 px-4 py-1.5 text-sm">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Features
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Everything You Need for Your{" "}
              <span className="text-gradient-gold">Faith Journey</span>
            </motion.h1>

            <motion.p
              className="text-lg text-warm-500 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From AI-powered devotionals to community prayer, every feature is designed
              with reverence, beauty, and your spiritual growth in mind.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid - Detailed Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <Card className={`overflow-hidden border-warm-100/80 hover:shadow-xl transition-shadow duration-300`}>
                  <CardContent className="p-0">
                    <div className={`grid md:grid-cols-5 gap-0 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                      {/* Icon Panel */}
                      <div className={`bg-gradient-to-br ${feature.gradient} p-8 md:p-10 flex flex-col items-center justify-center md:col-span-2`}>
                        <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 shadow-sm`}>
                          <feature.icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-primary text-center mb-2">
                          {feature.title}
                        </h3>
                        <div className="space-y-2 mt-4 w-full max-w-xs">
                          {feature.highlights.map((highlight) => (
                            <div key={highlight} className="flex items-center gap-2 text-sm text-warm-600">
                              <Check className="w-4 h-4 text-accent-500 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description Panel */}
                      <div className="p-8 md:p-10 flex flex-col justify-center md:col-span-3">
                        <p className="text-warm-600 leading-relaxed text-base mb-6">
                          {feature.description}
                        </p>
                        <Link href="/signup">
                          <Button variant="outline" size="sm" className="w-fit group">
                            Try {feature.title}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 bg-white/50 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="gold" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Privacy & Trust
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
              Built on a Foundation of Trust
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Your faith journey is sacred. We built Bible.ai with the highest standards of
              privacy, security, and theological integrity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {SECURITY_FEATURES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full text-center border-warm-100/80 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-accent-600" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-warm-500 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It All Works Together */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Your Daily Routine</Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
              How It All Comes Together
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Every feature works in harmony to deepen your daily walk with God.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Morning Quiet Time",
                description: "Open your journal, write honestly about your heart. Read your personalized devotional with scripture, reflection, and prayer prompts.",
                icon: PenLine,
                time: "Morning",
              },
              {
                step: "2",
                title: "Throughout the Day",
                description: "Log prayers as they come. Explore scripture when questions arise. Get gentle reminders to pause and connect with God.",
                icon: MessageCircle,
                time: "Midday",
              },
              {
                step: "3",
                title: "Evening Reflection",
                description: "Review your day in the community. Track your streak. See how your faith is growing week over week with beautiful insights.",
                icon: BarChart3,
                time: "Evening",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-3 -mt-6 relative z-10 border-2 border-white">
                  <span className="text-xs font-bold text-accent-700">{item.step}</span>
                </div>
                <Badge variant="outline" className="mb-3 text-xs">{item.time}</Badge>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-warm-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Cross className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
              Ready to Grow in Faith?
            </h2>
            <p className="text-lg text-warm-500 mb-8 max-w-2xl mx-auto">
              Join thousands of believers who are deepening their relationship with God through
              AI-powered devotionals, prayer tracking, and a vibrant community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button variant="gold" size="xl" className="group">
                  Begin Your Journey - It&apos;s Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="xl">
                  View Pricing
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-warm-400 mt-4">No credit card required. Start growing today.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 border-t border-primary-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-accent-400" />
                </div>
                <span className="font-serif text-lg font-bold">Bible.ai</span>
              </div>
              <p className="text-sm text-primary-200 leading-relaxed">
                AI-powered faith companion designed to help you grow closer to God every day.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-semibold mb-4 text-accent-400">Features</h4>
              <ul className="space-y-2">
                {["Journal", "Devotional", "Prayer", "Scripture", "Plans", "Community"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-sm text-primary-200 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-semibold mb-4 text-accent-400">Company</h4>
              <ul className="space-y-2">
                {["About", "Pricing", "Church Plans", "Shop", "Blog", "Contact"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-primary-200 hover:text-white transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-semibold mb-4 text-accent-400">Legal</h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-primary-200 hover:text-white transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-400/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-300">
              &copy; 2026 Bible.ai. Made with love and reverence.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-400" />
              <span className="text-xs text-primary-300">Your data is encrypted and never sold. No ads, ever.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
