import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DayStateSignal } from "@/app/components/DayStateSignal";
import { sql } from "@/lib/db";
import { computeDayState } from "@/app/day-state/utils";
import {
  MorningCheckinFromDB,
  MorningCheckInValues,
  SignalFromDB,
  UserFromDB,
} from "@/app/types";

export default async function Page() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    redirect("/onboarding");
  }

  const [user] =
    await sql`SELECT 1 FROM users WHERE user_id = ${userId} LIMIT 1`;

  if (!user) {
    redirect("/onboarding");
  }

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: user.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const existing = (await sql`
    SELECT 1
    FROM morning_checkins
    WHERE user_id = ${userId}
      AND checkin_date = ${today}
    LIMIT 1
  `) as MorningCheckinFromDB[];

  if (existing.length < 1) {
    redirect("/morning-check-in");
  }

  const morningFromBD = existing[0];

  const morning: MorningCheckInValues = {
    sleepLevel: morningFromBD.sleep_level,
    bodyState: morningFromBD.body_state,
    mentalState: morningFromBD.mental_state,
    contactsExpected: morningFromBD.contacts_expected,
    resourceLevel: morningFromBD.resource_level,
  };

  const signals = (await sql`
    SELECT *
    FROM signals
    WHERE user_id = ${userId}
      AND created_at::date = ${today}
    ORDER BY created_at ASC
  `) as SignalFromDB[];

  const dayState = computeDayState(
    morning,
    signals.map((signal) => signal.signal_type),
    user as UserFromDB,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        Day state / rules of the day
        <div>{dayState.mode}</div>
        <DayStateSignal />
      </main>
    </div>
  );
}
