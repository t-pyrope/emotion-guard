import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm text-center space-y-4">
        <h1 className="text-xl font-medium">Page not found</h1>

        <p className="text-neutral-600">
          The page you’re looking for doesn’t exist.
        </p>

        <Link href="/" className="inline-block text-neutral-900 underline">
          Go to main page
        </Link>
      </div>
    </main>
  );
}
