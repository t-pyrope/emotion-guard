import { DayState } from "@/app/types";

export function formatMode(mode: DayState["mode"]) {
  switch (mode) {
    case "limited":
      return "reduced mode";
    case "protected":
      return "protection mode";
    case "normal":
    default:
      return "normal mode";
  }
}
