"use client";
import { MorningCheckInValues } from "@/app/types";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";

import { MORNING_CHECK_IN_QUESTIONS } from "@/app/components/morning-check-in-questions";
import { RadioGroup } from "@/app/components/RadioGroup";
import { Button } from "@/app/components/Button";

export const MorningCheckInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<MorningCheckInValues>();

  const send = async (data: MorningCheckInValues) => {
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
    <form onSubmit={handleSubmit(send)} className="flex flex-col gap-10 w-full">
      {MORNING_CHECK_IN_QUESTIONS.map(
        ({ question, answers, radioGroupName }, index) => (
          <RadioGroup
            options={answers}
            label={`${index + 1}. ${question}`}
            key={question}
            {...register(radioGroupName, {
              required: true,
            })}
          />
        ),
      )}

      <div className="text-base mt-4 flex gap-3 w-full items-center">
        <Button isDisabled={!isValid} title="Confirm and start" />
        <p
          className={`text-muted-foreground transition-opacity duration-250 ${isValid ? "opacity-0" : "opacity-100"}`}
        >
          Complete all sections to continue
        </p>
      </div>
    </form>
  );
};
