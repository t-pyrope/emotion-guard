"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { RadioGroup } from "@/app/components/RadioGroup";
import { Button } from "@/app/components/buttons/Button";
import { FormProgress } from "@/app/components/FormProgress";

import { OnboardingFormValues, UserFromDB } from "../types";
import { ONBOARDING_QUESTIONS } from "./onboarding-questions";
import { LoadingBar } from "@/app/components/LoadingBar";
import { DEFAULT_TIMEZONE } from "@/app/constants";

export const OnboardingForm = ({ user }: { user: UserFromDB | null }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<OnboardingFormValues>({
    mode: "onChange",
    defaultValues:
      user && user.main_context
        ? {
            mainContext: user.main_context,
            typicalDailyLoad: user.typical_daily_load,
            overloadSources: user.overload_sources,
            actionOnOverload: user.action_on_overload,
            strictnessLevel: user.strictness_level,
          }
        : undefined,
  });
  const router = useRouter();

  const values = watch();

  const send = async (data: OnboardingFormValues) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, timezone: DEFAULT_TIMEZONE }),
    });

    if (res.ok) {
      router.back();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(send)}
      className="flex flex-col gap-6 lg:gap-10 w-full"
    >
      {isSubmitting && <LoadingBar />}
      <FormProgress values={values} options={ONBOARDING_QUESTIONS} />

      {ONBOARDING_QUESTIONS.map(
        ({ question, answers, radioGroupName }, index, arr) => (
          <RadioGroup
            key={question}
            label={`Step ${index + 1} of ${arr.length}. ${question}`}
            options={answers}
            isMulti={radioGroupName === "overloadSources"}
            hasHint={true}
            {...register(radioGroupName, { required: true })}
          />
        ),
      )}

      <div className="text-base mt-4 flex gap-3 w-full items-center flex-col lg:flex-row">
        <Button isDisabled={!isValid} title="Save and continue" type="submit" />
        <p
          className={`text-muted-foreground transition-opacity duration-250 ${
            isValid ? "opacity-0" : "opacity-100"
          }`}
        >
          Complete all sections to continue
        </p>
      </div>
    </form>
  );
};
