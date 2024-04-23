/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from "react";
import { getInitTimer } from "../helpers";
import { Command, State } from "../types";

interface ChronometerProps {
  state: State;
  command: Command;
}

export const Chronometer: React.FC<ChronometerProps> = ({ state, command }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  const checkState = useCallback((state: State) => {
    if (state === "start") {
      return startAndStop();
    }
    if (state === "reset") {
      return reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ state ]);

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };

  useEffect(() => {
    if (state === 'stop') {
      return;
    }
    checkState(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ state ]);

  useEffect(() => {
    const date = command?.initCommand;
    if (!date) {
      reset();
      return;
    }
    setTime(getInitTimer(date.toString()) ?? 0);
    setIsRunning(true);
  }, [command]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  return (
    <div className="absolute bottom-1 right-2 w-[50px] justify-center">
      {
        (!command?.initCommand || command.platesServed) ? (
          <div></div>
        ) : (
          <p className="font-medium text-lg">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        )
      }
    </div>
  );
};
