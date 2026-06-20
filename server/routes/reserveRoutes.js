import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { reserveSeats, cancelReservation } from "../controllers/reserveController.js";

const router = express.Router();

router.post("/", authMiddleware, reserveSeats);
router.post("/cancel", authMiddleware, cancelReservation);

export default router;
