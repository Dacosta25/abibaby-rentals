import bookings from "../../models/bookings.js";
import { sendCustomerEmail, sendAdminEmail } from "../services/emailService.js";

export const saveBooking = async (req, res) => {
  try {
    const booking = await bookings.create(req.body);

    // Send emails
    await sendCustomerEmail(booking);
    await sendAdminEmail(booking);

    res.json({ success: true, booking });
  } catch (err) {
    console.error("Booking save error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};