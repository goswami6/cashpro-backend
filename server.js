import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import whyChooseUsRoutes from "./routes/whyChooseUsRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import personalLoanRoutes from "./routes/personalLoanRoutes.js";
import corporateFundingRoutes from "./routes/corporateFundingRoutes.js";
import businessLoanRoutes from "./routes/businessLoanRoutes.js";
import loanPageRoutes from "./routes/loanPageRoutes.js";


dotenv.config();
connectDB();

const app = express();

/* --------- PATH CONFIG --------- */

const rootPath = process.cwd(); 

/* --------- MIDDLEWARE --------- */
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(rootPath, "uploads")));

/* --------- ROUTES --------- */
app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/why-choose-us", whyChooseUsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/personal-loan", personalLoanRoutes);
app.use("/api/corporate-funding", corporateFundingRoutes);
app.use("/api/business-loan", businessLoanRoutes);
app.use("/api/loan-page", loanPageRoutes);






console.log("Static files being served from:", path.join(rootPath, "uploads"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running" });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});