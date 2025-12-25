export interface OnboardingFormValues {
  mainContext: string;
  typicalDailyLoad: string;
  overloadSources: string;
  actionOnOverload: string;
  strictnessLevel: string;
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
