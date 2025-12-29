import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DayStateSignal } from "@/app/components/DayStateSignal";
import { sql } from "@/lib/db";

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

  const checkinDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: user.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const existing = await sql`
    SELECT 1
    FROM morning_checkins
    WHERE user_id = ${userId}
      AND checkin_date = ${checkinDate}
    LIMIT 1
  `;

  if (existing.length < 1) {
    redirect("/morning-check-in");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        Day state / rules of the day
        <DayStateSignal />
      </main>
    </div>
  );
}
