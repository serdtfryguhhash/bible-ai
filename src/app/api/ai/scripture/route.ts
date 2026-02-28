import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { reference, query_type, denomination } = await request.json();

    if (!reference) {
      return NextResponse.json({ error: "Scripture reference is required" }, { status: 400 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json({
        context: "This passage was written during a time of great upheaval for God's people. Understanding the historical context helps us appreciate the depth of God's promises.",
        meaning: "The original Hebrew and Greek words carry layers of meaning that English translations can only approximate. Each word was carefully chosen to convey God's heart.",
        application: "This Scripture speaks directly to our modern lives. God's truth transcends time and culture, meeting us exactly where we are today.",
        cross_references: [
          { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." },
          { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding." },
        ],
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
          {
            role: "system",
            content: "You are a biblical scholar who explains Scripture with accuracy, warmth, and accessibility. Provide historically accurate context, word studies, and practical application.",
          },
          {
            role: "user",
            content: `Explain ${reference} with focus on: ${query_type || "context, meaning, and application"}. Denomination perspective: ${denomination || "nondenominational"}. Respond in JSON: { "context": "...", "meaning": "...", "application": "...", "cross_references": [{"reference": "...", "text": "..."}] }`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    return NextResponse.json(JSON.parse(data.choices[0].message.content));
  } catch (error) {
    console.error("Scripture API error:", error);
    return NextResponse.json({ error: "Failed to analyze scripture" }, { status: 500 });
  }
}
