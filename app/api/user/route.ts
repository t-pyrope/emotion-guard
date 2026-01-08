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
