export interface OnboardingFormValues {
  mainContext: string;
  typicalDailyLoad: string;
  overloadSources: string;
  actionOnOverload: string;
  strictnessLevel: string;
  activeHours: string;
}

export interface Answer {
  value: string | number;
  label: string;
}

export interface OnboardingQuestion {
  question: string;
  radioGroupName: keyof OnboardingFormValues;
  answers: Answer[];
}

export interface MorningCheckInValues {
  sleepLevel: number;
  bodyState: number;
  mentalState: number;
  contactsExpected: number;
  resourceLevel: number;
}

export interface MorningCheckinFromBD {
  id: string; // UUID

  user_id: string;
  checkin_date: string; // YYYY-MM-DD

  sleep_level: 1 | 2 | 3;
  body_state: 1 | 2 | 3;
  mental_state: 1 | 2 | 3;
  contacts_expected: 1 | 2 | 3;
  resource_level: 1 | 2 | 3;

  created_at: string; // ISO timestamp
}

export interface MorningCheckInQuestion {
  question: string;
  radioGroupName: keyof MorningCheckInValues;
  answers: Answer[];
}

export type SignalType =
  | "interaction_load"
  | "external_pressure"
  | "took_extra"
  | "ignored_warning"
  | "all_good";

export interface DayState {
  mode: "normal" | "limited" | "protected";
  rules: {
    allowNewTasks: boolean;
    allowSocial: boolean;
    allowDeepWork: boolean;
    showWarnings: boolean;
  };
}

export interface UserFromBD {
  user_id: string; // UUID
  created_at: string; // ISO timestamp

  timezone: string;

  strictness_level: "gentle" | "standard" | "strict";

  main_context: "study" | "work" | "both";

  typical_daily_load: "light" | "moderate" | "heavy";

  overload_sources: string[];

  action_on_overload: "push_through" | "shut_down" | "lose_focus";

  active_hours: "morning" | "day" | "evening" | "irregular";
}

export interface SignalFromBD {
  id: string; // UUID

  user_id: string;

  signal_type: SignalType;

  created_at: string; // ISO timestamp
}
