"use client";
import React from "react";
import { useGameState } from "@/hooks/useGameState";
import { useCountdown } from "@/hooks/useCountdown";
import { TimeInput } from "@/lib/utils";

const TimerDisplay: React.FC = () => {
  const { gameState } = useGameState();
  const endTime = gameState?.currentCompetition?.endTime
    ? gameState.currentCompetition.endTime.toNumber() * 1000
    : null;
  const timeRemaining: any = useCountdown(endTime);

  const glowingStyle = `
  text-white 
  drop-shadow-[0_0_30px_rgba(47,255,43,1)] 
  text-shadow-[0_0_25px_rgba(47,255,43,1),0_0_45px_rgba(47,255,43,0.9),0_0_65px_rgba(47,255,43,0.7),0_0_85px_rgba(47,255,43,0.5)]
`;

  return (
    <div className="w-[226px] h-[36px]  bg-[#111411] border border-[#2A342A] flex items-center justify-center self-center">
      <div className="text-2xl font-bold flex items-center">
        <span className={glowingStyle}>{timeRemaining.hours}</span>
        <span className={`${glowingStyle} opacity-75 mx-1`}>:</span>
        <span className={glowingStyle}>{timeRemaining.minutes}</span>
        <span className={`${glowingStyle} opacity-75 mx-1`}>:</span>
        <span className={glowingStyle}>{timeRemaining.seconds}</span>
      </div>
    </div>
  );
};

export default TimerDisplay;
