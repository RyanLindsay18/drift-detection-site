import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

const PRO_PRICE_ID = "price_1TSv1PAfQFAxjBxiLTwIxNDJ";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const supabase = supabaseAdmin;

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();
    if (plan !== "pro") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: PRO_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}