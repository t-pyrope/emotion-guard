import { OnboardingForm } from "@/app/components/OnboardingForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { Header } from "@/app/components/Header";

export default async function Page() {
  const userId = (await cookies()).get("user_id")?.value;

  const [user] =
    await sql`SELECT 1 FROM users WHERE user_id = ${userId} LIMIT 1`;

  if (user) {
    const checkinDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: user.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const existing = await sql`
    SELECT 1
    FROM day_sessions
    WHERE user_id = ${userId}
      AND day_date = ${checkinDate}
    LIMIT 1
  `;

    if (existing.length > 0) {
      redirect("/day-state");
    }

    redirect("/morning-check-in");
  }

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
