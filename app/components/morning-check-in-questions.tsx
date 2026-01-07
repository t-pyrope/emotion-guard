import { MorningCheckInQuestion } from "@/app/types";

export const MORNING_CHECK_IN_QUESTIONS: MorningCheckInQuestion[] = [
  {
    question: "Sleep quality",
    radioGroupName: "sleepLevel",
    answers: [
      {
        value: 1,
        label: "Low",
        hint: "the system will treat today as more fragile and suggest a lighter pace.",
      },
      { value: 2, label: "OK", hint: "no special limits based on sleep." },
      {
        value: 3,
        label: "Good",
        hint: "you may see recommendations for deeper or longer focused sessions.",
      },
    ],
  },
  {
    question: "Body state",
    radioGroupName: "bodyState",
    answers: [
      {
        value: 1,
        label: "Tense",
        hint: "alerts will appear earlier; breaks will be suggested sooner.",
      },
      { value: 2, label: "Neutral", hint: "standard reaction to signals." },
      {
        value: 3,
        label: "Relaxed",
        hint: "the day can hold more structured activity before warnings start.",
      },
    ],
  },
  {
    question: "Mental state",
    radioGroupName: "mentalState",
    answers: [
      {
        value: 1,
        label: "Noisy",
        hint: "suggestions will favor short steps and fewer parallel tasks.",
      },
      {
        value: 2,
        label: "Focused",
        hint: "the app will encourage keeping momentum and priority work.",
      },
      {
        value: 3,
        label: "Empty",
        hint: "you will get prompts to warm up before demanding actions.",
      },
    ],
  },
  {
    question: "Expected contacts today",
    radioGroupName: "contactsExpected",
    answers: [
      {
        value: 1,
        label: "Many",
        hint: "social interactions will count as extra load; plan buffers.",
      },
      { value: 2, label: "Few", hint: "minor influence on daily limits." },
      {
        value: 3,
        label: "None",
        hint: "the day will be evaluated mostly by tasks, not communication.",
      },
    ],
  },
  {
    question: "Available resource",
    radioGroupName: "resourceLevel",
    answers: [
      {
        value: 1,
        label: "Low",
        hint: "rules will emphasize protection from overload.",
      },
      { value: 2, label: "Medium", hint: "balanced, flexible guidance." },
      {
        value: 3,
        label: "OK",
        hint: "you will be free to take on more without immediate restrictions.",
      },
    ],
  },
];
