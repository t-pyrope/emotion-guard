import { Answer } from "@/app/onboarding-data";

export const RadioGroup = ({
  selectedValue,
  radioGroupName,
  options,
  label,
}: {
  selectedValue?: string;
  radioGroupName: string;
  options: Answer[];
  label: string;
}) => {
  return (
    <div className="space-y-4 w-full" role="radiogroup">
      <h4 className="block">{label}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer transition-colors hover:bg-muted/50"
          >
            <input
              type="radio"
              name={radioGroupName}
              id={option.id}
              value={option.value}
              checked={selectedValue === option.value}
              className="w-4 h-4 accent-primary"
            />
            <span className="flex-1">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
