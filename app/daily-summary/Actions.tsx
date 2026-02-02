"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSettings, FiSun, FiTrendingUp } from "react-icons/fi";

import { IconButton } from "@/app/components/buttons/IconButton";
import { SettingsModal } from "@/app/components/modals/SettingsModal";
import { MorningCheckin, User } from "@/app/types";
import { MorningSnapshotModal } from "@/app/components/modals/MorningSnapshotModal";

export const Actions = ({
  user,
  morning,
}: {
  user: User | null;
  morning?: MorningCheckin;
}) => {
  const [modal, setModal] = useState<null | "settings" | "morning">(null);
  const router = useRouter();

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className="fixed lg:top-5 lg:left-5 flex lg:flex-col gap-2 bottom-5 left-5">
      <IconButton
        onClickAction={() => router.push("/weekly-reports")}
        label="Weekly reports"
        icon={<FiTrendingUp size={22} />}
        size="md"
      />

      <IconButton
        onClickAction={() => setModal("settings")}
        label="Open Settings"
        icon={<FiSettings size={20} />}
        size="md"
        variant="light"
      />

      <IconButton
        onClickAction={() => setModal("morning")}
        icon={<FiSun size={20} />}
        size="md"
        variant="light"
        label="Open Morning Snapshot"
      />

      {modal === "morning" && (
        <MorningSnapshotModal onCloseModal={closeModal} morning={morning} />
      )}
      {modal === "settings" && (
        <SettingsModal onCloseModalAction={closeModal} user={user} />
      )}
    </div>
  );
};
