import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { getUser } from "@/app/lib/getUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: userId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Weekly Reports (1 year)",
          },
          unit_amount: 100, // $1 = 100 cents
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.APP_URL}/weekly-reports?success=1`,
    cancel_url: `${process.env.APP_URL}/weekly-reports?canceled=1`,
    metadata: {
      userId: userId,
    },
  });

  return NextResponse.json({ url: session.url });
}
