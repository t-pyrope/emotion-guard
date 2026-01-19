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
      aria-label={label}
      className={`
        group
        rounded-full
        flex items-center
        overflow-hidden
        transition-all duration-300 ease-out
        ${size === "lg" && "h-12 max-w-12 px-3 shadow-lg"}
        ${size === "md" && "h-10 max-w-10 px-2 shadow-md"}
        hover:max-w-56 focus-visible:max-w-56
        ${variant === "dark" && "bg-slate-800 text-white hover:bg-neutral-950"}
        ${variant === "light" && "bg-white text-neutral-600 shadow-neutral-200 hover:text-neutral-700"}
      `}
    >
      <span className="flex-shrink-0">{icon}</span>

      <span
        className={`
          ml-2
          whitespace-nowrap
          opacity-0
          translate-x-[-4px]
          transition-all duration-150 ease-out
          group-hover:opacity-100
          group-hover:translate-x-0
          group-focus-visible:opacity-100
          group-focus-visible:translate-x-0
        `}
      >
        {label}
      </span>
    </button>
  );
};
