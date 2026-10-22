export default function Calendar({ value, onChange }) {
  return (
    <div className="w-full">
      <label className="block text-lg font-medium mb-2">Select Date</label>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}