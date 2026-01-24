import { DateTime } from "luxon";

import { DayState, MorningCheckin, Signal, User } from "@/app/types";
import { computeDayState, isMorningCheckedIn } from "@/app/utils";
import { DEFAULT_TIMEZONE, SIGNALS_DAILY_SUMMARY } from "@/app/constants";

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

  if (morning && isMorningCheckedIn(morning)) {
    timeline.push({
      createdAt: morning.createdAt,
      message: `Morning check in values entered.${morningDayState.mode !== firstDayState.mode ? ` Mode → ${morningDayState.mode}` : ""}`,
      id: morning.id,
      currentMode: morningDayState.mode,
    });
  }

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
        message = `${message}.${isModeChanged ? ` Mode → ${state.mode}.` : ""}${isRulesChanged ? " Rules have changed." : ""}`;
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

  return timeline;
};
