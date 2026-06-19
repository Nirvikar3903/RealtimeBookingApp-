import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils.js";
import { useBooking } from "../hooks/useBooking.js";

const SeatButton = ({ seat, disabled }) => {
  const { selectedSeats, toggleSeat } = useBooking();
  const { seatNumber, status } = seat;

  const isSelected = selectedSeats.includes(seatNumber);
  const isAvailable = status === "available";
  const isReserved = status === "reserved";
  const isBooked = status === "booked";

  const handleClick = () => {
    if (!isAvailable || disabled) return;
    toggleSeat(seatNumber);
  };

  const buttonClasses = cn(
    "w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs font-medium flex items-center justify-center border transition-all duration-200 select-none outline-none",
    // Available + Not Selected
    isAvailable && !isSelected && "bg-[#1e293b] border-[#334155] text-slate-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer",
    // Available + Selected
    isAvailable && isSelected && "bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)] text-cyan-400 cursor-pointer font-bold",
    // Reserved
    isReserved && "bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] text-amber-400 animate-pulse cursor-not-allowed",
    // Booked
    isBooked && "bg-red-500/10 border-red-500 text-red-500 opacity-50 cursor-not-allowed"
  );

  return (
    <motion.button
      type="button"
      whileTap={isAvailable && !disabled ? { scale: 0.9 } : undefined}
      transition={{ duration: 0.1 }}
      disabled={!isAvailable || disabled}
      onClick={handleClick}
      className={buttonClasses}
      title={`Seat ${seatNumber} - ${status}`}
    >
      {seatNumber}
    </motion.button>
  );
};

export default SeatButton;

