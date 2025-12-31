import express from "express";
import { getBlogs, createBlog } from "../controllers/blogController.js";
import { uploadImage } from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

/* ---------- ROUTES ---------- */
router.get("/", getBlogs);

router.post(
  "/",
  // 1. Inline Middleware: 
  (req, res, next) => {
    req.uploadFolder = "blogs"; 
    next();
  },
  // 2. Multer Upload
  uploadImage.single("image"), 
  // 3. Save to DB
  createBlog
);

export default router;