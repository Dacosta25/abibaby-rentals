import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CustomerDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { items } = state || {};

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    navigate("/booking/date", {
      state: {
        items,
        customerData: form,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        <button
          onClick={() => navigate("/booking")}
          className="mb-6 px-6 py-3 bg-gray-300 rounded-lg"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold mb-10 text-center">Customer Details</h1>

        <div className="space-y-6">
          <input name="fullName" placeholder="Full Name" className="w-full p-3 border rounded-lg"
            value={form.fullName} onChange={handleChange} />

          <input name="email" placeholder="Email" className="w-full p-3 border rounded-lg"
            value={form.email} onChange={handleChange} />

          <input name="phone" placeholder="Phone" className="w-full p-3 border rounded-lg"
            value={form.phone} onChange={handleChange} />

          <input name="address" placeholder="Address" className="w-full p-3 border rounded-lg"
            value={form.address} onChange={handleChange} />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-10 w-full py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
