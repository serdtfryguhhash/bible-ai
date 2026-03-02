import { NextRequest, NextResponse } from "next/server";
import { chat, getDenominationContext } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { prayers, denomination = "nondenominational" } = await request.json();
    const denomContext = getDenominationContext(denomination);

    const response = await chat([
      {
        role: "system",
        content: `You are Bible.ai — a compassionate prayer analyst. Analyze the user's prayer patterns and provide spiritual insights with relevant scriptures.

${denomContext}

Respond in this EXACT JSON format only, no additional text:
{"insights":[{"theme":"Theme Name","count":5,"color":"bg-blue-100 text-blue-700","scripture":"Book Chapter:Verse","scriptureText":"Verse text","message":"An encouraging insight about this prayer theme"}]}

Provide 3-5 insights. Use these color classes only: bg-blue-100 text-blue-700, bg-red-100 text-red-700, bg-purple-100 text-purple-700, bg-green-100 text-green-700, bg-amber-100 text-amber-700.`,
      },
      {
        role: "user",
        content: `Here are my prayer patterns: ${JSON.stringify(prayers)}. Please analyze them and provide insights with relevant scriptures.`,
      },
    ], { temperature: 0.7, maxTokens: 1000 });

    try {
      const parsed = JSON.parse(response);
      return NextResponse.json({ success: true, insights: parsed.insights });
    } catch {
      return NextResponse.json({
        success: true,
        insights: [
          {
            theme: "Guidance",
            count: 8,
            color: "bg-blue-100 text-blue-700",
            scripture: "Proverbs 3:5-6",
            scriptureText: "Trust in the Lord with all your heart and lean not on your own understanding.",
            message: "You have been seeking God's direction. He promises to make your paths straight.",
          },
          {
            theme: "Peace",
            count: 5,
            color: "bg-green-100 text-green-700",
            scripture: "Philippians 4:7",
            scriptureText: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
            message: "Your prayers for peace reveal a heart that knows where true rest is found.",
          },
        ],
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Prayer insights generation failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
