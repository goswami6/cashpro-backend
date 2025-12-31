import express from "express";
import {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getTestimonials);

/* ADMIN */
router.post(
  "/",
  protectAdmin,
  (req, res, next) => {
    req.uploadFolder = "testimonials"; // ✅ यहाँ testimonials सेट करें
    next();
  },
  uploadImage.single("image"),
  createTestimonial
);


router.delete("/:id", protectAdmin, deleteTestimonial);

export default router;
