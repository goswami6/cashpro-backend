import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    image: { type: String, required: true }, // upload or URL
    linkedin: { type: String },
    twitter: { type: String },
    email: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamSchema);
