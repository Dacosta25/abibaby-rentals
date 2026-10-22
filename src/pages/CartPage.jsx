import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      const parsed = stored ? JSON.parse(stored) : [];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  }, []);

  // Remove single item
  const removeFromCart = (id) => {
    const updated = cart.filter((i) => i._id !== id);
    setCart(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // update navbar count
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("storage")); // update navbar count
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Checkout → go to Customer Details
  const checkout = () => {
    navigate("/booking/customer", { state: { items: cart } });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        {/* ⭐ Cart Icon + Item Count (Option 3) */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="material-icons text-purple-700 text-4xl">shopping_cart</span>
          <h1 className="text-3xl font-bold">({cart.length}) Items</h1>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  {/* Image + Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />

                    <div>
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="font-bold text-purple-700">£{item.price}</p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Total + Buttons */}
            <div className="mt-8 flex justify-between items-center">

              <span className="text-2xl font-bold">Total: £{total}</span>

              <div className="flex space-x-4">

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                >
                  Clear Cart
                </button>

                {/* Checkout */}
                <button
                  onClick={checkout}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                >
                  Checkout
                </button>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}