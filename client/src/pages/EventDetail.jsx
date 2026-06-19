import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetEventByIdQuery } from "../store/api/eventApi.js";
import { useBooking } from "../hooks/useBooking.js";
import SeatGrid from "../components/SeatGrid.jsx";
import SeatLegend from "../components/SeatLegend.jsx";
import SelectionSummary from "../components/SelectionSummary.jsx";
import ReservationSummary from "../components/ReservationSummary.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { AlertCircle, Calendar, MapPin, ChevronLeft } from "lucide-react";
import { formatEventDate } from "../utils/dateUtils.js";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // RTK Query hook to fetch event and seat details
  const { data, isLoading, error, refetch } = useGetEventByIdQuery(id);
  
  // Custom hook for booking slice state
  const {
    selectedSeats,
    reservation,
    isReserving,
    isConfirming,
    toggleSeat,
    clearSelection,
    reserveSeats,
    confirmBooking,
    clearReservation,
  } = useBooking();

  // Clear selections when entering a new event details page
  useEffect(() => {
    clearReservation();
    return () => {
      clearReservation();
    };
  }, [id]);

  const handleSeatClick = (seatNumber) => {
    toggleSeat(seatNumber);
  };

  const handleReserve = async () => {
    try {
      await reserveSeats(id);
      toast.success("Seats held successfully! You have 10 minutes to confirm.");
    } catch (err) {
      console.error(err);
      if (err.status === 409) {
        toast.error("One or more selected seats are no longer available. Refreshing seat layout...");
        refetch(); // Invalidate cache and refetch seats
        clearSelection();
      } else {
        toast.error(err.data?.message || "Failed to hold seats. Please try again.");
      }
    }
  };

  const handleConfirm = async () => {
    try {
      const result = await confirmBooking();
      toast.success("Booking confirmed successfully!");
      
      // Navigate to success page with booking details in state
      navigate("/booking/success", {
        state: {
          eventName: data?.event?.name,
          venue: data?.event?.venue,
          dateTime: data?.event?.dateTime,
          seats: result.seatNumbers || reservation.seatNumbers,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.data?.message || "Failed to confirm booking.");
    }
  };

  const handleTimeout = () => {
    toast.error("Your reservation hold has expired. Seats have been released.");
    clearReservation();
    refetch(); // Reload seat status from DB
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <Skeleton className="h-10 w-24 bg-white/10" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-2/3 bg-white/10" />
          <Skeleton className="h-6 w-1/3 bg-white/10" />
        </div>
        <Skeleton className="h-64 w-full bg-white/10 rounded-2xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 text-center flex flex-col items-center gap-4 border border-red-500/20 bg-red-500/5 rounded-2xl my-12">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-red-400">Failed to load event</h3>
        <p className="text-sm text-slate-400">
          {error?.data?.message || "Could not find event details."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 text-sm font-semibold text-cyan-400 hover:underline flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Events
        </button>
      </div>
    );
  }

  const { event, seats } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back CTA */}
      <button
        onClick={() => navigate("/")}
        className="text-sm font-bold text-slate-400 hover:text-cyan-400 mb-8 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Scenes
      </button>

      {/* Header Panel */}
      <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="space-y-2.5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight">
            {event.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{formatEventDate(event.dateTime)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Checkout Flow */}
      {!reservation ? (
        // STEP 1: Seat Selection
        <>
          <SeatLegend />
          <SeatGrid
            seats={seats}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
          />
          <SelectionSummary
            selectedSeats={selectedSeats}
            onReserve={handleReserve}
            isReserving={isReserving}
          />
        </>
      ) : (
        // STEP 2: Hold & Confirmation
        <ReservationSummary
          reservation={reservation}
          onConfirm={handleConfirm}
          isConfirming={isConfirming}
          onTimeout={handleTimeout}
        />
      )}
    </div>
  );
};

export default EventDetail;
