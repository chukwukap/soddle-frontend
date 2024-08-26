'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { TimeInput } from '../lib/utils';

interface TimeContextType {
  time: TimeInput;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [time, setTime] = useState<TimeInput>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider value={{ time }}>{children}</TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider');
  }
  return context;
};
