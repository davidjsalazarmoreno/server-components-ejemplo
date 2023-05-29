"use server";
import TopStories from "./server-components/top-stories/top-stories";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* @ts-expect-error Server Component */}
      <TopStories />
    </main>
  );
}
