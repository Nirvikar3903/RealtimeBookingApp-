import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { CheckCircle, Calendar, MapPin, Sparkles } from "lucide-react";
import { formatEventDate } from "../utils/dateUtils.js";

const BookingSuccess = () => {
  const { state } = useLocation();

  // If no booking details in router state, redirect back to home
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { eventName, venue, dateTime, seats } = state;

  return (
    <div className="max-w-md mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="w-full relative"
      >
        {/* Glow decoration */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-purple-600 blur-xl opacity-30 pointer-events-none" />

        <Card className="bg-slate-900 border-white/10 backdrop-blur-md relative overflow-hidden">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4"
            >
              <CheckCircle className="w-10 h-10 text-cyan-400" />
            </motion.div>
            <CardTitle className="text-2xl font-black text-slate-100 flex items-center justify-center gap-1.5 uppercase tracking-wide">
              Booking Confirmed! <Sparkles className="w-5 h-5 text-amber-400" />
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">Your tickets are now secured.</p>
          </CardHeader>

          <CardContent className="space-y-5 py-6 text-sm text-slate-400 border-t border-b border-white/10">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Event</span>
              <h4 className="text-base font-black text-slate-200 uppercase leading-snug">{eventName}</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date & Time</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate">{formatEventDate(dateTime)}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Seats Booked</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {seats.map((seat) => (
                    <span
                      key={seat}
                      className="px-2 py-0.5 text-xxs font-black rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Venue</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{venue}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-6 pb-6">
            <Link to="/" className="w-full">
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold h-11 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer">
                Back to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
