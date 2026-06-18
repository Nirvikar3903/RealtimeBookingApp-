import mongoose from "mongoose";
import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";

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

    // Update status to "booked"
    await Seat.updateMany(
      {
        eventId: reservation.eventId,
        seatNumber: { $in: reservation.seatNumbers },
      },
      { $set: { status: "booked" } },
      { session }
    );

    // Delete reservation document
    await Reservation.findByIdAndDelete(reservationId, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Booking confirmed successfully",
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
