"use client";
import { UseFormRegisterReturn } from "react-hook-form";

import { ReactNode, useState } from "react";
import { Answer } from "@/app/types";
import { RadioButton } from "@/app/components/RadioButton";
import { LabelTooltip } from "@/app/components/LabelTooltip";

export const RadioGroup = ({
  options,
  label,
  hint,
  isMulti = false,
  ...rest
}: {
  options: Answer[];
  label: string;
  hint?: string | ReactNode;
  isMulti?: boolean;
} & Partial<UseFormRegisterReturn<string>>) => {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const inputProps = {
    ...(rest ?? {}),
    onChange: async (event: { target: HTMLInputElement }) => {
      const isNumber = Number.isFinite(options[0].value);

      rest?.onChange?.(event);
      setSelectedId(isNumber ? +event.target.value : event.target.value);
    },
  };

  return (
    <div className="space-y-2 w-full" role="radiogroup">
      <h4 className="block">
        {label}
        {hint && <LabelTooltip text={hint} />}
      </h4>
      <div className="space-y-2">
        {options.map((option) => (
          <RadioButton
            key={option.label}
            value={option.value}
            label={option.label}
            isChecked={selectedId === option.value}
            isMulti={isMulti}
            {...(inputProps ?? {})}
          />
        ))}
      </div>
    </div>
  );
};
