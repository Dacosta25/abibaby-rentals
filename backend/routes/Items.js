import express from "express";
import { getAllItems } from "../server/controllers/itemsController.js";

const router = express.Router();

// PUBLIC: list all items for frontend
router.get("/", getAllItems);

export default router;