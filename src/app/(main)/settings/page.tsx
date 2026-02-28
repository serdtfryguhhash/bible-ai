"use client";

import React, { useState } from "react";

import {
  Settings, User, Bell, Shield, CreditCard, Church,
  Globe, Clock, Trash2, LogOut, Crown, Mail,
  Lock, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsPage() {
  const [denomination, setDenomination] = useState("nondenominational");
  const [notifications, setNotifications] = useState({
    daily_devotional: true,
    prayer_reminders: true,
    community_updates: true,
    newsletter_weekly: true,
    newsletter_daily_verse: true,
  });

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
            <Settings className="w-8 h-8 text-accent-500" />
            Settings
          </h1>
          <p className="text-warm-500 mt-1">Manage your account, preferences, and privacy.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white/80 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-xl">BC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-warm-400 mt-1">JPG or PNG, max 2MB</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-warm-700 mb-1.5 block">Full Name</label>
                    <Input defaultValue="Beloved Child" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-warm-700 mb-1.5 block">Email</label>
                    <Input defaultValue="beloved@bible.ai" type="email" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block flex items-center gap-1.5">
                    <Church className="w-3.5 h-3.5 text-warm-400" />
                    Denomination
                  </label>
                  <Select value={denomination} onValueChange={setDenomination}>
                    <SelectTrigger className="w-full sm:w-[280px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="catholic">Catholic</SelectItem>
                      <SelectItem value="protestant">Protestant</SelectItem>
                      <SelectItem value="nondenominational">Non-Denominational</SelectItem>
                      <SelectItem value="orthodox">Orthodox</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-warm-400 mt-1">Affects theological framing of devotionals and confession guide</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-warm-400" />
                    Timezone
                  </label>
                  <Select defaultValue="america_new_york">
                    <SelectTrigger className="w-full sm:w-[280px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america_new_york">Eastern (UTC-5)</SelectItem>
                      <SelectItem value="america_chicago">Central (UTC-6)</SelectItem>
                      <SelectItem value="america_denver">Mountain (UTC-7)</SelectItem>
                      <SelectItem value="america_los_angeles">Pacific (UTC-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block">Referral Code</label>
                  <div className="flex gap-2">
                    <Input defaultValue="BIBLE-GRACE7" readOnly className="font-mono" />
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                  <p className="text-xs text-warm-400 mt-1">Share this code to invite friends and earn rewards</p>
                </div>
                <Button variant="gold">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "daily_devotional", label: "Daily Devotional", description: "Receive your daily devotional and verse each morning", icon: Mail },
                  { key: "prayer_reminders", label: "Prayer Reminders", description: "Gentle reminders to pray throughout the day", icon: Clock },
                  { key: "community_updates", label: "Community Updates", description: "Notifications when someone responds to your posts or prayers", icon: Bell },
                  { key: "newsletter_weekly", label: "Weekly Newsletter", description: "A curated weekly devotional delivered to your inbox", icon: Mail },
                  { key: "newsletter_daily_verse", label: "Daily Verse Email", description: "Start each day with a verse and brief reflection", icon: Mail },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-warm-50 last:border-0">
                    <div className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-warm-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-warm-800">{item.label}</p>
                        <p className="text-xs text-warm-400">{item.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
                <div className="pt-4">
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-warm-400" />
                    Daily Reminder Time
                  </label>
                  <Input type="time" defaultValue="07:00" className="w-40" />
                </div>
                <Button variant="gold">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Your privacy is sacred to us. Your data is encrypted and never sold.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-sm text-green-800">Your Data Is Protected</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-green-700">
                    <li className="flex items-center gap-2"><Lock className="w-3 h-3" /> All journal entries are encrypted end-to-end</li>
                    <li className="flex items-center gap-2"><Lock className="w-3 h-3" /> Confession entries are doubly encrypted</li>
                    <li className="flex items-center gap-2"><Shield className="w-3 h-3" /> We never sell your data or show ads</li>
                    <li className="flex items-center gap-2"><Eye className="w-3 h-3" /> Only you can read your private content</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block">Change Password</label>
                  <div className="space-y-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">Update Password</Button>
                </div>
                <Separator />
                <div>
                  <h4 className="font-serif font-semibold text-warm-800 mb-2">Data Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Export My Data</Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 ml-2">
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      Delete All Data
                    </Button>
                  </div>
                  <p className="text-xs text-warm-400 mt-2">Deleting your data is permanent and cannot be undone.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent-50/50 rounded-xl p-5 border border-accent-100/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-accent-500" />
                      <span className="font-serif font-bold text-lg text-primary">Faithful Plan</span>
                    </div>
                    <Badge variant="gold">Active</Badge>
                  </div>
                  <p className="text-sm text-warm-500 mb-3">$7.99/month | Renews March 28, 2026</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Manage Billing</Button>
                    <Button variant="gold" size="sm">Upgrade to Disciple</Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-warm-800 mb-3">Your Plan Includes:</h4>
                  <div className="space-y-2">
                    {[
                      "Unlimited journal entries",
                      "AI-powered devotionals daily",
                      "Full prayer journal with categories",
                      "Confession guide (encrypted)",
                      "5 reading plans",
                      "Community posting",
                      "Weekly newsletter",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-warm-600">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block">Preferred Bible Translation</label>
                  <Select defaultValue="niv">
                    <SelectTrigger className="w-full sm:w-[280px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="niv">NIV (New International Version)</SelectItem>
                      <SelectItem value="esv">ESV (English Standard Version)</SelectItem>
                      <SelectItem value="kjv">KJV (King James Version)</SelectItem>
                      <SelectItem value="nlt">NLT (New Living Translation)</SelectItem>
                      <SelectItem value="nasb">NASB (New American Standard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-1.5 block">Devotional Length</label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full sm:w-[280px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (2-3 minutes)</SelectItem>
                      <SelectItem value="medium">Medium (5-7 minutes)</SelectItem>
                      <SelectItem value="long">Long (10-15 minutes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-warm-50">
                  <div>
                    <p className="text-sm font-medium text-warm-800">Include action steps in devotionals</p>
                    <p className="text-xs text-warm-400">Practical next steps based on the day&apos;s reflection</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-warm-800">Include prayer prompts</p>
                    <p className="text-xs text-warm-400">Guided prayers connected to the devotional theme</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="gold">Save Preferences</Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
