import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";

export const reserveSeats = async (req, res, next) => {
  try {
    const { eventId, seatNumbers } = req.body;
    const userId = req.user?.userId;

    // Return 400 if any field is missing
    if (!eventId || !seatNumbers || !Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      return res.status(400).json({ message: "Event ID and seat numbers are required" });
    }

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
