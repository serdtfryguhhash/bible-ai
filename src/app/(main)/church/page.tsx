"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Church, Users, BarChart3, Settings, Plus, Crown,
  Check, ArrowRight, BookMarked, Heart, TrendingUp,
  Shield, Mail, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChurchPage() {
  const [isAdmin] = useState(true);

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <Church className="w-8 h-8 text-accent-500" />
              Church Dashboard
            </h1>
            <p className="text-warm-500 mt-1">Manage your congregation&apos;s faith journey.</p>
          </div>
          <Badge variant="gold">
            <Crown className="w-3 h-3 mr-1" />
            Church Admin
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Members", value: "127", change: "+8 this month", icon: Users, color: "bg-blue-50 text-blue-600" },
            { label: "Active This Week", value: "89", change: "70% engagement", icon: TrendingUp, color: "bg-green-50 text-green-600" },
            { label: "Reading Plans", value: "3", change: "Active plans", icon: BookMarked, color: "bg-purple-50 text-purple-600" },
            { label: "Prayers Shared", value: "342", change: "Community total", icon: Heart, color: "bg-red-50 text-red-600" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-warm-400 mt-0.5">{stat.label}</p>
                    <p className="text-[10px] text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="bg-white/80 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="plans">Reading Plans</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Engagement Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-accent-500" />
                    Weekly Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                      const values = [72, 65, 78, 82, 58, 45, 89];
                      return (
                        <div key={day} className="flex items-center gap-3">
                          <span className="text-xs text-warm-400 w-8">{day}</span>
                          <div className="flex-1 bg-warm-50 rounded-full h-4 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${values[i]}%` }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                              className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full"
                            />
                          </div>
                          <span className="text-xs text-warm-500 w-8">{values[i]}%</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { user: "Sarah M.", action: "completed Day 15 of Gospels plan", time: "2 hours ago" },
                    { user: "James T.", action: "shared a devotional with the group", time: "3 hours ago" },
                    { user: "Maria L.", action: "posted a prayer request", time: "5 hours ago" },
                    { user: "David C.", action: "started the Psalms reading plan", time: "Yesterday" },
                    { user: "Emma W.", action: "marked a prayer as answered", time: "Yesterday" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-warm-50 last:border-0">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-serif font-bold text-primary">{activity.user[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm text-warm-700">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-warm-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Active Reading Plans */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Church Reading Plans</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Assign Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Journey Through the Gospels", members: 89, avgProgress: 45, daysLeft: 18 },
                    { name: "30 Days of Psalms", members: 64, avgProgress: 72, daysLeft: 8 },
                  ].map((plan) => (
                    <Card key={plan.name} className="bg-warm-50/50">
                      <CardContent className="pt-4 pb-4">
                        <h4 className="font-serif font-semibold text-primary mb-2">{plan.name}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-warm-400">{plan.members} members</span>
                          <span className="text-xs font-medium text-accent-600">{plan.avgProgress}% avg</span>
                        </div>
                        <Progress value={plan.avgProgress} />
                        <p className="text-[10px] text-warm-400 mt-2">{plan.daysLeft} days remaining</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Church Members (127)</CardTitle>
                  <Button variant="gold" size="sm">
                    <Mail className="w-3.5 h-3.5 mr-1" />
                    Invite Members
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Sarah Mitchell", email: "sarah@email.com", streak: 14, tier: "faithful", joinDate: "Jan 2024" },
                    { name: "James Thompson", email: "james@email.com", streak: 7, tier: "disciple", joinDate: "Feb 2024" },
                    { name: "Maria Lopez", email: "maria@email.com", streak: 21, tier: "faithful", joinDate: "Jan 2024" },
                    { name: "David Chen", email: "david@email.com", streak: 3, tier: "free", joinDate: "Mar 2024" },
                    { name: "Emma Wright", email: "emma@email.com", streak: 30, tier: "disciple", joinDate: "Dec 2023" },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center justify-between py-3 border-b border-warm-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-xs font-serif font-bold text-primary">{member.name.split(" ").map((n) => n[0]).join("")}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-warm-800">{member.name}</p>
                          <p className="text-xs text-warm-400">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.tier === "disciple" ? "gold" : member.tier === "faithful" ? "accent" : "outline"} className="text-[10px]">
                          {member.tier}
                        </Badge>
                        <span className="text-xs text-warm-400">{member.streak}-day streak</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card className="text-center py-12">
              <CardContent>
                <BookMarked className="w-12 h-12 text-warm-200 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">Assign Reading Plans</h3>
                <p className="text-warm-500 mb-6 max-w-md mx-auto">
                  Choose from our library of reading plans and assign them to your congregation. Track progress and engagement.
                </p>
                <Button variant="gold">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Create Church Plan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Church Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block">Church Name</label>
                  <Input defaultValue="Grace Community Church" />
                </div>
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block">Pastor / Admin Name</label>
                  <Input defaultValue="Pastor John Smith" />
                </div>
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block">Subscription Plan</label>
                  <div className="flex items-center gap-3">
                    <Badge variant="gold">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium Church Plan
                    </Badge>
                    <span className="text-sm text-warm-500">127 seats | $499/mo</span>
                  </div>
                </div>
                <Button variant="gold" className="mt-4">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
