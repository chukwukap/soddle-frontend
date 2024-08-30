"use client";
import { useEffect, useState } from "react";
import { fetchKOLs } from "@/lib/fns/fetchers";
import GamePlayPageClient from "./client";
import Image from "next/image";

export default async function GamePlayPage() {
  // little hack to fix hydration errors connected to wallet stuff
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <></>;
  }

  const kols = await fetchKOLs();
  console.log("kols", kols);
  if (!kols) {
    return <NoKOLsFound />;
  }
  return <GamePlayPageClient kols={kols} />;
}

const NoKOLsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#111411] to-[#0A0C0A] text-white">
      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/images/crypto-maze.svg"
          alt="Crypto Maze"
          layout="fill"
          className="animate-pulse"
        />
      </div>
      <h2 className="text-4xl font-bold mb-4 text-[#03B500] animate-bounce">
        No KOLs Found!
      </h2>
      <p className="text-xl mb-8 text-center max-w-md">
        Looks like our crypto influencers are playing hide and seek in the
        blockchain!
      </p>
      <button className="bg-[#03B500] text-black font-bold py-3 px-6 rounded-full hover:bg-[#04D600] transition-colors duration-300 transform hover:scale-105">
        Explore the Crypto Realm
      </button>
    </div>
  );
};
