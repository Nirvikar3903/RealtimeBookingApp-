import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { reserveSeats } from "../controllers/reserveController.js";

const router = express.Router();

router.post("/", authMiddleware, reserveSeats);

export default router;
