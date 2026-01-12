import { Modal } from "@/app/components/modals/Modal";
import { DayState, MorningCheckin, Signal, User } from "@/app/types";
import { SIGNALS_DAILY_SUMMARY } from "@/app/constants";
import { computeDayState } from "@/app/utils/computeDayState";

interface TimelineEvent {
  createdAt: string;
  message: string;
  id: string;
}

export const DayTimelineModal = ({
  onCloseModal,
  signals,
  morning,
  user,
}: {
  onCloseModal: () => void;
  signals: Signal[];
  morning: MorningCheckin;
  user: User;
}) => {
  const firstDayState = computeDayState(
    morning,
    [],
    user,
    Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: user.timezone,
        hour: "2-digit",
        hour12: false,
      }).format(new Date(morning.createdAt)),
    ),
  );

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

      const userHour = Number(
        new Intl.DateTimeFormat("en-US", {
          timeZone: user.timezone,
          hour: "2-digit",
          hour12: false,
        }).format(new Date(lastSignal.createdAt)),
      );

      const state = computeDayState(morning, slice, user, userHour);

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

  return (
    <Modal onCloseModalAction={onCloseModal} title="System Log / Day Timeline">
      {timeline.map((log) => (
        <div key={log.id}>
          {new Intl.DateTimeFormat("cs-CZ", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(log.createdAt))}
          : {log.message}
        </div>
      ))}
    </Modal>
  );
};
