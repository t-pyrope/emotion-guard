"use client";

import { FiActivity } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { SignalType } from "@/app/types";
import { LogSignalModal } from "@/app/components/modals/LogSignalModal";

export const DayStateSignal = ({
  logSignalAction,
}: {
  logSignalAction: (signalType: SignalType) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
  };

  const logSignal = (signalType: SignalType) => {
    logSignalAction(signalType);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
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
      >
        <FiSettings size={20} />
      </button>
      {isModalOpen && (
        <LogSignalModal onCloseModal={closeModal} logSignal={logSignal} />
      )}
    </>
  );
};
