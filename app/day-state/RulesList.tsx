import { DayState } from "@/app/types";
import { getRuleMessages } from "@/app/utils";

export function RulesList({ rules }: { rules: DayState["rules"] }) {
  const messages = getRuleMessages(rules);

  if (messages.length === 0) {
    return (
      <p className="text-muted-foreground">No specific restrictions today.</p>
    );
  }

  return (
    <ol className="space-y-1 list-decimal ml-6">
      {messages.map((text) => (
        <li key={text}>
          <span>{text}</span>
        </li>
      ))}
    </ol>
  );
}
