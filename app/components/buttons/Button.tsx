export const Button = ({
  isDisabled = false,
  title,
  onClick,
  variant = "standard",
  size = "medium",
  type = "button",
}: {
  isDisabled?: boolean;
  title: string;
  onClick?: () => void;
  variant?: "standard" | "error";
  size?: "medium" | "small";
  type?: "submit" | "reset" | "button";
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={`
      flex text-nowrap items-center
      justify-center gap-2 rounded-full
      ${variant === "standard" && "bg-slate-800 hover:bg-slate-950 dark:hover:bg-[#ccc]"}
      ${variant === "error" && "bg-rose-800/85 hover:bg-rose-900/90"}
      ${size === "medium" && "font-medium h-12"}
      ${size === "small" && "font-small h-10"}
      px-6 text-background hover:scale-[1.01]
      disabled:opacity-75 transition-all
`}
    >
      {title}
    </button>
  );
};
