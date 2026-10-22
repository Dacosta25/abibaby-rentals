import express from "express";
import { saveBooking } from "../server/controllers/bookingsController.js";

const router = express.Router();

router.post("/save", saveBooking);

export default router;