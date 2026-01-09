import { Modal } from "@/app/components/modals/Modal";
import { Signal } from "@/app/types";
import { SIGNALS_DAILY_SUMMARY } from "@/app/constants";

export const DayTimelineModal = ({
  onCloseModal,
  signals,
}: {
  onCloseModal: () => void;
  signals: Signal[];
}) => {
  return (
    <Modal onCloseModalAction={onCloseModal} title="System Log / Day Timeline">
      {signals.map((signal) => (
        <div key={signal.id}>
          {new Intl.DateTimeFormat("cs-CZ", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(signal.createdAt))}
          : {SIGNALS_DAILY_SUMMARY[signal.signalType]}
        </div>
      ))}
    </Modal>
  );
};
