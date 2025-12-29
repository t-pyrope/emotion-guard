import {
  MorningCheckin,
  MorningCheckinFromDB,
  Signal,
  SignalFromDB,
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
    checkinDate: morningFromDB.checkin_date,
    createdAt: morningFromDB.created_at,
  };
};

export const mapSignalFromDB = (signalFromDB: SignalFromDB): Signal => {
  return {
    id: signalFromDB.id,
    signalType: signalFromDB.signal_type,
    userId: signalFromDB.user_id,
    createdAt: signalFromDB.created_at,
  };
};
