import { useWallet } from "@solana/wallet-adapter-react";
import { useGameSession } from "@/hooks/useGameSession";
import { useRootStore } from "@/stores/storeProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchRandomKOL } from "@/lib/api";
import { GameType } from "@/lib/constants";
import { KOL } from "@/lib/types/idlTypes";
import {
  WalletConnectionError,
  GameSessionNotFoundError,
  GameAlreadyCompletedError,
  ApiRequestError,
  InternalServerError,
} from "@/lib/errors";
import Container from "@/components/layout/container";
import UserInfoCard from "./_components/userInfoCard";
import TimeSection from "./_components/timeSection";
import { HashtagIcon, LaughingEmojiIcon } from "@/components/icons";
import { GameButton } from "./_components/gameTypeButton";

export default function GamePlayPageClient({ kols }: { kols: KOL[] }) {
  const { wallet } = useWallet();
  const { startGameSession, fetchGameSession } = useGameSession();
  const { ui, game } = useRootStore();
  const setLoading = ui((state) => state.setLoading);
  const setCurrentGameType = game((state) => state.setCurrentGameType);
  const setGameSession = game((state) => state.setGameSession);
  const router = useRouter();

  const handleStartGameSession = async (gameType: GameType) => {
    try {
      const kol = await fetchRandomKOL();
      setLoading(true);
      if (!wallet) {
        throw new WalletConnectionError();
      }
      const gameSession = await fetchGameSession(wallet?.adapter.publicKey!);

      if (gameSession && gameSession.gameType === gameType) {
        setGameSession(gameSession);
        if (
          gameSession.game1Completed &&
          gameSession.gameType === GameType.Attributes
        ) {
          throw new GameAlreadyCompletedError(
            "You have already completed Attributes game"
          );
        } else if (
          gameSession.game2Completed &&
          gameSession.gameType === GameType.Tweets
        ) {
          throw new GameAlreadyCompletedError(
            "You have already completed Tweets game"
          );
        } else if (
          gameSession.game3Completed &&
          gameSession.gameType === GameType.Emojis
        ) {
          throw new GameAlreadyCompletedError(
            "You have already completed Emojis game"
          );
        }
      }

      await startGameSession(gameType, kol);
      setCurrentGameType(gameType);
      router.push(`/play/${gameType}`);
    } catch (error) {
      if (error instanceof WalletConnectionError) {
        toast.error("Please connect your wallet");
      } else if (error instanceof GameSessionNotFoundError) {
        toast.error("Game session not found");
      } else if (error instanceof GameAlreadyCompletedError) {
        toast.info(error.message);
        setCurrentGameType(gameType);
        router.push(`/play/${gameType}`);
      } else if (error instanceof ApiRequestError) {
        toast.error(error.message);
      } else if (error instanceof InternalServerError) {
        toast.error("An unexpected error occurred");
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // const linkStyle =
  //   "bg-[#111411] border border-[#03B500] border-opacity-50 p-4 text-white text-lg transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(47,255,43,1)] hover:shadow-[0_0_20px_rgba(47,255,43,0.5)]";

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <UserInfoCard />
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
              onClick={() => handleStartGameSession(type.type)}
              key={type.type}
            />
          ) : (
            <GameButton2
              description={type.description}
              type={type.type}
              title={type.title}
              className="w-full"
              icon={type.icon}
              onClick={() => handleStartGameSession(type.type)}
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
  title,
  icon,
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
