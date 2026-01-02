"use client";

import { formatMode } from "@/app/utils";
import { RulesList } from "@/app/day-state/RulesList";
import { CloseTheDayButton } from "@/app/day-state/CloseTheDayButton";
import { DayStateSignal } from "@/app/components/DayStateSignal";
import { MorningCheckin, Signal, SignalType, UserFromDB } from "@/app/types";
import { useState } from "react";
import { computeDayState } from "@/app/day-state/utils";

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

  return (
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-medium">
            Today’s mode: {formatMode(dayState.mode)}
          </h2>
        </div>

        <RulesList rules={dayState.rules} />

        <CloseTheDayButton />
      </div>

      <DayStateSignal logSignalAction={logSignal} />
    </>
  );
};
