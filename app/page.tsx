import { Button } from "@/app/components/buttons/Button";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        className="
      min-h-screen w-full max-w-3xl lg:p-16
      bg-white dark:bg-black sm:items-start
      p-6 gap-5 flex flex-col
      "
      >
        <h1 className=" text-4xl font-bold leading-10 tracking-tight text-black">
          Daily Signal
        </h1>
        <div>
          <p className="mb-1">
            A deterministic system that detects overload and manages cognitive
            and social load during work or study days. It uses short signals and
            fixed rules instead of emotional tracking, goals, or habit streaks.
          </p>
        </div>
        <div>
          <p className="mb-1">How it works:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Optional morning signals (30–60 seconds).</li>
            <li>The system continuously computes your day state.</li>
            <li>When load increases, rules tighten automatically.</li>
            <li>
              Signals in → rules out. No reflection, no goals, no pressure.
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Button title="Start using Daily Signal" href="/day-state" />
        </div>
      </main>
    </div>
  );
}
