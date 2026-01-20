"use client";

import { Button } from "@/app/components/buttons/Button";
import { redirect } from "next/navigation";
import { DEFAULT_TIMEZONE } from "@/app/constants";

export const CloseTheDayButton = ({ isUser }: { isUser: boolean }) => {
  const close = async () => {
    if (!isUser) {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timezone: DEFAULT_TIMEZONE }),
      });
    }

    const res = await fetch("/api/close-the-day", {
      method: "PUT",
    });

    if (res.ok) {
      redirect("/daily-summary");
    }
  };

  return <Button title="Close the day" onClick={close} />;
};
