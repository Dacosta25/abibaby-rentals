export default function ProductCard({ name, price, img, description, onSelect }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                 border border-gray-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                 transition cursor-pointer"
      onClick={onSelect}
    >
      <img src={img} alt={name} className="h-48 w-full object-cover" />

      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">{name}</h4>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-purple-700">£{price}</span>

          <button className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500
                             text-white font-medium rounded-full shadow hover:opacity-90 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}