import { DateTime } from "luxon";

import { DayState, MorningCheckin, Signal, User } from "@/app/types";
import { computeDayState, isMorningCheckedIn } from "@/app/utils";
import {
  DEFAULT_TIMEZONE,
  MODE_CHANGED_STRING,
  SIGNALS_DAILY_SUMMARY,
} from "@/app/constants";

interface TimelineEvent {
  createdAt: string;
  message: string;
  id: string;
  currentMode: DayState["mode"];
}

export const getTimeline = (
  morning: MorningCheckin | undefined,
  user: User | null,
  signals: Signal[],
) => {
  const firstDayState = computeDayState(undefined, [], user);
  const morningDayState = computeDayState(morning, [], user);
  const startOfToday = DateTime.now()
    .setZone(user?.timezone || DEFAULT_TIMEZONE)
    .startOf("day")
    .toJSDate();

  const timeline: TimelineEvent[] = [
    {
      createdAt: startOfToday.toISOString(),
      message: `Mode set to ${firstDayState.mode}`,
      id: "0",
      currentMode: firstDayState.mode,
    },
  ];

  const morningCheckedIn = isMorningCheckedIn(morning);

  if (signals.length) {
    let prevState: DayState = firstDayState;

    for (let i = 0; i < signals.length; i++) {
      const slice = signals.slice(0, i + 1);
      const lastSignal = slice.at(-1)!;
      const state = computeDayState(morning, slice, user);

      let message = `${SIGNALS_DAILY_SUMMARY[lastSignal.signalType]}`;
      const isModeChanged = state.mode !== prevState.mode;
      const isRulesChanged =
        JSON.stringify(state.rules) !== JSON.stringify(prevState.rules);

      if (isModeChanged || isRulesChanged) {
        message = `${message}.${isModeChanged ? ` ${MODE_CHANGED_STRING} ${state.mode}.` : ""}${isRulesChanged ? " Rules have changed." : ""}`;
      }

      if (morning && morningCheckedIn) {
        const morningTimestamp = +morning.createdAt;
        const currSignalTimestamp = +lastSignal.createdAt;
        const prevLog = timeline.at(-1);
        const prevLogTimestamp = prevLog ? +prevLog.createdAt : 0;

        if (
          morningTimestamp < currSignalTimestamp &&
          morningTimestamp > prevLogTimestamp
        ) {
          timeline.push({
            createdAt: morning.createdAt,
            message: `Morning check in values entered.${morningDayState.mode !== prevLog?.currentMode ? ` Mode → ${morningDayState.mode}` : ""}`,
            id: morning.id,
            currentMode: morningDayState.mode,
          });
        }
      }

      timeline.push({
        id: lastSignal.id,
        createdAt: lastSignal.createdAt,
        currentMode: state.mode,
        message,
      });

      prevState = state;
    }
  }

  if (
    morning &&
    morningCheckedIn &&
    !timeline.find((log) => log.id === morning.id)
  ) {
    timeline.push({
      createdAt: morning.createdAt,
      message: `Morning check in values entered.${morningDayState.mode !== timeline.at(-1)?.currentMode ? ` Mode → ${morningDayState.mode}` : ""}`,
      id: morning.id,
      currentMode: morningDayState.mode,
    });
  }

  return timeline;
};
