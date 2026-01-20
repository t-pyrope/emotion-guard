import { Modal } from "@/app/components/modals/Modal";
import { MorningCheckin, Signal, User } from "@/app/types";
import { getTimeline } from "@/app/utils";

export const DayTimelineModal = ({
  onCloseModal,
  signals,
  morning,
  user,
}: {
  onCloseModal: () => void;
  signals: Signal[];
  morning?: MorningCheckin;
  user: User | null;
}) => {
  const timeline = getTimeline(morning, user, signals);

  return (
    <Modal onCloseModalAction={onCloseModal} title="System Log / Day Timeline">
      {timeline.map((log) => (
        <div key={log.id}>
          {new Intl.DateTimeFormat("cs-CZ", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(log.createdAt))}
          : {log.message}
        </div>
      ))}
    </Modal>
  );
};
