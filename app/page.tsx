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
            A lightweight system for daily self-regulation.
          </p>
          <p>
            Morning check-ins, adaptive daily rules, and simple signals to
            prevent overload.
          </p>
        </div>
        <div>
          <p className="mb-1">How it works:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>You start with a short morning check-in.</li>
            <li>
              The system adapts daily rules based on your state and real-time
              signals.
            </li>
            <li>No goals, no streaks, no pressure.</li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Button title="Start using Daily Signal" href="/day-state" />
        </div>
      </main>
    </div>
  );
}
