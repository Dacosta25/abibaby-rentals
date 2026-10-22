import { useEffect, useState } from "react";

export default function CartDropdown() {
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

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border p-3 z-50">
      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>£{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>£{total}</span>
          </div>
          <a
            href="/cart"
            className="mt-3 block w-full text-center py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition"
          >
            View Cart
          </a>
        </>
      )}
    </div>
  );
}