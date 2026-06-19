import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import { formatExpiresAt } from "../utils/dateUtils.js";
import { Ticket } from "lucide-react";

const ReservationSummary = ({ reservation, eventName }) => {
  if (!reservation) return null;

  return (
    <Card className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl text-left space-y-4">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold text-[var(--timer-safe)] flex items-center gap-1.5 uppercase tracking-tight">
          Reservation Confirmed ✓
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 space-y-4 text-sm text-slate-400">
        <div className="space-y-1">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Event</span>
          <h4 className="text-base font-black text-slate-200 uppercase leading-snug">{eventName}</h4>
        </div>

        <div className="space-y-2">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Reserved Seats</span>
          <div className="flex flex-wrap gap-2">
            {reservation.seatNumbers.map((seat) => (
              <Badge
                key={seat}
                className="bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-500/30 text-xs font-bold px-2.5 py-1 rounded"
              >
                {seat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <Ticket className="w-4 h-4 text-cyan-400" />
          <span>{formatExpiresAt(reservation.expiresAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationSummary;

