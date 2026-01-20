import { MorningCheckInForm } from "@/app/components/MorningCheckInForm";
import { PageContainer } from "@/app/components/PageContainer";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";

export default async function Page() {
  const result = await withUserDayGuard(["day-active"]);
  const { user } = result;

  return (
    <PageContainer
      title="Morning check-in"
      subtitle="A quick check-in to adjust today’s suggestions."
    >
      <MorningCheckInForm user={user} />
    </PageContainer>
  );
}
