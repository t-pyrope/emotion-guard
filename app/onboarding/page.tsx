import { OnboardingForm } from "@/app/components/OnboardingForm";
import { PageContainer } from "@/app/components/PageContainer";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";

export default async function Page() {
  const result = await withUserDayGuard([
    "day-active",
    "day-summary",
    "needs-onboarding",
    "no-user",
  ]);

  return (
    <PageContainer
      title="Onboarding"
      subtitle="A few questions to adjust the system to you."
    >
      <OnboardingForm user={result.user} />
    </PageContainer>
  );
}
