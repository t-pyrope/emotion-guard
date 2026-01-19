"use client";

import { Button } from "@/app/components/buttons/Button";
import { redirect } from "next/navigation";

export const CloseTheDayButton = () => {
  const close = async () => {
    const res = await fetch("/api/close-the-day", {
      method: "PUT",
    });

    if (res.ok) {
      redirect("/daily-summary");
    }
  };

  return <Button title="Close the day" onClick={close} />;
};
