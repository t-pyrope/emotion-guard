"use client";

import { Button } from "@/app/components/buttons/Button";
import { UserFromDB } from "@/app/types";
import { DEFAULT_TIMEZONE } from "@/app/constants";

export const UnlockWeeklyReports = ({ user }: { user: UserFromDB | null }) => {
  const unlockWeeklyReports = async () => {
    if (!user) {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timezone: DEFAULT_TIMEZONE }),
      });
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const { url } = await res.json();

    if (url) {
      window.location.href = url;
    }
  };

  return <Button title="Unlock Weekly Reports" onClick={unlockWeeklyReports} />;
};
