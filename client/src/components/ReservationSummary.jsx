import React from "react";
import Timer from "./Timer.jsx";
import { Button } from "./ui/button.jsx";
import { ShieldCheck } from "lucide-react";

const ReservationSummary = ({ reservation, onConfirm, isConfirming, onTimeout }) => {
  if (!reservation) return null;

  const seatPrice = 150;
  const totalPrice = reservation.seatNumbers.length * seatPrice;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      {/* Expiry Clock */}
      <Timer expiresAt={reservation.expiresAt} onTimeout={onTimeout} />

      {/* Confirmation Card */}
      <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-5">
        <h3 className="text-lg font-bold text-slate-200">Confirm Order Details</h3>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Reserved Seats</span>
            <span className="font-bold text-cyan-400">
              {reservation.seatNumbers.join(", ")}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Seat Price</span>
            <span className="font-semibold text-slate-300">${seatPrice} each</span>
          </div>

          <hr className="border-white/10" />

          <div className="flex justify-between items-baseline">
            <span className="text-sm text-slate-400">Total Price</span>
            <span className="text-2xl font-black text-cyan-400">${totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <Button
          onClick={onConfirm}
          disabled={isConfirming}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black h-12 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          {isConfirming ? (
            "Processing Payment..."
          ) : (
            <>
              <ShieldCheck className="w-5 h-5 mr-2" />
              Confirm & Book Tickets
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReservationSummary;
