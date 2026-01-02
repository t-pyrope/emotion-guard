import { formatMode, mapMorningFromDB, mapSignalFromDB } from "@/app/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { MorningCheckinFromDB, SignalFromDB, UserFromDB } from "@/app/types";
import { computeDayState } from "@/app/day-state/utils";
import { SIGNALS } from "@/app/constants";

export default async function Page() {
  // TODO: System limited new input, Protective mode was
  //               activated, No restrictions were applied

  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    redirect("/onboarding");
  }

  const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`;

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

  const signalsWithCount = SIGNALS.map((signal) => ({
    ...signal,
    count: signals.filter((sig) => sig.signalType === signal.value).length,
  }))
    .filter((signal) => signal.count !== 0)
    .sort((a, b) => (a.count > b.count ? 1 : -1));

  const dayState = computeDayState(morning, signals, user as UserFromDB);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="font-semibold text-xl mb-1">Emotion guard</h1>
            <h2 className="max-w-xs text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
              Daily summary
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <div>The system operated in {formatMode(dayState.mode)}</div>
            <div>
              {signalsWithCount.length > 0 ? (
                <>
                  <p>Signals registered: </p>
                  {signalsWithCount.map((signal) => (
                    <p key={signal.value}>
                      {signal.title}: {signal.count}
                    </p>
                  ))}
                </>
              ) : (
                <>No signals recorded today</>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
