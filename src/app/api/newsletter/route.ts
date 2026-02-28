import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Bible.ai <devotional@bible.ai>",
          to: email,
          subject: type === "daily_verse"
            ? "Your Daily Verse from Bible.ai"
            : "Your Weekly Devotional from Bible.ai",
          html: `
            <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #FFFDF7; padding: 40px; border: 1px solid #D4A843;">
              <h1 style="color: #1E3A5F; font-size: 24px; text-align: center;">Bible.ai</h1>
              <p style="color: #1C1917; font-size: 16px; line-height: 1.8;">
                Thank you for subscribing to Bible.ai's ${type === "daily_verse" ? "Daily Verse" : "Weekly Devotional"}.
              </p>
              <p style="color: #7C2D12; font-style: italic; font-size: 18px; border-left: 3px solid #D4A843; padding-left: 16px; margin: 24px 0;">
                "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
              </p>
              <p style="color: #1E3A5F; font-weight: bold;">— Jeremiah 29:11</p>
              <p style="color: #1C1917; font-size: 14px; margin-top: 24px;">
                Walk closer with God, every single day.
              </p>
            </div>
          `,
        }),
      });
    }

    if (CONVERTKIT_API_KEY) {
      await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
          tags: [type === "daily_verse" ? "daily-verse" : "weekly-devotional"],
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
