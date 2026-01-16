import { cookies } from "next/headers";

import { sql } from "@/lib/db";
import { SignalFromDB } from "@/app/types";
import {
  formatDate,
  mapMorningFromDB,
  mapSignalFromDB,
  mapUserFromDB,
} from "@/app/utils";
import { DayStateBody } from "@/app/day-state/DayStateBody";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";
import { PageContainer } from "@/app/components/PageContainer";

export default async function Page() {
  const result = await withUserDayGuard(["day-active"]);

  const { user: userFromDB, morning: morningFromDB } = result;
  const user = mapUserFromDB(userFromDB!);
  const userId = (await cookies()).get("user_id")?.value;

  const today = formatDate(user.timezone);

  const morning = mapMorningFromDB(morningFromDB!);

  const signalsFromDB = (await sql`
    SELECT *
    FROM signals
    WHERE user_id = ${userId}
      AND created_at::date = ${today}
    ORDER BY created_at ASC
  `) as SignalFromDB[];

  const signals = signalsFromDB.map((signal) => mapSignalFromDB(signal));

  return (
    <PageContainer title="Day state / rules of the day">
      <DayStateBody signals={signals} morning={morning} user={user} />
    </PageContainer>
  );
}
