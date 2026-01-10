import { MorningCheckInForm } from "@/app/components/MorningCheckInForm";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { PageContainer } from "@/app/components/PageContainer";

export default async function Page() {
  await withUserDayGuard(["no-checkin"]);

  return (
    <PageContainer
      title="Morning check-in"
      subtitle="A quick check-in to adjust today’s suggestions."
    >
      <MorningCheckInForm />
    </PageContainer>
  );
}
