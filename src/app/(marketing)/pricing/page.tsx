"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Check, Crown, ArrowRight, Shield, Star,
  Church, ChevronRight, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PLANS = [
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
    tier: "free" as const,
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
      "Full prayer journal with categories",
      "Confession guide (encrypted)",
      "5 reading plans",
      "Community posting",
      "Weekly newsletter",
    ],
    cta: "Start 7-Day Free Trial",
    popular: true,
    tier: "faithful" as const,
  },
  {
    name: "Disciple",
    price: "$19.99",
    period: "/month",
    description: "The complete faith companion",
    features: [
      "Everything in Faithful",
      "Unlimited AI devotionals",
      "Scripture deep-dive explanations",
      "Apply to My Life personalization",
      "All reading plans with AI commentary",
      "Church group features",
      "Priority support",
      "15% off all merch",
      "Daily & weekly newsletters",
    ],
    cta: "Start 7-Day Free Trial",
    popular: false,
    tier: "disciple" as const,
  },
];

const FAQ = [
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. You can cancel your subscription at any time with no questions asked. Your account will remain active until the end of your billing period.",
  },
  {
    q: "Is my data really private?",
    a: "Yes. All journal entries are encrypted end-to-end. Confession entries are doubly encrypted and auto-deleted after 30 days. We never sell your data or show ads. Your faith journey is between you and God.",
  },
  {
    q: "What denominations are supported?",
    a: "We support Catholic, Protestant, Non-Denominational, and Orthodox traditions. The AI adapts its theological framing based on your selected denomination, ensuring content that respects your beliefs.",
  },
  {
    q: "How does the AI generate devotionals?",
    a: "Our AI analyzes your journal entries (which only you can read) and generates personalized devotionals with relevant scripture, reflections, prayer prompts, and action steps. The AI uses theologically sound reasoning and real scripture references.",
  },
  {
    q: "Do you offer church/group plans?",
    a: "Yes! Our Church Partnership Program offers bulk subscriptions with up to 40% discount, an admin dashboard for engagement tracking, private community groups, and custom reading plans. Contact us to learn more.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! Both the Faithful and Disciple plans come with a 7-day free trial. No charge until the trial ends, and you can cancel anytime.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen parchment-bg">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-primary">Bible.ai</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-warm-600 hover:text-primary">Sign In</Link>
            <Link href="/signup"><Button variant="gold" size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
              Invest in Your Faith
            </h1>
            <p className="text-lg text-warm-500 max-w-xl mx-auto">
              No hidden fees. No ads. No data selling. Just tools designed to help you grow closer to God.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={plan.popular ? "md:-mt-4 md:mb-4" : ""}
              >
                <Card className={`h-full relative overflow-hidden ${plan.popular ? "border-accent-300 shadow-xl ring-2 ring-accent-200" : ""}`}>
                  {plan.popular && <div className="h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400" />}
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
                      <Button variant={plan.popular ? "gold" : "outline"} className="w-full" size="lg">
                        {plan.cta}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {[
                { icon: Shield, label: "End-to-End Encrypted" },
                { icon: Heart, label: "No Ads, Ever" },
                { icon: Star, label: "4.9 Star Rating" },
                { icon: Church, label: "200+ Churches" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-warm-500">
                  <item.icon className="w-4 h-4 text-accent-500" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-primary text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ.map((item) => (
                <Card key={item.q}>
                  <CardContent className="pt-5 pb-4">
                    <h3 className="font-serif font-semibold text-primary mb-2">{item.q}</h3>
                    <p className="text-sm text-warm-500 leading-relaxed">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Ready to Begin?</h2>
            <p className="text-warm-500 mb-6">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
            <Link href="/signup">
              <Button variant="gold" size="xl">
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
