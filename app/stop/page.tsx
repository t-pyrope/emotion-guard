import { PageContainer } from "@/app/components/PageContainer";
import { Actions } from "@/app/stop/Actions";
import { withUserDayGuard } from "@/app/lib/server/withUserDayGuard";

export default async function StopPage() {
  await withUserDayGuard(["stop"]);

  return (
    <PageContainer>
      <div className="gap-10 flex flex-col items-center justify-center flex-1">
        <h1 className=" text-8xl font-bold leading-10 tracking-tight text-black">
          STOP
        </h1>
        <p>System overload detected.</p>
        <div className="flex flex-col items-center gap-1">
          <p>For the rest of today</p>
          <ul className="list-disc pl-5 flex flex-col gap-1 items-center">
            <li>End work in 40 minutes</li>
            <li>No new tasks</li>
            <li>No conversations</li>
          </ul>
        </div>
        <Actions />
      </div>
    </PageContainer>
  );
}
