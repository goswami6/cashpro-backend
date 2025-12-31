import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@cashpro.com";
    const adminPassword = "Admin@123"; // change later

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: adminEmail });

    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    // Create admin
    await Admin.create({
      email: adminEmail,
      password: adminPassword,
    });

    console.log("🎉 Admin created successfully");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
