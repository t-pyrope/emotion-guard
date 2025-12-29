import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  const userId = (await cookies()).get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { signal } = await req.json();

  if (!signal) {
    return NextResponse.json({ error: "No signal" }, { status: 400 });
  }

  await sql`
    INSERT INTO signals (user_id, signal_type)
    VALUES (${userId}, ${signal})
  `;

  return NextResponse.json({ ok: true });
}
