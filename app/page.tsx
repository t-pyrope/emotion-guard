import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";

export default async function Home() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    redirect("/onboarding");
  }

  const result =
    await sql`SELECT 1 FROM users WHERE user_id = ${userId} LIMIT 1`;

  if (result.length === 0) {
    redirect("/onboarding");
  }

  redirect("/morning-check-in");
}
