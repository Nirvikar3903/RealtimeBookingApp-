import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";
import { cleanupExpiredReservations } from "../utils/reservationCleanup.js";

export const reserveSeats = async (req, res, next) => {
  try {
    const { eventId, seatNumbers } = req.body;
    const userId = req.user?.userId;

    // Return 400 if any field is missing
    if (!eventId || !seatNumbers || !Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      return res.status(400).json({ message: "Event ID and seat numbers are required" });
    }

    // Clean up any expired reservations first before making new holds
    await cleanupExpiredReservations(eventId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not identified" });
    }

    // ATOMIC OPERATION (critical for no double booking)
    const result = await Seat.updateMany(
      {
        eventId: eventId,
        seatNumber: { $in: seatNumbers },
        status: "available",
      },
      { $set: { status: "reserved" } }
    );

    const modifiedCount = result.modifiedCount;

    // Check if all requested seats were successfully updated
    if (modifiedCount !== seatNumbers.length) {
      // Rollback: updateMany those seats back to "available"
      await Seat.updateMany(
        {
          eventId: eventId,
          seatNumber: { $in: seatNumbers },
          status: "reserved",
        },
        { $set: { status: "available" } }
      );

      return res.status(409).json({ message: "One or more seats are no longer available" });
    }

    // If modifiedCount matches, create a Reservation
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
    const reservation = new Reservation({
      userId,
      eventId,
      seatNumbers,
      expiresAt,
    });
    await reservation.save();

    return res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

export const cancelReservation = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const userId = req.user?.userId;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not identified" });
    }

    // Find the active reservation for the user and event
    const reservation = await Reservation.findOne({ eventId, userId });
    if (!reservation) {
      return res.status(404).json({ message: "No active reservation found to cancel" });
    }

    // Revert the seats to available
    await Seat.updateMany(
      {
        eventId: eventId,
        seatNumber: { $in: reservation.seatNumbers },
        status: "reserved",
      },
      { $set: { status: "available" } }
    );

    // Delete the reservation record
    await Reservation.deleteOne({ _id: reservation._id });

    return res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    next(error);
  }
};
