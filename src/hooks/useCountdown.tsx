import { useState, useEffect } from "react";
import { useGameState } from "./useGameState";
import { GameState } from "@/lib/types/idl-types";
import * as anchor from "@coral-xyz/anchor";

interface TimeRemaining {
  hours: string;
  minutes: string;
  seconds: string;
}

export const useCountdown = (gameState: GameState | null): TimeRemaining => {
  const endTime = gameState?.currentCompetition?.endTime as anchor.BN;
  const startTime = gameState?.currentCompetition?.startTime as anchor.BN;

  console.log(
    "competition end time: ",
    new Date(endTime?.toString()).toLocaleString()
  );
  console.log(
    "competition start time: ",
    new Date(startTime?.toString()).toLocaleString()
  );
  console.log("current time: ", new Date().toLocaleString());

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!endTime) return;

    const updateRemainingTime = () => {
      const now = Date.now();
      const distance = Math.max(0, endTime - now);

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });

      return distance > 0;
    };

    // Update immediately
    updateRemainingTime();

    // Then update every second
    const intervalId = setInterval(() => {
      const shouldContinue = updateRemainingTime();
      if (!shouldContinue) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  return timeRemaining;
};
