"use client";
import { MorningCheckInValues } from "@/app/types";
import { useForm } from "react-hook-form";
import { MORNING_CHECK_IN_QUESTIONS } from "@/app/components/morning-check-in-questions";
import { RadioGroup } from "@/app/components/RadioGroup";

export const MorningCheckInForm = () => {
  const { register, handleSubmit } = useForm<MorningCheckInValues>();

  const send = async (data: MorningCheckInValues) => {
    const res = await fetch("/api/morning-check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit onboarding");
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
            {...register(radioGroupName)}
          />
        ),
      )}

      <div className="text-base font-medium w-fit">
        <button className="flex h-12 w-full text-nowrap items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-indigo-900 dark:hover:bg-[#ccc]">
          Submit
        </button>
      </div>
    </form>
  );
};
