"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      aria-label={liked ? "Unlike movie" : "Like movie"}
      className="text-2xl leading-none"
      onClick={() => setLiked((value) => !value)}
      type="button"
    >
      {liked ? "♥" : "♡"}
    </button>
  );
}