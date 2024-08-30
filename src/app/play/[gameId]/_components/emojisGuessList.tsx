import React from "react";
import { Game3GuessResult } from "@/lib/types/idlTypes";
import Image from "next/image";

interface EmojisGuessListProps {
  guess3Results?: Game3GuessResult[];
}

export const EmojisGuessList: React.FC<EmojisGuessListProps> = ({
  guess3Results,
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {!guess3Results && <div>Todo: Guess results not found</div>}
      {guess3Results?.map((guessResult) => (
        <ListItem key={guessResult.kol.id} guessResult={guessResult} />
      ))}
    </ul>
  );
};

function ListItem({ guessResult }: { guessResult: Game3GuessResult }) {
  return (
    <li
      className={`bg-${
        guessResult.result ? "green" : "red"
      }-500  py-4 px-2 text-white flex items-center gap-2 justify-center`}
    >
      <Image
        src={guessResult.kol.pfp || "/user-icon.svg"}
        alt={guessResult.kol.name}
        width={40}
        height={40}
      />
      <p>{guessResult.kol.name}</p>
    </li>
  );
}
