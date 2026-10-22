import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Safely extract booking data
  const items = state?.items || [];
  const customerData = state?.customerData || null;
  const date = state?.date || "";
  const startTime = state?.startTime || "";
  const hours = state?.hours || 3;

  // If booking data is missing, show fallback
  if (!items.length || !customerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">
          Missing booking information. Please go back and complete the form.
        </p>
      </div>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const depositAmount = Math.round(totalPrice * 0.3);

  const paypalOptions = {
    "client-id":
      "BAAmHj0Vys6Il4kvXhWsz3XLsonv38eABwSA82PFR9H0hL3b0qyKSarlUoRn8lyzWT2K1i2_kkUiRY_dgg",
    currency: "GBP",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">

          {/* Back Button */}
          <button
            onClick={() =>
              navigate("/booking/date", { state: { items, customerData } })
            }
            className="mb-6 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>

          <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
            Deposit Payment
          </h1>

          {/* Booking Summary */}
          <div className="mb-10 bg-gray-200 p-6 rounded-xl border border-gray-300 text-gray-900">
            <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>

            <h3 className="text-xl font-semibold mb-2">Selected Items:</h3>
            <ul className="mb-4">
              {items.map((item) => (
                <li key={item.id} className="text-lg mb-1 text-gray-900">
                  • {item.name} — £{item.price}
                </li>
              ))}
            </ul>

            <p className="text-lg mb-2">
              <strong>Date:</strong> {date}
            </p>
            <p className="text-lg mb-2">
              <strong>Start Time:</strong> {startTime}
            </p>
            <p className="text-lg mb-2">
              <strong>Duration:</strong> {hours} hours
            </p>

            <p className="text-lg mb-2">
              <strong>Total Price:</strong> £{totalPrice}
            </p>

            <p className="text-2xl font-bold mt-4 text-purple-700 drop-shadow-sm">
              Deposit Due: £{depositAmount}
            </p>
          </div>

          {/* PayPal Buttons */}
          <div className="mb-10 text-center bg-white p-6 rounded-xl shadow-md border border-gray-300">
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "pill",
                height: 45,
                tagline: false,
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: depositAmount.toString() },
                      description: `Deposit for selected rental items`,
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();

                const finalBooking = {
                  items,
                  customerData,
                  date,
                  startTime,
                  hours,
                  depositPaid: depositAmount,
                  paymentStatus: "paid",
                  paypalTransactionId: details.id,
                  reference: "ABIB-" + Math.floor(Math.random() * 999999),
                };

                navigate("/booking/confirmation", { state: finalBooking });
              }}
              onError={(err) => {
                console.error("PayPal Error:", err);
                alert("Payment failed. Please try again.");
              }}
            />
          </div>

        </div>
      </div>
    </PayPalScriptProvider>
  );
}