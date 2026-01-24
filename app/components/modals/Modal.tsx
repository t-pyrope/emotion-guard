"use client";
import { IoClose } from "react-icons/io5";
import { ReactNode } from "react";

export const Modal = ({
  onCloseModalAction,
  title,
  children,
}: {
  onCloseModalAction: () => void;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 blur-xs"
        onClick={onCloseModalAction}
      />

      <div
        className="
      relative overflow-hidden flex flex-col
      bg-background border border-neutral-200 rounded-lg shadow-lg
      w-full max-w-xl mx-4 max-h-(--90vh)"
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2>{title}</h2>
          <button
            onClick={onCloseModalAction}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-auto h-full">{children}</div>
      </div>
    </div>
  );
};
