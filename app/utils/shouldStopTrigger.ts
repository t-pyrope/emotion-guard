import { Signal, SignalType } from "@/app/types";
import { DateTime } from "luxon";

const OVERLOAD_TYPES = new Set<SignalType>([
  "interaction_load",
  "external_pressure",
  "took_extra",
  "ignored_warning",
]);

export const shouldStopTrigger = (signals: Signal[], mode: string) => {
  const oneHourAgo = +DateTime.now().minus({ hours: 1 }).toJSDate();

  const hasRecentOverloadSignals =
    signals.filter((s) => {
      return OVERLOAD_TYPES.has(s.signalType) && +s.createdAt >= oneHourAgo;
    }).length >= 4;

  return (
    (mode === "protected" || mode === "limited") && hasRecentOverloadSignals
  );
};
