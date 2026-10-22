import { useState, useEffect } from "react";
import axios from "axios";

export default function ItemSelection() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load items:", err));
  }, []);

  const addToCart = (item) => {
    if (!cart.find((i) => i._id === item._id)) {
      const updated = [...cart, item];
      setCart(updated);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
          Select Your Rental Items
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {item.name}
                </h3>

                <p className="text-gray-700 font-medium mb-3">
                  {item.category}
                </p>

                <p className="text-xl font-extrabold text-purple-700 mb-6">
                  £{item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
                >
                  Add to Booking
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}