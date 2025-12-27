"use client";

import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";

import { RadioGroup } from "@/app/components/RadioGroup";

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
        ({ question, answers, radioGroupName }, index) => (
          <RadioGroup
            label={`${index + 1}. ${question}`}
            key={question}
            options={answers}
            {...register(radioGroupName, {
              required: true,
            })}
          />
        ),
      )}
      <div className="text-base mt-4 flex gap-3 w-full items-center">
        <button
          disabled={!isValid}
          className="flex font-medium h-12 text-nowrap items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-neutral-700 dark:hover:bg-[#ccc] disabled:bg-neutral-500"
        >
          Confirm and start
        </button>

        <p
          className={`text-muted-foreground transition-opacity duration-250 ${isValid ? "opacity-0" : "opacity-100"}`}
        >
          Complete all sections to continue
        </p>
      </div>
    </form>
  );
};
