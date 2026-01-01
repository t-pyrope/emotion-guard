import { SignalType } from "@/app/types";

export const SIGNALS: { title: string; value: SignalType }[] = [
  { title: "Interaction increased load", value: "interaction_load" },
  { title: "External pressure", value: "external_pressure" },
  { title: "Took on extra tasks", value: "took_extra" },
  { title: "Didn't stop when needed", value: "ignored_warning" },
  { title: "All good", value: "all_good" },
];
