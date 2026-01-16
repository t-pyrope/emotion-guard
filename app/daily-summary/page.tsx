import {
  formatDate,
  formatMode,
  getTimeline,
  mapMorningFromDB,
  mapSignalFromDB,
  mapUserFromDB,
} from "@/app/utils";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { SignalFromDB } from "@/app/types";
import { SIGNALS_FLAT } from "@/app/constants";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { PageContainer } from "@/app/components/PageContainer";
import { computeDayState } from "@/app/utils";

export default async function Page() {
  const result = await withUserDayGuard(["day-summary"]);

  const { user: userFromDB, morning: morningFromDB } = result;
  const user = mapUserFromDB(userFromDB!);
  const morning = mapMorningFromDB(morningFromDB!);

  const userId = (await cookies()).get("user_id")?.value;

  const today = formatDate(user.timezone);

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

  const timeline = getTimeline(morning, user, signals);

  const modeChangedCount = timeline.filter((log) =>
    log.message.includes("Mode changed to"),
  ).length;
  const firstDayState = computeDayState(morning, [], user);
  const mostCommonSignal = signalsWithCount.at(-1);

  return (
    <PageContainer title="Daily summary">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-lg">Day overview</h3>
          <ul>
            <li>The system started in {formatMode(firstDayState.mode)}</li>
            <li>
              {modeChangedCount > 0
                ? `The mode changed ${modeChangedCount} ${modeChangedCount === 1 ? "time" : "times"} during the day`
                : `The mode didn't change during the day`}
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-lg">Signals & recovery</h3>
          <ul>
            <li>
              {signals.length} signal{signals.length !== 1 && "s"} logged
            </li>
            {signalsWithCount.length > 0 && (
              <li>
                Most common: {mostCommonSignal?.value} (
                {mostCommonSignal?.count})
              </li>
            )}
          </ul>
        </div>
        <div>The day is now closed.</div>
      </div>
    </PageContainer>
  );
}
