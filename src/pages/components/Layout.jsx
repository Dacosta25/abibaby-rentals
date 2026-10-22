import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      <Navbar />
      <main className="pt-24 pb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}