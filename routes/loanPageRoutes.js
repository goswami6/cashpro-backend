import express from "express";
import LoanPage from "../models/LoanPage.js";

const router = express.Router();

/* ================= GET PAGE BY TYPE ================= */
router.get("/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const page = await LoanPage.findOne({ type });

    if (!page) {
      return res.status(200).json(null); // 👈 frontend me null aa raha hai
    }

    res.json(page);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= CREATE / UPDATE ================= */
router.post("/", async (req, res) => {
  try {
    const { type } = req.body;

    const updated = await LoanPage.findOneAndUpdate(
      { type },
      req.body,
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Save Failed" });
  }
});

export default router;
