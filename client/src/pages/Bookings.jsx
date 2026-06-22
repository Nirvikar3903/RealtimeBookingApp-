import React from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Ticket, Calendar, MapPin, Compass, Loader2, Sparkles, QrCode } from "lucide-react";
import { useGetMyBookingsQuery } from "../store/api/eventApi.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { formatEventDate } from "../utils/dateUtils.js";

const Bookings = () => {
  const { data: bookings, isLoading: isLoadingBookings, refetch } = useGetMyBookingsQuery();

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-12 select-none">
        
        {/* Header Title */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight flex items-center justify-center md:justify-start gap-3">
              My Bookings
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            </h1>
            <p className="text-slate-400 text-sm">
              Your active ticket admissions and previous event reservations.
            </p>
          </div>
          
          {bookings && bookings.length > 0 && (
            <Button 
              onClick={refetch} 
              variant="outline" 
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold px-4 h-9 cursor-pointer rounded-lg self-center md:self-auto"
            >
              Refresh Tickets
            </Button>
          )}
        </div>

        {/* Bookings Display */}
        <div className="space-y-8">
          {isLoadingBookings ? (
            // Loading Skeletons
            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex flex-col md:flex-row border border-white/5 p-6 rounded-2xl bg-white/5 animate-pulse min-h-[180px]">
                  <Skeleton className="w-full md:w-36 h-32 rounded-xl bg-white/10 flex-shrink-0 mb-4 md:mb-0" />
                  <div className="flex-grow space-y-3 md:pl-6">
                    <Skeleton className="h-6 w-1/3 bg-white/10" />
                    <Skeleton className="h-4 w-1/2 bg-white/10" />
                    <Skeleton className="h-4 w-1/4 bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : bookings && bookings.length > 0 ? (
            // Bookings List of Tickets
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => {
                const event = booking.eventId;
                if (!event) return null;

                // QR value format (URL for scanning)
                const qrValue = `${window.location.origin}/ticket/${booking.bookingReference}`;

                return (
                  <div
                    key={booking._id}
                    className="flex flex-col md:flex-row border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative group overflow-hidden shadow-lg"
                  >
                    {/* Left/Main Ticket Segment */}
                    <div className="flex-grow p-6 flex flex-col md:flex-row gap-5 items-start">
                      
                      {/* Event Logo */}
                      {event.logoUrl ? (
                        <img
                          src={event.logoUrl}
                          alt={event.name}
                          className="w-full md:w-36 h-28 object-cover rounded-xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-300 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-full md:w-36 h-28 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-slate-500 flex-shrink-0">
                          <Ticket className="w-10 h-10" />
                        </div>
                      )}

                      {/* Ticket metadata */}
                      <div className="flex-grow space-y-3.5 text-left flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] text-cyan-400 font-mono font-bold tracking-wider uppercase block">
                            Ref: {booking.bookingReference}
                          </span>
                          <h4 className="text-xl font-black text-slate-100 uppercase tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">
                            {event.name}
                          </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span>{formatEventDate(event.dateTime)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="truncate max-w-[240px]">{event.venue}</span>
                          </div>
                        </div>

                        {/* Seat list badge */}
                        <div className="flex items-center gap-2 pt-1">
                          <Ticket className="w-4 h-4 text-cyan-500" />
                          <div className="flex flex-wrap items-center gap-1.5">
                            {booking.seatNumbers.map((seat) => (
                              <Badge
                                key={seat}
                                className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 hover:bg-cyan-500/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md"
                              >
                                {seat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dotted Ticket Divider (Horizontal on mobile, Vertical on md+) */}
                    <div className="relative flex items-center justify-center px-6 md:px-0 md:py-6">
                      {/* Top Notch (md+) / Left Notch (mobile) */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#080b14] border-b border-white/10 z-10 hidden md:block" />
                      <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#080b14] border-r border-white/10 z-10 md:hidden" />
                      
                      {/* Dashed Line */}
                      <div className="w-full md:w-[2px] md:h-full border-t-2 md:border-t-0 md:border-l-2 border-dashed border-white/10" />
                      
                      {/* Bottom Notch (md+) / Right Notch (mobile) */}
                      <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#080b14] border-t border-white/10 z-10 hidden md:block" />
                      <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#080b14] border-l border-white/10 z-10 md:hidden" />
                    </div>

                    {/* Right Ticket Stub: Scannable QR Code */}
                    <div className="p-6 flex flex-col items-center justify-center bg-white/5 md:bg-transparent md:w-48 flex-shrink-0 gap-3 border-t md:border-t-0 border-white/10">
                      <div className="bg-white p-2 rounded-xl shadow-lg border border-white/10">
                        <QRCodeSVG
                          value={qrValue}
                          size={85}
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                      <div className="text-center space-y-0.5">
                        <span className="text-[9px] text-slate-500 font-medium tracking-normal block flex items-center gap-1 justify-center">
                          <QrCode className="w-3 h-3 text-cyan-400" />
                          Admission Stub
                        </span>
                        <span className="text-[8px] text-slate-600 block uppercase font-mono font-bold">
                          {booking.bookingReference}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-16 flex flex-col items-center gap-4 max-w-md mx-auto">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                <Ticket className="w-9 h-9 text-slate-400" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xl font-bold text-slate-200">No Tickets Yet</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  You haven't reserved or booked any events yet. Explore hot upcoming concerts, night-life parties, or summits near you!
                </p>
              </div>
              <Link to="/events" className="mt-2">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-slate-950 font-black px-6 h-11 flex items-center gap-2 border-none rounded-xl cursor-pointer">
                  <Compass className="w-4 h-4" />
                  Explore Events
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
};

export default Bookings;
