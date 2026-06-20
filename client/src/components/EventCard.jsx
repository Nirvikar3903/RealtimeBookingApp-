import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import { formatEventDate } from "../utils/dateUtils.js";

const EventCard = ({ event }) => {
  const { _id, name, dateTime, venue, totalSeats, logoUrl } = event;
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full cursor-pointer"
      onClick={() => navigate(`/events/${_id}`)}
    >
      <Card className="bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden">
        <div>
          {/* Event Cover Photo / Logo */}
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={name}
              className="w-full h-40 object-cover rounded-xl mb-4 border border-white/5 group-hover:scale-[1.01] transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-40 bg-white/5 rounded-xl mb-4 border border-white/5 flex items-center justify-center text-slate-500">
              <Ticket className="w-12 h-12" />
            </div>
          )}

          <CardHeader className="p-0 mb-4 space-y-2">
            <CardTitle className="text-2xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight group-hover:opacity-90 transition-all leading-tight">
              {name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-3.5 text-sm text-slate-400">
            {/* Date */}
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{formatEventDate(dateTime)}</span>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="truncate">{venue}</span>
            </div>

            {/* Seats */}
            <div className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4 text-cyan-400" />
              <span>{totalSeats} Seats total</span>
            </div>
          </CardContent>
        </div>

        <div className="mt-6">
          <Button
            className="w-full bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 font-bold h-11 cursor-pointer flex items-center justify-center gap-2 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400"
          >
            Book Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventCard;
