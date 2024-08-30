import { useGameSession } from "@/hooks/useGameSession";
import { Game2GuessResult } from "@/lib/types/idlTypes";
import { useRootStore } from "@/stores/storeProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import React, { useEffect } from "react";

interface TweetsGuessListProps {
  guess2Results: Game2GuessResult[];
}

export const TweetsGuessList: React.FC<TweetsGuessListProps> = ({
  guess2Results,
}) => {
  console.log("game session", guess2Results);
  return (
    <ul className="flex flex-col gap-2">
      {guess2Results.map((guessResult) => (
        <ListItem key={guessResult.kol.id} guessResult={guessResult} />
      ))}
    </ul>
  );
};

function ListItem({ guessResult }: { guessResult: Game2GuessResult }) {
  const { kol, result: isCorrect } = guessResult;
  const { wallet } = useWallet();
  const { fetchGameSession } = useGameSession();
  const { game } = useRootStore();
  const setGameSession = game((state) => state.setGameSession);

  useEffect(() => {
    async function fetchGSession() {
      if (wallet?.adapter?.publicKey) {
        const gameSession = await fetchGameSession(wallet.adapter.publicKey);
        if (gameSession) {
          setGameSession(gameSession);
        }
      }
    }
    fetchGSession();
  }, []);

  return (
    <li
      className={`bg-${
        isCorrect ? "green" : "red"
      }-500  py-4 px-2 text-white flex items-center gap-2 justify-center`}
    >
      <Image
        src={kol.pfp || "/user-icon.svg"}
        alt={kol.name}
        width={40}
        height={40}
      />
      <p>{kol.name}</p>
    </li>
  );
}
