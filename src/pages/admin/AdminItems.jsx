import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AdminItems() {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const token = localStorage.getItem("adminToken");

  /* -----------------------------------------
     FETCH ITEMS
  ----------------------------------------- */
  const loadItems = async () => {
    const res = await axios.get("http://localhost:5000/admin/items", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  /* -----------------------------------------
     SAVE ITEM (ADD OR UPDATE)
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
        // UPDATE
        res = await axios.put(
          `http://localhost:5000/admin/items/${editingItem._id}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // CREATE
        res = await axios.post("http://localhost:5000/admin/items", form, {
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
  ----------------------------------------- */
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/admin/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await loadItems();
  };

  /* -----------------------------------------
     BLOCK / UNBLOCK DATE
  ----------------------------------------- */
  const toggleDate = async (date) => {
    const formatted = date.toISOString().split("T")[0];
    const isBlocked = selectedItem.blockedDates.includes(formatted);

    const url = isBlocked
      ? `http://localhost:5000/admin/items/${selectedItem._id}/unblock-date`
      : `http://localhost:5000/admin/items/${selectedItem._id}/block-date`;

    await axios.post(
      url,
      { date: formatted },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await loadItems();
    setSelectedItem(items.find((i) => i._id === selectedItem._id));
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Manage Items</h1>

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
      ----------------------------------------- */}
      <div className="bg-white p-6 rounded shadow">
        {items.map((item) => (
          <div key={item._id} className="border-b py-3 flex justify-between">
            <div>
              <p className="font-bold">{item.name}</p>
              <p>£{item.price}</p>
              <p>Category: {item.category}</p>
              <p>Available: {item.availability ? "Yes" : "No"}</p>

              {item.imageUrl && (
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover mt-2 rounded"
                />
              )}
            </div>

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
          style={{ pointerEvents: "auto" }}   // ⭐ FIX: allow clicks
        >
          <form
            onSubmit={saveItem}
            encType="multipart/form-data"
            className="bg-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? "Edit Item" : "Add Item"}
            </h2>

            <input
              name="name"
              defaultValue={editingItem?.name}
              placeholder="Item name"
              className="w-full p-2 border rounded mb-3"
              required
            />

            <input
              name="price"
              defaultValue={editingItem?.price}
              placeholder="Price"
              className="w-full p-2 border rounded mb-3"
              required
            />

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

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              name="image"
              className="w-full p-2 border rounded mb-3"
            />

            {/* AVAILABILITY */}
            <select
              name="availability"
              defaultValue={editingItem?.availability ? "true" : "false"}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>

            {/* ⭐ FIX: submit button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded"
            >
              Save
            </button>

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