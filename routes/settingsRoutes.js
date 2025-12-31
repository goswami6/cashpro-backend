import express from "express";
import {
  getSocialLinks,
  updateSocialLinks,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/social-links", getSocialLinks);
router.put("/social-links", updateSocialLinks);

export default router;
