import React from "react";
import { Button } from "./ui/button.jsx";
import { Ticket } from "lucide-react";

const SelectionSummary = ({ selectedSeats, onReserve, isReserving }) => {
  const seatPrice = 150; // Mock price per seat
  const totalPrice = selectedSeats.length * seatPrice;

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 my-6">
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <span className="text-sm text-slate-400 font-medium">Selected Seats</span>
        {selectedSeats.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            {selectedSeats.map((seat) => (
              <span
                key={seat}
                className="px-2.5 py-1 text-xs font-bold rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
              >
                {seat}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm font-semibold text-slate-500 mt-1">None selected</span>
        )}
      </div>

      <div className="flex flex-col sm:items-end w-full sm:w-auto gap-4">
        <div className="flex flex-col sm:items-end gap-0.5">
          <span className="text-xs text-slate-500 font-medium">Estimated Price</span>
          <span className="text-2xl font-black text-cyan-400">
            ${totalPrice.toLocaleString()}
          </span>
        </div>

        <Button
          onClick={onReserve}
          disabled={selectedSeats.length === 0 || isReserving}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-6 h-11 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          {isReserving ? (
            "Holding Seats..."
          ) : (
            <>
              <Ticket className="w-4 h-4 mr-2" />
              Reserve Seats
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SelectionSummary;
