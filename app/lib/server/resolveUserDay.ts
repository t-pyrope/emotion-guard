import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { MorningCheckinFromDB, UserFromDB } from "@/app/types";
import { formatDate, getHourAsNumber } from "@/app/utils";

export type UserDayStatus =
  | "no-user"
  | "needs-onboarding"
  | "day-active"
  | "day-summary";

export type UserDayResolution = {
  status: UserDayStatus;
  user: UserFromDB | null;
  morning?: MorningCheckinFromDB | null;
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

  const today = formatDate(user.timezone);

  const mornings = await sql`
    SELECT *
    FROM day_sessions
    WHERE user_id = ${userId}
      AND day_date = ${today}
    LIMIT 1
  `;
  const morning = mornings[0] as MorningCheckinFromDB | undefined;

  const hour = getHourAsNumber(user.timezone);

  if (
    morning?.state === "closed" ||
    (user.summary_start_hour && hour >= user.summary_start_hour)
  ) {
    return { status: "day-summary", user, morning };
  }

  return { status: "day-active", user, morning };
}
