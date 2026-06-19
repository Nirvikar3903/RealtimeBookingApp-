import React, { useRef } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { Calendar, MapPin, Ticket, ArrowLeft, Printer, CheckCircle } from "lucide-react";
import { formatEventDate } from "../utils/dateUtils.js";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  
  const { seats, eventName } = location.state || {};

  // If no state (direct URL access), redirect to /events
  if (!location.state || !seats || !eventName) {
    return <Navigate to="/events" replace />;
  }

  // Generate unique ticket reference code
  const ticketRefCode = `SMS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  
  // Format QR Code value
  const qrValue = `SortMyScene:${ticketRefCode}|Event:${eventName}|Seats:${seats.join(",")}`;

  // Handle print ticket stub
  const handlePrint = () => {
    window.print();
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center relative px-4 py-12 overflow-hidden print:bg-white print:p-0">
        {/* Glow backdrop decorations */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none print:hidden" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none print:hidden" />

        <div className="w-full max-w-md relative flex flex-col gap-6 items-center">
          
          {/* Main Ticket Container */}
          <div 
            ref={ticketRef} 
            className="w-full bg-[#131929]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-3xl relative flex flex-col overflow-visible select-none print:shadow-none print:border-slate-300 print:bg-white print:text-slate-900"
          >
            {/* Holographic Glowing Top Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded-t-3xl print:hidden" />

            {/* Top Part: Event Header & Details */}
            <div className="p-8 pb-6 flex flex-col items-center text-center space-y-6">
              
              {/* animated SVG checkmark */}
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.15)] print:border-emerald-500">
                <svg className="w-8 h-8 text-emerald-400 print:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <motion.path
                    initial="hidden"
                    animate="visible"
                    variants={checkmarkVariants}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-none block print:text-emerald-600">
                  Transaction Completed
                </span>
                <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tight print:text-slate-900">
                  Booking Confirmed
                </h2>
              </div>

              <hr className="w-full border-white/5 print:border-slate-200" />

              {/* Event Meta Info */}
              <div className="w-full space-y-4 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Event Name</span>
                  <h3 className="text-xl font-black text-slate-100 uppercase tracking-tight leading-tight truncate print:text-slate-900">
                    {eventName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400 print:text-cyan-600" /> Date & Time
                    </span>
                    <span className="text-xs font-semibold text-slate-300 print:text-slate-700 leading-snug">
                      Sunday, 2 August 2026<br />10:44 PM
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400 print:text-cyan-600" /> Venue
                    </span>
                    <span className="text-xs font-semibold text-slate-300 print:text-slate-700 leading-snug truncate block">
                      Bangalore Convention<br />Center
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dotted Tear Line & Physical Ticket Notches */}
            <div className="relative h-6 flex items-center justify-center my-1 print:my-4">
              {/* Left Notch */}
              <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-[#080b14] border-r border-white/10 z-10 shadow-[inset_-3px_0_5px_rgba(0,0,0,0.5)] print:bg-white print:border-slate-300" />
              
              {/* Dashed Line */}
              <div className="w-[calc(100%-2rem)] border-t-2 border-dashed border-white/10 z-0 print:border-slate-300" />
              
              {/* Right Notch */}
              <div className="absolute -right-3.5 w-7 h-7 rounded-full bg-[#080b14] border-l border-white/10 z-10 shadow-[inset_3px_0_5px_rgba(0,0,0,0.5)] print:bg-white print:border-slate-300" />
            </div>

            {/* Bottom Part: Seats list & QR Code */}
            <div className="p-8 pt-4 flex flex-col items-center space-y-6">
              
              {/* Seats list */}
              <div className="w-full text-center space-y-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                  Your Seats
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {seats.map((seat) => (
                    <Badge
                      key={seat}
                      className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 text-xs font-extrabold px-3 py-1 rounded-lg print:border-slate-400 print:text-slate-900 print:bg-slate-100"
                    >
                      {seat}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Scannable QR Code */}
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-white p-3 rounded-2xl shadow-xl border border-white/10 inline-block print:border-slate-300 print:shadow-none">
                  <QRCodeSVG
                    value={qrValue}
                    size={110}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono block print:text-slate-700">
                    {ticketRefCode}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium tracking-normal block print:text-slate-600">
                    Scan for Admission (1 ticket, {seats.length} {seats.length === 1 ? "seat" : "seats"})
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Action CTAs */}
          <div className="w-full flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
            <Button
              onClick={() => navigate("/events")}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black h-12 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer flex items-center justify-center gap-2 border-none rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-bold h-12 cursor-pointer rounded-xl flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Ticket
            </Button>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default BookingSuccess;
