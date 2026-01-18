export type SignalType =
  | "interaction_load"
  | "external_pressure"
  | "took_extra"
  | "ignored_warning"
  | "all_good"
  | "stop_triggered"
  | "stop_accepted"
  | "stop_ignored";

export type StrictnessLevel = "gentle" | "standard" | "strict";

export type MainContext = "study" | "work" | "both";

export type TypicalDailyLoad = "light" | "moderate" | "heavy";

export type ActionOnOverload = "push_through" | "shut_down" | "lose_focus";
