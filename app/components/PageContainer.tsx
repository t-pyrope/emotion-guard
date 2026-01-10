import { ReactNode } from "react";

export const PageContainer = ({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl lg:p-16 bg-white dark:bg-black sm:items-start p-6">
        <header className="w-full">
          <div className="mb-6">
            <h1 className="font-semibold text-xl mb-1">Daily Signal</h1>
            <h2 className=" text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
              {title}
            </h2>
            {subtitle && <p className="mt-2 mb-6">{subtitle}</p>}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};
