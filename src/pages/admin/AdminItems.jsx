import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Base URL for your live backend on Render.
// Keeping this in one place avoids repeating the URL everywhere.
const API_BASE = "https://abibaby-rentals-backend.onrender.com";

export default function AdminItems() {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Admin token stored after login
  const token = localStorage.getItem("adminToken");

  /* -----------------------------------------
     FETCH ITEMS (protected route)
     Loads all items from the backend for admin management.
  ----------------------------------------- */
  const loadItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  /* -----------------------------------------
     SAVE ITEM (ADD OR UPDATE)
     Handles both creating new items and editing existing ones.
  ----------------------------------------- */
  const saveItem = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    // Convert availability string → boolean
    const availabilityValue = form.get("availability");
    form.set("availability", availabilityValue === "true");

    try {
      let res;

      if (editingItem) {
        // UPDATE existing item
        res = await axios.put(
          `${API_BASE}/admin/items/${editingItem._id}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // CREATE new item
        res = await axios.post(`${API_BASE}/admin/items`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await loadItems();
      setModalOpen(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  /* -----------------------------------------
     DELETE ITEM
     Removes an item permanently from the database.
  ----------------------------------------- */
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE}/admin/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await loadItems();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* -----------------------------------------
     BLOCK / UNBLOCK DATE
     Allows admin to mark specific dates as unavailable.
  ----------------------------------------- */
  const toggleDate = async (date) => {
    const formatted = date.toISOString().split("T")[0];
    const isBlocked = selectedItem.blockedDates.includes(formatted);

    const url = isBlocked
      ? `${API_BASE}/admin/items/${selectedItem._id}/unblock-date`
      : `${API_BASE}/admin/items/${selectedItem._id}/block-date`;

    try {
      await axios.post(
        url,
        { date: formatted },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await loadItems();
      setSelectedItem(items.find((i) => i._id === selectedItem._id));
    } catch (err) {
      console.error("Failed to toggle date:", err);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Manage Items</h1>

      {/* Add Item Button */}
      <button
        onClick={() => {
          setEditingItem(null);
          setModalOpen(true);
        }}
        className="mb-6 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Add Item
      </button>

      {/* -----------------------------------------
          ITEMS LIST
          Displays all items with edit/delete/availability options.
      ----------------------------------------- */}
      <div className="bg-white p-6 rounded shadow">
        {items.map((item) => (
          <div key={item._id} className="border-b py-3 flex justify-between">
            <div>
              <p className="font-bold">{item.name}</p>
              <p>£{item.price}</p>
              <p>Category: {item.category}</p>
              <p>Available: {item.availability ? "Yes" : "No"}</p>

              {/* Item Image */}
              {item.imageUrl && (
                <img
                  src={`${API_BASE}${item.imageUrl}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover mt-2 rounded"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setModalOpen(true);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteItem(item._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setSelectedItem(item);
                  setCalendarOpen(true);
                }}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Availability
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* -----------------------------------------
          ADD / EDIT MODAL
      ----------------------------------------- */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ pointerEvents: "auto" }} // Allows clicking inside modal
        >
          <form
            onSubmit={saveItem}
            encType="multipart/form-data"
            className="bg-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? "Edit Item" : "Add Item"}
            </h2>

            {/* Item Name */}
            <input
              name="name"
              defaultValue={editingItem?.name}
              placeholder="Item name"
              className="w-full p-2 border rounded mb-3"
              required
            />

            {/* Price */}
            <input
              name="price"
              defaultValue={editingItem?.price}
              placeholder="Price"
              className="w-full p-2 border rounded mb-3"
              required
            />

            {/* Category */}
            <select
              name="category"
              defaultValue={editingItem?.category}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="Seating">Seating</option>
              <option value="Decor">Decor</option>
              <option value="Backdrops">Backdrops</option>
              <option value="Effects">Effects</option>
              <option value="Electronics">Electronics</option>
            </select>

            {/* Image Upload */}
            <input
              type="file"
              name="image"
              className="w-full p-2 border rounded mb-3"
            />

            {/* Availability */}
            <select
              name="availability"
              defaultValue={editingItem?.availability ? "true" : "false"}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded"
            >
              Save
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full mt-3 bg-gray-600 text-white p-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* -----------------------------------------
          AVAILABILITY CALENDAR MODAL
      ----------------------------------------- */}
      {calendarOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              Manage Availability — {selectedItem.name}
            </h2>

            {/* Calendar showing blocked dates */}
            <Calendar
              onClickDay={toggleDate}
              tileClassName={({ date }) => {
                const formatted = date.toISOString().split("T")[0];
                if (selectedItem.blockedDates.includes(formatted)) {
                  return "bg-red-300";
                }
              }}
            />

            <button
              onClick={() => setCalendarOpen(false)}
              className="w-full mt-4 bg-gray-600 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}