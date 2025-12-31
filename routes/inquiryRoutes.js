import express from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  downloadInquiriesExcel,
} from "../controllers/inquiryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.post("/", createInquiry);

/* ADMIN */
router.get("/", protectAdmin, getInquiries);
router.put("/:id", protectAdmin, updateInquiryStatus);

router.get("/download/excel", downloadInquiriesExcel);

export default router;
