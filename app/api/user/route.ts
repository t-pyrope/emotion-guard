import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

export async function DELETE() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await sql`
    DELETE FROM users
    WHERE user_id = ${userId};
  `;

  cookieStore.delete("user_id");

  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json();

  if (!("summaryStartHour" in json)) {
    return NextResponse.json({ error: "No value" }, { status: 400 });
  }

  await sql`
    UPDATE users
    SET summary_start_hour = ${json.summaryStartHour}
    WHERE user_id = ${userId}
  `;

  return NextResponse.json({ ok: true });
}
