import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import reserveRoutes from "./routes/reserveRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import Event from "./models/Event.js";
import Seat from "./models/Seat.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reserve", reserveRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "SortMyScene Backend API is running." });
});

//middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

const seedDB = async () => {
  try {
    const eventCount = await Event.countDocuments();
    if (eventCount > 0) {
      console.log("Database already seeded. Skipping initial seeding.");
      return;
    }

    console.log("No events found. Seeding initial database...");

    // Event 1
    const event1 = new Event({
      name: "Coldplay Concert",
      dateTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in future
      venue: "Mumbai Arena",
      totalSeats: 20,
    });
    await event1.save();

    // Create seats for Event 1: A1-A10 and B1-B10
    const seatsEvent1 = [];
    for (let i = 1; i <= 10; i++) {
      seatsEvent1.push({ eventId: event1._id, seatNumber: `A${i}`, status: "available" });
      seatsEvent1.push({ eventId: event1._id, seatNumber: `B${i}`, status: "available" });
    }
    await Seat.insertMany(seatsEvent1);

    // Event 2
    const event2 = new Event({
      name: "Tech Summit 2025",
      dateTime: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days in future
      venue: "Bangalore Convention Center",
      totalSeats: 15,
    });
    await event2.save();

    // Create seats for Event 2: A1-A10 and B1-B5
    const seatsEvent2 = [];
    for (let i = 1; i <= 10; i++) {
      seatsEvent2.push({ eventId: event2._id, seatNumber: `A${i}`, status: "available" });
    }
    for (let i = 1; i <= 5; i++) {
      seatsEvent2.push({ eventId: event2._id, seatNumber: `B${i}`, status: "available" });
    }
    await Seat.insertMany(seatsEvent2);

    console.log("Database initial seeding completed successfully!");
  } catch (error) {
    console.error("Database seeding failed:", error.message);
  }
};

const startServer = async () => {
  await connectDB();
  await seedDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
