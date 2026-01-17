import { DateTime } from "luxon";

import { DayState, MorningCheckin, Signal, User } from "@/app/types";
import { computeDayState, isMorningCheckedIn } from "@/app/utils";
import { SIGNALS_DAILY_SUMMARY } from "@/app/constants";

interface TimelineEvent {
  createdAt: string;
  message: string;
  id: string;
}

export const getTimeline = (
  morning: MorningCheckin | undefined,
  user: User,
  signals: Signal[],
) => {
  const firstDayState = computeDayState(undefined, [], user);
  const morningDayState = computeDayState(morning, [], user);
  const startOfToday = DateTime.now()
    .setZone(user.timezone)
    .startOf("day")
    .toJSDate();

  const timeline: TimelineEvent[] = [
    {
      createdAt: startOfToday.toISOString(),
      message: `Mode set to ${firstDayState.mode}`,
      id: "0",
    },
  ];

  if (morning && isMorningCheckedIn(morning)) {
    timeline.push({
      createdAt: morning.createdAt,
      message: `Morning check in values entered.${morningDayState.mode !== firstDayState.mode ? ` Mode changed to ${morningDayState.mode}` : ""}`,
      id: morning.id,
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
        message = `${message}.${isModeChanged ? ` Mode changed to ${state.mode}.` : ""}${isRulesChanged ? " Rules have changed." : ""}`;
      }

      timeline.push({
        id: lastSignal.id,
        createdAt: lastSignal.createdAt,
        message,
      });

      prevState = state;
    }
  }

  return timeline;
};
