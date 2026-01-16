import {
  ActionOnOverload,
  MainContext,
  SignalType,
  StrictnessLevel,
  TypicalDailyLoad,
} from "@/app/types/types";

export interface UserFromDB {
  user_id: string;
  created_at: string;
  timezone: string;
  strictness_level: StrictnessLevel;
  main_context: MainContext;
  typical_daily_load: TypicalDailyLoad;
  overload_sources: Array<
    | "too_many_people"
    | "deadlines"
    | "unclear_expectations"
    | "context_switching"
  >;
  action_on_overload: ActionOnOverload;
  summary_start_hour: number | null;
}

export interface SignalFromDB {
  id: string;
  user_id: string;
  signal_type: SignalType;
  created_at: string;
}

export interface MorningCheckinFromDB {
  id: string;
  user_id: string;
  day_date: string;
  sleep_level: 1 | 2 | 3;
  body_state: 1 | 2 | 3;
  mental_state: 1 | 2 | 3;
  contacts_expected: 1 | 2 | 3;
  resource_level: 1 | 2 | 3;
  created_at: string;
  state: "open" | "closed";
}
