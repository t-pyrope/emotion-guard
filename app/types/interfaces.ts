import { MorningCheckinFromDB, SignalFromDB, UserFromDB } from "@/app/types/bd";

type SnakeToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
  : S;

type Camelize<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K];
};

export interface DayState {
  mode: "normal" | "limited" | "protected";
  rules: {
    allowNewTasks: boolean;
    allowSocial: boolean;
    allowDeepWork: boolean;
    showWarnings: boolean;
  };
}

export type User = Camelize<UserFromDB>;

export type Signal = Camelize<SignalFromDB>;

export type MorningCheckin = Camelize<MorningCheckinFromDB>;
