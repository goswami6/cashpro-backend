import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true }, // "social_links"

    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
