import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { confirmBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", authMiddleware, confirmBooking);

export default router;
