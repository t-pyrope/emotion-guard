export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="font-semibold text-xl mb-1">Emotion guard</h1>
            <h2 className="max-w-xs text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
              Daily summary
            </h2>
          </div>
          <div>
            <div>
              Today’s state - normal mode, reduced load, protection mode? The
              system operated in reduced load mode.
            </div>
            <div>
              Signals recorded today: Interaction increased load, External
              pressure, Ignored a warning / No signals recorded today.
            </div>
            <div>
              System response: System limited new input, Protective mode was
              activated, No restrictions were applied
            </div>

            <div>Close day</div>
          </div>
        </div>
      </main>
    </div>
  );
}
