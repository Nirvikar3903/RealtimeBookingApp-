import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBookingByReferenceQuery } from "../store/api/eventApi.js";
import PageTransition from "../components/PageTransition.jsx";
import { Ticket, Calendar, MapPin, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { formatEventDate } from "../utils/dateUtils.js";
import { Badge } from "../components/ui/badge.jsx";

const TicketScan = () => {
  const { reference } = useParams();
  const { data: booking, isLoading, isError } = useGetBookingByReferenceQuery(reference);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#131929] border border-red-500/30 rounded-2xl p-8 text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
          <h2 className="text-2xl font-black text-slate-100 uppercase">Invalid Ticket</h2>
          <p className="text-slate-400">This ticket reference could not be found or has expired.</p>
          <Link to="/" className="inline-block mt-4 text-cyan-400 font-bold hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const event = booking.eventId;

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Glow backdrop decorations */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#131929]/95 border border-emerald-500/30 shadow-[0_20px_50px_rgba(16,185,129,0.15)] backdrop-blur-md rounded-3xl overflow-hidden flex flex-col relative select-none">
          {/* Top glowing strip */}
          <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
          
          <div className="p-8 pb-6 flex flex-col items-center text-center space-y-6">
            {/* Success icon */}
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight leading-tight">
                {event.name}
              </h2>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest block pt-1">
                Valid Ticket
              </span>
            </div>

            <hr className="w-full border-white/10" />

            {/* Event Info */}
            <div className="w-full space-y-5 text-left">

              <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Date & Time</span>
                    <span className="text-sm font-semibold text-slate-200 leading-snug">
                      {formatEventDate(event.dateTime)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Venue</span>
                    <span className="text-sm font-semibold text-slate-200 leading-snug block">
                      {event.venue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dotted Tear Line */}
          <div className="relative h-6 flex items-center justify-center my-1">
            <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-[#080b14] border-r border-white/10 z-10 shadow-[inset_-3px_0_5px_rgba(0,0,0,0.5)]" />
            <div className="w-[calc(100%-2rem)] border-t-2 border-dashed border-white/10 z-0" />
            <div className="absolute -right-3.5 w-7 h-7 rounded-full bg-[#080b14] border-l border-white/10 z-10 shadow-[inset_3px_0_5px_rgba(0,0,0,0.5)]" />
          </div>

          <div className="p-8 pt-4 flex flex-col items-center space-y-5">
            <div className="w-full text-center space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                Reserved Seats
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {booking.seatNumbers.map((seat) => (
                  <Badge
                    key={seat}
                    className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 text-sm font-extrabold px-4 py-1.5 rounded-lg"
                  >
                    {seat}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center space-y-1 bg-white/5 w-full py-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                Booking Reference
              </span>
              <span className="text-sm text-slate-300 font-mono font-bold tracking-widest block">
                {booking.bookingReference}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TicketScan;
