import mongoose from "mongoose";
import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";
import Booking from "../models/Booking.js";

// Confirm a booking from an active reservation hold
export const confirmBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  let transactionStarted = false;

  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // EXPIRY CHECK:
    if (new Date(reservation.expiresAt) < new Date()) {
      // Release seats back to available and delete the expired reservation
      await Seat.updateMany(
        {
          eventId: reservation.eventId,
          seatNumber: { $in: reservation.seatNumbers },
          status: "reserved",
        },
        { $set: { status: "available" } }
      );
      await Reservation.findByIdAndDelete(reservationId);

      return res.status(400).json({ message: "Reservation has expired" });
    }

    // TRANSACTION (atomic booking):
    session.startTransaction();
    transactionStarted = true;

    // Update seat statuses to "booked"
    await Seat.updateMany(
      {
        eventId: reservation.eventId,
        seatNumber: { $in: reservation.seatNumbers },
      },
      { $set: { status: "booked" } },
      { session }
    );

    // Save a persistent booking transaction record
    const bookingReference = `SMS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const newBooking = new Booking({
      userId: reservation.userId,
      eventId: reservation.eventId,
      seatNumbers: reservation.seatNumbers,
      bookingReference,
    });
    await newBooking.save({ session });

    // Delete reservation hold document
    await Reservation.findByIdAndDelete(reservationId, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Booking confirmed successfully",
      bookingReference,
      seatNumbers: reservation.seatNumbers,
    });
  } catch (error) {
    if (transactionStarted) {
      try {
        await session.abortTransaction();
      } catch (abortErr) {
        console.error("Failed to abort transaction:", abortErr.message);
      }
    }
    session.endSession();
    next(error);
  }
};

// Retrieve booking history for the logged-in user
export const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User session not found" });
    }

    // Fetch user bookings, populating event names/venues/dates/logos
    const bookings = await Booking.find({ userId })
      .populate("eventId")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
