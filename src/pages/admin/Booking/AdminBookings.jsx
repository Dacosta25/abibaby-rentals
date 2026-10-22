import { useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "John Smith",
      item: "Luxury Throne Chair",
      date: "2026-09-10",
      hours: 4,
      delivery: "Delivery",
      total: 180,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      item: "Flower Wall Backdrop",
      date: "2026-09-12",
      hours: 3,
      delivery: "Pickup",
      total: 180,
      status: "Approved",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: newStatus } : b
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Admin — Booking Management
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Customer</th>
                <th className="p-3">Item</th>
                <th className="p-3">Date</th>
                <th className="p-3">Hours</th>
                <th className="p-3">Delivery</th>
                <th className="p-3">Total (£)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="p-3">{b.customer}</td>
                  <td className="p-3">{b.item}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{b.hours}</td>
                  <td className="p-3">{b.delivery}</td>
                  <td className="p-3">£{b.total}</td>
                  <td className="p-3 font-semibold">{b.status}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => updateStatus(b.id, "Approved")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(b.id, "Rejected")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => updateStatus(b.id, "Completed")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}