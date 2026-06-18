import mongoose from "mongoose";
import "dotenv/config";
import Event from "../models/Event.js";
import Seat from "../models/Seat.js";

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing from .env file");
    }

    console.log("Connecting to database...");
    await mongoose.connect(mongoUri);
    console.log("Connected. Clearing old data...");

    // Clean up
    await Event.deleteMany({});
    await Seat.deleteMany({});

    // Create a mock event
    const event = new Event({
      name: "SortMyScene Launch Concert",
      dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      venue: "Grand Symphony Arena",
      totalSeats: 10,
    });
    await event.save();
    console.log(`Created Event: "${event.name}" with ID: ${event._id}`);

    // Create corresponding seats
    const seatPromises = [];
    for (let i = 1; i <= 10; i++) {
      const seat = new Seat({
        eventId: event._id,
        seatNumber: `A${i}`,
        status: "available",
      });
      seatPromises.push(seat.save());
    }
    await Promise.all(seatPromises);
    console.log("Created 10 seats (A1 to A10) for the event.");

    console.log("\nDatabase seeded successfully!");
    console.log(`Test URLs:`);
    console.log(`- GET all events:  http://localhost:5000/api/events`);
    console.log(`- GET event details: http://localhost:5000/api/events/${event._id}`);

    await mongoose.disconnect();
    console.log("Disconnected from database.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
