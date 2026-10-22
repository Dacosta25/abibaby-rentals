import { useLocation } from "react-router-dom";

export default function Confirmation() {
  const { state } = useLocation();
  const booking = state;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          No booking found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center">

        <h1 className="text-4xl font-bold mb-6">Booking Confirmed!</h1>

        <p className="text-lg mb-4">Reference Number:</p>
        <p className="text-3xl font-bold text-purple-700 mb-10">
          {booking.reference}
        </p>

        <h2 className="text-2xl font-semibold mb-4">Summary</h2>

        <ul className="mb-6 text-left">
          {booking.items.map((item) => (
            <li key={item.id} className="text-lg mb-1">
              • {item.name} — £{item.price}
            </li>
          ))}
        </ul>

        <p className="text-lg mb-2"><strong>Date:</strong> {booking.date}</p>
        <p className="text-lg mb-2"><strong>Start Time:</strong> {booking.startTime}</p>
        <p className="text-lg mb-2"><strong>Duration:</strong> {booking.hours} hours</p>

        <p className="text-lg mb-2"><strong>Name:</strong> {booking.customerData.fullName}</p>
        <p className="text-lg mb-2"><strong>Email:</strong> {booking.customerData.email}</p>
        <p className="text-lg mb-2"><strong>Phone:</strong> {booking.customerData.phone}</p>

      </div>
    </div>
  );
}