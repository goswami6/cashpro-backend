import express from "express";
import {
  getPersonalLoan,
  upsertPersonalLoan,
} from "../controllers/personalLoanController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPersonalLoan);
router.post("/", protectAdmin, upsertPersonalLoan);

export default router;
