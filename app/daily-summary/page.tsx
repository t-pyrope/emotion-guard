import {
  formatDate,
  formatMode,
  getHourAsNumber,
  getTimeline,
  mapMorningFromDB,
  mapSignalFromDB,
  mapUserFromDB,
} from "@/app/utils";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { SignalFromDB } from "@/app/types";
import {
  DEFAULT_SUMMARY_START_HOUR,
  DEFAULT_TIMEZONE,
  SIGNALS_FLAT,
} from "@/app/constants";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { PageContainer } from "@/app/components/PageContainer";
import { computeDayState } from "@/app/utils";
import { Actions } from "@/app/daily-summary/Actions";

const Block = ({
  title,
  listItems,
}: {
  title: string;
  listItems: string[];
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <h3 className="text-lg">{title}</h3>
      <ul>
        {listItems.map((listItem) => (
          <li key={listItem}>{listItem}</li>
        ))}
      </ul>
    </div>
  );
};

export default async function Page() {
  const result = await withUserDayGuard(["day-summary"]);

  const { user: userFromDB, morning: morningFromDB } = result;
  const user = mapUserFromDB(userFromDB!);
  const morning = morningFromDB ? mapMorningFromDB(morningFromDB) : undefined;

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

  const signalsAndRecoveryListItems = [
    `${signals.length} signal${signals.length !== 1 && "s"} logged`,
  ];

  if (signalsWithCount.length > 0) {
    signalsAndRecoveryListItems.push(
      `Most common: ${mostCommonSignal?.value} (${mostCommonSignal?.count})`,
    );
  }

  const isSystemIntervented = signals.some(
    (signal) => signal.signalType === "stop_triggered",
  );
  const isStopAccepted = signals.some(
    (signal) => signal.signalType === "stop_accepted",
  );

  const hour = getHourAsNumber(user?.timezone || DEFAULT_TIMEZONE);
  const summaryStartHour = user?.summaryStartHour
    ? user.summaryStartHour
    : DEFAULT_SUMMARY_START_HOUR;

  const isClosedAutomatically =
    !(morning?.state !== "closed") || hour >= summaryStartHour;
  const noActivity = !morning && !signals.length;

  const dayOverviewListItems = [
    `The system started in ${formatMode(firstDayState.mode)}`,
  ];

  if (noActivity) {
    dayOverviewListItems.push(
      `No activity detected today. The day was closed automatically at ${summaryStartHour}:00.`,
    );
  } else {
    dayOverviewListItems.push(
      modeChangedCount > 0
        ? `The mode changed ${modeChangedCount} ${modeChangedCount === 1 ? "time" : "times"} during the day`
        : `The mode didn't change during the day`,
    );

    if (isClosedAutomatically) {
      dayOverviewListItems.push("The day was closed automatically at 18:00.");
    }
  }

  return (
    <PageContainer title="Daily summary">
      <div className="flex flex-col gap-3 w-full">
        <Block title="Day overview" listItems={dayOverviewListItems} />
        {isSystemIntervented && (
          <Block
            title="System intervention"
            listItems={[
              `A stop was triggered${isStopAccepted ? " and accepted" : " and ignored"}.`,
            ]}
          />
        )}
        <Block
          title="Signals & recovery"
          listItems={signalsAndRecoveryListItems}
        />
        <div>The day is now closed.</div>
      </div>

      <Actions />
    </PageContainer>
  );
}
