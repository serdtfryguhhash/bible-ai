"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, PenLine, Heart, Search, Users, ShoppingBag, Shield, Flame,
  ChevronRight, Star, ArrowRight, Church, Lock, BookMarked, HandHeart,
  Crown, Check, Sparkles, Cross,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DAILY_VERSES } from "@/constants/scripture";

const FEATURES = [
  {
    icon: PenLine,
    title: "AI Daily Journal",
    description: "Write your heart out in a safe, encrypted journal. AI generates personalized devotionals with scripture, reflection, prayer prompts, and action steps tailored to your day.",
    color: "bg-primary-50 text-primary-600",
  },
  {
    icon: Heart,
    title: "Prayer Journal",
    description: "Log prayer requests by category, track answered prayers, and receive AI-suggested daily prayers. Watch how God moves in your life over time.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: HandHeart,
    title: "Confession Guide",
    description: "A grace-centered, denomination-sensitive space for confession. Doubly encrypted and auto-deleted after 30 days. No judgment, only grace.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Search,
    title: "Scripture Explorer",
    description: "Search the entire Bible with AI-powered explanations. Understand historical context and apply ancient wisdom to your modern life.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BookMarked,
    title: "Reading Plans",
    description: "Pre-built plans with AI commentary, streak tracking, and community accountability. From beginner to through-the-Bible-in-a-year.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Users,
    title: "Community",
    description: "Share devotionals, post prayer requests, celebrate testimonies, and join discussion forums. Connect with believers worldwide.",
    color: "bg-amber-50 text-amber-600",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Bible Study Leader",
    content: "Bible.ai has transformed my daily quiet time. The AI devotionals feel personally written for me, and the prayer journal has helped me see God's faithfulness in ways I never noticed before.",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Youth Pastor",
    content: "Our entire youth group uses Bible.ai. The reading plans with AI commentary make Scripture accessible to young people, and the community features keep them engaged throughout the week.",
    rating: 5,
  },
  {
    name: "Maria L.",
    role: "Catholic Parishioner",
    content: "I love that Bible.ai respects my Catholic faith. The confession guide is handled with such sensitivity and grace. The encryption gives me peace of mind to be truly honest with God.",
    rating: 5,
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Begin your faith journey",
    features: [
      "Daily verse & devotional",
      "3 journal entries per week",
      "Basic prayer journal",
      "Scripture search",
      "Community access (read only)",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Faithful",
    price: "$7.99",
    period: "/month",
    description: "Deepen your daily walk",
    features: [
      "Everything in Free",
      "Unlimited journal entries",
      "AI-powered devotionals daily",
      "Full prayer journal",
      "Confession guide (encrypted)",
      "5 reading plans",
      "Community posting",
      "Weekly newsletter",
    ],
    cta: "Start 7-Day Trial",
    popular: true,
  },
  {
    name: "Disciple",
    price: "$19.99",
    period: "/month",
    description: "The complete faith companion",
    features: [
      "Everything in Faithful",
      "Unlimited AI devotionals",
      "Scripture deep-dive",
      "Apply to My Life feature",
      "All reading plans + AI commentary",
      "Church group features",
      "Priority support",
      "15% merch discount",
    ],
    cta: "Start 7-Day Trial",
    popular: false,
  },
];

export default function LandingPage() {
  const [selectedVerse] = useState(() => DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-primary">Bible.ai</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-warm-600 hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-warm-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-warm-600 hover:text-primary transition-colors">Testimonials</a>
              <Link href="/login" className="text-sm text-warm-600 hover:text-primary transition-colors">Sign In</Link>
              <Link href="/signup">
                <Button variant="gold" size="sm">Get Started Free</Button>
              </Link>
            </div>
            <Link href="/signup" className="md:hidden">
              <Button variant="gold" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gold" className="mb-6 px-4 py-1.5 text-sm">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Your AI Faith Companion
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-primary leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Walk Closer with God,{" "}
              <span className="text-gradient-gold">Every Single Day</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-warm-500 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AI-powered devotionals crafted from your journal entries. A prayer journal that tracks
              God&apos;s faithfulness. Scripture that speaks to your life. Community that lifts you up.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/signup">
                <Button variant="gold" size="xl" className="group">
                  Begin Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/journal">
                <Button variant="outline" size="xl">
                  <BookOpen className="mr-2 w-5 h-5" />
                  Try the Demo
                </Button>
              </Link>
            </motion.div>

            {/* Daily Verse */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-accent-200/50 shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
                <CardContent className="pt-6 pb-5 px-8">
                  <p className="text-xs uppercase tracking-widest text-accent-600 font-medium mb-3">Today&apos;s Verse</p>
                  <blockquote className="scripture-text text-xl leading-relaxed mb-3">
                    &ldquo;{selectedVerse.text}&rdquo;
                  </blockquote>
                  <p className="text-sm font-serif font-semibold text-primary">{selectedVerse.reference}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white/50 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: "End-to-End Encrypted", detail: "Your entries are safe" },
              { icon: Cross, label: "Theologically Sound", detail: "Real scripture, real wisdom" },
              { icon: Lock, label: "No Ads, Ever", detail: "Your faith, not our revenue" },
              { icon: Users, label: "50,000+ Believers", detail: "Growing community" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon className="w-6 h-6 text-accent-500 mb-2" />
                <p className="font-semibold text-sm text-warm-800">{item.label}</p>
                <p className="text-xs text-warm-400 mt-0.5">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Features</Badge>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
              Everything You Need for Your Faith Journey
            </h2>
            <p className="text-lg text-warm-500 max-w-2xl mx-auto">
              From daily devotionals to community prayer, every feature is designed with reverence, beauty, and your spiritual growth in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-warm-100/80">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                    <p className="text-sm text-warm-500 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/50 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
              Your Daily Devotional in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Write Your Heart",
                description: "Open your journal and write honestly about your day, your feelings, your prayers. This is your safe space with God.",
                icon: PenLine,
              },
              {
                step: "2",
                title: "Receive Your Devotional",
                description: "AI generates a personalized devotional with relevant scripture, a heartfelt reflection, a prayer prompt, and an actionable step — all based on what you wrote.",
                icon: Sparkles,
              },
              {
                step: "3",
                title: "Grow & Share",
                description: "Track your streak, revisit past devotionals, share with the community, and watch your faith deepen day by day.",
                icon: Flame,
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
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
              Beloved by Believers Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                    <p className="text-sm text-warm-600 leading-relaxed mb-4 italic">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-warm-50">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-serif font-bold text-primary">{t.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-warm-800">{t.name}</p>
                        <p className="text-xs text-warm-400">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white/50 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Pricing</Badge>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
              Invest in Your Faith
            </h2>
            <p className="text-lg text-warm-500">No hidden fees. No ads. Just tools for spiritual growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={plan.popular ? "md:-mt-4 md:mb-4" : ""}
              >
                <Card className={`h-full relative overflow-hidden ${plan.popular ? "border-accent-300 shadow-xl ring-2 ring-accent-200" : "border-warm-100"}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />
                  )}
                  <CardContent className="pt-8 pb-6">
                    {plan.popular && (
                      <Badge variant="gold" className="absolute top-4 right-4">
                        <Crown className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="font-serif text-2xl font-bold text-primary">{plan.name}</h3>
                    <p className="text-sm text-warm-400 mt-1 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold text-warm-900">{plan.price}</span>
                      <span className="text-warm-400 text-sm">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-warm-600">
                          <Check className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/signup">
                      <Button
                        variant={plan.popular ? "gold" : "outline"}
                        className="w-full"
                        size="lg"
                      >
                        {plan.cta}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Church Partnership */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-accent-200/50">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge variant="gold" className="w-fit mb-4">
                  <Church className="w-3 h-3 mr-1" />
                  Church Partnership
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
                  Equip Your Congregation
                </h2>
                <p className="text-warm-500 mb-6 leading-relaxed">
                  Bulk subscriptions for your church. Admin dashboard to track engagement.
                  Private community groups. Custom reading plans for your congregation.
                  Help your members grow in faith together.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Bulk subscription discounts (up to 40% off)",
                    "Church admin dashboard with engagement metrics",
                    "Private church community groups",
                    "Custom reading plans for your congregation",
                    "Dedicated onboarding support",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-warm-600">
                      <Check className="w-4 h-4 text-accent-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="/church">
                  <Button variant="gold" size="lg">
                    Learn About Church Plans
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="leather-texture p-8 md:p-12 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Church className="w-10 h-10 text-accent-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Join 200+ Churches</h3>
                <p className="text-primary-200 text-sm leading-relaxed max-w-sm">
                  From small groups to mega-churches, Bible.ai is helping congregations
                  engage with Scripture and prayer like never before.
                </p>
                <div className="flex items-center gap-6 mt-8">
                  {[
                    { number: "200+", label: "Churches" },
                    { number: "15K+", label: "Members" },
                    { number: "4.9", label: "Rating" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold text-accent-400">{stat.number}</p>
                      <p className="text-xs text-primary-200">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Merch Preview */}
      <section className="py-20 bg-white/50 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="mb-4">
            <ShoppingBag className="w-3 h-3 mr-1" />
            Faith Merch
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            Wear Your Faith
          </h2>
          <p className="text-lg text-warm-500 max-w-2xl mx-auto mb-12">
            Premium journals, scripture art prints, and apparel designed to inspire your daily walk.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Leather Prayer Journal", price: "$34.99", category: "Journals" },
              { name: "Be Still Tee", price: "$29.99", category: "Apparel" },
              { name: "Psalm 23 Art Print", price: "$24.99", category: "Art" },
              { name: "Faith Over Fear Mug", price: "$18.99", category: "Accessories" },
            ].map((product) => (
              <Card key={product.name} className="hover:shadow-md transition-shadow overflow-hidden group">
                <div className="aspect-square bg-gradient-to-br from-warm-50 to-warm-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-warm-200 group-hover:text-accent-300 transition-colors" />
                </div>
                <CardContent className="pt-4 pb-4">
                  <Badge variant="outline" className="mb-2 text-[10px]">{product.category}</Badge>
                  <p className="font-serif font-semibold text-sm text-primary">{product.name}</p>
                  <p className="text-sm text-accent-600 font-medium mt-1">{product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link href="/shop" className="inline-block mt-8">
            <Button variant="outline" size="lg">
              Visit the Shop
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
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
              Your Faith Journey Starts Today
            </h2>
            <p className="text-lg text-warm-500 mb-8 max-w-2xl mx-auto">
              Join thousands of believers who are deepening their relationship with God through
              daily devotionals, prayer, and community.
            </p>
            <Link href="/signup">
              <Button variant="gold" size="xl" className="group">
                Begin Your Journey — It&apos;s Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
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
