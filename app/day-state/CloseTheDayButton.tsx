"use client";

import { Button } from "@/app/components/buttons/Button";
import { redirect } from "next/navigation";

export const CloseTheDayButton = () => {
  const close = async () => {
    const res = await fetch("/api/close-the-day", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      redirect("/daily-summary");
    }
  };

  return <Button title="Close the day" onClick={close} />;
};
