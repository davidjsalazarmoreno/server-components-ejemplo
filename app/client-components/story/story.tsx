"use client";

import { HackerNewsItem } from "@/app/api/top-stories/route";
import { useCallback, useState } from "react";

export interface Props {
  title: string;
  content: string;
  commentsIds: number[];
}

export default function Story({ title, content, commentsIds }: Props) {
  const [comments, setComments] = useState<Partial<HackerNewsItem>[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const hasComments = comments.length > 0;
  const disabled = newComment.length === 0;

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/comments?ids=${commentsIds.join(",")}`
      );
      const newComments = await response.json();
      setComments(newComments);
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  }, [commentsIds]);

  const addNewComment = useCallback(async () => {
    const comment: Partial<HackerNewsItem> = {
      id: Math.random(),
      text: newComment,
      url: "",
      score: 0,
    };
    setComments((prevComments) => [...prevComments, comment]);
    setNewComment("");
  }, [newComment]);
  return (
    <main>
      <h1>{title}</h1>
      <p>{content}</p>

      {hasComments && (
        <details>
          <summary>Details</summary>
          <ul className="mx-auto my-0 w-50">
            {comments.map((item) => (
              <li key={item.id}>
                <h2>{item.text}</h2>
                <p>{item.url}</p>
                <p>{item.score}</p>
              </li>
            ))}
          </ul>
          <textarea
            placeholder="Agrega un comentario"
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="button"
            disabled={disabled}
            onClick={() => addNewComment()}
          >
            Agrega comentario
          </button>
        </details>
      )}

      <button onClick={() => fetchComments()} type="button">
        Load comments
      </button>
    </main>
  );
}
