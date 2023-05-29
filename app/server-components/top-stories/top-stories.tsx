"use server";
import {
  HackerNewsItem,
  GET as getTopStories,
} from "@/app/api/top-stories/route";
import Story from "@/app/client-components/story/story";

export default async function TopStories() {
  const stories: HackerNewsItem[] = await (await getTopStories()).json();
  return (
    <section className="w-2/4 p-5 border border-red-300">
      <ol className="w-full space-y-4 list-decimal">
        {stories.map((story) => (
          <li key={story.id}>
            <Story
              title={story.title}
              url={story.url}
              commentsIds={story.kids ?? []}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
