"use client";
import { TimeInput } from "@/lib/utils";
import { memo } from "react";
import { useCountdown } from "@/hooks/useCountDown";
import { useGameState } from "@/hooks/useGameState";

export default function TimeSection() {
  return (
    <section
      className="bg-[#111411] border-[#03B500] border p-4"
      style={{
        clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 18%)",
      }}
    >
      <p className="text-white text-center text-2xl mb-2">
        Enter daily tournaments by <br />
        guessing crypto personalities!
      </p>

      <DynamicGlowingTime />
    </section>
  );
}

interface TimeProps {
  time: TimeInput;
}

const GlowingTime: React.FC<TimeProps> = ({ time }) => {
  const { hours, minutes, seconds } = time as any;
  const glowingStyle = `
    text-white 
    drop-shadow-[0_0_25px_rgba(47,255,43,1)] 
    text-shadow-[0_0_20px_rgba(47,255,43,1),0_0_35px_rgba(47,255,43,0.8),0_0_50px_rgba(47,255,43,0.6)]
  `;
  const separatorStyle = `${glowingStyle} opacity-75`;

  return (
    <div className="flex justify-center items-center">
      <span className="text-5xl font-bold text-white flex gap-1">
        <span className={glowingStyle}>{hours}</span>
        <span className={separatorStyle}>:</span>
        <span className={glowingStyle}>{minutes}</span>
        <span className={separatorStyle}>:</span>
        <span className={glowingStyle}>{seconds}</span>
      </span>
    </div>
  );
};

GlowingTime.displayName = "GlowingTime";

const DynamicGlowingTime = () => {
  const { gameState } = useGameState();
  console.log("gamesstate from time section:", gameState);
  const endTime = gameState?.currentCompetition?.endTime
    ? gameState.currentCompetition.endTime.toNumber() * 1000
    : null;
  const timeRemaining = useCountdown(endTime);

  return <GlowingTime time={timeRemaining} />;
};
