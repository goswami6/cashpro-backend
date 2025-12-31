import express from "express";
import {
  getTeamMembers,
  createTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getTeamMembers);

/* ADMIN */
router.post(
  "/",
  protectAdmin,
  (req, res, next) => {
    req.uploadFolder = "team";
    next();
  },
  uploadImage.single("image"),
  createTeamMember
);

router.delete("/:id", protectAdmin, deleteTeamMember);

export default router;
