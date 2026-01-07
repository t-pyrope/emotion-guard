"use client";

import { ReactNode, useState } from "react";

export const LabelTooltip = ({ text }: { text: string | ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex ml-2">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="transition-all inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        aria-label="hint"
      >
        ?
      </button>

      {open && (
        <div className="absolute left-0 top-6 z-50 w-64 p-2 text-sm rounded-lg shadow-lg border bg-white border-slate-200">
          {text}
        </div>
      )}
    </span>
  );
};
