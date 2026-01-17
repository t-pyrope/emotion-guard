import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import { getUser } from "@/app/lib/getUser";
import { formatDate } from "@/app/utils";

export async function PUT() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const today = formatDate(user.timezone);

  const [daySession] =
    await sql`SELECT * from day_sessions WHERE user_id = ${userId} AND day_date = ${today}`;

  if (!daySession) {
    await sql`
        INSERT INTO day_sessions (user_id, day_date, state, closed_at)
        VALUES (${userId}, ${today}, 'closed', now())`;
  } else {
    await sql`
    UPDATE day_sessions
    SET state = 'closed',
        closed_at = now()
    WHERE user_id = ${userId}
      AND day_date = ${today}
  `;
  }

  return NextResponse.json({ ok: true });
}
