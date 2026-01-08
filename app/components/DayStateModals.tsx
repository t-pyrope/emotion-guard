"use client";

import { FiActivity } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { SignalType, User } from "@/app/types";
import { LogSignalModal } from "@/app/components/modals/LogSignalModal";
import { SettingsModal } from "@/app/components/modals/SettingsModal";

export const DayStateModals = ({
  logSignalAction,
  user,
}: {
  logSignalAction: (signalType: SignalType) => void;
  user: User;
}) => {
  const [modal, setModal] = useState<null | "log-signal" | "settings">(null);
  const isModalOpen = !!modal;

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

  return (
    <>
      <button
        onClick={() => setModal("log-signal")}
        className="
    fixed bottom-15 right-15 z-50
    h-12 w-12 rounded-full
    bg-neutral-800 text-white
    flex items-center justify-center
    shadow-lg hover:scale-[1.02]
    transition-all
    hover:bg-neutral-950
    active:scale-95
  "
        aria-label="Log signal"
      >
        <FiActivity size={22} />
      </button>
      <button
        className="
      fixed top-5 left-5 h-10 w-10 rounded-full
      bg-white text-neutral-600 shadow-sm shadow-neutral-200
      flex items-center justify-center
      hover:scale-[1.02] hover:text-neutral-700
      transition-all active:scale-95
      "
        onClick={() => setModal("settings")}
      >
        <FiSettings size={20} />
      </button>
      {modal === "log-signal" && (
        <LogSignalModal onCloseModal={closeModal} logSignal={logSignal} />
      )}
      {modal === "settings" && (
        <SettingsModal onCloseModal={closeModal} user={user} />
      )}
    </>
  );
};
