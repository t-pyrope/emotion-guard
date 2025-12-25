import { OnboardingQuestion } from "@/app/types";

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    question: "Where will you use the system most?",
    radioGroupName: "mainContext",
    answers: [
      { value: "study", label: "Study" },
      { value: "work", label: "Work" },
      { value: "both", label: "Both" },
    ],
  },
  {
    question: "Your typical daily load is closer to",
    radioGroupName: "typicalDailyLoad",
    answers: [
      { value: "light", label: "Light" },
      { value: "moderate", label: "Moderate" },
      { value: "heavy", label: "Heavy" },
    ],
  },
  {
    question: "What overloads you the most?",
    radioGroupName: "overloadSources",
    answers: [
      { value: "people", label: "Too many people" },
      { value: "deadlines", label: "Deadlines" },
      {
        value: "unclear-exp",
        label: "Unclear expectations",
      },
      {
        value: "context-switch",
        label: "Context switching",
      },
    ],
  },
  {
    question: "When overload starts, you usually",
    radioGroupName: "actionOnOverload",
    answers: [
      { value: "push_through", label: "Push through" },
      { value: "shut_down", label: "Shut down" },
      { value: "lose_focus", label: "Lose focus" },
    ],
  },
  {
    question: "How strict should the system be?",
    radioGroupName: "strictnessLevel",
    answers: [
      { value: "gentle", label: "Gentle" },
      { value: "standard", label: "Standard" },
      { value: "strict", label: "Strict" },
    ],
  },
  {
    question: "Your typical active hours",
    radioGroupName: "activeHours",
    answers: [
      { value: "morning", label: "Morning" },
      { value: "day", label: "Day" },
      { value: "evening", label: "Evening" },
      { value: "irregular", label: "Irregular" },
    ],
  },
];
