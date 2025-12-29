import { IoClose } from "react-icons/io5";

const signals = [
  "Interaction increased load",
  "External pressure",
  "Took on extra tasks",
  "Didn't stop when needed",
  "All good",
];

export const SignalModal = ({ onClose }: { onClose: () => void }) => {
  const handleSignalClick = (signal: string) => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-background border border-neutral-200 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2>Log signal</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {signals.map((signal) => (
            <button
              key={signal}
              onClick={() => handleSignalClick(signal)}
              className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {signal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
