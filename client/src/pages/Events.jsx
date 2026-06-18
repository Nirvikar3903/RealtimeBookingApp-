import React from "react";
import { useGetEventsQuery } from "../store/api/eventApi.js";
import EventCard from "../components/EventCard.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { AlertCircle, Ticket } from "lucide-react";

const Events = () => {
  const { data: events, isLoading, error } = useGetEventsQuery();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-16 relative">
        {/* Glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-semibold">
          <Ticket className="w-3.5 h-3.5" /> Book Your Experience
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-100 uppercase">
          Discover & Book <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">
            Your Next Scene
          </span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
          Reserve seats atomically, lock your booking in 10 minutes, and experience seamless ticketing.
        </p>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <Skeleton className="h-6 w-1/3 bg-white/10" />
              <Skeleton className="h-8 w-3/4 bg-white/10" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-5/6 bg-white/10" />
              </div>
              <Skeleton className="h-11 w-full bg-white/10 mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* Errors */}
      {error && (
        <div className="flex flex-col items-center justify-center p-8 border border-red-500/20 bg-red-500/5 rounded-2xl max-w-md mx-auto text-center gap-3">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <h3 className="text-lg font-bold text-red-400">Failed to load events</h3>
          <p className="text-sm text-slate-400">
            {error.data?.message || "There was a problem contacting the server. Make sure the backend is running."}
          </p>
        </div>
      )}

      {/* Event Grid list */}
      {!isLoading && !error && events && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
