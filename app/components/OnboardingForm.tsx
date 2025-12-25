"use client";

import { useForm } from "react-hook-form";
import { RadioGroup } from "@/app/components/RadioGroup";
import { OnboardingFormValues } from "../types";
import { ONBOARDING_QUESTIONS } from "@/app/onboarding-data";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const OnboardingForm = () => {
  const { register, handleSubmit } = useForm<OnboardingFormValues>();

  const send = async (data: OnboardingFormValues) => {
    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, timezone }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit onboarding");
    }
  };

  return (
    <form onSubmit={handleSubmit(send)} className="flex flex-col gap-10 w-full">
      {ONBOARDING_QUESTIONS.map(
        ({ question, answers, radioGroupName }, index) => (
          <RadioGroup
            label={`${index + 1}. ${question}`}
            key={question}
            options={answers}
            {...register(radioGroupName)}
          />
        ),
      )}
      <div className="text-base font-medium mt-4 w-fit">
        <button className="flex h-12 w-full text-nowrap items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-indigo-900 dark:hover:bg-[#ccc]">
          Confirm and start
        </button>
      </div>
    </form>
  );
};
