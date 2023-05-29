"use server";
import {
  HackerNewsItem,
  GET as getTopStories,
} from "@/app/api/top-stories/route";
import Story from "@/app/client-components/story/story";

export default async function TopStories() {
  const stories: HackerNewsItem[] = await (await getTopStories()).json();

  return (
    <main>
      <ul className="mx-auto my-0 w-50">
        {stories.map((story) => (
          <Story
            key={story.id}
            title={story.title}
            content={story.url}
            commentsIds={story.kids}
          />
        ))}
      </ul>
    </main>
  );
}
