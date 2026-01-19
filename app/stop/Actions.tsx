"use client";
import { Button } from "@/app/components/buttons/Button";
import { useRouter } from "next/navigation";
import { LoadingBar } from "@/app/components/LoadingBar";
import { useState } from "react";
import { SignalType } from "@/app/types";

export const Actions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const closeDay = async (signalType: SignalType) => {
    setIsLoading(true);
    try {
      await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signal: signalType }),
      });

      if (signalType === "stop_accepted") {
        await fetch("/api/close-the-day", {
          method: "PUT",
        });
        router.replace("/daily-summary");
      } else {
        router.replace("/day-state");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingBar />}
      <div className="flex gap-2 flex-col items-center">
        <Button
          title="Accept stop and close the day"
          onClick={() => closeDay("stop_accepted")}
        />
        <Button
          title="Ignore and continue"
          variant="outlined"
          size="small"
          onClick={() => closeDay("stop_ignored")}
        />
      </div>
    </>
  );
};
