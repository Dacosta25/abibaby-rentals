import { useState, useEffect } from "react";
import axios from "axios";

// Step components
import CustomerDetails from "./CustomerDetails.jsx";
import DateTimeSelection from "./DateTimeSelection.jsx";
import Payment from "./Payment.jsx";
import Confirmation from "./Confirmation.jsx";

export default function BookingPage() {

  // Controls which step of the booking flow is shown (1–5)
  const [step, setStep] = useState(1);

  // Items fetched from backend database
  const [products, setProducts] = useState([]);

  // Fetch items once when page loads
  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => {
        console.log("Fetched items:", res.data);
        setProducts(res.data); // store items in state
      })
      .catch(err => console.error("Failed to load items:", err));
  }, []);

  // Cart holds selected rental items
  const [cart, setCart] = useState([]);

  // Customer details (name, email, phone, etc.)
  const [customerData, setCustomerData] = useState(null);

  // Date + time selection data
  const [dateTimeData, setDateTimeData] = useState(null);

  // Final booking object after payment
  const [finalBooking, setFinalBooking] = useState(null);

  // Add item to cart (prevent duplicates)
  const addToCart = (item) => {
    if (!cart.find((i) => i._id === item._id)) {
      setCart([...cart, item]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i._id !== id));
  };

  // -------------------------------
  // STEP 1 — ITEM SELECTION
  // -------------------------------
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Page Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
            Select Your Rental Items
          </h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                {/* Item Image */}
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />

                {/* Item Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 mb-4">{item.category}</p>

                  <p className="text-lg font-bold text-purple-700 mb-4">
                    £{item.price}
                  </p>

                  {/* Add to cart */}
                  <button
                    onClick={() => addToCart(item)}
                    className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                  >
                    Add to Booking
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Section (only shows when items added) */}
          {cart.length > 0 && (
            <div className="mt-16 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Your Booking Cart</h2>

              {/* Cart Items */}
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>{item.name}</span>
                    <span className="font-semibold">£{item.price}</span>

                    {/* Remove item */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* Cart Total */}
              <div className="text-right mt-4 text-xl font-bold">
                Total: £{cart.reduce((sum, item) => sum + item.price, 0)}
              </div>

              {/* Continue to Step 2 */}
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------
  // STEP 2 — CUSTOMER DETAILS
  // -------------------------------
  if (step === 2) {
    return (
      <CustomerDetails
        onContinue={(data) => {
          setCustomerData(data); // save customer info
          setStep(3);            // go to next step
        }}
        onBack={() => setStep(1)}
      />
    );
  }

  // -------------------------------
  // STEP 3 — DATE & TIME SELECTION
  // -------------------------------
  if (step === 3) {
    return (
      <DateTimeSelection
        onContinue={(data) => {
          setDateTimeData(data); // save date/time info
          setStep(4);            // go to payment
        }}
        onBack={() => setStep(2)}
      />
    );
  }

  // -------------------------------
  // STEP 4 — PAYMENT
  // -------------------------------
  if (step === 4) {
    return (
      <Payment
        bookingData={{
          items: cart,
          customer: customerData,
          dateTime: dateTimeData,
        }}
        onPaymentSuccess={(final) => {
          setFinalBooking(final); // save final booking
          setStep(5);             // go to confirmation
        }}
        onBack={() => setStep(3)}
      />
    );
  }

  // -------------------------------
  // STEP 5 — CONFIRMATION
  // -------------------------------
  if (step === 5) {
    return <Confirmation booking={finalBooking} />;
  }
}