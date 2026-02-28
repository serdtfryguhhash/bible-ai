"use client";

import { useState, useCallback } from "react";
import { encryptContent, decryptContent } from "@/lib/encryption";
import type { JournalEntry } from "@/types";
import { wordCount } from "@/lib/utils";

const SAMPLE_ENTRIES: JournalEntry[] = [
  {
    id: "entry-1",
    user_id: "demo-user-001",
    date: new Date().toISOString().split("T")[0],
    encrypted_content: encryptContent("Today I felt the presence of God during my morning walk. The sunrise painted the sky in shades of gold and pink, and I was reminded of Lamentations 3:23 — His mercies are new every morning. I've been struggling with anxiety about work, but this morning I chose to surrender those worries. Lord, help me trust Your timing and Your provision. I want to walk in faith, not fear."),
    mood: "hopeful",
    tags: ["nature", "trust", "anxiety"],
    scripture_references: ["Lamentations 3:23"],
    word_count: 67,
    is_private: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "entry-2",
    user_id: "demo-user-001",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    encrypted_content: encryptContent("I had a beautiful conversation with my neighbor today about faith. She shared that she's been going through a difficult season, and I was able to pray with her. It reminded me that God places us where we are for a reason. I felt like His hands and feet today. Thank you, Lord, for using even someone as imperfect as me to share Your love."),
    mood: "grateful",
    tags: ["community", "witness", "purpose"],
    scripture_references: ["Romans 8:28"],
    word_count: 62,
    is_private: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "entry-3",
    user_id: "demo-user-001",
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    encrypted_content: encryptContent("I'm feeling heavy today. The news is overwhelming, and I find myself questioning why there is so much suffering in the world. But then I opened my Bible to Psalm 34:18 — The Lord is close to the brokenhearted. I needed that reminder. He is near, even when I cannot feel Him. Help me to be an instrument of Your peace in a broken world."),
    mood: "seeking",
    tags: ["suffering", "faith", "peace"],
    scripture_references: ["Psalm 34:18"],
    word_count: 64,
    is_private: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(SAMPLE_ENTRIES);
  const [isLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getEntry = useCallback((date: string): JournalEntry | undefined => {
    return entries.find((e) => e.date === date);
  }, [entries]);

  const getDecryptedContent = useCallback((entry: JournalEntry): string => {
    return decryptContent(entry.encrypted_content);
  }, []);

  const saveEntry = useCallback(async (
    date: string,
    content: string,
    mood?: JournalEntry["mood"],
    tags: string[] = [],
    scriptureRefs: string[] = []
  ): Promise<JournalEntry> => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const existingIndex = entries.findIndex((e) => e.date === date);
      const entry: JournalEntry = {
        id: existingIndex >= 0 ? entries[existingIndex].id : `entry-${Date.now()}`,
        user_id: "demo-user-001",
        date,
        encrypted_content: encryptContent(content),
        mood,
        tags,
        scripture_references: scriptureRefs,
        word_count: wordCount(content),
        is_private: true,
        created_at: existingIndex >= 0 ? entries[existingIndex].created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        const updated = [...entries];
        updated[existingIndex] = entry;
        setEntries(updated);
      } else {
        setEntries([entry, ...entries]);
      }

      return entry;
    } finally {
      setIsSaving(false);
    }
  }, [entries]);

  const deleteEntry = useCallback(async (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  }, [entries]);

  const getEntriesByMonth = useCallback((year: number, month: number): JournalEntry[] => {
    return entries.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [entries]);

  return {
    entries,
    isLoading,
    isSaving,
    getEntry,
    getDecryptedContent,
    saveEntry,
    deleteEntry,
    getEntriesByMonth,
  };
}
