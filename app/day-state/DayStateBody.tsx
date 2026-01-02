"use client";

import { RulesList } from "@/app/day-state/RulesList";
import { CloseTheDayButton } from "@/app/day-state/CloseTheDayButton";
import { DayStateSignal } from "@/app/components/DayStateSignal";
import { MorningCheckin, Signal, SignalType, UserFromDB } from "@/app/types";
import { useState } from "react";
import { computeDayState } from "@/app/day-state/utils";
import { formatModeWithSubtitle } from "@/app/utils/formatModeWithSubtitle";

export const DayStateBody = ({
  signals,
  morning,
  user,
}: {
  signals: Signal[];
  morning: MorningCheckin;
  user: UserFromDB;
}) => {
  const [dayState, setDayState] = useState(() => {
    return computeDayState(morning, signals, user);
  });
  const [signalsLocal, setSignalsLocal] = useState<Signal[]>(signals);

  const logSignal = async (signal: SignalType) => {
    try {
      const res = await fetch("/api/signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signal }),
      });

      const json = await res.json();

      if ("id" in json && json.id && typeof json.id === "string") {
        const newSignalsLocal = [
          { id: json.id, signalType: signal },
          ...signalsLocal,
        ];
        const newDayState = computeDayState(morning, newSignalsLocal, user);

        setDayState(newDayState);
        setSignalsLocal(newSignalsLocal);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const mode = formatModeWithSubtitle(dayState.mode);

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-1 font-medium">
          <h2>Today’s mode: {mode.title}</h2>
          <p>{mode.subtitle}</p>
        </div>

        <RulesList rules={dayState.rules} />

        <CloseTheDayButton />
      </div>

      <DayStateSignal logSignalAction={logSignal} />
    </>
  );
};
