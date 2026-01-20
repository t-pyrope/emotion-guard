"use client";
import { MorningCheckInValues, UserFromDB } from "@/app/types";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";

import { MORNING_CHECK_IN_QUESTIONS } from "@/app/components/morning-check-in-questions";
import { RadioGroup } from "@/app/components/RadioGroup";
import { Button } from "@/app/components/buttons/Button";
import { FormProgress } from "@/app/components/FormProgress";
import { DEFAULT_TIMEZONE } from "@/app/constants";

export const MorningCheckInForm = ({ user }: { user: UserFromDB | null }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<MorningCheckInValues>();
  const values = watch();

  const send = async (data: MorningCheckInValues) => {
    if (!user) {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timezone: DEFAULT_TIMEZONE }),
      });
    }

    const res = await fetch("/api/morning-check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (res.ok) {
      redirect("/day-state");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(send)}
      className="flex flex-col gap-6 w-full lg:gap-10"
    >
      <FormProgress options={MORNING_CHECK_IN_QUESTIONS} values={values} />

      {MORNING_CHECK_IN_QUESTIONS.map(
        ({ question, answers, radioGroupName }, index, arr) => (
          <RadioGroup
            options={answers}
            hasHint={true}
            label={`Step ${index + 1} of ${arr.length}. ${question}`}
            key={question}
            {...register(radioGroupName, {
              required: true,
            })}
          />
        ),
      )}

      <div className="text-base mt-4 flex gap-3 w-full items-center flex-col lg:flex-row">
        <Button isDisabled={!isValid} title="Save and continue" type="submit" />
        <p
          className={`text-muted-foreground transition-opacity duration-250 ${isValid ? "opacity-0" : "opacity-100"}`}
        >
          Complete all sections to continue
        </p>
      </div>
    </form>
  );
};
