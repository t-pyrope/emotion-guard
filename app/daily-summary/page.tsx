import {
  formatMode,
  mapMorningFromDB,
  mapSignalFromDB,
  mapUserFromDB,
} from "@/app/utils";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { SignalFromDB } from "@/app/types";
import { SIGNALS_DAILY_SUMMARY, SIGNALS_FLAT } from "@/app/constants";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { PageContainer } from "@/app/components/PageContainer";
import { computeDayState } from "@/app/utils/computeDayState";

export default async function Page() {
  const result = await withUserDayGuard(["day-summary"]);

  const { user: userFromDB, morning: morningFromDB } = result;
  const user = mapUserFromDB(userFromDB!);
  const morning = mapMorningFromDB(morningFromDB!);

  const userId = (await cookies()).get("user_id")?.value;

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: user.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const signalsFromDB = (await sql`
    SELECT *
    FROM signals
    WHERE user_id = ${userId}
      AND created_at::date = ${today}
    ORDER BY created_at ASC
  `) as SignalFromDB[];

  const signals = signalsFromDB.map((signal) => mapSignalFromDB(signal));

  const signalsWithCount = SIGNALS_FLAT.map((signal) => ({
    ...signal,
    count: signals.filter((sig) => sig.signalType === signal.value).length,
  }))
    .filter((signal) => signal.count !== 0)
    .sort((a, b) => (a.count > b.count ? 1 : -1));

  const userHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: user.timezone,
      hour: "2-digit",
      hour12: false,
    }).format(new Date()),
  );

  const dayState = computeDayState(morning, signals, user, userHour);

  return (
    <PageContainer title="Daily summary">
      <div className="flex flex-col gap-2 w-full">
        <div>The system stayed in {formatMode(dayState.mode)} today</div>
        <div>
          {signalsWithCount.length > 0 ? (
            <>
              {signalsWithCount.map((signal) => (
                <p key={signal.value}>{SIGNALS_DAILY_SUMMARY[signal.value]}</p>
              ))}
            </>
          ) : (
            <>No signals recorded today</>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
