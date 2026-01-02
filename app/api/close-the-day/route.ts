import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import { getUser } from "@/app/lib/getUser";

export async function PUT() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: user.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const result = await sql`
    UPDATE day_sessions
    SET state = 'closed',
        closed_at = now()
    WHERE user_id = ${userId}
      AND day_date = ${today}
      AND state = 'open'
    RETURNING id;
  `;

  if (result.length === 0) {
    return NextResponse.json(
      { message: "Day already closed or not found" },
      { status: 200 },
    );
  }

  return NextResponse.json({ ok: true });
}
