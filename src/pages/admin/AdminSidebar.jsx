import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded ${
      pathname === path ? "bg-purple-600 text-white" : "text-gray-700"
    }`;

  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <Link className={linkClass("/admin/dashboard")} to="/admin/dashboard">
          Dashboard
        </Link>

        <Link className={linkClass("/admin/bookings")} to="/admin/bookings">
          Bookings
        </Link>

        <Link className={linkClass("/admin/items")} to="/admin/items">
          Items
        </Link>

        <button
          className="mt-6 text-red-600"
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin";
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
