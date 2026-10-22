import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* LAYOUT */
import Layout from "./pages/components/Layout";

/* BOOKING FLOW */
import ItemSelection from "./pages/front/Booking/ItemSelection.jsx";
import CustomerDetails from "./pages/front/Booking/CustomerDetails.jsx";
import DateTimeSelection from "./pages/front/Booking/DateTimeSelection.jsx";
import Payment from "./pages/front/Booking/Payment.jsx";
import Confirmation from "./pages/front/Booking/Confirmation.jsx";

/* OTHER PAGES */
import Home from "./pages/front/Home.jsx";
import Products from "./pages/front/Products.jsx";
import CartPage from "./pages/CartPage.jsx";   // ⭐ NEW CART PAGE
import Contact from "./pages/front/Contact.jsx";

/* GLOBAL UI */
import CheckoutBar from "./pages/components/CheckoutBar.jsx";  // ⭐ GLOBAL CHECKOUT BAR
// import CartDrawer from "./pages/components/CartDrawer.jsx"; // ⭐ OPTIONAL DRAWER

/* ADMIN */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminItems from "./pages/admin/AdminItems";
import AdminBookings from "./pages/admin/Booking/AdminBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";

/* PROTECTED ROUTE */
function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* ⭐ GLOBAL CHECKOUT BAR (appears on all pages when cart has items) */}
      <CheckoutBar />

      {/* ⭐ OPTIONAL CART DRAWER (if you decide to use it) */}
      {/* <CartDrawer /> */}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* SHOPPING CART PAGE */}
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />

        {/* BOOKING FLOW */}
        <Route path="/booking" element={<Layout><ItemSelection /></Layout>} />
        <Route path="/booking/customer" element={<Layout><CustomerDetails /></Layout>} />
        <Route path="/booking/date" element={<Layout><DateTimeSelection /></Layout>} />
        <Route path="/booking/payment" element={<Layout><Payment /></Layout>} />
        <Route path="/booking/confirmation" element={<Layout><Confirmation /></Layout>} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PROTECTED ROUTES */}
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