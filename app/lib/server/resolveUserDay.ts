import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { MorningCheckinFromDB, UserFromDB } from "@/app/types";

export type UserDayStatus =
  | "no-user"
  | "needs-onboarding"
  | "no-checkin"
  | "day-active"
  | "day-summary";

export type UserDayResolution = {
  status: UserDayStatus;
  user: UserFromDB | null;
  morning: MorningCheckinFromDB | null;
};

export async function resolveUserDay(): Promise<UserDayResolution> {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    return { status: "no-user", user: null, morning: null };
  }

  const users =
    await sql`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1`;

  const user = users[0] as UserFromDB;

  if (!user) {
    return { status: "needs-onboarding", user: null, morning: null };
  }

  const now = new Date();

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: user.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const mornings = await sql`
    SELECT *
    FROM day_sessions
    WHERE user_id = ${userId}
      AND day_date = ${today}
    LIMIT 1
  `;
  const morning = mornings[0] as MorningCheckinFromDB;

  if (!morning) {
    return { status: "no-checkin", user, morning: null };
  }

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: user.timezone,
      hour: "2-digit",
      hour12: false,
    }).format(now),
  );

  if (hour >= 18 || morning.state === "closed") {
    return { status: "day-summary", user, morning };
  }

  return { status: "day-active", user, morning };
}
