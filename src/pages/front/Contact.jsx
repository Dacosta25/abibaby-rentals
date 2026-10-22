export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-12">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT SIDE — CONTACT DETAILS */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>

            <p className="text-gray-700 mb-4">
              We’re here to help you plan the perfect event.  
              Reach out to us anytime — we respond quickly.
            </p>

            <div className="space-y-4 mt-6">
              <p className="text-lg">
                📍 <span className="font-semibold">Northampton, UK</span>
              </p>

              <p className="text-lg">
                📞 <span className="font-semibold">07338 513979</span>
              </p>

              <p className="text-lg">
                📧 <span className="font-semibold">abibabyrentals@gmail.com</span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Business Hours
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>Mon – Fri: 9:00 AM – 6:00 PM</li>
                <li>Sat: 10:00 AM – 4:00 PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE — CONTACT FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Find Us
          </h2>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              title="Abibaby Rentals Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.676975135684!2d-0.897012!3d52.240477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48770e0b7d3e0e3b%3A0x8c0e2e3b7e0e0e3b!2sNorthampton!5e0!3m2!1sen!2uk!4v0000000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}