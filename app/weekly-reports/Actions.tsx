"use client";
import { Button } from "@/app/components/buttons/Button";
import { useRouter } from "next/navigation";

export const Actions = () => {
  const router = useRouter();
  const back = () => {
    router.push("/daily-summary");
  };
  return <Button title="Back to Daily summary" onClick={back} />;
};
