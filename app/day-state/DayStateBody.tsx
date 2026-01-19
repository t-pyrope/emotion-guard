"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { RulesList } from "@/app/day-state/RulesList";
import { CloseTheDayButton } from "@/app/day-state/CloseTheDayButton";
import { DayStateModals } from "@/app/components/DayStateModals";
import { MorningCheckin, Signal, SignalType, User } from "@/app/types";
import { formatModeWithSubtitle } from "@/app/utils/formatModeWithSubtitle";
import { LoadingBar } from "@/app/components/LoadingBar";
import { computeDayState, shouldStopTrigger } from "@/app/utils";

export const DayStateBody = ({
  signals,
  morning,
  user,
}: {
  signals: Signal[];
  morning?: MorningCheckin;
  user: User;
}) => {
  const [dayState, setDayState] = useState(() => {
    return computeDayState(morning, signals, user);
  });
  const [signalsLocal, setSignalsLocal] = useState<Signal[]>(signals);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logSignal = useCallback(
    async (signal: SignalType) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/signals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ signal, daySessionId: morning?.id }),
        });
        const json = await res.json();
        if (
          "id" in json &&
          json.id &&
          typeof json.id === "string" &&
          "createdAt" in json
        ) {
          const newSignalsLocal = [...signalsLocal];
          newSignalsLocal.push({
            id: json.id,
            signalType: signal,
            createdAt: json.createdAt,
          });
          const newDayState = computeDayState(morning, newSignalsLocal, user);
          setDayState(newDayState);
          setSignalsLocal(newSignalsLocal);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [morning, signalsLocal, user],
  );
  const mode = formatModeWithSubtitle(dayState.mode);
  const isTriggerStop = shouldStopTrigger(signalsLocal, dayState.mode);
  const isAlreadyTriggered = !!signalsLocal.find(
    (signal) => signal.signalType === "stop_triggered",
  );

  useEffect(() => {
    if (isLoading) return;
    if (isTriggerStop) {
      if (isAlreadyTriggered) {
        router.replace("/stop");
      } else {
        logSignal("stop_triggered");
      }
    }
  }, [isAlreadyTriggered, isTriggerStop, logSignal, router, isLoading]);

  return (
    <>
      {isLoading && <LoadingBar />}
      <div className="space-y-8">
        <div className="space-y-1 font-medium">
          <h2>Today’s mode: {mode.title}</h2>
          <p>{mode.subtitle}</p>
        </div>

        <RulesList rules={dayState.rules} />

        <CloseTheDayButton />
      </div>

      <DayStateModals
        logSignalAction={logSignal}
        user={user}
        morning={morning}
        signals={signalsLocal}
      />
    </>
  );
};
