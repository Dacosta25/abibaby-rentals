import express from "express";
import Booking from "../models/bookings.js";

const router = express.Router();

// GET all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find().sort({ date: 1 });
  res.json(bookings);
});

// Confirm booking
router.put("/:id/confirm", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "confirmed" });
  res.json({ message: "Booking confirmed" });
});

// Delete booking
router.delete("/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
});

export default router;