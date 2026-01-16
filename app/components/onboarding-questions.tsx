import { OnboardingQuestion } from "@/app/types";

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    question: "Where will you use the system most?",
    radioGroupName: "mainContext",
    answers: [
      {
        value: "study",
        label: "Study",
        hint: "the app will lean toward protecting focus and mental energy during learning days.",
      },
      {
        value: "work",
        label: "Work",
        hint: "rules will prioritize sustainable performance around deadlines and responsibilities.",
      },
      {
        value: "both",
        label: "Both",
        hint: "the system will expect mixed days and may show warnings earlier when contexts switch.",
      },
    ],
  },
  {
    question: "Your typical daily load is closer to",
    radioGroupName: "typicalDailyLoad",
    answers: [
      {
        value: "light",
        label: "Light",
        hint: "more freedom for social time and spontaneous tasks.",
      },
      {
        value: "moderate",
        label: "Moderate",
        hint: "balanced limits between progress and rest.",
      },
      {
        value: "heavy",
        label: "Heavy",
        hint: "the app will be more careful and suggest reductions sooner.",
      },
    ],
  },
  {
    question: "What overloads you the most?",
    radioGroupName: "overloadSources",
    answers: [
      {
        value: "too_many_people",
        label: "Too many people",
        hint: "meetings and chats count as higher cost.",
      },
      {
        value: "deadlines",
        label: "Deadlines",
        hint: "the app may restrict new commitments near due dates.",
      },
      {
        value: "unclear_expectations",
        label: "Unclear expectations",
        hint: "warnings appear when plans are vague.",
      },
      {
        value: "context_switching",
        label: "Context switching",
        hint: "frequent changes reduce deep-work allowance.",
      },
    ],
  },
  {
    question: "When overload starts, you usually",
    radioGroupName: "actionOnOverload",
    answers: [
      {
        value: "push_through",
        label: "Push through",
        hint: "Daily Signal will emphasize pause reminders to avoid hidden fatigue.",
      },
      {
        value: "shut_down",
        label: "Shut down",
        hint: "rules will soften the day faster to prevent a crash.",
      },
      {
        value: "lose_focus",
        label: "Lose focus",
        hint: "the app will protect attention and lower complexity.",
      },
    ],
  },
  {
    question: "How strict should the system be?",
    radioGroupName: "strictnessLevel",
    answers: [
      {
        value: "gentle",
        label: "Gentle",
        hint: "suggestions only, minimal blocking.",
      },
      {
        value: "standard",
        label: "Standard",
        hint: "adaptive limits based on check-ins and signals.",
      },
      {
        value: "strict",
        label: "Strict",
        hint: "firmer barriers when risk of overload grows.",
      },
    ],
  },
];
