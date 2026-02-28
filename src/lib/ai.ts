/**
 * Bible.ai — AI Client powered by Ollama (local LLM, zero API keys)
 *
 * Connects to Ollama at http://localhost:11434/v1 using llama3.2
 * Handles devotional generation, prayer guidance, scripture exploration,
 * and confession support with denomination sensitivity.
 */

const OLLAMA_BASE_URL = "http://localhost:11434/v1";
const MODEL = "llama3.2";

type Denomination = "catholic" | "protestant" | "nondenominational" | "orthodox" | "other";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: Array<{ message: { role: string; content: string } }>;
}

export async function chat(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
    const data: ChatResponse = await response.json();
    return data.choices[0]?.message?.content ?? "No response generated.";
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Ollama is not running. Open the Ollama app from Applications.");
    }
    throw error;
  }
}

/** Generate a personalized devotional from a journal entry */
export async function generateDevotional(
  journalEntry: string,
  denomination: Denomination
): Promise<string> {
  const denomContext = getDenominationContext(denomination);

  return chat([
    {
      role: "system",
      content: `You are Bible.ai — a compassionate, wise AI faith companion that generates
      personalized daily devotionals. You read the user's journal entry and create a
      devotional that speaks directly to their heart.

      ${denomContext}

      Your devotional MUST include:
      1. **Scripture Passage** — A relevant Bible verse (include book, chapter, verse)
      2. **Reflection** — How this scripture connects to what they wrote (2-3 paragraphs)
      3. **Prayer Prompt** — A specific prayer based on their entry themes
      4. **Reflection Question** — One deep question for further thought
      5. **Action Step** — One concrete thing they can do today

      TONE: Warm, encouraging, grace-centered. Never judgmental. Meet them where they are.
      Be specific to what they wrote — this should feel deeply personal, not generic.`,
    },
    {
      role: "user",
      content: `Here is my journal entry for today:\n\n${journalEntry}`,
    },
  ], { maxTokens: 2500 });
}

/** Generate prayer suggestions based on active prayer requests */
export async function suggestPrayers(
  prayerRequests: Array<{ category: string; content: string }>,
  denomination: Denomination
): Promise<string> {
  const denomContext = getDenominationContext(denomination);

  return chat([
    {
      role: "system",
      content: `You are a prayer guide. Based on the user's active prayer requests,
      craft 3 personalized prayers they can use today. Each prayer should:
      - Address specific concerns from their requests
      - Include relevant scripture references
      - Be written in a natural, conversational prayer style
      - Be appropriate for their denomination
      ${denomContext}`,
    },
    {
      role: "user",
      content: `My prayer requests: ${JSON.stringify(prayerRequests)}`,
    },
  ]);
}

/** Confession guidance — gentle, grace-centered reflection */
export async function generateConfessionGuide(
  reflectionAreas: string[],
  denomination: Denomination
): Promise<string> {
  const denomContext = getDenominationContext(denomination);

  return chat([
    {
      role: "system",
      content: `You are a gentle spiritual guide helping with self-examination and confession.

      ${denomContext}

      CRITICAL RULES:
      - NEVER judge or condemn
      - Always lead with grace and God's love
      - Frame everything through forgiveness and renewal
      - Include scriptures about grace, mercy, and fresh starts
      - For Catholics: follow traditional examination of conscience structure
      - For Protestants: focus on personal reflection and direct relationship with God
      - Be sensitive and compassionate
      - Remind the user that this is private and between them and God`,
    },
    {
      role: "user",
      content: `I'd like to reflect on these areas: ${reflectionAreas.join(", ")}`,
    },
  ], { temperature: 0.6 });
}

/** Explain a scripture passage with context */
export async function explainScripture(
  reference: string,
  denomination: Denomination
): Promise<string> {
  const denomContext = getDenominationContext(denomination);

  return chat([
    {
      role: "system",
      content: `You are a Biblical scholar. For the given scripture reference, provide:
      1. **Historical Context** — When/where/why it was written
      2. **Original Language Insight** — Key words in Hebrew/Greek and their deeper meaning
      3. **Theological Significance** — What this passage means in the broader biblical narrative
      4. **Denominational Perspective** — How this is understood within their tradition
      5. **Personal Application** — How to apply this to daily life

      ${denomContext}
      Be accurate with scripture and scholarly in approach, but accessible in language.`,
    },
    {
      role: "user",
      content: `Explain ${reference}`,
    },
  ], { maxTokens: 2000 });
}

/** Apply a scripture to user's personal context */
export async function applyScriptureToLife(
  reference: string,
  journalContext: string,
  denomination: Denomination
): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a personal faith advisor. Take this scripture and show the user
      how it specifically applies to their life based on their recent journal entries.
      Be specific, personal, and encouraging. Include practical next steps.
      ${getDenominationContext(denomination)}`,
    },
    {
      role: "user",
      content: `Scripture: ${reference}\n\nMy recent journal context: ${journalContext}`,
    },
  ]);
}

/** Generate daily verse with brief devotional thought */
export async function generateDailyVerse(denomination: Denomination): Promise<string> {
  return chat([
    {
      role: "system",
      content: `Select a meaningful Bible verse and write a brief devotional thought (under 100 words).
      Include: the verse reference, the verse text, and a short encouraging reflection.
      ${getDenominationContext(denomination)}`,
    },
    {
      role: "user",
      content: "Give me today's verse and devotional thought.",
    },
  ], { temperature: 0.9, maxTokens: 500 });
}

/** Helper: Get denomination-specific context for AI prompts */
function getDenominationContext(denomination: Denomination): string {
  switch (denomination) {
    case "catholic":
      return `DENOMINATION: Catholic. Use NAB translation by default. Include references
      to Church tradition, saints, and sacraments where appropriate. Respect the Magisterium.`;
    case "protestant":
      return `DENOMINATION: Protestant. Use NIV or ESV translation by default. Focus on
      scripture alone (Sola Scriptura), personal relationship with God, and grace through faith.`;
    case "orthodox":
      return `DENOMINATION: Orthodox. Use OSB translation when possible. Honor the traditions
      of the Church Fathers, liturgical calendar, and theosis (union with God).`;
    case "nondenominational":
      return `DENOMINATION: Non-denominational. Use NIV translation by default. Focus on
      broad Christian principles, personal faith journey, and scripture application.`;
    default:
      return `DENOMINATION: General Christian. Use NIV translation. Focus on universal
      Christian themes of love, grace, hope, and faith.`;
  }
}

export async function checkAIStatus(): Promise<{ available: boolean; model: string; error?: string }> {
  try {
    const response = await fetch("http://localhost:11434/api/tags");
    if (!response.ok) return { available: false, model: MODEL, error: "Ollama not responding" };
    const data = await response.json();
    const found = data.models?.some((m: { name: string }) => m.name.startsWith(MODEL));
    return { available: !!found, model: MODEL, error: found ? undefined : `Model ${MODEL} not found` };
  } catch {
    return { available: false, model: MODEL, error: "Ollama is not running" };
  }
}
