"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiActivity, FiSun } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { MorningCheckin, Signal, SignalType, User } from "@/app/types";
import { LogSignalModal } from "@/app/components/modals/LogSignalModal";
import { SettingsModal } from "@/app/components/modals/SettingsModal";
import { IconButton } from "@/app/components/buttons/IconButton";
import { MorningSnapshotModal } from "@/app/components/modals/MorningSnapshotModal";
import { DayTimelineModal } from "@/app/components/modals/DayTimelineModal";

export const DayStateModals = ({
  logSignalAction,
  user,
  morning,
  signals,
}: {
  logSignalAction: (signalType: SignalType) => void;
  user: User;
  morning: MorningCheckin;
  signals: Signal[];
}) => {
  const [modal, setModal] = useState<
    null | "log-signal" | "settings" | "morning" | "system-log"
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
      <div className="fixed lg:bottom-15 lg:right-15 bottom-5 right-5">
        <IconButton
          onClickAction={() => setModal("log-signal")}
          label="Log signal"
          icon={<FiActivity size={22} />}
        />
      </div>
      <div className="fixed lg:top-5 lg:left-5 flex lg:flex-col gap-2 bottom-5 left-5">
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
        <IconButton
          onClickAction={() => setModal("system-log")}
          label="Open System Log / Day Timeline"
          icon={<FiClock size={20} />}
          size="md"
          variant="light"
        />
      </div>

      {modal === "log-signal" && (
        <LogSignalModal onCloseModal={closeModal} logSignal={logSignal} />
      )}

      {modal === "settings" && (
        <SettingsModal
          onCloseModalAction={closeModal}
          user={user}
          resetDataAction={resetData}
        />
      )}

      {modal === "morning" && (
        <MorningSnapshotModal onCloseModal={closeModal} morning={morning} />
      )}

      {modal === "system-log" && (
        <DayTimelineModal
          onCloseModal={closeModal}
          signals={signals}
          morning={morning}
          user={user}
        />
      )}
    </>
  );
};
