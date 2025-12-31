import multer from "multer";
import path from "path";
import fs from "fs";

/* ---------- ENSURE DIRECTORY EXISTS ---------- */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/* ---------- STORAGE ---------- */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      // ✅ folder controller se aayega
      const folder = req.uploadFolder || "common";

      const uploadPath = path.join(process.cwd(), "uploads", folder);
      ensureDir(uploadPath);

      cb(null, uploadPath);
    } catch (err) {
      cb(err);
    }
  },

  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

/* ---------- FILE FILTER ---------- */
const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb(new Error("Only image files allowed"));
};

/* ---------- EXPORT ---------- */
export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
