import React from "react";
import { useGetEventsQuery } from "../store/api/eventApi.js";
import EventCard from "../components/EventCard.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { RefreshCw, AlertCircle } from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";
import { Button } from "../components/ui/button.jsx";

const Events = () => {
  const { data: events, isLoading, isError, refetch } = useGetEventsQuery();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero / Header Section */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            Select an event to reserve your seats
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
        {isError && (
          <div className="flex flex-col items-center justify-center p-8 border border-red-500/20 bg-red-500/5 rounded-2xl max-w-md mx-auto text-center gap-4">
            <AlertCircle className="w-10 h-10 text-red-500 animate-bounce" />
            <h3 className="text-lg font-bold text-red-400">Failed to load events</h3>
            <p className="text-sm text-slate-400">
              There was a problem contacting the server. Make sure the backend is running.
            </p>
            <Button
              onClick={() => refetch()}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        )}

        {/* Event Grid list */}
        {!isLoading && !isError && events && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Events;
