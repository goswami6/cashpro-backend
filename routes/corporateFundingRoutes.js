import express from "express";
import {
  getCorporateFunding,
  upsertCorporateFunding,
} from "../controllers/corporateFundingController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCorporateFunding);
router.post("/", protectAdmin, upsertCorporateFunding);

export default router;
