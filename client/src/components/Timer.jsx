import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress.jsx";
import { getRemainingTime } from "../utils/dateUtils.js";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Timer = ({ expiresAt, onTimeout }) => {
  const totalDuration = 10 * 60 * 1000; // 10 minutes limit
  const [msRemaining, setMsRemaining] = useState(() => getRemainingTime(expiresAt));

  useEffect(() => {
    setMsRemaining(getRemainingTime(expiresAt));

    const interval = setInterval(() => {
      const remaining = getRemainingTime(expiresAt);
      setMsRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        if (onTimeout) {
          onTimeout();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onTimeout]);

  const minutes = Math.floor(msRemaining / 60000);
  const seconds = Math.floor((msRemaining % 60000) / 1000);
  const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;

  // Calculate percentage remaining for the progress bar
  const pctRemaining = Math.max(0, Math.min(100, (msRemaining / totalDuration) * 100));

  // Visual warning threshold colors (amber under 3 mins, red under 1 min)
  const isUrgent = msRemaining < 60 * 1000;
  const isWarning = msRemaining < 3 * 60 * 1000;

  return (
    <div className="w-full max-w-xl mx-auto p-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-3 my-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Temporary Seat Hold</span>
        </div>
        <span
          className={cn(
            "text-lg font-black tracking-wider",
            isUrgent && "text-red-500",
            !isUrgent && isWarning && "text-amber-500",
            !isWarning && "text-cyan-400"
          )}
        >
          {minutes}:{secondsFormatted}
        </span>
      </div>

      <Progress
        value={pctRemaining}
        className={cn(
          "h-1.5 [&>div]:transition-all [&>div]:duration-1000",
          isUrgent && "[&>div]:bg-red-500",
          !isUrgent && isWarning && "[&>div]:bg-amber-500",
          !isWarning && "[&>div]:bg-cyan-500"
        )}
      />

      <span className="text-xs text-slate-500 text-center font-medium">
        Complete your booking before this timer runs out, or your seats will be released.
      </span>
    </div>
  );
};

export default Timer;
