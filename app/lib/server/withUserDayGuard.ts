import { redirect } from "next/navigation";
import { resolveUserDay, UserDayStatus } from "./resolveUserDay";
import { mapStatusToRoute } from "./mapStatusToRoute";

export async function withUserDayGuard(allowed: UserDayStatus[]) {
  const result = await resolveUserDay();

  if (!allowed.includes(result.status)) {
    redirect(mapStatusToRoute(result.status));
  }

  return result;
}
