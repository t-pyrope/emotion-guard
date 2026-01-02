import { DayState } from "@/app/types";

export const formatModeWithSubtitle = (
  mode: DayState["mode"],
): { title: string; subtitle: string } => {
  switch (mode) {
    case "limited":
      return {
        title: "reduced",
        subtitle: "The system suggests a lighter day.",
      };
    case "protected":
      return {
        title: "protection",
        subtitle: "The system suggests extra care and reduced demands.",
      };
    case "normal":
    default:
      return {
        title: "normal",
        subtitle: "The system is operating within a comfortable range.",
      };
  }
};
