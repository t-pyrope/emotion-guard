import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { formatDate } from "@/app/utils";
import { getUser } from "@/app/lib/getUser";

export async function POST(req: Request) {
  const userId = (await cookies()).get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { signal } = await req.json();

  if (!signal) {
    return NextResponse.json({ error: "No signal" }, { status: 400 });
  }

  const user = await getUser(userId);

  if (!user) {
    return NextResponse.json({ error: "No user" }, { status: 404 });
  }

  const today = formatDate(user.timezone);

  const [daySession] =
    await sql`SELECT * from day_sessions WHERE user_id = ${userId} AND day_date = ${today}`;

  let daySessionId = daySession?.id;

  if (!daySession) {
    const [row] = await sql`
        INSERT INTO day_sessions (user_id, day_date)
        VALUES (${userId}, ${today})
        RETURNING id`;
    daySessionId = row.id;
  }

  const [row] = await sql`
    INSERT INTO signals (user_id, signal_type, day_session_id)
    VALUES (${userId}, ${signal}, ${daySessionId})
    RETURNING id, created_at;
  `;

  return NextResponse.json({ id: row.id, createdAt: row.created_at });
}
