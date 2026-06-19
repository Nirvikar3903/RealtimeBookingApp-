import React from "react";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";
import { Ticket, Loader2 } from "lucide-react";
import { useBooking } from "../hooks/useBooking.js";

const SelectionSummary = ({ onReserve, isReserving }) => {
  const { selectedSeats } = useBooking();

  return (
    <div className="w-full p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-6 shadow-xl">
      <div className="space-y-2 text-left">
        <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">Your Selection</h3>
        {selectedSeats.length === 0 ? (
          <p className="text-sm text-slate-500 font-medium italic">No seats selected yet</p>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatNumber) => (
                <Badge
                  key={seatNumber}
                  className="bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-500/30 text-xs font-bold px-2.5 py-1 rounded"
                >
                  {seatNumber}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"} selected
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 mt-2">
        <div className="flex flex-col gap-0.5 text-left w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Count</span>
          <span className="text-2xl font-black text-cyan-400">
            {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"}
          </span>
        </div>

        <Button
          onClick={onReserve}
          disabled={selectedSeats.length === 0 || isReserving}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black px-6 h-12 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2 border-none"
        >
          {isReserving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Holding Seats...
            </>
          ) : (
            <>
              <Ticket className="w-4 h-4" />
              Reserve Seats
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SelectionSummary;

