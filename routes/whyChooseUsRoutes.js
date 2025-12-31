import express from "express";
import {
  getWhyChooseUs,
  createWhyChooseUs,
  deleteWhyChooseUs,
} from "../controllers/whyChooseUsController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getWhyChooseUs);

// ADMIN
router.post("/", protectAdmin, createWhyChooseUs);
router.delete("/:id", protectAdmin, deleteWhyChooseUs);

export default router;
