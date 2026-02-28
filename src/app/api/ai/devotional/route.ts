import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { journal_content, denomination, mood, preferred_themes } = await request.json();

    if (!journal_content) {
      return NextResponse.json({ error: "Journal content is required" }, { status: 400 });
    }

    const denominationContext = {
      catholic: "You are writing from a Catholic perspective. Reference Church tradition where appropriate. Be sensitive to sacramental theology.",
      protestant: "You are writing from a Protestant perspective. Emphasize sola scriptura, grace through faith, and personal relationship with Christ.",
      nondenominational: "You are writing from a non-denominational Christian perspective. Focus on the core Gospel message and personal relationship with Jesus.",
      orthodox: "You are writing from an Eastern Orthodox perspective. Be sensitive to the mystical tradition, the Church Fathers, and liturgical spirituality.",
    };

    const systemPrompt = `You are a compassionate, wise, and theologically sound Christian devotional writer. ${denominationContext[denomination as keyof typeof denominationContext] || denominationContext.nondenominational}

Your role is to:
1. Read the user's journal entry with empathy and grace
2. Generate a personalized devotional that speaks directly to their heart
3. Always be grace-centered — never judgmental, never condemning
4. Include real, accurate scripture references
5. Provide practical, specific action steps
6. Write prayer prompts that feel personal, not formulaic

Never be preachy. Be warm, genuine, and deeply caring. Write as a wise, loving spiritual mentor would speak.`;

    const userPrompt = `Based on this journal entry, generate a personalized devotional:

Journal Entry: "${journal_content}"
${mood ? `Current Mood: ${mood}` : ""}
${preferred_themes?.length ? `Preferred Themes: ${preferred_themes.join(", ")}` : ""}

Respond in JSON format:
{
  "title": "A compelling, meaningful title",
  "scripture_reference": "Book Chapter:Verse(s)",
  "scripture_text": "The full scripture text",
  "reflection": "A 2-3 paragraph reflection connecting the scripture to their journal entry",
  "prayer_prompt": "A heartfelt, personalized prayer they can pray",
  "action_step": "A specific, practical action they can take today",
  "theme": "The main theme (one word)"
}`;

    if (!OPENAI_API_KEY) {
      return NextResponse.json({
        title: "Finding Peace in the Storm",
        scripture_reference: "Philippians 4:6-7",
        scripture_text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        reflection: "Your words today reveal a heart that is both honest and seeking. You've shared your struggles openly, and that takes courage. God sees every word you've written, and He meets you right where you are — not where you think you should be.\n\nThe apostle Paul wrote these words from a prison cell, yet he spoke of peace and joy. His circumstances didn't change, but his perspective was transformed by the presence of God. Your situation may feel overwhelming right now, but remember: the same God who sustained Paul sustains you.\n\nThis isn't about pretending everything is fine. It's about bringing everything — the good, the hard, the confusing — to the One who already knows and already cares.",
        prayer_prompt: "Lord, I bring You everything I wrote about today. You know my heart better than I do. Where I am anxious, bring Your peace. Where I am uncertain, be my guide. Help me to release what I cannot control and trust that You are working all things together for good. In Jesus' name, Amen.",
        action_step: "Choose one worry from today and write it on a small piece of paper. Place it in your Bible at Philippians 4:6-7. Each time you see it, whisper a prayer of surrender.",
        theme: "peace",
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const devotional = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(devotional);
  } catch (error) {
    console.error("Devotional generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate devotional. Please try again." },
      { status: 500 }
    );
  }
}
