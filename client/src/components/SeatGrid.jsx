import React from "react";
import SeatButton from "./SeatButton.jsx";

const SeatGrid = ({ seats, selectedSeats, onSeatClick }) => {
  // Group seats by their row letter (e.g. 'A' from 'A1')
  const rows = {};
  
  seats.forEach((seat) => {
    const rowLetter = seat.seatNumber[0] || "A";
    if (!rows[rowLetter]) {
      rows[rowLetter] = [];
    }
    rows[rowLetter].push(seat);
  });

  // Sort rows alphabetically and sort seats numerically within each row
  const sortedRowKeys = Object.keys(rows).sort();
  sortedRowKeys.forEach((rowKey) => {
    rows[rowKey].sort((a, b) => {
      const numA = parseInt(a.seatNumber.slice(1)) || 0;
      const numB = parseInt(b.seatNumber.slice(1)) || 0;
      return numA - numB;
    });
  });

  return (
    <div className="flex flex-col items-center gap-8 my-8 w-full max-w-4xl mx-auto p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl">
      {/* Screen Indicator */}
      <div className="w-full max-w-lg mb-6 text-center">
        <div className="h-2 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full shadow-[0_4px_12px_rgba(6,182,212,0.6)]" />
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-2 block">Stage / Screen</span>
      </div>

      {/* Rows of seats */}
      <div className="flex flex-col gap-4 w-full items-center overflow-x-auto pb-4">
        {sortedRowKeys.map((rowKey) => (
          <div key={rowKey} className="flex items-center gap-4">
            {/* Row Identifier */}
            <span className="w-6 text-sm font-bold text-slate-400 text-center">{rowKey}</span>

            {/* Seat List */}
            <div className="flex items-center gap-2">
              {rows[rowKey].map((seat) => (
                <SeatButton
                  key={seat._id}
                  seatNumber={seat.seatNumber}
                  status={seat.status}
                  isSelected={selectedSeats.includes(seat.seatNumber)}
                  onClick={() => onSeatClick(seat.seatNumber)}
                />
              ))}
            </div>

            {/* Row Identifier (Right side too for symmetry) */}
            <span className="w-6 text-sm font-bold text-slate-400 text-center">{rowKey}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatGrid;
