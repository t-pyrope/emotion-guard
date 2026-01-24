import { DateTime } from "luxon";
import {
  DayState,
  MorningCheckinFromDB,
  SignalFromDB,
  UserFromDB,
} from "@/app/types";
import { getTimeline } from "@/app/utils/getTimeline";
import {
  mapMorningFromDB,
  mapSignalFromDB,
  mapUserFromDB,
} from "@/app/utils/mappers";

export interface WeeklySummary {
  activeDays: number;
  modeChanges: number;
  stopSignals: number;
  dominantModes: DayState["mode"][];
}

export function getWeeklySummary(
  mornings: MorningCheckinFromDB[],
  signals: SignalFromDB[],
  user: UserFromDB,
): WeeklySummary {
  const modes: { [key in DayState["mode"]]: number } = {
    normal: 0,
    limited: 0,
    protected: 0,
  };
  const userProcessed = mapUserFromDB(user);
  let modeChangedCount = 0;

  for (const morning of mornings) {
    const signalsOfTheMorning = signals
      .filter((signal) => {
        const signalDate = DateTime.fromISO(signal.created_at, { zone: "utc" })
          .setZone(user.timezone)
          .toISODate();

        return signalDate === morning.day_date;
      })
      .map((signal) => mapSignalFromDB(signal));

    const morningProcessed = mapMorningFromDB(morning);

    const timeline = getTimeline(
      morningProcessed,
      userProcessed,
      signalsOfTheMorning,
    );

    timeline.forEach((log, i, arr) => {
      modes[log.currentMode] = modes[log.currentMode] + 1;

      if (i !== 0) {
        const prevLog = arr[i - 1];
        if (prevLog.currentMode !== log.currentMode) {
          modeChangedCount += 1;
        }
      }
    });
  }

  const stopSignals = signals.filter(
    (s) => s.signal_type === "stop_triggered",
  ).length;

  const dominantModeCount = Math.max(...Object.values(modes));
  const dominantModes = Object.entries(modes)
    .filter(([_, count]) => count === dominantModeCount)
    .map(([mode]) => mode) as DayState["mode"][];

  return {
    activeDays: mornings.length,
    modeChanges: modeChangedCount,
    stopSignals,
    dominantModes,
  };
}
