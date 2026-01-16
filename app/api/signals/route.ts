import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  const userId = (await cookies()).get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { signal, daySessionId } = await req.json();

  if (!signal) {
    return NextResponse.json({ error: "No signal" }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO signals (user_id, signal_type, day_session_id)
    VALUES (${userId}, ${signal}, ${daySessionId})
    RETURNING id, created_at;
  `;

  return NextResponse.json({ id: row.id, createdAt: row.created_at });
}
