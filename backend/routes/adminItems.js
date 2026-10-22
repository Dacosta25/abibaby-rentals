import express from "express";
import upload from "../middleware/upload.js";

import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  blockDate,
  unblockDate,
} from "../server/controllers/itemsController.js";

const router = express.Router();

/* GET ALL ITEMS (ADMIN) */
router.get("/", getAllItems);

/* ADD ITEM (with image upload) */
router.post("/", upload.single("image"), createItem);

/* UPDATE ITEM (with image upload) */
router.put("/:id", upload.single("image"), updateItem);

/* DELETE ITEM */
router.delete("/:id", deleteItem);

/* BLOCK DATE */
router.post("/:id/block-date", blockDate);

/* UNBLOCK DATE */
router.post("/:id/unblock-date", unblockDate);

export default router;