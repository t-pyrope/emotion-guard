import { MorningCheckin } from "@/app/types";

export const isMorningCheckedIn = (morning?: MorningCheckin) => {
  return (
    morning &&
    (Number.isFinite(morning.bodyState) ||
      Number.isFinite(morning.contactsExpected) ||
      Number.isFinite(morning.mentalState) ||
      Number.isFinite(morning.sleepLevel) ||
      Number.isFinite(morning.resourceLevel))
  );
};
