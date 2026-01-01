import { DayState } from "@/app/types";

export function getRuleMessages(rules: DayState["rules"]) {
  const messages: string[] = [];

  if (!rules.allowNewTasks) {
    messages.push("Avoid taking on new tasks");
  }

  if (!rules.allowSocial) {
    messages.push("Limit social interactions");
  }

  if (!rules.allowDeepWork) {
    messages.push("Avoid deep focus sessions");
  }

  if (rules.showWarnings) {
    messages.push("Pay attention to early signs of overload");
  }

  return messages;
}
