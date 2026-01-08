import { Modal } from "@/app/components/modals/Modal";
import { ONBOARDING_QUESTIONS } from "@/app/components/onboarding-questions";
import { Button } from "@/app/components/buttons/Button";
import { User } from "@/app/types";

export const SettingsModal = ({
  onCloseModal,
  user,
  resetData,
}: {
  onCloseModal: () => void;
  user: User;
  resetData: () => void;
}) => {
  return (
    <Modal onCloseModalAction={onCloseModal} title="Settings">
      <div className="space-y-4">
        <div>
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
        </div>
        <Button
          title="Reset all data and start over"
          variant="error"
          size="small"
          onClick={resetData}
        />
      </div>
    </Modal>
  );
};
