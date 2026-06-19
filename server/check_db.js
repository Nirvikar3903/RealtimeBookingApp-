import mongoose from "mongoose";
import "dotenv/config";
import Event from "./models/Event.js";
import Seat from "./models/Seat.js";
import Reservation from "./models/Reservation.js";

const runDiagnostic = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");

    console.log("Re-seeding database...");
    
    // Clear existing events/seats/reservations
    await Event.deleteMany({});
    await Seat.deleteMany({});
    await Reservation.deleteMany({});

    // Event 1
    const event1 = new Event({
      name: "Coldplay Concert",
      dateTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in future
      venue: "Mumbai Arena",
      totalSeats: 20,
      logoUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=300&auto=format&fit=crop",
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
      logoUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=300&auto=format&fit=crop",
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

    // Event 3
    const event3 = new Event({
      name: "Comedy Special Night",
      dateTime: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days in future
      venue: "Pune Comedy Club",
      totalSeats: 10,
      logoUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eed262?q=80&w=300&auto=format&fit=crop",
    });
    await event3.save();

    const seatsEvent3 = [];
    for (let i = 1; i <= 10; i++) {
      seatsEvent3.push({ eventId: event3._id, seatNumber: `A${i}`, status: "available" });
    }
    await Seat.insertMany(seatsEvent3);

    // Event 4
    const event4 = new Event({
      name: "EDM Laser DJ Night",
      dateTime: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days in future
      venue: "Goa Beach Club",
      totalSeats: 25,
      logoUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop",
    });
    await event4.save();

    const seatsEvent4 = [];
    for (let i = 1; i <= 10; i++) {
      seatsEvent4.push({ eventId: event4._id, seatNumber: `A${i}`, status: "available" });
      seatsEvent4.push({ eventId: event4._id, seatNumber: `B${i}`, status: "available" });
    }
    for (let i = 1; i <= 5; i++) {
      seatsEvent4.push({ eventId: event4._id, seatNumber: `C${i}`, status: "available" });
    }
    await Seat.insertMany(seatsEvent4);

    // Event 5
    const event5 = new Event({
      name: "International Film Fest",
      dateTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days in future
      venue: "Chennai Cinema Multiplex",
      totalSeats: 12,
      logoUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300&auto=format&fit=crop",
    });
    await event5.save();

    const seatsEvent5 = [];
    for (let i = 1; i <= 6; i++) {
      seatsEvent5.push({ eventId: event5._id, seatNumber: `A${i}`, status: "available" });
      seatsEvent5.push({ eventId: event5._id, seatNumber: `B${i}`, status: "available" });
    }
    await Seat.insertMany(seatsEvent5);

    console.log("Database initial seeding completed successfully with 5 events & logos!");

    const eventCount = await Event.countDocuments();
    console.log(`Diagnostic verify - total events now in DB: ${eventCount}`);

    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
};

runDiagnostic();
