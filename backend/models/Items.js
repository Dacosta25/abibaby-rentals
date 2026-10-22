import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,

    // NEW FIELDS
    category: {
      type: String,
      enum: ["Seating", "Decor", "Backdrops", "Effects", "Electronics"],
      default: "Uncategorized",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    availability: {
      type: Boolean,
      default: true, // true = available, false = unavailable
    },

    blockedDates: {
      type: [String], // e.g. ["2026-09-10", "2026-09-12"]
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);