import Event from "../models/Event.js";
import Seat from "../models/Seat.js";
import { cleanupExpiredReservations } from "../utils/reservationCleanup.js";

// Fetch all events
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// Fetch a single event by ID and its corresponding seats
export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Clean up any expired reservations first before returning seats
    await cleanupExpiredReservations(id);

    // Fetch all seats for this event
    const seats = await Seat.find({ eventId: id });

    return res.status(200).json({
      event,
      seats,
    });
  } catch (error) {
    next(error);
  }
};
