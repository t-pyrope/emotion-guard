import { MorningCheckInForm } from "@/app/components/MorningCheckInForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";

export default async function Page() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    redirect("/onboarding");
  }

  const result =
    await sql`SELECT 1 FROM users WHERE user_id = ${userId} LIMIT 1`;

  if (result.length === 0) {
    redirect("/onboarding");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="font-semibold text-xl mb-1">Emotion guard</h1>
            <h2 className="max-w-xs text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
              Morning check-in
            </h2>
          </div>
          <MorningCheckInForm />
        </div>
      </main>
    </div>
  );
}
