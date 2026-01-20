import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "No user_id" }, { status: 401 });
  }

  const body = await req.json();

  const {
    timezone,
    strictnessLevel = null,
    mainContext = null,
    typicalDailyLoad = null,
    overloadSources = [],
    actionOnOverload = null,
  } = body;

  await sql`
    INSERT INTO users (
      user_id,
      timezone,
      strictness_level,
      main_context,
      typical_daily_load,
      overload_sources,
      action_on_overload
    ) VALUES (
      ${userId},
      ${timezone},
      ${strictnessLevel},
      ${mainContext},
      ${typicalDailyLoad},
      ${overloadSources},
      ${actionOnOverload}
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
      timezone = EXCLUDED.timezone,
      strictness_level = EXCLUDED.strictness_level,
      main_context = EXCLUDED.main_context,
      typical_daily_load = EXCLUDED.typical_daily_load,
      overload_sources = EXCLUDED.overload_sources,
      action_on_overload = EXCLUDED.action_on_overload
  `;

  cookieStore.set("user_id", userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json({ ok: true });
}
