import { OnboardingForm } from "@/app/components/OnboardingForm";
import { Header } from "@/app/components/Header";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";

export default async function Page() {
  await withUserDayGuard(["no-user", "needs-onboarding"]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        <Header
          title="Onboarding"
          subtitle="A few questions to adjust the system to you."
        />

        <div className="w-full">
          <OnboardingForm />
        </div>
      </main>
    </div>
  );
}
