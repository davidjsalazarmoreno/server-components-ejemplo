import { NextResponse } from "next/server";

const ENDPOINT = "https://hacker-news.firebaseio.com/v0";

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

async function getItemFromId(id: number | string): Promise<HackerNewsItem> {
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

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const ids = params.get("ids")?.split(",") ?? [];
  const comments = await Promise.all(ids.map(getItemFromId));

  return NextResponse.json(comments);
}
