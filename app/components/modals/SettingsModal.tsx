import { Modal } from "@/app/components/modals/Modal";
import { User } from "@/app/types";
import { ONBOARDING_QUESTIONS } from "@/app/components/onboarding-questions";

export const SettingsModal = ({
  onCloseModal,
  user,
}: {
  onCloseModal: () => void;
  user: User;
}) => {
  return (
    <Modal onCloseModalAction={onCloseModal} title="Settings">
      {ONBOARDING_QUESTIONS.map((question) => (
        <div key={question.radioGroupName} className="pb-2">
          <div className="font-medium">{question.question}</div>
          <div>
            {
              question.answers.find(
                (answer) =>
                  answer.value ===
                  (question.radioGroupName === "overloadSources"
                    ? user[question.radioGroupName]?.[0]
                    : user[question.radioGroupName]),
              )?.label
            }
          </div>
        </div>
      ))}
    </Modal>
  );
};
