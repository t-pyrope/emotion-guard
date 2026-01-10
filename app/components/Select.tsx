import { UseFormRegisterReturn } from "react-hook-form";

export function Select({
  label,
  hint,
  options,
  ...inputProps
}: {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
} & Partial<UseFormRegisterReturn<string>>) {
  const id = inputProps.name;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>

      <select
        id={id}
        className="
          w-full
          px-3 py-2
          border border-neutral-200
          rounded-lg
          bg-white
          text-neutral-900
          focus:outline-none
          focus:ring-2
          focus:ring-slate-400
        "
        {...(inputProps || {})}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hint && <p className="text-sm text-neutral-500">{hint}</p>}
    </div>
  );
}
