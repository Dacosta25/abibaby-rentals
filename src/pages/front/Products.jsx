import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load items:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6">

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">
          Event Rental Products
        </h1>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Browse our premium event rental items. Choose your favourites and book them instantly.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              name={item.name}
              price={item.price}
              img={`http://localhost:5000${item.imageUrl}`}
              description={item.category}
              onSelect={() => navigate("/booking")}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            onClick={() => navigate("/booking")}
            className="px-10 py-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition"
          >
            Start Booking
          </button>
        </div>
      </div>
    </div>
  );
}