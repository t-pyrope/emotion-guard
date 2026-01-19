"use client";
import { Button } from "@/app/components/buttons/Button";
import { useRouter } from "next/navigation";
import { LoadingBar } from "@/app/components/LoadingBar";
import { useState } from "react";

export const Actions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const acceptStop = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signal: "stop_accepted" }),
      });

      await fetch("/api/close-the-day", {
        method: "PUT",
      });

      router.replace("/daily-summary");
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
        <Button title="Accept stop and close the day" onClick={acceptStop} />
        <Button title="Ignore and continue" variant="outlined" size="small" />
      </div>
    </>
  );
};
