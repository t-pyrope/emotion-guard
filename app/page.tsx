export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between p-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div>
            <h1 className="font-semibold text-xl mb-1">Emotion guard</h1>
            <h2 className="max-w-xs text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
              Onboading
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Where will you use the system most? Study, work, both
            Your typical daily load is closer to: light, moderate, heavy
            What overloads you the most? Too many people, Deadlines, Unclear expectations, Context switching
            When overload starts, you usually: Push through, Shut down, Lose focus
            How strict should the system be? Gentle, Standard, Strict
            Your typical active hours: Morning, Day, Evening, Irregular
          </p>
        </div>
        <div className="text-base font-medium">
          <button
            className="flex h-12 w-full text-nowrap items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Confirm and start
          </button>
        </div>
      </main>
    </div>
  );
}
