"use client";

export const LoadingBar = () => {
  return (
    <div className="fixed top-0 right-0 left-0">
      <div className="w-full h-1 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full w-full animate-progress bg-gray-400" />
      </div>
    </div>
  );
};
