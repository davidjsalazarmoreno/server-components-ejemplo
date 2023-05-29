"use server";
import TopStories from "./server-components/top-stories/top-stories";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <TopStories />
    </main>
  );
}
