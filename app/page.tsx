import { ONBOARDING_DATA } from "@/app/onboarding-data";
import { RadioGroup } from "@/app/components/RadioGroup";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between p-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-10 w-full">
          <div>
            <h1 className="font-semibold text-xl mb-1">Emotion guard</h1>
            <h2 className="max-w-xs text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
              Onboading
            </h2>
          </div>
          {ONBOARDING_DATA.map(
            ({ question, answers, radioGroupName }, index) => (
              <RadioGroup
                label={`${index + 1}. ${question}`}
                key={question}
                radioGroupName={radioGroupName}
                options={answers}
              />
            ),
          )}
        </div>

        <div className="text-base font-medium mt-10">
          <button className="flex h-12 w-full text-nowrap items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
            Confirm and start
          </button>
        </div>
      </main>
    </div>
  );
}
