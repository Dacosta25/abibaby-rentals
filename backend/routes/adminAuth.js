console.log("✅ adminAuth router loaded");

import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Hardcoded admin credentials (replace with DB later)
const ADMIN_EMAIL = "admin@abibaby.com";
const ADMIN_PASSWORD = "Abibaby123";

router.post("/test", (req, res) => {
  console.log("BODY:", req.body);
  res.json({ received: req.body });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
});

export default router;