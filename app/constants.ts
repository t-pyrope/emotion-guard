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

export const SIGNALS_FLAT = SIGNALS.map((signal) => signal.signals).flat();
