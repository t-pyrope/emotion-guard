import {
  DayState,
  MorningCheckin,
  Signal,
  SignalType,
  UserFromDB,
} from "@/app/types";

const SIGNAL_WEIGHTS: Record<SignalType, number> = {
  interaction_load: 1,
  external_pressure: 1,
  took_extra: 1,
  ignored_warning: 2,
  all_good: -1,
};

export const computeDayState = (
  morning: MorningCheckin,
  signals: Signal[],
  user: UserFromDB,
): DayState => {
  // TODO: добавить учет Onboarding - main content, overload sources, action on overload, active hours
  // TODO: Morning - body, mental, contacts expected
  let loadScore = 0;

  loadScore += 3 - morning.sleepLevel;
  loadScore += 3 - morning.resourceLevel;

  for (const signal of signals) {
    loadScore += SIGNAL_WEIGHTS[signal.signalType] ?? 0;
  }

  let mode: DayState["mode"] = "normal";

  if (user.strictness_level === "gentle") {
    if (loadScore >= 4) mode = "limited";
    if (loadScore >= 6) mode = "protected";
  }

  if (user.strictness_level === "standard") {
    if (loadScore >= 3) mode = "limited";
    if (loadScore >= 5) mode = "protected";
  }

  if (user.strictness_level === "strict") {
    if (loadScore >= 2) mode = "limited";
    if (loadScore >= 4) mode = "protected";
  }

  return {
    mode,
    rules: {
      allowNewTasks: mode !== "protected",
      allowSocial: mode === "normal",
      allowDeepWork: mode === "normal",
      showWarnings: mode !== "normal",
    },
  };
};
