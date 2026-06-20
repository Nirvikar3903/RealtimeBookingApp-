import React from "react";
import SeatButton from "./SeatButton.jsx";
import { useBooking } from "../hooks/useBooking.js";

const SeatGrid = ({ seats, disabled, onReservedSeatClick }) => {
  const { selectedSeats } = useBooking();

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
    <div className="flex flex-col items-center gap-4 my-8 w-full overflow-x-auto pb-4">
      {/* Rows of seats with 16px gap (gap-4) */}
      <div className="flex flex-col gap-4 min-w-[max-content] px-4">
        {sortedRowKeys.map((rowKey) => (
          <div key={rowKey} className="flex items-center gap-4">
            {/* Row Identifier */}
            <span className="w-6 text-sm font-bold text-slate-400 text-center">{rowKey}</span>

            {/* Seat List */}
            <div className="flex items-center gap-2">
              {rows[rowKey].map((seat) => (
                <SeatButton
                  key={seat._id}
                  seat={seat}
                  disabled={disabled}
                  onReservedSeatClick={onReservedSeatClick}
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
