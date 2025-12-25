import { MorningCheckInQuestion } from "@/app/types";

export const MORNING_CHECK_IN_QUESTIONS: MorningCheckInQuestion[] = [
  {
    question: "Sleep quality",
    radioGroupName: "sleepLevel",
    answers: [
      { value: 1, label: "Low" },
      { value: 2, label: "OK" },
      { value: 3, label: "Good" },
    ],
  },
  {
    question: "Body state",
    radioGroupName: "bodyState",
    answers: [
      { value: 1, label: "Tense" },
      { value: 2, label: "Neutral" },
      { value: 3, label: "Relaxed" },
    ],
  },
  {
    question: "Mental state",
    radioGroupName: "mentalState",
    answers: [
      { value: 1, label: "Noisy" },
      { value: 2, label: "Focused" },
      { value: 3, label: "Empty" },
    ],
  },
  {
    question: "Expected contacts today",
    radioGroupName: "contactsExpected",
    answers: [
      { value: 1, label: "Many" },
      { value: 2, label: "Few" },
      { value: 3, label: "None" },
    ],
  },
  {
    question: "Available resource",
    radioGroupName: "resourceLevel",
    answers: [
      { value: 1, label: "Low" },
      { value: 2, label: "Medium" },
      { value: 3, label: "OK" },
    ],
  },
];
