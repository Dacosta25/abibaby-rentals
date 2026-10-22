import express from "express";
import cors from "cors";
import { sendReceiptEmail } from "./email.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/verify-paypal", async (req, res) => {
  const { orderId, booking } = req.body;

  try {
    // verify PayPal orderId with PayPal API
   console.log("PayPal Order ID:", orderId);

    // Send email receipt
    await sendReceiptEmail(booking);

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Email failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
