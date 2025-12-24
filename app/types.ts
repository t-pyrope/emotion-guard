export interface OnboardingFormValues {
  systemUse: string;
  typicalDailyLoad: string;
  overloadsMost: string;
  actionOnOverload: string;
  systemStrictness: string;
  activeHours: string;
}

export interface Answer {
  value: string;
  id: string;
  label: string;
}

export interface OnboardingQuestion {
  question: string;
  radioGroupName: keyof OnboardingFormValues;
  answers: Answer[];
}
