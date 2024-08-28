"use client";
import { useEffect, useState } from "react";
import GamePlayPageClient from "./client";

export default function GamePlayPage() {
  // little hack to fix hydration errors connected to wallet stuff
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <></>;
  }

  return <GamePlayPageClient />;
}
