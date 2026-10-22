import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load items:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-40 mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>

        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/20 rounded-full blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto text-center px-6">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-6">
            Make Your Event Unforgettable
          </h1>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Premium rentals, bold designs, and vibrant décor that transform any celebration.
          </p>

          <button
            onClick={() => navigate("/booking")}
            className="px-10 py-4 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition"
          >
            Browse Rentals
          </button>
        </div>
      </section>

      {/* Product Cards */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h3 className="text-4xl font-semibold text-gray-900 mb-14 text-center">
          Event Rental Products
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h4>
                <p className="text-gray-600 mb-4">{item.category}</p>

                <button
                  onClick={() => navigate("/booking")}
                  className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="max-w-7xl mx-auto py-24 text-center px-6">
        <h3 className="text-3xl font-semibold mb-4">Ready to Book?</h3>
        <p className="text-gray-600 mb-8">
          Choose your items, select your date, and complete your reservation in minutes.
        </p>

        <button
          onClick={() => navigate("/booking")}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Start Booking
        </button>
      </section>

    </div>
  );
}