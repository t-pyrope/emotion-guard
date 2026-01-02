export const Button = ({
  isDisabled = false,
  title,
  onClick,
}: {
  isDisabled?: boolean;
  title: string;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="flex font-medium h-12 text-nowrap items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-neutral-700 dark:hover:bg-[#ccc] disabled:bg-neutral-500"
    >
      {title}
    </button>
  );
};
