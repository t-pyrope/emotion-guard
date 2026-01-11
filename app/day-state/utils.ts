import {
  DayState,
  MorningCheckin,
  Signal,
  SignalType,
  User,
} from "@/app/types";

const SIGNAL_WEIGHTS: Record<SignalType, number> = {
  interaction_load: 1,
  external_pressure: 1,
  took_extra: 1,
  ignored_warning: 2,
  all_good: -1,
};

const DAILY_LOAD_MODIFIERS = {
  light: {
    thresholdShift: +1,
    earlyWarnings: false,
    socialTolerance: true,
  },
  moderate: {
    thresholdShift: 0,
    earlyWarnings: false,
    socialTolerance: false,
  },
  heavy: {
    thresholdShift: -1,
    earlyWarnings: true,
    socialTolerance: false,
  },
} as const;

const THRESHOLDS = {
  gentle: { limited: 4, protected: 6 },
  standard: { limited: 3, protected: 5 },
  strict: { limited: 2, protected: 4 },
} as const;

const CONTEXT_MODIFIERS = {
  study: {
    loadBias: 1,
    earlyWarnings: false,
    restrictSocialEarly: true,
  },
  work: {
    loadBias: 0,
    earlyWarnings: false,
    restrictSocialEarly: false,
  },
  both: {
    loadBias: 1,
    earlyWarnings: true,
    restrictSocialEarly: false,
  },
} as const;

const OVERLOAD_SOURCE_MODIFIERS = {
  too_many_people: {
    interactionMultiplier: 1.5,
    restrictSocialEarly: true,
    restrictNewTasksEarly: false,
    restrictDeepWorkEarly: false,
    earlyWarnings: false,
  },
  deadlines: {
    interactionMultiplier: 1,
    restrictNewTasksEarly: true,
    restrictSocialEarly: false,
    restrictDeepWorkEarly: false,
    earlyWarnings: false,
  },
  unclear_expectations: {
    interactionMultiplier: 1,
    earlyWarnings: true,
    restrictSocialEarly: false,
    restrictNewTasksEarly: false,
    restrictDeepWorkEarly: false,
  },
  context_switching: {
    interactionMultiplier: 1,
    restrictDeepWorkEarly: true,
    restrictSocialEarly: false,
    restrictNewTasksEarly: false,
    earlyWarnings: false,
  },
} as const;

export const computeDayState = (
  morning: MorningCheckin,
  signals: Signal[],
  user: User,
): DayState => {
  // TODO: добавить учет Onboarding - overload sources, action on overload, active hours
  // TODO: Morning - body, mental, contacts expected
  let loadScore = 0;

  loadScore += 3 - morning.sleepLevel;
  loadScore += 3 - morning.resourceLevel;

  for (const signal of signals) {
    let weight = SIGNAL_WEIGHTS[signal.signalType] ?? 0;

    if (
      signal.signalType === "interaction_load" &&
      user.overloadSources.includes("too_many_people")
    ) {
      weight *= OVERLOAD_SOURCE_MODIFIERS.too_many_people.interactionMultiplier;
    }

    loadScore += weight;
  }

  const context = CONTEXT_MODIFIERS[user.mainContext];
  loadScore += context.loadBias;

  const dailyLoad = DAILY_LOAD_MODIFIERS[user.typicalDailyLoad];

  let mode: DayState["mode"] = "normal";

  const baseThresholds = THRESHOLDS[user.strictnessLevel];
  const limitedThreshold = baseThresholds.limited - dailyLoad.thresholdShift;
  const protectedThreshold =
    baseThresholds.protected - dailyLoad.thresholdShift;

  if (loadScore >= limitedThreshold) mode = "limited";
  if (loadScore >= protectedThreshold) mode = "protected";

  const overloadFlags = {
    restrictSocialEarly: false,
    restrictNewTasksEarly: false,
    restrictDeepWorkEarly: false,
    earlyWarnings: false,
  };

  for (const source of user.overloadSources) {
    const mod = OVERLOAD_SOURCE_MODIFIERS[source];
    if (!mod) continue;

    if (mod.restrictSocialEarly) overloadFlags.restrictSocialEarly = true;
    if (mod.restrictNewTasksEarly) overloadFlags.restrictNewTasksEarly = true;
    if (mod.restrictDeepWorkEarly) overloadFlags.restrictDeepWorkEarly = true;
    if (mod.earlyWarnings) overloadFlags.earlyWarnings = true;
  }

  return {
    mode,
    rules: {
      allowNewTasks:
        mode !== "protected" &&
        !(overloadFlags.restrictNewTasksEarly && mode === "limited"),
      allowSocial:
        mode === "normal" &&
        !(
          (context.restrictSocialEarly || overloadFlags.restrictSocialEarly) &&
          loadScore >= limitedThreshold
        ),

      allowDeepWork:
        mode === "normal" &&
        !(overloadFlags.restrictDeepWorkEarly && loadScore >= limitedThreshold),

      showWarnings:
        mode !== "normal" ||
        context.earlyWarnings ||
        dailyLoad.earlyWarnings ||
        overloadFlags.earlyWarnings,
    },
  };
};
