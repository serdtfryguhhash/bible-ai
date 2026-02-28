"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  PenLine,
  Heart,
  Search,
  Users,
  ShoppingBag,
  Settings,
  Menu,
  X,
  Flame,
  Church,
  HandHeart,
  BookMarked,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NAV_ITEMS = [
  { href: "/journal", label: "Journal", icon: PenLine },
  { href: "/devotional", label: "Devotional", icon: BookOpen },
  { href: "/prayer", label: "Prayer", icon: Heart },
  { href: "/confession", label: "Confession", icon: HandHeart },
  { href: "/scripture", label: "Scripture", icon: Search },
  { href: "/plans", label: "Plans", icon: BookMarked },
  { href: "/community", label: "Community", icon: Users },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/church", label: "Church", icon: Church },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-sm border-r border-warm-100 z-40">
        {/* Logo */}
        <Link href="/journal" className="flex items-center gap-3 px-6 py-6 border-b border-warm-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-primary">Bible.ai</h1>
            <p className="text-[10px] text-warm-400 tracking-wider uppercase">Faith Companion</p>
          </div>
        </Link>

        {/* Streak */}
        <div className="px-6 py-4 border-b border-warm-100">
          <div className="flex items-center gap-2 bg-accent-50 rounded-lg px-3 py-2">
            <Flame className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium text-accent-700">7-day streak</span>
            <div className="ml-auto flex gap-0.5">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <div key={d} className="w-1.5 h-1.5 rounded-full bg-accent-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-warm-600 hover:bg-warm-50 hover:text-primary"
                )}
              >
                <item.icon className={cn("w-4.5 h-4.5", isActive ? "text-white" : "text-warm-400 group-hover:text-primary")} />
                <span className="text-sm font-medium">{item.label}</span>
                {item.label === "Confession" && (
                  <div className={cn("ml-auto w-2 h-2 rounded-full", isActive ? "bg-white/50" : "bg-accent-300")} title="Encrypted" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Upgrade Banner */}
        <div className="px-4 py-3 border-t border-warm-100">
          <Link href="/pricing">
            <div className="bg-gradient-to-r from-primary to-primary-700 rounded-xl p-3 text-white hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-accent-400" />
                <span className="text-xs font-semibold">Faithful Plan</span>
              </div>
              <p className="text-[10px] text-primary-200">Upgrade for unlimited devotionals</p>
            </div>
          </Link>
        </div>

        {/* Profile */}
        <div className="px-4 py-3 border-t border-warm-100">
          <Link href="/settings" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-warm-50 transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">BC</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-warm-800 truncate">Beloved Child</p>
              <p className="text-[10px] text-warm-400 truncate">beloved@bible.ai</p>
            </div>
            <Settings className="w-4 h-4 text-warm-400" />
          </Link>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-sm border-b border-warm-100 z-40 flex items-center justify-between px-4">
        <Link href="/journal" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-serif text-lg font-bold text-primary">Bible.ai</h1>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-accent-50 rounded-full px-2.5 py-1">
            <Flame className="w-3.5 h-3.5 text-accent-500" />
            <span className="text-xs font-medium text-accent-700">7</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-0 top-14 bg-white/98 backdrop-blur-md z-30"
          >
            <div className="p-4 space-y-1 max-h-full overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      isActive
                        ? "bg-primary text-white"
                        : "text-warm-700 hover:bg-warm-50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-warm-100 mt-4">
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-warm-700 hover:bg-warm-50"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-warm-700 hover:bg-warm-50"
                >
                  <Crown className="w-5 h-5" />
                  <span className="font-medium">Upgrade Plan</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-t border-warm-100 z-40 flex items-center justify-around px-2">
        {[
          { href: "/journal", label: "Journal", icon: PenLine },
          { href: "/devotional", label: "Devos", icon: BookOpen },
          { href: "/prayer", label: "Prayer", icon: Heart },
          { href: "/scripture", label: "Bible", icon: Search },
          { href: "/community", label: "Community", icon: Users },
        ].map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-warm-400"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
