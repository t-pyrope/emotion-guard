import { redirect } from "next/navigation";
import { resolveUserDay } from "@/app/lib/server/resolveUserDay";
import { mapStatusToRoute } from "@/app/lib/server/mapStatusToRoute";

export default async function Home() {
  const result = await resolveUserDay();
  redirect(mapStatusToRoute(result.status));
}
