import { GuessResult, KOL, AttributeResult } from "@/lib/types/idl-types";
import Image from "next/image";
import React from "react";

interface AttributesGuessListProps {
  guessResults: GuessResult[];
}

const cellStyle = "p-2  overflow-hidden";
const cellContentStyle = "w-full h-full flex items-center justify-center";
const cellTextStyle = "text-xs sm:text-sm md:text-base truncate";

interface CellProps {
  children: React.ReactNode;
  result: AttributeResult;
  className?: string;
}

const Cell: React.FC<CellProps> = ({ children, result, className }) => (
  <div
    className={`${cellStyle} ${
      Math.random() > 0.5 ? "bg-green-500" : "bg-red-500"
    } ${className}`}
  >
    <div className={`${cellContentStyle} aspect-[2/1]`}>{children}</div>
  </div>
);

const HeaderCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={`${cellStyle} `}>
    <div className={`${cellContentStyle} aspect-[2/1]`}>
      <span className={cellTextStyle}>{children}</span>
    </div>
  </div>
);

export const AttributesGuessList: React.FC<AttributesGuessListProps> = ({
  guessResults,
}) => {
  return (
    <div className="w-full max-w-[700px] mx-auto overflow-x-auto ">
      <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-7 gap-2 ">
          {[
            "KOL",
            "Age",
            "Country",
            "Pfp",
            "Account creation",
            "Followers",
            "Ecosystem",
          ].map((header) => (
            <HeaderCell key={header}>{header}</HeaderCell>
          ))}
          {guessResults.map((guess) => (
            <TableItem key={guess.kol.id} guess={guess} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TableItemProps {
  guess: GuessResult;
}

function TableItem({ guess }: TableItemProps) {
  const { kol, result } = guess;

  return (
    <>
      <Cell result={result[0]} className="bg-transparent p-0 m-0">
        <Image
          src={kol.pfp || "/user-icon.svg"}
          alt="user"
          width={40}
          height={20}
          objectFit="cover"
        />
      </Cell>
      <Cell result={result[1]}>
        <span className={cellTextStyle}>{kol.age}</span>
      </Cell>
      <Cell result={result[2]}>
        <span className={cellTextStyle}>{kol.country}</span>
      </Cell>
      <Cell result={result[3]}>
        <span className={cellTextStyle}>{kol.pfp}</span>
      </Cell>
      <Cell result={result[4]}>
        <span className={cellTextStyle}>{kol.accountCreation}</span>
      </Cell>
      <Cell result={result[5]}>
        <span className={cellTextStyle}>{formatCount(kol.followers)}</span>
      </Cell>
      <Cell result={result[6]}>
        <span className={cellTextStyle}>{kol.ecosystem}</span>
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
