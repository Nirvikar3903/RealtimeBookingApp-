import { useDispatch, useSelector } from "react-redux";
import {
  toggleSeat,
  clearSelectedSeats,
  setReservation,
  clearReservation,
} from "../store/slices/bookingSlice.js";
import {
  useReserveSeatsMutation,
  useConfirmBookingMutation,
} from "../store/api/eventApi.js";

export const useBooking = () => {
  const dispatch = useDispatch();
  const { selectedSeats, step, reservation } = useSelector((state) => state.booking);

  const [reserveApi, { isLoading: isReserving, error: reserveError }] =
    useReserveSeatsMutation();
  const [confirmApi, { isLoading: isConfirming, error: confirmError }] =
    useConfirmBookingMutation();

  const handleToggleSeat = (seatNumber) => {
    dispatch(toggleSeat(seatNumber));
  };

  const handleClearSelection = () => {
    dispatch(clearSelectedSeats());
  };

  const handleReserveSeats = async (eventId) => {
    const result = await reserveApi({ eventId, seatNumbers: selectedSeats }).unwrap();
    // result contains reservation object (with expiresAt, _id, seatNumbers, etc.)
    dispatch(setReservation(result));
    return result;
  };

  const handleConfirmBooking = async () => {
    if (!reservation) throw new Error("No active reservation to confirm");
    const result = await confirmApi({
      reservationId: reservation._id,
      eventId: reservation.eventId, // to invalidate correct event cache tag
    }).unwrap();
    dispatch(clearReservation());
    return result;
  };

  const handleClearReservation = () => {
    dispatch(clearReservation());
  };

  return {
    selectedSeats,
    step,
    reservation,
    isReserving,
    isConfirming,
    reserveError,
    confirmError,
    toggleSeat: handleToggleSeat,
    clearSelection: handleClearSelection,
    reserveSeats: handleReserveSeats,
    confirmBooking: handleConfirmBooking,
    clearReservation: handleClearReservation,
  };
};

export default useBooking;

