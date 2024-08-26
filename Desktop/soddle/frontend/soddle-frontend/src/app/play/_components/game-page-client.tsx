"use client";
import React, { useEffect, useState } from "react";
import { kols } from "@/lib/constants/kols";
import GameWrapper from "./game-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRootStore } from "@/stores/rootStore";
import Link from "next/link";

const GamePageClient: React.FC = () => {
  const [gameScore, setGameScore] = useState<number | null>(null);
  const { game, ui } = useRootStore();
  const router = useRouter();
  const wallet = useAnchorWallet();
  const searchParams = useSearchParams();
  const gameType = searchParams.get("g");
  const [currentGameType, _] = useState<number | null>(
    gameType ? parseInt(gameType) : null
  );

  useEffect(() => {
    if (!wallet) {
      router.push("/");
    }
  }, [wallet, router]);

  const handleGameComplete = (score: number) => {
    setGameScore(score);
  };

  if (!currentGameType) {
    return (
      <div>
        You need to select a game <Link href="/home">Home</Link>
      </div>
    );
  }
  return (
    <GameWrapper
      kols={kols}
      onGameComplete={handleGameComplete}
      currentGameType={currentGameType}
    />
  );
};

export default GamePageClient;
