import Link from "next/link";

export const Button = ({
  isDisabled = false,
  title,
  onClick,
  variant = "standard",
  size = "medium",
  type = "button",
  href,
}: {
  isDisabled?: boolean;
  title: string;
  onClick?: () => void;
  variant?: "standard" | "error" | "outlined";
  size?: "medium" | "small";
  type?: "submit" | "reset" | "button";
  href?: string;
}) => {
  const className = `
      flex text-nowrap items-center w-fit
      justify-center gap-2 rounded-full
      ${variant === "standard" && "bg-slate-800 hover:bg-slate-950 dark:hover:bg-[#ccc] text-background"}
      ${variant === "error" && "bg-rose-800/85 hover:bg-rose-900/90 text-background"}
      ${variant === "outlined" && "border-2 border-slate-800 hover:bg-slate-50 text-slate-800"}
      ${size === "medium" && "font-medium h-12 shadow-lg"}
      ${size === "small" && "font-small h-10 shadow-sm"}
      px-6 hover:scale-[1.01]
      disabled:opacity-75 transition-all
`;
  return href ? (
    <Link href={href} className={className}>
      {title}
    </Link>
  ) : (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={className}
    >
      {title}
    </button>
  );
};
