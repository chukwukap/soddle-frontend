import { GameType } from "@/lib/constants";

interface GameButtonType {
  type: GameType;
  title: string;
  icon: string | React.ReactNode;
  description: string;
  onClick: () => void;
}

export const GameButton = ({
  title,
  onClick,
  icon,
  description,
}: GameButtonType) => {
  const linkStyle =
    "bg-[#111411] border border-[#03B500] border-opacity-50 p-4 text-white text-lg transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(47,255,43,1)] hover:shadow-[0_0_20px_rgba(47,255,43,0.5)]";

  return (
    <button
      className={`${linkStyle} relative overflow-hidden`}
      onClick={() => onClick()}
    >
      <div className="flex gap-2 items-center justify-center mb-3">
        <h1>{title}</h1>
        <span>{icon}</span>
      </div>
      <p className="text-center text-white/70">{description}</p>
    </button>
  );
};
