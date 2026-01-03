import { MorningCheckInForm } from "@/app/components/MorningCheckInForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { getUser } from "@/app/lib/getUser";
import { Header } from "@/app/components/Header";

export default async function Page() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    redirect("/onboarding");
  }

  const user = await getUser(userId);

  if (!user) {
    redirect("/onboarding");
  }

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        <Header
          title="Morning check-in"
          subtitle="A quick check-in to adjust today’s suggestions."
        />
        <div className="w-full">
          <MorningCheckInForm />
        </div>
      </main>
    </div>
  );
}
