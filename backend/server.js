console.log("RUNNING SERVER FILE:", import.meta.url);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ⭐ CREATE APP FIRST
const app = express();

// ⭐ FIXED CORS (only once, correct config)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// MIDDLEWARE
import upload from "./middleware/upload.js";
import verifyAdmin from "./middleware/verifyAdmin.js";

// PUBLIC ROUTES
import bookingsRoute from "./routes/bookings.js";
import itemsRoute from "./routes/Items.js";

// ADMIN ROUTES
import adminAuthRoutes from "./routes/adminAuth.js";
import adminBookingRoutes from "./routes/adminBookings.js";
import adminItemRoutes from "./routes/adminItems.js";
import adminDashboardRoutes from "./routes/adminDashboard.js";

// ⭐ PUBLIC ROUTES
app.use("/bookings", bookingsRoute);

// ⭐ PUBLIC ITEMS ROUTE
app.use("/api/items", itemsRoute);

// ⭐ STATIC UPLOADS
app.use("/uploads", express.static("uploads"));

// ⭐ ADMIN ROUTES
app.use("/admin/auth", adminAuthRoutes);
app.use("/admin/bookings", verifyAdmin, adminBookingRoutes);
app.use("/admin/items", verifyAdmin, adminItemRoutes);

// mount dashboard correctly
app.use("/admin", verifyAdmin, adminDashboardRoutes);

// ⭐ DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// ⭐ SERVER
app.listen(5000, () => console.log("Server running on port 5000"));