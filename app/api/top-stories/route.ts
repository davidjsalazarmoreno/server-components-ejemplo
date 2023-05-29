import { NextResponse } from "next/server";

const ENDPOINT = "https://hacker-news.firebaseio.com/v0";

// https://github.com/HackerNews/API#items
export interface HackerNewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  text: string;
}

async function getTopStoriesIds(): Promise<number[]> {
  const url = `${ENDPOINT}/topstories.json`;

  console.log(`Fetching: ${url}`);
  try {
    const response = await fetch(url);
    const stories: number[] = await response.json();
    return stories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getItemFromId(id: number): Promise<HackerNewsItem> {
  const url = `${ENDPOINT}/item/${id}.json`;

  console.log(`Fetching: ${url}`);
  try {
    const response = await fetch(url);
    const article: HackerNewsItem = await response.json();
    return article;
  } catch (error) {
    console.log(error);
    return {} as HackerNewsItem;
  }
}

export async function GET() {
  const ids = await getTopStoriesIds();
  const items = await Promise.all(ids.map(getItemFromId));

  return NextResponse.json(items);
}
