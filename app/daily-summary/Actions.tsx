"use client";
import { useRouter } from "next/navigation";
import { FiSettings, FiSun, FiTrendingUp } from "react-icons/fi";
import { IconButton } from "@/app/components/buttons/IconButton";

export const Actions = () => {
  const router = useRouter();

  return (
    <div className="fixed lg:top-5 lg:left-5 flex lg:flex-col gap-2 bottom-5 left-5">
      <IconButton
        onClickAction={() => router.push("/weekly-reports")}
        label="Weekly reports"
        icon={<FiTrendingUp size={22} />}
        size="md"
      />

      <IconButton
        onClickAction={() => {}}
        label="Open Settings"
        icon={<FiSettings size={20} />}
        size="md"
        variant="light"
      />

      <IconButton
        onClickAction={() => {}}
        icon={<FiSun size={20} />}
        size="md"
        variant="light"
        label="Open Morning Snapshot"
      />
    </div>
  );
};
