import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { confirmBooking, getMyBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", authMiddleware, confirmBooking);
router.get("/my-bookings", authMiddleware, getMyBookings);

export default router;
