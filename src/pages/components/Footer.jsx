import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Abibaby Event Rentals</h2>
          <p className="text-gray-400">
            Premium rentals for weddings, birthdays, corporate events and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="" className="hover:text-white">Home</Link></li>
            <li><Link to="products" className="hover:text-white">Products</Link></li>
            <li><Link to="booking" className="hover:text-white">Booking</Link></li>
            <li><Link to="contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
          <p>📍 Northampton, UK</p>
          <p>📞 07338 513979</p>
          <p>📧 abibabyrentals@gmail.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Abibaby Event Rentals — All Rights Reserved
      </div>

      {/* Developer Branding */}
      <div className="mt-6 flex flex-col items-center justify-center gap-3">
        <img
          src="/abibaby-rentals/images/developer_logo.png"
          alt="DevCosta Solutions Logo"
          className="h-12 w-auto object-contain bg-white p-2 rounded-lg shadow-md border border-purple-600"
        />

        <p className="text-gray-400 text-sm">
          Designed & Developed by <span className="text-purple-400 font-semibold">DevCosta Solutions</span>
        </p>
      </div>
    </footer>
  );
}