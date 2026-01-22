import {
  MorningCheckin,
  MorningCheckinFromDB,
  Signal,
  SignalFromDB,
  User,
  UserFromDB,
} from "@/app/types";

export const mapMorningFromDB = (
  morningFromDB: MorningCheckinFromDB,
): MorningCheckin => {
  return {
    sleepLevel: morningFromDB.sleep_level,
    bodyState: morningFromDB.body_state,
    mentalState: morningFromDB.mental_state,
    contactsExpected: morningFromDB.contacts_expected,
    resourceLevel: morningFromDB.resource_level,
    id: morningFromDB.id,
    userId: morningFromDB.id,
    dayDate: morningFromDB.day_date,
    createdAt: morningFromDB.created_at,
    state: morningFromDB.state,
  };
};

export const mapSignalFromDB = (signalFromDB: SignalFromDB): Signal => {
  return {
    id: signalFromDB.id,
    signalType: signalFromDB.signal_type,
    createdAt: signalFromDB.created_at,
  };
};

export const mapUserFromDB = (userFromDB: UserFromDB): User => {
  return {
    actionOnOverload: userFromDB.action_on_overload,
    mainContext: userFromDB.main_context,
    overloadSources: userFromDB.overload_sources,
    userId: userFromDB.user_id,
    createdAt: userFromDB.created_at,
    timezone: userFromDB.timezone,
    strictnessLevel: userFromDB.strictness_level,
    typicalDailyLoad: userFromDB.typical_daily_load,
    summaryStartHour: userFromDB.summary_start_hour,
    weeklyReportsEnabled: userFromDB.weekly_reports_enabled,
    paidUntil: userFromDB.paid_until,
  };
};
