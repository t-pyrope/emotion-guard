import { UseFormRegisterReturn } from "react-hook-form";

import { Answer } from "@/app/types";

export const RadioGroup = ({
  options,
  label,
  ...inputProps
}: {
  options: Answer[];
  label: string;
} & Partial<UseFormRegisterReturn<string>>) => {
  return (
    <div className="space-y-2 w-full" role="radiogroup">
      <h4 className="block">{label}</h4>
      <div className="space-y-2">
        {options.map((option) => {
          const id = `${inputProps.name}-${option.value}`;
          return (
            <label
              key={id}
              htmlFor={id}
              className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer transition-colors hover:bg-muted/50"
            >
              <input
                type="radio"
                id={id}
                value={option.value}
                className="w-4 h-4 accent-indigo-700 peer"
                {...(inputProps || {})}
              />
              <span className="flex-1 peer-checked:text-indigo-700">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
