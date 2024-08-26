"use client";
import React from "react";
import { formatTime } from "@/lib/utils";
import { useTime } from "@/contexts/Time";

const TimerDisplay: React.FC = () => {
  const { time } = useTime();
  const { hours, minutes, seconds } = formatTime(time);

  const glowingStyle = `
    text-white 
    drop-shadow-[0_0_25px_rgba(47,255,43,1)] 
    text-shadow-[0_0_20px_rgba(47,255,43,1),0_0_35px_rgba(47,255,43,0.8),0_0_50px_rgba(47,255,43,0.6)]
  `;

  return (
    <div className="w-[226px] h-[36px]  bg-[#111411] border border-[#2A342A] flex items-center justify-center self-center">
      <div className="text-2xl font-bold flex items-center">
        <span className={glowingStyle}>{hours}</span>
        <span className={`${glowingStyle} opacity-75 mx-1`}>:</span>
        <span className={glowingStyle}>{minutes}</span>
        <span className={`${glowingStyle} opacity-75 mx-1`}>:</span>
        <span className={glowingStyle}>{seconds}</span>
      </div>
    </div>
  );
};

export default TimerDisplay;
