import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { formatEventDate } from "../utils/dateUtils.js";

const EventCard = ({ event }) => {
  const { _id, name, dateTime, venue, totalSeats } = event;

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
      <div>
        {/* Glow Header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity" />

        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs font-semibold">
              Live Concert
            </Badge>
            <span className="text-xs text-slate-500 font-medium">{totalSeats} Seats total</span>
          </div>
          <CardTitle className="text-xl font-black text-slate-100 group-hover:text-cyan-400 transition-colors leading-tight">
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3.5 text-sm text-slate-400">
          {/* Schedule */}
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-cyan-400/80" />
            <span>{formatEventDate(dateTime)}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-cyan-400/80" />
            <span className="truncate">{venue}</span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-0 pb-6">
        <Link to={`/event/${_id}`} className="w-full">
          <Button className="w-full bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 font-bold h-11 cursor-pointer">
            <Ticket className="w-4 h-4 mr-2" />
            Book Tickets
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
