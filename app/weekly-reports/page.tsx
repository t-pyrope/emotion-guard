import { PageContainer } from "@/app/components/PageContainer";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { Button } from "@/app/components/buttons/Button";

export default async function Page() {
  const result = await withUserDayGuard(["day-active", "day-summary"]);
  const { user } = result;
  const isWeeklyReportsEnabled = !!user?.weekly_reports_enabled;

  return (
    <PageContainer title="Weekly reports">
      {isWeeklyReportsEnabled ? (
        <div>Content</div>
      ) : (
        <div className="flex flex-col gap-3">
          <p>Weekly reports are available with a $5/year unlock.</p>
          <Button title="Unlock Weekly Reports" />
        </div>
      )}
    </PageContainer>
  );
}
