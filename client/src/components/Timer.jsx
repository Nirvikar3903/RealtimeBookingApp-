import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress.jsx";
import { cn } from "../lib/utils.js";
import { Clock } from "lucide-react";

const Timer = ({ expiresAt, onExpire }) => {
  const getInitialSeconds = () => {
    const remainingMs = new Date(expiresAt) - Date.now();
    return Math.max(0, Math.floor(remainingMs / 1000));
  };

  const [secondsLeft, setSecondsLeft] = useState(getInitialSeconds);

  useEffect(() => {
    // Reset timer state when expiresAt changes
    setSecondsLeft(getInitialSeconds());

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onExpire) {
            onExpire();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const pctRemaining = (secondsLeft / 600) * 100;

  const isSafe = secondsLeft > 300;
  const isWarning = secondsLeft >= 150 && secondsLeft <= 300;
  const isDanger = secondsLeft < 150;

  // Set color variables matching index.css variables
  const colorClass = cn(
    isSafe && "text-[var(--timer-safe)]",
    isWarning && "text-[var(--timer-warning)]",
    isDanger && "text-[var(--timer-danger)] animate-pulse"
  );

  const progressColorClass = cn(
    isSafe && "[&>div]:bg-[var(--timer-safe)]",
    isWarning && "[&>div]:bg-[var(--timer-warning)]",
    isDanger && "[&>div]:bg-[var(--timer-danger)]"
  );

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-4 text-center shadow-xl",
        isDanger && "animate-timer-pulse"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">Holding Seats</span>
        </div>
        <span className={cn("text-3xl font-black tracking-wider font-mono", colorClass)}>
          {displayTime}
        </span>
      </div>

      <Progress value={pctRemaining} className={cn("h-2", progressColorClass)} />

      {isDanger && (
        <p className="text-xs font-bold text-[var(--timer-danger)] animate-pulse flex items-center justify-center gap-1">
          ⚠️ Hurry! Your reservation expires soon
        </p>
      )}

      <p className="text-xs text-slate-500 font-medium">
        Complete your booking before the timer runs out or your seats will be released.
      </p>
    </div>
  );
};

export default Timer;
