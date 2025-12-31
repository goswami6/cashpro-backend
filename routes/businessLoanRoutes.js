import express from "express";
import {
  getBusinessLoan,
  upsertBusinessLoan,
} from "../controllers/businessLoanController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBusinessLoan);
router.post("/", protectAdmin, upsertBusinessLoan);

export default router;
