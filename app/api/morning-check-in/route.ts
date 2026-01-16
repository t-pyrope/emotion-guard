import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUser } from "@/app/lib/getUser";
import { formatDate } from "@/app/utils";

export async function POST(req: Request) {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    return NextResponse.json({ error: "No user_id" }, { status: 401 });
  }

  const body = await req.json();

  const {
    sleepLevel,
    bodyState,
    mentalState,
    contactsExpected,
    resourceLevel,
  } = body;

  const user = await getUser(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const checkinDate = formatDate(user.timezone);

  await sql`
        INSERT INTO day_sessions (
            user_id,
            day_date,
            sleep_level,
            body_state,
            mental_state,
            contacts_expected,
            resource_level
        ) VALUES (
            ${userId},
            ${checkinDate},
            ${sleepLevel},
            ${bodyState},
            ${mentalState},
            ${contactsExpected},
            ${resourceLevel}
        )
        ON CONFLICT (user_id, day_date)
        DO UPDATE SET
            sleep_level = EXCLUDED.sleep_level,
            body_state = EXCLUDED.body_state,
            mental_state = EXCLUDED.mental_state,
            contacts_expected = EXCLUDED.contacts_expected,
            resource_level = EXCLUDED.resource_level,
            created_at = now();
    `;

  return NextResponse.json({ ok: true });
}
