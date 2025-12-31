import express from "express";
import {
  getHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
} from "../controllers/heroController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getHeroSlides);


router.post(
  "/",
  protectAdmin,
  (req, res, next) => {
    req.uploadFolder = "hero"; 
    next();
  },
  uploadImage.single("image"),
  createHeroSlide
);

router.delete("/:id", protectAdmin, deleteHeroSlide);

export default router;