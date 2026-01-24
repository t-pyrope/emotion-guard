import { PageContainer } from "@/app/components/PageContainer";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { UnlockWeeklyReports } from "@/app/weekly-reports/UnlockWeeklyReports";
import { sql } from "@/lib/db";
import { getWeeklySummary } from "@/app/utils";
import { WeeklySummary } from "@/app/utils/getWeeklySummary";
import { MorningCheckinFromDB, SignalFromDB } from "@/app/types";
import { Actions } from "@/app/weekly-reports/Actions";

export default async function Page() {
  const result = await withUserDayGuard(["day-active", "day-summary"]);
  const { user } = result;
  const isWeeklyReportsEnabled = !!user?.weekly_reports_enabled;
  let daysCount = 0;
  let weeklySummary: WeeklySummary | null = null;

  if (user) {
    const last7Days = (await sql`
      SELECT *
      FROM day_sessions
      WHERE user_id = ${user.user_id}
        AND day_date >= CURRENT_DATE - INTERVAL '7 days'
    `) as MorningCheckinFromDB[];

    const last7DaysSignals = (await sql`
        SELECT *
        FROM signals
        WHERE user_id = ${user.user_id}
          AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    `) as SignalFromDB[];

    weeklySummary = getWeeklySummary(last7Days, last7DaysSignals, user);

    daysCount = last7Days.length;
  }

  let subtitle: string;

  if (daysCount < 2) {
    subtitle = "Not enough data for weekly patterns yet.";
  } else if (daysCount < 7) {
    subtitle = `Based on ${daysCount} active days so far.`;
  } else {
    subtitle = "Last 7 days.";
  }

  return (
    <PageContainer title="Weekly reports">
      {isWeeklyReportsEnabled && user ? (
        <div>
          <p>{subtitle}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p>Weekly reports are available with a $1/year unlock.</p>
          <UnlockWeeklyReports user={user} />
        </div>
      )}
      {weeklySummary && (
        <div className="flex flex-col gap-4">
          <div>
            <div>Mode changes: {weeklySummary.modeChanges}</div>
            <div>
              Dominant mode{weeklySummary.dominantModes.length > 1 ? "s" : ""}:{" "}
              {weeklySummary.dominantModes.join(", ")}
            </div>
            <div>Stop signals: {weeklySummary.stopSignals}</div>
          </div>

          <Actions />
        </div>
      )}
    </PageContainer>
  );
}
