import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sql } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const userId = session.metadata?.userId;
  if (!userId) {
    return NextResponse.json({ received: true });
  }

  await sql`
    UPDATE users
    SET
      weekly_reports_enabled = true,
      paid_until = NOW() + INTERVAL '1 year'
    WHERE user_id = ${userId}
  `;

  return NextResponse.json({ received: true });
}
