"use client";
import { ReactNode } from "react";

export const IconButton = ({
  onClickAction,
  label,
  variant = "dark",
  size = "lg",
  icon,
}: {
  onClickAction: () => void;
  label: string;
  variant?: "dark" | "light";
  size?: "lg" | "md";
  icon: ReactNode;
}) => {
  return (
    <button
      onClick={onClickAction}
      className={`
    rounded-full flex items-center justify-center transition-all
    ${size === "lg" && "h-12 w-12 shadow-lg"}
    ${size === "md" && "h-10 w-10 shadow-sm"}
    ${variant === "dark" && "bg-neutral-800 text-white hover:bg-neutral-950"}
    ${variant === "light" && "bg-white text-neutral-600 shadow-neutral-200 hover:text-neutral-700"}
    hover:scale-[1.02] active:scale-95
  `}
      aria-label={label}
    >
      {icon}
    </button>
  );
};
