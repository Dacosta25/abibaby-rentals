import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Base URL for your live backend on Render.
// Keeping this in one place avoids repeating the URL everywhere.
const API_BASE = "https://abibaby-rentals-backend.onrender.com";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handles admin login form submission.
  // Sends credentials to your backend and stores the returned token.
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/admin/auth/login`, {
        email,
        password,
      });

      // Save admin token so protected pages can be accessed.
      localStorage.setItem("adminToken", res.data.token);

      // Redirect to admin dashboard after successful login.
      navigate("/admin/dashboard");
    } catch (err) {
      // Simple error feedback for incorrect login.
      alert("Invalid login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button className="w-full bg-purple-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}