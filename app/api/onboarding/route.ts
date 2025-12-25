import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  const sql = neon(process.env.DATABASE_URL!);
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || crypto.randomUUID();

  const body = await req.json();

  const {
    timezone,
    strictnessLevel,
    mainContext,
    typicalDailyLoad,
    overloadSources,
    actionOnOverload,
    activeHours,
  } = body;

  await sql`
    INSERT INTO users (
      user_id,
      timezone,
      strictness_level,
      main_context,
      typical_daily_load,
      overload_sources,
      action_on_overload,
      active_hours
    ) VALUES (
      ${userId},
      ${timezone},
      ${strictnessLevel},
      ${mainContext},
      ${typicalDailyLoad},
      ${[overloadSources]},
      ${actionOnOverload},
      ${activeHours}
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
      timezone = EXCLUDED.timezone,
      strictness_level = EXCLUDED.strictness_level,
      main_context = EXCLUDED.main_context,
      typical_daily_load = EXCLUDED.typical_daily_load,
      overload_sources = EXCLUDED.overload_sources,
      action_on_overload = EXCLUDED.action_on_overload,
      active_hours = EXCLUDED.active_hours
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
