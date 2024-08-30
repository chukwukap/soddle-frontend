"use client";
import { memo, useState, useEffect, useMemo } from "react";
import { useRootStore } from "@/stores/storeProvider";
import { useGameState } from "@/hooks/useGameState";
import { motion, AnimatePresence } from "framer-motion";

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
  time: { hours: string; minutes: string; seconds: string };
}

const GlowingTime: React.FC<TimeProps> = ({ time }) => {
  const { hours, minutes, seconds } = time;
  const glowingStyle = `
    text-white 
    drop-shadow-[0_0_25px_rgba(47,255,43,1)] 
    text-shadow-[0_0_20px_rgba(47,255,43,1),0_0_35px_rgba(47,255,43,0.8),0_0_50px_rgba(47,255,43,0.6)]
  `;
  const separatorStyle = `${glowingStyle} opacity-75`;

  const digitVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex justify-center items-center">
      <span className="text-5xl font-bold text-white flex gap-1">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={hours}
            className={glowingStyle}
            variants={digitVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {hours}
          </motion.span>
        </AnimatePresence>
        <span className={separatorStyle}>:</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={minutes}
            className={glowingStyle}
            variants={digitVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {minutes}
          </motion.span>
        </AnimatePresence>
        <span className={separatorStyle}>:</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={seconds}
            className={glowingStyle}
            variants={digitVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {seconds}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
};

GlowingTime.displayName = "GlowingTime";

const DynamicGlowingTime = () => {
  const { game } = useRootStore();
  const gameState = game((state) => state.gameState);
  const [isLoading, setIsLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const endTime = useMemo(() => {
    if (gameState) {
      const inMill = Number(gameState.currentCompetition.endTime);
      setIsLoading(false);
      return inMill * 1000;
    }
    return 0;
  }, [gameState]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();

      if (difference <= 0) {
        return { hours: "00", minutes: "00", seconds: "00" };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    };

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer(); // Initial call

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (isLoading || Number.isNaN(endTime)) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-5xl font-bold text-white flex gap-1 animate-pulse">
          <span className="bg-green-700 rounded-md w-16 h-16"></span>
          <span className="text-green-700 opacity-50">:</span>
          <span className="bg-green-700 rounded-md w-16 h-16"></span>
          <span className="text-green-700 opacity-50">:</span>
          <span className="bg-green-700 rounded-md w-16 h-16"></span>
        </div>
      </div>
    );
  }

  return <GlowingTime time={timeLeft} />;
};
