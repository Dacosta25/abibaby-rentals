import { useEffect, useState } from "react";

export default function CartModal({ isOpen, onClose }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    try {
      const stored = localStorage.getItem("cartItems");
      const parsed = stored ? JSON.parse(stored) : [];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  }, [isOpen]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between text-sm border-b pb-2">
                  <span>{item.name}</span>
                  <span>£{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>£{total}</span>
            </div>

            <a
              href="/cart"
              className="mt-4 block w-full text-center py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Go to Cart
            </a>
          </>
        )}
      </div>
    </div>
  );
}