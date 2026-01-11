import { UseFormRegisterReturn } from "react-hook-form";

export const RadioButton = ({
  value,
  label,
  isChecked,
  isMulti = false,
  ...inputProps
}: {
  value: string | number;
  label: string;
  isChecked: boolean;
  isMulti?: boolean;
} & Partial<UseFormRegisterReturn<string>>) => {
  const id = `${inputProps.name}-${value}`;

  return (
    <label
      key={id}
      htmlFor={id}
      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-neutral-50/90 ${isChecked ? "border-neutral-300 bg-neutral-50/70" : "border-neutral-200"}`}
    >
      <input
        type={isMulti ? "checkbox" : "radio"}
        id={id}
        value={value}
        className="w-4 h-4 accent-slate-700 peer"
        {...(inputProps || {})}
      />
      <span className="flex-1 peer-checked:text-slate-700">{label}</span>
    </label>
  );
};
