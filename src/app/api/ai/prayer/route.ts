import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();

    const prayers: Record<string, string[]> = {
      health: [
        "Heavenly Father, Great Physician, I bring before You this need for healing. You are the God who heals all our diseases. Whether You choose to heal miraculously or sustain through the journey, I trust Your goodness. Strengthen body, mind, and spirit. In Jesus' name, Amen.",
        "Lord, You know every cell in this body You created. Where there is illness, bring healing. Where there is pain, bring comfort. Where there is fear, bring faith. We trust in Your unfailing love. Amen.",
      ],
      family: [
        "Father God, You designed family as a reflection of Your love. I lift up my family to You today. Where there is distance, bring closeness. Where there is misunderstanding, bring clarity. Where there is hurt, bring healing. Unite us in Your love. Amen.",
        "Lord, bless my family with Your presence today. Help us to love each other the way You love us — unconditionally, patiently, and sacrificially. Guard our home with Your peace. Amen.",
      ],
      guidance: [
        "Lord, I stand at a crossroads and I need Your wisdom. Your Word says if any of us lacks wisdom, we should ask You, who gives generously without finding fault. I ask now. Illuminate my path. Give me clarity, courage, and peace about the direction You're leading. Amen.",
        "Father, I don't need to see the whole road — just the next step. Show me that step today. Help me to trust that You are ordering my steps even when the path seems unclear. Amen.",
      ],
      gratitude: [
        "Lord, I pause to thank You. For breath in my lungs. For grace that is new this morning. For the countless blessings I too often take for granted. You are good, and Your love endures forever. Fill my heart with gratitude today. Amen.",
      ],
      default: [
        "Gracious God, I come before You with an open heart. You know my needs before I speak them. Hear my prayer, hold me close, and give me the faith to trust You with whatever lies ahead. I love You, Lord. Amen.",
      ],
    };

    const categoryPrayers = prayers[category] || prayers.default;
    const prayer = categoryPrayers[Math.floor(Math.random() * categoryPrayers.length)];

    return NextResponse.json({ prayer, category });
  } catch (error) {
    console.error("Prayer API error:", error);
    return NextResponse.json({ error: "Failed to generate prayer suggestion" }, { status: 500 });
  }
}
