"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Denomination } from "@/types";

const DEMO_USER: User = {
  id: "demo-user-001",
  email: "beloved@bible.ai",
  full_name: "Beloved Child",
  denomination: "nondenominational",
  subscription_tier: "faithful",
  streak_count: 7,
  longest_streak: 30,
  total_entries: 42,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: new Date().toISOString(),
  onboarding_completed: true,
  referral_code: "BIBLE-GRACE7",
  timezone: "America/New_York",
  daily_reminder_time: "07:00",
  notification_preferences: {
    daily_devotional: true,
    prayer_reminders: true,
    community_updates: true,
    newsletter_weekly: true,
    newsletter_daily_verse: true,
  },
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(profile);
        setIsAuthenticated(true);
      } else {
        setUser(DEMO_USER);
        setIsAuthenticated(true);
      }
    } catch {
      setUser(DEMO_USER);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string): Promise<User> => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    return data || DEMO_USER;
  };

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) {
      const profile = await fetchProfile(data.user.id);
      setUser(profile);
      setIsAuthenticated(true);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string, denomination: Denomination) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, denomination } },
    });
    if (error) throw error;
    if (data.user) {
      setUser({
        ...DEMO_USER,
        id: data.user.id,
        email,
        full_name: fullName,
        denomination,
        subscription_tier: "free",
        onboarding_completed: false,
      });
      setIsAuthenticated(true);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/api/auth/callback` } });
  }, []);

  const signInWithApple = useCallback(async () => {
    await supabase.auth.signInWithOAuth({ provider: "apple", options: { redirectTo: `${window.location.origin}/api/auth/callback` } });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  }, [user]);

  return {
    user,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    updateProfile,
  };
}
