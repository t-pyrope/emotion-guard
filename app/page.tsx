import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    redirect("/onboarding");
  }

  redirect("/morning-check-in");
}
