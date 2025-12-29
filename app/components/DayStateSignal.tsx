"use client";

import { FiBookmark } from "react-icons/fi";
import { useState } from "react";
import { SignalModal } from "@/app/components/SignalModal";

export const DayStateSignal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="
    fixed bottom-15 right-15 z-50
    h-12 w-12 rounded-full
    bg-neutral-900 text-white
    flex items-center justify-center
    shadow-lg
    transition
    hover:bg-neutral-800
    active:scale-95
  "
        aria-label="Log signal"
      >
        <FiBookmark size={22} />
      </button>
      {isModalOpen && <SignalModal onClose={closeModal} />}
    </>
  );
};
