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
      className={`
      flex font-medium h-12 text-nowrap items-center
      justify-center gap-2 rounded-full bg-slate-800
      px-6 text-background hover:bg-slate-950 hover:scale-[1.01]
      dark:hover:bg-[#ccc] disabled:opacity-75 transition-all
`}
    >
      {title}
    </button>
  );
};
