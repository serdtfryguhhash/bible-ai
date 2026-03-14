import { NextRequest, NextResponse } from "next/server";
import { chat, getDenominationContext } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { denomination = "nondenominational", context = "" } = await request.json();
    const denomContext = getDenominationContext(denomination);

    const response = await chat([
      {
        role: "system",
        content: `You are Bible.ai - selecting a daily verse that is contextually relevant to the user's spiritual season, not random.

${denomContext}

${context ? `USER SPIRITUAL CONTEXT:\n${context}` : "Select a verse that speaks to common spiritual needs: peace, guidance, strength, or hope."}

Select a verse that directly speaks to what this person needs to hear today. Explain WHY this verse was chosen for them.

Respond in this EXACT JSON format only, no additional text:
{"reference":"Book Chapter:Verse","text":"The full verse text","reason":"A brief, personal explanation of why this verse was selected for them today"}`,
      },
      {
        role: "user",
        content: "Select a personalized verse for me today.",
      },
    ], { temperature: 0.8, maxTokens: 500 });

    try {
      const parsed = JSON.parse(response);
      return NextResponse.json({ success: true, ...parsed });
    } catch {
      return NextResponse.json({
        success: true,
        reference: "Lamentations 3:22-23",
        text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
        reason: "Each day is a fresh start with God. His mercies are not recycled - they are brand new, crafted specifically for what you will face today.",
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Verse of day generation failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
