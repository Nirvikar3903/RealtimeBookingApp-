import React from "react";
import { cn } from "@/lib/utils";

const SeatButton = ({ seatNumber, status, isSelected, onClick }) => {
  const isBooked = status === "booked";
  const isReserved = status === "reserved";
  const isAvailable = status === "available";

  return (
    <button
      type="button"
      disabled={isBooked || isReserved}
      onClick={onClick}
      className={cn(
        "relative w-11 h-11 text-xs font-semibold rounded-lg flex items-center justify-center transition-all duration-300 border focus:outline-none cursor-pointer",
        // Booked State
        isBooked && "bg-red-500/20 border-red-500/40 text-red-400 cursor-not-allowed opacity-80 decoration-slice",
        // Reserved State (Pulse animation)
        isReserved && "bg-amber-500/20 border-amber-500/40 text-amber-400 cursor-not-allowed animate-pulse",
        // Available (Selected)
        isAvailable && isSelected && "bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)] font-bold",
        // Available (Not Selected)
        isAvailable && !isSelected && "bg-white/5 border-white/10 hover:border-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)] hover:text-cyan-400 text-slate-300"
      )}
      title={`Seat ${seatNumber} - ${status}`}
    >
      {seatNumber}
    </button>
  );
};

export default SeatButton;
