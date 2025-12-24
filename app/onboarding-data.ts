export interface Answer {
  value: string;
  id: string;
  label: string;
}

export const ONBOARDING_DATA: {
  question: string;
  radioGroupName: string;
  answers: Answer[];
}[] = [
  {
    question: "Where will you use the system most?",
    radioGroupName: "system-use",
    answers: [
      { value: "study", id: "study", label: "Study" },
      { value: "work", id: "work", label: "Work" },
      { value: "both", id: "both", label: "Both" },
    ],
  },
  {
    question: "Your typical daily load is closer to",
    radioGroupName: "typical-daily-load",
    answers: [
      { value: "light", id: "light", label: "Light" },
      { value: "moderate", id: "moderate", label: "Moderate" },
      { value: "heavy", id: "heavy", label: "Heavy" },
    ],
  },
  {
    question: "What overloads you the most?",
    radioGroupName: "overloads-most",
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
    radioGroupName: "action-on-overload",
    answers: [
      { value: "push-through", id: "push-through", label: "Push through" },
      { value: "shut-down", id: "shut-down", label: "Shut down" },
      { value: "lose-focus", id: "lose-focus", label: "Lose focus" },
    ],
  },
  {
    question: "How strict should the system be?",
    radioGroupName: "system-strictness",
    answers: [
      { value: "gentle", id: "gentle", label: "Gentle" },
      { value: "standard", id: "standard", label: "Standard" },
      { value: "strict", id: "strict", label: "Strict" },
    ],
  },
  {
    question: "Your typical active hours",
    radioGroupName: "active-hours",
    answers: [
      { value: "morning", id: "morning", label: "Morning" },
      { value: "day", id: "day", label: "Day" },
      { value: "evening", id: "evening", label: "Evening" },
      { value: "irregular", id: "irregular", label: "Irregular" },
    ],
  },
];
