import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { MorningCheckinFromDB, SignalFromDB, UserFromDB } from "@/app/types";
import { formatDate, getHourAsNumber } from "@/app/utils";
import { DEFAULT_TIMEZONE } from "@/app/constants";

export type UserDayStatus =
  | "no-user"
  | "needs-onboarding"
  | "day-active"
  | "day-summary"
  | "stop";

export type UserDayResolution = {
  status: UserDayStatus;
  user: UserFromDB | null;
  morning?: MorningCheckinFromDB | null;
};

export async function resolveUserDay(): Promise<UserDayResolution> {
  const userId = (await cookies()).get("user_id")?.value;

  const users =
    await sql`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1`;

  const user = (users[0] || null) as UserFromDB | null;

  const today = formatDate(user ? user.timezone : DEFAULT_TIMEZONE);

  const mornings = await sql`
    SELECT *
    FROM day_sessions
    WHERE user_id = ${userId}
      AND day_date = ${today}
    LIMIT 1
  `;
  const morning = mornings[0] as MorningCheckinFromDB | undefined;

  if (user) {
    const hour = getHourAsNumber(user.timezone);
    if (
      morning?.state === "closed" ||
      (user.summary_start_hour && hour >= user.summary_start_hour)
    ) {
      return { status: "day-summary", user, morning };
    }
  }

  const signalsFromDB = (await sql`
    SELECT *
    FROM signals
    WHERE user_id = ${userId}
      AND created_at::date = ${today}
    ORDER BY created_at ASC
  `) as SignalFromDB[];

  if (
    signalsFromDB.some((signal) => signal.signal_type === "stop_triggered") &&
    !signalsFromDB.some((signal) => signal.signal_type === "stop_ignored")
  ) {
    return { status: "stop", user, morning };
  }

  return { status: "day-active", user, morning };
}
