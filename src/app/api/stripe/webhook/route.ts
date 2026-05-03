import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = supabaseAdmin;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan;

    if (!userId || !plan) {
      console.error("Missing metadata in session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const tier = "pro";

    const { error } = await supabase
      .from("users")
      .update({
        tier,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const { error } = await supabase
      .from("users")
      .update({
        tier: "free",
        stripe_subscription_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Supabase downgrade error:", error);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}