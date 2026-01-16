import { DayState, MorningCheckin, Signal, User } from "@/app/types";
import { computeDayState } from "@/app/utils";
import { SIGNALS_DAILY_SUMMARY } from "@/app/constants";

interface TimelineEvent {
  createdAt: string;
  message: string;
  id: string;
}

export const getTimeline = (
  morning: MorningCheckin,
  user: User,
  signals: Signal[],
) => {
  const firstDayState = computeDayState(morning, [], user);

  const timeline: TimelineEvent[] = [
    {
      createdAt: morning.createdAt,
      message: `Mode set to ${firstDayState.mode}`,
      id: morning.id,
    },
  ];

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
