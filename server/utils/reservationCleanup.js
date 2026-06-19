import Reservation from "../models/Reservation.js";
import Seat from "../models/Seat.js";

/**
 * Checks for and releases any expired seat reservations for a specific event.
 * Reverts the seat statuses from "reserved" back to "available" in the database
 * and deletes the expired reservation documents.
 * 
 * @param {string} eventId - The event database ID to clean up reservations for
 */
export const cleanupExpiredReservations = async (eventId) => {
  try {
    const now = new Date();
    // Find all expired reservations for this event
    const expiredReservations = await Reservation.find({
      eventId,
      expiresAt: { $lt: now },
    });

    if (expiredReservations.length === 0) {
      return;
    }

    // Collect all unique seat numbers that need to be released
    const seatNumbersToRelease = expiredReservations.reduce((acc, res) => {
      res.seatNumbers.forEach((seat) => {
        if (!acc.includes(seat)) {
          acc.push(seat);
        }
      });
      return acc;
    }, []);

    if (seatNumbersToRelease.length > 0) {
      // Revert the seats to available
      await Seat.updateMany(
        {
          eventId,
          seatNumber: { $in: seatNumbersToRelease },
          status: "reserved",
        },
        { $set: { status: "available" } }
      );
      console.log(`[Cleanup] Released expired seats for event ${eventId}: ${seatNumbersToRelease.join(", ")}`);
    }

    // Delete the expired reservation records
    const expiredIds = expiredReservations.map((res) => res._id);
    await Reservation.deleteMany({ _id: { $in: expiredIds } });
  } catch (error) {
    console.error(`[Cleanup Error] Failed to clean up reservations for event ${eventId}:`, error);
  }
};

/**
 * Starts a background interval that scans the entire database for any expired
 * seat reservations, reverts their corresponding seat statuses to "available",
 * and deletes the expired reservation documents.
 * Runs every 10 seconds.
 */
export const startBackgroundCleanup = () => {
  setInterval(async () => {
    try {
      const now = new Date();
      // Find all expired reservations across ALL events
      const expiredReservations = await Reservation.find({
        expiresAt: { $lt: now },
      });

      if (expiredReservations.length === 0) {
        return;
      }

      // Process reservations and release seats
      for (const res of expiredReservations) {
        await Seat.updateMany(
          {
            eventId: res.eventId,
            seatNumber: { $in: res.seatNumbers },
            status: "reserved",
          },
          { $set: { status: "available" } }
        );
      }

      // Delete the expired reservation documents
      const expiredIds = expiredReservations.map((res) => res._id);
      await Reservation.deleteMany({ _id: { $in: expiredIds } });
      console.log(`[Background Cleanup] Automatically released ${expiredReservations.length} expired reservations across the database.`);
    } catch (error) {
      console.error("[Background Cleanup Error] Failed to run automatic cleanup:", error);
    }
  }, 10000); // Check every 10 seconds
};

