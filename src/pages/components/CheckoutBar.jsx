import { useEffect, useState } from "react";

export default function CheckoutBar() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      const parsed = stored ? JSON.parse(stored) : [];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  }, []);

  if (cart.length === 0) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t shadow-2xl z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            {cart.length} item{cart.length > 1 ? "s" : ""} in cart
          </p>
          <p className="text-lg font-bold">Total: £{total}</p>
        </div>
        <a
          href="/cart"
          className="px-5 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition"
        >
          View Cart
        </a>
      </div>
    </div>
  );
}