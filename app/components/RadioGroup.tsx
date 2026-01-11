"use client";
import { UseFormRegisterReturn } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import { useId, useState } from "react";

import { RadioButton } from "@/app/components/RadioButton";
import { QuestionHint } from "@/app/components/QuestionHint";
import { Answer } from "@/app/types";

export const RadioGroup = ({
  options,
  label,
  hasHint = false,
  isMulti = false,
  ...rest
}: {
  options: Answer[];
  label: string;
  hasHint?: boolean;
  isMulti?: boolean;
} & Partial<UseFormRegisterReturn<string>>) => {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const id = useId();
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
        {hasHint && (
          <>
            <button
              type="button"
              id={id}
              className="
                transition-all inline-flex items-center justify-center
                w-5 h-5 rounded-full border border-gray-300 text-gray-500
                ml-1 hover:bg-gray-100 max-w-5"
              aria-label="hint"
            >
              ?
            </button>
            <Tooltip
              anchorSelect={`#${id}`}
              variant="light"
              className="tooltip-adaptive border-slate-200 shadow-lg z-2"
            >
              <QuestionHint listItems={options} />
            </Tooltip>
          </>
        )}
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
