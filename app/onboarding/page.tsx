import { OnboardingForm } from "@/app/components/OnboardingForm";
import { PageContainer } from "@/app/components/PageContainer";

export default async function Page() {
  return (
    <PageContainer
      title="Onboarding"
      subtitle="A few questions to adjust the system to you."
    >
      <OnboardingForm />
    </PageContainer>
  );
}
