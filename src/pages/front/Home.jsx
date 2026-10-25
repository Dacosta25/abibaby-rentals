import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Base URL for the live backend on Render.
// Keeping this in one place makes it easier to update later.
const API_BASE = "https://abibaby-rentals-backend.onrender.com";

export default function Home() {
  const navigate = useNavigate();

  // Store the list of products fetched from the backend.
  const [products, setProducts] = useState([]);

  // Fetch items from the backend as soon as the page loads.
  // This replaces the old localhost call and now pulls real data from MongoDB.
  useEffect(() => {
    axios.get(`${API_BASE}/api/items`)
      .then(res => {
        // Save the items into state so the UI can display them.
        setProducts(res.data);
      })
      .catch(err => {
        // If something goes wrong, log it for debugging.
        console.error("Failed to load items:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Hero Section — the big banner at the top of the homepage */}
      <section className="relative overflow-hidden py-40 mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>

        {/* Decorative blurred circles for visual effect */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/20 rounded-full blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto text-center px-6">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-6">
            Make Your Event Unforgettable
          </h1>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Premium rentals, bold designs, and vibrant décor that transform any celebration.
          </p>

          {/* Button that takes the user to the booking page */}
          <button
            onClick={() => navigate("booking")}
            className="px-10 py-4 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition"
          >
            Browse Rentals
          </button>
        </div>
      </section>

      {/* Product Cards — shows items fetched from MongoDB */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h3 className="text-4xl font-semibold text-gray-900 mb-14 text-center">
          Event Rental Products
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {products.map((item) => (
            <div
              key={item._id} // MongoDB document ID
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image served directly from your Render backend */}
              <img
                src={`${API_BASE}${item.imageUrl}`}
                alt={item.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                {/* Item name */}
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h4>

                {/* Item category (e.g., Chairs, Tables, Decor) */}
                <p className="text-gray-600 mb-4">{item.category}</p>

                {/* Button to start booking with this item */}
                <button
                  onClick={() => navigate("booking")}
                  className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final call-to-action section */}
      <section className="max-w-7xl mx-auto py-24 text-center px-6">
        <h3 className="text-3xl font-semibold mb-4">Ready to Book?</h3>
        <p className="text-gray-600 mb-8">
          Choose your items, select your date, and complete your reservation in minutes.
        </p>

        <button
          onClick={() => navigate("booking")}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Start Booking
        </button>
      </section>

    </div>
  );
}