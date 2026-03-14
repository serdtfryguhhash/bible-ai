import { NextRequest, NextResponse } from "next/server";
import { chat, getDenominationContext } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { denomination = "nondenominational" } = await request.json();
    const denomContext = getDenominationContext(denomination);

    const response = await chat([
      {
        role: "system",
        content: `You are Bible.ai - a compassionate faith companion generating daily scripture challenges.

${denomContext}

Generate a scripture passage with a thought-provoking reflection question. The question should invite 2-3 sentences of personal reflection.

Respond in this EXACT JSON format only, no additional text:
{"scripture":"Book Chapter:Verse","scriptureText":"The full verse text","question":"A reflection question that connects the scripture to daily life"}`,
      },
      {
        role: "user",
        content: "Generate today's scripture challenge with a reflection question.",
      },
    ], { temperature: 0.9, maxTokens: 500 });

    try {
      const parsed = JSON.parse(response);
      return NextResponse.json({ success: true, ...parsed });
    } catch {
      return NextResponse.json({
        success: true,
        scripture: "Psalm 46:10",
        scriptureText: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
        question: "What does it look like for you to 'be still' in the midst of your current season? How might God be inviting you to slow down and trust Him more deeply?",
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Challenge generation failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
