import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  items: Array,
  customerData: Object,
  date: String,
  startTime: String,
  hours: Number,
  depositPaid: Number,
  paymentStatus: String,
  paypalTransactionId: String,
  reference: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Booking", BookingSchema);
