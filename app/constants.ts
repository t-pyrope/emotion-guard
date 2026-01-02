import { SignalType } from "@/app/types";

export const SIGNALS: {
  title: string;
  signals: { title: string; value: SignalType }[];
}[] = [
  {
    title: "Increase load",
    signals: [
      { title: "Interaction increased load", value: "interaction_load" },
      { title: "External pressure", value: "external_pressure" },
      { title: "Took on extra tasks", value: "took_extra" },
      { title: "Didn't stop when needed", value: "ignored_warning" },
    ],
  },
  {
    title: "Recovery",
    signals: [{ title: "Regained energy", value: "all_good" }],
  },
];

export const SIGNALS_DAILY_SUMMARY: { [key in SignalType]: string } = {
  interaction_load: "Interactions required extra energy",
  external_pressure: "External demands were high",
  took_extra: "Extra responsibilities appeared",
  ignored_warning: "Rest didn’t happen when needed",
  all_good: "You regained energy",
};

export const SIGNALS_FLAT = SIGNALS.map((signal) => signal.signals).flat();
