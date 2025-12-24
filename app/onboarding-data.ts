import { OnboardingQuestion } from "@/app/types";

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    question: "Where will you use the system most?",
    radioGroupName: "systemUse",
    answers: [
      { value: "study", id: "study", label: "Study" },
      { value: "work", id: "work", label: "Work" },
      { value: "both", id: "both", label: "Both" },
    ],
  },
  {
    question: "Your typical daily load is closer to",
    radioGroupName: "typicalDailyLoad",
    answers: [
      { value: "light", id: "light", label: "Light" },
      { value: "moderate", id: "moderate", label: "Moderate" },
      { value: "heavy", id: "heavy", label: "Heavy" },
    ],
  },
  {
    question: "What overloads you the most?",
    radioGroupName: "overloadsMost",
    answers: [
      { value: "people", id: "people", label: "Too many people" },
      { value: "deadlines", id: "deadlines", label: "Deadlines" },
      {
        value: "unclear-exp",
        id: "unclear-exp",
        label: "Unclear expectations",
      },
      {
        value: "context-switch",
        id: "context-switch",
        label: "Context switching",
      },
    ],
  },
  {
    question: "When overload starts, you usually",
    radioGroupName: "actionOnOverload",
    answers: [
      { value: "push-through", id: "push-through", label: "Push through" },
      { value: "shut-down", id: "shut-down", label: "Shut down" },
      { value: "lose-focus", id: "lose-focus", label: "Lose focus" },
    ],
  },
  {
    question: "How strict should the system be?",
    radioGroupName: "systemStrictness",
    answers: [
      { value: "gentle", id: "gentle", label: "Gentle" },
      { value: "standard", id: "standard", label: "Standard" },
      { value: "strict", id: "strict", label: "Strict" },
    ],
  },
  {
    question: "Your typical active hours",
    radioGroupName: "activeHours",
    answers: [
      { value: "morning", id: "morning", label: "Morning" },
      { value: "day", id: "day", label: "Day" },
      { value: "evening", id: "evening", label: "Evening" },
      { value: "irregular", id: "irregular", label: "Irregular" },
    ],
  },
];
