import { UserDayStatus } from "./resolveUserDay";

export function mapStatusToRoute(status: UserDayStatus): string {
  switch (status) {
    case "no-user":
    case "needs-onboarding":
      return "/onboarding";

    case "no-checkin":
      return "/morning-check-in";

    case "day-summary":
      return "/daily-summary";

    case "day-active":
      return "/day-state";
  }
}
