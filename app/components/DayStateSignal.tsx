"use client";

import { FiActivity } from "react-icons/fi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SIGNALS } from "@/app/constants";
import { SignalType } from "@/app/types";

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
    bg-neutral-900 text-white
    flex items-center justify-center
    shadow-lg
    transition
    hover:bg-neutral-800
    active:scale-95
  "
        aria-label="Log signal"
      >
        <FiActivity size={22} />
      </button>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeModal}
            />

            <div className="relative bg-background border border-neutral-200 rounded-lg shadow-lg w-full max-w-md mx-4 overflow-auto max-h-screen">
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2>Log signal</h2>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-muted rounded-md transition-colors"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {SIGNALS.map((signalGroup) => (
                  <div key={signalGroup.title} className="space-y-2">
                    <p>{signalGroup.title}</p>
                    {signalGroup.signals.map((signal) => (
                      <button
                        key={signal.value}
                        onClick={() => logSignal(signal.value)}
                        className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        {signal.title}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
