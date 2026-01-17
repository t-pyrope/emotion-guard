import { MorningCheckInForm } from "@/app/components/MorningCheckInForm";
import { PageContainer } from "@/app/components/PageContainer";

export default async function Page() {
  return (
    <PageContainer
      title="Morning check-in"
      subtitle="A quick check-in to adjust today’s suggestions."
    >
      <MorningCheckInForm />
    </PageContainer>
  );
}
