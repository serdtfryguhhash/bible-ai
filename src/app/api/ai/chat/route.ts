import { NextRequest, NextResponse } from "next/server";
import {
  chat,
  generateDevotional,
  suggestPrayers,
  generateConfessionGuide,
  explainScripture,
  applyScriptureToLife,
  generateDailyVerse,
} from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      action, message, journalEntry, denomination = "nondenominational",
      prayerRequests, reflectionAreas, reference, journalContext,
    } = body;

    let response: string;

    switch (action) {
      case "generate-devotional":
        response = await generateDevotional(journalEntry || message, denomination);
        break;
      case "suggest-prayers":
        response = await suggestPrayers(prayerRequests, denomination);
        break;
      case "confession-guide":
        response = await generateConfessionGuide(reflectionAreas, denomination);
        break;
      case "explain-scripture":
        response = await explainScripture(reference || message, denomination);
        break;
      case "apply-scripture":
        response = await applyScriptureToLife(reference, journalContext, denomination);
        break;
      case "daily-verse":
        response = await generateDailyVerse(denomination);
        break;
      case "chat":
      default:
        response = await chat([
          {
            role: "system",
            content: "You are Bible.ai — a compassionate faith companion. Help users with scripture, prayer, and spiritual growth. Be warm, grace-centered, and never judgmental.",
          },
          { role: "user", content: message },
        ]);
        break;
    }

    return NextResponse.json({ success: true, response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "AI request failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ available: false, error: "ANTHROPIC_API_KEY is not set" });
  }
  return NextResponse.json({ available: true, model: "claude-sonnet-4-20250514" });
}
