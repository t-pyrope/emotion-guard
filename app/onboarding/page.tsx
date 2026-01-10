import { OnboardingForm } from "@/app/components/OnboardingForm";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { PageContainer } from "@/app/components/PageContainer";

export default async function Page() {
  await withUserDayGuard(["no-user", "needs-onboarding"]);

  return (
    <PageContainer
      title="Onboarding"
      subtitle="A few questions to adjust the system to you."
    >
      <OnboardingForm />
    </PageContainer>
  );
}
