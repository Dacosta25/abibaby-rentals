import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DateTimeSelection() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Safely extract state
  const items = state?.items || [];
  const customerData = state?.customerData || {};

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [hours, setHours] = useState(3);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!date) newErrors.date = "Please select a date.";
    if (!startTime) newErrors.startTime = "Please select a start time.";
    if (hours < 3 || hours > 8)
      newErrors.hours = "Duration must be between 3 and 8 hours.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    navigate("/booking/payment", {
      state: {
        items,
        customerData,
        date,
        startTime,
        hours,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Back Button */}
        <button
          onClick={() =>
            navigate("/booking/customer", { state: { items } })
          }
          className="mb-6 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold mb-10 text-center">
          Select Date & Time
        </h1>

        {/* Event Date */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">Event Date</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && (
            <p className="text-red-600 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Start Time */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">Start Time</label>
          <input
            type="time"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          {errors.startTime && (
            <p className="text-red-600 text-sm mt-1">{errors.startTime}</p>
          )}
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">
            Duration (3–8 hours)
          </label>
          <input
            type="number"
            min="3"
            max="8"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          {errors.hours && (
            <p className="text-red-600 text-sm mt-1">{errors.hours}</p>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-purple-600 text-white text-lg font-semibold rounded-xl hover:bg-purple-700 transition"
        >
          Continue to Deposit
        </button>
      </div>
    </div>
  );
}