import { useEffect, useState } from "react";

export default function CartDrawer({ isOpen, onClose }) {
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

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold">Cart</h2>
        <button onClick={onClose} className="text-gray-600">Close</button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-120px)]">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="flex justify-between text-sm border-b pb-2">
              <span>{item.name}</span>
              <span>£{item.price}</span>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between mb-3">
          <span className="font-semibold">Total</span>
          <span className="font-bold">£{total}</span>
        </div>
        <a
          href="/cart"
          className="block w-full text-center py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          View Full Cart
        </a>
      </div>
    </div>
  );
}