import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { denomination } = await request.json();

    const guidance: Record<string, string> = {
      catholic: "Thank you for your honesty before God. The very act of examining your conscience shows a heart that desires holiness. Remember, 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.' (1 John 1:9). Please bring these reflections to the Sacrament of Reconciliation with your priest, where you can receive absolution and the grace of the sacrament. You are loved beyond measure.",
      protestant: "Your willingness to bring this before God is itself an act of faith. Remember that 'there is therefore now no condemnation for those who are in Christ Jesus' (Romans 8:1). God's forgiveness is not something you earn - it is a gift already given through the cross. Receive His grace today. Consider sharing with a trusted believer for accountability and prayer (James 5:16). You are forgiven and free.",
      nondenominational: "God is not angry with you. He is waiting with open arms. 'The Lord is compassionate and gracious, slow to anger, abounding in love' (Psalm 103:8). Your honesty before Him is beautiful. You don't need to carry this burden alone. Accept the forgiveness He freely offers through Jesus. You are a new creation - the old has gone, the new is here (2 Corinthians 5:17).",
      orthodox: "In the words of St. John Chrysostom: 'Have you sinned? Enter the Church and repent, for here is the physician, not the judge.' Your repentance (metanoia) - this turning of the heart - is precious to God. Please bring these reflections before your priest in the Sacrament of Repentance for the fullness of God's healing grace. The mercy of God is infinite and His love unfailing.",
    };

    const response = guidance[denomination] || guidance.nondenominational;

    return NextResponse.json({
      guidance: response,
      scripture: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness. - 1 John 1:9",
      prayer: "Merciful Father, thank You for Your child's honesty before You. Cover them with Your grace. Heal what is broken. Restore what was lost. Fill them with Your Spirit and the assurance of Your unwavering love. In Jesus' name, Amen.",
    });
  } catch (error) {
    console.error("Confession API error:", error);
    return NextResponse.json({ error: "Failed to generate guidance" }, { status: 500 });
  }
}
