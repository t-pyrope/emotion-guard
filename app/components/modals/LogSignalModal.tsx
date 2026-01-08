import { IoClose } from "react-icons/io5";
import { SIGNALS } from "@/app/constants";
import { SignalType } from "@/app/types";

export const LogSignalModal = ({
  onCloseModal,
  logSignal,
}: {
  onCloseModal: () => void;
  logSignal: (signal: SignalType) => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCloseModal} />

      <div className="relative bg-background border border-neutral-200 rounded-lg shadow-lg w-full max-w-md mx-4 overflow-auto max-h-screen">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2>Log signal</h2>
          <button
            onClick={onCloseModal}
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
  );
};
