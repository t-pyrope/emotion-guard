export interface OnboardingFormValues {
  mainContext: string;
  typicalDailyLoad: string;
  overloadSources: string;
  actionOnOverload: string;
  strictnessLevel: string;
  activeHours: string;
}

export interface Answer {
  value: string | number;
  label: string;
}

export interface OnboardingQuestion {
  question: string;
  radioGroupName: keyof OnboardingFormValues;
  answers: Answer[];
}

export interface MorningCheckInValues {
  sleepLevel: number;
  bodyState: number;
  mentalState: number;
  contactsExpected: number;
  resourceLevel: number;
}

export interface MorningCheckInQuestion {
  question: string;
  radioGroupName: keyof MorningCheckInValues;
  answers: Answer[];
}
