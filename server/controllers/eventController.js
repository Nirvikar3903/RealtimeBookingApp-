import Event from "../models/Event.js";
import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";
import { cleanupExpiredReservations } from "../utils/reservationCleanup.js";
import jwt from "jsonwebtoken";

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

    // Optional: get userId from JWT token if present in authorization headers
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (err) {
        // Ignore invalid tokens, just treat as guest
      }
    }

    let activeReservation = null;
    if (userId) {
      activeReservation = await Reservation.findOne({
        eventId: id,
        userId: userId,
        expiresAt: { $gt: new Date() },
      });
    }

    return res.status(200).json({
      event,
      seats,
      activeReservation,
    });
  } catch (error) {
    next(error);
  }
};
