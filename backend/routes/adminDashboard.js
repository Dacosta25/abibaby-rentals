import express from "express";
import Booking from "../models/bookings.js";
import Item from "../models/Items.js";

const router = express.Router();

// GET /admin/dashboard (protected)
router.get("/dashboard", async (req, res) => {
  try {
    // Total bookings
    const totalBookings = await Booking.countDocuments();

    // Today's date (string format)
    const today = new Date().toISOString().split("T")[0];

    // Upcoming events (date stored as STRING)
    const upcomingEvents = await Booking.countDocuments({
      date: { $gte: today }
    });

    // Total revenue (sum of depositPaid)
    const revenueAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$depositPaid" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // Your Item model has NO stock field — set to 0
    const lowStockItems = 0;

    // Upcoming bookings list
    const upcoming = await Booking.find({
      date: { $gte: today }
    })
      .sort({ date: 1 })
      .limit(5)
      .lean();

    // Format upcoming bookings for frontend
    const upcomingFormatted = upcoming.map(b => ({
      _id: b._id,
      customerName: b.customerData?.fullName || "Unknown",
      itemName: b.items?.map(i => i.name).join(", "),
      date: b.date
    }));

    res.json({
      stats: {
        totalBookings,
        upcomingEvents,
        totalRevenue,
        lowStockItems,
      },
      upcoming: upcomingFormatted,
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Dashboard fetch failed" });
  }
});

export default router;