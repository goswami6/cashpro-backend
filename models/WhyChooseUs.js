import mongoose from "mongoose";

const whyChooseUsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true }, // lucide icon name
    color: { type: String, required: true }, // gradient class
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("WhyChooseUs", whyChooseUsSchema);
