"use client";

import { useRouter } from "next/navigation";
import { FiActivity, FiSun } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { SignalType, User } from "@/app/types";
import { LogSignalModal } from "@/app/components/modals/LogSignalModal";
import { SettingsModal } from "@/app/components/modals/SettingsModal";
import { IconButton } from "@/app/components/buttons/IconButton";

export const DayStateModals = ({
  logSignalAction,
  user,
}: {
  logSignalAction: (signalType: SignalType) => void;
  user: User;
}) => {
  const [modal, setModal] = useState<
    null | "log-signal" | "settings" | "morning"
  >(null);
  const isModalOpen = !!modal;
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setModal(null);
  };

  const logSignal = (signalType: SignalType) => {
    logSignalAction(signalType);
    setModal(null);
  };

  const resetData = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
      });

      if (res.ok) {
        closeModal();
        router.replace("/onboarding");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="fixed bottom-15 right-15">
        <IconButton
          onClickAction={() => setModal("log-signal")}
          label="Log signal"
          icon={<FiActivity size={22} />}
        />
      </div>
      <div className="fixed top-5 left-5 flex flex-col gap-2">
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
      </div>

      {modal === "log-signal" && (
        <LogSignalModal onCloseModal={closeModal} logSignal={logSignal} />
      )}
      {modal === "settings" && (
        <SettingsModal
          onCloseModal={closeModal}
          user={user}
          resetData={resetData}
        />
      )}
    </>
  );
};
