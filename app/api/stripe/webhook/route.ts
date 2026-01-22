import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

import { sql } from "@/lib/db";

let stripe: Stripe | null = null;

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    });
  }

  return stripe;
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
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

  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : null;

  const [row] = await sql`
      UPDATE users
      SET
        weekly_reports_enabled = true,
        paid_until = NOW() + INTERVAL '1 year',
        stripe_customer_id = COALESCE(stripe_customer_id, ${stripeCustomerId})
      WHERE
        user_id = ${userId}
        AND weekly_reports_enabled = false
      RETURNING email
    `;

  if (!row) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const emailToUse = row?.email;

  if (emailToUse) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    await resend.emails.send({
      from: "Daily Signal by Marmalade Skies <hello@marmaladeskies.dev>",
      to: emailToUse,
      subject: "Daily Signal - Weekly Reports unlocked",
      html: "<p>Your weekly reports are now available.</p>",
    });
  }

  return NextResponse.json({ received: true });
}
