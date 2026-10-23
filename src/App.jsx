import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Main layout wrapper for all public-facing pages */
import Layout from "./pages/components/Layout";

/* Booking flow pages */
import ItemSelection from "./pages/front/Booking/ItemSelection.jsx";
import CustomerDetails from "./pages/front/Booking/CustomerDetails.jsx";
import DateTimeSelection from "./pages/front/Booking/DateTimeSelection.jsx";
import Payment from "./pages/front/Booking/Payment.jsx";
import Confirmation from "./pages/front/Booking/Confirmation.jsx";

/* Standard public pages */
import Home from "./pages/front/Home.jsx";
import Products from "./pages/front/Products.jsx";
import Contact from "./pages/front/Contact.jsx";
import CartPage from "./pages/CartPage.jsx";

/* Global UI elements */
import CheckoutBar from "./pages/components/CheckoutBar.jsx";
// import CartDrawer from "./pages/components/CartDrawer.jsx"; // optional slide‑in cart

/* Admin pages */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminItems from "./pages/admin/AdminItems";
import AdminBookings from "./pages/admin/Booking/AdminBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";

/* Simple admin route guard */
function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    // GitHub Pages needs this so React Router knows the site isn't served from "/"
    <BrowserRouter basename="/abibaby-rentals">

      {/* Shows a small checkout bar whenever the cart has items */}
      <CheckoutBar />

      {/* Uncomment if you want a slide‑in cart drawer */}
      {/* <CartDrawer /> */}

      <Routes>

        {/* Public pages */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* Cart page */}
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />

        {/* Booking flow */}
        <Route path="/booking" element={<Layout><ItemSelection /></Layout>} />
        <Route path="/booking/customer" element={<Layout><CustomerDetails /></Layout>} />
        <Route path="/booking/date" element={<Layout><DateTimeSelection /></Layout>} />
        <Route path="/booking/payment" element={<Layout><Payment /></Layout>} />
        <Route path="/booking/confirmation" element={<Layout><Confirmation /></Layout>} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin area (protected) */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="items" element={<AdminItems />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
