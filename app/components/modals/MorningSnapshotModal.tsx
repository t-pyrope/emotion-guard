import { Modal } from "@/app/components/modals/Modal";
import { MorningCheckin } from "@/app/types";
import { MORNING_CHECK_IN_QUESTIONS } from "@/app/components/morning-check-in-questions";
import { isMorningCheckedIn } from "@/app/utils";
import { Button } from "@/app/components/buttons/Button";

export const MorningSnapshotModal = ({
  onCloseModal,
  morning,
}: {
  onCloseModal: () => void;
  morning?: MorningCheckin;
}) => {
  const checkedIn = isMorningCheckedIn(morning);
  return (
    <Modal onCloseModalAction={onCloseModal} title="Morning Snapshot">
      {MORNING_CHECK_IN_QUESTIONS.map((question) => (
        <div key={question.radioGroupName} className="pb-2">
          <div className="font-medium">{question.question}</div>
          <div>
            {question.answers.find(
              (answer) => answer.value === morning?.[question.radioGroupName],
            )?.label ?? "--"}
          </div>
        </div>
      ))}

      {!checkedIn && (
        <Button title="Check in" size="small" href="/morning-check-in" />
      )}
    </Modal>
  );
};
