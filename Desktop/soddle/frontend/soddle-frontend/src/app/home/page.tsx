"use client";
import Container from "@/components/layout/container";
import UserInfoCard from "./_components/user-info-card";
import TimeSection from "./_components/time-section";
import { GameType } from "@/lib/constants";
import { GameButton } from "./_components/game-type-button";
import { HashtagIcon, LaughingEmojiIcon } from "@/components/icons";
import { useRootStore } from "@/stores/rootStore";
import { kols } from "@/lib/constants/kols";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { KOL } from "@/lib/types/idl-types";
import { useGameSession } from "@/hooks/useGameSession";
import { useGameState } from "@/hooks/useGameState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GameHome() {
  const { wallet } = useWallet();
  const { gameState, fetchGameState } = useGameState();
  const { fetchGameSession, startGameSession } = useGameSession();
  const router = useRouter();
  const { ui } = useRootStore();

  useEffect(() => {
    if (!wallet) {
      router.push("/");
      return;
    }
  }, [gameState, router, wallet]);

  const handleStartGameSession = async (gameType: GameType, kol: KOL) => {
    try {
      ui.setLoading(true);
      if (!wallet) {
        throw new Error("Please connect your wallet");
      }

      const [gameState] = await Promise.all([fetchGameState()]);

      await startGameSession(gameType, kol);
      router.push(`/play/${gameType}`);
    } catch (error) {
      console.error("Error  GameSession", error);
      toast.error(
        "An error occurred while starting the game. Please try again."
      );
    } finally {
      ui.setLoading(false);
    }
  };

  const linkStyle =
    "bg-[#111411] border border-[#03B500] border-opacity-50 p-4 text-white text-lg transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(47,255,43,1)] hover:shadow-[0_0_20px_rgba(47,255,43,0.5)]";
  return (
    <Container>
      <div className="flex flex-col gap-4">
        <UserInfoCard />
        {/* <EclipseWallets /> */}
        {/* <Button3 className={""}>
          <span>
            hello world
            <HashtagIcon className="size-6" />
          </span>
        </Button3> */}
        {/* <Button2 className="w-full" onClick={initializeGame}>
          Initialize Game
        </Button2> */}
        <TimeSection />
        {[
          {
            title: "Attributes Game",
            description: "match an infamous tweet to it's publisher",
            type: GameType.Attributes,
            icon: "A",
          },
          {
            title: "Tweets Game",
            description: "find the daily KOL through clues on every try.",
            type: GameType.Tweets,
            icon: <HashtagIcon className="size-6" />,
          },
          {
            title: "Emoji's Game",
            description: "Guess the right KOL using emojis",
            type: GameType.Emojis,
            icon: <LaughingEmojiIcon className="size-6" />,
          },
        ].map((type, _, len) => {
          return type.type !== len.length + 1 ? (
            <GameButton
              description={type.description}
              type={type.type}
              title={type.title}
              icon={type.icon}
              onClick={() => handleStartGameSession(type.type, kols[0])}
              key={type.type}
            />
          ) : (
            <GameButton2
              description={type.description}
              type={type.type}
              title={type.title}
              className="w-full"
              icon={type.icon}
              onClick={() => handleStartGameSession(type.type, kols[0])}
              key={type.type}
            />
          );
        })}
      </div>
    </Container>
  );
}

function GameButton2({
  description,
  type,
  title,
  icon,
  className,
  onClick,
}: {
  description: string;
  type: GameType;
  className?: string;
  title: string;
  icon: string | React.ReactNode;
  onClick: () => void;
}) {
  const linkStyle =
    "bg-[#111411] border border-[#03B500] border-opacity-50 p-4 text-white text-lg transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(47,255,43,1)] hover:shadow-[0_0_20px_rgba(47,255,43,0.5)]";
  return (
    <button
      className={`${linkStyle} relative overflow-hidden `}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 436.5 70.5"
        className="w-full h-full inset-0 absolute"
      >
        <path
          d="M-1465.67-1023.46h-416.4V-1093h435.5v50.4Z"
          transform="translate(1882.57 1093.46)"
        />
      </svg>
      <div className="flex gap-2 items-center justify-center mb-3 ">
        <h1>{title}</h1>
        {/* <Image
        width={22}
        height={22}
        src={imageSrc}
        alt={`${title} icon`}
        className="w-[22px] h-[22px] opacity-80"
      /> */}
        <span>{icon}</span>
      </div>
      <p className="text-center text-white/70">{description}</p>
    </button>
  );
}
