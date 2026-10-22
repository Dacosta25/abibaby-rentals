// backend/server/controllers/itemsController.js
import Item from "../../models/Items.js";

/* GET ALL ITEMS (PUBLIC + ADMIN) */
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("getAllItems error:", err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

/* CREATE ITEM (ADMIN) */
export const createItem = async (req, res) => {
  try {
    const { name, price, category, availability } = req.body;

    const data = {
      name,
      price,
      category,
      availability: availability === "true" || availability === true,
    };

    if (req.file) {
      data.imageUrl = `/uploads/items/${req.file.filename}`;
    }

    const item = await Item.create(data);
    res.status(201).json({ item });
  } catch (err) {
    console.error("createItem error:", err);
    res.status(500).json({ message: "Failed to create item" });
  }
};

/* UPDATE ITEM (ADMIN) */
export const updateItem = async (req, res) => {
  try {
    const { name, price, category, availability } = req.body;

    const data = {
      name,
      price,
      category,
      availability: availability === "true" || availability === true,
    };

    if (req.file) {
      data.imageUrl = `/uploads/items/${req.file.filename}`;
    }

    const item = await Item.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json({ item });
  } catch (err) {
    console.error("updateItem error:", err);
    res.status(500).json({ message: "Failed to update item" });
  }
};

/* DELETE ITEM (ADMIN) */
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("deleteItem error:", err);
    res.status(500).json({ message: "Failed to delete item" });
  }
};

/*BLOCK DATE (ADMIN) */
export const blockDate = async (req, res) => {
  try {
    const { date } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item.blockedDates.includes(date)) {
      item.blockedDates.push(date);
      await item.save();
    }

    res.json({ item });
  } catch (err) {
    console.error("blockDate error:", err);
    res.status(500).json({ message: "Failed to block date" });
  }
};

/* UNBLOCK DATE (ADMIN) */
export const unblockDate = async (req, res) => {
  try {
    const { date } = req.body;
    const item = await Item.findById(req.params.id);

    item.blockedDates = item.blockedDates.filter((d) => d !== date);
    await item.save();

    res.json({ item });
  } catch (err) {
    console.error("unblockDate error:", err);
    res.status(500).json({ message: "Failed to unblock date" });
  }
};
