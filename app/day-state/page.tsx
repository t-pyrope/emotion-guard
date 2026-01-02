import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { sql } from "@/lib/db";
import { computeDayState } from "@/app/day-state/utils";
import { MorningCheckinFromDB, SignalFromDB, UserFromDB } from "@/app/types";
import { mapMorningFromDB, mapSignalFromDB } from "@/app/utils";
import { getUser } from "@/app/lib/getUser";
import { Header } from "@/app/components/Header";
import { DayStateBody } from "@/app/day-state/DayStateBody";

export default async function Page() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    redirect("/onboarding");
  }

  const user = await getUser(userId);

  if (!user) {
    redirect("/onboarding");
  }

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: user.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const [morningFromDB] = await sql`
    SELECT *
    FROM day_sessions
    WHERE user_id = ${userId}
      AND day_date = ${today}
    LIMIT 1
  `;

  if (!morningFromDB) {
    redirect("/morning-check-in");
  } else if (morningFromDB.state === "closed") {
    redirect("/daily-summary");
  }

  const morning = mapMorningFromDB(morningFromDB as MorningCheckinFromDB);

  const signalsFromDB = (await sql`
    SELECT *
    FROM signals
    WHERE user_id = ${userId}
      AND created_at::date = ${today}
    ORDER BY created_at ASC
  `) as SignalFromDB[];

  const signals = signalsFromDB.map((signal) => mapSignalFromDB(signal));

  const dayState = computeDayState(morning, signals, user as UserFromDB);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        <Header title="Day state / rules of the day" />

        <DayStateBody signals={signals} dayState={dayState} />
      </main>
    </div>
  );
}
