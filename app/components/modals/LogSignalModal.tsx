import { SIGNALS } from "@/app/constants";
import { SignalType } from "@/app/types";
import { Modal } from "@/app/components/modals/Modal";

export const LogSignalModal = ({
  onCloseModal,
  logSignal,
}: {
  onCloseModal: () => void;
  logSignal: (signal: SignalType) => void;
}) => {
  return (
    <Modal onCloseModalAction={onCloseModal} title="Log signal">
      <div className="space-y-4">
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
    </Modal>
  );
};
