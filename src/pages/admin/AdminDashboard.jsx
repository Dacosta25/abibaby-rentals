import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  async function loadDashboard() {
    try {
      const res = await axios.get("http://localhost:5000/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });

      setStats(res.data.stats);
      setUpcoming(res.data.upcoming);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  loadDashboard();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-10 text-center">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Bookings" value={stats.totalBookings} />
          <StatCard title="Upcoming Events" value={stats.upcomingEvents} />
          <StatCard title="Total Revenue (£)" value={`£${stats.totalRevenue}`} />
          <StatCard title="Low Stock Items" value={stats.lowStockItems} />
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Bookings</h2>

          <div className="space-y-4">
            {upcoming.length === 0 && (
              <p className="text-gray-500">No upcoming bookings.</p>
            )}

            {upcoming.map((event) => (
              <div
                key={event._id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="text-lg font-semibold">{event.customerName}</p>
                  <p className="text-gray-600">{event.itemName}</p>
                </div>
                <p className="text-gray-800 font-medium">{event.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-purple-600 text-white py-4 rounded-xl shadow-md hover:bg-purple-700 transition">
            Manage Items
          </button>

          <button className="bg-blue-600 text-white py-4 rounded-xl shadow-md hover:bg-blue-700 transition">
            Manage Bookings
          </button>

          <button className="bg-yellow-500 text-white py-4 rounded-xl shadow-md hover:bg-yellow-600 transition">
            View Inventory
          </button>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}