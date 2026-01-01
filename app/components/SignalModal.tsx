import { IoClose } from "react-icons/io5";
import { SignalType } from "@/app/types";
import { SIGNALS } from "@/app/constants";

export const SignalModal = ({ onClose }: { onClose: () => void }) => {
  const logSignal = async (signal: SignalType) => {
    try {
      await fetch("/api/signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signal }),
      });

      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-background border border-neutral-200 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2>Log signal</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {SIGNALS.map((signal) => (
            <button
              key={signal.value}
              onClick={() => logSignal(signal.value)}
              className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {signal.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
