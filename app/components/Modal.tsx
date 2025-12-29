import { ReactNode } from "react";

export const Modal = ({
  handleCloseModal,
  children,
}: {
  handleCloseModal: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
