import { useState, useEffect } from "react";
import { TimeInput } from "@/lib/utils";

export const useCountdown = (endTime: number | null): TimeInput => {
  const [timeRemaining, setTimeRemaining] = useState<TimeInput>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!endTime) return;

    const updateCountdown = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);

      if (remaining > 0) {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        setTimeRemaining({
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      } else {
        setTimeRemaining({ hours: "00", minutes: "00", seconds: "00" });
      }
    };

    updateCountdown(); // Initial update
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  return timeRemaining;
};
