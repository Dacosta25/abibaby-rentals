import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? "text-purple-600 font-semibold" : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="bookings"
            className={({ isActive }) =>
              isActive ? "text-purple-600 font-semibold" : "text-gray-700"
            }
          >
            Bookings
          </NavLink>

          <NavLink
            to="items"
            className={({ isActive }) =>
              isActive ? "text-purple-600 font-semibold" : "text-gray-700"
            }
          >
            Items
          </NavLink>

          <NavLink
            to="login"
            className="text-red-600 font-semibold"
          >
            Logout
          </NavLink>

        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}