"use client";

import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";

import { RadioGroup } from "@/app/components/RadioGroup";
import { Button } from "@/app/components/Button";

import { OnboardingFormValues } from "../types";
import { ONBOARDING_QUESTIONS } from "./onboarding-questions";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const OnboardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<OnboardingFormValues>();

  const send = async (data: OnboardingFormValues) => {
    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, timezone }),
    });

    if (res.ok) {
      redirect("/morning-check-in");
    }
  };

  return (
    <form onSubmit={handleSubmit(send)} className="flex flex-col gap-10 w-full">
      {ONBOARDING_QUESTIONS.map(
        ({ question, answers, radioGroupName }, index, arr) => (
          <RadioGroup
            label={`Step ${index + 1} of ${arr.length}. ${question}`}
            key={question}
            options={answers}
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
