"use client";

import { useState, useCallback } from "react";
import { encryptContent, decryptContent } from "@/lib/encryption";
import type { PrayerRequest, PrayerCategory } from "@/types";

const SAMPLE_PRAYERS: PrayerRequest[] = [
  {
    id: "prayer-1",
    user_id: "demo-user-001",
    encrypted_content: encryptContent("Lord, please guide my career transition. I've been feeling called to ministry but I'm afraid to leave my stable job. Give me clarity and courage to follow Your will, not my own plans."),
    category: "guidance",
    status: "active",
    is_confession: false,
    is_public: false,
    pray_count: 14,
    created_at: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prayer-2",
    user_id: "demo-user-001",
    encrypted_content: encryptContent("Healing for my mother who was diagnosed with a chronic illness. Lord, You are the Great Physician. Whether You choose to heal her body or strengthen her spirit, we trust in Your goodness."),
    category: "health",
    status: "ongoing",
    is_confession: false,
    is_public: true,
    pray_count: 47,
    created_at: new Date(Date.now() - 1209600000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prayer-3",
    user_id: "demo-user-001",
    encrypted_content: encryptContent("Thank you, Lord, for providing the financial breakthrough we needed. The unexpected check arrived exactly when we needed it most. Your timing is always perfect."),
    category: "financial",
    status: "answered",
    is_confession: false,
    is_public: false,
    answered_date: new Date(Date.now() - 259200000).toISOString(),
    answered_note: "God provided through an unexpected source. His faithfulness is beyond what I could imagine.",
    pray_count: 21,
    created_at: new Date(Date.now() - 2592000000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "prayer-4",
    user_id: "demo-user-001",
    encrypted_content: encryptContent("Help me to be a better spouse. I've been short-tempered and impatient lately. Fill me with Your patience and gentleness. Let my words build up rather than tear down."),
    category: "relationships",
    status: "active",
    is_confession: false,
    is_public: false,
    pray_count: 8,
    created_at: new Date(Date.now() - 432000000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prayer-5",
    user_id: "demo-user-001",
    encrypted_content: encryptContent("Deepen my prayer life, Lord. I want to move beyond routine prayers into genuine communion with You. Teach me to listen as much as I speak."),
    category: "spiritual_growth",
    status: "active",
    is_confession: false,
    is_public: false,
    pray_count: 30,
    created_at: new Date(Date.now() - 864000000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function usePrayer() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(SAMPLE_PRAYERS);
  const [isLoading, setIsLoading] = useState(false);

  const addPrayer = useCallback(async (
    content: string,
    category: PrayerCategory,
    isPublic: boolean = false
  ): Promise<PrayerRequest> => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      const prayer: PrayerRequest = {
        id: `prayer-${Date.now()}`,
        user_id: "demo-user-001",
        encrypted_content: encryptContent(content),
        category,
        status: "active",
        is_confession: false,
        is_public: isPublic,
        pray_count: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPrayers([prayer, ...prayers]);
      return prayer;
    } finally {
      setIsLoading(false);
    }
  }, [prayers]);

  const markAsAnswered = useCallback(async (id: string, note: string) => {
    setPrayers(prayers.map((p) =>
      p.id === id
        ? { ...p, status: "answered" as const, answered_date: new Date().toISOString(), answered_note: note, updated_at: new Date().toISOString() }
        : p
    ));
  }, [prayers]);

  const incrementPrayCount = useCallback(async (id: string) => {
    setPrayers(prayers.map((p) =>
      p.id === id ? { ...p, pray_count: p.pray_count + 1, updated_at: new Date().toISOString() } : p
    ));
  }, [prayers]);

  const deletePrayer = useCallback(async (id: string) => {
    setPrayers(prayers.filter((p) => p.id !== id));
  }, [prayers]);

  const getDecryptedContent = useCallback((prayer: PrayerRequest): string => {
    return decryptContent(prayer.encrypted_content);
  }, []);

  const getByCategory = useCallback((category: PrayerCategory): PrayerRequest[] => {
    return prayers.filter((p) => p.category === category);
  }, [prayers]);

  const getByStatus = useCallback((status: PrayerRequest["status"]): PrayerRequest[] => {
    return prayers.filter((p) => p.status === status);
  }, [prayers]);

  return {
    prayers,
    isLoading,
    addPrayer,
    markAsAnswered,
    incrementPrayCount,
    deletePrayer,
    getDecryptedContent,
    getByCategory,
    getByStatus,
  };
}
