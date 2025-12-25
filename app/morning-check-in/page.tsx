export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl p-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="font-semibold text-xl mb-1">Emotion guard</h1>
            <h2 className="max-w-xs text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
              Morning check-in
            </h2>
          </div>
          Sleep: low / ok / good Body: tense / neutral / relaxed Mind: noisy /
          focused / empty Contacts today: many / few / none Resource: low /
          medium / ok
        </div>
      </main>
    </div>
  );
}
