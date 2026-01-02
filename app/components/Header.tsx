export const Header = ({ title }: { title: string }) => {
  return (
    <header className="w-full">
      <div className="mb-6">
        <h1 className="font-semibold text-xl mb-1">Signal</h1>
        <h2 className=" text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
          {title}
        </h2>
      </div>
    </header>
  );
};
