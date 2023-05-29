"use client";
import { HackerNewsItem } from "@/app/api/top-stories/route";
import { useCallback, useState } from "react";

export interface Props {
  title: string;
  url: string;
  commentsIds: number[];
}

export type Comment = Pick<HackerNewsItem, "id" | "text" | "by">;

function StoryUrl({ url }: { url: string }) {
  if (!url) return null;
  const { host } = new URL(url);

  return (
    <a href={url} target="_blank" className="text-xs">
      ({host.replaceAll("www.", "")})
    </a>
  );
}

export default function Story({ title, url, commentsIds }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [status, setStatus] = useState<string>("idle");
  const hasComments = comments.length > 0;
  const disabled = newComment.length === 0;

  const fetchComments = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await fetch(
        `/api/comments?ids=${commentsIds.join(",")}`
      );
      const newComments = await response.json();
      setComments(newComments);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setComments([]);
      setStatus("error");
    }
  }, [commentsIds]);

  const addNewComment = useCallback(async () => {
    const comment: Comment = {
      id: Math.random(),
      text: newComment,
      by: "Tu",
    };
    setComments((prevComments) => [...prevComments, comment]);
    setNewComment("");
  }, [newComment]);

  return (
    <article className="flex flex-col items-start justify-center border border-blue-300">
      <header className="flex items-baseline space-x-1">
        <h1>{title}</h1>
        <StoryUrl url={url} />
      </header>

      {!hasComments && (
        <button
          onClick={() => fetchComments()}
          type="button"
          className="text-xs"
        >
          Comentarios ({commentsIds.length})
        </button>
      )}

      {status === "loading" && <p>Cargando...</p>}

      {hasComments && (
        <details open className="max-w-full">
          <summary className="font-bold">Comentarios</summary>
          <ul className="space-y-5">
            {comments.map((item) => (
              <li key={item.id}>
                <p className="break-words">{item.text}</p>
                <p className="font-bold">Por: {item.by}</p>
              </li>
            ))}
          </ul>

          <hr className="mt-10 mb-3" />

          <div className="flex flex-col items-start space-y-1">
            <textarea
              placeholder="Agrega un comentario"
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>

            <button
              type="button"
              disabled={disabled}
              onClick={() => addNewComment()}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar
            </button>
          </div>
        </details>
      )}
    </article>
  );
}
