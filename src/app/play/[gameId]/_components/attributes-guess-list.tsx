"use client";
import { useGameSession } from "@/hooks/useGameSession";
import { AttributeResult, Game1GuessResult, KOL } from "@/lib/types/idl-types";
import Image from "next/image";
import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRootStore } from "@/stores/storeProvider";
interface AttributesGuessListProps {
  guess1Results?: Game1GuessResult[];
}

const cellStyle = "p-2 overflow-hidden";
const cellContentStyle = "w-full h-full flex items-center justify-center";
const cellTextStyle = "text-xs sm:text-sm md:text-base truncate";

interface CellProps {
  children: React.ReactNode;
  attributeResult: AttributeResult;
  targetKol: KOL;
  guessKol: KOL;
  className?: string;
}

const Cell: React.FC<CellProps> = ({
  children,
  attributeResult,
  targetKol,
  guessKol,
  className,
}) => {
  const targetKolId = targetKol.id;
  const guessKolId = guessKol.id;
  return (
    <div
      className={`${cellStyle} ${
        attributeResult === "correct"
          ? "bg-green-500"
          : attributeResult === "incorrect"
          ? "bg-red-500"
          : attributeResult === "higher"
          ? "bg-red-500"
          : attributeResult === "lower"
          ? "bg-red-500"
          : "bg-yellow-500"
      } ${className}`}
    >
      <div className={`${cellContentStyle} aspect-[2/1]`}>{children}</div>
    </div>
  );
};

const HeaderCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={`${cellStyle} `}>
    <div className={`${cellContentStyle} aspect-[2/1]`}>
      <span className={cellTextStyle}>{children}</span>
    </div>
  </div>
);

export const AttributesGuessListTable: React.FC<AttributesGuessListProps> = ({
  guess1Results,
}) => {
  return (
    <div className="w-full max-w-[700px] mx-auto overflow-x-auto ">
      <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-6 gap-2 ">
          {[
            "KOL",
            "Age",
            "Country",
            "Account creation",
            "Followers",
            "Ecosystem",
          ].map((header) => (
            <HeaderCell key={header}>{header}</HeaderCell>
          ))}
          {!guess1Results && <div>Todo: Guess results not found</div>}
          {guess1Results?.map((guess1Result) => (
            <TableItem key={guess1Result.kol.id} guess1Result={guess1Result} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TableItemProps {
  guess1Result: Game1GuessResult;
}

function TableItem({ guess1Result }: TableItemProps) {
  const { wallet } = useWallet();
  const { fetchGameSession } = useGameSession();
  const { game } = useRootStore();
  const setGameSession = game((state) => state.setGameSession);
  const gameSession = game((state) => state.gameSession);

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

  const { kol: guessKol, result } = guess1Result;
  const targetKol = gameSession?.kol;
  if (!targetKol) return null;

  const attributesResults = result.map(
    (obj) => Object.keys(obj)[0]
  ) as AttributeResult[];

  return (
    <>
      <Cell
        targetKol={targetKol}
        guessKol={guessKol}
        attributeResult={attributesResults[0]}
        className="bg-transparent p-0 m-0"
      >
        <Image
          unoptimized
          src={guessKol.pfp || "/user-icon.svg"}
          className="rounded-full"
          alt="user"
          width={40}
          height={20}
          objectFit="cover"
        />
      </Cell>
      <Cell
        attributeResult={attributesResults[1]}
        guessKol={guessKol}
        targetKol={targetKol}
      >
        <span className={cellTextStyle}>{targetKol.age}</span>
      </Cell>
      <Cell
        attributeResult={attributesResults[2]}
        guessKol={guessKol}
        targetKol={targetKol}
      >
        <span className={cellTextStyle}>{targetKol.country}</span>
      </Cell>

      <Cell
        attributeResult={attributesResults[3]}
        guessKol={guessKol}
        targetKol={targetKol}
      >
        <span className={cellTextStyle}>{targetKol.accountCreation}</span>
      </Cell>
      <Cell
        attributeResult={attributesResults[4]}
        guessKol={guessKol}
        targetKol={targetKol}
      >
        <span className={cellTextStyle}>
          {formatCount(targetKol.followers)}
        </span>
      </Cell>
      <Cell
        attributeResult={attributesResults[5]}
        guessKol={guessKol}
        targetKol={targetKol}
      >
        <span className={cellTextStyle}>{targetKol.ecosystem}</span>
      </Cell>
    </>
  );
}

function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  }

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  return formatter.format(count);
}
