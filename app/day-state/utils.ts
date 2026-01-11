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

const ACTION_ON_OVERLOAD_MODIFIERS = {
  push_through: {
    earlyWarnings: true,
    softenDayEarly: false,
    restrictDeepWorkEarly: false,
  },
  shut_down: {
    earlyWarnings: false,
    softenDayEarly: true,
    restrictDeepWorkEarly: false,
  },
  lose_focus: {
    earlyWarnings: false,
    softenDayEarly: false,
    restrictDeepWorkEarly: true,
  },
} as const;

const ACTIVE_HOURS_MODIFIERS = {
  morning: {
    earlyEveningRestrictions: true,
    lateTolerance: false,
    irregular: false,
  },
  day: {
    earlyEveningRestrictions: false,
    lateTolerance: false,
    irregular: false,
  },
  evening: {
    earlyEveningRestrictions: false,
    lateTolerance: true,
    irregular: false,
  },
  irregular: {
    earlyEveningRestrictions: false,
    lateTolerance: false,
    irregular: true,
  },
} as const;

export const computeDayState = (
  morning: MorningCheckin,
  signals: Signal[],
  user: User,
): DayState => {
  // TODO: Morning - body, mental, contacts expected
  let loadScore = 0;

  loadScore += 3 - morning.sleepLevel;
  loadScore += 3 - morning.resourceLevel;

  const userHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: user.timezone,
      hour: "2-digit",
      hour12: false,
    }).format(new Date()),
  );

  const activeHours = ACTIVE_HOURS_MODIFIERS[user.activeHours];
  const isLate = userHour >= 18;

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

  const actionMod = ACTION_ON_OVERLOAD_MODIFIERS[user.actionOnOverload];

  let mode: DayState["mode"] = "normal";

  const baseThresholds = THRESHOLDS[user.strictnessLevel];
  const limitedThreshold = baseThresholds.limited - dailyLoad.thresholdShift;
  const protectedThreshold =
    baseThresholds.protected - dailyLoad.thresholdShift;

  let adjustedLimitedThreshold = limitedThreshold;
  let adjustedProtectedThreshold = protectedThreshold;

  if (actionMod.softenDayEarly) {
    adjustedLimitedThreshold -= 1;
    adjustedProtectedThreshold -= 1;
  }

  if (loadScore >= adjustedLimitedThreshold) mode = "limited";
  if (loadScore >= adjustedProtectedThreshold) mode = "protected";

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
          loadScore >= adjustedLimitedThreshold
        ),

      allowDeepWork:
        mode === "normal" &&
        !(
          overloadFlags.restrictDeepWorkEarly ||
          actionMod.restrictDeepWorkEarly ||
          (activeHours.earlyEveningRestrictions && isLate)
        ),

      showWarnings:
        mode !== "normal" ||
        context.earlyWarnings ||
        dailyLoad.earlyWarnings ||
        overloadFlags.earlyWarnings ||
        actionMod.earlyWarnings ||
        activeHours.irregular,
    },
  };
};
