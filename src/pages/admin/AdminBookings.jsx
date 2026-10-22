import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const token = localStorage.getItem("adminToken");

  // Fetch bookings (protected)
  useEffect(() => {
    fetch("http://localhost:5000/admin/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.reference.toLowerCase().includes(search.toLowerCase()) ||
      b.customerData.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerData.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : b.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-10">

          <h1 className="text-4xl font-bold mb-10 text-center">
            Admin — Booking Management
          </h1>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">

            <input
              type="text"
              placeholder="Search by name, reference, or email..."
              className="border p-3 rounded-xl w-full md:w-1/2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border p-3 rounded-xl w-full md:w-1/4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Booking Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Reference</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Deposit (£)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b._id} className="border-b">

                    <td className="p-3 font-semibold">{b.reference}</td>

                    <td className="p-3">
                      {b.customerData.fullName}
                      <br />
                      <span className="text-sm text-gray-500">
                        {b.customerData.email}
                      </span>
                    </td>

                    <td className="p-3">
                      {b.items.map((item) => (
                        <div key={item.id}>• {item.name}</div>
                      ))}
                    </td>

                    <td className="p-3">{b.date}</td>

                    <td className="p-3">{b.startTime}</td>

                    <td className="p-3">£{b.depositPaid}</td>

                    <td className="p-3 font-semibold text-purple-700">
                      {b.paymentStatus}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-3 py-1 bg-purple-600 text-white rounded"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                No bookings match your search or filter.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* BOOKING DETAIL MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">

            <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

            <p><strong>Reference:</strong> {selectedBooking.reference}</p>
            <p><strong>Name:</strong> {selectedBooking.customerData.fullName}</p>
            <p><strong>Email:</strong> {selectedBooking.customerData.email}</p>
            <p><strong>Date:</strong> {selectedBooking.date}</p>
            <p><strong>Time:</strong> {selectedBooking.startTime}</p>
            <p><strong>Deposit Paid:</strong> £{selectedBooking.depositPaid}</p>
            <p><strong>Status:</strong> {selectedBooking.paymentStatus}</p>

            <div className="mt-4">
              <strong>Items:</strong>
              <ul className="list-disc ml-6">
                {selectedBooking.items.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-6 px-4 py-2 bg-gray-700 text-white rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}