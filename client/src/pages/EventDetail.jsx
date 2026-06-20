import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetEventByIdQuery, useReserveSeatsMutation, useConfirmBookingMutation, useCancelReservationMutation } from "../store/api/eventApi.js";
import { useBooking } from "../hooks/useBooking.js";
import { setReservation, clearSelectedSeats, clearReservation } from "../store/slices/bookingSlice.js";
import SeatGrid from "../components/SeatGrid.jsx";
import SeatLegend from "../components/SeatLegend.jsx";
import SelectionSummary from "../components/SelectionSummary.jsx";
import ReservationSummary from "../components/ReservationSummary.jsx";
import Timer from "../components/Timer.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { AlertCircle, Calendar, MapPin, ChevronLeft, Loader2 } from "lucide-react";
import { formatEventDate } from "../utils/dateUtils.js";
import { toast } from "sonner";
import PageTransition from "../components/PageTransition.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog.jsx";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dialog state for timer expiration
  const [isExpiryOpen, setIsExpiryOpen] = useState(false);
  // Dialog state for order confirmation popup
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Track if we have already restored the active reservation on mount
  const hasRestored = useRef(false);

  // RTK Query hook to fetch event and seat details
  const { data, isLoading, isError, refetch } = useGetEventByIdQuery(id, {
    pollingInterval: 10000,
  });

  // Custom hook for booking slice state selectors
  const { selectedSeats, step, reservation } = useBooking();

  // RTK Query mutations
  const [reserveSeats, { isLoading: reserving }] = useReserveSeatsMutation();
  const [confirmBooking, { isLoading: confirming }] = useConfirmBookingMutation();
  const [cancelReservation] = useCancelReservationMutation();

  // Clear selections when entering a new event details page
  useEffect(() => {
    dispatch(clearReservation());
    setIsConfirmOpen(false);
    hasRestored.current = false;
    return () => {
      dispatch(clearReservation());
      setIsConfirmOpen(false);
    };
  }, [id, dispatch]);

  // Restore active reservation if returned by backend on mount/polling (runs once per event mount)
  useEffect(() => {
    if (data && !hasRestored.current) {
      hasRestored.current = true;
      if (data.activeReservation) {
        dispatch(setReservation(data.activeReservation));
        setIsConfirmOpen(true); // Auto-open the checkout popup on recovery
      }
    }
  }, [data, dispatch]);

  const handleReserve = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    try {
      const result = await reserveSeats({ eventId: id, seatNumbers: selectedSeats }).unwrap();
      // result is either direct reservation object or wrapped in result.reservation
      dispatch(setReservation(result.reservation || result));
      setIsConfirmOpen(true); // Open the checkout popup
      toast.success("Seats reserved! You have 10 minutes.");
    } catch (err) {
      console.error(err);
      if (err.status === 409) {
        toast.error("Some seats were just taken. Please reselect.");
        dispatch(clearSelectedSeats());
        refetch();
      } else {
        toast.error(err.data?.message || "Reservation failed");
      }
    }
  };

  const handleConfirm = async () => {
    try {
      const result = await confirmBooking({
        reservationId: reservation._id,
      }).unwrap();

      dispatch(clearReservation());
      setIsConfirmOpen(false); // Close the checkout popup
      navigate("/booking/success", {
        state: {
          seats: reservation.seatNumbers,
          eventName: data.event.name,
        },
      });
      toast.success("Booking confirmed!");
    } catch (err) {
      console.error(err);
      if (err.status === 400) {
        toast.error("Reservation expired. Please start over.");
        dispatch(clearReservation());
        setIsConfirmOpen(false); // Close the checkout popup
        refetch();
      } else {
        toast.error(err.data?.message || "Booking failed");
      }
    }
  };

  const handleCancel = async () => {
    try {
      await cancelReservation({ eventId: id }).unwrap();
      dispatch(clearReservation());
      setIsConfirmOpen(false); // Close the checkout popup
      toast.info("Reservation cancelled.");
    } catch (err) {
      console.error(err);
      dispatch(clearReservation());
      setIsConfirmOpen(false); // Close the checkout popup
    }
  };

  const handleTimerExpire = async () => {
    setIsConfirmOpen(false);
    setIsExpiryOpen(true);
    try {
      await cancelReservation({ eventId: id }).unwrap();
    } catch (err) {
      console.error(err);
    }
    dispatch(clearReservation());
  };

  const handleReservedSeatClick = () => {
    setIsConfirmOpen(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <button
          onClick={() => navigate("/events")}
          className="text-sm font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Events
        </button>
        <div className="space-y-2">
          <Skeleton className="h-10 w-2/3 bg-white/10" />
          <Skeleton className="h-6 w-1/3 bg-white/10" />
        </div>
        <Skeleton className="h-64 w-full bg-white/10 rounded-2xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 text-center flex flex-col items-center gap-4 border border-red-500/20 bg-red-500/5 rounded-2xl my-12">
        <AlertCircle className="w-12 h-12 text-red-500 animate-pulse" />
        <h3 className="text-xl font-bold text-red-400">Failed to load event</h3>
        <p className="text-sm text-slate-400">
          Could not find event details. Make sure the backend is active.
        </p>
        <button
          onClick={() => navigate("/events")}
          className="mt-2 text-sm font-semibold text-cyan-400 hover:underline flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Events
        </button>
      </div>
    );
  }

  const { event, seats } = data;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back CTA */}
        <button
          onClick={() => navigate("/events")}
          className="text-sm font-bold text-slate-400 hover:text-cyan-400 mb-8 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Events
        </button>

        <div className="booking-layout">
          {/* Left Column (Event metadata, Seat grid, Seat Legend) */}
          <div className="booking-main space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl space-y-3">
              <h1 className="text-3xl font-black text-slate-100 uppercase tracking-tight">
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

            {/* Screen Indicator */}
            <div className="w-full text-center">
              <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full shadow-[0_4px_12px_rgba(6,182,212,0.6)]" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-2 block">
                Stage / Screen
              </span>
            </div>

            {/* Seat Selection Components */}
            <SeatGrid seats={seats} disabled={!!reservation} onReservedSeatClick={handleReservedSeatClick} />
            <SeatLegend />
          </div>

          {/* Right Column (Selection Summary Panel) */}
          <div className="booking-sidebar space-y-6">
            <SelectionSummary
              onReserve={handleReserve}
              isReserving={reserving}
            />
          </div>
        </div>
      </div>

      {/* Checkout / Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 text-slate-100 max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white uppercase tracking-tight">
              Confirm Your Booking
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Please review your seat reservations and complete the payment.
            </DialogDescription>
          </DialogHeader>

          {reservation && (
            <div className="space-y-6 mt-4">
              {/* Timer component inside modal */}
              <Timer expiresAt={reservation.expiresAt} onExpire={handleTimerExpire} />

              {/* ReservationSummary component */}
              <ReservationSummary
                reservation={reservation}
                eventName={event.name}
              />

              {/* Confirmation actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black h-12 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2 border-none"
                >
                  {confirming ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booking Seats...
                    </>
                  ) : (
                    "Confirm & Book"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={confirming}
                  className="flex-1 bg-transparent border-white/10 hover:bg-white/5 text-slate-300 font-bold h-12 cursor-pointer border"
                >
                  Cancel Reservation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Persistent floating timer bar */}
      {reservation && !isConfirmOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#131929]/95 backdrop-blur-md border border-cyan-500/30 rounded-full px-6 py-3 shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center gap-4 text-slate-100">
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Seats Reserved: {reservation.seatNumbers.join(", ")}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <span>⏱</span>
            <Timer expiresAt={reservation.expiresAt} onExpire={handleTimerExpire} minimal />
            <span>remaining</span>
          </div>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="text-xs font-black bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-4 py-1.5 rounded-full transition-all cursor-pointer border-none"
          >
            Resume Booking
          </button>
        </div>
      )}

      {/* Timer Expiry modal dialog */}
      <Dialog open={isExpiryOpen} onOpenChange={setIsExpiryOpen}>
        <DialogContent className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 text-slate-100 max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-400">⏰ Time's Up!</DialogTitle>
            <DialogDescription className="text-sm text-slate-400 mt-2">
              Your reservation has expired. Seats have been released.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end">
            <Button
              onClick={() => {
                setIsExpiryOpen(false);
                refetch();
              }}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black px-6 h-11 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer border-none"
            >
              Select Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default EventDetail;
