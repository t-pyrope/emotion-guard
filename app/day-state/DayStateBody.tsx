"use client";

import { formatMode } from "@/app/utils";
import { RulesList } from "@/app/day-state/RulesList";
import { CloseTheDayButton } from "@/app/day-state/CloseTheDayButton";
import { DayStateSignal } from "@/app/components/DayStateSignal";
import { DayState, Signal, SignalType } from "@/app/types";
import { useState } from "react";

export const DayStateBody = ({
  signals,
  dayState,
}: {
  signals: Signal[];
  dayState: DayState;
}) => {
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
        setSignalsLocal([{ id: json.id, signalType: signal }, ...signalsLocal]);
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
