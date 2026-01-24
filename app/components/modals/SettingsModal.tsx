"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Modal } from "@/app/components/modals/Modal";
import { ONBOARDING_QUESTIONS } from "@/app/components/onboarding-questions";
import { Button } from "@/app/components/buttons/Button";
import { OnboardingQuestion, User } from "@/app/types";
import { Select } from "@/app/components/Select";
import { DEFAULT_SUMMARY_START_HOUR, DEFAULT_TIMEZONE } from "@/app/constants";

const OPTIONS = [
  { value: "manual", label: "Only after I close the day" },
  { value: "16", label: "After 16:00" },
  { value: "17", label: "After 17:00" },
  { value: "18", label: "After 18:00" },
  { value: "19", label: "After 19:00" },
  { value: "20", label: "After 20:00" },
  { value: "21", label: "After 21:00" },
  { value: "22", label: "After 22:00" },
  { value: "23", label: "After 23:00" },
];

interface SettingsValues {
  summaryStartHour: string;
}

export const SettingsModal = ({
  onCloseModalAction,
  user,
  resetDataAction,
}: {
  onCloseModalAction: () => void;
  user: User | null;
  resetDataAction: () => void;
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SettingsValues>({
    values: {
      summaryStartHour:
        !user || user.summaryStartHour === null
          ? `${DEFAULT_SUMMARY_START_HOUR}`
          : user.summaryStartHour.toString(),
    },
  });

  const openOnboarding = () => {
    router.push("/onboarding");
  };

  const submit = async (data: SettingsValues) => {
    const body = JSON.stringify({
      summaryStartHour:
        data.summaryStartHour === "manual" ? null : +data.summaryStartHour,
    });

    if (!user) {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timezone: DEFAULT_TIMEZONE }),
      });
    }

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (res.ok) {
      if (!user) {
        router.refresh();
      } else {
        onCloseModalAction();
      }
    }
  };

  const getLabel = (question: OnboardingQuestion) => {
    if (!user) return "--";

    if (question.radioGroupName === "overloadSources") {
      const values = user[question.radioGroupName] as User["overloadSources"];
      const answers = question.answers.filter((ans) =>
        values.includes(ans.value as User["overloadSources"][number]),
      );
      return answers.length > 0
        ? answers.map((ans) => ans.label).join(", ")
        : "--";
    } else {
      return (
        question.answers.find(
          (ans) => ans.value === user[question.radioGroupName],
        )?.label ?? "--"
      );
    }
  };

  return (
    <Modal onCloseModalAction={onCloseModalAction} title="Settings">
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <div>
          {ONBOARDING_QUESTIONS.map((question) => (
            <div key={question.radioGroupName} className="pb-2">
              <div className="font-medium">{question.question}</div>
              <div>{getLabel(question)}</div>
            </div>
          ))}
          <Select
            label="Daily summary"
            hint="Choose when the daily summary should appear."
            options={OPTIONS}
            {...register("summaryStartHour")}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {user && (
            <Button
              title="Delete all existing data"
              variant="error"
              size="small"
              onClick={resetDataAction}
            />
          )}

          <Button
            title="Open onboarding"
            size="small"
            onClick={openOnboarding}
          />

          <Button title="Submit" size="small" type="submit" />
        </div>
      </form>
    </Modal>
  );
};
