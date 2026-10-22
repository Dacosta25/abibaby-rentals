import { useEffect, useState } from "react";
import logo from "../../assets/logo/abibabylogo.png";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem("cartItems");
        const parsed = stored ? JSON.parse(stored) : [];
        setCartCount(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setCartCount(0);
      }
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4
                   backdrop-blur-xl bg-white/10 border-b border-white/20
                   shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-b-2xl"
      >

        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={logo} alt="Abibaby Rentals" className="h-12 w-auto" />
        </div>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          <a href="/" className="text-white hover:text-purple-200 transition">Home</a>
          <a href="/products" className="text-white hover:text-purple-200 transition">Products</a>
          <a href="/booking" className="text-white hover:text-purple-200 transition">Booking</a>
          <a href="/contact" className="text-white hover:text-purple-200 transition">Contact</a>
        </div>

        <div className="flex items-center space-x-6">

          {/* Cart Icon */}
          <a href="/cart" className="relative cursor-pointer">
            <span className="material-icons-round text-white text-3xl">
              shopping_cart
            </span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </a>

          <a
            href="/booking"
            className="px-5 py-2 bg-white text-purple-700 font-semibold rounded-full shadow-md hover:bg-purple-100 transition"
          >
            Book Now
          </a>
        </div>
      </nav>
    </header>
  );
}