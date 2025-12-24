export async function POST(request: Request) {
  const data = await request.json();

  // TODO: save to DB
  console.log("Onboarding data:", data);
  return new Response("OK");
}
