import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICING_PLANS } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { tier, userId } = await request.json();

    if (!tier || !["faithful", "disciple"].includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const plan = PRICING_PLANS[tier as keyof typeof PRICING_PLANS];
    if (!("priceId" in plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        userId: userId || "",
        tier,
      },
      subscription_data: {
        trial_period_days: 7,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
